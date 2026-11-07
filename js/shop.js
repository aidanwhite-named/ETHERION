/* ETHERION — 상점
   모든 카드가 있다. 왼쪽은 조직도(상점 → 3진영 → 9단체): 진영을 누르면 그 진영의 단체가 펼쳐지고,
   단체를 누르면 오른쪽에 그 단체의 카드가 가격과 함께 나온다. 카드를 누르면 원본 카드와 구매·판매 버튼.
   v1.4.3: 판매는 산 값 그대로 돌려받는다. 덱에 넣어 둔 장수만큼은 팔 수 없다.
   가격은 economy.js의 cardPrice.
   v1.6: 카드마다 등급(js/grades.js)을 구매·판매 버튼 왼쪽에 등급 색으로 보인다.
   v3.0: 값은 shopPrice(지금은 모든 카드 100), 등급별 재고(SHOP_STOCK), 관리자는 무료·무제한, 여러 장 구매,
         산 카드는 덱 조정실의 덱 초안에 바로 들어간다(켜고 끌 수 있음). 배경은 밤의 린데어 항구(js/scenes.js). */
"use strict";

const SHOP = { node: "root", type: "all", lv: 0, grade: "", open: {}, toDeck: true };
try { const v = localStorage.getItem("etherion.pref.shopToDeck"); if (v != null) SHOP.toDeck = v === "1"; } catch (e) {}

