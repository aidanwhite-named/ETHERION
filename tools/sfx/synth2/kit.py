"""ETHERION 효과음 v2 — 소리 재료 (생성 AI 없음, numpy/scipy).

v1(tools/sfx/synth/)은 프롬프트 문장의 낱말마다 층을 쌓고 6~9 kHz 위를 깎아서 소리가 둔탁했다.
v2 는 문장을 옮기지 않는다. 소리 하나는 "앞머리(또렷한 어택) + 몸통(중역) + 성격(재료 · 원소) + 짧은 꼬리"로 짠다.
- 무게는 낮은 음이 아니라 길이 · 겹 · 중역(200~800 Hz)으로 낸다(폰 스피커는 300 Hz 아래가 거의 안 들린다).
- 높은 쪽은 살리되 3 kHz 위의 쇠 울림은 0.1초 안에 잦아들게 한다(길게 울리면 거슬린다).
모든 함수는 모노 배열을 돌려준다. 좌우 · 울림 · 마무리는 Mix · finish.
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "synth"))
from dsp import *  # noqa: E402,F401,F403
import dsp as _dsp  # noqa: E402


def U(a, b):
    return RNG.uniform(a, b)


def pick(seq):
    return seq[int(RNG.integers(0, len(seq)))]


def norm(x, g=1.0):
    return x * (g / (np.max(np.abs(x)) + 1e-9))


def mixa(*parts):
    """길이가 다른 배열을 앞에 맞춰 더한다. (배열, dB) 쌍도 된다."""
    parts = [(p, 0.0) if not isinstance(p, tuple) else p for p in parts]
    n = max(len(p) for p, _ in parts)
    out = np.zeros(n)
    for p, g in parts:
        out[: len(p)] += p * db(g)
    return out


def seq(*items):
    """[(초, 배열, dB) …] 을 한 줄로."""
    n = max(n_(t) + len(x) for t, x, _ in items)
    out = np.zeros(n)
    for t, x, g in items:
        i = n_(t) if t > 0 else 0
        out[i:i + len(x)] += x * db(g)
    return out


def sat(x, drive=2.0):
    return np.tanh(x * drive) / np.tanh(drive)


def ar(d, a=0.01, r=None, curve=2.0):
    """올라갔다(a) 내려오는 엔벨로프 — 끝은 0."""
    t = tt(d)
    r = r if r is not None else d - a
    e = np.clip(t / max(a, 1e-5), 0, 1) * np.clip((d - t) / max(r, 1e-5), 0, 1) ** curve
    return e


def swell(d, peak=0.7, up=2.0, down=1.5):
    """천천히 부풀었다 빠지는 엔벨로프 (peak = 꼭대기 위치 0~1)."""
    t = tt(d) / d
    return np.where(t < peak, (t / peak) ** up, np.clip((1 - t) / (1 - peak), 0, 1) ** down)


def sw(x, peak=0.7, up=2.0, down=1.5):
    """배열 길이에 맞춘 swell 엔벨로프를 곱한다."""
    t = np.arange(len(x)) / max(1, len(x) - 1)
    return x * np.where(t < peak, (t / peak) ** up, np.clip((1 - t) / (1 - peak), 0, 1) ** down)


def tone(f, d, tau=None, harm=(1.0,), vib=0.0, vibf=5.5, det=0.0):
    """배음 몇 개짜리 맑은 음. f 는 숫자 또는 (시작, 끝)."""
    n = n_(d)
    t = np.arange(n) / SR
    fc = np.geomspace(f[0], f[1], n) if not np.isscalar(f) else np.full(n, float(f))
    if vib:
        fc = fc * (1 + vib * np.sin(2 * np.pi * vibf * t))
    y = np.zeros(n)
    for v in ((1.0,) if not det else (1 - det, 1 + det)):
        ph = 2 * np.pi * np.cumsum(fc * v) / SR
        for k, g in enumerate(harm):
            if g:
                y += g * np.sin(ph * (k + 1))
    if tau:
        y *= np.exp(-t / tau)
    return y


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


# ── 앞머리 · 몸통 ────────────────────────────────────────
def snap(d=0.03, lo=1800, hi=12000, tau=0.004):
    """또렷한 '탁' — 아주 짧은 넓은 대역 노이즈."""
    return bp(noise(d), lo, hi) * env_ad(d, 0.0002, tau)


def punch(f0=170, f1=70, tau=0.07, drive=1.8, d=None):
    """몸통 '퍽' — 떨어지는 사인을 살짝 찌그러뜨려 배음(2 · 3배)을 얹는다. 폰에서도 들린다."""
    # 몸통은 150~450 Hz 에 둔다: 그 아래(서브)는 폰에서 안 들리고 다른 소리의 자리만 먹는다
    f0, f1 = f0 * 1.8, max(f1 * 2.6, 150.0)
    tau = tau * 0.6
    d = d or max(tau * 6, 0.06)
    th = bp(noise(d), 400, 3200) * env_ad(d, 0.0005, 0.018 + tau * 0.45)   # 맞는 순간의 넓은 '턱'
    return sat(thump(d, f0, f1, tau), drive) * 0.32 + norm(th) * 0.8


def knock(f=320, tau=0.03, bright=0.5, d=None):
    """나무 · 뼈 · 가죽의 중역 '톡'."""
    d = d or tau * 7
    return modal(d, [(f, tau, 1.0), (f * 2.42, tau * 0.6, 0.55 * bright), (f * 4.3, tau * 0.38, 0.35 * bright),
                     (f * 6.6, tau * 0.25, 0.2 * bright)], jitter=0.01)


def slap(d=0.08, lo=500, hi=5000, tau=0.02):
    """살 · 가죽 · 천에 닿는 넓은 '찰싹'."""
    return bp(noise(d), lo, hi) * env_ad(d, 0.0008, tau)


def air(d, lo=5000, tau=None, a=0.002):
    x = hp(noise(d), lo)
    return x * (env_ad(d, a, tau) if tau else ar(d, d * 0.4))


# ── 움직임 ───────────────────────────────────────────────
def whoosh(d=0.18, f0=900, fp=4200, f1=1500, q=1.3, peak=0.55, airy=0.35):
    """휙 — 대역이 올라갔다 내려오는 바람. airy 는 6 kHz 위 숨결."""
    x = sweep(noise(d), [(0, f0), (peak, fp), (1, f1)], q)
    e = swell(d, peak, 2.2, 1.6)
    y = norm(x) * e
    if airy:
        y = y + air(d, 6000) * swell(d, peak, 3, 2) * airy
    return y


def flutter(flaps=3, gap=0.06, lo=500, hi=4500):
    """날갯짓 — 짧은 바람 여러 번."""
    d = gap * flaps + 0.08
    out = np.zeros(n_(d))
    for i in range(flaps):
        dd = gap * U(0.8, 1.0)
        g = bp(noise(dd), lo, hi) * ar(dd, dd * 0.3, curve=1.5)
        a = n_(i * gap * U(0.92, 1.08))
        m = min(len(g), len(out) - a)
        out[a:a + m] += g[:m] * (1.0 if i == 0 else U(0.6, 0.85))
    return out


# ── 쇠 ───────────────────────────────────────────────────
def clang(f0=640, tau=0.22, bright=0.7, n=8, d=None, cap=0.09):
    """쇠가 부딪치는 울림. 2.5 kHz 위 모드는 cap 초 안에 잦아든다(쨍하고 오래 남지 않게)."""
    d = d or min(1.2, tau * 4)
    modes = []
    for i, r in enumerate([1.0, 1.58, 2.32, 3.07, 3.86, 5.41, 6.97, 8.83][:n]):
        f = f0 * r * (1 + U(-0.012, 0.012))
        t_ = tau / (1 + 0.55 * i)
        if f > 2500:
            t_ = min(t_, cap)
        modes.append((f, t_, bright ** i))
    return modal(d, modes, a=0.0003)


def shing(d=0.16, f0=3200, n=5, tau=0.07):
    """칼날이 스치는 얇은 '싱' — 짧다."""
    modes = [(f0 * r * (1 + U(-0.02, 0.02)), tau * U(0.6, 1.1), 0.75 ** i) for i, r in enumerate([1.0, 1.31, 1.77, 2.23, 2.9][:n])]
    y = modal(d, modes, a=0.004)
    return y + hp(noise(d), 5000) * ar(d, 0.012, curve=3) * 0.5


def clink(f0=2100, tau=0.05):
    """작은 쇠 조각 '칭'."""
    return modal(tau * 6, [(f0, tau, 1.0), (f0 * 1.52, tau * 0.7, 0.6), (f0 * 2.4, tau * 0.45, 0.35)], a=0.0003, jitter=0.02)


def ratchet(count=6, d=0.3, f=1900, accel=0.0):
    """톱니 '드르륵'."""
    out = np.zeros(n_(d + 0.05))
    for i in range(count):
        u = (i / count) ** (1 + accel)
        g = mixa(modal(0.03, [(f * U(0.9, 1.1), 0.005, 1.0), (f * 2.7, 0.003, 0.5)]), snap(0.01, 2500, 9000, 0.002) * 0.6)
        a = n_(u * d)
        out[a:a + len(g)] += g * U(0.6, 1.0)
    return out


def steam(d=0.35, lo=2500, tau=0.12):
    """증기 '치익'."""
    x = sweep(noise(d), (7000, lo), 0.8, "bp") + hp(noise(d), 6000) * 0.5
    return x * env_ad(d, 0.012, tau)


# ── 무기 · 몸 ────────────────────────────────────────────
def slash(s=0.4):
    """베기: 짧은 휙 + 칼날 싱 + 살을 가르는 '츅'."""
    w = whoosh(0.11 + 0.06 * s, 1500, 6500 - 1500 * s, 2600, 2.2, 0.6, 0.5)
    cut = seq((0.0, snap(0.05, 2500, 11000, 0.009), 0), (0.002, slap(0.12, 500, 3200, 0.03 + 0.025 * s), 3))
    t0 = len(w) / SR * 0.6
    return seq((0, w, -9), (t0, cut, 0), (t0, shing(0.14, U(2900, 3600) * (1 - 0.25 * s), 4, 0.05 + 0.03 * s), -14),
               (t0, knock(950 - 250 * s, 0.016, 0.9), -2), (t0, punch(190 - 50 * s, 85, 0.04 + 0.03 * s), 0))


def stab(s=0.4):
    """찌르기: 얇은 '슉' + 단단한 '툭'."""
    w = whoosh(0.07, 2500, 7500, 4000, 3.0, 0.7, 0.6)
    t0 = 0.045
    return seq((0, w, -7), (t0, snap(0.035, 3000, 12000, 0.005), 0), (t0, knock(900 - 250 * s, 0.014, 0.8), -5),
               (t0 + 0.003, punch(210 - 60 * s, 100, 0.03 + 0.02 * s), -3))


def claws(s=0.4, n=3):
    """발톱: 빠르게 잇단 찢는 소리."""
    items = []
    gap = 0.032 + 0.012 * s
    for i in range(n):
        dd = 0.075 + 0.03 * s
        x = sweep(noise(dd), (U(4200, 5200), U(1300, 1700)), 1.6)
        t = tt(dd)
        rip = 0.55 + 0.45 * np.sign(np.sin(2 * np.pi * U(110, 150) * t))
        x = norm(x) * env_ad(dd, 0.001, 0.022 + 0.012 * s) * rip + air(dd, 6000, 0.012) * 0.4
        items.append((i * gap, x, 0 if i == n - 1 else -3))
    t0 = (n - 1) * gap
    items.append((t0, punch(170 - 40 * s, 80, 0.04 + 0.03 * s), -1))
    items.append((t0, slap(0.12, 500, 3000, 0.03 + 0.02 * s), 0))
    return seq(*items)


def bite(s=0.4):
    """물기: 턱이 '딱' 닫히고 으드득."""
    f = 1500 - 500 * s
    clack = seq((0, knock(f, 0.011, 1.0), 0), (0.014, knock(f * 0.82, 0.012, 1.0), -2), (0, snap(0.02, 2500, 10000, 0.003), -3))
    def g(_):
        dd = U(0.01, 0.022)
        fc = U(700, 2600)
        return bp(noise(dd), fc * 0.7, fc * 1.6) * env_ad(dd, 0.0003, dd / 3)
    crunch = grains(0.09 + 0.05 * s, int(7 + 6 * s), g, decay_rate=0.8)
    return seq((0, clack, 0), (0.02, crunch, -4), (0.004, punch(150 - 40 * s, 70, 0.045 + 0.03 * s), -4),
               (0.01, slap(0.08, 500, 3000, 0.025), -8))


def smash(s=0.5):
    """내려치기 · 주먹 · 몸통 박치기 — 묵직하되 중역이 또렷하게."""
    return seq((0, snap(0.04, 1500, 11000, 0.007), 0), (0, punch(150 - 50 * s, 48, 0.07 + 0.07 * s, 2.4), 0),
               (0.002, knock(420 - 110 * s, 0.03 + 0.02 * s, 0.9), -3), (0.003, slap(0.16, 600, 4500, 0.035 + 0.035 * s), 4))


def rubble(d=0.3, count=14, lo=900, hi=4500):
    """돌 부스러기 '후두둑'."""
    def g(_):
        f = U(lo, hi)
        return mixa(modal(0.03, [(f, U(0.004, 0.012), 1.0), (f * 1.7, 0.004, 0.5)]), snap(0.008, 2000, 8000, 0.002) * 0.4)
    return grains(d, count, g, decay_rate=1.2)


def gunshot(s=0.4):
    """화약 '탕' — 날카로운 앞머리 + 터지는 몸통 + 짧게 구르는 꼬리."""
    d = 0.32 + 0.35 * s
    crack = hp(noise(0.02), 2500) * env_ad(0.02, 0.0002, 0.0035)
    blast = sweep(noise(d), [(0, 9500), (0.1, 2800 - 1200 * s), (1, 600)], 0.7, "lp") * env_ad(d, 0.0005, 0.045 + 0.06 * s)
    mid = bp(noise(d), 350, 1800) * env_ad(d, 0.001, 0.05 + 0.05 * s)
    roll = bp(noise(d, "pink"), 250, 2600) * env_ad(d, 0.02, 0.1 + 0.14 * s)
    return seq((0, crack, 3), (0, norm(hp(blast, 250)), 2), (0, norm(mid), 0), (0, punch(170 - 60 * s, 50, 0.06 + 0.07 * s, 2.5), -4), (0.01, norm(roll), -10))


def cannon(s=0.7):
    g = gunshot(min(1.0, s + 0.2))
    return seq((0, g, 0), (0, punch(110, 38, 0.16 + 0.1 * s, 3.0), -6), (0.03, norm(bp(noise(0.5, "pink"), 120, 900) * env_ad(0.5, 0.01, 0.16)), -6))


def twang(s=0.3):
    """활시위 '팅'."""
    f = 240 - 70 * s
    t = tt(0.16)
    y = np.sin(2 * np.pi * f * t + 2.5 * np.exp(-t / 0.02) * np.sin(2 * np.pi * f * 2.01 * t)) * np.exp(-t / 0.045)
    return mixa(y, snap(0.02, 1500, 7000, 0.003) * 0.5)


def arrow_hit(s=0.3):
    """화살: '쉭' 날아와 '탁' 박히고 살대가 떤다."""
    fl = sweep(noise(0.06), (6500, 3000), 7) * ar(0.06, 0.035, curve=2)
    t0 = 0.05
    t = tt(0.14)
    quiver = np.sin(2 * np.pi * (300 - 60 * s) * t) * np.exp(-t / 0.035) * (0.6 + 0.4 * np.sin(2 * np.pi * 38 * t))
    return seq((0, norm(fl), -8), (t0, snap(0.03, 2500, 11000, 0.004), 0), (t0, knock(1050 - 300 * s, 0.016, 0.9), -1),
               (t0 + 0.004, quiver, -9), (t0, punch(200 - 50 * s, 95, 0.03), -6))


def whip(s=0.3):
    """채찍 · 덩굴 '짝'."""
    w = whoosh(0.1, 800, 6000, 5000, 2.5, 0.85, 0.5)
    return seq((0, w, -8), (0.085, hp(noise(0.03), 1500) * env_ad(0.03, 0.0002, 0.006), 0), (0.086, slap(0.1, 500, 3500, 0.028 + 0.02 * s), 2),
               (0.086, knock(700 - 200 * s, 0.014, 0.9), -3), (0.086, punch(190 - 40 * s, 90, 0.035), -4))


def growl(d=0.3, f=85, s=0.5):
    """짐승의 낮은 으르렁 — 톱니파를 떨게 해서 입 모양 대역으로 거른다."""
    t = tt(d)
    fm_ = f * (1 + 0.06 * np.sin(2 * np.pi * U(18, 26) * t)) * np.geomspace(1.08, 0.9, len(t))
    ph = 2 * np.pi * np.cumsum(fm_) / SR
    src = signal.sawtooth(ph) * (0.6 + 0.4 * signal.sawtooth(2 * np.pi * U(28, 40) * t, 0.3))
    y = bp(src, 380, 900) + 0.6 * bp(src, 1100, 1900) + 0.25 * bp(noise(d), 1500, 4000) * (0.5 + 0.5 * np.sin(2 * np.pi * 31 * t))
    return y * swell(d, 0.3, 1.2, 1.4)


# ── 원소 ─────────────────────────────────────────────────
def fire_whoosh(d=0.4, s=0.4, peak=0.2):
    """불길 '화륵' — 열렸다 잦아드는 불 소리 + 일렁임."""
    x = sweep(noise(d, "pink"), [(0, 500), (peak, 5200 - 1200 * s), (1, 900)], 0.8, "lp")
    turb = 1 + 0.55 * norm(lp(noise(d), 28))
    y = norm(hp(x * turb, 260)) * swell(d, peak, 1.2, 1.6)
    return y + norm(bp(noise(d), 1500, 6000)) * swell(d, peak, 1.6, 2.0) * 0.35 + air(d, 5500) * swell(d, peak, 2, 2.2) * 0.3


def sizzle(d=0.3, rate=70):
    """불똥 '치직'."""
    return crackle(d, rate, 2200, 8000, 0.003) * env_ad(d, 0.003, d / 2.5) + hp(noise(d), 5000) * env_ad(d, 0.004, d / 4) * 0.25


def fire_burst(s=0.4):
    """불이 터지며 붙는 소리."""
    return seq((0, punch(130 - 30 * s, 50, 0.07 + 0.06 * s, 2.2), -5), (0, snap(0.03, 1500, 9000, 0.005), -1),
               (0, fire_whoosh(0.3 + 0.3 * s, s, 0.12), 0), (0.02, sizzle(0.25 + 0.2 * s, 80), -9))


def explosion(s=0.5):
    d = 0.5 + 0.5 * s
    body = sweep(noise(d), [(0, 7000), (0.08, 2200), (1, 400)], 0.7, "lp") * env_ad(d, 0.0006, 0.09 + 0.1 * s)
    return seq((0, snap(0.03, 2000, 12000, 0.005), 2), (0, norm(hp(body, 250)), 2), (0, punch(125, 40, 0.11 + 0.1 * s, 3.0), -4),
               (0, norm(bp(noise(d), 500, 3000) * env_ad(d, 0.002, 0.08 + 0.06 * s)), 0),
               (0.05, rubble(0.35 + 0.2 * s, int(10 + 12 * s)), -12), (0.03, fire_whoosh(d, s, 0.1), -8))


def bubble(f=900, d=0.05):
    t = tt(d)
    ph = 2 * np.pi * np.cumsum(f * (1 + 0.7 * t / d)) / SR
    return np.sin(ph) * np.sin(np.pi * t / d) ** 1.5


def bubbles(d=0.3, count=8, lo=500, hi=2600):
    return grains(d, count, lambda i: bubble(np.exp(U(np.log(lo), np.log(hi))), U(0.03, 0.07)), decay_rate=0.4)


def drops(d=0.3, count=4, lo=1800, hi=4200):
    def g(_):
        f = U(lo, hi)
        t = tt(0.06)
        return np.sin(2 * np.pi * np.cumsum(f * (1 + 0.25 * np.exp(-t / 0.008))) / SR) * np.exp(-t / 0.014)
    return grains(d, count, g)


def splash(s=0.4):
    """물이 '철썩' 튀는 소리."""
    d = 0.22 + 0.25 * s
    body = bp(noise(d), 700 - 200 * s, 7500) * env_ad(d, 0.004, 0.05 + 0.07 * s)
    spray = hp(noise(d), 4500) * env_ad(d, 0.015, 0.09 + 0.08 * s)
    return seq((0, norm(body), 0), (0.01, norm(spray), -7), (0, punch(210 - 60 * s, 90, 0.035 + 0.03 * s, 1.5), -5),
               (0.03, bubbles(0.2 + 0.15 * s, int(6 + 8 * s)), -8), (0.12, drops(0.2, 3), -12))


def wave(d=0.6, s=0.4, peak=0.5):
    """밀려오는 물결."""
    x = sweep(noise(d, "pink"), [(0, 500), (peak, 3600), (1, 800)], 0.7, "lp")
    y = norm(hp(x, 260)) * swell(d, peak, 1.6, 1.4)
    return y + hp(noise(d), 4000) * swell(d, min(0.95, peak + 0.08), 3, 1.5) * 0.35


def zap(d=0.25, s=0.4):
    """번개 '파직' — 날카로운 균열 + 끊기며 지직거리는 방전."""
    n = n_(d)
    crack = hp(noise(0.02), 1800) * env_ad(0.02, 0.0002, 0.004)
    # 무작위로 끊기는 문(게이트): 방전의 거친 떨림
    rate = U(90, 160)
    k = max(2, int(d * rate))
    gate = np.repeat((RNG.uniform(0, 1, k) > 0.42).astype(float), int(np.ceil(n / k)))[:n]
    gate = lp(gate, 2500)
    buzz = bp(noise(d), 1300, 9000) * gate * env_ad(d, 0.001, d / (3.2 - 1.2 * s))
    t = tt(0.07)
    chirp = signal.sawtooth(2 * np.pi * np.cumsum(np.geomspace(2800, 350, len(t))) / SR) * np.exp(-t / 0.02)
    return seq((0, crack, 0), (0.002, norm(buzz), -2), (0, bp(chirp, 500, 5000), -8), (0, punch(180, 80, 0.03 + 0.03 * s), -7))


def thunder(d=0.7, s=0.6):
    x = bp(noise(d, "pink"), 100, 700) * env_ad(d, 0.01, d / 3.5)
    roll = bp(noise(d, "pink"), 250, 1600) * env_ad(d, 0.03, d / 3) * (0.6 + 0.4 * norm(lp(noise(d), 12)))
    return norm(x) + norm(roll) * 0.8


def whine(d=0.3, f0=500, f1=2600):
    """충전이 차오르는 높아지는 음."""
    y = tone((f0, f1), d, harm=(1.0, 0.35, 0.15), vib=0.01, vibf=27)
    return y * swell(d, 0.92, 1.6, 0.8)


def gust(d=0.4, s=0.4, peak=0.5):
    """바람 '휘잉' — 공명하는 바람 + 가는 휘파람."""
    fp = 2400 - 700 * s
    x = sweep(noise(d), [(0, 600), (peak, fp), (1, 800)], 3.2)
    wh = sweep(noise(d), [(0, 1100), (peak, fp * 1.6), (1, 1300)], 11)
    e = swell(d, peak, 1.6, 1.5)
    return norm(x) * e + norm(wh) * e ** 1.5 * 0.35 + air(d, 6500) * e * 0.3


def rock_hit(s=0.5):
    """돌 · 흙이 부딪는 소리."""
    def stone():
        ms = [(U(500, 3800), U(0.006, 0.022), U(0.4, 1.0)) for _ in range(9)]
        return modal(0.1, ms, a=0.0003)
    return seq((0, snap(0.03, 1500, 9000, 0.004), -3), (0, stone(), 0), (0, punch(135 - 40 * s, 45, 0.07 + 0.07 * s, 2.2), -1),
               (0.02, rubble(0.22 + 0.2 * s, int(8 + 10 * s)), -9))


def quake(d=0.6, s=0.6):
    x = bp(noise(d, "pink"), 110, 600) * swell(d, 0.25, 1, 1.5) * (0.6 + 0.4 * norm(lp(noise(d), 14)))
    mid = bp(noise(d, "pink"), 300, 1400) * swell(d, 0.25, 1, 2)
    return norm(x) + norm(mid) * 0.7


def wood_hit(s=0.4):
    f = 420 - 150 * s
    return seq((0, snap(0.025, 1500, 9000, 0.004), 0), (0, knock(f, 0.035 + 0.02 * s, 1.0), 0), (0, knock(f * 2.3, 0.022, 0.9), -3),
               (0, punch(160 - 40 * s, 75, 0.04 + 0.03 * s), -5))


def wood_crack(s=0.4):
    def g(_):
        return mixa(snap(0.012, 1200, 9000, 0.002), knock(U(600, 1800), 0.006, 1.0) * 0.6)
    return seq((0, grains(0.06 + 0.05 * s, int(4 + 4 * s), g, decay_rate=0.5), 0), (0.0, knock(300 - 80 * s, 0.03, 0.7), -4))


def creak(d=0.25, f=180):
    """나무가 삐걱 — 끊기며 미끄러지는 소리."""
    t = tt(d)
    fc = f * (1 + 0.5 * t / d)
    src = signal.sawtooth(2 * np.pi * np.cumsum(fc) / SR)
    stick = (signal.sawtooth(2 * np.pi * np.cumsum(np.geomspace(18, 42, len(t))) / SR) > -0.2).astype(float)
    y = bp(src * lp(stick, 900), 500, 3200)
    return y * ar(d, d * 0.2, curve=1.2)


def rustle(d=0.25, count=40, lo=2500, hi=9000):
    """잎 · 깃 '사락'."""
    def g(_):
        dd = U(0.006, 0.02)
        f = U(lo, hi)
        return bp(noise(dd), f * 0.7, min(f * 1.5, 14000)) * env_ad(dd, 0.0008, dd / 3)
    return grains(d, count, g) * ar(d, d * 0.2, curve=1.2)


def dark_drone(d=0.5, f=110, s=0.5):
    """어둠의 낮은 울림 — 어긋난 두 음 + 2 · 3배음(폰에서도 들리게)."""
    y = tone(f, d, harm=(1.0, 0.7, 0.5, 0.3, 0.2), det=0.012) + 0.5 * tone(f * 1.06, d, harm=(0.6, 0.6, 0.4))
    t = tt(d)
    return sat(norm(y), 1.6) * (0.75 + 0.25 * np.sin(2 * np.pi * 6.5 * t))


def whisper(d=0.4, f=2600):
    """속삭이는 숨 — 떨리는 대역 노이즈."""
    t = tt(d)
    x = sweep(noise(d), (f * 1.3, f * 0.7), 2.5)
    return norm(x) * (0.55 + 0.45 * np.sin(2 * np.pi * U(8, 13) * t + U(0, 6)))


def suck(d=0.3, lo=500, hi=5000):
    """빨려 들어가는 소리 — 커지다가 뚝."""
    x = sweep(noise(d), (lo, hi), 1.8)
    t = tt(d) / d
    return norm(x) * t ** 3 + air(d, 6000) * t ** 4 * 0.4


def glass_ping(f=1760, tau=0.25, d=None):
    """맑은 유리 · 수정 음."""
    d = d or min(1.2, tau * 4.5)
    return modal(d, [(f, tau, 1.0), (f * 1.003, tau, 0.5), (f * 2.76, tau * 0.35, 0.3), (f * 5.4, tau * 0.15, 0.12)], a=0.0006)


def chime(f=1320, tau=0.35, d=None):
    """작은 종 — 유리보다 둥글다."""
    d = d or min(1.4, tau * 4.5)
    return modal(d, [(f, tau, 1.0), (f * 2.0, tau * 0.6, 0.45), (f * 3.0, tau * 0.4, 0.2), (f * 4.2, tau * 0.22, 0.12),
                     (f * 0.5, tau * 0.8, 0.25)], a=0.0008)


def marimba(f=440, tau=0.16):
    """나무 건반 '통' (숲)."""
    return mixa(modal(tau * 5, [(f, tau, 1.0), (f * 3.98, tau * 0.25, 0.3), (f * 9.6, tau * 0.1, 0.1)], a=0.0006), snap(0.01, 1500, 6000, 0.002) * 0.15)


def pluck(f=330, d=0.5, damp=0.5, bright=0.7):
    """줄 뜯는 소리 (Karplus–Strong)."""
    n = n_(d)
    p = max(2, int(round(SR / f)))
    buf = lp(RNG.uniform(-1, 1, p), 2000 + 9000 * bright, 1)
    out = np.empty(n)
    g = 0.990 + 0.009 * (1 - damp)
    a = 0.5
    prev = 0.0
    for i in range(n):
        j = i % p
        out[i] = buf[j]
        nxt = g * (a * buf[j] + (1 - a) * prev)
        prev = buf[j]
        buf[j] = nxt
    return out


def flute(f=880, d=0.3, breath=0.3):
    """숨이 섞인 피리 음 (바람)."""
    e = ar(d, min(0.04, d * 0.3), curve=1.3)
    y = tone(f, d, harm=(1.0, 0.25, 0.08), vib=0.006, vibf=5.2) * e
    return y + norm(bp(noise(d), f * 0.9, f * 1.1, 1)) * e * breath + norm(bp(noise(d), 2500, 7000)) * e * breath * 0.5


def pad(f, d, a=0.08, bright=0.5, det=0.006):
    """부드러운 화음 한 음 (합창 · 오르간 사이)."""
    h = [1.0, 0.5 * bright + 0.2, 0.33 * bright, 0.25 * bright, 0.12 * bright]
    return tone(f, d, harm=h, det=det, vib=0.003, vibf=4.7) * ar(d, a, curve=1.4)


def choir(f, d, a=0.1):
    """'아' 하는 합창 느낌 — 톱니파를 입 모양 대역으로."""
    t = tt(d)
    src = sum(signal.sawtooth(2 * np.pi * f * v * t + U(0, 6)) for v in (0.994, 1.0, 1.007))
    y = bp(src, 650, 1000) + 0.7 * bp(src, 1050, 1350) + 0.35 * bp(src, 2500, 3200)
    return norm(y) * ar(d, a, curve=1.3)


def horn(f, d, a=0.03):
    """낮은 뿔나팔 · 금관 느낌(땅 · 불의 호령)."""
    t = tt(d)
    src = signal.sawtooth(2 * np.pi * f * t) + 0.5 * signal.sawtooth(2 * np.pi * f * 1.004 * t)
    y = sweep(src, [(0, 500), (0.15, 2600), (1, 900)], 0.9, "lp")
    return norm(y) * ar(d, a, curve=1.2)


def twinkle(d=0.4, count=10, lo=2500, hi=7500, tau=0.06, rise=0.0):
    """반짝이 — 짧은 맑은 알갱이. rise>0 이면 뒤로 갈수록 높아진다."""
    out = np.zeros(n_(d + tau * 5))
    ts = np.sort(RNG.uniform(0, 1, count))
    for u in ts:
        f = np.exp(U(np.log(lo), np.log(hi))) * (1 + rise * u)
        g = modal(tau * 5, [(f, tau * U(0.6, 1.3), 1.0), (f * 2.01, tau * 0.4, 0.25)], a=0.0008)
        a = n_(u * d)
        out[a:a + len(g)] += g * U(0.5, 1.0)
    return out


def arp(notes, gap, maker, gains=None):
    """음들을 gap 간격으로 잇는다. maker(Hz) → 배열."""
    items = []
    for i, m in enumerate(notes):
        items.append((i * gap, maker(hz(m)), (gains[i] if gains else 0)))
    return seq(*items)


def riser(d=0.4, f0=300, f1=1800, noise_mix=0.5):
    """차오르는 소리 — 올라가는 음 + 열리는 바람."""
    y = tone((f0, f1), d, harm=(1.0, 0.4, 0.2), det=0.004) * swell(d, 0.95, 2.2, 0.6)
    w = sweep(noise(d), (f0 * 2, f1 * 3), 1.4) * swell(d, 0.95, 2.5, 0.6)
    return norm(y) + norm(w) * noise_mix


def card_flick(d=0.07, f=2600):
    """카드 종이 '착' — 빳빳한 종이 모서리."""
    x = bp(noise(d), 1200, 9000) * env_ad(d, 0.0006, d / 4)
    return mixa(x, knock(f, 0.006, 1.0) * 0.5)


def card_slide(d=0.14, f0=1800, f1=4200):
    """카드가 스치는 '스윽'."""
    x = sweep(noise(d), (f0, f1), 1.0) + hp(noise(d), 5000) * 0.15 + bp(noise(d), 500, 1500) * 0.5
    return norm(x) * ar(d, d * 0.35, curve=1.6)


def card_tap(f=260, s=0.3):
    """카드가 판에 닿는 '탁'."""
    return seq((0, snap(0.02, 1500, 9000, 0.003), -2), (0, knock(f, 0.022 + 0.015 * s, 0.7), 0), (0, punch(180 - 40 * s, 90, 0.03 + 0.02 * s), -5))


# ── 마무리 ───────────────────────────────────────────────
def room(m, rt=0.35, mix=0.12, damp=9000, pre=0.006):
    """짧고 밝은 방 울림."""
    m.buf = reverb(m.buf, rt=rt, mix=mix, pre=pre, damp=damp, size_lo=250)
    return m


def finish(st, peak_db=-1.5, crest=13.0, hpf=95, lpf=15000, min_len=0.05, tail_db=-58, max_len=None, air_db=1.5):
    """마무리: 저역 컷 · (살짝) 높은 쪽 살리기 · 꼬리 자르기 · 봉우리 누르기 · 피크 맞추기.
    crest: 피크/RMS 가 이보다 크면 tanh 로 봉우리를 눌러 소리를 단단하게(작게 들리지 않게)."""
    st = np.array([hp(c, hpf, 2) for c in st])
    if air_db:
        st = st + np.array([hp(c, 4500, 1) for c in st]) * (db(air_db) - 1)
    if lpf:
        st = np.array([lp(c, lpf, 2) for c in st])
    a = np.max(np.abs(st), axis=0)
    pk = a.max() + 1e-12
    idx = np.nonzero(a > pk * db(tail_db))[0]
    end = idx[-1] + 1 if len(idx) else len(a)
    end = max(end, n_(min_len))
    if max_len:
        end = min(end, n_(max_len))
    st = st[:, :end]
    st = np.array([fade(c, 0.0005, min(0.05, end / SR * 0.25)) for c in st])
    st = st / (np.max(np.abs(st)) + 1e-12)
    if crest:
        act = a[:end] > pk * db(-30)
        for _ in range(4):
            rms = np.sqrt(np.mean(st[:, act[: st.shape[1]]] ** 2)) + 1e-12
            cf = 20 * np.log10(1.0 / rms)
            if cf <= crest:
                break
            drive = min(4.0, 1.0 + (cf - crest) * 0.22)
            st = np.tanh(st * drive)
            st = st / (np.max(np.abs(st)) + 1e-12)
    up = signal.resample_poly(st, 4, 1, axis=1)
    return st * (db(peak_db) / (np.max(np.abs(up)) + 1e-12))
