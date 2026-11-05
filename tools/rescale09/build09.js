const C=require('./common.js');const {makeEval}=require('./spell_eval.js');const fs=require('fs');
const RS=require('./spells_tuned.json'),RI=require('./items_tuned.json');
const all={t:'all'};
const CB=[
 {id:'RB1-1',n:'최후의 일제 포격',g:'B1',camp:'B',lv:6,kind:'com',ops:[{op:'dmg',side:'both',area:all,x:6}],cost:{ether:2},text:'양쪽 유닛 전체에게 피해 6. [장전 2]'},
 {id:'RB2-1',n:'공방 자폭 명령',g:'B2',camp:'B',lv:6,kind:'com',ops:[{op:'destroy',side:'ally',area:all},{op:'dmg',side:'foe',area:all,x:7}],cost:{ether:2},text:'아군 유닛을 모두 파괴하고, 상대 유닛 전체에게 피해 7. [장전 2]'},
 {id:'RB3-1',n:'아스트라크 대방전',g:'B3',camp:'B',lv:6,kind:'com',ops:[{op:'dmg',side:'foe',area:all,x:2,coin:[3,2]},{op:'dmg',side:'ally',area:all,x:3}],cost:{ether:2},text:'상대 유닛 전체에게 피해 2 +2C×3. 아군 유닛 전체에게 피해 3. [장전 2]'},
 {id:'RG1-1',n:'우두머리 사냥',g:'G1',camp:'G',lv:6,kind:'com',ops:[{op:'destroy',side:'foe',area:{t:'maxA',n:3}},{op:'destroy',side:'ally',area:all}],cost:{life:3},text:'생명 3을 내고, 상대 유닛 중 공격이 가장 높은 3기를 파괴한다. 아군 유닛도 모두 파괴한다.'},
 {id:'RG2-1',n:'태고림의 분노',g:'G2',camp:'G',lv:6,kind:'def',ops:[{op:'taunt',side:'ally',area:{t:'front',n:1}},{op:'mod',side:'ally',area:{t:'front',n:1},h:8},{op:'thorns',side:'ally',area:{t:'front',n:1},x:3}],cost:{ether:4},text:'아군 맨 앞 유닛에게 [수호], 체력 +8, [가시 3]. [장전 4]'},
 {id:'RG3-1',n:'대해일',g:'G3',camp:'G',lv:6,kind:'com',ops:[{op:'dmg',side:'both',area:all,x:4}],cost:{ether:3},gain:{life:6},text:'양쪽 유닛 전체에게 피해 4. 내 생명 +6. [장전 3]'},
 {id:'RA1-1',n:'모르카스와의 최후 계약',g:'A1',camp:'A',lv:7,kind:'com',ops:[{op:'destroy',side:'both',area:all}],cost:{life:6},text:'생명 6을 내고, 전장의 유닛을 양쪽 모두 파괴한다.'},
 {id:'RA2-1',n:'심판의 날',g:'A2',camp:'A',lv:7,kind:'com',ops:[{op:'shield',side:'ally',area:{t:'front',n:1}},{op:'dmg',side:'both',area:all,x:6}],cost:{life:3,ether:2},text:'생명 3을 내고, 아군 맨 앞 유닛에게 [보호막]. 양쪽 유닛 전체에게 피해 6. [장전 2]'},
 {id:'RA3-1',n:'폭풍의 눈',g:'A3',camp:'A',lv:5,kind:'def',ops:[{op:'rest',side:'foe',area:all},{op:'dmg',side:'ally',area:all,x:1}],cost:{ether:2},text:'상대 유닛 전체는 이번 턴 공격도 반격도 하지 않는다. 아군 유닛 전체에게 피해 1. [장전 2]'},
].map(s=>Object.assign(s,{anchor:'역전 · 덱에 1장',limit:1,comeback:true}));
// 마법
const SP=C.SPELLS.map(s=>{const r=RS[s.id];const o=Object.assign({},s);if(r&&r.text!==s.text){o.prevText=s.text;o.ops=r.ops;o.text=r.text;if(r.cost)o.cost=r.cost;if(r.gain)o.gain=r.gain;}else if(r){o.ops=r.ops;}return o;});
const ALL=SP.concat(CB);
const ev=makeEval(C.UNITS,C.durOf(C.UNITS),ALL.filter(s=>!s.comeback),1500,[0,1],false);
for(const s of ALL){s.e=+ev.evalSpell(s).e.toFixed(2);if(s.comeback){s.eB=+ev.evalSpell(s,null,{mMin:1,mMax:2,fMin:3,fMax:4}).e.toFixed(2);s.eA=+ev.evalSpell(s,null,{mMin:3,mMax:4,fMin:1,fMax:2}).e.toFixed(2);}}
// 순서: 단체마다 기존 마법 뒤에 역전 마법
const G=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];const ordered=[];for(const g of G){ordered.push(...SP.filter(s=>s.g===g),...CB.filter(s=>s.g===g));}
SP.filter(s=>!G.includes(s.g)).forEach(s=>ordered.push(s));
// 아이템
const IT=C.ITEMS.map(it=>{const r=RI[it.id];if(!r)return it;const n=r.it;const o=Object.assign({},it);
  for(const k of ['a','d','h','co','throw','ward','thorns','magic','set'])if(n[k]!==undefined)o[k]=n[k];
  const ch=['a','d','h','throw','ward','thorns','magic'].some(k=>(it[k]||0)!==(o[k]||0))||JSON.stringify(it.co||[])!==JSON.stringify(o.co||[])||JSON.stringify(it.set)!==JSON.stringify(o.set);
  if(ch)o.prev={a:it.a||0,d:it.d||0,h:it.h||0,co:it.co||[],throw:it.throw||0,ward:it.ward||0,thorns:it.thorns||0,magic:it.magic||0,set:it.set||null};
  o.ev9=+r.v.toFixed(2);return o;});
