"""공용 효과음 레시피 — 키마다 prompts/sfx.jsonl 의 `single` 문장을 재료로 옮긴 것.

각 함수는 Mix 를 돌려주고, 끝의 dict 는 master() 옵션이다.
문장 → 재료 대응은 함수 위 주석에 적었다.
"""
from dsp import *  # noqa

R = {}


def recipe(key, **mopt):
    def deco(fn):
        R[key] = (fn, mopt)
        return fn
    return deco


# 공용 조각 ─────────────────────────────────────────────
def wood_tock(d=0.08, f=420, tau=0.02, bright=0.5):
    return modal(d, [(f, tau, 1.0), (f * 2.49, tau * 0.6, 0.5 * bright), (f * 4.1, tau * 0.35, 0.3 * bright)])


def table_thud(d=0.4, f=95, tau=0.07):
    body = thump(d, f * 1.6, f, tau)
    wood = modal(d, [(f * 2.1, tau * 0.8, 0.5), (f * 3.9, tau * 0.45, 0.25), (f * 6.3, tau * 0.25, 0.12)])
    hit = lp(noise(d), 1400) * env_ad(d, 0.0005, 0.012)
    return body + wood * 0.6 + hit * 0.5


def paper_slide(d, f0=900, f1=1500, q=0.9, a=0.3):
    x = sweep(noise(d, "pink"), (f0, f1), q)
    e = env_pts(d, [(0, 0), (d * a, 1), (d, 0)]) ** 1.5
    return lp(x * e, 4500)


def coin_ring(d, f0=3150, tau=0.35, muffle=None):
    modes = [(f0, tau, 1.0), (f0 * 1.0035, tau, 0.7), (f0 * 1.72, tau * 0.6, 0.55),
             (f0 * 2.51, tau * 0.45, 0.35), (f0 * 3.33, tau * 0.3, 0.2)]
    y = modal(d, modes, a=0.0003)
    return lp(y, muffle) if muffle else y


# 1 ─ hover: "tiny soft low wooden tock, muffled and gentle, no high frequencies" ~0.1s
@recipe("hover", lpf=2600, min_len=0.09)
def _():
    m = Mix(0.12)
    m.add(wood_tock(0.12, 380, 0.018, 0.35))
    m.add(thump(0.12, 210, 150, 0.02), gain=-6)
    return m


# 2 ─ handHover: "very soft low paper touch, fingertip brushing thick card stock; muffled and warm"
@recipe("handHover", lpf=2200, min_len=0.1)
def _():
    m = Mix(0.14)
    x = bp(noise(0.14, "pink"), 250, 1600) * env_pts(0.14, [(0, 0), (0.012, 1), (0.05, 0.5), (0.13, 0)])
    m.add(x)
    m.add(thump(0.1, 160, 120, 0.02), gain=-12)
    return m


# 3 ─ ui_click: "crisp click of a small brass switch set in dark wood, tiny soft low thump; not sharp"
@recipe("ui_click", lpf=9000, min_len=0.12)
def _():
    m = Mix(0.18)
    m.add(click(0.004, 1800, 8000), gain=-4)
    m.add(modal(0.1, [(2650, 0.012, 1), (4120, 0.008, 0.6), (5900, 0.005, 0.4)]), gain=-8)
    m.add(wood_tock(0.12, 520, 0.02, 0.4), at=0.001, gain=-4)
    m.add(thump(0.12, 150, 110, 0.025), gain=-6)
    m.add(click(0.003, 2500, 7000), at=0.022, gain=-16)  # 스위치가 걸리는 두 번째 작은 딸깍
    return m


# 4 ─ draw: "single thick card drawn from a deck: short soft paper slide and gentle muted tap; warm, low, dry, no hiss"
@recipe("draw", lpf=4200, min_len=0.25)
def _():
    m = Mix(0.32)
    m.add(paper_slide(0.17, 700, 1300, 0.8, 0.55), gain=-2, width=1)
    m.add(wood_tock(0.12, 330, 0.02, 0.3), at=0.165)
    m.add(thump(0.12, 170, 120, 0.025), at=0.165, gain=-6)
    return m


