/* ETHERION — 경제: 카드 가격, 환석 조각, 전투 보상, 수레바퀴 확률
   - 가격: 같은 레벨은 같은 값. 유닛 = 레벨 × 100원, 아이템은 유닛보다 약간 싸고(×0.9), 마법은 약간 비싸다(×1.1).
     특별한 카드는 PRICE_OVERRIDE[id] 로 따로 정한다.
   - 전투 보상: 전투로 카드가 부서질 때마다(유닛 결투로 파괴, 마법을 써서 파괴) 그 카드 가격의 2%를 바로 얻는다.
     소각장으로 보낸 카드와 생명을 직접 깎는 공격은 돈이 되지 않는다.
     경기가 끝나면 그 판에서 부서진 모든 카드(내 것 + 상대 것, 소각 제외) 가격 합계의 2배(승리) 또는 절반(패배)을 얻는다.
   - 파친코(전장 작은 게임 · 대기실 수레바퀴 같은 확률): 한 턴에 한 번. 단체 당첨 5% = 100원, 진영 당첨 0.1% = 800원, 카드 당첨 0.01% = 카드 1장. */
"use strict";

const ECON = {
  unitPerLv: 100,
  itemMul: 0.9,
  spellMul: 1.1,
  breakRate: 0.02,     // 카드가 부서질 때 얻는 비율
  winMul: 2,           // 승리: 부서진 가격 합계 × 2
  loseMul: 0.5,        // 패배: 부서진 가격 합계 × 0.5
  startGold: 1000,     // 새 모험가의 지갑
  pachinko: {
    group: { p: 0.05, gold: 100 },     // 단체 문양 3개
    faction: { p: 0.001, gold: 800 },  // 진영 문장 3개
    card: { p: 0.0001 }                // 세 진영 문장이 모두 다르게 — 카드 1장 (어떤 카드로 할지는 미정: 지금은 무작위)
  }
};
/* 특별한 카드의 가격을 따로 정할 때 여기 적는다. 예: { "B1-40": 1200 } */
const PRICE_OVERRIDE = {};

function cardPrice(c) {
  c = typeof c === "string" ? CARDS[c] : c;
  if (!c) return 0;
  if (PRICE_OVERRIDE[c.id] != null) return PRICE_OVERRIDE[c.id];
  const base = c.lv * ECON.unitPerLv;
  if (c.type === "unit") return base;
  if (c.type === "item") return Math.round(base * ECON.itemMul);
  return Math.round(base * ECON.spellMul); // 공격·방어·공용 마법
}
/* 돈의 이름: 환석 조각 (성로의 관문 "환석"에서 떨어진 조각. v0.9.3의 "원"을 세계관에 맞게 바꿈). 단위는 "조각" */
const fmtGold = n => Math.round(n).toLocaleString("ko-KR") + " 조각";
const isSpellType = t => t === "atk" || t === "def" || t === "any" || t === "hand";

