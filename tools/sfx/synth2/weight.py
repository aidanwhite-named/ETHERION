"""ETHERION 효과음 v2 — 마법의 무게 층 (2026-11-24).

사용자: "강력하고 웅장한 사운드 — 크거나 높은 소리가 아니라 그 마법에 맞게 사람이 느낄 수 있는 소리".
예전 마법 소리는 마무리(finish)가 95 Hz 아래를 잘라 150 Hz 아래가 1% 남짓이었다(가볍고 납작했다).
여기 재료는 '어택(이미 있는 원소 타격) + 몸통(저역) + 꼬리(긴 잔향)' 가운데 몸통 · 꼬리를 맡는다.

- 서브(40~70 Hz)는 늘 살짝 찌그러뜨려 2 · 3 · 4배음(90~280 Hz)을 함께 낸다:
  폰 스피커는 서브를 못 내지만 배음을 들으면 귀가 낮은 음을 채워 듣는다(사라진 기본음).
- 높은 쪽은 더하지 않는다. 크기는 finish 가 피크를 맞추므로 저역이 늘면 오히려 날카로운 쪽이 상대적으로 준다.
- 원소마다 '무게의 결'이 다르다: 불 = 낮게 부풀었다 터짐 · 번개 = 균열 뒤 굴러가는 천둥 · 물 = 깊은 물결 ·
  땅 = 바닥이 꺼지는 쿵 · 어둠 = 낮은 불협 드론 · 빛 = 따뜻한 낮은 화음 · 바람 = 낮게 휘도는 기류 ·
  쇠 = 낮은 징 · 숲 = 굵은 나무 울림.
모든 함수는 모노 배열을 돌려준다. s = 무게 0~1.
"""
import elements as E
from kit import *  # noqa: F401,F403


def _env(d, a, tau):
    return env_ad(d, a, tau)


def sub_boom(f0=55.0, d=0.9, s=0.5, drop=1.8, drive=None):
    """떨어지는 서브 '쿵' + 배음. f0 = 끝 음높이(Hz)."""
    t = tt(d)
    fc = f0 + (f0 * drop - f0) * np.exp(-t / 0.055)
    ph = 2 * np.pi * np.cumsum(fc) / SR
    y = np.sin(ph) * np.exp(-t / (0.16 + 0.34 * s)) * (1 - np.exp(-t / 0.003))
    y2 = y + 0.4 * y * np.abs(y)            # 짝수 배음(2배)
    h = sat(y2, drive or (2.0 + 1.6 * s))   # 홀수 배음(3 · 5배)
    body = bp(h, 85, 450, 2)                # 폰에서 들리는 자리(배음)를 몸통으로
    return norm(0.22 * y + 1.0 * body)


def rumble(d=1.0, s=0.5, lo=60.0, hi=320.0, roll=6.0, a=0.02):
    """굴러가는 저역 웅웅 — 천둥 · 땅울림 · 거대한 기류의 꼬리."""
    x = bp(noise(d, "pink"), lo, hi)
    mod = 0.5 + 0.5 * norm(lp(noise(d), roll))
    return norm(x * mod) * _env(d, a, d / (3.2 - 0.8 * s))


def low_swell(d=0.4, f0=55.0, f1=150.0):
    """낮게 부풀어 오르는 기운(터지기 직전). 끝에서 가장 크다."""
    t = tt(d)
    x = sweep(noise(d, "pink"), (f0 * 2.2, f1 * 3.0), 0.8, "lp")
    body = tone((f0, f1 * 0.7), d, harm=(1.0, 0.55, 0.3))
    e = (t / max(d, 1e-6)) ** 2.0
    return norm(norm(x) * 0.8 + 0.6 * sat(norm(body), 1.6)) * e


def deep_surge(d=0.9, s=0.5, f=43.7):
    """깊은 물결 — 아래에서 밀려 올라와 부서지고 빠지는 물덩이."""
    t = tt(d)
    x = sweep(noise(d, "pink"), [(0, 180), (0.35, 650 + 250 * s), (1, 170)], 0.9, "lp")
    lo = sat(tone(f, d, harm=(0.4, 0.8, 0.6, 0.35)) * (1 + 0.18 * np.sin(2 * np.pi * 0.9 * t)), 1.8)
    return norm(norm(x) + 0.55 * norm(lo)) * swell(d, 0.35, 1.4, 1.6)


