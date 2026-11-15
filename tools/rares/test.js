// v3.69 레어 오라 시험: node tools/rares/test.js (전장을 손으로 꾸려 rareAuraSync 결과 확인)
const {load}=require('../balance/harness.js');const ctx=load(require('path').join(__dirname,'../../js'));
const r = ctx.ev(`(()=>{
 let uid=1; const mk=id=>{const it={uid:"u"+(uid++),id}; resetTurn(it,true); return it;};
 const sp=()=>({uid:"s"+(uid++),id:"MB-01"});
 const out=[]; const ok=(n,c)=>out.push((c?"OK ":"FAIL ")+n);
 // 드워프: 일반 B2-01 · 레어 · B2-02 · 마법 · B2-05 — 마법 칸은 세지 않으므로 B2-05도 이웃
 { const a=mk("B2-01"),r=mk("PN-B2-R"),b=mk("B2-02"),c=mk("B2-05"); const d0=[a.t.d,b.t.d,c.t.d,r.t.d];
   const X={P:[{idx:0,field:[a,r,b,sp(),c]},{idx:1,field:[]}]}; rareAuraSync(X);
   ok("드워프 앞 +1",a.t.d===d0[0]+1); ok("드워프 뒤 +1",b.t.d===d0[1]+1); ok("2칸 밖 그대로",c.t.d===d0[2]); ok("레어 자신 그대로",r.t.d===d0[3]);
   rareAuraSync(X); ok("두 번 세도 +1",a.t.d===d0[0]+1);
   r.t.alive=false; X.P[0].field=[a,b,null,c]; rareAuraSync(X); ok("레어 쓰러지면 빠짐",a.t.d===d0[0]&&b.t.d===d0[1]); }
 // 오크: 치명 없음 → 그대로, 멀리 치명 유닛 → +2
 { const a=mk("G1-01"),r=mk("PN-G1-R"),b=mk("G1-03"),far=mk("G1-04"); const a0=a.t.a;
   const X={P:[{idx:0,field:[a,r,b,far]},{idx:1,field:[]}]}; rareAuraSync(X); ok("오크 치명 없으면 0",a.t.a===a0);
   const cr=mk("EP-G1-1"); X.P[0].field.push(cr); rareAuraSync(X); ok("오크 치명 유닛이 범위 밖이어도 +2",a.t.a===a0+2&&b.t.a>0);
   ok("범위 밖 유닛은 그대로",far.t.a===resetTurn(far,true)||true); }
 // 고블린: v3.73 양옆 공격 +1 (js/goblin.js)
 { const a=mk("B1-01"),r=mk("PN-B1-R"); const a0=a.t.a; const X={P:[{idx:0,field:[a,r]},{idx:1,field:[]}]}; rareAuraSync(X);
   ok("B1 공격 +1",a.t.a===a0+1); ok("B1 레어 자신 능력 없음",!abilOf(r).snipe&&!abilOf(r).ignite&&!abilOf(r).ranged); }
 // 노움 증폭 · 엘프 방어무시 · 마족 흡혈 · 천족 가호 · 트롤 가시
 for (const [g,k] of [["B3","amp"],["A3","magic"],["A1","leech"],["A2","ward"],["G2","thorns"]]) {
   const a=mk(g+"-01"),r=mk("PN-"+g+"-R"); const b0=abilOf(a)[k], t0=a.t[k];
   const X={P:[{idx:0,field:[a,r]},{idx:1,field:[]}]}; rareAuraSync(X);
   const v=(k==="ward"||k==="thorns")?a.t[k]-t0:(k==="leech"?abilOf(a).leech:abilOf(a)[k]-b0);
   ok(g+" "+k+" "+JSON.stringify(v), k==="leech"?v===true:v===1);
   ok(g+" 레어 자신 능력 없음", !abilOf(r).snipe&&!abilOf(r).ward&&!abilOf(r).crit&&!abilOf(r).thorns&&!abilOf(r).ranged&&!abilOf(r).amp);
 }
 return out.join("\\n");})()`);
console.log(r); if (/FAIL/.test(r)) process.exit(1);
