/* ETHERION — 칠룡의 고리 원정 (v1.0)
   내 단체의 도시에서 출발해 성로를 따라 여섯 번 싸운다: 이웃 단체 → 이웃 단체 → 용 → 단체 → 용 → 동쪽의 빈 자리.
   - 한 판 이길 때마다 카드 3장 중 1장을 골라 원정 덱에 더한다 (모험가는 그 카드를 영구히 보유한다).
   - 지면 원정이 끝난다. 얻은 카드는 그대로 남는다.
   - 용은 카드가 아니라 "그 판의 규칙"으로 등장한다 (세계관: 용 = 세계의 힘). 양쪽 모두에게 적용된다.
   저장: Store user.expedition. 규칙 적용 지점은 game.js(costOf·canPlay·beginTurn·refill)와 engine.js(setCombatRules). */
"use strict";

const DRAGONS = {
  gorbas:   { id: "gorbas",   name: "고르바스",   title: "대지의 용",  el: "earth",     group: "G1", place: "왕좌봉",              rule: { defAll: 1 },     ruleName: "대지의 비늘",   ruleText: "양쪽 유닛 전체 방어 +1." },
  ignal:    { id: "ignal",    name: "이그날",     title: "화염의 용",  el: "fire",      group: "B1", place: "화관 산맥",           rule: { noHeal: true },  ruleName: "꺼지지 않는 불", ruleText: "받은 피해가 턴이 끝나도 낫지 않는다." },
  marensia: { id: "marensia", name: "마렌시아",   title: "물의 용",    el: "water",     group: "G3", place: "탈라쿠스 해구",       rule: { lifeTide: 1 },   ruleName: "조수",           ruleText: "매 턴 시작에 양쪽 생명 +1." },
  syrel:    { id: "syrel",    name: "시렐",       title: "바람의 용",  el: "wind",      group: "A3", place: "아우라곤의 파편 군도", rule: { handSize: 7 },   ruleName: "흩날리는 바람",  ruleText: "핸드를 7장까지 보충한다 (생명이 그만큼 빨리 준다)." },
  astrak:   { id: "astrak",   name: "아스트라크", title: "번개의 용",  el: "lightning", group: "B3", place: "뇌명 고원",           rule: { coinMul: 2 },    ruleName: "벼락",           ruleText: "코인 앞면의 값이 두 배." },
  verdan:   { id: "verdan",   name: "베르단",     title: "숲의 용",    el: "forest",    group: "G2", place: "태고림 산맥",         rule: { hpAll: 2 },      ruleName: "깊은 뿌리",     ruleText: "양쪽 유닛 전체 체력 +2." },
  feros:    { id: "feros",    name: "페로스",     title: "금속의 용",  el: "metal",     group: "B2", place: "철골 산맥",           rule: { freeItem: true }, ruleName: "무쇠의 선물",   ruleText: "아이템 비용이 0." }
};
const VOID_SEAT = { id: "void", name: "오블리온", title: "삼키는 자 · 여덟 번째 자리", el: "dark", place: "빈 땅", rule: { noSpell: true }, ruleName: "지워진 에테르", ruleText: "마법 카드를 낼 수 없다 (양쪽 모두)." };
const EXP_LEN = 6;
const EXP_BONUS_GOLD = 500;

/* 성로 순서(지도 서쪽→동쪽 느낌): 같은 진영 이웃 → 다른 진영 */
function expRoute(myGroup) {
  const F = GROUPS[myGroup].faction;
  const mates = shuffle(FACTIONS[F].groups.filter(g => g !== myGroup));
  const others = shuffle(GROUP_IDS.filter(g => GROUPS[g].faction !== F));
  const gs = mates.concat(others);                       // 이웃 먼저
  const ds = shuffle(Object.keys(DRAGONS));
  return [
    { kind: "group", g: gs[0] }, { kind: "group", g: gs[1] }, { kind: "dragon", d: ds[0] },
    { kind: "group", g: gs[2] }, { kind: "dragon", d: ds[1] }, { kind: "void" }
  ];
}
function expNodeInfo(n) {
  if (n.kind === "group") { const G_ = GROUPS[n.g]; return { name: G_.name, sub: G_.ai, place: G_.en, color: G_.color, el: G_.el, glyph: G_.glyph, rule: null }; }
  if (n.kind === "dragon") { const D = DRAGONS[n.d]; return { name: D.name, sub: D.title, place: D.place, color: ELEMENTS[D.el].color, el: D.el, dragon: D, rule: D }; }
  return { name: VOID_SEAT.name, sub: VOID_SEAT.title, place: VOID_SEAT.place, color: "#7c7889", el: "dark", rule: VOID_SEAT };
}

