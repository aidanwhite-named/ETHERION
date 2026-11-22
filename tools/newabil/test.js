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
ok(/\[재생 2\]/.test(CARDS['NG2-3'].text), '트롤의 재생 = 맨 앞 2기 [재생 2] (v3.94)');
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
// 2026-11-22 [재생]: 마법으로 체력이 깎인 유닛은 그 마법 바로 다음 맞붙음의 재생을 한 번 쉰다
{ const P = [c.side(0, ['MC-11', 'G2-01']), c.side(1, ['EP-G2-1', 'G2-01'])]; const X = c.X(P, 0); const t = P[1].field[0], v = P[1].field[1];   // 상대 마법 침묵: 맨 앞 2기 피해 3
  for (const u of [t, v]) { u.t.h = 20; u.t.ward = 0; u.t.shield = false; }
  c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(t.t.dmg === 3 && t.t.regenHold === true, '상대 마법에 체력이 깎이면 재생 쉼 표시 (' + t.t.dmg + ')');
  c.ev('nwRegenTick')(X); ok(t.t.dmg === 3 && !('regenHold' in t.t) && !('regenHold' in v.t), '마법 바로 다음 맞붙음: 재생하지 않고 표시는 꺼짐 (' + t.t.dmg + ')');
  c.ev('nwRegenTick')(X); ok(t.t.dmg === 2, '그다음 맞붙음부터는 재생 (' + t.t.dmg + ')'); }
{ const P = [c.side(0, ['SG2-08', 'EP-G2-1']), c.side(1, ['G2-01'])]; const X = c.X(P, 0); const t = P[0].field[1], f = P[1].field[0];   // 내 마법 고목 내려찍기: 체력 절반
  t.t.h = 10; f.t.h = 30; f.t.d = 1; f.t.ward = 0; f.t.shield = false;
  c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(t.t.dmg === 5 && t.t.regenHold === true, '고목 내려찍기로 낸 체력도 재생 쉼 (' + t.t.dmg + ')');
  c.ev('nwRegenTick')(X); ok(t.t.dmg === 5, '내려찍기 바로 다음 맞붙음: 재생 없음 (' + t.t.dmg + ')');
  c.ev('nwRegenTick')(X); ok(t.t.dmg === 4, '그다음 맞붙음: 재생 (' + t.t.dmg + ')'); }
{ const P = [c.side(0, ['SG2-02', 'EP-G2-1']), c.side(1, ['G2-01'])]; const X = c.X(P, 0); const t = P[0].field[1];   // 체력을 깎지 않는 마법(새순 갑옷)
  t.t.h = 20; t.t.dmg = 3; c.ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(!t.t.regenHold, '체력을 깎지 않는 마법은 재생을 막지 않는다');
  c.ev('nwRegenTick')(X); ok(t.t.dmg < 3, '마법 전에 받은 피해는 바로 재생 (' + t.t.dmg + ')'); }
{ const P = [c.side(0, ['MC-11', 'B2-07', 'B2-07', 'B2-07']), c.side(1, ['EP-G2-1'])]; c.prep(P);   // 전투: 침묵 → 첫 맞붙음은 쉼 → 둘째부터 재생
  P[1].field[0].t.h = 40; for (const u of P[0].field.slice(1)) if (u) u.t.h = 40;
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('runCombatCore')(X);
  const logs = [].concat(...X.rec.map(r => r.logs.map(l => l[0]))), i = logs.findIndex(l => /직후라 이번 맞붙음은 쉰다/.test(l)), j = logs.findIndex(l => /^\[재생 1\]/.test(l));
  ok(i >= 0 && j > i && logs.filter(l => /직후라 이번 맞붙음은 쉰다/.test(l)).length === 1, '전투: 마법 직후 첫 맞붙음만 쉬고 그 뒤 재생 (' + i + ' · ' + j + ')'); }
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
// [정화]: v3.90 자기만 씻는다(양옆은 그대로) · 출혈은 막지 않음 — 대신 천족 유닛 전체가 빛의 몸(출혈 −1)
{ const P = [c.side(0, ['G2-01', 'A2-13', 'G2-01', 'G2-01']), c.side(1, ['G2-01'])]; const X = c.X(P, 1); const f = P[0].field;
  f[0].t.keep = { scorch: 3, scorchT: 0 }; f[1].t.keep = { scorch: 2, scorchT: 0, ember: 0, brand: true }; f[2].t.keep = { ember: 0, brand: true };
  c.ev('nwPurify')(X);
  ok(f[1].t.keep.scorch === 0 && f[1].t.keep.ember == null && !f[1].t.keep.brand, '[정화] 자기의 화상 · 불씨 · 낙인을 지움');
  ok(f[0].t.keep.scorch === 3 && f[2].t.keep.ember === 0 && f[2].t.keep.brand, '[정화] 양옆은 그대로');
  const src = c.mk('G2-01'); c.ev('resetTurn')(src); src.t.gx = { bleed: 2 }; c.ev('abBleedOn')(X, src, f[1]); ok(f[1].t.bleed === 1, '[정화] 천족 유닛에도 출혈이 붙되 빛의 몸으로 −1 (' + f[1].t.bleed + ')');
  src.t.gx = { bleed: 1 }; c.ev('abBleedOn')(X, src, f[1]); ok(f[1].t.bleed === 1, '천족: [출혈 1]은 붙지 않음');
  c.ev('abBleedOn')(X, src, f[0]); ok(f[0].t.bleed === 1, '천족이 아닌 유닛은 출혈 그대로 (' + f[0].t.bleed + ')'); }
