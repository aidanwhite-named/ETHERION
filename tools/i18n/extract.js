/* ETHERION i18n — 화면 글 뽑기: node tools/i18n/extract.js
   js/*.js · server/*.js의 문자열 · 템플릿 글에서 한글이 든 조각을 뽑아 tools/i18n/ui_keys.json에 쓴다.
   - 템플릿의 ${...}는 {0} {1} …로 바뀐다(번역 사전의 자리표시). HTML 태그에서 끊는다(화면의 글 마디 하나 = 열쇠 하나).
   - 카드 데이터(이름 · 서사 · 마법 글)는 카드 ID 번역 파일(js/i18n/cards.<말>.js)이 맡으니 여기서 빼고,
     소설 · 세계관 글(연대기 · 카일란 · 순례 대사)은 한국어로만 두므로 뺀다(SKIP). */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const SKIP = new Set([
  // 카드 데이터 — 카드 번역 파일이 맡는다
  "data.js", "names.js", "retired.js", "lore.js", "kinds.js", "briefs.js", "specials.js", "uniques.js", "highcards.js", "pincards.js",
  "rarespells.js", "counterspells.js", "upgrades.js", "rebalance.js", "abyss.js", "gnome.js", "orc.js", "mermaid.js", "rares.js", "elf.js",
  "goblin.js", "newabil.js", "troll.js", "celestial.js", "itemtune.js", "itemrework.js", "spelltune.js", "decks.js", "wording.js", "statguide.js",
  // 소설 · 세계관 글 — 한국어로만
  "chronicle.js", "kailan.js", "pilgrimtext.js",
  // 번역 자체
  "i18n.js"
]);
const HANGUL = /[가-힣]/;

