// worker pool: run(jobs) jobs=[{a:{g,cards},b:{g,cards},seed}] -> [winnerIsA 1/0]
const {fork}=require('child_process'),os=require('os');
if(process.argv[2]==='--w'){
  const ctx=require('./lib')(process.argv[3]||undefined);
  process.on('message',async ({id,jobs})=>{const out=[];
    for(const j of jobs){ctx.seed(j.seed);
      const A={name:'A',group:j.a.g,cards:j.a.cards,isAI:true},B={name:'B',group:j.b.g,cards:j.b.cards,isAI:true};
      const first=j.seed%2===0;
      try{const g=await ctx.playHeadless(first?{p0:A,p1:B}:{p0:B,p1:A});out.push(g.winner===(first?0:1)?1:(g.winner==null||g.winner<0?0.5:0));}catch(e){out.push(0.5);}
    }process.send({id,out});});
  return;
}
let W=null;const N=Math.max(1,os.cpus().length-1);
function start(dir){W=Array.from({length:N},()=>fork(__filename,['--w',dir||'']));}
async function run(jobs,dir){ if(!W)start(dir);
  const chunks=[];const per=Math.max(1,Math.ceil(jobs.length/(N*4)));
  for(let i=0;i<jobs.length;i+=per)chunks.push([i,jobs.slice(i,i+per)]);
  const res=new Array(jobs.length);let next=0;
  await Promise.all(W.map(w=>new Promise(r=>{
    const go=()=>{if(next>=chunks.length){w.removeAllListeners('message');return r();}
      const [i,js]=chunks[next++];w.once('message',m=>{m.out.forEach((v,k)=>res[i+k]=v);go();});w.send({id:i,jobs:js});};go();})));
  return res;}
function stop(){W&&W.forEach(w=>w.kill());W=null;}
module.exports={run,stop,N};
