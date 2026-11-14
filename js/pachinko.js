/* ETHERION — 크로네아의 수레바퀴 (운명의 신 크로네아에게 바치는 작은 도박. v0.9.3의 파칭코를 대기실로 옮기고 다시 입혔다)
   - 대기실 오른쪽 열 위. 대전(컴퓨터·원정)을 한 판 마칠 때마다 돌릴 기회(수레바퀴 표)를 1장 받는다 (Store user.spins).
   - v1.0: 전투 화면에서는 뺐다 (전장에 도박 기계가 상시 돌아가는 것은 톤에 맞지 않았다).
   - 문양: 9단체 문양 + 3진영 문장. 단체 문양 3개 = 100원(5%), 진영 문장 3개 = 800원(0.1%), 세 진영 문장이 전부 다르게 = 카드(0.01%).
     결과는 먼저 뽑고(economy.js pachinkoRoll) 릴을 거기에 맞춰 멈춘다.
   - 화면을 다시 그려도(render) 기계는 같은 DOM을 옮겨 붙이므로 돌아가던 릴이 끊기지 않는다 (rAF로 직접 움직인다). */
"use strict";

const Pachinko = {
  el: null, reels: [], spinning: false, raf: 0, audio: null, lastKey: "",
  SYM_H: 34,                         // 문양 한 칸 높이(px)
  symbols: [],                       // [{ key, kind: "group"|"faction", id, color, svg }]

  build() {
    this.symbols = GROUP_IDS.map(g => ({ key: g, kind: "group", id: g, color: GROUPS[g].color, svg: glyphSVG(GROUPS[g].glyph) }))
      .concat(Object.keys(FACTIONS).map(f => ({ key: f, kind: "faction", id: f, color: FACTIONS[f].color, svg: factionCrestSVG(f) })));
    const el = document.createElement("div");
    el.className = "pach";
    el.innerHTML = `<div class="pach-cab">
        <div class="pach-top"><span class="pach-name">KRONEA'S WHEEL · 크로네아의 수레바퀴</span><span class="pach-gold" id="pach-gold"></span></div>
        <div class="pach-win">
          ${[0, 1, 2].map(i => `<div class="pach-reel" data-r="${i}"><div class="pach-strip"></div></div>`).join("")}
          <div class="pach-line"></div><div class="pach-glass"></div>
        </div>
        <div class="pach-foot">
          <span class="pach-msg" id="pach-msg">대전 한 판마다 한 번</span>
          <button type="button" class="pach-btn" id="pach-btn" aria-label="수레바퀴 돌리기"><i></i><span>SPIN</span></button>
        </div>
        <div class="pach-fx"></div>
      </div>`;
    this.el = el;
    // 전장의 클릭·드래그 처리와 섞이지 않게
    for (const ev of ["click", "pointerdown", "dblclick", "mouseover"]) el.addEventListener(ev, e => e.stopPropagation());
    el.querySelector("#pach-btn").addEventListener("click", () => this.spin());
    this.reels = $$(".pach-reel", el).map(r => {
      const strip = r.querySelector(".pach-strip");
      // 문양 줄을 세 벌 이어 붙여 끝없이 도는 것처럼
      const order = shuffle(this.symbols.slice());
      strip.innerHTML = [...order, ...order, ...order].map(s => `<div class="pach-sym ${s.kind}" style="--sc:${s.color}">${s.svg}</div>`).join("");
      return { el: r, strip, order, pos: Math.floor(Math.random() * order.length), y: 0 };
    });
    for (const r of this.reels) this.setY(r, r.pos * this.SYM_H);
    return el;
  },
  /* 대기실이 그려질 때마다 붙인다 (같은 DOM을 옮겨 붙여 돌던 릴이 끊기지 않는다) */
  mount(host) {
    if (!host) return;
    if (!this.el) this.build();
    if (this.el.parentNode !== host) host.appendChild(this.el);
    this.refresh();
  },
  setY(r, y) { r.y = y; const n = r.order.length * this.SYM_H; const yy = ((y % n) + n) % n + n; r.strip.style.transform = `translateY(${-yy}px)`; },
  spins() { const u = Store.user(); return u ? (u.spins || 0) + (u.gspins || 0) : 0; },   // gspins: 서버 모드 필멸자가 이 기기에서 센 표 (js/net.js onMatchEnd)
  canSpin() { return !this.spinning && this.spins() > 0; },
  refresh() {
    if (!this.el) return;
    const u = Store.user();
    const gold = this.el.querySelector("#pach-gold"), btn = this.el.querySelector("#pach-btn"), msg = this.el.querySelector("#pach-msg");
    gold.textContent = u ? fmtGold(Store.gold(u)) : "";
    const ok = this.canSpin();
    btn.disabled = !ok;
    this.el.classList.toggle("armed", ok);
    if (!this.spinning && !this.holdMsg) { msg.textContent = ok ? `수레바퀴 표 ${this.spins()}장 · 돌릴 수 있음` : "표 없음 · 대전을 한 판 마치면 1장"; msg.className = "pach-msg"; }
  },

  /* ---------- 돌리기 ---------- */
  spin() {
    if (!this.canSpin()) return;
    const u = Store.user(); if (!u) return;
    const res = pachinkoRoll();
    if ((u.gspins || 0) > 0) u.gspins--; else u.spins = Math.max(0, (u.spins || 0) - 1);
    Store.save();
    if (Store.questEvent && !(typeof Net !== "undefined" && Net.on)) Store.questEvent(u, { k: "wheel" });   // v3.46 임무 (서버 모드는 서버의 wheelSpin이 센다)
    this.spinning = true; this.holdMsg = false;
    this.el.classList.remove("armed", "hit-group", "hit-faction", "hit-card");
    this.el.classList.add("spinning");
    this.el.querySelector("#pach-btn").disabled = true;
    const msg = this.el.querySelector("#pach-msg"); msg.textContent = "…"; msg.className = "pach-msg";
    if (typeof FEEL !== "undefined") FEEL.play("pach_spin");
    const cab = this.el.querySelector(".pach-cab");
    cab.animate([{ transform: "translateY(0)" }, { transform: "translateY(2px)" }, { transform: "translateY(0)" }], { duration: 160 });

    // 각 릴이 멈출 문양 고르기
    const targets = this.targetsFor(res);
    const H = this.SYM_H, N = this.symbols.length;
    const now = performance.now();
    const plans = this.reels.map((r, i) => {
      const idx = r.order.findIndex(s => s.key === targets[i]);
      const laps = 3 + i;                                   // 릴마다 더 오래 돈다
      const from = r.y;
      const cur = ((Math.round(from / H) % N) + N) % N;
      const steps = laps * N + ((idx - cur + N) % N);
      return { r, i, from, to: from + steps * H, t0: now + i * 90, dur: 1150 + i * 420, lastTick: -1, done: false };
    });
    const ease = t => 1 - Math.pow(1 - t, 3.2);
    const tick = tNow => {
      let all = true;
      for (const p of plans) {
        if (p.done) continue;
        const t = Math.min(1, Math.max(0, (tNow - p.t0) / p.dur));
        let y = p.from + (p.to - p.from) * ease(t);
        // 멈추기 직전 살짝 넘겼다가 되돌아오는 손맛
        if (t > 0.93) y += Math.sin((t - 0.93) / 0.07 * Math.PI) * H * 0.28;
        this.setY(p.r, y);
        const k = Math.floor(y / H);
        if (k !== p.lastTick) { p.lastTick = k; if (typeof FEEL !== "undefined") FEEL.play("pach_tick", t > 0.85 ? 0.95 : 0.65, (p.i - 1) * 0.35); }
        p.r.el.classList.toggle("blur", t < 0.8);
        if (t >= 1) { p.done = true; this.setY(p.r, p.to); p.r.el.classList.remove("blur"); p.r.el.classList.add("stop"); setTimeout(() => p.r.el.classList.remove("stop"), 220); if (typeof FEEL !== "undefined") FEEL.play("pach_stop", 1, 1 + p.i * 0.12); }
        else all = false;
      }
      if (!all) this.raf = requestAnimationFrame(tick);
      else this.finish(res);
    };
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(tick);
  },
  /* 결과에 맞는 세 문양 */
  targetsFor(res) {
    const fac = Object.keys(FACTIONS);
    if (res.kind === "group") return [res.id, res.id, res.id];
    if (res.kind === "faction") return [res.id, res.id, res.id];
    if (res.kind === "card") return shuffle(fac.slice());
    for (;;) {
      const t = [0, 1, 2].map(() => pick(this.symbols).key);
      const allSame = t[0] === t[1] && t[1] === t[2];
      const rainbow = t.every(k => FACTIONS[k]) && new Set(t).size === 3;
      if (!allSame && !rainbow) return t;
    }
  },
  finish(res) {
    this.spinning = false;
    this.el.classList.remove("spinning");
    const msg = this.el.querySelector("#pach-msg");
    const u = Store.user();
    this.holdMsg = true;
    if (res.kind === "miss") { msg.textContent = "크로네아는 침묵했다"; msg.className = "pach-msg"; if (typeof FEEL !== "undefined") FEEL.play("pach_miss"); }
    else if (res.kind === "group") {
      Store.addGold(u, res.gold, "수레바퀴 단체 당첨");
      msg.textContent = `${GROUPS[res.id].name} · +${fmtGold(res.gold)}`; msg.className = "pach-msg win";
      this.el.classList.add("hit-group"); this.chime(1);
    } else if (res.kind === "faction") {
      Store.addGold(u, res.gold, "수레바퀴 진영 당첨");
      msg.textContent = `${FACTIONS[res.id].name}! +${fmtGold(res.gold)}`; msg.className = "pach-msg win big";
      this.el.classList.add("hit-faction"); this.celebrate(FACTIONS[res.id].color); this.chime(2);
    } else {
      const c = CARDS[res.card];
      Store.grantCard(u, res.card);
      msg.textContent = `카드 당첨! ${c.name}`; msg.className = "pach-msg win big";
      this.el.classList.add("hit-card"); this.celebrate("#8fdcff"); this.chime(3);
      setTimeout(() => showCardModal(c, [{ label: "확인", value: true }], "수레바퀴에 세 진영의 문장이 모두 나왔습니다. 이 카드를 보유 목록에 넣었습니다."), 900);
    }
    const chip = document.querySelector(".gold-chip b"); if (chip) chip.textContent = fmtGold(Store.gold(u));
    this.refresh();
    setTimeout(() => { this.holdMsg = false; this.refresh(); }, 4000);
  },
  chime(level) {
    if (typeof FEEL !== "undefined") FEEL.play("pach_win", 1, level || 1);
  },
  /* 0.1%부터: 기계 위로 작은 축하 불꽃 */
  celebrate(color, host) {
    const box = (host || this.el).querySelector(".pach-fx"); if (!box || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const r = box.getBoundingClientRect();
    for (let i = 0; i < 22; i++) {
      const s = document.createElement("i");
      s.style.background = i % 3 === 0 ? "#f6e2a8" : color;
      box.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = 26 + Math.random() * 48;
      s.animate([
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d - 18}px)) scale(.2) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], { duration: 650 + Math.random() * 500, delay: Math.random() * 120, easing: "cubic-bezier(.2,.8,.3,1)", fill: "forwards" }).onfinish = () => s.remove();
    }
    const flash = document.createElement("b"); box.appendChild(flash);
    flash.animate([{ opacity: .85 }, { opacity: 0 }], { duration: 500, fill: "forwards" }).onfinish = () => flash.remove();
  }
};

