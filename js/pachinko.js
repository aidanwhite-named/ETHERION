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
  spins() { const u = Store.user(); return u ? (u.spins || 0) : 0; },
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

  /* ---------- 소리: 아주 작은 클릭과 틱 (WebAudio, 파일 없음) ---------- */
  ctx() {
    if (this.audio === false) return null;
    try { this.audio = this.audio || new (window.AudioContext || window.webkitAudioContext)(); return this.audio; } catch (e) { this.audio = false; return null; }
  },
  blip(freq, dur, vol, type) {
    const ac = this.ctx(); if (!ac) return;
    if (ac.state === "suspended") ac.resume();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type || "square"; o.frequency.setValueAtTime(freq, ac.currentTime);
    g.gain.setValueAtTime(vol || 0.04, ac.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + (dur || 0.05));
    o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + (dur || 0.05) + 0.01);
  },

  /* ---------- 돌리기 ---------- */
  spin() {
    if (!this.canSpin()) return;
    const u = Store.user(); if (!u) return;
    const res = pachinkoRoll();
    u.spins = Math.max(0, (u.spins || 0) - 1); Store.save();
    this.spinning = true; this.holdMsg = false;
    this.el.classList.remove("armed", "hit-group", "hit-faction", "hit-card");
    this.el.classList.add("spinning");
    this.el.querySelector("#pach-btn").disabled = true;
    const msg = this.el.querySelector("#pach-msg"); msg.textContent = "…"; msg.className = "pach-msg";
    this.blip(180, 0.08, 0.06, "triangle"); setTimeout(() => this.blip(120, 0.1, 0.05, "triangle"), 60);
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
      return { r, from, to: from + steps * H, t0: now + i * 90, dur: 1150 + i * 420, lastTick: -1, done: false };
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
        if (k !== p.lastTick) { p.lastTick = k; if (t < 0.9 || k % 1 === 0) this.blip(900 + Math.random() * 300, 0.012, t > 0.85 ? 0.03 : 0.012); }
        p.r.el.classList.toggle("blur", t < 0.8);
        if (t >= 1) { p.done = true; this.setY(p.r, p.to); p.r.el.classList.remove("blur"); p.r.el.classList.add("stop"); setTimeout(() => p.r.el.classList.remove("stop"), 220); this.blip(260, 0.05, 0.05, "triangle"); }
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
    if (res.kind === "miss") { msg.textContent = "크로네아는 침묵했다"; msg.className = "pach-msg"; }
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
    const notes = level === 1 ? [660, 880] : level === 2 ? [523, 659, 784, 1047] : [523, 659, 784, 1047, 1319, 1568];
    notes.forEach((f, i) => setTimeout(() => this.blip(f, 0.18, 0.05, "sine"), i * 90));
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
function factionCrestSVG(f) {
  const marks = { brass: '<path d="M32 18l5 9h-10z"/>', verdant: '<circle cx="32" cy="22" r="4.5"/>', arcane: '<path d="M32 17l2 4 4 .5-3 3 .8 4.2-3.8-2-3.8 2 .8-4.2-3-3 4-.5z"/>' };
  return `<svg viewBox="0 0 64 64" aria-hidden="true" fill="currentColor">
    <path d="M32 4 60 32 32 60 4 32z" fill="none" stroke="currentColor" stroke-width="3.5"/>
    <path d="M32 12 52 32 32 52 12 32z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2.5 3" opacity=".75"/>
    ${marks[f] || ""}
    <circle cx="22" cy="36" r="4"/><circle cx="32" cy="42" r="4"/><circle cx="42" cy="36" r="4"/>
    <path d="M22 36h20" stroke="#000" stroke-opacity=".4" stroke-width="2"/>
  </svg>`;
}
