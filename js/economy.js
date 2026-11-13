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
  /* v3.26 판마다 전투 조각(부서진 카드 2% · 승패 정산)에 곱하는 배수. 대전 설정의 econRate가 있으면 그것(성로 순례 = PILGRIM.battleRate 0.5%)
     경험치는 배수와 상관없이 예전 값 그대로 쌓인다(econGain) — 조각만 줄이고 레벨 오르는 빠르기는 그대로 */
  rate: { ai: 0.005, online: 0.01, hotseat: 0.005 },   // v3.27: 컴퓨터 · 한 화면 0.5%, 온라인 1% (v3.26은 0.1 · 0.5%)
  /* v3.27 판이 끝날 때 한 번 굴리는 행운 (이기든 지든, 모든 대전): 카드 뽑기(순례 첫 승 뽑기와 같은 확률표 PILGRIM.gamble, 공짜) · 조각 */
  lucky: { card: 0.001, gold: { p: 0.007, gold: 500 } },
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
/* v3.54 등급별 상점 값(사고팔기 모두). 여기 없는 등급(스페셜 · 강화)은 상점에서 사고팔지 않는다(shopTradable) — 스페셜은 보상 · 레거시 환불의 값으로만 SHOP_VALUE를 쓴다 */
const SHOP_GRADE_PRICE = { common: 100, uncommon: 200, rare: 500, epic: 700, unique: 800 };
const SHOP_VALUE = { special: 800 };
const shopTradable = c => { c = typeof c === "string" ? CARDS[c] : c; return !!c && !c.base && SHOP_GRADE_PRICE[gradeOf(c)] != null; };
const SHOP_STOCK = { common: 100, uncommon: 80, rare: 50, upgrade: 0, epic: 30, unique: 10, special: 5 };   // v3.28 강화는 팔지 않는다(합쳐서만)
function shopPrice(c) {
  c = typeof c === "string" ? CARDS[c] : c;
  if (!c) return 0;
  if (PRICE_OVERRIDE[c.id] != null) return PRICE_OVERRIDE[c.id];
  const g = gradeOf(c);
  if (SHOP_GRADE_PRICE[g] != null) return SHOP_GRADE_PRICE[g];
  if (SHOP_VALUE[g] != null) return SHOP_VALUE[g];
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
     - opts.toDeck: 산 카드를 그 단체의 덱 초안(덱 조정실)에 바로 넣는다(RULES.deckSize장 · 같은 카드 장수 안에서). */
  buyCard(u, id, n, opts) {
    u = u || this.user(); const c = isCardId(id) && CARDS[id]; n = cleanCount(n) || 1; opts = opts && typeof opts === "object" ? opts : {};   // v3.44 글자 · NaN 장수로 공짜 구매하던 구멍
    if (!u || !c) return { ok: false, msg: "없는 카드입니다." };
    if (c.base) return { ok: false, msg: `「${c.name}」은 강화 카드라 살 수 없습니다. 「${CARDS[c.base].name}」 3장을 업그레이드하세요.` };   // v3.28
    if (!shopTradable(c) && !this.isAdmin(u)) return { ok: false, msg: `「${c.name}」은 ${GRADES[gradeOf(c)].name} 카드라 상점에서 살 수 없습니다.` };   // v3.54 스페셜
    const price = shopPrice(c), admin = this.isAdmin(u), stock = this.stockLeft(id);
    if (!admin && !this.shopOpen(id)) return { ok: false, msg: `「${c.name}」은 지금 상점에서 팔지 않습니다.` };   // v3.37 관리자 상점: 내림 · 새 카드 · 기간 밖
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
  sellable(u, id) { if (CARDS[id] && (CARDS[id].base || (!shopTradable(id) && !this.isAdmin(u)))) return 0; const have = u.collection[id] || 0; return Math.max(0, have - (Store.allCards(u) ? 0 : this.deckUse(u, id))); },
  sellCard(u, id) {
    u = u || this.user(); const c = isCardId(id) && CARDS[id];
    if (!u || !c) return { ok: false, msg: "없는 카드입니다." };
    if (c.base) return { ok: false, msg: "강화 카드는 팔 수 없습니다." };
    if (!shopTradable(c) && !this.isAdmin(u)) return { ok: false, msg: `${GRADES[gradeOf(c)].name} 카드는 상점에서 팔 수 없습니다.` };   // v3.54 스페셜
    const have = u.collection[id] || 0;
    if (!have) return { ok: false, msg: "가지고 있지 않은 카드입니다." };
    if (!this.sellable(u, id)) return { ok: false, msg: `덱에 ${this.deckUse(u, id)}장이 들어 있어 팔 수 없습니다. 덱 조정실에서 빼고 파세요.` };
    const price = shopPrice(c);
    u.collection[id] = have - 1;
    if (!u.collection[id]) { delete u.collection[id]; if (u.fresh) delete u.fresh[id]; }
    this.data.stock = this.data.stock || {}; this.data.stock[id] = Math.min(this.shopMax(id), this.stockLeft(id) + 1);
    if (this.isAdmin(u)) this.save(); else this.addGold(u, price, "판매 " + c.name);
    return { ok: true, price: this.isAdmin(u) ? 0 : price, have: u.collection[id] || 0 };
  },
  /* 보유 장수 (상점에서 산 장수). 관리자 · 필멸자는 덱에서는 모든 카드를 최대 장수만큼 쓸 수 있다 */
  shopOwned(u, id) { return Store.allCards(u) ? (u.collection[id] || 0) : this.ownedCount(u, id); },
  /* v3.0 상점 재고: 이 브라우저의 모든 계정이 같은 재고를 나눠 쓴다. 등급마다 처음 채우는 장수가 다르다(SHOP_STOCK) */
  stockLeft(id) { const s = this.data.stock && this.data.stock[id]; return s == null ? this.shopMax(id) : Number.isFinite(+s) ? Math.max(0, +s) : 0; },   // v3.37 최대 장수는 관리자가 정한 값(shopMax)
  restock(ids) { if (!this.data.stock) return; if (ids) for (const id of ids) delete this.data.stock[id]; else this.data.stock = {}; this.save(); },

  /* ---------- v3.37 관리자 상점: 카드마다 상점에 내놓을지 · 언제까지 · 몇 장까지 (Store.data.shop) ----------
     shop.known = 이 설정이 처음 생길 때 있던 카드들(그대로 판다). 그 뒤 게임에 새로 넣은 카드(known에 없음)는 관리자가 [공개]하기 전까지 상점에 없다.
     shop.c[id] = { off: 1 내림, pub: 1 새 카드 공개, from · until: 기간 판매(ms, 비우면 제한 없음), max: 재고 최대(비우면 등급 기본 SHOP_STOCK) }
     서버로 열면 서버가 정본이다(server.js OPS shopSet · shopStock, 스냅샷의 shop). 관리자 아닌 모험가는 "판매 중"인 카드만 보고 산다 */
  shopCfg() {
    const s = this.data.shop = this.data.shop || {};
    if (!s.c) s.c = {};
    if (!s.known) s.known = CARD_LIST.filter(c => !c.base).map(c => c.id);
    return s;
  },
  /* "on" 판매 중 · "off" 내림 · "new" 새 카드(아직 공개 안 함) · "soon" 기간 판매 전 · "ended" 기간 판매 끝 */
  shopState(id, now) {
    const s = this.shopCfg(), o = s.c[id] || {}; now = now || Date.now();
    if (o.off) return "off";
    if (!o.pub && s.known.indexOf(id) < 0) return "new";
    if (o.from && now < o.from) return "soon";
    if (o.until && now > o.until) return "ended";
    return "on";
  },
  shopOpen(id, now) { return this.shopState(id, now) === "on"; },
  shopMax(id) { const o = this.shopCfg().c[id]; return o && o.max != null ? o.max : stockMax(id); },
  /* 관리자: ids 카드에 설정을 덮어쓴다. patch 값이 null이면 그 칸을 지운다. { off, pub, from, until, max } */
  shopSet(ids, patch) {
    const s = this.shopCfg(); ids = [].concat(ids || []).filter(id => CARDS[id] && !CARDS[id].base);
    for (const id of ids) {
      const o = Object.assign({}, s.c[id]);
      for (const k of ["off", "pub", "from", "until", "max"]) if (patch && k in patch) { if (patch[k] == null || patch[k] === false) delete o[k]; else o[k] = k === "off" || k === "pub" ? 1 : Math.max(0, Math.round(+patch[k])); }
      if (Object.keys(o).length) s.c[id] = o; else delete s.c[id];
    }
    this.save();
    return { ok: true, n: ids.length };
  },
  /* 관리자: 재고를 n장으로 (n이 없으면 그 카드의 최대 장수로 채운다) */
  shopStock(ids, n) {
    this.data.stock = this.data.stock || {}; ids = [].concat(ids || []).filter(id => CARDS[id]);
    for (const id of ids) this.data.stock[id] = n == null ? this.shopMax(id) : Math.max(0, Math.round(+n));
    this.save();
    return { ok: true, n: ids.length };
  }
});

