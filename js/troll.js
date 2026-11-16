/* ETHERION v3.75 — 이끼 트롤(G2): 갑옷째 조이기
   newabil.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_SPELLS를 고친다. 균형 도구가 data.js를 다시 써도 이 파일은 그대로 남는다).

   트롤은 체력으로 버티는 깃발이라 방어가 높은 상대(드워프 · 천족)를 뚫을 길이 없었다. 다른 깃발의 깎기(엘프) · 화살(엘프)과 같던 마법 3장을
   "갑옷이 두꺼울수록 깊이 박히는 덩굴 · 뿌리"로 바꿨다(카드 ID · 등급 · 레벨 · 종류 그대로, 이름 · 효과 · 글을 새로).
   - 마법 피해는 원래 방어로 막지 못한다. 여기에 "피해 = 그 유닛의 방어 ×"를 붙여, 방어가 높을수록 더 크게 맞는다. 방어 0인 상대에게는 약하다.
   - 갑옷째 휘감기는 방어도 이번 턴 0으로 만든다 → 공격 턴이면 뒤에 오는 아군 유닛이 맨몸을 친다.
   새 효과는 engine SPELL_OPS.armorCrush 하나(engine.js 끝 "v3.75 이끼 트롤" 절).
   v3.76 콤보 한 쌍 — 수액 몰아주기(SG2-05) · 고목 내려찍기(SG2-08): engine SPELL_OPS.hpGather · hpSlam(engine.js 끝 "v3.76 이끼 트롤" 절). */
"use strict";

