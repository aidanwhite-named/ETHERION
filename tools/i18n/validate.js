/* ETHERION i18n — 번역 일감 검사: node tools/i18n/validate.js tools/i18n/work/<일감>.<말>.json [...]
   ui_*: 모든 열쇠가 있고 비어 있지 않은지 · {0} 자리표시가 같은지 · 숫자가 같은지 · 한글이 남지 않았는지
   cards_*: 위에 더해 [키워드]가 용어집(js/i18n/glossary.js KW)의 그 말 이름인지 · 코인 표기(+1C×2) · ⚔⛨♥ · { } 수가 같은지 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..", "..");
const ctx = {}; vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js/i18n/glossary.js"), "utf8") + ";this.G=I18N_GLOSSARY", ctx);
const G = ctx.G, LI = { en: 0, ja: 1, zh: 2 };
const nums = s => (String(s).match(/\d+/g) || []).sort().join(",");
const coins = s => (String(s).match(/[+−-]\d+C(?:×\d+)?/g) || []).sort().join(",");
const sym = s => ["⚔", "⛨", "♥", "●", "→"].map(c => String(s).split(c).length - 1).join(",");
const ph = s => (String(s).match(/\{\d+\}/g) || []).sort().join(",");
function kwNames(lang) { return new Set(Object.values(G.KW).map(a => a[LI[lang]])); }
function checkKw(s, lang, bad, where) {
  const ok = kwNames(lang);
  for (const m of String(s).matchAll(/\[([^\[\]]+)\]/g)) {
    const base = m[1].replace(/\s*[+−\-]?\d.*$/, "").trim();
    if (!ok.has(base)) bad.push(`${where}: [${m[1]}] — 용어집에 없는 키워드 이름 "${base}"`);
  }
}
function validate(file) {
  const bn = path.basename(file), m = bn.match(/^(ui_\d+|cards_[A-Z0-9]+)\.(en|ja|zh)\.json$/);
  if (!m) { console.log(`${bn}: 이름이 <일감>.<en|ja|zh>.json 꼴이 아님`); return 1; }
  const [, job, lang] = m;
  const src = JSON.parse(fs.readFileSync(path.join(path.dirname(file), job + ".ko.json"), "utf8"));
  let out; try { out = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { console.log(`${bn}: JSON 오류 ${e.message}`); return 1; }
  const bad = [];
  const han = /[가-힣]/;
  if (job.startsWith("ui_")) {
    for (const k of Object.keys(src)) {
      const v = out[k];
      if (typeof v !== "string" || !v.trim()) { bad.push(`빠짐: ${k}`); continue; }
      if (han.test(v)) bad.push(`한글 남음: ${k} → ${v}`);
      if (ph(k) !== ph(v)) bad.push(`자리표시 다름: ${k} → ${v}`);
      if (nums(k.replace(/\{\d+\}/g, "")) !== nums(v.replace(/\{\d+\}/g, ""))) bad.push(`숫자 다름: ${k} → ${v}`);
    }
    for (const k of Object.keys(out)) if (!(k in src)) bad.push(`원문에 없는 열쇠: ${k}`);
  } else {
    for (const [id, e] of Object.entries(src)) {
      const o = out[id];
      if (!o) { bad.push(`빠진 카드: ${id}`); continue; }
      for (const f of ["n", "t", "f", "k", "b"]) {
        if (e[f] == null) continue;
        const v = o[f];
        if (typeof v !== "string" || !v.trim()) { bad.push(`${id}.${f} 빠짐`); continue; }
        if (han.test(v)) bad.push(`${id}.${f} 한글 남음: ${v}`);
        if (nums(e[f]) !== nums(v)) bad.push(`${id}.${f} 숫자 다름: [${nums(e[f])}] ≠ [${nums(v)}]  ${v}`);
        if (f === "t" || f === "b") {
          if (coins(e[f]) !== coins(v)) bad.push(`${id}.${f} 코인 표기 다름: ${coins(e[f])} ≠ ${coins(v)}`);
          if (sym(e[f]) !== sym(v)) bad.push(`${id}.${f} 기호(⚔⛨♥●→) 수 다름`);
          checkKw(v, lang, bad, `${id}.${f}`);
          const br = s => (String(s).match(/\[/g) || []).length;
          if (br(e[f]) !== br(v)) bad.push(`${id}.${f} [키워드] 수 다름 (${br(e[f])} ≠ ${br(v)})`);
        }
        if (f === "b") { const cb = s => (String(s).match(/\{/g) || []).length + "|" + (String(s).split("|").length); if (cb(e[f]) !== cb(v)) bad.push(`${id}.b {대상} 수 또는 | 줄 수 다름`); }
      }
    }
  }
  console.log(`${bn}: ${bad.length ? bad.length + "개 문제" : "통과"}`);
  for (const b of bad.slice(0, 80)) console.log("  - " + b);
  if (bad.length > 80) console.log(`  … 그 밖에 ${bad.length - 80}개`);
  return bad.length ? 1 : 0;
}
let fail = 0;
for (const f of process.argv.slice(2)) fail |= validate(f);
process.exit(fail);