const Exp = {
  get() { const u = Store.user(); return u ? u.expedition || null : null; },
  start(g) {
    const u = Store.user();
    const d = Store.deck(u, g);
    u.expedition = { group: g, stage: 0, route: expRoute(g), deck: Object.assign({}, d.cards), got: [], pending: null, over: false, won: false, startedAt: Date.now(), log: [] };
    Store.save();
    return u.expedition;
  },
  abandon() { const u = Store.user(); if (u) { delete u.expedition; Store.save(); } },
  node(e) { return e.route[e.stage]; },
  /* 대전 설정 */
  matchCfg(e) {
    const u = Store.user(), n = this.node(e), info = expNodeInfo(n);
    const oppGroup = n.kind === "group" ? n.g : n.kind === "dragon" ? DRAGONS[n.d].group : pick(GROUP_IDS.filter(g => g !== e.group));
    const rule = info.rule ? Object.assign({}, info.rule.rule, { name: info.rule.ruleName, text: info.rule.ruleText, who: info.rule.name }) : {};
    const name = n.kind === "group" ? GROUPS[n.g].ai : n.kind === "dragon" ? `${info.name} · ${info.sub}` : "오블리온의 그림자";
    return { mode: "ai", exp: true, rules: rule, p0: { name: u.id, group: e.group, cards: e.deck }, p1: { name, group: oppGroup, cards: STARTER_DECKS[oppGroup], isAI: true } };
  },
  /* 경기 끝 (screens.js onMatchEnd가 부른다) */
  onEnd(g) {
    const e = this.get(); if (!e || e.over) return;
    const n = this.node(e), won = g.winner === 0;
    if (!won) { e.over = true; e.won = false; e.log.push({ stage: e.stage, won: false }); Store.save(); return; }
    e.log.push({ stage: e.stage, won: true });
    // 보상 후보 3장: 단체 전투는 그 단체의 카드, 용·빈 자리는 내 단체의 카드 (지금 원정 덱에 4장 미만인 카드)
    const src = n.kind === "group" ? n.g : e.group;
    const pool = cardsOfGroup(src).filter(c => (e.deck[c.id] || 0) < maxCopiesOf(c) && !c.comeback);
    const w = c => Math.max(1, 9 - c.lv);
    const picks = [];
    const bag = pool.slice();
    while (picks.length < 3 && bag.length) {
      let r = Math.random() * bag.reduce((s, c) => s + w(c), 0), i = 0;
      for (; i < bag.length; i++) { r -= w(bag[i]); if (r <= 0) break; }
      picks.push(bag.splice(Math.min(i, bag.length - 1), 1)[0].id);
    }
    e.pending = picks;
    e.stage++;
    if (e.stage >= EXP_LEN) { e.over = true; e.won = true; }
    Store.save();
  },
  choose(id) {
    const e = this.get(), u = Store.user(); if (!e || !e.pending || !e.pending.includes(id)) return;
    e.deck[id] = (e.deck[id] || 0) + 1; e.got.push(id); e.pending = null;
    if (!Store.allCards(u)) Store.grantCard(u, id);
    if (e.over && e.won && !e.rewarded) { e.rewarded = true; Store.addGold(u, EXP_BONUS_GOLD, "원정 완주"); }
    Store.save();
  }
};

