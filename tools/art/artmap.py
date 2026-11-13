"""ETHERION — 카드 ↔ 일러스트 연결 (v1, 2026-11-10 · 가이드 tools/art/PROMPT_GUIDE.md 8장)

받은 그림을 카드에 연결해 img/cards/<카드ID>.jpg (v3.41, 예전 .png도 읽음) 로 넣고, 장부(art_map.csv)와 보드(art_board.html)를 새로 만든다.
카드 목록은 tools/art/prompts/cards.jsonl (node tools/art/build_prompts.js 가 만든다)에서 읽는다.

게임 폴더 맨 위에서:
  python tools/art/artmap.py                      장부 · 보드만 새로 (새 카드 줄 추가, 그림이 있는지 다시 봄)
  python tools/art/artmap.py import               tools/art/inbox/ 의 그림을 카드에 연결해 넣기
  python tools/art/artmap.py import --model gpt-image-1   (장부의 model 칸에 함께 적기)
  python tools/art/artmap.py assign <파일> <카드ID>  이름으로 못 찾은 그림을 직접 연결
  python tools/art/artmap.py import --dry         넣지 않고 무엇이 어디로 갈지만 보기

inbox 파일 이름에 카드 ID(EP-A1-3_v2.png) 또는 카드 이름(장막의 처형자.jpg)이 들어 있으면 된다.
v3.41 가운데를 4:5로 잘라 600×750 JPG(품질 82, 장당 약 60~100KB)로 넣는다 — 폰에서도 가볍게. Pillow가 있으면 Pillow,
없으면 맥의 sips로 한다(둘 다 없으면 PNG만 그대로 복사). 넣을 때마다 목록 img/cards/art_index.js를 새로 쓴다(게임은 이 목록으로 그림을 찾는다).
img/cards/에 파일을 손으로 넣었으면:  python tools/art/artmap.py index   (목록만 새로)
있던 그림은 _backup_art/<시각>/img/cards/ 에 남는다. 넣은 원본은 inbox/_done/ 으로 옮긴다(지우지 않는다).
"""
import csv, json, re, shutil, sys, time
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
JOBS = HERE / "prompts" / "cards.jsonl"
STYLE = HERE / "art_style.json"
MAP = HERE / "art_map.csv"
BOARD = HERE / "art_board.html"
INBOX = HERE / "inbox"
CARDS_DIR = ROOT / "img" / "cards"
STAMP = time.strftime("%Y%m%d-%H%M%S")
EXTS = {".png", ".jpg", ".jpeg", ".webp"}
SIZE = (600, 750)        # v3.41 800×1000 PNG → 600×750 JPG (카드는 화면에서 가로 100~400px)
JPG_Q = 82
COLS = ["card_id", "name", "grade", "grade_ko", "group", "type", "lv", "base", "status", "image",
        "art_ver", "prompt_ver", "source_file", "model", "added", "note"]
HUMAN_STATUS = {"채택", "다시"}

try:
    from PIL import Image
except ImportError:
    Image = None


def load_jobs():
    if not JOBS.exists():
        sys.exit("prompts/cards.jsonl 이 없습니다. 먼저 node tools/art/build_prompts.js")
    return [json.loads(l) for l in JOBS.read_text(encoding="utf-8").splitlines() if l.strip()]


def load_style():
    try:
        return json.loads(STYLE.read_text(encoding="utf-8"))
    except Exception:
        return {"grades": {}, "flags": {}, "gradeOrder": []}


def load_map():
    if not MAP.exists():
        return {}
    with MAP.open(encoding="utf-8-sig", newline="") as f:
        return {r["card_id"]: r for r in csv.DictReader(f) if r.get("card_id")}


def save_map(rows):
    order = {g: i for i, g in enumerate(STYLE_DATA.get("gradeOrder", []))}
    data = sorted(rows.values(), key=lambda r: (r["status"] == "빠진 카드", -order.get(r["grade"], 0), r["group"], r["card_id"]))
    try:
        with MAP.open("w", encoding="utf-8-sig", newline="") as f:
            w = csv.DictWriter(f, fieldnames=COLS, extrasaction="ignore")
            w.writeheader()
            w.writerows(data)
    except PermissionError:
        print(f"! {MAP.name} 을 쓸 수 없습니다 — 엑셀에서 열려 있으면 닫고 다시 실행하세요.")


def image_file(cid):
    for ext in (".jpg", ".png", ".webp", ".jpeg"):
        if (CARDS_DIR / f"{cid}{ext}").exists():
            return f"{cid}{ext}"
    return ""


