// node tools/goblin/test.js [-v] — v3.73 잿불 고블린 시험: [점화] · 화상 · [화염 갑주] · 도화선 · 기폭 · 불의 장막 · 연막탄 · 레어 오라
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } else if (process.argv.includes('-v')) console.log('✓ ' + msg); };
c.ev(`var TU=7e6;
function side(idx, ids, life){ const f=ids.map(x=>{ if(!x) return null; const o=typeof x==='string'?{id:x}:x; return {uid:++TU,id:o.id,item:o.item?{id:o.item,coins:[]}:null}; });
  return {idx,name:'P'+idx,life:life==null?40:life,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for(const p of P) for(const it of p.field) if(it&&isUnit(it)) resetTurn(it); }
function fight(P, ai, turn, seed){ prep(P); const X=ctx(P,ai,turn||1,[],{seed:seed||7}); runCombatCore(X); return X; }
this.side=side; this.fight=fight; this.prep=prep;`);
const CARDS = c.ev('CARDS'), ev = s => c.ev(s), hp = u => ev('hpLeft')(u), sc = u => (u.t.keep && u.t.keep.scorch) || 0;

/* 카드 데이터 */
ok(CARDS['B1-03'].gift.ignite === 1 && CARDS['B1-03'].a === 4 && CARDS['B1-03'].h === 1, '포연 척후병 L1 [점화 1] 4/0/1');
ok(CARDS['B1-41'].gift.farmor === 1 && CARDS['B1-03'].gift.ignite === 1, '1레벨 [점화] · 2레벨 [화염 갑주]');
ok(CARDS['B1-42'].gift.farmor === 1 && !CARDS['B1-42'].gift.thorns && CARDS['B1-43'].gift.farmor === 1 && !CARDS['B1-43'].gift.thorns, '고블린 가시 → 화염 갑주');
ok(CARDS['B1-22'].gift.ignite === 2 && CARDS['B1-31'].gift.ignite === 2 && !CARDS['B1-08'].gift.ranged && !CARDS['B1-02'].gift.shred, '화염방사병 · 포병 원수 [점화 2], 일반으로 내린 카드는 능력 없음');
ok(['B1-04', 'B1-09', 'B1-20'].every(id => ev('RETIRED_CARDS')[id] && !ev('CARD_LIST').some(x => x.id === id)), '레거시 3장(장전 수습생 · 고블린 포수 · 작렬 척탄대)');
ok(['B1-04', 'B1-09', 'B1-20'].every(id => !ev('STARTER_DECKS').B1[id] && !ev('HARD_DECKS').B1[id]), '기본 · 정예 덱에 레거시 없음');
{ /* 카드 풀: 다른 깃발처럼 고급 9장 이하 · 레벨마다 2장까지 · 일반 21~24 · 일반은 능력 없음 */
  const vm = require('vm'), L = require('../balance4/load.js'), g = vm.runInContext('gradeOf', L), CD = vm.runInContext('CARDS', L), R = vm.runInContext('RETIRED_CARDS', L);
  const us = Object.values(CD).filter(x => x.type === 'unit' && x.group === 'B1' && !R[x.id] && !x.base && !/^TK-/.test(x.id));
  const unc = us.filter(u => g(u) === 'uncommon'), com = us.filter(u => g(u) === 'common'), lv = {};
  for (const u of unc) lv[u.lv] = (lv[u.lv] || 0) + 1;
  ok(unc.length >= 6 && unc.length <= 9 && Object.values(lv).every(n => n <= 2) && Object.keys(lv).length === 7, `고급 ${unc.length}장 · 레벨마다 ${JSON.stringify(lv)}`);
  ok(com.length >= 21 && com.length <= 24 && com.every(u => !u.gift || !Object.keys(u.gift).length), `일반 ${com.length}장 · 능력 없음`);
  ok(unc.filter(u => u.gift.ignite).length === 4 && unc.filter(u => u.gift.farmor).length === 3, '고급: [점화] 4 · [화염 갑주] 3'); }
