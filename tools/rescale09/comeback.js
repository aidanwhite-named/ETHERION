const C=require('./common.js');const {makeEval}=require('./spell_eval.js');const fs=require('fs');
const R=require('./spells_tuned.json');
const SP=C.SPELLS.map(s=>R[s.id]?Object.assign({},s,{ops:R[s.id].ops,cost:R[s.id].cost||s.cost,gain:R[s.id].gain||s.gain,text:R[s.id].text}):s);
const all={t:'all'};
const CB=[
 {id:'RB1-1',n:'최후의 일제 포격',g:'B1',camp:'B',lv:6,kind:'com',ops:[{op:'dmg',side:'both',area:all,x:6}],cost:{ether:2},text:'양쪽 유닛 전체에게 피해 6. [장전 2]'},
 {id:'RB2-1',n:'공방 자폭 명령',g:'B2',camp:'B',lv:6,kind:'com',ops:[{op:'destroy',side:'ally',area:all},{op:'dmg',side:'foe',area:all,x:7}],cost:{ether:2},text:'아군 유닛을 모두 파괴하고, 상대 유닛 전체에게 피해 7. [장전 2]'},
 {id:'RB3-1',n:'아스트라크 대방전',g:'B3',camp:'B',lv:6,kind:'com',ops:[{op:'dmg',side:'foe',area:all,x:2,coin:[3,2]},{op:'dmg',side:'ally',area:all,x:3}],cost:{ether:2},text:'상대 유닛 전체에게 피해 2 +2C×3. 아군 유닛 전체에게 피해 3. [장전 2]'},
 {id:'RG1-1',n:'우두머리 사냥',g:'G1',camp:'G',lv:6,kind:'com',ops:[{op:'destroy',side:'foe',area:{t:'maxA',n:2}},{op:'dmg',side:'ally',area:all,x:3}],cost:{life:5},text:'생명 5를 내고, 상대 유닛 중 공격이 가장 높은 2기를 파괴한다. 아군 유닛 전체에게 피해 3.'},
 {id:'RG2-1',n:'태고림의 분노',g:'G2',camp:'G',lv:6,kind:'def',ops:[{op:'mod',side:'ally',area:all,h:2},{op:'thorns',side:'ally',area:all,x:3}],cost:{ether:3},text:'아군 유닛 전체 체력 +2, [가시 3]. [장전 3]'},
 {id:'RG3-1',n:'대해일',g:'G3',camp:'G',lv:6,kind:'com',ops:[{op:'dmg',side:'both',area:all,x:4}],cost:{ether:3},gain:{life:6},text:'양쪽 유닛 전체에게 피해 4. 내 생명 +6. [장전 3]'},
 {id:'RA1-1',n:'모르카스와의 최후 계약',g:'A1',camp:'A',lv:7,kind:'com',ops:[{op:'destroy',side:'both',area:all}],cost:{life:6},text:'생명 6을 내고, 전장의 유닛을 양쪽 모두 파괴한다.'},
 {id:'RA2-1',n:'심판의 날',g:'A2',camp:'A',lv:7,kind:'com',ops:[{op:'shield',side:'ally',area:{t:'front',n:1}},{op:'dmg',side:'both',area:all,x:5}],cost:{life:4,ether:2},text:'생명 4를 내고, 아군 맨 앞 유닛에게 [보호막]. 양쪽 유닛 전체에게 피해 5. [장전 2]'},
 {id:'RA3-1',n:'폭풍의 눈',g:'A3',camp:'A',lv:5,kind:'def',ops:[{op:'rest',side:'foe',area:all},{op:'dmg',side:'ally',area:all,x:1}],cost:{ether:2},text:'상대 유닛 전체는 이번 턴 공격도 반격도 하지 않는다. 아군 유닛 전체에게 피해 1. [장전 2]'},
];
const ev=makeEval(C.UNITS,C.durOf(C.UNITS),SP,1500,[0,1],false);
const BEHIND={mMin:1,mMax:2,fMin:3,fMax:4},AHEAD={mMin:3,mMax:4,fMin:1,fMax:2};
const refs=['MB-13','SB1-09','MA-14'].map(id=>SP.find(x=>x.id===id));
for(const s of [...CB,...refs]){const n=ev.evalSpell(s),b=ev.evalSpell(s,null,BEHIND),a=ev.evalSpell(s,null,AHEAD);
 console.log(s.id,s.n,'L'+s.lv,'보통',n.e.toFixed(2),'지는판',b.e.toFixed(2),'이기는판',a.e.toFixed(2),'|',s.text);}
fs.writeFileSync('comeback_draft.json',JSON.stringify(CB));
