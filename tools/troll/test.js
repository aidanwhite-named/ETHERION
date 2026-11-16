// node tools/troll/test.js — v3.75 이끼 트롤: 갑옷째 조이기 (덩굴 조이기 · 뿌리 파고들기 · 갑옷째 휘감기, engine SPELL_OPS.armorCrush)
const path = require('path'); const { load } = require('../balance/harness');
const fs = require('fs'); const c = load(path.join(__dirname, '../../js'), fs.readFileSync(path.join(__dirname, '../../js/grades.js'), 'utf8'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } else if (process.argv.includes('-v')) console.log('✓ ' + msg); };
c.ev(`var TU=8e6;
function side(idx, ids){ const f=ids.map(id=>id?{uid:++TU,id,item:null}:null); return {idx,name:'P'+idx,life:40,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
/* 상대 유닛의 방어 · 체력을 정해 두고 마법 하나를 바로 쓴다. defs = [[방어, 체력, 저주 면역?] ...] */
this.cast=function(id, defs){ const P=[side(0,[id]), side(1,defs.map(()=> 'G2-30'))];
  for (const p of P) for (const it of p.field) if (it && isUnit(it)) resetTurn(it);
  P[1].field.forEach((u,i)=>{ if(!u) return; u.t.d=defs[i][0]; u.t.h=defs[i][1]; u.t.dmg=0; u.t.ward=0; u.t.shield=false; u.t.lock=!!defs[i][2]; });
  const X=ctx(P,0,1,[]); castSpell(X,0,P[0].field[0],1);
  return P[1].field.filter(Boolean).map(u=>({dmg:u.t.dmg, d:u.t.d, alive:u.t.alive})); };`);
const CARDS = c.ev('CARDS');
const card = (id, name, type, lv) => ok(CARDS[id].name === name && CARDS[id].type === type && CARDS[id].lv === lv && CARDS[id].group === 'G2', `${id} ${name} · ${type} · L${lv}`);
card('SG2-01', '덩굴 조이기', 'atk', 1);
card('NG2-1', '뿌리 파고들기', 'atk', 2);
card('MC-14', '갑옷째 휘감기', 'any', 3);
ok(c.ev('gradeOf("SG2-01")') === 'common' && c.ev('gradeOf("NG2-1")') === 'common' && c.ev('gradeOf("MC-14")') === 'common', '등급 그대로(일반)');
ok(c.ev('DECK_LISTS.G2.cards["SG2-01"]') === 1 && c.ev('DECK_LISTS.G2.cards["MC-14"]') === 2 && c.ev('DECK_LISTS.G2.cards["SG2-05"]') === 2 && c.ev('DECK_LISTS.G2.cards["SG2-08"]') === 1, '기본 덱: 덩굴 조이기 1 · 갑옷째 휘감기 2 · 수액 몰아주기 2 · 고목 내려찍기 1');   // v3.82 시뮬레이션 재구성: 덩굴 조이기 2 → 1 · v3.83 혼자 쓰는 고목 내려찍기가 세져 2 → 1
ok(Object.values(c.ev('DECK_LISTS.G2.cards')).reduce((a, b) => a + b) === 50, '기본 덱 50장');

// 덩굴 조이기: 방어가 가장 높은 1기에게 방어 ×2 (최소 2)
{ const r = c.cast('SG2-01', [[1, 20], [4, 20], [2, 20]]);
  ok(r[0].dmg === 0 && r[1].dmg === 8 && r[2].dmg === 0, '덩굴 조이기: 방어 4인 1기만 피해 8 (' + r.map(x => x.dmg) + ')');
  ok(r[1].d === 4, '덩굴 조이기는 방어를 깎지 않는다'); }
{ const r = c.cast('SG2-01', [[0, 20], [0, 20]]); ok(r[0].dmg === 2 && r[1].dmg === 0, '모두 방어 0이면 맨 앞에 최소 피해 2 (' + r.map(x => x.dmg) + ')'); }
{ const r = c.cast('SG2-01', [[5, 9]]); ok(!r[0].alive, '방어 5 · 체력 9 → 피해 10에 쓰러짐'); }

// 뿌리 파고들기: 방어 1 이상인 유닛 전체에 방어 +1
{ const r = c.cast('NG2-1', [[0, 20], [3, 20], [1, 20]]);
  ok(r[0].dmg === 0 && r[1].dmg === 4 && r[2].dmg === 2, '뿌리 파고들기: 방 0 → 0 · 방 3 → 4 · 방 1 → 2 (' + r.map(x => x.dmg) + ')'); }
{ const r = c.cast('NG2-1', [[0, 20], [0, 20]]); ok(r.every(x => x.dmg === 0), '방어가 모두 0이면 헛됨'); }

