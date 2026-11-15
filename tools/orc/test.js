// node tools/orc/test.js — v3.67 바위주먹 오크 [관통] · [치명] 연계 마법 시험 (숨통 끊기 · 송곳니 반격 · 뼈 부수기 · 오크의 문신)
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } else if (process.argv.includes('-v')) console.log('✓ ' + msg); };
c.ev(`var TU=6e6;
function side(idx, ids, life){ const f=ids.map(x=>{ if(!x) return null; const o=typeof x==='string'?{id:x}:x; return {uid:++TU,id:o.id,item:o.item?{id:o.item,coins:[]}:null}; });
  return {idx,name:'P'+idx,life:life==null?40:life,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for(const p of P) for(const it of p.field) if(it&&isUnit(it)) resetTurn(it); }
function fight(P, ai, seed){ prep(P); const X=ctx(P,ai,1,[],{seed:seed||7}); runCombatCore(X); return X; }
this.side=side; this.fight=fight; this.prep=prep;`);
const CARDS = c.ev('CARDS');
ok(CARDS['SG1-02'].name === '숨통 끊기' && CARDS['SG1-02'].type === 'def' && CARDS['SG1-02'].lv === 1, '숨통 끊기 L1 방어');
ok(CARDS['SG1-08'].name === '송곳니 반격' && CARDS['SG1-08'].type === 'def' && CARDS['SG1-08'].lv === 3, '송곳니 반격 L3 방어');
ok(CARDS['MG-13'].name === '뼈 부수기' && CARDS['MG-13'].type === 'atk' && CARDS['MG-13'].lv === 3, '뼈 부수기 L3 공격');
ok(CARDS['M2-1'].item.shred && c.ev('itemAbilities(CARDS["M2-1"].item)').includes('[관통]'), '오크의 문신 [관통]');
// 뼈 부수기: 방어 0인 유닛 중 공격이 가장 높은 1기만 쓰러짐, 방어가 있는 유닛은 건너뜀
{ const P = [c.side(0, ['MG-13'], 30), c.side(1, ['G1-01', 'G1-25', 'B2-24'], 30)]; c.prep(P);
  const big = P[1].field[1], low = P[1].field[0]; P[1].field[2].t.a = 99;   // 방어 있는 유닛은 공격이 높아도 대상 아님
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(!big.t.alive && low.t.alive && P[1].field[2].t.alive, '뼈 부수기: 방어 0 최강 1기만 쓰러짐 (' + [low.t.alive, big.t.alive, P[1].field[2].t.alive] + ')'); }
// 방어가 있으면 [관통]으로 0이 된 다음에야 대상
{ const P = [c.side(0, ['MG-13'], 30), c.side(1, ['B2-24'], 30)]; c.prep(P); const f = P[1].field[0]; const d0 = f.t.d;
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(d0 > 0 && f.t.alive && f.t.d === d0, '뼈 부수기: 방어 ' + d0 + '인 유닛은 그대로'); }
{ const P = [c.side(0, ['G1-14', 'MG-13'], 30), c.side(1, ['B2-32'], 30)]; const X = c.fight(P, 0, 3);
  ok(!P[1].field.some(u => u && u.t.alive), '[관통] 돌격대가 방어 2를 0으로 깎은 뒤 뼈 부수기로 쓰러뜨림'); }
{ const P = [c.side(0, ['G1-15', 'MG-13'], 30), c.side(1, ['B2-32'], 30)]; const X = c.fight(P, 0, 3);
  ok(P[1].field.some(u => u && u.t.alive), '[관통] 없으면 방어 2가 남아 뼈 부수기 빗나감'); }
// 송곳니 반격 + 숨통 끊기: 방어 턴에 반격 [치명]으로 체력 1 → 전투가 끝날 때 숨통 끊기로 쓰러짐
{ const P = [c.side(0, ['G1-35'], 30), c.side(1, ['SG1-08', 'G1-42', 'SG1-02'], 30)]; const X = c.fight(P, 0, 5);
  const att = P[0].field.find(u => u && u.id === 'G1-35');
  ok(!att, '송곳니 반격 + 숨통 끊기: 바위껍질 곰(공 1)의 반격 [치명] → 숨통 끊기로 7레벨 거수 쓰러짐'); }
{ const P = [c.side(0, ['G1-35'], 30), c.side(1, ['SG1-08', 'G1-42'], 30)]; const X = c.fight(P, 0, 5);
  const att = P[0].field.find(u => u && u.id === 'G1-35');
  ok(att && c.ev('hpLeft')(att) === 1, '송곳니 반격만: 거수는 체력 1로 남음 (' + (att && c.ev('hpLeft')(att)) + ')'); }
{ const P = [c.side(0, ['G1-01', 'G1-03'], 30), c.side(1, ['SG1-02'], 30)]; c.prep(P);
  const X = c.ev('ctx')(P, 1, 1, []); c.ev('castSpell')(X, 1, P[1].field[0], 1);
  ok(P[0].field.every(u => !u || !u.t.alive), '숨통 끊기: 체력 1 상대 전체 쓰러짐'); }
console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}/${n} 통과`); process.exit(fails ? 1 : 0);
