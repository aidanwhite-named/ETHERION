/* ETHERION v3.46 — 퀘스트의 규칙: 오늘 · 주간 퀘스트, 별 자리(주간 상자), 업적 · 칭호, 카드 도감 보상, 온라인 등급(시즌).
   화면 없는 부분만 여기 둔다. 게임과 서버(server/rules.js의 EXTRA)가 **같은 파일**을 읽는다(js/pilgrim-rules.js와 같은 방식).
   - 진행은 서버가 센다: 판 결과는 서버가 검산(컴퓨터 · 순례 · 원정)하거나 두 사람의 보고가 맞물린(온라인) 판만 — js/rewards.js _settle이 Store.questMatch를 부른다.
     파일로 연 게임(로컬)은 js/screens.js onMatchEnd가 이 기기에서 부른다.
   - 기기가 고칠 수 없는 칸(server.js PROTECTED · net.js NET_PROTECTED): quests · ach · titles · title · book · rank.
   - 받기(보상)는 모두 Store 함수 하나씩: questSync · questClaim · questReroll · starClaim · achClaim · bookClaim · titleSet · rankClaim (server.js OPS · net.js NET_SYNC_OPS).
   - 수치는 QUEST 한곳에서 고친다. 퀘스트 · 업적 · 칭호를 더하려면 QUEST_DAILY · QUEST_WEEKLY · ACHIEVEMENTS · TITLES에 한 줄. */
"use strict";

const QUEST = {
  daily: 3, weekly: 3,              // 하루 · 한 주에 받는 퀘스트 수
  rerollPerDay: 1,                  // 오늘의 퀘스트 바꾸기 (하루 한 번, 아직 끝내지 않은 것만)
  allDailySpins: 1,                 // 오늘의 퀘스트 셋을 모두 받으면 수레바퀴 표
  starDaily: 1, starWeekly: 3,      // 퀘스트 하나를 받을 때 쌓이는 별 (한 주마다 처음부터)
  /* 별 자리: 한 주에 별을 모으면 상자를 연다. card = 등급 확률표(js/pilgrim-rules.js pilRollGrade) */
  stars: [
    { n: 3, spins: 2 },
    { n: 7, gold: 300 },
    { n: 12, card: { uncommon: 1 } },
    { n: 18, card: { rare: 0.9, epic: 0.1 } },
    { n: 25, card: { epic: 0.85, unique: 0.15 }, title: "starkeeper" }
  ],
  /* 온라인 등급: 점수 = 이기면 +win(상대가 더 높은 등급이면 +up), 지면 −lose. 등급 바닥 아래로는 내려가지 않는다(견습 · 기사). 시즌 = 서버 시계의 달 */
  rank: { win: 20, up: 6, lose: 12, floorTiers: 2 },
  tiers: [
    { id: "novice", name: "견습", pts: 0, gold: 0 },
    { id: "knight", name: "기사", pts: 100, gold: 300 },
    { id: "warden", name: "수호자", pts: 300, gold: 800 },
    { id: "hero", name: "영웅", pts: 600, gold: 1500, title: "hero" },
    { id: "legend", name: "전설", pts: 1000, gold: 2500, title: "legend" },
    { id: "astral", name: "성좌", pts: 1500, gold: 4000, title: "astral" }
  ],
  /* 도감: 깃발마다 그 깃발 카드(강화 · 소환물 빼고)를 덱에 넣을 수 있는 최대 장수까지 몇 % 모았나 (처음 고른 깃발은 약 27%에서 시작) */
  book: [{ p: 40, gold: 200 }, { p: 60, gold: 500 }, { p: 80, gold: 1000 }, { p: 100, gold: 2000, title: "flag" }]
};

/* ---------- 퀘스트 ----------
   on(ev, q, u) → 이번 일로 늘어날 양(0이면 그대로). ev = { k: "match", mode, won, turns, kills, group, ai } · { k: "wheel" } · { k: "upgrade" } · { k: "pilFirst" }
   w = 뽑힐 무게. need(u) = 이 모험가에게 낼 수 있는 퀘스트인가 */
