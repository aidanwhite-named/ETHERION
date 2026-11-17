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
     뒤바뀐 물길(상대 유닛을 방+체 순으로 다시 세움) · 씻김의 노래(무효로 했을 때만 상대 전체 해제 · 공격 −1). 등급은 MERMAID_GRADES.
   - v3.78 콤보: [홀림](engine mrCharm) — 코인을 뒷면으로 만들거나 · 스탯을 맞바꾸거나 · 자리를 바꾸거나 · 환각에 빠뜨린 상대 유닛은 이번 턴 홀린다.
     [마력 공격]은 홀린 상대의 방어를 수치와 상관없이 전부 피해에 더한다. 그런 마법의 글에 [홀림]을 적는다(MR_CHARM_TEXT).
     뒤집힌 물거울(해일 자리: 상대 앞 2기 공 ↔ 방) · 치유를 걸어 주는 마법(샘물 한 모금 · 치유의 조수) · 핵심 유닛의 마력 공격 2~3(MR_ARC_UP).
   - v3.79 인어 마법은 내 생명을 늘리지 않는다(맨 끝 noLife). */
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
  // v3.78 핵심 유닛의 마력 공격을 올린다(홀린 상대에게는 방어 전부라 수치는 홀리지 않은 상대에게만 의미)
  const MR_ARC_UP = { "G3-32": 3, "PN-G3-C3": 2, "PN-G3-U2": 2, "EP-G3-1": 2 };   // 무녀장(기본 덱 3장) · 넬리아의 정령까지 올리면 기본 덱 60% — 높은 레벨 · 희귀 카드만
  for (const u of SIM_UNITS) if (MR_ARC_UP[u.id]) { u.gift = u.gift || {}; u.gift.arcane = MR_ARC_UP[u.id]; }
  for (const it of SIM_ITEMS) if (it.evName && /^치유 \d/.test(it.evName)) it.evName = "생명 +" + it.evName.replace(/\D/g, "");

  const r = SIM_UNITS.find(u => u.id === MERMAID_RARE);
  if (r) r.desc = "물의 대정령 넬리아를 담는 그릇을 받든다. 그릇에서 흘러나오는 심해의 노래가 곁에 선 자들을 감싸 칼끝을 무디게 한다.";

  /* 환상 마법: 특색 없던 마법 3장을 새 효과로(카드 ID 그대로, 이름 · 등급 · 레벨 · 효과 · 글을 새로), 무효 마법 1장을 손질.
     효과는 engine 끝 "v3.68 인어 마법 효과" 절(randSwap · mindCapture · sortFoe)과 castSpell의 ifNeg */
  const REWORK = {
    "SG3-02": { n: "물빛 신기루", kind: "any", lv: 2, gr: "uncommon",   // 전: 급류 L1 일반 (상대 맨 앞 피해 2 +1C)
      text: "상대 유닛 가운데 무작위 2기의 공격과 체력을 맞바꾸고 [홀림]으로 만든다.",
      ops: [{ op: "randSwap", n: 2 }],
      brief: "{적 무작위2} ⚔ ↔ ♥ · 홀림",
      desc: "물빛이 일렁이면 눈에 비친 것이 뒤집힌다. 거인은 갈대처럼 휘청이고, 겁쟁이는 제 그림자에 놀라 칼을 휘두른다. 누가 그렇게 될지는 물결만 안다." },
    "SG3-01": { n: "환각의 통제", kind: "any", lv: 3, gr: "rare",   // 전: 물보라 L1 일반 (상대 뒤 2칸 피해 1, 생명 +1)
      text: "이 마법 바로 뒤 내 카드와 이름 글자 수(띄어쓰기 빼고)가 같은 상대 카드 가운데 맨 앞 1장을 빼앗아 내 전장 맨 뒤에 놓는다. 유닛은 판이 끝날 때까지 내 유닛이 되고, 마법은 내 마법으로 발동한다.",
      ops: [{ op: "mindCapture" }],
      brief: "{뒤 카드와 같은 글자 수의 적 카드1} 빼앗음",
      desc: "셀레네아의 무녀는 이름을 노래한다. 같은 길이의 이름을 가진 자는 그 노래를 제 이름으로 듣고, 꿈결처럼 물속 진영으로 걸어 들어온다." },
    "MC-03": { n: "뒤바뀐 물길", kind: "any", lv: 1, gr: "common",   // 전: 마력 역류 L1 일반 (상대 맨 앞 피해 1, 마도 유닛 피해 2)
      text: "상대 유닛을 방어와 체력의 합이 높은 순으로 맨 앞부터 다시 세운다(마법 칸은 그대로). 자리가 바뀐 유닛은 [홀림].",
      ops: [{ op: "sortFoe" }],
      brief: "{적 유닛} 방+체 순으로 다시 세움 · 홀림",
      desc: "물길이 바뀌면 배는 제 뜻과 상관없이 흘러간다. 단단한 자는 앞으로 떠밀리고, 날랜 자는 뒤로 밀려 칼을 뽑을 틈을 잃는다." },
    "CS-G3": { n: "씻김의 노래", kind: "atk", lv: 1, gr: "uncommon",   // 무효 마법: 무효로 했을 때만 상대 전체를 씻는다(전: 맨 앞 유닛 해제 · 피해 2)
      text: "상대 맨 앞 마법 1장을 [무효]로 한다. 무효로 했으면 상대 유닛 전체의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고 공격 −1.",
      ops: [{ op: "negate", n: 1 }, { op: "strip", side: "foe", area: { t: "all" }, ifNeg: true }, { op: "mod", side: "foe", area: { t: "all" }, a: -1, ifNeg: true }],
      brief: "{적 마법1} [무효]|무효면 {적 전체} 해제 ⚔−1",
      desc: "샘물 무녀단의 노래는 걸어 둔 것을 씻어 낸다. 펼치려던 주문이 물에 녹으면, 그 주문을 믿던 자들의 축복과 투지도 함께 씻겨 내려간다." },
    // v3.78 콤보 마법
    "MG-11": { n: "뒤집힌 물거울", kind: "any", lv: 2, gr: "uncommon",   // 전: 해일 L2 (상대 뒤 2칸 피해 2, 생명 +1)
      text: "상대 맨 앞부터 유닛 2기의 공격과 방어를 맞바꾸고 [홀림]으로 만든다([저주 면역] 유닛은 빼고).",
      ops: [{ op: "swap", side: "foe", area: { t: "front", n: 2 } }],
      brief: "{적 앞2} ⚔ ↔ ⛨ · 홀림",
      desc: "물거울에 비친 전사는 칼 대신 방패를 든 자신을 본다. 휘두르려던 힘은 껍질처럼 굳고, 무녀의 노래는 그 껍질째 꿰뚫는다." },
    "MG-03": { n: "샘물 한 모금", kind: "com", lv: 1,   // 전: 생명 +2, 아군 맨 앞 체력 +1
      text: "아군 맨 앞 유닛에게 이번 턴 [치유 2].",
      ops: [{ op: "grant", side: "ally", area: { t: "front", n: 1 }, ab: { heal: 2 } }],
      brief: "{아군 앞1} [치유 2]" },
    "MG-15": { n: "치유의 조수", kind: "com", lv: 3,   // 전: 아군 전체 체력 +2 +1C, 생명 +2
      text: "아군 유닛 전체에게 이번 턴 [치유 1]. 아군 전체 체력 +1.",
      ops: [{ op: "grant", side: "ally", area: { t: "all" }, ab: { heal: 1 } }, { op: "mod", side: "ally", area: { t: "all" }, h: 1 }],
      brief: "{아군 전체} [치유 1] ♥+1" }
  };
  for (const id in REWORK) {
    const s = SIM_SPELLS.find(x => x.id === id), w = REWORK[id]; if (!s) continue;
    s.n = w.n; s.kind = w.kind; s.lv = w.lv; s.text = w.text; s.ops = w.ops; s.cost = {}; s.gain = w.gain || {}; if (w.desc) s.desc = w.desc;
    for (const k of ["coin", "anchor", "prevText", "grp", "ccl", "dir"]) delete s[k];
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = w.brief;
    const cs = typeof COUNTER_SPELLS !== "undefined" && COUNTER_SPELLS.find(x => x.id === id);
    if (cs) Object.assign(cs, { n: w.n, lv: w.lv, kind: w.kind, text: w.text, ops: w.ops, brief: w.brief }, w.desc ? { desc: w.desc } : {});
    if (w.gr) MERMAID_GRADES[id] = w.gr;
  }

  /* v3.78 [홀림]을 거는 마법의 글: 코인 뒷면(clean) → "코인이 뒷면이 되고 [홀림]에 걸린다", 자리 · 스탯을 바꾸거나 환각에 빠뜨리는 마법은 끝에 한 줄 */
  const MR_CHARM_TEXT = { "NG3-2": "자리가 바뀐 두 유닛은 [홀림].", "PS-G3-1": "맞바꾼 유닛은 [홀림].", "MC-05": "환각에 빠진 유닛은 [홀림]." };
  for (const s of SIM_SPELLS) {
    const ops = s.ops || [];
    if (ops.some(o => o.op === "clean" && o.side === "foe") && /코인이 뒷면이 된다/.test(s.text || "")) {
      s.text = s.text.replace("코인이 뒷면이 된다", "코인이 뒷면이 되고 [홀림]에 걸린다");
      if (typeof SPELL_BRIEF !== "undefined" && SPELL_BRIEF[s.id]) SPELL_BRIEF[s.id] = SPELL_BRIEF[s.id].replace("코인 뒷면", "코인 뒷면 · 홀림");
    }
    if (MR_CHARM_TEXT[s.id] && !/홀림/.test(s.text || "")) s.text = (s.text || "") + " " + MR_CHARM_TEXT[s.id];
  }

  /* v3.79 인어 마법은 내 생명을 늘리지 않는다(사용자 결정 — 생명 회복이 너무 셌다). 생명을 주던 인어 마법 16장에서 생명 몫과 그 글을 뺀다.
     장착할 때 생명을 주는 아이템([생명 +N])은 그대로. 다른 깃발에는 생명을 주는 마법이 없다 */
  const noLife = t => String(t || "").replace(/\s*내 생명 \+\d+(?:\s*\+\d+C(?:×\d+)?)?\./g, "").trim();
  for (const s of SIM_SPELLS) {
    if (!(s.g === "G3" || /(^|-)G3(-|$)/.test(s.id))) continue;
    const had = s.gain && s.gain.life;
    if (had) delete s.gain.life;
    if (/내 생명 \+/.test(s.text || "")) s.text = noLife(s.text);
    if (typeof SPELL_BRIEF !== "undefined" && SPELL_BRIEF[s.id] && /생명/.test(SPELL_BRIEF[s.id]))
      SPELL_BRIEF[s.id] = SPELL_BRIEF[s.id].split("|").map(x => x.replace(/\s*(?:·\s*)?(?:\{나\}\s*|내\s*)?생명 \+\d+(?:\s*\+\d+C(?:×\d+)?)?/g, "").trim()).filter(Boolean).join("|");
  }

  /* v3.89 생명을 뺀 인어 마법을 [치유] · [정화]로 채운다 — 모두 아군 맨 앞 유닛 1기에만(사용자 결정, 전체 · 2기면 너무 셌다)(사용자 결정 — "물도 정화 능력"). 대해류 L4 → L3, 대해일 L4 그대로 · [장전] 없앰.
     [치유 N]은 grant(이번 턴 능력), [정화]는 engine mrPurge(지금 붙은 화상 · 불씨 · 낙인을 지우고 이번 턴 출혈 막음).
     글은 통째로 다시 쓴다(text), 핸드 글은 brief. 레벨만 바꾸는 카드는 lv */
  const HEAL = (n, area) => ({ op: "grant", side: "ally", area, ab: { heal: n } });
  const PURE = area => ({ op: "mrPurge", area });
  const ALL = { t: "all" }, F1 = { t: "front", n: 1 }, F2 = { t: "front", n: 2 };
  const MR_REFILL = {
    "SG3-09": { lv: 3, add: [HEAL(1, F1)],   // 대해류: 정화의 물결(L1)과 같아져서 L3으로(L2면 기본 덱 +3%p), 치유를 더함
      text: "상대 유닛 전체의 코인이 뒷면이 되고 [홀림]에 걸린다(코인 확률 −50%, 이미 정해진 코인은 그대로). 아군 맨 앞 유닛에게 이번 턴 [치유 1].",
      brief: "{적 전체} 코인 뒷면 · 홀림|{아군 앞1} [치유 1]" },
    "RG3-1": { lv: 4, cost: {}, add: [HEAL(1, F1)],   // 대해일: [장전 3]과 생명 +6을 빼고 L4 그대로(장전이 없어진 만큼 가벼워짐 · L3 · L5도 승률은 거의 같음), 바다가 인어에게만 숨을 돌려준다
      text: "양쪽 유닛 전체에게 피해 4. 그 뒤 아군 맨 앞 유닛에게 이번 턴 [치유 1].",
      brief: "{양쪽 전체} 피해4|{아군 앞1} [치유 1]" },
    "MG-07": { add: [PURE(F1)],   // 정화의 물결
      text: "상대 유닛 전체의 코인이 뒷면이 되고 [홀림]에 걸린다(코인 확률 −50%, 이미 정해진 코인은 그대로). 아군 맨 앞 유닛에게 이번 턴 [정화].",
      brief: "{적 전체} 코인 뒷면 · 홀림|{아군 앞1} [정화]" },
    "SG3-03": { add: [PURE(F1)],   // 물의 장막
      text: "아군 맨 앞 유닛에게 [보호막], 공격 −2, 이번 턴 [정화].",
      brief: "{아군 앞1} [보호막] ⚔−2 · [정화]" },
    "US-G3-1": { add: [PURE(F1)],   // 넬리아의 노래
      text: "상대 유닛 전체의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고, 코인이 뒷면이 되고 [홀림]에 걸린다(이미 정해진 코인은 그대로). 상대 유닛 전체에게 피해 1. 아군 맨 앞 유닛에게 이번 턴 [정화].",
      brief: "{적 전체} 능력 해제 · 코인 뒷면 · 홀림|{적 전체} 피해1|{아군 앞1} [정화]" },
    "US-G3-2": { add: [HEAL(1, F1)],   // 조수의 귀환
      text: "상대 유닛 전체에게 피해 2. 아군 전체 체력 +1. 아군 맨 앞 유닛에게 이번 턴 [치유 1].",
      brief: "{적 전체} 피해2|{아군 전체} ♥+1|{아군 앞1} [치유 1]" },
    "RS-G3-1": { add: [HEAL(1, F1)],   // 작살 물살
      text: "상대 맨 앞 유닛의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고, 피해 3. 아군 맨 앞 유닛에게 이번 턴 [치유 1].",
      brief: "{적 앞1} 해제 · 피해3|{아군 앞1} [치유 1]" },
    "RS-G3-2": { add: [PURE(F1)],   // 포말 장막
      text: "아군 맨 앞 유닛에게 [보호막], 이번 턴 [정화]. 아군 전체 체력 +1.",
      brief: "{아군 앞1} [보호막] · [정화]|{아군 전체} ♥+1" },
    "RS-G3-3": { add: [HEAL(1, F1)],   // 밀물의 노래
      text: "상대 유닛 전체의 코인이 뒷면이 되고 [홀림]에 걸린다(이미 정해진 코인은 그대로). 상대 유닛 전체에게 피해 2. 아군 전체 체력 +1. 아군 맨 앞 유닛에게 이번 턴 [치유 1].",
      brief: "{적 전체} 코인 뒷면 · 홀림 · 피해2|{아군 전체} ♥+1|{아군 앞1} [치유 1]" },
    "MC-03": { add: [HEAL(1, F1)],   // 뒤바뀐 물길
      text: "상대 유닛을 방어와 체력의 합이 높은 순으로 맨 앞부터 다시 세운다(마법 칸은 그대로). 자리가 바뀐 유닛은 [홀림]. 아군 맨 앞 유닛에게 이번 턴 [치유 1].",
      brief: "{적 유닛} 방+체 순으로 다시 세움 · 홀림|{아군 앞1} [치유 1]" },
    "MC-04": { add: [PURE(F1)],   // 기원 (글의 "기도 유닛 전체"는 cards.js가 "맨 앞 2기"로 고쳐 적는다)
      text: "아군 기도 유닛 전체 체력 +1 +1C. 아군 맨 앞 유닛에게 이번 턴 [정화].",
      brief: "{아군 앞2} ♥+1 +1C|{아군 앞1} [정화]" }
  };
  for (const id in MR_REFILL) {
    const s = SIM_SPELLS.find(x => x.id === id), w = MR_REFILL[id]; if (!s) continue;
    if (w.lv) s.lv = w.lv;
    if (w.cost) s.cost = w.cost;
    s.ops = (s.ops || []).concat(w.add); s.text = w.text;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = w.brief;
    const cs = typeof COUNTER_SPELLS !== "undefined" && COUNTER_SPELLS.find(x => x.id === id);
    if (cs) Object.assign(cs, { lv: s.lv, ops: s.ops, text: s.text, brief: w.brief });
  }

})();
