const fs=require('fs');
const src=fs.readFileSync(__dirname+'/game/js/data.js','utf8');
const grab=n=>JSON.parse(src.match(new RegExp('const '+n+'=(\\[.*?\\]);','s'))[1]);
const UNITS=grab('SIM_UNITS'),SPELLS=grab('SIM_SPELLS'),ITEMS=grab('SIM_ITEMS');
const ev=(u,s)=>u.co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
function durOf(U){const D=[];for(let lv=1;lv<=8;lv++){const Z=U.filter(u=>u.lv===lv&&u.up===0&&!u.rev);D.push(+(Z.reduce((s,u)=>s+u.h+ev(u,'h')+u.d+ev(u,'d'),0)/Z.length).toFixed(2));}return D;}
// 마법 엔진 (기준 내구를 바꿔 끼움)
function spellEngine(DUR){let code=fs.readFileSync(__dirname+'/spell_engine.js','utf8');code=code.replace(/const DUR = \[[^\]]*\];/,'const DUR = '+JSON.stringify(DUR)+';');
  // 기준점도 새 곡선으로: 옛 잣대의 '내구 대비 피해' 비율을 그대로 (2레벨 공격 기준 = 옛 2레벨 내구 4.6에 피해 2)
  if(!code.includes('DUR[L - 1] / DUR[1]'))throw 'patch';
  code=code.replace('const nM = opt.nMin + ((R() * (opt.nMax - opt.nMin + 1)) | 0);','const nM = (opt.mMin||opt.nMin) + ((R() * ((opt.mMax||opt.nMax) - (opt.mMin||opt.nMin) + 1)) | 0);').replace('const nF = opt.nMin + ((R() * (opt.nMax - opt.nMin + 1)) | 0);','const nF = (opt.fMin||opt.nMin) + ((R() * ((opt.fMax||opt.nMax) - (opt.fMin||opt.nMin) + 1)) | 0);');code=code.replace('DUR[L - 1] / DUR[1]','DUR[L - 1] / 4.6').replace('DUR[L - 1] / DUR[2]','DUR[L - 1] / 5.7');const m={exports:{}};new Function('module','root',code.replace('})(this);','})(root);'))(m,{});return m.exports;}
const toSimUnit=u=>({n:u.n,f:u.g,lv:u.lv,up:u.up,a:u.a,d:u.d,h:u.h,co:u.co,cl:u.cl});
const toSimSpell=s=>{const o={id:s.id,name:s.n,lv:s.lv,kind:s.kind,camp:s.camp,ops:s.ops,cost:s.cost||{},gain:s.gain||{},grp:s.grp,ccl:s.ccl,dir:s.dir};
  // 단체 마법 중 아군 한 클래스 강화: 그 클래스 60% 덱으로 잰다 (클래스 마법과 같은 방식)
  if(!o.dir){const b=s.ops.find(op=>op.side==='ally'&&op.cls);if(b){o.dir='강화';o.ccl=b.cls;}}return o;};
module.exports={UNITS,SPELLS,ITEMS,src,durOf,spellEngine,toSimUnit,toSimSpell,ev};
