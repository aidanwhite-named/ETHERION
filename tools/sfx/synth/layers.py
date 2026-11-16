"""문장 엔진이 쓰는 소리 층 — 각 함수는 (s=무게 0~1) 를 받아 모노 배열을 돌려준다.

s 가 클수록 낮고 · 길고 · 묵직하다(카드 레벨 · 문장의 무게 낱말).
높은 소리는 6~7 kHz 위를 깎는다(사용자: 너무 높으면 거슬림).
"""
from dsp import *  # noqa


def mixa(*parts):
    """길이가 다른 배열을 앞에 맞춰 더한다. (배열, 세기) 쌍도 된다."""
    parts = [(p, 1.0) if not isinstance(p, tuple) else p for p in parts]
    n = max(len(p) for p, _ in parts)
    out = np.zeros(n)
    for p, g in parts:
        out[: len(p)] += p * g
    return out


def U(a, b):
    return RNG.uniform(a, b)


def _e(d, pts):
    return env_pts(d, pts)


def wood_tock(d=0.08, f=420, tau=0.02, bright=0.5):
    return modal(d, [(f, tau, 1.0), (f * 2.49, tau * 0.6, 0.5 * bright), (f * 4.1, tau * 0.35, 0.3 * bright)])


# ── 움직임 ─────────────────────────────────────────────
def whoosh(s, fast=False, up=False):
    d = (0.1 if fast else 0.16) + 0.22 * s
    f0, f1 = (500 + 400 * (1 - s), 1400 + 1200 * (1 - s))
    if not up:
        f0, f1 = f1 * 1.1, f0 * 0.8
    x = sweep(noise(d, "pink"), [(0, f0), (0.6, max(f0, f1) * 1.05), (1, f1)], 0.9 + 0.6 * (1 - s))
    return lp(x * _e(d, [(0, 0), (d * 0.6, 1), (d, 0)]) ** 1.3, 6000)


def whistle(s, fast=False):
    d = 0.12 + 0.18 * s if not fast else 0.07 + 0.06 * s
    f0 = U(1800, 2800) * (1 - 0.3 * s)
    x = sweep(noise(d), (f0 * 1.15, f0 * 0.8), 9)
    x = x / (np.max(np.abs(x)) + 1e-9)
    return x * _e(d, [(0, 0), (d * 0.7, 1), (d, 0)])


def flutter(s, flaps=None):
    flaps = flaps or int(2 + 3 * s)
    gap = 0.07 + 0.05 * s
    d = gap * flaps + 0.12
    out = np.zeros(n_(d))
    for i in range(flaps):
        dd = gap * 0.9
        g = bp(noise(dd, "pink"), 250 + 200 * (1 - s), 2200) * _e(dd, [(0, 0), (dd * 0.3, 1), (dd, 0)])
        a = n_(i * gap * U(0.9, 1.1))
        out[a:a + len(g)] += g[: len(out) - a] * (0.6 + 0.4 * (i == 0))
    return lp(out, 4500)


def rustle(s, d=None):
    d = d or 0.25 + 0.3 * s
    def g(_):
        dd = U(0.008, 0.03)
        f = U(1200, 5000)
        return bp(noise(dd), f * 0.6, min(f * 1.6, 9000)) * env_ad(dd, 0.001, dd / 3)
    x = grains(d, int(40 + 60 * s), g)
    return lp(x * _e(d, [(0, 0), (0.04, 1), (d * 0.6, 0.6), (d, 0)]), 6500)


def wind(s, d=None):
    d = d or 0.4 + 0.5 * s
    x = sweep(noise(d, "pink"), [(0, 350), (0.5, 900 + 600 * (1 - s)), (1, 420)], 2.2)
    return x * _e(d, [(0, 0), (d * 0.45, 1), (d, 0)])


def steps(s, count=2):
    d = 0.2 * count + 0.1
    out = np.zeros(n_(d))
    for i in range(count):
        g = lp(bp(noise(0.1, "pink"), 90, 1200), 1500) * env_ad(0.1, 0.004, 0.025)
        g += thump(0.1, 110 - 30 * s, 70 - 20 * s, 0.03) * (0.5 + 0.5 * s)
        a = n_(i * (0.17 - 0.04 * s) * U(0.9, 1.1))
        out[a:a + len(g)] += g * U(0.7, 1)
    return out


