// node probe.js cur.json G '[["desc",{"del":{id:n},"add":{id:n}}],...]'  → wr vs field (8×NG)
const P=require('./pool');const {check}=require('./rules');const fs=require('fs');
const G=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];
const D=JSON.parse(fs.readFileSync(process.argv[2]));const g=process.argv[3];const V=JSON.parse(process.argv[4]);const NG=+process.env.NG||48;
const mk=(v)=>{const d=Object.assign({},D[g]);for(const k in v.del||{}){d[k]-=v.del[k];if(d[k]<=0)delete d[k];}for(const k in v.add||{})d[k]=(d[k]||0)+v.add[k];return d;};
(async()=>{const cands=[['base',{}]].concat(V);const jobs=[],meta=[];
 cands.forEach(([n,v],ci)=>{const d=mk(v);const c=check(g,d);if(!c.ok){console.log(n,'INVALID',c.err.join(','));return;}
  G.forEach((h,j)=>{if(h===g)return;for(let k=0;k<NG;k++){jobs.push({a:{g,cards:d},b:{g:h,cards:D[h]},seed:90000+j*7919+k});meta.push(ci);}});});
 const r=await P.run(jobs);P.stop();const W={},N={};r.forEach((v,i)=>{W[meta[i]]=(W[meta[i]]||0)+v;N[meta[i]]=(N[meta[i]]||0)+1;});
 cands.forEach(([n],ci)=>N[ci]&&console.log((W[ci]/N[ci]*100).toFixed(1).padStart(5),n));})();
