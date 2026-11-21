"""효과음 폴더의 길이 · 밝기 · 대역 에너지 통계 (귀로 듣지 않고 둔탁한지 가늠한다).

  ~/develop/sfx-synth/.venv/bin/python tools/sfx/synth2/stats.py <폴더> [키 접두어* …] [--each]
중심 주파수(centroid)가 낮고 4 kHz 위 비율이 작으면 둔탁하게 들린다.
"""
import fnmatch
import glob
import os
import subprocess
import sys

import numpy as np

BANDS = [(0, 150), (150, 500), (500, 2000), (2000, 6000), (6000, 24000)]


def decode(path):
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", "48000", "-"], capture_output=True, check=True)
    return np.frombuffer(r.stdout, np.float32)


def measure(x):
    n = len(x)
    S = np.abs(np.fft.rfft(x)) ** 2   # 창 없이: 앞머리(어택)가 묻히지 않게
    f = np.fft.rfftfreq(n, 1 / 48000)
    tot = S.sum() + 1e-20
    cen = (S * f).sum() / tot
    bands = [S[(f >= a) & (f < b)].sum() / tot for a, b in BANDS]
    pk = np.abs(x).max() + 1e-12
    rms = np.sqrt((x ** 2).mean()) + 1e-12
    return n / 48000, cen, bands, 20 * np.log10(pk / rms), 20 * np.log10(rms)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    each = "--each" in sys.argv
    pats = args[1:]
    rows = []
    for p in sorted(glob.glob(os.path.join(args[0], "*.ogg"))):
        k = os.path.basename(p)[:-4]
        if pats and not any(fnmatch.fnmatch(k, q) for q in pats):
            continue
        d, cen, b, cf, rms = measure(decode(p))
        rows.append((k, d, cen, b, cf, rms))
        if each:
            print(f"{k:18s} {d:5.2f}s  중심 {cen:6.0f}Hz  <150 {b[0]*100:4.0f}% 150-500 {b[1]*100:4.0f}% .5-2k {b[2]*100:4.0f}% 2-6k {b[3]*100:4.0f}% 6k+ {b[4]*100:4.0f}%  crest {cf:4.1f}  rms {rms:5.1f}")
    if rows:
        a = np.array([[r[1], r[2], *r[3], r[4], r[5]] for r in rows])
        m = a.mean(0)
        print(f"{len(rows)}개 평균: {m[0]:.2f}s  중심 {m[1]:.0f}Hz (중앙값 {np.median(a[:,1]):.0f})  <150 {m[2]*100:.0f}% 150-500 {m[3]*100:.0f}% .5-2k {m[4]*100:.0f}% 2-6k {m[5]*100:.0f}% 6k+ {m[6]*100:.0f}%  crest {m[7]:.1f}  rms {m[8]:.1f}")


if __name__ == "__main__":
    main()
