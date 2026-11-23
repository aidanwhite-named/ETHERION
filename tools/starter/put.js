const fs=require('fs');const {check}=require('./rules');const [f,g,v]=process.argv.slice(2);const D=JSON.parse(fs.readFileSync(f));const V=JSON.parse(v);
const d=D[g];for(const k in V.del||{}){d[k]-=V.del[k];if(d[k]<=0)delete d[k];}for(const k in V.add||{})d[k]=(d[k]||0)+V.add[k];
const c=check(g,d);if(!c.ok)throw c.err;fs.writeFileSync(f,JSON.stringify(D,null,1));console.log(g,'ok',JSON.stringify(c));
