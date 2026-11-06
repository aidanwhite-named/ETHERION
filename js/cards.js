/* ETHERION — 카드 모델과 규칙 상수
   카드 원본은 js/data.js (유닛·마법·아이템 시뮬레이터에서 가져온 값).
   이 파일은 그 데이터를 게임에서 쓰는 모양으로 바꾸고, 기본 덱을 만든다. */
"use strict";

const RULES = {
  deckSize: 40,        // 덱 장수
  maxCopies: 4,        // 같은 카드 최대 장수
  startLife: 40,       // 시작 생명
  lifeCap: 40,         // 회복 상한
  handSize: 6,         // 보충 시 손패
  slots: 5,            // 전장 칸 수
  essence: 1,          // 위대한 정수: 게임 시작부터 매 턴 에테르 1 (깨지지 않음)
  maxCrystals: 9,      // 최대 결정 수 (정수와 합쳐 에테르 최대 10)
  crystalsPerTurn: 1,  // 한 턴 결정화 제한
  coinP: 0.5           // 코인 앞면 확률
  // 원소·진영 상성 보너스는 없다. 시뮬레이터들이 상성 없이 수치를 맞췄기 때문.
};

/* 진영: camp 글자는 시뮬레이터의 B/G/A */
const FACTIONS = {
  brass:   { id: "brass",   camp: "B", name: "아다만트 연합",   en: "Adamant Concord",    motto: "신 없이, 기술로 신에 닿는다", color: "#d4893a", groups: ["B1", "B2", "B3"] },
  verdant: { id: "verdant", camp: "G", name: "푸른숲 맹약", en: "Verdant Covenant", motto: "판이 길어질수록 숲은 자란다",  color: "#6fae55", groups: ["G1", "G2", "G3"] },
  arcane:  { id: "arcane",  camp: "A", name: "비술 성회",   en: "Arcane Conclave",  motto: "모든 힘에는 대가가 따른다",   color: "#9b6ddb", groups: ["A1", "A2", "A3"] }
};
const CAMP_TO_FACTION = { B: "brass", G: "verdant", A: "arcane" };