def hooves(s):
    return steps(s, count=4)


# ── 부딪침 ─────────────────────────────────────────────
def thud(s, soft=False):
    d = 0.22 + 0.45 * s
    f0 = 150 - 85 * s
    y = thump(d, f0 * 1.7, f0, 0.05 + 0.12 * s)
    y += lp(noise(d, "pink"), 500 + 900 * (1 - s)) * env_ad(d, 0.0005, 0.02 + 0.03 * s) * (0.35 if soft else 0.7)
    if not soft:
        y = mixa(y, (click(0.006, 600, 4000), 0.6))
    if s > 0.6:
        y += lp(noise(d, "brown"), 200) * env_pts(d, [(0, 0), (0.02, 1), (d, 0)]) ** 2 * 0.6
    return y


def boom(s):
    d = 0.5 + 0.7 * s
    y = thump(d, 120 - 40 * s, 45, 0.12 + 0.18 * s)
    y += lp(noise(d, "brown"), 300) * env_ad(d, 0.003, 0.15 + 0.2 * s) * 0.8
    return mixa(y, (bp(noise(0.05), 400, 3000) * env_ad(0.05, 0.0003, 0.012), 0.5))


def knock(s, count=1):
    d = 0.12 * count + 0.15
    out = np.zeros(n_(d))
    for i in range(count):
        g = wood_tock(0.15, U(170, 260) * (1.4 - 0.6 * s), 0.025 + 0.02 * s, 0.4) + thump(0.15, 140, 100, 0.025) * 0.5
        a = n_(i * 0.11)
        out[a:a + len(g)] += g
    return out


def wood(s):
    f = U(300, 520) * (1.3 - 0.6 * s)
    return mixa(wood_tock(0.25, f, 0.03 + 0.04 * s, 0.5), (click(0.004, 1000, 5000), 0.4), (thump(0.2, f * 0.5, f * 0.35, 0.03), 0.4))


def creak(s):
    d = 0.25 + 0.35 * s
    f = U(260, 480) * (1.2 - 0.5 * s)
    # 마찰 펄스열(스틱 슬립) 을 울림 필터로
    rate = U(30, 60)
    t = tt(d)
    ph = np.cumsum(rate * (1 + 0.3 * np.sin(2 * np.pi * U(1, 3) * t))) / SR
    pulses = (np.diff(np.floor(ph), prepend=0) > 0).astype(float)
    x = sweep(pulses + noise(d) * 0.05, (f, f * U(0.8, 1.25)), 12)
    x = x / (np.max(np.abs(x)) + 1e-9)
    return x * _e(d, [(0, 0), (d * 0.2, 1), (d * 0.8, 0.8), (d, 0)])


def crack(s, brittle=False):
    d = 0.18 + 0.2 * s
    y = bp(noise(d), 300 if not brittle else 1200, 5000) * env_ad(d, 0.0002, 0.012 + 0.01 * s)
    return mixa(y, (click(0.003, 1500, 9000), 0.8), (thump(d, 180 - 60 * s, 90, 0.03 + 0.03 * s), 0.6))


def debris(s, bright=False):
    d = 0.35 + 0.35 * s
    def chunk(_):
        dd = U(0.02, 0.06)
        f = U(900, 3200) if bright else U(350, 1800) * (1.2 - 0.5 * s)
        return bp(noise(dd), f * 0.6, f * 1.6) * env_ad(dd, 0.0003, U(0.004, 0.012))
    return lp(grains(d, int(18 + 22 * s), chunk, decay_rate=0.8), 6500)


def crunch(s):
    return mixa((crack(s), 0.7), (debris(s * 0.6), 0.8), (wet(s), 0.3))


def wet(s):
    d = 0.18 + 0.2 * s
    x = sweep(noise(d, "pink"), [(0, 300), (0.3, 900), (0.6, 400), (1, 700)], 3)
    return lp(x * _e(d, [(0, 0), (0.01, 1), (d, 0)]) ** 1.5, 2500)


