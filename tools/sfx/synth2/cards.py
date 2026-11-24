"""ETHERION 효과음 v2 — 카드마다 다른 소리 (유닛 공격 · 방어, 마법 발동, 아이템 장착).

프롬프트 문장을 소리로 옮기지 않는다. 카드 자료로 "무엇으로 치는가(공격 틀) · 무엇이 맞는가(방어 틀) ·
마법이 무슨 일을 하는가(효과 틀)"를 하나 고르고, 깃발 원소의 색 · 레벨의 무게 · 등급의 장식을 얹는다.
같은 틀이라도 카드 ID 가 난수 씨앗이라 음높이 · 결이 카드마다 조금씩 다르다.
notes/<깃발>.json 의 글(hint)은 틀을 가르는 낱말로만 읽는다.
"""
import re

import elements as E
import weight as W
from kit import *  # noqa: F401,F403

GRADE_S = {"common": 0.0, "token": 0.0, "uncommon": 0.02, "upgrade": 0.05, "rare": 0.08, "epic": 0.14, "unique": 0.2, "special": 0.28}
FANCY = ("epic", "unique", "special")


def retune(x, r):
    """음높이 · 길이를 r 배로(1 보다 크면 높고 짧게) — 같은 틀의 카드끼리 다르게."""
    n = max(8, int(len(x) / r))
    return np.interp(np.linspace(0, len(x) - 1, n), np.arange(len(x)), x)


def weight(c, span=7.0):
    return float(np.clip((c["lv"] - 1) / span + GRADE_S.get(c["grade"], 0), 0.0, 1.0))


# ══ 유닛 공격 ════════════════════════════════════════════
ATK_RULES = [
    ("cannon", 3.0, r"cannon|mortar|artillery|bombard|howitzer|broadside"),
    ("gun", 3.0, r"musket|flintlock|gunshot|rifle|pistol|blunderbuss|\bbang\b|\bshots?\b|trigger|muzzle|barrel flash|gunpowder (?:crack|shot)"),
    ("bomb", 2.5, r"explo|detonat|\bbomb|grenade|\bblast|powder keg|bursts? (?:in|into|apart)|erupt|\bboom"),
    ("bow", 3.0, r"\bbow\b|bowstring|arrow|\bdart\b|crossbow|javelin|\bbolt (?:flies|whistles|looses)|sling"),
    ("zap", 2.2, r"lightning|electric|\barc(?:s|ing)?\b|spark|volt|discharge|static|shock|thunderbolt|\bbolt\b|tesla|capacitor"),
    ("axe", 3.0, r"\baxe|hatchet|chop|cleaver"),
    ("blade", 2.5, r"sword|blade|slash|slic|scythe|sabre|saber|cleav|dagger|knife|\bcuts?\b|cutting|rapier|scimitar|glaive|halberd|razor|shear|sickle"),
    ("stab", 2.0, r"spear|lance|stab|pierc|\bhorns?\b|gore|sting|beak|peck|tusk|thrust|needle|skewer|impal|\bjab|antler|spike|thorn|quill|harpoon|trident|drill|pincer|prick"),
    ("claw", 2.5, r"claw|talon|rak(?:e|es|ing)\b|scratch|swipe|maul|rend|shred|\brips?\b|ripping|tear(?:s|ing)? (?:at|into|through)"),
    ("bite", 2.5, r"\bbit(?:e|es|ing)\b|jaws?\b|chomp|gnaw|teeth|fangs?|crunch|\bmaw\b|devour|swallow|gulp|nips?\b"),
    ("smash", 1.6, r"hammer|mallet|club|mace|fist|punch|stomp|slam|smash|crush|pound|bash|\bram(?:s|ming)?\b|charg|headbutt|trampl|kick|hoof|hooves|boulder|hurl|thud|wallop|swat|flail|tackle|shoulder|anvil|pummel|slap|shove|body"),
    ("whip", 2.2, r"whip|lash|vine|tentacle|tendril|tongue|chains? (?:lash|whip|swing)|snaps? like"),
    ("fire", 1.3, r"fire|flame|blaze|ember|scorch|burn|lava|magma|molten|inferno|fireball|cinder|smoulder"),
    ("water", 1.3, r"water|wave|splash|\bjet\b|spray|tide|torrent|bubble|surge|flood|brine|geyser|current"),
    ("wind", 1.3, r"wind|gust|gale|cyclone|tornado|whirl|twister|air (?:blade|slices)|squall|draft"),
    ("dark", 1.3, r"shadow|curse|darkness|void|soul|drain|ghost|hex|dread|nightmare|wither|necro|grave|spectr"),
    ("light", 1.3, r"radian|holy|halo|beam|\bray\b|starli|sunli|dawn|hymn|chime|glow|sacred|divine|of light|light (?:beam|flash|burst|pours|lances|flares)|flash of"),
    ("sonic", 1.0, r"song|sing|\bnote\b|wail|howl|roar|shriek|scream|screech|bellow|chant|trumpet|toll|cry"),
]
ATK_RULES = [(k, w, re.compile(p)) for k, w, p in ATK_RULES]
ELEMENTAL = {"fire": "fire", "water": "water", "wind": "wind", "dark": "dark", "light": "light", "zap": "lightning"}
CL_DEFAULT = {"무장": "blade", "무도": "smash", "마도": "magic", "기도": "magic"}


def atk_kind(c):
    """공격 틀 하나를 고른다. 돌려주는 값: (틀, 얹을 원소 — 지금은 늘 None = 카드의 깃발 원소)."""
    txt = (c["hint"]["atk"] + " " + c.get("en", "")).lower()
    el = c["el"]
    sc = {}
    for k, w, rx in ATK_RULES:
        n = len(rx.findall(txt))
        if not n:
            continue
        if k in ELEMENTAL and ELEMENTAL[k] != el and n < 2:   # 남의 원소 낱말 하나로는 틀을 바꾸지 않는다
            continue
        if k == "zap" and el != "lightning" and not re.search(r"lightning|electric|thunderbolt|volt|shock|static", txt):
            continue   # 불똥(spark) · 포물선(arc) 은 번개가 아니다
        sc[k] = w * min(n, 3) + (1.0 if ELEMENTAL.get(k) == el else 0.0)
    if not sc:
        return CL_DEFAULT.get(c.get("cl"), "smash"), None
    main = max(sc, key=lambda k: sc[k])
    if (c.get("gift") or {}).get("ranged") and main in ("smash", "blade", "stab") and "gun" in sc:
        main = "gun"
    return main, None