// 갑옷째 휘감기: 방어만큼 피해 + 방어 0
{ const r = c.cast('MC-14', [[3, 20], [0, 20], [2, 20, true]]);
  ok(r[0].dmg === 3 && r[0].d === 0, '갑옷째 휘감기: 방 3 → 피해 3 · 방어 0 (' + r[0].dmg + ', ' + r[0].d + ')');
  ok(r[1].dmg === 0 && r[1].d === 0, '방어 0인 유닛은 그대로');
  ok(r[2].dmg === 2 && r[2].d === 2, '[저주 면역]이면 피해는 들어가고 방어는 그대로 (' + r[2].dmg + ', ' + r[2].d + ')'); }

// 글 · 짧은 문구
ok(/방어가 가장 높은/.test(CARDS['SG2-01'].text) && /방어만큼 피해/.test(CARDS['MC-14'].text), '카드 글');

// 실제 전투: 공격 턴 1번 칸 갑옷째 휘감기 → 뒤에 오는 트롤 유닛이 방어 0이 된 드워프를 친다
{ c.ev(`this.fightT=function(){ const P=[side(0,['MC-14','G2-15']), side(1,['B2-32'])]; for(const p of P) for(const it of p.field) if(it&&isUnit(it)) { resetTurn(it); it.t.noCoin=true; }
    const D=P[1].field[0]; const d0=D.t.d; const X=ctx(P,0,1,[],{seed:3}); runCombatCore(X); return {d0, dmg:D.t.dmg, alive:D.t.alive, h:D.t.h}; }`);
  const r = c.fightT(); ok(r.d0 > 0 && (r.dmg >= r.d0 + 4 || !r.alive), `전투: 방 ${r.d0} 드워프가 휘감기 피해 + 맨몸으로 공격 4를 받음 (피해 ${r.dmg})`); }

// ---------- v3.76 콤보: 수액 몰아주기 · 고목 내려찍기 ----------
card('SG2-05', '수액 몰아주기', 'any', 1);
card('SG2-08', '고목 내려찍기', 'any', 3);
/* 아군 유닛 [체력…]과 상대 유닛 수를 정하고 마법들을 칸 순서대로 바로 쓴다 */
c.ev(`this.combo=function(ids, allyH, foeN){ const P=[side(0, ids.concat(allyH.map(()=> 'G2-30'))), side(1, Array(foeN).fill('G2-30'))];
  for (const p of P) for (const it of p.field) if (it && isUnit(it)) { resetTurn(it); it.t.dmg=0; it.t.ward=0; it.t.shield=false; it.t.taunt=false; }
  P[0].field.slice(ids.length).forEach((u,i)=>{ if(u) u.t.h=allyH[i]; });
  P[1].field.forEach(u=>{ if(u) u.t.h=30; });
  const X=ctx(P,0,1,[]); ids.forEach((id,i)=>castSpell(X,0,P[0].field[i],i+1));
  return { ally: P[0].field.slice(ids.length).filter(Boolean).map(u=>({hp:hpLeft(u), h:u.t.h, taunt:!!u.t.taunt, alive:u.t.alive})), foe: P[1].field.filter(Boolean).map(u=>u.t.dmg) }; };`);
{ const r = c.combo(['SG2-05'], [5, 9, 3], 2);
  ok(r.ally.map(u => u.hp).join() === '1,17,1', '수액 몰아주기: 체력 5 · 9 · 3 → 1 · 17(9 + 4 + 2 + 내준 2기 × 1) · 1 (' + r.ally.map(u => u.hp) + ')');
  ok(r.ally[1].taunt && !r.ally[0].taunt, '받는 쪽만 [수호]');
  ok(r.foe.every(x => x === 0), '수액 몰아주기는 상대를 치지 않는다'); }