const GROUPS = {
  B1: { name: "잿불 고블린",     en: "Cinder Goblins",       faction: "brass",   role: "공격형", el: "fire",      glyph: "gun",     color: "#f06a48", ai: "포르탄의 고블린 포대장",     motto: "쏘고, 장전하고, 또 쏜다",       blurb: "고블린과 인간 포병. 작고 겁이 없는 폭약 천재들이다. 광역 피해와 순간 화력이 강하지만, 쏜 다음 턴에는 장전해야 한다." },
  B2: { name: "무쇠수염 드워프",  en: "Ironbeard Dwarves", faction: "brass",   role: "수비형", el: "metal",     glyph: "golem",   color: "#a3afbd", ai: "두르크하임의 공방장", motto: "강철은 물러서지 않는다",        blurb: "드워프와 그들이 빚은 골렘·오토마톤. 장갑으로 피해를 줄이며 버티지만 느리고 저주에 약하다." },
  B3: { name: "번개 노움",     en: "Thunder Gnomes",      faction: "brass",   role: "전략형", el: "lightning", glyph: "volt",    color: "#e9bd3c", ai: "볼타리움의 노움 교수", motto: "모은 만큼 터진다",              blurb: "대륙에서 가장 영리하고 몸이 가장 약한 노움 학자들. 충전을 쌓고 장치를 깔아 두었다가 한 번에 터뜨린다." },
  G1: { name: "바위주먹 오크", en: "Rockfist Orcs",       faction: "verdant", role: "공격형", el: "earth",     glyph: "fang",    color: "#c99260", ai: "가르운의 오크 족장",       motto: "몰릴수록 송곳니는 날카로워진다", blurb: "오크 전사들. 힘은 가장 세지만 꾀가 없고, 늑대와 곰을 타고 싸운다. 몰릴수록 격노해 한 방으로 판을 뒤집는다." },
  G2: { name: "이끼 트롤",     en: "Moss Trolls",    faction: "verdant", role: "수비형", el: "forest",    glyph: "elder",   color: "#5fbf7a", ai: "실바니엘의 트롤 장로",       motto: "뿌리는 뽑히지 않는다",          blurb: "이끼 트롤과 트렌트. 잘려도 다시 자라는 몸으로 가시로 피해를 돌려주고 재생하며 오래 버틴다. 불에 약하다." },
  G3: { name: "푸른비늘 인어",     en: "Bluescale Merfolk",   faction: "verdant", role: "전략형", el: "water",     glyph: "spring",  color: "#5cb3e0", ai: "셀레네아의 인어 무녀장",       motto: "물은 모든 상처를 씻는다",       blurb: "인어와 물의 정령 무녀. 물 밖에서는 느리지만, 아군을 치유하고 상대의 강화를 씻어낸다." },
  A1: { name: "심연 마족",     en: "Abyssal Fiends",         faction: "arcane",  role: "공격형", el: "dark",      glyph: "abyss",   color: "#ac82dc", ai: "녹타르의 계약자",     motto: "대가를 치르면 무엇이든 얻는다", blurb: "마족 계약자. 체력을 대가로 내고 게임 최고 수준의 일격을 날린다." },
  A2: { name: "성광 천족",     en: "Radiant Seraphs",    faction: "arcane",  role: "수비형", el: "light",     glyph: "radiant", color: "#f0cf6a", ai: "엘라드의 기사단장",       motto: "빛은 등 뒤의 동료를 지킨다",    blurb: "천족과 인간 기사. 아군 대신 공격을 받고 보호막으로 핵심 카드를 지킨다." },
  A3: { name: "폭풍 하이엘프",   en: "Storm High Elves",    faction: "arcane",  role: "전략형", el: "wind",      glyph: "storm",   color: "#6cc9c1", ai: "바늘탑의 대마도사",   motto: "바람은 계획을 흩어 놓는다",     blurb: "하이엘프 마법사. 몸은 약하고 오만하지만, 패를 돌려 원하는 카드를 찾고 상대의 계획을 흐트러뜨린다." }
};
const GROUP_IDS = Object.keys(GROUPS);
for (const g of GROUP_IDS) GROUPS[g].id = g;

const ELEMENTS = {
  fire:      { name: "화염", icon: "🔥", color: "#ff6b3d" },
  metal:     { name: "금속", icon: "⛓️", color: "#a9b4c2" },
  lightning: { name: "번개", icon: "⚡", color: "#ffd84a" },
  earth:     { name: "대지", icon: "🪨", color: "#b88a5a" },
  forest:    { name: "숲",   icon: "🌳", color: "#58b85f" },
  water:     { name: "물",   icon: "💧", color: "#4fb3ff" },
  dark:      { name: "암흑", icon: "🌑", color: "#8b5cf6" },
  light:     { name: "빛",   icon: "☀️", color: "#ffe9a8" },
  wind:      { name: "바람", icon: "🌪️", color: "#9fe3d6" },
  steel:     { name: "아이템", icon: "◆", color: "#c9b27a" }
};

/* 아이템 종류 이름(무구·촉매·성물·각인)은 꾸밈말로만 남는다 (v1.0에서 클래스 규칙 제거) */

const TYPES = {
  unit: { name: "유닛",      en: "Unit" },
  atk:  { name: "공격 마법", en: "Assault Rite" },
  def:  { name: "방어 마법", en: "Ward Rite" },
  any:  { name: "공용 마법", en: "Common Rite" },
  hand: { name: "계략 마법", en: "Scheme Rite" },
  item: { name: "아이템",    en: "Relic" }
};

