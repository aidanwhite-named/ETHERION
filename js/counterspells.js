/* ETHERION — 무효 마법 (v3.32)
   깃발마다 1장, 모두 9장. 상대가 방어 턴에 뒷면으로 놓은 마법을 [무효]로 하는 공격 마법이다(내 공격 턴에만 낸다).
   rarespells.js 다음, upgrades.js · decks.js · cards.js 앞에 읽는다(균형 도구가 data.js를 다시 써도 이 파일은 그대로 남는다).
   등급은 js/grades.js가 여기 표(COUNTER_GRADES)를 읽는다 — 모두 고급. 기본 덱에는 넣지 않는다. 덱에는 다른 카드처럼 4장까지.

   설계 기준 (docs/COUNTERSPELLS_v3.32.md)
   - [무효] = 엔진 효과 negate(js/engine.js SPELL_OPS): 상대 전장에서 아직 발동하지 않은 마법 중 맨 앞 n장이 발동하지 않고 부서진다.
     공격 마법은 같은 때 발동할 수 있는 상대 마법보다 먼저 발동하므로, 1번 칸에 두면 전투가 시작되자마자 상대의 어떤 마법보다도 먼저 무효로 한다.
     뒤 칸에 두면 앞 칸 아군 유닛이 싸우는 동안 상대 방어 마법이 먼저 풀릴 수 있다 — 그때는 남은 마법 중 맨 앞을 겨눈다.
   - 2레벨: [무효]만. 3레벨: [무효] + 그 깃발의 강점 · 원소(docs/WORLD.md 6장)를 살린 효과 하나.
   - 무효로 할 마법이 없으면 [무효]는 헛것이 된다(3레벨의 다른 효과는 그대로 난다). 상대가 방어 마법을 낼지는 준비 단계에 알 수 없다 — 읽기 싸움 카드.
   - 컴퓨터(보통 · 어려움)는 미리 굴리기로 [무효]의 값을 볼 수 없어(상대 마법은 내 준비 뒤에 놓인다) js/game.js negateHope로 따로 어림한다.
   이름은 새 고유명사 없이, 6글자 이하(띄어쓰기 제외). */
"use strict";

