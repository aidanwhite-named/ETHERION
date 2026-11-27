/* ETHERION i18n — 번역할 카드 글 뽑기: node tools/i18n/cards_src.js → tools/i18n/cards_src.json
   게임에 쓰이는 모든 카드(CARDS 가운데 레거시 js/retired.js를 뺀 것 — 상점 카드 + 소환물 · 강화 카드)의 화면 글:
   n 이름 · t 마법 글(wording.js를 거친 화면 글) · f 서사 · k 종류(kin) · b 핸드 짧은 문구(SPELL_BRIEF) */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const { load } = require("../../server/rules.js");
function liveCards() {
  const R = load();
  const BR = vm.runInContext("typeof SPELL_BRIEF !== 'undefined' ? SPELL_BRIEF : {}", R.ctx);
  const RET = vm.runInContext("typeof RETIRED_CARDS !== 'undefined' ? RETIRED_CARDS : {}", R.ctx);
  const out = {};
  for (const c of Object.values(R.CARDS)) {
    if (!c || c.retired || RET[c.id]) continue;
    const e = { n: c.name };
    if (c.text) e.t = c.text;
    if (c.flavor) e.f = c.flavor;
    if (c.kin) e.k = c.kin;
    if (BR[c.id]) e.b = BR[c.id];
    e._g = c.group; e._type = c.type;
    out[c.id] = e;
  }
  return { R, out };
}
module.exports = { liveCards };
if (require.main === module) {
  const { out } = liveCards();
  fs.writeFileSync(path.join(__dirname, "cards_src.json"), JSON.stringify(out, null, 1));
  const n = Object.keys(out).length;
  const by = {}; for (const e of Object.values(out)) by[e._g] = (by[e._g] || 0) + 1;
  console.log(`카드 ${n}장`, by);
}
