"""짧은 음악 4곡(victory · defeat · levelUp · pach_win3) — 현 · 호른 · 하프 · 종을 덧셈 합성으로."""
from dsp import *  # noqa
import layers as L
from recipes_common import recipe, R  # noqa: F401  (같은 표에 넣는다)


def hz(n):  # MIDI → Hz
    return 440 * 2 ** ((n - 69) / 12)


def strings(d, notes, att=0.25, rel=0.6, bright=2500):
    t = tt(d)
    y = np.zeros_like(t)
    for n in notes:
        for det in (-0.12, 0.0, 0.11):
            f = hz(n + det * 0.1) * (1 + 0.004 * np.sin(2 * np.pi * 5.2 * t + RNG.uniform(0, 6)))
            y += signal.sawtooth(2 * np.pi * np.cumsum(f) / SR + RNG.uniform(0, 6))
    y = lp(y, bright)
    return y * env_pts(d, [(0, 0), (att, 1), (max(att, d - rel), 0.85), (d, 0)]) / (3 * len(notes))


def horn(d, notes, att=0.08, rel=0.5):
    t = tt(d)
    y = np.zeros_like(t)
    for n in notes:
        f = hz(n) * (1 + 0.003 * np.sin(2 * np.pi * 5 * t))
        y += signal.sawtooth(2 * np.pi * np.cumsum(f) / SR)
    y = sweep(y, [(0, 400), (0.15, 1400), (1, 900)], 0.9, "lp")
    return y * env_pts(d, [(0, 0), (att, 1), (max(att, d - rel), 0.8), (d, 0)]) / len(notes)


def harp(notes, gap, d_each=1.2):
    d = gap * len(notes) + d_each
    out = np.zeros(n_(d))
    for i, n in enumerate(notes):
        p = L.pluck(hz(n), d_each, 0.9985) * np.exp(-tt(d_each) / 0.5)
        a = n_(i * gap)
        out[a:a + len(p)] += lp(p, 5000)
    return out


def bells(notes, gap, tau=0.8):
    d = gap * len(notes) + tau * 3
    out = np.zeros(n_(d))
    for i, n in enumerate(notes):
        b = lp(bell(tau * 3, hz(n), tau, 0.5), 6000)
        a = n_(i * gap)
        out[a:a + len(b)] += b
    return out


def coins(d, count):
    return grains(d, count, lambda _: L.coin(0.5) * 0.6, decay_rate=0.5)


# victory: 올라가는 현 · 금빛 호른 화음 · 반짝이는 하프 · 밝은 장조로 끝 (Eb 장조, 약 4초)
@recipe("victory", min_len=3.6, max_len=4.4, lpf=9000, tail_db=-50)
def _():
    m = Mix(4.5)
    run = [51, 55, 58, 63, 67, 70]
    for i, n in enumerate(run):
        m.add(strings(0.5, [n, n + 12]), at=i * 0.16, gain=-4)
    m.add(horn(1.1, [58, 63, 67]), at=0.95, gain=-3)
    m.add(harp([63, 67, 70, 75, 79, 82, 87], 0.06), at=1.0, gain=-8, width=1)
    m.add(strings(2.4, [39, 51, 58, 63, 67, 70, 75], att=0.05, rel=1.4), at=1.9, gain=0, width=1)
    m.add(horn(2.0, [51, 58, 63, 67], att=0.04, rel=1.3), at=1.9, gain=-4)
    m.add(L.thump(0.6, 90, 50, 0.15), at=1.9, gain=-6)
    m.add(bells([75, 82], 0.12, 0.7), at=1.95, gain=-14, width=1)
    m.buf = reverb(m.buf, rt=1.6, mix=0.3, damp=6000)
    return m


# defeat: 낮은 현이 천천히 내려가고 호른이 한숨, 비고 조용한 단조로 끝 (D 단조, 약 4초)
@recipe("defeat", min_len=3.6, max_len=4.4, lpf=6000, tail_db=-50)
def _():
    m = Mix(4.5)
    line = [(50, 0.0), (48, 0.6), (46, 1.2), (45, 1.8)]
    for n, at in line:
        m.add(strings(0.9, [n - 12, n], att=0.2, rel=0.4, bright=1400), at=at, gain=-2)
    m.add(horn(1.1, [57, 53], att=0.25, rel=0.7), at=1.0, gain=-9)
    m.add(strings(2.0, [38, 45, 53], att=0.3, rel=1.4, bright=1100), at=2.3, gain=-3, width=1)
    m.buf = reverb(m.buf, rt=1.8, mix=0.3, damp=3500)
    return m


# levelUp: 하프가 올라가고 따뜻한 화음 · 반짝이는 종 (약 2초)
@recipe("levelUp", min_len=1.8, max_len=2.3, lpf=8000, tail_db=-50)
def _():
    m = Mix(2.4)
    m.add(harp([60, 64, 67, 72, 76, 79, 84], 0.055), gain=-5, width=1)
    m.add(strings(1.6, [48, 60, 64, 67, 72], att=0.08, rel=0.9), at=0.42, gain=-3, width=1)
    m.add(horn(1.2, [60, 64, 67], att=0.05, rel=0.8), at=0.42, gain=-7)
    m.add(bells([79, 84], 0.1, 0.5), at=0.45, gain=-14, width=1)
    m.buf = reverb(m.buf, rt=1.2, mix=0.28, damp=6000)
    return m


# pach_win3: 밝은 오케스트라 히트 + 하프 · 종 + 쏟아지는 동전, 빛으로 끝 (약 3.5초)
@recipe("pach_win3", min_len=3.2, max_len=3.8, lpf=8500, tail_db=-50)
def _():
    m = Mix(4.0)
    m.add(strings(0.9, [43, 55, 62, 67, 71, 74, 79], att=0.01, rel=0.6), gain=0, width=1)
    m.add(horn(0.8, [55, 62, 67, 71], att=0.01, rel=0.5), gain=-3)
    m.add(L.boom(0.7), gain=-3)
    m.add(harp([67, 71, 74, 79, 83, 86, 91, 86, 91], 0.07), at=0.3, gain=-9, width=1)
    m.add(bells([79, 83, 86, 91], 0.25, 0.6), at=0.35, gain=-13, width=1)
    m.add(coins(2.6, 70), at=0.2, gain=-12, width=1)
    m.add(L.shimmer(0.6, 1.2), at=2.0, gain=-12, width=1)
    m.add(strings(2.4, [55, 67, 71, 74, 79], att=0.3, rel=1.3), at=1.0, gain=-8, width=1)
    m.buf = reverb(m.buf, rt=1.4, mix=0.3, damp=6500)
    return m
