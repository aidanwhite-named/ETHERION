const C=require('./common.js');const {makeEval}=require('./spell_eval.js');
const R=require('./spells_tuned.json');const SP=C.SPELLS.map(s=>R[s.id]?Object.assign({},s,{ops:R[s.id].ops,cost:R[s.id].cost||s.cost,gain:R[s.id].gain||s.gain}):s);
const ev=makeEval(C.UNITS,C.durOf(C.UNITS),SP,1500,[0,1],false);const all={t:'all'};
const BEHIND={mMin:1,mMax:2,fMin:3,fMax:4},AHEAD={mMin:3,mMax:4,fMin:1,fMax:2};
const V=[
 ['A3a',{camp:'A',g:'A3',lv:6,kind:'com',ops:[{op:'rest',side:'foe',area:all},{op:'dmg',side:'foe',area:all,x:2}],cost:{life:3,ether:2}}],
 ['A3b',{camp:'A',g:'A3',lv:6,kind:'com',ops:[{op:'rest',side:'foe',area:all},{op:'dmg',side:'ally',area:all,x:2}],cost:{ether:2}}],
 ['A3c',{camp:'A',g:'A3',lv:5,kind:'com',ops:[{op:'rest',side:'foe',area:all},{op:'dmg',side:'ally',area:all,x:1}],cost:{life:2,ether:2}}],
];
for(const [nm,s] of V){s.id='X'+nm;const n=ev.evalSpell(s),b=ev.evalSpell(s,null,BEHIND),a=ev.evalSpell(s,null,AHEAD);console.log(nm,'보통',n.e.toFixed(2),'지는판',b.e.toFixed(2),'이기는판',a.e.toFixed(2));}
