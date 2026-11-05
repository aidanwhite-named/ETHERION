const fs=require('fs');const L=require('./lib.js');const T=require('./teamsim.js');
const src=fs.readFileSync('js/data.js','utf8');const U=JSON.parse(src.match(/const SIM_UNITS=(\[.*?\]);/s)[1]);
const poolOf=P=>U.filter(v=>v.lv===P&&v.up===0);const PL=u=>Math.min(8,Math.floor(u.lv+u.up/2));
for(const u of U){u.w=+L.winVs(u,poolOf(PL(u))).toFixed(1);if(u.rev)u.team=+((T.teamWin(u,poolOf(u.lv),3000,5).avg+T.teamWin(u,poolOf(u.lv),3000,17).avg)/2).toFixed(1);}
const a=src.indexOf('const SIM_UNITS=');const b=src.indexOf('];',a)+2;fs.writeFileSync('js/data.js',src.slice(0,a)+'const SIM_UNITS='+JSON.stringify(U)+';'+src.slice(b));
U.filter(u=>u.rev).forEach(u=>console.log(u.id,u.n,u.a+'/'+u.d+'/'+u.h,'1:1',u.w,'team',u.team));
const X={};for(let P=1;P<=7;P++){const up=poolOf(P+1),lo=poolOf(P);X[P]=+(up.reduce((s,u)=>s+L.winVs(u,lo),0)/up.length).toFixed(1);}console.log('X',JSON.stringify(X));
const ev=(u,s)=>u.co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
for(let lv=1;lv<=8;lv++){const Z=poolOf(lv).filter(u=>!u.rev);const av=f=>(Z.reduce((s,u)=>s+f(u),0)/Z.length).toFixed(1);
 let dec=0,kill=0,n=0;for(const x of Z){const OX=L.outcomes(x);for(const y of Z){if(x===y)continue;const r=L.duel(OX,L.outcomes(y));dec+=r.decide;kill+=L.attack(OX,L.outcomes(y))[0];n++;}}
 console.log(lv,'printed',av(u=>u.a),av(u=>u.d),av(u=>u.h),'EV',av(u=>u.a+ev(u,'a')),av(u=>u.d+ev(u,'d')),av(u=>u.h+ev(u,'h')),'coins',av(u=>u.co.reduce((s,c)=>s+c[1],0)),'decide',(dec/n*100).toFixed(0)+'%','solo-kill',(kill/n*100).toFixed(0)+'%','maxA',Math.max(...Z.map(u=>u.a)));}
