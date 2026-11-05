const L=require('./lib.js');const U=L.loadUnits(process.argv[2]);
const base=U.map(u=>{const o=u.orig?{...u,a:u.orig[0],d:u.orig[1],h:u.orig[2]}:{...u};return o;});
let err=[];for(const u of base){const P=Math.min(8,Math.floor(u.lv+u.up/2));const pool=base.filter(v=>v.lv===P&&v.up===0);const w=L.winVs(u,pool);err.push([u.id,u.up,u.w,w.toFixed(1),Math.abs(w-u.w).toFixed(1)]);}
err.sort((a,b)=>b[4]-a[4]);console.log(err.slice(0,15).map(e=>e.join(' ')).join('\n'));
const up0=err.filter(e=>e[1]===0);console.log('mean abs err up0',(up0.reduce((s,e)=>s+ +e[4],0)/up0.length).toFixed(2),'all',(err.reduce((s,e)=>s+ +e[4],0)/err.length).toFixed(2));