/* 아주 작은 JS 낱말 읽개: 주석을 건너뛰고 문자열 · 템플릿(안의 ${} 중첩 포함)을 꺼낸다 */
function scan(src) {
  const out = [];
  let i = 0;
  const n = src.length;
  function readStr(q) { let s = ""; i++; while (i < n && src[i] !== q) { if (src[i] === "\\") { s += src[i] + src[i + 1]; i += 2; continue; } if (src[i] === "\n") break; s += src[i++]; } i++; return s; }
  function readTpl() {   // i는 ` 위. 반환: quasi 배열
    const quasi = [""]; i++;
    while (i < n && src[i] !== "`") {
      if (src[i] === "\\") { quasi[quasi.length - 1] += src[i] + src[i + 1]; i += 2; continue; }
      if (src[i] === "$" && src[i + 1] === "{") { i += 2; skipExpr(); quasi.push(""); continue; }
      quasi[quasi.length - 1] += src[i++];
    }
    i++; return quasi;
  }
  function skipExpr() {   // ${ 안: } 까지, 안의 문자열 · 템플릿도 뽑는다
    let depth = 0;
    while (i < n) {
      const c = src[i];
      if (c === "}" && depth === 0) { i++; return; }
      if (c === "{") { depth++; i++; continue; }
      if (c === "}") { depth--; i++; continue; }
      if (c === '"' || c === "'") { out.push({ s: readStr(c) }); continue; }
      if (c === "`") { out.push({ q: readTpl() }); continue; }
      if (c === "/" && src[i + 1] === "/") { while (i < n && src[i] !== "\n") i++; continue; }
      if (c === "/" && src[i + 1] === "*") { i = src.indexOf("*/", i + 2) + 2; continue; }
      i++;
    }
  }
  let prev = "";
  while (i < n) {
    const c = src[i];
    if (c === "/" && src[i + 1] === "/") { while (i < n && src[i] !== "\n") i++; continue; }
    if (c === "/" && src[i + 1] === "*") { const e = src.indexOf("*/", i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === '"' || c === "'") { out.push({ s: readStr(c) }); prev = "s"; continue; }
    if (c === "`") { out.push({ q: readTpl() }); prev = "s"; continue; }
    if (c === "/" && /[(,=:[!&|?{};]\s*$/.test(src.slice(Math.max(0, i - 30), i))) {   // 정규식 글자는 건너뛴다
      i++; let cls = false;
      while (i < n) { const d = src[i]; if (d === "\\") { i += 2; continue; } if (d === "[") cls = true; else if (d === "]") cls = false; else if (d === "/" && !cls) break; else if (d === "\n") break; i++; }
      i++; continue;
    }
    i++;
  }
  return out;
}
const unesc = s => s.replace(/\\n/g, "\n").replace(/\\(["'`\\$])/g, "$1").replace(/\\u([0-9a-fA-F]{4})/g, (m, h) => String.fromCharCode(parseInt(h, 16)));
/* 한 글 → 화면 마디들: 태그에서 끊고, 줄바꿈에서 끊고, 앞뒤 공백을 깎는다 */
function pieces(s) {
  const res = [];
  for (const seg of s.split(/<[^>]*>/)) for (const line of seg.split("\n")) {
    const t = line.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
    if (HANGUL.test(t)) res.push(t);
  }
  return res;
}
function attrs(s) {   // data-tip="…" 같은 속성 안 글
  const res = [];
  for (const m of s.matchAll(/(?:data-tip|title|placeholder|aria-label|alt)="([^"]*)"/g)) for (const p of pieces(m[1])) res.push(p);
  return res;
}
/* "{n}" · "{S}" 같은 이름 자리표시(뒤에 replace로 채우는 글)도 {0} {1} …로 */
function named(p) { let j = 0; const map = {}; return /\{[A-Za-z]\w*\}/.test(p) ? p.replace(/\{([A-Za-z]\w*)\}/g, (m, d) => "{" + (map[d] ??= j++) + "}") : p; }
function keysOf(item) {
  if (item.s != null) { const s = unesc(item.s); return HANGUL.test(s) ? pieces(s).concat(attrs(s)).map(named) : []; }
  let k = 0; const joined = item.q.map(unesc).reduce((a, b) => a + "{" + (k++) + "}" + b);
  if (!HANGUL.test(joined)) return [];
  // 자리표시 번호는 마디마다 0부터 다시 센다
  return pieces(joined).concat(attrs(joined)).map(p => { let j = 0; const map = {}; return p.replace(/\{(\d+)\}/g, (m, d) => "{" + (map[d] ??= j++) + "}"); });
}
const files = [
  ...fs.readdirSync(path.join(ROOT, "js")).filter(f => f.endsWith(".js") && !SKIP.has(f)).map(f => "js/" + f),
  ...["server/server.js", "server/rooms.js", "server/auth.js", "server/billing.js", "server/rules.js", "server/replay.js"].filter(f => fs.existsSync(path.join(ROOT, f)))
];
const keys = new Map();
for (const f of files) {
  const src = fs.readFileSync(path.join(ROOT, f), "utf8");
  for (const it of scan(src)) for (const k of keysOf(it)) {
    if (/^[\s\d{}·,.:;!?()\-+−×/%~…'"]*$/.test(k.replace(/[가-힣]/g, "")) && k.length > 400) continue;
    if (!keys.has(k)) keys.set(k, new Set());
    keys.get(k).add(f);
  }
}
/* 데이터 파일의 화면 글(깃발 · 진영 소개, 종류 이름) — 규칙 묶음을 읽어 꺼낸다 */
{
  const { load } = require("../../server/rules.js");
  const R = load(), vm = require("vm");
  const add = (k, f) => { if (!k || !HANGUL.test(k)) return; for (const p of pieces(k)) { if (!keys.has(p)) keys.set(p, new Set()); keys.get(p).add(f); } };
  for (const g of Object.values(R.GROUPS)) for (const f of ["name", "short", "role", "ai", "motto", "blurb"]) add(g[f], "data:GROUPS");
  for (const g of Object.values(R.FACTIONS)) for (const f of ["name", "motto"]) add(g[f], "data:FACTIONS");
  for (const t of Object.values(vm.runInContext("TYPES", R.ctx))) add(t.name, "data:TYPES");
  for (const t of Object.values(vm.runInContext("ELEMENTS", R.ctx))) add(t.name, "data:ELEMENTS");
  for (const t of Object.values(vm.runInContext("GRADES", R.ctx))) add(t.name, "data:GRADES");
  try { for (const d of Object.values(vm.runInContext("STARTER_DECKS", R.ctx))) add(d && d.name, "data:DECKS"); } catch (e) {}
  /* 능력 · 키워드 뜻(여러 데이터 파일이 더한다) — 게임이 읽은 뒤의 글(wording.js 명사형)과 원래 글 모두 */
  const named2 = t => { let j = 0; const map = {}; return t.replace(/\{([A-Za-z]\w*)\}/g, (m, d) => "{" + (map[d] ??= j++) + "}"); };
  for (const n of ["ITEM_KW", "ITEM_KW_SHORT", "SPELL_KW", "ITEM_KW_GEN", "WHEN_TIP", "CLASS_INFO", "RITE_TIP", "PIN_TIP"]) {
    let o = null; try { o = vm.runInContext(`typeof ${n} !== "undefined" ? ${n} : null`, R.ctx); } catch (e) {}
    if (o) for (const v of Object.values(o)) if (typeof v === "string") add(named2(v), "data:" + n);
  }
  for (const n of ["UNIQUE_ABIL", "RARE_AURA"]) {
    let o = null; try { o = vm.runInContext(`typeof ${n} !== "undefined" ? ${n} : null`, R.ctx); } catch (e) {}
    if (o) for (const v of Object.values(o)) for (const f of ["text", "name", "short", "tip"]) if (v && typeof v[f] === "string") add(named2(v[f]), "data:" + n);
  }
  for (const c of Object.values(R.CARDS)) for (const o of [c.item, c.gift]) if (o && typeof o.evText === "string") add(named2(o.evText), "data:evText");
}
/* index.html의 고정 글 */
{
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8").replace(/<!--[\s\S]*?-->/g, "").replace(/<script[\s\S]*?<\/script>/g, "");
  for (const k of pieces(html).concat(attrs(html))) { if (!keys.has(k)) keys.set(k, new Set()); keys.get(k).add("index.html"); }
}
const list = [...keys].map(([k, f]) => ({ k, f: [...f] })).sort((a, b) => a.f[0].localeCompare(b.f[0]) || a.k.localeCompare(b.k));
fs.writeFileSync(path.join(__dirname, "ui_keys.json"), JSON.stringify(list, null, 0).replace(/\},\{/g, "},\n{"));
const byFile = {}; for (const x of list) byFile[x.f[0]] = (byFile[x.f[0]] || 0) + 1;
console.log(`열쇠 ${list.length}개 · 글자 ${list.reduce((s, x) => s + x.k.length, 0)}`);
if (process.argv.includes("-v")) console.log(byFile);