/* ---------- 지갑 (Store 확장) ---------- */
Object.assign(Store, {
  gold(u) { u = u || this.user(); if (!u) return 0; if (u.gold == null) u.gold = ECON.startGold; return u.gold; },
  addGold(u, n, why) {
    u = u || this.user(); if (!u) return 0;
    n = Math.round(n); if (!n) return this.gold(u);
    u.gold = Math.max(0, this.gold(u) + n);
    u.ledger = u.ledger || [];
    u.ledger.push({ at: Date.now(), n, why: why || "" });
    if (u.ledger.length > 100) u.ledger.splice(0, u.ledger.length - 100);
    this.save();
    return u.gold;
  },
  /* 상점 구매: 가격만큼 빼고 1장 지급. 관리자도 지갑은 줄어든다 */
  buyCard(u, id) {
    u = u || this.user(); const c = CARDS[id];
    if (!u || !c) return { ok: false, msg: "없는 카드입니다." };
    const price = cardPrice(c);
    if (this.gold(u) < price) return { ok: false, msg: `돈이 부족합니다. (${fmtGold(price)} 필요, 지갑 ${fmtGold(this.gold(u))})` };
    const have = u.collection[id] || 0;
    if (have >= maxCopiesOf(c)) return { ok: false, msg: `이미 ${maxCopiesOf(c)}장을 가지고 있습니다.` };
    u.collection[id] = have + 1;
    this.addGold(u, -price, "구매 " + c.name);
    return { ok: true, price, have: u.collection[id] };
  },
  /* 상점 판매 (v1.4.3): 산 값 그대로(cardPrice) 돌려받는다. 덱에 넣어 둔 장수만큼은 팔 수 없다 (덱이 깨지지 않게) */
  deckUse(u, id) { const c = CARDS[id], d = c && u.decks && u.decks[c.group]; return d && d.cards ? d.cards[id] || 0 : 0; },
  sellable(u, id) { const have = u.collection[id] || 0; return Math.max(0, have - (u.admin ? 0 : this.deckUse(u, id))); },
  sellCard(u, id) {
    u = u || this.user(); const c = CARDS[id];
    if (!u || !c) return { ok: false, msg: "없는 카드입니다." };
    const have = u.collection[id] || 0;
    if (!have) return { ok: false, msg: "가지고 있지 않은 카드입니다." };
    if (!this.sellable(u, id)) return { ok: false, msg: `덱에 ${this.deckUse(u, id)}장이 들어 있어 팔 수 없습니다. 덱 조정실에서 빼고 파세요.` };
    const price = cardPrice(c);
    u.collection[id] = have - 1;
    this.addGold(u, price, "판매 " + c.name);
    return { ok: true, price, have: u.collection[id] };
  },
  /* 보유 장수 (관리자는 컬렉션에 적힌 값 — 상점에서 산 것 — 을 보여 주되, 쓸 때는 항상 최대) */
  shopOwned(u, id) { return u.admin ? Math.min(maxCopiesOf(id), u.collection[id] || 0) : this.ownedCount(u, id); }
});

/* ---------- 한 판의 경제 기록 (game.js의 G.econ) ---------- */
function newEcon() { return { broken: 0, list: [], earned: 0, pach: 0, pachTurn: 0, seed: null, settled: null }; }
/* pach: 전장의 작은 게임(파친코·결정)으로 번 돈 합계. pachTurn: 파친코를 돌린 턴. seed: 결정 키우기 {last, streak} */
/* 전투에서 부서진 카드 처리: 2%를 바로 지갑에 */
function econBreak(g, items) {
  if (!g || !g.econ || !items || !items.length) return 0;
  const u = Store.user(); let got = 0;
  for (const b of items) {
    const price = cardPrice(b.id); if (!price) continue;
    g.econ.broken += price;
    g.econ.list.push(b);
    got += Math.round(price * ECON.breakRate);
  }
  if (got && u && !g.cfg.headless) { g.econ.earned += got; Store.addGold(u, got, "전투: 부서진 카드"); }
  return got;
}
/* 경기 종료 정산 */
function econSettle(g) {
  if (!g || !g.econ || g.econ.settled) return g && g.econ ? g.econ.settled : null;
  const u = Store.user(); if (!u || g.cfg.headless) return null;
  const won = g.winner === 0;
  const bonus = Math.round(g.econ.broken * (won ? ECON.winMul : ECON.loseMul));
  if (bonus) Store.addGold(u, bonus, won ? "승리 정산" : "패배 정산");
  g.econ.settled = { won, bonus, broken: g.econ.broken, earned: g.econ.earned, pach: g.econ.pach, total: bonus + g.econ.earned + g.econ.pach };
  return g.econ.settled;
}

/* ---------- 파칭코 추첨 ---------- */
/* 결과: { kind: "card"|"faction"|"group"|"miss", gold, id(단체·진영), card(카드 ID) } */
function pachinkoRoll() {
  const r = Math.random(), P = ECON.pachinko;
  if (r < P.card.p) {
    const u = Store.user();
    let pool = CARD_LIST.filter(c => !u || (u.collection[c.id] || 0) < maxCopiesOf(c));
    if (!pool.length) pool = CARD_LIST;
    return { kind: "card", gold: 0, card: pick(pool).id };
  }
  if (r < P.card.p + P.faction.p) return { kind: "faction", gold: P.faction.gold, id: pick(Object.keys(FACTIONS)) };
  if (r < P.card.p + P.faction.p + P.group.p) return { kind: "group", gold: P.group.gold, id: pick(GROUP_IDS) };
  return { kind: "miss", gold: 0 };
}
