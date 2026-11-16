"""ETHERION 효과음 절차적 합성 — 기본 재료 (생성 AI 없음, numpy/scipy 만).

모든 소리는 48 kHz 에서 이 파일의 재료(노이즈 · 필터 · 엔벨로프 · 모드 합성 · FM · 리버브)를
섞어 만든다. 레시피는 recipes_*.py, 실행은 render.py.
"""
import numpy as np
from scipy import signal

SR = 48000
RNG = np.random.default_rng(0)  # render.py 가 키마다 다시 심는다


def seed(s):
    """같은 RNG 객체를 다시 심는다(다른 모듈이 from dsp import * 로 들고 있어도 함께 바뀜)."""
    RNG.bit_generator.state = np.random.default_rng(s).bit_generator.state


def n_(d):
    return max(1, int(round(d * SR)))


def tt(d):
    return np.arange(n_(d)) / SR


def db(g):
    return 10 ** (g / 20)


# ── 노이즈 ──────────────────────────────────────────────
def noise(d, color="white"):
    n = n_(d)
    w = RNG.standard_normal(n)
    if color == "white":
        return w / (np.max(np.abs(w)) + 1e-9)
    f = np.fft.rfftfreq(n, 1 / SR)
    f[0] = f[1] if n > 1 else 1
    W = np.fft.rfft(w)
    if color == "pink":
        W /= np.sqrt(f)
    elif color == "brown":
        W /= f
    y = np.fft.irfft(W, n)
    return y / (np.max(np.abs(y)) + 1e-9)


# ── 필터 ────────────────────────────────────────────────
def _sos(kind, f, order=2):
    nyq = SR / 2
    if kind == "bp":
        lo, hi = max(10, f[0]), min(nyq * 0.98, f[1])
        return signal.butter(order, [lo / nyq, hi / nyq], "bandpass", output="sos")
    return signal.butter(order, min(f, nyq * 0.98) / nyq, kind, output="sos")


def lp(x, f, order=2):
    return signal.sosfilt(_sos("low", f, order), x)


def hp(x, f, order=2):
    return signal.sosfilt(_sos("high", f, order), x)


def bp(x, lo, hi, order=2):
    return signal.sosfilt(_sos("bp", (lo, hi), order), x)


def _curve(v, n):
    """숫자 하나, 또는 (시작, 끝), 또는 [(시각비, 값) …] → 길이 n 배열 (로그 보간)."""
    if np.isscalar(v):
        return np.full(n, float(v))
    if len(v) == 2 and np.isscalar(v[0]):
        return np.geomspace(v[0], v[1], n)
    xs = np.array([p[0] for p in v]) * (n - 1)
    ys = np.log(np.array([p[1] for p in v], float))
    return np.exp(np.interp(np.arange(n), xs, ys))


def sweep(x, freq, q=1.0, kind="bp", block=64):
    """시간에 따라 움직이는 RBJ 바이쿼드 (bp / lp / hp)."""
    n = len(x)
    fc = _curve(freq, n)
    qq = _curve(q, n)
    y = np.zeros(n)
    z = np.zeros(2)
    for i in range(0, n, block):
        f0 = min(fc[i], SR * 0.45)
        w = 2 * np.pi * f0 / SR
        al = np.sin(w) / (2 * qq[i])
        c = np.cos(w)
        if kind == "bp":
            b = [al, 0, -al]
        elif kind == "lp":
            b = [(1 - c) / 2, 1 - c, (1 - c) / 2]
        else:
            b = [(1 + c) / 2, -(1 + c), (1 + c) / 2]
        a = [1 + al, -2 * c, 1 - al]
        seg, z = signal.lfilter(np.array(b) / a[0], np.array(a) / a[0], x[i:i + block], zi=z)
        y[i:i + block] = seg
    return y


# ── 엔벨로프 ────────────────────────────────────────────
def env_ad(d, a=0.002, tau=0.1, curve=1.0):
    """빠른 어택 + 지수 감쇠."""
    t = tt(d)
    e = np.exp(-t / tau)
    if a > 0:
        e *= np.clip(t / a, 0, 1) ** curve
    return e


def env_pts(d, pts):
    """[(초, 값) …] 선형 엔벨로프."""
    t = tt(d)
    return np.interp(t, [p[0] for p in pts], [p[1] for p in pts])


