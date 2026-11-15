// node tools/abyss/bleed_ward_test.js — v3.74 마족 ↔ 천족 상극: [가호 N]은 [출혈] 틱을 매번 N 줄인다(보호막 · 바다의 보호는 못 막음)
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } };
c.ev(`var TU=6e6;
function side(idx, ids){ const f=ids.map(id=>({uid:++TU,id,item:null})); return {idx,name:'P'+idx,life:40,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
this.tick=function(id, bleed, set){ const P=[side(0,[id]),side(1,['A1-05'])]; for(const p of P) for(const it of p.field) if(it) resetTurn(it);
  const u=P[0].field[0]; Object.assign(u.t, set||{}); u.t.bleed=bleed; const h=u.t.h; const X=ctx(P,1,1,[]); abBleedTick(X); return {dmg:u.t.dmg, alive:u.t.alive, wardUsed:u.t.wardUsed, h}; };`);
const r0 = c.tick('A1-05', 3, { ward: 0 });  ok(r0.dmg === 3, '가호 없으면 출혈 3 그대로 (' + r0.dmg + ')');
const r1 = c.tick('A1-05', 3, { ward: 2 });  ok(r1.dmg === 1, '가호 2 → 출혈 3이 1 (' + r1.dmg + ')');
ok(r1.wardUsed === false, '출혈을 줄여도 가호를 쓰지 않음(그 턴 첫 피해 몫은 남음)');
const r2 = c.tick('A1-05', 3, { ward: 2, wardUsed: true }); ok(r2.dmg === 1, '가호를 이미 썼어도 출혈은 줄임 (' + r2.dmg + ')');
const r3 = c.tick('A1-05', 2, { ward: 3 });  ok(r3.dmg === 0 && r3.alive, '가호 3 ≥ 출혈 2 → 피해 0');
const r4 = c.tick('A1-05', 3, { ward: 0, shield: true }); ok(r4.dmg === 3, '보호막은 출혈을 못 막음 (' + r4.dmg + ')');
// 두 번 틱: 매번 줄인다
{ const v = c.ev(`(()=>{ const P=[side(0,['A1-05']),side(1,['A1-05'])]; for(const p of P) for(const it of p.field) if(it) resetTurn(it);
  const u=P[0].field[0]; u.t.h=20; u.t.ward=1; u.t.bleed=3; const X=ctx(P,1,1,[]); abBleedTick(X); abBleedTick(X); return u.t.dmg; })()`);
  ok(v === 4, '틱 두 번 × (3 − 1) = 4 (' + v + ')'); }
// 카드 글
ok(/가호/.test(c.ev('itemKwDesc("[출혈 2]")')), '[출혈] 말풍선에 가호 이야기');
ok(/출혈/.test(c.ev('itemKwDesc("[가호 2]")')), '[가호] 말풍선에 출혈 이야기');
console.log(fails ? `✗ ${fails}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exit(fails ? 1 : 0);
