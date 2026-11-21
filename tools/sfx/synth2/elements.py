"""ETHERION 효과음 v2 — 깃발 원소 아홉 가지의 소리 성격.

원소마다 다섯 가지를 준다(모두 모노 배열):
  voice(f, d)   그 원소의 음색으로 낸 한 음        charge(d, s)  기운이 모이는 소리
  strike(s)     그 원소로 때리는 소리              tint(s)       유닛 타격에 얹는 짧은 색
  wash(d, s)    감도는 기운(강화 · 보호막의 바탕)
ROOT · SCALE 은 마법의 음(반음 번호)을 고르는 데 쓴다 — 깃발마다 음계가 달라 귀로 구별된다.
s = 무게 0~1.
"""
from kit import *  # noqa: F401,F403

#            뿌리음(MIDI)  음계(반음)              느낌
SIG = {
    "fire":      (50, [0, 3, 5, 7, 10]),     # D 단조 5음 — 거칠고 뜨겁다
    "metal":     (52, [0, 5, 7, 12, 17]),    # E 4 · 5도 — 단단하고 텅 빈 쇠
    "lightning": (57, [0, 4, 6, 10, 12]),    # A 온음 — 불안정하게 튄다
    "earth":     (45, [0, 3, 7, 10, 12]),    # A 단조 — 낮고 묵직
    "forest":    (55, [0, 2, 4, 7, 9]),      # G 장조 5음 — 따뜻한 나무
    "water":     (53, [0, 4, 7, 11, 14]),    # F 장7 · 9 — 맑게 번진다
    "dark":      (47, [0, 1, 6, 7, 12]),     # B 반음 · 증4도 — 불길하다
    "light":     (60, [0, 4, 7, 12, 16]),    # C 장3화음 — 환하다
    "wind":      (62, [0, 2, 7, 9, 14]),     # D sus2 — 열려 있고 가볍다
}


