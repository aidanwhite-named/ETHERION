// node tools/curse/test.js [-v] — v3.95 마족 [저주] 시험: [공포] · [역병](번짐) · [저주 면역] · [정화] · 핸드 저주 · 지옥불 · 빙의 · 정신 지배 · 컴퓨터 판단
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } else if (process.argv.includes('-v')) console.log('✓ ' + msg); };
c.ev(`var TU=8e6;
function side(idx, ids, life){ const f=ids.map(x=>{ if(!x) return null; const o=typeof x==='string'?{id:x}:x; return {uid:++TU,id:o.id,item:null}; });
  return {idx,name:'P'+idx,life:life==null?40:life,crystals:[],burn:[],reload:0,bonus:0,hand:[],field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for(const p of P) for(const it of p.field) if(it&&isUnit(it)) resetTurn(it); }
this.side=side; this.prep=prep;`);
const CARDS = c.ev('CARDS'), ev = s => c.ev(s), hp = u => ev('hpLeft')(u);
const X0 = (P, turn) => ev('ctx')(P, 0, turn, []);
const cast = (X, caster, it, k) => ev('castSpell')(X, caster, it, k);
const tick = X => ev('a1CurseTick')(X, () => {});
const cur = (u, kind) => ((u.t.keep && u.t.keep.curse && u.t.keep.curse[kind]) || []).reduce((s, e) => s + e.n, 0);

/* 카드: 5장이 [제물]을 내지 않음 · 이름 6글자 이하 · 레벨 L5 이하 */
const IDS = ['MA-01', 'PS-A1-2', 'MA-09', 'CS-A1', 'RS-A1-3', 'HA1-2', 'HA1-3'];
for (const id of IDS) { const x = CARDS[id]; ok(x && !(x.cost && x.cost.life) && x.name.replace(/ /g, '').length <= 6 && x.lv <= 5, `${id} ${x && x.name}: 제물 없음 · 이름 6글자 이하 · L${x && x.lv}`); }
ok(CARDS['MA-01'].name === '공포의 칼날' && CARDS['PS-A1-2'].name === '역병의 족쇄' && CARDS['MA-09'].name === '지옥불' && CARDS['CS-A1'].name === '침묵의 빙의' && CARDS['RS-A1-3'].name === '정신 지배', '새 이름');
ok(CARDS['CS-A1'].ops[0].op === 'negate', '침묵의 빙의는 [무효]를 남긴다');
{ const vm = require('vm'), L4 = require('../balance4/load.js'), g = vm.runInContext('gradeOf', L4), CD = vm.runInContext('CARDS', L4);
  ok(g(CD['RS-A1-3']) === 'rare' && g(CD['US-A1-2']) === 'rare' && g(CD['MA-09']) === 'common', '정신 지배 · 그림자 계약 레어 그대로'); }
ok(CARDS['US-A1-2'].ops.some(o => o.op === 'grant' && o.ab && o.ab.crit && o.ab.chain), '그림자 계약 [치명] · [연쇄] 그대로');
{ const pay = ev('CARD_LIST').filter(x => x.group === 'A1' && x.type !== 'unit' && x.type !== 'item' && x.cost && x.cost.life && !ev('RETIRED_CARDS')[x.id]).map(x => x.name);
  ok(pay.length <= 8, `마족 [제물] 마법 ${pay.length}장: ${pay.join(' · ')}`); }
ok(ev('spellKwDesc')('공포 3').includes('공격 −3') && ev('spellKwDesc')('역병 2').includes('특수능력') && ev('spellKwDesc')('저주').includes('정화'), '능력 글 [공포] · [역병] · [저주]');

/* [공포 3]: 걸린 턴에는 그대로, 다음 턴 전투 시작에 공격 −3 · 방어 −1 (드워프 방어 −2) */
{ const P = [c.side(0, ['MA-01']), c.side(1, ['B3-42', 'B2-06'])]; c.prep(P);
  const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  const g = P[1].field[0], d = P[1].field[1];
  ok(cur(g, 'fear') === 3 && cur(d, 'fear') === 3 && g.t.a === CARDS['B3-42'].a, '공포의 칼날: 맨 앞 2기 [공포 3], 걸린 턴은 그대로');
  c.prep(P); const X2 = X0(P, 2); tick(X2);
  ok(g.t.a === Math.max(0, CARDS['B3-42'].a - 3) && g.t.d === CARDS['B3-42'].d - 1, `공포 3: 공격 −3(0까지) · 방어 −1 (${g.t.a}/${g.t.d})`);
  ok(d.t.d === CARDS['B2-06'].d - 2, `드워프는 방어 −1 더 (${d.t.d})`);
  ok(cur(g, 'fear') === 0 && g.t.cursed && g.t.cursed.fear === 3, '발동한 공포는 꺼지고 이번 턴 t.cursed에 남음');
  c.prep(P); ok(g.t.d === CARDS['B3-42'].d && !g.t.cursed, '그다음 턴은 원래대로'); }
