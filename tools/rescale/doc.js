const fs=require('fs');const src=fs.readFileSync('js/data.js','utf8');const U=JSON.parse(src.match(/const SIM_UNITS=(\[.*?\]);/s)[1]);
const L=require('./lib.js');const ev=(u,s)=>u.co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
const K={a:'공',d:'방',h:'체'};const cs=co=>co.length?co.map(([s,n,v])=>K[s]+(v>0?'+':'')+v+(n>1?'×'+n:'')).join(' '):'-';
const GN={B1:'황동 연합 · 화약 포병단',B2:'황동 연합 · 강철 골렘 공방',B3:'황동 연합 · 뇌전 학술원',G1:'녹음의 맹약 · 바위송곳니 부족',G2:'녹음의 맹약 · 고목 수호회',G3:'녹음의 맹약 · 샘물 무녀단',A1:'비전 성회 · 심연 계약단',A2:'비전 성회 · 성광 기사단',A3:'비전 성회 · 폭풍탑 마도회'};
const old=JSON.parse(fs.readFileSync('_backup_v0.7/js/data.js','utf8').match(/const SIM_UNITS=(\[.*?\]);/s)[1]);
let o='';
// 레벨표
const poolOf=(A,P)=>A.filter(v=>v.lv===P&&v.up===0);
o+='| 레벨 | 적힌 공/방/체 (v0.7) | 적힌 공/방/체 (v0.8) | 기대값 (v0.7) | 기대값 (v0.8) | 카드당 코인 (v0.7 → v0.8) | 한 레벨 위 1:1 (v0.7 → v0.8) |\n|---|---|---|---|---|---|---|\n';
const X=A=>{const r={};for(let P=1;P<=7;P++){const up=poolOf(A,P+1),lo=poolOf(A,P);r[P+1]=up.reduce((s,u)=>s+L.winVs(u,lo),0)/up.length;}return r;};const Xo=X(old),Xn=X(U);
for(let lv=1;lv<=8;lv++){const f=A=>{const Z=poolOf(A,lv).filter(u=>!u.rev);const av=g=>(Z.reduce((s,u)=>s+g(u),0)/Z.length).toFixed(1);return {p:av(u=>u.a)+'/'+av(u=>u.d)+'/'+av(u=>u.h),e:av(u=>u.a+ev(u,'a'))+'/'+av(u=>u.d+ev(u,'d'))+'/'+av(u=>u.h+ev(u,'h')),c:av(u=>u.co.reduce((s,c)=>s+c[1],0))};};
 const a=f(old),b=f(U);o+=`| ${lv} | ${a.p} | ${b.p} | ${a.e} | ${b.e} | ${a.c} → ${b.c} | ${lv>1?Xo[lv].toFixed(0)+'% → '+Xn[lv].toFixed(0)+'%':'-'} |\n`;}
fs.writeFileSync('tools/rescale/doc_curve.md',o);
// 역행 유닛 표
let r='| ID | 이름 | 클래스 | Lv | 종류 | 공/방/체 | 교전 승률 | 1:1 |\n|---|---|---|---|---|---|---|---|\n';
for(const u of U.filter(u=>u.rev))r+=`| ${u.id} | ${u.n} | ${u.cl} | ${u.lv} | ${u.rev} | ${u.a}/${u.d}/${u.h} | ${u.team}% | ${u.w}% |\n`;
fs.writeFileSync('tools/rescale/doc_rev.md',r);
// 전체 목록
let t='';for(const g of Object.keys(GN)){t+=`\n### ${GN[g]}\n\n| ID | 이름 | 클래스 | Lv | 유지 | 공/방/체 | 코인 | 1:1 | v0.7 |\n|---|---|---|---|---|---|---|---|---|\n`;
 for(const u of U.filter(u=>u.g===g))t+=`| ${u.id} | ${u.n}${u.rev?' ◆':''} | ${u.cl} | ${u.lv} | ${u.up} | ${u.a}/${u.d}/${u.h} | ${cs(u.co)} | ${u.w}% | ${u.orig?u.orig.join('/')+' '+cs(u.origCo||[]):(u.rev?'새 카드':'같음')} |\n`;}
fs.writeFileSync('tools/rescale/doc_list.md',t);console.log(o);console.log(r);