def has_image(cid):
    return bool(image_file(cid))


def write_index(rows=None):
    """v3.41 게임이 읽는 그림 목록: img/cards/art_index.js (window.ART_INDEX = { 카드ID: 파일 })"""
    CARDS_DIR.mkdir(parents=True, exist_ok=True)
    idx = {}
    for f in sorted(CARDS_DIR.iterdir()):
        if f.suffix.lower() in EXTS and f.stem not in idx:
            idx[f.stem] = image_file(f.stem)
    body = json.dumps(idx, ensure_ascii=False, separators=(",", ":"))
    (CARDS_DIR / "art_index.js").write_text("/* 카드 일러스트 목록 (tools/art/artmap.py가 만든다 — 손으로 고치지 않는다). 카드ID: img/cards/ 안의 파일 이름 */\nwindow.ART_INDEX = " + body + ";\n", encoding="utf-8")
    return len(idx)


def refresh(rows, jobs):
    G = STYLE_DATA.get("grades", {})
    live = set()
    for j in jobs:
        cid = j["id"]
        live.add(cid)
        r = rows.get(cid) or {k: "" for k in COLS}
        r.update({"card_id": cid, "name": j.get("name", ""), "grade": j.get("grade", ""),
                  "grade_ko": G.get(j.get("grade", ""), {}).get("ko", ""), "group": j.get("group", ""),
                  "type": j.get("type", ""), "lv": str(j.get("lv", "")), "base": j.get("base", ""),
                  "prompt_ver": j.get("prompt_ver", "")})
        img = has_image(cid)
        r["image"] = f"img/cards/{image_file(cid)}" if img else ""
        st = r.get("status", "")
        if img:
            r["status"] = st if st in HUMAN_STATUS else "들어감"
        else:
            r["status"] = "다시" if st == "다시" else "없음"
        rows[cid] = r
    for cid, r in rows.items():
        if cid not in live:
            r["status"] = "빠진 카드"
    return rows


# ---------- 그림 찾기 · 넣기 ----------
def norm(s):
    return re.sub(r"[\s_\-·.,()\[\]{}'\"]+", "", s).lower()


def match_file(path, jobs):
    stem = path.stem
    # 1) 카드 ID (긴 것부터, 앞뒤가 ID 글자가 아닐 때)
    for j in sorted(jobs, key=lambda x: -len(x["id"])):
        if re.search(rf"(?<![A-Za-z0-9-]){re.escape(j['id'])}(?![A-Za-z0-9])", stem, re.I):
            return j["id"], None
    # 2) 카드 이름 (공백 · 기호 무시, 가장 긴 이름)
    ns = norm(stem)
    hits = [j for j in jobs if j.get("name") and norm(j["name"]) and norm(j["name"]) in ns]
    if not hits:
        return None, None
    best = max(len(norm(j["name"])) for j in hits)
    top = [j for j in hits if len(norm(j["name"])) == best]
    if len(top) > 1:
        return None, [j["id"] for j in top]
    return top[0]["id"], None