/* ---------- 클래스 ----------
   v1.0에서 클래스(무도·무장·마도·기도)를 규칙에서 뺐다가, v2.3에서 아이템 장착에만 되살렸다.
   - 유닛은 클래스 하나(data.js의 cl). 아이템은 장착할 수 있는 클래스 목록(data.js의 cls, "공용"이면 모두).
   - 아이템은 클래스가 맞는 유닛에만 장착한다 (canEquip). 카드 오른쪽 위 동그라미 아이콘이 겹치면 장착된다.
   - 마법은 그대로: "아군/상대 ○○ 유닛 전체"를 겨냥하던 마법 21장은 "맨 앞 2기"를 겨냥한다 (v1.0).
   - "아군/상대 ○○ 유닛 전체"를 겨냥하던 마법 21장은 "맨 앞 2기"를 겨냥한다 (클래스 60% 덱에서 재던 범위와 비슷한 크기이고, 대기열 규칙과 바로 이어진다).
   원문은 카드의 prevText 뒤에 "v0.9:"로 남긴다. */
function declassSpell(s) {
  if (!(s.grp === "class" || (s.ops || []).some(o => o.cls))) return { ops: s.ops, text: s.text, changed: false };
  const ops = s.ops.map(o => {
    if (!o.cls) { const c = Object.assign({}, o); delete c.cls; return c; }
    const c = Object.assign({}, o, { area: { t: "front", n: 2 } }); delete c.cls; return c;
  });
  let text = s.text
    .replace(/아군 (무도|무장|마도|기도) 유닛 전체/g, "아군 맨 앞 2기")
    .replace(/상대 (무도|무장|마도|기도) 유닛 전체/g, "상대 맨 앞 2기")
    .replace(/\s*\([^)]*\)\s*$/g, "")                // 끝의 괄호 설명(성물·무구 언급) 제거
    .replace(/\s*\([^)]*(성물|무구)[^)]*\)/g, "");
  return { ops, text, changed: true };
}

/* ---------- 카드 만들기 ---------- */
const CARD_LIST = [];
for (const u of SIM_UNITS) {
  const G = GROUPS[u.g];
  CARD_LIST.push({ id: u.id, type: "unit", name: u.n, group: u.g, faction: G.faction, el: G.el, lv: u.lv, up: u.up,
    a: u.a, d: u.d, h: u.h, co: u.co, w: u.w, orig: u.orig || null, origCo: u.origCo || null, v12: u.v12 || null, v12Co: u.v12Co || null,
    team: u.team == null ? null : u.team, rev: u.rev || "", legend: u.lv === 8 && u.up >= 2, lock: u.lock || null, cl: u.cl || "무도",
    // v2.9 스페셜 유닛(js/specials.js): 타고난 능력 gift(아이템 능력과 같은 꼴), 덱에 1장(limit), 설명 글
    gift: u.gift || null, limit: u.limit || 0, special: !!u.special, unique: !!u.unique, flavor: u.desc || "" });   // v3.2 유니크(js/uniques.js)
}
for (const s of SIM_SPELLS) {
  const G = GROUPS[s.g];
  const dc = declassSpell(s);
  CARD_LIST.push({ id: s.id, type: s.kind === "com" ? "any" : s.kind, name: s.n, group: s.g, faction: CAMP_TO_FACTION[s.camp], el: G.el,
    lv: s.lv, up: 0, a: 0, d: 0, h: 0, co: [], ops: dc.ops, cost: s.cost || {}, gain: s.gain || {}, text: dc.text, e: s.e,
    classSpell: null, anchor: s.anchor || "", limit: s.limit || 0, comeback: !!s.comeback, eB: s.eB, eA: s.eA,
    prevText: "" });   // v1.4.5: 옛 문구(옛 클래스·이름이 들어 있음)는 어디에도 쓰지 않아 비운다. 원문은 data.js의 prevText에만 남는다
}
for (const it of SIM_ITEMS) {
  const G = GROUPS[it.g];
  CARD_LIST.push({ id: it.id, type: "item", name: it.n, group: it.g, faction: G.faction, el: G.el, lv: it.lv, up: 0,
    a: it.a || 0, d: it.d || 0, h: it.h || 0, co: it.co || [], item: it, cat: it.cat, cls: (it.cls && it.cls.length) ? it.cls.slice() : ["공용"], flavor: it.desc || "",
    limit: it.limit || 0, special: !!it.special });
}
const CARDS = {};
CARD_LIST.forEach(c => { CARDS[c.id] = c; });
/* v1.4 소환물: 마법이 부르는 유닛과 작은 마법. CARDS에만 있고 덱·상점·보관함(CARD_LIST)에는 없다
   v2.3: 소환물 유닛의 클래스 (08 문서 이름 기준: 맹수·골렘·정령·악마 → 무도, 기사 → 무장) */
