/* ETHERION — 전장 오른쪽(내 덱 왼쪽)의 작은 게임 상자 (파친코 · 결정 키우기)
   - v1.4.1: 소각장이 왼쪽 열로 가고, 상자는 그 자리(내 덱 옆, 카드 한 장 크기)로 옮겼다.
   - 탭 하나에 게임 하나. 파친코와 결정 키우기 모두 "라운드(공격 턴 + 방어 턴)에 한 번"(v1.8). 안 한 차례는 그냥 지나간다.
   - 파친코 (v1.4.1, 용의 눈 대신): 릴 셋에 9단체 문양 + 3진영 문장. 누르면 돌고 저절로 멈춘다(집중할 필요 없음).
     확률·상금은 economy.js ECON.pachinko 그대로 — 단체 문양 셋 5% = 100, 진영 문장 셋 0.1% = 800, 세 진영 문장이 모두 다르게 0.01% = 카드 1장.
     결과를 먼저 뽑고(pachinkoRoll) 릴을 거기에 맞춰 멈춘다. 대기실 수레바퀴(pachinko.js)와 같은 방식.
   - 결정 키우기: 라운드마다 한 번 물을 준다(v1.8, 전엔 턴마다). 5라운드 연속이면 결정이 여물어 300원. 한 라운드라도 거르면 처음부터.
   - 소리·축하 불꽃은 pachinko.js(대기실 수레바퀴)의 blip·chime·celebrate를 같이 쓴다.
   - 화면을 다시 그려도(render) 같은 DOM을 옮겨 붙여 진행 중인 움직임이 끊기지 않는다. */
"use strict";

const ARCADE_PRIZE = { crystal: 300, crystalTurns: 5 };

const Arcade = {
  el: null, tab: "slot",
  TABS: [["slot", "파친코"], ["seed", "결정"]],
  build() {
    const el = document.createElement("div");
    el.className = "arcade";
    el.innerHTML = `<div class="arc-tabs" role="tablist">${this.TABS.map(([k, l]) => `<button type="button" class="arc-tab${k === this.tab ? " on" : ""}" data-tab="${k}" role="tab">${l}</button>`).join("")}<span class="arc-weather"></span></div>
      <div class="arc-body">${this.TABS.map(([k]) => `<div class="arc-pane" data-pane="${k}"${k === this.tab ? "" : " hidden"}></div>`).join("")}</div>`;
    for (const ev of ["click", "pointerdown", "dblclick", "mouseover"]) el.addEventListener(ev, e => e.stopPropagation());
    el.querySelector(".arc-tabs").addEventListener("click", e => { const b = e.target.closest("[data-tab]"); if (b) this.show(b.dataset.tab); });
    this.el = el;
    el.querySelector('[data-pane="slot"]').appendChild(Slot.build());
    el.querySelector('[data-pane="seed"]').appendChild(Crystal.build());
    return el;
  },
  show(k) {
    this.tab = k;
    $$(".arc-tab", this.el).forEach(b => b.classList.toggle("on", b.dataset.tab === k));
    $$(".arc-pane", this.el).forEach(p => { p.hidden = p.dataset.pane !== k; });
    if (k === "slot") Slot.fit();
  },
  /* 내 덱 왼쪽 자리(.arc-host)에 붙인다 */
  mount(board) {
    if (!board || !G) return;
    const host = board.querySelector(".frow-bot .arc-host");
    if (!host) return;
    if (!this.el) this.build();
    if (this.el.parentNode !== host) host.appendChild(this.el);
    this.refresh();
    Slot.fit();
  },
  place() {},
  reserve() { return 0; },
  refresh() {
    if (!this.el) return;
    Slot.refresh(); Crystal.refresh();
    const wc = this.el.querySelector(".arc-weather");
    if (wc && typeof Weather !== "undefined") { const K = Weather.info(); wc.innerHTML = `<i>${K.icon}</i>`; wc.title = `날씨: ${K.name}\n${K.line}`; }
    // 할 수 있는 게임이 남아 있으면 탭에 점을 찍는다
    const can = { slot: Slot.can(), seed: Crystal.can() };
    $$(".arc-tab", this.el).forEach(b => b.classList.toggle("ready", !!can[b.dataset.tab]));
  },
  /* 당첨 공통: 지갑·기록·작은 소리 */
  award(gold, why, cls) {
    const u = Store.user(); if (!u || !G) return;
    Store.addGold(u, gold, why); G.econ.pach += gold;
    log(`${why} · +${fmtGold(gold)}`, cls || "sys");
  }
};