def sonic(el, s):
    d = 0.3 + 0.25 * s
    v = E.voice(el, E.note(el, 0, 1), d)
    return seq((0, v, -3), (0.0, whoosh(d, 700, 3200, 1000, 1.2, 0.25, 0.4), 0), (0.02, slap(0.12, 500, 4000, 0.035), -2),
               (0.0, growl(d, 110 - 20 * s, s), 0))


def magic_bolt(el, s):
    return seq((0, whoosh(0.09, 1200, 6000, 3000, 2.0, 0.7, 0.5), -8), (0.06, E.strike(el, s * 0.7), 0),
               (0.06, E.voice(el, E.note(el, 2), 0.3), -9))


def atk_core(kind, el, s):
    if kind == "gun":
        return gunshot(s)
    if kind == "cannon":
        return cannon(s)
    if kind == "bomb":
        return explosion(s)
    if kind == "bow":
        return arrow_hit(s)
    if kind == "blade":
        return slash(s)
    if kind == "axe":
        return seq((0, slash(min(1, s + 0.25)), 0), (0.09, knock(300 - 80 * s, 0.03, 0.8), -5), (0.09, punch(140, 55, 0.08 + 0.05 * s, 2.4), -3))
    if kind == "stab":
        return stab(s)
    if kind == "claw":
        return claws(s, 3 if s < 0.6 else 4)
    if kind == "bite":
        return bite(s)
    if kind == "whip":
        return whip(s)
    if kind == "sonic":
        return sonic(el, s)
    if kind in ELEMENTAL:
        return E.strike(ELEMENTAL[kind], s)
    if kind == "magic":
        return magic_bolt(el, s)
    return smash(s)


def unit_atk(c):
    el, s = c["el"], weight(c)
    kind, col = atk_kind(c)
    core = retune(atk_core(kind, el, s), U(0.92, 1.1) * (1.06 - 0.12 * s))
    m = Mix(1.6)
    m.add(core, gain=0, pan=U(-0.1, 0.1))
    tel = col or el
    if ELEMENTAL.get(kind) != tel:   # 원소 타격이 이미 그 원소면 겹치지 않는다
        m.add(E.tint(tel, s), at=0.045, gain=-8 + 2 * s, pan=U(-0.3, 0.3), width=1)
    if s > 0.5 and kind not in ("bow", "whip"):   # 무거운 유닛: 맞은 자리의 여운
        m.add(quake(0.3 + 0.3 * s, s) * env_ad(0.3 + 0.3 * s, 0.004, 0.11 + 0.08 * s), at=0.04, gain=-13 + 5 * s, width=1)
        m.add(slap(0.14, 250, 2400, 0.045), at=0.05, gain=-12 + 4 * s)
    if c["grade"] in FANCY:   # 높은 등급: 원소 음색의 짧은 한 음 + 반짝임
        m.add(E.voice(el, E.note(el, 0), 0.45), at=0.05, gain=-13, width=1)
        m.add(twinkle(0.25, 6, 3000, 8000, 0.04), at=0.08, gain=-17, width=1)
    room(m, rt=0.22 + 0.4 * s, mix=0.09 + 0.07 * s)
    return finish(m.buf, crest=12.5, max_len=0.55 + 0.65 * s + (0.25 if c["grade"] in FANCY else 0))


# ══ 유닛 방어 ════════════════════════════════════════════
DEF_RULES = [
    ("metal", r"shield|armou?r|plate|iron|steel|\bmail\b|helm|bronze|brass|clang|anvil|metal|rivet|gauntlet|chassis|\btin\b|copper|blade|sword|parr|gear|cog|boiler|pipe|kettle|\bpan\b|cannon|barrel of a"),
    ("wood", r"wood|bark|trunk|branch|timber|\blog\b|plank|crate|keg|\broots?\b|stump|twig|bough|staff|haft|thicket|bramble|vine|\bstems?\b|stalk|sapling"),
    ("stone", r"stone|rock|boulder|crag|obsidian|gravel|granite|slate|\bearth\b|clay|brick|sandbag|coral|pebble|rubble|basalt|marble|statue"),
    ("shell", r"shell|carapace|\bbones?\b|skull|chitin|scales?\b|\bhorns?\b|antler|tusk|pincer|claws?\b|beak|spine|quill|hoof|hooves|exoskeleton|rib"),
    ("glass", r"glass|crystal|\bice\b|mirror|\bjar\b|\bgem|diamond|porcelain|bottle|lens|icicle|frost|prism|pearl"),
    ("energy", r"force.?field|barrier|energy|spark|coil|static|lightning|\barcs?\b|electric|capacitor|voltage|crackl|magnet|charge|current|buzz"),
    ("water", r"water|wave|ripple|splash|bubble|tide|foam|slime|jelly|ooze|liquid|\bmud|\bwet\b|puddle|spray|brine|droplet|sloshes|current|sea\b|kelp"),
    ("fire", r"flame|ember|fire|\bash|cinder|lava|magma|smoulder|molten|soot|coals?\b|fuse|heat|steam"),
    ("evade", r"dodg|vanish|\bslips?\b|sidestep|\bducks?\b|\bdarts?\b|leaps? (?:aside|back|away)|wheels? (?:aside|away)|flits?\b|swerv|misses|empty air|scatter|skitter|\bhops?\b|twists? aside|glanc|passes (?:through|into)"),
    ("feather", r"feather|\bwings?\b|flutter|\bflap|plumage|down\b"),
    ("air", r"\bwind\b|gust|cloud|\bmist|\bpuff|smoke|vapou?r|swirl|whirl|\bfog\b|haze"),
    ("shadow", r"shadow|ghost|wraith|phantom|void|spirit|ethereal|spectr|darkness|soul|haunt|shade|gloom"),
    ("holy", r"\blight\b|halo|radian|chime|holy|glow|hymn|\bbell|bless|aura|\bstar|sunbeam|sacred|prayer"),
    ("cloth", r"cloth|\brags?\b|robe|cloak|paper|parchment|\bbook|burlap|stuffing|silk|canvas|banner|\bpages?\b|scroll|web|cocoon|straw|moss|leaves|petal|fungus|mushroom|cap\b"),
    ("body", r"hide|\bfur\b|flesh|leather|muscle|bulk|belly|flank|mane|skin|\bfat\b|thud|thump|blubber|meat|shoulder|rump"),
]
DEF_RULES = [(k, re.compile(p)) for k, p in DEF_RULES]
DEF_EL = {"energy": "lightning", "water": "water", "fire": "fire", "shadow": "dark", "holy": "light", "evade": "wind", "feather": "wind", "air": "wind", "wood": "forest", "stone": "earth", "metal": "metal"}
EL_DEF = {"fire": "body", "metal": "metal", "lightning": "energy", "earth": "body", "forest": "wood", "water": "water", "dark": "shadow", "light": "holy", "wind": "evade"}