const QM = ev => ev.k === "match";
const QUEST_DAILY = [
  { id: "play", w: 3, goal: 3, gold: 150, text: () => "대전 3판 마치기", on: ev => QM(ev) ? 1 : 0 },
  { id: "win", w: 3, goal: 2, gold: 200, text: () => "대전에서 2번 이기기", on: ev => QM(ev) && ev.won ? 1 : 0 },
  { id: "kill", w: 3, goal: 15, gold: 150, text: () => "상대 유닛 15개 쓰러뜨리기", on: ev => QM(ev) ? ev.kills || 0 : 0 },
  { id: "flag", w: 2, goal: 1, gold: 200, flag: true, text: q => `「${GROUPS[q.flag] ? GROUPS[q.flag].name : q.flag}」 깃발로 이기기`, on: (ev, q) => QM(ev) && ev.won && ev.group === q.flag ? 1 : 0 },
  { id: "pil", w: 2, goal: 1, gold: 200, text: () => "성로 순례의 관문 하나 이기기", on: ev => QM(ev) && ev.mode === "pil" && ev.won ? 1 : 0 },
  { id: "hard", w: 2, goal: 1, gold: 250, text: () => "컴퓨터와 대전(어려움)에서 이기기", on: ev => QM(ev) && ev.mode === "ai" && ev.ai === "hard" && ev.won ? 1 : 0 },
  { id: "quick", w: 1, goal: 1, gold: 200, text: () => "14턴 안에 이기기", on: ev => QM(ev) && ev.won && ev.turns <= 14 ? 1 : 0 },
  { id: "long", w: 1, goal: 1, gold: 150, text: () => "20턴 넘게 버틴 판 마치기", on: ev => QM(ev) && ev.turns >= 20 ? 1 : 0 },
  { id: "wheel", w: 2, goal: 2, gold: 100, text: () => "크로네아의 수레바퀴 2번 돌리기", on: ev => ev.k === "wheel" ? 1 : 0 },
  { id: "online", w: 1, goal: 1, gold: 200, text: () => "온라인 대전 1판 마치기", on: ev => QM(ev) && ev.mode === "online" ? 1 : 0 }
];
const QUEST_WEEKLY = [
  { id: "w_win", w: 3, goal: 10, gold: 1000, text: () => "이번 주 10번 이기기", on: ev => QM(ev) && ev.won ? 1 : 0 },
  { id: "w_play", w: 3, goal: 20, gold: 800, text: () => "이번 주 대전 20판 마치기", on: ev => QM(ev) ? 1 : 0 },
  { id: "w_kill", w: 3, goal: 100, gold: 900, text: () => "이번 주 상대 유닛 100개 쓰러뜨리기", on: ev => QM(ev) ? ev.kills || 0 : 0 },
  { id: "w_pil", w: 2, goal: 3, gold: 1000, text: () => "성로 순례 첫 승 3일", on: ev => ev.k === "pilFirst" ? 1 : 0 },
  { id: "w_hard", w: 2, goal: 3, gold: 1000, text: () => "컴퓨터와 대전(어려움)에서 3번 이기기", on: ev => QM(ev) && ev.mode === "ai" && ev.ai === "hard" && ev.won ? 1 : 0 },
  { id: "w_flags", w: 2, goal: 2, gold: 1000, need: u => Object.keys(u.owned || {}).filter(g => u.owned[g]).length >= 2,
    text: () => "서로 다른 깃발 2개로 이기기", on: (ev, q) => { if (!QM(ev) || !ev.won || !ev.group) return 0; q.seen = q.seen || []; if (q.seen.includes(ev.group)) return 0; q.seen.push(ev.group); return 1; } },
  { id: "w_upgrade", w: 1, goal: 1, gold: 600, text: () => "강화 카드 1장 만들기", on: ev => ev.k === "upgrade" ? 1 : 0 },
  { id: "w_online", w: 1, goal: 3, gold: 900, text: () => "온라인 대전 3판 마치기", on: ev => QM(ev) && ev.mode === "online" ? 1 : 0 }
];

/* ---------- 칭호 ---------- */
const TITLES = {   // v3.47.1 웅장하게 (id는 그대로 — 모험가가 이미 가진 칭호가 이어진다)
  veteran: "백전의 정복자", unbeaten: "꺾이지 않는 왕관", thousand: "천 전장을 걸은 자", doom: "종말을 부르는 자", giantslayer: "강자를 무릎 꿇린 자",
  forest: "망각을 건넌 자", pilgrim: "성로의 영원한 순례자", forestlord: "망각의 숲의 군주", threefac: "세 근원과 맹약한 자", smith: "운명을 벼리는 자",
  duelist: "결투의 제왕", diligent: "맹세를 저버리지 않는 자", starkeeper: "별자리의 수호자", collector: "만물 보고의 주인",
  hero: "영웅의 왕좌", legend: "전설의 왕관", astral: "성좌에 오른 자"
};
/* 깃발 도감 100% 칭호: "flag:B1" → "〇〇의 유산을 잇는 자" 꼴 */
function titleName(id) {
  if (!id) return "";
  if (id.startsWith("flag:")) { const g = GROUPS[id.slice(5)]; return g ? `${g.name}의 유산을 잇는 자` : ""; }
  return TITLES[id] || "";
}