def stone(s):
    return mixa((thud(s), 0.8), (debris(s * 0.7), 0.5), (crack(s), 0.3))


def grind(s):
    d = 0.3 + 0.4 * s
    x = bp(noise(d, "pink"), 150, 1400 - 500 * s)
    am = 0.6 + 0.4 * np.abs(np.sin(2 * np.pi * U(9, 16) * tt(d)))
    return x * am * _e(d, [(0, 0), (0.05, 1), (d * 0.8, 0.8), (d, 0)])


# ── 쇠 ────────────────────────────────────────────────
def clang(s, ring=0.0):
    tau = 0.12 + 0.22 * s + 0.4 * ring
    d = min(1.6, tau * 4 + 0.1)
    f0 = U(380, 620) * (1.3 - 0.5 * s)
    y = modal(d, metal_modes(f0, 7, tau, 0.75)) + modal(d, metal_modes(f0 * U(2.2, 2.6), 4, tau * 0.6, 0.6)) * 0.5
    return mixa(lp(y, 7000), (click(0.005, 1500, 9000), 0.8), (thump(0.15, 200, 140, 0.03), 0.5))


def clank(s):
    d = 0.25
    f0 = U(260, 420) * (1.2 - 0.4 * s)
    return mixa(modal(d, [(f0, 0.05, 1), (f0 * 2.37, 0.035, 0.7), (f0 * 3.8, 0.025, 0.5)]), (click(0.004, 800, 5000), 0.6))


def scrape(s):
    d = 0.25 + 0.3 * s
    f = U(2200, 3600)
    x = sweep(noise(d), (f * 0.8, f * 1.2), 7)
    x /= np.max(np.abs(x)) + 1e-9
    x = x * _e(d, [(0, 0), (0.02, 0.6), (d * 0.85, 1), (d, 0)])
    x += modal(d, [(f * 0.5, 0.2, 0.25)]) * _e(d, [(0, 0), (d * 0.8, 1), (d, 0.5)])
    return lp(x, 7000)


def chain(s):
    d = 0.25 + 0.25 * s
    def link(_):
        f = U(2200, 4200)
        return mixa(modal(0.05, [(f, 0.012, 1), (f * 1.6, 0.008, 0.5)]), (click(0.002, 2000, 8000), 0.4))
    return lp(grains(d, int(12 + 12 * s), link, decay_rate=0.4), 7000)


def mech(s, steam=False):
    d = 0.25 + 0.25 * s
    rate = U(14, 26)
    def tick(_):
        f = U(1600, 2600) * (1.2 - 0.4 * s)
        return mixa(modal(0.04, [(f, 0.008, 1), (f * 2.1, 0.005, 0.4)]), (click(0.002, 1500, 6000), 0.4))
    out = np.zeros(n_(d))
    for i in range(int(d * rate)):
        g = tick(i)
        a = n_(i / rate)
        out[a:a + len(g)] += g[: len(out) - a]
    if steam:
        out = mixa(out, (hiss(s), 0.5))
    return out


def hiss(s, d=None):
    d = d or 0.3 + 0.4 * s
    x = bp(noise(d), 2500, 7500)
    return x * _e(d, [(0, 0), (0.02, 1), (d * 0.5, 0.6), (d, 0)]) * 0.5


def coin(s):
    f0 = U(2600, 3300)
    return modal(0.5, [(f0, 0.25, 1.0), (f0 * 1.0035, 0.25, 0.7), (f0 * 1.72, 0.15, 0.5), (f0 * 2.51, 0.1, 0.3)], a=0.0003)


def buckle(s):
    return mixa((clank(s), 0.6), (leather(s), 0.6))


def leather(s):
    d = 0.15 + 0.1 * s
    x = bp(noise(d, "pink"), 200, 1500) * env_ad(d, 0.003, 0.04)
    return mixa(x, (creak(s * 0.4), 0.25))


# ── 빛 · 유리 · 종 ─────────────────────────────────────
def chime(s):
    f0 = U(700, 1150) * (1.2 - 0.5 * s)
    tau = 0.35 + 0.5 * s
    y = modal(tau * 4, [(f0, tau, 1), (f0 * 2.0, tau * 0.6, 0.35), (f0 * 3.01, tau * 0.35, 0.18), (f0 * 1.003, tau, 0.5)], a=0.001)
    return lp(y, 6500)


