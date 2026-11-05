// v1.3 유닛 재가격: (1) 음수 방어 없애기 (2) 공격 1.2·방어 계단·체력 1 가격표로 체력 다시 매기기
// node reprice.js [out.json]   — 기준은 _backup_v1.2/js/data.js
const fs=require('fs'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'../../_backup_v1.2/js/data.js'),'utf8');const m={};new Function('m',src+';m.U=SIM_UNITS;')(m);
const W_A=+(process.env.WA||1.2);
const Dv=d=>d<=0?d:d<=1?1.3*d:1.3+1.5*(d-1);      // 방어 값(체력 단위): 0 아래는 체력과 같고, 0→1은 1.3, 1 넘으면 점마다 1.5
const ev=(co,s)=>co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
const E=u=>({a:u.a+ev(u.co,'a'),d:u.d+ev(u.co,'d'),h:u.h+ev(u.co,'h')});
const P=u=>{const e=E(u);return W_A*e.a+Dv(e.d)+e.h;};          // 새 가격
const B=u=>{const e=E(u);return e.a+e.d+e.h;};                   // 옛 가격(1:1에서 공=방+체, 방=체)
const U=m.U.map(u=>JSON.parse(JSON.stringify(u)));
const log=[];
// 1) 음수 방어 코인 → 음수 체력 코인 (1:1에서 같은 값)
for(const u of U){for(const c of u.co)if(c[0]==='d'&&c[2]<0)c[0]='h';
  const mm=new Map();for(const [s,n,v] of u.co){const k=s+','+v;mm.set(k,(mm.get(k)||0)+n);}u.co=[...mm].map(([k,n])=>{const [s,v]=k.split(',');return [s,n,+v];});}
// 2) 음수 방어 → 0, 그만큼 체력에서 (방어 −1 = 체력 1). 체력이 1 아래로 가면 남는 몫은 공격에서
for(const u of U){if(u.d<0){const o=[u.a,u.d,u.h];u.h+=u.d;u.d=0;if(u.h<1){const def=1-u.h;u.h=1;u.a=Math.max(1,u.a-Math.max(1,Math.round(def/W_A)));}u._fix=o;}}
// 3) 재가격 (역행 유닛 제외): 레벨마다 평균은 그대로, 카드마다 (옛 가격 비율 × 기준) − 새 가격 만큼 체력
const orig=Object.fromEntries(m.U.map(u=>[u.id,u]));const orig0=m.U;const L=require('../rescale/lib.js');const cache=new Map();const PLv=u=>Math.min(8,Math.floor(u.lv+u.up/2));
for(let lv=1;lv<=8;lv++){const Z=U.filter(u=>u.lv===lv&&!u.rev);
  const c=Z.reduce((s,u)=>s+P(u),0)/Z.reduce((s,u)=>s+B(orig[u.id]),0);
  for(const u of Z){const raw=c*B(orig[u.id])-P(u);u._raw=raw;
    // 반올림 방향: 가격 오차(체력 단위)와 1:1 승률 변화(옛 값 대비)를 같이 본다. 1:1 승률 3%p ≈ 체력 0.3
    const pool=orig0.filter(v=>v.lv===PLv(u)&&v.up===0);const w0=L.winVs(orig[u.id],pool,cache);
    let best=null;for(const dh of [Math.floor(raw),Math.ceil(raw)]){if(u.h+dh<1)continue;const c2={...u,h:u.h+dh};const sc=Math.abs(dh-raw)+0.1*Math.abs(L.winVs(c2,pool,cache)-w0);if(!best||sc<best.sc)best={dh,sc};}
    const dh=best?best.dh:1-u.h;u.h+=dh;u._dh=dh;}}
const out=process.argv[2]||path.join(__dirname,'units_v13.json');fs.writeFileSync(out,JSON.stringify(U));
// 요약
let ch=0;for(const u of U){const o=orig[u.id];if(o.a!==u.a||o.d!==u.d||o.h!==u.h||JSON.stringify(o.co)!==JSON.stringify(u.co))ch++;}
console.log('바뀐 카드',ch,'/',U.length,'음수 방어',U.filter(u=>u.d<0).length,'음수 방어 코인',U.filter(u=>u.co.some(c=>c[0]==='d'&&c[2]<0)).length);
const hist={};for(const u of U.filter(u=>!u.rev)){hist[u._dh]=(hist[u._dh]||0)+1;}console.log('체력 변화 분포',hist);
for(const g of ['B1','B2','B3','G1','G2','G3','A1','A2','A3']){const Z=U.filter(u=>u.g===g);const s=f=>Z.reduce((t,u)=>t+f(u),0);
 console.log(g,'체력 합',s(u=>orig[u.id].h),'→',s(u=>u.h),'공격 합',s(u=>orig[u.id].a),'→',s(u=>u.a),'방어 합',s(u=>orig[u.id].d),'→',s(u=>u.d));}