/* ---------- 화면 ---------- */
function showExpedition(f) {
  Store.ensureOpen();
  const u = Store.user(); if (!u) return showLogin();
  App.screen = "expedition"; Bg.set("calm");
  let e = Exp.get();
  if (e) f = e.group; else f = f || App.lobbyGroup;
  const G_ = GROUPS[f], FA = FACTIONS[G_.faction];
  const stageHTML = (n, i) => {
    const info = expNodeInfo(n);
    const st = !e ? "" : i < e.stage ? " done" : i === e.stage && !e.over ? " cur" : i === e.stage && e.over && !e.won ? " lost" : "";
    const ico = n.kind === "group" ? groupEmblem(n.g) : n.kind === "dragon" ? `<span class="emblem drg" style="--gc:${info.color}">${dragonSVG()}</span>` : `<span class="emblem void">?</span>`;
    return `<li class="xp-node${st}" style="--gc:${info.color}">${ico}<b>${esc(info.name)}</b><small>${esc(n.kind === "group" ? "단체" : n.kind === "dragon" ? info.sub : "빈 자리")}</small>${i < EXP_LEN - 1 ? '<i class="xp-road"></i>' : ""}</li>`;
  };
  const route = e ? e.route : null;
  let body = "";
  if (!e) {
    const playable = Store.deckPlayable(u, f);
    body = `<div class="xp-card xp-start">
      <h3>출발 준비</h3>
      <p>${esc(G_.name)}의 저장된 덱(40장)으로 출발합니다. 원정 중에 얻는 카드는 <b>원정 덱</b>에 더해지고, 모험가의 보유 목록에도 영구히 남습니다.</p>
      <p class="muted">${playable ? "출발할 수 있습니다." : "덱 조정실에서 40장을 저장해야 출발할 수 있습니다."}</p>
      <div class="xp-btns"><button class="btn" data-x="lobby">대기실로</button><button class="btn primary" data-x="start" ${playable ? "" : "disabled"}>원정 출발</button></div></div>`;
  } else if (e.pending) {
    body = `<div class="xp-card xp-reward">
      <h3>${e.won ? "원정 완주!" : `${e.stage}번째 관문 통과`}</h3>
      <p>카드 3장 중 <b>1장</b>을 골라 원정 덱에 더하세요. ${Store.allCards(u) ? "" : "고른 카드는 보유 목록에도 남습니다."}${e.won ? ` 완주 보상으로 <b>${fmtGold(EXP_BONUS_GOLD)}</b>도 받습니다.` : ""}</p>
      <div class="xp-picks">${e.pending.map(id => `<button type="button" class="xp-pick" data-pick="${id}">${cardHTML(CARDS[id], { size: "md" })}<span class="xp-pick-btn">이 카드</span></button>`).join("")}</div></div>`;
  } else if (e.over) {
    body = `<div class="xp-card xp-over ${e.won ? "won" : "lost"}">
      <h3>${e.won ? "칠룡의 고리를 한 바퀴 돌았습니다" : "원정이 끝났습니다"}</h3>
      <p>${e.won ? "동쪽의 빈 자리까지 닿았습니다. 얻은 카드 " + e.got.length + "장은 그대로 남습니다." : `${e.stage + 1}번째 관문에서 멈췄습니다. 그래도 얻은 카드 ${e.got.length}장은 그대로 남습니다.`}</p>
      ${e.got.length ? `<div class="xp-got">${e.got.map(id => cardHTML(CARDS[id], { size: "sm" })).join("")}</div>` : ""}
      <div class="xp-btns"><button class="btn" data-x="lobby">대기실로</button><button class="btn primary" data-x="new">새 원정</button></div></div>`;
  } else {
    const n = Exp.node(e), info = expNodeInfo(n);
    const nd = countMap(e.deck);
    body = `<div class="xp-card xp-next" style="--gc:${info.color}">
      <p class="eyebrow">${e.stage + 1} / ${EXP_LEN} · ${esc(info.place)}</p>
      <h3>${esc(info.name)} <small>${esc(info.sub)}</small></h3>
      ${info.rule ? `<div class="xp-rule"><b>판 규칙 · ${esc(info.rule.ruleName)}</b><span>${esc(info.rule.ruleText)}</span><small>용은 카드가 아니라 그 땅의 법칙으로 나타납니다. 규칙은 양쪽 모두에게 적용됩니다.</small></div>` : `<p class="muted">${esc(GROUPS[n.g].blurb)}</p>`}
      <p class="xp-deck">원정 덱 <b>${nd}</b>장${e.got.length ? ` · 얻은 카드 ${e.got.length}장` : ""} <button class="btn xs ghost" data-x="deck">덱 보기</button></p>
      <div class="xp-btns"><button class="btn ghost" data-x="abandon">원정 포기</button><button class="btn" data-x="lobby">대기실로</button><button class="btn primary" data-x="fight">전투</button></div></div>`;
  }
  $("#app").innerHTML = `<section class="screen screen-exp">
    ${headerHTML("칠룡의 고리 원정")}
    <div class="xp">
      <div class="xp-head fac-${G_.faction}" style="--gc:${G_.color}">
        ${groupEmblem(f, "big")}
        <div><p class="eyebrow">EXPEDITION · ${esc(FA.name)}</p><h2>${esc(G_.name)}의 원정</h2>
        <p class="xp-lead">내 단체의 도시에서 출발해 성로를 따라 <b>여섯 번</b> 싸웁니다. 이웃 단체 둘 → 용 → 단체 → 용 → 동쪽의 <b>빈 자리</b>. 한 판 이길 때마다 카드 3장 중 1장을 골라 덱에 더하고, 지면 거기서 끝납니다 (얻은 카드는 남습니다).</p></div>
        <button class="btn sm" data-x="map">지도에서 보기</button>
      </div>
      <ol class="xp-route">${(route || expRoute(f)).map(stageHTML).join("")}</ol>
      ${!e ? '<p class="muted small xp-note">경로는 출발할 때 정해집니다 (위는 예시).</p>' : ""}
      ${body}
    </div>
  </section>`;
  const root = $(".screen-exp");
  bindHeader(root);
  root.addEventListener("click", async ev => {
    const b = ev.target.closest("[data-x],[data-pick]"); if (!b) return;
    if (b.dataset.pick) { Exp.choose(b.dataset.pick); toast(`「${CARDS[b.dataset.pick].name}」을(를) 원정 덱에 더했습니다.`, "good"); showExpedition(); return; }
    const x = b.dataset.x;
    if (x === "lobby") showLobby();
    else if (x === "map") { if (typeof Kailan !== "undefined") Kailan.open(); }
    else if (x === "start") { if (!Store.deckPlayable(u, f)) { toast("저장된 40장 덱이 있어야 합니다.", "warn"); return; } Exp.start(f); showExpedition(); }
    else if (x === "new") { Exp.abandon(); showExpedition(f); }
    else if (x === "abandon") { const ok = await modal(`<h3>원정을 포기할까요?</h3><p>지금까지 얻은 카드는 남고, 경로는 사라집니다.</p>`, [{ label: "계속", value: false }, { label: "포기", value: true, cls: "danger" }]); if (ok) { Exp.abandon(); showExpedition(f); } }
    else if (x === "deck") { const e2 = Exp.get(); const ids = expandDeck(e2.deck); modal(`<h3>원정 덱 ${ids.length}장</h3><div class="xp-decklist">${ids.map(id => cardHTML(CARDS[id], { size: "sm" })).join("")}</div>`, [{ label: "닫기", value: 1, cls: "primary" }], { cls: "wide" }); }
    else if (x === "fight") { const e2 = Exp.get(); const cfg = Exp.matchCfg(e2); App.screen = "game"; Bg.set("off"); cfg.onExit = () => { App.screen = null; showExpedition(); }; startMatch(cfg); }
  });
}
function dragonSVG() {
  return `<svg viewBox="0 0 64 64" aria-hidden="true" fill="currentColor"><path d="M8 40c6-14 16-22 30-24l-4 8 12-2-6 7 10 2-8 5 6 6-10-1 2 9-8-5-2 9-5-8-7 6 1-9-9 2z"/><circle cx="36" cy="28" r="2.4" fill="#000" opacity=".6"/></svg>`;
}