# 5 ─ place: "heavy card set down firmly on a wooden table: single deep soft thud, dry and short"
@recipe("place", lpf=5000, min_len=0.3)
def _():
    m = Mix(0.4)
    m.add(paper_slide(0.05, 1200, 600, 0.7, 0.2), gain=-10)
    m.add(table_thud(0.4, 92, 0.07), at=0.03)
    st = reverb(m.buf, rt=0.22, mix=0.12, damp=3000)
    m.buf = st
    return m


# 6 ─ select: "card lifted with a firm, soft click and a faint airy lift"
@recipe("select", lpf=7000, min_len=0.18)
def _():
    m = Mix(0.22)
    m.add(wood_tock(0.08, 620, 0.012, 0.6), gain=-1)
    m.add(click(0.003, 1500, 6000), gain=-10)
    air = sweep(noise(0.18, "pink"), (900, 3200), 1.2) * env_pts(0.18, [(0, 0), (0.06, 1), (0.18, 0)])
    m.add(air, at=0.01, gain=-9, width=1)
    return m


# 7 ─ confirm_atk: "sword struck flat against a shield: one short decisive clang"
#   (2026-11-16 사용자: 둔탁하게 툭 끊기는 느낌 → 손으로 막지 않고 쇠 울림이 자연스럽게 잦아들게, 몸통은 조금 밝게)
@recipe("confirm_atk", min_len=0.45, max_len=0.75, lpf=8000)
def _():
    d = 1.0
    m = Mix(d)
    clang = modal(d, metal_modes(520, 7, 0.22, 0.78)) + modal(d, metal_modes(1240, 5, 0.14, 0.6)) * 0.55
    m.add(clang, gain=-2, width=0.6)
    m.add(click(0.005, 2500, 10000), gain=-4)
    m.add(thump(0.15, 240, 170, 0.025), gain=-9)
    m.add(sweep(noise(0.1), (6000, 3000), 3) * env_ad(0.1, 0.001, 0.03), gain=-16, pan=0.3)  # 칼날이 미끄러지는 결
    m.buf = reverb(m.buf, rt=0.35, mix=0.12, damp=6000)
    return m


# 8 ─ confirm_def: "tower shield planted hard into the ground: deep heavy thud with a short dull clank"
#   (같은 의견 → 쿵 뒤에 방패 판이 낮게 웅 울리며 잦아들고, 흙이 조금 흩어지게)
@recipe("confirm_def", min_len=0.45, max_len=0.75, lpf=6500)
def _():
    d = 1.0
    m = Mix(d)
    m.add(thump(0.6, 130, 68, 0.11), gain=0)
    dirt = grains(0.25, 30, lambda _: bp(noise(0.012), 250, 1800) * env_ad(0.012, 0.0003, 0.004), decay_rate=0.7)
    m.add(lp(dirt, 2500), at=0.004, gain=-9, width=1)
    plate = modal(d, [(232, 0.2, 1), (551, 0.13, 0.6), (893, 0.09, 0.4), (1420, 0.06, 0.25), (2210, 0.04, 0.15)])
    m.add(plate, at=0.004, gain=-6, width=0.5)
    m.add(click(0.005, 700, 4500), gain=-6)
    m.buf = reverb(m.buf, rt=0.4, mix=0.12, damp=3500)
    return m


# 9 ─ shatter: "stone card plaque breaking apart: heavy low crack and chunks of stone crumbling onto a wooden table; dull, earthy, dry, no glass, no hiss"
@recipe("shatter", lpf=5000, min_len=0.7)
def _():
    d = 0.85
    m = Mix(d)
    crack = bp(noise(0.05), 300, 3500) * env_ad(0.05, 0.0003, 0.01)
    m.add(crack, gain=0)
    m.add(thump(0.3, 140, 70, 0.06), gain=-2)
    m.add(modal(0.25, [(520, 0.03, 1), (870, 0.025, 0.6), (1460, 0.018, 0.4)], jitter=0.05), gain=-8)

    def chunk(_):
        dd = RNG.uniform(0.03, 0.07)
        f = RNG.uniform(500, 2200)
        s = bp(noise(dd), f * 0.6, f * 1.6) * env_ad(dd, 0.0003, RNG.uniform(0.005, 0.014))
        s += wood_tock(dd, RNG.uniform(230, 340), 0.012, 0.3) * 0.35  # 나무 탁자에 떨어짐
        return s
    m.add(grains(0.75, 34, chunk, start=0.04, end=0.72, decay_rate=0.9), gain=-5, width=1)
    m.add(lp(noise(0.6, "brown"), 600) * env_pts(0.6, [(0, 0), (0.03, 1), (0.6, 0)]) ** 2, gain=-14)
    m.buf = reverb(m.buf, rt=0.25, mix=0.1, damp=2500)
    return m


