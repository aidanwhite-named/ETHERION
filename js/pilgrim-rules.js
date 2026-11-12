/* ETHERION — 성로 순례의 규칙 · 수치 (v3.26)
   화면 없는 부분만 여기 둔다. 게임(js/pilgrim.js)과 서버(server/rules.js의 EXTRA)가 **같은 파일**을 읽는다.
   - PILGRIM: 순례의 모든 수치. 바꿀 때는 여기만 고친다.
   - 날짜(pilDayKey · pilWeekKey) · 확률표(pilRollGrade) · 카드 한 장 고르기(pilPickCard).
   - Store.pilgrimClaim: 그날 첫 승 보상(받기 / 뽑기)을 실제로 주는 **유일한 곳**.
     서버로 열면 서버가 이 함수를 부르고, 날짜는 서버 시계로 검사한다(server.js OPS의 today) — 기기 시계를 돌려도 하루 한 번.
     파일로 연 게임(PC 앱 · 안드로이드 · ETHERION 실행.bat)은 서버가 없어 이 기기의 시계로만 센다. */
"use strict";

const PILGRIM = {
  gates: 9,            // 여덟 관문 + 망각의 숲
  fights: 12,          // 하루에 싸울 수 있는 판 수 (지는 판도 센다). 아홉 관문 + 다시 도전 3번
  first: 500,          // 그날 첫 승의 조각 — 뽑기에 거는 것도 이 조각
  done: 300,           // 아홉째(망각의 숲)를 이긴 완주 보너스
  battleRate: 0.01,    // 순례 판의 전투 정산 배수 (v3.28 1% = 온라인 대전과 같음. 컴퓨터와 대전 0.5% — js/economy.js ECON.rate)
  ai: "hard",
  scale: [1, 1, 1, 1, 1, 1, 1, 1],   // 관문마다 상대 덱 점수 = 내 덱 비율 × 이 값 (v3.35: 모두 100%, 예전 0.90 → 1.00)
  forestScale: 1.05,   // v3.35 망각의 숲: 내 깃발 덱을 내 덱 점수의 105%로 꾸민다 (예전에는 내 덱 그대로)
  /* v3.26 첫 승 조각을 걸었을 때: 꽝 없이 늘 카드 한 장. 스페셜은 나오지 않는다. 합이 1 (모자라면 일반) */
  gamble: { common: 0.80, uncommon: 0.145, rare: 0.04, epic: 0.012, unique: 0.003 },
  resetDow: 3,         // 주가 바뀌는 요일 (0 = 일요일 … 3 = 수요일)
  steps: {             // 한 주의 걸음(첫 승을 한 날 수)마다 이정표
    3: { gold: 300 },
    5: { card: { uncommon: 1 } },
    7: { card: { unique: 0.03, epic: 0.17, rare: 0.80 } }
  },
  claimKeep: 10        // 서버가 기억하는 "첫 승 보상을 받은 날" 수
};

/* ---------- 날짜 (이 시계의 지역 시간) ---------- */
const pilPad = n => String(n).padStart(2, "0");
function pilDayKey(t) { const d = new Date(t); return `${d.getFullYear()}-${pilPad(d.getMonth() + 1)}-${pilPad(d.getDate())}`; }
/* 그 주가 시작한 날(가장 가까운 지난 수요일)의 날짜 */
function pilWeekKey(t) { const d = new Date(t); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (d.getDay() - PILGRIM.resetDow + 7) % 7); return pilDayKey(d.getTime()); }
/* 서버가 받아 주는 날: 오늘과 어제(기기와 서버의 자정이 조금 어긋나도, 어제 고르지 않고 넘긴 보상도 받게) */
function pilOkDays(t) { return [pilDayKey(t), pilDayKey(t - 86400e3)]; }

/* 확률표 { 등급: 확률 }에서 하나. 아무것도 아니면 null */
function pilRollGrade(table, r) {
  r = r == null ? Math.random() : r;
  for (const g in table) { r -= table[g]; if (r < 0) return g; }
  return null;
}
/* 그 등급의 카드 한 장을 준다: 가진 깃발의 카드 중 덜 가진 것 먼저. 다 가졌으면 상점 값만큼 조각 */
function pilPickCard(u, grade) {
  const all = Store.allCards(u);
  const room = c => all || (u.collection[c.id] || 0) < maxCopiesOf(c);
  const pool0 = CARD_LIST.filter(c => gradeOf(c) === grade);
  const pool = [pool0.filter(c => (all || u.owned[c.group]) && room(c)), pool0.filter(room), pool0].find(x => x.length) || [];
  if (!pool.length) return { id: null, gold: 0 };
  const c = pool[Math.floor(Math.random() * pool.length)];
  let gold = 0;
  if (!all && !Store.grantCard(u, c.id)) { gold = shopPrice(c); Store.addGold(u, gold, "순례: 이미 다 가진 카드"); }
  return { id: c.id, gold };
}

Object.assign(Store, {
  /* 그날 첫 승 보상. choice = "keep"(조각) | "gamble"(조각을 걸고 카드 한 장). day = 첫 승을 한 날(기기가 센 날)
     okDays: 서버만 넣는다(서버 시계의 오늘 · 어제). 그 밖의 날이면 거절 — 기기 시계를 앞으로 돌린 것.
     u.pilClaim.days에 받은 날을 남기고, 같은 날은 두 번 받지 못한다. u.pilClaim은 서버만 바꾸는 칸(server.js PROTECTED). */
  pilgrimClaim(u, choice, day, okDays) {
    u = u || this.user(); if (!u) return { ok: false, msg: "모험가가 없습니다." };
    day = String(day || "");
    if (!/^\d{4}-\d\d-\d\d$/.test(day)) return { ok: false, msg: "날짜가 올바르지 않습니다." };
    if (Array.isArray(okDays) && !okDays.includes(day)) return { ok: false, clock: true, msg: `이 기기의 날짜(${day})가 서버의 날짜(${okDays[0]})와 다릅니다. 기기 시계를 맞춰 주세요.` };
    /* v3.40 서버(okDays가 있을 때): 로그인한 모험가는 서버가 다시 두어 확인한 그날의 순례 승리(u.pilSrv.days, js/rewards.js)가 있어야 한다. 손님은 예전처럼 */
    if (Array.isArray(okDays) && !u.guest && !u.admin && !(u.pilSrv && Array.isArray(u.pilSrv.days) && u.pilSrv.days.includes(day))) return { ok: false, wait: true, msg: "서버가 아직 오늘의 순례 승리를 확인하지 못했습니다. 잠시 뒤 다시 눌러 주세요." };
    const c = u.pilClaim = u.pilClaim || { days: [] };
    if (!Array.isArray(c.days)) c.days = [];
    if (c.days.includes(day)) return { ok: false, dup: true, msg: `${day}의 첫 승 보상은 이미 받았습니다.` };
    c.days.push(day); c.days.sort(); if (c.days.length > PILGRIM.claimKeep) c.days = c.days.slice(-PILGRIM.claimKeep);
    c.last = { day, k: choice === "gamble" ? "gamble" : "keep", at: Date.now() };
    if (choice !== "gamble") { this.addGold(u, PILGRIM.first, "순례 첫 승"); return { ok: true, k: "gold", gold: PILGRIM.first, day }; }
    const grade = pilRollGrade(PILGRIM.gamble) || "common";
    const r = pilPickCard(u, grade);
    c.last.card = r.id; c.last.grade = grade;
    return { ok: true, k: "card", id: r.id, grade, gold: r.gold, stake: PILGRIM.first, day };
  }
});
