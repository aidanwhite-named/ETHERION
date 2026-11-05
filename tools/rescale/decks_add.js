// 역행 유닛을 기본 덱에 2장씩: 같은 레벨(없으면 가까운 레벨) 유닛 중 장수가 많은 카드부터 1장씩 뺀다
const fs=require('fs');const file=process.argv[2];let src=fs.readFileSync(file,'utf8');
const data=fs.readFileSync('js/data.js','utf8');const U=JSON.parse(data.match(/const SIM_UNITS=(\[.*?\]);/s)[1]);const byId=Object.fromEntries(U.map(u=>[u.id,u]));
for(const g of ['B1','B2','B3','G1','G2','G3','A1','A2','A3']){
  const re=new RegExp('(  '+g+': \\{ name: "[^"]*", cards: )(\\{[^}]*\\})');const m=src.match(re);const cards=JSON.parse(m[2]);
  for(const c of U.filter(u=>u.g===g&&u.rev)){if(cards[c.id])continue;
    for(let k=0;k<2;k++){const cand=Object.keys(cards).filter(id=>byId[id]&&!byId[id].rev&&cards[id]>0).sort((x,y)=>Math.abs(byId[x].lv-c.lv)-Math.abs(byId[y].lv-c.lv)||cards[y]-cards[x]);
      const x=cand[0];cards[x]--;if(!cards[x])delete cards[x];cards[c.id]=(cards[c.id]||0)+1;}}
  const tot=Object.values(cards).reduce((a,b)=>a+b,0);if(tot!==40)throw g+' '+tot;
  src=src.replace(re,(s,p)=>p+JSON.stringify(cards).replace(/":/g,'": ').replace(/,"/g,', "').replace('{"','{ "').replace(/}$/,' }'));}
src=src.replace('단체마다 40장, 그 단체의 카드로만 구성 (v0.3)','단체마다 40장, 그 단체의 카드로만 구성 (v0.3, v0.7에서 역행 유닛 2장씩 추가)');
fs.writeFileSync(file,src);console.log('ok');