def def_kinds(c):
    txt = c["hint"]["def"].lower()
    pos = []
    for k, rx in DEF_RULES:
        m_ = rx.search(txt)
        if m_:
            pos.append((m_.start(), k))
    pos.sort()
    ks = [k for _, k in pos]
    if not ks:
        return EL_DEF.get(c["el"], "body"), None
    return ks[0], (ks[1] if len(ks) > 1 else None)


def def_core(kind, s):
    if kind == "metal":
        f = 760 - 260 * s
        return seq((0, snap(0.03, 1800, 12000, 0.004), -2), (0, clang(f, 0.14 + 0.14 * s, 0.8, 8), 0), (0, punch(180 - 50 * s, 75, 0.045 + 0.04 * s, 2.0), -2),
                   (0.035, clink(U(1900, 2600), 0.03), -9), (0.07, clink(U(1500, 2100), 0.03), -12))
    if kind == "wood":
        return seq((0, wood_hit(s), 0), (0.01, wood_crack(s * 0.6), -8))
    if kind == "stone":
        return rock_hit(s * 0.85)
    if kind == "shell":
        f = 820 - 300 * s
        return seq((0, snap(0.025, 2000, 11000, 0.003), -3), (0, knock(f, 0.02 + 0.012 * s, 1.0), 0), (0.012, knock(f * 1.33, 0.014, 0.9), -4),
                   (0, punch(190 - 50 * s, 85, 0.035 + 0.03 * s), -5), (0.03, snap(0.015, 3000, 9000, 0.002), -12))
    if kind == "glass":
        f = U(1500, 1900) * (1 - 0.3 * s)
        cr = grains(0.12, 6, lambda i: mixa(snap(0.01, 3000, 12000, 0.0018), glass_ping(U(2500, 6000), 0.02) * 0.5), decay_rate=0.8)
        return seq((0, snap(0.02, 2500, 12000, 0.003), -4), (0, glass_ping(f, 0.11 + 0.08 * s), 0), (0, glass_ping(f * 1.41, 0.08), -5),
                   (0.01, cr, -6), (0, punch(200, 100, 0.03), -8))
    if kind == "energy":
        d = 0.2 + 0.12 * s
        wob = sat(tone((640 - 150 * s, 210), d, harm=(1.0, 0.5, 0.3)), 2.0) * env_ad(d, 0.002, d / 3)
        return seq((0, zap(0.11 + 0.05 * s, 0.25), -3), (0, wob, 0), (0, air(0.12, 5000, 0.03), -10))
    if kind == "water":
        return seq((0, slap(0.12, 700, 7000, 0.03 + 0.02 * s), 2), (0.0, bubble(420 - 90 * s, 0.08), -7), (0.03, bubbles(0.16, 5, 500, 2000), -6),
                   (0.1, drops(0.14, 3), -9), (0, punch(190 - 50 * s, 90, 0.035), -6))
    if kind == "fire":
        return seq((0, punch(170 - 40 * s, 80, 0.04 + 0.03 * s, 1.8), -4), (0, fire_whoosh(0.22 + 0.12 * s, s, 0.1), 0), (0.01, sizzle(0.2 + 0.1 * s, 90), -5))
    if kind == "evade":   # 피한다 — 허공을 가르는 바람만
        return seq((0, whoosh(0.2 + 0.08 * s, 2200, 3600, 650, 1.3, 0.3, 0.3), 0), (0.06, slap(0.06, 700, 4000, 0.015), -8))
    if kind == "feather":   # 깃 · 날개가 받아 낸다 — 퍼덕 + 폭신한 '툭'
        return seq((0, punch(180 - 40 * s, 85, 0.04 + 0.03 * s, 1.6), -3), (0, lp(slap(0.1, 400, 4500, 0.03), 5000), -2), (0.0, flutter(3, 0.05), 0),
                   (0.02, rustle(0.16, 20, 2500, 9000), -8))
    if kind == "air":   # 연기 · 구름이 흩어진다 — 푹 꺼지는 바람
        d = 0.24 + 0.1 * s
        return seq((0, punch(160 - 30 * s, 75, 0.05, 1.6), -2), (0, whoosh(d, 1800, 2800, 600, 1.1, 0.2, 0.4), 0), (0.01, air(d, 4500, d / 3), -10))
    if kind == "shadow":
        d = 0.28 + 0.14 * s
        return seq((0, punch(150 - 30 * s, 65, 0.06 + 0.04 * s, 2.2), -2), (0, slap(0.12, 500, 3500, 0.035), -1),
                   (0.0, whisper(d, 2300) * env_ad(d, 0.015, d / 3), 4), (0.0, tone((300, 150), d, tau=d / 4, harm=(1, 0.5, 0.3)), -5))
    if kind == "holy":
        f = hz(84) * U(0.97, 1.03)
        return seq((0, punch(190 - 40 * s, 90, 0.04 + 0.03 * s, 1.6), -2), (0, slap(0.08, 800, 5000, 0.02), -4), (0, chime(f, 0.12 + 0.06 * s), 0),
                   (0.03, chime(f * 1.5, 0.1), -4), (0.02, air(0.2, 5000, 0.05), -6))
    if kind == "cloth":
        return seq((0, slap(0.14, 400, 4500, 0.04), 0), (0, punch(170 - 40 * s, 80, 0.04 + 0.03 * s, 1.6), -5), (0.01, rustle(0.16, 22, 2000, 7000), -3))
    return seq((0, punch(165 - 50 * s, 60, 0.06 + 0.05 * s, 2.3), 0), (0.002, slap(0.15, 500, 4000, 0.035 + 0.025 * s), 2),
               (0, snap(0.03, 1500, 10000, 0.005), -2), (0.003, knock(380 - 90 * s, 0.03, 0.8), -4))   # body


