/* ETHERION v3.50 — 기본 덱 · 정예 덱에서 레거시 카드(js/rebalance.js REBAL_LEGACY)를 바꾼다.
   node tools/balance4/pool_decks.js          바꿀 것만 보인다
   node tools/balance4/pool_decks.js --write  js/decks.js의 DECK_LISTS · HARD_DECK_LISTS를 고쳐 쓴다
   바꿀 카드: 같은 깃발 · 같은 종류(유닛) · 같은 등급, 레벨이 가장 가까운 카드(같으면 덱에 아직 적은 카드, 그다음 점수가 높은 카드). 덱 장수 제한 안에서. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "../.."), C = require("./load.js"), ev = s => vm.runInContext(s, C);
const LEG = ev("REBAL_LEGACY"), CARDS = ev("CARDS"), LIST = ev("CARD_LIST"), maxCopies = ev("maxCopiesOf"), gradeOf = ev("gradeOf");
const PLAN = {}; for (const o of JSON.parse(fs.readFileSync(path.join(__dirname, "regrade_plan.json"), "utf8"))) PLAN[o.id] = o;
const file = path.join(ROOT, "js/decks.js"); let src = fs.readFileSync(file, "utf8");
const hardAt = src.indexOf("const HARD_DECK_LISTS");
const log = [];
src = src.replace(/^  (B1|B2|B3|G1|G2|G3|A1|A2|A3): \{ name: "([^"]*)", cards: (\{[^}]*\})/gm, (m, g, name, json, off) => {
  const deck = JSON.parse(json), kind = off < hardAt ? "기본" : "정예";
  for (const id of Object.keys(deck)) {
    if (!LEG[id]) continue;
    const k = deck[id]; delete deck[id]; const c = CARDS[id], gr = gradeOf(id) === "common" || gradeOf(id) === "uncommon" ? (PLAN[id] ? PLAN[id].gr : gradeOf(id)) : gradeOf(id);
    for (let i = 0; i < k; i++) {
      const pool = LIST.filter(x => x.group === g && x.type === c.type && !x.base && !LEG[x.id] && gradeOf(x) === gr && (deck[x.id] || 0) < maxCopies(x.id));
      pool.sort((a, b) => Math.abs(a.lv - c.lv) - Math.abs(b.lv - c.lv) || (deck[a.id] || 0) - (deck[b.id] || 0) || ((PLAN[b.id] || {}).D2 || 0) - ((PLAN[a.id] || {}).D2 || 0) || (a.id < b.id ? -1 : 1));
      const r = pool[0]; if (!r) { log.push(`${kind} ${g}: ${id} 자리를 채울 카드 없음`); continue; }
      deck[r.id] = (deck[r.id] || 0) + 1; log.push(`${kind} ${g}: ${id} ${c.name}(L${c.lv}) → ${r.id} ${r.name}(L${r.lv})`);
    }
  }
  const n = Object.values(deck).reduce((a, b) => a + b, 0); if (n !== 40) log.push(`!! ${kind} ${g} ${n}장`);
  const sorted = {}; for (const id of Object.keys(deck).sort()) sorted[id] = deck[id];
  return `  ${g}: { name: "${name}", cards: ${JSON.stringify(sorted).replace(/":/g, '": ').replace(/,"/g, ', "')}`;
});
console.log(log.join("\n") || "바꿀 카드 없음");
if (process.argv.includes("--write")) { fs.writeFileSync(file, src); console.log("js/decks.js 씀"); }