/* ---------- 업적 ----------
   tier 1 쉬움(첫 판이면 바로) → 5 아주 어려움(몇 달). 보상 조각은 등급마다 대략 100 · 300 · 800 · 2000 · 5000.
   v(u) = 지금 값. 카운터(u.ach.c)는 서버가 판마다 올린다. 도감 · 레벨 · 등급은 그때그때 센다 */
const AC = k => u => (u.ach && u.ach.c && u.ach.c[k]) || 0;
const ACHIEVEMENTS = [
  { id: "m1", cat: "전투", tier: 1, name: "첫 발걸음", text: "대전 1판 마치기", goal: 1, gold: 50, v: AC("matches") },
  { id: "m25", cat: "전투", tier: 2, name: "단련", text: "대전 25판 마치기", goal: 25, gold: 300, v: AC("matches") },
  { id: "m100", cat: "전투", tier: 3, name: "백 번의 전장", text: "대전 100판 마치기", goal: 100, gold: 800, v: AC("matches") },
  { id: "m1000", cat: "전투", tier: 5, name: "천 번의 전장", text: "대전 1,000판 마치기", goal: 1000, gold: 5000, title: "thousand", v: AC("matches") },
  { id: "w1", cat: "전투", tier: 1, name: "첫 승리", text: "대전에서 처음 이기기", goal: 1, gold: 100, v: AC("wins") },
  { id: "w10", cat: "전투", tier: 2, name: "승리의 맛", text: "10번 이기기", goal: 10, gold: 300, v: AC("wins") },
  { id: "w100", cat: "전투", tier: 4, name: "백전의 정복자", text: "100번 이기기", goal: 100, gold: 2000, title: "veteran", v: AC("wins") },
  { id: "w500", cat: "전투", tier: 5, name: "불패의 전설", text: "500번 이기기", goal: 500, gold: 5000, title: "unbeaten", v: AC("wins") },
  { id: "k10", cat: "전투", tier: 1, name: "첫 사냥", text: "상대 유닛 10개 쓰러뜨리기", goal: 10, gold: 50, v: AC("kills") },
  { id: "k200", cat: "전투", tier: 2, name: "사냥꾼", text: "상대 유닛 200개 쓰러뜨리기", goal: 200, gold: 300, v: AC("kills") },
  { id: "k1000", cat: "전투", tier: 3, name: "전장의 폭풍", text: "상대 유닛 1,000개 쓰러뜨리기", goal: 1000, gold: 800, v: AC("kills") },
  { id: "k5000", cat: "전투", tier: 5, name: "멸망의 그림자", text: "상대 유닛 5,000개 쓰러뜨리기", goal: 5000, gold: 4000, title: "doom", v: AC("kills") },
  { id: "quick", cat: "전투", tier: 2, name: "번개 같은 승리", text: "12턴 안에 이기기", goal: 1, gold: 300, v: AC("quick") },
  { id: "long", cat: "전투", tier: 2, name: "끝없는 전투", text: "30턴 넘게 이어진 판 마치기", goal: 1, gold: 300, v: AC("long") },
  { id: "h1", cat: "강적", tier: 2, name: "강적", text: "컴퓨터와 대전(어려움)에서 처음 이기기", goal: 1, gold: 200, v: AC("hard") },
  { id: "h25", cat: "강적", tier: 3, name: "강자를 무릎 꿇린 자", text: "어려움에서 25번 이기기", goal: 25, gold: 800, title: "giantslayer", v: AC("hard") },
  { id: "h100", cat: "강적", tier: 4, name: "어둠도 두렵지 않다", text: "어려움에서 100번 이기기", goal: 100, gold: 2000, v: AC("hard") },
  { id: "f2", cat: "깃발", tier: 2, name: "두 번째 깃발", text: "서로 다른 깃발 2개로 이기기", goal: 2, gold: 300, v: u => Object.keys((u.ach && u.ach.flags) || {}).length },
  { id: "fac3", cat: "깃발", tier: 3, name: "세 근원의 맹약", text: "세 진영(거인 · 용 · 신)의 깃발로 모두 이기기", goal: 3, gold: 1000, title: "threefac",
    v: u => new Set(Object.keys((u.ach && u.ach.flags) || {}).map(g => GROUPS[g] && GROUPS[g].faction).filter(Boolean)).size },
  { id: "p1", cat: "순례", tier: 1, name: "순례의 첫걸음", text: "성로 순례 첫 승 받기", goal: 1, gold: 100, v: AC("pilFirst") },
  { id: "pd1", cat: "순례", tier: 3, name: "망각의 숲 너머", text: "망각의 숲(아홉째 관문) 이기기", goal: 1, gold: 600, title: "forest", v: AC("pilDone") },
  { id: "p30", cat: "순례", tier: 4, name: "순례자의 길", text: "순례 첫 승 30일", goal: 30, gold: 1500, title: "pilgrim", v: AC("pilFirst") },
  { id: "pd20", cat: "순례", tier: 5, name: "망각의 숲의 군주", text: "망각의 숲 20번 이기기", goal: 20, gold: 4000, title: "forestlord", v: AC("pilDone") },
  { id: "u1", cat: "수집", tier: 1, name: "첫 강화", text: "강화 카드 1장 만들기", goal: 1, gold: 150, v: AC("upgrade") },
  { id: "u10", cat: "수집", tier: 3, name: "운명을 벼리는 자", text: "강화 카드 10장 만들기", goal: 10, gold: 800, title: "smith", v: AC("upgrade") },
  { id: "c40", cat: "수집", tier: 2, name: "모으는 기쁨", text: "내 깃발 카드 40% 모으기 (최대 장수 기준)", goal: 40, gold: 300, v: u => questBookPct(u) },
  { id: "c60", cat: "수집", tier: 3, name: "두터운 도감", text: "내 깃발 카드 60% 모으기", goal: 60, gold: 800, v: u => questBookPct(u) },
  { id: "c80", cat: "수집", tier: 4, name: "끝없는 보고", text: "내 깃발 카드 80% 모으기", goal: 80, gold: 2000, v: u => questBookPct(u) },
  { id: "c100", cat: "수집", tier: 5, name: "만물 보고의 주인", text: "내 깃발 카드를 모두 최대 장수까지", goal: 100, gold: 5000, title: "collector", v: u => questBookPct(u) },
  { id: "o1", cat: "온라인", tier: 2, name: "첫 결투", text: "온라인 대전에서 처음 이기기", goal: 1, gold: 300, v: AC("online") },
  { id: "o25", cat: "온라인", tier: 4, name: "결투의 제왕", text: "온라인 대전에서 25번 이기기", goal: 25, gold: 2000, title: "duelist", v: AC("online") },
  { id: "q10", cat: "퀘스트", tier: 2, name: "맡은 일", text: "퀘스트 10개 완료하기", goal: 10, gold: 300, v: AC("quests") },
  { id: "q50", cat: "퀘스트", tier: 3, name: "믿음직한 손", text: "퀘스트 50개 완료하기", goal: 50, gold: 800, v: AC("quests") },
  { id: "q200", cat: "퀘스트", tier: 4, name: "꺾이지 않는 맹세", text: "퀘스트 200개 완료하기", goal: 200, gold: 2000, title: "diligent", v: AC("quests") },
  { id: "s25", cat: "퀘스트", tier: 3, name: "별자리의 수호자", text: "한 주에 별 25개 모으기", goal: 1, gold: 800, v: AC("weekFull") },
  { id: "lv5", cat: "모험가", tier: 1, name: "이름을 알리다", text: "모험가 레벨 5", goal: 5, gold: 100, v: u => questLevel(u) },
  { id: "lv15", cat: "모험가", tier: 3, name: "이름난 모험가", text: "모험가 레벨 15", goal: 15, gold: 800, v: u => questLevel(u) },
  { id: "lv30", cat: "모험가", tier: 5, name: "살아 있는 전설", text: "모험가 레벨 30", goal: 30, gold: 5000, v: u => questLevel(u) },
  { id: "r2", cat: "온라인", tier: 3, name: "기사 서임", text: "온라인 등급 기사 오르기", goal: 1, gold: 500, v: u => questBestTier(u) },
  { id: "r4", cat: "온라인", tier: 4, name: "영웅의 왕좌", text: "온라인 등급 영웅 오르기", goal: 3, gold: 1500, v: u => questBestTier(u) }
];
const ACH = {}; for (const a of ACHIEVEMENTS) ACH[a.id] = a;
const ACH_TIER = ["", "동", "은", "금", "백금", "성좌"];   // 업적 등급 이름 (화면의 빛깔)

