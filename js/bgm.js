/* ETHERION — 배경음(BGM)
   - 타이틀 · 입장 화면(배경 "title"): audio/bgm/title — 약 50초짜리 짧은 곡을 이어서 반복
   - 대기실 · 교역소 · 덱 조정실 · 원정 · 보관소(배경 "calm"): 아홉 단체 테마(audio/bgm/flag_<단체ID>)를 무작위로 이어 튼다.
     방금 나온 세 곡은 다시 고르지 않는다. 곡이 끝나기 4초 전부터 다음 곡과 겹쳐 넘어간다
   - 대전(배경 "off"): 대전 곡 다섯(audio/bgm/bgm_reminiscence · bgm_long_ago, v3.17 bgm_last_oath · bgm_ashen_banner · bgm_fallen_star)을
     무작위로 이어 튼다. 방금 나온 두 곡은 다시 고르지 않는다(끝나기 4초 전부터 겹쳐 넘어감).
     대전이 끝나 대기실로 돌아오면 단체 테마 새 곡으로 다시 시작. (예전에는 대전에서 멈춰서, ♪를 켜도 소리가 안 났다)
   - 화면 바뀜은 Bg.set(배경 모드)을 감싸서 안다(js/screens.js를 고치지 않음). 그래서 이 파일은 screens.js 뒤에 읽는다
   - 음량: 설정에서 끄기 / 작게 / 보통 (localStorage etherion.pref.bgm, 기본 보통). 효과음 설정과 따로
   - 화면 오른쪽 아래의 소리 단추 둘(모든 화면): ♪ = 배경음, 스피커 = 효과음. 따로 끄고 켠다.
     끌 때의 음량(작게/보통)을 기억했다가 켤 때 되돌린다(localStorage etherion.pref.bgmKeep · sfxKeep).
     키보드 M = 배경음, N = 효과음(글자 칸에 쓰는 중이면 무시)
   - 상단 띠의 소리 아이콘('지도' 옆, 대기실 · 교역소 · 보관소): 누르면 소리 창 — 배경음 · 효과음 각각 켜기/끄기 단추와
     0~100 음량 슬라이더(localStorage etherion.pref.bgmVol · sfxVol, 그때 음량 단계는 "user"). 상단 띠가 있는 화면에서는
     오른쪽 아래 떠 있는 단추를 숨긴다(css/hud.css)
   - 브라우저는 사람이 한 번 누르기 전에는 소리를 막는다. 막히면 배경음 단추에 "음악 켜기"가 붙어 빛나고,
     그 단추나 어디든 처음 누르거나 키를 누르면 시작한다
   - 다른 탭으로 가면 멈추고, 돌아오면 이어 튼다
   - 파일은 .ogg(이음새 없음)를 쓰고, ogg를 못 트는 브라우저는 .mp3 */
"use strict";

