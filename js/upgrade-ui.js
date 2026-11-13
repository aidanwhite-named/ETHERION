/* ETHERION — 합성소 (v3.28 업그레이드 → v3.52 합성소)
   두 가지 합성을 한 화면에서: 강화(같은 일반 카드 3장 → 그 카드의 강화 카드, Store.upgradeCard · js/economy.js)
   · 승화(같은 고급 카드 3장 → 같은 깃발 레어 1장 확률 뽑기, 운명의 구슬을 넣으면 좋은 레어 · 낮은 확률 유니크, Store.fuseRare · js/fusion.js). 서버로 열면 둘 다 서버가 정한다.
   - Forge.open({ pick, mode, group }): 합성소 창. 카드를 누르면 세 칸이 차고 → [합성] → 연출(fuseFX). 끝나면 { ok, ids }
   - Forge.badgeHTML(c, u): 상점 · 덱 조정실 카드에 붙는 작은 합성 표식(재료 n/3). 누르면 그 카드를 고른 합성소
   - Upgrade.*: 예전 이름 그대로(상점 · 덱 조정실 카드 창의 단추 · 설명 줄). run(id)은 합성소를 연다
   - fuseFX(baseId, outId, kind): 카드 셋이 모여 부서지고 새 카드가 떠오르는 연출(css/upgrade.css). 누르면 건너뜀 */
"use strict";

