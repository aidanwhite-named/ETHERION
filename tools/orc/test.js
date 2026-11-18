// node tools/orc/test.js — v3.67 바위주먹 오크 [관통] · [치명] 연계 마법 시험 (숨통 끊기 · 송곳니 반격 · 뼈 부수기 · 오크의 문신)
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'), require('fs').readFileSync(path.join(__dirname, '../../js/grades.js'), 'utf8'));   // v3.82 등급 시험에 grades.js
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
ok(CARDS['MG-13'].name === '뼈 부수기' && CARDS['MG-13'].type === 'atk' && CARDS['MG-13'].lv === 2, '뼈 부수기 L2 공격 (v3.95)');
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
// ---------- v3.82 고르바스의 발톱: 기존 카드 5장을 바꿈 (궁지의 송곳니 · 승전의 함성 · 몸통 박치기 · 사냥감 몰이) ----------
{ const G = c.ev('gradeOf'), want = { 'SG1-03': ['궁지의 송곳니', 'atk', 3, 'rare'], 'PS-G1-1': ['승전의 함성', 'atk', 1, 'common'], 'SG1-09': ['몸통 박치기', 'atk', 2, 'uncommon'], 'SG1-01': ['사냥감 몰이', 'any', 1, 'common'] };
  for (const id in want) { const [nm, ty, lv, gr] = want[id], x = CARDS[id]; ok(x.name === nm && x.type === ty && x.lv === lv && G(id) === gr && x.group === 'G1', `${id} ${nm} · ${ty} · L${lv} · ${gr} (${x.name} ${x.type} L${x.lv} ${G(id)})`); } }
/* 유닛 스탯을 정해 둔다: [공, 방, 체] */
c.ev(`this.setU=function(u,s){ u.t.a=s[0]; u.t.d=s[1]; u.t.h=s[2]; u.t.dmg=0; u.t.noCoin=true; u.t.shield=false; u.t.taunt=false; u.t.ward=0; u.t.thorns=0; };`);
const hp = u => c.ev('hpLeft')(u);
// 궁지의 송곳니(v3.95): 아군 공격의 합을 몫으로 상대 맨 앞부터 공 → 방 → 체를 깎고, 쓰러뜨리면 남은 몫은 다음 유닛에게
{ const P = [c.side(0, ['SG1-03', 'G1-01', 'G1-03'], 30), c.side(1, ['G1-01', 'G1-03'], 30)]; c.prep(P);
  c.setU(P[0].field[1], [3, 0, 2]); c.setU(P[0].field[2], [4, 0, 9]); c.setU(P[1].field[0], [2, 1, 3]); c.setU(P[1].field[1], [5, 2, 9]);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  const [e1, e2] = P[1].field;
  ok(!e1.t.alive, '궁지의 송곳니: 몫 7 → 1번 공 2 · 방 1 · 체 3을 깎아 쓰러뜨림');
  ok(e2.t.a === 4 && e2.t.d === 2 && hp(e2) === 9, '남은 몫 1 → 2번 공격 5 → 4 (' + e2.t.a + '/' + e2.t.d + '/' + hp(e2) + ')');
  ok(P[0].field[1].t.a === 3 && hp(P[0].field[1]) === 2, '아군 스탯은 그대로 (몫으로 쓰기만)'); }
{ const G = c.ev('gradeOf'), x = CARDS['SG1-03'];
  ok(x.name === '궁지의 송곳니' && x.type === 'atk' && x.lv === 3 && G('SG1-03') === 'rare' && /공격을 모두 더한/.test(x.text), '궁지의 송곳니: 공격 L3 레어 · 새 글'); }
// 웅크린 늑대(MC-01, 전 각성): 아군 공격 1로 고정 → 줄어든 합만큼 상대 전체 공격 −
{ const G = c.ev('gradeOf'), x = CARDS['MC-01'];
  ok(x.name === '웅크린 늑대' && x.type === 'def' && x.lv === 2 && G('MC-01') === 'uncommon', '웅크린 늑대: 방어 L2 고급 (' + x.name + ' ' + x.type + ' L' + x.lv + ' ' + G('MC-01') + ')'); }
{ const P = [c.side(0, ['MC-01', 'G1-01', 'G1-03', 'G1-04'], 30), c.side(1, ['G1-01', 'G1-03'], 30)]; c.prep(P);
  const A = P[0].field.slice(1, 4); c.setU(A[0], [5, 0, 5]); c.setU(A[1], [3, 0, 5]); c.setU(A[2], [1, 0, 5]);
  c.setU(P[1].field[0], [8, 0, 5]); c.setU(P[1].field[1], [4, 0, 5]);
  const X = c.ev('ctx')(P, 1, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(A.every(u => u.t.a === 1), '아군 공격 모두 1 (' + A.map(u => u.t.a).join('/') + ')');
  ok(P[1].field[0].t.a === 2 && P[1].field[1].t.a === 0, '줄어든 4 + 2 = 6 → 상대 공격 8 → 2, 4 → 0 (0 아래로 안 내려감) (' + P[1].field[0].t.a + '/' + P[1].field[1].t.a + ')');
  c.ev('addStat')(X, A[0], 'a', 3); ok(A[0].t.a === 1, '이번 턴 고정: 뒤에 공격 +3이 와도 1'); }
// (무한한 격노 MG-04는 v3.87에 원한의 일격으로 바뀜 — 아래 v3.87 시험)
// 승전의 함성: 전투가 끝날 때 살아남은 아군 수만큼 상대 생명 −
{ const P = [c.side(0, ['PS-G1-1', 'G1-01', 'G1-01', 'G1-03'], 30), c.side(1, [], 30)]; c.prep(P);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1); P[0].field[2].t.alive = false; c.ev('g1VictoryEnd')(X);
  ok(P[1].life === 28, '승전의 함성: 살아남은 2기 → 상대 생명 30 → 28 (' + P[1].life + ')'); }