const BGM = {
  dir: "audio/bgm/",
  ver: "o5",          // 음원을 바꾸면 올린다(브라우저가 옛 파일을 기억하지 않게) — v3.17 대전 곡 셋 더함
  titleTrack: "title",
  flags: ["B1", "B2", "B3", "G1", "G2", "G3", "A1", "A2", "A3"],
  battleTracks: ["bgm_reminiscence", "bgm_long_ago", "bgm_last_oath", "bgm_ashen_banner", "bgm_fallen_star"],
  battleRecent: [],    // v3.17 방금 나온 대전 곡(두 곡까지) — 다시 고르지 않는다
  vol: { off: 0, low: 0.22, mid: 0.5, user: 0.5 },
  MAXV: 0.8,           // 슬라이더 100일 때의 실제 음량
  level: "mid",
  want: null,          // 지금 화면이 원하는 것: "title" | "town" | "battle" | null
  cur: null,           // { el, name, scene }
  recent: [],
  blocked: false,
  fadeMs: 1800,
  ext: "ogg",
  btn: null,

  init() {
    this.vol.user = this.num("etherion.pref.bgmVol", 62) / 100 * this.MAXV;
    try { const v = JSON.parse(localStorage.getItem("etherion.pref.bgm")); if (v && v in this.vol) this.level = v; } catch (e) {}
    if (typeof FEEL !== "undefined") {   // 효과음도 슬라이더 음량("user")을 쓸 수 있게
      FEEL.vol.user = this.num("etherion.pref.sfxVol", 100) / 100;
      try { if (JSON.parse(localStorage.getItem("etherion.pref.sfx")) === "user") FEEL.level = "user"; } catch (e) {}
    }
    try { const a = document.createElement("audio"); this.ext = a.canPlayType('audio/ogg; codecs="vorbis"') ? "ogg" : "mp3"; } catch (e) { this.ext = "mp3"; }
    const unlock = () => { if (this.blocked) { this.blocked = false; this.unlockedAt = performance.now(); this.paint(); this.retry(); } };
    addEventListener("pointerdown", unlock, { capture: true, passive: true });
    addEventListener("keydown", unlock, { capture: true });
    addEventListener("keydown", e => {
      const k = (e.key || "").toLowerCase();
      if (k !== "m" && k !== "n") return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const t = e.target;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (k === "m") this.toggleMusic(); else this.toggleSfx();
    });
    if (typeof FEEL !== "undefined" && !FEEL.bgmHooked) {   // 설정 창에서 효과음을 바꾸면 단추 모양도 바뀌게
      const set = FEEL.setLevel;
      FEEL.setLevel = function (v) { set.call(this, v); BGM.paint(); };
      FEEL.bgmHooked = true;
    }
    if (document.body) this.mount(); else document.addEventListener("DOMContentLoaded", () => this.mount());
    document.addEventListener("visibilitychange", () => {
      if (!this.cur) return;
      if (document.hidden) this.cur.el.pause();
      else if (this.level !== "off" && !this.blocked) this.cur.el.play().catch(() => {});
    });
  },

  /* 배경 모드 → 음악 */
  scene(mode) {
    const want = mode === "title" ? "title" : mode === "calm" ? "town" : mode === "off" ? "battle" : null;
    this.closePanel();
    if (this.box) this.box.classList.toggle("in-battle", mode === "off");   // 대전 화면: 생명 판과 겹치지 않게 구석으로
    if (want === this.want) return;
    this.want = want;
    if (!want) { this.stop(); return; }
    if (this.cur && this.cur.scene === want) return;   // 같은 장면이면 이어서
    this.start(want);
  },

  pick(scene) {
    if (scene === "battle") {   // 대전 곡: 무작위, 방금 나온 두 곡은 건너뜀 (v3.17)
      const pool = this.battleTracks.filter(n => !this.battleRecent.includes(n));
      const n = pool[Math.floor(Math.random() * pool.length)];
      this.battleRecent.push(n); if (this.battleRecent.length > 2) this.battleRecent.shift();
      return n;
    }
    const pool = this.flags.filter(g => !this.recent.includes(g));
    const g = pool[Math.floor(Math.random() * pool.length)];
    this.recent.push(g); if (this.recent.length > 3) this.recent.shift();
    return "flag_" + g;
  },

  start(scene) {
    if (this.level === "off") { this.stop(); return; }
    const name = scene === "title" ? this.titleTrack : this.pick(scene);
    const el = new Audio(this.dir + name + "." + this.ext + "?v=" + this.ver);
    el.preload = "auto";
    el.loop = scene === "title";
    el.volume = 0;
    const item = { el, name, scene };
    if (scene !== "title") {   // 대기실 · 대전: 곡이 끝나기 4초 전부터 다음 곡으로 겹쳐 넘어감
      el.addEventListener("timeupdate", () => {
        if (this.cur !== item || item.leaving || !el.duration) return;
        if (el.duration - el.currentTime < 4) { item.leaving = true; this.start(scene); }
      });
      el.addEventListener("ended", () => { if (this.cur === item && !item.leaving) this.start(scene); });
    }
    el.addEventListener("error", () => { if (this.cur === item) this.cur = null; });
    if (this.cur) this.fade(this.cur, 0, scene !== "title" && this.cur.scene === scene ? 4000 : this.fadeMs, true);
    this.cur = item;
    this.play(item);
  },

  play(item) {
    const p = item.el.play();
    const ok = () => this.fade(item, this.vol[this.level], this.fadeMs);
    if (p && p.then) p.then(ok, err => {
      if (err && err.name === "NotAllowedError") { this.blocked = true; this.paint(); }
    });
    else ok();
  },
  retry() { if (this.cur && this.cur.el.paused && this.level !== "off") this.play(this.cur); else if (!this.cur && this.want) this.start(this.want); },

  stop() {
    if (this.cur) { this.fade(this.cur, 0, this.fadeMs, true); this.cur = null; }
    this.paint();
  },

  /* 음량을 ms 동안 to까지. end면 다 줄어든 뒤 멈추고 버린다 */
  fade(item, to, ms, end) {
    /* setInterval: 화면 그리기(requestAnimationFrame)가 멈춰도 음량은 끝까지 바뀐다 */
    clearInterval(item.duckTimer); item.ducking = false;   // v3.14 누르던 중이면 그만 누르고 페이드가 맡는다
    item.fading = true;
    const el = item.el, from = el.volume, t0 = performance.now();
    clearInterval(item.fadeTimer);
    item.fadeTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k < 1) return;
      clearInterval(item.fadeTimer); item.fading = false;
      if (end) { el.pause(); el.removeAttribute("src"); el.load(); }
    }, 40);
  },

  /* v3.14 타격감: 센 타격 순간 배경음을 depth(0~1)만큼 눌렀다가 ms 동안 되돌린다 (사이드체인 덕킹). 페이드 중에는 하지 않는다 */
  duck(depth, ms) {
    const it = this.cur;
    if (!it || it.leaving || it.fading || this.level === "off" || !it.el || it.el.paused) return;
    const base = this.vol[this.level]; if (!base) return;
    clearInterval(it.duckTimer);
    const low = base * (1 - Math.max(0, Math.min(0.9, depth))), t0 = performance.now(), dur = Math.max(120, ms || 300);
    if (!it.ducking || it.el.volume > low) it.el.volume = low;
    it.ducking = true;
    const from = it.el.volume;
    it.duckTimer = setInterval(() => {
      if (this.cur !== it || it.fading) { clearInterval(it.duckTimer); it.ducking = false; return; }
      const k = Math.min(1, (performance.now() - t0) / dur);
      it.el.volume = Math.max(0, Math.min(1, from + (this.vol[this.level] - from) * k * k));
      if (k >= 1) { clearInterval(it.duckTimer); it.ducking = false; }
    }, 30);
  },

  setLevel(v) {
    if (!(v in this.vol)) return;
    this.level = v;
    try { localStorage.setItem("etherion.pref.bgm", JSON.stringify(v)); } catch (e) {}
    this.paint();
    if (v === "off") { if (this.cur) { this.fade(this.cur, 0, 600, true); this.cur = null; } return; }
    if (this.cur) this.fade(this.cur, this.vol[v], 500);
    else if (this.want) this.start(this.want);
  },

  /* ---------- 소리 단추 둘: 배경음 · 효과음 ---------- */
  ICON_MUSIC: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 17.5V6.2l10-2.2v11.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><ellipse cx="6.6" cy="17.6" rx="2.6" ry="2" fill="currentColor"/><ellipse cx="16.6" cy="15.4" rx="2.6" ry="2" fill="currentColor"/></svg>`,
  ICON_SFX: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor"/><path d="M15.2 9.2a4 4 0 0 1 0 5.6M17.6 6.8a7.4 7.4 0 0 1 0 10.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  SLASH: `<svg class="snd-slash" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  box: null, btnM: null, btnS: null,
  mount() {
    if (this.box || !document.body) return;
    const box = document.createElement("div");
    box.id = "snd-ctl"; box.className = "snd-ctl";
    const mk = (cls, fn) => { const b = document.createElement("button"); b.type = "button"; b.className = "snd-btn " + cls; b.addEventListener("click", e => { e.stopPropagation(); fn(); }); box.appendChild(b); return b; };
    this.btnM = mk("snd-music", () => this.toggleMusic());
    this.btnS = mk("snd-sfx", () => this.toggleSfx());
    document.body.appendChild(box);
    this.box = box; this.paint();
  },
  keep(key, v) {
    if (v !== undefined) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} return v; }
    try { const x = JSON.parse(localStorage.getItem(key)); return x === "low" || x === "mid" || x === "user" ? x : "mid"; } catch (e) { return "mid"; }
  },
  num(key, def) { try { const raw = localStorage.getItem(key); if (raw == null) return def; const x = +JSON.parse(raw); return isFinite(x) && x >= 0 && x <= 100 ? x : def; } catch (e) { return def; } },
  toggleMusic() {
    if (this.blocked) { this.blocked = false; this.paint(); this.retry(); return; }   // 막혀 있던 음악을 켬
    if (performance.now() - (this.unlockedAt || 0) < 700) return;   // 같은 누름이 방금 음악을 켰다 — 바로 끄지 않는다
    if (this.level !== "off") { this.keep("etherion.pref.bgmKeep", this.level); this.setLevel("off"); }
    else this.setLevel(this.keep("etherion.pref.bgmKeep"));
    this.paint();
  },
  toggleSfx() {
    if (typeof FEEL === "undefined") return;
    if (FEEL.level !== "off") { this.keep("etherion.pref.sfxKeep", FEEL.level); FEEL.setLevel("off"); }
    else FEEL.setLevel(this.keep("etherion.pref.sfxKeep"));
    this.paint();
  },
  /* v3.7.2 전장 툴바(가운데 설정칸) 안의 소리 단추 둘. 툴바가 있으면 오른쪽 아래 단추는 숨는다(css/bgm.css) */
  tbBtn(k) {
    const off = k === "music" ? this.level === "off" : (typeof FEEL === "undefined" || FEEL.level === "off");
    const blocked = k === "music" && this.blocked && !off;
    const tip = blocked ? "음악 켜기 (M)" : k === "music" ? (off ? "배경음 켜기 (M)" : "배경음 끄기 (M)") : (off ? "효과음 켜기 (N)" : "효과음 끄기 (N)");
    return `<button type="button" class="tb-btn tb-snd${off ? " off" : ""}${blocked ? " blocked" : ""}" data-act="snd-${k}" aria-pressed="${off ? "false" : "true"}" aria-label="${tip}" data-tip="${tip}">${k === "music" ? this.ICON_MUSIC : this.ICON_SFX}${off ? this.SLASH : ""}</button>`;
  },
  tbHTML() { return this.tbBtn("music") + this.tbBtn("sfx"); },
  paint() {
    this.paintNav(); this.paintPanel();
    document.querySelectorAll(".tb-snd").forEach(b => { const k = b.dataset.act === "snd-music" ? "music" : "sfx"; b.outerHTML = this.tbBtn(k); });
    if (!this.box) return;
    const mOff = this.level === "off", sOff = typeof FEEL === "undefined" || FEEL.level === "off";
    const blocked = this.blocked && !mOff;
    const set = (b, off, icon, on, offTip, label) => {
      b.classList.toggle("off", off);
      b.innerHTML = icon + (off ? this.SLASH : "") + (label ? `<span class="snd-label">${label}</span>` : "");
      const tip = label || (off ? offTip : on);
      b.title = tip; b.setAttribute("aria-label", tip); b.setAttribute("aria-pressed", off ? "false" : "true");
    };
    set(this.btnM, mOff, this.ICON_MUSIC, "배경음 끄기 (M)", "배경음 켜기 (M)", blocked ? "음악 켜기" : "");
    this.btnM.classList.toggle("blocked", blocked);
    set(this.btnS, sOff, this.ICON_SFX, "효과음 끄기 (N)", "효과음 켜기 (N)", "");
  }