// v3.82 혼자 써도 되게: 상대마다 체력 −(최고 체력 ÷ 2), 그 아군은 그만큼 잃는다
{ const r = c.combo(['SG2-08'], [4, 12], 3);
  ok(r.foe.join() === '6,6,6' && r.ally.map(u => u.hp).join() === '4,6', '고목 내려찍기: 체력 12 ÷ 2 → 상대마다 6, 그 유닛 체력 6 (' + r.foe + ' / ' + r.ally.map(u => u.hp) + ')'); }
{ const r = c.combo(['SG2-08'], [11], 2); ok(r.foe.join() === '5,5' && r.ally[0].hp === 6, '11 ÷ 2 = 5 (내림), 남은 체력 6'); }
{ const r = c.combo(['SG2-05', 'SG2-08'], [6, 8, 9], 3);
  // 몰아주기: 9 + 5 + 7 + 내준 2기 = 23 → 내려찍기 23 ÷ 2 = 11씩, 그 유닛 23 − 11 = 12
  ok(r.foe.join() === '11,11,11', '콤보: 몰아 받은 체력 23 ÷ 2 → 상대마다 11 (' + r.foe + ')');
  ok(r.ally.map(u => u.hp).join() === '1,1,12' && r.ally.every(u => u.alive), '콤보 뒤 내준 아군 1 · 받은 아군 12 (' + r.ally.map(u => u.hp) + ')'); }
{ const r = c.combo(['SG2-08'], [9], 0); ok(r.ally[0].hp === 9, '상대 유닛이 없으면 체력을 잃지 않는다'); }
// [재생]이 몰아주며 줄어든 체력을 도로 채운다(받은 피해로 친다)
{ const r = c.ev(`(function(){ const P=[side(0,['G2-30','G2-30']), side(1,[])]; for(const p of P) for(const it of p.field) if(it&&isUnit(it)) resetTurn(it);
    const u=P[0].field[1]; u.t.h=6; u.t.dmg=0; P[0].field[0].t.h=20; const X=ctx(P,0,1,[]);
    SPELL_OPS.hpGather(X,0,{uid:1,id:'SG2-05'},1,{bonus:1}); const a=hpLeft(u); u.t.gx=Object.assign(u.t.gx||{}, {regen:2}); nwRegenTick(X); return [a, hpLeft(u)]; })()`);
  ok(r[0] === 1 && r[1] === 3, '[재생 2]가 체력 1 → 3으로 채운다 (' + r + ')'); }
ok(/1만 남기고/.test(CARDS['SG2-05'].text) && /÷ 2/.test(CARDS['SG2-08'].text), '콤보 카드 글');

// ---------- v3.82 숲의 무게(MG-14): 아군 체력 합을 몫으로 맨 앞부터 공격 → 방어 → 체력 (v3.83), 남은 몫은 다음으로 ----------
card('MG-14', '숲의 무게', 'any', 3);
ok(c.ev('gradeOf("MG-14")') === 'uncommon', '숲의 무게 등급 그대로(고급)');
/* foes = [[공, 방, 체, 보호막?, 저주 면역?] ...] → 상대마다 'x'(쓰러짐) 또는 'a/d/h'(남은 공 · 방 · 체) */
c.ev(`this.weight=function(allyH, foes){ const P=[side(0, ['MG-14'].concat(allyH.map(()=> 'G2-30'))), side(1, foes.map(()=> 'G2-30'))];
  for (const p of P) for (const it of p.field) if (it && isUnit(it)) { resetTurn(it); it.t.dmg=0; it.t.ward=0; it.t.shield=false; it.t.taunt=false; }
  P[0].field.slice(1).forEach((u,i)=>{ if(u) u.t.h=allyH[i]; });
  P[1].field.forEach((u,i)=>{ if(!u) return; const f=foes[i]; u.t.a=f[0]; u.t.d=f[1]; u.t.h=f[2]; u.t.shield=!!f[3]; u.t.lock=!!f[4]; });
  const X=ctx(P,0,1,[]); castSpell(X,0,P[0].field[0],1);
  return P[1].field.filter(Boolean).map(u=>u.t.alive?u.t.a+'/'+u.t.d+'/'+hpLeft(u):'x'); };`);
{ const r = c.weight([10, 8], [[2, 2, 5], [1, 1, 6], [3, 0, 20]]);   // 몫 18: 공2 방2 체5 → 9 남음 · 공1 방1 체6 → 1 남음 · 공 3에서 1 깎고 끝
  ok(r.join() === 'x,x,2/0/20', '몫 18: 둘째까지 공 → 방 → 체로 쓰러뜨리고 남은 1은 셋째 공격에 (' + r + ')'); }
{ const r = c.weight([3], [[5, 2, 10]]); ok(r.join() === '2/2/10', '몫이 공격보다 작으면 공격만 깎인다 (' + r + ')'); }
{ const r = c.weight([20], [[0, 0, 5, true], [0, 0, 5]]); ok(r.join() === '0/0/5,0/0/5', '보호막에 막히면 거기서 멈춘다 (' + r + ')'); }
{ const r = c.weight([10], [[0, 3, 5, false, true], [0, 0, 9]]); ok(r.join() === 'x,0/0/7', '저주 면역은 방어가 그대로지만 그 몫(3)은 쓰인다: 10 − 3 − 5 = 2가 다음 유닛에게 (' + r + ')'); }
console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exit(fails ? 1 : 0);
