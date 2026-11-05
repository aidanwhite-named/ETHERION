// 단체 체력 보정 반복: node tune13.js <반복 수> <판 수> [이득]
const fs=require('fs'),path=require('path');const {execSync}=require('child_process');const rr=require('../balance/rr.js');
const R=p=>path.join(__dirname,p);const F=R('offsets13.json');
const K=+(process.argv[2]||3),N=+(process.argv[3]||60),gain=+(process.argv[4]||0.08);
(async()=>{for(let k=0;k<K;k++){
  let O=fs.existsSync(F)?JSON.parse(fs.readFileSync(F)):{hist:[],off:{B1:0,B2:0,B3:0,G1:0,G2:0,G3:0,A1:0,A2:0,A3:0}};
  execSync('node '+R('build13.js'));
  const r=await rr.run(path.resolve(R('../../js')),N);const rate={};for(const g in r.rate)rate[g]=+(r.rate[g]*100).toFixed(1);
  const sp=Math.max(...Object.values(rate))-Math.min(...Object.values(rate));
  O.hist.push({off:{...O.off},rate,turns:+r.avgTurns.toFixed(2),N});console.log(JSON.stringify(O.off),'\n ',JSON.stringify(rate),'spread',sp.toFixed(1),'turns',r.avgTurns.toFixed(1));
  for(const g in O.off)O.off[g]=+(O.off[g]+gain*(50-rate[g])).toFixed(2);fs.writeFileSync(F,JSON.stringify(O));}
  process.exit(0);})();