ok(CARDS['SP-B1'].gift.ignite === 2 && !CARDS['SP-B1'].gift.throw && CARDS['EP-B1-3'].gift.ignite === 2 && CARDS['PN-B1-E'].gift.ignite === 1, '고블린 [사격 N] → [점화 N]');
ok(CARDS['IR-B1'].item.ignite === 1 && !CARDS['IB1-5'].item.throw && CARDS['IB1-5'].item.ranged && CARDS['IB1-2'].item.throw === 2, '아이템 사격 → 점화, 투척은 그대로 (v3.80 화염포는 고급 서브 능력 [원거리])');
ok(ev('itemAbilities')(CARDS['B1-42'].gift).includes('[화염 갑주 1]') && ev('itemAbilities')(CARDS['B1-13'].gift).includes('[점화 1]'), '카드 글 [점화] · [화염 갑주]');
ok(!ev('SIM_UNITS').some(u => /B1/.test(u.id) && u.gift && u.gift.throw && u.gift.every), '고블린 유닛에 [사격] 없음');
ok(CARDS['SP-A3'].gift.throw && CARDS['SP-A3'].gift.every, '다른 깃발 [사격]은 그대로');
ok(ev('RARE_AURA').B1.eff.a === 1 && !ev('RARE_AURA').B1.eff.snipe, '레어 오라 [포격 지휘] 공격 +1');
ok(CARDS['MB-04'].name === '도화선' && CARDS['SB1-05'].name === '기폭' && CARDS['SB1-05'].type === 'any' && CARDS['SB1-03'].name === '불의 장막' && CARDS['SB1-03'].type === 'def' && CARDS['SB1-01'].type === 'def', '마법 4장 이름 · 종류');

/* [점화]: 체력이 가장 높은 상대에 화상, 그 자리 피해 없음 */
{ const P = [c.side(0, ['B1-03'], 30), c.side(1, ['G1-01', 'B1-43'], 30)]; const X = c.fight(P, 0, 1);
  const big = P[1].field.find(u => u && u.id === 'B1-43');
  ok(big && sc(big) === 1 && big.t.keep.scorchT === 1 && big.t.dmg === 0, '[점화 1] → 체력 최고 철갑 보루에 화상 1, 피해 0');
  // 같은 턴에는 터지지 않음
  ev('gbBurnTick')(X, () => {}); ok(sc(big) === 1, '붙은 턴에는 터지지 않음');
  // 다음 턴 전투 시작: 한 번 터지고 꺼짐
  ev('resetTurn')(big); const X2 = ev('ctx')(P, 1, 2, []); ev('gbBurnTick')(X2, () => {});
  ok(sc(big) === 0 && big.t.dmg === 1, '다음 턴 시작 때 체력 −1 · 꺼짐 (' + big.t.dmg + ')');
  ev('gbBurnTick')(ev('ctx')(P, 0, 3, []), () => {}); ok(big.t.dmg === 1, '한 번만 터짐'); }
/* 화상은 쌓인다 · 방어 무시 · 쓰러뜨리면 붙인 유닛 몫 */
{ const P = [c.side(0, ['B1-22'], 30), c.side(1, ['B2-24'], 30)]; c.prep(P); const f = P[1].field[0];
  const X = ev('ctx')(P, 0, 1, []); ev('gbScorch')(X, f, 2, P[0].field[0].uid); ev('gbScorch')(X, f, 2, P[0].field[0].uid);
  ok(sc(f) === 4, '화상 쌓임 2+2=4');
  const X2 = ev('ctx')(P, 1, 2, []); ev('gbBurnTick')(X2, () => {});
  ok(!f.t.alive && f.t.killer === P[0].field[0].uid, '방어 2 · 체력 3 유닛이 화상 4로 쓰러짐(방어 무시) · 붙인 유닛이 쓰러뜨림'); }
/* [화염 갑주] */
{ const P = [c.side(0, ['B1-36'], 30), c.side(1, ['B1-42'], 30)]; c.fight(P, 0, 1);
  const a = P[0].field[0]; ok(a && a.t.alive && sc(a) === 1, '[화염 갑주 1] 공격해 온 유닛에 화상 1 (' + (a && sc(a)) + ')'); }
{ const P = [c.side(0, [{ id: 'B1-36' }], 30), c.side(1, ['B1-42'], 30)]; c.prep(P); P[0].field[0].t.gx = { ranged: true };
  const X = ev('ctx')(P, 0, 1, [], { seed: 3 }); ev('runCombatCore')(X); ok(sc(P[0].field[0]) === 1, '원거리 공격자에게도 화상'); }