/* 같은 턴 다시 tick해도 이번 턴 걸린 저주는 발동하지 않음 */
{ const P = [c.side(0, ['MA-01']), c.side(1, ['B3-42'])]; c.prep(P); const X = X0(P, 4); cast(X, 0, P[0].field[0], 1); tick(X);
  ok(cur(P[1].field[0], 'fear') === 3, '걸린 그 턴에는 발동하지 않음'); }

/* [역병 2]: 다음 턴 특수능력 꺼짐, 양옆에 [역병 1] → 그다음 턴 이웃이 꺼지고 더 번지지 않음 */
{ const P = [c.side(0, ['PS-A1-2']), c.side(1, ['G2-04', 'G3-34', 'B3-42'])]; c.prep(P);
  const [a, m, b] = P[1].field; const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  ok(cur(m, 'plague') === 2 && m.t.a === CARDS['G3-34'].a - 2, '역병의 족쇄: 공격 최강 1기 공격 −2 · [역병 2]');
  c.prep(P); const X2 = X0(P, 2); tick(X2);
  ok(ev('abilOf')(m).thorns === 0 && m.t.thorns === 0 && m.t.cursed.plague, '역병: 이번 턴 특수능력([가시]) 꺼짐');
  ok(cur(a, 'plague') === 1 && cur(b, 'plague') === 1 && cur(m, 'plague') === 0, '역병 2 → 양옆에 [역병 1]');
  ok(ev('abilOf')(a).thorns === 1, '옮은 역병은 그 턴에 발동하지 않음');
  c.prep(P); ok(ev('abilOf')(m).thorns === 1, '그다음 턴 원래 유닛은 능력이 돌아옴');
  const X3 = X0(P, 3); tick(X3);
  ok(ev('abilOf')(a).thorns === 0 && ev('abilOf')(b).thorns === 0 && cur(m, 'plague') === 0, '역병 1: 이웃 능력 꺼짐 · 더 번지지 않음'); }

/* [저주 면역]: 걸리지 않음 · 받으면 걸린 저주가 사라짐 */
{ const P = [c.side(0, ['MA-01']), c.side(1, ['B3-42', 'B2-06'])]; c.prep(P); P[1].field[0].t.lock = true;
  const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  ok(cur(P[1].field[0], 'fear') === 0 && cur(P[1].field[1], 'fear') === 3, '[저주 면역] 유닛에는 공포가 걸리지 않음');
  const u = P[1].field[1]; ev('castSpell')(X, 1, { uid: 9e6, id: 'MA-08' }, 1);   // 맹세의 고정: 아군 맨 앞 2기 [저주 면역]
  ok(cur(u, 'fear') === 0, '[저주 면역]을 받으면 걸려 있던 공포가 사라짐'); }

/* [정화]: 유닛의 [정화]는 전투 시작에 자기 저주를 씻음 · 마법 [정화](mrPurge)도 씻음 */
{ const P = [c.side(0, ['MA-01']), c.side(1, ['A2-01', 'B3-42'])]; c.prep(P); const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  const pu = P[1].field[0]; ok(cur(pu, 'fear') === 3, '정화 유닛에도 걸림');
  c.prep(P); const X2 = X0(P, 2); ev('nwPurify')(X2); tick(X2);
  ok(cur(pu, 'fear') === 0 && pu.t.d === CARDS['A2-01'].d && !pu.t.cursed, '[정화] 유닛: 전투 시작에 공포를 씻어 발동하지 않음');
  ok(P[1].field[1].t.cursed && P[1].field[1].t.cursed.fear === 3, '정화 없는 유닛은 발동'); }
{ const P = [c.side(0, ['PS-A1-2']), c.side(1, ['G3-34'])]; c.prep(P); const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  const u = P[1].field[0]; ev('SPELL_OPS').mrPurge(X, 1, { uid: 9e6 + 1, id: 'SG3-03' }, 1, { area: { t: 'front', n: 1 } });
  ok(cur(u, 'plague') === 0, '마법 [정화](mrPurge)는 역병을 씻음'); }

