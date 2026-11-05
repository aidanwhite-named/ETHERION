// units_v08r.json + counters.json → js/data.js 의 SIM_UNITS 교체
const fs=require('fs');const file=process.argv[2];let src=fs.readFileSync(file,'utf8');
const N=JSON.parse(fs.readFileSync('units_v08r.json')).units;const C=JSON.parse(fs.readFileSync('counters.json'));
const SO={a:0,d:1,h:2};const canon=co=>co.filter(c=>c[1]>0).slice().sort((x,y)=>SO[x[0]]-SO[y[0]]||y[2]-x[2]);
const G=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];const out=[];
for(const g of G){
  for(const u of N.filter(u=>u.g===g)){const o={id:u.id,n:u.n,g:u.g,lv:u.lv,up:u.up,a:u.a,d:u.d,h:u.h,co:canon(u.co),cl:u.cl,w:u.w};
    const same=u.prev[0]===u.a&&u.prev[1]===u.d&&u.prev[2]===u.h&&JSON.stringify(canon(u.prevCo))===JSON.stringify(o.co);
    if(!same){o.orig=u.prev;o.origCo=canon(u.prevCo);}out.push(o);}
  for(const c of C.filter(c=>c.g===g))out.push({id:c.id,n:c.n,g:c.g,lv:c.lv,up:0,a:c.a,d:c.d,h:c.h,co:[],cl:c.cl,w:c.w,team:c.team,rev:c.kind==='wall'?'벽':'돌격'});}
const a=src.indexOf('const SIM_UNITS=');const b=src.indexOf('];',a)+2;
src=src.slice(0,a)+'const SIM_UNITS='+JSON.stringify(out)+';'+src.slice(b);
// 머리말
src=src.replace(/   - SIM_UNITS:[\s\S]*?조정 전 값은 orig\.\n/,
`   - SIM_UNITS: 유닛 384장 = 9단체 × (40 + 역행 유닛 2~3). 문서 06·08, v0.7 곡선은 문서 11
       {id, n 이름, g 단체, lv, up 유지비, a/d/h, co [[스탯, 개수, 값]], cl 클래스, w 1:1 승률,
        orig/origCo v0.7 값(바뀐 카드만), team 교전 승률(역행 유닛), rev 역행 종류 벽|돌격}
       v0.8: 코인 상한(1~2레벨 2개, 3레벨 이상 3개 · 값 1~4레벨 ±1, 5~8레벨 ±2), 레벨 곡선 압축(레벨당 ×1.19),
       카드별 1:1 재조정(v0.3 단체 밸런스로 벗어난 몫은 레벨 단위로 옮김). tools/rescale 참고.
`);
fs.writeFileSync(file,src);console.log('units',out.length,'changed',out.filter(u=>u.orig).length,'counters',out.filter(u=>u.rev).length);
