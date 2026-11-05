const C=require('./common.js');const I=require('./item_common.js');const fs=require('fs');
const [,,shard,nsh,inF,out]=process.argv;const R=Object.assign({},...inF.split(',').map(f=>JSON.parse(fs.readFileSync(f))));
const E=I.engine(C.UNITS);const res={};
(async()=>{const ids=Object.keys(R).filter((x,j)=>j%+nsh===+shard);
 for(const id of ids){const it=R[id].it;const r=await I.value(E,it,600);res[id]={d:+r.d.toFixed(3),b:+r.b.toFixed(3),v:+r.v.toFixed(3),t:+r.t.toFixed(3)};console.log(id,JSON.stringify(res[id]));fs.writeFileSync(out,JSON.stringify(res));}
 console.log('END');})();
