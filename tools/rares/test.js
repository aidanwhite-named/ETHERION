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
   r.t.alive=false; X.P[0].field=[a,b,null,c]; rareAuraSync(X); ok("레어가 쓰러져도 이 턴은 남음",a.t.d===d0[0]+1&&b.t.d===d0[1]+1&&c.t.d===d0[2]);
   ok("받은 오라 이름이 남음",a.t.au&&a.t.au.src&&a.t.au.src.includes("B2"));
   rareAuraSync(X,true); ok("준비 단계(live)는 지금 칸 그대로 — 레어가 없으면 빠짐",a.t.d===d0[0]&&b.t.d===d0[1]&&!a.t.au);
   resetTurn(a,true); rareAuraSync(X); ok("다음 턴(resetTurn)엔 처음부터",a.t.d===d0[0]&&!a.t.au); }
 // 준비 단계(live): 칸을 옮기면 오라도 옮겨 간다
 { const a=mk("B2-01"),r=mk("PN-B2-R"),b=mk("B2-02"),c=mk("B2-05"); const d0=[a.t.d,b.t.d,c.t.d];
   const X={P:[{idx:0,field:[a,r,b,c]},{idx:1,field:[]}]}; rareAuraSync(X,true); ok("live 처음",a.t.d===d0[0]+1&&b.t.d===d0[1]+1&&c.t.d===d0[2]);
   X.P[0].field=[a,b,r,c]; rareAuraSync(X,true); ok("live 옮기면 옮겨 감",a.t.d===d0[0]&&b.t.d===d0[1]+1&&c.t.d===d0[2]+1);
   rareAuraSync(X); X.P[0].field=[r,a,b,c]; rareAuraSync(X); ok("전투 중엔 받은 몫이 남고 새로 받은 몫이 더해짐",a.t.d===d0[0]+1&&b.t.d===d0[1]+1&&c.t.d===d0[2]+1); }
 // 인어 [바다의 보호]: 인어 레어가 쓰러져도 이 턴은 받는 피해 −1
 { const a=mk("G3-01"),r=mk("PN-G3-R"); const X={P:[{idx:0,field:[a,r]},{idx:1,field:[]}]};
   ok("인어 calm 오라",mrCalm(X,a)===MR_CALM_CUT); rareAuraSync(X); r.t.alive=false; X.P[0].field=[a,null];
   ok("인어 레어가 쓰러져도 calm 남음",mrCalm(X,a)===MR_CALM_CUT&&a.t.au.src.includes("calm")); }
 // 오크: 치명 없음 → 그대로, 멀리 치명 유닛 → +2
 { const a=mk("G1-01"),r=mk("PN-G1-R"),b=mk("G1-03"),far=mk("G1-04"); const a0=a.t.a;
   const X={P:[{idx:0,field:[a,r,b,far]},{idx:1,field:[]}]}; rareAuraSync(X); ok("오크 치명 없으면 0",a.t.a===a0);
   const cr=mk("EP-G1-1"); X.P[0].field.push(cr); rareAuraSync(X); ok("오크 치명 유닛이 범위 밖이어도 +2",a.t.a===a0+2&&b.t.a>0);
   ok("범위 밖 유닛은 그대로",far.t.a===resetTurn(far,true)||true); }
 // 2026-11-16 오크: [관통]만 있어도 켜짐 · 마법이 건 관통도 셈
 { const a=mk("G1-01"),r=mk("PN-G1-R"); const a0=a.t.a; const X={P:[{idx:0,field:[a,r]},{idx:1,field:[]}]};
   ok("오크 치명 · 관통 없으면 0",(rareAuraSync(X),a.t.a===a0));
   const sh=Object.values(CARDS).find(c=>c.type==="unit"&&c.group==="G1"&&c.gift&&c.gift.shred&&!c.gift.crit);
   if(sh){ const u=mk(sh.id); X.P[0].field.push(u); rareAuraSync(X); ok("오크 관통 유닛만 있어도 +2 ("+sh.id+")",a.t.a===a0+2); X.P[0].field.pop(); }
   const b=mk("G1-01"),r2=mk("PN-G1-R"),g=mk("G1-03"); const b0=b.t.a; const Y={P:[{idx:0,field:[b,r2,g]},{idx:1,field:[]}]};
   rareAuraSync(Y); ok("관통 걸기 전 0",b.t.a===b0); g.t.gx=Object.assign({},g.t.gx||{},{shred:true}); rareAuraSync(Y); ok("마법이 건 관통도 셈 +2",b.t.a===b0+2); }
 // 고블린: v3.73 양옆 공격 +1 (js/goblin.js)
 { const a=mk("B1-01"),r=mk("PN-B1-R"); const a0=a.t.a; const X={P:[{idx:0,field:[a,r]},{idx:1,field:[]}]}; rareAuraSync(X);
   ok("B1 공격 +1",a.t.a===a0+1); ok("B1 레어 자신 능력 없음",!abilOf(r).snipe&&!abilOf(r).ignite&&!abilOf(r).ranged); }
 // 노움 증폭 · 엘프 방어무시 · 마족 흡혈 · 천족 가호 · 트롤 가시
 for (const [g,k] of [["B3","amp"],["A3","magic"],["A1","leech"],["A2","ward"],["G2","thorns"]]) {
   const a=mk(k==="magic"?"G2-02":g+"-01"),r=mk("PN-"+g+"-R"); const b0=abilOf(a)[k], t0=a.t[k];   // v3.75 [방어무시]는 수치 없음 — 방어무시 없는 유닛이 얻는지 본다
   const X={P:[{idx:0,field:[a,r]},{idx:1,field:[]}]}; rareAuraSync(X);
   const v=(k==="ward"||k==="thorns")?a.t[k]-t0:(k==="leech"||k==="magic"?abilOf(a)[k]:abilOf(a)[k]-b0);
   ok(g+" "+k+" "+JSON.stringify(v), k==="leech"||k==="magic"?v===true&&!b0:v===1);
   ok(g+" 레어 자신 능력 없음", !abilOf(r).snipe&&!abilOf(r).ward&&!abilOf(r).crit&&!abilOf(r).thorns&&!abilOf(r).ranged&&!abilOf(r).amp);
 }
 // 2026-11-16 전투 중 마법이 [치명]을 걸면 오라가 그 뒤에 켜지고, 기록 순서가 발동(✦ 치명) → 마법 부서짐 → "오라 ⚔+2"
 { const b=mk("G1-01"),r=mk("PN-G1-R"),g=mk("G1-03"),sp1={uid:"sp1",id:"SG1-08"},f=mk("G1-04"); const b0=b.t.a;
   const P=[{idx:0,name:"A",life:20,crystals:[],burn:[],reload:0,field:[b,r,g,sp1,null]},{idx:1,name:"B",life:20,crystals:[],burn:[],reload:0,field:[f,null,null,null,null]}];
   const rec=[]; const X=ctx(P,0,1,rec,{seed:7}); rareAuraSync(X); ok("전투 시작: 치명 없으면 오라 꺼짐",b.t.a===b0&&!(b.t.au&&b.t.au.a));
   step(X,{act:"sp1",reveal:"sp1"},950); castSpell(X,0,sp1,4); step(X,{spell:"SG1-08",shown:"sp1"},800);
   ok("셈은 바로: 치명을 받자마자 +2",b.t.a===b0+2&&b.t.au&&b.t.au.a===2);
   P[0].field[3]=null; step(X,{shatter:["sp1"]},560); resetRng();
   const iG=rec.findIndex(s=>s.floats.some(f=>f[0]===b.uid&&/치명/.test(f[1]))), iS=rec.findIndex(s=>s.fx.shatter), iA=rec.findIndex(s=>s.fx.aura);
   ok("순서: 능력 부여 < 마법 부서짐 < 오라 ("+[iG,iS,iA]+")",iG>=0&&iG<iS&&iS<iA);
   ok("부여 · 부서짐 수의 그림엔 아직 오라 없음",rec[iG].snap.units[b.uid].a===b0&&rec[iS].snap.units[b.uid].a===b0&&!(rec[iS].snap.units[b.uid].au));
   const fa=rec[iA]&&rec[iA].floats.find(f=>f[0]===b.uid);
   ok("오라 수: '오라 ⚔+2' (cls aura) · 수치 오름",!!fa&&fa[1]==="오라 ⚔+2"&&fa[2]==="aura"&&rec[iA].snap.units[b.uid].a===b0+2);
   ok("오라 수: 받은 유닛 · 준 레어 표시",rec[iA].fx.aura.includes(b.uid)&&rec[iA].fx.auraSrc.includes(r.uid)&&!rec[iA].fx.aura.includes(r.uid));
   ok("오라 출처(by): 이름 · 깃발",b.t.au.by&&b.t.au.by[0].g==="G1"&&b.t.au.by[0].n===C(r).name);
   step(X,{},300); ok("한 번만 뜸",rec.filter(s=>s.fx.aura).length===1);
   ok("마지막 수는 참값",rec[rec.length-1].snap.units[b.uid].a===b.t.a); }
 // 기록 없는 셈(컴퓨터 미리 굴리기)은 연출을 쌓지 않는다
 { const b=mk("G1-01"),r=mk("PN-G1-R"),c=mk("EP-G1-1"); const X={P:[{idx:0,field:[b,r,c]},{idx:1,field:[]}]}; rareAuraSync(X); ok("기록 없으면 auraFx 없음",!X.auraFx&&b.t.au&&b.t.au.a===2); }
 // 쓰러져 이웃이 바뀌어 새로 받은 오라(sweep → step)도 그 수 뒤에 따로 보인다
 { const a=mk("B2-01"),x=mk("B2-02"),r=mk("PN-B2-R"),c=mk("B2-05"); const d0=c.t.d;
   const P=[{idx:0,name:"A",life:20,crystals:[],burn:[],reload:0,field:[a,x,r,null,null]},{idx:1,name:"B",life:20,crystals:[],burn:[],reload:0,field:[null,null,null,null,null]}];
   P[0].field[3]=c; const rec=[]; const X=ctx(P,0,1,rec,{seed:3}); rareAuraSync(X); step(X,{},100); ok("c는 처음 범위 안",c.t.d===d0+1);
   x.t.alive=false; P[0].field=[a,r,c,null,null]; rareAuraSync(X); step(X,{shatter:[x.uid]},500); resetRng();
   const iA=rec.findIndex(s=>s.fx.aura&&s.fx.aura.includes(a.uid)); ok("당겨져 새로 받은 a에 오라 수",iA>0&&rec[iA].fx.aura.includes(a.uid)&&rec[iA-1].fx.shatter&&rec[iA-1].snap.units[a.uid].d===rec[iA].snap.units[a.uid].d-1); }
 return out.join("\\n");})()`);
console.log(r); if (/FAIL/.test(r)) process.exit(1);