let src=C.src;
const rep=(name,arr)=>{const a=src.indexOf('const '+name+'=');const b=src.indexOf('];',a)+2;src=src.slice(0,a)+'const '+name+'='+JSON.stringify(arr)+';'+src.slice(b);};
// 마법은 줄바꿈 형식이 있으니 그대로 JSON 한 줄씩
const a=src.indexOf('const SIM_SPELLS=');const b=src.indexOf('];',a)+2;src=src.slice(0,a)+'const SIM_SPELLS=[\n'+ordered.map(s=>JSON.stringify(s)).join(',\n')+'\n];'+src.slice(b);
rep('SIM_ITEMS',IT);
src=src.replace('   - SIM_SPELLS: 마법 144장 = 9단체 × 16 (기존 64장 + 단체 마법 80장). 문서 07 마법카드 v0.3 잣대로 잼',
 '   - SIM_SPELLS: 마법 153장 = 9단체 × (16 + 역전 마법 1). v0.9에서 새 유닛 곡선 잣대로 다시 재고 피해·스탯 수치를 맞춤 (e 환산 레벨, prevText 바꾸기 전 문구).\n       역전 마법 {comeback, limit 1, eB 지는 판, eA 이기는 판}: 단체마다 1장, 덱에 1장만. 문서 12');
src=src.replace('   - SIM_ITEMS: 아이템 72장 = 9단체 × 8 (기존 18장을 출신 단체에 배정 + 새 54장). 문서 07 아이템카드 v0.1 잣대로 잼',
 '   - SIM_ITEMS: 아이템 72장 = 9단체 × 8. v0.9에서 새 유닛 곡선으로 다시 재고 수치를 줄임 (prev 바꾸기 전, ev9 종합 상승폭). 문서 12');
fs.writeFileSync('game/js/data.js',src);
console.log('spells',ordered.length,'items',IT.length,'changed items',IT.filter(i=>i.prev).length,'changed spells',ordered.filter(s=>s.prevText).length);
const dev=ordered.filter(s=>!s.comeback).map(s=>Math.abs(s.e-s.lv));console.log('spell mean|dev|',(dev.reduce((a,b)=>a+b)/dev.length).toFixed(2),'>0.3',dev.filter(x=>x>.3).length,'>0.5',dev.filter(x=>x>.5).length);
CB.forEach(s=>console.log(s.id,s.n,s.lv,s.e,s.eB,s.eA));
