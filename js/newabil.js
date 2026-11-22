/* ETHERION v3.74 — 새 특수능력: [재생 N](트롤) · [방패 반격] · [수호] · [굳건](드워프) · [정화](천족) · [요격](노움)
   goblin.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_* 를 고친다. 균형 도구가 data.js · rebalance.js를 다시 써도 이 파일은 그대로 남는다).
   규칙은 js/engine.js 끝 "v3.74 새 능력" 절(nwRegenTick · nwPurify · nwFirm …)과 attackOne 반격 줄, 카드 글은 js/cards.js ITEM_KW · ITEM_KW_SHORT.
   사전과 설계 까닭은 docs/ABILITIES.md 7장.

   - 트롤: [가호] 6장을 같은 수치의 [재생]으로(가호는 천족 것). 마법 "트롤의 재생"은 이름대로 [불굴] → [재생 1] 부여.
   - 드워프 승률(기본 덱 대 8깃발, 800판): 전 47.8% → 51.9% · 정예 69.5% → 67.1% (아이템 4장 방어 +1을 넣은 값. 넣지 않으면 기본 42.6%).
   - 드워프: 남의 대표였던 [가시] · [가호] · [관통]을 걷고 "방패벽"으로 — [가시] → [방패 반격], [가호] → [수호](유닛) · [방패 반격] · [굳건](아이템),
     [관통] → [굳건](과열 압착기 10/0/1은 관통이 몸값이라 그대로 — 굳건으로 바꾸면 기본 덱 승률 47.8 → 41%). 이름에 가시가 있는 리벳 가시 골렘만 [가시]를 남긴다.
   - 천족: [가시] 5장 → [정화](가시는 트롤 것).
   - 노움: [사격] 5장 → [요격](사격은 엘프 것). 유물 즈라크의 번개 병(사격 2 · 원거리)은 그대로. */