,

  /* ---------- 상단 띠 소리 아이콘 + 소리 창 (음량 슬라이더) ---------- */
  NAV_ON: '<path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" stroke="none"/><path d="M15.2 9.2a4 4 0 0 1 0 5.6M17.6 6.8a7.4 7.4 0 0 1 0 10.4"/>',
  NAV_OFF: '<path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" stroke="none"/><path d="M15.5 9.5l5 5M20.5 9.5l-5 5"/>',
  allOff() { return this.level === "off" && (typeof FEEL === "undefined" || FEEL.level === "off"); },
  navIcon() { return `<svg class="m-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${this.allOff() ? this.NAV_OFF : this.NAV_ON}</svg>`; },
  paintNav() {
    document.querySelectorAll(".tb-sound").forEach(b => { b.innerHTML = this.navIcon(); b.classList.toggle("muted", this.allOff()); b.classList.toggle("open", !!this.pop); });
  },
  /* 슬라이더 위치(0~100): 단계 음량을 슬라이더 값으로 바꿔 보인다 */
  bgmSlider() {
    const of = l => l === "user" ? Math.round(this.vol.user / this.MAXV * 100) : l === "low" ? Math.round(this.vol.low / this.MAXV * 100) : Math.round(this.vol.mid / this.MAXV * 100);
    return this.level === "off" ? of(this.keep("etherion.pref.bgmKeep")) : of(this.level);
  },
  sfxSlider() {
    if (typeof FEEL === "undefined") return 0;
    const of = l => Math.round((FEEL.vol[l] != null ? FEEL.vol[l] : 1) * 100);
    return FEEL.level === "off" ? of(this.keep("etherion.pref.sfxKeep")) : of(FEEL.level);
  },
  setBgmVolume(v) {
    v = Math.max(0, Math.min(100, Math.round(v)));
    if (v === 0) { if (this.level !== "off") { this.keep("etherion.pref.bgmKeep", this.level); this.setLevel("off"); } return; }
    this.keep("etherion.pref.bgmVol", v);
    this.vol.user = v / 100 * this.MAXV;
    const was = this.level;
    this.level = "user";
    try { localStorage.setItem("etherion.pref.bgm", JSON.stringify("user")); } catch (e) {}
    if (this.cur) { clearInterval(this.cur.fadeTimer); if (was === "off") this.fade(this.cur, this.vol.user, 400); else this.cur.el.volume = this.vol.user; }
    else if (this.want) this.start(this.want);
    this.paint();
  },
  setSfxVolume(v, preview) {
    if (typeof FEEL === "undefined") return;
    v = Math.max(0, Math.min(100, Math.round(v)));
    if (v === 0) { if (FEEL.level !== "off") { this.keep("etherion.pref.sfxKeep", FEEL.level); FEEL.setLevel("off"); } return; }
    this.keep("etherion.pref.sfxVol", v);
    FEEL.vol.user = v / 100;
    if (FEEL.level !== "user") { FEEL.level = "user"; try { localStorage.setItem("etherion.pref.sfx", JSON.stringify("user")); } catch (e) {} }
    if (preview) FEEL.play("select");
    this.paint();
  },
  pop: null,
  openPanel(anchor) {
    if (this.pop) { this.closePanel(); return; }
    const p = document.createElement("div");
    p.className = "snd-pop"; p.setAttribute("role", "dialog"); p.setAttribute("aria-label", "소리");
    const row = (k, label, icon) => `<div class="sp-row" data-k="${k}">
        <button type="button" class="sp-tog" data-tog="${k}"></button>
        <span class="sp-name"><span class="sp-ico">${icon}</span>${label}</span>
        <input type="range" class="sp-range" min="0" max="100" step="1" data-vol="${k}" aria-label="${label} 음량">
        <output class="sp-val"></output>
      </div>`;
    p.innerHTML = `<p class="sp-title">소리<small>M 배경음 · N 효과음</small></p>${row("bgm", "배경음", this.ICON_MUSIC)}${row("sfx", "효과음", this.ICON_SFX)}`;
    p.addEventListener("click", e => {
      e.stopPropagation();
      const t = e.target.closest("[data-tog]"); if (!t) return;
      if (t.dataset.tog === "bgm") this.toggleMusic(); else this.toggleSfx();
    });
    p.addEventListener("input", e => { const r = e.target.closest("[data-vol]"); if (!r) return; (r.dataset.vol === "bgm" ? this.setBgmVolume(+r.value) : this.setSfxVolume(+r.value)); this.paintPanel(r); });
    p.addEventListener("change", e => { const r = e.target.closest("[data-vol]"); if (r && r.dataset.vol === "sfx" && +r.value > 0) this.setSfxVolume(+r.value, true); });
    document.body.appendChild(p);
    this.pop = p; this.popAnchor = anchor;
    this.place();
    this.paint();
    this.onAway = e => { if (!this.pop) return; if (this.pop.contains(e.target) || (this.popAnchor && this.popAnchor.contains(e.target))) return; this.closePanel(); };
    this.onKey = e => { if (e.key === "Escape") this.closePanel(); };
    this.onResize = () => this.place();
    setTimeout(() => { addEventListener("pointerdown", this.onAway, true); addEventListener("keydown", this.onKey); addEventListener("resize", this.onResize); }, 0);
  },
  place() {
    const p = this.pop, a = this.popAnchor; if (!p || !a || !a.isConnected) return;
    const r = a.getBoundingClientRect(), w = p.offsetWidth;
    p.style.top = Math.round(r.bottom + 8) + "px";
    p.style.left = Math.round(Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2))) + "px";
    p.style.setProperty("--ax", Math.round(r.left + r.width / 2 - parseFloat(p.style.left)) + "px");
  },
  closePanel() {
    if (!this.pop) return;
    this.pop.remove(); this.pop = null; this.popAnchor = null;
    removeEventListener("pointerdown", this.onAway, true); removeEventListener("keydown", this.onKey); removeEventListener("resize", this.onResize);
    this.paintNav();
  },
  paintPanel(skip) {
    const p = this.pop; if (!p) return;
    const st = { bgm: { off: this.level === "off", v: this.bgmSlider() }, sfx: { off: typeof FEEL === "undefined" || FEEL.level === "off", v: this.sfxSlider() } };
    for (const k of ["bgm", "sfx"]) {
      const rw = p.querySelector(`.sp-row[data-k="${k}"]`); if (!rw) continue;
      const s = st[k], r = rw.querySelector(".sp-range"), t = rw.querySelector(".sp-tog");
      rw.classList.toggle("off", s.off);
      t.textContent = s.off ? "꺼짐" : "켜짐"; t.setAttribute("aria-pressed", s.off ? "false" : "true");
      t.title = (k === "bgm" ? "배경음" : "효과음") + (s.off ? " 켜기" : " 끄기") + (k === "bgm" ? " (M)" : " (N)");
      const v = s.off ? 0 : s.v;
      if (r !== skip) r.value = v;
      r.style.setProperty("--p", (s.off ? 0 : (skip === r ? +r.value : v)) + "%");
      rw.querySelector(".sp-val").textContent = s.off ? "—" : (skip === r ? r.value : v);
    }
  }
};

BGM.init();
if (typeof Bg !== "undefined" && !Bg.bgmHooked) {
  const set = Bg.set;
  Bg.set = function (mode) { set.call(this, mode); BGM.scene(mode); };
  Bg.bgmHooked = true;
}
