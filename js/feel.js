/* ETHERION — 손맛(Feel): 진동·누름 동작, 그리고 리듬을 맞추는 시간 값
   - 기존 WebAudio 합성 효과음은 제거됨 (새 효과음 파일 배선 전까지 play / atk 는 빈 동작)
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
  play() {},
  buzz(ms) { if (this.touch && navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} },
  atk() {},
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
  },
  reduced() { return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches); }
};
FEEL.init();
if (typeof document !== "undefined") document.addEventListener("DOMContentLoaded", () => FEEL.bindPress(document.body));
