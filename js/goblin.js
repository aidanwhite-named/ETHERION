/* ETHERION v3.73 — 잿불 고블린(B1): 불을 붙이는 화약 깃발
   elf.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_* 를 고친다. 균형 도구가 data.js · rebalance.js를 다시 써도 이 파일은 그대로 남는다).
   규칙은 js/engine.js 끝 "v3.73 잿불 고블린" 절(gbScorch · gbIgnite · gbBurnTick · gbArmor), 카드 글은 js/cards.js ITEM_KW.

   - 대표 능력 [점화 N](키 ignite): 고블린의 옛 [사격 N](바로 피해)을 바꿨다. 내 공격 차례에 맞붙기 바로 전에
     남은 체력이 가장 높은 상대 유닛 하나에게 화상 N을 붙인다(그 자리에서는 피해 없음).
   - 화상: 쌓인다. 다음 턴 전투가 시작될 때 한 번 화상만큼 체력이 깎이고(방어 무시) 꺼진다.
     출혈(마족, 이번 전투 맞붙음마다)과 불씨 전염(고블린 유니크, 꺼지지 않고 옮겨 감)과 다르다.
   - 방어 능력 [화염 갑주 N](키 farmor): 이 유닛을 맞붙어 공격한 상대 유닛에게 화상 N(원거리 공격자에게도).
   - 다른 깃발의 [사격]은 그대로다. 고블린 유닛 · 아이템의 [사격 N]만 [점화 N]으로.
   - 레어 오라 [포격 지휘]: 양옆 아군 공격 +1(사용자 결정, 전: 사격 +1).
   - 유닛: 약하거나 능력 없던 일반 유닛에 [점화] · [화염 갑주]를 넣고 스탯을 올려 고급으로. 1 · 2레벨에도 넣었다.
     고블린의 [가시] 2장은 [화염 갑주]로(드워프 · 트롤 가시와 겹침 정리).
   - 마법 4장(ID 그대로): 도화선 · 기폭(공용) · 불의 장막(방어) · 연막탄(방어). 등급은 GOBLIN_GRADES(grades.js가 맨 끝에 덮음). */
"use strict";

