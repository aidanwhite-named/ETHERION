// node tools/celestial/test.js — v3.77 성광 천족: 침묵의 기도 · 구원의 빛 · 심판의 저울 · 응보의 빛 (engine 끝 "v3.77 성광 천족" 절) + 유닛 능력 손질
const path = require('path'); const { load } = require('../balance/harness');
const fs = require('fs'); const c = load(path.join(__dirname, '../../js'), fs.readFileSync(path.join(__dirname, '../../js/grades.js'), 'utf8'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } else if (process.argv.includes('-v')) console.log('✓ ' + msg); };
c.ev(`var TU=9e6;
function side(idx, ids){ const f=ids.map(id=>id?{uid:++TU,id,item:null}:null); return {idx,name:'P'+idx,life:40,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for (const p of P) for (const it of p.field) if (it && isUnit(it)) { resetTurn(it); it.t.noCoin=true; } }
/* 내 칸 mine(마법 + 유닛), 상대 유닛 foe([id, 걸어 줄 능력]) — 마법 하나를 바로 쓴다 */
this.cast=function(id, mine, foe){ const P=[side(0,[id].concat(mine)), side(1,foe.map(f=>f[0]))]; prep(P);
  P[1].field.forEach((u,i)=>{ if(u && foe[i][1]) u.t.gx=Object.assign({}, foe[i][1]); if(u && foe[i][2]) Object.assign(u.t, foe[i][2]); });
  const X=ctx(P,0,1,[]); castSpell(X,0,P[0].field[0],1);
  return P[1].field.filter(Boolean).map(u=>{ const ab=abilOf(u); return {id:u.id, a:u.t.a, d:u.t.d, h:u.t.h, hp:hpLeft(u), crit:!!ab.crit, shred:!!ab.shred, bleed:ab.bleed, ward:u.t.ward, shield:!!u.t.shield, red:u.t.redeemed||null}; }); };`);
