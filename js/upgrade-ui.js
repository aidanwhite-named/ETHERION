/* ETHERION — 업그레이드 화면 (v3.28)
   같은 카드 3장 → 강화 카드 1장. 규칙은 Store.upgradeCard(js/economy.js), 카드는 js/upgrades.js.
   - Upgrade.info(id): 원래 카드든 강화 카드든 { up, base, check } — 상점 · 덱 조정실이 단추를 켜고 끌 때
   - Upgrade.run(upId): 확인 창 → 합치기 → 연출(upgradeFX) → 끝나면 { ok, ... }
   - upgradeFX(baseId, upId): 원래 카드 3장이 모여 부서지고 강화 카드 1장이 떠오르는 연출(css/upgrade.css). 누르면 바로 끝. */
"use strict";

const Upgrade = {
  /* 이 카드와 이어진 강화 카드. 원래 카드면 UPGRADE_OF, 강화 카드면 그 자신 */
  upOf(id) { const c = CARDS[id]; if (!c) return null; if (c.base) return c.id; return typeof UPGRADE_OF !== "undefined" && UPGRADE_OF[id] || null; },
  info(id) {
    const up = this.upOf(id); if (!up) return null;
    const u = Store.user();
    return { up, base: CARDS[up].base, check: Store.upgradeCheck(u, up) };
  },
  /* 카드 창의 단추 하나 { label, value: "upgrade" } — 할 수 없으면 null(그 이유는 note로) */
  button(id) {
    const i = this.info(id); if (!i || Store.allCards(Store.user())) return null;
    return i.check.ok ? { label: `업그레이드 (「${CARDS[i.base].name}」 ${UPGRADE_COST}장 → 「${CARDS[i.up].name}」)`, value: "upgrade", cls: "primary upg-btn" } : null;
  },
  note(id) {
    const i = this.info(id); if (!i || Store.allCards(Store.user())) return "";
    const b = CARDS[i.base], c = CARDS[i.up];
    return `<span class="upg-note">${upgradeMarkHTML(c, "upg-ico")} 업그레이드: 「${esc(b.name)}」 ${UPGRADE_COST}장 → 「${esc(c.name)}」 · 쓸 수 있는 재료 <b>${Math.min(i.check.free, UPGRADE_COST)}</b>/${UPGRADE_COST}${i.check.ok ? "" : ` <em>${esc(i.check.msg)}</em>`}</span>`;
  },
  async run(id) {
    const u = Store.user(), i = this.info(id);
    if (!i) return { ok: false, msg: "업그레이드할 수 있는 카드가 아닙니다." };
    if (!i.check.ok) { toast(i.check.msg, "warn"); return i.check; }
    const b = CARDS[i.base], c = CARDS[i.up];
    const ok = await modal(`<h3>업그레이드</h3>
      <div class="upg-ask"><div class="upg-from">${cardHTML(b, { size: "md" })}<b>× ${UPGRADE_COST}</b></div><i class="upg-arrow" aria-hidden="true">➜</i><div class="upg-to">${cardHTML(c, { size: "md" })}</div></div>
      <p>「${esc(b.name)}」 ${UPGRADE_COST}장이 사라지고 강화 카드 「${esc(c.name)}」 1장이 됩니다. 되돌릴 수 없습니다.</p>
      <p class="muted small">레벨 ${b.lv} → ${c.lv} · 유지비 ${b.up} → ${c.up} · 클래스 없음(어떤 아이템이든 장착) · 덱에 1장. 저장한 덱 · 덱 초안에 든 장수는 재료로 쓰지 않습니다.</p>`,
      [{ label: "취소", value: false }, { label: "합친다", value: true, cls: "primary" }], { cls: "wide-modal upg-modal" });
    if (!ok) return { ok: false, cancel: true };
    const r = Store.upgradeCard(u, i.up);
    if (!r || !r.ok) { toast((r && r.msg) || "업그레이드하지 못했습니다.", "warn"); return r || { ok: false }; }
    await upgradeFX(i.base, i.up);
    toast(`「${c.name}」을(를) 얻었습니다.`, "good");
    return r;
  }
};

/* 합치기 연출: ① 원래 카드 셋이 나란히 떠오름 → ② 흔들리며 가운데로 모여 겹치고 빛이 차오름 → ③ 섬광 · 충격파 · 파편, 셋이 부서져 사라짐
   → ④ 빛기둥과 회전하는 빛살 속에서 강화 카드가 떠오르고 이름이 새겨짐. 누르면 끝(①~③ 중에는 ④로 건너뜀) */
function upgradeFX(baseId, upId) {
  return new Promise(done => {
    const b = CARDS[baseId], c = CARDS[upId];
    const reduce = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ov = document.createElement("div");
    ov.className = "upfx";
    const shards = Array.from({ length: 28 }, (_, i) => { const a = (i / 28) * Math.PI * 2 + Math.random() * .3, d = 160 + Math.random() * 220; return `<i class="upfx-shard" style="--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--r:${Math.round(Math.random() * 720 - 360)}deg;--d:${(Math.random() * .25).toFixed(2)}s"></i>`; }).join("");
    ov.innerHTML = `<div class="upfx-stage">
        <div class="upfx-rays" aria-hidden="true"></div>
        <div class="upfx-trio">${[0, 1, 2].map(k => `<div class="upfx-src" style="--k:${k - 1}">${cardHTML(b, { size: "md" })}</div>`).join("")}</div>
        <div class="upfx-core" aria-hidden="true"></div><div class="upfx-ring" aria-hidden="true"></div><div class="upfx-ring r2" aria-hidden="true"></div>
        <div class="upfx-shards" aria-hidden="true">${shards}</div>
        <div class="upfx-flash" aria-hidden="true"></div>
        <div class="upfx-new">${cardHTML(c, { size: "md" })}</div>
        <div class="upfx-cap"><p class="upfx-eye">${upgradeMarkHTML(c, "upfx-mark")} UPGRADE</p><h3>「${esc(c.name)}」</h3><p class="upfx-sub">「${esc(b.name)}」 × ${UPGRADE_COST} → 강화 · Lv ${c.lv} · 유지비 ${c.up} · 어떤 아이템이든 장착</p><button type="button" class="btn primary upfx-ok">확인</button></div>
      </div>`;
    document.body.appendChild(ov);
    const T = [];
    const at = (ms, f) => T.push(setTimeout(f, reduce ? Math.min(ms, 200) : ms));
    const play = n => { try { if (typeof FEEL !== "undefined") FEEL.play(n); } catch (e) {} };
    let ended = false, shown = false;
    const show = () => { if (shown) return; shown = true; T.forEach(clearTimeout); T.length = 0; ov.classList.add("s1", "s2", "s3", "s4"); };
    const end = () => { if (ended) return; ended = true; T.forEach(clearTimeout); ov.classList.add("out"); setTimeout(() => { ov.remove(); done(); }, 320); };
    requestAnimationFrame(() => ov.classList.add("s1"));
    at(80, () => play("ui_open"));
    at(750, () => { ov.classList.add("s2"); play("sp_buff"); });
    at(1650, () => { ov.classList.add("s3"); play("shatter"); });
    at(1780, () => play("sp_boom"));
    at(2150, () => { ov.classList.add("s4"); shown = true; play("levelUp"); });
    ov.addEventListener("click", e => { if (e.target.closest(".upfx-ok") || shown) end(); else show(); });
    addEventListener("keydown", function k(e) { if (e.key === "Escape" || e.key === "Enter") { removeEventListener("keydown", k, true); end(); } }, true);
  });
}