function questLevel(u) { return typeof LEVEL !== "undefined" && Store.xp ? LEVEL.of(Store.xp(u)) : 0; }
function questBestTier(u) { const r = u.rank; return r ? Math.max(r.bestTier || 0, questTierOf(r.pts || 0)) : 0; }
function questTierOf(pts) { let t = 0; QUEST.tiers.forEach((x, i) => { if (pts >= x.pts) t = i; }); return t; }

/* ---------- 도감 ---------- */
let BOOK_POOL = null;
function questBookPool(g) {   // 그 깃발의 모을 카드: 강화(합쳐서만) · 소환물 빼고
  if (!BOOK_POOL) { BOOK_POOL = {}; for (const c of CARD_LIST) { if (c.base || /^T[KS]-/.test(c.id) || !GROUPS[c.group]) continue; (BOOK_POOL[c.group] = BOOK_POOL[c.group] || []).push(c.id); } }
  return BOOK_POOL[g] || [];
}
/* have · all = 종류 수, got · max = 장수(최대 장수까지만 셈), pct = 장수 기준 % */
function questBookOf(u, g) {
  const pool = questBookPool(g), col = u.collection || {}; let have = 0, got = 0, max = 0;
  for (const id of pool) { const k = col[id] || 0, m = maxCopiesOf(CARDS[id]); if (k > 0) have++; got += Math.min(k, m); max += m; }
  return { have, all: pool.length, got, max, pct: max ? Math.floor(got / max * 100) : 0 };
}
function questBookPct(u) {   // 가진 깃발 전체 (장수 기준)
  let h = 0, a = 0; for (const g of GROUP_IDS) if (u.owned && u.owned[g]) { const b = questBookOf(u, g); h += b.got; a += b.max; }
  return a ? Math.floor(h / a * 100) : 0;
}

