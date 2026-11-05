// 실제 게임(컴퓨터 대 컴퓨터, 마법·아이템 포함)에서 스탯 변화의 값. 단체 g의 유닛만 바꾸고, 같은 시드로 8단체와 선·후공.
const {fork}=require('child_process');const path=require('path');const fs=require('fs');
if(process.argv[2]==='--worker'){const {load}=require('../balance/harness');const ctx=load(path.join(__dirname,'../../js'));
  const CARDS=ctx.ev('CARDS'),D=ctx.ev('STARTER_DECKS');
  process.on('message',async ({id,mods,games})=>{for(const [k,s,v] of mods)CARDS[k][s]+=v;const out=[];
    for(const [a,b,seed] of games){ctx.seed(seed);const g=await ctx.playHeadless({p0:{name:'A',group:a,cards:D[a],isAI:true},p1:{name:'B',group:b,cards:D[b],isAI:true}});out.push(g.winner===0?1:g.winner===1?0:0.5);}
    for(const [k,s,v] of mods)CARDS[k][s]-=v;process.send({id,out});});return;}
const W=2;const ws=Array.from({length:W},()=>fork(__filename,['--worker']));let nid=1;const wait={};ws.forEach(w=>w.on('message',m=>{wait[m.id](m.out);delete wait[m.id];}));
async function play(mods,games){const parts=Array.from({length:W},()=>[]);games.forEach((g,i)=>parts[i%W].push(g));const r=await Promise.all(parts.map((p,k)=>new Promise(res=>{const id=nid++;wait[id]=res;ws[k].send({id,mods,games:p});})));const o=new Array(games.length);r.forEach((x,k)=>x.forEach((v,j)=>{o[j*W+k]=v;}));return o;}
const src=fs.readFileSync(path.join(__dirname,'../../js/data.js'),'utf8');const m={};new Function('m',src+';m.U=SIM_UNITS;')(m);const U=m.U;
const GA=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];const G=process.argv[4]?process.argv[4].split(','):GA;const S=+(process.argv[2]||40);
const VAR={base:u=>[], lowD_d:u=>u.d<=0?[['d',1]]:[], lowD_h:u=>u.d<=0?[['h',1]]:[], hiD_d:u=>u.d>=1?[['d',1]]:[], hiD_h:u=>u.d>=1?[['h',1]]:[], all_a:u=>[['a',1]], all_h:u=>[['h',1]], all_d:u=>[['d',1]], h3:u=>[['h',3]], a3:u=>[['a',3]]};
const ONLY=process.argv[3]?process.argv[3].split(','):Object.keys(VAR);
(async()=>{const FJ=path.join(__dirname,process.env.FJ||'fullexp.json');const out=fs.existsSync(FJ)?JSON.parse(fs.readFileSync(FJ)):{};
 for(const g of G){const games=[];GA.filter(h=>h!==g).forEach((h,hi)=>{for(let s=0;s<S;s++){games.push([g,h,1000+hi*100+s]);games.push([h,g,5000+hi*100+s]);}});
  out[g]=out[g]||{};for(const vn of ONLY){const mods=[];let cnt=0;for(const u of U.filter(u=>u.g===g)){const ms=VAR[vn](u);if(ms.length)cnt++;for(const [s,v] of ms)mods.push([u.id,s,v]);}
   const r=await play(mods,games);let w=0;games.forEach((x,i)=>{w+=x[0]===g?r[i]:1-r[i];});out[g][vn]=+(w/games.length*100).toFixed(2);out[g][vn+'_n']=cnt;}
  console.log(g,JSON.stringify(out[g]));fs.writeFileSync(FJ,JSON.stringify(out));}
 ws.forEach(w=>w.kill());})();
