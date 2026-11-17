// node tools/celestial/dawn_test.js — v3.86 성광 천족 역전 콤보: 인내의 기도 · 새벽의 해방 · 순교의 서약 (engine 끝 "v3.86 성광 천족: 새벽빛 · 순교" 절)
const path = require('path'); const { load } = require('../balance/harness');
const fs = require('fs'); const c = load(path.join(__dirname, '../../js'), fs.readFileSync(path.join(__dirname, '../../js/grades.js'), 'utf8'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } else if (process.argv.includes('-v')) console.log('✓ ' + msg); };
c.ev(`var TU=8e6;
function side(idx, ids){ const f=ids.map(id=>id?{uid:++TU,id,item:null}:null); return {idx,name:'P'+idx,life:40,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for (const p of P) for (const it of p.field) if (it && isUnit(it)) { resetTurn(it); it.t.noCoin=true; } }
this.mk=function(a, b, ai){ const P=[side(0,a), side(1,b)]; prep(P); return { P, X: ctx(P, ai||0, 1, []) }; };`);
const CARDS = c.ev('CARDS');
const card = (id, name, type, lv, gr) => ok(CARDS[id].name === name && CARDS[id].type === type && CARDS[id].lv === lv && CARDS[id].group === 'A2' && c.ev(`gradeOf("${id}")`) === gr, `${id} ${name} · ${type} · L${lv} · ${gr}`);
card('SA2-02', '인내의 기도', 'any', 1, 'common');
card('MA-10', '순교의 서약', 'def', 2, 'common');
card('MA-14', '새벽의 해방', 'any', 3, 'common');
{ const cel = fs.readFileSync(path.join(__dirname, '../../js/celestial.js'), 'utf8');   // 짧은 문구(SPELL_BRIEF)는 briefs.js 다음 celestial.js가 덮는다 — 균형 도구는 briefs.js를 읽지 않음
  const br = id => { const k = cel.indexOf('"' + id + '": {'); const m = k < 0 ? null : /brief: "([^"]*)"/.exec(cel.slice(k)); return m ? m[1] : ''; };
  ok(br('SA2-02').includes('새벽빛') && br('MA-10').includes('보호막') && br('MA-14').includes('새벽빛'), '짧은 문구'); }
ok(/어둠/.test(CARDS['SA2-02'].flavor) && /서약한 기사/.test(CARDS['MA-10'].flavor) && /동녘/.test(CARDS['MA-14'].flavor), '설명 글');

// ---------- 인내의 기도: 새벽빛 켜기 + 맨 앞 2기 [가호 1] ----------
{ const r = c.ev(`(function(){ const {P,X}=mk(['SA2-02','A2-05','A2-15','A2-13'],['G2-30']); castSpell(X,0,P[0].field[0],1);
    const w=P[0].field.slice(1,4).map(u=>u.t.ward); const l1=P[0].light; P[0].light=5; castSpell(X,0,P[0].field[0],1); return [l1, P[0].light, w]; })()`);
  ok(r[0] === 0, '처음 쓰면 새벽빛 0으로 켜진다 (' + r[0] + ')');
  ok(r[1] === 5, '다시 써도 모은 빛은 그대로 (' + r[1] + ')');
  ok(r[2][0] >= 1 && r[2][1] >= 1 && !r[2][2], '맨 앞 2기에게만 [가호 1] (' + r[2] + ')'); }

