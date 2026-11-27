/* ETHERION i18n — 번역 일감 합치기: node tools/i18n/build.js
   tools/i18n/work/ui_*.<말>.json · cards_*.<말>.json 을 js/i18n/ui.<말>.js · cards.<말>.js 에 더한다(있던 번역 위에 덮어씀).
   카드에는 한국어 원문의 짧은 지문(h)을 함께 적어 둔다 — 원문이 바뀌면 check.js가 "다시 번역할 카드"로 알린다. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..", ".."), W = path.join(__dirname, "work");
const loadJs = (f, name) => { const p = path.join(ROOT, f); if (!fs.existsSync(p)) return {}; const ctx = {}; vm.runInNewContext(fs.readFileSync(p, "utf8") + `;this.__=${name}`, ctx); return ctx.__; };
const { hashOf } = require("./hash.js");
const src = require("./cards_src.json");
const nounEnd = vm.runInContext("WORDING.nounEnd", require("../../server/rules.js").load().ctx);
const files = fs.existsSync(W) ? fs.readdirSync(W) : [];
/* 태그 사이에 홀로 남은 조사 조각(<b>3장</b>을 → "을")은 번역에서 없앤다 */
const PARTICLE = /^[\s(]*(?:을|를|이|가|은|는|의|에|에게|로|으로|와|과|도|만|이\(가\)|을\(를\)|은\(는\)|와\(과\)|\(으\)로)[\s)]*[.,]?$/;
const NAMES = { en: "English", ja: "日本語", zh: "简体中文" };
for (const l of ["en", "ja", "zh"]) {
  const ui = loadJs(`js/i18n/ui.${l}.js`, "I18N_UI"), cards = loadJs(`js/i18n/cards.${l}.js`, "I18N_CARDS");
  let nu = 0, nc = 0;
  for (const f of files.filter(f => f.startsWith("ui_") && f.endsWith(`.${l}.json`))) { const o = JSON.parse(fs.readFileSync(path.join(W, f), "utf8")); for (const [k, v] of Object.entries(o)) if (v) { ui[k] = PARTICLE.test(k) ? (k.match(/[.,]$/) || [""])[0] : v; nu++; } }
  for (const f of files.filter(f => f.startsWith("cards_") && f.endsWith(`.${l}.json`))) { const o = JSON.parse(fs.readFileSync(path.join(W, f), "utf8")); for (const [id, e] of Object.entries(o)) { const s = src[id]; cards[id] = { ...e, h: s ? hashOf(s) : "" }; nc++; } }
  { const X = require("./extra.json"), li = { en: 0, ja: 1, zh: 2 }[l]; for (const [k, v] of Object.entries(X)) if (k !== "_" && v[li]) ui[k] = v[li]; }
  /* 능력 · 마법 글은 게임이 읽을 때 문장 끝을 명사형으로 바꾼다(js/wording.js nounEnd: 깎는다 → 깎음). 그 꼴도 같은 번역으로 */
  for (const k of Object.keys(ui)) { const k2 = nounEnd(k); if (k2 !== k && ui[k2] == null && !/[습합됩입]님/.test(k2)) ui[k2] = ui[k]; }
  const order = require("./ui_keys.json").map(x => x.k), pos = new Map(order.map((k, i) => [k, i]));
  const uk = Object.keys(ui).sort((a, b) => (pos.has(a) ? pos.get(a) : 1e9) - (pos.has(b) ? pos.get(b) : 1e9) || a.localeCompare(b));
  fs.writeFileSync(path.join(ROOT, `js/i18n/ui.${l}.js`),
    `/* ETHERION 화면 글 번역 — ${NAMES[l]} (js/i18n.js가 읽는다). { "한국어 화면 글": "번역" }, {0} {1} … = 끼우는 자리.\n   새 글은 node tools/i18n/extract.js → prep.js → 번역 → build.js (AGENTS.md "다국어"). */\n"use strict";\nconst I18N_UI = {\n` +
    uk.map(k => `${JSON.stringify(k)}: ${JSON.stringify(ui[k])}`).join(",\n") + "\n};\n");
  const ck = Object.keys(cards).sort();
  fs.writeFileSync(path.join(ROOT, `js/i18n/cards.${l}.js`),
    `/* ETHERION 카드 번역 — ${NAMES[l]} (카드 ID → n 이름 · t 마법 글 · f 서사 · k 종류 · b 핸드 짧은 문구 · h 한국어 원문 지문).\n   한국어 원문(카드 데이터)이 기준이다. 검사: node tools/i18n/check.js */\n"use strict";\nconst I18N_CARDS = {\n` +
    ck.map(id => `${JSON.stringify(id)}: ${JSON.stringify(cards[id])}`).join(",\n") + "\n};\n");
  console.log(`${l}: 화면 글 ${uk.length}개(이번에 ${nu}) · 카드 ${ck.length}장(이번에 ${nc})`);
}
require("child_process").execFileSync(process.execPath, [path.join(__dirname, "names_sync.js"), "--fix"], { stdio: "inherit" });   // 화면 글 속 「카드 이름」을 카드 번역과 맞춘다
