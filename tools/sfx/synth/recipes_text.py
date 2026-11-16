"""문장 엔진 — `single` 영어 문장을 읽어 소리 층을 고르고 시간에 늘어놓는다.

1) 문장을 마디로 나눈다(쉼표 · 쌍점 · then · followed by · as · while …). 마디 순서 = 시간 순서.
2) 마디마다 낱말 표(RULES)에서 맞는 층을 최대 3개 고른다.
3) 무게 s(0~1): 문장 끝의 무게 말(Tiny … Colossal), 없으면 카드 레벨, 그것도 없으면 형용사.
4) 마디는 앞 마디 길이의 일부만큼 늦게 시작하고, 전체가 정해진 길이에 들어오게 줄인다.
5) 짧은 방 울림 → master.
"""
import re

import layers as L
from dsp import *  # noqa

# (정규식, 층 함수(s, ph) , dB) — 위에서부터 맞춰 마디마다 최대 3개
RULES = [
    # 활 · 화살 · 깃
    (r"bowstring|twang|\bbow\b|string snaps|loosed", lambda s, ph: L.twang(s), -2),
    (r"whistl|\bzip|zing|whizz|thin whine through", lambda s, ph: L.whistle(s, fast="zip" in ph), -6),
    (r"arrow|\bbolt (?:hits|strikes|thunks|lands)|thock|thwack|sticks? (?:in|into)|pierc|puncture", lambda s, ph: L.arrow_hit(s), -2),
    # 번개 · 전기
    (r"thunder", lambda s, ph: L.thunder(s), -1),
    (r"lightning|electric|\bzap|\barc\b|arcs|spark(?!l)|static|crackling (?:energy|charge)|coil|volt|jolt", lambda s, ph: L.zap(s), -4),
    (r"whine|charg|capacitor|hum(?:ming)? (?:rises|rising)|rising hum|buzz", lambda s, ph: L.electric_hum(s), -9),
    # 불 · 화약
    (r"explo|blast|cannon|\bbang|musket|gunshot|shot rings|detonat|powder keg|boom(?!ing bell)", lambda s, ph: L.blast(s), 0),
    (r"fire|flame|blaze|ember|inferno|whump|whoomp|scorch|molten|lava|roaring heat", lambda s, ph: L.fire(s), -3),
    (r"crackl|sizzl|fizz|\bfuse\b", lambda s, ph: L.crackles(s), -9),
    (r"hiss|steam|vent|sigh of air|exhale", lambda s, ph: L.hiss(s), -8),
    (r"\bpops?\b|popping", lambda s, ph: L.pop(s), -6),
    # 물
    (r"splash|slosh|slap(?:s)? (?:down|of water)|plunge", lambda s, ph: L.splash(s), -2),
    (r"wave|tide|surge of water|wash|torrent|current|flood|rushing water", lambda s, ph: L.wave(s), -3),
    (r"bubbl|gurgl|froth|foam|fizzing water", lambda s, ph: L.bubbles(s), -7),
    (r"drip|drop(?:s|let)|droplet|trickl", lambda s, ph: L.drip(s), -6),
    (r"wet|squelch|slime|flesh|ooze|squish|slurp|sucking", lambda s, ph: L.wet(s), -4),
    # 짐승 · 몸
    (r"\broar", lambda s, ph: L.fire(s) if re.search(r"fire|flame|ember|hot|blaze|heat|furnace|forge|coal", ph) else L.voice(s, "roar"), -3),
    (r"growl|snarl|rumbling growl", lambda s, ph: L.voice(s, "growl"), -3),
    (r"screech|shriek|caw|cry of a bird|squawk|squeal", lambda s, ph: L.voice(s, "screech"), -8),
    (r"\bhoot", lambda s, ph: L.voice(s, "hoot"), -6),
    (r"howl|belling|bellow|\bcall\b|trumpet", lambda s, ph: L.voice(s, "call"), -5),
    (r"snort|huff|breath|pant", lambda s, ph: L.voice(s, "snort"), -6),
    (r"grunt", lambda s, ph: L.voice(s, "grunt"), -6),
    (r"heartbeat|throb|pulse of blood", lambda s, ph: L.heartbeat(s), -2),
    (r"\bbite|jaws|crunch|chomp|gnaw", lambda s, ph: L.crunch(s), -2),
    (r"hoove|gallop", lambda s, ph: L.hooves(s), -3),
    (r"footstep|\bsteps?\b|stride|\bboots\b|paws", lambda s, ph: L.steps(s), -5),
    (r"\bwings?\b|flap|flutter|feather", lambda s, ph: L.flutter(s), -5),
    # 쇠
    (r"chain|shackle|links", lambda s, ph: L.chain(s), -5),
    (r"scrap|rasp|whetstone|drawn from (?:its|a) (?:sheath|scabbard)|unsheath|grind(?:ing)? (?:steel|metal)", lambda s, ph: L.scrape(s), -8),
    (r"clang|\bring(?:s|ing)?\b|anvil|gong|bronze|resonant iron|deflect|ricochet", lambda s, ph: L.clang(s, ring=0.6 if re.search(r"ring|resonan|gong|bronze", ph) else 0.15), -3),
    (r"clank|clatter|clunk|armou?r|plate|mail|\biron\b|\bsteel\b|\bmetal\b|blade|sword|axe|hammer|helm|gauntlet|shield", lambda s, ph: L.clank(s), -4),
    (r"gear|cog|ratchet|clockwork|tick(?:ing)? (?:mechan|gear)|piston|spring|lever|winch", lambda s, ph: L.mech(s, steam="steam" in ph), -6),
    (r"coin|gold|jingl", lambda s, ph: L.coin(s), -8),
    (r"buckle|strap|latch|clasp", lambda s, ph: L.buckle(s), -5),
    (r"leather|hide|fur\b", lambda s, ph: L.leather(s), -6),
    # 빛 · 종 · 유리 · 마법
    (r"\bbells?\b|\btoll", lambda s, ph: L.bellt(s), -3),
    (r"chime|glassy|crystal|\bglass|tinkl|clear tone|\bstar\b|halo|\bharp\b", lambda s, ph: L.chime(s), -6),
    (r"shatter|splinter|shards|brittle", lambda s, ph: L.glass(s) if re.search(r"glass|crystal|ice|obsidian", ph) else L.debris(s, bright=True), -4),
    (r"shimmer|sparkl|glitter|twinkl|glint|radian|holy|light (?:pours|blooms|flares)", lambda s, ph: L.shimmer(s), -8),
    (r"reverse|sucked (?:in|back)|implod|swallow|inhal", lambda s, ph: L.reverse_swell(s), -4),
    (r"\bswell|surg|rising|rises|bloom|empower|energy|glow|aura|power|rune|arcane|magic|blessing|spell", lambda s, ph: L.swell(s, down=bool(re.search(r"sink|drain|fall|descend|fade|collaps", ph))), -6),
    (r"\bdrain|sink|descend|wither|fades? (?:away|out)|collaps", lambda s, ph: L.swell(s, down=True), -6),
    (r"\bdark|shadow|void|abyss|ominous|curse|\bhum\b|hums|humming|drone|thrum|\bdeep\b.*(?:tone|note)|moan|whisper", lambda s, ph: L.drone(s), -6),
    # 나무 · 숲 · 흙 · 돌
    (r"creak|groan(?:ing)? (?:wood|timber|bark|branch|trunk)|groan", lambda s, ph: L.creak(s), -6),
    (r"leaves|rustl|foliage|grass|moss|vine|petal|bush|twig", lambda s, ph: L.rustle(s), -8),
    (r"\bwood|timber|\blog\b|branch|bark|trunk|staff|shaft|club|antler|\bknock|thock|clack", lambda s, ph: L.wood(s), -3),
    (r"\bcrack|\bsnap|split|break|fractur", lambda s, ph: L.crack(s, brittle="brittle" in ph or "thin" in ph), -3),
    (r"rubble|gravel|pebble|debris|crumbl|rocks? (?:fall|tumble)|dust|dirt|soil|loam|clods", lambda s, ph: L.debris(s), -6),
    (r"(?<!whet)stone|\brock|boulder|earth|ground shakes|quake|tremor", lambda s, ph: L.stone(s), -3),
    (r"grind|grating|drag(?:ging)?", lambda s, ph: L.grind(s), -7),
    # 공기 · 움직임
    (r"wind|gust|gale|breeze|storm|tempest|air rushes", lambda s, ph: L.wind(s), -6),
    (r"whoosh|swoosh|swish|swing|swipe|lunge|slash|sweep|whirl|spin|hurl|thrown|fling|flick|dash|rush|charges? in|leap", lambda s, ph: L.whoosh(s, fast=bool(re.search(r"quick|fast|flick|dash|swift|rapid", ph))), -5),
    (r"paper|parchment|card|page|scroll", lambda s, ph: L.paper(s), -6),
    (r"cloth|banner|cloak|robe|fabric|sail|tarp", lambda s, ph: L.cloth_snap(s), -6),
    (r"quill|scratch|etch", lambda s, ph: L.quill(s), -8),
    (r"\btick|\btap\b|click", lambda s, ph: L.tick(s), -8),
    # 그 밖에 자주 나오는 말
    (r"ripple|liquid|\bwater\b", lambda s, ph: L.wave(s * 0.6), -8),
    (r"rumbl|rolling|rolls", lambda s, ph: L.rumble(s), -4),
    (r"rattl|clink", lambda s, ph: L.debris(s * 0.5, bright=True), -7),
    (r"chirp|squeak|\bcry\b|shrill|squeal", lambda s, ph: L.voice(0.05, "screech"), -12),
    (r"puff|smoke|haze|mist|\bair\b|airy|fog", lambda s, ph: L.whoosh(s * 0.5, up=True), -9),
    (r"blood", lambda s, ph: L.wet(s), -6),
    (r"brass|bronze", lambda s, ph: L.clank(s * 0.5), -6),
    (r"whirr", lambda s, ph: L.mech(s), -8),
    # 부딪침 (마지막 — 다른 재료가 없을 때도 몸통이 되게)
    (r"boom|booming|thunderous|crash|earth-shaking|colossal|seismic", lambda s, ph: L.boom(s), -1),
    (r"thud|thump|slam|stomp|pound|smash|bash|punch|impact|lands|landing|strike|struck|blow|hit|crush|stamp|whump|thunk|bump", lambda s, ph: L.thud(s, soft=bool(re.search(r"soft|muffled|gentle|dull|padded", ph))), -1),
]
RULES = [(re.compile(p), f, g) for p, f, g in RULES]

