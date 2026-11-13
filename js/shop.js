/* ETHERION — 상점
   모든 카드가 있다. 왼쪽은 조직도(상점 → 3진영 → 9단체): 진영을 누르면 그 진영의 단체가 펼쳐지고,
   단체를 누르면 오른쪽에 그 단체의 카드가 가격과 함께 나온다. 카드를 누르면 원본 카드와 구매·판매 버튼.
   v1.4.3: 판매는 산 값 그대로 돌려받는다. 덱에 넣어 둔 장수만큼은 팔 수 없다.
   가격은 economy.js의 cardPrice.
   v1.6: 카드마다 등급(js/grades.js)을 구매·판매 버튼 왼쪽에 등급 색으로 보인다.
   v3.0: 값은 shopPrice(v3.54 등급별 — 일반 100 · 고급 200 · 레어 500 · 에픽 700 · 유니크 800, 스페셜 · 강화는 사고팔지 않음), 등급별 재고(SHOP_STOCK), 관리자는 무료·무제한, 여러 장 구매,
         산 카드는 덱 조정실의 덱 초안에 바로 들어간다(켜고 끌 수 있음). 배경은 밤의 린데어 항구(js/scenes.js).
   v3.19.9: 빠르게 — 사고팔 때는 목록 전체(모든 카드 800여 장)를 다시 그리지 않고 shopRefresh로 그 카드 칸 · 지갑 · 덱 길만 고친다.
            다른 카드 칸은 구매 단추(조각이 모자라 막힘)만 고친다. 화면 밖 카드 칸을 그리지 않는 것은 css/shop.css(content-visibility). */
"use strict";

const SHOP = { node: "root", type: "all", lv: 0, grade: "", open: {}, toDeck: true, adm: "all" };   // adm: v3.37 관리자 상점의 상태 거르기
try { const v = localStorage.getItem("etherion.pref.shopToDeck"); if (v != null) SHOP.toDeck = v === "1"; } catch (e) {}