// [굳건]: 빼앗기 · 자리 바꾸기 · 행동 불가
{ const P = [c.side(0, ['G2-01']), c.side(1, ['B2-15', 'G2-01', 'G2-02'])]; const X = c.X(P, 0); const o = P[1];
  const firm = o.field[0]; c.ev('stealCard')(X, 0, null, firm); ok(o.field.includes(firm), '[굳건] 빼앗기지 않음');
  c.ev('SPELL_OPS').swapPos(X, 0, null, 1, {}); ok(o.field[0] === firm, '[굳건] 자리 바꾸기에도 제자리');
  c.ev('SPELL_OPS_2').mirror ? c.ev('SPELL_OPS_2').mirror(X, 0, null, 1, {}) : c.ev('SPELL_OPS').mirror(X, 0, null, 1, {}); ok(o.field[0] === firm, '[굳건] 뒤집기에도 제자리');
  c.ev('SPELL_OPS').sortFoe(X, 0, null, 1, {}); ok(o.field[0] === firm, '[굳건] 다시 세우기에도 제자리'); }
{ const r = c.ev(`(()=>{ const P=[side(0,['G2-01']), side(1,['B2-15'])]; prep(P); const X=ctx(P,0,1,[]); const u=P[1].field[0];
  const sp={uid:++TU,id:'SA3-05'}; const op={op:'rest',side:'foe',area:{t:'all'}}; if(nwFirmVs(X,0,u)) return 'firm'; return 'no'; })()`);
  ok(r === 'firm', '[굳건] 상대 행동 불가를 막음'); }
// 2026-11-22 [수호]는 상대의 공격 · 상대 마법에만: 내 "아군 맨 앞 N기"는 칸 순서, 상대 "맨 앞"은 [수호] 먼저
{ const P = [c.side(0, ['G2-01', 'G2-01', 'EP-B2-1']), c.side(1, ['G2-01', 'EP-B2-1'])]; const X = c.X(P, 0);
  const pick = (cs, side) => c.ev('pickTargets')(X, cs, side, { t: 'front', n: 1 }, 0)[0];
  ok(pick(0, 'ally') === P[0].field[0], '내 마법 아군 맨 앞 1기 = 1칸 ([수호] 무시)');
  ok(pick(0, 'foe') === P[1].field[1], '내 마법 상대 맨 앞 1기 = 상대 [수호]');
  ok(c.ev('pickTargets')(X, 0, 'ally', { t: 'front', n: 2 }, 0).every((u, i) => u === P[0].field[i]), '아군 맨 앞 2기 = 1 · 2칸');
  const me = P[0].field[0], a0 = me.t.a; c.ev('SPELL_OPS').drain(X, 0, { uid: 1 }, 0, { x: 1 }); ok(me.t.a > a0 || P[1].field[1].t.a <= 0, '착취: 아군 맨 앞(1칸)이 공격을 받음'); }
console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exit(fails ? 1 : 0);