"use strict";
(function () {
  const U = id => SIM_UNITS.find(x => x.id === id), I = id => SIM_ITEMS.find(x => x.id === id);
  /* [id, 뺄 키, 더할 능력] — 주석 = 전 */
  const UNIT = [
    /* 트롤 G2: 가호 → 재생 */
    ["SP-G2", ["ward"], { regen: 1 }],          // 은월 리시엘 [가호 1] [가시 2]
    ["EP-G2-1", ["ward"], { regen: 1 }],        // 엉겅퀴 트렌트 [가호 1] [가시 2]
    ["EP-G2-3", ["ward"], { regen: 1 }],        // 베르단의 고목 거인 [가호 1] [가시 2]
    ["PN-G2-E", ["ward"], { regen: 1 }],        // 태고림 이끼 수호자 [가호 1] [가시 2]
    /* 드워프 B2 */
    ["B2-05", ["thorns"], { bash: true }],      // 두르크하임 견습공 [가시 1]
    ["B2-07", ["thorns"], { bash: true }],      // 리벳 수호병 [가시 1]
    ["B2-33", ["thorns"], { bash: true }],      // 오르둔의 뼈 기사 [가시 1]
    ["PN-B2-C3", ["thorns"], { bash: true }],   // 철골 망치 골렘 [가시 1]
    ["PN-B2-U1", ["thorns"], { bash: true }],   // 두르크하임 방패공 [가시 1]
    ["PN-B2-U2", ["thorns"], { bash: true }],   // 소르그림 광맥 골렘 [가시 1]
    ["B2-15", ["shred"], { firm: true }],       // 강철 대장장이 [관통]
    ["SP-B2", ["ward"], { bash: true, taunt: true }],              // 철의 심장을 삼킨 자 [가호 2]
    ["EP-B2-1", ["ward"], { taunt: true }],                        // 리벳 가시 골렘 [가호 1] [가시 1] → [가시 1] [수호]
    ["EP-B2-2", ["ward", "shred"], { firm: true, taunt: true }],   // 강철 분쇄 골렘 [관통] [가호 1]
    ["EP-B2-3", ["ward", "thorns"], { bash: true, taunt: true }],  // 두르크하임 성문 거상 [가호 1] [가시 2]
    ["PN-B2-E", ["ward", "thorns"], { bash: true, taunt: true }],  // 페로스를 본 골렘 [가호 1] [가시 1]
    /* 천족 A2: 가시 → 정화 */
    ["A2-01", ["thorns"], { purify: true }],    // 성광 견습생 [가시 1]
    ["A2-13", ["thorns"], { purify: true }],    // 성광 기사 [가시 1]
    ["A2-25", ["thorns"], { purify: true }],    // 엘라드 기사단장 [가시 1]
    ["PN-A2-U1", ["thorns"], { purify: true }], // 맹세를 새긴 기사 [가시 1]
    ["EP-A2-2", ["thorns"], { purify: true }],  // 황혼 장벽 파수장 [가호 1] [가시 1] → [가호 1] [정화]
    /* 케라운 B3: 사격 → 요격 → 2026-11-22 [전도](사용자, engine kzConduct) */
    ["EP-B3-1", ["throw", "every"], { conduct: true }],   // 볼타리움 방전수 [사격 1] [증폭 1]
    ["EP-B3-3", ["throw", "every"], { conduct: true }]    // 케라운의 피뢰탑 [사격 1] [증폭 2]
  ];
  const ITEM = [
    ["IG2-3", ["ward"], { regen: 1 }],          // 이끼 부적 [가호 1]
    ["PI-G2", ["ward"], { regen: 1 }],          // 드리엔의 씨앗 [가호 1] [가시 2]
    ["IB2-4", ["ward"], { bash: true }, 1],     // 오토마톤 심장 1/1/1 [가호 1] → 1/2/1
    ["IB2-6", ["ward"], { taunt: true }, 1],    // 골렘 핵 0/2/5 [가호 1] → 0/3/5
    ["IR-B2", ["ward"], { firm: true }, 1],     // 아다만트 장갑판 1/1/4 [가호 1] → 1/2/4
    ["PI-B2", ["ward"], { bash: true }, 1],     // 소르그림의 힘줄 2/2/5 [가호 1] → 2/3/5
    ["IB3-3", ["throw", "every"], { conduct: true }],   // 피뢰 지팡이 [사격 1] — 2026-11-22 [요격] → [전도]
    ["C4-1", ["throw", "every"], { conduct: true }],    // 별을 읽는 보주 [사격 1] [증폭 2] (itemrework가 [연쇄]로 덮음)
    ["IR-B3", ["throw", "every"], { conduct: true }]    // 구리 피뢰봉 [사격 1] — 2026-11-22 [요격] → [전도]
  ];
  const NEWABIL_MISSING = [];
  for (const [id, del, add] of UNIT) {
    const u = U(id); if (!u) { NEWABIL_MISSING.push(id); continue; }
    const g = Object.assign({}, u.gift || {}); for (const k of del) delete g[k];
    u.gift = Object.assign(g, add);
  }
  for (const [id, del, add, dPlus] of ITEM) {   // dPlus: 방어 + (드워프 아이템 — 가호를 빼고 방어 +1, [방패 반격]과 맞물림)
    const it = I(id); if (!it) { NEWABIL_MISSING.push(id); continue; }
    for (const k of del) delete it[k];
    Object.assign(it, add);
    if (dPlus) it.d = (it.d || 0) + dPlus;
  }
  /* 마법: 트롤의 재생 (NG2-3) — 전: 아군 유닛 전체에게 [불굴] */
  const s = SIM_SPELLS.find(x => x.id === "NG2-3");
  if (s) {
    s.text = "아군 유닛 전체에게 [재생 1].";
    s.ops = [{ op: "grant", side: "ally", area: { t: "all" }, ab: { regen: 1 } }];
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF["NG2-3"] = "{아군 전체} [재생 1]";
  } else NEWABIL_MISSING.push("NG2-3");
  if (NEWABIL_MISSING.length && typeof console !== "undefined") console.warn("newabil.js: 없는 카드", NEWABIL_MISSING.join(" "));
})();
