// node tools/elf/magic_floor_test.js — 2026-11-16 [방어무시]: 수치 없이 공격할 때 상대 방어를 모두 무시한다(v3.74.3의 '못 뚫어도 피해 N'을 대신함). 데이터의 magic 수치는 있음/없음으로만 본다
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } };
c.ev(`var TU=7e6;
function side(idx, ids){ const f=ids.map(id=>({uid:++TU,id,item:null})); return {idx,name:'P'+idx,life:40,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
this.hitv=function(a, d, magic, chain){ const P=[side(0,['A1-05']),side(1,['A1-05','A1-05'])]; for(const p of P) for(const it of p.field) if(it) resetTurn(it);
  const A=P[0].field[0], D=P[1].field[0], N=P[1].field[1]; A.t.gx = Object.assign({}, magic!=null?{magic}:{}, chain?{chain:true}:{});
  for (const u of [A,D,N]) { u.t.noCoin=true; u.t.ward=0; u.t.thorns=0; u.t.shield=false; }
  A.t.a=a; A.t.h=50; D.t.d=d; D.t.a=0; D.t.h=chain?1:50; N.t.d=9; N.t.h=50; const X=ctx(P,0,1,[]); attackOne(X, A); return {d:D.t.dmg, n:N.t.dmg}; };`);
const t = (a, d, m, want, msg) => { const r = c.hitv(a, d, m).d; ok(r === want, `${msg}: 공 ${a} · 방 ${d} · 방어무시 ${m} → ${want} (${r})`); };
t(2, 5, 1, 2, '수치 1이어도 방어 5 전부 무시');
t(2, 5, 2, 2, '수치 2여도 같다');
t(1, 5, 3, 1, '공격력만큼');
t(4, 3, 1, 4, '방어 3 무시 → 4');
t(4, 2, 2, 4, '방어 2 무시 → 4');
t(2, 5, null, 0, '방어무시 없으면 0');
t(0, 5, 2, 0, '공격 0이면 0');
t(3, 9, true, 3, '전부');
{ const r = c.hitv(4, 0, 1, true); ok(r.n === 3, '연쇄 둘째(남은 3 · 방 9)도 방어 무시 → 3 (' + r.n + ')'); }
{ const r = c.hitv(4, 0, null, true); ok(r.n === 0, '방어무시 없는 연쇄는 방 9에 막힘 (' + r.n + ')'); }
ok(/모두 무시/.test(c.ev('itemKwDesc("[방어무시]")')), '말풍선 글');
ok(c.ev('itemAbilities({magic: 2})').join() === '[방어무시]', '칩에 수치 없음');
ok(c.ev('abilOf({id:"A3-01",t:null,item:null}).magic') === true, '데이터 수치 1 → 있음(true)');
console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exit(fails ? 1 : 0);
