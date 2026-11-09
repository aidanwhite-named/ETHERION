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
/* 특별한 카드의 가격을 따로 정할 때 여기 적는다. 예: { "B1-40": 1200 } (상점 값과 전투 보상 모두에 쓴다) */
const PRICE_OVERRIDE = {};

/* v3.0 상점 값과 재고 — 나중에 바꿀 때는 여기만 고친다
   - SHOP_FLAT: 상점에서 사고파는 값. 지금은 모든 카드 100 조각. null로 두면 예전처럼 레벨 공식(cardPrice)을 쓴다.
     전투 보상(부서진 카드 2%, 정산)은 그대로 cardPrice(레벨 공식)를 쓴다.
   - SHOP_STOCK: 등급마다 상점이 처음 채워 두는 장수. 희귀한 등급일수록 적다. */
const SHOP_FLAT = 100;
const SHOP_STOCK = { common: 100, uncommon: 80, rare: 50, epic: 30, unique: 10, special: 5 };
function shopPrice(c) {
  c = typeof c === "string" ? CARDS[c] : c;
  if (!c) return 0;
  if (PRICE_OVERRIDE[c.id] != null) return PRICE_OVERRIDE[c.id];
  return SHOP_FLAT != null ? SHOP_FLAT : cardPrice(c);
}
function stockMax(c) { c = typeof c === "string" ? CARDS[c] : c; return c ? (SHOP_STOCK[gradeOf(c)] ?? SHOP_STOCK.common) : 0; }

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
  /* v3.0 상점 구매: 재고(stockLeft)에서 n장을 꺼내 보관함(collection)에 넣는다.
     - 관리자는 무엇이든 살 수 있다: 지갑을 보지 않고(줄지도 않는다), 최대 장수 제한도 없다. 재고만 줄어든다.
     - 다른 계정은 값 × n을 내고, 같은 카드는 최대 장수(maxCopiesOf)까지만 산다.
     - opts.toDeck: 산 카드를 그 단체의 덱 초안(덱 조정실)에 바로 넣는다(40장 · 같은 카드 장수 안에서). */
  buyCard(u, id, n, opts) {
    u = u || this.user(); const c = CARDS[id]; n = Math.max(1, Math.floor(n || 1)); opts = opts || {};
    if (!u || !c) return { ok: false, msg: "없는 카드입니다." };
    const price = shopPrice(c), admin = this.isAdmin(u), stock = this.stockLeft(id);
    if (stock <= 0) return { ok: false, msg: `「${c.name}」 재고가 없습니다.${admin ? " 재고 채우기를 누르세요." : ""}` };
    if (n > stock) n = stock;
    const have = u.collection[id] || 0;
    if (!admin) {
      const room = maxCopiesOf(c) - this.shopOwned(u, id);
      if (room <= 0) return { ok: false, msg: `이미 ${maxCopiesOf(c)}장을 가지고 있습니다.` };
      if (n > room) n = room;
      if (this.gold(u) < price * n) {
        n = Math.floor(this.gold(u) / price);
        if (n < 1) return { ok: false, msg: `환석 조각이 부족합니다. (${fmtGold(price)} 필요, 지갑 ${fmtGold(this.gold(u))})` };
      }
    }
    u.collection[id] = have + n;
    this.data.stock = this.data.stock || {}; this.data.stock[id] = stock - n;
    u.fresh = u.fresh || {}; u.fresh[id] = Date.now();
    if (admin) { u.ledger = u.ledger || []; u.ledger.push({ at: Date.now(), n: 0, why: `관리자 구매 ${c.name} ×${n}` }); this.save(); }
    else this.addGold(u, -price * n, `구매 ${c.name} ×${n}`);
    const put = opts.toDeck ? this.draftAdd(u, id, n) : null;
    return { ok: true, n, price: price * n, have: u.collection[id], stock: stock - n, put };
  },
  /* 상점 판매 (v1.4.3): 산 값 그대로 돌려받는다. 덱에 넣어 둔 장수만큼은 팔 수 없다 (덱이 깨지지 않게). v3.0 판 카드는 재고로 돌아간다 */
  deckUse(u, id) { const c = CARDS[id], d = c && u.decks && u.decks[c.group]; return d && d.cards ? d.cards[id] || 0 : 0; },
  sellable(u, id) { const have = u.collection[id] || 0; return Math.max(0, have - (Store.allCards(u) ? 0 : this.deckUse(u, id))); },
  sellCard(u, id) {
    u = u || this.user(); const c = CARDS[id];
    if (!u || !c) return { ok: false, msg: "없는 카드입니다." };
    const have = u.collection[id] || 0;
    if (!have) return { ok: false, msg: "가지고 있지 않은 카드입니다." };
    if (!this.sellable(u, id)) return { ok: false, msg: `덱에 ${this.deckUse(u, id)}장이 들어 있어 팔 수 없습니다. 덱 조정실에서 빼고 파세요.` };
    const price = shopPrice(c);
    u.collection[id] = have - 1;
    if (!u.collection[id]) { delete u.collection[id]; if (u.fresh) delete u.fresh[id]; }
    this.data.stock = this.data.stock || {}; this.data.stock[id] = Math.min(stockMax(c), this.stockLeft(id) + 1);
    if (this.isAdmin(u)) this.save(); else this.addGold(u, price, "판매 " + c.name);
    return { ok: true, price: this.isAdmin(u) ? 0 : price, have: u.collection[id] || 0 };
  },
  /* 보유 장수 (상점에서 산 장수). 관리자 · 손님은 덱에서는 모든 카드를 최대 장수만큼 쓸 수 있다 */
  shopOwned(u, id) { return Store.allCards(u) ? (u.collection[id] || 0) : this.ownedCount(u, id); },
  /* v3.0 상점 재고: 이 브라우저의 모든 계정이 같은 재고를 나눠 쓴다. 등급마다 처음 채우는 장수가 다르다(SHOP_STOCK) */
  stockLeft(id) { const s = this.data.stock && this.data.stock[id]; return s == null ? stockMax(id) : s; },
  restock(ids) { if (!this.data.stock) return; if (ids) for (const id of ids) delete this.data.stock[id]; else this.data.stock = {}; this.save(); }
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
  const won = g.winner === (g.online ? g.me : 0);   // v3.10 온라인: 내 자리
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