def place(src, cid, dry=False):
    dest = CARDS_DIR / f"{cid}.jpg"
    if dry:
        return True
    CARDS_DIR.mkdir(parents=True, exist_ok=True)
    for old in [CARDS_DIR / f"{cid}{e}" for e in (".jpg", ".png", ".webp", ".jpeg")]:   # 같은 카드의 예전 그림은 백업으로 옮긴다
        if old.exists():
            bk = ROOT / "_backup_art" / STAMP / "img" / "cards"
            bk.mkdir(parents=True, exist_ok=True)
            shutil.move(str(old), bk / old.name)
    if Image is not None:
        im = Image.open(src)
        im = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")
        w, h = im.size
        tw, th = SIZE
        if w / h > tw / th:            # 너무 넓다 → 양옆을 자름
            nw = round(h * tw / th)
            box = ((w - nw) // 2, 0, (w - nw) // 2 + nw, h)
        else:                          # 너무 길다 → 위아래를 자름(가운데 기준)
            nh = round(w * th / tw)
            box = (0, (h - nh) // 2, w, (h - nh) // 2 + nh)
        im = im.crop(box).resize(SIZE, Image.LANCZOS)
        if im.mode == "RGBA":
            bg = Image.new("RGB", SIZE, (7, 8, 13))   # 투명 자리는 밤하늘 남색
            bg.paste(im, mask=im.split()[3])
            im = bg
        im.convert("RGB").save(dest, "JPEG", quality=JPG_Q, optimize=True, progressive=True)
    elif shutil.which("sips"):   # v3.41 맥: Pillow 없이 sips로 가운데 4:5 자르기 · 줄이기 · JPG
        import subprocess
        out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(src)], capture_output=True, text=True).stdout
        w = int(re.search(r"pixelWidth: (\d+)", out).group(1)); h = int(re.search(r"pixelHeight: (\d+)", out).group(1))
        tw, th = SIZE
        ch, cw = (h, round(h * tw / th)) if w / h > tw / th else (round(w * th / tw), w)
        r = subprocess.run(["sips", "-c", str(ch), str(cw), "-s", "format", "jpeg", "-s", "formatOptions", "100", str(src), "--out", str(dest)], capture_output=True, text=True)   # 가운데 4:5로 자르고
        if r.returncode == 0:   # 그다음 줄인다(sips는 한 번에 주면 줄이기를 먼저 해서 비율이 어긋난다)
            r = subprocess.run(["sips", "-z", str(th), str(tw), "-s", "formatOptions", str(JPG_Q), str(dest)], capture_output=True, text=True)
        if r.returncode != 0 or not dest.exists():
            print(f"  ! {src.name}: sips로 바꾸지 못했습니다 — {r.stderr.strip()[:200]}")
            return False
    else:
        if src.suffix.lower() != ".png":
            print(f"  ! {src.name}: PNG가 아니라 넣지 못했습니다 — python -m pip install pillow 뒤 다시")
            return False
        shutil.copy2(src, CARDS_DIR / f"{cid}.png")
    return True


def record(rows, jobs_by_id, cid, src_name, model):
    r = rows.get(cid) or {k: "" for k in COLS}
    r["card_id"] = cid
    r["source_file"] = src_name
    r["added"] = time.strftime("%Y-%m-%d %H:%M")
    r["art_ver"] = jobs_by_id.get(cid, {}).get("prompt_ver", "")
    if model:
        r["model"] = model
    if r.get("status") in ("다시", "채택"):
        r["status"] = "들어감"
    rows[cid] = r


def move_done(src):
    done = INBOX / "_done"
    done.mkdir(parents=True, exist_ok=True)
    tgt = done / src.name
    k = 2
    while tgt.exists():
        tgt = done / f"{src.stem}_{k}{src.suffix}"
        k += 1
    shutil.move(str(src), str(tgt))


def cmd_import(rows, jobs, model, dry):
    INBOX.mkdir(exist_ok=True)
    files = sorted([p for p in INBOX.iterdir() if p.is_file() and p.suffix.lower() in EXTS], key=lambda p: p.stat().st_mtime)
    if not files:
        print(f"inbox가 비었습니다: {INBOX.relative_to(ROOT)}  (그림 파일 이름에 카드 ID나 카드 이름을 넣어 두세요)")
        return
    by_id = {j["id"]: j for j in jobs}
    done, left = 0, []
    for p in files:
        cid, amb = match_file(p, jobs)
        if not cid:
            left.append((p, amb))
            continue
        j = by_id[cid]
        print(f"  {p.name}  →  {cid} {j.get('name','')}  [{j.get('grade','')}]" + ("  (있던 그림은 백업)" if has_image(cid) else ""))
        if place(p, cid, dry):
            if not dry:
                record(rows, by_id, cid, p.name, model)
                move_done(p)
            done += 1
    print(f"{'넣을 것' if dry else '넣음'} {done}장" + (f" · 못 찾음 {len(left)}장" if left else ""))
    for p, amb in left:
        print(f"  ? {p.name}" + (f" — 이름이 같은 카드가 여럿: {', '.join(amb)}" if amb else " — 카드 ID나 이름이 파일 이름에 없음")
              + f"\n      → python tools/art/artmap.py assign \"{p.name}\" <카드ID>")


def cmd_assign(rows, jobs, fname, cid, model):
    by_id = {j["id"]: j for j in jobs}
    if cid not in by_id:
        sys.exit(f"카드 ID를 찾지 못했습니다: {cid}")
    p = Path(fname)
    if not p.exists():
        p = INBOX / fname
    if not p.exists():
        sys.exit(f"파일이 없습니다: {fname}")
    if place(p, cid):
        record(rows, by_id, cid, p.name, model)
        if p.parent.resolve() == INBOX.resolve():
            move_done(p)
        print(f"  {p.name}  →  {cid} {by_id[cid].get('name','')}")