/* ---------- v3.28 업그레이드: 같은 카드 3장 → 강화 카드 1장 (js/upgrades.js) ----------
   재료는 저장한 덱 · 덱 초안에 들지 않은 장수(Store.tradeable, 교역소와 같은 덱 보호)에서만 쓴다. 재료 3장은 사라지고 강화 카드 1장이 들어온다.
   서버로 열면 서버가 같은 함수로 처리한다(server.js OPS · net.js NET_SYNC_OPS). 강화 카드는 덱에 1장이라 1장보다 많이 가질 수 없다 */
const UPGRADE_COST = 3;
/* v3.54 순례의 인장: 강화(일반 3장 → 강화 카드)에 UPGRADE_SEALS개를 함께 쓴다. 순례 관문 승리 · 완주로 얻는다(PILGRIM.seal, js/pilgrim-rules.js).
   u.seals는 서버만 바꾸는 칸(server.js PROTECTED · net.js NET_PROTECTED). 기기는 Store.addSeals로 늘리지 못한다(net.js가 막음 — 서버의 정산 rewards.js _settle이 준다) */
const UPGRADE_SEALS = 3;
Object.assign(Store, {
  seals(u) { u = u || this.user(); const n = u && +u.seals; return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0; },
  addSeals(u, n, why) {
    u = u || this.user(); n = Math.trunc(+n || 0); if (!u || !n) return this.seals(u);
    u.seals = Math.max(0, this.seals(u) + n);
    u.ledger = u.ledger || []; u.ledger.push({ at: Date.now(), n: 0, seals: n, why: why || "순례의 인장" });
    this.save();
    return u.seals;
  },
  upgradeFree(u, baseId) { u = u || this.user(); if (!u) return 0; const have = (u.collection || {})[baseId] || 0; return typeof this.tradeable === "function" ? this.tradeable(u, baseId) : Math.max(0, have - this.deckUse(u, baseId)); },
  /* 업그레이드할 수 있나: { ok, msg, base, up, free } (화면이 단추를 켜고 끌 때도 쓴다) */
  upgradeCheck(u, upId) {
    u = u || this.user(); const c = isCardId(upId) && CARDS[upId];
    if (!u || !c || !c.base || !CARDS[c.base]) return { ok: false, msg: "업그레이드할 수 있는 카드가 아닙니다." };
    if (c.retired || CARDS[c.base].retired) return { ok: false, msg: `「${c.name}」은 레거시 카드라 더는 만들 수 없습니다.` };   // v3.50 레거시(js/rebalance.js REBAL_LEGACY)
    const b = CARDS[c.base], free = this.upgradeFree(u, b.id), r = { base: b.id, up: c.id, free };
    if (this.allCards(u)) return Object.assign(r, { ok: false, msg: "관리자 · 필멸자는 모든 카드를 이미 쓸 수 있습니다." });
    if (!this.ownsGroup(u, c.group)) return Object.assign(r, { ok: false, msg: `${GROUPS[c.group].name} 깃발이 없습니다.` });
    if ((u.collection[c.id] || 0) >= maxCopiesOf(c)) return Object.assign(r, { ok: false, msg: `「${c.name}」은 이미 가지고 있습니다. (덱에 ${maxCopiesOf(c)}장)` });
    if (free < UPGRADE_COST) {
      const have = u.collection[b.id] || 0;
      return Object.assign(r, { ok: false, msg: `「${b.name}」 ${UPGRADE_COST}장이 필요합니다. (가진 ${have}장${have > free ? ` 가운데 덱 · 초안에 든 ${have - free}장은 쓸 수 없음` : ""})` });
    }
    if (this.seals(u) < UPGRADE_SEALS) return Object.assign(r, { ok: false, seal: true, msg: `순례의 인장 ${UPGRADE_SEALS}개가 필요합니다. (가진 ${this.seals(u)}개 — 성로 순례의 관문을 이기면 얻습니다)` });   // v3.54
    return Object.assign(r, { ok: true });
  },
  upgradeCard(u, upId) {
    u = u || this.user();
    const r = this.upgradeCheck(u, upId); if (!r.ok) return r;
    const left = (u.collection[r.base] || 0) - UPGRADE_COST;
    if (left > 0) u.collection[r.base] = left; else delete u.collection[r.base];
    u.collection[r.up] = (u.collection[r.up] || 0) + 1;
    u.fresh = u.fresh || {}; u.fresh[r.up] = Date.now();
    this.addSeals(u, -UPGRADE_SEALS, "강화: " + CARDS[r.up].name);   // v3.54 (save 포함)
    return { ok: true, base: r.base, up: r.up, used: UPGRADE_COST, seals: UPGRADE_SEALS };
  },
  /* v3.29 없앤 강화 카드(js/upgrades.js UPGRADE_RETIRED, 6레벨 결과 13장)를 가진 모험가에게 원래 카드 3장씩 돌려준다.
     저장한 덱 · 초안에 든 강화 카드는 원래 카드 1장으로 바꾼다(덱에 넣을 수 있는 장수 안에서, 넘으면 빠짐).
     돌려준 장수(강화 카드 수)를 돌려준다. 게임은 Store.load 뒤, 서버는 DB를 읽은 뒤 모든 모험가에게 한 번 부른다 */
  refundRetiredUpgrades(u) {
    if (!u || typeof UPGRADE_RETIRED === "undefined") return 0;
    let n = 0;
    const col = u.collection || {};
    for (const up in UPGRADE_RETIRED) {
      const base = UPGRADE_RETIRED[up];
      const swap = cards => {
        if (!cards || !cards[up]) return;
        const k = cards[up]; delete cards[up];
        if (CARDS[base]) cards[base] = Math.min(maxCopiesOf(base), (cards[base] || 0) + k);
      };
      for (const g in (u.decks || {})) swap(u.decks[g] && u.decks[g].cards);
      for (const g in (u.drafts || {})) swap(u.drafts[g] && u.drafts[g].cards);
      if (u.fresh) delete u.fresh[up];
      const k = col[up] || 0;
      if (!k) { delete col[up]; continue; }
      delete col[up];
      if (!u.admin && !u.guest) col[base] = (col[base] || 0) + k * UPGRADE_COST;
      n += k;
    }
    return n;
  },
  /* v3.29.1 게임에서 아주 뺀 카드(js/retired.js GONE_CARDS — v3.51부터 레거시 모두): 가진 장수만큼 상점 값을 돌려주고(판매와 같은 값 · 경험치 아님)
     저장한 덱 · 초안에서 빼며, 빈 자리는 GONE_SWAP의 같은 깃발 카드로 가진 만큼(관리자 · 필멸자는 모두 가진 셈) 채운다. 못 채우면 덱이 RULES.deckSize장 아래로 남는다.
     돌려준 카드 장수를 돌려준다 */
  refundGoneCards(u) {
    if (!u || typeof GONE_CARDS === "undefined") return 0;
    const GONE = typeof goneIds === "function" ? goneIds() : GONE_CARDS;   // v3.51 레거시 모두
    let n = 0, gold = 0;
    const col = u.collection || {};
    const kindOf = c => c.type === "unit" ? "unit" : c.type === "item" ? "item" : "spell";
    /* 빈 자리 채울 차례: 8레벨 유닛은 GONE_SWAP, 나머지는 같은 깃발 · 같은 종류(유닛 · 마법 · 아이템) · 가까운 레벨의 레거시 아닌 카드 */
    const swapOf = c => {
      if (typeof GONE_SWAP !== "undefined" && c.lv >= 8 && GONE_SWAP[c.group]) return GONE_SWAP[c.group];
      return CARD_LIST.filter(x => x.group === c.group && kindOf(x) === kindOf(c) && !x.retired && !x.base && !x.special && !x.unique)
        .sort((a, b) => Math.abs(a.lv - c.lv) - Math.abs(b.lv - c.lv) || a.lv - b.lv).map(x => x.id);
    };
    const fill = cards => {
      if (!cards) return;
      for (const id in GONE) {
        const k = cards[id] || 0; if (!(id in cards)) continue;
        delete cards[id];
        const c = CARDS[id], swap = c ? swapOf(c) : [];
        for (let i = 0; i < k; i++) for (const r of swap) {
          if (!CARDS[r] || CARDS[r].retired) continue;
          const now = cards[r] || 0, have = this.allCards(u) ? maxCopiesOf(r) : Math.min(maxCopiesOf(r), col[r] || 0);
          if (now < have) { cards[r] = now + 1; break; }
        }
      }
    };
    for (const g in (u.decks || {})) fill(u.decks[g] && u.decks[g].cards);
    for (const g in (u.drafts || {})) fill(u.drafts[g] && u.drafts[g].cards);
    for (const id in GONE) {
      if (u.fresh) delete u.fresh[id];
      const k = col[id] || 0; delete col[id];
      if (!k) continue;
      n += k;
      if (!this.allCards(u) && CARDS[id]) gold += shopPrice(CARDS[id]) * k;
    }
    if (gold > 0) this.addGold(u, gold, `판매(레거시 카드 ${n}장)`);
    return n;
  },
  /* v3.56 덱 40장 → 50장(생명도 50): 예전 모험가에게 한 번만 —
     가진 깃발마다 기본 덱이 늘어난 카드(DECK50_ADD, js/decks.js)를 보유에 더하고(같은 카드 최대 장수까지, 관리자 · 필멸자는 모두 가진 셈이라 보유는 그대로),
     40장이던 저장 덱 · 초안 · 체험 덱을 그 카드로 50장까지 채운다. 그래도 모자라면 그 깃발의 가진 카드(낮은 레벨 유닛부터)로 채운다.
     u.deck50 = 1 (서버만 바꾸는 칸). 새 모험가 · 관리자 · 필멸자는 처음부터 1. 돌려주는 값: 고친 덱 수 + 더한 카드 장수 */
  deck50(u) {
    if (!u || u.deck50 || typeof DECK50_ADD === "undefined") return 0;
    const all = this.allCards(u), col = u.collection = u.collection || {};
    let n = 0;
    if (!all) for (const g in DECK50_ADD) if (u.owned && u.owned[g]) for (const id in DECK50_ADD[g]) {
      if (!CARDS[id]) continue;
      const k = Math.max(0, Math.min(DECK50_ADD[g][id], maxCopiesOf(id) - (col[id] || 0)));
      if (k) { col[id] = (col[id] || 0) + k; n += k; }
    }
    const have = (id, own) => own ? Math.min(maxCopiesOf(id), all ? maxCopiesOf(id) : (col[id] || 0)) : maxCopiesOf(id);
    const fill = (cards, g, own) => {
      if (!cards || !GROUPS[g] || countMap(cards) !== 40) return;
      const order = Object.keys(DECK50_ADD[g] || {}).concat(Object.keys(STARTER_DECKS[g] || {}),
        CARD_LIST.filter(c => c.group === g && c.type === "unit" && !c.retired && !c.special && !c.unique && !c.base).sort((a, b) => a.lv - b.lv).map(c => c.id));
      let m = countMap(cards);
      for (let pass = 0; pass < 4 && m < RULES.deckSize; pass++) for (const id of order) {
        if (m >= RULES.deckSize) break;
        const c = CARDS[id]; if (!c || c.retired || !deckable(c, g)) continue;
        if (typeof uniqueBlock === "function" && uniqueBlock(cards, id)) continue;
        if ((cards[id] || 0) < have(id, own)) { cards[id] = (cards[id] || 0) + 1; m++; }
      }
      n++;
    };
    for (const g in (u.decks || {})) fill(u.decks[g] && u.decks[g].cards, g, true);
    for (const g in (u.drafts || {})) fill(u.drafts[g] && u.drafts[g].cards, g, true);
    if (u.trial && u.trial.cards) fill(u.trial.cards, u.trial.group, false);   // 체험 덱은 보유와 상관없이(친구의 덱)
    u.deck50 = 1;
    return n + 1;
  },
  refundAllRetiredUpgrades() {
    let n = 0;
    for (const id in (this.data.users || {})) { const u = this.data.users[id]; n += this.refundRetiredUpgrades(u) + this.refundGoneCards(u) + this.deck50(u); }
    return n;
  }
});
/* v3.29 파일로 연 게임: 저장소를 읽을 때마다 없앤 강화 카드 · 아주 뺀 카드(v3.29.1)를 돌려준다(한 번 돌려주면 그 뒤로는 할 일 없음) */
(function () {
  const load0 = Store.load;
  Store.load = function () { load0.apply(this, arguments); if (this.refundAllRetiredUpgrades() > 0) this.save(); };
})();

