// node tools/spellorder/test.js — 같은 때 발동하는 마법은 공격 → 방어 → 공격 … 번갈아 (engine runCombatCore fire)
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; console.log((cond ? '✓ ' : '✗ ') + msg); if (!cond) fails++; };
c.ev(`var TU=9e6;
function mk(id){ return {uid:++TU,id,item:null}; }
function side(idx, ids){ const f=ids.map(x=>x?mk(x):null); return {idx,name:'P'+idx,life:40,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for(const p of P) for(const it of p.field) if(it&&isUnit(it)) resetTurn(it); }
this.side=side; this.prep=prep;`);
const pick = kind => c.ev(`Object.keys(CARDS).find(id => { const x = CARDS[id]; return x.type === "${kind}" && !x.opening && (x.ops||[]).every(o => o.op === "mod" || o.op === "dmg"); })`);
const A = pick('atk'), D = pick('def');
ok(A && D, `공격 마법 ${A} · 방어 마법 ${D}`);
const order = (aIds, dIds) => {
  const P = [c.side(0, aIds), c.side(1, dIds)]; c.prep(P);
  const uidOf = new Map(); P.forEach(p => p.field.forEach(it => it && uidOf.set(it.uid, (p.idx ? 'D' : 'A') + (p.field.indexOf(it) + 1))));
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('runCombatCore')(X);
  return X.rec.filter(r => r.fx.reveal).map(r => uidOf.get(r.fx.reveal));
};
{ const o = order([A, A, 'G2-01'], [D, 'G2-01']); ok(o.join() === 'A1,D1,A2', '상대(공격) 마법 2 · 내(방어) 마법 1 → 공격 → 방어 → 공격: ' + o.join()); }
{ const o = order([A, A, A, 'G2-01'], [D, D, 'G2-01']); ok(o.join() === 'A1,D1,A2,D2,A3', '공 3 · 방 2 → 번갈아: ' + o.join()); }
{ const o = order([A, 'G2-01'], [D, D, 'G2-01']); ok(o.join() === 'A1,D1,D2', '공 1 · 방 2 → 공 · 방 · 방: ' + o.join()); }
// 2026-11-22 효과가 여럿인 마법은 효과마다 기록이 한 수씩: 철골 해머 = 아군 방어 +1이 보인 수 다음에 상대 체력 −
{ const P = [c.side(0, ['US-B2-1', 'B2-06', 'B2-05']), c.side(1, ['B3-42', 'G3-34'])]; c.prep(P);
  const rec = [], X = c.ev('ctx')(P, 0, 1, rec), sp = P[0].field[0]; c.ev('castSpell')(X, 0, sp, 1); c.ev('step')(X, { spell: sp.id, shown: sp.uid }, 800);
  const at = re => rec.findIndex(r => r.floats.some(f => re.test(f[1])));
  const iBuff = at(/⛨\+1/), iHit = at(/^강철 −\d/);
  ok(iBuff >= 0 && iHit > iBuff && !rec[iBuff].floats.some(f => /강철/.test(f[1])), `철골 해머: 방어 +1(수 ${iBuff}) 다음 수에 강철 피해(수 ${iHit})`); }
console.log(`${n - fails}/${n} 통과`); process.exit(fails ? 1 : 0);
