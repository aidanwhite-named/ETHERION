/* ETHERION — 손맛(Feel): 누름·집기·놓기·맞기의 소리와 진동, 그리고 리듬을 맞추는 시간 값
   - 소리는 파일 없이 WebAudio로 합성한다. 음량은 설정에서 끄기/작게/보통 (localStorage etherion.pref.sfx)
   - 같은 소리가 한 프레임 안에 여러 번 겹치면 한 번만 낸다(컴퓨터가 카드 여러 장을 한꺼번에 놓을 때)
   - 터치로 조작할 때만 아주 짧게 진동한다(지원하는 기기)
   - 시간 값(FEEL.t)은 한곳에 모아 둔다. 리듬을 바꾸고 싶으면 여기 숫자만 고친다
   - v3.7.2 메뉴 · 창 소리(FEEL_UI, 이 파일 맨 아래): 메뉴 단추 · 카드 · 덱 고르기 · 창 열고 닫기에 묵직한 쇠 소리("철크럭")를
     저절로 붙인다. 다른 코드가 이미 소리를 냈으면 겹쳐 내지 않는다(FEEL.lastAny)
   - v3.7.1 코인 앞면은 쇠 동전 소리(ring: 어긋난 배음 + 맥놀이). 카드가 카드를 칠 때는 공격 종류(ATK_SND, 이 파일 아래)에 맞는
     소리를 낸다: 찢기·베기·찍기·찌르기·후려치기·때리기·내려치기·쇠 타격·사격·폭발·바람·번개·물·어둠·빛·대지 */
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
  lastAny: 0,       // v3.7.2 마지막으로 소리를 낸 때 (메뉴 소리가 다른 소리와 겹치지 않게)
  mark() { this.lastAny = performance.now(); },

  init() {
    try { const v = JSON.parse(localStorage.getItem("etherion.pref.sfx")); if (v && v in this.vol) this.level = v; } catch (e) {}
    if (typeof addEventListener !== "function") return;
    addEventListener("pointerdown", e => { this.touch = e.pointerType === "touch"; if (this.level !== "off") this.ctx(); }, { capture: true, passive: true });
  },
  setLevel(v) { if (!(v in this.vol)) return; this.level = v; try { localStorage.setItem("etherion.pref.sfx", JSON.stringify(v)); } catch (e) {} if (v !== "off") this.play("select"); },
  ctx() {
    if (this.ac === false) return null;
    try { this.ac = this.ac || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ac = false; return null; }
    if (this.ac.state === "suspended") this.ac.resume();
    return this.ac;
  },

  /* 기본 소리 조각 */
  tone(ac, out, t0, f0, f1, dur, type, vol) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(f0, t0);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(out); o.start(t0); o.stop(t0 + dur + 0.02);
  },
  noise(ac, out, t0, dur, freq, q, vol, sweepTo) {
    const n = Math.max(1, Math.floor(ac.sampleRate * dur));
    const buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; f.type = "bandpass"; f.Q.value = q || 1;
    f.frequency.setValueAtTime(freq, t0);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f).connect(g).connect(out); s.start(t0); s.stop(t0 + dur + 0.02);
  },

  /* 이름 붙은 소리. v = 0~1 세기 */
  play(name, v, pj) {
    const lv = this.vol[this.level]; if (!lv) return;
    const now = performance.now();
    this.lastAny = now;
    if (this.last[name] && now - this.last[name] < 45) return;
    this.last[name] = now;
    const ac = this.ctx(); if (!ac) return;
    const out = ac.createGain(); out.gain.value = lv * (v == null ? 1 : v); out.connect(ac.destination);
    if (this.HALL[name]) { const send = ac.createGain(); send.gain.value = this.HALL[name]; out.connect(send).connect(this.hall(ac)); }   // v3.7.2 석조 전당 울림
    const t = ac.currentTime + 0.002;
    const j = pj || 1;   // v3.7.1 높이 배율 (공격 소리: 레벨이 높을수록 낮고 무겁게, 칠 때마다 조금씩 다르게)
    switch (name) {
      case "select":   // 핸드 고르기 (v3.7.2 묵직하게): 낮은 탁 + 쇠 닿는 짧은 척 + 장갑 쇠마디의 작은 울림
        this.tone(ac, out, t, 240, 118, 0.075, "sine", 0.1);
        this.noise(ac, out, t, 0.014, 3200, 1.8, 0.055);
        this.bell(ac, out, t + 0.003, 980, 0.09, 0.014, [1, 2.76], [1, 0.4]); break;
      case "unselect": // 풀기: 한 음 낮게
        this.tone(ac, out, t, 190, 95, 0.07, "sine", 0.09);
        this.noise(ac, out, t, 0.014, 2400, 1.8, 0.045);
        this.bell(ac, out, t + 0.003, 740, 0.08, 0.012, [1, 2.76], [1, 0.4]); break;

      case "handHover": { // v3.7.2 핸드 카드 위에 마우스가 오름: 두꺼운 카드가 스치는 낮은 스윽 (훑고 지나가면 장마다 조금씩 다른 높이)
        const j = 0.92 + Math.random() * 0.16;
        this.noise(ac, out, t, 0.055, 1700 * j, 1.2, 0.04, 850 * j);
        this.tone(ac, out, t + 0.006, 190 * j, 120 * j, 0.06, "sine", 0.045);
        this.bell(ac, out, t + 0.01, 1180 * j, 0.05, 0.005, [1, 2.76], [1, 0.4]); break; }

      /* ---------- v3.7.2 메뉴 · 창 소리: 경박하지 않게, 갑옷과 쇠 걸쇠처럼 묵직하게 ---------- */
      case "ui_click": // 메뉴 단추 "척": 몸통 쿵 + 쇠 닿는 순간 + 짧은 쇠 울림 + 걸쇠가 맞물리는 끝
        this.tone(ac, out, t, 165, 62, 0.13, "sine", 0.17);
        this.noise(ac, out, t, 0.018, 2900, 1.6, 0.085);
        this.bell(ac, out, t + 0.004, 520, 0.16, 0.022, [1, 2.76, 5.4], [1, 0.5, 0.25]);
        this.noise(ac, out, t + 0.03, 0.03, 1500, 1.2, 0.04, 700); break;
      case "ui_card":  // 메뉴에서 카드를 누름: 두꺼운 종이 스침 + 묵직한 탁 + 장갑 쇠마디
        this.noise(ac, out, t, 0.06, 2200, 1.1, 0.05, 900);
        this.tone(ac, out, t + 0.008, 210, 80, 0.11, "sine", 0.14);
        this.noise(ac, out, t + 0.008, 0.016, 3600, 2, 0.06);
        this.bell(ac, out, t + 0.012, 880, 0.12, 0.013, [1, 2.76], [1, 0.4]); break;
      case "ui_deck":  // 덱 고르기 "찰칵": 날카로운 걸쇠(찰) 뒤에 묵직하게 맞물림(칵)
        this.noise(ac, out, t, 0.016, 4200, 2.2, 0.09);
        this.bell(ac, out, t, 1320, 0.07, 0.02, [1, 2.76, 5.4], [1, 0.45, 0.2]);
        { const k = t + 0.06;
          this.noise(ac, out, k, 0.022, 2600, 1.8, 0.12);
          this.tone(ac, out, k, 230, 78, 0.12, "sine", 0.17);
          this.bell(ac, out, k + 0.003, 690, 0.22, 0.03, [1, 2.76, 5.4, 8.93], [1, 0.55, 0.3, 0.12]);
          this.noise(ac, out, k + 0.02, 0.06, 1200, 1, 0.03, 500); }
        this.buzz(10); break;
      case "ui_open":  // 창 열림 "철크럭": 쇠가 미끄러져 오름 → 철(쇠 울림) → 크럭(사슬 고리 셋이 차례로 걸림) → 마지막 걸림
        this.noise(ac, out, t, 0.1, 900, 1.2, 0.035, 2600);
        { const c = t + 0.07;
          this.tone(ac, out, c, 150, 52, 0.24, "sine", 0.22);
          this.noise(ac, out, c, 0.02, 3100, 1.6, 0.1);
          this.bell(ac, out, c + 0.004, 392, 0.42, 0.04, [1, 2.76, 5.4, 8.93], [1, 0.6, 0.32, 0.14]);
          [0.075, 0.115, 0.15].forEach((d, i) => { this.noise(ac, out, c + d, 0.02, 2400 - i * 300, 2.4, 0.06 - i * 0.012); this.tone(ac, out, c + d, 300 - i * 40, 180 - i * 30, 0.05, "triangle", 0.03 - i * 0.006); });
          this.tone(ac, out, c + 0.17, 120, 58, 0.14, "sine", 0.12); }
        this.buzz(12); break;
      case "ui_close": // 창 닫힘 "짤각-쿵": 사슬이 먼저 짤각, 투구 면갑이 내려와 묵직하게 닫힘
        [0, 0.035].forEach((d, i) => this.noise(ac, out, t + d, 0.018, 2200 + i * 400, 2.2, 0.045));
        { const s = t + 0.06;
          this.tone(ac, out, s, 128, 40, 0.28, "sine", 0.25);
          this.noise(ac, out, s, 0.024, 2400, 1.4, 0.11);
          this.noise(ac, out, s + 0.01, 0.12, 1100, 0.8, 0.06, 350);
          this.bell(ac, out, s + 0.004, 294, 0.36, 0.035, [1, 2.76, 5.4], [1, 0.5, 0.22]); }
        this.buzz(14); break;
      case "pick":     // 카드를 집어 듦: 종이 스침 + 위로 오르는 음
        this.noise(ac, out, t, 0.06, 3200, 1.2, 0.05);
        this.tone(ac, out, t, 520, 780, 0.07, "sine", 0.045); break;
      case "hover":    // 놓을 자리에 닿음: 아주 작은 딸깍
        this.tone(ac, out, t, 2100, 2100, 0.022, "sine", 0.035); break;
      case "suck":     // 칸이 빨아들임 (v3.7.2 또렷하게): 위로 좁아지며 빨려 드는 바람 + 따라 오르는 휘음 + 바닥의 당김
        this.noise(ac, out, t, 0.22, 520, 1.4, 0.075, 3800);
        this.tone(ac, out, t + 0.02, 230, 690, 0.19, "sine", 0.03);
        this.tone(ac, out, t + 0.03, 85, 140, 0.17, "sine", 0.06); break;
      case "place":    // 전장에 착지 (v3.7.2 "철크럭"): 또렷한 쿵·척 → 철(쇠 울림) → 크럭(걸쇠 고리가 차례로 걸림) → 마지막 맞물림
        this.tone(ac, out, t, 170, 52, 0.18, "sine", 0.24);
        this.noise(ac, out, t, 0.02, 3000, 1.6, 0.12);
        this.noise(ac, out, t + 0.006, 0.05, 1500, 1, 0.05, 700);
        this.bell(ac, out, t + 0.004, 430, 0.35, 0.045, [1, 2.76, 5.4, 8.93], [1, 0.6, 0.32, 0.14]);
        [0.05, 0.085, 0.115].forEach((d, i) => { this.noise(ac, out, t + d, 0.018, 2600 - i * 400, 2.4, 0.07 - i * 0.015); this.tone(ac, out, t + d, 340 - i * 50, 200 - i * 30, 0.045, "triangle", 0.03 - i * 0.007); });
        this.tone(ac, out, t + 0.13, 140, 70, 0.1, "sine", 0.1);
        this.noise(ac, out, t + 0.13, 0.03, 1400, 1.2, 0.04);
        this.buzz(16); break;
      case "move":     // 자리 바꾸기: 가볍게 미끄러짐
        this.noise(ac, out, t, 0.09, 1400, 1.4, 0.045, 700);
        this.tone(ac, out, t + 0.05, 240, 150, 0.06, "sine", 0.07); break;
      case "crystal":  // 결정화: 맑은 두 음
        this.tone(ac, out, t, 1320, 1760, 0.18, "sine", 0.05);
        this.tone(ac, out, t + 0.05, 1980, 2640, 0.22, "sine", 0.03); break;
      case "equip":    // 장착 (v3.7.2 "스르릉-철컥"): 쇠가 미끄러져 들어가고, 죔쇠가 묵직하게 물리고, 걸쇠가 딸깍
        this.noise(ac, out, t, 0.14, 2400, 3, 0.05, 5200);
        this.tone(ac, out, t, 1800, 2600, 0.12, "sine", 0.008);
        { const c = t + 0.13;
          this.noise(ac, out, c, 0.02, 2800, 1.6, 0.12);
          this.tone(ac, out, c, 200, 70, 0.14, "sine", 0.18);
          this.bell(ac, out, c + 0.004, 620, 0.3, 0.045, [1, 2.76, 5.4, 8.93], [1, 0.55, 0.3, 0.12]);
          this.noise(ac, out, c + 0.06, 0.015, 1800, 2.4, 0.06); }
        this.buzz(14); break;
      case "burn":     // 소각: 불 붙는 바람 소리
        this.noise(ac, out, t, 0.26, 600, 0.8, 0.09, 2400); break;
      case "deny":     // 안 됨: 낮게 두 번 툭툭 (거슬리지 않게)
        this.tone(ac, out, t, 150, 120, 0.06, "triangle", 0.08);
        this.tone(ac, out, t + 0.085, 130, 100, 0.07, "triangle", 0.07); break;
      case "confirm":  // 준비 완료 (v3.7.2 경쾌한 쇠): 칼날이 맞부딪는 "챙-챙!" 위로 4도 + 받쳐 주는 낮은 탁 + 반짝임
        this.tone(ac, out, t, 180, 90, 0.08, "sine", 0.08);
        this.noise(ac, out, t, 0.015, 5200, 2, 0.08);
        this.bell(ac, out, t, 1046, 0.35, 0.065, [1, 2.76, 5.4], [1, 0.45, 0.2]);
        this.tone(ac, out, t, 262, 262, 0.2, "triangle", 0.04);
        this.noise(ac, out, t + 0.075, 0.015, 6000, 2, 0.07);
        this.bell(ac, out, t + 0.075, 1397, 0.5, 0.065, [1, 2.76, 5.4], [1, 0.45, 0.2]);
        this.noise(ac, out, t + 0.08, 0.3, 9000, 4, 0.015); break;
      case "hit":      // 공격이 맞음
        this.tone(ac, out, t, 130, 45, 0.16, "sine", 0.24);
        this.noise(ac, out, t, 0.12, 900, 0.7, 0.13, 300);
        this.buzz(18); break;
      case "hitBig":   // 생명을 직접 침
        this.tone(ac, out, t, 110, 38, 0.24, "sine", 0.3);
        this.noise(ac, out, t, 0.2, 700, 0.6, 0.16, 200);
        this.buzz(28); break;
      case "draw":     // v1.9 덱에서 한 장 튀어 오름: 종이가 휙 스치는 소리 + 위로 오르는 작은 음
        this.noise(ac, out, t, 0.11, 2600, 1.3, 0.1, 5200);              // v3.7.2 더 또렷하게 (첫 손패 드로우에서 장마다 들리게)
        this.tone(ac, out, t + 0.02, 640, 980, 0.08, "sine", 0.045);
        this.tone(ac, out, t, 260, 140, 0.06, "sine", 0.07);
        this.noise(ac, out, t, 0.014, 3800, 2, 0.05); break;
      case "shuffle":  // v1.9 섞기: 촤라락 (짧은 종이 소리 여러 번)
        for (let i = 0; i < 7; i++) this.noise(ac, out, t + i * 0.035, 0.03, 2800 + i * 120, 1.6, 0.045);
        this.tone(ac, out, t + 0.26, 300, 220, 0.08, "sine", 0.04); break;
      case "swing":    // 뛰쳐나감: 바람 가르는 소리
        this.noise(ac, out, t, 0.16, 900, 1.6, 0.05, 2600); break;
      case "shatter": { // 카드가 부서짐 (v3.7.2 "콰작", 묵직하게): 갈라지는 폭음 → 무너지는 몸통과 땅울림 → 와지끈 부서지는 결 → 낮게 흩어지는 파편
        this.noise(ac, out, t, 0.04, 3000, 0.7, 0.2);                   // 콰: 갈라지는 순간
        this.noise(ac, out, t, 0.09, 900, 0.6, 0.16, 400);
        this.tone(ac, out, t, 140, 38, 0.32, "sine", 0.3);              // 작: 무너지는 몸통
        this.tone(ac, out, t + 0.01, 70, 34, 0.42, "sine", 0.2);        // 땅울림
        for (let i = 0; i < 10; i++) {                                    // 와지끈: 촘촘히 부서지는 결
          const dt = i * 0.011 + Math.random() * 0.008;
          this.noise(ac, out, t + 0.012 + dt, 0.012 + Math.random() * 0.01, 1200 + Math.random() * 2800, 1.6, 0.1 - i * 0.006);
        }
        this.bell(ac, out, t + 0.01, 760, 0.25, 0.02, [1, 2.32, 4.07], [1, 0.5, 0.25]);
        this.noise(ac, out, t + 0.05, 0.38, 300, 0.5, 0.08, 120);       // 흩어지는 낮은 와르르
        for (let i = 0; i < 5; i++) {                                    // 떨어지는 조각: 낮고 드문드문
          const dt = 0.1 + i * 0.06 + Math.random() * 0.03;
          this.noise(ac, out, t + dt, 0.02, 1800 + Math.random() * 1700, 3, 0.045 * (1 - i * 0.15));
        }
        this.buzz(30); break; }
      case "coinHeads": { // v3.7.1 앞면: 쇠 동전이 판에 떨어져 "칭—" 울리고, 한 번 더 튀어 "칭", 돌며 잦아드는 쇠 떨림
        const f = 2480;
        const coin = [1, 1.59, 2.14, 2.65, 2.92, 3.5], camp = [1, 0.72, 0.55, 0.4, 0.3, 0.18];   // 원판이 떠는 어긋난 배음
        this.noise(ac, out, t, 0.007, 7200, 0.6, 0.14);                  // 닿는 순간: 딱
        this.tone(ac, out, t, 5400, 4700, 0.012, "square", 0.012);
        this.ring(ac, out, t + 0.002, f, 0.95, 0.055, coin, camp, 5.5);   // 칭— (맥놀이로 쇠가 우는 떨림)
        this.tone(ac, out, t + 0.002, f * 0.5, f * 0.5, 0.18, "sine", 0.018); // 동전 몸통
        this.noise(ac, out, t + 0.105, 0.006, 7600, 0.6, 0.07);          // 한 번 더 튐
        this.ring(ac, out, t + 0.107, f, 0.55, 0.03, coin.slice(0, 4), camp, 7);
        [0.2, 0.258, 0.302, 0.336, 0.362, 0.382, 0.397].forEach((d, i) => {   // 돌며 눕는 덜그럭: 점점 빠르고 작게
          const a = 0.03 * (1 - i * 0.12);
          this.noise(ac, out, t + d, 0.005, 6600, 0.8, a);
          this.ring(ac, out, t + d, f, 0.1, a * 0.3, [1, 1.59, 2.14], [1, 0.6, 0.4], 0);
        });
        this.noise(ac, out, t + 0.01, 0.45, 9800, 5, 0.012);            // 쇠의 반짝임
        this.buzz(10); break; }
      case "coinTails": // 뒷면: 낮고 무딘 톡 (거슬리지 않게)
        this.tone(ac, out, t, 330, 230, 0.09, "triangle", 0.06);
        this.noise(ac, out, t, 0.03, 1300, 1, 0.035); break;

      /* ---------- v1.9.5 마법 (js/spellfx.js) ---------- */
      case "sp_reveal": // 마법이 뒤집힘: 차오르는 바람 + 위로 오르는 두 음 + 끝의 반짝
        this.noise(ac, out, t, 0.5, 380, 1.1, 0.05, 3200);
        this.tone(ac, out, t, 220, 440, 0.45, "sine", 0.05);
        this.tone(ac, out, t + 0.06, 330, 660, 0.4, "triangle", 0.025);
        this.bell(ac, out, t + 0.42, 1760, 0.35, 0.03, [1, 2.5], [1, 0.3]); break;
      case "sp_cannon": // 대포 발사: 쿵 + 짧은 폭음 + 날아가는 휘파람
        this.tone(ac, out, t, 170, 48, 0.22, "sine", 0.26);
        this.noise(ac, out, t, 0.09, 1100, 0.7, 0.14, 400);
        this.tone(ac, out, t + 0.06, 1900, 900, 0.38, "sine", 0.018); break;
      case "sp_boom":   // 폭발: 깊은 저음 + 흩어지는 잡음 + 파편
        this.tone(ac, out, t, 125, 34, 0.55, "sine", 0.32);
        this.noise(ac, out, t, 0.5, 900, 0.5, 0.2, 110);
        this.noise(ac, out, t, 0.1, 3200, 0.9, 0.1);
        this.noise(ac, out, t + 0.08, 0.25, 2200, 2, 0.03, 900);
        this.buzz(30); break;
      case "sp_meteor": // 떨어지는 유성: 내려가는 휘파람 바람
        this.noise(ac, out, t, 0.45, 2600, 2, 0.07, 500);
        this.tone(ac, out, t, 1500, 260, 0.45, "sine", 0.025); break;
      case "sp_fire":   // 불덩이 던짐: 화르륵
        this.noise(ac, out, t, 0.3, 520, 0.7, 0.1, 2300);
        this.tone(ac, out, t, 210, 120, 0.2, "sine", 0.05); break;
      case "sp_zap":    // 번개: 빠작빠작 + 아래로 떨어지는 전기음 + 멀리 우르릉
        for (let i = 0; i < 6; i++) this.noise(ac, out, t + i * 0.022, 0.02, 3800 + Math.random() * 3500, 3, 0.08);
        this.tone(ac, out, t, 1900, 70, 0.18, "square", 0.035);
        this.tone(ac, out, t + 0.05, 62, 38, 0.32, "sine", 0.14);
        this.buzz(16); break;
      case "sp_shoot":  // 쇠 리벳 쏨: 피슉
        this.noise(ac, out, t, 0.08, 2600, 1.6, 0.08, 5200);
        this.tone(ac, out, t, 900, 420, 0.07, "square", 0.015); break;
      case "sp_clang":  // 쇠 부딪침: 쨍 (어긋난 배음)
        this.bell(ac, out, t, 540, 0.45, 0.06, [1, 2.76, 5.4, 8.93], [1, 0.6, 0.35, 0.18]);
        this.noise(ac, out, t, 0.03, 5200, 2, 0.09); this.buzz(12); break;
      case "sp_heave":  // 바위 던짐: 무거운 휙
        this.noise(ac, out, t, 0.2, 520, 1, 0.07, 180);
        this.tone(ac, out, t, 140, 90, 0.18, "sine", 0.06); break;
      case "sp_rock":   // 바위 맞음: 쿵 + 와르르
        this.tone(ac, out, t, 92, 38, 0.32, "sine", 0.28);
        this.noise(ac, out, t, 0.3, 320, 0.6, 0.18, 90);
        for (let i = 0; i < 4; i++) this.noise(ac, out, t + 0.04 + i * 0.045, 0.03, 1300 + i * 300, 1.4, 0.05);
        this.buzz(22); break;
      case "sp_quake":  // 땅 울림: 낮게 오래 우르르 + 갈라지는 소리
        this.noise(ac, out, t, 0.9, 130, 0.45, 0.24, 55);
        this.tone(ac, out, t, 52, 30, 0.9, "sine", 0.22);
        for (let i = 0; i < 3; i++) this.noise(ac, out, t + 0.05 + i * 0.09, 0.04, 1800, 1.8, 0.05);
        this.buzz(40); break;
      case "sp_thorn":  // 가시·덩굴: 채찍 같은 탁 + 잎 스침
        this.noise(ac, out, t, 0.05, 3600, 1.2, 0.11);
        this.noise(ac, out, t + 0.03, 0.26, 1900, 1.3, 0.05, 700);
        this.tone(ac, out, t, 280, 560, 0.08, "triangle", 0.03); break;
      case "sp_arrows": // 활시위 퉁 + 화살이 날아가는 쉭쉭
        this.tone(ac, out, t, 230, 180, 0.14, "triangle", 0.06);
        for (let i = 0; i < 5; i++) this.noise(ac, out, t + 0.05 + i * 0.05, 0.1, 5200, 3, 0.03, 2400); break;
      case "sp_thunk":  // 화살이 박힘
        this.tone(ac, out, t, 320, 120, 0.06, "triangle", 0.07);
        this.noise(ac, out, t, 0.03, 1500, 1.2, 0.05); break;
      case "sp_water":  // 물덩이 던짐: 꿀렁
        this.tone(ac, out, t, 300, 620, 0.12, "sine", 0.05);
        this.noise(ac, out, t, 0.18, 900, 0.9, 0.04, 2400); break;
      case "sp_wave":   // 물결이 밀려옴
        this.noise(ac, out, t, 0.55, 280, 0.6, 0.11, 1600);
        this.noise(ac, out, t + 0.35, 0.4, 2200, 0.7, 0.08, 400); break;
      case "sp_splash": // 첨벙 + 물방울
        this.noise(ac, out, t, 0.32, 3000, 0.8, 0.12, 420);
        for (let i = 0; i < 4; i++) { const f = 600 + Math.random() * 600; this.tone(ac, out, t + 0.05 + i * 0.045, f, f * 1.9, 0.05, "sine", 0.035); }
        this.buzz(12); break;
      case "sp_dark":   // 어둠이 날아감: 맥놀이하는 낮은 웅웅 + 빨려 드는 바람
        this.tone(ac, out, t, 110, 82, 0.5, "sawtooth", 0.025);
        this.tone(ac, out, t, 116.5, 86, 0.5, "sawtooth", 0.025);
        this.noise(ac, out, t, 0.4, 260, 1, 0.06, 1400); break;
      case "sp_slash":  // 할퀴기·베기: 쉭쉭 두 번
        this.noise(ac, out, t, 0.09, 4200, 1.5, 0.12, 1400);
        this.noise(ac, out, t + 0.06, 0.09, 3600, 1.5, 0.1, 1200);
        this.tone(ac, out, t, 140, 60, 0.15, "sine", 0.12); this.buzz(14); break;
      case "sp_holy":   // 빛이 내려옴: 맑은 종 + 높은 화음
        this.bell(ac, out, t, 1046, 1.0, 0.05, [1, 2, 3, 4.2], [1, 0.45, 0.2, 0.08]);
        this.tone(ac, out, t + 0.06, 1568, 1568, 0.8, "sine", 0.025);
        this.noise(ac, out, t, 0.5, 8000, 4, 0.02); break;
      case "sp_smite":  // 빛이 내리꽂힘: 밝은 쨍 + 낮은 울림
        this.bell(ac, out, t, 1318, 0.6, 0.06, [1, 2, 3], [1, 0.4, 0.15]);
        this.tone(ac, out, t, 160, 70, 0.3, "sine", 0.16);
        this.noise(ac, out, t, 0.12, 5200, 1.2, 0.06); this.buzz(16); break;
      case "sp_wind":   // 바람 칼날: 휘이익
        this.noise(ac, out, t, 0.45, 420, 2, 0.08, 2800);
        this.noise(ac, out, t + 0.15, 0.35, 2800, 2, 0.05, 600); break;
      case "sp_gust":   // 바람이 휘감음
        this.noise(ac, out, t, 0.32, 1600, 1.6, 0.09, 520);
        this.tone(ac, out, t, 600, 300, 0.2, "sine", 0.025); break;
      case "sp_buff":   // 강화: 위로 오르는 네 음
        [523, 659, 784, 1046].forEach((f, i) => this.tone(ac, out, t + i * 0.055, f, f, 0.2, "triangle", 0.04));
        this.noise(ac, out, t + 0.1, 0.3, 7000, 3, 0.015); break;
      case "sp_debuff": // 약화: 어긋나게 내려가는 두 음 + 가라앉는 바람
        this.tone(ac, out, t, 440, 300, 0.36, "sawtooth", 0.022);
        this.tone(ac, out, t, 415, 280, 0.36, "sawtooth", 0.022);
        this.noise(ac, out, t, 0.32, 1300, 1, 0.04, 260); break;
      case "sp_shield": // 보호막: 유리처럼 맑은 웅
        this.tone(ac, out, t, 660, 660, 0.5, "sine", 0.04);
        this.tone(ac, out, t, 990, 990, 0.5, "sine", 0.025);
        this.tone(ac, out, t + 0.02, 1320, 1980, 0.14, "sine", 0.02);
        this.noise(ac, out, t, 0.22, 6200, 3, 0.03); break;
      case "sp_heal":   // 회복: 부드러운 반짝 화음
        [784, 988, 1175, 1568].forEach((f, i) => this.tone(ac, out, t + i * 0.05, f, f, 0.35, "sine", 0.03)); break;
      case "levelUp":   // v3.6 레벨 업: 낮은 울림 위로 차례로 오르는 종 화음 + 높은 종 + 반짝임
        this.tone(ac, out, t, 131, 131, 1.0, "sine", 0.08);
        [523, 659, 784].forEach((f, i) => this.bell(ac, out, t + i * 0.09, f, 0.9, 0.04, [1, 2, 3], [1, 0.35, 0.12]));
        this.bell(ac, out, t + 0.3, 1046, 1.4, 0.05, [1, 2, 3, 4.2], [1, 0.45, 0.2, 0.08]);
        this.tone(ac, out, t + 0.3, 1568, 1568, 1.1, "sine", 0.02);
        this.noise(ac, out, t + 0.28, 0.6, 8000, 4, 0.02); this.buzz(20); break;

      /* ---------- v3.7.1 카드가 카드를 침: 공격 종류별 소리 (종류는 FEEL.atkKind, 부르는 곳은 js/game.js atkSfx) ----------
         j = 높이 배율. "atk_" 뒤 이름이 ATK_SND.KO 의 종류 */
      case "atk_rend":  // 찢기 (발톱·송곳니·짐승): 세 갈래 발톱이 긁고 지나가며 찌이익 찢어짐 + 살에 닿는 둔한 몸통
        this.noise(ac, out, t, 0.05, 2400 * j, 1.2, 0.05, 5200 * j);
        [0, 0.085].forEach((p, k) => { for (let i = 0; i < 13; i++) {
          const dt = t + 0.015 + p + i * 0.0105 + Math.random() * 0.004;
          this.noise(ac, out, dt, 0.016, (2100 + Math.random() * 2800) * j, 1.6, (k ? 0.05 : 0.08) * (1 - i / 17));
        } });
        this.noise(ac, out, t + 0.02, 0.16, 3200 * j, 0.9, 0.05, 1300 * j);
        this.tone(ac, out, t + 0.02, 150 * j, 58 * j, 0.13, "sine", 0.17);
        this.buzz(16); break;
      case "atk_slash": // 베기 (검·칼): 슈앙 — 칼바람 + 날이 스치는 쉭 + 쇠가 우는 챙
        this.noise(ac, out, t, 0.07, 1800 * j, 1.4, 0.06, 6400 * j);
        this.noise(ac, out, t + 0.05, 0.06, 5600 * j, 1.2, 0.11, 2400 * j);
        this.ring(ac, out, t + 0.052, 1650 * j, 0.36, 0.028, [1, 2.71, 4.53], [1, 0.5, 0.25], 4);
        this.tone(ac, out, t + 0.05, 165 * j, 70 * j, 0.11, "sine", 0.13);
        this.buzz(14); break;
      case "atk_chop":  // 찍기 (도끼·처형): 묵직한 휙 뒤에 콱 — 박히는 둔탁함 + 나무 쪼개지는 결 + 짧은 쇠 울림
        this.noise(ac, out, t, 0.08, 900 * j, 1.2, 0.05, 2600 * j);
        { const k = t + 0.06;
          this.tone(ac, out, k, 140 * j, 50 * j, 0.18, "sine", 0.26);
          this.noise(ac, out, k, 0.03, 1600 * j, 1, 0.14);
          this.tone(ac, out, k, 430 * j, 300 * j, 0.05, "triangle", 0.06);
          this.noise(ac, out, k + 0.012, 0.09, 760 * j, 0.8, 0.07, 300);
          for (let i = 0; i < 3; i++) this.noise(ac, out, k + 0.02 + i * 0.022, 0.014, (1700 + i * 260) * j, 2, 0.04);
          this.ring(ac, out, k, 1100 * j, 0.2, 0.012, [1, 2.76], [1, 0.4], 3); }
        this.buzz(22); break;
      case "atk_pierce": // 찌르기 (창·활·작살): 슉 날아들어 푹 꽂히고, 자루가 부르르 떤다
        this.noise(ac, out, t, 0.05, 3000 * j, 2.5, 0.06, 7200 * j);
        this.tone(ac, out, t, 1300 * j, 2300 * j, 0.04, "sine", 0.014);
        this.noise(ac, out, t + 0.04, 0.025, 2600 * j, 1.6, 0.12);
        this.tone(ac, out, t + 0.04, 270 * j, 90 * j, 0.08, "sine", 0.16);
        [0, 0.03, 0.06, 0.09].forEach((d, i) => this.tone(ac, out, t + 0.05 + d, 200 * j, 185 * j, 0.03, "triangle", 0.028 * (1 - i * 0.2)));
        this.buzz(12); break;
      case "atk_whip":  // 후려치기 (덩굴·가시·채찍): 휘익 감겨 와 짝! + 잎이 스치며 흩어짐
        this.noise(ac, out, t, 0.09, 1200 * j, 2, 0.05, 5400 * j);
        this.noise(ac, out, t + 0.08, 0.012, 4600 * j, 0.8, 0.2);
        this.tone(ac, out, t + 0.08, 2400 * j, 900 * j, 0.015, "square", 0.02);
        this.tone(ac, out, t + 0.08, 230 * j, 110 * j, 0.07, "sine", 0.09);
        this.noise(ac, out, t + 0.09, 0.22, 2600 * j, 1.2, 0.035, 900 * j);
        this.buzz(14); break;
      case "atk_punch": // 때리기 (주먹·맨몸): 퍽 — 살과 살이 부딪는 둔한 타격 + 주먹뼈 딱
        this.noise(ac, out, t, 0.008, 3500 * j, 1, 0.06);
        this.noise(ac, out, t, 0.04, 1100 * j, 0.9, 0.17, 480 * j);
        this.tone(ac, out, t, 122 * j, 50 * j, 0.14, "sine", 0.3);
        this.tone(ac, out, t, 250 * j, 100 * j, 0.04, "triangle", 0.06);
        this.buzz(18); break;
      case "atk_smash": // 내려치기 (바위·나무·망치·방패): 쿠웅 — 깊은 둔탁함 + 부서지는 콰직 + 낮은 땅울림
        this.tone(ac, out, t, 96 * j, 36 * j, 0.3, "sine", 0.32);
        this.noise(ac, out, t, 0.05, 900 * j, 0.7, 0.18, 300);
        for (let i = 0; i < 5; i++) this.noise(ac, out, t + 0.025 + i * 0.03 + Math.random() * 0.01, 0.025, (900 + Math.random() * 1400) * j, 1.6, 0.05 * (1 - i * 0.15));
        this.noise(ac, out, t + 0.02, 0.26, 230, 0.6, 0.08, 80);
        this.buzz(26); break;
      case "atk_metal": // 쇠 타격 (골렘·오토마톤·강철 몸): 쾅 — 무거운 쇠판이 울리고 리벳이 덜그럭
        this.tone(ac, out, t, 120 * j, 45 * j, 0.22, "sine", 0.28);
        this.noise(ac, out, t, 0.025, 3000 * j, 1, 0.14);
        this.ring(ac, out, t + 0.003, 310 * j, 0.7, 0.045, [1, 2.76, 5.4, 8.93], [1, 0.6, 0.35, 0.18], 2.5);
        this.ring(ac, out, t + 0.003, 1240 * j, 0.32, 0.018, [1, 1.59, 2.14], [1, 0.5, 0.3], 6);
        [0.06, 0.1, 0.13].forEach((d, i) => this.noise(ac, out, t + d, 0.014, (4000 - i * 400) * j, 2.2, 0.045 - i * 0.01));
        this.buzz(24); break;
      case "atk_shot":  // 사격 (총·포)이 맞음: 날아드는 쉭 + 박히는 퍽 (가끔 튕겨 나가는 핑)
        this.noise(ac, out, t, 0.04, 5000, 3, 0.04, 2500);
        this.tone(ac, out, t + 0.03, 200 * j, 70 * j, 0.1, "sine", 0.2);
        this.noise(ac, out, t + 0.03, 0.03, 2200 * j, 1.2, 0.13);
        this.noise(ac, out, t + 0.04, 0.12, 900, 0.8, 0.05, 300);
        if (Math.random() < 0.4) this.tone(ac, out, t + 0.05, 3300 * j, 1700 * j, 0.16, "sine", 0.014);
        this.buzz(16); break;
      case "atk_blast": // 폭발 (폭약·척탄·화염): 콰앙 + 흩어지는 불티
        this.tone(ac, out, t, 112 * j, 32 * j, 0.45, "sine", 0.3);
        this.noise(ac, out, t, 0.4, 800, 0.5, 0.19, 120);
        this.noise(ac, out, t, 0.06, 3000, 0.8, 0.12);
        for (let i = 0; i < 5; i++) this.noise(ac, out, t + 0.08 + i * 0.04 + Math.random() * 0.02, 0.015, 2500 + Math.random() * 2200, 3, 0.04);
        this.buzz(28); break;
      case "atk_wind":  // 바람 (폭풍 마도): 휘잉 몰아쳐 샥 베고 지나감
        this.noise(ac, out, t, 0.18, 700 * j, 2.2, 0.08, 3200 * j);
        this.noise(ac, out, t + 0.12, 0.12, 4200 * j, 1.6, 0.1, 1600 * j);
        this.tone(ac, out, t + 0.12, 150 * j, 70 * j, 0.1, "sine", 0.12);
        this.buzz(14); break;
      case "atk_zap":   // 번개 (뇌전 마도): 빠지직 + 꽂히는 전기음 + 몸통 쿵
        for (let i = 0; i < 5; i++) this.noise(ac, out, t + i * 0.02, 0.018, 3800 + Math.random() * 3600, 3, 0.08);
        this.tone(ac, out, t, 1700 * j, 80 * j, 0.14, "square", 0.03);
        this.tone(ac, out, t + 0.03, 130 * j, 50 * j, 0.14, "sine", 0.18);
        this.buzz(16); break;
      case "atk_water": // 물 (조수 마도·기도): 철썩 + 물방울
        this.noise(ac, out, t, 0.24, 2400 * j, 0.8, 0.14, 480);
        this.tone(ac, out, t, 180 * j, 80 * j, 0.1, "sine", 0.15);
        for (let i = 0; i < 3; i++) { const f = (600 + Math.random() * 500) * j; this.tone(ac, out, t + 0.06 + i * 0.05, f, f * 1.9, 0.05, "sine", 0.032); }
        this.buzz(12); break;
      case "atk_dark":  // 어둠 (심연 마도·기도): 웅 — 맥놀이하는 낮은 울림이 덮치고 둔하게 퍽
        this.tone(ac, out, t, 92 * j, 58 * j, 0.32, "sawtooth", 0.028);
        this.tone(ac, out, t, 97 * j, 61 * j, 0.32, "sawtooth", 0.028);
        this.noise(ac, out, t, 0.28, 1300 * j, 1, 0.07, 260);
        this.tone(ac, out, t + 0.04, 110 * j, 40 * j, 0.2, "sine", 0.2);
        this.ring(ac, out, t + 0.04, 220 * j, 0.42, 0.014, [1, 2.4, 3.9], [1, 0.5, 0.25], 1.5);
        this.buzz(16); break;
      case "atk_holy":  // 빛 (성광 기도): 밝은 쨍 + 내려꽂히는 울림 + 반짝임
        this.bell(ac, out, t, 1318 * j, 0.5, 0.05, [1, 2, 3], [1, 0.4, 0.15]);
        this.tone(ac, out, t, 165 * j, 70 * j, 0.22, "sine", 0.17);
        this.noise(ac, out, t, 0.1, 5400, 1.2, 0.06);
        this.noise(ac, out, t + 0.04, 0.35, 8500, 4, 0.016);
        this.buzz(16); break;
      case "atk_earth": // 대지 (오크·트롤 주술): 북처럼 둥-쿵 + 흙이 튀고 주술 방울이 짤랑
        this.tone(ac, out, t, 82 * j, 44 * j, 0.32, "sine", 0.3);
        this.tone(ac, out, t, 164 * j, 90 * j, 0.06, "triangle", 0.07);
        this.noise(ac, out, t, 0.14, 420 * j, 0.7, 0.12, 150);
        [0.05, 0.08, 0.1].forEach((d, i) => this.noise(ac, out, t + d, 0.012, 2800 + i * 300, 3, 0.04 - i * 0.008));
        this.buzz(22); break;
      /* 나가는 소리: 근접은 "swing"(위), 무거운 것은 heave, 총은 fire, 폭약은 fuse, 마법·기도는 cast */
      case "atk_heave": // 무거운 것을 휘두름: 낮은 휘이
        this.noise(ac, out, t, 0.22, 380 * j, 1.2, 0.07, 1100 * j);
        this.tone(ac, out, t, 120 * j, 82 * j, 0.2, "sine", 0.05); break;
      case "atk_fire":  // 총·포를 쏨: 탕 + 짧은 메아리
        this.noise(ac, out, t, 0.01, 5000, 0.6, 0.18);
        this.noise(ac, out, t, 0.09, 1400 * j, 0.6, 0.22, 400);
        this.tone(ac, out, t, 180 * j, 50 * j, 0.12, "sine", 0.2);
        this.noise(ac, out, t + 0.06, 0.4, 600, 0.6, 0.045, 200);
        this.buzz(12); break;
      case "atk_fuse":  // 폭약을 던짐: 심지 치익 + 휙
        this.noise(ac, out, t, 0.22, 5200, 3, 0.035, 6800);
        this.noise(ac, out, t + 0.08, 0.14, 900, 1.6, 0.05, 2600); break;
      case "atk_cast":  // 마법·기도를 날림: 차오르는 바람 + 위로 오르는 음 + 끝의 반짝
        this.noise(ac, out, t, 0.24, 320, 1.2, 0.045, 2600);
        this.tone(ac, out, t, 220 * j, 660 * j, 0.24, "triangle", 0.025);
        this.bell(ac, out, t + 0.2, 1760 * j, 0.2, 0.016, [1, 2.5], [1, 0.3]); break;
      case "sp_block":  // 막힘: 작은 쨍
        this.tone(ac, out, t, 1800, 1600, 0.05, "square", 0.018);
        this.noise(ac, out, t, 0.03, 4200, 2, 0.05); break;
    }
  },
  /* v1.9.5 종소리: 배음(ratio)마다 사인파를 겹쳐 길게 울린다 */
  bell(ac, out, t0, f, dur, vol, ratios, amps) {
    (ratios || [1]).forEach((r, i) => this.tone(ac, out, t0, f * r, f * r, dur * (1 - i * 0.18), "sine", vol * ((amps && amps[i]) != null ? amps[i] : 1)));
  },
  /* v3.7.2 석조 전당 울림: 메뉴 · 창 소리에만 조금 섞는다(이름별 세기). 1.1초 잔향을 한 번 만들어 같이 쓴다 */
  HALL: { draw: 0.08, shatter: 0.18, place: 0.12, confirm: 0.16, equip: 0.14, handHover: 0.05, ui_click: 0.16, ui_card: 0.14, ui_deck: 0.18, ui_open: 0.26, ui_close: 0.26, select: 0.08, unselect: 0.08 },
  hallNode: null,
  hall(ac) {
    if (this.hallNode && this.hallNode.context === ac) return this.hallNode;
    const len = Math.floor(ac.sampleRate * 1.1), ir = ac.createBuffer(2, len, ac.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
    const cv = ac.createConvolver(), lp = ac.createBiquadFilter();
    cv.buffer = ir; lp.type = "lowpass"; lp.frequency.value = 2600; lp.Q.value = 0.4;
    cv.connect(lp).connect(ac.destination);
    return (this.hallNode = cv);
  },
  /* v3.7.1 쇠 울림: 배음마다 사인파 둘을 beat Hz 어긋나게 겹쳐(맥놀이) 쇠가 우는 떨림을 만든다. 높은 배음일수록 빨리 사라진다 */
  ring(ac, out, t0, f, dur, vol, ratios, amps, beat) {
    ratios.forEach((r, i) => {
      const d = dur / (1 + i * 0.45), a = Math.max(0.0002, vol * (amps && amps[i] != null ? amps[i] : 1));
      this.tone(ac, out, t0, f * r, f * r, d, "sine", a);
      if (beat) this.tone(ac, out, t0, f * r + beat * (1 + i * 0.3), f * r + beat * (1 + i * 0.3), d, "sine", a * 0.6);
    });
  },
  buzz(ms) { if (this.touch && navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} },

  /* v3.7.1 공격 소리. kind = ATK_SND 종류, phase "out"(나갈 때) | "hit"(맞을 때), lv = 카드 레벨(높을수록 낮고 무겁게) */
  atk(kind, phase, v, lv) {
    const L = lv || 3, j = (1.1 - L * 0.03) * (0.96 + Math.random() * 0.08);
    if (phase === "out") return this.play(ATK_SND.OUT[kind] || "swing", v == null ? 0.8 : v, j);
    this.play("atk_" + (ATK_SND.KO[kind] ? kind : "punch"), (v == null ? 1 : v) * (0.85 + L * 0.025), j);
  },
  atkKind(card, item) { return ATK_SND.kind(card, item); },

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

/* ---------- v3.7.2 메뉴 · 창 소리 ----------
   메뉴 단추 · 카드 · 덱 고르기를 누르면, 그리고 창(모달 · 소리 창 · 지도 · 결과 · 레벨 업 띠)이 열리고 닫히면 소리를 낸다.
   - 누름을 잡아(capture) 무엇을 눌렀는지 먼저 알아 두고, 그 누름의 처리가 다 끝난 뒤(setTimeout 0)에도 아무 소리가 나지 않았을 때만 낸다.
     그래서 이미 제 소리가 있는 곳(전장의 카드 · 준비 완료 · 교역소 사기 · 안 됨 토스트 · 수레바퀴)과 겹치지 않는다.
   - 창이 열리고 닫히는 것은 body의 자식이 붙고 떨어지는 것으로 안다. 창을 여는 누름은 단추 소리 대신 여는 소리 하나만 난다.
   - 전장(#board) 안에서는 단추만 맡는다. 카드 · 칸 · 성물은 js/game.js가 제 소리를 낸다 */
const FEEL_UI = {
  WIN: ".modal-wrap,.snd-pop,.kl-overlay,.result,.lv-banner",
  QUIET_OPEN: ".lv-banner",   // 열릴 때 제 소리(levelUp)가 있다
  DECK: ".deck-tile,.grp-tile,.fac-tile",
  CARD: "[data-card],.mull-card,.pc-face,.xp-card,[data-pick],.card,.hand-card",
  CLOSE: "[data-close],.kl-close,.f-x",
  BTN: 'button,.btn,a[href],[role="button"],[role="tab"],[data-act],[data-nav],[data-go],[data-tab],[data-x],[data-r],[data-z],select,summary,input[type="checkbox"],input[type="radio"]',
  closed: new WeakSet(),
  init() {
    if (typeof document === "undefined" || !document.body) return;
    addEventListener("click", e => this.onClick(e), true);
    addEventListener("keydown", e => this.onKey(e), true);
    new MutationObserver(recs => this.onMut(recs)).observe(document.body, { childList: true });
  },
  /* 무엇을 눌렀나 → 소리 이름 (없으면 null) */
  pick(t) {
    if (!t || !t.closest) return null;
    if (t.closest('input[type="range"],input:not([type]),input[type="text"],input[type="password"],textarea')) return null;
    const dis = t.closest("[disabled],[aria-disabled=\"true\"]");
    if (dis && !dis.classList.contains("deck-tile")) return null;
    const win = t.closest(this.WIN);
    if (win && t === win && win.matches(".modal-wrap")) { this.closed.add(win); return "ui_close"; }   // 창 바깥(어두운 바탕)을 눌러 닫음
    if (t.closest("#board")) {   // 전장: 카드 · 칸은 game.js가 맡는다
      const b = t.closest("button,.btn,.tb-btn"); if (!b) return null;
      if (b.matches('[data-act="log"]')) { const d = document.getElementById("logdrawer"); return d && d.classList.contains("open") ? "ui_close" : "ui_open"; }
      return "ui_click";
    }
    const cl = t.closest(this.CLOSE);
    if (cl) { if (win) this.closed.add(win); return "ui_close"; }
    if (t.closest(this.DECK)) return "ui_deck";
    if (t.closest(this.CARD)) return "ui_card";
    if (t.closest(this.BTN)) return "ui_click";
    return null;
  },
  onClick(e) {
    if (FEEL.level === "off") return;
    const name = this.pick(e.target); if (!name) return;
    const t0 = performance.now();
    setTimeout(() => { if (FEEL.lastAny < t0) FEEL.play(name); }, 0);
  },
  onKey(e) {
    if (e.key !== "Escape" || FEEL.level === "off") return;
    const wins = [...document.body.children].filter(x => x.matches(this.WIN));
    const top = wins[wins.length - 1]; if (!top) return;
    // 지도(kl-overlay)는 닫히는 그림이 끝난 뒤에야 떨어지므로 Esc 순간에 닫는 소리를 낸다
    setTimeout(() => { if (top.isConnected && top.matches(".kl-overlay") && !top.classList.contains("on") && !this.closed.has(top)) { this.closed.add(top); FEEL.play("ui_close"); } }, 0);
  },
  onMut(recs) {
    let open = false, close = false;
    for (const r of recs) {
      for (const n of r.addedNodes) if (n.nodeType === 1 && n.matches(this.WIN) && !n.matches(this.QUIET_OPEN)) open = true;
      for (const n of r.removedNodes) if (n.nodeType === 1 && n.matches(this.WIN) && !this.closed.has(n)) { this.closed.add(n); close = true; }
    }
    if (open) FEEL.play("ui_open"); else if (close) FEEL.play("ui_close");
  }
};
if (typeof document !== "undefined") document.addEventListener("DOMContentLoaded", () => FEEL_UI.init());

/* ---------- v3.7.1 공격 소리 종류: 카드가 카드를 칠 때 무엇으로 치는지 ----------
   정하는 차례: ① 마도 클래스는 언제나 마법(단체의 원소) ② 장착한 무기 아이템(검·도끼·창·총 …) ③ 유닛 이름의 낱말
   ④ 클래스와 단체로 정한 기본값. 기도 클래스는 ③에서 전사·짐승·칼 낱말만 보고, 아니면 단체의 기도 소리(빛·어둠·물·대지).
   새 카드가 엉뚱한 소리를 내면 아래 낱말 표에 낱말을 더한다(위에 있는 줄이 먼저). */
const ATK_SND = {
  KO: { rend: "찢기", slash: "베기", chop: "찍기", pierce: "찌르기", whip: "후려치기", punch: "때리기", smash: "내려치기", metal: "쇠 타격",
        shot: "사격", blast: "폭발", wind: "바람", zap: "번개", water: "물", dark: "어둠", holy: "빛", earth: "대지" },
  OUT: { smash: "atk_heave", metal: "atk_heave", chop: "atk_heave", shot: "atk_fire", blast: "atk_fuse",
         wind: "atk_cast", zap: "atk_cast", water: "atk_cast", dark: "atk_cast", holy: "atk_cast", earth: "atk_cast" },
  RANGED: ["shot", "blast", "pierce", "wind", "zap", "water", "dark", "holy", "earth"],
  /* 무기 아이템: 장착하면 이 소리로 친다. null = 무기가 아님(목걸이·부적 …) */
  ITEM: [
    [/목걸이|부적|문신|각인|인장|성표|성배|성유물|병$|망원경|탄띠/, null],
    [/개머리판/, "smash"], [/총|화염포|포$/, "shot"], [/도끼/, "chop"],
    [/검|단검|단도|칼/, "slash"], [/창|작살|장궁|활/, "pierce"], [/발톱|송곳니/, "rend"]
  ],
  /* 유닛 이름 낱말 (위에서부터 먼저 맞는 것) */
  WORD: [
    [/송곳니|발톱|사냥개|들개|늑대|곰|맹수|거수|멧돼지|천둥새|폭풍새|찢/, "rend"],
    [/말벌/, "pierce"],
    [/숨결/, "wind"],
    [/화승총|머스킷|저격|포수|포병|포대|포차|거포|화포|포문|요새포|돌격포|포단|산탄|사수|총/, "shot"],
    [/폭파|폭렬|작렬|폭약|척탄|박격|자폭|화염|화약|연막|폭뢰|공병|심지|불씨/, "blast"],
    [/도끼|처형|도살|수확/, "chop"],
    [/창|작살|궁|투창|화살/, "pierce"],
    [/골렘|오토마톤|강철|철갑|무쇠|리벳|철골|철판|증기|기관|거상|성채|압착기|방호기|수호기|요새|갑주|축전|전격|톱니|단조|대장장|대장인/, "metal"],
    [/검|칼|자객|결투|기사|집행|도둑|근위/, "slash"],
    [/덩굴|가시|뿌리|채찍/, "whip"],
    [/거인|거신|트렌트|고목|거목|바위|이끼|나무|방벽|장벽|성벽|분쇄|진동|거북|해머|망치|방패|숲|태고|나이테|심장|분노목|묘목|껍질/, "smash"],
    [/오크|전사|광전사|꼬마|짐꾼|일꾼|주먹|부랑자|약탈자|돌격/, "punch"]
  ],
  /* 기도 클래스가 이름으로 몸싸움 소리를 내는 낱말 종류 */
  PRAY_WORD: ["rend", "chop", "slash", "punch"],
  MAGIC: { A1: "dark", A3: "wind", B3: "zap", G3: "water" },
  PRAY:  { A1: "dark", A2: "holy", G1: "earth", G2: "earth", G3: "water" },
  ARMS:  { A1: "slash", A2: "slash", A3: "slash", B1: "shot", B2: "smash", B3: "shot", G1: "chop", G2: "pierce", G3: "pierce" },
  BODY:  { A3: "rend", B1: "blast", B2: "metal", B3: "metal", G2: "smash" },
  word(name, only) {
    for (const [re, k] of this.WORD) if (re.test(name) && (!only || only.includes(k))) return k;
    return null;
  },
  kind(card, item) {
    if (!card) return "punch";
    const cl = card.cl || "무도", g = card.group || "", name = card.name || "";
    if (cl === "마도") return this.MAGIC[g] || "zap";
    if (item && item.name) for (const [re, k] of this.ITEM) if (re.test(item.name)) { if (k) return k; break; }
    if (cl === "기도") return this.word(name, this.PRAY_WORD) || this.PRAY[g] || "holy";
    return this.word(name) || (cl === "무장" ? this.ARMS[g] || "slash" : this.BODY[g] || "punch");
  }
};
