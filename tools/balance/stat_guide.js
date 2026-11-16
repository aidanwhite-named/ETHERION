// 깃발별 스탯 · 코인 모양 재기 (docs/STAT_GUIDE.md). node tools/balance/stat_guide.js
const H=require('./harness.js').load(require('path').join(__dirname,'../../js'));
const cards=JSON.parse(H.ev('JSON.stringify(Object.values(CARDS).filter(c=>c.type==="unit"&&!c.retired).map(c=>({id:c.id,g:c.group,lv:c.lv,a:c.a,d:c.d,h:c.h,co:c.co||[],sp:c.special,un:c.unique,lg:c.legend,r:c.rarity||c.grade||null})))'));
const GR=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];
const NM={B1:'고블린',B2:'드워프',B3:'노움',G1:'오크',G2:'트롤',G3:'인어',A1:'마족',A2:'천족',A3:'엘프'};
const groups=[...new Set(cards.map(c=>c.g))]; console.log('groups',groups.join(','), 'n',cards.length, 'lvs',[...new Set(cards.map(c=>c.lv))].sort().join(','));
const f=x=>x.toFixed(1);
for(const g of GR){const cs=cards.filter(c=>c.g===g); if(!cs.length)continue;
 let A=0,D=0,Hh=0,n=cs.length, coins=0, st={a:[0,0],d:[0,0],h:[0,0]}, vals={}, swing=0, pos=0, neg=0, noCoin=0, mixed=0, perLv={};
 for(const c of cs){A+=c.a;D+=c.d;Hh+=c.h; const L=perLv[c.lv]=perLv[c.lv]||{n:0,a:0,d:0,h:0,k:0,sw:0}; L.n++;L.a+=c.a;L.d+=c.d;L.h+=c.h;
  let k=0,sw=0,hp=false,hn=false; for(const [s,cnt,v] of c.co){k+=cnt; st[s][v>0?0:1]+=cnt; vals[v]=(vals[v]||0)+cnt; sw+=cnt*Math.abs(v); if(v>0){pos+=cnt*v;hp=true}else{neg+=cnt*-v;hn=true}}
  coins+=k; swing+=sw; L.k+=k; L.sw+=sw; if(!k)noCoin++; if(hp&&hn)mixed++;}
 const T=A+D+Hh;
 console.log(`\n${g} ${NM[g]} n=${n}  share A${f(100*A/T)} D${f(100*D/T)} H${f(100*Hh/T)}  coins/card ${f(coins/n)} swing/card ${f(swing/n)} (+${f(pos/n)} −${f(neg/n)}) noCoin ${noCoin} mixedCard ${mixed}`);
 console.log('  coin stat +/-:',Object.entries(st).map(([s,[p,m]])=>`${s}+${p}/-${m}`).join(' '),' values:',Object.entries(vals).sort((a,b)=>a[0]-b[0]).map(([v,c])=>`${v}:${c}`).join(' '));
 console.log('  per lv:',Object.entries(perLv).map(([lv,L])=>`L${lv}(${L.n}) ${f(L.a/L.n)}/${f(L.d/L.n)}/${f(L.h/L.n)} k${f(L.k/L.n)} sw${f(L.sw/L.n)}`).join(' | '));
}
// global per lv
const all={};for(const c of cards.filter(c=>GR.includes(c.g))){const L=all[c.lv]=all[c.lv]||{n:0,a:0,d:0,h:0,k:0,sw:0};L.n++;L.a+=c.a;L.d+=c.d;L.h+=c.h;for(const[s,cnt,v]of c.co){L.k+=cnt;L.sw+=cnt*Math.abs(v)}}
console.log('\nALL per lv:',Object.entries(all).map(([lv,L])=>`L${lv}(${L.n}) ${f(L.a/L.n)}/${f(L.d/L.n)}/${f(L.h/L.n)} k${f(L.k/L.n)} sw${f(L.sw/L.n)}`).join(' | '));
console.log('\n=== index vs level avg (1.00 = average) ===');
const U=cards.filter(c=>GR.includes(c.g));
for(const g of GR){const cs=U.filter(c=>c.g===g);let ia=0,id=0,ih=0,it=0,n=0,dist={0:0,1:0,2:0,3:0},sr=0,maxv=0, ab={};
 for(const c of cs){const L=all[c.lv];const av=[L.a/L.n,L.d/L.n,L.h/L.n];ia+=c.a/av[0];id+=(c.d+0.3)/(av[1]+0.3);ih+=c.h/av[2];it+=(c.a+2*c.d+c.h)/(av[0]+2*av[1]+av[2]);n++;
  let k=0,sw=0;for(const[s,cnt,v]of c.co){k+=cnt;sw+=cnt*Math.abs(v);maxv=Math.max(maxv,Math.abs(v))}dist[Math.min(k,3)]++;sr+=sw/Math.max(1,c.a+c.d+c.h);}
 console.log(`${g} ${NM[g]} A${(ia/n).toFixed(2)} D${(id/n).toFixed(2)} H${(ih/n).toFixed(2)} budget${(it/n).toFixed(2)} | coins 0/1/2/3+: ${dist[0]}/${dist[1]}/${dist[2]}/${dist[3]} swing/base ${(100*sr/n).toFixed(0)}%`);}
// sample of A1 negative coin cards & B3 neg
for(const c of U.filter(c=>c.co.some(x=>x[2]<0)))console.log('neg',c.id,c.g,c.lv,c.a,c.d,c.h,JSON.stringify(c.co));