def curse_drone(f=55.0, d=1.0, s=0.5):
    """낮은 불협 드론 — 반음(단2도)이 맞부딪혀 우는 맥놀이 + 셋온음 그림자."""
    t = tt(d)
    y = tone(f, d, harm=(0.5, 0.8, 0.6, 0.4, 0.25), det=0.004) + 0.8 * tone(f * 1.0595, d, harm=(0.5, 0.7, 0.45)) \
        + 0.3 * tone(f * 1.4142, d, harm=(1.0, 0.4))
    y = lp(sat(norm(y), 1.8), 700, 2)
    return norm(y) * (0.8 + 0.2 * np.sin(2 * np.pi * (3.2 + s) * t)) * swell(d, 0.4, 1.3, 1.5)


def warm_chord(el, d=1.0, major=True, a=None):
    """따뜻한 낮은 화음 — 깃발 뿌리음 한 옥타브 아래 + 5도 + (장 · 단)3도, 아주 낮은 서브 받침."""
    f = E.note(el, 0, -1)
    third = 1.26 if major else 1.189
    a = a if a is not None else d * 0.22
    y = pad(f, d, a, 0.55) + 0.8 * pad(f * 1.5, d, a * 1.1, 0.45) + 0.6 * pad(f * 2 * third, d, a * 1.2, 0.4)
    y = y + 0.25 * tone(f / 2, d, harm=(0.6, 1.0, 0.5)) * ar(d, a * 1.3, curve=1.4)
    return norm(lp(y, 1800, 2))


def gong_hum(f=73.0, d=1.0, s=0.5):
    """낮은 징 — 비정수배 울림이 길게(쇠 · 보호막의 돔)."""
    tau = 0.35 + 0.45 * s
    y = modal(d, [(f, tau, 1.0), (f * 2.0, tau * 0.7, 0.55), (f * 2.76, tau * 0.5, 0.4), (f * 4.07, tau * 0.3, 0.22),
                  (f * 1.006, tau, 0.5)], a=0.004)
    return norm(sat(norm(y), 1.4))


# ── 원소마다 무게의 결 ───────────────────────────────────────
#  pre: 타격 앞(th 초 동안, 끝이 타격 순간) · hit: 타격 순간부터
SUBF = {"fire": 50.0, "metal": 55.0, "lightning": 47.0, "earth": 41.0, "forest": 52.0,
        "water": 44.0, "dark": 46.0, "light": 58.0, "wind": 56.0}


def body_pre(el, th, s):
    if th < 0.08:
        return None
    if el == "fire":
        return low_swell(th, 48, 150 + 60 * s)
    if el == "water":
        return low_swell(th, 42, 110) * 0.8
    if el == "dark":
        return curse_drone(SUBF["dark"], th, s) * ((tt(th) / th) ** 1.5)
    if el == "earth":
        return rumble(th, s, 50, 220, 9, a=th * 0.8) * ((tt(th) / th) ** 1.8)
    if el == "wind":
        return low_swell(th, 60, 200) * 0.7
    return low_swell(th, SUBF[el], 130) * 0.55


def body_hit(el, s, area=False):
    """원소 타격 아래에 까는 몸통 + 꼬리. area = 전체 · 여럿 공격(더 넓고 길게)."""
    d = 0.9 + 0.8 * s + (0.5 if area else 0)
    f = SUBF[el]
    boom = sub_boom(f, min(d, 1.2), s, drop=2.4 if el == "earth" else 1.8)
    if el == "fire":
        tail = rumble(d, s, 60, 300, 8)
    elif el == "lightning":   # 균열 뒤 멀리 굴러가는 천둥
        tail = np.pad(rumble(d, s, 60, 380, 4.5, a=0.06), (n_(0.05), 0))
    elif el == "water":
        tail = deep_surge(d, s, f)
    elif el == "earth":
        tail = rumble(d, s, 50, 240, 10)
    elif el == "dark":
        tail = curse_drone(f, d, s) * _env(d, 0.01, d / 2.6)
    elif el == "light":
        tail = warm_chord("light", d, True, 0.02) * _env(d, 0.01, d / 2.4)
    elif el == "wind":
        tail = rumble(d, s, 55, 420, 3.0, a=0.05)
    elif el == "metal":
        tail = gong_hum(73, d, s)
    else:   # forest
        tail = mixa(knock(105, 0.09, 0.4) * 1.4, (rumble(d, s, 60, 320, 6), -3))
    out = mixa((boom, 0), (tail, -4 + 2 * s))
    if area:   # 한 번 더 내려앉는 넓은 '쿵'
        out = mixa(out, (np.pad(sub_boom(f * 0.9, 1.0, s, drop=1.5), (n_(0.11), 0)), -4))
    return out


def body_land(el, s=0.5):
    """마법이 대상에 닿는 순간의 짧은 몸통(공용 sp_land_<원소>) — 원소 색 한 겹 + 저역."""
    return mixa((sub_boom(SUBF[el] * 1.15, 0.5, s, drop=2.0), 0), (body_hit(el, s * 0.6)[: n_(0.55)], -6))