// 몸통 박치기: 아군 3기 → 상대 전체 체력 −6(방어 무시), 아군마다 체력 −3
{ const P = [c.side(0, ['SG1-09', 'G1-01', 'G1-01', 'G1-03'], 30), c.side(1, ['G1-01', 'G1-03'], 30)]; c.prep(P);
  for (const u of P[0].field.slice(1, 4)) c.setU(u, [1, 0, 10]); c.setU(P[0].field[3], [1, 0, 3]);
  for (const u of P[1].field.slice(0, 2)) c.setU(u, [1, 5, 20]);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(P[1].field[0].t.dmg === 6 && P[1].field[1].t.dmg === 6, '몸통 박치기: 상대마다 체력 −6 (방어 5 무시) (' + P[1].field[0].t.dmg + ')');
  ok(hp(P[0].field[1]) === 7 && !P[0].field[3].t.alive, '아군마다 체력 −3: 10 → 7, 체력 3인 유닛은 쓰러짐'); }
// 사냥감 몰이(v3.95): 방어는 빼고 남은 체력이 낮은 순으로 맨 앞부터, [홀림]은 걸지 않는다
{ const P = [c.side(0, ['SG1-01'], 30), c.side(1, ['G1-01', 'G1-03', 'G1-04'], 30)]; c.prep(P);
  const [a, b, d] = P[1].field; c.setU(a, [1, 0, 6]); c.setU(b, [1, 9, 3]); c.setU(d, [1, 0, 5]); d.t.dmg = 1;
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(P[1].field[0] === b && P[1].field[1] === d && P[1].field[2] === a, '사냥감 몰이: 남은 체력 3(방어 9) → 4 → 6 순 — 방어는 보지 않는다');
  ok(!a.t.charm && !b.t.charm && !d.t.charm, '사냥감 몰이는 [홀림]을 걸지 않는다'); }
{ const P = [c.side(0, ['MC-03'], 30), c.side(1, ['G1-01', 'G1-03'], 30)]; c.prep(P);
  const [a, b] = P[1].field; c.setU(a, [1, 0, 3]); c.setU(b, [1, 2, 10]);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(P[1].field[0] === b && b.t.charm, '뒤바뀐 물길(인어)은 그대로: 높은 순 · 자리 바뀐 유닛 [홀림]'); }
// ---------- v3.95 오크 마법 손질: 늑대 기습 · 대지 가르기 고급, 효과 그대로 ----------
{ const G = c.ev('gradeOf');
  ok(G('RS-G1-1') === 'uncommon' && CARDS['RS-G1-1'].name === '늑대 기습' && CARDS['RS-G1-1'].lv === 1, '늑대 기습: 고급 L1 (' + G('RS-G1-1') + ')');
  ok(G('RS-G1-3') === 'uncommon' && CARDS['RS-G1-3'].name === '대지 가르기' && CARDS['RS-G1-3'].lv === 3, '대지 가르기: 고급 L3 (' + G('RS-G1-3') + ')');
  ok(/아군 전체 공격 \+1/.test(CARDS['RS-G1-3'].text), '대지 가르기: 아군 전체 공격 +1은 그대로');
  ok(/남은 체력이 낮은 순/.test(CARDS['SG1-01'].text), '사냥감 몰이 글: 남은 체력이 낮은 순'); }
// ---------- v3.87 원한의 일격(MG-04) · 피의 맹세(RS-G1-2) ----------
{ const G = c.ev('gradeOf');
  ok(CARDS['MG-04'].name === '원한의 일격' && CARDS['MG-04'].type === 'atk' && CARDS['MG-04'].lv === 2, '원한의 일격 L2 공격');
  ok(CARDS['RS-G1-2'].name === '피의 맹세' && CARDS['RS-G1-2'].type === 'def' && CARDS['RS-G1-2'].lv === 2 && G('RS-G1-2') === 'rare', '피의 맹세 L2 방어 · 레어');
  ok(CARDS['NG1-1'].name === '격노', '격노는 그대로'); }