# ---------- 보드 ----------
BOARD_HTML = r"""<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ETHERION 일러스트 보드</title>
<style>
:root{--bg:#07080d;--panel:#10121b;--line:#2a2d3d;--gold:#d9b46a;--gold-hi:#f6e2a8;--text:#e8e3d6;--dim:#8d8a80;--ether:#8fdcff}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:14px/1.45 "Noto Serif KR","Batang",serif}
header{position:sticky;top:0;z-index:5;background:rgba(7,8,13,.96);border-bottom:1px solid var(--line);padding:12px 16px}
h1{margin:0 0 8px;font-size:18px;color:var(--gold-hi);letter-spacing:.05em}h1 small{color:var(--dim);font-size:12px;font-weight:400;margin-left:8px}
.prog{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
.chip{border:1px solid var(--c,#555);color:var(--c,#ccc);border-radius:999px;padding:2px 10px;font-size:12px;cursor:pointer;background:transparent;font-family:inherit}
.chip.on{background:color-mix(in srgb,var(--c,#888) 22%,transparent)}
.chip b{font-weight:700}
.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
select,input{background:var(--panel);color:var(--text);border:1px solid var(--line);border-radius:6px;padding:5px 8px;font:inherit}
input[type=search]{min-width:200px;flex:1}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:14px;padding:16px}
.card{background:var(--panel);border:1px solid var(--line);border-top:3px solid var(--gc);border-radius:8px;overflow:hidden;display:flex;flex-direction:column}
.thumb{aspect-ratio:4/5;background:radial-gradient(circle at 50% 45%,color-mix(in srgb,var(--el) 35%,transparent),#07080d 70%);display:grid;place-items:center;cursor:zoom-in;position:relative}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.thumb .ph{color:var(--dim);font-size:12px;text-align:center;padding:8px}
.badge{position:absolute;top:6px;right:6px;font-size:11px;padding:1px 7px;border-radius:999px;background:rgba(0,0,0,.7);border:1px solid var(--line)}
.st-없음{color:#9a958a}.st-들어감{color:var(--ether);border-color:var(--ether)!important}.st-채택{color:#8fe3a0;border-color:#8fe3a0!important}.st-다시{color:#ff9b86;border-color:#ff9b86!important}
.old{position:absolute;top:6px;left:6px;font-size:10px;padding:1px 6px;border-radius:4px;background:#3a2412;color:#ffcf8a}
.meta{padding:8px 9px;display:flex;flex-direction:column;gap:3px;flex:1}
.nm{color:var(--gold-hi);font-weight:700}.sub{color:var(--dim);font-size:12px}
.gr{color:var(--gc);font-weight:700}
.btns{display:flex;gap:4px;margin-top:auto;padding-top:6px}
button.b{flex:1;background:#1a1d2a;color:var(--gold);border:1px solid var(--line);border-radius:5px;padding:4px 0;font:inherit;font-size:12px;cursor:pointer}
button.b:hover{border-color:var(--gold)}
dialog{background:var(--panel);color:var(--text);border:1px solid var(--gold);border-radius:10px;max-width:min(980px,94vw);width:100%;padding:0}
dialog::backdrop{background:rgba(0,0,0,.75)}
.dlg{display:grid;grid-template-columns:minmax(0,320px) 1fr;gap:16px;padding:16px}
.dlg img{width:100%;border-radius:6px;border:1px solid var(--line)}
.dlg pre{white-space:pre-wrap;background:#0b0c12;border:1px solid var(--line);border-radius:6px;padding:10px;font:12px/1.5 ui-monospace,Consolas,monospace;max-height:60vh;overflow:auto;margin:8px 0}
.toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#1a1d2a;border:1px solid var(--gold);padding:6px 14px;border-radius:999px;opacity:0;transition:opacity .2s;pointer-events:none}
.toast.on{opacity:1}
@media (max-width:640px){.dlg{grid-template-columns:1fr}main{grid-template-columns:repeat(auto-fill,minmax(140px,1fr));padding:12px}}
</style></head><body>
<header>
<h1>ETHERION 일러스트 보드<small id="sum"></small></h1>
<div class="prog" id="prog"></div>
<div class="bar">
<select id="fg"><option value="">모든 깃발</option></select>
<select id="ft"><option value="">모든 종류</option><option value="unit">유닛</option><option value="atk">공격 마법</option><option value="def">방어 마법</option><option value="any">공용 마법</option><option value="hand">핸드 마법</option><option value="item">아이템</option></select>
<select id="fs"><option value="">모든 상태</option><option>없음</option><option>들어감</option><option>채택</option><option>다시</option></select>
<input type="search" id="q" placeholder="카드 ID · 이름 찾기">
</div></header>
<main id="grid"></main>
<dialog id="dlg"></dialog>
<div class="toast" id="toast"></div>
<script>
const D = __DATA__;
const $ = s => document.querySelector(s);
const TYPE = {unit:"유닛",atk:"공격 마법",def:"방어 마법",any:"공용 마법",hand:"핸드 마법",item:"아이템"};
let gradeOn = new Set();
function stash(k,v){try{localStorage.setItem("artboard."+k,v)}catch(e){}}
function grab(k){try{return localStorage.getItem("artboard."+k)||""}catch(e){return ""}}
for (const [id,f] of Object.entries(D.flags)) $("#fg").insertAdjacentHTML("beforeend",`<option value="${id}">${id} ${f.ko}</option>`);
["fg","ft","fs","q"].forEach(k=>{ $("#"+k).value = grab(k); $("#"+k).addEventListener("input",()=>{stash(k,$("#"+k).value);draw()}); });
function prog(){
  const by={}; for(const r of D.rows){ if(r.status==="빠진 카드")continue; const g=by[r.grade]=by[r.grade]||{n:0,a:0}; g.n++; if(r.image)g.a++; }
  $("#prog").innerHTML = D.order.filter(g=>by[g]).slice().reverse().map(g=>{const G=D.grades[g]||{};const b=by[g];
    return `<button class="chip${gradeOn.has(g)?" on":""}" style="--c:${G.color}" data-g="${g}">${G.ko} <b>${b.a}</b>/${b.n}</button>`}).join("");
  $("#prog").querySelectorAll(".chip").forEach(el=>el.onclick=()=>{const g=el.dataset.g; gradeOn.has(g)?gradeOn.delete(g):gradeOn.add(g); draw();});
  const all=D.rows.filter(r=>r.status!=="빠진 카드"); $("#sum").textContent = `그림 ${all.filter(r=>r.image).length} / ${all.length}장 · 프롬프트 ${D.ver} · ${D.made}`;
}
function rowsNow(){
  const fg=$("#fg").value, ft=$("#ft").value, fs=$("#fs").value, q=$("#q").value.trim().toLowerCase();
  const ord=g=>D.order.indexOf(g);
  return D.rows.filter(r=>r.status!=="빠진 카드" && (!gradeOn.size||gradeOn.has(r.grade)) && (!fg||r.group===fg) && (!ft||r.type===ft) && (!fs||r.status===fs)
    && (!q || r.card_id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)))
    .sort((a,b)=>ord(b.grade)-ord(a.grade) || a.group.localeCompare(b.group) || (+a.lv)-(+b.lv) || a.card_id.localeCompare(b.card_id));
}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function draw(){
  prog();
  const list=rowsNow();
  $("#grid").innerHTML = list.map(r=>{const G=D.grades[r.grade]||{}, F=D.flags[r.group]||{};
    const old = r.image && r.art_ver && r.art_ver!==r.prompt_ver ? `<span class="old">옛 프롬프트 ${esc(r.art_ver)}</span>` : "";
    const img = r.image ? `<img loading="lazy" src="../../${r.image}?t=${r.mt||0}" alt="">` : `<div class="ph">그림 없음<br>${esc(r.card_id)}.png</div>`;
    return `<div class="card" style="--gc:${G.color};--el:${F.hex||"#888"}"><div class="thumb" data-id="${esc(r.card_id)}">${img}${old}<span class="badge st-${esc(r.status)}">${esc(r.status)}</span></div>
    <div class="meta"><span class="nm">${esc(r.name)}</span><span class="sub"><span class="gr">${esc(G.ko||r.grade)}</span> · ${esc(r.group)} ${esc(F.ko||"")} · ${TYPE[r.type]||r.type} · Lv${esc(r.lv)}</span>
    <span class="sub">${esc(r.card_id)}${r.base?` · 원래 ${esc(r.base)}`:""}${r.note?` · ${esc(r.note)}`:""}</span>
    <div class="btns"><button class="b" data-copy="p" data-id="${esc(r.card_id)}">프롬프트 복사</button><button class="b" data-copy="f" data-id="${esc(r.card_id)}">파일 이름</button></div></div></div>`}).join("") || `<p style="color:var(--dim);padding:16px">맞는 카드가 없습니다.</p>`;
}
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("on");setTimeout(()=>el.classList.remove("on"),1400)}
async function copy(t){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove()}}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-copy]"); if(b){const id=b.dataset.id; if(b.dataset.copy==="p"){copy(D.prompts[id]||"");toast("프롬프트를 복사했습니다")}else{copy(id+".png");toast(id+".png")} return;}
  const t=e.target.closest(".thumb"); if(t){const r=D.rows.find(x=>x.card_id===t.dataset.id); const G=D.grades[r.grade]||{};
    $("#dlg").innerHTML=`<div class="dlg"><div>${r.image?`<img src="../../${r.image}?t=${r.mt||0}" alt="">`:`<div class="thumb" style="--el:#555"><div class="ph">그림 없음</div></div>`}
    <p class="sub">저장 이름 <b>${esc(r.card_id)}.png</b> · inbox에 넣고 <code>python tools/art/artmap.py import</code></p>
    <p class="sub">출처 ${esc(r.source_file||"-")} · ${esc(r.model||"")} ${esc(r.added||"")} · 그린 프롬프트 ${esc(r.art_ver||"모름")}</p></div>
    <div><div class="nm" style="font-size:17px">${esc(r.name)} <span class="gr" style="--gc:${G.color}">${esc(G.ko||"")}</span></div><span class="sub">${esc(r.card_id)}</span>
    <pre>${esc(D.prompts[r.card_id]||"")}</pre><div class="btns"><button class="b" data-copy="p" data-id="${esc(r.card_id)}">프롬프트 복사</button><button class="b" onclick="document.getElementById('dlg').close()">닫기</button></div></div></div>`;
    $("#dlg").showModal();}
});
$("#dlg").addEventListener("click",e=>{if(e.target.id==="dlg")$("#dlg").close()});
draw();
</script></body></html>
"""


