/* ETHERION v3.94 — 마법 등급 · 레벨 맞추기 (사용자 기준, 2026-11-18)
   기준: 아군 전체에 거는 마법은 레어 이상(일반 · 고급은 드물게) · 레벨 2가 주력 · 레벨 1은 약하게 · 레벨 5까지.
   9깃발 모두 L1이 가장 많았다(L1 97 · L2 53장). L1치고 센 마법 29장을 L2로, 아군 전체를 거는 일반 · 고급 마법은
   등급을 레어로 올리거나(10장) 대상을 맨 앞 2기로 줄였다(7장). 효과의 뼈대 · 콤보 연결은 그대로.
   콤보 마법(수액 몰아주기 · 고목 내려찍기 · 숲의 무게 · 새벽빛 3장 · 피의 맹세 · 원한의 일격 · 화약통 깔기 · 화약고 폭파 · 별빛 연사)은
   손대지 않았고, 궁사회 무기고만 등급을 레어로 올렸다(효과 그대로).
   깃발 파일(troll.js · celestial.js …)보다 나중, decks.js 앞에 읽는다 — 이 카드들의 레벨 · 대상은 여기서 고친다.
   등급은 SPELLTUNE_GRADES — grades.js가 맨 뒤에 덮는다. 설명 docs/CHANGELOG.md v3.94.0. */
