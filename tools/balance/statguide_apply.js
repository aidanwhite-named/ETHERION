/* 깃발별 스탯 · 코인 기준(docs/STAT_GUIDE.md 3장)으로 기존 유닛을 부드럽게 고친다 → js/statguide.js 를 새로 쓴다.
   node tools/balance/statguide_apply.js          바뀔 카드 목록만 보여 줌
   node tools/balance/statguide_apply.js --write  js/statguide.js 를 씀
   - js/statguide.js 를 뺀 카드 데이터에서 시작한다(STATGUIDE_OFF=1 로 load.js 를 부름). 다시 돌려도 같은 결과.
   - 카드 점수(1.2 × 기대 공 + 방어값 + 기대 체, 코인은 값 × 0.5 — tools/balance4/budget.js)는 카드마다 ±0.4 안에서 지킨다.
   - 레거시 · 스페셜 · 유니크 · 고정 스탯(pin · lock) · 역행(벽 · 돌격) · 시험이 수치를 보는 카드는 건드리지 않는다.
     강화 카드는 바탕 카드와 같은 만큼만 옮긴다(코인 규칙은 바탕 · 강화 카드에 쓰지 않음). */
process.env.STATGUIDE_OFF = '1';
const fs = require('fs'), path = require('path'), vm = require('vm');
const C = require('../balance4/load.js'), ev = s => vm.runInContext(s, C);
const WRITE = process.argv.includes('--write');

// 3장 표 (공 · 방 · 체 지수)
const IDX = { B1: [1.25, .5, .75], B2: [.8, 1.9, 1.1], B3: [1.0, .9, .95], G1: [1.15, .4, 1.0], G2: [.7, .7, 1.35], G3: [.85, 1.15, 1.2], A1: [1.3, .5, .75], A2: [.9, 1.5, 1.2], A3: [1.15, .6, .9] };
// 1장 레벨별 평균 (공 · 방 · 체), 확정할 때 잰 값
const AVG = { 1: [2.0, .5, 1.9], 2: [3.4, .4, 2.7], 3: [4.6, .5, 4.5], 4: [5.8, .4, 6.1], 5: [6.8, .5, 7.3], 6: [6.7, .7, 7.5], 7: [7.3, .5, 8.3], 8: [8.9, 1.2, 10.0] };
const DWARF_D = { 1: 1.0, 2: .8, 3: 1.3, 4: .8, 5: 1.1, 6: 1.7, 7: 1.8, 8: 3 };   // 드워프 레벨별 평균 방어
// 시험이 수치를 보는 카드 · 최근 깃발 작업에서 손으로 맞춘 카드
const SKIP = new Set(['A2-43', 'A2-33', 'A2-21', 'A2-41', 'A2-42', 'A2-17', 'B3-04', 'B3-33', 'B1-03', 'UN-A1-7']);

