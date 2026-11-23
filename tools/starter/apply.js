// node apply.js final.json  → js/decks.js DECK_LISTS 장수만 바꿈 (이름 · 주석 그대로)
const fs=require('fs');const F=require('path').join(__dirname,'../../js/decks.js');
const D=JSON.parse(fs.readFileSync(process.argv[2]));let s=fs.readFileSync(F,'utf8');
const a=s.indexOf('const DECK_LISTS = {'),b=s.indexOf('\n};',a);let body=s.slice(a,b);
for(const g in D){const sorted=Object.keys(D[g]).sort().reduce((o,k)=>(o[k]=D[g][k],o),{});
  const re=new RegExp(`(  ${g}: \\{ name: "[^"]+", cards: )\\{[^}]*\\}( \\})(,)?[^\\n]*`);
  if(!re.test(body))throw g;body=body.replace(re,(m,p1,p2,p3)=>p1+JSON.stringify(sorted).replace(/,/g,', ').replace(/:/g,': ')+p2+',');}
s=s.slice(0,a)+body+s.slice(b);fs.writeFileSync(F,s);console.log('ok');
