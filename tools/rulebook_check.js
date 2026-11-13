/* ETHERION — 룰북 검사 (v3.55)   node tools/rulebook_check.js
   서버와 같은 규칙 문맥(server/rules.js)에 js/rulebook.js를 읽어 본다.
   ① 글 속 {값 이름}이 모두 RB_VALUES에 있는가   ② { table } 이름이 모두 RB_TABLES에 있는가
   ③ 모든 값 · 표가 지금 게임 데이터에서 실제로 읽히는가(opt 줄만 비어도 됨 — 알림만)
   ④ [[mn:…]] · [[rb:…]] 연결이 매뉴얼 장 · 룰북 섹션에 있는가   ⑤ 글에 숫자를 직접 쓰지 않았는가(값 이름으로 읽어야 함)
   ⑥ 다 채운 HTML에 undefined · NaN이 없는가
   실패하면 바뀐 상수 이름을 js/rulebook.js의 RB_VALUES · RB_TABLES에서 고친다. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ROOT = path.join(__dirname, "..");
const R = require(path.join(ROOT, "server/rules.js")).load();
vm.runInContext(fs.readFileSync(path.join(ROOT, "js/rulebook.js"), "utf8"), R.ctx, { filename: "js/rulebook.js" });
const B = vm.runInContext("({ RULEBOOK, RB_VALUES, RB_TABLES, rbVal, rbSectionHTML })", R.ctx);

let fail = 0, warn = 0;
const bad = m => { fail++; console.log("  ✗ " + m); };
const note = m => { warn++; console.log("  ! " + m); };

/* 글 조각 모으기: [텍스트, 섹션 id, opt?] */
const texts = [];
for (const S of B.RULEBOOK) {
  for (const k of ["t", "sum"]) if (S[k]) texts.push([S[k], S.id, false, true]);
  for (const P of S.parts) {
    for (const k of ["p", "h", "tip"]) if (P[k]) texts.push([P[k], S.id, false]);
    if (P.li) P.li.forEach(x => texts.push([x, S.id, false]));
    if (P.rows) P.rows.forEach(([a, b, o]) => { texts.push([a, S.id, o === "opt"]); texts.push([b, S.id, o === "opt"]); });
    if (P.table && !B.RB_TABLES[P.table]) bad(`${S.id}: 없는 표 이름 "${P.table}"`);
  }
}
const manualIds = [...fs.readFileSync(path.join(ROOT, "js/manual.js"), "utf8").matchAll(/\{ id: "([\w-]+)", t:/g)].map(m => m[1]);
const rbIds = B.RULEBOOK.map(s => s.id);
if (new Set(rbIds).size !== rbIds.length) bad("섹션 id가 겹칩니다.");

const used = new Map();   // 값 이름 → opt에서만 쓰였나
for (const [s, id, opt, plain] of texts) {
  for (const m of s.matchAll(/\{([\w.]+)\}/g)) {
    const k = m[1];
    if (!(k in B.RB_VALUES)) bad(`${id}: 없는 값 이름 {${k}}`);
    used.set(k, (used.has(k) ? used.get(k) : true) && opt);
  }
  for (const m of s.matchAll(/\[\[(mn|rb):([\w-]+)\|/g)) {
    if (m[1] === "mn" && !manualIds.includes(m[2])) bad(`${id}: 매뉴얼에 없는 장 [[mn:${m[2]}]]`);
    if (m[1] === "rb" && !rbIds.includes(m[2])) bad(`${id}: 룰북에 없는 섹션 [[rb:${m[2]}]]`);
  }
  if (plain && /\{/.test(s)) bad(`${id}: 제목 · 요약(t · sum)에는 값을 쓰지 않습니다 — "${s}"`);
  /* 숫자를 글에 직접 쓰지 않는다: {…} · [[…]]를 지운 뒤 남은 숫자 (시각 "0시"만 허용) */
  const rest = s.replace(/\{[\w.]+\}/g, "").replace(/\[\[[^\]]*\]\]/g, "").replace(/(^|[^\d])0시/g, "$1");
  if (/\d/.test(rest)) bad(`${id}: 숫자를 글에 직접 썼습니다 — "${s}"`);
}

/* 값 */
let nVal = 0;
for (const k of Object.keys(B.RB_VALUES)) {
  const v = B.rbVal(k);
  if (v == null) { if (used.get(k)) note(`값 {${k}}를 읽지 못함 — opt 줄이라 그 줄만 숨김`); else bad(`값 {${k}}를 읽지 못합니다 (게임 상수 이름이 바뀌었나?)`); }
  else nVal++;
  if (!used.has(k)) note(`값 {${k}}는 글에서 쓰이지 않습니다`);
}
/* 표 */
for (const k of Object.keys(B.RB_TABLES)) {
  let T = null; try { T = B.RB_TABLES[k](); } catch (e) { bad(`표 "${k}" 만들다 오류: ${e.message}`); continue; }
  if (!T || !T.rows || !T.rows.length) bad(`표 "${k}"에 줄이 없습니다`);
  else if (T.rows.some(r => r.length !== T.cols.length)) bad(`표 "${k}"의 칸 수가 머리와 다릅니다`);
}
/* 섹션 HTML */
for (const S of B.RULEBOOK) {
  const miss = [], h = B.rbSectionHTML(S, miss);
  if (miss.length) bad(`${S.id}: 채우지 못한 값 ${miss.join(", ")}`);
  if (/undefined|NaN/.test(h)) bad(`${S.id}: HTML에 undefined · NaN`);
  if (h.replace(/<[^>]+>/g, "").trim().length < 20) bad(`${S.id}: 본문이 비었습니다`);
}
console.log(`룰북 섹션 ${B.RULEBOOK.length}개 · 값 ${nVal}/${Object.keys(B.RB_VALUES).length}개 · 표 ${Object.keys(B.RB_TABLES).length}개 — 실패 ${fail} · 알림 ${warn}`);
process.exit(fail ? 1 : 0);