function shopNodeHTML(kind, id, extra) {
  if (kind === "root") return `<button type="button" class="org-node rq root${SHOP.node === "root" ? " on" : ""}" data-node="root"><i class="rq-plate" aria-hidden="true"></i><span class="emblem big q">⚖</span><b>린데어 상점</b><span class="en">Lindear Market · ${CARD_LIST.length}종</span></button>`;
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
  if (SHOP.type === "upgrade") list = list.filter(c => c.base);   // v3.28 강화 카드 (같은 카드 3장을 합침)
  if (SHOP.lv) list = list.filter(c => c.lv === SHOP.lv);
  if (SHOP.grade && !noGrade) list = list.filter(c => gradeOf(c) === SHOP.grade);
  /* v3.37 관리자 상점: 모험가에게는 판매 중인 카드만(강화 카드는 원래 카드가 판매 중일 때). 관리자는 상태로 거른다 */
  const u = Store.user(), now = Date.now();
  if (!Store.isAdmin(u)) list = list.filter(c => Store.shopOpen(c.base || c.id, now));
  else if (SHOP.adm !== "all") list = list.filter(c => !c.base && (SHOP.adm === "timed" ? !!(Store.shopCfg().c[c.id] || {}).until || !!(Store.shopCfg().c[c.id] || {}).from : Store.shopState(c.id, now) === SHOP.adm));
  const order = { unit: 0, atk: 1, def: 2, any: 3, item: 4 };
  return list.slice().sort((a, b) => GROUP_IDS.indexOf(a.group) - GROUP_IDS.indexOf(b.group) || order[a.type] - order[b.type] || a.lv - b.lv || a.id.localeCompare(b.id));
}
/* v3.0 재고 막대 · 덱 표시가 붙은 카드 칸 */
function shopStockHTML(c) {
  const left = Store.stockLeft(c.id), mx = Store.shopMax(c.id) || 1, pct = Math.round(left / mx * 100);
  return `<span class="sc-stock${left ? "" : " empty"}" style="--gr:${GRADES[gradeOf(c)].color};--p:${pct}%" title="상점 재고 ${left} / ${mx}장 (${GRADES[gradeOf(c)].name} 등급은 ${mx}장씩 채운다)"><i></i><em>재고 <b>${left}</b>/${mx}</em></span>`;
}
/* 구매 단추의 상태(막힘 · 글 · 풀이). 카드 칸(shopCardTile)과 사고판 뒤 다른 칸 고치기(shopRefresh)가 함께 쓴다 */
function shopBuyState(c, u) {
  const admin = Store.isAdmin(u), own = Store.shopOwned(u, c.id), mx = maxCopiesOf(c), full = !admin && own >= mx, price = shopPrice(c);
  const left = Store.stockLeft(c.id), poor = !admin && Store.gold(u) < price;
  const why = !left ? "재고가 없습니다" : full ? "최대 장수를 모두 가지고 있습니다" : poor ? "환석 조각이 부족합니다" : `${fmtGold(price)}에 1장 구매${SHOP.toDeck ? " · 덱 초안에 바로 넣음" : ""}`;
  if (!admin && typeof shopTradable === "function" && !shopTradable(c)) return { admin, own, mx, full, price, left, poor, why: `${GRADES[gradeOf(c)].name} 카드는 상점에서 살 수 없습니다 — 보상으로만 얻습니다`, off: true, label: "구매 불가", noSale: true };   // v3.54 스페셜
  if (Store.isGuest(u)) return { admin, own, mx, full, price, left, poor, why: "필멸자는 둘러보기만 할 수 있습니다 — '새 모험가'로 등록하면 살 수 있습니다", off: true, label: "둘러보기" };   // v3.37
  return { admin, own, mx, full, price, left, poor, why, off: !left || full || poor, label: !left ? "품절" : full ? "모두 보유" : "구매" };
}
/* v3.28 강화 카드 칸: 사고팔지 않고 "업그레이드"(원래 카드 3장 → 1장). 원래 카드 칸에는 강화 줄이 붙는다 */
function shopUpgradeTile(c, u) {
  const b = CARDS[c.base], all = Store.allCards(u), ch = Store.upgradeCheck(u, c.id), own = all ? 1 : (u.collection[c.id] || 0), fresh = u.fresh && u.fresh[c.id];
  return `<div class="shop-card is-upgrade${own ? " full" : ""}${fresh ? " fresh" : ""}" data-card="${c.id}" style="--gr:${GRADES.upgrade.color}">
    <div class="sc-face">${cardHTML(c, { size: "md", brief: true })}${fresh ? '<span class="sc-new">NEW</span>' : ""}</div>
    <div class="sc-foot"><span class="sc-price" title="재료">「${esc(b.name)}」 × ${UPGRADE_COST}${typeof UPGRADE_SEALS !== "undefined" ? ` + 인장 ${UPGRADE_SEALS}` : ""}</span><span class="sc-own ${own ? "ok" : ""}">보유 ${own}/1</span></div>
    <p class="sc-onlyup">구매 불가 · 업그레이드로만 얻을 수 있습니다</p>
    <p class="sc-upgline">${all ? "관리자 · 필멸자는 이미 쓸 수 있습니다" : own ? "이미 가지고 있습니다" : `쓸 수 있는 재료 <b>${Math.min(ch.free, UPGRADE_COST)}</b>/${UPGRADE_COST}${typeof UPGRADE_SEALS !== "undefined" ? ` · 인장 <b>${Math.min(Store.seals(u), UPGRADE_SEALS)}</b>/${UPGRADE_SEALS}` : ""}`}</p>
    <div class="sc-btns">
      ${gradeBadgeHTML(c, "sc-grade")}
      <button type="button" class="btn xs sc-upg" data-upg="${c.id}" ${ch.ok ? "" : "disabled"} title="${esc(ch.ok ? `「${b.name}」 ${UPGRADE_COST}장을 합쳐 「${c.name}」 1장으로` : ch.msg)}">업그레이드</button>
    </div>
  </div>`;
}
function shopCardTile(c, u) {
  if (c.base) return shopUpgradeTile(c, u);
  const { admin, own, mx, full, price, left, why, off, label } = shopBuyState(c, u);
  const upId = typeof Upgrade !== "undefined" ? Upgrade.upOf(c.id) : null, upCh = upId && !Store.allCards(u) ? Store.upgradeCheck(u, upId) : null;
  const fresh = u.fresh && u.fresh[c.id], st = Store.shopState(c.id);
  const fzCh = typeof Forge !== "undefined" && Forge.kindOf(c.id) === "rare" && !Store.allCards(u) && Store.ownsGroup(u, c.group) ? Store.fuseCheck(u, c.id) : null;   // v3.52 레어 합성(고급 3장)
  return `<div class="shop-card${full ? " full" : ""}${left ? "" : " soldout"}${fresh ? " fresh" : ""}${st !== "on" ? " st-" + st : ""}" data-card="${c.id}" style="--gr:${GRADES[gradeOf(c)].color}">
    <div class="sc-face">${cardHTML(c, { size: "md", brief: true })}${fresh ? '<span class="sc-new">NEW</span>' : ""}${left ? "" : '<span class="sc-sold">품절</span>'}${shopStateBadge(c.id, admin)}${typeof Forge !== "undefined" ? Forge.badgeHTML(c, u) : ""}</div>
    <div class="sc-foot"><span class="sc-price" title="상점 값 (등급별: ${typeof SHOP_GRADE_PRICE !== "undefined" ? Object.entries(SHOP_GRADE_PRICE).map(([g, v]) => GRADES[g].name + " " + v).join(" · ") : ""})"><i class="shard" aria-hidden="true"></i>${Math.round(price).toLocaleString("ko-KR")}</span><span class="sc-own ${own ? "ok" : ""}">보유 ${own}${admin ? "" : "/" + mx}</span></div>
    ${shopStockHTML(c)}
    ${fzCh ? `<p class="sc-upgline k-rare" title="${esc(fzCh.ok ? "누르면 합성소" : fzCh.msg)}"><button type="button" class="linkish" data-fuse="${c.id}">◆ 승화 ${RARE_FUSE.cost}장 → 레어 뽑기</button> <b>${Math.min(fzCh.free || 0, RARE_FUSE.cost)}</b>/${RARE_FUSE.cost}</p>` : ""}
    ${upCh ? `<p class="sc-upgline" title="${esc(upCh.ok ? "누르면 업그레이드" : upCh.msg)}"><button type="button" class="linkish" data-upg="${upId}" ${upCh.ok ? "" : "disabled"}>⇧ ${UPGRADE_COST}장 → 강화 「${esc(CARDS[upId].name)}」</button> <b>${Math.min(upCh.free, UPGRADE_COST)}</b>/${UPGRADE_COST}</p>` : ""}
    <div class="sc-btns">
      ${gradeBadgeHTML(c, "sc-grade")}
      <button type="button" class="btn xs gold sc-buy" data-buy="${c.id}" ${off ? "disabled" : ""} title="${why}">${label}</button>
      <button type="button" class="btn xs sc-sell" data-sell="${c.id}" ${Store.sellable(u, c.id) ? "" : "disabled"} title="${(u.collection[c.id] || 0) ? (Store.sellable(u, c.id) ? fmtGold(price) + "에 1장 판매 (재고로 돌아감)" : "덱에 들어 있는 카드는 팔 수 없습니다") : "가진 카드가 없습니다"}">판매</button>
    </div>
  </div>`;
}
function shopTitle() {
  if (SHOP.node === "root") return { t: "모든 카드", s: "린데어 자유시 상점 · 세 진영 아홉 단체의 카드가 모두 모인다" };
  if (FACTIONS[SHOP.node]) { const F = FACTIONS[SHOP.node]; return { t: F.name, s: `${F.en} · ${F.motto}` }; }
  const G_ = GROUPS[SHOP.node]; return { t: G_.name, s: `${G_.en} · ${FACTIONS[G_.faction].name} · ${G_.role} · ${G_.motto}` };
}