const CARDS = c.ev('CARDS');
const card = (id, name, type, lv, gr) => ok(CARDS[id].name === name && CARDS[id].type === type && CARDS[id].lv === lv && CARDS[id].group === 'A2' && c.ev(`gradeOf("${id}")`) === gr, `${id} ${name} · ${type} · L${lv} · ${gr}`);
card('SA2-03', '침묵의 기도', 'def', 2, 'uncommon');
card('NA2-1', '구원의 빛', 'any', 3, 'common');
card('SA2-07', '심판의 저울', 'any', 2, 'common');
card('RS-A2-2', '응보의 빛', 'def', 3, 'rare');
{ const lore = fs.readFileSync(path.join(__dirname, '../../js/lore.js'), 'utf8'), cel = fs.readFileSync(path.join(__dirname, '../../js/celestial.js'), 'utf8');
  ok([['SA2-03', '침묵'], ['NA2-1', '빛이 내려앉은'], ['SA2-07', '저울']].every(([id, w]) => new RegExp('"' + id + '": "[^"]*' + w).test(lore)) && /칼날/.test(CARDS['RS-A2-2'].flavor) && (cel.match(/brief: "/g) || []).length === 7, '짧은 문구 · 서사(lore.js · 카드 설명)'); }

// ---------- 침묵의 기도 ----------
{ const r = c.cast('SA2-03', ['A2-05'], [['G2-30', { crit: true }, { shield: true, ward: 2 }], ['G2-30', { shred: true }], ['G2-30', { crit: true }]]);
  ok(!r[0].crit && !r[1].shred && r[2].crit, '침묵: 맨 앞 2기만 능력 꺼짐 (' + r.map(x => x.crit || x.shred) + ')');
  ok(!r[0].shield && r[0].ward === 0, '걸린 보호막 · 가호도 꺼짐'); }
{ const r = c.cast('SA2-03', ['A2-01'], [['G2-30', { crit: true }], ['G2-30', { shred: true }], ['G2-30', { crit: true }]]);
  ok(r.every(x => !x.crit && !x.shred), '아군에 [정화] 유닛(성광 견습생)이 있으면 상대 전체'); }

// ---------- 구원의 빛 ----------
{ const r = c.cast('NA2-1', ['A2-36'], [['G2-30'], ['A2-41'], ['A2-42']]);   // 아군 맨 앞 L7 · 상대: 능력 없음 · 관통 L2 · 출혈 L4
  ok(r[0].red === null && r[1].red === 'PN-A2-C1' && r[2].red === null, '구원: 능력 있는 맨 앞 1기(광신 돌격병)만 (' + r.map(x => x.red) + ')');
  ok(r[1].a === 0 && r[1].d === 2 && r[1].h === 4 && !r[1].shred, '새벽성 작은 성상 0/2/4 · 능력 없음 (' + [r[1].a, r[1].d, r[1].h] + ')'); }
{ const r = c.cast('NA2-1', ['A2-41'], [['A2-41'], ['A2-42']]);   // 아군 맨 앞 L2 → L2 · L4 모두 낮지 않음
  ok(r.every(x => x.red === null), '아군 맨 앞보다 레벨이 낮아야 한다(같으면 안 됨)'); }
{ const r = c.cast('NA2-1', ['A2-36'], [['A2-42', null, { dmg: 0 }]]); ok(r[0].hp === 4, '피해 없던 유닛은 체력 4'); }
{ const r = c.cast('NA2-1', ['A2-36'], [['G2-30', { crit: true }, { dmg: 9 }]]); ok(r[0].red && r[0].hp === 1, '받은 피해가 많아도 체력 1은 남는다 (' + r[0].hp + ')'); }
{ const r = c.cast('NA2-1', ['A2-36'], [['G2-30', { crit: true }, { lock: true }]]); ok(!r[0].red && r[0].crit, '[저주 면역]이면 막힌다'); }

// v3.90 카드 자체가 작은 성상이 된다(이름 · 레벨 · 능력) — 다음 턴엔 되돌아온다 · 쓰러지면 소각장엔 원래 카드
{ const r = c.ev(`(function(){ const P=[side(0,['NA2-1','A2-36']), side(1,['A2-41'])]; prep(P); const X=ctx(P,0,1,[]); castSpell(X,0,P[0].field[0],1);
    const u=P[1].field[0], now=[C(u).id, C(u).name, C(u).lv, !!abilOf(u).shred, u.id]; resetTurn(u); return now.concat([C(u).id, !!abilOf(u).shred]); })()`);
  ok(JSON.stringify(r) === JSON.stringify(['PN-A2-C1', '새벽성 작은 성상', 2, false, 'A2-41', 'A2-41', true]), '구원: 카드가 이번 턴 작은 성상(이름 · 레벨 · 능력 없음), 다음 턴 원래대로 (' + r + ')'); }
// ---------- 심판의 저울 ----------
{ const r = c.cast('SA2-07', [], [['A2-42'], ['A2-17', { bleed: 1 }], ['A2-41']]);   // 출혈 9/1/1 L4 · 출혈(걸어 줌) 2/2/6 L3 · 관통 5/0/1 L2
  ok(r[0].a === 5 && r[1].a === 0 && r[2].a === 5, '저울: 같은 [출혈] 둘 → 집행자 공 9 − L4 = 5, 심문관 2 − L3 → 0(0 아래로 안 내려감), 혼자인 [관통]은 그대로 (' + r.map(x => x.a) + ')'); }
{ const r = c.cast('SA2-07', [], [['A2-41'], ['A2-42']]); ok(r[0].a === 5 && r[1].a === 9, '같은 능력이 없으면 아무 일도 없다'); }

// ---------- 응보의 빛 ----------
c.ev(`this.fight=function(atk, def){ const P=[side(0,atk), side(1,def)]; prep(P); const X=ctx(P,0,1,[],{seed:5}); runCombatCore(X);
  return { blk: X.a2Blk ? X.a2Blk.v.slice() : [0,0], atk: P[0].field.filter(Boolean).map(u=>({id:u.id, dmg:u.t.dmg, alive:u.t.alive})), def: P[1].field.filter(Boolean).map(u=>({id:u.id, ward:u.t.ward, dmg:u.t.dmg})), logs: X.rec.flatMap(r=>r.logs.map(l=>l[0]||String(l))).join('\\n') }; };`);
{ const r = c.fight(['A2-29', 'A2-33'], ['RS-A2-2', 'A2-33']);   // 방어 쪽 1번 칸 응보의 빛 → 아군 전체 가호 +1 (솔란테의 방패 가호 1 → 2)
  const ret = /응보의 빛\] P1이\(가\) 이번 턴 막은 피해 (\d+)/.exec(r.logs);
  ok(r.blk[1] >= 2, '가호로 막은 피해를 센다 (' + r.blk + ')');
  ok(ret && +ret[1] === r.blk[1], '전투가 끝날 때 막은 피해만큼 되돌린다 (' + (ret && ret[1]) + ')');
  ok(ret && r.atk.some(u => u.dmg >= +ret[1]), '체력이 가장 높은 상대 유닛이 체력 −' + (ret && ret[1])); }
{ const r = c.ev(`(function(){ const P=[side(0,['RS-A2-2','A2-33']), side(1,['G2-30','A2-42'])]; prep(P); const X=ctx(P,1,1,[]);
    castSpell(X,0,P[0].field[0],1); const u=P[0].field[1]; u.t.shield=true; hurt(X,u,20); hurt(X,u,5); a2RetribEnd(X,()=>{});
    return [X.a2Blk.v[0], P[1].field.map(x=>x&&x.t.dmg)]; })()`);
  ok(r[0] === 22 && r[1][0] === 22, 'v3.90 상한 없음: 보호막 20 + 가호 2 = 막은 피해 22 → 22 그대로 (' + r + ')'); }

// ---------- 유닛 능력 · 아이템 ----------
const G = id => CARDS[id].gift || {};
ok(G('A2-41').shred && G('A2-36').magic, '남긴 공격 능력: 광신 돌격병 [관통] · 새벽의 천사장 [방어무시]');
ok(G('A2-42').bleed === 1 && !G('A2-42').shred && !G('A2-17').bleed, '[출혈 1]: 천벌의 집행자만(빛의 심문관은 그대로)');
ok(G('A2-43').purify && !G('A2-43').shred && G('PN-A2-U2').ward === 1 && !G('PN-A2-U2').magic && G('A2-33').ward === 1, '[정화] 순교자 · [가호 1] 성가대 · 솔란테의 방패');
ok(CARDS['A2-43'].a === 10 && CARDS['A2-33'].h === 9 && !G('A2-21').ward, '스탯 맞춤: 순교자 공 10 · 솔란테의 방패 체력 9 · 맹세의 수호자 그대로');
{ const it = CARDS['IA2-1']; ok(it.name === '압수한 흑요검' && it.item.bleed === 1 && it.a === 1 && it.d === 0 && it.h === 1 && it.cls.includes('기도'), '압수한 흑요검 1/0/1 [출혈 1] · 무장 · 기도'); }
{ const cnt = k => Object.values(CARDS).filter(x => x.group === 'A2' && x.type === 'unit' && !x.retired && x.gift && x.gift[k]).length;
  ok(cnt('shred') === 1 && cnt('magic') === 1 && cnt('bleed') === 1, `천족 유닛 공격 능력: 관통 ${cnt('shred')} · 방어무시 ${cnt('magic')} · 출혈 ${cnt('bleed')}`); }

// ---------- v3.95 빛의 심판 (RS-A2-1) · 성흔 (PS-A2-1, 전 대신 속죄) ----------
card('RS-A2-1', '빛의 심판', 'atk', 2, 'rare');
card('PS-A2-1', '성흔', 'def', 2, 'rare');
c.ev(`this.judge=function(mine, foe, setA, setF){ const P=[side(0,['RS-A2-1'].concat(mine)), side(1,foe)]; prep(P);
    P[0].field.filter(u=>u&&isUnit(u)).forEach((u,i)=>setA&&setA[i]&&Object.assign(u.t,setA[i]));
    P[1].field.filter(Boolean).forEach((u,i)=>setF&&setF[i]&&Object.assign(u.t,setF[i]));
    const X=ctx(P,0,1,[]); castSpell(X,0,P[0].field[0],1);
    return { ad: P[0].field.filter(u=>u&&isUnit(u)).map(u=>u.t.d), hp: P[1].field.filter(Boolean).map(u=>u.t.alive?hpLeft(u):'x') }; };`);
{ const r = c.judge(['A2-33', 'A2-01', 'A2-29'], ['A2-41', 'A2-05', 'G2-30']);   // 아군 방 2 · 2 · 1 → 합 4 / 상대 체 1 · 2 · 10
  ok(JSON.stringify(r.ad) === '[0,0,1]', '심판: 아군 맨 앞 2기만 방어 0 (' + r.ad + ')');
  ok(JSON.stringify(r.hp) === '["x","x",9]', '방어 합 4 → 맨 앞 체1 쓰러뜨리고 남은 3 → 체2 쓰러뜨리고 남은 1 → 다음 체10 −1 (' + r.hp + ')'); }
{ const r = c.judge(['A2-33', 'A2-01'], ['A2-41', 'A2-05'], null, [{ shield: true }]);
  ok(JSON.stringify(r.hp) === '[1,2]', '심판: 맨 앞이 [보호막]으로 막으면 남은 몫 없음 (' + r.hp + ')'); }
{ const r = c.judge(['A2-33', 'A2-01'], ['G2-30'], [{ lock: true }]);
  ok(JSON.stringify(r.ad) === '[2,0]' && r.hp[0] === 8, '심판: [저주 면역] 아군은 방어가 안 깎이고 셈에서 빠진다 (' + r.ad + ' / ' + r.hp + ')'); }
// 2026-11-22 대신 속죄 → 성흔: 맨 앞 2기 [가호 1] + 이번 턴 아군이 잃은 체력만큼 새벽빛
{ const r = c.ev(`(function(){ const P=[side(0,['PS-A2-1','A2-29','A2-33','A2-13']), side(1,['G2-30'])]; prep(P); P[0].light=0; const X=ctx(P,1,1,[]);
    const w0=P[0].field.slice(1,4).map(u=>u.t.ward||0); castSpell(X,0,P[0].field[0],1); const w1=P[0].field.slice(1,4).map(u=>u.t.ward||0);
    const u=P[0].field[3], hp=hpLeft(u); u.t.wardUsed=true; hurt(X,u,3); const a=P[0].light; hurt(X,u,99); const b=P[0].light;
    return [w1[0]-w0[0], w1[1]-w0[1], w1[2]-w0[2], a, b-a, hp]; })()`);
  ok(r[0] === 1 && r[1] === 1 && r[2] === 0, '성흔: 맨 앞 2기에게만 [가호 1] (' + r.slice(0, 3) + ')');
  ok(r[3] === 3 && r[4] === r[5] - 3, '성흔: 잃은 체력 3 → 새벽빛 3 · 넘친 피해는 남은 체력까지만 (' + r + ')'); }
{ const r = c.ev(`(function(){ const P=[side(0,['A2-29']), side(1,['PS-A2-1','A2-29'])]; prep(P); P[0].light=0; P[1].light=0; const X=ctx(P,0,1,[]);
    castSpell(X,1,P[1].field[0],1); P[0].field[0].t.wardUsed=true; hurt(X,P[0].field[0],4); const mine=P[0].light;
    const Y=ctx(P,0,1,[]); P[1].field[1].t.ward=0; hurt(Y,P[1].field[1],2); return [mine, P[1].light]; })()`);
  ok(r[0] === 0 && r[1] === 0, '성흔: 상대가 쓴 성흔은 내 빛이 아니고, 이번 전투에만 (' + r + ')'); }

console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exit(fails ? 1 : 0);