"use strict";
const SPELLTUNE_GRADES = {
  "NB2-1": "rare", "SB2-09": "rare",                     // 드워프: 과부하 가동 · 대공방
  "PS-G1-2": "rare", "SG1-03": "rare", "NG1-1": "rare", "SG1-08": "rare",   // 오크: 무리의 분노 · 궁지의 송곳니 · 격노 · 송곳니 반격
  "SG2-09": "rare",                                      // 트롤: 베르단의 고목
  "MG-15": "rare",                                       // 인어: 치유의 조수
  "MA-16": "rare",                                       // 마족: 피의 맹약
  "SA3-06": "rare"                                       // 엘프: 궁사회 무기고(콤보, 효과 그대로)
};
const SPELLTUNE_L2 = [
  "MC-02", "MB-05", "CS-B1",                             // 고블린: 날 세우기 · 작렬탄 · 덫 태우기
  "RS-B2-2", "MB-06", "SB2-01",                          // 드워프: 골렘 방진 · 방열 철벽 · 철갑 돌진
  "MC-08", "RS-B3-3", "SB3-04", "PS-B3-2", "PS-B3-1",    // 노움: 파문 · 충전 완료 · 전격 장막 · 전극 교환 · 역회로
  "US-G1-1", "MG-05", "PS-G1-2", "SG1-03",               // 오크: 결투 신청 · 대지 진동 · 무리의 분노 · 궁지의 송곳니
  "RS-G2-2", "SG2-04", "MG-08",                          // 트롤: 가시 덤불 · 트렌트 행진 · 뿌리 결박
  "US-G3-1", "RS-G3-1",                                  // 인어: 넬리아의 노래 · 작살 물살
  "US-A1-2", "RS-A1-2", "MA-05", "CS-A1",                // 마족: 그림자 계약 · 흡혈 장막 · 피의 저울 · 피의 침묵
  "CS-A2",                                               // 천족: 정화의 빛
  "MC-06", "PS-A3-2", "SA3-04", "SA3-05"                 // 엘프: 무장 해제 · 별의 모사 · 시위 당기기 · 회오리 방벽
];
(function () {
  const S = id => SIM_SPELLS.find(s => s.id === id);
  const F2 = { t: "front", n: 2 };
  for (const id of SPELLTUNE_L2) { const s = S(id); if (s) s.lv = 2; }
  /* 아군 전체 → 맨 앞 2기 (일반 마법) */
  const P = {
    "MB-08": {             // 장갑 고정
      text: "아군 맨 앞 2기 방어 +1, 체력 +1. 그 2기 [저주 면역].",
      brief: "{아군 앞2} ⛨+1 ♥+1|{아군 앞2} [저주 면역]" },
    "PS-B2-1": {           // 강철 맹세
      text: "아군 맨 앞 2기 방어 +1, 체력 +1. 그 2기의 방어 · 체력은 이번 턴 줄지 않는다(피해 제외).",
      brief: "{아군 앞2} ⛨+1 ♥+1|{아군 앞2} 이번 턴 ⛨ ♥ 줄지 않음" },
    "SB3-05": {            // 축전 방벽
      text: "아군 맨 앞 2기 방어 +1. 상대 맨 앞 유닛에게 피해 2 +1C.",
      brief: "{아군 앞2} ⛨+1|{적 앞1} 피해2 +1C" },
    "NG2-3": {             // 트롤의 재생: 아군 전체 [재생 1] → 맨 앞 2기 [재생 2]
      text: "아군 맨 앞 2기에게 [재생 2].",
      fix: o => { if (o.op === "grant" && o.ab && o.ab.regen) o.ab.regen = 2; },
      brief: "{아군 앞2} [재생 2]" },
    "SG2-07": {            // 엉겅퀴 요새: 아군 전체 [가시 1] → 맨 앞 2기 [가시 2]
      text: "아군 맨 앞 2기 방어 +1, [가시 2].",
      fix: o => { if (o.op === "thorns") o.x = 2; },
      brief: "{아군 앞2} ⛨+1 [가시 2]" },
    "MA-08": {             // 맹세의 고정
      text: "아군 맨 앞 2기 체력 +2 +1C. 그 2기 [저주 면역].",
      brief: "{아군 앞2} ♥+2 +1C|{아군 앞2} [저주 면역]" }
  };
  for (const id in P) {
    const s = S(id), r = P[id]; if (!s) continue;
    s.ops.forEach(o => { if (o.side === "ally" && o.area && o.area.t === "all") o.area = Object.assign({}, F2); if (r.fix) r.fix(o); });
    s.text = r.text;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
  }
  /* 과부하 회로: 아군 뒤 4칸 → 3칸 (일반 L1) */
  const m7 = S("MB-07");
  if (m7) { m7.ops.forEach(o => { if (o.area && o.area.t === "back" && o.area.n === 4) o.area = { t: "back", n: 3 }; }); m7.text = m7.text.replace("뒤 4칸", "뒤 3칸");
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF["MB-07"] = "{아군 뒤3} ⚔+1 +1C"; }
})();
// v3.95 드워프 — 파쇄 망치(RS-B2-1) 레어 → 고급(효과 · 레벨 그대로, 사용자). 담금질(PS-B2-2)의 스탯 돌리기도 그대로 둔다.
SPELLTUNE_GRADES["RS-B2-1"] = "uncommon";
// v3.95 트롤 — 나무껍질 갑옷(SG2-02) → 새순 갑옷: 아군 맨 앞 방어 +2 → 방어 +1과 [재생 2] (ID · 등급 · 레벨 그대로, 사용자)
(function () {
  const s = SIM_SPELLS.find(x => x.id === "SG2-02"); if (!s) return;
  s.n = "새순 갑옷";
  s.text = "아군 맨 앞 유닛 방어 +1, [재생 2].";
  s.ops = [{ op: "mod", side: "ally", area: { t: "front", n: 1 }, d: 1 },
           { op: "grant", side: "ally", area: { t: "front", n: 1 }, ab: { regen: 2 } }];
  if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF["SG2-02"] = "{아군 앞1} ⛨+1 [재생 2]";
})();
// v3.95 오크 — 사냥감 몰이(SG1-01): (방어 + 체력) 낮은 순 → 남은 체력 낮은 순(인어 뒤바뀐 물길과 다르게, 사용자).
//   늑대 기습(RS-G1-1) · 대지 가르기(RS-G1-3) 레어 → 고급(효과 · 레벨 그대로). 대지 가르기의 아군 전체 공격 +1은 사용자 결정으로 남긴다.
(function () {
  const s = SIM_SPELLS.find(x => x.id === "SG1-01");
  if (s) { s.ops = [{ op: "sortFoe", asc: true, by: "hp" }]; s.text = "상대 유닛을 남은 체력이 낮은 순으로 맨 앞부터 다시 세운다.";
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF["SG1-01"] = "{적} ♥ 낮은 순으로 맨 앞부터"; }
  const mg = SIM_SPELLS.find(x => x.id === "MG-13");   // 뼈 부수기 L3 → L2 (공격 전용 마법, 효과 · 대상 그대로, 사용자)
  if (mg) mg.lv = 2;
  /* 각성(MC-01, 무도 공격 L1 일반) → 웅크린 늑대: 방어 L2 고급(사용자). 아군 공격을 1로 묶은 만큼 상대 전체 공격 − (engine g1Crouch) */
  const mc = SIM_SPELLS.find(x => x.id === "MC-01");
  if (mc) { Object.assign(mc, { n: "웅크린 늑대", kind: "def", lv: 2, cost: {}, gain: {},
      text: "아군 유닛 전체의 공격이 이번 턴 1이 되어 바뀌지 않는다. 그래서 줄어든 공격의 합만큼 상대 유닛 전체 공격 −(이번 턴).",
      ops: [{ op: "g1Crouch" }],
      desc: "늑대 무리가 이빨을 감추고 땅에 몸을 붙인다. 덤벼들던 적은 어디를 물어야 할지 몰라 머뭇거린다." });
    for (const f of ["coin", "anchor", "prevText", "grp", "ccl", "dir", "v14"]) delete mc[f];
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF["MC-01"] = "{아군 전체} ⚔ 1(이번 턴 그대로)|{적 전체} ⚔ −(줄어든 합)"; }
  /* 궁지의 송곳니(SG1-03): 맞선 상대보다 체력 낮은 아군 공 +3 → 아군 공격의 합으로 상대 맨 앞부터 공 → 방 → 체를 깎는다(사용자, 트롤 숲의 무게와 같은 틀 · 몫만 공격) */
  const cf = SIM_SPELLS.find(x => x.id === "SG1-03");
  if (cf) { cf.ops = [{ op: "g2Weight", pool: "a", tag: "궁지의 송곳니" }]; cf.lv = 3;   // L2 → L3 (숲의 무게 L3와 맞춤, 사용자)
    cf.text = "아군 유닛의 공격을 모두 더한 만큼, 상대 맨 앞 유닛부터 공격 → 방어 → 체력 순으로 깎는다(공격 · 방어는 이번 턴). 다 깎아 쓰러뜨리면 남은 몫은 다음 유닛에게 넘어간다.";
    cf.desc = "몰린 무리가 한꺼번에 송곳니를 박는다. 앞을 막은 놈부터 발톱 · 갑옷 · 숨통 순으로 뜯겨 나간다.";
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF["SG1-03"] = "{적 앞부터} ⚔ → ⛨ → ♥ 깎기|몫 = {아군} ⚔ 합 · 남으면 다음으로"; }
})();
SPELLTUNE_GRADES["RS-G1-1"] = "uncommon";
SPELLTUNE_GRADES["RS-G1-3"] = "uncommon";
SPELLTUNE_GRADES["MC-01"] = "uncommon";   // 웅크린 늑대
// v3.95 노움 — 역회로(PS-B3-1, 스탯 돌리기) → 증폭 회로: 아군 맨 앞 2기에게 이번 턴 [증폭 1] (L2 레어, ID 그대로, 사용자).
//   스탯 돌리기는 드워프 담금질 · 엘프 순환과 겹쳐 노움 대표 능력 [증폭]으로 바꿨다. 증폭은 걸린 뒤에 발동하는 내 마법에 붙는다(engine abilRaw의 t.gx.amp).
(function () {
  const s = SIM_SPELLS.find(x => x.id === "PS-B3-1"); if (!s) return;
  s.n = "증폭 회로"; s.lv = 2; s.gr = "rare";
  s.text = "아군 맨 앞 2기에게 이번 턴 [증폭 1].";
  s.ops = [{ op: "grant", side: "ally", area: { t: "front", n: 2 }, ab: { amp: 1 } }];
  s.brief = "{아군 앞2} [증폭 1]";
  s.desc = "볼타리움의 노움이 두 병사의 등에 구리 회로를 꽂았다. 하늘의 번개가 그 둘을 거쳐 한층 굵게 떨어진다.";
  if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF["PS-B3-1"] = s.brief;
})();
SPELLTUNE_GRADES["PS-B3-1"] = "rare";
// v3.95 인어 — 물의 장막(SG3-03): 천족과 겹치던 [보호막] · 공격 −2를 빼고 인어 오라 [바다의 보호]와 같은 결로(사용자 결정, ID · 이름 · 등급 · L1 그대로).
//   이번 턴 아군 맨 앞 2기가 받는 피해 −1(engine mrVeil → t.calmT, mrCalm이 더함) · 맨 앞 1기에 [정화](mrPurge). 포말 장막(RS-G3-2, [보호막])은 그대로.
(function () {
  const s = SIM_SPELLS.find(x => x.id === "SG3-03"); if (!s) return;
  s.n = "물의 장막";
  s.ops = [{ op: "mrVeil", area: { t: "front", n: 2 }, n: 1 }, { op: "mrPurge", area: { t: "front", n: 1 } }];
  if (s.gain) delete s.gain.life;
  s.text = "아군 맨 앞 2기가 이번 턴 받는 피해 −1(맞붙음 · 마법 · 가시 모두, 인어 오라 바다의 보호와 같은 결). 아군 맨 앞 유닛에게 이번 턴 [정화].";
  s.brief = "{아군 앞2} 받는 피해 −1|{아군 앞1} [정화]";
  if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF["SG3-03"] = s.brief;
  const cs = typeof COUNTER_SPELLS !== "undefined" && COUNTER_SPELLS.find(x => x.id === "SG3-03");
  if (cs) Object.assign(cs, { ops: s.ops, text: s.text, brief: s.brief });
})();
// v3.95 고블린 — 뒤 칸 포격 2장을 [화상] 마법으로(ID 그대로, 사용자). 이름에서 '고블린'을 뺀 새 이름. 콤보(화약통 깔기 · 화약고 폭파)는 그대로.
(function () {
  const S = id => SIM_SPELLS.find(s => s.id === id);
  const W = {
    "MB-05": { n: "불씨 뿌리기", kind: "atk", lv: 2,   // 전: 작렬탄 (상대 뒤 3칸 피해 2, [장전 1])
      text: "상대 맨 앞 2기에게 [화상 2].",
      ops: [{ op: "scorch", side: "foe", area: { t: "front", n: 2 }, n: 2 }],
      brief: "{적 앞2} 화상2",
      desc: "고블린은 포탄 대신 불씨 자루를 던진다. 터지는 소리는 없지만, 다음 날 아침 적진은 연기로 깨어난다." },
    "NB1-3": { n: "불바람", kind: "atk", lv: 3, gr: "rare",   // 전: 박격 포격 (상대 뒤 3칸 물리 피해 5)
      text: "상대 유닛 전체에게 [화상 1]. 상대 맨 앞 유닛에게 [화상 3].",
      ops: [{ op: "scorch", side: "foe", area: { t: "all" }, n: 1 }, { op: "scorch", side: "foe", area: { t: "front", n: 1 }, n: 3 }],
      brief: "{적 전체} 화상1|{적 앞1} 화상3",
      desc: "도르마크의 심장불이 숨을 내쉬면 포르탄 고개에 뜨거운 바람이 분다. 그 바람이 지나간 자리마다 불씨가 내려앉는다." }
  };
  for (const id in W) {
    const s = S(id), w = W[id]; if (!s) continue;
    s.n = w.n; s.kind = w.kind; s.lv = w.lv; s.text = w.text; s.ops = w.ops; s.cost = {}; s.gain = {}; s.desc = w.desc;
    for (const k of ["coin", "prevText", "grp", "ccl", "dir", "v14", "anchor"]) delete s[k];
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = w.brief;
    if (w.gr) SPELLTUNE_GRADES[id] = w.gr;
  }
})();
// v3.95 천족 — 새벽 돌격(RS-A2-1) → 빛의 심판: [방어무시]를 주던 자리에 '아군 방어를 바쳐 치는' 공격 마법(레어 L2, 사용자).
//   맹세의 빛(PS-A2-1) → 대신 속죄: 맨 앞 유닛이 받는 피해를 바로 뒤 아군이 대신 받는다(고급 L1 → 레어 L2, 사용자). 규칙은 engine 끝 "v3.95 천족" 절.
(function () {
  const T = {
    "RS-A2-1": { n: "빛의 심판", kind: "atk", lv: 2,   // 전: 새벽 돌격 (상대 맨 앞 피해 2 · 아군 뒤 3칸 공격 +2 [방어무시])
      text: "아군 맨 앞 유닛 2개의 방어가 이번 턴 0이 된다. 깎인 방어의 합만큼 상대 맨 앞 유닛의 체력을 깎고, 쓰러뜨리고 남은 몫은 다음 유닛에게 준다.",
      ops: [{ op: "a2Judge", n: 2 }],
      brief: "{아군 앞2} ⛨ → 0|깎인 ⛨ 합 → {적 앞부터} ♥− (남으면 다음)",
      desc: "새벽성의 기사들은 심판의 날에 방패를 내려놓는다. 방패에 모였던 빛이 한 줄기 창이 되어 적의 대열을 꿰뚫는다." },
    "PS-A2-1": { n: "대신 속죄", kind: "def", lv: 2,   // 전: 맹세의 빛 (아군 맨 앞 2기 방어 +1 · 체력 +2 · [버팀: 공격·방어·체력])
      text: "이번 턴 아군 맨 앞 유닛이 받는 피해를 바로 뒤의 아군 유닛이 대신 받는다. 대신 받는 유닛은 [가호 1].",
      ops: [{ op: "a2Sub", ward: 1 }],
      brief: "{아군 앞1} 받는 피해 →|{바로 뒤 아군} 대신 받음 · [가호 1]",
      desc: "천족은 형제의 상처를 제 몸에 옮겨 받는 법을 안다. 앞선 자가 칼을 휘두르는 동안, 뒤에 선 자가 묵묵히 그 값을 치른다." }
  };
  for (const id in T) {
    const s = SIM_SPELLS.find(x => x.id === id), r = T[id]; if (!s) continue;
    s.n = r.n; s.kind = r.kind; s.lv = r.lv; s.text = r.text; s.ops = r.ops; s.cost = {}; s.gain = {}; s.desc = r.desc;
    delete s.coin; delete s.anchor; delete s.prevText; delete s.grp; delete s.ccl; delete s.dir; delete s.v14;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
  }
})();
SPELLTUNE_GRADES["PS-A2-1"] = "rare";
// v3.95 엘프 — 상대 공격을 깎는 바람이 8장이라 2장을 바꿈(사용자). 새 효과 engine 끝 "v3.95 엘프" 절, 규칙 [방어무시] 반격 · [마력 공격]은 engine attackOne · mrArc.
//   바람 장벽(SA3-02) → 혼란의 바람(공격 L2 고급, a3Confuse): 상대 맨 앞 1기 방어 ↔ 체력(방어 0이면 쓰러짐). 오크 뼈 부수기(공격 L2 · 1기)와 맞춤.
//   회오리 방벽(SA3-05) → 되쏘는 바람(방어 L2 고급): 아군 맨 앞 2기 방어 +2 · 체력 +2 · [방어무시](v3.95부터 반격에도 붙음).
(function () {
  const S = id => SIM_SPELLS.find(x => x.id === id);
  const R = {
    "SA3-02": { n: "혼란의 바람", kind: "atk", lv: 2,
      text: "상대 맨 앞 유닛의 방어와 남은 체력을 맞바꾼다(방어가 0이던 유닛은 체력 0이 되어 쓰러진다).",
      ops: [{ op: "a3Confuse", n: 1 }],
      brief: "{적 앞1} ⛨ ↔ ♥",
      desc: "엘프의 바람은 갑옷을 벗기지 않는다. 다만 몸이 갑옷인 줄, 갑옷이 몸인 줄 모르게 뒤섞는다. 그다음은 화살이 안다." },
    "SA3-05": { n: "되쏘는 바람", kind: "def", lv: 2,
      text: "아군 맨 앞 2기 방어 +2, 체력 +2, [방어무시](이번 턴 — 반격할 때도 상대 방어를 무시한다).",
      ops: [{ op: "mod", side: "ally", area: { t: "front", n: 2 }, d: 2, h: 2 }, { op: "grant", side: "ally", area: { t: "front", n: 2 }, ab: { magic: true } }],
      brief: "{아군 앞2} ⛨+2 ♥+2 [방어무시]",
      desc: "바늘탑 사수는 맞으며 물러서지 않는다. 몸을 감싼 회오리가 칼을 흘리는 동안, 시위는 이미 칼 주인의 갑옷 틈을 겨누고 있다." }
  };
  for (const id in R) {
    const s = S(id), r = R[id]; if (!s) continue;
    s.n = r.n; s.kind = r.kind; s.lv = r.lv; s.text = r.text; s.ops = r.ops; s.cost = {}; s.gain = {}; s.desc = r.desc;
    delete s.coin; delete s.anchor; delete s.prevText;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
  }
  /* 별의 문자(US-A3-1, 에픽 핸드 L1) → 마족으로 옮기고 이름을 그믐의 계약서로(사용자). 효과 · ID · 등급 그대로.
     엘프 에픽 3 → 2 · 마족 1 → 2. 저장 덱에 남은 카드는 Store.fixMovedCards(economy.js)가 엘프 덱에서 뺀다. */
  const st = S("US-A3-1");
  if (st) {
    st.g = "A1"; st.n = "그믐의 계약서";
    st.desc = "그믐밤 녹타르에서 맺는 계약서에는 상대의 이름도 함께 적힌다. 서명한 자는 한 장을 더 쥐고, 적힌 자의 패는 손안에서 시들어 간다.";
  }
})();
// v3.95 마족 — [저주] 묶음(공포 · 역병) 마법과 지옥불 · 빙의 · 정신 지배(사용자 결정). [제물] 마법 12 → 7장(아래 5장이 생명을 내지 않는다).
//   규칙은 engine 끝 "v3.95 마족" 절, 핸드 저주는 game.js HAND_OPS.handCurse. 그림자 계약(US-A1-2, [치명] · [연쇄])은 그대로 둔다.
(function () {
  const M = {
    "MA-01": { n: "공포의 칼날", kind: "atk", lv: 1,   // 전: 피의 칼날 ([제물 2] 상대 맨 앞 2기 피해 2 +1C)
      text: "상대 맨 앞 2기에게 [공포 3].",
      ops: [{ op: "curse", side: "foe", area: { t: "front", n: 2 }, kind: "fear", n: 3 }],
      brief: "{적 앞2} [공포 3]",
      desc: "칼날은 살을 베지 않는다. 그 그림자가 스친 자는 다음 날 아침 칼자루를 쥔 손이 떨린다." },
    "PS-A1-2": { n: "역병의 족쇄", kind: "com", lv: 1,   // 전: 족쇄 ([제물 1] 공격 최강 1기 공격 0 · [고정: 공격])
      text: "상대 유닛 중 공격이 가장 높은 1기의 공격 −2. 그 유닛에게 [역병 2].",
      ops: [{ op: "mod", side: "foe", area: { t: "maxA", n: 1 }, a: -2 }, { op: "curse", side: "foe", area: { t: "maxA", n: 1 }, kind: "plague", n: 2 }],
      brief: "{적 최강1} ⚔−2 [역병 2]",
      desc: "녹슨 족쇄에 묶인 것은 발목이 아니라 숨이다. 사슬이 풀려도 기침은 옆 사람에게로 옮아간다." },
    "MA-09": { n: "지옥불", kind: "atk", lv: 2,   // 전: 계약의 대가 ([제물 2] 상대 전체 피해 2)
      text: "상대 유닛 중 방어가 가장 높은 1기의 방어 D가 이번 턴 −D가 되고, 체력 −D. 방어가 두터울수록 뜨겁게 탄다.",
      ops: [{ op: "a1Hellfire" }],
      brief: "{적 ⛨최강1} ⛨ D → −D · ♥−D",
      desc: "녹타르의 지옥불은 갑옷을 땔감 삼아 탄다. 두터운 쇠일수록 오래, 뜨겁게, 꺼지지 않는다." },
    "CS-A1": { n: "침묵의 빙의", kind: "atk", lv: 2,   // 전: 피의 침묵 ([제물 1] [무효] · 공격 최강 1기 피해 3)
      text: "상대 맨 앞 마법 1장을 [무효]로 한다. 상대 유닛 중 남은 체력이 가장 높은 1기에 [빙의] — 남은 체력이 전장에서 레벨이 가장 낮은 다른 유닛의 남은 체력이 된다(더 낮을 때만).",
      ops: [{ op: "negate", n: 1 }, { op: "a1Possess" }],
      brief: "{적 마법1} [무효]|{적 ♥최강1} ♥ = 전장 최저 레벨의 ♥",
      desc: "주문을 외던 입이 멎고, 가장 굳센 자의 몸에 가장 여린 자의 혼이 깃든다. 모르카스의 그믐에는 둘 다 같은 값이다." },
    "RS-A1-3": { n: "정신 지배", kind: "com", lv: 2,   // 전: 피의 저주 ([제물 2] 상대 전체 방어 −1 · 피해 3, L3)
      text: "[저주]가 들었거나 레벨 3 이하인 상대 유닛 가운데 공격이 가장 높은 1기를 이번 턴 내 전장 맨 뒤로 데려와 내 편으로 싸우게 한다. 살아남으면 전투가 끝날 때 상대 전장 맨 뒤로 돌아간다.",
      ops: [{ op: "a1Dominate", lv: 3 }],
      brief: "{적 [저주] 또는 L3 이하 · ⚔최강1} 이번 턴 내 편|살면 상대 맨 뒤로",
      desc: "그믐의 속삭임은 겁먹은 마음부터 파고든다. 어제의 동료를 향해 칼을 든 병사는, 해가 지고서야 제 이름을 기억해 낸다." },
    "HA1-2": { n: "손끝 저주", kind: "hand", lv: 1,   // 전: 상대 핸드 첫 유닛 체력 −2 (이 판 내내)
      text: "상대 핸드의 첫 번째 유닛에게 [공포 3]. 그 유닛이 전장에 오르면 첫 전투가 시작될 때 발동한다.",
      ops: [{ op: "handCurse", which: "first", k: 1, kind: "fear", n: 3 }],
      brief: "{적 핸드} 첫 유닛 [공포 3]|전장에 오르면 발동" },
    "HA1-3": { n: "저주 전염", kind: "hand", lv: 2,   // 전: 상대 핸드 유닛 전체 공격 −1 (이 판 내내)
      text: "상대 핸드의 앞 유닛 2장에게 [역병 2]. 전장에 오르면 첫 전투가 시작될 때 발동하고, 양옆 유닛에게 [역병 1]이 옮는다.",
      ops: [{ op: "handCurse", which: "first", k: 2, kind: "plague", n: 2 }],
      brief: "{적 핸드} 앞 유닛 2장 [역병 2]|전장에 오르면 발동" }
  };
  for (const id in M) {
    const s = SIM_SPELLS.find(x => x.id === id), r = M[id]; if (!s) continue;
    s.n = r.n; s.kind = r.kind; s.lv = r.lv; s.text = r.text; s.ops = r.ops; s.cost = {}; s.gain = {}; s.brief = r.brief;
    if (r.desc) s.desc = r.desc;
    for (const k of ["coin", "prevText", "grp", "ccl", "dir", "v14", "anchor"]) delete s[k];
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
    const cs = typeof COUNTER_SPELLS !== "undefined" && COUNTER_SPELLS.find(x => x.id === id);
    if (cs) Object.assign(cs, { n: r.n, ops: r.ops, text: r.text, brief: r.brief, cost: {}, lv: r.lv });
  }
})();
