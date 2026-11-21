"""ETHERION 효과음 v2 — 카드 자료로 바로 합성해 <키>.ogg · <키>.mp3 로 내보낸다 (프롬프트 · 생성 AI 없음).

  ~/develop/sfx-synth/.venv/bin/python tools/sfx/synth2/render2.py <출력폴더> [키 또는 접두어* …] [-j8] [--wav] [--plan]

- 카드 소리(<ID>.atk · .def · .cast · .equip): cards.py — 게임 자료(dump_cards.js)에서 틀 · 원소 · 무게 · 등급을 읽는다.
- 전장 공용 소리(선택 · 코인 · 타격 · 능력 …): common.py 의 손 레시피.
- 같은 키는 늘 같은 소리(키 이름이 난수 씨앗). --plan 은 카드마다 고른 틀만 보여 준다.
- 검사: tools/sfx/synth/check.py <출력폴더> · 밝기 비교: stats.py
필요한 것: numpy · scipy(venv), ffmpeg(libopus · libmp3lame), node.
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
import kit  # noqa: E402
import cards as C  # noqa: E402
from common import R as HAND  # noqa: E402

PARTS = {"unit": ("atk", "def"), "item": ("equip",)}


def load_cards():
    r = subprocess.run(["node", os.path.join(HERE, "dump_cards.js")], capture_output=True, text=True, check=True)
    return {c["id"]: c for c in json.loads(r.stdout)}


def all_keys(cards):
    keys = {}
    for c in cards.values():
        for p in PARTS.get(c["type"], ("cast",)):
            keys[c["id"] + "." + p] = (c, p)
    for k in HAND:
        keys[k] = None
    return keys


def render(key, item):
    kit.seed(zlib.crc32(key.encode()))
    if item is None:
        fn, opt = HAND[key]
        return kit.finish(fn().buf, **opt)
    return C.render_card(*item)


def encode(st, base, keep_wav=False):
    pcm = (np.clip(st.T, -1, 1) * 32767).astype(np.int16)
    fd, tmp = tempfile.mkstemp(suffix=".wav")
    os.close(fd)
    wavfile.write(tmp, kit.SR, pcm)
    q = ["-hide_banner", "-loglevel", "error", "-y", "-i", tmp]
    subprocess.run(["ffmpeg", *q, "-c:a", "libopus", "-b:a", "96k", "-ar", "48000", base + ".ogg"], check=True)
    subprocess.run(["ffmpeg", *q, "-c:a", "libmp3lame", "-b:a", "128k", "-ar", "44100", base + ".mp3"], check=True)
    if keep_wav:
        os.replace(tmp, base + ".wav")
    else:
        os.remove(tmp)


def job(a):
    key, item, out, wav = a
    try:
        st = render(key, item)
        base = os.path.join(out, key)
        encode(st, base, wav)
        for _ in range(3):   # opus 가 앞머리에서 피크를 넘기면 그만큼 낮춰 다시
            r = subprocess.run(["ffmpeg", "-v", "error", "-i", base + ".ogg", "-f", "f32le", "-"], capture_output=True)
            dpk = np.abs(np.frombuffer(r.stdout, np.float32)).max()
            if dpk <= kit.db(-0.8):
                break
            st = st * (kit.db(-2.0) / dpk)
            encode(st, base, wav)
        pk = 20 * np.log10(np.max(np.abs(st)) + 1e-12)
        rms = 20 * np.log10(np.sqrt(np.mean(st ** 2)) + 1e-12)
        return f"{key:18s} {st.shape[1] / kit.SR:5.2f}s  peak {pk:5.1f}  rms {rms:6.1f}"
    except Exception as e:  # 하나가 실패해도 나머지는 계속
        import traceback
        return f"{key:18s} FAIL {e!r}\n{traceback.format_exc(limit=4)}"


def main():
    argv = sys.argv[1:]
    flags = [a for a in argv if a.startswith("-")]
    args = [a for a in argv if not a.startswith("-")]
    cards = load_cards()
    keys = all_keys(cards)
    pats = args[1:]
    sel = [k for k in keys if not pats or any(fnmatch.fnmatch(k, p) for p in pats)]
    if "--plan" in flags:
        for k in sel:
            it = keys[k]
            if it is None:
                print(k, "| 공용 레시피")
            elif it[1] == "atk":
                print(k, it[0]["kin"], "lv", it[0]["lv"], "|", *C.atk_kind(it[0]))
            elif it[1] == "def":
                print(k, it[0]["kin"], "lv", it[0]["lv"], "|", *C.def_kinds(it[0]))
            elif it[1] == "cast":
                p = C.spell_plan(it[0])
                print(k, it[0]["name"], "lv", it[0]["lv"], "|", p[0], p[1], "x%d" % p[2])
            else:
                print(k, it[0]["name"], "|", (it[0].get("item") or {}).get("icon"))
        return
    out = args[0]
    os.makedirs(out, exist_ok=True)
    nj = next((int(f[2:]) for f in flags if f.startswith("-j")), 1)
    work = [(k, keys[k], out, "--wav" in flags) for k in sel]
    bad = 0
    if nj > 1:
        with Pool(nj) as p:
            for line in p.imap_unordered(job, work, chunksize=4):
                bad += "FAIL" in line
                print(line, flush=True)
    else:
        for w in work:
            line = job(w)
            bad += "FAIL" in line
            print(line, flush=True)
    print(f"끝: {len(work)}개 · 실패 {bad}개")


if __name__ == "__main__":
    main()