// ---------- 모이는 곳 ----------
{ const r = c.ev(`(function(){ const {P,X}=mk(['A2-15','A2-13'],['G2-30']); const u=P[0].field[0];
    u.t.shield=true; hurt(X,u,5); const off=P[0].light;   // 켜지지 않았으면 모이지 않음
    P[0].light=0; u.t.shield=true; hurt(X,u,5); const a=P[0].light; u.t.ward=2; u.t.wardUsed=false; hurt(X,u,3); const b=P[0].light;
    u.t.shield=true; hurt(X,u,30); u.t.shield=true; hurt(X,u,30); return [off, a, b, P[0].light]; })()`);
  ok(r[0] === undefined, '인내의 기도 전에는 모이지 않는다 (' + r[0] + ')');
  ok(r[1] === 5 && r[2] === 7, '보호막으로 막은 5 · 가호로 막은 2 (' + r[1] + ' · ' + r[2] + ')');
  ok(r[3] === 37, '최대 37 (' + r[3] + ')'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['A2-01','A2-15'],['G2-30']); P[0].light=0; P[0].field[1].t.keep={scorch:3,ember:2}; P[0].field[0].t.keep={scorch:2,ember:1,brand:true}; nwPurify(X); return [P[0].light, P[0].field[1].t.keep.scorch]; })()`);
  ok(r[0] === 4 && r[1] === 3, '[정화] 유닛 1기 +1 · 씻은 화상 · 불씨 · 낙인 하나마다 1 · 양옆은 안 씻음 (' + r + ')'); }
// v3.90 새벽빛 잇기: 전투가 시작될 때 [정화] 유닛 하나마다 +1(씻을 것이 없어도) · 인내의 기도 전에는 없음 · 상대 [정화] 유닛은 내 빛이 아님
{ const r = c.ev(`(function(){ const {P,X}=mk(['A2-01','A2-15','A2-43','A2-13'],['A2-01']); const off=(nwPurify(X), P[0].light); P[0].light=0; P[1].light=0; nwPurify(X); return [off, P[0].light, P[1].light]; })()`);
  ok(r[0] === undefined && r[1] === 3 && r[2] === 1, '[정화] 유닛 3기 +3 · 상대 쪽은 상대 빛 · 인내 전에는 없음 (' + r + ')'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['A2-15'],['G2-30']); P[0].light=1; a2LightStart(X); P[0].life-=9; P[0].life+=2; a2LightEnd(X);
    const a=P[0].light; a2LightStart(X); P[0].life-=1; a2LightEnd(X); return [a, P[0].light]; })()`);
  ok(r[0] === 4, '턴마다 깎인 생명(순손실 7)의 절반 3 (' + r[0] + ')');
  ok(r[1] === 4, '1만 깎이면 0 (' + r[1] + ')'); }

// ---------- 새벽의 해방 ----------
{ const r = c.ev(`(function(){ const {P,X}=mk(['MA-14'],['A2-02','A2-42','A2-15']); P[0].light=12; P[0].life=30; P[1].life=30;   // 상대: 1/1/2 · 9/1/1 · 4/1/6
    castSpell(X,0,P[0].field[0],1); return { light:P[0].light, life:P[0].life, u:P[1].field.filter(Boolean).map(u=>[u.id,hpLeft(u),u.t.alive]) }; })()`);
  ok(r.light === 0, '새벽빛을 모두 쓴다 (' + r.light + ')');
  const u = Object.fromEntries(r.u.map(x => [x[0], x]));
  ok(!u['A2-42'][2] && !u['A2-15'][2] && !u['A2-02'][2], '공격 높은 순(9 → 4 → 1)으로 쓰러뜨리며 남은 몫을 넘긴다 (' + JSON.stringify(r.u) + ')');
  ok(r.life === 30 + 12 - 1 - 6 - 2, '그래도 남은 빛은 생명으로 (' + r.life + ')'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['MA-14'],['A2-15','A2-42']); P[0].light=3; castSpell(X,0,P[0].field[0],1); return [P[1].field[0].t.alive, P[1].field[1].t.alive, hpLeft(P[1].field[1]), P[0].life]; })()`);
  ok(r[0] && !r[1] && r[2] === 0 && r[3] === 40, '공격이 가장 높은 유닛부터: 9/1/1이 쓰러지고 남은 2가 4/1/6에게, 생명으로 올 몫 없음 (' + r + ')'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['MA-14'],['A2-42']); P[0].life=50; P[0].light=6; castSpell(X,0,P[0].field[0],1); return P[0].life; })()`);
  ok(r === 50, '생명은 상한(50)까지만 (' + r + ')'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['MA-14'],['A2-42']); castSpell(X,0,P[0].field[0],1); return [P[0].light, P[1].field[0].t.alive]; })()`);
  ok(r[0] === undefined && r[1], '새벽빛을 모으지 않았으면 아무 일도 없다'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['MA-14'],['A2-15','A2-42']); P[0].light=2; P[0].life=30; P[1].life=37; castSpell(X,0,P[0].field[0],1); return [P[1].field[1].t.alive, hpLeft(P[1].field[0]), P[0].life, P[0].light]; })()`);
  ok(!r[0] && r[1] === 0 && r[2] === 30 + 2 && r[3] === 0, '밀린 생명 7을 더해 9: 9/1/1 −1 → 4/1/6 −6 → 남은 2는 생명 (' + r + ')'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['MA-14'],['A2-15']); P[0].light=0; P[0].life=30; P[1].life=34; castSpell(X,0,P[0].field[0],1); return hpLeft(P[1].field[0]); })()`);
  ok(r === 2, '새벽빛 0이어도 생명이 밀린 만큼(4)은 푼다 (' + r + ')'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['MA-14'],['A2-15']); P[0].life=30; P[1].life=40; castSpell(X,0,P[0].field[0],1); return hpLeft(P[1].field[0]); })()`);
  ok(r === 6, '인내의 기도를 쓰지 않았으면 밀려도 아무 일도 없다 (' + r + ')'); }

