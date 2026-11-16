"""만든 효과음 파일 검사 — 길이 · 피크 · 무음 · 클리핑 · 포맷 · 크기(지금 audio/sfx 와 견줌).

  ~/develop/sfx-synth/.venv/bin/python tools/sfx/synth/check.py <새 폴더> [audio/sfx]
"""
import glob
import json
import os
import subprocess
import sys

import numpy as np


def decode(path):
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "2", "-ar", "48000", "-"],
                       capture_output=True, check=True)
    return np.frombuffer(r.stdout, np.float32).reshape(-1, 2)


def probe(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_name,sample_rate,channels",
                        "-of", "json", path], capture_output=True, text=True, check=True)
    return json.loads(r.stdout)["streams"][0]


def main():
    new = sys.argv[1]
    old = sys.argv[2] if len(sys.argv) > 2 else "audio/sfx"
    bad, tot_new, tot_old, bigger = [], 0, 0, []
    files = sorted(glob.glob(os.path.join(new, "*.ogg")))
    for f in files:
        k = os.path.basename(f)[:-4]
        m = f[:-4] + ".mp3"
        if not os.path.exists(m):
            bad.append((k, "mp3 없음"))
            continue
        for p, codec in ((f, "opus"), (m, "mp3")):
            st = probe(p)
            if st["codec_name"] != codec or int(st["channels"]) != 2:
                bad.append((k, f"포맷 {st}"))
        x = decode(f)
        dur = len(x) / 48000
        pk = 20 * np.log10(np.abs(x).max() + 1e-12)
        rms = 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)
        clip = int((np.abs(x) >= 0.999).sum())
        if dur < 0.04:
            bad.append((k, f"짧음 {dur:.2f}s"))
        if rms < -45:
            bad.append((k, f"거의 무음 rms {rms:.1f}"))
        if pk > -0.5 or clip:
            bad.append((k, f"피크 {pk:.1f} 클립 {clip}"))
        sz = os.path.getsize(f) + os.path.getsize(m)
        tot_new += sz
        o1, o2 = os.path.join(old, k + ".ogg"), os.path.join(old, k + ".mp3")
        if os.path.exists(o1) and os.path.exists(o2):
            osz = os.path.getsize(o1) + os.path.getsize(o2)
            tot_old += osz
            if sz > osz * 1.15:
                bigger.append((k, sz // 1024, osz // 1024))
    print(f"파일 {len(files)}개 · 문제 {len(bad)}개")
    for b in bad[:40]:
        print("  ", *b)
    print(f"크기 새 {tot_new / 1e6:.1f} MB / 지금(같은 키) {tot_old / 1e6:.1f} MB · 지금보다 15% 넘게 큰 파일 {len(bigger)}개")
    for b in bigger[:15]:
        print("  ", b)


if __name__ == "__main__":
    main()
