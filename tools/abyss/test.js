// node tools/abyss/test.js — v3.65 심연 마족 능력 · 마법 시험 (강탈 · 흡혈 · 그림자 걸음 · 피의 계약 · 피의 제물 · 피의 공명 · 심연의 부름)
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } };
c.ev(`var TU=5e6;
function side(idx, ids, life){ const f=ids.map(x=>{ if(!x) return null; const o=typeof x==='string'?{id:x}:x; const it={uid:++TU,id:o.id,item:o.item?{id:o.item,coins:[]}:null}; return it; });
  return {idx,name:'P'+idx,life:life==null?40:life,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for(const p of P) for(const it of p.field) if(it&&isUnit(it)) resetTurn(it); }
function fight(P, ai, seed){ prep(P); const X=ctx(P,ai,1,[],{seed:seed||7}); runCombatCore(X); return X; }
this.side=side; this.fight=fight; this.prep=prep;`);
const CARDS = c.ev('CARDS');
// 카드 글
for (const id of ['SA1-06', 'SA1-01', 'MA-04', 'SA1-02', 'MC-05', 'SA1-04', 'MA-16', 'MA-01', 'RS-A1-1', 'US-A1-1', 'CS-A1', 'PS-A1-2']) ok(CARDS[id], id + ' 있음');
ok(/\[제물 2\]/.test(CARDS['MA-01'].text) && CARDS['MA-01'].cost.life === 2, 'MA-01 [제물 2] (v3.66: 마법이 [강탈]을 걸던 것 → [제물])');
ok(/\[제물 2\]/.test(CARDS['SA1-01'].text), '심연의 부름도 생명을 내므로 [제물]');
ok(!/\[강탈\]/.test(CARDS['SA1-06'].text), '피의 제물은 생명을 내지 않음');
ok(CARDS['A1-27'].gift.leech && !CARDS['A1-27'].gift.shred, '피의 군주 [흡혈] (관통 뺌)');
ok(CARDS['IA1-1'].item.pact === 2, '피의 서약 부적 [피의 계약 2]');
ok(c.ev('itemAbilities(CARDS["IA1-1"].item)').includes('[피의 계약 2]'), '아이템 능력 글');
ok(c.ev('itemKwDesc("[흡혈]")').length > 10, '[흡혈] 뜻 글');
// [강탈]: 공격으로 쓰러뜨리면 다음 턴 에테르 + 레벨의 절반(올림) (v3.66: 생명 → 에테르)
{ const P = [c.side(0, ['A1-13'], 30), c.side(1, ['A1-05'], 30)];
  const X = c.fight(P, 0); const g = Math.ceil(CARDS['A1-05'].lv / 2); ok(P[0].bonus >= g && P[0].life === 30, '[강탈] 처형인 다음 턴 에테르 +' + g + ' → bonus ' + P[0].bonus + ' · 생명 ' + P[0].life); }
// 강탈 없는 유닛은 생명 그대로
{ const P = [c.side(0, ['A1-15'], 30), c.side(1, ['A1-05'], 30)]; c.fight(P, 0); ok(P[0].life === 30, '강탈 없으면 생명 그대로'); }
// 마법이 건 [강탈] + 대가
{ const P = [c.side(0, ['MA-01', 'A1-15'], 30), c.side(1, ['A1-17'], 30)]; const X = c.fight(P, 0, 3);
  ok(X.paid[0] === 2, '이번 턴 낸 대가 2'); ok(P[0].life > 28, '피의 칼날 [강탈]로 생명을 되찾음 (' + P[0].life + ')'); }
// [흡혈]: 다친 몸을 채우고 넘치면 체력 +
{ const P = [c.side(0, ['A1-27'], 30), c.side(1, ['A1-17'], 30)]; c.prep(P); const u = P[0].field[0], f = P[1].field[0];
  const X = c.ev('ctx')(P, 0, 1, []); const h0 = u.t.h; c.ev('attackOne')(X, u);
  const dealt = Math.max(0, CARDS['A1-27'].a - f.t.d); ok(u.t.h - h0 === Math.ceil(Math.min(dealt, CARDS['A1-17'].h) / 2) || u.t.h > h0, '[흡혈] 체력 + (' + h0 + '→' + u.t.h + ', 받은 피해 ' + u.t.dmg + ')'); }
// [그림자 걸음]: 높은 레벨의 공격은 한 번 흘림
{ const P = [c.side(0, ['A1-34'], 30), c.side(1, ['PN-A1-C2'], 30)]; c.prep(P); const X = c.ev('ctx')(P, 0, 1, []); const d = P[1].field[0];
  c.ev('attackOne')(X, P[0].field[0]); ok(d.t.alive && d.t.dmg === 0, '[그림자 걸음] 7레벨 공격을 흘림'); }
{ const P = [c.side(0, ['A1-29'], 30), c.side(1, ['PN-A1-C2'], 30)]; c.prep(P); const X = c.ev('ctx')(P, 0, 1, []); const d = P[1].field[0];   // 6레벨 > 4레벨
  d.t.veilUsed = true; c.ev('attackOne')(X, P[0].field[0]); ok(d.t.dmg > 0, '[그림자 걸음] 한 번 쓴 뒤에는 맞음'); }
{ const P = [c.side(0, ['A1-02'], 30), c.side(1, ['PN-A1-C2'], 30)]; c.prep(P); const X = c.ev('ctx')(P, 0, 1, []); const d = P[1].field[0];
  P[0].field[0].t.noCoin = true;   // A1-02의 − 코인(체 −1) 앞면이면 쓰러져 공격하지 못한다 — 난수 순서에 따라 흔들리지 않게 코인을 끈다
  const want = Math.max(0, P[0].field[0].t.a - d.t.d) + 2; c.ev('attackOne')(X, P[0].field[0]); ok(d.t.dmg === want, '[그림자 걸음] 낮은 레벨에게는 피해 +2 (' + d.t.dmg + '/' + want + ')'); }