/* ---------- 고르기 ---------- */
function questPick(pool, n, u, avoid) {
  const left = pool.filter(q => (!q.need || q.need(u)) && !(avoid || []).includes(q.id)), out = [];
  while (out.length < n && left.length) {
    const tot = left.reduce((s, q) => s + q.w, 0); let r = Math.random() * tot, i = 0;
    for (; i < left.length; i++) { r -= left[i].w; if (r <= 0) break; }
    out.push(left.splice(Math.min(i, left.length - 1), 1)[0]);
  }
  return out;
}
function questMake(def, u) {
  const q = { id: def.id, n: 0, goal: def.goal, gold: def.gold, done: false, got: false };
  if (def.flag) { const mine = GROUP_IDS.filter(g => u.owned && u.owned[g]); q.flag = mine[Math.floor(Math.random() * mine.length)] || u.group; }
  return q;
}
const questDef = q => QUEST_DAILY.find(d => d.id === q.id) || QUEST_WEEKLY.find(d => d.id === q.id);
function questText(q) { const d = questDef(q); return d ? d.text(q) : q.id; }
const questOk = u => !!u && !u.guest && !u.admin;   // 필멸자 · 관리자는 퀘스트 보상이 없다

/* 오늘 · 이번 주가 바뀌었으면 새로 뽑는다 (서버 시계) */
function questFresh(u, now) {
  now = now || Date.now();
  const day = pilDayKey(now), week = pilWeekKey(now);
  const Q = u.quests = u.quests && typeof u.quests === "object" ? u.quests : {};
  let changed = false;
  if (Q.day !== day) { Q.day = day; Q.daily = questPick(QUEST_DAILY, QUEST.daily, u).map(d => questMake(d, u)); Q.reroll = 0; Q.allBonus = false; changed = true; }
  if (Q.week !== week) { Q.week = week; Q.weekly = questPick(QUEST_WEEKLY, QUEST.weekly, u).map(d => questMake(d, u)); Q.stars = 0; Q.starGot = []; changed = true; }
  const A = u.ach = u.ach && typeof u.ach === "object" ? u.ach : {};
  A.c = A.c || {}; A.flags = A.flags || {}; A.got = A.got || {};
  if (!Array.isArray(u.titles)) u.titles = [];
  const R = u.rank = u.rank && typeof u.rank === "object" ? u.rank : {};
  const season = questSeason(now);
  if (R.season !== season) {
    if (R.season && (R.w || R.l)) R.prev = { season: R.season, best: Math.max(R.bestTier || 0, questTierOf(R.pts || 0)), got: false };
    Object.assign(R, { season, pts: 0, w: 0, l: 0, bestTier: 0 }); changed = true;
  }
  u.book = u.book && typeof u.book === "object" ? u.book : {}; u.book.got = Array.isArray(u.book.got) ? u.book.got : [];
  return changed;
}
function questSeason(t) { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; }
function questGiveTitle(u, id) { if (id && !u.titles.includes(id)) { u.titles.push(id); return true; } return false; }

/* 받을 수 있는 것의 수 (상단 띠의 점) */
function questReady(u) {
  if (!questOk(u) || !u.quests) return 0;
  const Q = u.quests; let n = 0;
  for (const q of (Q.daily || []).concat(Q.weekly || [])) if (q.done && !q.got) n++;
  n += QUEST.stars.filter((s, i) => (Q.stars || 0) >= s.n && !(Q.starGot || []).includes(i)).length;
  for (const a of ACHIEVEMENTS) if (!(u.ach && u.ach.got && u.ach.got[a.id]) && a.v(u) >= a.goal) n++;
  for (const g of GROUP_IDS) { const b = questBookOf(u, g); for (const m of QUEST.book) if (b.pct >= m.p && !(u.book && u.book.got || []).includes(g + ":" + m.p)) n++; }
  if (u.rank && u.rank.prev && !u.rank.prev.got && QUEST.tiers[u.rank.prev.best] && QUEST.tiers[u.rank.prev.best].gold) n++;
  return n;
}

