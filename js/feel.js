/* ETHERION — 손맛(Feel): 진동·누름 동작, 그리고 리듬을 맞추는 시간 값
   - 효과음: audio/sfx/ 의 파일을 WebAudio 로 튼다 (play · card · atk, 아래 "효과음 파일")
   - 터치로 조작할 때만 아주 짧게 진동한다(지원하는 기기)
   - 시간 값(FEEL.t)은 한곳에 모아 둔다. 리듬을 바꾸고 싶으면 여기 숫자만 고친다 */
"use strict";

const FEEL = {
  /* 리듬 (ms, 배속 ×1 기준). 사람의 손이 한 일은 짧고 단단하게, 결과로 일어나는 일은 조금 길게 */
  t: {
    press: 70,        // 누르는 순간 눌림
    pressHold: 150,   // 카드는 이만큼(ms) 누르고 있어야 눌림이 시작된다 (더블클릭 보호)
    pick: 140,        // 끌기 시작할 때 카드가 손에 붙는 시간
    place: 420,       // 핸드 → 전장 착지 (v1.7: 빨려 들어가 착 붙음. 56% 지점에서 닿는다)
    move: 300,        // 전장 자리 바꾸기·정렬
    handMove: 420,    // 핸드 안에서 모이기·순서 바꾸기 (v2.6: 묵직하게)
    swap: 340,        // 자리 바꾸기에서 밀려난 카드가 뒤로 넘어가는 시간 (v1.7)
    draw: 480,        // 덱 → 핸드
    drawGap: 95,      // 여러 장 뽑을 때 간격
    away: 520,        // 소각장·에테르·장착으로 날아가기
    back: 400,        // 놓을 수 없는 곳에서 제자리로 (v1.7: 260 → 400)
    select: 380,      // 핸드 고르기/풀기 (v1.7: 200 → 280, v2.6: 380 — css/hand.css 와 같은 길이)
    hitStop: 65       // 맞는 순간 멈칫
  },
  vol: { off: 0, low: 0.45, mid: 1 },
  master: 0.4,      // 2026-11-15 전체 효과음 세기 (0.8 → 0.4, 절반 = −6 dB)
  level: "mid",
  touch: false,
  ac: null,
  last: {},
  lastAny: 0,       // 마지막으로 소리를 낸 때
  mark() { this.lastAny = performance.now(); },

  init() {
    try { const v = JSON.parse(localStorage.getItem("etherion.pref.sfx")); if (v && v in this.vol) this.level = v; } catch (e) {}
    if (typeof addEventListener !== "function") return;
    addEventListener("pointerdown", e => { this.touch = e.pointerType === "touch"; }, { capture: true, passive: true });
  },
  setLevel(v) { if (!(v in this.vol)) return; this.level = v; try { localStorage.setItem("etherion.pref.sfx", JSON.stringify(v)); } catch (e) {} },
  ctx() {
    if (this.ac === false) return null;
    try { this.ac = this.ac || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ac = false; return null; }
    if (this.ac.state === "suspended") this.ac.resume();
    return this.ac;
  },
  /* ---------- 효과음 파일 (2026-11-16~ 코드로 직접 합성한 audio/sfx/<키>.ogg · .mp3 — tools/sfx/synth/, 그 전은 Stable Audio) ----------
     목록은 audio/sfx/index.json. 키 이름은 tools/sfx/prompts/sfx.jsonl 의 sounds[].key 그대로.
     예전 합성음 이름으로 부르는 곳이 많아서 SND_ALIAS 로 새 키에 잇는다(null = 소리 없음: 같은 순간 다른 소리가 이미 남).
     카드마다 다른 소리: FEEL.card(카드ID, "atk" | "def" | "cast" | "equip", 세기, 없을 때 쓸 공용 키) */
  SND_ALIAS: {
    confirm: "confirm_ready", hitBig: "life_hit", suck: null,
    // 2026-11-16 사용자: 날카로운 금속성 소리 빼기 — 전장 카드 옮김 · 소각장으로 갈 때(move, 거의 4kHz 위만 울림), 코인 도는 소리(coin_flip · coin_reflip · shield_coin), 파친코 SPIN이 멈출 때 차르르(pach_stop)
    move: null, coin_flip: null, coin_reflip: null, shield_coin: null, pach_stop: null,
    crystal: null,   // 2026-11-16 결정화: 1.9초 내내 같은 크기로 울리는 쇳소리가 카드가 소각장으로 가는 동안 이어졌다 — 빼고 소각장에 닿을 때 불 소리(burn)만
    banner_foe: null, banner_combat: null,   // 2026-11-16 상대 차례 · 전투 시작 명판 소리 — 잔향이 길어 뺌(공격 · 방어 차례 명판은 꼬리만 잘라 남김)
    sortie: null,   // 2026-11-16 대전 시작(출정) 칼 뽑는 쇳소리 — 핸드가 들어오는 동안 "지이잉" 하고 길게 울렸다
    imp_hit: null, imp_life: null, imp_kill: null, imp_land: null, imp_spell: null,
    imp_crit: "crit", imp_block: "block", imp_whoosh: "swing",
    sp_buff: "buff", sp_debuff: "debuff", sp_shield: "shield", sp_heal: "heal", sp_block: "block",
    sp_boom: null, sp_zap: null, sp_clang: null, sp_rock: null, sp_quake: null, sp_thorn: null,
    sp_thunk: null, sp_slash: null, sp_smite: null, sp_gust: null, sp_splash: null
  },
  /* 파일을 고쳐 다시 넣은 소리: 브라우저에 남은 옛 파일 대신 새 파일을 받게 ?v= 를 붙인다 */
  SND_VER: { banner_atk: "1116", banner_def: "1116", "A2-43.atk": "1117", "B3-16.atk": "1117",   // v3.90 불꽃 날개 순교자 공격 소리 바꿈 · 충전 거미 공격 소리(번개 지직 → 거미줄 튕김)
    "MG-04.cast": "1117", "RS-G1-2.cast": "1117",
    "MC-01.cast": "1118ok", "SG1-03.cast": "1118ok3",   // v3.95 오크 웅크린 늑대(전 각성) · 궁지의 송곳니 새 효과
    ...Object.fromEntries("MA-01.cast PS-A1-2.cast MA-09.cast CS-A1.cast RS-A1-3.cast HA1-2.cast HA1-3.cast US-A3-1.cast RS-A2-1.cast PS-A2-1.cast SA3-02.cast SA3-05.cast MB-05.cast NB1-3.cast PS-B3-1.cast SG2-02.cast SG3-03.cast RS-G1-1.cast RS-G1-3.cast RS-B2-1.cast MG-13.cast fear plague".split(" ").map(k => [k, "1118v395"])),   // 2026-11-18 v3.95 바뀐 마법 21장 · 새 저주 소리(공포 · 역병)
    ...Object.fromEntries("MA-10.cast MA-14.cast SA2-02.cast RB1-1.cast SB1-08.cast MG-11.cast RS-G2-3.cast RG2-1.cast US-G2-1.cast UP-A1-09.atk UP-A1-09.def UP-A1-18.atk UP-A1-18.def UP-A2-11.atk UP-A2-11.def UP-A2-17.atk UP-A2-17.def UP-A2-22.atk UP-A2-22.def UP-A2-24.atk UP-A2-24.def UP-A3-10.atk UP-A3-10.def UP-A3-11.atk UP-A3-11.def UP-A3-18.atk UP-A3-18.def UP-A3-23.atk UP-A3-23.def UP-A3-24.atk UP-A3-24.def UP-B1-12.atk UP-B1-12.def UP-B1-17.atk UP-B1-17.def UP-B1-18.atk UP-B1-18.def UP-B2-17.atk UP-B2-17.def UP-B2-18.atk UP-B2-18.def UP-B2-22.atk UP-B2-22.def UP-B2-24.atk UP-B2-24.def UP-B3-12.atk UP-B3-12.def UP-B3-23.atk UP-B3-23.def UP-G1-24.atk UP-G1-24.def UP-G2-22.atk UP-G2-22.def UP-G3-11.atk UP-G3-11.def UP-G3-12.atk UP-G3-12.def UP-G3-17.atk UP-G3-17.def UP-G3-24.atk UP-G3-24.def".split(" ").map(k => [k, "1117r"])),   // 2026-11-17 카드 변경 맞춤: 화약통 깔기 · 화약고 폭파 · 뒤집힌 물거울 · 트롤 3장 · 강화 유닛 26장(v3.79 종류) 새 소리 + 새벽빛 3장   // 2026-11-17 v3.87 원한의 일격 · 피의 맹세 새 소리   // 2026-11-16 상대 · 공격 · 방어 차례 명판 소리의 잔향 꼬리를 잘라 냄
    ...Object.fromEntries("SA3-06.cast NA3-3.cast A3-13.def A3-41.atk UP-B1-12.def B2-41.atk B2-12.atk SB2-01.cast UP-B2-18.def US-B3-2.cast G1-18.atk UP-G1-18.atk UP-G1-18.def PN-G1-U2.atk PS-G1-1.cast G2-31.atk UP-G2-22.def UP-G3-18.atk UP-G3-18.def UP-G3-11.def G3-08.atk G3-08.def G3-28.atk G3-28.def PN-G3-C3.atk PI-G3.equip A1-32.atk A1-32.def UP-A1-11.def UP-A1-15.atk UP-A1-15.def UP-A1-23.atk UP-A1-23.def A2-17.atk UP-A2-17.atk A2-29.atk A2-31.atk PN-A2-U1.def PN-A2-U2.atk PN-A2-U2.def SA2-03.cast MA-14.cast G2-26.atk PN-G2-C3.def RS-G1-2.cast".split(" ").map(k => [k, "1119sfx"])) },   // 2026-11-19 프롬프트 점검 수정: SA3-06 · NA3-3 · 강화 유닛 · 금지어 정리 45키
  SND_ALL: "syn1116",   // 모든 파일을 한꺼번에 바꿨을 때 올린다(2026-11-16 Stable Audio → 직접 합성)
  sndUrl(key) { const v = this.SND_VER[key] ? this.SND_VER[key] + "." + this.SND_ALL : this.SND_ALL; return this.snd.base + encodeURIComponent(key) + "." + this.snd.ext + "?v=" + v; },
  /* media: 파일로 열었을 때(file:// — ETHERION 실행.bat · PC 앱)는 fetch 가 막혀서 <audio> 로 낸다. 목록도 audio/sfx/index.js (window.SFX_KEYS) */
  snd: { keys: null, buf: {}, wait: {}, ext: "ogg", base: "audio/sfx/", media: false, el: {} },
  sndKeys() {
    const S = this.snd;
    if (S.keys || S.wait._index) return;
    try { const a = document.createElement("audio"); S.ext = a.canPlayType('audio/ogg; codecs="opus"') ? "ogg" : "mp3"; } catch (e) { S.ext = "mp3"; }
    const file = typeof location !== "undefined" && location.protocol === "file:";
    if (file || typeof fetch !== "function") {
      S.media = typeof Audio === "function";
      S.keys = new Set(typeof window !== "undefined" && window.SFX_KEYS || []);
      this.preload();
      return;
    }
    S.wait._index = fetch(S.base + "index.json").then(r => r.json()).then(a => { S.keys = new Set(a); this.preload(); })
      .catch(() => { S.media = typeof Audio === "function"; S.keys = new Set(typeof window !== "undefined" && window.SFX_KEYS || []); });
  },
  /* <audio> 쪽: 키마다 하나 받아 두고, 낼 때는 복제해서 겹쳐 낼 수 있게 */
  mediaEl(key) {
    const S = this.snd;
    if (!S.el[key]) { const a = new Audio(this.sndUrl(key)); a.preload = "auto"; a.onerror = () => S.keys.delete(key); S.el[key] = a; }
    return S.el[key];
  },
  has(key) { return !!(this.snd.keys && this.snd.keys.has(key)); },
  load(key) {
    const S = this.snd;
    if (S.media) { if (this.has(key)) this.mediaEl(key); return null; }
    const ac = this.ctx();
    if (!ac || !this.has(key)) return null;
    if (S.buf[key] || S.wait[key]) return S.wait[key] || Promise.resolve(S.buf[key]);
    S.wait[key] = fetch(this.sndUrl(key)).then(r => r.arrayBuffer())
      .then(b => new Promise((ok, no) => ac.decodeAudioData(b, ok, no)))
      .then(buf => { S.buf[key] = buf; delete S.wait[key]; return buf; })
      .catch(() => { delete S.wait[key]; S.keys.delete(key); return null; });
    return S.wait[key];
  },
  /* 자주 나는 공용 소리는 미리 받아 둔다 (카드 소리는 처음 날 때 받음) */
  preload() {
    const list = ["select", "unselect", "pick", "hover", "handHover", "place", "move", "draw", "shuffle", "swing", "hit", "crit", "block",
      "shatter", "burn", "crystal", "equip", "sp_reveal", "life_hit", "confirm_ready", "deny", "coinHeads", "coinTails", "buff", "debuff", "shield", "heal"];
    const al = n => n in this.SND_ALIAS ? this.SND_ALIAS[n] : n;
    let i = 0; const next = () => { if (i < list.length) { const k = al(list[i++]); const p = k && this.load(k); (p || Promise.resolve()).then(next); } };
    next();
  },
  /* name: 키 또는 예전 이름. v: 세기(1 = 보통). x: pach_win 은 단계(1~3), 그 밖에는 재생 빠르기 손질(pach_stop 1.12 …) */
  play(name, v, x) {
    if (!name || !this.vol[this.level]) return;
    let key = name in this.SND_ALIAS ? this.SND_ALIAS[name] : name;
    if (name === "pach_win") key = "pach_win" + Math.max(1, Math.min(3, Math.round(x || 1)));
    if (!key) return;
    const rate = name === "pach_tick" ? 1 + (x || 0) * 0.12 : name === "pach_stop" && x ? x : 1;
    this.out(key, v == null ? 1 : v, rate);
  },
  out(key, v, rate) {
    if (!this.vol[this.level]) return;
    this.sndKeys();
    if (!this.snd.keys) { const w = this.snd.wait._index; if (w) w.then(() => this.out(key, v, rate)); return; }
    const now = performance.now();
    if (now - (this.last[key] || 0) < 45) return;   // 같은 소리가 한꺼번에 겹치면 하나만
    if (this.snd.media) {
      if (!this.has(key)) return;
      this.last[key] = now;
      const a = this.mediaEl(key).cloneNode();
      a.volume = Math.min(1, Math.max(0, v) * this.vol[this.level] * this.master);
      if (rate && rate !== 1) { a.preservesPitch = a.mozPreservesPitch = a.webkitPreservesPitch = false; a.playbackRate = rate; }
      const pr = a.play(); if (pr && pr.catch) pr.catch(() => {});
      this.mark();
      return;
    }
    if (!this.ctx()) return;
    this.last[key] = now;
    const t0 = now;
    const p = this.load(key); if (!p) return;
    p.then(buf => {
      if (!buf || performance.now() - t0 > 350) return;   // 받는 데 너무 오래 걸렸으면 늦은 소리는 내지 않는다
      const ac = this.ac, src = ac.createBufferSource(), g = ac.createGain();
      src.buffer = buf; src.playbackRate.value = rate || 1;
      g.gain.value = Math.min(1.5, Math.max(0, v)) * this.vol[this.level] * this.master;
      src.connect(g).connect(ac.destination); src.start();
      this.mark();
    });
  },
  /* 카드마다 다른 소리. 그 카드의 소리가 없으면 공용 소리(fb) */
  card(id, part, v, fb) {
    const key = id ? id + "." + part : null;
    if (key && this.snd.keys && !this.has(key)) { if (fb) this.play(fb, v); return; }
    if (!key) { if (fb) this.play(fb, v); return; }
    if (part === "atk" || part === "def") { this.load(id + ".atk"); this.load(id + ".def"); }   // 공격 · 방어는 붙어 다니니 같이 받아 둔다
    this.out(key, v == null ? 1 : v, 1);
  },
  buzz(ms) { if (this.touch && navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} },
  /* 공격 소리 (js/game.js atkSfx). phase "out" = 뛰쳐나감(소리 없음: 휙은 imp_whoosh 가 냄), "hit" = 맞는 순간 → 그 카드의 공격 소리 */
  atk(kind, phase, v, lv, id) {
    if (phase !== "hit") { if (id) { this.sndKeys(); if (this.snd.keys) this.load(id + ".atk"); } return; }
    this.card(id, "atk", v, "hit");
  },
  atkKind() { return "punch"; },

  /* 누름: 누르는 동안 살짝 들어가고(70ms), 떼면 탄력 있게 돌아온다(220ms).
     CSS transform을 건드리지 않도록 따로 노는 scale 속성만 움직인다. render로 DOM이 바뀌면 그냥 사라진다 */
  PRESS_SEL: '.btn,.tb-btn,.ready-btn,.f-cta,.f-sub,.f-x,.pc-face,.mull-card,.fac-tile,.grp-tile,.deck-tile,[data-act]:not([data-act="handoff"]):not(.hand-slot):not(.slot)',
  bindPress(root) {
    if (!root || root._feelPress) return; root._feelPress = true;
    let cur = null, an = null, tm = 0;
    const up = () => {
      if (!cur) return;
      const el = cur; cur = null;
      clearTimeout(tm); tm = 0;
      // 눌림이 시작되기 전에(짧은 클릭·더블클릭) 뗐으면 줄었다 돌아오는 동작도 없다
      if (!an) return;
      an.cancel(); an = null;
      if (el.isConnected && !this.reduced()) el.animate([{ scale: "0.955" }, { scale: "1.025", offset: 0.5 }, { scale: "1" }], { duration: 220, easing: "ease-out" });
    };
    root.addEventListener("pointerdown", e => {
      if (e.button !== 0 || this.reduced()) return;
      let el = e.target.closest(this.PRESS_SEL), isCard = false;
      if (!el) { const h = e.target.closest(".hand-slot,.slot"); el = h && h.querySelector(".hand-card,.card"); isCard = !!el; }
      if (!el || el.disabled) return;
      up(); cur = el;
      const start = () => { tm = 0; if (cur === el && el.isConnected) an = el.animate([{ scale: "1" }, { scale: "0.955" }], { duration: this.t.press, easing: "ease-out", fill: "forwards" }); };
      // 카드는 눌러 두고 있을 때만 줄어든다: 더블클릭 같은 짧은 클릭(0.15초 미만)에는 움직이지 않는다
      if (isCard) tm = setTimeout(start, this.t.pressHold); else start();
    });
    addEventListener("pointerup", up); addEventListener("pointercancel", up);
    /* 2026-11-15 메뉴 소리 (붙잡는 단계에서 듣는다: stopPropagation 하는 단추도 있어서). 전장의 [data-act] 단추는 game.js 가 따로 소리를 낸다 */
    const TAB = '[role="tab"],.tab,.jr-tab,.t-tab,[data-jtab],[data-ttab],[data-tab]';
    const TOG = '[data-sp],[data-mt],[data-lay],[data-bbg],[data-fx],[data-sfx],[data-bgm],.sp-tog,.snd-btn,[data-act^="snd-"],.ai-diff-btn';
    const FILT = '.dv-k,.dv-g,.cv-col,.chip:not(.tog),.ed-spell-grp,.ed-sub,.edf-tab';   // 2026-11-15 카드 보기의 종류 · 등급 · 레벨 거르개
    const CLK = '.btn,.tb-nav,.tb-btn,.tb-crest,.tb-shard,.f-cta,.f-sub,.f-x,.ds-x,.hx-x,.cr-close';
    root.addEventListener("click", e => {
      const t = e.target; if (!t || !t.closest) return;
      if (t.closest(FILT)) this.play(this.has("ui_filter") ? "ui_filter" : "ui_tab", .55);
      else if (t.closest(TAB)) this.play("ui_tab", .6);
      else if (t.closest(TOG)) this.play("ui_toggle", .6);
      else if (t.closest(CLK)) this.play("ui_click", .5);
    }, true);
    root.addEventListener("change", e => { if (e.target.matches && e.target.matches('input[type="checkbox"]')) this.play("ui_toggle", .6); }, true);
    root.addEventListener("pointerover", e => {
      if (e.pointerType !== "mouse" || !e.target.closest) return;
      const el = e.target.closest(CLK + ",.deck-tile,.grp-tile," + TAB);
      if (!el || el.disabled || (e.relatedTarget && el.contains(e.relatedTarget))) return;
      this.play("ui_hover", .18);
    }, true);
  },
  reduced() { return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches); }
};
FEEL.init();
if (typeof document !== "undefined") document.addEventListener("DOMContentLoaded", () => FEEL.bindPress(document.body));
