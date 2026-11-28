/* ETHERION v3.73 — 잿불 고블린(B1): 불을 붙이는 화약 깃발
   elf.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_* 를 고친다. 균형 도구가 data.js · rebalance.js를 다시 써도 이 파일은 그대로 남는다).
   규칙은 js/engine.js 끝 "v3.73 잿불 고블린" 절(gbScorch · gbIgnite · gbBurnTick · gbArmor), 카드 글은 js/cards.js ITEM_KW.

   - 대표 능력 [점화 N](키 ignite): 고블린의 옛 [사격 N](바로 피해)을 바꿨다. v3.92부터 이 유닛이 맞붙어 공격한
     상대에 화상 N을 남긴다(화상은 붙은 그 자리에서는 피해 없음, 다음 턴 전투가 시작될 때 터짐).
   - 화상(v3.88): [화상 N]은 가시처럼 따로따로 쌓인다. 다음 턴 전투가 시작될 때 화상마다 체력 −N(방어 무시) 뒤 꺼지고,
     N이 2 이상이면 양옆 유닛에게 [화상 N−1]이 옮겨붙는다. 출혈(마족, 이번 전투 맞붙음마다)과 불씨 전염(고블린 유니크, 꺼지지 않고 옮겨 감)과 다르다.
   - 방어 능력 [화염 갑주 N](키 farmor): 이 유닛을 맞붙어 공격한 상대 유닛에게 [화상 N](v3.88 원거리 공격자는 빼고).
   - 역전 콤보(v3.88): 화약통 깔기(RB1-1, 빈 칸마다 화약통 → 다음 턴 같은 칸 번호의 상대에 [화상 3]) · 화약고 폭파(SB1-08, 화약통 N개를 터뜨려 부수고 상대 앞 N기 체력 −N² · [화상 2], 아군 전체 체력 −N).
   - 다른 깃발의 [사격]은 그대로다. 고블린 유닛 · 아이템의 [사격 N]만 [점화 N]으로.
   - 레어 오라 [포격 지휘]: 양옆 아군 공격 +1(사용자 결정, 전: 사격 +1).
   - 유닛: 고급 9장(다른 깃발과 같은 수, 레벨마다 1~2장) = [점화] 4(1 · 3 · 4 · 6레벨) · [화염 갑주] 3(2 · 4 · 6레벨 벽) · [원거리] 2.
     v3.73.0에 고급을 19장까지 올렸다가 v3.73.1에 9장으로 — 불과 상관없는 [관통] · [원거리] 고급은 일반(능력 없음)으로 내리고,
     그래서 같은 레벨 일반과 스탯이 겹친 3장은 레거시. 고블린의 [가시] 2장은 [화염 갑주]로(드워프 · 트롤 가시와 겹침 정리).
   - 마법 4장(ID 그대로): 도화선 · 기폭(공용) · 불의 장막(방어) · 연막탄(방어). 등급은 GOBLIN_GRADES(grades.js가 맨 끝에 덮음). */
"use strict";

