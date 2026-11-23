// 기본 덱 규칙: 바닐라 일반·고급 유닛 · 일반/고급 마법 + 레어 마법 1 · 일반/고급 아이템 2
const ctx=require('./lib')();
const L=ctx.ev('CARD_LIST'),CARDS=ctx.ev('CARDS');
const ok=g=>g==='common'||g==='uncommon';
const isSpell=c=>c.type!=='unit'&&c.type!=='item';
const van=c=>c.type==='unit'&&ok(c.grade)&&!Object.keys(c.gift||{}).length&&!c.rev&&!c.pin&&!c.team&&!c.lock&&!c.legend;
const classFits=ctx.ev('classFits');
function pool(g){const cs=L.filter(c=>c.group===g&&!c.retired);
  const units=cs.filter(van);
  const items=cs.filter(c=>c.type==='item'&&ok(c.grade)&&!(c.item&&c.item.set));
  return {units,spells:cs.filter(c=>isSpell(c)&&ok(c.grade)),rares:cs.filter(c=>isSpell(c)&&c.grade==='rare'),
    items:items.filter(it=>units.filter(u=>classFits(it,u)).length>=units.length*0.5)};}
const lim=c=>c.limit||4;
function check(g,d){const P=pool(g);const S=id=>CARDS[id];let n=0,u=0,s=0,r=0,it=0,err=[];
  for(const id in d){const c=S(id),k=d[id];n+=k;if(!c||c.group!==g||c.retired)err.push('bad '+id);
    if(k>lim(c))err.push('copies '+id);
    if(P.units.includes(c))u+=k;else if(P.spells.includes(c)){s+=k;if(k>3)err.push('sp>3 '+id);}else if(P.rares.includes(c)){r+=k;}else if(c.type==='item'&&ok(c.grade))it+=k;else err.push('notallowed '+id);}
  if(n!==50)err.push('n='+n);if(r!==1)err.push('rare='+r);if(it!==2)err.push('items='+it);if(s+r<13||s+r>17)err.push('spells='+(s+r));
  const lv=x=>Object.keys(d).filter(id=>P.units.includes(S(id))&&x(S(id).lv)).reduce((a,id)=>a+d[id],0);
  if(lv(l=>l<=2)<9)err.push('low<9');if(lv(l=>l>=6)>8)err.push('high>8');
  return {ok:!err.length,err,u,s,r,it};}
module.exports={ctx,L,CARDS,pool,check,lim,van};