def unit_def(c):
    el, s = c["el"], weight(c)
    k1, k2 = def_kinds(c)
    m = Mix(1.4)
    m.add(retune(def_core(k1, s), U(0.92, 1.1) * (1.06 - 0.12 * s)), gain=0, pan=U(-0.1, 0.1))
    if k2 and k2 != k1:
        m.add(retune(def_core(k2, s * 0.7), U(0.95, 1.12)), at=0.03, gain=-8, pan=U(-0.3, 0.3))
    if DEF_EL.get(k1) != el and DEF_EL.get(k2) != el:
        m.add(E.tint(el, s), at=0.04, gain=-11 + 2 * s, pan=U(-0.3, 0.3), width=1)
    if c["grade"] in FANCY:
        m.add(E.voice(el, E.note(el, 0, -1 if el in ("light", "wind") else 0), 0.4), at=0.03, gain=-14, width=1)
    room(m, rt=0.2 + 0.3 * s, mix=0.08 + 0.06 * s)
    return finish(m.buf, crest=12.5, max_len=0.45 + 0.5 * s + (0.2 if c["grade"] in FANCY else 0))


# ══ 마법 ═════════════════════════════════════════════════
DMG_OPS = {"dmg", "multi", "blast", "volley", "a3Volley", "gbBlast", "gbKegs", "detonate", "hpSlam", "g1Ram", "paidHit", "a1Hellfire",
           "a2Judge", "a2Retrib", "duel", "selfHit", "chain", "armorCrush", "g2Weight", "destroy", "sumDef", "rot"}
SHIELD_OPS = {"shield", "lock", "guard", "a2Vigil", "mrVeil", "endure", "thorns"}
HEAL_OPS = {"clean", "mrPurge", "rebirth", "a2Redeem", "a2Dawn"}
NEG_OPS = {"negate", "negBuff", "a2Hush"}
DEBUFF_OPS = {"curse", "handMod", "handCurse", "atk0", "def0", "strip", "confuse", "a3Confuse", "fate", "pin", "sortFoe", "rest",
              "scorchMod", "drain", "scorch"}
TRICK_OPS = {"swap", "swapPos", "swapSt", "randSwap", "d0Swap", "xchg", "retreat", "move", "mimic", "phantom", "steal", "paidSteal",
             "mindCapture", "a1Dominate", "a1Possess", "swapLeft", "leftToBottom", "draw", "handBurn", "tithe", "a2Scale", "a2Sub", "a2Martyr"}


def op_cat(o):
    k = o["op"]
    if k in DMG_OPS:
        return "dmg"
    if k in NEG_OPS:
        return "negate"
    if k in SHIELD_OPS:
        return "shield"
    if k in HEAL_OPS:
        return "heal"
    if k in DEBUFF_OPS:
        return "debuff"
    if k in TRICK_OPS:
        return "trick"
    if k == "mod":
        neg = any(isinstance(o.get(x), (int, float)) and o[x] < 0 for x in ("a", "d", "h"))
        return "debuff" if (o.get("side") == "foe" or neg) else "buff"
    return "buff"


def spell_plan(c):
    ops = c["ops"] or []
    cats = [op_cat(o) for o in ops]
    if not cats:
        t = c.get("text", "")
        cats = ["dmg" if "피해" in t else "heal" if re.search("치유|회복", t) else "shield" if "보호막" in t else "buff"]
    main = "dmg" if "dmg" in cats else "negate" if "negate" in cats else cats[0]
    hits = 1
    for o in ops:
        if op_cat(o) == main:
            a = o.get("area") or {}
            n = a.get("n") or o.get("n") or 1
            hits = max(hits, 3 if a.get("t") == "all" else int(n) if isinstance(n, (int, float)) else 1)
    names = {o["op"] for o in ops}
    return main, [k for k in dict.fromkeys(cats) if k != main], min(hits, 4), names


def thorn_ticks(n=4):
    return seq(*[(i * U(0.035, 0.05), mixa(knock(U(1300, 1900), 0.007, 1.0), (snap(0.012, 3000, 11000, 0.002), -3)), -2 * i) for i in range(n)])