const GOBLIN_GRADES = {};   // js/grades.js가 맨 끝에 덮는다
(function () {
  const isB1 = x => x && (x.g === "B1" || /(^|-)B1(-|$)/.test(x.id));
  /* 고블린 [사격 N](throw + every) → [점화 N]. [투척](every 없음)은 그대로 */
  const conv = o => { if (o && o.throw && o.every) { o.ignite = (o.ignite || 0) + o.throw; delete o.throw; delete o.every; } };
  for (const u of SIM_UNITS) if (isB1(u)) conv(u.gift);
  for (const it of SIM_ITEMS) if (isB1(it)) conv(it);

  /* 유닛 재구성: [능력, 공, 방, 체, 등급]. 등급 null이면 그대로. 주석 = 전(v3.50 이후 값)
     v3.73.1 고급은 다른 깃발처럼 9장(레벨마다 1~2장): [점화] 4 · [화염 갑주] 3 · [원거리] 2. 일반은 능력 없음(다른 깃발과 같은 기준). */
  const UNIT = {
    "B1-03": [{ ignite: 1 }, 4, 0, 1, "uncommon"],          // 포연 척후병 L1 3/0/1 일반
    "B1-41": [{ farmor: 1 }, 1, 2, 4, "uncommon"],          // 모래주머니 참호병 L2 0/2/4 일반 · 벽
    "B1-13": [{ ignite: 1 }, 5, 0, 2, "uncommon"],          // 화염 척탄수 L3 5/0/2 일반
    "B1-22": [{ ignite: 2 }, 6, 0, 5, "uncommon"],          // 화염방사병 L4 6/0/5 일반
    "B1-42": [{ farmor: 1 }, 1, 2, 8, null],                // 방폭 갑주병 L4 1/2/8 고급 [가시 1] · 벽
    "B1-31": [{ ignite: 2 }, 9, 0, 5, "uncommon"],          // 포병 원수 L6 9/0/5 일반
    "B1-43": [{ farmor: 1 }, 1, 3, 10, null],               // 포르탄 철갑 보루 L6 1/3/10 고급 [가시 1] · 벽
    /* 고급 → 일반(능력 뺌). 고급 자리는 위의 불 유닛에게 */
    "B1-02": [{}, 4, 0, 1, "common"],                       // 화약 짐꾼 L1 4/0/1 고급 [관통]
    "B1-08": [{}, 6, 0, 1, "common"],                       // 연막 투척병 L2 6/0/1 고급 [원거리]
    "B1-16": [{}, 7, 0, 1, "common"],                       // 고블린 폭파공 L3 7/0/1 고급 [관통]
    "PN-B1-U1": [{}, 4, 0, 4, "common"],                    // 화약고 감독관 L3 4/0/4 고급 [원거리] (스탯 표시는 그대로)
    /* 약했던 일반 조금 올림 */
    "B1-05": [{}, 3, 1, 1, null],                           // 화승총 신병 L1 2/1/1
    "B1-10": [{}, 3, 0, 4, null]                            // 포르탄 경비병 L2 2/0/4
  };
  for (const id in UNIT) {
    const u = SIM_UNITS.find(x => x.id === id), w = UNIT[id]; if (!u) continue;
    const g = Object.assign({}, u.gift || {});
    delete g.ranged; delete g.thorns; delete g.shred;
    u.gift = Object.assign(g, w[0]);
    u.a = w[1]; u.d = w[2]; u.h = w[3];
    if (w[4]) GOBLIN_GRADES[id] = w[4];
  }

  /* v3.73.1 레거시: 고급을 일반으로 내리며 같은 레벨 일반과 스탯 모양이 겹치는 카드 */
  const LEGACY = {
    "B1-04": "레거시 (v3.73.1) — 장전 수습생 · 겹침: B1-02 화약 짐꾼(4/0/1)",
    "B1-09": "레거시 (v3.73.1) — 고블린 포수 · 겹침: B1-08 연막 투척병(6/0/1)",
    "B1-20": "레거시 (v3.73.1) — 작렬 척탄대 · 겹침: B1-24 고블린 박격포수(5/1/5)"
  };
  if (typeof RETIRED_CARDS !== "undefined") for (const id in LEGACY) RETIRED_CARDS[id] = LEGACY[id];
  if (typeof GONE_CARDS !== "undefined") for (const id in LEGACY) GONE_CARDS[id] = true;

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
      desc: "매캐한 화약 연기가 전장을 덮는다. 불이 옮겨붙은 자는 연기 속에서 눈을 뜨지 못한다." },
    /* v3.88 역전 콤보 "화약통": 밀릴수록(아군 빈 칸이 많을수록) 화약통이 많다. 혼자면 다음 턴, 화약고 폭파와 함께면 바로 */
    "RB1-1": { n: "화약통 깔기", kind: "com", lv: 3, keepTag: true,   // 전: 최후의 포격 L4 (양쪽 유닛 전체 피해 6, [장전 2])
      text: "이 마법 자리와 아군 빈 칸마다 불붙은 화약통(0/0/2)을 놓는다. 화약통은 놓인 턴에 공격 · 반격하지 않고, 마법이나 공격에 부서질 수 있다(부서지면 불발). 다음 턴 첫 공격 전에 터져 같은 칸 번호의 상대 유닛에게 [화상 3].",
      ops: [{ op: "gbKegs", n: 3 }],
      brief: "{아군 빈 칸} 화약통|다음 턴 같은 칸의 적 화상3",
      desc: "포르탄이 무너질 때마다 고블린은 빈 참호에 화약통을 굴려 넣었다. 지키는 이가 적을수록 터지는 소리는 컸다." },
    "SB1-08": { n: "화약고 폭파", kind: "com", lv: 2,   // 전: 방어 L3 (상대 유닛 전체 피해 2 +1C)
      text: "아군 화약통 N개를 모두 터뜨려 부순다. 터뜨린 화약통 개수만큼 상대 유닛에게 체력 −N², [화상 2]. 아군 유닛 전체에게 체력 −N.",
      ops: [{ op: "gbBlast", n: 2 }],
      brief: "{아군 화약통 N} 부숨|{적 N기} ♥−N² 화상2|{아군 전체} ♥−N",
      desc: "도르마크의 화약고에 불씨 하나가 떨어지면, 포르탄의 모든 화약통이 같은 숨으로 대답한다." }
  };
  for (const id in REWORK) {
    const s = SIM_SPELLS.find(x => x.id === id), w = REWORK[id]; if (!s) continue;
    s.n = w.n; s.kind = w.kind; s.lv = w.lv; s.text = w.text; s.ops = w.ops; s.cost = {}; s.gain = {}; s.desc = w.desc;
    for (const k of ["coin", "prevText", "grp", "ccl", "dir", "v14"].concat(w.keepTag ? [] : ["anchor"])) delete s[k];   // 역전 마법은 "역전 · 덱에 1장" 꼬리표 · limit · comeback 그대로
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = w.brief;
    if (w.gr) GOBLIN_GRADES[id] = w.gr;
  }
})();