// 원한의 일격: 소각장의 유닛 카드 수만큼 뒤 1칸 유닛 공격 + (마법 · 아이템은 세지 않음)
{ const P = [c.side(0, ['MG-04', 'G1-01', 'G1-03'], 30), c.side(1, ['G1-01'], 30)]; c.prep(P);
  P[0].burn = ['G1-01', 'G1-03', 'G1-04', 'SG1-02', 'M2-1']; c.setU(P[0].field[1], [2, 0, 5]); c.setU(P[0].field[2], [2, 0, 5]);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(P[0].field[1].t.a === 5 && P[0].field[2].t.a === 2, '원한의 일격: 소각장 유닛 3장 → 뒤 1칸 공 2 → 5, 그 뒤는 그대로 (' + P[0].field[1].t.a + ' / ' + P[0].field[2].t.a + ')'); }
{ const P = [c.side(0, ['MG-04', 'G1-01'], 30), c.side(1, ['G1-01'], 30)]; c.prep(P); P[0].burn = ['SG1-02'];
  c.setU(P[0].field[1], [2, 0, 5]); const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(P[0].field[1].t.a === 2, '원한의 일격: 소각장에 유닛이 없으면 그대로'); }
// 피의 맹세: 결속 → 쓰러지면 피가 뒤로(이어서) → 살아남은 유닛이 다음 턴 쓰러진 유닛 공격의 합만큼 +
{ const P = [c.side(0, ['RS-G1-2', 'G1-01', 'G1-03', 'G1-04', 'G1-01'], 30), c.side(1, [], 30)]; c.prep(P);
  const [, a, b, d, e] = P[0].field; c.setU(a, [2, 0, 5]); c.setU(b, [4, 0, 5]); c.setU(d, [0, 0, 5]); c.setU(e, [1, 0, 5]);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok([a, b, d, e].every(u => u.t.blood && u.t.blood.length === 1), '피의 맹세: 아군마다 피 1개');
  a.t.alive = false; c.ev('g1OathSweep')(X);
  ok(b.t.blood.length === 2 && a.t.blood.length === 0, '앞 유닛이 쓰러지면 피가 바로 뒤로: 2개 (' + b.t.blood.length + ')');
  b.t.alive = false; d.t.alive = false; c.ev('g1OathSweep')(X);
  ok(e.t.blood.length === 4, '뒤 유닛도 쓰러지면 받은 피까지 다시 뒤로(둘이 같이 쓰러져도 이어짐): 4개 (' + e.t.blood.length + ')');
  c.ev('g1OathEnd')(X); const kb = e.t.keep && e.t.keep.blood;
  ok(kb && kb.turn === 2 && kb.v.reduce((s, x) => s + x.a, 0) === 6 && kb.v.length === 3, '살아남은 유닛: 받은 피 3개(2 + 4 + 0) → 다음 턴 공격 +6, 자기 피는 값 없음 (' + JSON.stringify(kb) + ')');
  c.ev('resetTurn')(e); const base = c.ev('baseStats')(e, true).a;
  ok(e.t.a === base + 6, '다음 턴 준비(resetTurn): 공격 ' + base + ' + 6 = ' + e.t.a);
  c.ev('resetTurn')(e); ok(e.t.a === base + 6, '준비 중 다시 세워도(장착 등) 한 번만 더해짐');
  const X2 = c.ev('ctx')(P, 1, 2, []); c.ev('g1OathEnd')(X2); c.ev('resetTurn')(e);
  ok(!e.t.keep.blood && e.t.a === base, '그 다음 턴 전투가 끝나면 지워진다 (' + e.t.a + ')'); }
{ const P = [c.side(0, ['G1-01', 'RS-G1-2'], 30), c.side(1, [], 30)]; c.prep(P); const a = P[0].field[0];
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('castSpell')(X, 0, P[0].field[1], 2); a.t.alive = false; c.ev('g1OathSweep')(X); c.ev('g1OathEnd')(X);
  ok(a.t.blood.length === 0 && !(a.t.keep && a.t.keep.blood), '뒤에 아군이 없으면 피는 흩어진다'); }
// 실제 전투: 방어 턴에 앞 유닛이 쓰러지고 뒤 유닛이 피를 받아 살아남음
{ const P = [c.side(0, ['G1-01', 'G1-01', 'G1-01'], 30), c.side(1, ['RS-G1-2', 'G1-01', 'G1-03'], 30)]; c.prep(P);
  c.setU(P[0].field[0], [6, 0, 30]); c.setU(P[0].field[1], [0, 0, 30]); c.setU(P[0].field[2], [0, 0, 30]);
  const a = P[1].field[1], b = P[1].field[2]; c.setU(a, [3, 0, 4]); c.setU(b, [1, 0, 30]);
  c.ev('runCombatCore')(c.ev('ctx')(P, 0, 1, [], { seed: 3 }));
  const kb = b.t.keep && b.t.keep.blood;
  ok(!a.t.alive && b.t.alive && kb && kb.v.length === 1 && kb.v[0].a === 3, '전투: 맨 앞(공 3)이 쓰러져 피가 뒤로 → 다음 턴 +3 (' + JSON.stringify(kb) + ')'); }
console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}/${n} 통과`); process.exit(fails ? 1 : 0);
