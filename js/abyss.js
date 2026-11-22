/* ETHERION v3.65 — 심연 마족(A1) 개편: 대가 · 강탈 · 흡혈 · 그림자 걸음 · 피의 계약
   rebalance.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_* 를 고친다. 균형 도구가 data.js · rebalance.js를 다시 써도 이 파일은 그대로 남는다).
   규칙은 js/engine.js "v3.65 심연 마족" 절, 능력 글은 js/cards.js ITEM_KW, 설명은 docs/ABYSS_v3.65.md.

   깃발의 짜임
   - 생명을 내는 마족 마법(cost.life)은 모두 "아군 유닛 전체에게 [강탈]"을 함께 건다(이번 턴). 생명을 내고 → 적을 쓰러뜨려 → 생명을 되찾는다.
   - 한 턴에 낸 생명은 쌓인다(X.paid, "이번 턴 낸 대가"). 앞 칸에서 생명을 낼수록 뒤 칸의 마법(피의 공명 · 심연의 부름)이 커진다 — 마법 연계.
   - 유닛 · 아이템: [흡혈](맞붙어 준 피해의 절반만큼 체력, 맞선 상대 체력까지) · [그림자 걸음](높은 레벨에게는 레벨 차이만큼 덜, 낮은 레벨에게는 차이만큼 더 받음) · [피의 계약 N](내가 생명을 낼 때마다 공격 +N).
     A1 고급 유닛의 하급 능력이던 [관통]을 이 셋 · [강탈]로 바꿨다(고급 = 하급 능력 하나, docs/GRADES.md 9장).
   ABYSS의 수치는 tools/abyss/sim.js로 골랐다(docs/ABYSS_v3.65.md). */
"use strict";

const ABYSS = {
  robCond: "any",   // [강탈] 조건: any 어떤 유닛이든 · ge 내 레벨 이상만 · le 내 레벨 이하만
  robGain: "half",  // [강탈] 다음 턴 에테르(v3.65: 생명 → 에테르): lv 쓰러뜨린 유닛의 레벨 · half 그 절반(올림) · 숫자 = 그 값. v3.65 사용자 결정: lv → half (마족 승률 54.3 → 50.5%, 400판씩)
  leech: 0.5,       // [흡혈] 준 피해 가운데 체력으로 돌아오는 몫(올림) — 맞선 상대가 맞기 전 체력이 상한 (2026-11-17)
  leechOver: true   // [흡혈] 다 찬 체력을 넘는 몫은 이번 턴 체력 +
};

/* 능력 이름 (화면 · 기록) */
const ABYSS_KW = { rob: "강탈", leech: "흡혈", veil: "그림자 걸음", pact: "피의 계약", bleed: "출혈" };

