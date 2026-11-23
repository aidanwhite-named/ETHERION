const {CARDS}=require("./rules");const D=JSON.parse(require('fs').readFileSync(process.argv[2]));
for(const g of process.argv[3].split(',')){console.log("==",g);const d=D[g];
for(const id of Object.keys(d).sort((a,b)=>(CARDS[a].type==="unit")-(CARDS[b].type==="unit")||CARDS[a].lv-CARDS[b].lv)){const c=CARDS[id];console.log(`  ${d[id]}x ${id} ${c.type} ${c.grade[0]} L${c.lv} ${c.type==="unit"?c.a+"/"+c.d+"/"+c.h:""} ${c.name}`);}}