const TOKEN_CL = { "TK-G1-1": "무도", "TK-G1-2": "무도", "TK-B2-1": "무도", "TK-A2-1": "무장", "TK-A1-1": "무도", "TK-G3-1": "무도", "TK-G2-1": "무도" };
for (const t of (typeof SIM_TOKENS !== "undefined" ? SIM_TOKENS : [])) {
  const G = GROUPS[t.g];
  const base = { id: t.id, name: t.n, group: t.g, faction: G.faction, el: G.el, lv: t.lv, up: 0, tok: true, flavor: t.desc || "" };
  CARDS[t.id] = t.kind
    ? Object.assign(base, { type: t.kind === "com" ? "any" : t.kind, a: 0, d: 0, h: 0, co: [], ops: t.ops, cost: {}, gain: {}, text: t.text })
    : Object.assign(base, { type: "unit", a: t.a, d: t.d, h: t.h, co: t.co || [], lock: t.lock || null, w: null, rev: "", legend: false, cl: t.cl || TOKEN_CL[t.id] || "무도" });
}

/* 소환 비용 = 레벨 (규칙 문서 6. 소환 자원). 유닛·마법·아이템 모두 같다 */
function cardCost(c) { return c.lv; }
const STAT_KO = { a: "공격", d: "방어", h: "체력" };
const STAT_ICON = { a: "⚔", d: "⛨", h: "♥" };
const sgnNum = v => (v > 0 ? "+" + v : v < 0 ? "−" + Math.abs(v) : "0");

/* 카드마다 덱에 넣을 수 있는 최대 장수 (역전 마법은 1장) */
const maxCopiesOf = id => { const c = typeof id === "string" ? CARDS[id] : id; return (c && c.limit) || RULES.maxCopies; };

/* 코인 표기: [스탯, 개수, 값] → "공+1×2" */
function coinList(co) { return co.map(([st, n, v]) => `${STAT_KO[st][0]}${sgnNum(v)}${n > 1 ? "×" + n : ""}`).join(" "); }
function coinText(c, stat) {
  const cs = c.co.filter(x => x[0] === stat);
  if (!cs.length) return "";
  return cs.map(([, n, v]) => sgnNum(v) + "C" + (n > 1 ? "×" + n : "")).join(" ");
}
/* 스탯 옆 코인 기호: 값이 같은 코인끼리 개수를 합쳐 "+C4"(앞면마다 +1, 코인 4개), "−2C1"(앞면마다 −2, 코인 1개).
   값이 1이면 숫자를 생략한다 */
function coinMarks(co, stat) {
  const byV = new Map();
  for (const [st, n, v] of co || []) if (st === stat) byV.set(v, (byV.get(v) || 0) + n);
  return [...byV.entries()].sort((x, y) => y[0] - x[0])
    .map(([v, n]) => ({ v, n, s: (v > 0 ? "+" : "−") + (Math.abs(v) === 1 ? "" : Math.abs(v)) + "C" + n }));
}
function coinMarkText(co, stat) { return coinMarks(co, stat).map(m => m.s).join(" "); }