/* 도화선: 맨 앞 피해 1 · 화상 3 */
{ const P = [c.side(0, ['MB-04'], 30), c.side(1, ['B1-43', 'G1-01'], 30)]; c.prep(P);
  const X = ev('ctx')(P, 0, 1, []); ev('castSpell')(X, 0, P[0].field[0], 1); const f = P[1].field[0];
  ok(f.t.dmg === 1 && sc(f) === 3 && sc(P[1].field[1]) === 0, '도화선: 맨 앞 피해 1 · 화상 3'); }
/* 기폭: 맨 앞 화상 2 → 모두 터뜨림 (+2) */
{ const P = [c.side(0, ['SB1-05'], 30), c.side(1, ['B1-43', 'UP-B1-24', 'G1-01'], 30)]; c.prep(P);
  const X = ev('ctx')(P, 0, 1, []); const [f, s, t] = P[1].field; ev('gbScorch')(X, s, 1, null);
  ev('castSpell')(X, 0, P[0].field[0], 1);
  ok(f.t.dmg === 4 && s.t.dmg === 3 && t.t.dmg === 0 && sc(f) === 0 && sc(s) === 0, `기폭: 맨 앞 2+2=4 · 화상 1 유닛 1+2=3 · 화상 없는 유닛 그대로 (${f.t.dmg}/${s.t.dmg}/${t.t.dmg})`); }
/* 불의 장막: 맨 앞 2기 체력 +1 · [화염 갑주 2] */
{ const P = [c.side(0, ['SB1-03', 'B1-02', 'B1-12', 'B1-13'], 30), c.side(1, ['G1-01'], 30)]; c.prep(P);
  const X = ev('ctx')(P, 1, 1, []); const h0 = P[0].field[1].t.h; ev('castSpell')(X, 0, P[0].field[0], 1);
  const ab = u => ev('abilOf')(u).farmor;
  ok(ab(P[0].field[1]) === 2 && ab(P[0].field[2]) === 2 && !ab(P[0].field[3]) && P[0].field[1].t.h === h0 + 1, '불의 장막: 맨 앞 2기 체력 +1 · [화염 갑주 2]'); }
/* 연막탄: 뒤 3칸 공격 −2, 화상 있으면 −2 더 */
{ const P = [c.side(0, ['SB1-01'], 30), c.side(1, ['B1-31', 'B1-27', 'B1-26'], 30)]; c.prep(P);
  const X = ev('ctx')(P, 1, 1, []); const U = P[1].field.filter(Boolean), a0 = U.map(u => u.t.a); ev('gbScorch')(X, U[1], 1, null);
  ev('castSpell')(X, 0, P[0].field[0], 1); const d = U.map((u, i) => a0[i] - u.t.a);
  ok(d[0] === 2 && d[1] === 4 && d[2] === 2, '연막탄: 화상 있는 유닛만 공격 −4 (' + d + ')'); }
/* 레어 오라: 양옆 공격 +1 */
{ const P = [c.side(0, ['B1-02', 'PN-B1-R', 'B1-12'], 30), c.side(1, ['G1-01'], 30)]; c.prep(P);
  const a0 = [P[0].field[0].t.a, P[0].field[2].t.a]; const X = ev('ctx')(P, 0, 1, []); ev('rareAuraSync')(X);
  ok(P[0].field[0].t.a === a0[0] + 1 && P[0].field[2].t.a === a0[1] + 1, '[포격 지휘 1] 양옆 공격 +1'); }
/* 기본 덱 · 정예 덱 판 몇 개가 끝까지 돈다 */
(async () => {
  const SD = ev('STARTER_DECKS'), HD = ev('HARD_DECKS');
  let done = 0;
  for (const [i, b] of ['B2', 'G1', 'A1', 'G3'].entries()) {
    c.seed(500 + i);
    const g = await c.playHeadless({ p0: { name: 'A', group: 'B1', cards: i % 2 ? HD.B1 : SD.B1, isAI: true }, p1: { name: 'B', group: b, cards: SD[b], isAI: true } });
    if (g.winner === 0 || g.winner === 1) done++;
  }
  ok(done === 4, '고블린 덱 4판이 끝까지 돈다');
  console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}/${n} 통과`); process.exit(fails ? 1 : 0);
})();