(function () {
  const S = id => SIM_SPELLS.find(s => s.id === id);
  const REWORK = {
    "SG2-01": { n: "덩굴 조이기", kind: "atk", lv: 1,   // 전: 덩굴 채찍 (상대 맨 앞 유닛 공격 −3, 피해 2)
      text: "방어가 가장 높은 상대 유닛 1기에게 피해(그 유닛의 방어 ×2).",
      ops: [{ op: "armorCrush", area: { t: "maxD", n: 1 }, mul: 2 }],   // v3.85 최소 2를 뺐다(사용자): 방어 0이면 피해 0
      brief: "{적 방어 최고1} 피해 ⛨×2",
      desc: "덩굴은 갑옷의 이음매를 찾아 파고든다. 갑옷이 두꺼울수록 더 깊이 박혀 더 세게 조인다." },
    "NG2-1": { n: "뿌리 파고들기", kind: "atk", lv: 2,   // 전: 화살비 (상대 무작위 유닛에게 물리 피해 2를 2번)
      text: "방어가 1 이상인 상대 유닛은 각자의 방어 +1의 피해를 입는다.",
      ops: [{ op: "armorCrush", area: { t: "all" }, need: 1, mul: 1, base: 1 }],
      brief: "{적 방어 있는 전체} 피해 ⛨+1",
      desc: "땅 밑을 기어 온 뿌리가 갑옷 틈마다 솟는다. 맨몸인 자는 뿌리가 그냥 지나쳐 간다." },
    "MC-14": { n: "갑옷째 휘감기", kind: "com", lv: 3,   // 전: 덩굴 휘감기 (상대 전체 방어 −1, 맨 앞 2기 공격 −4 · 방어 −1 더)
      text: "상대 유닛 전체가 자기 방어만큼 피해를 받고, 이번 턴 방어가 0이 된다.",
      ops: [{ op: "armorCrush", area: { t: "all" }, need: 1, mul: 1, zero: true }],
      brief: "{적 전체} 피해 = ⛨|그 뒤 ⛨ 0",
      desc: "수많은 덩굴이 갑옷째 적을 휘감아 조인다. 비틀려 벗겨진 갑옷은 이끼 밑으로 가라앉는다." },
    /* v3.76 콤보 한 쌍: 수액 몰아주기로 아군 체력을 한 유닛에 모으고, 고목 내려찍기로 그 체력을 상대 전체에 떨어뜨린다(engine hpGather · hpSlam).
       두 장이 한 손에 함께 들어오기 어려워 크게 만들었다. 쓰고 나면 아군이 모두 체력 1이 되어 상대 마법 · 반격에 약하다. 트롤의 [재생]은 맞붙음마다 도로 채운다. */
    "SG2-05": { n: "수액 몰아주기", kind: "com", lv: 2,   // v3.85 L1 → 2   // 전: 재생의 수액 (아군 전체 체력 +2 +1C — 뺀 카드 나이테 보호와 글이 같았다)
      text: "체력이 가장 높은 아군 1기에게 다른 아군 유닛의 체력을 1만 남기고 모두 몰아준다(내준 유닛마다 +1). 그 1기는 이번 턴 [수호].",
      ops: [{ op: "hpGather", bonus: 1, taunt: true }],
      brief: "{아군} ♥ → 1|모두 {♥ 최고1}에게 (+1씩) · 수호",
      desc: "트롤들이 고목 밑동에 손바닥을 댄다. 온몸의 수액이 뿌리를 타고 한 그루에게로 흘러가, 그 고목만 터질 듯 부풀어 오른다." },
    "SG2-08": { n: "고목 내려찍기", kind: "com", lv: 4,   // v3.85 L3 → 4 · 등급 에픽(TROLL_GRADES)   // 전: 숲의 진격 (아군 뒤 3칸의 유닛 공격 +2) · v3.82 혼자 써도 되게
      text: "체력이 가장 높은 아군 유닛의 체력은 절반이 되고(내림), 감소한 만큼 방어력이 1 이상인 상대 유닛에게 피해.",
      ops: [{ op: "hpSlam", half: true, need: 1 }],   // v3.84.1 글 · 규칙 바꿈(사용자): 절반으로 줄어든 만큼 · 방어 1 이상인 상대만
      brief: "{♥ 최고1} ♥ 절반|줄어든 만큼 {적 방어 있는 전체} 피해",
      desc: "고목이 뿌리째 몸을 일으켜, 품은 수액의 무게를 실어 내리찍는다. 땅이 꺼지고, 고목은 껍질 절반을 잃는다." },
    /* v3.82 버틴 만큼 친다: 베르단의 가호(방어 +1 +1C · 체력 +1, 고목의 장막 · 베르단의 고목과 겹침)를 바꿈 */
    "MG-14": { n: "숲의 무게", kind: "com", lv: 3,   // 전: 베르단의 가호 L3 고급 (아군 전체 방어 +1 +1C, 체력 +1)
      text: "아군 유닛의 남은 체력을 모두 더한 만큼, 상대 맨 앞 유닛부터 공격 → 방어 → 체력 순으로 깎는다(공격 · 방어는 이번 턴). 다 깎아 쓰러뜨리면 남은 몫은 다음 유닛에게 넘어간다.",
      ops: [{ op: "g2Weight" }],
      brief: "{적 앞부터} ⚔ → ⛨ → ♥ 깎기|몫 = {아군} ♥ 합 · 남으면 다음으로",
      desc: "숲 전체가 한쪽으로 기운다. 버텨 온 몸뚱이들의 무게가 그대로 쏟아져, 앞을 막은 것부터 차례로 짓눌린다." }
  };
  for (const id in REWORK) {
    const s = S(id), r = REWORK[id]; if (!s) continue;
    s.n = r.n; s.kind = r.kind; s.lv = r.lv; s.text = r.text; s.ops = r.ops; s.cost = {}; s.gain = {}; s.desc = r.desc;
    delete s.coin; delete s.anchor; delete s.prevText; delete s.grp; delete s.ccl; delete s.dir; delete s.v14;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
  }
})();

/* v3.85 트롤 마법 손질(사용자): 레벨이 낮은데 센 마법을 올리거나 줄이고, 높은데 약한 마법을 내렸다. 측정은 docs/CHANGELOG.md v3.85.0.
   다른 파일(highcards · pincards · rarespells · counterspells · data)에 있는 카드라 여기서 고친다(이 파일은 그 뒤, cards.js 앞에 읽는다).
   등급은 TROLL_GRADES — grades.js가 맨 뒤에 덮는다. */