/* ---------- 파친코 (릴 셋) ---------- */
const Slot = {
  el: null, reels: [], spinning: false, raf: 0, H: 30, symbols: [],
  build() {
    this.symbols = GROUP_IDS.map(g => ({ key: g, kind: "group", color: GROUPS[g].color, svg: glyphSVG(GROUPS[g].glyph) }))
      .concat(Object.keys(FACTIONS).map(f => ({ key: f, kind: "faction", color: FACTIONS[f].color, svg: factionCrestSVG(f) })));
    const el = document.createElement("div");
    el.className = "slot-m";
    el.innerHTML = `<div class="sm-top"><span class="sm-name">PACHINKO</span></div>
      <div class="sm-win">${[0, 1, 2].map(i => `<div class="sm-reel" data-r="${i}"><div class="sm-strip"></div></div>`).join("")}<div class="sm-line"></div></div>
      <div class="pach-fx"></div>
      <p class="sm-msg" id="sm-msg">라운드마다 한 번</p>
      <button type="button" class="pach-btn sm-btn" id="sm-btn"><i></i><span>SPIN</span></button>`;
    el.querySelector("#sm-btn").addEventListener("click", () => this.spin());
    this.el = el;
    this.reels = $$(".sm-reel", el).map(r => {
      const strip = r.querySelector(".sm-strip");
      const order = shuffle(this.symbols.slice());
      strip.innerHTML = [...order, ...order, ...order].map(s => `<div class="sm-sym ${s.kind}" style="--sc:${s.color}">${s.svg}</div>`).join("");
      return { el: r, strip, order, pos: Math.floor(Math.random() * order.length), y: 0 };
    });
    return el;
  },
  /* 릴 한 칸 높이 = 창 높이 (상자 크기가 카드 크기를 따라 바뀐다) */
  fit() {
    if (!this.el || this.spinning) return;
    const win = this.el.querySelector(".sm-win"), h = win && win.clientHeight;
    if (!h) return;
    if (Math.abs(h - this.H) < 0.5 && this.el.style.getPropertyValue("--sym")) return;
    this.H = h; this.el.style.setProperty("--sym", h + "px");
    for (const r of this.reels) this.setY(r, r.pos * this.H);
  },
  setY(r, y) { r.y = y; const n = r.order.length * this.H; const yy = ((y % n) + n) % n + n; r.strip.style.transform = `translateY(${-yy}px)`; },
  /* v1.8: 라운드(공격 턴 + 방어 턴)마다 한 번. G.econ.pachTurn에는 돌린 라운드 번호를 적는다 */
  round() { return typeof roundOf === "function" ? roundOf(G.turn) : Math.ceil(G.turn / 2); },
  can() { return !!G && G.phase !== "over" && !this.spinning && G.econ && G.econ.pachTurn !== this.round(); },
  refresh() {
    if (!this.el || !G) return;
    const ok = this.can(), btn = this.el.querySelector("#sm-btn"), msg = this.el.querySelector("#sm-msg");
    btn.disabled = !ok;
    this.el.classList.toggle("armed", ok);
    if (!this.spinning && (!this.el.dataset.hold || +this.el.dataset.hold !== this.round())) {
      delete this.el.dataset.hold;
      msg.textContent = G.phase === "over" ? "경기 종료" : ok ? `라운드 ${this.round()} · 돌릴 수 있음` : "다음 라운드에";
      msg.className = "sm-msg";
    }
  },
  spin() {
    if (!this.can()) return;
    this.fit();
    G.econ.pachTurn = this.round();
    const res = pachinkoRoll();
    this.spinning = true; this.el.dataset.hold = this.round();
    this.el.classList.remove("armed", "hit-group", "hit-faction", "hit-card");
    this.el.classList.add("spinning");
    this.el.querySelector("#sm-btn").disabled = true;
    const msg = this.el.querySelector("#sm-msg"); msg.textContent = "…"; msg.className = "sm-msg";
    Pachinko.blip(180, 0.08, 0.06, "triangle"); setTimeout(() => Pachinko.blip(120, 0.1, 0.05, "triangle"), 60);
    Arcade.refresh();
    const targets = Pachinko.targetsFor.call({ symbols: this.symbols }, res);
    const H = this.H, N = this.symbols.length, now = performance.now();
    const plans = this.reels.map((r, i) => {
      const idx = r.order.findIndex(s => s.key === targets[i]);
      const from = r.y, cur = ((Math.round(from / H) % N) + N) % N;
      const steps = (3 + i) * N + ((idx - cur + N) % N);
      r.pos = idx;
      return { r, from, to: from + steps * H, t0: now + i * 90, dur: 1150 + i * 420, lastTick: -1, done: false };
    });
    const ease = t => 1 - Math.pow(1 - t, 3.2);
    const tick = tNow => {
      let all = true;
      for (const p of plans) {
        if (p.done) continue;
        const t = Math.min(1, Math.max(0, (tNow - p.t0) / p.dur));
        let y = p.from + (p.to - p.from) * ease(t);
        if (t > 0.93) y += Math.sin((t - 0.93) / 0.07 * Math.PI) * H * 0.28;
        this.setY(p.r, y);
        const k = Math.floor(y / H);
        if (k !== p.lastTick) { p.lastTick = k; Pachinko.blip(900 + Math.random() * 300, 0.012, t > 0.85 ? 0.03 : 0.012); }
        p.r.el.classList.toggle("blur", t < 0.8);
        if (t >= 1) { p.done = true; this.setY(p.r, p.to); p.r.el.classList.remove("blur"); Pachinko.blip(260, 0.05, 0.05, "triangle"); }
        else all = false;
      }
      if (!all) this.raf = requestAnimationFrame(tick); else this.finish(res);
    };
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(tick);
  },
  finish(res) {
    this.spinning = false;
    this.el.classList.remove("spinning");
    const msg = this.el.querySelector("#sm-msg");
    if (!G) return;
    if (res.kind === "miss") { msg.textContent = "꽝 · 다음 라운드에"; msg.className = "sm-msg"; Pachinko.blip(140, 0.12, 0.05, "triangle"); }
    else if (res.kind === "group") {
      msg.textContent = `+${fmtGold(res.gold)}`; msg.className = "sm-msg win";
      this.el.classList.add("hit-group"); Pachinko.chime(1);
      Arcade.award(res.gold, `파친코: ${GROUPS[res.id].name} 문양 셋`);
    } else if (res.kind === "faction") {
      msg.textContent = `대박! +${fmtGold(res.gold)}`; msg.className = "sm-msg win big";
      this.el.classList.add("hit-faction"); Pachinko.chime(2); Pachinko.celebrate(FACTIONS[res.id].color, this.el);
      Arcade.award(res.gold, `파친코: ${FACTIONS[res.id].name} 문장 셋`, "turn");
    } else {
      const u = Store.user(), c = CARDS[res.card];
      if (u) Store.grantCard(u, res.card);
      msg.textContent = `카드! ${c.name}`; msg.className = "sm-msg win big";
      this.el.classList.add("hit-card"); Pachinko.chime(3); Pachinko.celebrate("#8fdcff", this.el);
      log(`파친코: 세 진영의 문장 — 카드 「${c.name}」을(를) 얻었다`, "turn");
    }
    Arcade.refresh();
  }
};

