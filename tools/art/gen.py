#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ETHERION — 그림 AI 일괄 생성 (v3.9.15, 스타일 가이드 6.7)

tools/art/prompts/ 의 작업 목록(cards.jsonl · ui.jsonl)을 읽어 그림 AI(OpenAI · Gemini)에 보내고,
받은 그림을 게임이 쓰는 크기 · 투명 모양으로 다듬어 제자리(img/cards · img/ui)에 넣는다.

  python tools/art/gen.py --provider openai --group B1 --limit 3     # B1 카드 3장만 시험
  python tools/art/gen.py --provider gemini --only ui --set pyre      # 성화대 세 층
  python tools/art/gen.py --provider mock --only ui                   # API 없이 흐름만 시험(가짜 그림, --review 권장)
  python tools/art/gen.py --list --group A2                           # 무엇을 만들지 보기만

자세한 사용법: tools/art/README.md.  필요한 것: Python 3.9+, Pillow(pip install pillow).
API 키는 환경 변수 OPENAI_API_KEY / GEMINI_API_KEY, 없으면 실행할 때 물어본다(어디에도 저장하지 않음).
"""
import argparse, base64, getpass, io, json, os, random, shutil, sys, time, uuid
import urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8"); sys.stderr.reconfigure(encoding="utf-8")
except Exception:
    pass
try:
    from PIL import Image, ImageDraw, ImageFilter
except ImportError:
    print("Pillow가 필요합니다:  python -m pip install pillow"); sys.exit(1)

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
PROMPTS = HERE / "prompts"
WORK = HERE / "out"              # 받은 원본(raw) · 기록(log) · 검토본(review) · 모아 보기(sheet)
STAMP = datetime.now().strftime("%Y%m%d_%H%M%S")
BACKUP = ROOT / f"_backup_art/{STAMP}"

DEFAULT_MODEL = {"openai": "gpt-image-1", "gemini": "gemini-2.5-flash-image", "mock": "mock"}
GEMINI_RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"]
OPENAI_SIZES = [(1024, 1024), (1024, 1536), (1536, 1024)]


# ───────── 작업 목록 ─────────
def load_jobs():
    jobs = []
    for name in ("ui.jsonl", "cards.jsonl"):
        p = PROMPTS / name
        if not p.exists():
            print(f"{p.relative_to(ROOT)} 없음 — 먼저  node tools/art/build_prompts.js"); sys.exit(1)
        for line in p.read_text(encoding="utf-8").splitlines():
            if line.strip():
                jobs.append(json.loads(line))
    return jobs


def select(jobs, a):
    out = []
    ids = set(x.strip() for x in a.ids.split(",")) if a.ids else None
    for j in jobs:
        if a.only and j["kind"] != {"cards": "card", "ui": "ui"}[a.only]: continue
        if ids and j["id"] not in ids: continue
        if a.group and j.get("group") not in a.group.split(","): continue
        if a.type and j.get("type") not in a.type.split(","): continue
        if a.set and j.get("set") not in a.set.split(","): continue
        if a.grade and j.get("grade") not in a.grade.split(","): continue
        out.append(j)
    return out


def dest_of(j, a):
    p = ROOT / j["out"]
    return (WORK / "review" / j["out"]) if a.review else p


# ───────── 그림 다듬기 ─────────
def ratio(w, h): return w / h


def request_canvas(j, provider):
    """AI에 요청할 판의 비율과 크기. 게임 크기(target)는 이 판 가운데에 들어간다."""
    tw, th = j["size"]
    r = ratio(tw, th)
    if provider == "gemini":
        best = min(GEMINI_RATIOS, key=lambda s: abs(ratio(*map(int, s.split(":"))) - r))
        rw, rh = map(int, best.split(":"))
        return best, (1024 * rw // max(rw, rh), 1024 * rh // max(rw, rh))
    if provider == "openai":
        w, h = min(OPENAI_SIZES, key=lambda s: abs(ratio(*s) - r))
        return f"{w}x{h}", (w, h)
    return "mock", (1024, round(1024 / r)) if r >= 1 else (round(1024 * r), 1024)


def target_box(canvas, size):
    """판(canvas) 안에서 게임 그림이 차지하는 칸 — 비율을 지켜 가운데에 꽉 차게(cover)."""
    cw, ch = canvas; tw, th = size
    if ratio(tw, th) > ratio(cw, ch):     # 게임 그림이 더 넓다 → 판 폭에 맞추고 위아래를 잘라 냄
        w, h = cw, round(cw * th / tw)
    else:
        w, h = round(ch * tw / th), ch
    x, y = (cw - w) // 2, (ch - h) // 2
    return (x, y, x + w, y + h)


def pad_ref(img, canvas, size, transparent):
    """참고 그림을 게임 크기로 맞춘 뒤 요청 판 가운데 칸에 놓는다(자리가 그대로 대응하게)."""
    box = target_box(canvas, size)
    bg = (0, 0, 0, 0) if transparent else (7, 8, 13, 255)
    c = Image.new("RGBA", canvas, bg)
    c.alpha_composite(img.convert("RGBA").resize((box[2] - box[0], box[3] - box[1]), Image.LANCZOS), (box[0], box[1]))
    return c


def postprocess(raw, j, canvas):
    tw, th = j["size"]
    img = raw.convert("RGBA").resize(canvas, Image.LANCZOS)
    img = img.crop(target_box(canvas, j["size"])).resize((tw, th), Image.LANCZOS)
    alpha = (j.get("post") or {}).get("alpha")
    if alpha == "luma":                       # 검은 바탕 → 투명 (불꽃처럼 screen으로 얹는 층)
        a = _max_channel(img.convert("RGB")).point(lambda v: 0 if v < 10 else min(255, int((v - 10) * 255 / 200)))
        img = _unpremultiply(img, a)
    elif alpha == "key":                      # 자유 그림: 어두운 바탕(#07080d)만 지운다. 모델이 준 투명은 그대로 둔다
        from PIL import ImageChops
        rgb = img.convert("RGB")
        d = _max_channel(ImageChops.difference(rgb, Image.new("RGB", rgb.size, (7, 8, 13))))
        k = d.point(lambda v: 0 if v < 10 else min(255, int((v - 10) * 255 / 40)))
        img.putalpha(ImageChops.multiply(img.split()[3], k))
    elif alpha and alpha.startswith("ref:"):  # 지금 그림의 투명 모양을 그대로 (코드가 얹는 자리와 맞게)
        ref = Image.open(ROOT / alpha[4:]).convert("RGBA").resize((tw, th), Image.LANCZOS)
        img.putalpha(ref.split()[3])
    elif j.get("background") == "opaque" or j.get("format") == "jpg":
        bg = Image.new("RGBA", img.size, (7, 8, 13, 255)); bg.alpha_composite(img); img = bg
    return img


def _max_channel(rgb):
    r, g, b = rgb.split()
    from PIL import ImageChops
    return ImageChops.lighter(ImageChops.lighter(r, g), b)


def _unpremultiply(img, a):
    """검은 바탕에 그린 빛을 투명 층으로: 색은 밝기로 나눠 되살리고 알파 = 밝기."""
    px = img.convert("RGB").load(); ap = a.load()
    out = Image.new("RGBA", img.size); op = out.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            al = ap[x, y]
            if al == 0:
                op[x, y] = (0, 0, 0, 0); continue
            r, g, b = px[x, y]; k = 255.0 / max(al, 1)
            op[x, y] = (min(255, int(r * k)), min(255, int(g * k)), min(255, int(b * k)), al)
    return out


def save(img, dest, j):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():                          # 바꾸기 전 그림은 _backup_art/<시각>/ 에 남긴다
        bk = BACKUP / dest.relative_to(ROOT)
        bk.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(dest, bk)
    if j.get("format") == "jpg":
        img.convert("RGB").save(dest, "JPEG", quality=90, optimize=True)
    else:
        img.save(dest, "PNG", optimize=True)


# ───────── 그림 AI ─────────
class ApiError(Exception):
    def __init__(self, code, body): super().__init__(f"HTTP {code}: {body[:400]}"); self.code = code; self.body = body


def http(url, data, headers, timeout=300):
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise ApiError(e.code, e.read().decode("utf-8", "replace"))


def png_bytes(img):
    b = io.BytesIO(); img.save(b, "PNG"); return b.getvalue()


def multipart(fields, files):
    bd = "----eth" + uuid.uuid4().hex
    out = io.BytesIO()
    for k, v in fields.items():
        out.write(f"--{bd}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode())
    for k, (fn, data) in files:
        out.write(f"--{bd}\r\nContent-Disposition: form-data; name=\"{k}\"; filename=\"{fn}\"\r\nContent-Type: image/png\r\n\r\n".encode())
        out.write(data); out.write(b"\r\n")
    out.write(f"--{bd}--\r\n".encode())
    return out.getvalue(), f"multipart/form-data; boundary={bd}"


def call_openai(j, prompt, refs, req, canvas, a, key):
    bgmode = "transparent" if j.get("background") == "transparent" else "opaque"
    opt = {"model": a.model, "prompt": prompt, "size": req, "quality": a.quality, "n": 1, "background": bgmode}
    H = {"Authorization": f"Bearer {key}"}
    if refs:
        fields = {k: str(v) for k, v in opt.items()}
        fields["input_fidelity"] = "high"
        for attempt in range(2):
            body, ct = multipart(fields, [("image[]", (f"ref{i}.png", png_bytes(r))) for i, r in enumerate(refs)])
            try:
                res = http("https://api.openai.com/v1/images/edits", body, dict(H, **{"Content-Type": ct}))
                break
            except ApiError as e:   # 모델이 모르는 선택 값이면 빼고 한 번 더
                if e.code == 400 and attempt == 0 and ("input_fidelity" in e.body or "background" in e.body):
                    fields.pop("input_fidelity", None)
                    if "background" in e.body: fields.pop("background", None)
                    continue
                raise
    else:
        res = http("https://api.openai.com/v1/images/generations", json.dumps(opt).encode(), dict(H, **{"Content-Type": "application/json"}))
    return Image.open(io.BytesIO(base64.b64decode(res["data"][0]["b64_json"])))


def call_gemini(j, prompt, refs, req, canvas, a, key):
    if j.get("background") == "transparent":
        prompt += "\nPaint it on a plain flat very dark background (#07080d); transparency is applied afterwards."
    parts = [{"text": prompt}] + [{"inline_data": {"mime_type": "image/png", "data": base64.b64encode(png_bytes(r)).decode()}} for r in refs]
    body = {"contents": [{"role": "user", "parts": parts}],
            "generationConfig": {"responseModalities": ["TEXT", "IMAGE"], "imageConfig": {"aspectRatio": req}}}
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{a.model}:generateContent"
    res = http(url, json.dumps(body).encode(), {"Content-Type": "application/json", "x-goog-api-key": key})
    for c in res.get("candidates", []):
        for p in (c.get("content") or {}).get("parts", []):
            d = p.get("inlineData") or p.get("inline_data")
            if d and d.get("data"):
                return Image.open(io.BytesIO(base64.b64decode(d["data"])))
    raise ApiError(0, "그림이 오지 않음: " + json.dumps(res, ensure_ascii=False)[:400])


def call_mock(j, prompt, refs, req, canvas, a, key):
    w, h = canvas
    rnd = random.Random(j["id"])
    img = Image.new("RGBA", (w, h), (7, 8, 13, 255))
    d = ImageDraw.Draw(img)
    for i in range(40):
        x, y, r = rnd.randrange(w), rnd.randrange(h), rnd.randrange(20, 160)
        d.ellipse((x - r, y - r, x + r, y + r), fill=(rnd.randrange(60, 200), rnd.randrange(40, 160), rnd.randrange(80, 220), 60))
    if refs:
        img.alpha_composite(refs[0].filter(ImageFilter.GaussianBlur(2)))
    d.text((20, 20), f"MOCK {j['id']}", fill=(255, 255, 255, 255))
    return img


CALL = {"openai": call_openai, "gemini": call_gemini, "mock": call_mock}


def generate(j, a, key, made):
    canvas_req, canvas = request_canvas(j, a.provider)
    transparent = j.get("background") != "opaque"
    refs = []
    for r in j.get("refs") or []:
        if r.startswith("out:"):                       # 같은 묶음에서 먼저 만든 그림 (이번에 만든 것, 없으면 지금 있는 것)
            rid = r[4:]
            p = made.get(rid)
            if not p:
                jj = next((x for x in a._all if x["id"] == rid), None)
                p = dest_of(jj, a) if jj else None
            if not p or not Path(p).exists(): continue
            refs.append(pad_ref(Image.open(p), canvas, j["size"], transparent))
        else:
            refs.append(pad_ref(Image.open(ROOT / r), canvas, j["size"], transparent))
    prompt = j["prompt"]
    if a.extra: prompt += "\n" + a.extra
    tries = 0
    while True:
        try:
            raw = CALL[a.provider](j, prompt, refs, canvas_req, canvas, a, key)
            break
        except (ApiError, urllib.error.URLError, TimeoutError) as e:
            code = getattr(e, "code", 0)
            tries += 1
            if tries > a.retries or code in (400, 401, 403, 404):
                raise
            wait = min(60, 4 * 2 ** tries) + random.random()
            print(f"  … {j['id']} 다시 시도 {tries}/{a.retries} ({e}) {wait:.0f}초 뒤")
            time.sleep(wait)
    (WORK / "raw").mkdir(parents=True, exist_ok=True)
    rawp = WORK / "raw" / f"{j['id']}.png"
    raw.save(rawp)
    (WORK / "raw" / f"{j['id']}.json").write_text(json.dumps({"canvas": canvas, "provider": a.provider, "model": a.model}), encoding="utf-8")
    return rawp, canvas


def finish(j, a, rawp, canvas):
    img = postprocess(Image.open(rawp), j, canvas)
    dest = dest_of(j, a)
    save(img, dest, j)
    return dest


# ───────── 모아 보기 ─────────
def contact_sheet(jobs, a):
    have = [(j, dest_of(j, a)) for j in jobs if dest_of(j, a).exists()]
    if not have:
        print("모아 볼 그림이 없습니다."); return
    tw = 200; th = round(tw * have[0][0]["size"][1] / have[0][0]["size"][0]) if have[0][0]["kind"] == "card" else 200
    cols = 8; rows = (len(have) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * (tw + 8) + 8, rows * (th + 26) + 8), (12, 13, 20))
    d = ImageDraw.Draw(sheet)
    for i, (j, p) in enumerate(have):
        im = Image.open(p).convert("RGBA"); im.thumbnail((tw, th))
        x = 8 + (i % cols) * (tw + 8); y = 8 + (i // cols) * (th + 26)
        sheet.paste(im, (x, y), im)
        d.text((x, y + th + 4), j["id"], fill=(217, 180, 106))
    WORK.mkdir(parents=True, exist_ok=True)
    out = WORK / f"sheet_{STAMP}.jpg"; sheet.save(out, quality=88)
    print(f"모아 보기: {out.relative_to(ROOT)} ({len(have)}장)")


# ───────── 실행 ─────────
def main():
    ap = argparse.ArgumentParser(description="ETHERION 그림 AI 일괄 생성 (README: tools/art/README.md)")
    ap.add_argument("--provider", choices=["openai", "gemini", "mock"], help="그림 AI")
    ap.add_argument("--model", help="모델 이름 (기본: openai gpt-image-1, gemini gemini-2.5-flash-image)")
    ap.add_argument("--quality", default="medium", choices=["low", "medium", "high", "auto"], help="OpenAI 품질 (값이 다름)")
    ap.add_argument("--only", choices=["cards", "ui"], help="카드만 / 전장 그림만")
    ap.add_argument("--ids", help="카드 ID 또는 전장 그림 id, 쉼표로 (예 B1-01,MB-01 · pyre_back)")
    ap.add_argument("--group", help="단체 (예 B1 또는 B1,B2)")
    ap.add_argument("--type", help="unit, atk, def, any, hand, item")
    ap.add_argument("--grade", help="common, …, unique, special")
    ap.add_argument("--set", help="전장 그림 묶음: battle, deck, pyre, ether, life")
    ap.add_argument("--limit", type=int, help="이번에 만들 최대 장수")
    ap.add_argument("--force", action="store_true", help="이미 그림이 있어도 다시 만듦(옛 그림은 _backup_art에)")
    ap.add_argument("--review", action="store_true", help="게임 폴더 대신 tools/art/out/review/ 에 저장")
    ap.add_argument("--repost", action="store_true", help="AI를 부르지 않고 받아 둔 원본(out/raw)으로 다듬기만 다시")
    ap.add_argument("--workers", type=int, default=2, help="카드를 동시에 몇 장 요청할지 (기본 2)")
    ap.add_argument("--retries", type=int, default=4)
    ap.add_argument("--extra", help="모든 프롬프트 끝에 덧붙일 말")
    ap.add_argument("--list", action="store_true", help="만들 목록만 보기")
    ap.add_argument("--sheet", action="store_true", help="고른 그림들을 한 장에 모아 보기")
    ap.add_argument("--yes", "-y", action="store_true", help="확인 묻지 않기")
    a = ap.parse_args()

    allj = load_jobs(); a._all = allj
    jobs = select(allj, a)
    if a.sheet:
        return contact_sheet(jobs, a)
    todo = [j for j in jobs if a.force or a.repost or not dest_of(j, a).exists()]
    if a.limit: todo = todo[:a.limit]
    print(f"고른 {len(jobs)}장 중 만들 것 {len(todo)}장 (이미 있는 그림은 건너뜀{' — --force로 다시' if not a.force else ''})")
    if a.list or not todo:
        for j in todo[:400]: print(f"  {j['id']:<12} {j.get('name') or j.get('title','')}  → {j['out']}")
        return
    if not a.provider:
        print("--provider openai | gemini | mock 를 정해 주세요."); return
    a.model = a.model or DEFAULT_MODEL[a.provider]

    key = None
    if a.provider != "mock" and not a.repost:
        env = {"openai": "OPENAI_API_KEY", "gemini": "GEMINI_API_KEY"}[a.provider]
        key = os.environ.get(env) or (os.environ.get("GOOGLE_API_KEY") if a.provider == "gemini" else None)
        if not key:
            key = getpass.getpass(f"{env} (입력은 화면에 보이지 않고 저장되지 않습니다): ").strip()
        if not key: print("API 키가 없습니다."); return
        if not a.yes and len(todo) > 5:
            if input(f"{a.provider} · {a.model}로 {len(todo)}장을 만듭니다(장마다 사용료). 계속할까요? (y/N) ").strip().lower() != "y":
                return

    WORK.mkdir(parents=True, exist_ok=True)
    logf = (WORK / "log.jsonl").open("a", encoding="utf-8")
    made, ok, fail = {}, 0, 0

    def one(j):
        if a.repost:
            meta = json.loads((WORK / "raw" / f"{j['id']}.json").read_text(encoding="utf-8"))
            rawp, canvas = WORK / "raw" / f"{j['id']}.png", tuple(meta["canvas"])
        else:
            rawp, canvas = generate(j, a, key, made)
        return finish(j, a, rawp, canvas)

    def record(j, dest, err):
        nonlocal ok, fail
        if err:
            fail += 1; print(f"  ✗ {j['id']}  {err}")
        else:
            ok += 1; print(f"  ✓ {j['id']}  → {dest.relative_to(ROOT)}")
        logf.write(json.dumps({"t": datetime.now().isoformat(timespec="seconds"), "id": j["id"], "provider": a.provider,
                               "model": a.model, "out": j["out"], "ok": not err, "err": str(err)[:500] if err else None}, ensure_ascii=False) + "\n")
        logf.flush()

    # 전장 그림은 묶음 안에서 앞 층을 참고로 쓰므로 하나씩 차례로
    for j in [x for x in todo if x["kind"] == "ui"]:
        try:
            dest = one(j); made[j["id"]] = dest; record(j, dest, None)
        except Exception as e:
            record(j, None, e)
    cards = [x for x in todo if x["kind"] == "card"]
    with ThreadPoolExecutor(max_workers=max(1, a.workers)) as ex:
        fut = {ex.submit(one, j): j for j in cards}
        for f in as_completed(fut):
            j = fut[f]
            try: record(j, f.result(), None)
            except Exception as e: record(j, None, e)
    logf.close()
    print(f"끝: 성공 {ok} · 실패 {fail}" + (f" · 바꾸기 전 그림은 {BACKUP.relative_to(ROOT)}" if BACKUP.exists() else ""))
    if ok and not a.review:
        print("게임을 새로 고치면 바로 보입니다(카드 그림 · 전장 그림 모두).")


if __name__ == "__main__":
    main()
