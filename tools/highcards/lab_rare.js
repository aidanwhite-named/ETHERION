// node tools/highcards/lab_rare.js [판 수=1500] [카드 ID,...] [--base]   (SEED=777 이면 다른 판 묶음)
// v3.24 레어 마법 실험실: lab.js와 같은 섬멸전(내 2~4기 대 상대 2~4기, 레벨 = 마법 레벨 ±1)으로
// 레어 마법(RS-)을 같은 레벨의 일반 · 고급 마법(뺀 카드 · 유니크 · 역전 · 계략 제외)과 견준다.
// 같은 판에서 같은 레벨 유니크 마법(US-)의 값도 함께 보인다. --base: 같은 레벨 기존 마법을 다시 잰다(out/rare_base_N.json에 남김)
const fs = require('fs'), path = require('path'); const { load } = require('../balance/harness');
const ctx = load(path.join(__dirname, '../../js'), fs.readFileSync(path.join(__dirname, '../../js/retired.js'), 'utf8') + ';this.RETIRED_CARDS=RETIRED_CARDS;');
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
function value(sid, L, role, N, seed0) {
  let s = seed0 || SEED; const R = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; const pick = a => a[(R() * a.length) | 0];
  let d = 0; for (let i = 0; i < N; i++) { const n = 2 + ((R() * 3) | 0), m = 2 + ((R() * 3) | 0); const lv = () => Math.max(1, Math.min(8, L - 1 + ((R() * 3) | 0)));
    const A = Array.from({ length: n }, () => ({ id: pick(pools[lv()]).id })), B = Array.from({ length: m }, () => ({ id: pick(pools[lv()]).id }));
    const pos = (R() * (n + 1)) | 0; const A2 = A.slice(); A2.splice(pos, 0, { id: sid }); const seed = (R() * 1e9) | 0; const first = role === 'atk' ? 0 : 1;
    d += ctx.labBattle(A2, B, seed, first) - ctx.labBattle(A, B, seed, first); }
  const c = CARDS[sid]; return d / N * 100 - 1.5 * ((c.cost && c.cost.life) || 0) + 1.5 * ((c.gain && c.gain.life) || 0) - 6 * ((c.cost && c.cost.ether) || 0); }
const roles = c => c.type === 'atk' ? ['atk'] : c.type === 'def' ? ['def'] : ['atk', 'def'];
const val = (c, L, N) => { const r = {}; for (const ro of roles(c)) r[ro] = value(c.id, L, ro, N); return { v: Math.max(...Object.values(r)), r }; };
const N = +process.argv[2] || 1500;
const SEED = +process.env.SEED || 4242;   // 다른 판 묶음으로 다시 재 볼 때: SEED=777 node ...
const only = process.argv[3] && process.argv[3] !== '--base' ? process.argv[3].split(',') : null;
const S = CL.filter(c => c.type !== 'unit' && c.type !== 'item' && c.type !== 'hand' && !c.comeback);
const RID = new Set(ctx.ev('RARE_SPELLS').map(s => s.id));   // v3.24.2 그림자 계약(US-A1-2)처럼 유니크에서 내려온 레어도 함께
const rare = S.filter(c => (/^RS-/.test(c.id) || RID.has(c.id)) && (!only || only.includes(c.id)));
const LV = [...new Set(rare.map(c => c.lv))].sort();
const bf = path.join(__dirname, `out/rare_base_${N}${SEED !== 4242 ? '_s' + SEED : ''}.json`);
let base = fs.existsSync(bf) ? JSON.parse(fs.readFileSync(bf, 'utf8')) : {};
const out = {};
for (const L of LV) {
  if (!base[L] || process.argv.includes('--base')) {
    const old = S.filter(c => c.lv === L && !/^(US|RS)-/.test(c.id) && !RET[c.id]);
    base[L] = old.map(c => ({ id: c.id, g: c.group, name: c.name, type: c.type, v: +val(c, L, N).v.toFixed(2) })).sort((a, b) => b.v - a.v);
    base[L].uniq = undefined;
    const un = S.filter(c => c.lv === L && /^US-/.test(c.id) && !RID.has(c.id));
    base['u' + L] = un.map(c => ({ id: c.id, g: c.group, name: c.name, v: +val(c, L, N).v.toFixed(2) })).sort((a, b) => b.v - a.v);
    fs.mkdirSync(path.dirname(bf), { recursive: true }); fs.writeFileSync(bf, JSON.stringify(base));
  }
  const rows = base[L], vs = rows.map(r => r.v), mean = vs.reduce((a, b) => a + b, 0) / vs.length, sd = Math.sqrt(vs.reduce((s, x) => s + (x - mean) ** 2, 0) / vs.length);
  console.log(`L${L}: 기존 ${rows.length}장 평균 ${mean.toFixed(1)} 표준편차 ${sd.toFixed(1)} · 위 ${rows.slice(0, 4).map(r => r.g + ' ' + r.name + ' ' + r.v.toFixed(1)).join(', ')}`);
  console.log(`     유니크: ${base['u' + L].map(r => r.g + ' ' + r.name + ' ' + r.v.toFixed(1)).join(', ')}`);
  for (const c of rare.filter(c => c.lv === L)) {
    const { v, r } = val(c, L, N); const rank = 1 + vs.filter(x => x > v).length;
    const same = rows.filter(x => x.g === c.group); const sameBest = same[0];
    out[c.id] = { lv: L, v: +v.toFixed(1), z: +((v - mean) / sd).toFixed(2), rank, of: rows.length + 1, r, flagBest: sameBest ? sameBest.name + ' ' + sameBest.v : '' };
    console.log(`   ${c.id} ${c.type.padEnd(3)} ${c.name.padEnd(7)} v ${v.toFixed(1).padStart(5)}  z ${((v - mean) / sd).toFixed(2).padStart(5)}  순위 ${rank}/${rows.length + 1}  (${Object.entries(r).map(([k, x]) => k + ' ' + x.toFixed(1)).join(' ')})  깃발 같은 레벨 최고: ${out[c.id].flagBest}`);
  }
}
fs.writeFileSync(path.join(__dirname, `out/lab_rare${SEED !== 4242 ? '_s' + SEED : ''}.json`), JSON.stringify(out, null, 1));