const dv = d => d <= 0 ? d : d <= 1 ? 1.3 * d : 1.3 + 1.5 * (d - 1);
const ex = (u, k) => u[k] + (u.co || []).filter(x => x[0] === k).reduce((s, [, n, v]) => s + 0.5 * n * v, 0);
const price = u => 1.2 * ex(u, 'a') + dv(ex(u, 'd')) + ex(u, 'h');
const coinN = (u, st) => (u.co || []).filter(x => !st || x[0] === st).reduce((s, x) => s + x[1], 0);
const swing = u => (u.co || []).reduce((s, [, n, v]) => s + n * Math.abs(v), 0);
const clone = u => ({ a: u.a, d: u.d, h: u.h, co: (u.co || []).map(x => x.slice()) });
/* 공 · 체 모양 거리: 같은 점수로 맞춘 깃발 목표와 공격 · 체력이 얼마나 다른가 (방어는 그대로 둔다) */
function shapeDev(g, lv, u) {
  const [ia, , ih] = IDX[g], [aa, , ah] = AVG[lv];
  const s = 1.2 * ia * aa / (1.2 * ia * aa + ih * ah);   // 방어 뺀 예산 가운데 공격 몫
  const B = 1.2 * ex(u, 'a') + ex(u, 'h');
  return ex(u, 'a') - s * B / 1.2;                        // + 면 공격이 목표보다 많음 (공격 점수)
}
/* 점수를 지키는 가장 작은 공 · 체 맞춤 (dd 등 다른 변화 뒤에 남은 점수 차를 메운다) */
function settle(g, lv, base, u, opts) {
  const P0 = price(base), keepA1 = base.a >= 1;
  let best = null;
  const ra = opts.r || 2, rh = opts.r || 3;
  for (let da = -ra; da <= ra; da++) for (let dh = -rh; dh <= rh; dh++) {
    const v = Object.assign(clone(u), { a: u.a + da, h: u.h + dh });
    if (v.a < (keepA1 ? 1 : 0) || v.h < 1) continue;
    const drift = price(v) - P0; if (Math.abs(drift) > (opts.tol || 0.4)) continue;
    const sc = 2 * Math.abs(drift) + Math.abs(shapeDev(g, lv, v)) * 1.2 + 0.3 * (Math.abs(da) + Math.abs(dh));
    if (!best || sc < best.sc) best = { sc, v };
  }
  return best && best.v;
}

const units = ev(`CARD_LIST.filter(c => c.type === "unit").map(c => ({ id: c.id, g: c.group, lv: c.lv, a: c.a, d: c.d, h: c.h, co: c.co || [], pin: !!(c.pin || c.lock), rev: c.rev || "", sp: !!c.special, un: !!c.unique, base: c.base || null, gr: gradeOf(c.id) }))`);
const upOf = ev('JSON.stringify(UPGRADE_OF)'), UP = JSON.parse(upOf);
const byId = Object.fromEntries(units.map(u => [u.id, u]));
const hasUp = id => UP[id] && byId[UP[id]];
const ok = u => IDX[u.g] && !u.pin && !u.rev && !u.sp && !u.un && !SKIP.has(u.id) && !u.base && AVG[u.lv];
const out = {}, why = {};
const put = (u, v, r) => { out[u.id] = v; (why[u.id] = why[u.id] || []).push(r); };
const cur = u => out[u.id] || clone(u);

