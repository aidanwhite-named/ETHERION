// node tools/newabil/test.js — v3.74 새 능력: [재생 N] · [방패 반격] · [수호] · [정화] · [굳건] · [요격] (js/newabil.js, engine "v3.74 새 능력")
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } };
c.ev(`var TU=7e6;
function mk(o){ o=typeof o==='string'?{id:o}:o; return {uid:++TU,id:o.id,item:o.item?{id:o.item,coins:[]}:null}; }
function side(idx, ids){ const f=ids.map(x=>x?mk(x):null); return {idx,name:'P'+idx,life:40,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for(const p of P) for(const it of p.field) if(it&&isUnit(it)) resetTurn(it); }
this.side=side; this.prep=prep; this.mk=mk;
this.X=(P,ai)=>{ prep(P); return ctx(P,ai,1,[]); };`);
const CARDS = c.ev('CARDS'), ab = id => c.ev(`abilOf({id:"${id}",item:null,t:null})`);
// 카드 데이터
ok(ab('EP-G2-1').regen === 1 && !ab('EP-G2-1').ward, '엉겅퀴 트렌트 [재생 1] (가호 뺌)');
ok(CARDS['IG2-3'].item.regen === 1 && !CARDS['IG2-3'].item.ward, '이끼 부적 [재생 1]');
ok(ab('B2-05').bash && !ab('B2-05').thorns, '두르크하임 견습공 [방패 반격] (가시 뺌)');
ok(ab('EP-B2-1').thorns === 1 && ab('EP-B2-1').taunt && !ab('EP-B2-1').ward, '리벳 가시 골렘 [가시 1] [수호]');
ok(ab('B2-15').firm && !ab('B2-15').shred, '강철 대장장이 [굳건] (관통 뺌)'); ok(ab('B2-42').shred && !ab('B2-42').firm, '과열 압착기는 [관통] 그대로');
ok(ab('A2-13').purify && !ab('A2-13').thorns, '성광 기사 [정화] (가시 뺌)');
ok(ab('EP-B3-1').intercept && !ab('EP-B3-1').snipe && ab('EP-B3-1').amp === 1, '볼타리움 방전수 [요격] [증폭 1] (사격 뺌)');
ok(/\[재생 1\]/.test(CARDS['NG2-3'].text), '트롤의 재생 = [재생 1]');
for (const k of ['[재생 1]', '[방패 반격]', '[수호]', '[정화]', '[굳건]', '[요격]']) ok(c.ev(`itemKwDesc(${JSON.stringify(k)})`).length > 8 && c.ev(`itemKwCard(${JSON.stringify(k)})`), k + ' 뜻 글');
ok(c.ev('itemAbilities(CARDS["IR-B2"].item)').includes('[굳건]'), '아다만트 장갑판 칩 [굳건]');

// [재생]: 맞붙음 시작마다 체력 · 깎인 방어
{ const P = [c.side(0, ['G2-01']), c.side(1, ['EP-G2-1', 'G2-01'])]; const X = c.X(P, 0); const t = P[1].field[0];
  t.t.dmg = 3; t.t.d = 0; c.ev('nwRegenTick')(X);
  ok(t.t.dmg === 2 && t.t.d === 1, '[재생 1] 체력 +1 · 방어 0 → 1 (' + t.t.dmg + '/' + t.t.d + ')');
  c.ev('nwRegenTick')(X); ok(t.t.dmg === 1 && t.t.d === 1, '방어는 카드 값(1)까지만 (' + t.t.d + ')');
  t.t.keep = { scorch: 2, scorchT: 1 }; c.ev('nwRegenTick')(X); ok(t.t.dmg === 1, '화상이 붙으면 재생 멈춤');
  t.t.keep = { ember: 0 }; c.ev('nwRegenTick')(X); ok(t.t.dmg === 1, '불씨가 붙으면 재생 멈춤');
  t.t.keep = {}; t.t.dmg = 0; c.ev('nwRegenTick')(X); ok(t.t.dmg === 0, '다치지 않았으면 그대로'); }
