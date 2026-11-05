/* ETHERION — 로컬 저장소: 계정, 컬렉션, 덱, 채팅
   지금은 브라우저 localStorage에 저장한다. 서버가 생기면 Store/ChatNet의 내부만 바꾸면 된다. */
"use strict";

const ADMIN_ID = "admin";
const ADMIN_PW = "etherion";   // 로컬 시제품용. 실제 서비스에서는 서버 인증으로 교체할 것.
const STORE_KEY = "etherion.v3";   // v3: 덱이 진영이 아니라 단체(9개) 단위가 되면서 저장 형식을 새로 시작
/* 시험 모드: 로그인 화면을 건너뛰고 관리자(9개 단체 덱·모든 카드 보유)로 바로 들어간다. 정식 계정 흐름으로 돌리려면 false
   v1.4.4: false — 새 모험가는 진영마다 깃발 하나(모두 셋)만 쓴다. 관리자는 admin / etherion으로 로그인한다 */
const OPEN_PLAY = false;

/* 신규 모험가의 보유 카드: 고른 단체의 기본 덱 40장 + 그 단체의 다른 카드 1장씩 */
function starterCollection(g) {
  const col = {};
  for (const k in STARTER_DECKS[g]) col[k] = STARTER_DECKS[g][k];
  for (const c of cardsOfGroup(g)) col[c.id] = Math.min(maxCopiesOf(c), Math.max(col[c.id] || 0, 1));
  return col;
}
const starterDeckName = g => (typeof DECK_LISTS !== "undefined" && DECK_LISTS[g] ? DECK_LISTS[g].name : GROUPS[g].name + " 기본 덱");
const freshDeck = g => ({ name: starterDeckName(g), cards: Object.assign({}, STARTER_DECKS[g]), savedAt: Date.now() });

