/* ETHERION i18n — 번역 일감 나누기: node tools/i18n/prep.js
   tools/i18n/ui_keys.json(extract.js) · cards_src.json(cards_src.js)을 tools/i18n/work/ 에 나눠 쓴다.
   - ui_<n>.ko.json : { "한국어": "" } — 아직 어느 말에도 번역이 없는 열쇠만(이미 js/i18n/ui.<말>.js에 있는 것은 뺀다)
   - cards_<깃발>.ko.json : { 카드ID: { n, t, f, k, b, _type } } — 아직 번역이 없는 카드만 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..", ".."), W = path.join(__dirname, "work");
fs.mkdirSync(W, { recursive: true });
const loadJs = (f, name) => { const p = path.join(ROOT, f); if (!fs.existsSync(p)) return {}; const ctx = {}; vm.runInNewContext(fs.readFileSync(p, "utf8") + `;this.__=${name}`, ctx); return ctx.__; };
const have = { ui: {}, cards: {} };
for (const l of ["en", "ja", "zh"]) { have.ui[l] = loadJs(`js/i18n/ui.${l}.js`, "I18N_UI"); have.cards[l] = loadJs(`js/i18n/cards.${l}.js`, "I18N_CARDS"); }
const G = loadJs("js/i18n/glossary.js", "I18N_GLOSSARY");
const keys = require("./ui_keys.json").filter(x => !(x.k in G.TERM) && !(x.k in G.KW) && !["en", "ja", "zh"].every(l => have.ui[l][x.k]));
const N = +(process.argv[2] || 5), total = keys.reduce((s, x) => s + x.k.length, 0);
let chunk = 1, acc = 0, cur = {};
for (const x of keys) {
  cur[x.k] = "";
  acc += x.k.length;
  if (acc > total / N * chunk && chunk < N) { fs.writeFileSync(path.join(W, `ui_${chunk}.ko.json`), JSON.stringify(cur, null, 1)); chunk++; cur = {}; }
}
fs.writeFileSync(path.join(W, `ui_${chunk}.ko.json`), JSON.stringify(cur, null, 1));
const src = require("./cards_src.json"), byG = {};
for (const [id, e] of Object.entries(src)) {
  if (["en", "ja", "zh"].every(l => have.cards[l][id])) continue;
  const { _g, ...rest } = e; (byG[_g] = byG[_g] || {})[id] = rest;
}
for (const [g, o] of Object.entries(byG)) fs.writeFileSync(path.join(W, `cards_${g}.ko.json`), JSON.stringify(o, null, 1));
console.log(`화면 글 ${keys.length}개 → ui_1..${chunk}`, Object.fromEntries(Object.entries(byG).map(([g, o]) => [g, Object.keys(o).length])));
