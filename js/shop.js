/* ETHERION — 상점
   모든 카드가 있다. 왼쪽은 조직도(상점 → 3진영 → 9단체): 진영을 누르면 그 진영의 단체가 펼쳐지고,
   단체를 누르면 오른쪽에 그 단체의 카드가 가격과 함께 나온다. 카드를 누르면 원본 카드와 구매·판매 버튼.
   v1.4.3: 판매는 산 값 그대로 돌려받는다. 덱에 넣어 둔 장수만큼은 팔 수 없다.
   가격은 economy.js의 cardPrice.
   v1.6: 카드마다 등급(js/grades.js)을 구매·판매 버튼 왼쪽에 등급 색으로 보인다. */
"use strict";

const SHOP = { node: "root", type: "all", lv: 0, open: {} };

function shopNodeHTML(kind, id, extra) {
  if (kind === "root") return `<button type="button" class="org-node root${SHOP.node === "root" ? " on" : ""}" data-node="root"><span class="emblem big q">⚖</span><b>린데어 교역소</b><span class="en">Lindear Exchange · ${CARD_LIST.length}종</span></button>`;
  if (kind === "faction") {
    const F = FACTIONS[id], n = CARD_LIST.filter(c => c.faction === id).length;
    return `<button type="button" class="org-node faction fac-${id}${SHOP.node === id ? " on" : ""}${SHOP.open[id] ? " open" : ""}" data-node="${id}" style="--gc:${F.color}"><span class="emblem big" style="--gc:${F.color}">${factionCrestSVG(id)}</span><b>${F.name}</b><span class="en">${F.en}</span><span class="role">단체 3 · 카드 ${n}종</span><i class="caret">${SHOP.open[id] ? "▾" : "▸"}</i></button>`;
  }
  const G_ = GROUPS[id], n = cardsOfGroup(id).length;
  return `<button type="button" class="org-node group fac-${G_.faction}${SHOP.node === id ? " on" : ""}" data-node="${id}" style="--gc:${G_.color}">${groupEmblem(id)}<b>${G_.name}</b><span class="en">${G_.en}</span><span class="role">${G_.role} · ${ELEMENTS[G_.el].name} · ${n}종</span></button>`;
}
function shopTreeHTML() {
  return `<div class="org">
    <div class="org-row">${shopNodeHTML("root")}</div>
    <div class="org-tee top"></div>
    <div class="org-row facs">${Object.keys(FACTIONS).map(f => `<div class="org-col fac-${f}">
      ${shopNodeHTML("faction", f)}
      ${SHOP.open[f] ? `<div class="org-tee"></div><div class="org-kids">${FACTIONS[f].groups.map(g => shopNodeHTML("group", g)).join("")}</div>` : ""}
    </div>`).join("")}</div>
  </div>`;
}
function shopCards() {
  let list = SHOP.node === "root" ? CARD_LIST : FACTIONS[SHOP.node] ? CARD_LIST.filter(c => c.faction === SHOP.node) : cardsOfGroup(SHOP.node);
  if (SHOP.type === "unit") list = list.filter(c => c.type === "unit");
  if (SHOP.type === "spell") list = list.filter(c => isSpellType(c.type));
  if (SHOP.type === "item") list = list.filter(c => c.type === "item");
  if (SHOP.lv) list = list.filter(c => c.lv === SHOP.lv);
  const order = { unit: 0, atk: 1, def: 2, any: 3, item: 4 };
  return list.slice().sort((a, b) => GROUP_IDS.indexOf(a.group) - GROUP_IDS.indexOf(b.group) || order[a.type] - order[b.type] || a.lv - b.lv || a.id.localeCompare(b.id));
}
function shopCardTile(c, u) {
  const own = Store.shopOwned(u, c.id), mx = maxCopiesOf(c), full = own >= mx, price = cardPrice(c);
  return `<div class="shop-card${full ? " full" : ""}" data-card="${c.id}">
    ${cardHTML(c, { size: "md" })}
    <div class="sc-foot"><span class="sc-price">${fmtGold(price)}</span><span class="sc-own ${full ? "ok" : ""}">보유 ${own}/${mx}</span></div>
    <div class="sc-btns">
      ${gradeBadgeHTML(c, "sc-grade")}
      <button type="button" class="btn xs gold sc-buy" data-buy="${c.id}" ${full || Store.gold(u) < price ? "disabled" : ""} title="${full ? "최대 장수를 모두 가지고 있습니다" : fmtGold(price) + "에 1장 구매"}">${full ? "모두 보유" : "구매"}</button>
      <button type="button" class="btn xs sc-sell" data-sell="${c.id}" ${Store.sellable(u, c.id) ? "" : "disabled"} title="${(u.collection[c.id] || 0) ? (Store.sellable(u, c.id) ? fmtGold(price) + "에 1장 판매" : "덱에 들어 있는 카드는 팔 수 없습니다") : "가진 카드가 없습니다"}">판매</button>
    </div>
  </div>`;
}
function shopTitle() {
  if (SHOP.node === "root") return { t: "모든 카드", s: "린데어 자유시 교역소 · 세 진영 아홉 단체의 카드가 모두 모인다" };
  if (FACTIONS[SHOP.node]) { const F = FACTIONS[SHOP.node]; return { t: F.name, s: `${F.en} · ${F.motto}` }; }
  const G_ = GROUPS[SHOP.node]; return { t: G_.name, s: `${G_.en} · ${FACTIONS[G_.faction].name} · ${G_.role} · ${G_.motto}` };
}