// 전투에서: 방어 턴 트롤 맨 앞이 여러 번 맞으며 재생
{ const P = [c.side(0, ['B2-07', 'B2-07', 'B2-07']), c.side(1, ['EP-G2-1'])]; c.prep(P);
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('runCombatCore')(X); ok(/\[재생 1\]/.test(JSON.stringify(X.rec)), '전투 기록에 [재생]'); }
// [방패 반격]: 반격 피해 + 방어
{ const P = [c.side(0, ['G2-01']), c.side(1, ['B2-05'])]; const X = c.X(P, 0); const a = P[0].field[0], d = P[1].field[0];
  a.t.h = 30; a.t.d = 0; a.t.noCoin = true; d.t.noCoin = true; d.t.h = 30; d.t.a = 1; d.t.d = 3; c.ev('attackOne')(X, a);
  ok(a.t.dmg === 1 + 3, '[방패 반격] 공 1 + 방 3 = 반격 4 (' + a.t.dmg + ')'); }
{ const P = [c.side(0, ['G2-01']), c.side(1, ['B2-05'])]; const X = c.X(P, 1); const a = P[1].field[0], d = P[0].field[0];
  a.t.a = 1; a.t.d = 3; a.t.noCoin = true; d.t.noCoin = true; d.t.h = 30; d.t.d = 0; d.t.a = 0; c.ev('attackOne')(X, a); ok(d.t.dmg === 1, '공격할 때는 방어를 더하지 않음 (' + d.t.dmg + ')'); }
// [수호]: 맨 앞이 아니어도 먼저 맞는다
{ const P = [c.side(0, ['G2-01']), c.side(1, ['G2-01', 'EP-B2-1'])]; c.prep(P);
  ok(c.ev('queueOf')(P[1])[0] === P[1].field[1], '[수호] 유닛이 대기열 맨 앞'); }
// [요격]: 원거리에게도 반격
{ const P = [c.side(0, [{ id: 'G2-01' }]), c.side(1, ['EP-B3-1'])]; const X = c.X(P, 0); const a = P[0].field[0], d = P[1].field[0];
  a.t.gx = { ranged: true }; a.t.h = 30; a.t.d = 0; d.t.h = 30; c.ev('attackOne')(X, a); ok(a.t.dmg > 0, '[요격] 원거리 공격자도 반격받음 (' + a.t.dmg + ')'); }
{ const P = [c.side(0, [{ id: 'G2-01' }]), c.side(1, ['G2-01'])]; const X = c.X(P, 0); const a = P[0].field[0], d = P[1].field[0];
  a.t.gx = { ranged: true }; a.t.h = 30; d.t.h = 30; c.ev('attackOne')(X, a); ok(a.t.dmg === 0, '요격 없으면 원거리는 반격 없음'); }
// [정화]: 자기와 양옆의 화상 · 불씨 · 낙인을 지우고, 출혈이 안 붙음
{ const P = [c.side(0, ['G2-01', 'A2-13', 'G2-01', 'G2-01']), c.side(1, ['G2-01'])]; const X = c.X(P, 1); const f = P[0].field;
  f[0].t.keep = { scorch: 3, scorchT: 0 }; f[2].t.keep = { ember: 0, brand: true }; f[3].t.keep = { scorch: 2, scorchT: 0 };
  c.ev('nwPurify')(X);
  ok(f[0].t.keep.scorch === 0 && f[2].t.keep.ember == null && !f[2].t.keep.brand, '[정화] 양옆의 화상 · 불씨 · 낙인을 지움');
  ok(f[3].t.keep.scorch === 2, '두 칸 떨어진 유닛은 그대로');
  const src = c.mk('G2-01'); c.ev('resetTurn')(src); src.t.gx = { bleed: 2 }; c.ev('abBleedOn')(X, src, f[1]); ok(!f[1].t.bleed, '[정화] 유닛에게는 출혈이 붙지 않음'); }
// [굳건]: 빼앗기 · 자리 바꾸기 · 행동 불가
{ const P = [c.side(0, ['G2-01']), c.side(1, ['B2-15', 'G2-01', 'G2-02'])]; const X = c.X(P, 0); const o = P[1];
  const firm = o.field[0]; c.ev('stealCard')(X, 0, null, firm); ok(o.field.includes(firm), '[굳건] 빼앗기지 않음');
  c.ev('SPELL_OPS').swapPos(X, 0, null, 1, {}); ok(o.field[0] === firm, '[굳건] 자리 바꾸기에도 제자리');
  c.ev('SPELL_OPS_2').mirror ? c.ev('SPELL_OPS_2').mirror(X, 0, null, 1, {}) : c.ev('SPELL_OPS').mirror(X, 0, null, 1, {}); ok(o.field[0] === firm, '[굳건] 뒤집기에도 제자리');
  c.ev('SPELL_OPS').sortFoe(X, 0, null, 1, {}); ok(o.field[0] === firm, '[굳건] 다시 세우기에도 제자리'); }
{ const r = c.ev(`(()=>{ const P=[side(0,['G2-01']), side(1,['B2-15'])]; prep(P); const X=ctx(P,0,1,[]); const u=P[1].field[0];
  const sp={uid:++TU,id:'SA3-05'}; const op={op:'rest',side:'foe',area:{t:'all'}}; if(nwFirmVs(X,0,u)) return 'firm'; return 'no'; })()`);
  ok(r === 'firm', '[굳건] 상대 행동 불가를 막음'); }
console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exit(fails ? 1 : 0);
