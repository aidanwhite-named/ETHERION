// node opt.js in.json out.json passes tries
const P=require('./pool');const {ctx,CARDS,pool,check,lim}=require('./rules');const fs=require('fs');
const G=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];
const D=JSON.parse(fs.readFileSync(process.argv[2]));const OUT=process.argv[3];
const NS=+process.env.NS||24;const PASSES=+process.argv[4]||3,TRIES=+process.argv[5]||10,NG=+process.env.NG||48;
const PL={};G.forEach(g=>PL[g]=pool(g));
let seedBase=50000;
async function evalDeck(g,deck,base,ng){ng=ng||NG;const jobs=[];
  G.forEach((h,j)=>{if(h===g)return;for(let k=0;k<ng;k++)jobs.push({a:{g,cards:deck},b:{g:h,cards:D[h]},seed:base+j*7919+k});});
  const r=await P.run(jobs);return r.reduce((a,b)=>a+b,0)/r.length;}
const rnd=a=>a[Math.floor(Math.random()*a.length)];
function move(g,d,K){K=K||1;d=Object.assign({},d);const p=PL[g];const has=arr=>arr.filter(c=>d[c.id]);
  const dec=id=>{d[id]--;if(!d[id])delete d[id];};const inc=id=>{d[id]=(d[id]||0)+1;};
  const t=Math.random();let desc;
  if(t<0.4){const a=rnd(has(p.units)),b=rnd(p.units);if(a===b)return null;const k=Math.min(K,d[a.id],4-(d[b.id]||0));if(k<1)return null;for(let i=0;i<k;i++){dec(a.id);inc(b.id);}desc=`U ${a.id}→${b.id} x${k}`;}
  else if(t<0.75){const a=rnd(has(p.spells)),b=rnd(p.spells);if(a===b)return null;const k=Math.min(K,d[a.id],3-(d[b.id]||0));if(k<1)return null;for(let i=0;i<k;i++){dec(a.id);inc(b.id);}desc=`S ${a.id}→${b.id} x${k}`;}
  else if(t<0.83){const a=rnd(has(p.rares)),b=rnd(p.rares);if(a===b)return null;dec(a.id);inc(b.id);desc=`R ${a.id}→${b.id}`;}
  else if(t<0.9){const ih=p.items.filter(c=>d[c.id]);const a=rnd(ih),b=rnd(p.items);if(a===b)return null;dec(a.id);inc(b.id);desc=`I ${a.id}→${b.id}`;}
  else if(t<0.95){const a=rnd(has(p.units)),b=rnd(p.spells);dec(a.id);inc(b.id);desc=`U→S ${a.id}→${b.id}`;}
  else {const a=rnd(has(p.spells)),b=rnd(p.units);dec(a.id);inc(b.id);desc=`S→U ${a.id}→${b.id}`;}
  if(!check(g,d).ok)return null;return [d,desc];}
(async()=>{
  const wr={};for(const g of G){wr[g]=await evalDeck(g,D[g],seedBase);}
  console.log('start',JSON.stringify(Object.fromEntries(G.map(g=>[g,+(wr[g]*100).toFixed(1)]))));
  for(let pass=0;pass<PASSES;pass++){
    const order=G.slice().sort((a,b)=>Math.abs(wr[b]-.5)-Math.abs(wr[a]-.5));
    for(const g of order){ if(Math.abs(wr[g]-.5)<0.02)continue;
      const base=seedBase+pass*1000003+G.indexOf(g)*77777;let cur=await evalDeck(g,D[g],base,NS);
      let accepted=0;
      for(let t=0;t<TRIES;t++){let m=null;const far=Math.abs(cur-.5);const K=far>0.15?3:far>0.07?2:1;for(let z=0;z<80&&!m;z++)m=move(g,D[g],1+Math.floor(Math.random()*K));if(!m)continue;
        const v=await evalDeck(g,m[0],base,NS);
        if(Math.abs(v-.5)<Math.abs(cur-.5)-0.015){const base2=base+333331+t*101;const c2=await evalDeck(g,D[g],base2),v2=await evalDeck(g,m[0],base2);
          if(Math.abs(v2-.5)<Math.abs(c2-.5)){D[g]=m[0];wr[g]=(v+v2)/2;console.log(`  ${g} ${m[1]}  ${(cur*100).toFixed(1)}→${(v*100).toFixed(1)} / ${(c2*100).toFixed(1)}→${(v2*100).toFixed(1)}`);accepted++;fs.writeFileSync(OUT,JSON.stringify(D,null,1));cur=await evalDeck(g,D[g],base,NS);if(Math.abs(wr[g]-.5)<0.02)break;}}}
      wr[g]=accepted?wr[g]:cur;
    }
    console.log('pass',pass,JSON.stringify(Object.fromEntries(G.map(g=>[g,+(wr[g]*100).toFixed(1)]))));
  }
  fs.writeFileSync(OUT,JSON.stringify(D,null,1));P.stop();})();
