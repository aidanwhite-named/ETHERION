const fs=require('fs');const R=JSON.parse(fs.readFileSync(process.argv[2]||'units_v08.json'));const U=R.units;
const ev=(u,s)=>u.co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
console.log('Xold',Object.values(R.Xold).map(x=>x.toFixed(1)).join(' '));console.log('Xnew',Object.values(R.Xnew).map(x=>x.toFixed(1)).join(' '));
for(let lv=1;lv<=8;lv++){const Z=U.filter(u=>u.lv===lv&&u.up===0);const av=f=>(Z.reduce((s,u)=>s+f(u),0)/Z.length).toFixed(1);
console.log(lv,'base',av(u=>u.a),av(u=>u.d),av(u=>u.h),' EV',av(u=>u.a+ev(u,'a')),av(u=>u.d+ev(u,'d')),av(u=>u.h+ev(u,'h')),' coins',av(u=>u.co.reduce((s,c)=>s+c[1],0)),' sumEV',av(u=>u.a+ev(u,'a')+u.h+ev(u,'h')));}
const bad=U.filter(u=>Math.abs(u.w-u.tgt)>2).sort((a,b)=>Math.abs(b.w-b.tgt)-Math.abs(a.w-a.tgt));
console.log(bad.slice(0,20).map(u=>`${u.id} L${u.lv}u${u.up} ${u.prev.join('/')} ${JSON.stringify(u.prevCo)} -> ${u.a}/${u.d}/${u.h} ${JSON.stringify(u.co)} w${u.w} t${u.tgt}`).join('\n'));
