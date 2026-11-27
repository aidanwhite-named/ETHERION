/* ETHERION i18n — 번역 엔진 시험: node tools/i18n/tr_test.js [en|ja|zh] "한국어 글" … (글을 안 주면 늘 보는 몇 줄)
   브라우저 없이 js/i18n.js의 tr()을 사전 · 용어집 · 카드 번역과 함께 돌려 본다(카드는 규칙 묶음을 읽어 CARDS를 채운다). */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..", "..");
const lang = ["en", "ja", "zh"].includes(process.argv[2]) ? process.argv[2] : "en";
const { load } = require("../../server/rules.js");
const R = load();
const ctx = R.ctx;
ctx.localStorage = { getItem: () => JSON.stringify(lang), setItem() {} };
ctx.document = undefined;
for (const f of ["js/i18n.js", "js/i18n/glossary.js", `js/i18n/ui.${lang}.js`, `js/i18n/cards.${lang}.js`]) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
const tr = vm.runInContext("I18N.tr", ctx);
const args = process.argv.slice(3);
const samples = args.length ? args : ["공격 3", "[사격 1] 내 공격 턴에 이 유닛의 차례가 오면, 맞붙기 바로 전에 상대 유닛 하나의 체력을 1 깎음(방어 무시). 대상: 남은 체력이 가장 낮은 유닛 — 같으면 앞의 유닛. 사격으로 상대 유닛이 모두 쓰러지면 남은 공격 유닛은 생명을 직접 공격함.",
  "공격한 상대에 화상 1 — 다음 턴 시작 때 체력 −1.", "일반 6 · 고급 10 · 레어 15", "고르바스의 발톱 기본 덱", "무기와 도구의 힘. 병사·사수·기사·창·검.", "유닛 · 스페셜 — 깃발마다 하나뿐인 존재", "화약 짐꾼", "설정", "언어"];
for (const s of samples) console.log(`${s}\n  → ${tr(s)}`);