// ---------- 순교의 서약 ----------
{ const r = c.ev(`(function(){ const {P,X}=mk(['MA-10','A2-15','A2-13','A2-14','A2-16'],['G2-30']); castSpell(X,0,P[0].field[0],1);
    const f=P[0].field; f[2].t.alive=false; f[3].t.alive=false; a2MartyrSweep(X);   // 가운데 두 유닛이 함께 쓰러짐
    return f.slice(1,5).map(u=>!!u.t.shield); })()`);
  ok(r[0] && !r[1] && !r[2] && r[3], '쓰러진 유닛 양옆(쓰러진 것은 건너뜀)의 살아 있는 아군에게 [보호막] (' + r + ')'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['A2-15','A2-13','A2-14'],['G2-30']); const f=P[0].field; f[1].t.alive=false; a2MartyrSweep(X); return f.map(u=>u&&!!u.t.shield).slice(0,3); })()`);
  ok(!r[0] && !r[2], '서약이 없으면 아무 일도 없다'); }
{ const r = c.ev(`(function(){ const {P,X}=mk(['A2-15','A2-13'],['MA-10','A2-15','A2-13']); castSpell(X,1,P[1].field[0],1); P[0].field[0].t.alive=false; a2MartyrSweep(X); return !!P[0].field[1].t.shield; })()`);
  ok(!r, '상대 유닛이 쓰러질 때는 아니다'); }

// ---------- 판 내내 남는다: 전투 복제 · 기록 · 수 읽기 ----------
{ const r = c.ev(`(function(){ const {P,X}=mk(['A2-29','A2-29'],['SA2-02','A2-33','A2-33'],0); const X2=ctx(P,0,1,[],{seed:3}); runCombatCore(X2);
    const last=X2.rec[X2.rec.length-1].snap.players[1]; return [last.light, P[1].light, cloneSide(P[1]).light, JSON.parse(JSON.stringify({light:P[1].light})).light]; })()`);
  ok(r[0] != null && r[0] === r[1] && r[2] === r[1] && r[3] === r[1], '기록(snap) · cloneSide · JSON 복제가 새벽빛을 싣는다 (' + r + ')');
  ok(r[1] >= 1, '방어 쪽이 인내의 기도를 쓰고 그 턴 막은 만큼 모았다 (' + r[1] + ')'); }
{ const g = fs.readFileSync(path.join(__dirname, '../../js/game.js'), 'utf8');
  ok(/function cloneForCombat[^\n]*\n[^\n]*light: p\.light/.test(g) && /s\.light != null\) p\.light = s\.light/.test(g), 'game.js cloneForCombat · applySnap이 새벽빛을 싣는다'); }

// v3.90 빛 알갱이: 새벽빛이 오를 때 빛이 난 곳(막은 유닛 · 정화 유닛 · 생명판)에서 "lightmote to-i" 글자를 남긴다(화면 전용)
{ const r = c.ev(`(function(){ const {P,X}=mk(['A2-01','A2-15'],['G2-30']); X.rec=[]; X.floats=[]; X.logs=[]; X.deaths=[]; P[0].light=0;
    const u=P[0].field[1]; u.t.shield=true; hurt(X,u,4); nwPurify(X); a2LightStart(X); P[0].life-=6; a2LightEnd(X);
    return X.floats.filter(f=>/lightmote/.test(f[2])).map(f=>[String(f[0])===String(u.uid)?'blk':String(f[0])===String(P[0].field[0].uid)?'pur':f[0], f[1], f[2]]); })()`);
  ok(JSON.stringify(r) === JSON.stringify([['blk','새벽빛 +4','lightmote to-0'],['pur','새벽빛 +1','lightmote to-0'],['life0','새벽빛 +3','lightmote to-0']]), '빛 알갱이: 막은 유닛 +4 · 정화 유닛 +1 · 생명판 +3 (' + JSON.stringify(r) + ')'); }

console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exit(fails ? 1 : 0);