const CS_NEG = { op: "negate", n: 1 };
const COUNTER_SPELLS = [
  /* B1 잿불 고블린 — 화염 · 광역 화력 */
  { id: "CS-B1", n: "덫 태우기", g: "B1", camp: "B", lv: 1, kind: "atk",
    text: "상대 맨 앞 마법 1장을 [무효]로 한다. 상대 맨 앞 2기에게 피해 1.",
    ops: [CS_NEG, { op: "dmg", side: "foe", area: { t: "front", n: 2 }, x: 1 }],
    brief: "{적 마법1} [무효]|{적 앞2} 피해1",
    desc: "고블린은 덫을 해체하지 않는다. 불을 던져 넣고, 터지는 것을 구경한다. 덫 앞에 서 있던 자들이 함께 구경하게 된다." },
  /* B2 무쇠수염 드워프 — 금속 · 저주에 약해 주문을 막는 법을 익혔다 */
  { id: "CS-B2", n: "봉인 쐐기", g: "B2", camp: "B", lv: 1, kind: "atk",
    text: "상대 맨 앞 마법 1장을 [무효]로 한다.",
    ops: [CS_NEG],
    brief: "{적 마법1} [무효]",
    desc: "주문에 몇 번 데어 본 드워프는 쇠쐐기를 만들었다. 두르크하임의 쐐기가 박힌 주문은 다시 열리지 않는다." },
  /* B3 번개 노움 — 충전과 장치 */
  { id: "CS-B3", n: "합선", g: "B3", camp: "B", lv: 1, kind: "atk",
    text: "상대 맨 앞 마법 1장을 [무효]로 한다.",
    ops: [CS_NEG],
    brief: "{적 마법1} [무효]",
    desc: "어떤 주문이든 결국은 흐름이다. 볼타리움의 노움은 흐름의 길목에 구리선 한 가닥을 걸쳐 둘 뿐이다." },
  /* G1 바위주먹 오크 — 힘, 꾀가 부족해 부순다 */
  { id: "CS-G1", n: "덫 짓밟기", g: "G1", camp: "G", lv: 1, kind: "atk",
    text: "상대 맨 앞 마법 1장을 [무효]로 한다.",
    ops: [CS_NEG],
    brief: "{적 마법1} [무효]",
    desc: "가르운의 오크는 덫을 피해 가는 법을 모른다. 대신 덫이 일어서기 전에 밟아 부수는 법은 안다." },
  /* G2 이끼 트롤 — 숲 · 재생 */
  { id: "CS-G2", n: "이끼 덮기", g: "G2", camp: "G", lv: 1, kind: "atk",
    text: "상대 맨 앞 마법 1장을 [무효]로 한다. 아군 맨 앞 2기 공격 +1, 체력 +2.",
    ops: [CS_NEG, { op: "mod", side: "ally", area: { t: "front", n: 2 }, a: 1, h: 2 }],
    brief: "{적 마법1} [무효]|{아군 앞2} ⚔+1 ♥+2",
    desc: "이끼는 무엇이든 덮는다. 덮인 주문은 숨이 막혀 꺼지고, 그 위를 밟고 가는 트롤의 상처는 이끼 밑에서 다시 자란다." },
  /* G3 푸른비늘 인어 — 물 · 강화를 씻어 내는 노래 */
  { id: "CS-G3", n: "씻김의 노래", g: "G3", camp: "G", lv: 1, kind: "atk",
    text: "상대 맨 앞 마법 1장을 [무효]로 한다. 상대 맨 앞 유닛의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고, 피해 2.",
    ops: [CS_NEG, { op: "strip", side: "foe", area: { t: "front", n: 1 } }, { op: "dmg", side: "foe", area: { t: "front", n: 1 }, x: 2 }],
    brief: "{적} [무효] · 앞1 해제 · 피해2",
    desc: "샘물 무녀단의 노래는 걸어 둔 것을 씻어 낸다. 아직 펼치지 않은 주문도, 이미 두른 축복도." },
  /* A1 심연 마족 — 피를 바쳐 얻는 일격 */
  { id: "CS-A1", n: "피의 침묵", g: "A1", camp: "A", lv: 1, kind: "atk",
    text: "생명 1을 내고, 상대 맨 앞 마법 1장을 [무효]로 한다. 상대 유닛 중 공격이 가장 높은 1기에게 피해 3.",
    ops: [CS_NEG, { op: "dmg", side: "foe", area: { t: "maxA", n: 1 }, x: 3 }], cost: { life: 1 },
    brief: "{적 마법1} [무효] · 대가 생명 1|{적 최강1} 피해3",
    desc: "피 한 방울로 상대의 입을 막는다. 녹타르의 계약자에게 침묵은 가장 싼 주문이다." },
  /* A2 성광 천족 — 빛 · 보호막 */
  { id: "CS-A2", n: "정화의 빛", g: "A2", camp: "A", lv: 1, kind: "atk",
    text: "상대 맨 앞 마법 1장을 [무효]로 한다. 아군 맨 앞 유닛 공격 +2, [보호막].",
    ops: [CS_NEG, { op: "mod", side: "ally", area: { t: "front", n: 1 }, a: 2 }, { op: "shield", side: "ally", area: { t: "front", n: 1 } }],
    brief: "{적 마법1} [무효]|{아군 앞1} ⚔+2 [보호막]",
    desc: "솔란테의 빛 아래에서는 숨겨 둔 것이 남지 않는다. 드러난 함정은 사라지고, 앞장선 기사의 창끝에는 빛이 머문다." },
  /* A3 폭풍 하이엘프 — 바람 · 마법 재능 */
  { id: "CS-A3", n: "주문 끊기", g: "A3", camp: "A", lv: 1, kind: "atk",
    text: "상대 맨 앞 마법 1장을 [무효]로 한다.",
    ops: [CS_NEG],
    brief: "{적 마법1} [무효]",
    desc: "폭풍탑의 견습생은 주문을 거는 법보다 끊는 법을 먼저 배운다. 남의 주문을 끊지 못하는 자는 탑에 오를 수 없다." }
];

/* 등급: 모두 고급 (js/grades.js가 읽는다). 짧은 문구는 SPELL_BRIEF에 */
const COUNTER_GRADES = {};
(function () {
  for (const s of COUNTER_SPELLS) {
    const c = Object.assign({}, s); delete c.brief;
    if (!c.cost) c.cost = {};
    SIM_SPELLS.push(c); COUNTER_GRADES[s.id] = "uncommon";
    if (typeof SPELL_BRIEF !== "undefined" && s.brief) SPELL_BRIEF[s.id] = s.brief;
  }
})();
