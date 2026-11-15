/* ETHERION v3.66.1 — 번개 노움(B3) [증폭] 보강
   abyss.js 다음, decks.js · cards.js 앞에 읽는다(카드 데이터 SIM_* 를 고친다. 균형 도구가 data.js · rebalance.js를 다시 써도 이 파일은 그대로 남는다).
   등급은 js/grades.js가 GNOME_GRADES를 맨 끝에 덮는다(REBAL_GRADES · ABYSS_GRADES 다음).

   - 새 공격 마법 2장(일반): 상대 유닛 여럿을 치는 공격 마법이라 [증폭]이 맞는 유닛마다 붙는다.
     [증폭]은 공격 마법(kind "atk")에만 붙으므로 둘 다 공격 마법으로 만들었다.
   - 스탯이 낮은 일반 유닛 4장(1 · 3 · 6 · 7레벨)을 고급으로 올리고 하급 능력 자리에 [증폭]을 넣었다. 스탯은 그대로. */
"use strict";

const GNOME_AMP = (n) => ({ evName: "증폭 " + n, evText: "이 유닛이 전장에 있으면 내 마법이 상대 유닛에게 주는 피해 +" + n + "." });

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

/* ---------- v3.72 대표 능력 [증폭] — [방어무시]는 엘프에게 ----------
   [증폭 N]은 이제 공격 마법만이 아니라 공용 · 방어 마법이 상대 유닛에게 주는 피해에도 붙는다(js/engine.js AMP_KINDS).
   그래서 [방어무시](엘프 대표 능력, js/elf.js)를 노움에서 걷는다:
   - 증폭으로 바꿈: 하급 능력 자리가 [방어무시 1]이던 고급 유닛 일부 · 연쇄 번개 학자 · 일곱 번째
   - 스탯으로 돌림: 나머지 고급 유닛은 [방어무시]를 빼고 일반으로(v3.49 재정비 전 스탯 — 일반은 능력 없이 스탯이 조금 높다)
   - 아이템: [방어무시]를 빼고 증폭 · 스탯으로 */
const GNOME_V372 = {
  amp: { "PN-B3-U1": 1, "B3-36": 1, "EP-B3-2": 1, "SP-B3": 2 },   // 유닛: [방어무시] 걷고 [증폭 N]
  plain: { "B3-04": {}, "B3-10": {}, "B3-25": {}, "B3-20": { a: 6 }, "B3-32": { h: 7 }, "B3-33": { a: 8 } },          // 유닛: [방어무시] 걷고 일반 · 스탯
  item: {                                                                                     // 아이템: [방어무시] 걷기
    "IB3-1": { amp: 1, desc: "손목에 감는 구리 코일. 감은 손으로 부르는 번개는 한 줄기 더 굵다." },              // 구리 코일 L2 1/0/1
    "IB3-5": { amp: 1, h: 3, desc: "볼타리움 학술원의 두꺼운 법전. 공식 한 줄이 번개 한 갈래를 더 부른다." },        // 학술원 법전 L3 2/0/2 → 2/0/3
    "C4-1":  { h: 6 },                // 별을 읽는 보주 L4 (증폭 2 · 사격 1 그대로) 0/0/5 → 0/0/6
    "IB3-7": { a: 4 },                // 케라운의 뇌관 L4 (연쇄 그대로) 3/0/3 → 4/0/3
    "PI-B3": {}                       // 즈라크의 번개 병 (사격 · 원거리 · 가호 그대로)
  }
};
const GNOME_AMP_TEXT = n => "이 유닛이 전장에 있으면 내 마법이 상대 유닛에게 주는 피해 +" + n + ".";
(function () {
  const V = GNOME_V372;
  for (const id in V.amp) {
    const u = SIM_UNITS.find(x => x.id === id); if (!u) continue;
    const g = Object.assign({}, u.gift || {}); delete g.magic;
    u.gift = Object.assign(g, { evName: "증폭 " + V.amp[id], evText: GNOME_AMP_TEXT(V.amp[id]) });
  }
  for (const id in V.plain) {
    const u = SIM_UNITS.find(x => x.id === id); if (!u) continue;
    const g = Object.assign({}, u.gift || {}); delete g.magic;
    u.gift = Object.keys(g).length ? g : undefined; if (!u.gift) delete u.gift;
    Object.assign(u, V.plain[id]);
    GNOME_GRADES[id] = "common";
  }
  for (const id in V.item) {
    const it = SIM_ITEMS.find(x => x.id === id); if (!it) continue;
    const o = V.item[id]; delete it.magic;
    if (o.a != null) it.a = o.a; if (o.h != null) it.h = o.h;
    if (o.amp) { it.evName = "증폭 " + o.amp; it.evText = GNOME_AMP_TEXT(o.amp); }
    if (o.desc) it.desc = o.desc;
  }
  /* 증폭 글은 어느 깃발 카드든 새 규칙으로 */
  const fix = o => { if (o && o.evName && /^증폭/.test(o.evName)) o.evText = GNOME_AMP_TEXT(parseInt(o.evName.replace(/\D/g, "")) || 1); };
  for (const u of SIM_UNITS) fix(u.gift);
  for (const it of SIM_ITEMS) fix(it);
})();