const FUSE_GEM = '<path d="M12 2.2 20.4 9 12 21.8 3.6 9z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3.6 9h16.8M8.4 9 12 21.8 15.6 9M8.4 9 12 2.2 15.6 9" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" opacity=".75"/>';
/* v3.54 순례의 인장: 둥근 밀랍 인장 + 가운데 성로의 별 */
const SEAL_ICON = '<path d="M12 2.4c1.3 0 1.8 1.1 2.9 1.4 1.1.3 2.2-.4 3.1.4.9.8.3 2 .7 3.1.4 1.1 1.6 1.6 1.6 2.9s-1.2 1.8-1.6 2.9c-.4 1.1.2 2.3-.7 3.1-.9.8-2 .1-3.1.4-1.1.3-1.6 1.4-2.9 1.4s-1.8-1.1-2.9-1.4c-1.1-.3-2.2.4-3.1-.4-.9-.8-.3-2-.7-3.1C3.1 12 1.9 11.5 1.9 10.2s1.2-1.8 1.6-2.9c.4-1.1-.2-2.3.7-3.1.9-.8 2-.1 3.1-.4C8.4 3.5 8.9 2.4 12 2.4z" fill="currentColor" opacity=".9"/><path d="M12 5.6l1.3 3 3.2.3-2.4 2.1.7 3.1L12 12.5l-2.8 1.6.7-3.1-2.4-2.1 3.2-.3z" fill="#2a0f08" opacity=".8"/><path d="M8.6 17.2 7 22l2.6-1.2L11 22.6l.6-4.4M15.4 17.2 17 22l-2.6-1.2L13 22.6l-.6-4.4" fill="currentColor" opacity=".75"/>';
/* v3.54 운명의 구슬: 별이 갇힌 구슬 + 빛 고리 */
const orbIcon = () => '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor" opacity=".35"/><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 6.2l1.5 3.6 3.8.3-2.9 2.5.9 3.7L12 14.3l-3.3 2 .9-3.7-2.9-2.5 3.8-.3z" fill="currentColor"/><ellipse cx="9" cy="8" rx="2.2" ry="1.2" fill="#fff" opacity=".55" transform="rotate(-30 9 8)"/></svg>';
const sealIcon = () => `<svg viewBox="0 0 24 24" aria-hidden="true">${SEAL_ICON}</svg>`;
const fuseIcon = kind => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${kind === "rare" ? FUSE_GEM : UPGRADE_MARK}</svg>`;
const cardKindWord = c => c.type === "unit" ? "유닛" : c.type === "item" ? "아이템" : ({ atk: "공격 마법", def: "방어 마법", any: "공용 마법", hand: "계략 마법" }[c.type] || "마법");
const FUSE_KIND = {
  up:   { name: "강화", from: "일반", to: "강화 카드", tip: "같은 일반 카드 3장 → 그 카드의 강화 카드 1장" },
  rare: { name: "승화", from: "고급", to: "레어 뽑기", tip: "같은 고급 카드 3장 → 같은 깃발 레어 1장 (확률 뽑기)" }   // v3.54 이름: 일반 3장 = 강화, 고급 3장 = 승화
};

const Forge = {
  S: null,
  /* 이 카드로 할 수 있는 합성: "up"(강화 재료 또는 강화 카드) · "rare"(고급) · null */
  kindOf(id) {
    const c = CARDS[id]; if (!c || c.retired) return null;
    if (c.base) return "up";
    if (typeof UPGRADE_OF !== "undefined" && UPGRADE_OF[id] && CARDS[UPGRADE_OF[id]] && !CARDS[UPGRADE_OF[id]].retired) return "up";
    if (typeof RARE_FUSE !== "undefined" && gradeOf(c) === RARE_FUSE.from) return "rare";
    return null;
  },
  baseOf(id) { const c = CARDS[id]; return c && c.base ? c.base : id; },
  cost() { return typeof UPGRADE_COST !== "undefined" ? UPGRADE_COST : 3; },
  check(u, baseId) {
    const k = this.kindOf(baseId);
    if (k === "up") return Store.upgradeCheck(u, UPGRADE_OF[baseId]);
    if (k === "rare") return Store.fuseCheck(u, baseId);
    return { ok: false, msg: "합성할 수 있는 카드가 아닙니다." };
  },
  /* 표식 하나: 가진 카드만(관리자 · 필멸자 · 깃발 없음 · 강화 카드를 이미 가짐 · 레어를 모두 가짐이면 없음) */
  badgeHTML(c, u) {
    u = u || Store.user(); if (!u || !c || c.base || Store.allCards(u)) return "";
    const k = this.kindOf(c.id); if (!k || !(u.collection[c.id] > 0)) return "";
    const ch = this.check(u, c.id), N = this.cost();
    if (!ch.ok && !ch.seal && (ch.free == null || ch.free >= N)) return "";   // 재료 말고 다른 까닭(이미 가짐 등). 인장만 모자라면 표식은 보임(v3.54)
    const n = Math.min(ch.free || 0, N), ready = ch.ok, K = FUSE_KIND[k];
    const tip = `${K.name} 합성 재료 ${n}/${N}${ready ? " — 지금 합칠 수 있음" : ""}\n${K.tip}\n${ready ? "누르면 합성소로" : ch.msg}`;
    return `<span class="fz-badge k-${k}${ready ? " is-ready" : ""}" data-fuse="${c.id}" role="button" tabindex="0" aria-label="${esc(tip.replace(/\n/g, " · "))}" data-tip="${esc(tip)}">${fuseIcon(k)}<b>${n}<small>/${N}</small></b></span>`;
  },
  /* 고를 수 있는 카드: 가진 깃발 · 가진 카드 · 그 합성 종류 */
  candidates(u, mode) {
    const N = this.cost(), out = [];
    for (const c of CARD_LIST) {
      if (c.base || !(u.collection[c.id] > 0) || this.kindOf(c.id) !== mode || !Store.ownsGroup(u, c.group)) continue;
      const ch = this.check(u, c.id);
      const done = !ch.ok && !ch.seal && ch.free != null && ch.free >= N;   // 재료는 있는데 다른 까닭(강화 카드 이미 가짐 · 레어 다 가짐)
      out.push({ c, ch, free: Math.min(ch.free || 0, N), done });
    }
    return out.sort((a, b) => (b.ch.ok - a.ch.ok) || (a.done - b.done) || (b.free - a.free) || GROUP_IDS.indexOf(a.c.group) - GROUP_IDS.indexOf(b.c.group) || a.c.lv - b.c.lv || a.c.id.localeCompare(b.c.id));
  },
  open(o) {
    o = o || {};
    if (this.S) this.close();
    const u = Store.user(); if (!u) return Promise.resolve({ ok: false });
    const pick = o.pick && CARDS[o.pick] ? this.baseOf(o.pick) : null;
    const mode = (pick && this.kindOf(pick)) || o.mode || "up";
    return new Promise(done => {
      const el = document.createElement("div");
      el.className = "fg"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", "합성소");
      document.body.appendChild(el);
      this.S = { el, mode, pick, group: o.group || (pick ? CARDS[pick].group : ""), ready: false, odds: false, busy: false, changed: new Set(), from: o.from || null, done };
      this.render();
      requestAnimationFrame(() => el.classList.add("on"));
      this.play("ui_open");
      el.addEventListener("click", e => this.onClick(e));
      this.S.key = e => { if (!this.S || this.S.busy) return; if (e.key === "Escape") { e.preventDefault(); this.S.odds ? (this.S.odds = false, this.render()) : this.close(); } };
      addEventListener("keydown", this.S.key);
    });
  },
  close() {
    const S = this.S; if (!S) return; this.S = null;
    removeEventListener("keydown", S.key);
    S.el.classList.remove("on"); setTimeout(() => S.el.remove(), 220);
    const ids = [...S.changed];
    if (ids.length && S.from) (S.from.isConnected ? S.from : document.body).dispatchEvent(new CustomEvent("forge:done", { bubbles: true, detail: { ids } }));
    S.done({ ok: ids.length > 0, ids, base: ids[0], up: ids[1] });
  },
  play(n) { try { if (typeof FEEL !== "undefined") FEEL.play(n); } catch (e) {} },
  render() {
    const S = this.S; if (!S) return;
    const u = Store.user(), N = this.cost(), K = FUSE_KIND[S.mode];
    let list = this.candidates(u, S.mode);
    const groups = [...new Set(list.map(x => x.c.group))];
    if (S.group && !groups.includes(S.group)) S.group = "";
    const shown = list.filter(x => (!S.group || x.c.group === S.group) && (!S.ready || x.ch.ok));
    if (S.pick && (this.kindOf(S.pick) !== S.mode || !(u.collection[S.pick] > 0))) S.pick = null;
    let P = S.pick && list.find(x => x.c.id === S.pick);
    if (P && S.mode === "rare" && S.orb) P = Object.assign({}, P, { ch: Store.fuseCheck(u, P.c.id, true) });   // v3.54 운명의 구슬을 넣었을 때
    const b = P && P.c;
    /* 세 칸 · 결과 */
    const slots = [0, 1, 2].map(k => {
      const fill = P && k < P.free;
      return `<button type="button" class="fg-slot${fill ? " filled" : P ? " short" : ""}" data-fslot="${k}" style="--k:${k}" aria-label="${fill ? `재료 ${k + 1}: ${esc(b.name)} (누르면 비움)` : `빈 칸 ${k + 1}`}">
        ${fill ? cardHTML(b, { size: "md", brief: true }) : `<span class="fg-empty"><i>${P ? "부족" : "+"}</i><small>${P ? "재료 없음" : "카드를 고르세요"}</small></span>`}</button>`;
    }).join("");
    let out;
    if (S.mode === "up") {
      const up = P && CARDS[UPGRADE_OF[b.id]];
      out = up ? `<div class="fg-res is-up">${cardHTML(up, { size: "md", brief: true })}</div><p class="fg-res-cap">강화 · Lv ${b.lv} → ${up.lv} · 유지비 ${b.up} → ${up.up}<br>어떤 아이템이든 장착 · 덱에 1장</p>${this.sealNeedHTML(u)}`
        : `<div class="fg-res fg-mystery is-up"><i>${fuseIcon("up")}</i><span>강화 카드</span></div><p class="fg-res-cap">일반 카드 3장 + 순례의 인장 ${UPGRADE_SEALS}개로 그 카드의 강화판이 됩니다.</p>${this.sealNeedHTML(u)}`;
    } else {
      const g = P ? GROUPS[b.group] : null;
      const nOrb = typeof ORB !== "undefined" ? Store.orbs(u) : 0;
      out = `<div class="fg-res fg-mystery is-rare${S.orb ? " with-orb" : ""}"><i>${fuseIcon("rare")}</i><span>${g ? esc(g.name) + "<br>" : ""}${S.orb ? "좋은 레어<br><small>· 유니크</small>" : "레어 1장"}</span><b>?</b></div>
        <p class="fg-res-cap">${S.orb ? `운명의 구슬: 센 레어만 나오고, ${Math.round(ORB.unique * 100)}% 확률로 유니크.` : P ? `같은 깃발 레어 가운데 하나 — 센 카드일수록 드뭅니다.` : "고급 카드 3장이 같은 깃발 레어 1장이 됩니다."}</p>
        ${typeof ORB !== "undefined" ? `<button type="button" class="fg-orb${S.orb ? " on" : ""}" data-forb aria-pressed="${!!S.orb}" ${nOrb || S.orb ? "" : "disabled"} title="${esc(ORB.name)} — 파친코 · 수레바퀴에서 낮은 확률로 얻습니다">${orbIcon()}<span>${S.orb ? "구슬 넣음" : "구슬 넣기"}</span><b>${nOrb}</b></button>` : ""}
        <button type="button" class="btn xs fg-odds-btn" data-fodds ${P ? "" : "disabled"}>확률 보기</button>`;
    }
    const msg = !P ? `아래에서 ${K.from} 카드를 고르세요. <span class="muted">재료는 저장한 덱 · 덱 초안에 들지 않은 장수에서만 씁니다.</span>`
      : P.ch.ok ? `「${esc(b.name)}」 ${N}장${S.mode === "up" ? ` · 순례의 인장 ${UPGRADE_SEALS}개` : S.orb ? ` · ${ORB.name} 1개` : ""}이 사라지고 ${S.mode === "up" ? `강화 카드 「${esc(CARDS[UPGRADE_OF[b.id]].name)}」 1장` : `${esc(GROUPS[b.group].name)} ${S.orb ? "좋은 레어 또는 유니크" : "레어"} 1장`}이 됩니다. 되돌릴 수 없습니다.`
      : `<em>${esc(P.ch.msg)}</em>`;
    const tiles = shown.map(x => {
      const c = x.c, st = x.ch.ok ? "is-ready" : x.done ? "is-done" : "is-part";
      return `<button type="button" class="fg-tile ${st}${S.pick === c.id ? " on" : ""}" data-fpick="${c.id}" aria-pressed="${S.pick === c.id}" title="${esc(x.ch.ok ? `${c.name} — 합칠 수 있음` : x.ch.msg)}">
        ${cardHTML(c, { size: "md", brief: true })}
        <span class="fg-cnt">${x.done ? "✓" : `${x.free}<small>/${N}</small>`}</span>${x.ch.ok ? `<span class="fg-rdy">${fuseIcon(S.mode)}</span>` : ""}</button>`;
    }).join("") || `<p class="fg-none">${list.length ? "이 조건의 카드가 없습니다." : `가진 ${K.from} 카드 가운데 ${K.name} 합성에 쓸 카드가 없습니다.<br><span class="muted small">상점에서 카드를 사거나 대전 보상으로 모으세요.</span>`}</p>`;
    const nReady = list.filter(x => x.ch.ok).length;
    S.el.className = `fg on m-${S.mode}${S.pick ? " picked" : ""}`;
    S.el.innerHTML = `<div class="fg-box">
      <header class="fg-head">
        <div class="fg-title"><p class="eyebrow">ETHER FORGE</p><h2>합성소</h2></div>
        ${typeof UPGRADE_SEALS !== "undefined" ? `<span class="fg-seals${Store.seals(u) >= UPGRADE_SEALS ? " ok" : ""}" title="순례의 인장 — 강화에 ${UPGRADE_SEALS}개. 성로 순례의 관문을 이기면 1개, 완주하면 2개 더">${sealIcon()}<b>${Store.seals(u)}</b><small>순례의 인장</small></span>` : ""}${typeof ORB !== "undefined" ? `<span class="fg-seals k-orb${Store.orbs(u) ? " ok" : ""}" title="${esc(ORB.name)} — 파친코 · 수레바퀴에서 낮은 확률로(하루 ${ORB.daily}개까지). 승화에 넣으면 좋은 레어 · ${Math.round(ORB.unique * 100)}% 유니크">${orbIcon()}<b>${Store.orbs(u)}</b><small>${esc(ORB.name)}</small></span>` : ""}
        <div class="fg-tabs" role="tablist">${["up", "rare"].map(m => `<button type="button" role="tab" class="fg-tab k-${m}${S.mode === m ? " on" : ""}" data-fmode="${m}" aria-selected="${S.mode === m}">${fuseIcon(m)}<span><b>${FUSE_KIND[m].name}</b><small>${FUSE_KIND[m].from} 3장 → ${FUSE_KIND[m].to}</small></span></button>`).join("")}</div>
        <button type="button" class="fg-x" data-fclose aria-label="합성소 닫기">✕</button>
      </header>
      <div class="fg-body">
        <section class="fg-bench" aria-label="합성대">
          <div class="fg-row"><div class="fg-slots">${slots}</div><i class="fg-arrow" aria-hidden="true">➜</i><div class="fg-out">${out}</div></div>
          <p class="fg-msg">${msg}</p>
          <div class="fg-act"><button type="button" class="btn primary fg-go" data-fgo ${P && P.ch.ok ? "" : "disabled"}>${fuseIcon(S.mode)}<span>합성</span></button></div>
        </section>
        <section class="fg-list" aria-label="고를 카드">
          <div class="fg-filter">
            <button type="button" class="chip${S.group ? "" : " on"}" data-fgrp="">모든 깃발</button>${groups.map(g => `<button type="button" class="chip${S.group === g ? " on" : ""}" data-fgrp="${g}">${esc(GROUPS[g].name)}</button>`).join("")}
            <label class="chip tog fg-only"><input type="checkbox" data-fready ${S.ready ? "checked" : ""}> 지금 합칠 수 있는 것만 <b>${nReady}</b></label>
          </div>
          <div class="fg-grid">${tiles}</div>
        </section>
      </div>
      ${S.odds && P && S.mode === "rare" ? this.oddsHTML(u, b) : ""}
    </div>`;
  },
  /* 강화에 드는 순례의 인장 (v3.54): 인장 셋이 칸처럼, 가진 만큼 빛남 */
  sealNeedHTML(u) {
    if (typeof UPGRADE_SEALS === "undefined") return "";
    const have = Store.seals(u), N = UPGRADE_SEALS;
    return `<div class="fg-sealneed${have >= N ? " ok" : ""}" title="순례의 인장 ${N}개를 함께 씁니다 (가진 ${have}개)">${Array.from({ length: N }, (_, k) => `<i class="${k < have ? "on" : ""}">${sealIcon()}</i>`).join("")}<span>인장 <b>${Math.min(have, N)}</b>/${N}</span></div>`;
  },
  oddsHTML(u, b) {
    const orb = !!this.S.orb, odds = rareFuseOdds(b.id, u, orb);
    return `<div class="fg-odds${orb ? " with-orb" : ""}" role="dialog" aria-label="승화 확률">
      <div class="fg-odds-box">
        <h3>${esc(GROUPS[b.group].name)} 승화 확률${orb ? ` <small>· ${esc(ORB.name)}</small>` : ""}</h3>
        <p class="muted small">${orb ? `「${esc(b.name)}」 ${this.cost()}장 + ${esc(ORB.name)} 1개 → 아래 가운데 1장. 이 깃발 레어 가운데 센 쪽(카드 점수가 가운데 값 이상)만 같은 확률로 나오고, ${Math.round(ORB.unique * 100)}%는 이 깃발 유니크입니다.` : `「${esc(b.name)}」 ${this.cost()}장 → 아래 가운데 1장. 센 카드(카드 점수 = 등급 15 + 레벨이 높은 카드)일수록 드뭅니다.`} 이미 다 가진 카드는 빠지고 나머지가 나눠 갖습니다. 뽑기는 서버가 합니다.</p>
        <ol class="fg-odds-list">${odds.map(o => { const c = CARDS[o.id], pct = (o.p * 100).toFixed(1);
          return `<li class="${o.full ? "full" : ""}${o.grade === "unique" ? " uq" : ""}" data-card="${c.id}"><span class="fo-lv">${o.grade === "unique" ? "유니크" : "Lv " + c.lv}</span><span class="fo-nm">${esc(c.name)} <small>${cardKindWord(c)}</small></span><span class="fo-bar"><i style="width:${o.full ? 0 : Math.max(2, o.p * 100)}%"></i></span><b class="fo-p">${o.full ? "다 가짐" : pct + "%"}</b></li>`; }).join("")}</ol>
        <div class="fg-odds-foot"><button type="button" class="btn primary" data-foddsx>닫기</button></div>
      </div></div>`;
  },
  async onClick(e) {
    const S = this.S; if (!S || S.busy) return;
    const t = e.target;
    if (t.closest("[data-fclose]") || t === S.el) { this.close(); return; }
    if (t.closest("[data-foddsx]") || (S.odds && t.classList.contains("fg-odds"))) { S.odds = false; this.render(); return; }
    const md = t.closest("[data-fmode]"); if (md) { if (S.mode !== md.dataset.fmode) { S.mode = md.dataset.fmode; S.pick = null; S.group = ""; this.play("ui_click"); this.render(); } return; }
    const gr = t.closest("[data-fgrp]"); if (gr) { S.group = gr.dataset.fgrp; this.render(); return; }
    const rd = t.closest("[data-fready]"); if (rd) { S.ready = rd.checked; this.render(); return; }
    const od = t.closest("[data-fodds]"); if (od) { S.odds = true; this.render(); return; }
    if (t.closest("[data-forb]")) { S.orb = !S.orb; this.play(S.orb ? "select" : "unselect"); this.render(); return; }
    const pk = t.closest("[data-fpick]");
    if (pk) { const id = pk.dataset.fpick; S.pick = S.pick === id ? null : id; this.play(S.pick ? "select" : "unselect"); this.render(); if (S.pick) this.focusBench(); return; }
    if (t.closest("[data-fslot]") && S.pick) { S.pick = null; this.play("unselect"); this.render(); return; }
    if (t.closest("[data-fgo]")) this.fuse();
  },
  /* 폰 세로처럼 합성대가 목록 위에 있을 때: 고른 뒤 합성대가 보이게 */
  focusBench() { const b = this.S && this.S.el.querySelector(".fg-bench"); if (b && b.getBoundingClientRect().top < 0) b.scrollIntoView({ block: "start", behavior: "smooth" }); },
  async fuse() {
    const S = this.S; if (!S || !S.pick) return;
    const u = Store.user(), base = S.pick, mode = S.mode;
    S.busy = true;
    let r;
    try { r = mode === "up" ? Store.upgradeCard(u, UPGRADE_OF[base]) : Store.fuseRare(u, base, !!S.orb); } catch (e) { console.error(e); r = null; }
    if (!r || !r.ok) { S.busy = false; toast((r && r.msg) || "합성하지 못했습니다.", "warn"); this.render(); return; }
    const out = mode === "up" ? r.up : r.got;
    S.changed.add(base); S.changed.add(out);
    S.el.classList.add("fusing");
    await fuseFX(base, out, mode, r);
    if (!this.S) return;
    S.busy = false; S.el.classList.remove("fusing");
    if (S.orb && Store.orbs(u) < 1) S.orb = false;
    toast(`「${CARDS[out].name}」을(를) 얻었습니다.`, "good");
    this.render();
  }
};

/* 상점 · 덱 조정실 카드의 표식을 누르면(마우스 · 터치 · 키보드) 그 카드를 고른 합성소 */
document.addEventListener("click", e => {
  const t = e.target.closest && e.target.closest("[data-fuse]"); if (!t || (Forge.S && Forge.S.el.contains(t))) return;
  e.preventDefault(); e.stopPropagation();
  Forge.open({ pick: t.dataset.fuse || null, group: t.dataset.fuseG || "", mode: t.dataset.fuseM || "", from: t });
}, true);
document.addEventListener("keydown", e => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const t = e.target.closest && e.target.closest("span[data-fuse]"); if (!t) return;
  e.preventDefault(); e.stopPropagation(); t.click();
}, true);

/* 예전 이름(상점 · 덱 조정실 카드 창) */
const Upgrade = {
  upOf(id) { const c = CARDS[id]; if (!c) return null; if (c.base) return c.id; return typeof UPGRADE_OF !== "undefined" && UPGRADE_OF[id] || null; },
  kindOf(id) { return Forge.kindOf(id); },
  info(id) {
    const up = this.upOf(id); if (!up) return null;
    return { up, base: CARDS[up].base, check: Store.upgradeCheck(Store.user(), up) };
  },
  /* 카드 창의 단추 하나 { label, value: "upgrade" } — 관리자 · 필멸자는 null */
  button(id) {
    const u = Store.user(), k = Forge.kindOf(id); if (!k || !u || Store.allCards(u)) return null;
    const base = Forge.baseOf(id), ch = Forge.check(u, base);
    if (k === "up" && !ch.ok && !ch.seal && ch.free != null && ch.free >= Forge.cost()) return null;   // 강화 카드를 이미 가짐
    return ch.ok ? { label: k === "up" ? `업그레이드 (「${CARDS[base].name}」 ${Forge.cost()}장 → 「${CARDS[UPGRADE_OF[base]].name}」)` : `승화 (「${CARDS[base].name}」 ${Forge.cost()}장 → 레어 뽑기)`, value: "upgrade", cls: "primary upg-btn" + (k === "rare" ? " k-rare" : "") }
      : { label: "합성소에서 보기", value: "upgrade", cls: "upg-btn ghost" + (k === "rare" ? " k-rare" : "") };
  },
  note(id) {
    const u = Store.user(), k = Forge.kindOf(id); if (!k || !u || Store.allCards(u)) return "";
    const base = Forge.baseOf(id), b = CARDS[base], ch = Forge.check(u, base), N = Forge.cost();
    const what = k === "up" ? `「${esc(b.name)}」 ${N}장 → 「${esc(CARDS[UPGRADE_OF[base]].name)}」` : `「${esc(b.name)}」 ${N}장 → ${esc(GROUPS[b.group].name)} 레어 1장 (확률 뽑기)`;
    return `<span class="upg-note k-${k}"><i class="upg-ico">${fuseIcon(k)}</i> ${k === "up" ? "강화" : "승화"}: ${what} · 쓸 수 있는 재료 <b>${Math.min(ch.free || 0, N)}</b>/${N}${ch.ok ? "" : ` <em>${esc(ch.msg)}</em>`}</span>`;
  },
  /* 합성소를 열고(그 카드를 고른 채) 닫힐 때 { ok, ids, base, up } */
  async run(id) {
    if (!Forge.kindOf(id)) return { ok: false, msg: "합성할 수 있는 카드가 아닙니다." };
    return Forge.open({ pick: id });
  }
};

/* 합치기 연출: ① 재료 셋이 나란히 떠오름 → ② 흔들리며 가운데로 모여 빛이 차오름 → ③ 섬광 · 충격파 · 파편
   → ④ 빛기둥 속에서 새 카드가 떠오름(레어는 뒷면으로 떠올라 ⑤ 뒤집히며 푸른 빛). 누르면 건너뜀, 다 나온 뒤 누르면 끝.
   kind "up" 청록(강화) · "rare" 푸른빛(레어 등급 색). prefers-reduced-motion이면 바로 결과 */
function fuseFX(baseId, outId, kind, info) {
  kind = kind || "up";
  return new Promise(done => {
    const b = CARDS[baseId], c = CARDS[outId], rare = kind === "rare", N = typeof UPGRADE_COST !== "undefined" ? UPGRADE_COST : 3;
    const reduce = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = document.documentElement.classList.contains("mobile");
    const ov = document.createElement("div");
    const uq = rare && gradeOf(c) === "unique";
    ov.className = `upfx g-${kind}${uq ? " g-unique" : ""}${lite ? " lite" : ""}`;
    const nS = lite ? 14 : 28;
    const shards = Array.from({ length: nS }, (_, i) => { const a = (i / nS) * Math.PI * 2 + Math.random() * .3, d = 160 + Math.random() * 220; return `<i class="upfx-shard" style="--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--r:${Math.round(Math.random() * 720 - 360)}deg;--d:${(Math.random() * .25).toFixed(2)}s"></i>`; }).join("");
    const G = GRADES[gradeOf(c)] || GRADES.upgrade;
    const sub = rare ? `「${esc(b.name)}」 × ${N} → <b style="color:${G.color}">${G.name}</b> · Lv ${c.lv} · ${cardKindWord(c)}${info && info.p ? ` · 확률 ${(info.p * 100).toFixed(1)}%` : ""}`
      : `「${esc(b.name)}」 × ${N} → 강화 · Lv ${c.lv} · 유지비 ${c.up} · 어떤 아이템이든 장착`;
    ov.innerHTML = `<div class="upfx-stage">
        <div class="upfx-rays" aria-hidden="true"></div>
        <div class="upfx-trio">${[0, 1, 2].map(k => `<div class="upfx-src" style="--k:${k - 1}">${cardHTML(b, { size: "md" })}</div>`).join("")}</div>
        <div class="upfx-core" aria-hidden="true"></div><div class="upfx-ring" aria-hidden="true"></div><div class="upfx-ring r2" aria-hidden="true"></div>
        <div class="upfx-shards" aria-hidden="true">${shards}</div>
        <div class="upfx-flash" aria-hidden="true"></div>
        <div class="upfx-new"><div class="upfx-flip">${rare ? '<div class="upfx-back card-back" aria-hidden="true"></div>' : ""}<div class="upfx-front">${cardHTML(c, { size: "md" })}</div></div></div>
        <div class="upfx-cap"><p class="upfx-eye"><i class="upfx-mark">${fuseIcon(kind)}</i> ${uq ? "UNIQUE" : rare ? "RARE" : "UPGRADE"}</p><h3>「${esc(c.name)}」</h3><p class="upfx-sub">${sub}</p><button type="button" class="btn primary upfx-ok">확인</button></div>
        <button type="button" class="upfx-skip">건너뛰기 ›</button>
      </div>`;
    document.body.appendChild(ov);
    const T = [];
    const at = (ms, f) => T.push(setTimeout(f, ms));
    const play = n => { try { if (typeof FEEL !== "undefined") FEEL.play(n); } catch (e) {} };
    let ended = false, shown = false;
    const show = () => { if (shown) return; shown = true; T.forEach(clearTimeout); T.length = 0; ov.classList.add("s1", "s2", "s3", "s4", "s5", "fin"); };
    const key = e => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); shown ? end() : show(); } };
    const end = () => { if (ended) return; ended = true; T.forEach(clearTimeout); removeEventListener("keydown", key, true); ov.classList.add("out"); setTimeout(() => { ov.remove(); done(); }, 320); };
    addEventListener("keydown", key, true);
    if (reduce) { requestAnimationFrame(() => { show(); play("levelUp"); }); }
    else {
      requestAnimationFrame(() => ov.classList.add("s1"));
      at(80, () => play("ui_open"));
      at(750, () => { ov.classList.add("s2"); play("sp_buff"); });
      at(1650, () => { ov.classList.add("s3"); play("shatter"); });
      at(1780, () => play("sp_boom"));
      at(2150, () => { ov.classList.add("s4"); if (!rare) { shown = true; ov.classList.add("fin"); play("levelUp"); } });
      if (rare) at(2950, () => { ov.classList.add("s5", "fin"); shown = true; play("levelUp"); });
    }
    ov.addEventListener("click", e => { if (e.target.closest(".upfx-ok") || shown) end(); else show(); });
  });
}
/* 예전 이름 (v3.28) */
function upgradeFX(baseId, upId) { return fuseFX(baseId, upId, "up"); }
