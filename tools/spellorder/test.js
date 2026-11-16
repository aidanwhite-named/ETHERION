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
console.log(`${n - fails}/${n} 통과`); process.exit(fails ? 1 : 0);
