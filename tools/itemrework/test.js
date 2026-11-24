// node tools/itemrework/test.js [-v] — v3.80 아이템 등급 규칙 · v3.81 스페셜 아이템 능력 9가지
const path = require('path'); const { load } = require('../balance/harness');
const fs = require('fs');
const c = load(path.join(__dirname, '../../js'));
c.ev(fs.readFileSync(path.join(__dirname, '../../js/grades.js'), 'utf8'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } else if (process.argv.includes('-v')) console.log('✓ ' + msg); };
c.ev(`var TU=8e6;
function side(idx, ids, life){ const f=ids.map(x=>{ if(!x) return null; const o=typeof x==='string'?{id:x}:x; return {uid:++TU,id:o.id,item:o.item?{id:o.item,coins:[]}:null,summoned:o.summoned}; });
  return {idx,name:'P'+idx,life:life==null?40:life,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for(const p of P) for(const it of p.field) if(it&&isUnit(it)) resetTurn(it); }
this.side=side; this.prep=prep;`);
const CARDS = c.ev('CARDS'), ev = s => c.ev(s), grade = ev('gradeOf'), hpLeft = ev('hpLeft');
const LIST = ev('CARD_LIST'), RET = ev('RETIRED_CARDS');
const abKeys = it => ev('itemAbilities')(it);