/* 1. 방어: 천족은 드워프보다 낮게, 인어는 4레벨부터 방어 1 */
for (const u of units.filter(ok)) {
  if (u.g === 'A2' && u.lv >= 3 && u.d >= 2 && u.d >= DWARF_D[u.lv] + 0.5) {
    const v = settle(u.g, u.lv, u, Object.assign(cur(u), { d: u.d - 1 }), { tol: 0.5 }); if (v) put(u, v, '방어 −1 → 체력 (천족은 방어 1.5 · 체력 1.2)');
  }
  if (u.g === 'G3' && u.lv >= 4 && u.d === 0 && shapeDev(u.g, u.lv, u) > 0.3) {
    const v = settle(u.g, u.lv, u, Object.assign(cur(u), { d: 1 }), {}); if (v) put(u, v, '방어 0 → 1 (인어 방어 1.15, [마력 공격])');
  }
}
/* 2. 공 · 체 모양: 목표에서 공격 1.5점 넘게 벗어난 카드만(4.5점 넘게 벗어난 카드는 일부러 만든 역할로 보고 둔다) */
for (const u of units.filter(ok)) {
  const now = cur(u), dev = shapeDev(u.g, u.lv, now);
  if (Math.abs(dev) < 1.5 || Math.abs(dev) > 4.5) continue;
  const v = settle(u.g, u.lv, u, now, {});
  if (v && Math.abs(shapeDev(u.g, u.lv, v)) <= Math.abs(dev) - 0.8 && (v.a !== now.a || v.h !== now.h)) put(u, v, dev > 0 ? '공격 → 체력' : '체력 → 공격');
}
/* 3. 코인 — 깃발 서명. 바탕 · 강화 카드는 빼고, 일반 · 고급만 */
const coinOk = u => ok(u) && !hasUp(u.id) && (u.gr === 'common' || u.gr === 'uncommon');
const spread = (list, n) => {   // 레벨이 고르게 퍼지게 n장
  const pick = [], used = new Set();
  for (const u of list.slice().sort((x, y) => x.lv - y.lv || (x.id < y.id ? -1 : 1))) { if (pick.length >= n) break; if (used.has(u.lv)) continue; used.add(u.lv); pick.push(u); }
  for (const u of list) { if (pick.length >= n) break; if (!pick.includes(u)) pick.push(u); }
  return pick;
};
/* 맞바꿈 코인: 맨 앞에 넣어 각 스탯의 첫째 코인 = 동전 하나(g0)가 되게 한다. third = 그 동전에 끼면 안 되는 스탯(코인이 없어야 함) */
function tradeoff(g, n, plus, minus, third, note) {
  // 셋째 스탯에 코인이 있으면 그 첫째 코인도 같은 동전에 끼므로, 셋째 스탯 코인이 없는 카드를 먼저 고른다
  const base = units.filter(u => u.g === g && coinOk(u) && u.lv >= 2 && u.lv <= 7 && !out[u.id] && coinN(u) <= 3 && u[minus[0]] >= (minus[0] === 'h' ? 3 : 2));
  const clean = base.filter(u => !coinN(u, third)), cand = clean.length >= n ? clean : clean.concat(base.filter(u => coinN(u, third)));
  let done = 0;
  for (const u of spread(cand, cand.length)) {
    if (done >= n) break;
    const v = cur(u); v.co = [plus.slice(), minus.slice()].concat(v.co);
    const s = settle(g, u.lv, u, v, { r: 1 }); if (s) { put(u, s, note); done++; }
  }
}
tradeoff('B1', 3, ['a', 1, 2], ['h', 1, -1], 'd', '맞바꿈 코인 공 +2 · 체 −1 (과충전)');
tradeoff('B2', 3, ['d', 1, 1], ['a', 1, -1], 'h', '맞바꿈 코인 방 +1 · 공 −1 (방패 세우기)');
tradeoff('G2', 3, ['h', 1, 2], ['a', 1, -1], 'd', '맞바꿈 코인 체 +2 · 공 −1 (웅크림)');
tradeoff('G3', 3, ['d', 1, 2], ['h', 1, -1], 'a', '맞바꿈 코인 방 +2 · 체 −1 (물의 장막)');
tradeoff('A1', 3, ['a', 1, 2], ['h', 1, -2], 'd', '맞바꿈 코인 공 +2 · 체 −2 (피의 값)');
/* 고블린 흔들림: 기본 공격 1을 공격 +2 코인으로 (기대값 같음, 폭은 커짐) */
{
  const cand = units.filter(u => u.g === 'B1' && coinOk(u) && !out[u.id] && u.a >= 4 && coinN(u) <= 2 && coinN(u, 'a') < 4 && swing(u) / (u.a + u.d + u.h) < 0.22);
  for (const u of spread(cand, 6)) { const v = cur(u); v.a -= 1; v.co = [['a', 1, 2]].concat(v.co); put(u, v, '공격 1 → 공 +2 코인 (폭발: 흔들림 크게)'); }
}
/* 엘프: 2짜리 코인을 1짜리 둘로 (기대값 · 폭 같음, 결과가 고르게) */
for (const u of units.filter(u => u.g === 'A3' && coinOk(u))) {
  const v = cur(u); if (!v.co.some(x => x[2] === 2)) continue;
  const co = []; for (const [st, n, val] of v.co) { if (val === 2) co.push([st, n * 2, 1]); else co.push([st, n, val]); }
  const per = {}; co.forEach(([st, n]) => per[st] = (per[st] || 0) + n);
  if (Object.values(per).some(n => n > 4) || co.reduce((s, x) => s + x[1], 0) > 5) continue;
  const m = {}; for (const [st, n, val] of co) { const k = st + val; if (m[k]) m[k][1] += n; else m[k] = [st, n, val]; }
  v.co = Object.values(m); put(u, v, '2짜리 코인 → 1짜리 둘 (정밀함)');
}
/* 4. 강화 카드: 바탕과 같은 만큼 옮긴다 */
for (const b in UP) {
  const u = byId[b], w = byId[UP[b]]; if (!u || !w || !out[b] || w.pin || SKIP.has(w.id)) continue;
  const o = out[b], d = { a: o.a - u.a, d: o.d - u.d, h: o.h - u.h };
  if (!d.a && !d.d && !d.h) continue;
  const v = { a: Math.max(0, w.a + d.a), d: Math.max(0, w.d + d.d), h: Math.max(1, w.h + d.h), co: w.co.map(x => x.slice()) };
  put(w, v, '바탕 카드와 같이');
}
/* 바뀐 것이 없는 카드는 뺀다 */
for (const id in out) { const u = byId[id], v = out[id]; if (v.a === u.a && v.d === u.d && v.h === u.h && JSON.stringify(v.co) === JSON.stringify(u.co)) { delete out[id]; delete why[id]; } }