/* 핸드 저주: 손끝 저주 [공포 3] → 전장에 오르면 첫 전투에 발동 · 저주 전염 [역병 2] 앞 2장 */
{ const P = [c.side(0, []), c.side(1, [])]; P[1].hand = [{ uid: 1, id: 'B2-06' }, { uid: 2, id: 'MA-01' }, { uid: 3, id: 'B3-42' }, { uid: 4, id: 'G3-34' }];
  const H = ev('HAND_OPS');
  H.handCurse.run(P[0], P[1], CARDS['HA1-2'].ops[0]);
  ok(P[1].hand[0].hc && P[1].hand[0].hc.fear === 3 && !P[1].hand[2].hc, '손끝 저주: 첫 유닛에 [공포 3]');
  H.handCurse.run(P[0], P[1], CARDS['HA1-3'].ops[0]);
  ok(P[1].hand[0].hc.plague === 2 && P[1].hand[2].hc.plague === 2 && !P[1].hand[3].hc, '저주 전염: 앞 유닛 2장에 [역병 2]');
  ok(H.handCurse.ai(P[0], P[1], CARDS['HA1-2'].ops[0]) > 0, '컴퓨터가 손끝 저주의 값을 본다');
  const u = P[1].hand[0]; P[1].field[0] = u; ev('resetTurn')(u);
  ok(cur(u, 'fear') === 3 && cur(u, 'plague') === 2, '전장에 오르면 저주가 유닛으로 옮음');
  ev('resetTurn')(u); ok(cur(u, 'fear') === 3, '다음 턴 resetTurn에 두 번 옮지 않음');
  { const h = P[1].hand[2], t0 = h.t; ev('resetTurn')(h); h.t = t0; ok(h.hc && h.hc.plague === 2, '컴퓨터가 미리 놓아 보고 되돌려도 핸드 저주가 남음'); }
  const X = X0(P, 5); tick(X);
  ok(u.t.cursed && u.t.cursed.fear === 3 && u.t.cursed.plague && u.t.d === CARDS['B2-06'].d - 2, '오른 그 턴 첫 전투에 발동(드워프 방어 −2)'); }

/* 지옥불: 방어가 가장 높은 1기 방어 D → −D · 체력 −D */
{ const P = [c.side(0, ['MA-09']), c.side(1, ['B3-42', 'B2-06'])]; c.prep(P); const u = P[1].field[0]; u.t.d = 3; u.t.h = 20;
  const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  ok(u.t.d === -3 && u.t.dmg === 3, `지옥불: 방어 3 → −3 · 피해 3 (${u.t.d} · ${u.t.dmg})`);
  ok(ev('hit')(4, u.t.d) === 7, '음수 방어는 맞붙음 피해를 늘린다(공 4 → 7)'); }
{ const P = [c.side(0, ['MA-09']), c.side(1, ['G2-04'])]; c.prep(P); const u = P[1].field[0]; const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  ok(u.t.dmg === 0 && u.t.d === 0, '방어 0이면 불이 붙지 않음'); }
{ const P = [c.side(0, ['MA-09']), c.side(1, ['B3-42'])]; c.prep(P); const u = P[1].field[0]; u.t.lock = true; const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  ok(u.t.d === 2 && u.t.dmg === 2, '[저주 면역]: 방어는 그대로 · 피해는 들어감'); }

/* 빙의: 남은 체력이 가장 높은 상대 → 전장 최저 레벨 다른 유닛의 남은 체력 */
{ const P = [c.side(0, ['CS-A1', 'B2-01']), c.side(1, ['B3-42', 'G3-34'])]; c.prep(P); const big = P[1].field[0], low = P[0].field[1];
  const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  ok(hp(big) === hp(low) && big.t.alive, `빙의: 체력 11 → 리벳 일꾼(L1)의 ${hp(low)} (${hp(big)})`); }
{ const P = [c.side(0, ['CS-A1', 'B2-01']), c.side(1, ['B3-42'])]; c.prep(P); P[1].field[0].t.lock = true; const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  ok(hp(P[1].field[0]) === CARDS['B3-42'].h, '[저주 면역]이면 빙의되지 않음'); }

