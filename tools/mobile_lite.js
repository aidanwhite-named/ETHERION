/* ETHERION — 폰 · 앱 가볍게 (v3.46): css/mobile-lite.css 를 만든다.
   실행:  node tools/mobile_lite.js        (CSS를 고친 뒤 다시 돌린다 — 손으로 고치지 않는다)

   index.html이 읽는 CSS를 차례대로 읽어, 폰 · 앱(<html class="mobile">)에서만 쓰는 덮어쓰기 규칙을 만든다.
   1) 크게 번지는 그림자: box-shadow · text-shadow · filter: drop-shadow 의 번짐(blur)을 BLUR_MAX 이하로.
      그림자를 쓰는 규칙은 크기와 상관없이 모두 옮겨 적는다(값만 줄여서) — 원래 CSS의 우선순위 · 차례가 그대로 지켜진다.
   2) 흐림 유리(backdrop-filter)는 모두 끈다.
   3) 끝없이 도는 애니메이션 가운데 그림자 · 필터 · 배경 위치를 움직이는 것(다시 칠해야 하는 것)은 멈추고,
      가장 밝은 장면의 그림자를 줄여서 멈춘 채로 보여 준다(준비 · 놓을 수 있는 칸 같은 표시는 남는다).
   4) 카드 위를 계속 지나가는 반짝임(전설 foil · 강화 upFoil)은 멈춘다.
   transform · opacity만 움직이는 가벼운 애니메이션(코인 돌기 · 고리 회전 따위)은 그대로 둔다. */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "css", "mobile-lite.css");