# 10 ─ burn: "card dropped into a fire pit: low soft whoomp of flame and a warm gentle crackle of burning wood; muffled, low, no hiss"
@recipe("burn", lpf=4500, min_len=0.75)
def _():
    d = 0.85
    m = Mix(d)
    w = sweep(noise(0.45, "brown"), [(0, 120), (0.3, 700), (1, 260)], 0.7, "lp")
    w *= env_pts(0.45, [(0, 0), (0.06, 1), (0.18, 0.7), (0.45, 0)])
    m.add(w, gain=0, width=1)
    m.add(thump(0.3, 90, 60, 0.08), gain=-8)
    cr = crackle(0.8, rate=26, lo=900, hi=3200, tau=0.004) * env_pts(0.8, [(0, 0), (0.1, 1), (0.5, 0.7), (0.8, 0)])
    m.add(cr, at=0.05, gain=-10, pan=0.15, width=1)
    m.add(crackle(0.7, rate=10, lo=500, hi=1400, tau=0.006), at=0.12, gain=-12, pan=-0.2)
    return m


# 11 ─ coin_flip: "heavy gold coin tossed up with a thumb: soft dull flick, then two muffled low metallic tumbles; warm and round"
@recipe("coin_flip", lpf=5000, min_len=0.5)
def _():
    d = 0.6
    m = Mix(d)
    m.add(click(0.004, 700, 3000), gain=-4)
    m.add(thump(0.06, 260, 180, 0.012), gain=-6)
    m.add(coin_ring(0.1, 1850, 0.025, 3500), at=0.002, gain=-10)
    for at, g, f in [(0.2, -6, 1650), (0.36, -10, 1720)]:
        m.add(coin_ring(0.18, f, 0.045, 3200), at=at, gain=g, pan=RNG.uniform(-0.3, 0.3))
        m.add(sweep(noise(0.08, "pink"), (600, 1400), 1.5) * env_pts(0.08, [(0, 0), (0.04, 1), (0.08, 0)]),
              at=at - 0.05, gain=g - 12)
    return m


# 12 ─ coinHeads: "gold coin landing face up on stone: bright, clear ring with a short shimmering decay"
@recipe("coinHeads", min_len=0.6, max_len=0.9)
def _():
    d = 1.1
    m = Mix(d)
    m.add(click(0.004, 1500, 9000), gain=-3)
    m.add(coin_ring(d, 3180, 0.38), gain=-2, width=0.7)
    m.add(coin_ring(0.2, 3180, 0.05), at=0.055, gain=-12)  # 작은 튐 두 번
    m.add(coin_ring(0.15, 3180, 0.04), at=0.09, gain=-17)
    m.add(sparkle(0.6, 6, 6000, 10000, 0.05, start=0.03, end=0.4), gain=-20, width=1)
    m.buf = reverb(m.buf, rt=0.5, mix=0.15, damp=7000)
    return m


