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

// ---------- 심판의 저울 ----------
{ const r = c.cast('SA2-07', [], [['A2-42'], ['A2-17', { bleed: 1 }], ['A2-41']]);   // 출혈 9/1/1 L4 · 출혈(걸어 줌) 2/2/6 L3 · 관통 5/0/1 L2
  ok(r[0].a === 4 && r[1].a === 2 && r[2].a === 5, '저울: 같은 [출혈] 둘 → 집행자 공 9 → 4(레벨), 심문관 2는 그대로(올리지 않음), 혼자인 [관통]은 그대로 (' + r.map(x => x.a) + ')'); }
{ const r = c.cast('SA2-07', [], [['A2-41'], ['A2-42']]); ok(r[0].a === 5 && r[1].a === 9, '같은 능력이 없으면 아무 일도 없다'); }

// ---------- 응보의 빛 ----------
c.ev(`this.fight=function(atk, def){ const P=[side(0,atk), side(1,def)]; prep(P); const X=ctx(P,0,1,[],{seed:5}); runCombatCore(X);
  return { blk: X.a2Blk ? X.a2Blk.v.slice() : [0,0], atk: P[0].field.filter(Boolean).map(u=>({id:u.id, dmg:u.t.dmg, alive:u.t.alive})), def: P[1].field.filter(Boolean).map(u=>({id:u.id, ward:u.t.ward, dmg:u.t.dmg})), logs: X.rec.flatMap(r=>r.logs.map(l=>l.t||l.text||String(l))).join('\\n') }; };`);
{ const r = c.fight(['A2-29', 'A2-33'], ['RS-A2-2', 'A2-33']);   // 방어 쪽 1번 칸 응보의 빛 → 아군 전체 가호 +1 (솔란테의 방패 가호 1 → 2)
  const ret = /응보의 빛\] P1이\(가\) 이번 턴 막은 피해 (\d+)/.exec(r.logs);
  ok(r.blk[1] >= 2, '가호로 막은 피해를 센다 (' + r.blk + ')');
  ok(ret && +ret[1] === r.blk[1], '전투가 끝날 때 막은 피해만큼 되돌린다 (' + (ret && ret[1]) + ')');
  const hit = Math.min(8, r.blk[1]); ok(r.atk.some(u => u.dmg >= hit), '체력이 가장 높은 상대 유닛이 체력 −' + hit); }
{ const r = c.ev(`(function(){ const P=[side(0,['RS-A2-2','A2-33']), side(1,['G2-30','A2-42'])]; prep(P); const X=ctx(P,1,1,[]);
    castSpell(X,0,P[0].field[0],1); const u=P[0].field[1]; u.t.shield=true; hurt(X,u,20); hurt(X,u,5); a2RetribEnd(X,()=>{});
    return [X.a2Blk.v[0], P[1].field.map(x=>x&&x.t.dmg)]; })()`);
  ok(r[0] === 22 && r[1][0] === 8, '보호막 20 + 가호 2 = 막은 피해 22 → 최대 8만 (' + r + ')'); }

// ---------- 유닛 능력 · 아이템 ----------
const G = id => CARDS[id].gift || {};
ok(G('A2-41').shred && G('A2-36').magic, '남긴 공격 능력: 광신 돌격병 [관통] · 새벽의 천사장 [방어무시]');
ok(G('A2-42').bleed === 1 && !G('A2-42').shred && !G('A2-17').bleed, '[출혈 1]: 천벌의 집행자만(빛의 심문관은 그대로)');
ok(G('A2-43').purify && !G('A2-43').shred && G('PN-A2-U2').ward === 1 && !G('PN-A2-U2').magic && G('A2-33').ward === 1, '[정화] 순교자 · [가호 1] 성가대 · 솔란테의 방패');
ok(CARDS['A2-43'].a === 10 && CARDS['A2-33'].h === 9 && !G('A2-21').ward, '스탯 맞춤: 순교자 공 10 · 솔란테의 방패 체력 9 · 맹세의 수호자 그대로');
{ const it = CARDS['IA2-1']; ok(it.name === '압수한 흑요검' && it.item.bleed === 1 && it.a === 1 && it.d === 0 && it.h === 1 && it.cls.includes('기도'), '압수한 흑요검 1/0/1 [출혈 1] · 무장 · 기도'); }
{ const cnt = k => Object.values(CARDS).filter(x => x.group === 'A2' && x.type === 'unit' && !x.retired && x.gift && x.gift[k]).length;
  ok(cnt('shred') === 1 && cnt('magic') === 1 && cnt('bleed') === 1, `천족 유닛 공격 능력: 관통 ${cnt('shred')} · 방어무시 ${cnt('magic')} · 출혈 ${cnt('bleed')}`); }

console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exit(fails ? 1 : 0);