/* 보고 */
const ids = Object.keys(out).sort((x, y) => byId[x].g < byId[y].g ? -1 : byId[x].g > byId[y].g ? 1 : byId[x].lv - byId[y].lv);
const coTxt = co => co.map(([s, n, v]) => `${s}${v > 0 ? '+' : ''}${v}×${n}`).join(' ') || '-';
let drift = 0;
for (const id of ids) { const u = byId[id], v = out[id], dP = price(v) - price(u); drift += dP;
  if (!WRITE) console.log(`${id.padEnd(9)} L${u.lv} ${u.a}/${u.d}/${u.h} ${coTxt(u.co)} → ${v.a}/${v.d}/${v.h} ${coTxt(v.co)}  점수 ${dP >= 0 ? '+' : ''}${dP.toFixed(1)}  ${why[id].join(' · ')}`); }
const byG = {}; ids.forEach(id => byG[byId[id].g] = (byG[byId[id].g] || 0) + 1);
console.log(`바뀌는 카드 ${ids.length}장 (${Object.entries(byG).map(([g, n]) => g + ' ' + n).join(' · ')}) · 점수 합 ${drift >= 0 ? '+' : ''}${drift.toFixed(1)}`);

if (WRITE) {
  const names = JSON.parse(ev('JSON.stringify(Object.fromEntries(CARD_LIST.map(c => [c.id, c.name])))'));
  const lines = ids.map(id => { const u = byId[id], v = out[id];
    return `  ${JSON.stringify(id)}: { a: ${v.a}, d: ${v.d}, h: ${v.h}, co: ${JSON.stringify(v.co)}, was: [${u.a}, ${u.d}, ${u.h}, ${JSON.stringify(u.co)}] },   // ${names[id]} L${u.lv} — ${why[id].join(' · ')}`; });
  const src = `/* ETHERION v3.77.2 — 깃발별 스탯 · 코인 기준으로 기존 유닛을 부드럽게 고침 (docs/STAT_GUIDE.md)
   손으로 고치지 말 것: node tools/balance/statguide_apply.js --write 가 쓴다. celestial.js 다음, decks.js · cards.js 앞에 읽는다.
   카드 점수(1.2 × 기대 공 + 방어값 + 기대 체, 코인 값 × 0.5)는 카드마다 ±0.4 안에서 지켰다. 이름 · 능력 · 등급 · 그림은 그대로.
   was: 바꾸기 전 [공, 방, 체, 코인] */
"use strict";
const STATGUIDE = {
${lines.join('\n')}
};
(function () {
  for (const u of SIM_UNITS) {
    const r = STATGUIDE[u.id]; if (!r) continue;
    u.a = r.a; u.d = r.d; u.h = r.h; u.co = r.co.map(x => x.slice());
  }
})();
`;
  fs.writeFileSync(path.join(__dirname, '../../js/statguide.js'), src);
  console.log('js/statguide.js 씀');
}