def spell_cast(c):
    el = c["el"]
    lv = c["lv"]
    s = float(np.clip((lv - 1) / 4.5 * 0.8 + GRADE_S.get(c["grade"], 0), 0, 1))
    fancy = c["grade"] in FANCY
    hand = c["type"] == "hand"
    D = (0.75 if hand else 0.95) + 0.13 * lv + (0.18 if fancy else 0)
    main, extra, hits, names = spell_plan(c)
    if hand and main in ("buff", "debuff"):
        extra, main = [main], "trick"
    m = Mix(D + 1.2)
    N = lambda i, o=0: E.note(el, i, o)   # noqa: E731
    V = lambda f, d=0.35: E.voice(el, f, d)   # noqa: E731
    # 카드가 뒤집히며 기운이 깨어나는 앞머리
    m.add(card_flick(0.05), gain=-11)
    m.add(V(N(0, 1), 0.22), gain=-10, width=1)
    end = D
    if main == "dmg":
        th = float(np.clip(0.34 * D, 0.28, 0.6))
        heavy = min(1.0, s + (0.2 if names & {"destroy", "hpSlam", "blast", "a1Hellfire", "a2Judge", "detonate"} else 0))
        m.add(E.charge(el, th, s), gain=-6, width=1)
        m.add(E.strike(el, heavy), at=th, gain=0)
        m.add(V(N(0), 0.5), at=th, gain=-11, width=1)
        for i in range(1, hits):   # 여러 대상: 좌우로 잇달아
            m.add(retune(E.strike(el, heavy * 0.55), U(1.05, 1.25)), at=th + 0.1 * i, gain=-5 - i, pan=(-0.55 if i % 2 else 0.55))
        if "chain" in names:
            for i in range(3):
                m.add(zap(0.12, 0.2), at=th + 0.12 + 0.09 * i, gain=-6 - 2 * i, pan=(-0.6, 0.0, 0.6)[i])
        if names & {"destroy", "armorCrush"}:
            m.add(twinkle(0.3, 12, 1500, 6500, 0.03), at=th + 0.03, gain=-9, width=1)
            m.add(rubble(0.35, 14), at=th + 0.04, gain=-9)
        m.add(E.wash(el, max(0.3, D - th), s), at=th + 0.02, gain=-13, width=1)
        # 2026-11-24 무게: 부풀어 오르는 앞 + 저역 몸통 · 긴 꼬리(전체 · 여럿 공격은 더 넓게)
        area = hits >= 3
        pre = W.body_pre(el, th, heavy)
        if pre is not None:
            m.add(pre, gain=-7 + 3 * heavy, width=1)
        m.add(W.body_hit(el, heavy, area), at=th, gain=-5 + 2 * heavy, width=1)
        end = th + 0.5 + 0.5 * heavy + 0.1 * (hits - 1) + 0.35 + 0.45 * heavy + (0.35 if area else 0)
    elif main == "negate":
        m.add(suck(0.26, 500, 6000), gain=-3, width=1)
        t0 = 0.27
        m.add(snap(0.04, 1500, 12000, 0.006), at=t0, gain=0)
        m.add(tone((1900, 190), 0.2, harm=(1.0, 0.4, 0.2)) * env_ad(0.2, 0.001, 0.06), at=t0, gain=-4)
        m.add(punch(160, 60, 0.07, 2.4), at=t0, gain=-3)
        m.add(retune(V(N(0, 1), 0.3), 0.75), at=t0, gain=-8, width=1)
        m.add(twinkle(0.22, 9, 1800, 7000, 0.025), at=t0 + 0.02, gain=-10, width=1)
        m.add(W.low_swell(t0, 50, 140), gain=-8, width=1)   # 빨려 들어가는 저역 → 꺼지는 '쿵'
        m.add(W.sub_boom(48, 0.8, s, drop=2.2), at=t0, gain=-3)
        m.add(W.rumble(0.8, s, 35, 200, 5), at=t0 + 0.02, gain=-11, width=1)
        end = t0 + 0.85 + 0.2 * s
    elif main == "shield":
        th = float(np.clip(0.3 * D, 0.25, 0.5))
        m.add(E.charge(el, th, s), gain=-9, width=1)
        f = N(0, 0)
        dome = tone((f * 1.88, f * 2), 0.6, harm=(1.0, 0.45, 0.25, 0.12), det=0.004) * env_ad(0.6, 0.004, 0.2 + 0.1 * s)
        m.add(dome, at=th, gain=-2, width=1)
        m.add(V(f, 0.6), at=th, gain=-4, width=1)
        m.add(V(N(2, 0), 0.5), at=th + 0.015, gain=-8, width=1)
        m.add(punch(170 - 30 * s, 80, 0.06, 1.8), at=th, gain=-6)
        m.add(air(0.35, 5000, 0.09), at=th, gain=-12, width=1)
        if "thorns" in names:
            m.add(thorn_ticks(5), at=th + 0.1, gain=-5, pan=U(-0.3, 0.3))
        m.add(sw(twinkle(0.4, 7, 2500, 6500, 0.05), 0.1, 1, 1.5), at=th + 0.08, gain=-13, width=1)
        m.add(W.gong_hum(E.note(el, 0, -2), 1.0 + 0.6 * s, s), at=th, gain=-5 + 2 * s, width=1)   # 낮은 징처럼 둘러싸는 돔
        m.add(W.sub_boom(W.SUBF[el] * 1.1, 0.6, s, drop=1.5), at=th, gain=-8)
        end = th + 1.0 + 0.5 * s
    elif main == "heal":
        gap = 0.085
        m.add(sw(E.wash(el, D * 0.9, s * 0.6), 0.35, 1.2, 1.5), gain=-11, width=1)
        for i, k in enumerate((0, 2, 3, 5)):
            m.add(V(N(k, 0), 0.4), at=0.07 + gap * i, gain=-5 + i * 0.6, pan=(-0.3 + 0.2 * i), width=1)
        tb = 0.07 + gap * 4
        m.add(chime(N(0, 2), 0.35), at=tb, gain=-6, width=1)
        m.add(sw(twinkle(0.5, 12, 3000, 8500, 0.05, rise=0.5), 0.15, 1, 1.3), at=0.1, gain=-11, width=1)
        if el in ("water", "forest"):
            m.add(bubbles(0.4, 9, 600, 2600), at=0.08, gain=-10)
        m.add(W.warm_chord(el, tb + 1.0 + 0.4 * s, True), at=0.04, gain=-5 + 2 * s, width=1)   # 따뜻한 낮은 화음이 감싼다
        end = tb + 0.95 + 0.35 * s
    elif main == "debuff":
        gap = 0.1
        m.add(sw(E.wash(el, D * 0.85, s), 0.3, 1.2, 1.4), gain=-10, width=1)
        m.add(sw(whisper(0.5, 2300), 0.35, 1.5, 1.5), at=0.05, gain=-10, width=1)
        for i, k in enumerate((4, 3, 1, 0)):   # 내려가는 음, 뒤로 갈수록 낮게 가라앉는다
            m.add(retune(V(N(k, 0), 0.4), 1 - 0.015 * i), at=0.07 + gap * i, gain=-4, pan=(0.3 - 0.2 * i), width=1)
        tb = 0.07 + gap * 4
        m.add(tone((N(0, 0), N(0, 0) * 0.62), 0.35, harm=(1.0, 0.55, 0.35, 0.2)) * env_ad(0.35, 0.004, 0.12), at=tb, gain=-3)
        m.add(punch(140, 55, 0.08, 2.3), at=tb, gain=-4)
        if names & {"scorch", "scorchMod"}:
            m.add(sizzle(0.4, 80), at=tb, gain=-7, width=1)
        if "drain" in names:
            m.add(suck(0.3, 400, 3500), at=0.05, gain=-7, width=1)
        m.add(W.curse_drone(W.SUBF[el] * 1.2, tb + 0.9 + 0.4 * s, s), at=0.03, gain=-5 + 2 * s, width=1)   # 낮게 짓누르는 불협
        m.add(W.sub_boom(W.SUBF[el] * 0.95, 0.7, s, drop=1.6), at=tb, gain=-6)
        end = tb + 0.85 + 0.3 * s
    elif main == "trick":
        m.add(whoosh(0.2, 900, 4500, 1500, 1.6, 0.5, 0.5), at=0.03, gain=-5, pan=-0.6)
        m.add(whoosh(0.2, 1100, 5200, 1700, 1.6, 0.5, 0.5), at=0.16, gain=-5, pan=0.6)
        m.add(V(N(2, 0), 0.25), at=0.06, gain=-5, pan=-0.4, width=1)
        m.add(V(N(0, 0), 0.25), at=0.19, gain=-5, pan=0.4, width=1)
        m.add(V(N(3, 0), 0.4), at=0.33, gain=-4, width=1)
        m.add(card_flick(0.06), at=0.33, gain=-6)
        m.add(twinkle(0.3, 7, 3000, 8000, 0.04), at=0.3, gain=-13, width=1)
        if names & {"draw", "swapLeft", "leftToBottom", "handBurn"} or hand:
            m.add(card_slide(0.13), at=0.42, gain=-7)
            m.add(card_flick(0.06), at=0.54, gain=-7)
        m.add(W.rumble(0.35, s, 55, 380, 4, a=0.12), at=0.0, gain=-9, pan=-0.5)   # 낮게 휘도는 기류가 좌 → 우로
        m.add(W.rumble(0.35, s, 55, 380, 4, a=0.12), at=0.14, gain=-9, pan=0.5)
        m.add(W.sub_boom(W.SUBF[el] * 1.2, 0.55, s * 0.7, drop=1.6), at=0.33, gain=-8)
        end = 1.05 + 0.2 * s
    else:   # buff
        gap = 0.08
        m.add(sw(E.wash(el, D * 0.9, s), 0.4, 1.2, 1.5), gain=-10, width=1)
        for i, k in enumerate((0, 1, 2, 4)):   # 올라가는 음
            m.add(V(N(k, 0), 0.4), at=0.06 + gap * i, gain=-5 + i * 0.7, pan=(-0.3 + 0.2 * i), width=1)
        tb = 0.06 + gap * 4
        m.add(V(N(0, 1), 0.6), at=tb, gain=-3, width=1)
        m.add(V(N(2, 0), 0.6), at=tb, gain=-6, width=1)
        m.add(punch(180, 85, 0.05, 1.7), at=tb, gain=-7)
        m.add(air(0.3, 5000, 0.08), at=tb, gain=-12, width=1)
        m.add(sw(twinkle(0.45, 10, 3000, 8500, 0.05, rise=0.4), 0.15, 1, 1.3), at=tb - 0.05, gain=-11, width=1)
        m.add(W.low_swell(tb, W.SUBF[el], 160), gain=-9 + 2 * s, width=1)   # 힘이 아래에서 차오르다
        m.add(W.warm_chord(el, 0.9 + 0.4 * s, True, 0.03), at=tb, gain=-7 + 2 * s, width=1)   # 낮은 화음으로 올라서고
        m.add(W.sub_boom(W.SUBF[el] * 1.1, 0.7, s, drop=1.5), at=tb, gain=-6)
        end = tb + 0.95 + 0.3 * s
    # 곁들임: 주된 효과가 아닌 것은 짧게 덧붙인다
    te = min(end - 0.35, D * 0.75)
    if main != "shield" and "shield" in extra:
        m.add(tone((N(0, 0) * 1.9, N(0, 0) * 2), 0.4, harm=(1.0, 0.4, 0.2)) * env_ad(0.4, 0.004, 0.14), at=te, gain=-9, width=1)
        if "thorns" in names:
            m.add(thorn_ticks(4), at=te + 0.05, gain=-7)
    if main not in ("buff", "heal") and ("buff" in extra or "heal" in extra):
        m.add(arp([E.SIG[el][0] + 12 + E.SIG[el][1][k] for k in (0, 2, 4)], 0.06, lambda f: V(f / 2, 0.3)), at=te, gain=-10, width=1)
    if main != "debuff" and "debuff" in extra:
        m.add(tone((N(2, 0), N(0, 0) * 0.8), 0.3, harm=(1.0, 0.5, 0.3)) * env_ad(0.3, 0.004, 0.1), at=te, gain=-9, width=1)
    if main != "dmg" and names & {"scorch", "detonate"}:
        m.add(sizzle(0.3, 80), at=te, gain=-9, width=1)
    if main != "trick" and "trick" in extra and names & {"draw"}:
        m.add(card_slide(0.12), at=te + 0.1, gain=-9)
    # 등급 장식
    if c["grade"] in ("rare", "epic", "unique", "special"):
        m.add(sw(twinkle(0.5, 10, 2800, 8000, 0.06), 0.1, 1, 1.4), at=end - 0.55, gain=-14, width=1)
    if fancy:
        ch = mixa(V(N(0, 0), 0.9), (V(N(2, 0), 0.9), -3), (V(N(4, 0), 0.9), -5))
        m.add(ch, at=max(0.2, end - 0.75), gain=-9, width=1)
        m.add(punch(120, 45, 0.14, 2.6), at=max(0.2, end - 0.75), gain=-9)
        m.add(W.warm_chord(el, 1.1, el not in ("dark", "fire"), 0.04), at=max(0.2, end - 0.75), gain=-8, width=1)
        m.add(W.sub_boom(W.SUBF[el] * 0.9, 0.9, 0.8, drop=1.6), at=max(0.2, end - 0.75), gain=-7)
        end += 0.35
    room(m, rt=0.7 + 0.8 * s, mix=0.16 + 0.08 * s, damp=7000)   # 2026-11-24 더 넓은 방(높은 쪽은 덜 울리게)
    ln = min(end + 0.35, 2.8)
    L, F = n_(ln), n_(0.45)   # 긴 꼬리가 끝에서 뚝 잘리지 않게 마지막 0.45초를 천천히 줄인다
    if m.buf.shape[1] > L - F:
        m.buf = m.buf[:, :L].copy()
        k = m.buf.shape[1] - (L - F)
        m.buf[:, L - F:] *= np.cos(np.linspace(0, np.pi / 2, F))[:k] ** 2
    return finish(m.buf, crest=13.5, max_len=ln, tail_db=-54, hpf=32, air_db=0.5)


