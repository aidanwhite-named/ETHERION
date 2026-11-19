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

/* ---------- v3.82 고르바스의 발톱: 몰릴수록 · 끝까지 (사용자 설계) ----------
   새 카드를 더하지 않고, 쓰이지 않거나 겹치던 마법을 바꿨다(카드 ID · 등급 그대로).
   - 곰의 힘은 다른 "맨 앞 2기 공격 +"와 겹쳤고, 으르렁 위협은 시뮬레이션에서 한 번도 뽑히지 않았다.
   - 몸통 박치기는 무리의 포효(4레벨, 대가 없음)와 겹치지 않게 2레벨 — 싸지만 아군도 다친다.
   - (같은 때 바꿨던 궁지의 송곳니 SG1-03은 v3.95 spelltune.js로, 무한한 격노 MG-04는 아래 v3.87 원한의 일격으로 바뀌었다.)
   효과는 engine 끝 "v3.82" 절(g1Victory · g1Ram, sortFoe asc). */
(function () {
  const S = id => SIM_SPELLS.find(s => s.id === id);
  const REWORK = {
    "SG1-03": { n: "궁지의 송곳니", kind: "atk", lv: 3,   // 전: 광폭화 — 효과 · 글은 v3.95 js/spelltune.js가 채운다
      text: "", ops: [], brief: "", desc: "" },
    "PS-G1-1": { n: "승전의 함성", kind: "atk", lv: 1,   // 전: 곰의 힘 (아군 맨 앞 2기 공격 +3, 버팀: 공격)
      text: "전투가 끝날 때 살아남은 아군 유닛 수만큼 상대 생명 −.",
      ops: [{ op: "g1Victory", per: 1 }],
      brief: "{적 생명} −(전투 끝에 살아남은 아군 수)",
      desc: "싸움이 끝나고 선 자들이 함께 울부짖는다. 그 소리에 적의 진영이 한 걸음씩 무너진다." },
    "SG1-09": { n: "몸통 박치기", kind: "atk", lv: 2,   // 전: 용의 포효 L4 (아군 전체 공격 +2 +1C, 방어 −2)
      text: "상대 유닛 전체 체력 −(아군 유닛 수 × 2). 그 뒤 아군 유닛마다 체력 −(아군 유닛 수).",
      ops: [{ op: "g1Ram", mul: 2 }],
      brief: "{적 전체} ♥ −(아군 수×2)|{아군 전체} ♥ −(아군 수)",
      desc: "무리가 한 덩어리로 몸을 던진다. 부딪친 쪽도 부서지지만, 맞은 쪽은 더 크게 부서진다." },
    "SG1-01": { n: "사냥감 몰이", kind: "com", lv: 1,   // 전: 으르렁 위협 (상대 맨 앞 3기 공격 −1, 방어 −1) — v3.95 spelltune.js가 남은 체력만 보게 고친다
      text: "상대 유닛을 방어와 남은 체력의 합이 낮은 순으로 맨 앞부터 다시 세운다.",
      ops: [{ op: "sortFoe", asc: true }],
      brief: "{적} ⛨+♥ 낮은 순으로 맨 앞부터",
      desc: "오크 사냥꾼은 무리에서 가장 약한 짐승부터 몰아낸다. 앞으로 떠밀린 자는 송곳니를 피할 곳이 없다." }
  };
  for (const id in REWORK) {
    const s = S(id), r = REWORK[id]; if (!s) continue;
    s.n = r.n; s.kind = r.kind; s.lv = r.lv; s.text = r.text; s.ops = r.ops; s.cost = {}; s.gain = {}; s.desc = r.desc;
    delete s.coin; delete s.anchor; delete s.prevText; delete s.grp; delete s.ccl; delete s.dir; delete s.v14;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
  }
})();

/* ---------- v3.87 피의 맹세 · 원한의 일격 (사용자 설계) ----------
   격노(NG1-1, 남은 체력 1 · 깎인 만큼 공격)는 그대로 두고, 같은 "몸을 버려 공격" 줄의 무한한 격노를 원한의 일격으로,
   궁지의 포효(스탯만 올리던 레어 방어 마법)를 피의 맹세로 바꿨다(카드 ID · 등급 그대로).
   - 원한의 일격: 쓰러진 아군이 많을수록 세다 → 격노 · 몸통 박치기로 아군이 쓰러진 뒤에 둔다.
   - 피의 맹세: 쓰러진 결속 유닛의 피가 뒤로 옮겨 가고, 피를 받고 살아남은 유닛은 다음 턴 쓰러진 유닛들의 공격만큼 강해진다.
   효과는 engine 끝 "v3.87" 절(g1Oath · g1Grudge, g1OathSweep · g1OathEnd · resetTurn). */
(function () {
  const S = id => SIM_SPELLS.find(s => s.id === id);
  const REWORK = {
    "MG-04": { n: "원한의 일격", kind: "atk", lv: 2,   // 전: 무한한 격노 L1 (v3.82, 뒤 1칸 [관통] · 수호 · 보호막 무시 · 공격 뒤 체력 −)
      text: "아군 뒤 1칸의 유닛 공격 +(내 소각장의 유닛 카드 수).",
      ops: [{ op: "g1Grudge", area: { t: "back", n: 1 } }],
      brief: "{아군 뒤1} ⚔+(소각장 유닛 수)",
      desc: "쓰러진 형제의 이름을 하나씩 부를 때마다 주먹이 무거워진다. 마지막 이름에서 그 주먹이 떨어진다." },
    "RS-G1-2": { n: "피의 맹세", kind: "def", lv: 2,   // 전: 궁지의 포효 (아군 전체 공격 +3, 방어 +1, 체력 +2)
      text: "아군 유닛마다 피(🩸)로 결속한다. 결속한 유닛이 쓰러지면 가진 피가 모두 바로 뒤 아군에게 옮겨 간다. 전투가 끝날 때 남의 피를 머금고 살아남은 유닛은 다음 턴 준비 때 그 피 주인들이 쓰러질 때의 공격만큼 공격이 오른다(그 턴만).",
      ops: [{ op: "g1Oath" }],
      brief: "{아군 전체} 🩸결속|쓰러지면 🩸→뒤|다음 턴 ⚔+(쓰러진 ⚔)",
      desc: "가르운의 오크는 손바닥을 갈라 피를 섞는다. 먼저 쓰러진 자의 분노는 뒤에 선 형제의 주먹에서 다시 깨어난다." }
  };
  for (const id in REWORK) {
    const s = S(id), r = REWORK[id]; if (!s) continue;
    s.n = r.n; s.kind = r.kind; s.lv = r.lv; s.text = r.text; s.ops = r.ops; s.cost = {}; s.gain = {}; s.desc = r.desc; s.brief = r.brief;
    delete s.coin; delete s.anchor; delete s.prevText; delete s.grp; delete s.ccl; delete s.dir; delete s.v14;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
  }
})();
