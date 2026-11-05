const fs=require('fs');const T=require('./teamsim.js');const R=JSON.parse(fs.readFileSync('units_v08r.json'));const N=R.units;
for(const lv of [2,4,6]){const pool=N.filter(u=>u.lv===lv&&u.up===0);const ws=pool.map(u=>T.teamWin(u,pool,600).avg);
console.log(lv,'mean',(ws.reduce((a,b)=>a+b)/ws.length).toFixed(1),'min',Math.min(...ws).toFixed(1),'max',Math.max(...ws).toFixed(1));}