const GOBLIN_GRADES = {};   // js/grades.js가 맨 끝에 덮는다
(function () {
  const isB1 = x => x && (x.g === "B1" || /(^|-)B1(-|$)/.test(x.id));
  /* 고블린 [사격 N](throw + every) → [점화 N]. [투척](every 없음)은 그대로 */
  const conv = o => { if (o && o.throw && o.every) { o.ignite = (o.ignite || 0) + o.throw; delete o.throw; delete o.every; } };
  for (const u of SIM_UNITS) if (isB1(u)) conv(u.gift);
  for (const it of SIM_ITEMS) if (isB1(it)) conv(it);

  /* 유닛 재구성: [능력, 공, 방, 체, 등급]. 등급 null이면 그대로. 주석 = 전 */
  const UNIT = {
    "B1-03": [{ ignite: 1 }, 4, 0, 1, "uncommon"],          // 포연 척후병 L1 3/0/1 일반
    "B1-05": [{ ignite: 1 }, 3, 1, 1, "uncommon"],          // 화승총 신병 L1 2/1/1 일반
    "B1-09": [{ ignite: 1 }, 5, 0, 2, null],                // 고블린 포수 L2 6/0/1 고급 [원거리]
    "B1-10": [{ farmor: 1 }, 2, 0, 4, "uncommon"],          // 포르탄 경비병 L2 2/0/4 일반
    "B1-41": [{ farmor: 1 }, 1, 2, 4, "uncommon"],          // 모래주머니 참호병 L2 0/2/4 일반
    "B1-13": [{ ignite: 1 }, 5, 0, 2, "uncommon"],          // 화염 척탄수 L3 5/0/2 일반
    "B1-18": [{ farmor: 1 }, 6, 0, 4, "uncommon"],          // 화약고 수비대 L3 6/0/4 일반
    "B1-20": [{ ignite: 2 }, 5, 1, 5, "uncommon"],          // 작렬 척탄대 L4 4/1/5 일반
    "B1-22": [{ farmor: 1 }, 6, 0, 5, "uncommon"],          // 화염방사병 L4 6/0/5 일반
    "B1-42": [{ farmor: 1 }, 1, 2, 8, null],                // 방폭 갑주병 L4 1/2/8 고급 [가시 1]
    "B1-27": [{ ignite: 2 }, 7, 0, 6, "uncommon"],          // 폭렬 기술장 L5 7/0/6 일반
    "B1-31": [{ ignite: 2 }, 9, 0, 5, "uncommon"],          // 포병 원수 L6 9/0/5 일반
    "B1-43": [{ farmor: 1 }, 1, 3, 10, null],               // 포르탄 철갑 보루 L6 1/3/10 고급 [가시 1]
    "UP-B1-18": [{ farmor: 1 }, 10, 0, 8, null]             // 화약고 철벽대 L4 강화 (바탕 B1-18)
  };
  for (const id in UNIT) {
    const u = SIM_UNITS.find(x => x.id === id), w = UNIT[id]; if (!u) continue;
    const g = Object.assign({}, u.gift || {});
    delete g.ranged; delete g.thorns;
    u.gift = Object.assign(g, w[0]);
    u.a = w[1]; u.d = w[2]; u.h = w[3];
    if (w[4]) GOBLIN_GRADES[id] = w[4];
  }

  /* 레어 오라: 양옆 아군 공격 +1 */
  if (typeof RARE_AURA !== "undefined") RARE_AURA.B1 = { n: "포격 지휘", eff: { a: 1 }, text: "양옆 {n}칸 안의 아군 유닛은 공격이 1 늘어난다." };

  /* 마법 */
  const REWORK = {
    "MB-04": { n: "도화선", kind: "atk", lv: 1,   // 전: 상대 맨 앞 유닛에게 피해 2
      text: "상대 맨 앞 유닛에게 피해 1, 화상 3.",
      ops: [{ op: "dmg", side: "foe", area: { t: "front", n: 1 }, x: 1 }, { op: "scorch", side: "foe", area: { t: "front", n: 1 }, n: 3 }],
      brief: "{적 앞1} 피해1|화상3",
      desc: "불붙은 심지가 땅을 기어 적의 발밑까지 간다. 터지는 것은 한참 뒤다 — 고블린은 그 기다림을 좋아한다." },
    "SB1-05": { n: "기폭", kind: "com", lv: 2, gr: "uncommon",   // 전: 집중포화 (상대 공격 최강 2기 피해 2, [장전 1])
      text: "상대 맨 앞 유닛에게 화상 2. 그다음 상대 유닛의 화상을 모두 지금 터뜨린다 — 화상이 있던 유닛은 피해 2 더.",
      ops: [{ op: "scorch", side: "foe", area: { t: "front", n: 1 }, n: 2 }, { op: "detonate", bonus: 2 }],
      brief: "{적 앞1} 화상2|{적 화상} 지금 터뜨림 +2",
      desc: "포르탄의 공병은 불씨가 저절로 타오르기를 기다리지 않는다. 신호 하나에 붙여 둔 불이 한꺼번에 터진다." },
    "SB1-03": { n: "불의 장막", kind: "def", lv: 1,   // 전: 참호 사격 (상대 앞 2기 피해 1, 아군 뒤 2칸 방어 +1)
      text: "아군 맨 앞 2기 체력 +1, [화염 갑주 2].",
      ops: [{ op: "mod", side: "ally", area: { t: "front", n: 2 }, h: 1 }, { op: "grant", side: "ally", area: { t: "front", n: 2 }, ab: { farmor: 2 } }],
      brief: "{아군 앞2} ♥+1|[화염 갑주 2]",
      desc: "참호 앞에 기름을 붓고 불을 놓는다. 칼을 들고 넘어오는 자는 불을 묻혀 돌아간다." },
    "SB1-01": { n: "연막탄", kind: "def", lv: 1,   // 전: 상대 뒤 3칸의 유닛 공격 −2
      text: "상대 뒤 3칸의 유닛 공격 −2. 그 가운데 화상이 있는 유닛은 공격 −2 더.",
      ops: [{ op: "mod", side: "foe", area: { t: "back", n: 3 }, a: -2 }, { op: "scorchMod", side: "foe", area: { t: "back", n: 3 }, a: -2 }],
      brief: "{적 뒤3} ⚔−2|화상 있으면 ⚔−2 더",
      desc: "매캐한 화약 연기가 전장을 덮는다. 불이 옮겨붙은 자는 연기 속에서 눈을 뜨지 못한다." }
  };
  for (const id in REWORK) {
    const s = SIM_SPELLS.find(x => x.id === id), w = REWORK[id]; if (!s) continue;
    s.n = w.n; s.kind = w.kind; s.lv = w.lv; s.text = w.text; s.ops = w.ops; s.cost = {}; s.gain = {}; s.desc = w.desc;
    for (const k of ["coin", "anchor", "prevText", "grp", "ccl", "dir", "v14"]) delete s[k];
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = w.brief;
    if (w.gr) GOBLIN_GRADES[id] = w.gr;
  }
})();
