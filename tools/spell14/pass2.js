const lab=require('./lab');const ctx=lab.make();const CAL=require('./calib3.json');const N=3000;
const lv=(id,spec,L)=>{const R=CAL[L].rows;const my=R.reduce((s,r)=>s+r.lv+r.cost,0)/R.length,mx=R.reduce((s,r)=>s+r.v,0)/R.length;ctx.mkSpell(id,spec);
 const roles=spec.kind==='com'?['atk','def']:[spec.kind];const v=Math.max(...roles.map(r=>lab.rawValue(ctx,id,L,r,N)));const c=((spec.cost||{}).ether||0)+0.3*((spec.cost||{}).life||0);return (my+(v-mx)/2.5-c).toFixed(2);};
const T=[
 ['화살비 2×3 장전1',{kind:'atk',ops:[{op:'multi',side:'foe',n:3,x:2,phys:true}],cost:{ether:1}},5],
 ['화살비 2×2',{kind:'atk',ops:[{op:'multi',side:'foe',n:2,x:2,phys:true}]},4],
 ['화살비 2×2 @5',{kind:'atk',ops:[{op:'multi',side:'foe',n:2,x:2,phys:true}]},5],
 ['그림자늑대 3/0/1',{kind:'atk',ops:[{op:'summon',stay:false,tok:{a:3,d:0,h:1,lv:2}}]},3],
 ['그림자늑대 3/0/2 @4',{kind:'atk',ops:[{op:'summon',stay:false,tok:{a:3,d:0,h:2,lv:2}}]},4],
 ['우두머리 3/0/3',{kind:'atk',ops:[{op:'summon',stay:true,tok:{a:3,d:0,h:3,lv:4}}]},5],
 ['우두머리 4/0/2 @6',{kind:'atk',ops:[{op:'summon',stay:true,tok:{a:4,d:0,h:2,lv:4}}]},6],
 ['우두머리 5/0/3 @6',{kind:'atk',ops:[{op:'summon',stay:true,tok:{a:5,d:0,h:3,lv:4}}]},6],
 ['대지진동 2 @6',{kind:'com',ops:[{op:'pdmg',side:'foe',area:{t:'all'},x:2}]},6],
 ['메테오 3 @6',{kind:'atk',ops:[{op:'multi',side:'foe',n:3,x:2}],cost:{ether:1}},6],
 ['연쇄번개 3 @6',{kind:'atk',ops:[{op:'chain',xs:[3,2,1]}]},6],
 ['계약악마 4/0/1 생2 @5',{kind:'atk',ops:[{op:'summon',stay:true,tok:{a:4,d:0,h:1,lv:4}}],cost:{life:2}},5],
 ['파수골렘 1/2/4 @6',{kind:'def',ops:[{op:'summon',stay:true,tok:{a:1,d:2,h:4,lv:3}}]},6],
 ['철갑포탄 3 @4',{kind:'atk',ops:[{op:'pdmg',side:'foe',area:{t:'front',n:1},x:3}]},4],
 ['별똥별 1×2 @3',{kind:'atk',ops:[{op:'multi',side:'foe',n:2,x:1}]},3],
 ['분열화염구 1 @5',{kind:'atk',ops:[{op:'dmg',side:'foe',area:{t:'front',n:1},x:1},{op:'echo',k:2,spec:{kind:'atk',ops:[{op:'dmg',side:'foe',area:{t:'front',n:1},x:1}]}}]},5],
 ['방패벽 d2 @3',{kind:'def',ops:[{op:'guard',d:2}]},3],
 ['역류 2 @3',{kind:'atk',ops:[{op:'swapPos'},{op:'dmg',side:'foe',area:{t:'front',n:1},x:2}]},3],
 ['비교: 마법 피해 3 맨앞 @4',{kind:'atk',ops:[{op:'dmg',side:'foe',area:{t:'front',n:1},x:3}]},4],
 ['비교: 마법 피해 2 전체 @5',{kind:'com',ops:[{op:'dmg',side:'foe',area:{t:'all'},x:2}]},5],
];
T.forEach(([n,s,L],i)=>console.log(n.padEnd(24),'판',L,'→',lv('P'+i,s,L)));