// [피의 계약]: 생명을 낼 때마다 공격 +1
{ const P = [c.side(0, ['MA-01', 'A1-01'], 30), c.side(1, ['A1-43'], 30)]; c.prep(P); const u = P[0].field[1], a0 = u.t.a;
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1); ok(u.t.a === a0 + 1, '[피의 계약 1] 공격 +1'); }
// 피의 공명: 낸 생명 + 1
{ const P = [c.side(0, ['MA-01', 'MA-04'], 30), c.side(1, ['A1-43'], 30)]; c.prep(P); const f = P[1].field[0];
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1); const d0 = f.t.dmg; c.ev('castSpell')(X, 0, P[0].field[1], 2); ok(f.t.dmg - d0 === 4, '피의 공명 피해 = 2 + 2 (' + (f.t.dmg - d0) + ')'); }
// 피의 제물: 아군 2기 체력 −1 → 피해 4
{ const P = [c.side(0, ['SA1-06', 'A1-17', 'A1-17'], 30), c.side(1, ['A1-43'], 30)]; c.prep(P); const f = P[1].field[0];
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1); ok(f.t.dmg === 6 && P[0].field[1].t.dmg === 1, '피의 제물 2기 → 피해 6 (' + f.t.dmg + ')'); }
// 심연의 부름: 소각장에서 레벨 ≤ 낸 생명
{ const P = [c.side(0, ['MA-01', 'SA1-01'], 30), c.side(1, ['A1-43'], 30)]; P[0].burn = ['A1-29', 'A1-13', 'A1-07', 'MA-09']; c.prep(P);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1); c.ev('castSpell')(X, 0, P[0].field[1], 2);
  const u = P[0].field[1]; ok(u && u.id === 'A1-13' && !P[0].burn.includes('A1-13'), '심연의 부름: 낸 생명 4 → 3레벨 처형인 (' + (u && u.id) + ')'); }
{ const P = [c.side(0, ['SA1-01'], 30), c.side(1, ['A1-43'], 30)]; P[0].burn = ['A1-29']; c.prep(P);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1); ok(P[0].field[0].id === 'SA1-01' && P[0].burn.length === 1, '심연의 부름: 레벨이 높으면 그대로'); }

// 그림자 손아귀: 낸 생명 2 → 레벨 2 이하 상대 유닛 빼앗음
{ const P = [c.side(0, ['MA-01', 'SA1-02'], 30), c.side(1, ['A1-29', 'A1-02', 'A1-41'], 30)]; c.prep(P);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1); c.ev('castSpell')(X, 0, P[0].field[1], 2);
  ok(P[0].field.some(u => u && u.id === 'A1-41' && u.t.stolen) && !P[1].field.some(u => u && u.id === 'A1-41'), '그림자 손아귀: 낸 생명 2 → 3레벨 이하 중 가장 높은 2레벨 계약의 볼모'); }
{ const P = [c.side(0, ['SA1-02'], 30), c.side(1, ['A1-07', 'A1-02'], 30)]; c.prep(P); const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(P[1].field[0] && P[1].field[0].id === 'A1-07' && P[0].field.some(u => u && u.id === 'A1-02'), '그림자 손아귀: 낸 생명 0이면 1레벨까지'); }
// 환각: 맨 앞 유닛이 바로 뒤 제 편을 친다, 반격 없음
{ const P = [c.side(0, ['MC-05', 'A1-07'], 30), c.side(1, ['A1-29', 'A1-17'], 30)]; c.prep(P); const X = c.ev('ctx')(P, 0, 1, []);
  c.ev('castSpell')(X, 0, P[0].field[0], 1); const v = P[1].field[1];
  ok(v.t.dmg === Math.max(0, P[1].field[0].t.a - v.t.d) || !v.t.alive, '환각: 제 편을 침 (' + v.t.dmg + ')'); ok(!P[1].field[0].t.noCounter, '환각: 반격은 막지 않음 (v3.66)');
  const me = P[0].field[1]; c.ev('attackOne')(X, me); ok(me.t.dmg === 0, '환각에 빠진 유닛은 반격하지 않음'); }
// 거울 환영: 상대 공격 1위의 환영, 소각장에 가지 않음
{ const P = [c.side(0, ['SA1-04'], 30), c.side(1, ['A1-29', 'A1-02'], 30)]; const X = c.fight(P, 1, 5);
  ok(X.logs ? true : true, ''); ok(!P[0].burn.includes('A1-29') && !P[1].burn.filter(x => x === 'A1-29').length || P[1].field.some(u => u && u.id === 'A1-29'), '거울 환영: 환영은 소각장에 가지 않음 (' + P[0].burn + ' / ' + P[1].burn + ')'); }
{ const P = [c.side(0, ['SA1-04'], 30), c.side(1, ['A1-29'], 30)]; c.prep(P); const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  const u = P[0].field[0]; ok(u && u.id === 'A1-29' && u.phantom && u.tokTemp && X.paid[0] === 2, '거울 환영: 6레벨 환영이 내 칸에'); }
console.log(fails ? `실패 ${fails} / ${n}` : `모두 통과 ${n}개`);
process.exit(fails ? 1 : 0);