/* 아이템 효과 문장 */
function itemAbilities(it) {
  const out = [];
  if (it.shred) out.push("[관통]");
  if (it.magic) out.push(`[마력 공격 ${it.magic === true ? "전부" : it.magic}]`);
  if (it.crit) out.push("[치명]");
  if (it.throw) out.push(it.every ? `[사격 ${it.throw}]` : `[투척 ${it.throw}]`);
  if (it.ranged) out.push("[원거리]");
  if (it.ward) out.push(`[가호 ${it.ward}]`);
  if (it.shield) out.push("[보호막 코인]");
  if (it.thorns) out.push(`[가시 ${it.thorns}]`);
  if (it.lock && !it.set) out.push("[고정: " + Object.keys(it.lock).map(k => STAT_KO[k]).join("·") + "]");
  if (it.evName) out.push(`[${it.evName}]`);
  return out;
}
/* v2.2: 아이템 글은 두 단계다.
   ① 아이템이 하는 일: "[관통] 능력 부여" (유닛에게 주는 특수 능력), "장착할 때 [치유 3]" (장착하는 순간 한 번)
   ② 그 능력의 뜻: "[가호 N] 매 턴 처음 받는 피해를 N만큼 줄인다." — 숫자 자리는 N, 고정할 스탯 자리는 "스탯"
   ①은 itemSummary, ②는 itemKwGenList. 숫자를 넣은 문장(itemKwDesc)은 마우스를 올린 말풍선에 쓴다 */