const TROLL_GRADES = { "US-G2-1": "uncommon", "SG2-08": "epic" };
(function () {
  const S = id => SIM_SPELLS.find(s => s.id === id);
  const B1 = { t: "back", n: 1 };
  const P = {
    "US-G2-2": { lv: 2, text: "아군 유닛마다 공격 + (자기 남은 체력의 절반, 올림).", brief: "{아군 전체} ⚔ + 자기 ♥의 절반" },   // 고목의 분노: 전투 시작에 먼저 발동(opening)은 그대로, 글만 뺌
    "SG2-09": { lv: 3 },   // 베르단의 고목 L4 → 3
    "CS-G2": { lv: 2,      // 이끼 덮기 L1 → 2, 강화는 무효로 했을 때만
      text: "상대 맨 앞 마법 1장을 [무효]로 한다. 무효로 했으면 아군 맨 앞 2기 공격 +1, 체력 +2.",
      ops: [{ op: "negate", n: 1 }, { op: "negBuff", side: "ally", area: { t: "front", n: 2 }, a: 1, h: 2 }],
      brief: "{적 마법1} [무효]|무효로 했으면 {아군 앞2} ⚔+1 ♥+2" },
    "PS-G2-1": {           // 나이테: 아군 전체 → 아군 유닛 1
      text: "아군 뒤 1칸의 유닛 체력 +2, 이번 턴 [버팀: 체력], 방어 +1.",
      ops: [{ op: "mod", side: "ally", area: B1, h: 2 }, { op: "pin", side: "ally", area: B1, st: ["h"], m: "U" }, { op: "mod", side: "ally", area: B1, d: 1 }],
      brief: "{아군 뒤1} ♥+2 [버팀: 체력] ⛨+1" },
    "RS-G2-2": {           // 가시 덤불: 맨 앞 2기 → 아군 전체(v3.85.1)
      text: "아군 전체 체력 +3, [가시 2].",
      ops: [{ op: "mod", side: "ally", area: { t: "all" }, h: 3 }, { op: "thorns", side: "ally", area: { t: "all" }, x: 2 }],
      brief: "{아군 전체} ♥+3 [가시 2]" },
    "US-G2-1": {           // 재생의 숲: 아군 전체 → 아군 유닛 1, 등급 에픽 → 고급
      text: "아군 뒤 1칸의 유닛 체력 +3, [가시 2].",
      ops: [{ op: "mod", side: "ally", area: B1, h: 3 }, { op: "thorns", side: "ally", area: B1, x: 2 }],
      brief: "{아군 뒤1} ♥+3 [가시 2]" },
    "MC-11": {             // 침묵: 피해 4 → 3
      text: "상대 맨 앞 2기의 공격이 0이 되고, 피해 3을 받는다.",
      opsFix: s => s.ops.forEach(o => { if (o.op === "dmg") o.x = 3; }),
      brief: null },
    "RS-G2-3": {           // 끈질긴 이끼: 상대 피해 1을 뺌
      text: "아군 전체 체력 +2, [불굴].",
      opsFix: s => { s.ops = s.ops.filter(o => !(o.op === "dmg" && o.side === "foe")); },
      brief: "{아군 전체} ♥+2 [불굴]" },
    "RG2-1": { lv: 3 },    // 숲의 정적 L4 → 3
    "SG2-08": { limit: 1 } // 고목 내려찍기: 에픽 마법은 덱에 1장(highcards 에픽 마법과 같게)
  };
  for (const id in P) {
    const s = S(id), r = P[id]; if (!s) continue;
    if (r.lv) s.lv = r.lv;
    if (r.text) s.text = r.text;
    if (r.ops) s.ops = r.ops;
    if (r.opsFix) r.opsFix(s);
    if (id === "US-G2-1") delete s.limit;   // 고급이 되어 1장 제한(에픽 마법)을 풀었다
    if (r.limit) s.limit = r.limit;
    if (typeof SPELL_BRIEF !== "undefined") {
      if (r.brief) SPELL_BRIEF[id] = r.brief;
      else if (id === "MC-11" && SPELL_BRIEF[id]) SPELL_BRIEF[id] = SPELL_BRIEF[id].replace(/피해\s*4/, "피해3");
    }
  }
})();