WEIGHT = [("colossal", 1.0), ("massive", 0.9), ("very heavy", 0.8), ("heavy and forceful", 0.65),
          ("medium weight", 0.45), ("small and light", 0.25), ("tiny", 0.1)]

SPLIT = re.compile(r",\s*then\s+|;\s*|:\s*|\s+then\s+|,\s*followed by\s+|\s+followed by\s+|,\s*and\s+|,\s+|\s+as\s+|\s+while\s+|\s+before\s+|\s+until\s+")


def body_text(t):
    t = t.split("About ")[0]
    return re.sub(r"\s+", " ", t).strip().rstrip(".").lower()


def weight_of(single, lv=None):
    low = single.lower()
    for w, s in WEIGHT:
        if w in low:
            return s
    if lv:
        return float(np.clip(0.12 + 0.11 * (lv - 1), 0.1, 0.9))
    b = body_text(single)
    s = 0.45
    if re.search(r"heavy|deep|huge|great|massive|thunderous|vast", b):
        s += 0.2
    if re.search(r"soft|tiny|small|light|gentle|faint|quick", b):
        s -= 0.2
    return float(np.clip(s, 0.1, 0.9))


def plan(single):
    out = []
    for ph in [p.strip() for p in SPLIT.split(body_text(single)) if p.strip()]:
        hits = []
        for rx, fn, g in RULES:
            if rx.search(ph) and fn not in [h[0] for h in hits]:
                hits.append((fn, g, rx.pattern[:24]))
            if len(hits) == 3:
                break
        out.append((ph, hits))
    return out