def fade(x, fin=0.001, fout=0.01):
    x = x.copy()
    a, b = n_(fin), n_(fout)
    if a > 1:
        x[:a] *= np.linspace(0, 1, a)
    if b > 1:
        x[-b:] *= np.linspace(1, 0, b) ** 2
    return x


# ── 소리 조각 ───────────────────────────────────────────
def modal(d, modes, a=0.0005, jitter=0.0, phase=0.0):
    """modes = [(Hz, 감쇠초, 세기) …] — 나무 · 쇠 · 유리 · 돌의 울림."""
    t = tt(d)
    y = np.zeros_like(t)
    for f, tau, g in modes:
        f = f * (1 + jitter * RNG.uniform(-1, 1))
        y += g * np.sin(2 * np.pi * f * t + phase * RNG.uniform(0, 2 * np.pi)) * np.exp(-t / tau)
    if a > 0:
        y *= np.clip(t / a, 0, 1)
    return y


def metal_modes(f0, n=7, tau=0.3, bright=0.6, spread=None):
    """종 · 칼 · 방패처럼 배음이 어긋난 쇠 모드."""
    ratios = spread or [1.0, 2.32, 3.86, 5.41, 6.97, 8.83, 10.9, 13.2][:n]
    out = []
    for i, r in enumerate(ratios):
        out.append((f0 * r * (1 + RNG.uniform(-0.01, 0.01)), tau / (1 + 0.35 * i), bright ** i))
    return out


def bell(d, f0, tau=1.2, bright=0.7):
    ratios = [0.5, 1.0, 1.183, 1.506, 2.0, 2.514, 2.662, 3.011, 4.166]
    gains = [0.5, 1.0, 0.6, 0.5, 0.45, 0.3, 0.25, 0.2, 0.12]
    modes = [(f0 * r, tau * (1.3 if r < 1 else 1 / (0.6 + 0.4 * r)), g * bright ** max(0, i - 1))
             for i, (r, g) in enumerate(zip(ratios, gains))]
    # 맥놀이(가까운 두 모드)
    modes += [(f0 * 1.003, tau, 0.4)]
    return modal(d, modes, a=0.001)


def thump(d, f0, f1=None, tau=0.08, a=0.002):
    """음높이가 떨어지는 사인 — 묵직한 쿵."""
    t = tt(d)
    f1 = f1 or f0 * 0.6
    f = f1 + (f0 - f1) * np.exp(-t / (tau * 0.5))
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env_ad(d, a, tau)


def click(d=0.004, lo=1500, hi=9000, tau=None):
    x = noise(d)
    x = bp(x, lo, hi)
    return x * env_ad(d, 0.0002, tau or d / 3)


def grains(d, count, maker, start=0.0, end=None, decay_rate=0.0, jitter=1.0):
    """짧은 조각(maker(i) → 배열)을 시간에 흩뿌림. decay_rate>0 이면 뒤로 갈수록 드물고 작게."""
    out = np.zeros(n_(d))
    end = end if end is not None else d
    ts = np.sort(RNG.uniform(0, 1, count) ** (1 + decay_rate))
    for i, u in enumerate(ts):
        g = maker(i)
        at = n_(start + u * (end - start))
        amp = (1 - u) ** decay_rate if decay_rate else 1.0
        amp *= RNG.uniform(1 - 0.5 * jitter, 1)
        m = min(len(g), len(out) - at)
        if m > 0:
            out[at:at + m] += g[:m] * amp
    return out


def crackle(d, rate=40, lo=1200, hi=4500, tau=0.004):
    """불 · 장작 타닥임 — 드문 임펄스를 짧은 대역 노이즈로."""
    count = int(rate * d)
    def g(_):
        dd = RNG.uniform(0.004, 0.02)
        f = RNG.uniform(lo, hi)
        return bp(noise(dd), f * 0.7, f * 1.4) * env_ad(dd, 0.0002, tau * RNG.uniform(0.5, 1.5))
    return grains(d, count, g)