/* 정신 지배: [저주]가 들었거나 L3 이하 · 공격 최강 → 이번 턴 내 편, 살아남으면 상대 맨 뒤로 */
{ const P = [c.side(0, ['RS-A1-3', 'B3-42']), c.side(1, ['B2-34', 'B1-02', 'B2-06'])]; c.prep(P);
  const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  const g = P[0].field.find(u => u && u.id === 'B1-02');
  ok(g && g.t.mind && !P[1].field.some(u => u && u.id === 'B1-02'), '정신 지배: L3 이하 중 공격 최강(화약 짐꾼 4)을 데려옴 — L7 거상은 아님');
  ev('a1MindEnd')(X);
  const back = P[1].field.filter(Boolean);
  ok(back[back.length - 1].id === 'B1-02' && !P[0].field.some(u => u && u.id === 'B1-02') && g.from == null && !g.t.mind, '살아남으면 상대 전장 맨 뒤로 돌아감'); }
{ const P = [c.side(0, ['RS-A1-3', 'B3-42']), c.side(1, ['B2-34', 'B1-02'])]; c.prep(P); const ti = P[1].field[0];
  (ti.t.keep.curse = { fear: [{ n: 3, t: 0, by: 0 }] });
  const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  ok(P[0].field.some(u => u === ti), '[저주]가 든 유닛은 레벨이 높아도 지배(거대 증기 거상 L7)'); }
{ const P = [c.side(0, ['RS-A1-3', 'B3-42']), c.side(1, ['B2-34'])]; c.prep(P); const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  ok(P[1].field[0].id === 'B2-34', '조건에 맞는 유닛이 없으면 아무 일 없음'); }
/* 전투째: 정신 지배한 유닛이 내 편으로 싸우고 살아남으면 돌아감(runCombatCore 끝) */
{ const P = [c.side(0, ['RS-A1-3', 'B2-32']), c.side(1, ['B2-06', 'B3-42'])]; c.prep(P);
  const X = ev('ctx')(P, 0, 1, [], { seed: 3 }); ev('runCombatCore')(X);
  ok(!P[0].field.some(u => u && u.id === 'B2-06') && P[1].field.some(u => u && u.id === 'B2-06' && u.t.alive) || P[1].burn.includes('B2-06'), '전투가 끝나면 지배 유닛은 상대 쪽(전장 또는 쓰러져 소각장)'); }

/* 전투째: 1턴에 건 공포가 2턴 전투가 시작될 때 발동(runCombatCore 흐름) */
{ const P = [c.side(0, ['MA-01']), c.side(1, ['B3-42', 'B2-06'])]; c.prep(P);
  let X = ev('ctx')(P, 0, 1, [], { seed: 5 }); ev('runCombatCore')(X);
  const g = P[1].field.find(u => u && u.id === 'B3-42'); ok(g && cur(g, 'fear') === 3, '1턴 전투: 공포가 걸림');
  c.prep(P); X = ev('ctx')(P, 1, 2, [], { seed: 5 }); const logs = []; X.log = (t) => logs.push(t);
  ev('runCombatCore')(X); ok(g.t.cursed && g.t.cursed.fear === 3 && cur(g, 'fear') === 0, '2턴 전투가 시작될 때 발동하고 꺼짐'); }
/* 컴퓨터 판단: 상태 복제에 저주가 실리고 점수에 들어감 */
{ const P = [c.side(0, ['MA-01']), c.side(1, ['B3-42', 'B2-06'])]; c.prep(P);
  const before = [ev('cloneSide')(P[0]), ev('cloneSide')(P[1])];
  const X = X0(P, 1); cast(X, 0, P[0].field[0], 1);
  const after = [ev('cloneSide')(P[0]), ev('cloneSide')(P[1])];
  ok(after[1].field[0].t.keep.curse.fear[0].n === 3, 'cloneSide에 keep.curse');
  ok(ev('a1CurseSum')(after[1]) === 3 && ev('evalScore')(before, after, 0) > ev('evalScore')(before, before, 0), `점수에 저주 무게 (${ev('a1CurseSum')(after[1])})`); }

console.log(fails ? `✗ ${fails}/${n} 실패` : `모두 통과 ${n}개`);
process.exitCode = fails ? 1 : 0;
