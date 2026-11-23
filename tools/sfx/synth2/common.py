"""ETHERION 효과음 v2 — 전장 공용 소리 (카드 다루기 · 흐름 · 전투 능력).

키마다 손으로 짠 레시피. 각 함수는 Mix 를 돌려주고, 끝의 dict 는 finish() 옵션.
메뉴 · 상점 · 보상 · 미니게임 소리는 아직 v1(tools/sfx/synth/) 것을 쓴다.
"""
import elements as E
from kit import *  # noqa: F401,F403

R = {}


def recipe(key, **opt):
    def deco(fn):
        R[key] = (fn, opt)
        return fn
    return deco


def M(d=1.0):
    return Mix(d)


def blip(f0, f1, d=0.09, tau=0.035, harm=(1.0, 0.3, 0.1)):
    """짧은 맑은 음(올라가거나 내려가는)."""
    return tone((f0, f1), d, harm=harm) * env_ad(d, 0.002, tau)


# ══ 카드 다루기 ══════════════════════════════════════════
@recipe("select", peak_db=-4, crest=None, max_len=0.22)
def _():
    m = M(0.3)   # 카드를 집는 '착' + 살짝 올라가는 맑은 음
    m.add(card_flick(0.05, 2400), gain=-3)
    m.add(knock(520, 0.012, 0.8), gain=-7)
    m.add(blip(hz(88), hz(93), 0.12, 0.04), at=0.004, gain=-6, width=1)
    m.add(glass_ping(hz(100), 0.045), at=0.03, gain=-13, width=1)
    return room(m, 0.15, 0.06)


@recipe("unselect", peak_db=-6, crest=None, max_len=0.2)
def _():
    m = M(0.3)   # 내려놓는 '톡' + 내려가는 음
    m.add(card_flick(0.04, 1900), gain=-5)
    m.add(knock(400, 0.014, 0.6), gain=-5)
    m.add(blip(hz(90), hz(83), 0.1, 0.035), at=0.004, gain=-9, width=1)
    return room(m, 0.12, 0.05)


@recipe("pick", peak_db=-4, crest=None, max_len=0.22)
def _():
    m = M(0.3)   # 카드를 들어 올리는 '스윽'
    m.add(card_slide(0.11, 1100, 3600), gain=-3)
    m.add(card_flick(0.04, 2800), at=0.0, gain=-8)
    m.add(blip(hz(86), hz(91), 0.08, 0.03), at=0.03, gain=-14, width=1)
    return room(m, 0.12, 0.05)


@recipe("hover", peak_db=-9, crest=None, max_len=0.1)
def _():
    m = M(0.15)   # 놓을 칸에 닿았다 — 아주 작은 '틱'
    m.add(knock(950, 0.007, 1.0), gain=0)
    m.add(glass_ping(hz(96), 0.02), gain=-9, width=1)
    m.add(snap(0.01, 2500, 9000, 0.002), gain=-10)
    return m


@recipe("handHover", peak_db=-10, crest=None, max_len=0.09)
def _():
    m = M(0.12)   # 핸드의 카드 사이를 넘어갈 때 — 종이 '칙'
    m.add(card_flick(0.035, U(2200, 3000)), gain=0)
    m.add(knock(700, 0.006, 0.6), gain=-9)
    return m


@recipe("back", peak_db=-6, crest=None, max_len=0.3)
def _():
    m = M(0.4)   # 제자리로 미끄러져 돌아감
    m.add(card_slide(0.16, 3400, 1000), gain=-3)
    m.add(card_tap(230, 0.2), at=0.15, gain=-5)
    m.add(blip(hz(84), hz(79), 0.09, 0.03), at=0.15, gain=-14)
    return room(m, 0.12, 0.05)


@recipe("place", peak_db=-2.5, max_len=0.4)
def _():
    m = M(0.5)   # 유닛을 판에 '탁' 내려놓는다 — 단단하고 기분 좋게
    m.add(card_slide(0.06, 3000, 1600), gain=-10)
    m.add(card_tap(250, 0.5), at=0.05, gain=0)
    m.add(knock(500, 0.02, 0.9), at=0.05, gain=-6)
    m.add(slap(0.07, 600, 5000, 0.018), at=0.052, gain=-8, width=1)
    m.add(glass_ping(hz(91), 0.05), at=0.06, gain=-17, width=1)
    return room(m, 0.2, 0.08)


@recipe("spell_set", peak_db=-4, max_len=0.5)
def _():
    m = M(0.6)   # 마법을 뒷면으로 놓는다 — 조용한 '탁' + 숨은 기운
    m.add(card_slide(0.06, 2600, 1500), gain=-11)
    m.add(card_tap(210, 0.3), at=0.05, gain=-2)
    m.add(pad(hz(62), 0.35, 0.05, 0.5), at=0.06, gain=-10, width=1)
    m.add(pad(hz(69), 0.35, 0.05, 0.5), at=0.06, gain=-12, width=1)
    m.add(sw(twinkle(0.25, 5, 3000, 7000, 0.04), 0.2, 1, 1.5), at=0.08, gain=-16, width=1)
    return room(m, 0.3, 0.1)


@recipe("sp_reveal", peak_db=-2.5, max_len=0.7)
def _():
    m = M(0.9)   # 마법 카드가 뒤집혀 발동 — 휙 + 환한 화음 (카드 소리가 없을 때)
    m.add(whoosh(0.12, 1200, 6000, 2500, 1.8, 0.6, 0.5), gain=-6)
    m.add(card_flick(0.05), at=0.09, gain=-5)
    for i, n in enumerate((74, 78, 81, 86)):
        m.add(chime(hz(n), 0.22), at=0.1 + 0.035 * i, gain=-5, pan=-0.3 + 0.2 * i, width=1)
    m.add(riser(0.12, 500, 1500, 0.3), gain=-12, width=1)
    m.add(sw(twinkle(0.35, 9, 3000, 8500, 0.05), 0.1, 1, 1.4), at=0.14, gain=-12, width=1)
    return room(m, 0.45, 0.14)


@recipe("move", peak_db=-6, crest=None, max_len=0.32)
def _():
    m = M(0.4)   # 전장에서 자리를 바꿈 — 부드러운 '스윽 · 톡' (쇳소리 없음)
    m.add(card_slide(0.17, 1500, 3800), gain=-3)
    m.add(card_tap(240, 0.2), at=0.17, gain=-5)
    return room(m, 0.15, 0.06)


@recipe("draw", peak_db=-4, crest=None, max_len=0.3)
def _():
    m = M(0.4)   # 덱에서 한 장 '스륵 · 착'
    m.add(card_slide(0.13, 1200, 3800), gain=-3)
    m.add(card_flick(0.05, 2700), at=0.12, gain=-3)
    m.add(knock(450, 0.012, 0.6), at=0.12, gain=-10)
    return room(m, 0.15, 0.06)


@recipe("shuffle", peak_db=-3, max_len=1.0)
def _():
    m = M(1.2)   # 리플 셔플: 촤르르륵 + 가지런히 '탁탁'
    for half in (0, 1):
        t0 = 0.02 + half * 0.36
        cnt = 22
        for i in range(cnt):
            u = i / cnt
            m.add(card_flick(0.03, U(2000, 3400)), at=t0 + 0.26 * u ** 0.85, gain=-6 + 3 * u + U(-1.5, 0), pan=U(-0.4, 0.4))
        m.add(card_slide(0.26, 1500, 4200), at=t0, gain=-12, width=1)
    m.add(card_tap(260, 0.3), at=0.74, gain=-3)
    m.add(card_tap(280, 0.2), at=0.84, gain=-6)
    return room(m, 0.2, 0.07)


@recipe("mulligan", peak_db=-3, max_len=0.85)
def _():
    m = M(1.0)   # 핸드를 쓸어 보내고 새 카드를 받는다
    m.add(card_slide(0.2, 3600, 1000), gain=-3, pan=-0.3)
    for i in range(4):
        m.add(card_flick(0.04, U(2200, 3200)), at=0.32 + 0.085 * i, gain=-4, pan=-0.45 + 0.3 * i)
        m.add(card_slide(0.07, 1200, 3600), at=0.27 + 0.085 * i, gain=-9, pan=-0.45 + 0.3 * i)
    m.add(blip(hz(81), hz(86), 0.1, 0.04), at=0.66, gain=-12, width=1)
    return room(m, 0.2, 0.07)


