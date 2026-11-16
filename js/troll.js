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
      text: "방어가 가장 높은 상대 유닛 1기에게 피해(그 유닛의 방어 ×2, 최소 2).",
      ops: [{ op: "armorCrush", area: { t: "maxD", n: 1 }, mul: 2, min: 2 }],
      brief: "{적 방어 최고1} 피해 ⛨×2 (최소 2)",
      desc: "덩굴은 갑옷의 이음매를 찾아 파고든다. 갑옷이 두꺼울수록 더 깊이 박혀 더 세게 조인다." },
    "NG2-1": { n: "뿌리 파고들기", kind: "atk", lv: 2,   // 전: 화살비 (상대 무작위 유닛에게 물리 피해 2를 2번)
      text: "방어가 1 이상인 상대 유닛 전체에게 피해(각자 방어 +1).",
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
    "SG2-05": { n: "수액 몰아주기", kind: "com", lv: 1,   // 전: 재생의 수액 (아군 전체 체력 +2 +1C — 뺀 카드 나이테 보호와 글이 같았다)
      text: "체력이 가장 높은 아군 1기에게 다른 아군 유닛의 체력을 1만 남기고 모두 몰아준다(내준 유닛마다 +1). 그 1기는 이번 턴 [수호].",
      ops: [{ op: "hpGather", bonus: 1, taunt: true }],
      brief: "{아군} ♥ → 1|모두 {♥ 최고1}에게 (+1씩) · 수호",
      desc: "트롤들이 고목 밑동에 손바닥을 댄다. 온몸의 수액이 뿌리를 타고 한 그루에게로 흘러가, 그 고목만 터질 듯 부풀어 오른다." },
    "SG2-08": { n: "고목 내려찍기", kind: "com", lv: 3,   // 전: 숲의 진격 (아군 뒤 3칸의 유닛 공격 +2)
      text: "상대 유닛 전체에게 피해(체력이 가장 높은 아군 1기의 남은 체력 ÷ 상대 유닛 수, 내림 — 이번 턴 수액 몰아주기로 받은 체력은 두 번 센다). 그 뒤 그 아군의 체력은 1이 된다.",
      ops: [{ op: "hpSlam", sapMul: 2 }],
      brief: "{적 전체} 피해 = {♥ 최고1} ♥ ÷ 적 수|몰아 받은 ♥ ×2 · 그 뒤 ♥ 1",
      desc: "고목이 뿌리째 몸을 일으켜, 품은 수액의 무게를 통째로 실어 내리찍는다. 땅이 꺼지고, 고목은 껍질만 남아 휘청인다." }
  };
  for (const id in REWORK) {
    const s = S(id), r = REWORK[id]; if (!s) continue;
    s.n = r.n; s.kind = r.kind; s.lv = r.lv; s.text = r.text; s.ops = r.ops; s.cost = {}; s.gain = {}; s.desc = r.desc;
    delete s.coin; delete s.anchor; delete s.prevText; delete s.grp; delete s.ccl; delete s.dir; delete s.v14;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
  }
})();