# 13 ─ map_open: "heavy oak door opening onto a quiet forest path: low soft wooden thump, warm breath of air and one soft footstep on moss; warm, low, muffled"
@recipe("map_open", lpf=3500, min_len=0.85)
def _():
    d = 1.0
    m = Mix(d)
    m.add(table_thud(0.4, 72, 0.08), gain=0)
    creak = sweep(noise(0.25, "pink"), (380, 520), 18) * env_pts(0.25, [(0, 0), (0.05, 1), (0.25, 0)])
    m.add(creak, at=0.04, gain=-14)
    air = sweep(noise(0.75, "pink"), [(0, 250), (0.4, 900), (1, 400)], 0.6, "lp")
    air *= env_pts(0.75, [(0, 0), (0.3, 1), (0.75, 0)])
    m.add(air, at=0.08, gain=-6, width=1)
    step = lp(bp(noise(0.12, "pink"), 120, 900), 900) * env_pts(0.12, [(0, 0), (0.015, 1), (0.12, 0)])
    m.add(step + thump(0.12, 110, 80, 0.03) * 0.6, at=0.68, gain=-6, pan=0.15)
    m.buf = reverb(m.buf, rt=0.6, mix=0.12, damp=2500)
    return m


# 14 ─ hit: "solid, punchy impact on armour and flesh: a tight thump with a short crack"
@recipe("hit", min_len=0.3)
def _():
    d = 0.4
    m = Mix(d)
    m.add(thump(d, 150, 60, 0.06), gain=0)
    m.add(click(0.008, 1200, 7000), gain=-3)
    m.add(bp(noise(0.08), 300, 1800) * env_ad(0.08, 0.0005, 0.02), gain=-5)
    m.add(modal(0.15, metal_modes(780, 5, 0.04, 0.6)), gain=-14)
    return m


# 15 ─ block: "solid shield block: a firm clang with a bright ringing deflection"
@recipe("block", min_len=0.45, max_len=0.8)
def _():
    d = 1.0
    m = Mix(d)
    m.add(modal(d, metal_modes(610, 7, 0.28, 0.8)), gain=-3, width=0.6)
    m.add(modal(d, metal_modes(1580, 4, 0.18, 0.6)), gain=-9, pan=0.2)
    m.add(click(0.006, 2500, 12000), gain=-3)
    m.add(thump(0.12, 200, 140, 0.03), gain=-6)
    skid = sweep(noise(0.12), (5000, 2500), 3) * env_ad(0.12, 0.002, 0.04)
    m.add(skid, at=0.01, gain=-14, pan=0.3)
    m.buf = reverb(m.buf, rt=0.35, mix=0.12)
    return m


# 16 ─ crystal: "card dissolving into a clear crystal: rising glassy resonance and a sprinkle of tiny sparkles"
#   (2026-11-16 사용자: 거슬리게 높음 → 한 옥타브 내리고 반짝이를 3.5 kHz 아래로, 6 kHz 위 깎음)
@recipe("crystal", min_len=0.7, max_len=1.1, lpf=6000)
def _():
    d = 0.9
    m = Mix(d)
    t = tt(d)
    rise = np.zeros_like(t)
    for f0, g in [(440, 1), (659, 0.6), (880, 0.35), (1318, 0.15)]:
        rise += g * glide_tone(d, f0 * 0.8, f0) * (1 + 0.2 * np.sin(2 * np.pi * 5 * t))
    rise *= env_pts(d, [(0, 0), (0.45, 1), (0.6, 0.8), (d, 0)]) ** 1.5
    m.add(rise, gain=-8, width=1)
    m.add(modal(0.7, [(1318, 0.3, 1), (1976, 0.2, 0.4), (2637, 0.12, 0.2)]), at=0.42, gain=-10)
    m.add(sparkle(d, 16, 1500, 3500, 0.07, start=0.05, end=0.8, decay_rate=0.3), gain=-15, width=1)
    m.buf = reverb(m.buf, rt=0.8, mix=0.22, damp=5000)
    return m


# ui_filter: feel.js 필터 단추(sfx_common.json) — ui_tab 과 같은 집안: 빳빳한 종이 탭을 가볍게 튕김 + 아주 작은 놋쇠 딸깍
@recipe("ui_filter", lpf=7000, min_len=0.12)
def _():
    m = Mix(0.2)
    m.add(paper_slide(0.07, 1400, 2200, 1.2, 0.25), gain=-4)
    m.add(wood_tock(0.1, 560, 0.014, 0.5), at=0.02, gain=-3)
    m.add(click(0.003, 2000, 6500), at=0.02, gain=-12)
    return m