# ══ 아이템 장착 ══════════════════════════════════════════
def item_equip(c):
    el, s = c["el"], weight(c, 6.0)
    it = c.get("item") or {}
    icon = it.get("icon") or "rune"
    fancy = c["grade"] in FANCY
    m = Mix(2.0)
    N = lambda i, o=0: E.note(el, i, o)   # noqa: E731
    V = lambda f, d=0.4: E.voice(el, f, d)   # noqa: E731
    t_el = 0.2
    if icon in ("sword", "dagger", "axe", "spear"):
        f0 = {"sword": 2700, "dagger": 3600, "axe": 2200, "spear": 3000}[icon] * U(0.93, 1.07)
        d = {"sword": 0.3, "dagger": 0.18, "axe": 0.24, "spear": 0.22}[icon]
        sh = shing(d, f0, 5, 0.09) * swell(d, 0.25, 1, 1.3)
        dr = sweep(noise(d), (1500, 7000), 3.0) * swell(d, 0.8, 1.5, 1)
        m.add(norm(dr), gain=-8)
        m.add(norm(sh), at=0.02, gain=-3, width=1)
        if icon in ("axe", "spear"):
            m.add(knock(360 if icon == "axe" else 520, 0.03, 0.8), at=d * 0.2, gain=-3)
        m.add(seq((0, knock(430, 0.02, 0.6), 0), (0, clink(U(1700, 2300), 0.04), -4), (0, punch(170, 80, 0.035), -6)), at=d + 0.03, gain=-2)
        t_el = d + 0.05
    elif icon == "bow":
        m.add(creak(0.22, 210), gain=-5)
        m.add(twang(0.2), at=0.23, gain=-2)
        m.add(knock(600, 0.018, 0.8), at=0.23, gain=-6)
        t_el = 0.27
    elif icon in ("shield", "armor"):
        m.add(seq((0, slap(0.08, 400, 3000, 0.025), -4), (0.0, knock(300, 0.03, 0.6), -3)), gain=-3)
        m.add(seq((0, snap(0.025, 1800, 11000, 0.004), -4), (0, clang(560 if icon == "shield" else 700, 0.2, 0.62, 6), 0), (0, punch(160, 70, 0.05, 2.0), -3)), at=0.13, gain=-1)
        m.add(seq((0, clink(2100, 0.03), 0), (0.07, clink(2500, 0.03), -3)), at=0.3, gain=-9, pan=0.3)
        t_el = 0.3
    elif icon == "staff":
        m.add(wood_hit(0.4), gain=-3)
        m.add(sw(E.wash(el, 0.5, s), 0.3, 1, 1.5), at=0.05, gain=-9, width=1)
        t_el = 0.12
    elif icon == "orb":
        f = N(0, 1) * 2
        m.add(glass_ping(f, 0.3), gain=-4, width=1)
        m.add(glass_ping(f * 1.5, 0.25), at=0.06, gain=-7, width=1)
        m.add(sw(E.wash(el, 0.55, s), 0.35, 1, 1.5), at=0.03, gain=-10, width=1)
        t_el = 0.14
    elif icon == "book":
        m.add(card_slide(0.16, 1200, 3600), gain=-4)
        m.add(seq((0, card_flick(0.05), 0), (0, knock(240, 0.03, 0.5), -2)), at=0.17, gain=-3)
        t_el = 0.22
    elif icon in ("holy", "seal"):
        if icon == "seal":
            m.add(seq((0, knock(260, 0.03, 0.6), 0), (0, punch(160, 75, 0.05, 2.0), -2), (0, snap(0.02, 1500, 9000, 0.003), -6)), gain=-2)
        m.add(chime(N(0, 2), 0.4), at=0.08 if icon == "seal" else 0, gain=-4, width=1)
        m.add(chime(N(2, 2), 0.32), at=0.16 if icon == "seal" else 0.08, gain=-7, width=1)
        m.add(sw(twinkle(0.4, 8, 3000, 8000, 0.05), 0.15, 1, 1.4), at=0.1, gain=-13, width=1)
        t_el = 0.2
    else:   # rune — 새기는 소리 + 빛이 드는 소리
        for i in range(3):
            dd = U(0.05, 0.08)
            m.add(norm(sweep(noise(dd), (U(2500, 3500), U(5000, 7000)), 2.5)) * ar(dd, dd * 0.3), at=0.0 + i * 0.075, gain=-6, pan=U(-0.3, 0.3))
            m.add(knock(U(700, 1000), 0.008, 0.9), at=i * 0.075, gain=-10)
        t_el = 0.26
    # 원소의 음: 두 음이 올라가며 깃든다
    m.add(V(N(0, 0), 0.45), at=t_el, gain=-6, width=1)
    m.add(V(N(2, 0), 0.5), at=t_el + 0.09, gain=-6, width=1)
    m.add(E.tint(el, s), at=t_el + 0.02, gain=-11, width=1)
    if c["grade"] in ("rare", "epic", "unique", "special"):
        m.add(sw(twinkle(0.4, 8, 2800, 8000, 0.05), 0.1, 1, 1.4), at=t_el + 0.1, gain=-14, width=1)
    if fancy:
        m.add(V(N(4, 0), 0.7), at=t_el + 0.18, gain=-7, width=1)
        m.add(punch(120, 45, 0.12, 2.5), at=t_el + 0.18, gain=-10)
    room(m, rt=0.4 + 0.3 * s, mix=0.13, damp=10000)
    return finish(m.buf, crest=13.5, max_len=t_el + 0.75 + (0.3 if fancy else 0), tail_db=-52)