/* 진영 문장 (단체 문양과 헷갈리지 않게 따로): 마름모 룬 고리 안에 작은 원 셋(세 단체) */
/* 진영 문장 (v3.33): 진영마다 실루엣이 다르다 — 셋 다 "세 단체"를 셋으로 품는다.
   아다만트 = 톱니바퀴 + 가운데 세 리벳 · 푸른숲 = 세 잎 · 비술 = 초승달 + 별 셋.
   (예전에는 셋 다 같은 마름모에 가운데 표시만 달라 파친코 릴에서 색으로만 갈렸다) */
function factionCrestSVG(f) {
  const leaf = 'M32 33C23 25 24 12 32 4c8 8 9 21 0 29z';
  const star = (x, y, r) => `<path d="M${x} ${y - r}L${x + r * .32} ${y - r * .32} ${x + r} ${y} ${x + r * .32} ${y + r * .32} ${x} ${y + r} ${x - r * .32} ${y + r * .32} ${x - r} ${y} ${x - r * .32} ${y - r * .32}z"/>`;
  const art = {
    brass: `<circle cx="32" cy="32" r="23" fill="none" stroke="currentColor" stroke-width="8" stroke-dasharray="7.2 7.2"/>
      <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" stroke-width="6"/>
      <circle cx="32" cy="25" r="3.6"/><circle cx="25.9" cy="35.5" r="3.6"/><circle cx="38.1" cy="35.5" r="3.6"/>`,
    verdant: `<g><path d="${leaf}"/><path d="${leaf}" transform="rotate(120 32 33)"/><path d="${leaf}" transform="rotate(240 32 33)"/></g>
      <g stroke="#000" stroke-opacity=".4" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M32 30V10"/><path d="M32 30V10" transform="rotate(120 32 33)"/><path d="M32 30V10" transform="rotate(240 32 33)"/></g>
      <circle cx="32" cy="33" r="4.5"/>`,
    arcane: `<path d="M32.8 6.1A26 26 0 1 0 53.9 42.3 21 21 0 0 1 32.8 6.1z"/>
      ${star(44, 17, 5.5)}${star(52, 28, 7)}${star(41, 34, 5)}`
  };
  return `<svg viewBox="0 0 64 64" aria-hidden="true" fill="currentColor">${art[f] || ""}</svg>`;
}