function showShop() {
  Store.ensureOpen();
  const u = Store.user(); if (!u) return showLogin();
  /* v3.9 상점 배경은 멈춘 그림 한 장: 하늘은 한 번만 그리고(Bg.freeze), 배경의 세 존재(3D)는 그리지 않는다("off" = 캔버스를 숨기고 그리기를 멈춤) */
  App.screen = "shop"; Bg.set("calm"); Bg.freeze(); if (typeof Titans !== "undefined") Titans.mode("off");
  $("#app").innerHTML = `<section class="screen screen-shop">
    ${typeof Scenes !== "undefined" ? Scenes.html("shop") : ""}
    ${headerHTML("린데어 상점")}
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
  root.addEventListener("forge:done", e => shopRefresh(e.detail.ids));   // v3.52 표식 · 합성소 단추로 연 합성소가 닫힘
  root.addEventListener("change", e => {
    if (e.target.id === "shop-todeck") { SHOP.toDeck = e.target.checked; try { localStorage.setItem("etherion.pref.shopToDeck", SHOP.toDeck ? "1" : "0"); } catch (x) {} shopRefresh([]); }
  });
  root.addEventListener("click", async e => {
    if (e.target.closest("#shop-restock")) {
      const ok = await modal(`<h3>재고 모두 채우기</h3><p>모든 카드의 상점 재고를 등급별 처음 장수로 되돌립니다.</p><p class="muted small">${GRADE_IDS.map(g => `${GRADES[g].name} ${SHOP_STOCK[g]}`).join(" · ")}</p>`, [{ label: "취소", value: false }, { label: "채우기", value: true, cls: "primary" }]);
      if (ok) { Store.restock(); renderShopMain(); toast("상점 재고를 모두 채웠습니다.", "good"); }
      return;
    }
    const sa = e.target.closest("[data-sadm]");   // v3.37 관리자 상점: 상태 거르기
    if (sa) { SHOP.adm = sa.dataset.sadm; renderShopMain(); return; }
    const sb = e.target.closest("[data-sbulk]");
    if (sb) { shopAdminBulk(sb.dataset.sbulk); return; }
    const goEd = e.target.closest("[data-goeditor]");
    if (goEd) { showEditor(goEd.dataset.goeditor); return; }
    const nb = e.target.closest("[data-node]");
    if (nb) {
      const id = nb.dataset.node;
      if (FACTIONS[id]) { SHOP.open[id] = SHOP.node === id ? !SHOP.open[id] : true; }
      SHOP.node = id; renderShop(); return;
    }
    const upg = e.target.closest("[data-upg]");
    if (upg) { if (!upg.disabled) shopUpgrade(upg.dataset.upg); return; }
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
/* 머리(제목 · 지갑)와 덱 길 줄. 사고팔면 shopRefresh가 이 둘만 다시 그린다 */
function shopHeadHTML(u, T, n) {
  const admin = Store.isAdmin(u);
  return `<div class="shop-head">
      <div><p class="eyebrow">LINDEAR MARKET · ${esc(T.s)}</p><h2>${esc(T.t)} <small>${n}종</small></h2></div>
      <div class="shop-wallet${admin ? " admin" : ""}"><span class="eyebrow">환석 조각</span><b>${admin ? "∞ <small>관리자</small>" : fmtGold(Store.gold(u))}</b>${admin ? '<span class="muted small">값을 내지 않고 무엇이든 삽니다</span>' : typeof UPGRADE_SEALS !== "undefined" && typeof sealIcon === "function" ? `<span class="shop-seals" title="순례의 인장 — 업그레이드(강화)에 ${UPGRADE_SEALS}개. 성로 순례의 관문을 이기면 1개, 완주하면 2개 더">${sealIcon()} 순례의 인장 <b>${Store.seals(u)}</b></span>` : ""}</div>
    </div>`;
}
function shopLinkHTML(u) {
  const admin = Store.isAdmin(u), deckG = GROUPS[SHOP.node] ? SHOP.node : null;
  const dk = deckG && Store.ownsGroup(u, deckG) ? (Store.draft(u, deckG) || Store.deck(u, deckG)) : null, dn = dk ? countMap(dk.cards) : 0;
  return `<div class="shop-link">
      <label class="chip tog" title="켜 두면 산 카드가 덱 조정실의 덱 초안에 바로 들어갑니다 (40장까지). 다 찼으면 보관함에만 들어갑니다"><input type="checkbox" id="shop-todeck" ${SHOP.toDeck ? "checked" : ""}> 산 카드를 덱 초안에 바로 넣기</label>
      ${dk ? `<button type="button" class="btn xs" data-goeditor="${deckG}" title="이 단체의 덱 조정실로">${menuIcon("quill")}<span>「${esc(dk.name)}」 <b class="${dn === RULES.deckSize ? "ok" : "bad"}">${dn}</b>/${RULES.deckSize}${Store.draft(u, deckG) ? " · 초안" : ""}</span></button>` : '<span class="muted small">단체를 고르면 그 덱 조정실로 가는 길이 여기 나옵니다.</span>'}
      ${!Store.allCards(u) && typeof Forge !== "undefined" ? `<button type="button" class="btn xs fg-open" data-fuse="" data-fuse-g="${deckG || ""}" title="같은 카드 3장 합치기 — 일반 → 강화 · 고급 → 레어 뽑기">${fuseIcon("up")}<span>합성소</span></button>` : ""}
      ${admin ? '<button type="button" class="btn xs ghost" id="shop-restock" title="모든 카드의 재고를 등급별 처음 장수로">재고 모두 채우기</button>' : ""}
    </div>`;
}
/* v3.19.9 사고판 뒤: ids 카드 칸만 새로 그리고, 머리 · 덱 길을 고치고, 다른 칸은 구매 단추만 맞춘다(지갑이 줄어 막히거나 늘어 풀림).
   목록 · 거르기 · 등급 장수는 사고팔아도 바뀌지 않는다. 목록이 없으면 예전처럼 모두 그린다 */
function shopRefresh(ids) {
  const box = $("#shop-cards"), u = Store.user();
  if (!box || !u) { renderShopMain(); return; }
  const head = $(".shop-head"); if (head) head.outerHTML = shopHeadHTML(u, shopTitle(), shopCards().length);   /* v3.32.2 칸은 나눠 붙으므로 장수는 목록에서 */
  const link = $(".shop-link"); if (link) link.outerHTML = shopLinkHTML(u);
  const redo = new Set(ids || []);
  for (const id of redo) { const el = box.querySelector(`.shop-card[data-card="${id}"]`); if (el && CARDS[id]) el.outerHTML = shopCardTile(CARDS[id], u); }
  for (const b of box.querySelectorAll(".sc-buy")) {
    const id = b.dataset.buy; if (redo.has(id) || !CARDS[id]) continue;
    const st = shopBuyState(CARDS[id], u);
    if (b.disabled !== st.off) b.disabled = st.off;
    if (b.title !== st.why) b.title = st.why;
    if (b.textContent !== st.label) b.textContent = st.label;
  }
}
function renderShop() { $("#shop-tree").innerHTML = shopTreeHTML(); renderShopMain(); }
function renderShopMain() {
  /* v3.11.3 등급 칸의 장수: 단체 · 종류 · 레벨을 거친 카드 안에서 센다. 고른 등급이 0장이 되면 '모든 등급'으로 */
  const gN = {}; for (const c of shopCards(true)) { const g = gradeOf(c); gN[g] = (gN[g] || 0) + 1; }
  if (SHOP.grade && !gN[SHOP.grade]) SHOP.grade = "";
  const u = Store.user(), list = shopCards(), T = shopTitle();
  $("#shop-main").innerHTML = `
    ${shopHeadHTML(u, T, list.length)}
    ${shopLinkHTML(u)}
    ${Store.isAdmin(u) ? shopAdminBar(list) : ""}
    <div class="shop-filters">
      <div class="chips"><span class="sf-label">종류</span>${[["all", "전체"], ["unit", "유닛"], ["spell", "마법"], ["item", "아이템"], ["upgrade", "업그레이드"]].map(([k, l]) => `<button type="button" class="chip${SHOP.type === k ? " on" : ""}${k === "upgrade" ? " sf-upgrade" : ""}" data-shop-type="${k}">${l}</button>`).join("")}</div>
      <div class="chips"><span class="sf-label">레벨</span>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(l => `<button type="button" class="chip${SHOP.lv === l ? " on" : ""}" data-shop-lv="${l}">${l ? "Lv " + l : "모든 레벨"}</button>`).join("")}</div>
      <div class="chips"><span class="sf-label">등급</span><button type="button" class="chip${SHOP.grade ? "" : " on"}" data-shop-gr="">모든 등급</button>${GRADE_IDS.map(g => `<button type="button" class="chip sf-grade${SHOP.grade === g ? " on" : ""}" data-shop-gr="${g}" style="--gr:${GRADES[g].color}" ${gN[g] ? "" : "disabled"} title="${GRADES[g].name} 등급 ${gN[g] || 0}종">${GRADES[g].name} <small>${gN[g] || 0}</small></button>`).join("")}</div>
    </div>
    <div class="shop-cards" id="shop-cards">${list.slice(0, SHOP_FIRST).map(c => shopCardTile(c, u)).join("")}</div>`;
  shopFill(list);
}
/* v3.32.2 상점을 빨리 띄운다: 처음에는 화면에 보이는 카드 칸(SHOP_FIRST장)만 그려 바로 보이고,
   나머지는 다음 그림 차례부터 SHOP_BATCH장씩 뒤에 붙인다(교역소처럼 먼저 보이는 화면부터).
   다시 그리거나 다른 화면으로 가면 붙이던 것을 멈춘다(SHOP.fillTok). 붙일 때 지갑 · 재고는 그때의 것으로 그린다 */
const SHOP_FIRST = 24, SHOP_BATCH = 60;
function shopFill(list) {
  const tok = SHOP.fillTok = (SHOP.fillTok || 0) + 1;
  let i = SHOP_FIRST;
  const step = () => {
    const box = $("#shop-cards");
    if (tok !== SHOP.fillTok || !box || !box.isConnected || App.screen !== "shop" || i >= list.length) return;
    const u = Store.user(); if (!u) return;
    box.insertAdjacentHTML("beforeend", list.slice(i, i + SHOP_BATCH).map(c => shopCardTile(c, u)).join(""));
    i += SHOP_BATCH;
    if (i < list.length) setTimeout(() => requestAnimationFrame(step), 16);
  };
  if (i < list.length) requestAnimationFrame(() => setTimeout(() => requestAnimationFrame(step), 0));
}
/* v3.28 업그레이드: 확인 → 합치기 연출 → 그 카드 칸 둘(원래 · 강화)만 다시 그린다 */
async function shopUpgrade(id) {   // v3.52 합성소(강화 · 레어)를 열고, 바뀐 카드 칸만 다시 그린다
  const r = await Upgrade.run(id);
  if (r && r.ok) shopRefresh(r.ids);
}
async function shopCardModal(id) {
  const u = Store.user(), c = CARDS[id], admin = Store.isAdmin(u);
  if (c.base) {   // v3.28 강화 카드: 사고팔지 않는다
    const ub = Upgrade.button(id), btns = [{ label: "닫기", value: null }];
    if (GROUPS[c.group] && Store.ownsGroup(u, c.group)) btns.push({ label: "덱 조정실에서 보기", value: "editor" });
    if (ub) btns.push(ub);
    const r = await showCardModal(c, btns, `등급 <b style="color:${GRADES.upgrade.color}">강화</b> · 상점에서 사고팔 수 없습니다 · ${Upgrade.note(id)}`);
    if (r === "upgrade") shopUpgrade(id);
    if (r === "editor") showEditor(c.group, id);
    return;
  }
  const own = Store.shopOwned(u, id), mx = maxCopiesOf(c), price = shopPrice(c), left = Store.stockLeft(id);
  const room = admin ? left : Math.max(0, Math.min(left, mx - own, Math.floor(Store.gold(u) / price)));
  const canSell = Store.sellable(u, id) > 0;
  const qty = Store.isGuest(u) ? [] : [1, 4, 10].filter(n => n <= room);   // v3.37 필멸자는 둘러보기만
  const btns = [{ label: "닫기", value: null }];
  if (canSell) btns.push({ label: admin ? "1장 판매 (재고로)" : `1장 판매 (+${fmtGold(price)})`, value: "sell" });
  if (GROUPS[c.group] && Store.ownsGroup(u, c.group)) btns.push({ label: "덱 조정실에서 보기", value: "editor" });
  if (admin && left < Store.shopMax(id)) btns.push({ label: "이 카드 재고 채우기", value: "restock" });
  if (admin) btns.push({ label: "상점 설정…", value: "admin", cls: "alt" });   // v3.37 관리자 상점
  const ub = typeof Upgrade !== "undefined" ? Upgrade.button(id) : null; if (ub) btns.push(ub);   // v3.28
  for (const n of qty) btns.push({ label: `${n}장 구매 (${admin ? "무료" : fmtGold(price * n)})`, value: "buy" + n, cls: n === qty[qty.length - 1] ? "primary" : "" });
  if (admin && room > 10) btns.push({ label: `남은 ${room}장 모두 구매`, value: "buy" + room, cls: "primary alt" });
  const r = await showCardModal(c, btns,
    `등급 <b style="color:${GRADES[gradeOf(c)].color}">${GRADES[gradeOf(c)].name}</b> · 값 ${fmtGold(price)} · 재고 <b>${left}</b>/${Store.shopMax(id)} · 보유 ${own}${admin ? "" : "/" + mx} · 지갑 ${admin ? "∞ (관리자)" : fmtGold(Store.gold(u))}${SHOP.toDeck ? " · 산 카드는 덱 초안에 바로 들어갑니다" : ""}${typeof Upgrade !== "undefined" && Upgrade.kindOf(id) ? "<br>" + Upgrade.note(id) : ""}`);
  if (!r) return;
  if (r.startsWith("buy")) shopBuy(id, +r.slice(3));
  if (r === "sell") shopSell(id);
  if (r === "upgrade") shopUpgrade(id);
  if (r === "editor") showEditor(c.group, id);
  if (r === "admin") { shopAdminEdit([id]); return; }
  if (r === "restock") { Store.restock([id]); shopRefresh([id]); toast(`「${c.name}」 재고를 ${Store.shopMax(id)}장으로 채웠습니다.`, "good"); }
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
    else if (r.put.why === "unique") deckMsg = ` → 유니크는 덱에 ${UNIQUE_DECK_MAX}종까지라 보관함에만 넣었습니다`;   // v3.31
  }
  toast(`「${c.name}」 ${r.n}장 구매${Store.isAdmin(u) ? " (관리자 · 무료)" : " · −" + fmtGold(r.price)}${deckMsg}`, "good");
  const from = $(".shop-wallet");
  shopRefresh([id]);
  const tile = $(`.shop-card[data-card="${id}"]`);
  if (tile) { tile.classList.add("bought"); setTimeout(() => tile.classList.remove("bought"), 900); if (typeof Scenes !== "undefined") Scenes.shards($(".shop-wallet") || from, tile.querySelector(".sc-face"), Math.min(14, 5 + r.n)); }
  const chip = $(".gold-chip"); if (chip) chip.querySelector("b").textContent = fmtGold(Store.gold(u));
}
function shopSell(id) {
  const u = Store.user(), c = CARDS[id];
  const r = Store.sellCard(u, id);
  if (!r.ok) { toast(r.msg, "warn"); return; }
  toast(`「${c.name}」 판매${r.price ? " · +" + fmtGold(r.price) : ""} (보유 ${r.have}) · 재고로 돌아갔습니다`, "good");
  shopRefresh([id]);
  const tile = $(`.shop-card[data-card="${id}"]`);
  if (tile && typeof Scenes !== "undefined") Scenes.shards(tile.querySelector(".sc-face"), $(".shop-wallet"), 6);
  const chip = $(".gold-chip"); if (chip) chip.querySelector("b").textContent = fmtGold(Store.gold(u));
}

/* ---------- v3.37 관리자 상점 ----------
   관리자가 상점을 연다: 카드마다 판매 중 · 내림, 새 카드(게임에 새로 넣은 카드) 공개, 기간 판매(시작 · 끝), 재고 최대 장수 · 지금 재고.
   규칙과 저장은 js/economy.js Store.shopSet · shopStock(서버로 열면 서버가 정본). 모험가는 "판매 중"인 카드만 보고 산다 */
const SHOP_ST = { on: ["판매 중", "#7fd49a"], off: ["내림", "#ef6a5c"], new: ["새 카드 · 비공개", "#8fdcff"], soon: ["판매 예정", "#f0b44c"], ended: ["기간 끝", "#8a8577"] };
const shopDT = ms => { if (!ms) return ""; const d = new Date(ms), p = n => String(n).padStart(2, "0"); return `${d.getMonth() + 1}/${d.getDate()} ${p(d.getHours())}:${p(d.getMinutes())}`; };
function shopStateBadge(id, admin) {
  const st = Store.shopState(id), o = Store.shopCfg().c[id] || {};
  if (admin) return st === "on" && !o.until ? "" : `<span class="sc-st" style="--sc:${SHOP_ST[st][1]}">${SHOP_ST[st][0]}${o.until && st !== "ended" ? ` ~${shopDT(o.until)}` : ""}${st === "soon" ? ` ${shopDT(o.from)}~` : ""}</span>`;
  return o.until ? `<span class="sc-st" style="--sc:#f0b44c">기간 한정 ~${shopDT(o.until)}</span>` : "";
}
function shopAdminBar(list) {
  const all = CARD_LIST.filter(c => !c.base), now = Date.now(), n = { all: all.length, on: 0, off: 0, new: 0, soon: 0, ended: 0, timed: 0 };
  for (const c of all) { n[Store.shopState(c.id, now)]++; const o = Store.shopCfg().c[c.id]; if (o && (o.from || o.until)) n.timed++; }
  const chip = (k, l) => `<button type="button" class="chip${SHOP.adm === k ? " on" : ""}" data-sadm="${k}">${l} <small>${n[k]}</small></button>`;
  const ids = list.filter(c => !c.base).length;
  return `<div class="shop-admin">
      <div class="chips"><span class="sf-label">관리자 상점</span>${chip("all", "모든 카드")}${chip("on", "판매 중")}${chip("new", "새 카드")}${chip("off", "내림")}${chip("timed", "기간 판매")}${chip("soon", "예정")}${chip("ended", "끝남")}</div>
      <div class="sa-bulk"><span class="muted small">지금 보이는 ${ids}종에</span>
        <button type="button" class="btn xs" data-sbulk="open" ${ids ? "" : "disabled"}>모두 공개 · 판매</button>
        <button type="button" class="btn xs" data-sbulk="close" ${ids ? "" : "disabled"}>모두 내리기</button>
        <button type="button" class="btn xs" data-sbulk="edit" ${ids ? "" : "disabled"}>설정 바꾸기…</button>
        <button type="button" class="btn xs" data-sbulk="fill" ${ids ? "" : "disabled"}>재고 채우기</button></div>
    </div>`;
}
async function shopAdminBulk(k) {
  const ids = shopCards().filter(c => !c.base).map(c => c.id); if (!ids.length) return;
  if (k === "edit") return shopAdminEdit(ids);
  const label = { open: "공개하고 판매", close: "내리기", fill: "재고를 최대 장수까지 채우기" }[k];
  const ok = await modal(`<h3>관리자 상점</h3><p>지금 보이는 카드 <b>${ids.length}종</b>을 ${label}합니다.</p>`, [{ label: "취소", value: false }, { label, value: true, cls: "primary" }]);
  if (!ok) return;
  const r = k === "fill" ? Store.shopStock(ids) : Store.shopSet(ids, k === "open" ? { off: null, pub: 1 } : { off: 1 });
  if (r && r.ok === false) { toast(r.msg, "warn"); return; }
  toast(`${ids.length}종: ${label} 했습니다.`, "good"); renderShopMain();
}
/* 카드 하나 또는 여럿의 상점 설정 창 (여럿이면 첫 카드의 값을 보여 주고 모두에 적용) */
async function shopAdminEdit(ids) {
  const id0 = ids[0], o = Store.shopCfg().c[id0] || {}, st = Store.shopState(id0), c0 = CARDS[id0];
  const dtv = ms => { if (!ms) return ""; const d = new Date(ms - new Date(ms).getTimezoneOffset() * 60000); return d.toISOString().slice(0, 16); };
  let val = null;
  const html = `<h3>상점 설정 <small>${ids.length > 1 ? `${ids.length}종` : esc(c0.name)}</small></h3>
    <p class="muted small">지금: ${SHOP_ST[st][0]} · 재고 ${Store.stockLeft(id0)} / ${Store.shopMax(id0)}${ids.length > 1 ? " (첫 카드 기준 — 저장하면 모든 카드에 같은 값)" : ""}</p>
    <div class="sa-form">
      <label class="sa-row"><span>상점에</span><select id="sa-on"><option value="on" ${o.off ? "" : "selected"}>내놓기 (공개 · 판매)</option><option value="off" ${o.off ? "selected" : ""}>내리기</option></select></label>
      <label class="sa-row"><span>판매 시작</span><input type="datetime-local" id="sa-from" value="${dtv(o.from)}"><small>비우면 바로</small></label>
      <label class="sa-row"><span>판매 끝</span><input type="datetime-local" id="sa-until" value="${dtv(o.until)}"><small>비우면 계속</small></label>
      <label class="sa-row"><span>재고 최대</span><input type="number" id="sa-max" min="0" max="9999" value="${o.max != null ? o.max : ""}" placeholder="${stockMax(c0)} (등급 기본)"><small>비우면 등급 기본</small></label>
      <label class="sa-row"><span>지금 재고</span><input type="number" id="sa-now" min="0" max="9999" placeholder="그대로"><small>비우면 그대로 · 0이면 품절</small></label>
    </div>`;
  const read = w => {
    const q = s => w.querySelector(s).value.trim(), t = s => q(s) ? new Date(q(s)).getTime() : null;
    val = { on: q("#sa-on") === "on", from: t("#sa-from"), until: t("#sa-until"), max: q("#sa-max") === "" ? null : +q("#sa-max"), now: q("#sa-now") === "" ? null : +q("#sa-now") };
    if (val.from && val.until && val.until <= val.from) { toast("판매 끝이 시작보다 뒤여야 합니다.", "warn"); return false; }
  };
  const r = await modal(html, [{ label: "취소", value: null }, { label: "저장", value: "save", cls: "primary", onClick: read }], { cls: "sa-modal" });
  if (r !== "save" || !val) return;
  const a = Store.shopSet(ids, { off: val.on ? null : 1, pub: val.on ? 1 : null, from: val.from, until: val.until, max: val.max });
  if (a && a.ok === false) { toast(a.msg, "warn"); return; }
  if (val.now != null) Store.shopStock(ids, val.now);
  toast(`${ids.length > 1 ? ids.length + "종" : "「" + c0.name + "」"} 상점 설정을 저장했습니다.`, "good");
  renderShopMain();
}