/* ---------- 한 판의 경제 기록 (game.js의 G.econ) ---------- */
function newEcon() { return { broken: 0, list: [], earned: 0, pach: 0, pachTurn: 0, seed: null, settled: null }; }
/* pach: 전장의 작은 게임(파친코·결정)으로 번 돈 합계. pachTurn: 파친코를 돌린 턴. seed: 결정 키우기 {last, streak} */
/* 판마다 정산 배수: 대전 설정의 econRate → 없으면 모드(ECON.rate: 컴퓨터 0.1% · 온라인 0.5% · 한 화면 대전 0.1%). 부서진 값 합계(broken)는 그대로 센다 */
const econRate = g => {
  if (g && g.cfg && g.cfg.econRate != null) return g.cfg.econRate;
  const R = ECON.rate; if (!g || !R) return 1;
  return g.online || g.mode === "online" ? R.online : g.mode === "hotseat" ? R.hotseat : R.ai;
};
/* 조각 = 원래 값 × 배수, 경험치 = 원래 값 그대로 (모자란 만큼 경험치만 따로) */
function econGain(u, full, rate, why) {
  const got = Math.round(full * rate);
  if (got > 0) Store.addGold(u, got, why);
  const extra = Math.round(full) - Math.max(0, got);
  if (extra > 0 && typeof Store.addXp === "function" && !(typeof LEVEL !== "undefined" && LEVEL.noXp.test(why || ""))) {
    const r = Store.addXp(u, extra, why);
    if (r && r.up > 0 && typeof LevelUI !== "undefined" && LevelUI.levelUp) LevelUI.levelUp(r);
  }
  return got;
}
/* 전투에서 부서진 카드 처리: 2%(× 배수)를 바로 지갑에 */
function econBreak(g, items) {
  if (!g || !g.econ || !items || !items.length) return 0;
  const u = Store.user(); let full = 0; const rate = econRate(g);
  for (const b of items) {
    const price = cardPrice(b.id); if (!price) continue;
    g.econ.broken += price;
    g.econ.list.push(b);
    full += price * ECON.breakRate;
  }
  if (!full || !u || g.cfg.headless) return 0;
  const got = econGain(u, full, rate, "전투: 부서진 카드");
  g.econ.earned += got; g.econ.xp = (g.econ.xp || 0) + Math.round(full);
  return got;
}
/* 경기 종료 정산 */
function econSettle(g) {
  if (!g || !g.econ || g.econ.settled) return g && g.econ ? g.econ.settled : null;
  const u = Store.user(); if (!u || g.cfg.headless) return null;
  const won = g.winner === (g.online ? g.me : 0);   // v3.10 온라인: 내 자리
  const rate = econRate(g), full = g.econ.broken * (won ? ECON.winMul : ECON.loseMul);
  const bonus = full ? econGain(u, full, rate, won ? "승리 정산" : "패배 정산") : 0;
  const xp = Math.round(full) + (g.econ.xp || 0) + g.econ.pach;
  const lucky = econLucky(u);
  const lg = lucky && lucky.k === "gold" ? lucky.gold : 0;
  g.econ.settled = { won, bonus, rate, broken: g.econ.broken, earned: g.econ.earned, pach: g.econ.pach, lucky, total: bonus + g.econ.earned + g.econ.pach + lg, xp: xp + lg };
  return g.econ.settled;
}

