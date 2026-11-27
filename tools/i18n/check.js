/* ETHERION i18n — 번역 검사: node tools/i18n/check.js [en|ja|zh] [-v]
   ① 카드: 게임에 쓰이는 모든 카드(레거시 js/retired.js 제외, 소환물 · 강화 카드 포함)가 말마다 번역이 있는지,
      한국어에 있는 칸(이름 · 마법 글 · 서사 · 종류 · 핸드 짧은 문구)이 다 있는지, 숫자 · 코인 표기 · ⚔⛨♥ · [키워드] 수가 한국어와 같은지,
      [키워드] 이름이 용어집에 있는지, 한글이 남지 않았는지, 한국어 원문이 번역 뒤에 바뀌지 않았는지(지문 h).
   ② 화면 글: tools/i18n/ui_keys.json(extract.js)의 열쇠가 사전에 얼마나 있는지, 자리표시 · 숫자가 맞는지.
   카드 문제가 하나라도 있으면 끝 코드 1. 화면 글은 덮은 비율만 알린다(못 찾은 글은 한국어로 나온다). */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..", "..");
const { liveCards } = require("./cards_src.js");
const { hashOf } = require("./hash.js");
const loadJs = (f, name) => { const p = path.join(ROOT, f); if (!fs.existsSync(p)) return null; const ctx = {}; vm.runInNewContext(fs.readFileSync(p, "utf8") + `;this.__=${name}`, ctx); return ctx.__; };
const G = loadJs("js/i18n/glossary.js", "I18N_GLOSSARY"), LI = { en: 0, ja: 1, zh: 2 };
const args = process.argv.slice(2), verbose = args.includes("-v");
const langs = args.filter(a => LI[a] != null); if (!langs.length) langs.push("en", "ja", "zh");
const nums = s => (String(s).match(/\d+/g) || []).sort().join(",");
const coins = s => (String(s).match(/[+−-]\d+C(?:×\d+)?/g) || []).sort().join(",");
const sym = s => ["⚔", "⛨", "♥"].map(c => String(s).split(c).length - 1).join(",");
const cnt = (s, re) => (String(s).match(re) || []).length;
const han = /[가-힣]/;
const { out: live } = liveCards();
const keys = require("./ui_keys.json"), PARTICLE_OK = "∅";
let fail = 0;
for (const l of langs) {
  const C = loadJs(`js/i18n/cards.${l}.js`, "I18N_CARDS") || {}, U = loadJs(`js/i18n/ui.${l}.js`, "I18N_UI") || {};
  const kwOk = new Set(Object.values(G.KW).map(a => a[LI[l]]));
  const bad = [], stale = [];
  for (const [id, e] of Object.entries(live)) {
    const t = C[id];
    if (!t) { bad.push(`${id} 번역 없음 (${e.n})`); continue; }
    if (t.h && t.h !== hashOf(e)) stale.push(`${id} ${e.n}`);
    for (const f of ["n", "t", "f", "k", "b"]) {
      if (e[f] == null) continue;
      const v = t[f];
      if (typeof v !== "string" || !v.trim()) { bad.push(`${id}.${f} 없음`); continue; }
      if (han.test(v)) bad.push(`${id}.${f} 한글이 남음`);
      if (nums(e[f]) !== nums(v)) bad.push(`${id}.${f} 숫자 다름 — 한국어 [${nums(e[f])}] · 번역 [${nums(v)}]`);
      if (f === "t" || f === "b") {
        if (coins(e[f]) !== coins(v)) bad.push(`${id}.${f} 코인 표기 다름`);
        if (sym(e[f]) !== sym(v)) bad.push(`${id}.${f} ⚔⛨♥ 수 다름`);
        if (cnt(e[f], /\[/g) !== cnt(v, /\[/g)) bad.push(`${id}.${f} [키워드] 수 다름`);
        for (const m of v.matchAll(/\[([^\[\]]+)\]/g)) { const b = m[1].replace(/\s*[+−\-]?\d.*$/, "").trim(); if (!kwOk.has(b)) bad.push(`${id}.${f} 용어집에 없는 키워드 [${m[1]}]`); }
      }
      if (f === "b" && (cnt(e.b, /\{/g) !== cnt(v, /\{/g) || e.b.split("|").length !== v.split("|").length)) bad.push(`${id}.b {대상} · | 줄 수 다름`);
    }
  }
  const extra = Object.keys(C).filter(id => !live[id]);
  // 화면 글
  let have = 0, uBad = [];
  for (const { k } of keys) {
    const v = U[k] != null && (U[k] || PARTICLE_OK) || G.TERM[k] && G.TERM[k][LI[l]] || G.KW[k] && G.KW[k][LI[l]];
    if (!v) continue;
    have++;
    const ph = s => (s.match(/\{\d+\}/g) || []).sort().join(",");
    if (ph(k) !== ph(v)) uBad.push(`자리표시 다름: ${k} → ${v}`);
    if (nums(k.replace(/\{\d+\}/g, "")) !== nums(v.replace(/\{\d+\}/g, ""))) uBad.push(`숫자 다름: ${k} → ${v}`);
    if (han.test(v)) uBad.push(`한글이 남음: ${k} → ${v}`);
  }
  const nLive = Object.keys(live).length, nOk = nLive - new Set(bad.map(b => b.split(/[ .]/)[0])).size;
  console.log(`[${l}] 카드 ${nOk}/${nLive}장 이상 없음 · 문제 ${bad.length}개 · 원문이 바뀐 카드 ${stale.length}장 · 쓰지 않는 번역 ${extra.length}장`);
  console.log(`[${l}] 화면 글 ${have}/${keys.length}개 (${(have / keys.length * 100).toFixed(1)}%) · 사전 문제 ${uBad.length}개`);
  for (const b of bad.slice(0, verbose ? 1e9 : 25)) console.log("   - " + b);
  if (!verbose && bad.length > 25) console.log(`   … ${bad.length - 25}개 더 (-v)`);
  for (const s of stale.slice(0, verbose ? 1e9 : 10)) console.log("   ~ 원문 바뀜: " + s);
  for (const b of uBad.slice(0, verbose ? 1e9 : 10)) console.log("   · " + b);
  if (bad.length) fail = 1;
}
process.exit(fail);
