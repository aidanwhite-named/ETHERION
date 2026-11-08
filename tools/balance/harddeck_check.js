// 사용: node tools/balance/harddeck_check.js [단체들] [판 수=4] — hard.json을 어려움 컴퓨터로 몰아 기본 덱과 비교. SEEDB= 로 씨앗 바꿈 (v3.19.3)
// 어려움 컴퓨터가 몰 때: 새 덱 vs 기본 덱 (상대는 9단체 기본 덱, 상대도 같은 AI). 같은 시드.
const fs=require('fs'),path=require('path'),{fork}=require('child_process'),os=require('os');
const DIR=path.resolve(process.env.JS||path.join(__dirname,'../../js'));const EXTRA=fs.readFileSync(path.join(DIR,'grades.js'),'utf8');
if(process.argv[2]==='--worker'){const {load}=require('./harness');const ctx=load(DIR,EXTRA);
  process.on('message',async({jobs})=>{const out=[];for(const j of jobs){ctx.seed(j.seed);
    const pa={name:'A',group:j.a,cards:j.da,isAI:true,ai:j.aa},pb={name:'B',group:j.b,cards:j.db,isAI:true,ai:j.ab};
    const g=await ctx.playHeadless(j.swap?{p0:pb,p1:pa}:{p0:pa,p1:pb});out.push([j.tag,j.a,g.winner===(j.swap?1:0)?1:0]);}process.send(out);});return;}
const {load}=require('./harness');const ctx=load(DIR,EXTRA);const S=ctx.ev('STARTER_DECKS'),GI=ctx.ev('GROUP_IDS');
const H=JSON.parse(fs.readFileSync('hard.json','utf8'));const GS=(process.argv[2]||Object.keys(H).join(',')).split(',');const N=+(process.argv[3]||4);
const AA=process.env.AA||'hard',AB=process.env.AB||'hard';
const J=[];for(const g of GS)for(const h of GI)for(let i=0;i<N;i++)for(const sw of[false,true])for(const tag of['old','new'])J.push({tag,a:g,b:h,da:tag==='new'?H[g]:S[g],db:S[h],seed:(+(process.env.SEEDB||777000))+i*13+(sw?5:0),swap:sw,aa:AA,ab:AB});
const W=os.cpus().length;const ch=Array.from({length:W},()=>[]);J.forEach((j,i)=>ch[i%W].push(j));
(async()=>{const r=(await Promise.all(ch.map(c=>new Promise(res=>{const k=fork(__filename,['--worker']);k.on('message',m=>{res(m);k.kill();});k.send({jobs:c});})))).flat();
const by={};for(const[t,a,w]of r){by[a]=by[a]||{old:[0,0],new:[0,0]};by[a][t][0]+=w;by[a][t][1]++;}
let to=[0,0],tn=[0,0];for(const g of GS){const o=by[g].old,n=by[g].new;to[0]+=o[0];to[1]+=o[1];tn[0]+=n[0];tn[1]+=n[1];console.log(`${g}  기본 ${(o[0]/o[1]*100).toFixed(0)}%  →  새 덱 ${(n[0]/n[1]*100).toFixed(0)}%  (${n[1]}판)`);}
console.log(`전체 ${AA} vs ${AB}: 기본 ${(to[0]/to[1]*100).toFixed(1)}% → 새 덱 ${(tn[0]/tn[1]*100).toFixed(1)}%`);})();