# ══ 카드만의 마법 소리 (틀로는 성격이 안 나는 마법 — notes/<깃발>.json 의 cast 글을 손으로 옮김) ══
def _fade_end(m, ln, f=0.45):
    L, F = n_(ln), n_(f)
    m.buf = m.buf[:, :L].copy()
    if m.buf.shape[1] > L - F:
        k = m.buf.shape[1] - (L - F)
        m.buf[:, L - F:] *= np.cos(np.linspace(0, np.pi / 2, F))[:k] ** 2
    return m


def cast_rising_swell(c):
    """SG3-07 밀려드는 너울 (2026-11-24): 먼바다에서 낮게 구르며 너울이 모임 → 크고 어두운 물덩이로 솟음 →
    앞줄을 무겁게 덮침 → 되밀리는 물살이 조약돌을 끌며 뒤로 밀어냄(쏴아 길게) + 아군에게 [너울]이 실리는 짧은 오름."""
    el, N = "water", lambda i, o=0: E.note("water", i, o)   # noqa: E731
    m = Mix(3.0)
    m.add(card_flick(0.05), gain=-12)
    m.add(W.rumble(0.85, 0.6, 55, 300, 3.5, a=0.5), gain=-6, width=1)        # 먼바다의 낮은 구름
    m.add(W.deep_surge(0.9, 0.7) * ((tt(0.9) / 0.9) ** 1.4), gain=-4, width=1)   # 아래에서 부풀어 오르는 물덩이
    m.add(wave(0.8, 0.7, 0.92), at=0.05, gain=-9, width=1)                   # 솟는 물마루(끝에서 가장 큼)
    t0 = 0.82                                                                 # 덮치는 순간
    m.add(splash(0.85), at=t0, gain=0, pan=-0.1)
    m.add(W.sub_boom(42, 1.1, 0.8, drop=2.2), at=t0, gain=-1)
    m.add(punch(150, 55, 0.11, 2.4), at=t0, gain=-4)
    m.add(W.deep_surge(1.3, 0.8), at=t0 + 0.02, gain=-6, width=1)
    # 되밀리는 물살: 왼쪽 → 오른쪽(뒤)으로 끌려가는 조약돌 · 쏴아 하는 거품
    for i in range(3):
        m.add(rubble(0.4, 12, 600, 2600) * swell(0.4, 0.3, 1, 1.6), at=t0 + 0.22 + 0.13 * i, gain=-12 - i, pan=-0.5 + 0.5 * i)
    m.add(W.rumble(0.9, 0.6, 60, 380, 4, a=0.15), at=t0 + 0.18, gain=-8, pan=0.35)
    m.add(sw(hp(noise(1.1, "pink"), 1800) * env_ad(1.1, 0.12, 0.35), 0.25, 1.4, 1.6), at=t0 + 0.15, gain=-17, width=1)
    m.add(bubbles(0.8, 14, 400, 2000), at=t0 + 0.12, gain=-12, width=1)
    # 아군에게 [너울]이 실림: 물빛 음 셋이 오름
    m.add(arp([E.SIG[el][0] + E.SIG[el][1][k] for k in (0, 2, 4)], 0.09, lambda f: E.voice(el, f, 0.35)), at=t0 + 0.45, gain=-11, width=1)
    m.add(W.warm_chord(el, 1.2, True, 0.05), at=t0 + 0.4, gain=-11, width=1)
    room(m, rt=1.2, mix=0.2, damp=6500)
    _fade_end(m, 2.5)
    return finish(m.buf, crest=13.5, max_len=2.5, tail_db=-54, hpf=32, air_db=0.5)