def write_board(rows, jobs):
    S = STYLE_DATA
    out = []
    for r in rows.values():
        d = {k: r.get(k, "") for k in COLS}
        if d["image"]:
            try:
                d["mt"] = int((ROOT / d["image"]).stat().st_mtime)
            except OSError:
                d["mt"] = 0
        out.append(d)
    flags = {k: {"ko": v.get("ko", ""), "hex": S.get("elements", {}).get(v.get("element", ""), {}).get("hex", "#888")}
             for k, v in S.get("flags", {}).items()}
    grades = {k: {"ko": v.get("ko", ""), "color": v.get("color", "#888")} for k, v in S.get("grades", {}).items()}
    data = {"rows": out, "prompts": {j["id"]: j.get("prompt", "") for j in jobs}, "flags": flags, "grades": grades,
            "order": S.get("gradeOrder", []), "ver": S.get("version", ""), "made": time.strftime("%Y-%m-%d %H:%M")}
    js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    BOARD.write_text(BOARD_HTML.replace("__DATA__", js), encoding="utf-8")


STYLE_DATA = load_style()


def main():
    args = sys.argv[1:]
    model = ""
    if "--model" in args:
        i = args.index("--model")
        model = args[i + 1] if i + 1 < len(args) else ""
        del args[i:i + 2]
    dry = "--dry" in args
    args = [a for a in args if a != "--dry"]
    jobs = load_jobs()
    rows = refresh(load_map(), jobs)
    cmd = args[0] if args else ""
    if cmd == "index":   # v3.41 목록만 새로
        print(f"그림 목록 img/cards/art_index.js: {write_index()}장")
        return
    if cmd == "import":
        if Image is None and not shutil.which("sips"):
            print("※ Pillow가 없어 PNG만 그대로 복사합니다(자르기 · 크기 맞춤 없음). python -m pip install pillow")
        cmd_import(rows, jobs, model, dry)
    elif cmd == "assign":
        if len(args) < 3:
            sys.exit("사용법: python tools/art/artmap.py assign <파일> <카드ID>")
        cmd_assign(rows, jobs, args[1], args[2], model)
    elif cmd:
        sys.exit(__doc__)
    if dry:
        return
    rows = refresh(rows, jobs)
    save_map(rows)
    write_board(rows, jobs)
    write_index()
    live = [r for r in rows.values() if r["status"] != "빠진 카드"]
    have = sum(1 for r in live if r["image"])
    print(f"장부 {MAP.relative_to(ROOT)} · 보드 {BOARD.relative_to(ROOT)} — 그림 {have}/{len(live)}장")


if __name__ == "__main__":
    main()
