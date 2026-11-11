// node tools/counter/lab.js [판 수=1500]   (SEED=777 이면 다른 판 묶음)
// v3.32 무효 마법 실험실: tools/highcards/lab_rare.js와 같은 섬멸전(내 2~4기 대 상대 2~4기, 레벨 = 마법 레벨 ±1)에서
// 무효 마법(CS-)을 내 1번 칸에 넣은 판과 안 넣은 판을 같은 씨앗으로 견준다(공격 턴 먼저).
//   빈판: 상대가 방어 마법을 내지 않은 판 — 3레벨의 다른 효과만의 값.
//   맞판: 상대가 방어 마법 1장(상대 깃발의 방어 · 공용 마법, 레벨 L−1 ~ L+2, 뺀 카드 · 유니크 제외)을 무작위 칸에 낸 판.
//   같은 레벨 기존 공격 · 공용 마법(빈판)의 평균 · 표준편차도 함께 보인다.
const fs = require('fs'), path = require('path'); const { load } = require('../balance/harness');
const ctx = load(path.join(__dirname, '../../js'), 'this.RETIRED_CARDS=RETIRED_CARDS;');
ctx.ev(`var TUID=3e6;
function labBattle(A,B,seed,first){
  const mk=(arr,idx)=>({idx,name:'P'+idx,life:99,crystals:[],burn:[],reload:0,bonus:0,field:arr.map(x=>({uid:++TUID,id:x.id})).concat(Array(RULES.slots-arr.length).fill(null))});
  const P=[mk(A,0),mk(B,1)];
  for(let t=0;t<12;t++){const ai=(t+first)%2;
    for(const p of P)for(const it of p.field)if(it&&isUnit(it))resetTurn(it);
    if(t>=1)for(const p of P)p.field=p.field.map(it=>it&&isSpell(it)?null:it);
    for(const p of P){const xs=p.field.filter(Boolean);p.field=xs.concat(Array(RULES.slots-xs.length).fill(null));}
    runCombatCore(ctx(P,ai,t,null,{seed:seed*131+t}));
    for(const p of P){p.field=p.field.map(it=>(it&&((isUnit(it)&&(!it.t||!it.t.alive))||it.tokTemp))?null:it);const xs=p.field.filter(Boolean);p.field=xs.concat(Array(RULES.slots-xs.length).fill(null));}
    const la=liveUnits(P[0]).length,lb=liveUnits(P[1]).length;
    if(!lb&&la)return 1;if(!la&&lb)return 0;if(!la&&!lb)return 0.5;}
  const s=p=>liveUnits(p).reduce((s,u)=>s+C(u).lv,0);const a=s(P[0]),b=s(P[1]);return a>b?1:a<b?0:0.5;}
this.labBattle=labBattle;`);
const CL = ctx.ev('CARD_LIST'), CARDS = ctx.ev('CARDS'), RET = ctx.RETIRED_CARDS;
const U = CL.filter(c => c.type === 'unit' && !c.rev && c.up === 0 && !c.gift);
const pools = {}; for (let l = 1; l <= 8; l++) pools[l] = U.filter(u => u.lv === l);
const GS = ['B1', 'B2', 'B3', 'G1', 'G2', 'G3', 'A1', 'A2', 'A3'];
const DEFS = {}; for (const g of GS) DEFS[g] = CL.filter(c => c.group === g && (c.type === 'def' || c.type === 'any') && !c.unique && !c.comeback && !RET[c.id] && !/^(US|CS)-/.test(c.id));
const N = +process.argv[2] || 1500, SEED = +process.env.SEED || 4242;
function value(sid, L, withDef, seed0) {
  let s = seed0 || SEED; const R = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; const pick = a => a[(R() * a.length) | 0];
  let d = 0, k = 0;
  for (let i = 0; i < N; i++) {
    const n = 2 + ((R() * 3) | 0), m = 2 + ((R() * 3) | 0); const lv = () => Math.max(1, Math.min(8, L - 1 + ((R() * 3) | 0)));
    const A = Array.from({ length: n }, () => ({ id: pick(pools[lv()]).id })), B = Array.from({ length: m }, () => ({ id: pick(pools[lv()]).id }));
    const og = pick(GS);
    if (withDef) { const ds = DEFS[og].filter(c => c.lv >= L - 1 && c.lv <= L + 2); if (!ds.length) continue; B.splice((R() * (m + 1)) | 0, 0, { id: pick(ds).id }); }
    const A2 = [{ id: sid }].concat(A); const seed = (R() * 1e9) | 0;
    d += ctx.labBattle(A2, B, seed, 0) - ctx.labBattle(A, B, seed, 0); k++;
  }
  const c = CARDS[sid]; return d / k * 100 - 1.5 * ((c.cost && c.cost.life) || 0) + 1.5 * ((c.gain && c.gain.life) || 0) - 6 * ((c.cost && c.cost.ether) || 0);
}
// TRY='{"CS-G2":[ops...]}' 로 효과를 바꿔 잴 수 있다(파일은 그대로)
if (process.env.TRY) { const T = JSON.parse(process.env.TRY); for (const id in T) CARDS[id].ops = T[id]; }
const CS = CL.filter(c => /^CS-/.test(c.id) && (!process.env.TRY || JSON.parse(process.env.TRY)[c.id]));
const BASE = process.env.NOBASE ? null : true;
for (const L of (process.env.LV ? [+process.env.LV] : [2, 3])) {
  if (!BASE) { for (const c of CS.filter(c => c.lv === L)) console.log(`   ${c.id} ${JSON.stringify(c.ops.slice(1))} 빈판 ${value(c.id, L, false).toFixed(1)} 맞판 ${value(c.id, L, true).toFixed(1)}`); continue; }
  const old = CL.filter(c => c.lv === L && (c.type === 'atk' || c.type === 'any') && !/^(US|RS|CS)-/.test(c.id) && !c.unique && !c.comeback && !RET[c.id]);
  const vs = old.map(c => value(c.id, L, false)), mean = vs.reduce((a, b) => a + b, 0) / vs.length, sd = Math.sqrt(vs.reduce((s, x) => s + (x - mean) ** 2, 0) / vs.length);
  const vd = old.map(c => value(c.id, L, true)), meanD = vd.reduce((a, b) => a + b, 0) / vd.length;
  console.log(`L${L}: 기존 공격 · 공용 마법 ${old.length}장 — 빈판 평균 ${mean.toFixed(1)} (표준편차 ${sd.toFixed(1)}, 최고 ${Math.max(...vs).toFixed(1)}) · 맞판 평균 ${meanD.toFixed(1)}`);
  for (const c of CS.filter(c => c.lv === L)) {
    const e = value(c.id, L, false), h = value(c.id, L, true);
    console.log(`   ${c.id} ${c.name.padEnd(6)} 빈판 ${e.toFixed(1).padStart(5)} (z ${((e - mean) / sd).toFixed(2).padStart(5)})  맞판 ${h.toFixed(1).padStart(5)}`);
  }
}