/* ---------- v3.80 등급 규칙 ---------- */
{ const items = LIST.filter(x => x.type === 'item');
  const bad = items.filter(x => grade(x) !== 'special' && (x.lv > 3 || abKeys(x.item).filter(s => !/^\[(버팀|고정|눌림)/.test(s)).length > 1));
  ok(!bad.length, '스페셜 말고는 3레벨까지 · 능력 1개까지 ' + bad.map(x => x.id).join(' '));
  ok(items.filter(x => grade(x) === 'epic').every(x => x.lv === 2 || x.lv === 3), '에픽은 2 · 3레벨만');
  ok(items.filter(x => x.lv === 4).every(x => grade(x) === 'special'), '4레벨 아이템은 스페셜만');
  ok(grade('PI-G3') === 'epic' && CARDS['PI-G3'].item.mesmer && CARDS['PI-G3'].limit === 1, '노래 에픽 마렌시아의 비늘 [매혹] · 덱에 1장'); }

/* ---------- v3.81 스페셜 9장 ---------- */
const SP = { 'SR-B1': ['불꽃 사냥', '점화 2'], 'SR-B2': ['되받기', '방패 반격'], 'SR-B3': ['과부하', '증폭 1'], 'SR-G1': ['포식', '관통'], 'SR-G2': ['뿌리 흡수', '가시 2'],
  'SR-G3': ['밀물', '방어 이용 2'], 'SR-A1': ['심판', '방어무시'], 'SR-A2': ['경계의 화살', '원거리'], 'SR-A3': ['표식', '사격 1'] };
for (const id in SP) {
  const C = CARDS[id], a = abKeys(C.item);
  ok(C && C.lv === 4 && grade(id) === 'special' && C.limit === 1 && LIST.some(x => x.id === id), id + ' 4레벨 스페셜 · 덱에 1장 · 카드 목록에 있음');
  ok(a.length === 2 && a[0] === '[' + SP[id][0] + ']' && a[1] === '[' + SP[id][1] + ']', id + ' 능력 차례 ' + a.join(' '));
}
ok(['I4-2', 'IB3-7', 'IG1-5', 'IG2-4', 'IG3-7'].every(id => RET[id] && !LIST.some(x => x.id === id)), '바탕 일반 5장은 레거시');
ok(['I4-2', 'IB3-7', 'IG1-5', 'IG2-4', 'IG3-7'].every(id => Object.values(ev('STARTER_DECKS')).every(d => !d[id]) && Object.values(ev('HARD_DECKS')).every(d => !d[id])), '기본 · 정예 덱에 바탕 카드 없음');

/* 능력 없는 보통 유닛 (코인 · 능력 · 표시 없음) */
const plain = (min) => LIST.filter(x => x.type === 'unit' && !x.co.length && !x.gift && !x.pin && !x.lock && !x.special && !x.unique && x.h >= min).sort((a, b) => b.h - a.h)[0].id;
const TANK = plain(8), U = plain(3);
const unit = (P, i) => P[i].field[0];
function X0(P, ai, turn) { return ev('ctx')(P, ai, turn || 1, [], { seed: 5 }); }

/* [불꽃 사냥]: 화상 붙은 상대에게 피해 + 화상 */
{ const run = s => { const P = [c.side(0, [{ id: U, item: 'SR-B1' }]), c.side(1, [TANK])]; c.prep(P); const d = unit(P, 1);
    if (s) { d.t.keep.scorch = s; d.t.keep.scorchT = 1; } const X = X0(P, 0); ev('attackOne')(X, unit(P, 0)); return d.t.dmg; };
  ok(run(2) - run(0) === 2, '[불꽃 사냥] 화상 2 → 피해 +2 (' + run(0) + ' → ' + run(2) + ')'); }
/* [되받기]: 방어가 막은 만큼 공격자 체력 − (2026-11-22 상한 없음) */
{ const P = [c.side(0, [U]), c.side(1, [{ id: TANK, item: 'SR-B2' }])]; c.prep(P); const a = unit(P, 0), d = unit(P, 1);
  d.t.d = 2; a.t.a = 5; const X = X0(P, 0); const h0 = a.t.dmg; ev('attackOne')(X, a);
  const back = Math.max(0, d.t.a + d.t.d - a.t.d);   // [방패 반격] 반격 = 공 + 방
  ok(a.t.dmg - h0 >= 2 + Math.min(back, 99) - 0 && a.t.dmg - h0 <= 2 + back, '[되받기] 방어 2가 막은 2를 되돌림 (받은 피해 ' + (a.t.dmg - h0) + ')'); }
{ const P = [c.side(0, [U]), c.side(1, [{ id: TANK, item: 'SR-B2' }])]; c.prep(P); const a = unit(P, 0), d = unit(P, 1);
  d.t.d = 9; a.t.a = 6; a.t.h = 99; const X = X0(P, 0); ev('spRiposte')(X, a, d, 6); ok(a.t.dmg === 6, '[되받기] 상한 없음 — 막은 6을 모두 (' + a.t.dmg + ')'); }
/* [과부하]: 내 마법마다 공격 +1, +3까지 */
{ const P = [c.side(0, [{ id: U, item: 'SR-B3' }]), c.side(1, [TANK])]; c.prep(P); const u = unit(P, 0), a0 = u.t.a; const X = X0(P, 0);
  for (let i = 0; i < 5; i++) ev('uOnCast')(X, 0, { uid: 1, id: 'MB-04' });
  ok(u.t.a === a0 + 3, '[과부하] 마법 5번 → 공격 +3 (' + a0 + ' → ' + u.t.a + ')');
  ev('uOnCast')(X, 1, { uid: 2, id: 'MB-04' }); ok(u.t.a === a0 + 3, '[과부하] 상대 마법에는 오르지 않음'); }
/* [포식] · [심판]: 쓰러뜨리면 */
{ const P = [c.side(0, [{ id: U, item: 'SR-G1' }]), c.side(1, [U])]; c.prep(P); const k = unit(P, 0), v = unit(P, 1); const X = X0(P, 0);
  const a0 = k.t.a, h0 = k.t.h; v.t.alive = false; v.t.killer = k.uid; ev('spOnKill')(X, P[0], k, v);
  ok(k.t.a === a0 + 1 && k.t.h === h0 + 1 && k.t.keep.grow.a === 1 && k.t.keep.grow.h === 1, '[포식] 공 +1 · 체 +1, 판 끝까지(keep.grow)');
  for (let i = 0; i < 4; i++) ev('spOnKill')(X, P[0], k, v); ok(k.t.keep.grow.a === 3 && k.t.keep.grow.h === 3, '[포식] 각 +3까지');
  ev('resetTurn')(k); ok(k.t.a === CARDS[U].a + CARDS['SR-G1'].a + 3, '[포식] 다음 턴에도 남음'); }
{ const P = [c.side(0, [{ id: U, item: 'SR-A1' }], 30), c.side(1, [U])]; c.prep(P); const k = unit(P, 0), v = unit(P, 1); const X = X0(P, 0);
  v.t.alive = false; ev('spOnKill')(X, P[0], k, v); ok(P[0].life === 31, '[심판] 쓰러뜨리면 생명 +1 (' + P[0].life + ')');
  ev('spOnKill')(X, P[0], k, v); ok(P[0].life === 31, '[심판] 턴에 한 번'); v.t.killVia = 'chain'; X.turn = 2; ev('spOnKill')(X, P[0], k, v); ok(P[0].life === 31, '[심판] 연쇄로 쓰러뜨린 것은 세지 않음'); }
/* [뿌리 흡수] */
{ const P = [c.side(0, [U]), c.side(1, [{ id: TANK, item: 'SR-G2' }])]; c.prep(P); const a = unit(P, 0), d = unit(P, 1); a.t.h = 99; d.t.dmg = 3; const X = X0(P, 0);
  ev('spDrain')(X, a, d); ok(a.t.dmg === 1 && d.t.dmg === 2, '[뿌리 흡수] 공격자 체력 −1 · 이 유닛 +1'); }
/* [밀물] · [경계의 화살]: 전투가 시작될 때 */
{ const P = [c.side(0, [{ id: U, item: 'SR-G3' }, TANK]), c.side(1, [U])]; c.prep(P); P[0].field[1].t.dmg = 3; P[0].field[0].t.dmg = 1; const X = X0(P, 0);
  ev('spCombatStart')(X); ok(P[0].field[1].t.dmg === 1 && P[0].field[0].t.dmg === 1, '[밀물] 가장 다친 아군 체력 +2'); }
{ const P = [c.side(0, [{ id: TANK, item: 'SR-A2' }]), c.side(1, [{ id: TANK, summoned: 3 }, { id: TANK, summoned: 2 }])]; c.prep(P); const X = X0(P, 1, 3);
  ev('spCombatStart')(X); ok(P[1].field[0].t.dmg === 3 && P[1].field[1].t.dmg === 0, '[경계의 화살] 이번 턴 새로 놓인 상대만 체력 −3'); }
/* [표식]: 피해를 준 상대 방어 −2, 턴에 한 번 */
{ const P = [c.side(0, [{ id: U, item: 'SR-A3' }]), c.side(1, [TANK])]; c.prep(P); const s = unit(P, 0), d = unit(P, 1); d.t.d = 3; const X = X0(P, 0);
  ev('spMark')(X, s, d); ev('spMark')(X, s, d); ok(d.t.d === 1, '[표식] 방어 −2, 턴에 한 번 (' + d.t.d + ')'); }
/* 실제 판이 돌아가는지 (스페셜을 낀 덱 대전) */
(async () => {
  const errs = [];
  for (const g of ['B1', 'B2', 'B3', 'G1', 'G2', 'G3', 'A1', 'A2', 'A3']) {
    const d = Object.assign({}, ev('STARTER_DECKS')[g]); d['SR-' + g] = 1;
    for (let i = 0; i < 4; i++) { try { c.seed(i + 11); await c.playHeadless({ p0: { name: 'A', group: g, cards: d, isAI: true }, p1: { name: 'B', group: g === 'B2' ? 'G1' : 'B2', cards: ev('STARTER_DECKS')[g === 'B2' ? 'G1' : 'B2'], isAI: true } }); } catch (e) { errs.push(g + ': ' + e.message); } }
  }
  ok(!errs.length, '스페셜을 넣은 덱 대전 36판 오류 없음 ' + errs.slice(0, 2).join(' / '));
  console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}개 모두 통과`);
  process.exit(fails ? 1 : 0);
})();
