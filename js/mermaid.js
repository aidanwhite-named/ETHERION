/* ETHERION v3.68 — 푸른비늘 인어(G3): 치유와 환상
   orc.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_* 를 고친다. 균형 도구가 data.js · rebalance.js를 다시 써도 이 파일은 그대로 남는다).
   규칙은 js/engine.js 끝 "v3.68 푸른비늘 인어" 절(mrArc · mrHeal · mrCalm), 카드 글은 js/cards.js ITEM_KW.

   - 옛 [마력 공격 N](방어를 N 무시)은 모든 깃발에서 이름만 [방어무시 N]으로 바뀌었다(데이터 키 magic 그대로).
   - 인어의 [마력 공격 N](키 arcane): 맞붙을 때(공격 · 반격) 상대 방어 가운데 N까지는 막지 못하고 피해에 더해진다.
     → 인어 유닛 · 아이템의 옛 마력 공격(magic)을 같은 수치의 새 마력 공격으로.
   - [치유 N](키 heal): 맞붙음에서 살아남을 때마다 받은 피해 N을 채운다. → 인어의 [가호 N]을 [치유 N+1]로.
   - 레어 넬리아의 물그릇 무녀: [가호 1] → 오라 [바다의 보호 1](키 calm = 오라 범위): 양옆 1칸 아군이 받는 피해 −1, 쓰고 사라지지 않는다.
   - 장착할 때 생명을 주던 아이템의 [치유 N]은 [생명 +N]으로(인어 아닌 계약의 인장도).
   - 환상 마법(아래 REWORK): 물빛 신기루(무작위 공 ↔ 체) · 환각의 통제(뒤 카드와 이름 글자 수가 같은 상대 카드를 빼앗음) ·
     뒤바뀐 물길(상대 유닛을 방+체 순으로 다시 세움) · 씻김의 노래(무효로 했을 때만 상대 전체 해제 · 공격 −1). 등급은 MERMAID_GRADES. */
"use strict";