Object.assign(Store, {
  /* 일어난 일 하나를 퀘스트 · 업적 카운터에 센다 (서버: rewards.js _settle 등 · 로컬: screens.js onMatchEnd) */
  questEvent(u, ev) {
    if (!questOk(u) || !ev) return;
    questFresh(u);
    const Q = u.quests, A = u.ach;
    for (const q of (Q.daily || []).concat(Q.weekly || [])) {
      if (q.done) continue;
      const d = questDef(q); if (!d) continue;
      const add = d.on(ev, q, u); if (!(add > 0)) continue;
      q.n = Math.min(q.goal, q.n + add); if (q.n >= q.goal) q.done = true;
    }
    const C = A.c, inc = (k, n) => { C[k] = (C[k] || 0) + (n == null ? 1 : n); };
    if (ev.k === "match") {
      inc("matches"); inc("kills", Math.max(0, Math.min(80, ev.kills || 0)));
      if (ev.won) { inc("wins"); if (ev.group && GROUPS[ev.group]) A.flags[ev.group] = (A.flags[ev.group] || 0) + 1; }
      if (ev.won && ev.mode === "ai" && ev.ai === "hard") inc("hard");
      if (ev.won && ev.mode === "online") inc("online");
      if (ev.won && ev.turns <= 12) inc("quick");
      if (ev.turns >= 30) inc("long");
      if (ev.won && ev.mode === "pil" && ev.forest) inc("pilDone");
    }
    if (ev.k === "upgrade") inc("upgrade");
    if (ev.k === "pilFirst") inc("pilFirst");
    this.save();
  },
  /* 판 하나: rewards.js _settle(서버) · onMatchEnd(로컬)가 부른다 */
  questMatch(u, o) {
    if (!questOk(u)) return;
    this.questEvent(u, { k: "match", mode: o.mode, won: !!o.won, turns: Math.max(0, Math.floor(+o.turns || 0)), kills: Math.max(0, Math.floor(+o.kills || 0)), group: o.group, ai: o.ai, forest: !!o.forest });
  },
  /* 퀘스트 화면을 열 때: 날이 바뀌었으면 새 퀘스트 */
  questSync(u) {
    u = u || this.user(); if (!questOk(u)) return { ok: false, msg: "필멸자 · 관리자 계정은 퀘스트 보상이 없습니다." };
    if (questFresh(u)) this.save();
    return { ok: true };
  },
  /* 퀘스트 받기: kind "daily" | "weekly", i = 몇째 */
  questClaim(u, kind, i) {
    u = u || this.user(); if (!questOk(u)) return { ok: false, msg: "받을 수 없는 계정입니다." };
    questFresh(u);
    const Q = u.quests, list = kind === "weekly" ? Q.weekly : Q.daily, q = list && list[Math.floor(+i)];
    if (!q) return { ok: false, msg: "없는 퀘스트입니다." };
    if (!q.done) return { ok: false, msg: "아직 끝내지 않은 퀘스트입니다." };
    if (q.got) return { ok: false, msg: "이미 받았습니다." };
    q.got = true;
    this.addGold(u, q.gold, `퀘스트: ${questText(q)}`);
    const st = kind === "weekly" ? QUEST.starWeekly : QUEST.starDaily;
    Q.stars = (Q.stars || 0) + st;
    u.ach.c.quests = (u.ach.c.quests || 0) + 1;
    if ((Q.stars || 0) >= QUEST.stars[QUEST.stars.length - 1].n && Q.fullWeek !== Q.week) { Q.fullWeek = Q.week; u.ach.c.weekFull = (u.ach.c.weekFull || 0) + 1; }
    let spins = 0;
    if (kind !== "weekly" && !Q.allBonus && Q.daily.every(x => x.got)) { Q.allBonus = true; spins = QUEST.allDailySpins; u.spins = (u.spins || 0) + spins; }
    this.save();
    return { ok: true, gold: q.gold, stars: st, spins };
  },
  /* 오늘의 퀘스트 하나 바꾸기 (하루 한 번, 끝내지 않은 것) */
  questReroll(u, i) {
    u = u || this.user(); if (!questOk(u)) return { ok: false, msg: "바꿀 수 없는 계정입니다." };
    questFresh(u);
    const Q = u.quests, q = Q.daily && Q.daily[Math.floor(+i)];
    if (!q) return { ok: false, msg: "없는 퀘스트입니다." };
    if (q.done) return { ok: false, msg: "끝낸 퀘스트는 바꿀 수 없습니다." };
    if ((Q.reroll || 0) >= QUEST.rerollPerDay) return { ok: false, msg: "오늘은 이미 퀘스트를 바꿨습니다. 내일 다시 바꿀 수 있습니다." };
    const d = questPick(QUEST_DAILY, 1, u, Q.daily.map(x => x.id))[0]; if (!d) return { ok: false, msg: "바꿀 퀘스트가 없습니다." };
    Q.daily[Math.floor(+i)] = questMake(d, u); Q.reroll = (Q.reroll || 0) + 1;
    this.save();
    return { ok: true };
  },
  /* 별 자리 상자 열기: i = QUEST.stars의 몇째 */
  starClaim(u, i) {
    u = u || this.user(); if (!questOk(u)) return { ok: false, msg: "받을 수 없는 계정입니다." };
    questFresh(u);
    const Q = u.quests, s = QUEST.stars[Math.floor(+i)];
    if (!s) return { ok: false, msg: "없는 상자입니다." };
    Q.starGot = Q.starGot || [];
    if (Q.starGot.includes(+i)) return { ok: false, msg: "이미 열었습니다." };
    if ((Q.stars || 0) < s.n) return { ok: false, msg: `별이 ${s.n}개 있어야 엽니다.` };
    Q.starGot.push(+i);
    const out = { ok: true };
    if (s.gold) { this.addGold(u, s.gold, `별 자리 ${s.n}`); out.gold = s.gold; }
    if (s.spins) { u.spins = (u.spins || 0) + s.spins; out.spins = s.spins; }
    if (s.card) { const grade = pilRollGrade(s.card) || Object.keys(s.card).pop(), r = pilPickCard(u, grade); out.card = r.id; out.grade = grade; if (r.gold) out.gold = (out.gold || 0) + r.gold; }
    if (s.title && questGiveTitle(u, s.title)) out.title = s.title;
    this.save();
    return out;
  },
  /* 업적 받기 */
  achClaim(u, id) {
    u = u || this.user(); if (!questOk(u)) return { ok: false, msg: "받을 수 없는 계정입니다." };
    questFresh(u);
    const a = ACH[id]; if (!a) return { ok: false, msg: "없는 업적입니다." };
    if (u.ach.got[id]) return { ok: false, msg: "이미 받았습니다." };
    if (a.v(u) < a.goal) return { ok: false, msg: "아직 이루지 못했습니다." };
    u.ach.got[id] = Date.now();
    this.addGold(u, a.gold, `업적: ${a.name}`);
    const out = { ok: true, gold: a.gold };
    if (a.title && questGiveTitle(u, a.title)) out.title = a.title;
    this.save();
    return out;
  },
  /* 도감 보상: g = 깃발, p = 25 | 50 | 75 | 100 */
  bookClaim(u, g, p) {
    u = u || this.user(); if (!questOk(u)) return { ok: false, msg: "받을 수 없는 계정입니다." };
    questFresh(u);
    const m = QUEST.book.find(x => x.p === +p); if (!m || !GROUPS[g]) return { ok: false, msg: "없는 보상입니다." };
    const key = g + ":" + m.p; if (u.book.got.includes(key)) return { ok: false, msg: "이미 받았습니다." };
    if (questBookOf(u, g).pct < m.p) return { ok: false, msg: "아직 모으지 못했습니다." };
    u.book.got.push(key);
    this.addGold(u, m.gold, `도감: ${GROUPS[g].name} ${m.p}%`);
    const out = { ok: true, gold: m.gold };
    if (m.title && questGiveTitle(u, "flag:" + g)) out.title = "flag:" + g;
    this.save();
    return out;
  },
  /* 칭호 달기 (가진 것만, ""이면 떼기) */
  titleSet(u, id) {
    u = u || this.user(); if (!questOk(u)) return { ok: false, msg: "칭호를 달 수 없는 계정입니다." };
    questFresh(u);
    id = String(id || "");
    if (id && !u.titles.includes(id)) return { ok: false, msg: "가지지 않은 칭호입니다." };
    u.title = id || null; this.save();
    return { ok: true };
  },
  /* 지난 시즌 보상 받기 */
  rankClaim(u) {
    u = u || this.user(); if (!questOk(u)) return { ok: false, msg: "받을 수 없는 계정입니다." };
    questFresh(u);
    const P = u.rank.prev; if (!P || P.got) return { ok: false, msg: "받을 시즌 보상이 없습니다." };
    const T = QUEST.tiers[P.best] || QUEST.tiers[0]; P.got = true;
    const out = { ok: true, gold: T.gold, tier: T.name };
    if (T.gold) this.addGold(u, T.gold, `온라인 시즌 ${P.season}: ${T.name}`);
    if (T.title && questGiveTitle(u, T.title)) out.title = T.title;
    this.save();
    return out;
  },
  /* 온라인 판 결과로 등급 점수 (서버: rewards.js _pairEnd가 두 사람 모두 보상받을 때만) */
  rankMatch(u, foe, won) {
    if (!questOk(u)) return null;
    questFresh(u);
    const R = u.rank, F = foe && foe.rank && foe.rank.season === R.season ? foe.rank.pts || 0 : 0;
    const before = R.pts || 0, tB = questTierOf(before);
    let d = won ? QUEST.rank.win + (questTierOf(F) > tB ? QUEST.rank.up : 0) : -QUEST.rank.lose;
    let after = Math.max(0, before + d);
    if (!won && tB < QUEST.rank.floorTiers) after = Math.max(after, QUEST.tiers[tB].pts);   // 견습 · 기사는 등급 아래로 안 떨어짐
    R.pts = after; R[won ? "w" : "l"] = (R[won ? "w" : "l"] || 0) + 1;
    R.bestTier = Math.max(R.bestTier || 0, questTierOf(after));
    this.save();
    return { before, after, tier: questTierOf(after) };
  }
});