def build(single, length, lv=None, kind="common", grade="common"):
    s0 = weight_of(single, lv)
    phrases = plan(single)
    events = []
    for ph, hits in phrases:
        ps = s0
        if re.search(r"huge|massive|great|deep|crushing|thunderous|colossal|vast", ph):
            ps = min(1.0, ps + 0.15)
        if re.search(r"tiny|small|little|thin|light\b", ph):
            ps = max(0.05, ps - 0.15)
        gmod = -5 if re.search(r"soft|faint|muffled|distant|gentle|quiet|hush|whisper|fading", ph) else 0
        evs = []
        for fn, g, _ in hits:
            x = fn(ps, ph)
            evs.append((x, g + gmod))
        if evs:
            events.append(evs)
    if not events:  # 낱말이 하나도 안 맞으면 쓰임새로 기본 층
        if kind in ("atk", "unit"):
            events = [[(L.whoosh(s0), -5)], [(L.thud(s0), 0)]]
        elif kind == "def":
            events = [[(L.thud(s0), 0), (L.clank(s0), -5)]]
        else:
            events = [[(L.swell(s0), -4), (L.shimmer(s0), -10)]]
    # 시간 배치: 다음 마디는 앞 마디 길이의 55% 뒤에
    starts, t = [], 0.0
    for evs in events:
        starts.append(t)
        occ = max(len(x) for x, _ in evs) / SR
        t += min(occ, 0.45) * 0.55
    last = starts[-1]
    lim = max(0.05, length * 0.7)
    k = min(1.0, lim / last) if last > 0 else 1.0
    m = Mix(length + 1.5)
    for st, evs in zip(starts, events):
        for x, g in evs:
            m.add(x, at=st * k, gain=g, pan=U(-0.25, 0.25), width=U(0, 1))
    # 등급이 높으면 끝에 한 겹 더(반짝이 · 낮은 꼬리)
    if grade in ("epic", "unique", "special") and kind != "common":
        m.add(L.shimmer(s0, 0.5), at=last * k, gain=-14, width=1)
    b = body_text(single)
    dry = bool(re.search(r"\bdry\b|no reverb|no ringing", b))
    far = bool(re.search(r"distant|echo|cavern|hall|vast|cathedral|tower", b))
    rt = 0.25 + 0.5 * s0 + (0.5 if far else 0)
    mix = 0.04 if dry else (0.1 + 0.08 * s0 + (0.1 if far else 0))
    m.buf = reverb(m.buf, rt=rt, mix=mix, damp=4500)
    return m, s0


def U(a, b):
    return RNG.uniform(a, b)