/* ---------- 결정 키우기 ---------- */
const Crystal = {
  el: null,
  build() {
    const el = document.createElement("div");
    el.className = "seed";
    el.title = `${ARCADE_PRIZE.crystalTurns}라운드 연속으로 물을 주면 ${fmtGold(ARCADE_PRIZE.crystal)}. 한 라운드라도 거르면 처음부터.`;
    el.innerHTML = `<div class="seed-top"><span class="seed-name">ETHER SEED</span></div>
      <div class="seed-body"><div class="seed-pot" id="seed-pot"></div>
        <div class="pach-fx"></div><div class="seed-steps">${Array.from({ length: ARCADE_PRIZE.crystalTurns }, (_, i) => `<i data-i="${i}"></i>`).join("")}</div></div>
      <p class="seed-msg" id="seed-msg">라운드마다 한 번 물을 준다</p><button type="button" class="pach-btn seed-btn" id="seed-btn"><i></i><span>WATER</span></button>`;
    el.querySelector("#seed-btn").addEventListener("click", () => this.water());
    this.el = el;
    return el;
  },
  /* v1.8: 라운드(공격 턴 + 방어 턴)마다 한 번. seed.last·wilted에는 라운드 번호를 적는다 */
  round() { return Slot.round(); },
  state() { if (!G.econ.seed) G.econ.seed = { last: 0, streak: 0 }; return G.econ.seed; },
  can() { if (!G || G.phase === "over" || !G.econ) return false; const s = this.state(); return s.last !== this.round(); },
  /* 거른 턴이 있으면 처음부터 */
  check() { const s = this.state(); const R = this.round(); if (s.streak && s.last < R - 1) { s.streak = 0; s.wilted = R; } return s; },
  refresh() {
    if (!this.el || !G) return;
    const s = this.check(), ok = this.can();
    const btn = this.el.querySelector("#seed-btn"), msg = this.el.querySelector("#seed-msg");
    btn.disabled = !ok;
    this.el.classList.toggle("armed", ok);
    this.el.dataset.stage = s.streak;
    $$(".seed-steps i", this.el).forEach((d, i) => d.classList.toggle("on", i < s.streak));
    this.el.querySelector("#seed-pot").innerHTML = this.plantSVG(s.streak);
    if (!this.el.dataset.hold || +this.el.dataset.hold !== this.round()) {
      delete this.el.dataset.hold;
      if (G.phase === "over") msg.textContent = "경기 종료";
      else if (s.wilted === this.round() && s.streak === 0 && ok) msg.textContent = "시들었다 · 다시";
      else if (ok) msg.textContent = s.streak ? `${s.streak}/${ARCADE_PRIZE.crystalTurns} · 물 줄 차례` : "씨앗에 물을";
      else msg.textContent = `${s.streak}/${ARCADE_PRIZE.crystalTurns} · 다음 라운드에`;
      msg.className = "seed-msg";
    }
  },
  water() {
    if (!this.can()) return;
    const s = this.check();
    const R = this.round();
    s.streak = (s.last === R - 1 || s.streak === 0) ? s.streak + 1 : 1;
    s.last = R; delete s.wilted;
    this.el.dataset.hold = R;
    const msg = this.el.querySelector("#seed-msg");
    Pachinko.blip(520, 0.1, 0.035, "sine"); setTimeout(() => Pachinko.blip(700, 0.12, 0.03, "sine"), 70);
    const pot = this.el.querySelector("#seed-pot");
    pot.animate([{ transform: "scale(1)" }, { transform: "scale(1.12)" }, { transform: "scale(1)" }], { duration: 320, easing: "ease-out" });
    if (s.streak >= ARCADE_PRIZE.crystalTurns) {
      s.streak = 0;
      msg.textContent = `여물었다! +${fmtGold(ARCADE_PRIZE.crystal)}`; msg.className = "seed-msg win big";
      this.el.classList.add("bloom"); setTimeout(() => this.el.classList.remove("bloom"), 1600);
      Pachinko.chime(3); Pachinko.celebrate("#8fdcff", this.el);
      Arcade.award(ARCADE_PRIZE.crystal, "에테르 결정이 여물었다", "turn");
      pot.innerHTML = this.plantSVG(ARCADE_PRIZE.crystalTurns);
      setTimeout(() => this.refresh(), 1500);
      return;
    }
    msg.textContent = `물을 주었다 · ${s.streak}/${ARCADE_PRIZE.crystalTurns}`; msg.className = "seed-msg win";
    Arcade.refresh();
    this.el.querySelector("#seed-msg").textContent = `물을 주었다 · ${s.streak}/${ARCADE_PRIZE.crystalTurns}`;
  },
  /* 단계별 그림: 0 씨앗 → 1 싹 → 2 줄기 → 3 봉오리 → 4 작은 결정 → 5 여문 결정 */
  plantSVG(n) {
    const soil = '<path d="M10 54q22-6 44 0v6H10z" fill="#2a2416"/><path d="M12 54q20-5 40 0" fill="none" stroke="#5a4a2a" stroke-width="1.5"/>';
    const stem = h => `<path d="M32 54V${54 - h}" stroke="#58b85f" stroke-width="2.5" stroke-linecap="round"/>`;
    const leaf = (y, dir) => `<path d="M32 ${y}q${dir * 10} -6 ${dir * 12} 2q-${dir * 7} 4 -${dir * 12} -2z" fill="#6fae55"/>`;
    const crystal = (s, glow) => `<g transform="translate(32 ${54 - 22 - s * 2}) scale(${s})">${glow ? '<circle r="9" fill="#8fdcff" opacity=".22"/>' : ""}<path d="M0-8 5-2 3 7h-6l-2-9z" fill="#6cc9f2"/><path d="M0-8 5-2 0 2z" fill="#f2fcff" opacity=".8"/><path d="M-3 7-5-2 0 2z" fill="#1c6a99"/></g>`;
    let body = "";
    if (n <= 0) body = '<ellipse cx="32" cy="51" rx="3.5" ry="2.5" fill="#c9b27a"/>';
    else if (n === 1) body = stem(8) + leaf(48, 1);
    else if (n === 2) body = stem(16) + leaf(46, 1) + leaf(41, -1);
    else if (n === 3) body = stem(20) + leaf(46, 1) + leaf(41, -1) + '<circle cx="32" cy="33" r="3.5" fill="#8fdcff" opacity=".9"/>';
    else if (n === 4) body = stem(22) + leaf(47, 1) + leaf(42, -1) + crystal(0.8, false);
    else body = stem(22) + leaf(47, 1) + leaf(42, -1) + crystal(1.25, true);
    return `<svg viewBox="0 0 64 64" aria-hidden="true">${soil}${body}</svg>`;
  }
};