/* 강화 · 수레바퀴 · 순례 첫 승도 퀘스트에 센다 (서버에서는 OPS가 이 함수들을 부르고, 기기에서는 net.js가 서버로 보낸다) */
{
  const wrap = (fn, ev) => { const f = Store[fn]; if (typeof f !== "function") return; Store[fn] = function (u, ...a) { const r = f.call(this, u, ...a); const x = u || this.user(); if (r && r.ok) this.questEvent(x, ev); return r; }; };
  wrap("upgradeCard", { k: "upgrade" });
  wrap("fuseRare", { k: "upgrade" });   // v3.52 레어 합성도 강화로 센다
  wrap("wheelSpin", { k: "wheel" });
  wrap("pilgrimClaim", { k: "pilFirst" });
}

/* ---------- v3.48 친구 초대 체험 덱 ----------
   이미 등록한 모험가가 초대 링크(코드)를 보내고, 받은 사람이 그것으로 새 모험가를 등록하면 그 친구가 저장한 덱(깃발 하나)을
   TRIAL.days일 동안 "체험 덱"으로 쓴다 — 그 카드를 상점에서 사지 않았어도, 그 깃발을 고르지 않았어도. 카드가 생기는 것은 아니다.
   - 초대 = { from: 친구 이름, group: 깃발 }. 등록할 때 서버가 친구의 **저장한 덱**을 그대로 베낀다(기기가 보낸 카드 목록은 받지 않음).
   - 체험 덱은 컴퓨터와 대전 · 온라인 대전에 쓴다(순례 · 원정은 내 덱만). 보상은 보통 판과 같다 — 서버 검산이 "저장한 덱" 대신 체험 덱과 맞춰 본다(rewards.js).
   - u.trial · u.invitedBy는 서버만 바꾼다(PROTECTED). */
