/* ETHERION v3.69 — 레어 유닛 9장: 오라만 (설계 docs/FLAG_IDENTITY_draft.md)
   mermaid.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_* 를 고친다. 균형 도구가 data.js · rebalance.js를 다시 써도 이 파일은 그대로 남는다).
   규칙은 js/engine.js 끝 "v3.69 레어 오라" 절(rareAuraSync), 카드 글은 js/cards.js ITEM_KW · itemAbilities.

   - 레어 유닛(PN-<깃발>-R)은 스탯과 오라만 가진다. 자기 특수능력(사격 · 가호 · 증폭 · 치명 · 가시 · 원거리)은 없다. 표시(▲ · ▼)는 그대로.
   - 오라 = gift.aura(값 = 오라 범위, 양옆 N칸 — 인어 [바다의 보호 N]과 같은 셈). 오라가 하는 일은 깃발마다 RARE_AURA.
     인어 레어는 v3.68 [바다의 보호 1](gift.calm, js/mermaid.js)이 이미 오라라서 여기서 건드리지 않는다.
   - 무쇠수염 드워프: 🔒 방어(고정)는 모두 ▲ 방어(버팀)로 — 깎이지 않고 오를 수 있다(레어 오라 · 마법이 올린다). */
"use strict";

/* 깃발 → 오라 이름 · 하는 일. eff 열쇠는 engine rareAuraSync가 읽는다:
   d · a = 스탯 +, ward · thorns = 능력 수치 +, snipe · amp · magic = 능력 수치 +(없으면 그 수치로 생김), leech = 능력 부여.
   need: "crit" = 내 전장에 [치명] 또는 [관통] 유닛이 하나라도 있을 때만(오라 범위 밖이어도 됨, 마법이 이번 턴 걸어 준 것도 셈) — 2026-11-16 관통도 셈 */
const RARE_AURA = {
  B1: { n: "포격 지휘", eff: { snipe: 1 }, text: "양옆 {n}칸 안의 아군 유닛은 [사격]이 1 늘어난다(없으면 [사격 1])." },
  B2: { n: "무쇠 방벽", eff: { d: 1 }, text: "양옆 {n}칸 안의 아군 유닛은 방어가 1 늘어난다." },
  B3: { n: "충전 회로", eff: { amp: 1 }, text: "양옆 {n}칸 안의 아군 유닛은 [증폭]이 1 늘어난다(없으면 [증폭 1])." },
  G1: { n: "격노의 함성", eff: { a: 2 }, need: "crit", text: "내 전장에 [치명] 또는 [관통] 유닛이 하나라도 있으면, 양옆 {n}칸 안의 아군 유닛은 공격이 2 늘어난다." },
  G2: { n: "가시덤불", eff: { thorns: 1 }, text: "양옆 {n}칸 안의 아군 유닛은 [가시]가 1 늘어난다(없으면 [가시 1])." },
  A1: { n: "피의 갈증", eff: { leech: true }, text: "양옆 {n}칸 안의 아군 유닛은 [흡혈]을 얻는다." },
  A2: { n: "새벽 서약", eff: { ward: 1 }, text: "양옆 {n}칸 안의 아군 유닛은 [가호]가 1 늘어난다(없으면 [가호 1])." },
  A3: { n: "별의 인도", eff: { magic: 1 }, text: "양옆 {n}칸 안의 아군 유닛은 [방어무시]를 얻는다(맞붙을 때 상대 방어를 모두 무시)." }
};
const RARE_AURA_IDS = {};   // 카드 ID → 깃발
(function () {
  for (const g in RARE_AURA) {
    const id = "PN-" + g + "-R", u = SIM_UNITS.find(x => x.id === id);
    if (!u) continue;
    u.gift = { aura: 1, auraG: g };   // auraG: 카드 글이 오라 이름을 찾는 깃발(엔진은 카드 깃발 C(it).group을 본다)
    RARE_AURA_IDS[id] = g;
  }
  /* 드워프 🔒 방어 → ▲ 방어 (유닛 · 아이템) */
  const isB2 = x => x && (x.g === "B2" || /(^|-)B2(-|$)/.test(x.id));
  for (const u of SIM_UNITS) if (isB2(u) && u.pin && u.pin.d === "L") u.pin.d = "U";
  for (const it of SIM_ITEMS) if (isB2(it) && it.pin && it.pin.d === "L") it.pin.d = "U";
})();
