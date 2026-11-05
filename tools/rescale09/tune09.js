const fs=require('fs');const {execSync}=require('child_process');
const base=fs.readFileSync('/home/claude/w/data_base_v09.js','utf8');const U=JSON.parse(base.match(/const SIM_UNITS=(\[.*?\]);/s)[1]);
const OF='/home/claude/w/offsets09.json';let O=fs.existsSync(OF)?JSON.parse(fs.readFileSync(OF)):{hist:[],off:{B1:0,B2:0,B3:0,G1:0,G2:0,G3:0,A1:0,A2:0,A3:0}};
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return ((h>>>0)%1000)/1000;};
function apply(off){const out=U.map(u=>{if(u.rev||u.lv<3)return u;const o=off[u.g];const f=Math.floor(o);const add=f+(hash(u.id+'9')<o-f?1:0);return add?Object.assign({},u,{h:Math.max(1,u.h+add)}):u;});
  const a=base.indexOf('const SIM_UNITS=');const b=base.indexOf('];',a)+2;fs.writeFileSync('js/data.js',base.slice(0,a)+'const SIM_UNITS='+JSON.stringify(out)+';'+base.slice(b));}
apply(O.off);
const txt=execSync('node tools/balance/rr.js js '+(process.argv[2]||100),{encoding:'utf8',maxBuffer:1e8});
const rate={};for(const line of txt.split('\n')){const m=line.match(/^([BGA][123])\s.*\s([\d.]+)$/);if(m)rate[m[1]]=+m[2];}
O.hist.push({off:{...O.off},rate});console.log(JSON.stringify(O.off));console.log(JSON.stringify(rate),'spread',(Math.max(...Object.values(rate))-Math.min(...Object.values(rate))).toFixed(1));
const gain=+(process.argv[3]||0.1);for(const g in O.off)O.off[g]=+(O.off[g]+gain*(50-rate[g])).toFixed(2);
fs.writeFileSync(OF,JSON.stringify(O));console.log(txt.split('\n').slice(-12).join('\n'));
