/* ETHERION v3.67 — 바위주먹 오크(G1) [관통] · [치명] 연계
   gnome.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_* 를 고친다. 균형 도구가 data.js · rebalance.js를 다시 써도 이 파일은 그대로 남는다).

   깃발의 대표 능력은 [관통](유닛 9 · 아이템 2)과 [치명](유닛 3 · 아이템 4). 깃발 짜임과 동떨어진 마법 3장 · 아이템 1장을
   새 카드를 더하지 않고 바꿨다(카드 ID · 등급 · 레벨 그대로, 이름 · 효과 · 글을 새로).
   - [치명]은 맞은 유닛을 체력 1로 남긴다(반격에도). 받은 피해는 턴이 끝나야 돌아오므로, 같은 전투 안에 "체력 −1"이 오면 마저 쓰러진다.
     방어 마법은 앞 칸 아군이 모두 쓰러지거나 전투가 끝날 때 발동한다 → 뒤 칸에 둔 숨통 끊기가 [치명]으로 버틴 적을 끝낸다.
   - [관통]은 맞은 유닛의 방어를 이번 턴 깎는다 → 방어가 0이 된 유닛은 뼈 부수기에 쓰러진다.
   새 효과는 engine SPELL_OPS.d0Swap 하나. */
"use strict";

(function () {
  const S = id => SIM_SPELLS.find(s => s.id === id), I = id => SIM_ITEMS.find(i => i.id === id);
  const REWORK = {
    "SG1-02": { n: "숨통 끊기", kind: "def", lv: 1,   // 전: 바위 가죽 (아군 뒤 3칸 방어 +1, 체력 +1)
      text: "상대 유닛 전체 체력 −1.",
      ops: [{ op: "dmg", side: "foe", area: { t: "all" }, x: 1 }],
      brief: "{적 전체} ♥−1",
      desc: "오크는 비틀거리는 적에게 등을 보이지 않는다. 송곳니에 물려 버티던 자부터 차례로 숨통을 끊는다." },
    "SG1-08": { n: "송곳니 반격", kind: "def", lv: 3,   // 전: 산사태 (상대 뒤 3칸 피해 3)
      text: "아군 유닛 전체 체력 +2, [치명].",
      ops: [{ op: "mod", side: "ally", area: { t: "all" }, h: 2 }, { op: "grant", side: "ally", area: { t: "all" }, ab: { crit: 1 } }],
      brief: "{아군 전체} ♥+2 [치명]",
      desc: "궁지에 몰린 오크는 물러서지 않고 문다. 덤벼든 자는 살아 돌아가도 숨이 한 가닥만 남는다." },
    "MG-13": { n: "뼈 부수기", kind: "atk", lv: 3,   // 전: 대지의 분노 (상대 최강 1기 피해 2, 아군 뒤 3칸 공격 +1)
      text: "방어가 0인 상대 유닛 가운데 공격이 가장 높은 1기의 방어와 체력을 맞바꾼다(체력 0이 되어 쓰러진다).",
      ops: [{ op: "d0Swap", n: 1 }],
      brief: "{적 방어0 최강1} ⛨ ↔ ♥ (쓰러짐)",
      desc: "갑옷이 벗겨진 자에게 남은 것은 뼈뿐이다. 고르바스의 주먹은 그 뼈를 바위처럼 부순다." }
  };
  for (const id in REWORK) {
    const s = S(id), r = REWORK[id]; if (!s) continue;
    s.n = r.n; s.kind = r.kind; s.lv = r.lv; s.text = r.text; s.ops = r.ops; s.cost = {}; s.gain = {}; s.desc = r.desc;
    delete s.coin; delete s.anchor; delete s.prevText;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
  }
  /* 아이템: 오크의 문신 방어 +1 · 체력 +2 → 공격 +1 · 체력 +1 · [관통] */
  { const it = I("M2-1"); if (it) { it.a = 1; it.d = 0; it.h = 1; it.co = []; it.shred = 1;
    it.desc = "바위송곳니 오크가 첫 사냥을 마치고 주먹에 새기는 송곳니 문신. 이 주먹은 갑옷부터 찢는다."; } }
})();