const Store = {
  data: { users: {}, session: null, chat: [] },
  ok: true,
  load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) this.data = Object.assign({ users: {}, session: null, chat: [] }, JSON.parse(raw));
    } catch (e) { this.ok = false; }
  },
  save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(this.data)); } catch (e) { this.ok = false; }
  },
  user() { return this.data.session ? this.data.users[this.data.session] : null; },
  isAdmin(u) { u = u || this.user(); return !!(u && u.admin); },

  /* 계정 */
  /* 새 모험가 (v1.4.4): 세 진영에서 깃발(단체)을 하나씩, 모두 셋을 고른다. 고른 단체의 덱만 쓸 수 있다.
     groups = [아다만트의 단체, 푸른숲의 단체, 비술의 단체] (문자열 하나를 주면 예전처럼 그 단체 하나) */
  register(id, pw, groups) {
    id = (id || "").trim();
    groups = Array.isArray(groups) ? groups : [groups];
    if (id.length < 2 || id.length > 16) return "이름은 2~16자로 정해 주세요.";
    if (id.toLowerCase() === ADMIN_ID) return "이 이름은 쓸 수 없습니다.";
    if (this.data.users[id]) return "이미 있는 이름입니다. 로그인해 주세요.";
    if (!pw || pw.length < 2) return "암호는 2자 이상으로 정해 주세요.";
    if (!groups.length || groups.some(g => !GROUPS[g])) return "진영마다 깃발을 하나씩 골라 주세요.";
    const facs = Object.keys(FACTIONS);
    if (groups.length !== facs.length || facs.some(f => groups.filter(g => GROUPS[g].faction === f).length !== 1)) return "세 진영에서 깃발을 하나씩, 모두 셋을 골라 주세요.";
    const collection = {}, owned = {}, decks = {};
    for (const g of groups) { Object.assign(collection, starterCollection(g)); owned[g] = true; decks[g] = freshDeck(g); }
    this.data.users[id] = {
      id, pw, admin: false, created: Date.now(), group: groups[0],
      owned,
      collection,
      decks,
      stats: { w: 0, l: 0 }, gold: ECON.startGold
    };
    this.data.session = id;
    this.save();
    return null;
  },
  login(id, pw) {
    id = (id || "").trim();
    if (id.toLowerCase() === ADMIN_ID) {
      if (pw !== ADMIN_PW) return "관리자 암호가 맞지 않습니다.";
      if (!this.data.users[ADMIN_ID]) {
        const decks = {}, owned = {};
        for (const g of GROUP_IDS) { decks[g] = freshDeck(g); owned[g] = true; }
        this.data.users[ADMIN_ID] = { id: ADMIN_ID, pw: ADMIN_PW, admin: true, created: Date.now(), group: "B1", owned, collection: {}, decks, stats: { w: 0, l: 0 } };
      }
      this.data.session = ADMIN_ID; this.save(); return null;
    }
    const u = this.data.users[id];
    if (!u) return "등록되지 않은 이름입니다. '새 모험가'로 등록해 주세요.";
    if (u.pw !== pw) return "암호가 맞지 않습니다.";
    this.data.session = id; this.save(); return null;
  },
  logout() { this.data.session = null; this.save(); },
  /* 시험 모드: 관리자 세션이 아니면 관리자로 들어간다 */
  ensureOpen() { if (OPEN_PLAY && !this.isAdmin()) this.login(ADMIN_ID, ADMIN_PW); },

  /* 컬렉션: 관리자는 모든 카드를 최대 장수만큼 가진다 */
  ownedCount(u, cardId) { return u.admin ? maxCopiesOf(cardId) : Math.min(maxCopiesOf(cardId), u.collection[cardId] || 0); },
  ownsGroup(u, g) { return u.admin || !!u.owned[g]; },
  deck(u, g) {
    if (!u.decks[g] && this.ownsGroup(u, g)) u.decks[g] = freshDeck(g);
    return u.decks[g];
  },
  /* 기본 덱으로 되돌리기 (덱 조정실의 "기본 덱" 버튼) */
  starter(g) { return freshDeck(g); },
  /* 덱 검증: 저장 가능한 덱인지 */
  validateDeck(u, f, cards) {
    const n = countMap(cards);
    if (n < RULES.deckSize) return { ok: false, msg: `카드가 부족합니다. (${n} / ${RULES.deckSize}장)` };
    if (n > RULES.deckSize) return { ok: false, msg: `카드가 너무 많습니다. (${n} / ${RULES.deckSize}장)` };
    for (const id in cards) {
      const c = CARDS[id];
      if (!c || !deckable(c, f)) return { ok: false, msg: "다른 단체의 카드는 넣을 수 없습니다. 덱은 한 단체의 카드로만 만듭니다." };
      if (cards[id] > maxCopiesOf(c)) return { ok: false, msg: `같은 카드는 ${maxCopiesOf(c)}장까지입니다: ${c.name}` };
      if (cards[id] > this.ownedCount(u, id)) return { ok: false, msg: `보유하지 않은 카드가 있습니다: ${c.name}` };
    }
    return { ok: true };
  },
  saveDeck(u, f, cards, name) {
    const v = this.validateDeck(u, f, cards);
    if (!v.ok) return v;
    const clean = {}; for (const k in cards) if (cards[k] > 0) clean[k] = cards[k];
    u.decks[f] = { name: (name || "").trim() || GROUPS[f].name + " 덱", cards: clean, savedAt: Date.now() };
    this.save();
    return { ok: true };
  },
  deckPlayable(u, f) {
    const d = u.decks[f];
    return !!(d && this.ownsGroup(u, f) && this.validateDeck(u, f, d.cards).ok);
  },
  grantCard(u, cardId) {
    if (u.admin) return false;
    const now = u.collection[cardId] || 0;
    if (now >= maxCopiesOf(cardId)) return false;
    u.collection[cardId] = now + 1; this.save(); return true;
  },
  grantGroup(u, g) {
    if (u.owned[g]) return;
    u.owned[g] = true;
    const extra = starterCollection(g);
    for (const k in extra) u.collection[k] = Math.max(u.collection[k] || 0, extra[k]);
    u.decks[g] = freshDeck(g);
    this.save();
  },
  revokeGroup(u, g) {
    if (u.group === g) return;
    delete u.owned[g]; this.save();
  }
};

/* 채팅 전송 계층. 지금은 로컬 루프백이다.
   서버를 붙일 때: connect()에서 WebSocket을 열고, send()에서 서버로 보내고, 받은 메시지는 receive()로 넘긴다. */
const ChatNet = {
  online: false,
  endpoint: null,          // 예: "wss://chat.etherion.example/lobby"
  listeners: [],
  channel: "lobby",
  connect() { this.online = false; },
  onMessage(fn) { this.listeners.push(fn); },
  send(text) {
    const u = Store.user(); if (!u) return;
    const msg = { id: Date.now() + Math.random(), ch: this.channel, from: u.id, admin: !!u.admin, text: String(text).slice(0, 300), at: Date.now(), local: true };
    // TODO(서버): 여기서 socket.send(JSON.stringify(msg)) 하고, 서버가 되돌려준 것을 receive로 받는다.
    this.receive(msg);
  },
  receive(msg) {
    Store.data.chat.push(msg);
    if (Store.data.chat.length > 200) Store.data.chat.splice(0, Store.data.chat.length - 200);
    Store.save();
    this.listeners.forEach(fn => fn(msg));
  },
  history() { return Store.data.chat.filter(m => m.ch === this.channel); }
};
