const fs=require('fs');const src=fs.readFileSync('js/data.js','utf8');
const m={};new Function('m',src+';m.U=SIM_UNITS;')(m);const U=m.U;
const ev=(u,s)=>u.co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
console.log('lv n  a    d    h   | Ea   Ed   Eh  | Ea+Eh  ratio a/(d+h) negD coins');
let prev=null;
for(let lv=1;lv<=8;lv++){const Z=U.filter(u=>u.lv===lv&&u.up===0&&!u.rev);const av=f=>Z.reduce((s,u)=>s+f(u),0)/Z.length;
 const a=av(u=>u.a),d=av(u=>u.d),h=av(u=>u.h),Ea=av(u=>u.a+ev(u,'a')),Ed=av(u=>u.d+ev(u,'d')),Eh=av(u=>u.h+ev(u,'h'));
 const S=Ea+Eh;console.log(lv,String(Z.length).padStart(2),a.toFixed(2),d.toFixed(2),h.toFixed(2),'|',Ea.toFixed(2),Ed.toFixed(2),Eh.toFixed(2),'|',S.toFixed(2),(prev?(S/prev).toFixed(3):'-'),(Ea/(Ed+Eh)).toFixed(2),Z.filter(u=>u.d<0).length,av(u=>u.co.reduce((s,c)=>s+c[1],0)).toFixed(1));prev=S;}
// coin stats
const cs={};for(const u of U)for(const [s,n,v] of u.co){const k=s+(v>0?'+':'')+v;cs[k]=(cs[k]||0)+n;}console.log('coin kinds',cs);
// per group
for(const g of ['B1','B2','B3','G1','G2','G3','A1','A2','A3']){const Z=U.filter(u=>u.g===g&&!u.rev);const av=f=>Z.reduce((s,u)=>s+f(u),0)/Z.length;
 console.log(g,'a',av(u=>u.a+ev(u,'a')).toFixed(2),'d',av(u=>u.d+ev(u,'d')).toFixed(2),'h',av(u=>u.h+ev(u,'h')).toFixed(2),'negD',Z.filter(u=>u.d<0).length,'min d',Math.min(...Z.map(u=>u.d)), 'up>0',Z.filter(u=>u.up>0).length);}
// up distribution
const up={};for(const u of U)up[u.up]=(up[u.up]||0)+1;console.log('upkeep',up);
// neg-def with d+h<1
console.log('d<0 & h+d<1:',U.filter(u=>u.d<0&&u.h+u.d<1).map(u=>u.id+' '+u.a+'/'+u.d+'/'+u.h).join(', '));
