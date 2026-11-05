const {make,value}=require('./lab');const ctx=make();
ctx.mkSpell('X1',{kind:'atk',lv:2,ops:[{op:'dmg',side:'foe',area:{t:'front',n:1},x:2}]});
ctx.mkSpell('X2',{kind:'atk',lv:2,ops:[{op:'pdmg',side:'foe',area:{t:'front',n:1},x:2}]});
ctx.mkSpell('X3',{kind:'atk',lv:3,ops:[{op:'summon',tok:{a:3,d:0,h:2,lv:2},stay:false}]});
ctx.mkSpell('X4',{kind:'atk',lv:4,ops:[{op:'multi',side:'foe',n:5,x:1}]});
const t0=Date.now();for(const id of ['MB-04','X1','X2','X3','X4'])console.log(id,value(ctx,id,2,'atk',1500).toFixed(2),value(ctx,id,4,'atk',1500).toFixed(2));console.log(Date.now()-t0,'ms');