def note(el, i, octv=0):
    """원소 음계의 i번째 음(Hz). i 가 음계 길이를 넘으면 옥타브 위로."""
    root, sc = SIG[el]
    return hz(root + sc[i % len(sc)] + 12 * (i // len(sc)) + 12 * octv)


# ── voice ────────────────────────────────────────────────
def voice(el, f, d=0.4):
    if el == "fire":
        return horn(f * 2, d, 0.02) + 0.3 * norm(bp(noise(d), 1500, 5000)) * env_ad(d, 0.005, d / 5)
    if el == "metal":
        return clang(f * 4, tau=min(0.3, d * 0.6), bright=0.7, n=6, d=d) + 0.4 * tone(f * 2, d, tau=d / 3, harm=(1, 0.3))
    if el == "lightning":
        return fm(d, f * 2, f * 2 * 1.414, 3.5, tau=d / 3.2, idx_tau=d / 6) + 0.25 * fm(d, f * 4, f * 7.1, 2.0, tau=d / 6)
    if el == "earth":
        return horn(f * 2, d, 0.04) * 0.8 + 0.6 * punch(f * 1.5, f * 0.75, min(0.12, d / 3), 2.0, d)
    if el == "forest":
        y = marimba(f * 4, min(0.2, d * 0.5)) + 0.0
        return np.pad(y, (0, max(0, n_(d) - len(y))))[: max(n_(d), 1)]
    if el == "water":
        y = glass_ping(f * 4, min(0.3, d * 0.6), d) * 0.6 + pluck(f * 2, d, 0.45, 0.6) * env_ad(d, 0.001, d / 2.5) * 0.7
        return y
    if el == "dark":
        return fm(d, f * 4, f * 4 * 1.4983, 3.0, tau=d / 2.8, idx_tau=d / 3) + 0.5 * tone(f * 2 * 1.0595, d, tau=d / 3, harm=(1, 0.4, 0.2))
    if el == "light":
        return chime(f * 2, min(0.4, d * 0.7), d) + 0.35 * choir(f * 2, d, 0.03) * env_ad(d, 0.02, d / 2)
    return flute(f * 2, d, 0.35) + 0.3 * glass_ping(f * 4, min(0.2, d / 2), d)   # wind


# ── charge ───────────────────────────────────────────────
def charge(el, d=0.4, s=0.4):
    if el == "fire":
        return mixa(fire_whoosh(d, s, 0.92), (sizzle(d, 60) * swell(d, 0.9, 2, 1), -8), (riser(d, 180, 520, 0.2), -10))
    if el == "metal":
        return mixa(ratchet(int(6 + 6 * s), d * 0.9, 1700, accel=-0.35), (sw(steam(d, 2500, d), 0.9, 2, 1), -7),
                    (riser(d, 220, 660, 0.15), -11))
    if el == "lightning":
        z = grains(d, int(5 + 6 * s), lambda i: zap(0.06, 0.1), decay_rate=-0.0) * swell(d, 0.95, 1.5, 1)
        return mixa(whine(d, 420, 2400 + 800 * s), (z, -7), (air(d, 6000) * swell(d, 0.95, 2, 1), -12))
    if el == "earth":
        return mixa(quake(d, s) * swell(d, 0.9, 1.5, 1), (rubble(d, int(8 + 10 * s)) * swell(d, 0.9, 1, 1), -6),
                    (riser(d, 110, 330, 0.2), -9))
    if el == "forest":
        return mixa(creak(d, 150 + 60 * (1 - s)), (rustle(d, int(40 + 40 * s)) * swell(d, 0.9, 1.5, 1), -5),
                    (riser(d, 300, 900, 0.1), -13))
    if el == "water":
        return mixa(wave(d, s, 0.92), (bubbles(d, int(8 + 8 * s), 400, 2200) * swell(d, 0.9, 1.2, 1), -6),
                    (riser(d, 350, 1050, 0.0), -13))
    if el == "dark":
        return mixa(suck(d, 300, 3500), (dark_drone(d, 147, s) * swell(d, 0.9, 1.5, 0.8), -6), (whisper(d, 2400) * swell(d, 0.9, 2, 1), -3))
    if el == "light":
        return mixa(riser(d, 520, 1560, 0.25), (sw(twinkle(d, int(8 + 8 * s), 3000, 8000, 0.05, rise=0.6), 0.9, 1.5, 1), -6),
                    (choir(hz(72), d, d * 0.6) * swell(d, 0.92, 2, 0.8), -9))
    return mixa(gust(d, s, 0.9), (riser(d, 400, 1200, 0.1), -13), (sw(twinkle(d, 5, 3500, 7000, 0.05), 0.9, 2, 1), -12))


# ── strike ───────────────────────────────────────────────
def strike(el, s=0.5):
    if el == "fire":
        return explosion(s) if s > 0.45 else fire_burst(s)
    if el == "metal":
        return seq((0, snap(0.03, 1500, 11000, 0.005), 2), (0, clang(640 - 150 * s, 0.24 + 0.18 * s, 0.8, 8), 0),
                   (0, punch(150 - 40 * s, 55, 0.07 + 0.06 * s, 2.4), 0), (0.03, clink(U(1700, 2300), 0.04), -5))
    if el == "lightning":
        y = [(0, zap(0.28 + 0.25 * s, s), 0)]
        if s > 0.4:
            y.append((0.02, thunder(0.5 + 0.5 * s, s), -6 + 4 * s))
        return seq(*y)
    if el == "earth":
        return seq((0, rock_hit(s), 0), (0.01, quake(0.35 + 0.35 * s, s) * env_ad(0.35 + 0.35 * s, 0.005, 0.15 + 0.1 * s), -7))
    if el == "forest":
        return seq((0, whip(s), -3), (0.085, wood_hit(s), 0), (0.09, wood_crack(s), 0), (0.1, rustle(0.25, 30), -6))
    if el == "water":
        return seq((0, wave(0.16, s, 0.85), -6), (0.13, splash(s), 0))
    if el == "dark":
        d = 0.3 + 0.25 * s
        bw = sat(tone((hz(47) * 8, hz(47) * 2), d, harm=(1.0, 0.6, 0.4, 0.25)), 2.5) * env_ad(d, 0.002, d / 3.5)
        return seq((0, snap(0.04, 1500, 10000, 0.007), 0), (0, bw, -3), (0, punch(140 - 30 * s, 50, 0.09 + 0.07 * s, 2.6), -1),
                   (0.0, slap(0.14, 600, 4000, 0.04), 0), (0.02, whisper(d, 2200) * env_ad(d, 0.02, d / 3), -2))
    if el == "light":
        r = hz(72)
        ch = mixa(chime(r, 0.17 + 0.08 * s), (chime(r * 1.5, 0.15), -3), (chime(r * 2, 0.13), -3), (chime(r * 3, 0.08), -6))
        return seq((0, snap(0.03, 2500, 13000, 0.005), 2), (0, ch, 0), (0, air(0.3, 4500, 0.07), 0),
                   (0, punch(190 - 40 * s, 90, 0.05 + 0.04 * s, 1.8), 0), (0, chime(r * 4, 0.07), -4), (0.01, twinkle(0.2, 8, 3500, 9000, 0.03), 0))
    d = 0.2 + 0.15 * s   # wind
    return seq((0, gust(d, s, 0.35), 0), (d * 0.3, hp(noise(0.03), 2200) * env_ad(0.03, 0.0003, 0.006), -3),
               (d * 0.3, slap(0.08, 800, 5500, 0.02), -6))


# ── tint (유닛 타격에 얹는 0.1~0.25초) ────────────────────
def tint(el, s=0.4):
    if el == "fire":
        return mixa(sizzle(0.2 + 0.1 * s, 90), (fire_whoosh(0.2 + 0.1 * s, s, 0.1), -2))
    if el == "metal":
        return seq((0, clink(U(1600, 2200), 0.045), 0), (0.03, clink(U(2300, 2900), 0.03), -5))
    if el == "lightning":
        return zap(0.12 + 0.06 * s, 0.2)
    if el == "earth":
        return rubble(0.2 + 0.12 * s, int(7 + 6 * s))
    if el == "forest":
        return mixa(rustle(0.2, 28), (knock(U(500, 700), 0.015, 0.7), -6))
    if el == "water":
        return seq((0, slap(0.1, 900, 7000, 0.03), -4), (0.02, bubbles(0.15, 5), -3), (0.08, drops(0.12, 2), -6))
    if el == "dark":
        d = 0.22 + 0.1 * s
        return mixa(whisper(d, 2200) * env_ad(d, 0.01, d / 3), (tone((440, 200), d, tau=d / 4, harm=(1, 0.5, 0.3)), -7))
    if el == "light":
        return mixa(chime(hz(84) * U(0.97, 1.03), 0.1), (twinkle(0.12, 4, 4000, 8000, 0.03), -6))
    return whoosh(0.18, 900, 3600, 1400, 1.8, 0.4, 0.4)   # wind


# ── wash ─────────────────────────────────────────────────
def wash(el, d=0.6, s=0.4):
    if el == "fire":
        return mixa(fire_whoosh(d, s, 0.4), (sizzle(d, 40) * swell(d, 0.4, 1, 1.5), -9))
    if el == "metal":
        return mixa(tone(hz(52), d, harm=(1, 0.6, 0.5, 0.3, 0.2)) * swell(d, 0.4, 1, 1.5), (steam(d, 3000, d / 2.5), -3))
    if el == "lightning":
        t = tt(d)
        hum = signal.sawtooth(2 * np.pi * 110 * t) * (0.7 + 0.3 * np.sign(np.sin(2 * np.pi * 55 * t)))
        return mixa(bp(hum, 400, 3500) * swell(d, 0.4, 1, 1.5) * 0.5, (grains(d, int(8 * d + 3), lambda i: zap(0.05, 0.1)) * swell(d, 0.4, 1, 1.5), -4))
    if el == "earth":
        return quake(d, s)
    if el == "forest":
        return mixa(rustle(d, int(70 * d + 20)) * swell(d, 0.4, 1, 1.4), (creak(min(d, 0.35), 170), -6))
    if el == "water":
        return mixa(wave(d, s, 0.45), (bubbles(d, int(10 * d + 4), 500, 2400), -9))
    if el == "dark":
        return mixa(dark_drone(d, 147, s) * swell(d, 0.4, 1, 1.5), (whisper(d, 2600) * swell(d, 0.5, 1.5, 1.5), -3))
    if el == "light":
        return mixa(choir(hz(72), d, d * 0.3) * swell(d, 0.4, 1, 1.4), (choir(hz(79), d, d * 0.35) * swell(d, 0.45, 1, 1.4), -4),
                    (air(d, 6000) * swell(d, 0.4, 1.5, 1.5), -12))
    return mixa(gust(d, s, 0.45), (twinkle(d, int(6 * d + 3), 3000, 7000, 0.06), -10))   # wind