def sparkle(d, count=20, lo=3000, hi=9000, tau=0.08, start=0.0, end=None, decay_rate=0.6):
    """반짝이 — 짧은 높은 사인 알갱이."""
    def g(_):
        f = np.exp(RNG.uniform(np.log(lo), np.log(hi)))
        dd = tau * 5
        return modal(dd, [(f, tau * RNG.uniform(0.6, 1.4), 1.0), (f * 2.76, tau * 0.4, 0.25)], a=0.001)
    return grains(d, count, g, start=start, end=end, decay_rate=decay_rate)


def fm(d, fc, fm_, idx, tau=0.3, idx_tau=None):
    t = tt(d)
    it = idx * (np.exp(-t / idx_tau) if idx_tau else 1)
    return np.sin(2 * np.pi * fc * t + it * np.sin(2 * np.pi * fm_ * t)) * np.exp(-t / tau)


def glide_tone(d, f0, f1, shape="sine"):
    f = np.geomspace(f0, f1, n_(d))
    ph = 2 * np.pi * np.cumsum(f) / SR
    if shape == "sine":
        return np.sin(ph)
    return signal.sawtooth(ph)


# ── 공간 ────────────────────────────────────────────────
def reverb(st, rt=0.6, mix=0.2, pre=0.008, damp=5000, size_lo=200):
    """노이즈 IR 컨볼루션 (L · R 따로) — st 는 (2, N)."""
    L = n_(rt * 1.2)
    t = np.arange(L) / SR
    out = []
    for ch in range(2):
        ir = RNG.standard_normal(L) * np.exp(-6.9 * t / rt)
        ir = lp(ir, damp)
        ir = hp(ir, size_lo)
        ir = np.concatenate([np.zeros(n_(pre)), ir])
        ir /= np.sqrt(np.sum(ir ** 2)) + 1e-9
        out.append(signal.fftconvolve(st[ch], ir)[: st.shape[1] + len(ir) - 1])
    w = np.array(out)
    dry = np.pad(st, ((0, 0), (0, w.shape[1] - st.shape[1])))
    return dry * (1 - mix * 0.5) + w * mix


# ── 섞기 ────────────────────────────────────────────────
class Mix:
    def __init__(self, d):
        self.buf = np.zeros((2, n_(d)))

    def add(self, x, at=0.0, gain=0.0, pan=0.0, width=0.0):
        """gain 은 dB, pan -1~1, width>0 이면 오른쪽을 살짝 늦춰 넓힌다."""
        x = np.asarray(x, float) * db(gain)
        k = min(n_(0.03), len(x) // 6)  # 조각 끝이 뚝 끊기지 않게
        if k > 1:
            x = x.copy(); x[-k:] *= np.linspace(1, 0, k) ** 2
        i = n_(at) if at > 0 else 0
        need = i + len(x) + 64
        if need > self.buf.shape[1]:
            self.buf = np.pad(self.buf, ((0, 0), (0, need - self.buf.shape[1])))
        th = (pan + 1) * np.pi / 4
        l, r = np.cos(th) * np.sqrt(2), np.sin(th) * np.sqrt(2)
        dl = int(width * 0.0006 * SR)
        self.buf[0, i:i + len(x)] += x * l
        self.buf[1, i + dl:i + dl + len(x)] += x * r
        return self


def master(st, peak_db=-1.5, hpf=35, lpf=None, min_len=0.05, tail_db=-60, max_len=None):
    """마무리: 저역 컷(웅웅 방지) · 꼬리 자르기 · 페이드 · 피크 맞추기."""
    st = np.array([hp(c, hpf, 2) for c in st])
    if lpf:
        st = np.array([lp(c, lpf, 2) for c in st])
    a = np.max(np.abs(st), axis=0)
    pk = a.max() + 1e-12
    thr = pk * db(tail_db)
    idx = np.nonzero(a > thr)[0]
    end = idx[-1] + 1 if len(idx) else len(a)
    end = max(end, n_(min_len))
    if max_len:
        end = min(end, n_(max_len))
    st = st[:, :end]
    st = np.array([fade(c, 0.0008, min(0.04, end / SR * 0.25)) for c in st])
    # 4배 오버샘플로 실제 피크를 잰다
    up = signal.resample_poly(st, 4, 1, axis=1)
    tp = np.max(np.abs(up)) + 1e-12
    return st * (db(peak_db) / tp)