def cast_tide_song(c):
    """SG3-08 물때의 노래 (2026-11-24): 무녀들의 낮고 고요한 노래 위로 바다가 천천히 숨 쉰다 —
    밀물은 따뜻하게 오르는 화음과 함께 차오르고(공격 +), 썰물은 깊게 울리는 한숨으로 빠진다(방어 +). 달빛처럼 고르게, 끝은 은은한 물결."""
    el = "water"
    m = Mix(3.2)
    m.add(card_flick(0.05), gain=-12)
    f = hz(41)   # 무녀의 낮은 노래(F2 언저리)
    chant = choir(f * 2, 2.3, 0.35) * swell(2.3, 0.4, 1.3, 1.6)
    m.add(lp(chant, 1600), at=0.04, gain=-7, width=1)
    m.add(lp(choir(f * 3, 2.1, 0.45), 1700) * swell(2.1, 0.45, 1.3, 1.6), at=0.12, gain=-12, width=1)   # 5도 위 한 목소리
    # 밀물: 물결이 차오르며 화음이 오른다
    m.add(W.deep_surge(1.1, 0.5, 58) * swell(1.1, 0.7, 1.6, 1.3), at=0.0, gain=-9, width=1)
    m.add(wave(1.0, 0.45, 0.7), at=0.05, gain=-12, width=1)
    for i, k in enumerate((0, 1, 2, 4)):
        m.add(E.voice(el, E.note(el, k, 0), 0.45), at=0.2 + 0.13 * i, gain=-9 + 0.6 * i, pan=-0.35 + 0.23 * i, width=1)
    m.add(W.warm_chord(el, 1.2, True, 0.25), at=0.15, gain=-6, width=1)
    t1 = 1.05   # 썰물: 깊은 한숨
    m.add(W.gong_hum(E.note(el, 0, -1), 1.5, 0.6), at=t1, gain=-6, width=1)
    m.add(W.sub_boom(52, 0.9, 0.5, drop=1.4), at=t1, gain=-12)
    m.add(norm(sweep(noise(1.0, "pink"), (1400, 220), 0.9, "lp")) * swell(1.0, 0.2, 1, 1.6), at=t1, gain=-9, width=1)   # 쓸려 내려가는 물
    m.add(rubble(0.6, 10, 500, 2000) * swell(0.6, 0.3, 1, 1.6), at=t1 + 0.1, gain=-16, pan=0.3)
    for i, k in enumerate((4, 2, 1, 0)):
        m.add(E.voice(el, E.note(el, k, -1), 0.5), at=t1 + 0.08 + 0.14 * i, gain=-10, pan=0.35 - 0.23 * i, width=1)
    m.add(sw(twinkle(0.8, 8, 2500, 6500, 0.08), 0.5, 1.2, 1.5), at=t1 + 0.5, gain=-18, width=1)   # 달빛 물결이 은은하게
    room(m, rt=1.3, mix=0.22, damp=6000)
    _fade_end(m, 2.6, 0.6)
    return finish(m.buf, crest=13.0, max_len=2.6, tail_db=-54, hpf=32, air_db=0.5)


CAST_OWN = {"SG3-07": cast_rising_swell, "SG3-08": cast_tide_song}


def render_card(c, part):
    if part == "atk":
        return unit_atk(c)
    if part == "def":
        return unit_def(c)
    if part == "cast":
        return CAST_OWN[c["id"]](c) if c["id"] in CAST_OWN else spell_cast(c)
    return item_equip(c)