function shopNodeHTML(kind, id, extra) {
  if (kind === "root") return `<button type="button" class="org-node rq root${SHOP.node === "root" ? " on" : ""}" data-node="root"><i class="rq-plate" aria-hidden="true"></i><span class="emblem big q">⚖</span><b>린데어 교역소</b><span class="en">Lindear Exchange · ${CARD_LIST.length}종</span></button>`;
  if (kind === "faction") {
    const F = FACTIONS[id], n = CARD_LIST.filter(c => c.faction === id).length;
    return `<button type="button" class="org-node rq faction fac-${id}${SHOP.node === id ? " on" : ""}${SHOP.open[id] ? " open" : ""}" data-node="${id}" style="--gc:${F.color}"><i class="rq-plate" aria-hidden="true"></i><span class="emblem big" style="--gc:${F.color}">${factionCrestSVG(id)}</span><b>${F.name}</b><span class="en">${F.en}</span><span class="role">단체 3 · 카드 ${n}종</span><i class="caret">${SHOP.open[id] ? "▾" : "▸"}</i></button>`;
  }
  const G_ = GROUPS[id], n = cardsOfGroup(id).length;
  return `<button type="button" class="org-node rq group fac-${G_.faction}${SHOP.node === id ? " on" : ""}" data-node="${id}" style="--gc:${G_.color}"><i class="rq-plate" aria-hidden="true"></i>${groupEmblem(id)}<b>${G_.name}</b><span class="en">${G_.en}</span><span class="role">${G_.role} · ${ELEMENTS[G_.el].name} · ${n}종</span></button>`;
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
function shopCards(noGrade) {
  let list = SHOP.node === "root" ? CARD_LIST : FACTIONS[SHOP.node] ? CARD_LIST.filter(c => c.faction === SHOP.node) : cardsOfGroup(SHOP.node);
  if (SHOP.type === "unit") list = list.filter(c => c.type === "unit");
  if (SHOP.type === "spell") list = list.filter(c => isSpellType(c.type));
  if (SHOP.type === "item") list = list.filter(c => c.type === "item");
  if (SHOP.lv) list = list.filter(c => c.lv === SHOP.lv);
  if (SHOP.grade && !noGrade) list = list.filter(c => gradeOf(c) === SHOP.grade);
  const order = { unit: 0, atk: 1, def: 2, any: 3, item: 4 };
  return list.slice().sort((a, b) => GROUP_IDS.indexOf(a.group) - GROUP_IDS.indexOf(b.group) || order[a.type] - order[b.type] || a.lv - b.lv || a.id.localeCompare(b.id));
}
/* v3.0 재고 막대 · 덱 표시가 붙은 카드 칸 */
function shopStockHTML(c) {
  const left = Store.stockLeft(c.id), mx = stockMax(c), pct = Math.round(left / mx * 100);
  return `<span class="sc-stock${left ? "" : " empty"}" style="--gr:${GRADES[gradeOf(c)].color};--p:${pct}%" title="교역소 재고 ${left} / ${mx}장 (${GRADES[gradeOf(c)].name} 등급은 ${mx}장씩 채운다)"><i></i><em>재고 <b>${left}</b>/${mx}</em></span>`;
}
function shopCardTile(c, u) {
  const admin = Store.isAdmin(u), own = Store.shopOwned(u, c.id), mx = maxCopiesOf(c), full = !admin && own >= mx, price = shopPrice(c);
  const left = Store.stockLeft(c.id), poor = !admin && Store.gold(u) < price;
  const fresh = u.fresh && u.fresh[c.id];
  const why = !left ? "재고가 없습니다" : full ? "최대 장수를 모두 가지고 있습니다" : poor ? "환석 조각이 부족합니다" : `${fmtGold(price)}에 1장 구매${SHOP.toDeck ? " · 덱 초안에 바로 넣음" : ""}`;
  return `<div class="shop-card${full ? " full" : ""}${left ? "" : " soldout"}${fresh ? " fresh" : ""}" data-card="${c.id}" style="--gr:${GRADES[gradeOf(c)].color}">
    <div class="sc-face">${cardHTML(c, { size: "md", brief: true })}${fresh ? '<span class="sc-new">NEW</span>' : ""}${left ? "" : '<span class="sc-sold">품절</span>'}</div>
    <div class="sc-foot"><span class="sc-price" title="교역소 값 (지금은 모든 카드 같은 값)"><i class="shard" aria-hidden="true"></i>${Math.round(price).toLocaleString("ko-KR")}</span><span class="sc-own ${own ? "ok" : ""}">보유 ${own}${admin ? "" : "/" + mx}</span></div>
    ${shopStockHTML(c)}
    <div class="sc-btns">
      ${gradeBadgeHTML(c, "sc-grade")}
      <button type="button" class="btn xs gold sc-buy" data-buy="${c.id}" ${!left || full || poor ? "disabled" : ""} title="${why}">${!left ? "품절" : full ? "모두 보유" : "구매"}</button>
      <button type="button" class="btn xs sc-sell" data-sell="${c.id}" ${Store.sellable(u, c.id) ? "" : "disabled"} title="${(u.collection[c.id] || 0) ? (Store.sellable(u, c.id) ? fmtGold(price) + "에 1장 판매 (재고로 돌아감)" : "덱에 들어 있는 카드는 팔 수 없습니다") : "가진 카드가 없습니다"}">판매</button>
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
  /* v3.9 교역소 배경은 멈춘 그림 한 장: 하늘은 한 번만 그리고(Bg.freeze), 배경의 세 존재(3D)는 그리지 않는다("off" = 캔버스를 숨기고 그리기를 멈춤) */
  App.screen = "shop"; Bg.set("calm"); Bg.freeze(); if (typeof Titans !== "undefined") Titans.mode("off");
  $("#app").innerHTML = `<section class="screen screen-shop">
    ${typeof Scenes !== "undefined" ? Scenes.html("shop") : ""}
    ${headerHTML("린데어 교역소")}
    <div class="shop">
      <aside class="shop-tree" id="shop-tree"></aside>
      <main class="shop-main" id="shop-main"></main>
    </div>
  </section>`;
  const root = $(".screen-shop");
  bindHeader(root);
  renderShop();
  if (typeof Scenes !== "undefined") Scenes.bind(root, "shop");
  App.refresh = () => { if (App.screen === "shop" && root.isConnected) { renderShopMain(); const chip = $(".gold-chip b"); if (chip) chip.textContent = fmtGold(Store.gold(Store.user())); } };
  root.addEventListener("change", e => {
    if (e.target.id === "shop-todeck") { SHOP.toDeck = e.target.checked; try { localStorage.setItem("etherion.pref.shopToDeck", SHOP.toDeck ? "1" : "0"); } catch (x) {} renderShopMain(); }
  });
  root.addEventListener("click", async e => {
    if (e.target.closest("#shop-restock")) {
      const ok = await modal(`<h3>재고 모두 채우기</h3><p>모든 카드의 교역소 재고를 등급별 처음 장수로 되돌립니다.</p><p class="muted small">${GRADE_IDS.map(g => `${GRADES[g].name} ${SHOP_STOCK[g]}`).join(" · ")}</p>`, [{ label: "취소", value: false }, { label: "채우기", value: true, cls: "primary" }]);
      if (ok) { Store.restock(); renderShopMain(); toast("교역소 재고를 모두 채웠습니다.", "good"); }
      return;
    }
    const goEd = e.target.closest("[data-goeditor]");
    if (goEd) { showEditor(goEd.dataset.goeditor); return; }
    const nb = e.target.closest("[data-node]");
    if (nb) {
      const id = nb.dataset.node;
      if (FACTIONS[id]) { SHOP.open[id] = SHOP.node === id ? !SHOP.open[id] : true; }
      SHOP.node = id; renderShop(); return;
    }
    const buy = e.target.closest("[data-buy]");
    if (buy) { shopBuy(buy.dataset.buy, 1, buy); return; }
    const sell = e.target.closest("[data-sell]");
    if (sell) { shopSell(sell.dataset.sell); return; }
    const chip = e.target.closest("[data-shop-type],[data-shop-lv],[data-shop-gr]");
    if (chip) {
      if (chip.dataset.shopType) SHOP.type = chip.dataset.shopType;
      else if (chip.dataset.shopGr != null) SHOP.grade = chip.dataset.shopGr;
      else SHOP.lv = +chip.dataset.shopLv;
      renderShopMain(); return;
    }
    const card = e.target.closest(".sc-face");
    if (card) shopCardModal(card.closest("[data-card]").dataset.card);
  });
}
function renderShop() { $("#shop-tree").innerHTML = shopTreeHTML(); renderShopMain(); }
function renderShopMain() {
  /* v3.11.3 등급 칸의 장수: 단체 · 종류 · 레벨을 거친 카드 안에서 센다. 고른 등급이 0장이 되면 '모든 등급'으로 */
  const gN = {}; for (const c of shopCards(true)) { const g = gradeOf(c); gN[g] = (gN[g] || 0) + 1; }
  if (SHOP.grade && !gN[SHOP.grade]) SHOP.grade = "";
  const u = Store.user(), list = shopCards(), T = shopTitle(), admin = Store.isAdmin(u);
  const deckG = GROUPS[SHOP.node] ? SHOP.node : null;
  const dk = deckG && Store.ownsGroup(u, deckG) ? (Store.draft(u, deckG) || Store.deck(u, deckG)) : null, dn = dk ? countMap(dk.cards) : 0;
  $("#shop-main").innerHTML = `
    <div class="shop-head">
      <div><p class="eyebrow">LINDEAR EXCHANGE · ${esc(T.s)}</p><h2>${esc(T.t)} <small>${list.length}종</small></h2></div>
      <div class="shop-wallet${admin ? " admin" : ""}"><span class="eyebrow">환석 조각</span><b>${admin ? "∞ <small>관리자</small>" : fmtGold(Store.gold(u))}</b>${admin ? '<span class="muted small">값을 내지 않고 무엇이든 삽니다</span>' : ""}</div>
    </div>
    <div class="shop-link">
      <label class="chip tog" title="켜 두면 산 카드가 덱 조정실의 덱 초안에 바로 들어갑니다 (40장까지). 다 찼으면 보관함에만 들어갑니다"><input type="checkbox" id="shop-todeck" ${SHOP.toDeck ? "checked" : ""}> 산 카드를 덱 초안에 바로 넣기</label>
      ${dk ? `<button type="button" class="btn xs" data-goeditor="${deckG}" title="이 단체의 덱 조정실로">${menuIcon("quill")}<span>「${esc(dk.name)}」 <b class="${dn === RULES.deckSize ? "ok" : "bad"}">${dn}</b>/${RULES.deckSize}${Store.draft(u, deckG) ? " · 초안" : ""}</span></button>` : '<span class="muted small">단체를 고르면 그 덱 조정실로 가는 길이 여기 나옵니다.</span>'}
      ${admin ? '<button type="button" class="btn xs ghost" id="shop-restock" title="모든 카드의 재고를 등급별 처음 장수로">재고 모두 채우기</button>' : ""}
    </div>
    <div class="shop-filters">
      <div class="chips"><span class="sf-label">종류</span>${[["all", "전체"], ["unit", "유닛"], ["spell", "마법"], ["item", "아이템"]].map(([k, l]) => `<button type="button" class="chip${SHOP.type === k ? " on" : ""}" data-shop-type="${k}">${l}</button>`).join("")}</div>
      <div class="chips"><span class="sf-label">레벨</span>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(l => `<button type="button" class="chip${SHOP.lv === l ? " on" : ""}" data-shop-lv="${l}">${l ? "Lv " + l : "모든 레벨"}</button>`).join("")}</div>
      <div class="chips"><span class="sf-label">등급</span><button type="button" class="chip${SHOP.grade ? "" : " on"}" data-shop-gr="">모든 등급</button>${GRADE_IDS.map(g => `<button type="button" class="chip sf-grade${SHOP.grade === g ? " on" : ""}" data-shop-gr="${g}" style="--gr:${GRADES[g].color}" ${gN[g] ? "" : "disabled"} title="${GRADES[g].name} 등급 ${gN[g] || 0}종">${GRADES[g].name} <small>${gN[g] || 0}</small></button>`).join("")}</div>
    </div>
    <div class="shop-cards" id="shop-cards">${list.map(c => shopCardTile(c, u)).join("")}</div>`;
}
async function shopCardModal(id) {
  const u = Store.user(), c = CARDS[id], admin = Store.isAdmin(u);
  const own = Store.shopOwned(u, id), mx = maxCopiesOf(c), price = shopPrice(c), left = Store.stockLeft(id);
  const room = admin ? left : Math.max(0, Math.min(left, mx - own, Math.floor(Store.gold(u) / price)));
  const canSell = Store.sellable(u, id) > 0;
  const qty = [1, 4, 10].filter(n => n <= room);
  const btns = [{ label: "닫기", value: null }];
  if (canSell) btns.push({ label: admin ? "1장 판매 (재고로)" : `1장 판매 (+${fmtGold(price)})`, value: "sell" });
  if (GROUPS[c.group] && Store.ownsGroup(u, c.group)) btns.push({ label: "덱 조정실에서 보기", value: "editor" });
  if (admin && left < stockMax(c)) btns.push({ label: "이 카드 재고 채우기", value: "restock" });
  for (const n of qty) btns.push({ label: `${n}장 구매 (${admin ? "무료" : fmtGold(price * n)})`, value: "buy" + n, cls: n === qty[qty.length - 1] ? "primary" : "" });
  if (admin && room > 10) btns.push({ label: `남은 ${room}장 모두 구매`, value: "buy" + room, cls: "primary alt" });
  const r = await showCardModal(c, btns,
    `등급 <b style="color:${GRADES[gradeOf(c)].color}">${GRADES[gradeOf(c)].name}</b> · 값 ${fmtGold(price)} · 재고 <b>${left}</b>/${stockMax(c)} · 보유 ${own}${admin ? "" : "/" + mx} · 지갑 ${admin ? "∞ (관리자)" : fmtGold(Store.gold(u))}${SHOP.toDeck ? " · 산 카드는 덱 초안에 바로 들어갑니다" : ""}`);
  if (!r) return;
  if (r.startsWith("buy")) shopBuy(id, +r.slice(3));
  if (r === "sell") shopSell(id);
  if (r === "editor") showEditor(c.group, id);
  if (r === "restock") { Store.restock([id]); renderShopMain(); toast(`「${c.name}」 재고를 ${stockMax(c)}장으로 채웠습니다.`, "good"); }
}
function shopBuy(id, n, fromBtn) {
  const u = Store.user(), c = CARDS[id];
  const r = Store.buyCard(u, id, n || 1, { toDeck: SHOP.toDeck });
  if (!r.ok) { toast(r.msg, "warn"); return; }
  if (typeof FEEL !== "undefined") FEEL.play("coinHeads", .6);
  let deckMsg = "";
  if (r.put) {
    const g = r.put.g, d = g && (Store.draft(u, g) || Store.deck(u, g)), dn = d ? countMap(d.cards) : 0;
    if (r.put.added) deckMsg = ` → 덱 초안에 ${r.put.added}장 (${dn}/${RULES.deckSize})`;
    else if (r.put.why === "full") deckMsg = ` → 덱이 ${RULES.deckSize}장이라 보관함에만 넣었습니다`;
    else if (r.put.why === "copies") deckMsg = ` → 덱에 이미 ${maxCopiesOf(c)}장이라 보관함에만 넣었습니다`;
  }
  toast(`「${c.name}」 ${r.n}장 구매${Store.isAdmin(u) ? " (관리자 · 무료)" : " · −" + fmtGold(r.price)}${deckMsg}`, "good");
  const from = $(".shop-wallet");
  renderShopMain();
  const tile = $(`.shop-card[data-card="${id}"]`);
  if (tile) { tile.classList.add("bought"); setTimeout(() => tile.classList.remove("bought"), 900); if (typeof Scenes !== "undefined") Scenes.shards($(".shop-wallet") || from, tile.querySelector(".sc-face"), Math.min(14, 5 + r.n)); }
  const chip = $(".gold-chip"); if (chip) chip.querySelector("b").textContent = fmtGold(Store.gold(u));
}
function shopSell(id) {
  const u = Store.user(), c = CARDS[id];
  const r = Store.sellCard(u, id);
  if (!r.ok) { toast(r.msg, "warn"); return; }
  toast(`「${c.name}」 판매${r.price ? " · +" + fmtGold(r.price) : ""} (보유 ${r.have}) · 재고로 돌아갔습니다`, "good");
  renderShopMain();
  const tile = $(`.shop-card[data-card="${id}"]`);
  if (tile && typeof Scenes !== "undefined") Scenes.shards(tile.querySelector(".sc-face"), $(".shop-wallet"), 6);
  const chip = $(".gold-chip"); if (chip) chip.querySelector("b").textContent = fmtGold(Store.gold(u));
}
