"""효과음을 코드로 합성해 <키>.ogg · <키>.mp3 로 내보낸다 (생성 AI 없음).

  ~/develop/sfx-synth/.venv/bin/python tools/sfx/synth/render.py <출력폴더> [키 또는 접두어* …] [--wav] [--plan] [-j8]

- 키 목록은 tools/sfx/prompts/sfx.jsonl. 키를 안 주면 전부(공용 130 + 카드 1,125).
- 손으로 짠 레시피(recipes_common · recipes_music)가 있으면 그것, 없으면 문장 엔진(recipes_text)이 `single` 문장을 읽어 만든다.
- 같은 키는 늘 같은 소리(키 이름이 난수 씨앗). 레시피를 고치고 다시 돌리면 그 키만 바뀐다.
- --plan: 문장 엔진이 마디마다 고른 층만 보여 준다(소리는 안 만듦).
필요한 것: numpy · scipy(프로젝트 밖 venv, 예: ~/develop/sfx-synth/.venv), ffmpeg(libopus · libmp3lame).
"""
import fnmatch
import json
import os
import subprocess
import sys
import tempfile
import zlib
from multiprocessing import Pool

import numpy as np
from scipy.io import wavfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import dsp  # noqa: E402
import recipes_music  # noqa: E402,F401  (R 에 음악 4곡을 더함)
from recipes_common import R as HAND  # noqa: E402
import recipes_text as RT  # noqa: E402

JSONL = os.path.join(HERE, "..", "prompts", "sfx.jsonl")


def load():
    items = {}
    for line in open(JSONL, encoding="utf-8"):
        d = json.loads(line)
        for s in d["sounds"]:
            k = s["key"]
            kind = k.rsplit(".", 1)[1] if "." in k else "common"
            items[k] = dict(key=k, single=s["single"], len=float(s.get("len") or 0.5),
                            kind=kind, lv=d.get("lv"), grade=d.get("grade", "common"))
    return items


def render(it):
    k = it["key"]
    dsp.seed(zlib.crc32(k.encode()))
    if k in HAND:
        fn, mopt = HAND[k]
        return dsp.master(fn().buf, **mopt)
    m, s = RT.build(it["single"], it["len"], it["lv"], it["kind"], it["grade"])
    ln = it["len"]
    return dsp.master(m.buf, lpf=9000, tail_db=-55, min_len=min(0.6 * ln, 0.4),
                      max_len=ln * 1.3 + 0.15)


def encode(st, base, keep_wav=False):
    pcm = (np.clip(st.T, -1, 1) * 32767).astype(np.int16)
    fd, tmp = tempfile.mkstemp(suffix=".wav")
    os.close(fd)
    wavfile.write(tmp, dsp.SR, pcm)
    q = ["-hide_banner", "-loglevel", "error", "-y", "-i", tmp]
    subprocess.run(["ffmpeg", *q, "-c:a", "libopus", "-b:a", "96k", "-ar", "48000", base + ".ogg"], check=True)
    subprocess.run(["ffmpeg", *q, "-c:a", "libmp3lame", "-b:a", "128k", "-ar", "44100", base + ".mp3"], check=True)
    if keep_wav:
        os.replace(tmp, base + ".wav")
    else:
        os.remove(tmp)


def job(a):
    it, out, wav = a
    try:
        st = render(it)
        base = os.path.join(out, it["key"])
        encode(st, base, wav)
        # opus 는 날카로운 앞머리에서 피크가 넘칠 수 있다 → 넘치면 그만큼 낮춰 다시
        r = subprocess.run(["ffmpeg", "-v", "error", "-i", base + ".ogg", "-f", "f32le", "-"], capture_output=True)
        dpk = np.abs(np.frombuffer(r.stdout, np.float32)).max()
        if dpk > dsp.db(-1.0):
            st = st * (dsp.db(-1.5) / dpk)
            encode(st, base, wav)
        pk = 20 * np.log10(np.max(np.abs(st)) + 1e-12)
        rms = 20 * np.log10(np.sqrt(np.mean(st ** 2)) + 1e-12)
        return f"{it['key']:16s} {st.shape[1] / dsp.SR:5.2f}s  peak {pk:5.1f}  rms {rms:6.1f}"
    except Exception as e:  # 하나가 실패해도 나머지는 계속
        return f"{it['key']:16s} FAIL {e!r}"


def main():
    argv = sys.argv[1:]
    flags = [a for a in argv if a.startswith("-")]
    args = [a for a in argv if not a.startswith("-")]
    items = load()
    out = args[0]
    pats = args[1:]
    for k in HAND:  # 프롬프트 없이 손 레시피만 있는 키(ui_filter …)
        items.setdefault(k, dict(key=k, single="", len=0.2, kind="common", lv=None, grade="common"))
    keys = [k for k in items if not pats or any(fnmatch.fnmatch(k, p) for p in pats)]
    if "--plan" in flags:
        for k in keys:
            print(k, "| s=%.2f" % RT.weight_of(items[k]["single"], items[k]["lv"]))
            if k in HAND:
                print("   (손 레시피)")
                continue
            for ph, hits in RT.plan(items[k]["single"]):
                print("   ", ph[:60].ljust(60), "→", ", ".join(h[2] for h in hits) or "-")
        return
    os.makedirs(out, exist_ok=True)
    nj = next((int(f[2:]) for f in flags if f.startswith("-j")), 1)
    wav = "--wav" in flags
    work = [(items[k], out, wav) for k in keys]
    if nj > 1:
        with Pool(nj) as p:
            for line in p.imap_unordered(job, work, chunksize=4):
                print(line, flush=True)
    else:
        for w in work:
            print(job(w), flush=True)


if __name__ == "__main__":
    main()