const MERMAID_RARE = "PN-G3-R";
const MERMAID_GRADES = {};   // js/grades.js가 맨 끝에 덮는다
(function () {
  const isG3 = x => x && (x.g === "G3" || /(^|-)G3(-|$)/.test(x.id));
  const conv = o => {
    if (o.magic && o.magic !== true) { o.arcane = (o.arcane || 0) + o.magic; delete o.magic; }
    if (o.ward) { o.heal = (o.heal || 0) + o.ward + 1; delete o.ward; }
  };
  for (const u of SIM_UNITS) {
    if (!isG3(u) || !u.gift) continue;
    if (u.id === MERMAID_RARE) { delete u.gift.ward; u.gift.calm = 1; continue; }
    conv(u.gift);
  }
  for (const it of SIM_ITEMS) if (isG3(it)) conv(it);
  for (const it of SIM_ITEMS) if (it.evName && /^치유 \d/.test(it.evName)) it.evName = "생명 +" + it.evName.replace(/\D/g, "");

  const r = SIM_UNITS.find(u => u.id === MERMAID_RARE);
  if (r) r.desc = "물의 대정령 넬리아를 담는 그릇을 받든다. 그릇에서 흘러나오는 심해의 노래가 곁에 선 자들을 감싸 칼끝을 무디게 한다.";

  /* 환상 마법: 특색 없던 마법 3장을 새 효과로(카드 ID 그대로, 이름 · 등급 · 레벨 · 효과 · 글을 새로), 무효 마법 1장을 손질.
     효과는 engine 끝 "v3.68 인어 마법 효과" 절(randSwap · mindCapture · sortFoe)과 castSpell의 ifNeg */
  const REWORK = {
    "SG3-02": { n: "물빛 신기루", kind: "any", lv: 2, gr: "uncommon",   // 전: 급류 L1 일반 (상대 맨 앞 피해 2 +1C)
      text: "상대 유닛 가운데 무작위 2기의 공격과 체력을 맞바꾼다.",
      ops: [{ op: "randSwap", n: 2 }],
      brief: "{적 무작위2} ⚔ ↔ ♥",
      desc: "물빛이 일렁이면 눈에 비친 것이 뒤집힌다. 거인은 갈대처럼 휘청이고, 겁쟁이는 제 그림자에 놀라 칼을 휘두른다. 누가 그렇게 될지는 물결만 안다." },
    "SG3-01": { n: "환각의 통제", kind: "any", lv: 3, gr: "rare",   // 전: 물보라 L1 일반 (상대 뒤 2칸 피해 1, 생명 +1)
      text: "이 마법 바로 뒤 내 카드와 이름 글자 수(띄어쓰기 빼고)가 같은 상대 카드 가운데 맨 앞 1장을 빼앗아 내 전장 맨 뒤에 놓는다. 유닛은 판이 끝날 때까지 내 유닛이 되고, 마법은 내 마법으로 발동한다.",
      ops: [{ op: "mindCapture" }],
      brief: "{뒤 카드와 같은 글자 수의 적 카드1} 빼앗음",
      desc: "셀레네아의 무녀는 이름을 노래한다. 같은 길이의 이름을 가진 자는 그 노래를 제 이름으로 듣고, 꿈결처럼 물속 진영으로 걸어 들어온다." },
    "MC-03": { n: "뒤바뀐 물길", kind: "any", lv: 1, gr: "common",   // 전: 마력 역류 L1 일반 (상대 맨 앞 피해 1, 마도 유닛 피해 2)
      text: "상대 유닛을 방어와 체력의 합이 높은 순으로 맨 앞부터 다시 세운다(마법 칸은 그대로). 내 생명 +1.",
      ops: [{ op: "sortFoe" }], gain: { life: 1 },
      brief: "{적 유닛} 방+체 높은 순으로 다시 세움|{나} 생명 +1",
      desc: "물길이 바뀌면 배는 제 뜻과 상관없이 흘러간다. 단단한 자는 앞으로 떠밀리고, 날랜 자는 뒤로 밀려 칼을 뽑을 틈을 잃는다." },
    "CS-G3": { n: "씻김의 노래", kind: "atk", lv: 1, gr: "uncommon",   // 무효 마법: 무효로 했을 때만 상대 전체를 씻는다(전: 맨 앞 유닛 해제 · 피해 2)
      text: "상대 맨 앞 마법 1장을 [무효]로 한다. 무효로 했으면 상대 유닛 전체의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고 공격 −1.",
      ops: [{ op: "negate", n: 1 }, { op: "strip", side: "foe", area: { t: "all" }, ifNeg: true }, { op: "mod", side: "foe", area: { t: "all" }, a: -1, ifNeg: true }],
      brief: "{적 마법1} [무효]|무효면 {적 전체} 해제 ⚔−1",
      desc: "샘물 무녀단의 노래는 걸어 둔 것을 씻어 낸다. 펼치려던 주문이 물에 녹으면, 그 주문을 믿던 자들의 축복과 투지도 함께 씻겨 내려간다." }
  };
  for (const id in REWORK) {
    const s = SIM_SPELLS.find(x => x.id === id), w = REWORK[id]; if (!s) continue;
    s.n = w.n; s.kind = w.kind; s.lv = w.lv; s.text = w.text; s.ops = w.ops; s.cost = {}; s.gain = w.gain || {}; s.desc = w.desc;
    for (const k of ["coin", "anchor", "prevText", "grp", "ccl", "dir"]) delete s[k];
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = w.brief;
    const cs = typeof COUNTER_SPELLS !== "undefined" && COUNTER_SPELLS.find(x => x.id === id);
    if (cs) Object.assign(cs, { n: w.n, lv: w.lv, kind: w.kind, text: w.text, ops: w.ops, brief: w.brief, desc: w.desc });
    MERMAID_GRADES[id] = w.gr;
  }
})();