def bellt(s):
    f0 = U(260, 420) * (1.25 - 0.55 * s)
    return lp(bell(1.0 + 1.2 * s, f0, 0.6 + 0.8 * s, 0.6), 6000)


def glass(s):
    d = 0.4 + 0.3 * s
    y = crack(s * 0.3, brittle=True) * 0.6
    def shard(_):
        f = U(1800, 4500)
        return modal(0.15, [(f, U(0.02, 0.06), 1), (f * 2.3, 0.02, 0.4)])
    return mixa(lp(y, 7500), lp(grains(d, int(14 + 10 * s), shard, decay_rate=0.7), 7000))


def shimmer(s, d=None):
    d = d or 0.4 + 0.4 * s
    y = sparkle(d, int(12 + 10 * s), 1600, 5200, 0.07, decay_rate=0.3)
    t = tt(d)
    pad = np.zeros_like(t)
    base = U(520, 780)
    for r, g in [(1, 1), (1.5, 0.5), (2, 0.35)]:
        pad += g * np.sin(2 * np.pi * base * r * t + 3 * np.sin(2 * np.pi * 5 * t) * 0.02)
    pad *= _e(d, [(0, 0), (d * 0.5, 1), (d, 0)])
    return lp(y + pad * 0.25, 6500)


def swell(s, down=False, d=None):
    """마법 · 빛 · 에너지가 부풂 — 낮은 톱니 화음을 열리는 필터로."""
    d = d or 0.35 + 0.45 * s
    t = tt(d)
    base = U(90, 140) * (1.2 - 0.5 * s)
    y = np.zeros_like(t)
    for r in [1, 1.5, 2.0, 1.006]:
        y += signal.sawtooth(2 * np.pi * base * r * t + U(0, 6))
    cut = (1800, 250) if down else (250, 2200)
    y = sweep(y, cut, 1.1, "lp")
    e = _e(d, [(0, 0), (d * 0.75, 1), (d, 0)]) if not down else _e(d, [(0, 0), (0.03, 1), (d, 0)])
    return y * e / 4


def drone(s, d=None):
    d = d or 0.5 + 0.5 * s
    t = tt(d)
    base = U(45, 70) * (1.2 - 0.3 * s)
    y = sum(np.sin(2 * np.pi * base * r * t + U(0, 6)) * g for r, g in [(1, 1), (2.01, 0.5), (3.0, 0.3), (1.5, 0.3)])
    y *= 1 + 0.25 * np.sin(2 * np.pi * U(4, 7) * t)
    return lp(y, 900) * _e(d, [(0, 0), (d * 0.3, 1), (d * 0.7, 0.9), (d, 0)]) / 2


def reverse_swell(s):
    d = 0.3 + 0.35 * s
    x = lp(noise(d, "pink"), 3000) * np.exp(-tt(d) / (d * 0.3))
    x += lp(modal(d, metal_modes(U(200, 320), 4, d * 0.4, 0.5)), 3000) * 0.4
    return x[::-1] * _e(d, [(0, 1), (d * 0.97, 1), (d, 0)])


# ── 물 ────────────────────────────────────────────────
def bubble(f=None, d=0.04):
    f = f or U(400, 1300)
    t = tt(d)
    fr = f * (1 + 2.5 * t / d * 0.4)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t / (d * 0.35)) * np.clip(t / 0.002, 0, 1)


def bubbles(s, d=None, count=None):
    d = d or 0.3 + 0.3 * s
    return grains(d, count or int(10 + 15 * s), lambda _: bubble(U(350, 1200) * (1.2 - 0.5 * s), U(0.02, 0.06)), decay_rate=0.4)


def splash(s):
    d = 0.3 + 0.35 * s
    x = bp(noise(d), 350, 5000) * _e(d, [(0, 0), (0.008, 1), (d * 0.3, 0.4), (d, 0)])
    return mixa(lp(x, 5500), (bubbles(s, d), 0.4), (thump(0.15, 140, 90, 0.04), 0.4 * s))