@recipe("equip", peak_db=-3, max_len=0.6)
def _():
    m = M(0.8)   # 아이템 장착(그 아이템 소리가 없을 때): 가죽 끈 + 쇠 '철컥'
    m.add(slap(0.09, 400, 3000, 0.028), gain=-5)
    m.add(knock(330, 0.03, 0.7), gain=-4)
    m.add(seq((0, snap(0.025, 1800, 11000, 0.004), -3), (0, clang(640, 0.16, 0.6, 6), 0), (0, punch(170, 75, 0.045, 1.9), -4)), at=0.14, gain=-1)
    m.add(clink(2200, 0.035), at=0.27, gain=-10, pan=0.3)
    m.add(chime(hz(86), 0.14), at=0.16, gain=-14, width=1)
    return room(m, 0.3, 0.1)


@recipe("crystal", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # 결정화: 얼어붙듯 '짜자작' 올라가는 수정 음 — 짧게 잦아든다
    ns = (74, 78, 81, 86, 90, 93)
    for i, n in enumerate(ns):
        t = 0.02 + 0.3 * (i / len(ns)) ** 0.8
        m.add(glass_ping(hz(n), 0.07), at=t, gain=-5 + 0.5 * i, pan=U(-0.5, 0.5), width=1)
        m.add(snap(0.012, 3000, 12000, 0.002), at=t, gain=-10, pan=U(-0.5, 0.5))
    m.add(riser(0.32, 700, 2200, 0.4), gain=-13, width=1)
    m.add(glass_ping(hz(93), 0.16), at=0.34, gain=-6, width=1)
    m.add(sw(twinkle(0.3, 8, 3500, 9000, 0.04), 0.1, 1, 1.5), at=0.34, gain=-13, width=1)
    return room(m, 0.35, 0.12)


@recipe("burn", peak_db=-3, max_len=0.8)
def _():
    m = M(1.0)   # 소각: 불이 '화륵' 붙어 종이가 탄다
    m.add(fire_burst(0.35), gain=0)
    m.add(sizzle(0.45, 90), at=0.05, gain=-7, width=1)
    m.add(rustle(0.3, 30, 2000, 8000), at=0.1, gain=-13)
    return room(m, 0.3, 0.1)


@recipe("ether_gain", peak_db=-4, max_len=0.65)
def _():
    m = M(0.9)   # 에테르가 차오른다 — 맑게 올라가는 세 음
    m.add(riser(0.3, 400, 1300, 0.25), gain=-12, width=1)
    for i, n in enumerate((74, 79, 86)):
        m.add(glass_ping(hz(n), 0.13), at=0.05 + 0.085 * i, gain=-5, pan=-0.3 + 0.3 * i, width=1)
        m.add(pad(hz(n - 12), 0.25, 0.02, 0.5), at=0.05 + 0.085 * i, gain=-12, width=1)
    m.add(sw(twinkle(0.3, 7, 3500, 9000, 0.04, rise=0.4), 0.2, 1, 1.5), at=0.15, gain=-14, width=1)
    return room(m, 0.35, 0.12)


@recipe("upkeep", peak_db=-5, max_len=0.5)
def _():
    m = M(0.7)   # 유지비로 에테르가 빠진다 — 내려가는 두 음
    for i, n in enumerate((81, 74)):
        m.add(glass_ping(hz(n), 0.1), at=0.02 + 0.1 * i, gain=-5, width=1)
        m.add(pad(hz(n - 12), 0.22, 0.02, 0.4), at=0.02 + 0.1 * i, gain=-10, width=1)
    m.add(norm(sweep(noise(0.25), (3500, 700), 1.6)) * ar(0.25, 0.03), at=0.03, gain=-13, width=1)
    return room(m, 0.25, 0.1)


@recipe("upkeep_burn", peak_db=-3, max_len=0.85)
def _():
    m = M(1.0)   # 유지비가 모자라 유닛이 탄다 — 낮게 꺼지는 음 + 불
    m.add(tone((hz(62), hz(50)), 0.3, harm=(1.0, 0.5, 0.3, 0.2)) * env_ad(0.3, 0.004, 0.1), gain=-4)
    m.add(punch(150, 60, 0.07, 2.2), gain=-4)
    m.add(fire_burst(0.4), at=0.12, gain=-1)
    m.add(sizzle(0.4, 80), at=0.18, gain=-8, width=1)
    return room(m, 0.3, 0.1)


# ══ 흐름 ═════════════════════════════════════════════════
def drum(f=95, s=0.5):
    return seq((0, punch(f * 1.7, f * 0.75, 0.09 + 0.05 * s, 2.4), 0), (0, knock(f * 2.4, 0.04, 0.6), -5), (0, slap(0.08, 500, 3500, 0.02), -8),
               (0, snap(0.02, 1500, 8000, 0.003), -8))


@recipe("banner_atk", peak_db=-3, max_len=0.85)
def _():
    m = M(1.2)   # 공격 준비: 북 + 뿔나팔이 5도 위로 + 칼 뽑는 얇은 싱(짧게)
    m.add(drum(100, 0.6), gain=-1)
    m.add(horn(hz(62), 0.2, 0.02), at=0.01, gain=-5, width=1)
    m.add(horn(hz(69), 0.42, 0.02), at=0.17, gain=-3, width=1)
    m.add(horn(hz(74), 0.42, 0.02), at=0.17, gain=-9, width=1)
    m.add(drum(120, 0.4), at=0.17, gain=-5)
    m.add(shing(0.14, 2900, 4, 0.05), at=0.17, gain=-15, width=1)
    return room(m, 0.45, 0.13)


@recipe("banner_def", peak_db=-3, max_len=0.85)
def _():
    m = M(1.2)   # 방어 준비: 방패를 '쿵' 세우고 낮은 뿔나팔 한 음
    m.add(drum(85, 0.8), gain=0)
    m.add(seq((0, snap(0.025, 1500, 9000, 0.004), -4), (0, clang(430, 0.22, 0.55, 6), 0)), at=0.005, gain=-6, width=1)
    m.add(horn(hz(62), 0.5, 0.04), at=0.03, gain=-5, width=1)
    m.add(horn(hz(57), 0.5, 0.04), at=0.03, gain=-8, width=1)
    m.add(drum(85, 0.6), at=0.2, gain=-6)
    return room(m, 0.45, 0.13)


@recipe("banner_foe", peak_db=-5, max_len=0.7)
def _():
    m = M(1.0)   # 상대 차례: 낮은 북 두 번 + 어두운 뿔 한 음 — 짧게
    m.add(drum(80, 0.6), gain=-2)
    m.add(drum(72, 0.6), at=0.16, gain=-4)
    m.add(horn(hz(58), 0.35, 0.04), at=0.02, gain=-7, width=1)
    m.add(horn(hz(59), 0.35, 0.04), at=0.02, gain=-12, width=1)
    return room(m, 0.3, 0.1)


@recipe("banner_combat", peak_db=-3, max_len=0.8)
def _():
    m = M(1.2)   # 전투: 북 '둥둥' + 칼이 맞부딪는 '챙'(짧게)
    m.add(drum(95, 0.7), gain=-1)
    m.add(drum(95, 0.7), at=0.13, gain=-3)
    m.add(seq((0, snap(0.03, 1800, 12000, 0.004), -2), (0, clang(820, 0.16, 0.66, 7), 0), (0.0, shing(0.12, 3100, 4, 0.045), -9)), at=0.27, gain=-2, width=1)
    m.add(drum(110, 0.8), at=0.27, gain=-2)
    return room(m, 0.4, 0.12)


@recipe("first_turn", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # 선공 · 후공 결정: 북 + 밝은 두 음
    m.add(drum(105, 0.5), gain=-2)
    m.add(chime(hz(81), 0.2), at=0.02, gain=-5, width=1)
    m.add(chime(hz(88), 0.3), at=0.15, gain=-4, width=1)
    m.add(pad(hz(69), 0.4, 0.02, 0.6), at=0.15, gain=-11, width=1)
    return room(m, 0.4, 0.12)


def _confirm(up, f=74):
    m = M(0.6)
    m.add(seq((0, snap(0.02, 1800, 10000, 0.003), -3), (0, knock(480, 0.016, 0.9), 0), (0, punch(190, 95, 0.03, 1.7), -4)), gain=-2)
    a, b = (f, f + 7) if up else (f, f - 5)
    m.add(mixa(chime(hz(a), 0.09), (pad(hz(a - 12), 0.14, 0.004, 0.6), -6)), at=0.012, gain=-6, width=1)
    m.add(mixa(chime(hz(b), 0.16), (pad(hz(b - 12), 0.22, 0.004, 0.6), -6)), at=0.085, gain=-5, width=1)
    return room(m, 0.25, 0.09)


@recipe("confirm_atk", peak_db=-4, max_len=0.42)
def _():
    m = _confirm(True, 81)   # 공격 완료: 딸깍 + 5도 위로 '따-딴'
    m.add(whoosh(0.1, 1500, 5500, 2500, 2.0, 0.6, 0.5), at=0.06, gain=-14, width=1)
    return m


@recipe("confirm_def", peak_db=-4, max_len=0.42)
def _():
    return _confirm(False, 79)   # 방어 완료: 딸깍 + 4도 아래로 단단하게


@recipe("confirm_ready", peak_db=-4, max_len=0.5)
def _():
    m = M(0.7)   # 준비 완료: 딸깍 + 장3화음
    m.add(seq((0, snap(0.02, 1800, 10000, 0.003), -3), (0, knock(480, 0.016, 0.9), 0), (0, punch(190, 95, 0.03, 1.7), -4)), gain=-2)
    for i, n in enumerate((79, 83, 86)):
        m.add(mixa(chime(hz(n), 0.16), (pad(hz(n - 12), 0.2, 0.004, 0.6), -6)), at=0.012 + 0.055 * i, gain=-6, pan=-0.2 + 0.2 * i, width=1)
    return room(m, 0.3, 0.1)


def coin_spin(d, r0=26.0, r1=17.0, f=1760.0, decay=0.6):
    """코인이 공중에서 도는 소리: 면이 바람을 가르는 '파라라락' + 면이 번쩍일 때마다 아주 짧은 두 음의 '티 · 팅'.
    한 음에 몰려 쨍하지 않게 바람은 1~6 kHz 에 넓게, '팅'은 0.015초 안에 잦아든다."""
    n = n_(d)
    t = np.arange(n) / SR
    rate = np.geomspace(r0, r1, n)
    ph = 2 * np.pi * np.cumsum(rate) / SR
    am = np.clip(np.sin(ph), 0, 1) ** 1.4
    wind = norm(bp(noise(d), 1000, 6000)) * am + norm(bp(noise(d), 400, 1200)) * am * 0.5
    out = wind * 0.8
    k = 0
    for i in np.nonzero((np.sin(ph[1:]) > 0.98) & (np.sin(ph[:-1]) <= 0.98))[0]:
        ff = f * (1.0 if k % 2 == 0 else 1.189)
        g = modal(0.08, [(ff, 0.015, 1.0), (ff * 1.5, 0.01, 0.4), (ff * 2.37, 0.006, 0.2)], a=0.0005)
        m_ = min(len(g), n - i)
        out[i:i + m_] += g[:m_] * 0.4
        k += 1
    return out * np.exp(-t / (d * decay)) * np.clip(t / 0.01, 0, 1)


def coin_toss(f=1760.0):
    """엄지로 튕기는 '틱 · 팅' — 손톱이 닿는 소리 + 짧은 맑은 음."""
    return seq((0, snap(0.02, 2000, 11000, 0.003), -2), (0, knock(820, 0.012, 0.9), -3),
               (0, modal(0.3, [(f, 0.06, 1.0), (f * 1.5, 0.045, 0.5), (f * 2.37, 0.025, 0.25), (f * 0.5, 0.03, 0.25)], a=0.0004), 0))


@recipe("coin_flip", peak_db=-4, crest=None, max_len=0.85)
def _():
    m = M(1.0)   # 코인을 던진다: '팅' 하고 튕긴 뒤 파라라락 돈다
    m.add(coin_toss(1760), gain=-3, width=1)
    m.add(whoosh(0.12, 800, 3500, 1500, 1.5, 0.4, 0.3), gain=-9)
    m.add(coin_spin(0.72, 27, 17, 1760), at=0.03, gain=0, width=1)
    return room(m, 0.25, 0.08)


@recipe("coin_reflip", peak_db=-4, crest=None, max_len=0.7)
def _():
    m = M(0.9)   # 다시 던지기: 더 빠르고 한 음 높게
    m.add(blip(hz(81), hz(88), 0.08, 0.03), gain=-9, width=1)
    m.add(coin_toss(1976), gain=-3, width=1)
    m.add(coin_spin(0.58, 32, 20, 1976), at=0.03, gain=0, width=1)
    return room(m, 0.25, 0.08)


@recipe("shield_coin", peak_db=-4, crest=None, max_len=0.95)
def _():
    m = M(1.1)   # 보호막 코인: 코인이 도는 소리 + 보호막의 맑은 떨림
    m.add(coin_toss(1568), gain=-3, width=1)
    m.add(coin_spin(0.85, 24, 14, 1568, 0.75), at=0.03, gain=0, width=1)
    m.add(tone(hz(79), 0.85, harm=(1.0, 0.4, 0.2), vib=0.004, vibf=6, det=0.004) * swell(0.85, 0.6, 1.5, 1.2), at=0.03, gain=-13, width=1)
    return room(m, 0.3, 0.1)


@recipe("coinHeads", peak_db=-3, max_len=0.6)
def _():
    m = M(0.9)   # 앞면: 탁 내려앉으며 밝은 '챠링'(5도 화음) — 울림은 0.25초 안쪽
    m.add(seq((0, snap(0.02, 2200, 12000, 0.003), -3), (0, knock(560, 0.012, 0.9), -3), (0, punch(200, 100, 0.03, 1.6), -6)), gain=-1)
    f = hz(88)   # E6
    m.add(modal(0.5, [(f, 0.16, 1.0), (f * 1.5, 0.13, 0.7), (f * 2.0, 0.09, 0.45), (f * 3.0, 0.05, 0.22), (f * 1.004, 0.16, 0.4)], a=0.0005), at=0.004, gain=-2, width=1)
    m.add(modal(0.4, [(f * 2.52, 0.04, 1.0), (f * 3.36, 0.03, 0.5)], a=0.0004), at=0.004, gain=-12, width=1)
    for i, tt_ in enumerate((0.07, 0.125, 0.165, 0.195, 0.215)):   # 가장자리가 떨며 가라앉는다
        m.add(mixa(knock(650, 0.006, 0.9), (clink(f * 1.5, 0.012), -6)), at=tt_, gain=-12 - 2 * i, pan=U(-0.3, 0.3))
    m.add(sw(twinkle(0.25, 6, 4000, 9000, 0.035), 0.1, 1, 1.5), at=0.03, gain=-15, width=1)
    return room(m, 0.3, 0.1)


@recipe("coinTails", peak_db=-5, max_len=0.4)
def _():
    m = M(0.6)   # 뒷면: 낮고 마른 '톡' — 울림 없이 내려앉는다
    m.add(seq((0, snap(0.02, 1500, 8000, 0.003), -5), (0, knock(380, 0.02, 0.7), 0), (0, punch(170, 85, 0.035, 1.8), -3)), gain=-1)
    f = hz(76)
    m.add(modal(0.2, [(f, 0.045, 1.0), (f * 1.42, 0.03, 0.5), (f * 2.3, 0.018, 0.25)], a=0.0005), at=0.004, gain=-7, width=1)
    for i, tt_ in enumerate((0.075, 0.125, 0.155)):
        m.add(knock(430, 0.007, 0.7), at=tt_, gain=-13 - 3 * i, pan=U(-0.3, 0.3))
    m.add(blip(hz(74), hz(69), 0.1, 0.035), at=0.01, gain=-13, width=1)
    return room(m, 0.18, 0.07)


def crack_ticks(d=0.15, n=7, lo=2500, hi=7000):
    return grains(d, n, lambda i: mixa(snap(0.012, 2500, 12000, 0.002), glass_ping(U(lo, hi), 0.018) * 0.6), decay_rate=0.9)


@recipe("life_hit", peak_db=-2, max_len=0.85)
def _():
    m = M(1.1)   # 심장석이 깎인다: 무거운 '쿵' + 수정에 금이 가는 소리 + 낮게 꺼지는 음
    m.add(seq((0, snap(0.035, 1500, 11000, 0.005), -2), (0, punch(150, 45, 0.11, 2.8), 0), (0, knock(260, 0.04, 0.6), -4), (0, slap(0.12, 300, 3200, 0.04), -5)), gain=0)
    m.add(crack_ticks(0.2, 10), at=0.02, gain=-4, width=1)
    m.add(glass_ping(hz(81), 0.1), at=0.01, gain=-9, width=1)
    m.add(tone((hz(57), hz(45)), 0.45, harm=(1.0, 0.6, 0.4, 0.25)) * env_ad(0.45, 0.004, 0.14), at=0.01, gain=-5, width=1)
    return room(m, 0.4, 0.12)


@recipe("life_heal", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # 생명 회복: 따뜻하게 올라가는 화음
    for i, n in enumerate((79, 83, 86, 91)):
        m.add(mixa(chime(hz(n), 0.2), (pad(hz(n - 12), 0.3, 0.02, 0.5), -5)), at=0.02 + 0.07 * i, gain=-5, pan=-0.3 + 0.2 * i, width=1)
    m.add(sw(twinkle(0.4, 9, 3200, 8500, 0.05, rise=0.4), 0.2, 1, 1.4), at=0.08, gain=-13, width=1)
    return room(m, 0.4, 0.13)


@recipe("life_low", peak_db=-3, max_len=1.25)
def _():
    m = M(1.5)   # 생명이 위험: 심장 박동 두 번 + 긴장된 낮은 음
    hb = lambda g: seq((0, punch(120, 50, 0.07, 2.6), g), (0, knock(190, 0.03, 0.4), g - 6), (0.13, punch(105, 48, 0.08, 2.6), g - 2), (0.13, knock(170, 0.03, 0.4), g - 8))   # noqa: E731
    m.add(hb(0), gain=0)
    m.add(hb(0), at=0.55, gain=-1)
    m.add(tone(hz(59), 1.1, harm=(1.0, 0.6, 0.45, 0.3), det=0.01) * swell(1.1, 0.5, 1, 1.2), gain=-10, width=1)
    m.add(tone(hz(60), 1.1, harm=(0.6, 0.5, 0.3)) * swell(1.1, 0.6, 1, 1.2), gain=-15, width=1)
    return room(m, 0.3, 0.08)


@recipe("deck_low", peak_db=-5, max_len=0.75)
def _():
    m = M(1.0)   # 덱이 얼마 안 남음: 카드 두 장 '착 착' + 텅 빈 낮은 톡 + 내려가는 음
    m.add(card_flick(0.04, 2600), gain=-4)
    m.add(card_flick(0.04, 2300), at=0.1, gain=-5)
    m.add(knock(210, 0.05, 0.4), at=0.2, gain=-2)
    m.add(blip(hz(74), hz(67), 0.25, 0.09), at=0.2, gain=-8, width=1)
    return room(m, 0.3, 0.1)


@recipe("surrender", peak_db=-4, max_len=0.85)
def _():
    m = M(1.1)   # 항복: 내려가는 뿔나팔 + 깃발이 떨어지는 '털썩'
    m.add(horn(hz(69), 0.22, 0.03), gain=-5, width=1)
    m.add(horn(hz(65), 0.22, 0.03), at=0.18, gain=-5, width=1)
    m.add(horn(hz(62), 0.4, 0.03), at=0.36, gain=-4, width=1)
    m.add(lp(slap(0.14, 250, 3000, 0.04), 3500), at=0.5, gain=-6)
    m.add(punch(140, 60, 0.07, 2.0), at=0.5, gain=-6)
    return room(m, 0.4, 0.12)


# ══ 전투 — 공용 타격 ═════════════════════════════════════
@recipe("swing", peak_db=-6, crest=None, max_len=0.3)
def _():
    m = M(0.4)   # 공격 유닛이 뛰쳐나감 — 시원한 '휙'
    m.add(whoosh(0.22, 500, 2800, 900, 1.3, 0.55, 0.22), gain=0, width=1)
    return m


@recipe("hit", peak_db=-2, max_len=0.42)
def _():
    m = M(0.6)   # 일반 타격
    m.add(smash(0.4), gain=0)
    m.add(slap(0.08, 800, 6000, 0.02), gain=-7, width=1)
    return room(m, 0.22, 0.09)


@recipe("crit", peak_db=-1.5, max_len=0.65)
def _():
    m = M(0.9)   # 치명타: 날카로운 '쫙' + 묵직한 몸통 + 번쩍이는 높은 음
    m.add(slash(0.6), gain=-1)
    m.add(smash(0.75), at=0.085, gain=0)
    m.add(glass_ping(hz(93), 0.07), at=0.085, gain=-9, width=1)
    m.add(glass_ping(hz(100), 0.05), at=0.11, gain=-12, width=1)
    m.add(air(0.2, 5000, 0.05), at=0.085, gain=-9, width=1)
    m.add(rubble(0.2, 8), at=0.11, gain=-13)
    return room(m, 0.3, 0.11)


@recipe("block", peak_db=-2.5, max_len=0.5)
def _():
    m = M(0.7)   # 막음(피해 0): 방패에 '깡' — 짧고 단단하게
    m.add(seq((0, snap(0.03, 1800, 12000, 0.004), -2), (0, clang(700, 0.17, 0.82, 8), 0), (0, punch(180, 75, 0.045, 2.0), -2), (0.004, knock(330, 0.03, 0.6), -6)), gain=0)
    m.add(clink(2300, 0.03), at=0.04, gain=-8, pan=0.3)
    return room(m, 0.25, 0.1)


@recipe("miss", peak_db=-6, crest=None, max_len=0.32)
def _():
    m = M(0.4)   # 빗나감: 허공을 가르는 바람
    m.add(whoosh(0.24, 2400, 3600, 600, 1.4, 0.25, 0.28), gain=0, width=1)
    return m


@recipe("shatter", peak_db=-2, max_len=0.85)
def _():
    m = M(1.1)   # 유닛 카드가 부서진다: '쩍' 갈라지고 조각이 흩어진다
    m.add(seq((0, snap(0.035, 1500, 12000, 0.005), 0), (0, punch(150, 55, 0.07, 2.4), -2), (0, knock(380, 0.03, 0.9), -3)), gain=0)
    m.add(crack_ticks(0.14, 9, 2000, 6000), at=0.005, gain=-2, width=1)
    def shard(_):
        f = U(1600, 6500)
        return modal(0.2, [(f, U(0.02, 0.06), 1.0), (f * 1.47, 0.02, 0.5), (f * 2.3, 0.012, 0.25)], a=0.0004)
    m.add(grains(0.5, 18, shard, decay_rate=1.3), at=0.04, gain=-6, width=1)
    m.add(rubble(0.4, 14, 800, 3500), at=0.05, gain=-9)
    return room(m, 0.35, 0.12)


# ══ 전투 — 능력 ══════════════════════════════════════════
@recipe("thorns", peak_db=-3, max_len=0.4)
def _():
    m = M(0.6)   # [가시]: 가시가 '탁탁탁' 박힌다
    for i in range(3):
        m.add(seq((0, snap(0.015, 3000, 12000, 0.002), -2), (0, knock(U(1300, 1800), 0.008, 1.0), 0), (0, punch(210, 110, 0.02), -6)), at=0.045 * i, gain=-1 * i, pan=-0.3 + 0.3 * i)
    m.add(rustle(0.18, 24), at=0.02, gain=-11, width=1)
    return room(m, 0.2, 0.08)


@recipe("guard", peak_db=-3, max_len=0.5)
def _():
    m = M(0.7)   # [수호]: 발을 디디며 방패를 든다
    m.add(seq((0, punch(140, 55, 0.07, 2.3), 0), (0, slap(0.1, 300, 3000, 0.03), -4)), gain=-1)
    m.add(seq((0, snap(0.025, 1800, 11000, 0.004), -3), (0, clang(520, 0.18, 0.6, 6), 0)), at=0.11, gain=-2, width=1)
    return room(m, 0.28, 0.1)


@recipe("pierce", peak_db=-2.5, max_len=0.5)
def _():
    m = M(0.7)   # [관통]: 찌르고 뚫고 나간다
    m.add(stab(0.5), gain=0)
    m.add(whoosh(0.16, 3000, 8000, 3500, 3.0, 0.3, 0.7), at=0.05, gain=-6, width=1)
    m.add(clink(2500, 0.03), at=0.07, gain=-11, pan=0.4)
    return room(m, 0.25, 0.1)


@recipe("chain", peak_db=-3, max_len=0.7)
def _():
    m = M(0.9)   # [연쇄]: 번개가 옆으로 옮겨 튄다
    for i in range(3):
        m.add(retune(zap(0.16, 0.3), 1 + 0.12 * i), at=0.13 * i, gain=-2 * i, pan=(-0.6, 0.0, 0.6)[i])
    return room(m, 0.3, 0.1)


def retune(x, r):
    n = max(8, int(len(x) / r))
    return np.interp(np.linspace(0, len(x) - 1, n), np.arange(len(x)), x)


@recipe("throw", peak_db=-3, max_len=0.6)
def _():
    m = M(0.8)   # [투척]: 빙글빙글 날아가 '탁'
    d = 0.28
    t = tt(d)
    w = whoosh(d, 900, 3800, 2200, 1.8, 0.7, 0.5) * (0.55 + 0.45 * np.sin(2 * np.pi * 21 * t))
    m.add(w, gain=-3, width=1)
    m.add(seq((0, snap(0.025, 2000, 11000, 0.004), -2), (0, knock(520, 0.022, 0.9), 0), (0, punch(180, 80, 0.04, 2.0), -3)), at=0.27, gain=0)
    return room(m, 0.25, 0.1)


@recipe("snipe", peak_db=-2.5, max_len=0.6)
def _():
    m = M(0.8)   # [사격]: 시위 · 방아쇠 '탁' → 날아가 꽂힌다
    m.add(twang(0.3), gain=-4)
    m.add(norm(sweep(noise(0.12), (7000, 3200), 8)) * ar(0.12, 0.08), at=0.03, gain=-9, width=1)
    m.add(arrow_hit(0.4), at=0.11, gain=0)
    return room(m, 0.25, 0.1)


@recipe("summon", peak_db=-3, max_len=1.0)
def _():
    m = M(1.3)   # 소환: 기운이 모여 '쿵' 하고 나타난다
    m.add(riser(0.42, 250, 1200, 0.5), gain=-5, width=1)
    m.add(sw(twinkle(0.4, 10, 2500, 8000, 0.04, rise=0.6), 0.9, 1.5, 1), gain=-11, width=1)
    m.add(seq((0, snap(0.03, 1500, 10000, 0.005), -3), (0, punch(150, 50, 0.1, 2.6), 0), (0, knock(280, 0.04, 0.6), -4)), at=0.42, gain=0)
    m.add(mixa(chime(hz(74), 0.3), (chime(hz(81), 0.25), -4), (pad(hz(62), 0.45, 0.01, 0.6), -5)), at=0.42, gain=-6, width=1)
    m.add(air(0.3, 5000, 0.08), at=0.42, gain=-10, width=1)
    return room(m, 0.45, 0.14)


@recipe("negate", peak_db=-3, max_len=0.75)
def _():
    m = M(1.0)   # [무효]: 빨려 들었다가 '탁' 끊긴다
    m.add(suck(0.26, 500, 6000), gain=-3, width=1)
    m.add(snap(0.04, 1500, 12000, 0.006), at=0.27, gain=0)
    m.add(tone((1900, 190), 0.2, harm=(1.0, 0.4, 0.2)) * env_ad(0.2, 0.001, 0.06), at=0.27, gain=-4)
    m.add(punch(160, 60, 0.07, 2.4), at=0.27, gain=-3)
    m.add(twinkle(0.22, 9, 1800, 7000, 0.025), at=0.29, gain=-10, width=1)
    return room(m, 0.3, 0.1)


@recipe("steal", peak_db=-4, max_len=0.5)
def _():
    m = M(0.7)   # 빼앗김: 재빨리 낚아채는 소리
    m.add(whoosh(0.14, 1500, 6500, 3000, 2.2, 0.7, 0.6), gain=-3, width=1)
    m.add(card_flick(0.05, 2800), at=0.12, gain=-3)
    m.add(blip(hz(79), hz(91), 0.12, 0.045), at=0.1, gain=-7, width=1)
    return room(m, 0.2, 0.08)


@recipe("buff", peak_db=-4, max_len=0.6)
def _():
    m = M(0.9)   # 강화: 올라가는 밝은 세 음
    for i, n in enumerate((81, 85, 88)):
        m.add(mixa(chime(hz(n), 0.14), (pad(hz(n - 12), 0.2, 0.004, 0.7), -5)), at=0.01 + 0.065 * i, gain=-4 + i, pan=-0.3 + 0.3 * i, width=1)
    m.add(riser(0.2, 500, 1600, 0.4), gain=-14, width=1)
    m.add(sw(twinkle(0.3, 7, 3500, 9000, 0.04, rise=0.4), 0.15, 1, 1.5), at=0.12, gain=-13, width=1)
    return room(m, 0.3, 0.11)


@recipe("debuff", peak_db=-4, max_len=0.6)
def _():
    m = M(0.9)   # 약화 · 저주: 가라앉는 어긋난 세 음
    for i, n in enumerate((70, 66, 63)):
        v = E.voice("dark", hz(n - 12), 0.3)
        m.add(v, at=0.01 + 0.08 * i, gain=-3, pan=0.3 - 0.3 * i, width=1)
    m.add(sw(whisper(0.4, 2300), 0.3, 1.5, 1.5), gain=-10, width=1)
    m.add(tone((hz(51), hz(44)), 0.3, harm=(1.0, 0.55, 0.35, 0.2)) * env_ad(0.3, 0.004, 0.1), at=0.2, gain=-5)
    return room(m, 0.3, 0.11)


@recipe("shield", peak_db=-4, max_len=0.65)
def _():
    m = M(0.9)   # 보호막: 맑은 막이 '웅' 하고 선다
    f = hz(62)
    m.add(riser(0.13, 400, 1200, 0.4), gain=-10, width=1)
    m.add(tone((f * 1.88, f * 2), 0.5, harm=(1.0, 0.45, 0.25, 0.12), det=0.004) * env_ad(0.5, 0.004, 0.18), at=0.12, gain=-2, width=1)
    m.add(glass_ping(f * 4, 0.16), at=0.12, gain=-7, width=1)
    m.add(glass_ping(f * 6, 0.12), at=0.14, gain=-10, width=1)
    m.add(punch(180, 85, 0.05, 1.7), at=0.12, gain=-7)
    m.add(air(0.3, 5000, 0.08), at=0.12, gain=-11, width=1)
    return room(m, 0.35, 0.12)


@recipe("shield_break", peak_db=-3, max_len=0.6)
def _():
    m = M(0.8)   # 보호막이 깨진다: 유리가 '쨍그랑' — 짧게
    m.add(seq((0, snap(0.03, 2000, 13000, 0.004), 0), (0, punch(180, 80, 0.04, 2.0), 0), (0, knock(700, 0.02, 0.9), -2), (0, slap(0.1, 600, 3500, 0.03), 0)), gain=0)
    m.add(crack_ticks(0.12, 8), gain=-4, width=1)
    def shard(_):
        f = U(2000, 7000)
        return modal(0.15, [(f, U(0.015, 0.045), 1.0), (f * 1.47, 0.015, 0.5)], a=0.0004)
    m.add(grains(0.35, 14, shard, decay_rate=1.4), at=0.02, gain=-5, width=1)
    m.add(blip(hz(86), hz(74), 0.2, 0.06), at=0.0, gain=-10, width=1)
    return room(m, 0.3, 0.11)


@recipe("heal", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # 치유: 부드럽게 올라가는 종 + 따뜻한 화음
    for i, n in enumerate((76, 80, 83, 88)):
        m.add(mixa(chime(hz(n), 0.2), (pad(hz(n - 12), 0.3, 0.02, 0.5), -5)), at=0.02 + 0.075 * i, gain=-5, pan=-0.3 + 0.2 * i, width=1)
    m.add(sw(twinkle(0.4, 8, 3200, 8500, 0.05, rise=0.4), 0.2, 1, 1.4), at=0.1, gain=-13, width=1)
    return room(m, 0.4, 0.13)


@recipe("cleanse", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # 씻어냄: 물결이 쓸고 지나가며 맑아진다
    m.add(wave(0.45, 0.3, 0.5), gain=-4, width=1)
    m.add(sw(twinkle(0.45, 12, 3000, 9000, 0.04, rise=0.8), 0.6, 1, 1), at=0.05, gain=-8, width=1)
    m.add(chime(hz(86), 0.2), at=0.38, gain=-5, width=1)
    m.add(chime(hz(91), 0.2), at=0.44, gain=-7, width=1)
    return room(m, 0.35, 0.12)


@recipe("reload", peak_db=-3, max_len=0.7)
def _():
    m = M(0.9)   # 장전: 철컥 · 드르륵 · 탁
    m.add(seq((0, snap(0.02, 1800, 10000, 0.003), -2), (0, knock(700, 0.012, 1.0), 0), (0, clink(1800, 0.03), -6)), gain=-2, pan=-0.2)
    m.add(ratchet(5, 0.16, 1700), at=0.12, gain=-5)
    m.add(norm(sweep(noise(0.1), (2000, 5000), 2.0)) * ar(0.1, 0.03), at=0.3, gain=-9)
    m.add(seq((0, snap(0.025, 1500, 11000, 0.004), -1), (0, knock(520, 0.018, 1.0), 0), (0, clang(900, 0.07, 0.6, 5), -6), (0, punch(180, 85, 0.035, 1.9), -4)), at=0.42, gain=0, pan=0.2)
    return room(m, 0.22, 0.09)


@recipe("charge", peak_db=-4, max_len=0.65)
def _():
    m = M(0.9)   # 충전: 높아지는 윙 + 잔 방전
    m.add(E.charge("lightning", 0.45, 0.5), gain=-2, width=1)
    m.add(zap(0.12, 0.3), at=0.44, gain=-4)
    return room(m, 0.25, 0.09)


@recipe("rage", peak_db=-3, max_len=0.75)
def _():
    m = M(1.0)   # 격노: 으르렁 + 가슴을 두 번 친다 + 뿔나팔이 치솟는다
    m.add(growl(0.5, 80, 0.7), gain=-4, width=1)
    m.add(smash(0.6), at=0.05, gain=-1)
    m.add(smash(0.7), at=0.2, gain=0)
    m.add(horn(hz(57), 0.35, 0.03), at=0.2, gain=-7, width=1)
    m.add(horn(hz(64), 0.35, 0.03), at=0.2, gain=-10, width=1)
    return room(m, 0.3, 0.1)


@recipe("regrow", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # 재생(트롤): 나무가 삐걱 자라며 잎이 돋는다
    m.add(creak(0.3, 160), gain=-5)
    m.add(sw(rustle(0.45, 40), 0.5, 1, 1.2), at=0.05, gain=-8, width=1)
    for i, n in enumerate((67, 71, 74)):
        m.add(marimba(hz(n), 0.14), at=0.12 + 0.08 * i, gain=-4, pan=-0.3 + 0.3 * i, width=1)
    return room(m, 0.3, 0.11)


@recipe("ignite", peak_db=-3, max_len=0.5)
def _():
    m = M(0.7)   # [점화]: 불씨를 '칙' 튕겨 날린다
    m.add(seq((0, snap(0.02, 2500, 12000, 0.003), 0), (0, knock(1500, 0.006, 1.0), -5)), gain=-2)
    m.add(sizzle(0.2, 110), at=0.01, gain=-5, width=1)
    m.add(whoosh(0.2, 1200, 5500, 2600, 1.8, 0.4, 0.5), at=0.03, gain=-6, width=1)
    m.add(fire_whoosh(0.25, 0.3, 0.3), at=0.1, gain=-6)
    return room(m, 0.22, 0.09)


@recipe("scorch", peak_db=-4, max_len=0.6)
def _():
    m = M(0.8)   # 화상이 붙는다: '치이익' 눌어붙는 소리
    m.add(fire_whoosh(0.3, 0.3, 0.12), gain=-3)
    m.add(sizzle(0.45, 100), gain=-3, width=1)
    m.add(steam(0.35, 3500, 0.13), at=0.03, gain=-9, width=1)
    return room(m, 0.22, 0.09)


@recipe("flame_armor", peak_db=-3, max_len=0.6)
def _():
    m = M(0.8)   # [화염 갑주]: 갑주에서 불길이 확 번져 옮겨붙는다
    m.add(clang(600, 0.1, 0.55, 5), gain=-8)
    m.add(fire_burst(0.45), gain=0)
    m.add(sizzle(0.35, 90), at=0.1, gain=-8, width=1)
    return room(m, 0.25, 0.1)


@recipe("burn_burst", peak_db=-2.5, max_len=0.7)
def _():
    m = M(0.9)   # 화상이 터진다: 작은 폭발 + 불똥
    m.add(explosion(0.3), gain=0)
    m.add(sizzle(0.35, 100), at=0.06, gain=-7, width=1)
    return room(m, 0.28, 0.1)


@recipe("bleed", peak_db=-4, max_len=0.5)
def _():
    m = M(0.7)   # [출혈]: 살이 베이고 방울이 떨어진다
    m.add(seq((0, snap(0.03, 2500, 10000, 0.006), -3), (0, lp(slap(0.1, 500, 4000, 0.03), 4500), 0), (0, punch(170, 85, 0.035, 1.8), -6)), gain=-1)
    for i in range(3):
        m.add(bubble(U(600, 1100), 0.035), at=0.12 + 0.085 * i + U(0, 0.02), gain=-6 - 2 * i, pan=U(-0.4, 0.4))
    return room(m, 0.2, 0.08)


@recipe("fear", peak_db=-4, max_len=0.65)
def _():
    m = M(0.9)   # [공포]: 소름 끼치게 떨리는 높은 불협 + 낮은 숨
    t = tt(0.5)
    hi = (tone(hz(87), 0.5, harm=(1.0, 0.2)) + tone(hz(88), 0.5, harm=(0.8, 0.2))) * (0.6 + 0.4 * np.sin(2 * np.pi * 13 * t)) * swell(0.5, 0.25, 1, 1.5)
    m.add(hi, gain=-9, width=1)
    m.add(sw(whisper(0.5, 2600), 0.3, 1.5, 1.3), gain=-4, width=1)
    m.add(dark_drone(0.5, 58, 0.5) * swell(0.5, 0.2, 1, 1.5), gain=-5, width=1)
    m.add(seq((0, punch(130, 55, 0.07, 2.4), 0), (0.13, punch(120, 52, 0.07, 2.4), -3)), at=0.05, gain=-5)
    return room(m, 0.3, 0.11)


@recipe("plague", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # [역병]: 끈적하게 끓는 거품 + 벌레 떼의 웅웅
    m.add(bubbles(0.55, 16, 320, 1500), gain=-2, width=1)
    t = tt(0.55)
    buzz = bp(signal.sawtooth(2 * np.pi * 172 * t * (1 + 0.02 * np.sin(2 * np.pi * 9 * t))), 600, 3200) * (0.6 + 0.4 * np.sin(2 * np.pi * 23 * t)) * swell(0.55, 0.4, 1, 1.4)
    m.add(norm(buzz), gain=-4, width=1)
    m.add(sw(whisper(0.5, 1900), 0.4, 1.5, 1.3), gain=-8, width=1)
    m.add(tone((hz(54), hz(49)), 0.4, harm=(1.0, 0.55, 0.35)) * env_ad(0.4, 0.01, 0.14), at=0.05, gain=-8)
    return room(m, 0.28, 0.1)


@recipe("mend", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # [치유](인어): 물이 상처를 채운다 — 물방울 + 맑은 음
    m.add(wave(0.4, 0.2, 0.4), gain=-9, width=1)
    m.add(bubbles(0.35, 9, 600, 2400), at=0.02, gain=-6, width=1)
    for i, n in enumerate((77, 81, 84)):
        m.add(E.voice("water", hz(n - 24), 0.35), at=0.08 + 0.08 * i, gain=-4, pan=-0.3 + 0.3 * i, width=1)
    m.add(drops(0.25, 4), at=0.3, gain=-10, width=1)
    return room(m, 0.38, 0.13)


@recipe("arcane", peak_db=-3, max_len=0.55)
def _():
    m = M(0.8)   # [마력 공격]: 물의 마력이 방어를 뚫는다 — 솟구치는 맑은 음 + 물 튐
    m.add(tone((900, 2600), 0.14, harm=(1.0, 0.3, 0.1)) * swell(0.14, 0.8, 1.5, 1), gain=-5, width=1)
    m.add(glass_ping(hz(89), 0.1), at=0.13, gain=-4, width=1)
    m.add(splash(0.3), at=0.13, gain=-1)
    m.add(snap(0.03, 2500, 12000, 0.004), at=0.13, gain=-4)
    return room(m, 0.28, 0.1)


@recipe("sea_guard", peak_db=-4, max_len=0.55)
def _():
    m = M(0.8)   # [바다의 보호]: 물결이 충격을 받아 '출렁'
    m.add(wave(0.32, 0.3, 0.3), gain=-2, width=1)
    m.add(bubble(260, 0.1), at=0.03, gain=-3)
    m.add(bubbles(0.25, 7, 400, 1800), at=0.05, gain=-7, width=1)
    m.add(punch(170, 80, 0.045, 1.7), at=0.02, gain=-6)
    return room(m, 0.28, 0.1)


@recipe("ward", peak_db=-4, max_len=0.55)
def _():
    m = M(0.8)   # [가호]: 빛이 충격을 덜어 준다 — 부드러운 '퉁' + 종
    m.add(seq((0, punch(190, 90, 0.045, 1.6), 0), (0, slap(0.08, 800, 5000, 0.02), -5)), gain=-4)
    m.add(chime(hz(84), 0.18), gain=-2, width=1)
    m.add(chime(hz(91), 0.16), at=0.05, gain=-6, width=1)
    m.add(air(0.25, 6000, 0.06), gain=-11, width=1)
    return room(m, 0.35, 0.12)


@recipe("regen", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # [재생]: 살과 껍질이 다시 붙는다 — 삐걱 + 끈적한 소리 + 낮은 나무 음
    m.add(creak(0.28, 140), gain=-5)
    m.add(bubbles(0.3, 8, 400, 1500), at=0.03, gain=-6, width=1)
    m.add(marimba(hz(67), 0.16), at=0.16, gain=-2, width=1)
    m.add(marimba(hz(74), 0.18), at=0.27, gain=-2, width=1)
    m.add(sw(rustle(0.3, 20), 0.5, 1, 1.2), at=0.1, gain=-12, width=1)
    return room(m, 0.3, 0.11)


@recipe("shield_bash", peak_db=-2, max_len=0.55)
def _():
    m = M(0.8)   # [방패 반격]: 방패로 '꽝' 되받아친다
    m.add(whoosh(0.1, 700, 3500, 1500, 1.5, 0.7, 0.4), gain=-8)
    m.add(seq((0, snap(0.03, 1500, 12000, 0.005), -1), (0, clang(480, 0.2, 0.68, 7), 0), (0, punch(150, 50, 0.08, 2.6), 0), (0.004, slap(0.1, 400, 3500, 0.03), -5)), at=0.08, gain=0)
    return room(m, 0.28, 0.1)


@recipe("firm", peak_db=-3, max_len=0.55)
def _():
    m = M(0.8)   # [굳건]: 발을 '쿵' 박고 버틴다
    m.add(smash(0.75), gain=0)
    m.add(rubble(0.22, 9), at=0.03, gain=-9)
    m.add(horn(hz(57), 0.3, 0.03), at=0.02, gain=-10, width=1)
    return room(m, 0.28, 0.1)


@recipe("purify", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # [정화]: 빛이 씻어 낸다 — 솟는 빛 + 환한 화음
    m.add(riser(0.28, 600, 2000, 0.35), gain=-8, width=1)
    for i, n in enumerate((76, 79, 84)):
        m.add(chime(hz(n), 0.28), at=0.27 + 0.02 * i, gain=-4, pan=-0.3 + 0.3 * i, width=1)
    m.add(choir(hz(72), 0.4, 0.03) * env_ad(0.4, 0.03, 0.15), at=0.27, gain=-10, width=1)
    m.add(sw(twinkle(0.4, 10, 3500, 9000, 0.04), 0.1, 1, 1.4), at=0.25, gain=-11, width=1)
    m.add(air(0.3, 6000, 0.08), at=0.27, gain=-10, width=1)
    return room(m, 0.4, 0.13)


@recipe("intercept", peak_db=-3, max_len=0.5)
def _():
    m = M(0.7)   # [요격]: 날아오는 것을 번개로 받아친다
    m.add(whine(0.1, 900, 3200), gain=-9, width=1)
    m.add(zap(0.2, 0.4), at=0.09, gain=0)
    m.add(snap(0.03, 2000, 12000, 0.004), at=0.09, gain=-3)
    return room(m, 0.25, 0.1)


@recipe("retreat", peak_db=-5, max_len=0.6)
def _():
    m = M(0.8)   # [후퇴]: 뒤로 물러난다 — 멀어지는 바람 + 발소리
    m.add(whoosh(0.3, 3000, 3800, 600, 1.4, 0.2, 0.5), gain=-2, width=1)
    for i in range(3):
        m.add(seq((0, knock(240 - 15 * i, 0.02, 0.5), 0), (0, slap(0.04, 500, 3000, 0.01), -6)), at=0.12 + 0.11 * i, gain=-6 - 3 * i, pan=0.15 * i)
    return room(m, 0.25, 0.1)


@recipe("aura", peak_db=-4, max_len=0.9)
def _():
    m = M(1.2)   # [레어 오라]: 이웃을 북돋우는 따뜻한 화음이 번진다
    for n, g in ((62, -4), (69, -6), (74, -6), (78, -8)):
        m.add(pad(hz(n), 0.75, 0.12, 0.6) * swell(0.75, 0.3, 1, 1.4), gain=g, width=1)
    m.add(chime(hz(86), 0.3), at=0.14, gain=-9, width=1)
    m.add(sw(twinkle(0.55, 12, 3000, 8500, 0.05), 0.3, 1, 1.3), at=0.05, gain=-12, width=1)
    m.add(air(0.6, 6000) * 1.0, gain=-18, width=1)
    return room(m, 0.45, 0.14)


@recipe("huntfire", peak_db=-2.5, max_len=0.65)
def _():
    m = M(0.9)   # [불꽃 사냥]: 불길이 달려들어 덮친다
    m.add(fire_whoosh(0.22, 0.4, 0.9), gain=-3, width=1)
    m.add(whoosh(0.2, 800, 5000, 3000, 1.6, 0.85, 0.5), gain=-7)
    m.add(fire_burst(0.55), at=0.2, gain=0)
    return room(m, 0.28, 0.1)


@recipe("riposte", peak_db=-2.5, max_len=0.55)
def _():
    m = M(0.8)   # [되받기]: 막아 낸 칼이 '챙' 되튀어 벤다
    m.add(seq((0, snap(0.03, 1800, 12000, 0.004), -2), (0, clang(900, 0.13, 0.68, 7), 0), (0, punch(190, 85, 0.035, 1.9), -5)), gain=-2, pan=-0.2)
    m.add(slash(0.4), at=0.09, gain=0, pan=0.2)
    return room(m, 0.25, 0.1)


@recipe("overload", peak_db=-2.5, max_len=0.7)
def _():
    m = M(0.9)   # [과부하]: 벼락이 치솟다 터진다
    m.add(whine(0.26, 500, 3600), gain=-6, width=1)
    m.add(grains(0.26, 7, lambda i: zap(0.05, 0.1)) * swell(0.26, 0.95, 1.5, 1), gain=-8, width=1)
    m.add(E.strike("lightning", 0.6), at=0.26, gain=0)
    return room(m, 0.3, 0.11)


@recipe("devour", peak_db=-3, max_len=0.75)
def _():
    m = M(1.0)   # [포식]: 낮은 으르렁 + 덥석 + 꿀꺽
    m.add(growl(0.4, 72, 0.8), gain=-3, width=1)
    m.add(bite(0.7), at=0.2, gain=0)
    m.add(bubble(150, 0.13), at=0.4, gain=-2)
    m.add(tone((240, 120), 0.14, harm=(1.0, 0.6, 0.4)) * ar(0.14, 0.03), at=0.4, gain=-6)
    return room(m, 0.25, 0.1)


@recipe("drain", peak_db=-4, max_len=0.75)
def _():
    m = M(1.0)   # [뿌리 흡수]: 뿌리가 기운을 빨아들인다
    m.add(suck(0.5, 300, 3200), gain=-3, width=1)
    m.add(sw(rustle(0.45, 30, 1800, 6000), 0.7, 1.5, 1), gain=-4, width=1)
    m.add(creak(0.3, 130), at=0.05, gain=-8)
    m.add(tone((hz(67), hz(79)), 0.5, harm=(1.0, 0.5, 0.3)) * swell(0.5, 0.9, 1.5, 0.8), gain=-11, width=1)
    m.add(marimba(hz(79), 0.14), at=0.5, gain=-2, width=1)
    return room(m, 0.28, 0.1)


@recipe("flow", peak_db=-4, max_len=0.8)
def _():
    m = M(1.0)   # [밀물]: 물결이 밀려든다
    m.add(wave(0.6, 0.5, 0.6), gain=-1, width=1)
    m.add(bubbles(0.4, 9, 500, 2200), at=0.25, gain=-8, width=1)
    m.add(E.voice("water", hz(53), 0.4), at=0.34, gain=-8, width=1)
    return room(m, 0.35, 0.12)


@recipe("judge", peak_db=-3, max_len=0.9)
def _():
    m = M(1.2)   # [심판]: 판결의 종 — 한 번, 묵직하고 맑게(높은 울림은 짧게)
    f = hz(69)
    m.add(seq((0, snap(0.03, 1500, 10000, 0.004), 0), (0, knock(420, 0.03, 0.9), -2), (0, punch(160, 60, 0.07, 2.3), 0)), gain=-3)
    m.add(modal(0.9, [(f, 0.4, 1.0), (f * 2.0, 0.3, 0.8), (f * 2.4, 0.22, 0.55), (f * 3.0, 0.14, 0.5), (f * 4.2, 0.08, 0.3), (f * 5.4, 0.05, 0.2), (f * 1.004, 0.4, 0.4)], a=0.001), gain=-1, width=1)
    m.add(choir(hz(69), 0.5, 0.05) * env_ad(0.5, 0.05, 0.18), at=0.02, gain=-11, width=1)
    return room(m, 0.55, 0.15)


@recipe("sentry", peak_db=-3, max_len=0.6)
def _():
    m = M(0.8)   # [경계의 화살]: 멀리서 날아와 꽂힌다
    m.add(norm(sweep(noise(0.24), (7500, 2800), 9)) * swell(0.24, 0.85, 2, 1), gain=-6, width=1)
    m.add(air(0.24, 6000) * 1.0 * 0.5, gain=-14, width=1)
    m.add(arrow_hit(0.35), at=0.2, gain=0)
    return room(m, 0.28, 0.1)


@recipe("mark", peak_db=-4, max_len=0.6)
def _():
    m = M(0.8)   # [표식]: 깃펜이 긋고 바람이 스친다
    for i in range(2):
        dd = 0.08
        m.add(norm(sweep(noise(dd), (U(2800, 3600), U(5500, 7500)), 2.5)) * ar(dd, dd * 0.3), at=0.09 * i, gain=-4, pan=-0.2 + 0.4 * i)
    m.add(gust(0.3, 0.3, 0.4), at=0.05, gain=-8, width=1)
    m.add(E.voice("wind", hz(62), 0.3), at=0.2, gain=-5, width=1)
    return room(m, 0.3, 0.11)


# ══ 마법 연쇄 (2026-11-24) ═══════════════════════════════
# 마법이 대상에 닿는 순간 · 여럿을 차례로 칠 때 · 마법이 잇달아 나간 끝의 마무리 (js/spellfx.js · js/game.js).
# 크기 · 고음이 아니라 저역 몸통(서브 + 배음)과 긴 꼬리로 무게를 낸다(weight.py).
import weight as W  # noqa: E402


def _land(el):
    def f():
        m = M(1.0)
        m.add(E.strike(el, 0.35)[: n_(0.35)], gain=-4, width=1)   # 원소 색(발동 소리보다 짧고 옅게)
        m.add(punch(150, 60, 0.08, 2.2), gain=-3)                  # 폰에서도 들리는 몸통 '퍽'
        m.add(W.body_land(el, 0.55), gain=-2, width=1)
        return room(m, 0.6, 0.14, damp=6000)
    return f


for _el in W.SUBF:
    R["sp_land_" + _el] = (_land(_el), dict(peak_db=-3, crest=13.0, hpf=32, air_db=0, max_len=0.9, tail_db=-50))


@recipe("sp_area", peak_db=-2, crest=13.0, hpf=30, air_db=0, max_len=1.8, tail_db=-52)
def _():
    m = M(2.0)   # 여럿을 다 친 뒤 한꺼번에 내려앉는 넓은 '쿵' + 굴러가는 꼬리
    m.add(W.sub_boom(46, 1.2, 0.8, drop=2.2), gain=0)
    m.add(np.pad(W.sub_boom(41, 1.0, 0.7, drop=1.5), (n_(0.12), 0)), gain=-5, width=1)
    m.add(W.rumble(1.5, 0.7, 60, 340, 5), at=0.02, gain=-5, width=1)
    m.add(punch(130, 50, 0.12, 2.4), gain=-1)
    m.add(rock_hit(0.7), gain=-7)
    m.add(horn(hz(38) * 2, 0.9, 0.01) * env_ad(0.9, 0.01, 0.3), at=0.02, gain=-9, width=1)   # 낮은 금관 한 번
    return room(m, 1.2, 0.2, damp=5000)


@recipe("sp_chain", peak_db=-4, crest=12.0, hpf=32, air_db=0, max_len=0.9, tail_db=-48)
def _():
    m = M(1.0)   # 마법이 잇달아 나갈 때 발동 소리 밑에 까는 고동(차례마다 음이 오른다 — FEEL.spellChain)
    m.add(W.sub_boom(52, 0.7, 0.6, drop=1.4), gain=0)
    m.add(W.low_swell(0.18, 60, 180), gain=-8, width=1)
    m.add(W.gong_hum(hz(45), 0.8, 0.4), at=0.01, gain=-5, width=1)
    m.add(punch(140, 60, 0.07, 2.0), gain=-3)
    return room(m, 0.7, 0.14, damp=5000)


@recipe("sp_finale", peak_db=-2, crest=13.0, hpf=30, air_db=0, max_len=2.4, tail_db=-54)
def _():
    m = M(2.6)   # 잇단 마법의 마무리: 깊게 내려찍고(서브 + 배음) 5도 화음이 길게 가라앉는다
    m.add(W.low_swell(0.22, 50, 160), gain=-6, width=1)
    t0 = 0.22
    m.add(W.sub_boom(43, 1.4, 1.0, drop=2.4), at=t0, gain=0)
    m.add(punch(120, 45, 0.14, 2.6), at=t0, gain=-5)
    m.add(W.gong_hum(hz(31), 1.8, 0.9), at=t0, gain=-6, width=1)
    f = hz(38)
    ch = mixa(pad(f, 1.8, 0.03, 0.5), (pad(f * 1.5, 1.8, 0.04, 0.45), -2), (pad(f * 2, 1.8, 0.05, 0.4), -4))
    m.add(lp(ch, 1500, 2) * env_ad(1.8, 0.03, 0.7), at=t0, gain=-5, width=1)
    m.add(W.rumble(1.8, 0.8, 55, 300, 4), at=t0 + 0.03, gain=-7, width=1)
    m.add(horn(f * 2, 1.3, 0.02) * env_ad(1.3, 0.02, 0.45), at=t0, gain=-1, width=1)            # 낮은 금관 5도
    m.add(horn(f * 3, 1.3, 0.03) * env_ad(1.3, 0.03, 0.4), at=t0 + 0.01, gain=-4, width=1)
    return room(m, 1.5, 0.22, damp=4500)