function showShop() {
  Store.ensureOpen();
  const u = Store.user(); if (!u) return showLogin();
  App.screen = "shop"; Bg.set("calm");
  $("#app").innerHTML = `<section class="screen screen-shop">
    ${headerHTML("린데어 교역소")}
    <div class="shop">
      <aside class="shop-tree" id="shop-tree"></aside>
      <main class="shop-main" id="shop-main"></main>
    </div>
  </section>`;
  const root = $(".screen-shop");
  bindHeader(root);
  renderShop();
  root.addEventListener("click", async e => {
    const nb = e.target.closest("[data-node]");
    if (nb) {
      const id = nb.dataset.node;
      if (FACTIONS[id]) { SHOP.open[id] = SHOP.node === id ? !SHOP.open[id] : true; }
      SHOP.node = id; renderShop(); return;
    }
    const buy = e.target.closest("[data-buy]");
    if (buy) { shopBuy(buy.dataset.buy); return; }
    const sell = e.target.closest("[data-sell]");
    if (sell) { shopSell(sell.dataset.sell); return; }
    const chip = e.target.closest("[data-shop-type],[data-shop-lv]");
    if (chip) { if (chip.dataset.shopType) SHOP.type = chip.dataset.shopType; else SHOP.lv = +chip.dataset.shopLv; renderShopMain(); return; }
    const card = e.target.closest("[data-card]");
    if (card) shopCardModal(card.dataset.card);
  });
}
function renderShop() { $("#shop-tree").innerHTML = shopTreeHTML(); renderShopMain(); }
function renderShopMain() {
  const u = Store.user(), list = shopCards(), T = shopTitle();
  const sum = list.reduce((s, c) => s + cardPrice(c), 0);
  $("#shop-main").innerHTML = `
    <div class="shop-head">
      <div><p class="eyebrow">LINDEAR EXCHANGE · ${esc(T.s)}</p><h2>${esc(T.t)} <small>${list.length}종</small></h2></div>
      <div class="shop-wallet"><span class="eyebrow">환석 조각</span><b>${fmtGold(Store.gold(u))}</b></div>
    </div>
    <div class="shop-filters">
      <div class="chips">${[["all", "전체"], ["unit", "유닛"], ["spell", "마법"], ["item", "아이템"]].map(([k, l]) => `<button type="button" class="chip${SHOP.type === k ? " on" : ""}" data-shop-type="${k}">${l}</button>`).join("")}</div>
      <div class="chips">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(l => `<button type="button" class="chip${SHOP.lv === l ? " on" : ""}" data-shop-lv="${l}">${l ? "Lv " + l : "모든 레벨"}</button>`).join("")}</div>
      <p class="grade-legend small"><span class="muted">등급</span>${GRADE_IDS.map(g => `<i style="--gr:${GRADES[g].color}">${GRADES[g].name}</i>`).join("")}</p>
      <p class="muted small">가격: 유닛 = 레벨 × ${ECON.unitPerLv} 조각 · 아이템은 유닛의 ${Math.round(ECON.itemMul * 100)}% · 마법은 ${Math.round(ECON.spellMul * 100)}% · 전부 사면 ${fmtGold(sum)}</p>
    </div>
    <div class="shop-cards" id="shop-cards">${list.map(c => shopCardTile(c, u)).join("")}</div>`;
}
async function shopCardModal(id) {
  const u = Store.user(), c = CARDS[id];
  const own = Store.shopOwned(u, id), mx = maxCopiesOf(c), price = cardPrice(c);
  const canSell = Store.sellable(u, id) > 0;
  const r = await showCardModal(c, [{ label: "닫기", value: null }].concat(canSell ? [{ label: `${fmtGold(price)}에 판매`, value: "sell" }] : [], [{ label: `${fmtGold(price)}에 구매`, value: "buy", cls: "primary" }]),
    `등급 ${GRADES[gradeOf(c)].name} · 가격 ${fmtGold(price)} · 보유 ${own}/${mx} · 지갑 ${fmtGold(Store.gold(u))}${u.admin ? " · 관리자는 모든 카드를 쓸 수 있지만 지갑은 똑같이 줄어듭니다" : ""}`);
  if (r === "buy") shopBuy(id);
  if (r === "sell") shopSell(id);
}
function shopBuy(id) {
  const u = Store.user(), c = CARDS[id];
  const r = Store.buyCard(u, id);
  if (!r.ok) { toast(r.msg, "warn"); return; }
  toast(`「${c.name}」 구매 · −${fmtGold(r.price)} (보유 ${r.have}/${maxCopiesOf(c)})`, "good");
  renderShopMain();
  const tile = $(`.shop-card[data-card="${id}"]`); if (tile) { tile.classList.add("bought"); setTimeout(() => tile.classList.remove("bought"), 700); }
  const chip = $(".gold-chip"); if (chip) chip.querySelector("b").textContent = fmtGold(Store.gold(u));
}
function shopSell(id) {
  const u = Store.user(), c = CARDS[id];
  const r = Store.sellCard(u, id);
  if (!r.ok) { toast(r.msg, "warn"); return; }
  toast(`「${c.name}」 판매 · +${fmtGold(r.price)} (보유 ${r.have}/${maxCopiesOf(c)})`, "good");
  renderShopMain();
  const chip = $(".gold-chip"); if (chip) chip.querySelector("b").textContent = fmtGold(Store.gold(u));
}