def wave(s):
    d = 0.5 + 0.5 * s
    x = sweep(noise(d, "pink"), [(0, 250), (0.55, 2000), (1, 500)], 0.8, "lp")
    return mixa(x * _e(d, [(0, 0), (d * 0.55, 1), (d, 0)]), (bubbles(s * 0.5, d), 0.15))


def drip(s):
    return grains(0.35, 3, lambda _: bubble(U(700, 1400), 0.05))


# ── 불 · 폭발 · 번개 ───────────────────────────────────
def fire(s):
    d = 0.35 + 0.4 * s
    w = sweep(noise(d, "brown"), [(0, 150), (0.25, 900), (1, 300)], 0.7, "lp")
    w *= _e(d, [(0, 0), (0.04, 1), (d * 0.4, 0.7), (d, 0)])
    return mixa(w, (crackle(d, 22, 900, 3200), 0.25))


def crackles(s):
    d = 0.35 + 0.3 * s
    return crackle(d, 30, 900, 3500) * _e(d, [(0, 0), (0.03, 1), (d, 0)])


def blast(s):
    d = 0.4 + 0.5 * s
    y = np.pad(click(0.005, 800, 8000), (0, n_(d)))[: n_(d)]
    y += lp(noise(d), 3000 - 1500 * s) * env_ad(d, 0.0005, 0.05 + 0.08 * s)
    y += thump(d, 110 - 40 * s, 45, 0.08 + 0.1 * s) * 0.9
    y += lp(noise(d, "brown"), 250) * env_ad(d, 0.002, 0.15 + 0.15 * s) * 0.6
    return y


def pop(s):
    return mixa(click(0.006, 500, 4000), (thump(0.08, 300, 150, 0.015), 0.6))


def zap(s):
    d = 0.18 + 0.25 * s
    t = tt(d)
    fc = U(90, 160)
    buzz = np.sign(np.sin(2 * np.pi * fc * t + 4 * np.sin(2 * np.pi * U(30, 70) * t))) * 0.5
    buzz = bp(buzz, 300, 5000)
    cr = grains(d, int(30 + 30 * s), lambda _: click(U(0.001, 0.004), 2000, 8000))
    e = _e(d, [(0, 0), (0.005, 1), (d * 0.5, 0.6), (d, 0)])
    return lp((buzz * 0.6 + cr) * e, 7000)


def electric_hum(s, up=True):
    d = 0.35 + 0.35 * s
    f = (np.geomspace(150, 600, n_(d)) if up else np.full(n_(d), 120.0))
    ph = 2 * np.pi * np.cumsum(f) / SR
    y = signal.sawtooth(ph) * 0.4 + np.sin(ph * 2) * 0.3
    y = lp(y, 3500)
    return y * _e(d, [(0, 0), (d * 0.8, 1), (d, 0)])


def thunder(s):
    d = 0.8 + 0.6 * s
    y = np.pad(crack(s) * 0.8, (0, n_(d)))[: n_(d)]
    r = lp(noise(d, "brown"), 400) * _e(d, [(0, 0), (0.03, 1), (0.3, 0.7), (d, 0)])
    r *= 1 + 0.4 * np.sin(2 * np.pi * 7 * tt(d)) * np.exp(-tt(d) * 3)
    return y + r