const BLUR_MAX = 6, DROP_MAX = 3, TEXT_MAX = 4;
const STOP_ALWAYS = new Set(["foil", "upFoil"]);   // 카드 반짝임
const HEAVY_PROP = /shadow|filter|background|blur|mask/;

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const files = [...html.matchAll(/href="css\/([\w-]+\.css)[^"]*"/g)].map(m => m[1]).filter(f => f !== "mobile-lite.css");

/* ---------- 아주 작은 CSS 읽개 ---------- */
function strip(s) { return s.replace(/\/\*[\s\S]*?\*\//g, ""); }
function parse(s) {   // → [{sel, body} | {at, kids} | {kf, name, body}]
  const out = []; let i = 0;
  while (i < s.length) {
    const open = s.indexOf("{", i); if (open < 0) break;
    const head = s.slice(i, open).trim();
    let d = 1, j = open + 1;
    while (j < s.length && d) { const ch = s[j]; if (ch === "{") d++; else if (ch === "}") d--; else if (ch === '"' || ch === "'") { j = s.indexOf(ch, j + 1); } j++; }
    const body = s.slice(open + 1, j - 1);
    const h = head.replace(/^[;\s]+/, "");
    if (/^@(-webkit-)?keyframes/.test(h)) out.push({ kf: true, name: h.split(/\s+/)[1], body });
    else if (/^@(media|supports|layer|container)/.test(h)) out.push({ at: h, kids: parse(body) });
    else if (h.startsWith("@")) { /* font-face, import … */ }
    else out.push({ sel: h, body });
    i = j;
  }
  return out;
}
function splitTop(s, sep) {   // 괄호 밖의 sep로 자르기
  const out = []; let d = 0, cur = "";
  for (const ch of s) { if (ch === "(") d++; else if (ch === ")") d--; if (ch === sep && !d) { out.push(cur); cur = ""; } else cur += ch; }
  if (cur.trim()) out.push(cur);
  return out;
}
function decls(body) { return splitTop(body, ";").map(x => { const k = x.indexOf(":"); return k < 0 ? null : { p: x.slice(0, k).trim().toLowerCase(), v: x.slice(k + 1).trim() }; }).filter(Boolean); }

/* ---------- 값 줄이기 ---------- */
const PX = t => { const m = /^(-?[\d.]+)(px|em|rem)?$/.exec(t); return m ? (+m[1]) * (m[2] === "em" || m[2] === "rem" ? 16 : 1) : null; };
function capLen(t, max) { const v = PX(t); return v == null || v <= max ? t : max + "px"; }
/* 그림자 하나의 토큰들: 셋째 길이(번짐)가 max보다 크면 번짐을 max로, 앞의 두 길이(어긋남)도 같은 비율로 줄인다 */
function capShadowToks(toks, max) {
  const lens = toks.map((t, i) => PX(t) != null ? i : -1).filter(i => i >= 0);
  if (lens.length < 3) return toks.join(" ");
  const b = PX(toks[lens[2]]); if (b <= max) return toks.join(" ");
  const k = max / b, out = toks.slice();
  out[lens[2]] = max + "px";
  for (const i of lens.slice(0, 2)) { const v = PX(toks[i]); if (v) out[i] = (Math.round(v * k * 10) / 10) + "px"; }
  return out.join(" ");
}
function shadowList(v, max) {   // box-shadow · text-shadow
  const imp = /!important\s*$/.test(v); v = v.replace(/!important\s*$/, "").trim();
  if (/^(none|inherit|initial|unset)$/.test(v) || /var\(/.test(v)) return null;
  const parts = splitTop(v, ",").map(sh => {
    const toks = []; let d = 0, cur = "";
    for (const ch of sh.trim()) { if (ch === "(") d++; if (ch === ")") d--; if (ch === " " && !d) { if (cur) toks.push(cur); cur = ""; } else cur += ch; }
    if (cur) toks.push(cur);
    return capShadowToks(toks, max);
  });
  return parts.join(", ") + (imp ? " !important" : "");
}
function filterVal(v) {
  const imp = /!important\s*$/.test(v); v = v.replace(/!important\s*$/, "").trim();
  if (/var\(/.test(v)) return null;
  const out = v.replace(/drop-shadow\(([^()]*(?:\([^()]*\))?[^()]*)\)/g, (m, inner) => {
    return "drop-shadow(" + capShadowToks(inner.trim().split(/\s+(?![^(]*\))/), DROP_MAX) + ")";
  });
  return out + (imp ? " !important" : "");
}

/* ---------- 키프레임: 무거운가, 가장 밝은 장면 ---------- */
const KF = {};
const all = files.map(f => ({ f, tree: parse(strip(fs.readFileSync(path.join(ROOT, "css", f), "utf8"))) }));
(function walk(list) { for (const n of list) { if (n.kf) KF[n.name] = n.body; else if (n.kids) walk(n.kids); } })(all.flatMap(x => x.tree));
function kfInfo(name) {
  const body = KF[name]; if (!body) return null;
  const frames = parse(body).filter(x => x.sel).map(x => decls(x.body));
  const props = new Set(frames.flat().map(d => d.p));
  const heavy = [...props].some(p => HEAVY_PROP.test(p));
  /* 가장 밝은 장면 = 그림자 · 필터 글자가 가장 긴 장면 */
  let best = null, score = -1;
  for (const fr of frames) { const s = fr.filter(d => /shadow|filter/.test(d.p)).map(d => d.v).join("").length; if (s > score) { score = s; best = fr; } }
  return { heavy, best: (best || []).filter(d => /shadow|filter/.test(d.p)) };
}
const INF = new Set();   // 어디선가 infinite로 도는 이름
const HEAVY_KF = k => { const i = kfInfo(k); return !!(i && i.heavy); };
const ANIM_WORDS = /^(infinite|linear|ease|ease-in|ease-out|ease-in-out|alternate|alternate-reverse|reverse|normal|both|forwards|backwards|none|paused|running|step-start|step-end|initial|inherit)$/;
function animNames(v) { return splitTop(v, ",").map(a => a.trim().split(/\s+/).find(t => /^-?[a-zA-Z_][\w-]*$/.test(t) && !ANIM_WORDS.test(t))).filter(Boolean); }

/* ---------- html.mobile 붙이기 ---------- */
function mob(sel) {
  return splitTop(sel, ",").map(s => {
    s = s.trim();
    if (/^html\b/.test(s)) return s.replace(/^html/, "html.mobile");
    if (/^:root\b/.test(s)) return s.replace(/^:root/, "html.mobile");
    return "html.mobile " + s;
  }).join(", ");
}

/* ---------- 만들기 ---------- */
(function walk(list) { for (const n of list) { if (n.kids) walk(n.kids); else if (n.sel) for (const d of decls(n.body)) if (d.p === "animation") for (const part of splitTop(d.v, ",")) if (/\binfinite\b/.test(part)) { const k = animNames(part)[0]; if (k) INF.add(k); } } })(all.flatMap(x => x.tree));
let nRules = 0, nCap = 0, nStop = 0;
const stopped = new Set();
function emit(list) {
  const out = [];
  for (const n of list) {
    if (n.kids) { const inner = emit(n.kids); if (inner.length) out.push(`${n.at} {\n${inner.join("\n")}\n}`); continue; }
    if (!n.sel) continue;
    const ds = decls(n.body), add = [];
    for (const d of ds) {
      if (d.p === "box-shadow") { const v = shadowList(d.v, BLUR_MAX); if (v) { add.push(`box-shadow: ${v}`); if (v !== d.v) nCap++; } }
      else if (d.p === "text-shadow") { const v = shadowList(d.v, TEXT_MAX); if (v) { add.push(`text-shadow: ${v}`); if (v !== d.v) nCap++; } }
      else if (d.p === "filter" || d.p === "-webkit-filter") { if (/drop-shadow/.test(d.v)) { const v = filterVal(d.v); if (v) { add.push(`${d.p}: ${v}`); if (v !== d.v) nCap++; } } }
      else if (d.p === "backdrop-filter" || d.p === "-webkit-backdrop-filter") { if (!/^none/.test(d.v)) add.push(`${d.p}: none`); }
      else if (d.p === "animation" || d.p === "animation-name") {
        /* 끝없이 도는 무거운 이름만 none으로 바꾼 animation-name을 옮겨 적는다. 다른 이름 · 차례는 그대로(등장 연출은 남음).
           none이 든 덮어쓰기(nopulse.css 같은 것)도 옮겨 적어 원래의 차례를 지킨다 */
        const parts = splitTop(d.v.replace(/!important\s*$/, ""), ",").map(x => x.trim());
        const names = parts.map(part => d.p === "animation-name" ? part : (part === "none" ? "none" : animNames(part)[0] || "none"));
        const inf = parts.map(part => d.p === "animation" ? /\binfinite\b/.test(part) : INF.has(part));
        const repl = names.map((k, i) => STOP_ALWAYS.has(k) || (inf[i] && HEAVY_KF(k)) ? "none" : k);
        const changed = repl.some((k, i) => k !== names[i]);
        if (changed || names.includes("none")) {
          add.push(`animation-name: ${repl.join(", ")}${/!important\s*$/.test(d.v) ? " !important" : ""}`);
          if (changed) { names.forEach((k, i) => { if (repl[i] !== k) stopped.add(k); }); nStop++; }
        }
      }
    }
    if (add.length) { nRules++; out.push(`${mob(n.sel)} { ${add.join("; ")}; }`); }
  }
  return out;
}
const chunks = [];
for (const { f, tree } of all) { const r = emit(tree); if (r.length) chunks.push(`/* ${f} */\n` + r.join("\n")); }
const head = `/* ETHERION — 폰 · 앱 가볍게 (v3.46). 손으로 고치지 말 것: node tools/mobile_lite.js 가 index.html의 CSS에서 만든다.
   폰 · 앱(<html class="mobile">)에서만: 그림자 번짐 ${BLUR_MAX}px(글자 ${TEXT_MAX}px · drop-shadow ${DROP_MAX}px)까지 · 흐림 유리 없음 ·
   그림자 · 필터를 끝없이 움직이던 애니메이션과 카드 반짝임 멈춤(${[...stopped].sort().join(" · ")}). PC는 그대로. */\n`;
fs.writeFileSync(OUT, head + chunks.join("\n\n") + "\n");
console.log(`css/mobile-lite.css: 규칙 ${nRules}개 (번짐 줄임 ${nCap} · 멈춘 애니메이션 ${nStop}곳), ${(fs.statSync(OUT).size / 1024).toFixed(1)} KB`);