const ON_EQUIP_KW = /^\[치유/;   // 유닛에게 남지 않고 장착하는 순간 한 번 일어나는 능력
function itemGrants(it) {
  const g = itemAbilities(it).filter(r => !ON_EQUIP_KW.test(r));
  if (it.set) g.unshift(`[고정 ${it.set.a}/${it.set.d}/${it.set.h}]`);
  return g;
}
function itemSummary(it) {
  const out = [], g = itemGrants(it), e = itemAbilities(it).filter(r => ON_EQUIP_KW.test(r));
  if (g.length) out.push(g.join(" ") + " 능력 부여");
  if (e.length) out.push("장착할 때 " + e.join(" "));
  if (it.evText && !it.evName) out.push(it.evText);
  return out;
}
/* 아이템 능력만 (붙는 공·방·체와 코인은 빼고). 카드 위 설명 글에 쓴다 — 붙는 값은 왼쪽 세로 열이 보여 준다. 줄은 \n으로 나눈다 */
function itemAbilityText(it) { return itemSummary(it).join("\n"); }
function itemText(it) {
  const parts = [];
  if (it.set) parts.push(`[고정 ${it.set.a}/${it.set.d}/${it.set.h}] 장착한 유닛의 공·방·체가 이 값이 된다 (유닛 코인은 쓰지 않음).`);
  else {
    const m = ["a", "d", "h"].filter(k => it[k]).map(k => `${STAT_KO[k]} ${sgnNum(it[k])}`);
    if (m.length) parts.push(m.join(", ") + ".");
  }
  for (const s of itemSummary(it).filter(s => !it.set || !s.startsWith("[고정 " + it.set.a))) parts.push(s + ".");
  if (it.co && it.co.length) parts.push("코인 " + coinList(it.co) + ".");
  return parts.join(" ");
}
/* 아이템 능력의 뜻 (v1.4.6: 적힌 숫자를 넣어 그 카드에 맞는 문장으로 보인다. {n} = 능력 이름 뒤의 숫자).
   문장은 실제 규칙(engine.js)과 같아야 한다: 사격 throwPhase, 투척 attackOne, 마력 공격·관통·치명·가시·원거리 attackOne, 가호·보호막 hurt */
const ITEM_KW = {
  "관통": "공격하면, 상대 유닛의 방어가 이번 턴 동안 내 공격력만큼 줄어든다(0까지만).",
  "마력 공격": "공격할 때 상대 방어를 {n}만큼 무시한다. 반격할 때는 적용되지 않는다.",
  "마력 공격 전부": "공격할 때 상대 방어를 모두 무시한다. 반격할 때는 적용되지 않는다.",
  "치명": "맞붙어 공격해 피해를 줄 때마다 코인 1개를 던져, 앞면이면 그 피해가 2배.",
  "투척": "이 아이템을 장착한 그 턴에 한 번, 이 유닛이 공격을 시작할 때 맞선 유닛 말고 다른 상대 유닛 하나의 체력을 함께 {n} 깎는다(쓰러뜨릴 수 있는 유닛 중 레벨이 가장 높은 유닛, 없으면 그다음 맨 앞 유닛). 맞선 유닛뿐이면 그 유닛에게 투척 피해를 먼저 주고 이어서 공격한다.",
  "사격": "내 공격 턴마다, 맞붙기 전에 상대 유닛 하나의 체력을 {n} 깎는다. 대상: 이 피해로 쓰러뜨릴 수 있는 유닛 중 레벨이 가장 높은 유닛, 없으면 상대의 맨 앞 유닛.",
  "원거리": "맞붙어 공격해도 상대의 반격을 받지 않는다.",
  "가호": "매 턴 처음 받는 피해를 {n}만큼 줄인다.",
  "보호막 코인": "매 턴 시작에 코인을 던져 앞면이면, 그 턴 처음 받는 피해 한 번을 통째로 막는다.",
  "고정": "{S} 마법·코인·저주를 받아도 카드와 아이템에 적힌 값 아래로 내려가지 않는다.",
  "가시": "이 유닛을 맞붙어 공격한 상대 유닛은 체력이 {n} 깎인다.",
  "증폭": "이 유닛이 전장에 있으면 내 공격 마법의 피해가 {n} 늘어난다.",
  "치유": "장착하는 순간 내 생명이 {n} 늘어난다."
};
/* 카드에 적는 일반 뜻이 말풍선 문장과 달라야 하는 것만 (나머지는 ITEM_KW의 {n}을 N으로 바꿔 쓴다) */
const ITEM_KW_GEN = {
  "치유": "내 생명이 {n} 늘어난다.",
  "고정 세트": "장착한 유닛의 공·방·체가 적힌 값이 된다. 유닛 코인은 던지지 않는다."
};
/* "[사격 2]" → 그 카드에 맞는 뜻 문장 */
function itemKwDesc(raw) {
  const name = raw.replace(/[\[\]]/g, "").trim();
  if (name === "마력 공격 전부") return ITEM_KW["마력 공격 전부"];
  if (/^고정 \d/.test(name)) return ITEM_KW_GEN["고정 세트"].replace("적힌 값", `적힌 값(${name.slice(3)})`);
  const key = Object.keys(ITEM_KW).find(x => name === x || name.startsWith(x + " ") || name.startsWith(x + ":"));
  if (!key) return "";
  const n = parseInt((name.slice(key.length).match(/\d+/) || [""])[0], 10);
  const st = (name.split(":")[1] || "그 스탯").trim();
  return ITEM_KW[key].replace(/\{S\}/g, st + josaEunNeun(st)).replace(/\{n\}/g, isNaN(n) ? "" : n).replace(/\{m\}/g, isNaN(n) ? "" : Math.max(0, 4 - n));
}

/* 받침이 있으면 "은", 없으면 "는" (방어는 · 체력은) */
function josaEunNeun(w) { const ch = w.charCodeAt(w.length - 1); return ch >= 0xAC00 && ch <= 0xD7A3 && (ch - 0xAC00) % 28 ? "은" : "는"; }
/* "[가호 2]" → ["[가호 N]", "매 턴 처음 받는 피해를 N만큼 줄인다."] (카드에 적는 일반 뜻) */
function itemKwGeneric(raw) {
  const name = raw.replace(/[\[\]]/g, "").trim();
  if (name === "마력 공격 전부") return ["[마력 공격 전부]", ITEM_KW["마력 공격 전부"]];
  if (/^고정 \d/.test(name)) return ["[고정 공/방/체]", ITEM_KW_GEN["고정 세트"]];
  const key = Object.keys(ITEM_KW).find(x => name === x || name.startsWith(x + " ") || name.startsWith(x + ":"));
  if (!key) return null;
  const rest = name.slice(key.length), num = /\d/.test(rest), colon = rest.trim().startsWith(":");
  const label = `[${key}${num ? " N" : ""}${colon ? ": 스탯" : ""}]`;
  const text = (ITEM_KW_GEN[key] || ITEM_KW[key]).replace(/\{S\}/g, "고정한 스탯은").replace(/\{n\}/g, "N").replace(/\{m\}/g, "4 − N");
  return [label, text];
}
/* 아이템 능력의 일반 뜻 목록 [[이름, 뜻]] — 같은 능력은 한 번만 */
function itemKwGenList(it) {
  const out = [], seen = new Set();
  for (const raw of itemGrants(it).concat(itemAbilities(it).filter(r => ON_EQUIP_KW.test(r)))) {
    const g = itemKwGeneric(raw); if (!g || seen.has(g[0])) continue; seen.add(g[0]); out.push(g);
  }
  return out;
}
/* 아이템 능력과 그 뜻: [[이름, 뜻]] (숫자를 넣은 문장. 장착한 유닛의 설명·말풍선에서 쓴다) */
function itemKwList(it) {
  const out = [];
  if (it.set) out.push(["[고정]", "장착한 유닛의 공·방·체가 이 값이 된다 (유닛 코인은 쓰지 않음)."]);
  for (const raw of itemAbilities(it)) {
    const name = raw.replace(/[\[\]]/g, "");
    out.push([raw, itemKwDesc(raw)]);
  }
  if (it.evText && !(it.evName && itemKwDesc(`[${it.evName}]`))) out.push(["", it.evText]);   // 이름 붙은 능력(증폭·치유)은 위 뜻 문장과 겹치므로 한 번만
  return out;
}

/* v2.9 스페셜 유닛의 타고난 능력: 아이템 능력 글을 그대로 쓴다 ("[가호 2] 타고난 능력") */
function giftSummary(c) {
  if (!c || !c.gift) return [];
  const g = itemGrants(c.gift), out = [];
  if (g.length) out.push(g.join(" ") + " 타고난 능력");
  if (c.gift.evText && !c.gift.evName) out.push(c.gift.evText);
  return out;
}
function giftText(c) { return giftSummary(c).join("\n"); }
/* 카드 본문 */
function cardRules(c) {
  if (c.type === "item") return itemText(c.item) + (c.item.evText ? " " + c.item.evText : "");
  if (c.type !== "unit") return c.text + spellCostText(c);
  return c.gift ? "유닛. " + giftSummary(c).join(". ") + "." : "유닛.";
}
function spellCostText(c) {
  const t = [];
  if (c.cost && c.cost.ether) t.push(` [장전 ${c.cost.ether}] 다음 턴 에테르 −${c.cost.ether}.`);
  return t.join("");
}
/* v1.9.1: 마법 글 속 [보호막] 같은 특수 능력의 뜻. 마우스를 올리면 말풍선으로 나온다 (뜻은 engine.js의 실제 규칙과 같게) */
const SPELL_KW = {
  "보호막": "그 턴에 처음 받는 피해 한 번을 통째로 막는다. 막고 나면 사라진다.",
  "가시": "이 유닛을 맞붙어 공격한 상대 유닛은 체력이 {n} 깎인다.",
  "고정": "이번 턴 동안 방어가 마법으로 바뀌지 않고, 이미 깎인 방어는 원래 값으로 돌아온다.",
  "수호": "상대의 공격이 맨 앞 유닛보다 먼저 이 유닛에게 향한다.",
  "장전": "이 마법을 쓰면 다음 턴 에테르가 {n} 줄어든다."
};
function spellKwDesc(inner) {
  const name = inner.trim();
  if (/^고정 \d/.test(name)) return itemKwDesc("[" + name + "]");
  const key = Object.keys(SPELL_KW).find(x => name === x || name.startsWith(x + " "));
  if (key) { const n = parseInt((name.slice(key.length).match(/\d+/) || [""])[0], 10); return SPELL_KW[key].replace(/\{n\}/g, isNaN(n) ? "" : n); }
  return itemKwDesc("[" + name + "]");
}
/* 글을 안전하게 적고, 뜻이 있는 [능력]에는 마우스를 올리면 설명이 뜨는 표시를 붙인다 */
function kwHTML(text) {
  return esc(text).replace(/\[([^\[\]]+)\]/g, (m, inner) => {
    const d = spellKwDesc(inner);
    return d ? `<span class="kw" title="" data-tip="${esc("[" + inner.trim() + "]\n" + d)}">${m}</span>` : m;
  });
}
function cardKwShort(c) {
  if (c.type === "item") return itemAbilityText(c.item);
  if (c.type === "unit") return giftText(c);
  // v1.9: 카드 글에 이미 [장전 N]이 적혀 있으면 다시 붙이지 않는다 (예: 대포격이 "[장전 2] [장전 2]"로 두 번 보이던 문제)
  if (c.type !== "unit") return c.text + (c.cost && c.cost.ether && !/\[장전 \d+\]/.test(c.text) ? ` [장전 ${c.cost.ether}]` : "");
  return "";
}
function cardSubtitle(c) {
  if (c.type === "unit") return GROUPS[c.group].en;
  return GROUPS[c.group].en;
}

/* 덱은 한 단체의 카드로만 만든다: 그 단체의 유닛·마법·아이템 */
function deckable(c, g) { return c.group === g; }
function cardsOfGroup(g) { return CARD_LIST.filter(c => c.group === g); }
function groupOf(id) { return GROUPS[id] ? GROUPS[id] : null; }
function countMap(m) { return Object.values(m).reduce((a, b) => a + b, 0); }
/* v2.3: 아이템은 클래스가 맞는 유닛에만 장착한다. [공용]은 누구나.
   카드 오른쪽 위 동그라미(클래스 아이콘)가 유닛과 아이템에서 하나라도 같으면 장착된다 */
const CLASS_NAMES = ["무도", "무장", "마도", "기도"];
function itemClasses(itemCard) { return (itemCard && itemCard.cls) || ["공용"]; }
function isAllClass(itemCard) { const cs = itemClasses(itemCard); return cs.includes("공용") || CLASS_NAMES.every(k => cs.includes(k)); }
function classFits(itemCard, unitCard) { return !!(itemCard && unitCard) && (isAllClass(itemCard) || itemClasses(itemCard).includes(unitCard.cl)); }
function canEquip(itemCard, unitCard) { return classFits(itemCard, unitCard); }
/* 이름 옆 클래스 꼬리표: 유닛 [무도] · 아이템 [무장 전용] / [무장, 기도 전용] / [공용] */
function classTagText(c) {
  if (c.type === "unit") return c.cl ? `[${c.cl}]` : "";
  if (c.type === "item") return isAllClass(c) ? "[공용]" : `[${itemClasses(c).join(", ")} 전용]`;
  return "";
}

/* ---------- 기본 덱 (단체마다 40장) ----------
   DECK_LISTS(js/decks.js)에 시뮬레이터로 맞춘 덱이 있으면 그것을 쓰고, 없으면 아래 규칙으로 만든다. */
function buildStarter(g) {
  const deck = {}, add = (id, n) => { deck[id] = (deck[id] || 0) + n; };
  const units = L => CARD_LIST.filter(c => c.type === "unit" && c.group === g && c.lv === L).sort((a, b) => (a.up - b.up) || (b.w - a.w));
  const want = { 1: 6, 2: 6, 3: 4, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 };
  for (const L in want) { let need = want[L]; for (const c of units(+L)) { if (need <= 0) break; const k = Math.min(need, +L <= 2 ? 2 : 1); add(c.id, k); need -= k; } }
  const sp = CARD_LIST.filter(c => c.group === g && c.type !== "unit" && c.type !== "item").sort((a, b) => a.lv - b.lv);
  sp.slice(0, 10).forEach(c => add(c.id, 1));
  const its = CARD_LIST.filter(c => c.group === g && c.type === "item" && !c.item.set).sort((a, b) => a.lv - b.lv);
  its.slice(0, 6).forEach(c => add(c.id, 1));
  let n = countMap(deck); const fill = units(1).concat(units(2));
  for (let k = 0; n < RULES.deckSize && k < 99; k++) { const c = fill[k % fill.length]; if ((deck[c.id] || 0) < maxCopiesOf(c)) { add(c.id, 1); n++; } }
  return deck;
}
const STARTER_DECKS = {};
for (const g of GROUP_IDS) STARTER_DECKS[g] = (typeof DECK_LISTS !== "undefined" && DECK_LISTS[g]) ? Object.assign({}, DECK_LISTS[g].cards) : buildStarter(g);
