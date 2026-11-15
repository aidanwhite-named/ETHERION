/* ETHERION v3.66.1 — 번개 노움(B3) [증폭] 보강
   abyss.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_* 를 고친다. 균형 도구가 data.js · rebalance.js를 다시 써도 이 파일은 그대로 남는다).
   등급은 js/grades.js가 GNOME_GRADES를 맨 끝에 덮는다(REBAL_GRADES · ABYSS_GRADES 다음).

   - 새 공격 마법 2장(일반): 상대 유닛 여럿을 치는 공격 마법이라 [증폭]이 맞는 유닛마다 붙는다.
     [증폭]은 공격 마법(kind "atk")에만 붙으므로 둘 다 공격 마법으로 만들었다.
   - 스탯이 낮은 일반 유닛 4장(1 · 3 · 6 · 7레벨)을 고급으로 올리고 하급 능력 자리에 [증폭]을 넣었다. 스탯은 그대로. */
"use strict";

const GNOME_AMP = (n) => ({ evName: "증폭 " + n, evText: "이 유닛이 전장에 있으면 내 공격 마법의 피해 +" + n + "." });

/* ---------- 새 공격 마법 ---------- */
const GNOME_SPELLS = [
  { id: "GN-B3-1", n: "번개 바늘", g: "B3", camp: "B", lv: 2, kind: "atk",
    text: "상대 유닛 중 남은 체력이 가장 낮은 2기에게 피해 2 +1C.",
    ops: [{ op: "dmg", side: "foe", area: { t: "minH", n: 2 }, x: 2, coin: [1, 1] }],
    brief: "{적 체력 낮은 2} 피해2 +1C",
    desc: "볼타리움 공방의 구리 바늘은 가장 약한 맥을 찾아 꽂힌다. 버티던 자는 그 한 땀에 무너진다." },
  { id: "GN-B3-2", n: "뇌명 포격", g: "B3", camp: "B", lv: 4, kind: "atk",
    text: "상대 맨 앞 유닛에게 피해 4. 상대 유닛 전체에게 피해 1 +1C.",
    ops: [{ op: "dmg", side: "foe", area: { t: "front", n: 1 }, x: 4 }, { op: "dmg", side: "foe", area: { t: "all" }, x: 1, coin: [1, 1] }],
    brief: "{적 앞1} 피해4|{적 전체} 피해1 +1C",
    desc: "뇌명 고원의 축전탑이 한꺼번에 방전한다. 맨 앞을 꿰뚫은 벼락이 땅을 타고 뒤까지 번진다." }
];

/* ---------- 고급으로 올린 일반 유닛: 하급 능력 = [증폭] ---------- */
const GNOME_UP = {
  "B3-05": 1,   // 볼타리움 학도 L1 1/1/2
  "B3-13": 1,   // 볼타리움 연구생 L3 4/0/3
  "B3-29": 1,   // 케라운 연구단 L6 6/0/5
  "B3-34": 2    // 폭뢰 기관 L7 6/0/7
};

const GNOME_GRADES = {};
(function () {
  for (const id in GNOME_UP) {
    const u = SIM_UNITS.find(x => x.id === id); if (!u) continue;
    u.gift = Object.assign({}, u.gift || {}, GNOME_AMP(GNOME_UP[id]));
    GNOME_GRADES[id] = "uncommon";
  }
  for (const s of GNOME_SPELLS) {
    const c = Object.assign({}, s); delete c.brief;
    SIM_SPELLS.push(c);
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[s.id] = s.brief;
  }
})();