const TRIAL = { days: 7 };
/* 초대 글 읽기: "INV:이름:B1" · "…?invite=이름.B1" · "이름.B1" */
function inviteParse(s) {
  s = String(s || "").trim(); if (!s) return null;
  try { const m = /[?&]invite=([^&#\s]+)/.exec(s); if (m) s = decodeURIComponent(m[1]); } catch (e) { return null; }
  s = s.replace(/^INV:/i, "");
  const k = Math.max(s.lastIndexOf(":"), s.lastIndexOf("."));
  if (k < 1) return null;
  const from = s.slice(0, k).trim(), group = s.slice(k + 1).trim().toUpperCase();
  return from && GROUPS[group] ? { from, group } : null;
}
function inviteText(id, g) { return `INV:${id}:${g}`; }
/* 지금 쓸 수 있는 체험 덱 (끝났으면 null) */
function trialDeckOf(u, t) { const T = u && u.trial; return T && T.cards && GROUPS[T.group] && (t || Date.now()) < T.until ? T : null; }
Object.assign(Store, {
  /* 서버의 등록이 부른다 (OPS 아님 — 기기가 나중에 부를 수 없다) */
  inviteApply(u, inv) {
    if (!u || u.guest || u.admin || !inv) return { ok: false };
    const f = Object.prototype.hasOwnProperty.call(this.data.users, inv.from) ? this.data.users[inv.from] : null;
    if (!f || f.guest || f.admin || f.id === u.id) return { ok: false, msg: "초대한 모험가를 찾지 못했습니다." };
    if (!this.deckPlayable(f, inv.group)) return { ok: false, msg: "초대한 모험가의 그 깃발 덱이 저장되어 있지 않습니다." };
    const d = this.deck(f, inv.group);
    u.trial = { from: f.id, group: inv.group, name: String(d.name || GROUPS[inv.group].name).slice(0, 40), cards: cleanCards(d.cards), until: Date.now() + TRIAL.days * 86400e3 };
    u.invitedBy = f.id;
    this.save();
    return { ok: true, from: f.id, group: inv.group, days: TRIAL.days };
  }
});