# ── 짐승 · 목소리 (말 없이) ────────────────────────────
def voice(s, kind="growl"):
    """성대 펄스 + 포먼트. growl · roar · screech · hoot · snort · call."""
    if kind == "snort":
        d = 0.18
        x = bp(noise(d, "pink"), 200, 1600) * _e(d, [(0, 0), (0.01, 1), (d, 0)])
        return x
    if kind == "hoot":
        d = 0.35
        f = U(330, 480)
        t = tt(d)
        return np.sin(2 * np.pi * f * t * (1 - 0.1 * t)) * _e(d, [(0, 0), (0.04, 1), (d * 0.6, 0.7), (d, 0)])
    d = {"growl": 0.35, "roar": 0.55, "screech": 0.3, "call": 0.55, "grunt": 0.15}[kind] * (0.8 + 0.6 * s)
    f0 = {"growl": 70, "roar": 110, "screech": 900, "call": 260, "grunt": 120}[kind] * (1.25 - 0.5 * s) * U(0.9, 1.1)
    t = tt(d)
    if kind == "screech":
        f = f0 * (1 + 0.35 * np.sin(np.pi * t / d)) * (1 + 0.02 * np.sin(2 * np.pi * 9 * t))
    elif kind == "call":
        f = f0 * (1 + 0.5 * np.sin(np.pi * t / d * 0.8))
    else:
        f = f0 * (1 + 0.15 * np.sin(np.pi * t / d)) * (1 + 0.03 * RNG.standard_normal(len(t)).cumsum() / np.sqrt(len(t)))
    src = signal.sawtooth(2 * np.pi * np.cumsum(f) / SR)
    if kind in ("growl", "roar", "grunt"):
        src *= 1 + 0.6 * np.sin(2 * np.pi * U(22, 34) * t)  # 거친 떨림
        src += noise(d, "pink") * 0.35
    forms = [(600, 1000), (1100, 1500), (2400, 3000)] if kind != "screech" else [(1500, 2600), (3000, 4200)]
    y = sum(bp(src, lo * (1.1 - 0.3 * s), hi * (1.1 - 0.3 * s)) * g for (lo, hi), g in zip(forms, [1, 0.6, 0.3]))
    y = lp(y, 5000)
    return y * _e(d, [(0, 0), (d * 0.12, 1), (d * 0.7, 0.8), (d, 0)])


def heartbeat(s):
    d = 0.6
    y = np.zeros(n_(d))
    for at, g in [(0, 1), (0.2, 0.7)]:
        h = thump(0.25, 75 - 15 * s, 50, 0.05)
        a = n_(at)
        y[a:a + len(h)] += h * g
    return lp(y, 400)


# ── 활 · 화살 · 깃 ─────────────────────────────────────
def pluck(f, d, damp=0.996):
    """Karplus-Strong 현."""
    N = int(SR / f)
    buf = RNG.uniform(-1, 1, N)
    out = np.zeros(n_(d))
    for i in range(len(out)):
        out[i] = buf[i % N]
        buf[i % N] = damp * 0.5 * (buf[i % N] + buf[(i + 1) % N])
    return out


def twang(s):
    d = 0.3 + 0.2 * s
    y = pluck(U(95, 150) * (1.2 - 0.4 * s), d, 0.993) * np.exp(-tt(d) / 0.08)
    return mixa(lp(y, 4000), (click(0.003, 800, 5000), 0.5))


def arrow_hit(s):
    return mixa(wood_tock(0.15, U(500, 750), 0.02, 0.6), (click(0.004, 1500, 7000), 0.7), (thump(0.1, 200, 150, 0.02), 0.4))


def tick(s):
    f = U(1500, 2500)
    return mixa(modal(0.05, [(f, 0.01, 1)]), (click(0.002, 1500, 7000), 0.5))


def paper(s):
    d = 0.15 + 0.15 * s
    x = sweep(noise(d, "pink"), (900, 1700), 0.9)
    return lp(x * _e(d, [(0, 0), (d * 0.4, 1), (d, 0)]), 5000)


def cloth_snap(s):
    d = 0.25
    x = bp(noise(d, "pink"), 300, 3000) * _e(d, [(0, 0), (0.005, 1), (0.05, 0.4), (d, 0)])
    return mixa(x, (flutter(s * 0.5), 0.4))


def quill(s):
    d = 0.3
    x = bp(noise(d), 2500, 7000) * (0.5 + 0.5 * np.abs(np.sin(2 * np.pi * 14 * tt(d))))
    return x * _e(d, [(0, 0), (0.02, 1), (d, 0)]) * 0.6


def rumble(s, d=None):
    d = d or 0.5 + 0.6 * s
    x = lp(noise(d, "brown"), 160 + 200 * (1 - s))
    x *= 1 + 0.35 * np.sin(2 * np.pi * U(5, 9) * tt(d))
    return x * _e(d, [(0, 0), (d * 0.25, 1), (d, 0)])