(function () {
  const U = id => SIM_UNITS.find(u => u.id === id), S = id => SIM_SPELLS.find(s => s.id === id), I = id => SIM_ITEMS.find(i => i.id === id);
  /* ---------- 유닛: A1 고급의 하급 능력 [관통] → 마족 능력 ---------- */
  const GIFT = {
    "A1-01": { pact: 1 },        // 계약 하수인 L1 — 계약을 맺을 때마다 힘이 붙는 하수인
    "PN-A1-U1": { pact: 1 },     // 피의 맹세 검사 L3
    "A1-13": { rob: true },      // 녹타르 처형인 L3 — 목을 벤 자의 생명을 거둔다
    "PN-A1-U2": { rob: true },   // 모르카스의 세리 L5 — 대가를 걷는 자
    "PN-A1-C2": { veil: true },  // 모르크 협곡 그림자 L4
    "A1-35": { veil: true },     // 모르크의 악몽 L7 (전: [마력 1])
    "A1-27": { leech: true },    // 녹타르 피의 군주 L5
    "A1-31": { leech: true }     // 피의 공작 L6
  };
  for (const id in GIFT) { const u = U(id); if (!u) continue; const g = Object.assign({}, u.gift || {}); delete g.shred; delete g.magic; u.gift = Object.assign(g, GIFT[id]); }

  /* ---------- 아이템 ---------- */
  { const it = I("IA1-1"); if (it) it.pact = 2; }   // 피의 서약 부적 — "대가만큼 힘을 준다"
  { const it = I("IA1-2"); if (it) { delete it.crit; it.bleed = 2; it.desc = "녹타르의 흑요석 단검. 벤 자리가 아물지 않고 싸움 내내 피를 흘린다."; } }   // 흑요 단검 [치명] → [출혈 2] (처음 1, 사용자 결정으로 2 — 400판 46.3 → 48.8%) (v3.65 사용자 결정: 흡혈은 버팀, 출혈은 공격 — 싸움이 길수록 닳게)
  { const it = I("IA1-4"); if (it) { delete it.crit; it.leech = true; it.desc = "쓰는 순간 얼굴이 사라지는 가면. 벤 자의 피로 그 얼굴을 다시 그린다."; } }   // 심연의 가면 [치명] → [흡혈]
  { const it = I("IR-A1"); if (it) { delete it.crit; delete it.magic; it.leech = true; it.bleed = 1; it.desc = "심연 계약단의 처형인이 쓰는 가면. 쓴 자는 벤 상처에서 흐르는 피를 제 숨으로 들이킨다. 피를 다 마실 때까지 그 상처는 닫히지 않는다."; } }   // 녹타르 피의 가면 [치명] → [흡혈] → v3.75 [흡혈] · [출혈 1] (방어무시는 엘프 능력이라 뺌)
  /* v3.75 사용자 결정: 마족 아이템에 다른 깃발 능력(엘프 방어무시 · 오크 치명 · 고블린 사격)이 많아 마족 능력(강탈 · 흡혈 · 출혈)으로 바꿈. 스탯 · 레벨 · 등급은 그대로 */
  { const it = I("IA1-3"); if (it) { delete it.throw; delete it.every; it.bleed = 1; } }   // 저주 인형 [사격 1] → [출혈 1] — "바늘을 꽂을 때마다 비명이 들린다"
  { const it = I("IA1-5"); if (it) { delete it.magic; it.rob = true; it.h = 4; it.desc = "모르카스와 맺은 계약서의 원본. 서명한 자가 벤 목숨은 계약대로 그의 몫이 된다."; } }   // 계약서 원본 [방어무시] → [강탈], 3/0/3 → 3/0/4 (강탈만으로는 1200판 47.5 → 45.6%, 체력 +1로 48.4%)
  { const it = I("I4-1"); if (it) { delete it.crit; it.bleed = 2; it.desc = "계약의 신에게 바친 단도. 벤 자리는 대가를 다 치를 때까지 피를 흘린다."; } }   // 모르카스의 단도 [치명] → [출혈 2] (레거시 카드 — 되살릴 때를 위해)
  { const it = I("PI-A1"); if (it) { delete it.crit; delete it.magic; it.rob = true; it.bleed = 2; it.desc = "침묵의 군주의 저울에서 떼어 낸 추. 쥔 자의 칼에 벤 상처는 아물지 않고, 쓰러진 자의 몫은 쥔 자에게 기운다. 그러나 쥔 동안 제 상처도 아물지 않는다. 대가의 법칙이다."; } }   // 모르카스의 저울추 [방어무시] · [치명] → [강탈] · [출혈 2] ([눌림: 체력]이 흡혈을 막아서 흡혈 대신 출혈)

  /* ---------- 고친 마법 ---------- */
  { const s = S("MA-16"); if (s) {   // 피의 맹약: 생명 3 → 아군 전체 공격 +4 (같은 레벨 공짜 마법보다 약했다)
    s.text = "생명 3을 내고, 아군 전체 공격 +3, [흡혈].";
    s.ops = [{ op: "mod", side: "ally", area: { t: "all" }, a: 3 }, { op: "grant", side: "ally", area: { t: "all" }, ab: { leech: 1 } }];
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF["MA-16"] = "{대가} 생명 3|{아군 전체} ⚔+3 [흡혈]";
  } }

  /* ---------- 특색 없던 마법을 마족 마법으로 바꿈 (카드 ID · 등급 그대로, 이름 · 효과 · 글을 새로) ----------
     "이번 턴 낸 생명"(X.paid)을 읽는 마법은 뒤 칸에 둘수록 커진다 — 마법 연계 */
  const REWORK = {
    "MA-04": { n: "피의 공명", kind: "atk", lv: 1,   // 전: 저주의 낙인 (적 유닛 2 방어 −2, 피해 1)
      text: "상대 유닛 중 공격이 가장 높은 1기에게 피해 (이번 턴 낸 생명 + 2).",
      ops: [{ op: "paidHit", area: { t: "maxA", n: 1 }, plus: 2, mul: 1 }],
      brief: "{적 최강1} 피해 = 이번 턴 낸 생명 +2",
      desc: "흘린 피는 사라지지 않는다. 심연 아래로 스며 울리다가, 마지막 주문에 실려 한꺼번에 터져 나온다." },
    "SA1-06": { n: "피의 제물", kind: "atk", lv: 2,   // 전: 절망의 낙인 (상대 유닛 전체 방어 −2)
      text: "아군 유닛마다 체력 −1. 깎인 체력을 모두 더한 값의 3배만큼 상대 맨 앞 유닛에게 피해. 쓰러뜨리고 남은 피해는 다음 유닛에게 넘어간다.",
      ops: [{ op: "tithe", per: 1, mul: 3 }],
      brief: "{아군 전체} ♥−1|{적 앞1} 피해 = 깎인 합 ×3, 남으면 다음",
      desc: "녹타르의 계약자들은 제 손바닥을 그어 칼날에 피를 먹인다. 흘린 피가 많을수록 칼은 멀리 닿는다." },
    "SA1-01": { n: "심연의 부름", kind: "com", lv: 2,   // 전: 피의 방패 (아군 맨 앞 2기 방어 +1 +1C)
      text: "생명 2를 내고, 내 소각장의 유닛 가운데 레벨이 이번 턴 낸 생명 이하인 유닛 하나(레벨이 가장 높은 것)를 이 칸에 되살린다. 되살린 유닛은 전장에 남는다.",
      ops: [{ op: "rebirth" }], cost: { life: 2 },
      brief: "{대가} 생명 2|{나} 소각장 유닛 1 되살림 (레벨 ≤ 이번 턴 낸 생명)",
      desc: "모르카스의 저울은 죽은 자도 단다. 산 자가 피를 충분히 올리면, 맞은편 접시에서 누군가 일어선다." },
    "SA1-02": { n: "그림자 손아귀", kind: "com", lv: 1,   // 전: 상대 맨 앞 유닛 공격 −2, 피해 2
      text: "상대 유닛 가운데 레벨이 (이번 턴 낸 생명 + 1) 이하인 유닛 하나(레벨이 가장 높은 것)를 빼앗아 내 전장 맨 뒤에 놓는다. 이번 턴 내 유닛으로 싸우고, 전투가 끝나면 흩어진다(원래 주인의 소각장으로).",
      ops: [{ op: "paidSteal", plus: 1 }],
      brief: "{적 1} 빼앗음 (레벨 ≤ 이번 턴 낸 생명 +1) · 이번 턴",
      desc: "발밑의 그림자가 손이 되어 적을 움켜쥔다. 피를 많이 바칠수록 손아귀는 더 큰 것을 끌어온다." },
    "MC-05": { n: "환각", kind: "com", lv: 1,   // 전: 쇠약의 저주 (상대 유닛 전체 방어 −1, 맨 앞 2기 피해 1 +1C)
      text: "상대 맨 앞 유닛이 환각에 빠져, 바로 뒤의 제 편 유닛을 제 공격으로 친다.",
      ops: [{ op: "confuse" }],
      brief: "{적 앞1} 바로 뒤 제 편을 제 ⚔로 침",
      desc: "녹타르의 안개를 마신 자는 곁의 전우가 마족으로 보인다. 칼을 내리친 뒤에야 그 얼굴을 알아본다." },
    "SA1-04": { n: "거울 환영", kind: "com", lv: 2,   // 전: 저주받은 반격 (생명 3, 상대 맨 앞 2기 피해 3)
      text: "생명 2를 내고, 상대 유닛 중 공격이 가장 높은 1기의 환영을 이 칸에 부른다. 환영은 그 유닛과 같은 카드(아이템 없음)로 이번 턴 내 편에서 싸우고, 전투가 끝나면 사라진다.",
      ops: [{ op: "phantom" }], cost: { life: 2 },
      brief: "{대가} 생명 2|{적 최강1}의 환영을 내 편에 · 이번 턴",
      desc: "모르카스의 거울에 비친 자는 제 그림자와 싸운다. 그림자는 원본의 힘을 그대로 빌리되, 원본의 갑옷은 빌리지 못한다." }
  };
  for (const id in REWORK) {
    const s = S(id), r = REWORK[id]; if (!s) continue;
    s.n = r.n; s.kind = r.kind; s.lv = r.lv; s.text = r.text; s.ops = r.ops; s.cost = r.cost || {}; s.gain = {}; s.desc = r.desc;
    delete s.coin; delete s.anchor;
    if (typeof SPELL_BRIEF !== "undefined") SPELL_BRIEF[id] = r.brief;
  }

  /* ---------- 생명을 내는 마족 마법 = [제물] (v3.65 사용자 결정) ----------
     예전엔 "아군 유닛 전체에게 [강탈]"을 함께 걸어 생명을 되찾게 했다. 이제 낸 생명은 제물이고, 그 마법이 겨눈 상대 유닛에 [제물 증표]가 붙어
     그 유닛이 쓰러지면 바친 생명이 돌아오고 카드는 내 소각장으로 간다(2026-11-17, js/engine.js abOffer). 글 "생명 N을 내고," → "[제물 N]" */
  const SAC = s => { if (s.g !== "A1" || !(s.cost && s.cost.life) || s.kind === "hand" || s.type === "hand") return;
    s.text = String(s.text || "").replace(/생명 (\d+)[을를] 내고,?\s*/, "[제물 $1] ");
    if (typeof SPELL_BRIEF !== "undefined" && SPELL_BRIEF[s.id]) SPELL_BRIEF[s.id] = SPELL_BRIEF[s.id]
      .replace("{대가} 생명", "{제물} 생명")
      .replace(/ · 대가 생명 (\d+)/, " · 제물 $1"); };
  for (const s of SIM_SPELLS) { SAC(s);
    if (s.g === "A1") { s.text = String(s.text || "").replace(/이번 턴 낸 생명/g, "이번 턴 바친 제물");
      if (typeof SPELL_BRIEF !== "undefined" && SPELL_BRIEF[s.id]) SPELL_BRIEF[s.id] = SPELL_BRIEF[s.id].replace(/이번 턴 낸 생명|낸 생명/g, "바친 제물"); } }
})();

/* 등급: 바꾼 마법은 원래 등급 그대로 (js/grades.js가 읽는 자리만 남김) */
const ABYSS_GRADES = {};