/* v3.27 판 끝의 행운: { k: "card", id, grade, gold } | { k: "gold", gold } | null. 화면 결과에 한 줄 (econSettle이 부른다) */
function econLucky(u, r) {
  const L = ECON.lucky; if (!L || !u) return null;
  r = r == null ? Math.random() : r;
  if (r < L.card && typeof pilRollGrade === "function" && typeof PILGRIM !== "undefined") {
    const grade = pilRollGrade(PILGRIM.gamble) || "common", c = pilPickCard(u, grade);
    if (c.id) return { k: "card", id: c.id, grade, gold: c.gold };
  }
  if (r >= L.card && r < L.card + L.gold.p) { Store.addGold(u, L.gold.gold, "행운: 환석 조각"); return { k: "gold", gold: L.gold.gold }; }
  return null;
}

/* ---------- 파칭코 추첨 ---------- */
/* 결과: { kind: "card"|"faction"|"group"|"miss", gold, id(단체·진영), card(카드 ID) } */
function pachinkoRoll() {
  const r = Math.random(), P = ECON.pachinko;
  if (r < P.card.p) {
    const u = Store.user();
    let pool = CARD_LIST.filter(c => !c.base && (!u || (u.collection[c.id] || 0) < maxCopiesOf(c)));   // v3.28 강화 카드는 합쳐서만
    if (!pool.length) pool = CARD_LIST.filter(c => !c.base);
    return { kind: "card", gold: 0, card: pick(pool).id };
  }
  if (r < P.card.p + P.faction.p) return { kind: "faction", gold: P.faction.gold, id: pick(Object.keys(FACTIONS)) };
  if (r < P.card.p + P.faction.p + P.group.p) return { kind: "group", gold: P.group.gold, id: pick(GROUP_IDS) };
  return { kind: "miss", gold: 0 };
}
