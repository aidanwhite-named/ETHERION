/* ETHERION — 손맛(Feel): 누름·집기·놓기·맞기의 소리와 진동, 그리고 리듬을 맞추는 시간 값
   - 소리는 파일 없이 WebAudio로 합성한다. 음량은 설정에서 끄기/작게/보통 (localStorage etherion.pref.sfx)
   - 같은 소리가 한 프레임 안에 여러 번 겹치면 한 번만 낸다(컴퓨터가 카드 여러 장을 한꺼번에 놓을 때)
   - 터치로 조작할 때만 아주 짧게 진동한다(지원하는 기기)
   - 시간 값(FEEL.t)은 한곳에 모아 둔다. 리듬을 바꾸고 싶으면 여기 숫자만 고친다
   - v3.7.2 메뉴 · 창 소리(FEEL_UI, 이 파일 맨 아래): 메뉴 단추 · 카드 · 덱 고르기 · 창 열고 닫기에 묵직한 쇠 소리("철크럭")를
     저절로 붙인다. 다른 코드가 이미 소리를 냈으면 겹쳐 내지 않는다(FEEL.lastAny)
   - v3.7.1 코인 앞면은 쇠 동전 소리(ring: 어긋난 배음 + 맥놀이). 카드가 카드를 칠 때는 공격 종류(ATK_SND, 이 파일 아래)에 맞는
     소리를 낸다: 찢기·베기·찍기·찌르기·후려치기·때리기·내려치기·쇠 타격·사격·폭발·바람·번개·물·어둠·빛·대지
   - v3.8 고르기 · 누르기 · 집기 · 놓기 · 장착 · 메뉴 · 창 소리를 쇠가 쇠에 닿고 긁히는 소리로 바꿈: 낮은 몸통(사인 쿵)을 높이고 줄이고,
     쇠 울림 clang(어긋난 배음 + 맥놀이)과 쇠 마찰 scrape(붙었다 미끄러지는 잡음을 좁은 띠로 거름)를 앞에 둔다.
   - v3.8.1 더 날카롭고 쫀득하게: 맨 앞에 snap(0.5ms 만에 솟는 짝 + 뚝 떨어지는 딸깍), 쇠 울림 꼬리 약 절반, 석조 울림 절반.
     공격 · 마법 · 부서짐 소리는 그대로
   - v3.14 타격감: 모든 소리가 압축 · 리미터 버스(bus)를 지난다. 맞는 순간의 바닥 소리 imp_* (킥 · 왜곡 몸통 · 부서지는 결)는 js/impact.js가 낸다 */
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
    const out = ac.createGain(); out.gain.value = lv * (v == null ? 1 : v) * (this.TRIM[name] || 1); out.connect(this.bus(ac));   // v3.14 모든 소리는 압축 · 리미터 버스를 지난다
    if (this.HALL[name]) { const send = ac.createGain(); send.gain.value = this.HALL[name]; out.connect(send).connect(this.hall(ac)); }   // v3.7.2 석조 전당 울림
    const t = ac.currentTime + 0.002;
    const j = pj || 1;   // v3.7.1 높이 배율 (공격 소리: 레벨이 높을수록 낮고 무겁게, 칠 때마다 조금씩 다르게)
    switch (name) {
      /* 다크 판타지 리마스터: 가벼운 방울 대신 묵직한 청동·흑요석·무쇠 울림과 깊은 저음 무게감 */
      case "select": { // 핸드 고르기: 묵직한 청동 울림 + 낮은 가죽·돌 터치
        const r = 0.97 + Math.random() * 0.06;
        this.snap(ac, out, t, 1700 * r, 0.025);
        this.tone(ac, out, t, 190 * r, 95 * r, 0.055, "sine", 0.06);
        this.ring(ac, out, t + 0.008, 660 * r, 0.28, 0.032, [1, 1.5, 2.76], [1, 0.45, 0.16], 2.4); break; }
      case "unselect": { // 풀기: 낮고 절제된 청동·돌 탭
        const r = 0.97 + Math.random() * 0.06;
        this.snap(ac, out, t, 1350 * r, 0.018);
        this.tone(ac, out, t, 150 * r, 78 * r, 0.045, "sine", 0.045);
        this.ring(ac, out, t + 0.006, 495 * r, 0.18, 0.024, [1, 1.5, 2.3], [1, 0.35, 0.12], 1.8); break; }

      case "handHover": { // 핸드 카드 위에 마우스가 오름: 낮고 은은한 쇠·양피지 스침
        const j = 0.92 + Math.random() * 0.16;
        this.snap(ac, out, t, 1900 * j, 0.012);
        this.clang(ac, out, t, 1250 * j, 0.03, 0.006, 3, 0); break; }

      case "ui_click": // 메뉴 단추: 묵직한 무쇠 걸쇠
        this.snap(ac, out, t, 1550, 0.055);
        this.clang(ac, out, t, 680, 0.13, 0.042, 6, 0);
        this.tone(ac, out, t, 240, 105, 0.05, "sine", 0.085);
        this.snap(ac, out, t + 0.028, 1950, 0.02);
        this.clang(ac, out, t + 0.028, 1350, 0.035, 0.012, 3, 0); break;
      case "ui_card": { // 메뉴 · 상점 · 덱 조정실 카드 누름: 묵직한 양피지·청동 5도 울림
        const r = 0.97 + Math.random() * 0.06;
        this.snap(ac, out, t, 1850 * r, 0.028);
        this.tone(ac, out, t, 200 * r, 90 * r, 0.06, "sine", 0.07);
        this.ring(ac, out, t + 0.01, 587 * r, 0.32, 0.032, [1, 1.5, 2.76], [1, 0.45, 0.16], 2.2);
        this.ring(ac, out, t + 0.055, 880 * r, 0.28, 0.022, [1, 1.5, 2.76], [1, 0.4, 0.14], 2.5); break; }
      case "ui_deck":  // 덱 고르기: 무거운 철제 자물쇠 맞물림
        this.snap(ac, out, t, 2200, 0.028);
        this.clang(ac, out, t, 1550, 0.035, 0.016, 3, 0);
        { const k = t + 0.05;
          this.snap(ac, out, k, 1350, 0.065);
          this.clang(ac, out, k, 540, 0.19, 0.055, 7, 0);
          this.tone(ac, out, k, 220, 88, 0.065, "sine", 0.1); }
        this.buzz(10); break;
      case "ui_open":  // 창 열림: 무거운 석문·쇠사슬이 열림
        this.scrape(ac, out, t, 0.09, 1400, 2400, 0.04, 0.55);
        { const c = t + 0.06;
          this.snap(ac, out, c, 1250, 0.065);
          this.tone(ac, out, c, 200, 75, 0.08, "sine", 0.12);
          this.clang(ac, out, c, 460, 0.28, 0.055, 7, 0);
          [0.05, 0.078, 0.104].forEach((d, i) => { this.snap(ac, out, c + d, 2100 - i * 160, 0.015); this.clang(ac, out, c + d, 1150 - i * 100, 0.035, 0.015 - i * 0.003, 3, 0); });
          this.snap(ac, out, c + 0.125, 1750, 0.028);
          this.clang(ac, out, c + 0.125, 780, 0.065, 0.014, 5, 0); }
        this.buzz(12); break;
      case "ui_close": // 창 닫힘: 사슬이 걸리고 무거운 철판이 닫힘
        [0, 0.03].forEach((d, i) => { this.snap(ac, out, t + d, 2100, 0.015); this.clang(ac, out, t + d, 1350 + i * 200, 0.03, 0.014, 3, 0); });
        { const s = t + 0.055;
          this.snap(ac, out, s, 1150, 0.075);
          this.tone(ac, out, s, 190, 70, 0.09, "sine", 0.13);
          this.clang(ac, out, s, 380, 0.26, 0.06, 7, 0);
          this.scrape(ac, out, s + 0.01, 0.045, 2000, 1200, 0.022, 0.65); }
        this.buzz(14); break;
      case "pick":     // 카드를 집어 듦: 묵직한 쇠 테두리가 스치며 들림
        this.scrape(ac, out, t, 0.045, 2000, 3200, 0.038, 0.5);
        this.snap(ac, out, t + 0.03, 2100, 0.022);
        this.clang(ac, out, t + 0.03, 1200, 0.04, 0.011, 4, 0); break;
      case "hover":    // 놓을 자리에 닿음: 낮은 쇠 틱
        this.snap(ac, out, t, 2400, 0.018);
        this.clang(ac, out, t, 1900, 0.025, 0.009, 3, 0); break;
      case "suck":     // 칸이 빨아들임: 깊은 기류와 낮은 당김
        this.noise(ac, out, t, 0.22, 360, 1.3, 0.08, 2200);
        this.tone(ac, out, t + 0.02, 160, 440, 0.19, "sine", 0.035);
        this.tone(ac, out, t + 0.03, 68, 110, 0.18, "sine", 0.08); break;
      case "place":    // 전장에 착지: 석판 위에 묵직한 쇠 카드가 내려앉음
        this.snap(ac, out, t, 1350, 0.08);
        this.tone(ac, out, t, 210, 72, 0.11, "sine", 0.16);
        this.clang(ac, out, t, 520, 0.26, 0.065, 7, 0);
        [0.04, 0.066, 0.09].forEach((d, i) => { this.snap(ac, out, t + d, 2100 - i * 160, 0.018); this.clang(ac, out, t + d, 1300 - i * 120, 0.032, 0.016 - i * 0.003, 3, 0); });
        this.snap(ac, out, t + 0.11, 1650, 0.032);
        this.tone(ac, out, t + 0.11, 250, 120, 0.045, "sine", 0.065);
        this.clang(ac, out, t + 0.11, 860, 0.075, 0.016, 5, 0);
        this.buzz(16); break;
      case "move":     // 자리 바꾸기: 쇠판이 미끄러지다 짝
        this.scrape(ac, out, t, 0.06, 1600, 2400, 0.035, 0.6);
        this.snap(ac, out, t + 0.045, 1750, 0.035);
        this.clang(ac, out, t + 0.045, 840, 0.065, 0.02, 5, 0);
        this.tone(ac, out, t + 0.045, 260, 140, 0.035, "sine", 0.05); break;
      case "crystal":  // 결정화: 깊은 수정 공명
        this.tone(ac, out, t, 880, 1175, 0.22, "sine", 0.05);
        this.tone(ac, out, t + 0.05, 1320, 1760, 0.26, "sine", 0.032);
        this.tone(ac, out, t, 220, 293, 0.24, "sine", 0.04); break;
      case "equip":    // 장착: 칼날이 칼집을 긁으며 들어가 묵직하게 잠김
        this.scrape(ac, out, t, 0.11, 1800, 3400, 0.05, 0.55);
        { const c = t + 0.1;
          this.snap(ac, out, c, 1400, 0.085);
          this.tone(ac, out, c, 220, 82, 0.09, "sine", 0.14);
          this.clang(ac, out, c, 620, 0.24, 0.065, 7, 0);
          this.snap(ac, out, c + 0.045, 2200, 0.028);
          this.clang(ac, out, c + 0.045, 1550, 0.035, 0.02, 3, 0); }
        this.buzz(14); break;
      case "burn":     // 소각: 낮고 거친 불길
        this.noise(ac, out, t, 0.28, 420, 0.75, 0.11, 1600);
        this.tone(ac, out, t, 110, 62, 0.24, "sine", 0.08); break;
      case "deny":     // 안 됨: 무딘 무쇠·돌 두 번 탁탁
        this.snap(ac, out, t, 780, 0.028);
        this.tone(ac, out, t, 190, 105, 0.045, "sine", 0.08);
        this.clang(ac, out, t, 380, 0.05, 0.028, 4, 0);
        this.snap(ac, out, t + 0.075, 700, 0.025);
        this.tone(ac, out, t + 0.075, 170, 92, 0.045, "sine", 0.075);
        this.clang(ac, out, t + 0.075, 330, 0.05, 0.026, 4, 0); break;
      case "confirm":  // 준비 완료: 무거운 모루·검이 맞부딪는 5도 울림
        this.snap(ac, out, t, 1850, 0.06);
        this.tone(ac, out, t, 210, 95, 0.07, "sine", 0.09);
        this.clang(ac, out, t, 740, 0.32, 0.055, 7, 0);
        this.snap(ac, out, t + 0.07, 2150, 0.06);
        this.tone(ac, out, t + 0.07, 190, 85, 0.08, "sine", 0.08);
        this.clang(ac, out, t + 0.07, 1108, 0.44, 0.055, 7, 0);
        this.noise(ac, out, t + 0.075, 0.2, 6500, 3.5, 0.008); break;
      case "hit":      // 공격이 맞음
        this.tone(ac, out, t, 115, 38, 0.18, "sine", 0.27);
        this.noise(ac, out, t, 0.13, 720, 0.65, 0.14, 220);
        this.buzz(18); break;
      case "hitBig":   // 생명을 직접 침
        this.tone(ac, out, t, 96, 32, 0.26, "sine", 0.34);
        this.noise(ac, out, t, 0.22, 540, 0.55, 0.18, 150);
        this.buzz(28); break;
      case "draw":     // 덱에서 한 장 뽑음: 두꺼운 카드 스침 + 낮은 음
        this.noise(ac, out, t, 0.12, 1900, 1.2, 0.1, 3800);
        this.tone(ac, out, t + 0.02, 480, 740, 0.085, "sine", 0.045);
        this.tone(ac, out, t, 260, 150, 0.06, "sine", 0.055);
        this.snap(ac, out, t + 0.03, 2200, 0.015);
        this.clang(ac, out, t + 0.03, 1450, 0.04, 0.01, 4, 0); break;
      case "shuffle":  // 섞기: 묵직한 카드 뭉치 촤라락
        for (let i = 0; i < 7; i++) this.noise(ac, out, t + i * 0.035, 0.032, 2100 + i * 95, 1.4, 0.048);
        this.tone(ac, out, t + 0.26, 220, 140, 0.09, "sine", 0.055); break;
      case "swing":    // 뛰쳐나감: 낮고 묵직한 바람 가름
        this.noise(ac, out, t, 0.17, 680, 1.4, 0.06, 2000); break;
      case "shatter": { // 카드가 부서짐: 묵직한 파열 + 날카로운 파편
        const r = 0.95 + Math.random() * 0.1;
        this.snap(ac, out, t, 3100 * r, 0.12);
        this.noise(ac, out, t, 0.028, 3800 * r, 0.8, 0.16);
        this.noise(ac, out, t + 0.002, 0.055, 1200 * r, 0.85, 0.09, 520);
        this.tone(ac, out, t, 145 * r, 40, 0.16, "sine", 0.17);
        this.crackle(ac, out, t + 0.006, 0.17, 85, 1900, 0.34, 2.2);
        this.crackle(ac, out, t + 0.07, 0.21, 52, 1400, 0.22, 1.6);
        this.noise(ac, out, t + 0.03, 0.24, 2800, 0.7, 0.035, 1200);
        for (let i = 0; i < 7; i++) {
          const d = 0.11 + i * 0.045 + Math.random() * 0.04 + i * i * 0.006;
          const f = (1950 + Math.random() * 2400) * r;
          this.noise(ac, out, t + d, 0.006, f * 1.3, 1.2, 0.048 * (1 - i * 0.11));
          this.bell(ac, out, t + d, f, 0.07 + Math.random() * 0.05, 0.012 * (1 - i * 0.1), [1, 1.73, 2.61], [1, 0.45, 0.2]);
        }
        this.buzz(24); break; }
      case "coinHeads": { // 앞면: 묵직한 고대 금화·철화 울림
        const f = 1680;
        const coin = [1, 1.59, 2.14, 2.65, 2.92, 3.5], camp = [1, 0.72, 0.55, 0.4, 0.3, 0.18];
        this.noise(ac, out, t, 0.008, 5200, 0.6, 0.14);
        this.tone(ac, out, t, 3600, 2900, 0.012, "square", 0.012);
        this.tone(ac, out, t, 190, 80, 0.06, "sine", 0.06);
        this.ring(ac, out, t + 0.002, f, 0.95, 0.058, coin, camp, 5.2);
        this.tone(ac, out, t + 0.002, f * 0.5, f * 0.5, 0.2, "sine", 0.022);
        this.noise(ac, out, t + 0.105, 0.006, 5600, 0.6, 0.07);
        this.ring(ac, out, t + 0.107, f, 0.55, 0.032, coin.slice(0, 4), camp, 6.5);
        [0.2, 0.258, 0.302, 0.336, 0.362, 0.382, 0.397].forEach((d, i) => {
          const a = 0.03 * (1 - i * 0.12);
          this.noise(ac, out, t + d, 0.005, 4800, 0.8, a);
          this.ring(ac, out, t + d, f, 0.1, a * 0.3, [1, 1.59, 2.14], [1, 0.6, 0.4], 0);
        });
        this.noise(ac, out, t + 0.01, 0.45, 7400, 4.5, 0.01);
        this.buzz(10); break; }
      case "coinTails": // 뒷면: 낮고 무딘 나무·돌 톡
        this.tone(ac, out, t, 220, 130, 0.1, "triangle", 0.075);
        this.noise(ac, out, t, 0.035, 950, 0.9, 0.04); break;

      /* ---------- v1.9.5 마법 (js/spellfx.js) — 다크 판타지 리마스터 ---------- */
      case "sp_reveal": // 마법이 뒤집힘: 깊은 기류 + 묵직한 5도 상승 + 청동 종
        this.noise(ac, out, t, 0.5, 280, 1.0, 0.055, 2200);
        this.tone(ac, out, t, 146.8, 293.7, 0.45, "sine", 0.065);
        this.tone(ac, out, t + 0.06, 220, 440, 0.4, "triangle", 0.028);
        this.bell(ac, out, t + 0.42, 880, 0.45, 0.035, [1, 2.5], [1, 0.3]); break;
      case "sp_cannon": // 대포 발사: 깊은 포성 + 짧은 폭음 + 날아가는 휘파람
        this.tone(ac, out, t, 140, 36, 0.28, "sine", 0.3);
        this.noise(ac, out, t, 0.11, 820, 0.65, 0.16, 260);
        this.tone(ac, out, t + 0.06, 1300, 620, 0.38, "sine", 0.018); break;
      case "sp_boom":   // 폭발: 묵직한 초저음 + 흩어지는 폭음 + 파편
        this.tone(ac, out, t, 98, 26, 0.62, "sine", 0.36);
        this.noise(ac, out, t, 0.55, 680, 0.48, 0.22, 85);
        this.noise(ac, out, t, 0.12, 2400, 0.85, 0.11);
        this.noise(ac, out, t + 0.08, 0.28, 1600, 1.8, 0.035, 640);
        this.buzz(30); break;
      case "sp_meteor": // 떨어지는 유성: 무거운 하강 바람
        this.noise(ac, out, t, 0.48, 1900, 1.8, 0.08, 340);
        this.tone(ac, out, t, 980, 160, 0.48, "sine", 0.035); break;
      case "sp_fire":   // 불덩이 던짐: 낮은 화염 포효
        this.noise(ac, out, t, 0.32, 380, 0.65, 0.12, 1650);
        this.tone(ac, out, t, 160, 82, 0.24, "sine", 0.075); break;
      case "sp_zap":    // 번개: 빠작빠작 + 전기 방전 + 깊은 뇌명
        for (let i = 0; i < 6; i++) this.noise(ac, out, t + i * 0.022, 0.02, 2800 + Math.random() * 2600, 2.8, 0.08);
        this.tone(ac, out, t, 1450, 58, 0.2, "square", 0.032);
        this.tone(ac, out, t + 0.05, 56, 30, 0.38, "sine", 0.18);
        this.buzz(16); break;
      case "sp_shoot":  // 쇠 리벳 쏨: 묵직한 피슉
        this.noise(ac, out, t, 0.085, 1900, 1.5, 0.085, 3800);
        this.tone(ac, out, t, 680, 290, 0.075, "square", 0.016); break;
      case "sp_clang":  // 쇠 부딪침: 깊은 쇳소리
        this.bell(ac, out, t, 420, 0.5, 0.065, [1, 2.76, 5.4, 8.93], [1, 0.6, 0.35, 0.18]);
        this.tone(ac, out, t, 140, 62, 0.09, "sine", 0.08);
        this.noise(ac, out, t, 0.03, 3800, 1.8, 0.09); this.buzz(12); break;
      case "sp_heave":  // 바위 던짐: 무거운 휙
        this.noise(ac, out, t, 0.22, 380, 0.95, 0.08, 130);
        this.tone(ac, out, t, 115, 68, 0.2, "sine", 0.08); break;
      case "sp_rock":   // 바위 맞음: 쿵 + 와르르
        this.tone(ac, out, t, 78, 30, 0.36, "sine", 0.32);
        this.noise(ac, out, t, 0.34, 240, 0.55, 0.2, 70);
        for (let i = 0; i < 4; i++) this.noise(ac, out, t + 0.04 + i * 0.045, 0.03, 950 + i * 240, 1.3, 0.055);
        this.buzz(22); break;
      case "sp_quake":  // 땅 울림: 깊고 긴 지진 + 갈라지는 소리
        this.noise(ac, out, t, 0.95, 105, 0.42, 0.26, 45);
        this.tone(ac, out, t, 46, 24, 0.95, "sine", 0.26);
        for (let i = 0; i < 3; i++) this.noise(ac, out, t + 0.05 + i * 0.09, 0.045, 1300, 1.6, 0.055);
        this.buzz(40); break;
      case "sp_thorn":  // 가시·덩굴: 채찍 같은 탁 + 거친 잎 스침
        this.noise(ac, out, t, 0.05, 2800, 1.1, 0.11);
        this.noise(ac, out, t + 0.03, 0.28, 1400, 1.2, 0.055, 500);
        this.tone(ac, out, t, 220, 410, 0.085, "triangle", 0.035); break;
      case "sp_arrows": // 활시위 퉁 + 화살이 날아가는 쉭쉭
        this.tone(ac, out, t, 185, 135, 0.15, "triangle", 0.07);
        for (let i = 0; i < 5; i++) this.noise(ac, out, t + 0.05 + i * 0.05, 0.1, 3800, 2.6, 0.032, 1750); break;
      case "sp_thunk":  // 화살이 박힘
        this.tone(ac, out, t, 240, 92, 0.07, "triangle", 0.085);
        this.noise(ac, out, t, 0.032, 1150, 1.1, 0.055); break;
      case "sp_water":  // 물덩이 던짐: 깊은 꿀렁
        this.tone(ac, out, t, 220, 460, 0.14, "sine", 0.06);
        this.noise(ac, out, t, 0.2, 680, 0.85, 0.045, 1800); break;
      case "sp_wave":   // 물결이 밀려옴
        this.noise(ac, out, t, 0.58, 220, 0.55, 0.12, 1200);
        this.noise(ac, out, t + 0.35, 0.42, 1650, 0.65, 0.085, 300); break;
      case "sp_splash": // 첨벙 + 물방울
        this.noise(ac, out, t, 0.34, 2200, 0.75, 0.13, 320);
        for (let i = 0; i < 4; i++) { const f = 440 + Math.random() * 440; this.tone(ac, out, t + 0.05 + i * 0.045, f, f * 1.8, 0.055, "sine", 0.038); }
        this.buzz(12); break;
      case "sp_dark":   // 어둠이 날아감: 맥놀이하는 저음 드론 + 빨려 드는 심연 바람
        this.tone(ac, out, t, 73.4, 52, 0.55, "sawtooth", 0.032);
        this.tone(ac, out, t, 77.2, 54.5, 0.55, "sawtooth", 0.032);
        this.tone(ac, out, t, 55, 41, 0.55, "sine", 0.09);
        this.noise(ac, out, t, 0.45, 200, 0.9, 0.07, 950); break;
      case "sp_slash":  // 할퀴기·베기: 묵직한 칼바람 두 번
        this.noise(ac, out, t, 0.095, 3200, 1.4, 0.12, 1050);
        this.noise(ac, out, t + 0.06, 0.095, 2700, 1.4, 0.1, 880);
        this.tone(ac, out, t, 120, 48, 0.17, "sine", 0.14); this.buzz(14); break;
      case "sp_holy":   // 빛이 내려옴: 장엄한 대성당 청동 종 + 낮은 5도 울림
        this.tone(ac, out, t, 146.8, 146.8, 0.95, "sine", 0.065);
        this.bell(ac, out, t, 587.3, 1.1, 0.055, [1, 2, 3, 4.2], [1, 0.45, 0.2, 0.08]);
        this.tone(ac, out, t + 0.06, 880, 880, 0.9, "sine", 0.028);
        this.noise(ac, out, t, 0.5, 5200, 3.2, 0.016); break;
      case "sp_smite":  // 빛이 내리꽂힘: 무거운 심판의 종 + 천둥 저음
        this.bell(ac, out, t, 784, 0.65, 0.06, [1, 2, 3], [1, 0.4, 0.15]);
        this.tone(ac, out, t, 130, 44, 0.34, "sine", 0.2);
        this.noise(ac, out, t, 0.14, 3800, 1.1, 0.06); this.buzz(16); break;
      case "sp_wind":   // 바람 칼날: 깊은 휘이익
        this.noise(ac, out, t, 0.48, 320, 1.8, 0.09, 2000);
        this.noise(ac, out, t + 0.15, 0.35, 2000, 1.8, 0.055, 440); break;
      case "sp_gust":   // 바람이 휘감음
        this.noise(ac, out, t, 0.34, 1200, 1.5, 0.095, 380);
        this.tone(ac, out, t, 440, 210, 0.22, "sine", 0.032); break;
      case "sp_buff":   // 강화: D단조 5도 상승 + 깊은 저음 받침
        this.tone(ac, out, t, 146.8, 146.8, 0.42, "sine", 0.055);
        [293.7, 349.2, 440, 587.3].forEach((f, i) => this.tone(ac, out, t + i * 0.06, f, f, 0.24, "triangle", 0.042));
        this.noise(ac, out, t + 0.1, 0.3, 4800, 2.8, 0.012); break;
      case "sp_debuff": // 약화: 어긋나게 가라앉는 저음 + 심연의 바람
        this.tone(ac, out, t, 293.7, 196, 0.4, "sawtooth", 0.025);
        this.tone(ac, out, t, 277.2, 185, 0.4, "sawtooth", 0.025);
        this.tone(ac, out, t, 110, 73.4, 0.38, "sine", 0.07);
        this.noise(ac, out, t, 0.34, 950, 0.95, 0.045, 200); break;
      case "sp_shield": // 보호막: 두꺼운 비전 수정·방패 울림
        this.tone(ac, out, t, 440, 440, 0.55, "sine", 0.045);
        this.tone(ac, out, t, 660, 660, 0.55, "sine", 0.028);
        this.tone(ac, out, t + 0.02, 880, 1320, 0.16, "sine", 0.022);
        this.tone(ac, out, t, 146.8, 146.8, 0.45, "sine", 0.045);
        this.noise(ac, out, t, 0.24, 4200, 2.6, 0.025); break;
      case "sp_heal":   // 회복: 은은하고 깊은 D서스2 화음
        this.tone(ac, out, t, 146.8, 146.8, 0.5, "sine", 0.045);
        [392, 440, 587.3, 784].forEach((f, i) => this.tone(ac, out, t + i * 0.055, f, f, 0.4, "sine", 0.032)); break;
      case "levelUp":   // 레벨 업: 깊은 저음 위의 장엄한 대성당 D단조→5도 종 화음
        this.tone(ac, out, t, 110, 110, 1.15, "sine", 0.11);
        this.tone(ac, out, t + 0.28, 146.8, 146.8, 1.2, "sine", 0.075);
        [293.7, 349.2, 440].forEach((f, i) => this.bell(ac, out, t + i * 0.095, f, 0.95, 0.044, [1, 2, 3], [1, 0.35, 0.12]));
        this.bell(ac, out, t + 0.32, 587.3, 1.5, 0.058, [1, 2, 3, 4.2], [1, 0.45, 0.2, 0.08]);
        this.tone(ac, out, t + 0.32, 880, 880, 1.2, "sine", 0.024);
        this.noise(ac, out, t + 0.3, 0.6, 5400, 3.2, 0.015); this.buzz(20); break;

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

      /* ---------- v3.14 타격감(js/impact.js): 공격 종류 소리(atk_*) · 마법 소리(sp_*) 밑에 깔리는 "맞는 순간의 바닥".
         딱(첫 샘플부터 최대인 틱) → 쿵(사인이 뚝 떨어지는 킥, 왜곡을 걸어 작은 스피커에서도 들림) → 와작(왜곡 잡음이 닫히는 결).
         v = 세기(피해가 클수록 크고 길다) ---------- */
      case "imp_hit": {   // 유닛이 맞음: 묵직한 타격 바닥
        const p = v == null ? 1 : Math.min(1.3, v);
        this.burst(ac, out, t, 0.005, 1300, 0.48);
        this.kick(ac, out, t, 155 * j, 36, 0.24 + p * 0.1, 0.78, 2.4);
        this.tone(ac, out, t, 320 * j, 85, 0.06, "triangle", 0.17);
        this.crunch(ac, out, t + 0.002, 0.09 + p * 0.06, 3000, 260, 0.34, 4.2);
        this.buzz(20); break; }
      case "imp_kill": {  // 쓰러뜨림 · 카드가 부서짐: 깊은 땅울림과 파열
        this.burst(ac, out, t, 0.006, 1100, 0.58);
        this.kick(ac, out, t, 130, 28, 0.56, 0.92, 2.8);
        this.kick(ac, out, t + 0.012, 58, 22, 0.68, 0.48, 0);
        this.crunch(ac, out, t, 0.19, 3400, 220, 0.44, 5.2);
        this.burst(ac, out, t + 0.038, 0.01, 2200, 0.28);
        this.noise(ac, out, t + 0.02, 0.62, 190, 0.48, 0.16, 65);
        this.buzz(36); break; }
      case "imp_life": {  // 생명을 직접 침: 가슴을 울리는 초저음과 심장 박동
        this.burst(ac, out, t, 0.006, 950, 0.55);
        this.kick(ac, out, t, 115, 24, 0.5, 0.95, 3.0);
        this.crunch(ac, out, t, 0.16, 2100, 160, 0.38, 5.2);
        this.kick(ac, out, t + 0.18, 88, 26, 0.34, 0.52, 2.2);
        this.noise(ac, out, t + 0.02, 0.68, 150, 0.55, 0.15, 55);
        this.buzz([30, 90, 20]); break; }
      case "imp_crit": {  // 치명: 묵직한 강철 베임 + 깊은 울림
        this.snap(ac, out, t, 2600, 0.08);
        this.scrape(ac, out, t, 0.13, 3600, 1600, 0.085, 0.35);
        this.clang(ac, out, t + 0.005, 980, 0.55, 0.065, 7, 1);
        this.kick(ac, out, t, 140, 42, 0.16, 0.4, 1.8);
        this.burst(ac, out, t + 0.012, 0.008, 3000, 0.28); break; }
      case "imp_block": { // 막힘: 두꺼운 철 방패 공명 + 무거운 쿵
        this.snap(ac, out, t, 1800, 0.085);
        this.clang(ac, out, t, 420, 0.58, 0.12, 7, 1.1);
        this.clang(ac, out, t, 890, 0.34, 0.055, 5, 0);
        this.kick(ac, out, t, 125, 48, 0.14, 0.55, 1.8);
        this.ring(ac, out, t + 0.01, 1850, 0.34, 0.022, [1, 1.5, 2.2], [1, 0.5, 0.3], 3.5);
        this.noise(ac, out, t, 0.05, 3600, 0.9, 0.1);
        this.buzz(14); break; }
      case "imp_spell": { // 마법이 맞음: 깊은 저음 + 공기가 터지는 훅
        this.burst(ac, out, t, 0.005, 1150, 0.35);
        this.kick(ac, out, t, 145, 34, 0.32, 0.68, 2.2);
        this.noise(ac, out, t, 0.26, 1200, 0.58, 0.11, 220); break; }
      case "imp_land":    // 카드가 칸에 내려앉음: 묵직한 석판 착지
        this.kick(ac, out, t, 125, 44, 0.16, 0.48, 1.8);
        this.noise(ac, out, t, 0.09, 380, 0.65, 0.08, 140); break;
      case "imp_whoosh":  // 뛰쳐나감: 낮고 무거운 휙
        this.noise(ac, out, t, 0.24, 300, 1.1, 0.13, 1300);
        this.tone(ac, out, t, 78, 48, 0.2, "sine", 0.14); break;
    }
  },
  /* v1.9.5 종소리: 배음(ratio)마다 사인파를 겹쳐 길게 울린다 */
  /* v3.8 쇠가 쇠를 치는 소리: 쇠판·쇠막대가 떠는 어긋난 배음 + 짝 배음의 맥놀이(쇠가 우는 떨림) + 닿는 순간의 짧은 틱.
     높은 배음일수록 빨리 사라진다. v3.8.1 0.6ms 만에 솟는다. f = 바탕음, n = 배음 수(1~7), tick = 닿는 틱의 세기(0이면 없음) */
  METAL: [1, 1.48, 2.06, 2.62, 3.37, 4.21, 5.33],
  METAL_A: [1, 0.75, 0.6, 0.45, 0.32, 0.22, 0.14],
  clang(ac, out, t0, f, dur, vol, n, tick) {
    const k = Math.min(n || 5, this.METAL.length);
    for (let i = 0; i < k; i++) {
      const fr = f * this.METAL[i]; if (fr > 12000) break;
      const d = dur / (1 + i * 0.55), a = vol * this.METAL_A[i];
      [[fr, a], [fr * 1.004 + 2.5, a * 0.5]].forEach(([q, amp]) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.frequency.value = q;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(amp, t0 + 0.0006);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
        o.connect(g).connect(out); o.start(t0); o.stop(t0 + d + 0.02);
      });
    }
    if (tick) this.burst(ac, out, t0, 0.004, 4500, vol * 1.6 * tick);
  },
  /* v3.8.1 닿는 순간의 짧은 잡음: 첫 샘플부터 최대, 아주 빨리 꺼짐(noise()는 6ms에 걸쳐 솟아서 무르다). hp = 이 높이 아래는 자름 */
  burst(ac, out, t0, dur, hp, vol) {
    const sr = ac.sampleRate, n = Math.max(1, Math.floor(sr * dur)), buf = ac.createBuffer(1, n, sr), d = buf.getChannelData(0);
    const k = sr * dur * 0.22;
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / k);
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; f.type = "highpass"; f.frequency.value = hp; f.Q.value = 0.7; g.gain.value = vol;
    s.connect(f).connect(g).connect(out); s.start(t0);
  },
  /* v3.11.1 맑은 종: 유리 · 작은 쇠 종의 배음(1 · 2.76 · 5.4 · 8.9)을 맥놀이와 함께. 처음 2ms의 아주 높은 틱이 또렷함을 준다 */
  chime(ac, out, t0, f, dur, vol) {
    this.burst(ac, out, t0, 0.002, 7000, vol * 0.5);
    this.ring(ac, out, t0, f, dur, vol, [1, 2.76, 5.4, 8.9], [1, 0.42, 0.2, 0.08], 3.2);
  },
  /* v3.11.1 찰랑: 작은 방울 n개가 gap초 안팎 간격으로 흔들린다. 높이와 간격을 조금씩 어긋나게 해 같은 소리처럼 들리지 않는다 */
  jingle(ac, out, t0, n, f, gap, vol) {
    for (let i = 0; i < n; i++) {
      const at = t0 + i * gap * (0.7 + Math.random() * 0.6), q = f * (0.88 + Math.random() * 0.3), a = vol * (1 - i * 0.12);
      this.burst(ac, out, at, 0.0015, 8000, a * 0.6);
      this.ring(ac, out, at, q, 0.09 + Math.random() * 0.05, a, [1, 1.53, 2.31], [1, 0.5, 0.25], 6);
    }
  },
  /* v3.8.1 짝 달라붙는 순간: 높은 잡음 짝(3ms) + 높이가 f×2.4 → f×0.8로 뚝 떨어지는 딸깍(12ms).
     쇠 걸쇠가 맞물리거나 자석이 붙는 그 한순간. f가 높을수록 날카롭다 */
  snap(ac, out, t0, f, vol) {
    this.burst(ac, out, t0, 0.003, 5000, vol * 1.4);
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(f * 2.4, t0);
    o.frequency.exponentialRampToValueAtTime(f * 0.8, t0 + 0.012);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.0005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.022);
    o.connect(g).connect(out); o.start(t0); o.stop(t0 + 0.04);
  },
  /* v3.8 쇠끼리 긁히는 마찰: 붙었다 미끄러졌다 하는 거친 잡음을 좁은 띠 셋(어긋난 높이)에 걸러 f0 → f1로 민다.
     grit = 0~1 거칠기 */
  scrape(ac, out, t0, dur, f0, f1, vol, grit) {
    const sr = ac.sampleRate, n = Math.max(1, Math.floor(sr * dur)), gr = grit == null ? 0.5 : grit;
    const buf = ac.createBuffer(1, n, sr), d = buf.getChannelData(0);
    let a = 1, next = 0;
    for (let i = 0; i < n; i++) {
      if (i >= next) { a = Math.random() < 0.3 ? 0.15 : 0.5 + Math.random() * 0.5; next = i + Math.floor(sr * (0.0012 + Math.random() * 0.0035)); }
      d[i] = (Math.random() * 2 - 1) * (1 - gr + gr * a);
    }
    const s = ac.createBufferSource(), hp = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; hp.type = "highpass"; hp.frequency.value = Math.min(f0, f1) * 0.6;
    [[1, 1], [1.73, 0.6], [2.61, 0.35]].forEach(([r, amp]) => {
      const bp = ac.createBiquadFilter(), bg = ac.createGain();
      bp.type = "bandpass"; bp.Q.value = 14;
      bp.frequency.setValueAtTime(Math.min(f0 * r, 15000), t0);
      bp.frequency.exponentialRampToValueAtTime(Math.min(f1 * r, 15000), t0 + dur);
      bg.gain.value = amp * 4;
      s.connect(bp).connect(bg).connect(hp);
    });
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + dur * 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    hp.connect(g).connect(out); s.start(t0); s.stop(t0 + dur + 0.02);
  },
  /* v3.16.3 바스러지는 결: 아주 짧은 딸깍 n개를 한 버퍼에 흩뿌린다(앞쪽이 촘촘). 노드 하나라 가볍다.
     hp = 이 높이 아래는 깎음, curve가 클수록 앞쪽에 몰린다 */
  crackle(ac, out, t0, dur, n, hp, vol, curve) {
    const sr = ac.sampleRate, len = Math.max(1, Math.floor(sr * dur));
    const buf = ac.createBuffer(1, len, sr), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) {
      const u = Math.pow(Math.random(), curve || 1.5), pos = Math.floor(u * len * 0.92);
      const amp = (1 - u * 0.75) * (0.35 + Math.random() * 0.65) * (Math.random() < 0.5 ? -1 : 1);
      const gl = Math.floor(sr * (0.00025 + Math.random() * 0.0011)), tau = gl * 0.3;
      for (let k = 0; k < gl && pos + k < len; k++) d[pos + k] += (Math.random() * 1.4 - 0.4) * amp * Math.exp(-k / tau);
    }
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), pk = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; f.type = "highpass"; f.frequency.value = hp || 2000; f.Q.value = 0.7;
    pk.type = "peaking"; pk.frequency.value = (hp || 2000) * 2.2; pk.Q.value = 0.9; pk.gain.value = 5;
    g.gain.value = vol;
    s.connect(f).connect(pk).connect(g).connect(out); s.start(t0); s.stop(t0 + dur + 0.02);
  },
  bell(ac, out, t0, f, dur, vol, ratios, amps) {
    (ratios || [1]).forEach((r, i) => this.tone(ac, out, t0, f * r, f * r, dur * (1 - i * 0.18), "sine", vol * ((amps && amps[i]) != null ? amps[i] : 1)));
  },
  /* v3.7.2 석조 전당 울림: 메뉴 · 창 · 전투 · 마법 소리에 깊은 지하 석실 울림을 섞는다 */
  TRIM: { imp_kill: 0.8, imp_life: 0.78, deny: 0.42, equip: 0.72, move: 0.65, place: 0.76, select: 0.85, ui_card: 0.82, ui_click: 0.68, ui_close: 0.7, ui_deck: 0.78, ui_open: 0.8, unselect: 0.75 },
  HALL: {
    draw: 0.09, shatter: 0.22, place: 0.10, confirm: 0.16, equip: 0.11, handHover: 0.025,
    ui_click: 0.09, ui_card: 0.11, ui_deck: 0.12, ui_open: 0.18, ui_close: 0.18,
    select: 0.08, unselect: 0.06, pick: 0.035, move: 0.04, deny: 0.03, coinHeads: 0.10,
    imp_hit: 0.12, imp_kill: 0.22, imp_life: 0.25, imp_crit: 0.18, imp_block: 0.18, imp_spell: 0.16, imp_land: 0.10,
    sp_boom: 0.24, sp_quake: 0.26, sp_dark: 0.24, sp_holy: 0.26, sp_smite: 0.22, sp_zap: 0.16, sp_rock: 0.18, sp_clang: 0.18, sp_buff: 0.16, sp_debuff: 0.18, sp_heal: 0.18, levelUp: 0.28
  },
  hallNode: null,
  /* 다크 판타지 마스터 버스: 저역 무게(+3dB @115Hz) · 치찰음 억제(-2.8dB @3.2kHz, -3.2dB @5.2kHz) → 압축 → 리미터 */
  busNode: null,
  bus(ac) {
    if (this.busNode && this.busNode.context === ac) return this.busNode;
    const low = ac.createBiquadFilter(), mid = ac.createBiquadFilter(), hi = ac.createBiquadFilter();
    low.type = "lowshelf"; low.frequency.value = 115; low.Q.value = 0.7; low.gain.value = 3.0;
    mid.type = "peaking"; mid.frequency.value = 3200; mid.Q.value = 0.9; mid.gain.value = -2.8;
    hi.type = "highshelf"; hi.frequency.value = 5200; hi.Q.value = 0.7; hi.gain.value = -3.2;
    const c = ac.createDynamicsCompressor(), mk = ac.createGain(), lim = ac.createDynamicsCompressor();
    c.threshold.value = -15; c.knee.value = 10; c.ratio.value = 3.2; c.attack.value = 0.004; c.release.value = 0.16;
    mk.gain.value = 1.15;
    lim.threshold.value = -1.2; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = 0.001; lim.release.value = 0.09;
    low.connect(mid).connect(hi).connect(c).connect(mk).connect(lim).connect(ac.destination);
    return (this.busNode = low);
  },
  /* v3.14 왜곡(tanh): 낮은 소리에 배음을 붙여 노트북 · 휴대폰 스피커에서도 "쿵"이 들리게 */
  curves: {},
  drive(ac, out, amt) {
    const k = Math.round(amt * 10);
    if (!this.curves[k]) { const n = 1024, c = new Float32Array(n), a = k / 10, d = Math.tanh(a); for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; c[i] = Math.tanh(x * a) / d; } this.curves[k] = c; }
    const ws = ac.createWaveShaper(); ws.curve = this.curves[k]; ws.oversample = "2x"; ws.connect(out); return ws;
  },
  /* v3.14 킥: 사인이 f0 → f1로 뚝 떨어진다(앞 35%에서). 머리는 2ms 만에 솟고 잠깐 버틴 뒤 사라진다. drv > 0이면 왜곡 */
  kick(ac, out, t0, f0, f1, dur, vol, drv) {
    const dst = drv ? this.drive(ac, out, drv) : out;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(f0, t0); o.frequency.exponentialRampToValueAtTime(f1, t0 + dur * 0.35);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.002);
    g.gain.setValueAtTime(vol, t0 + dur * 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(dst); o.start(t0); o.stop(t0 + dur + 0.02);
  },
  /* v3.14 와작: 빨리 사라지는 잡음을 왜곡하고, 저역 필터를 f0 → f1로 닫는다(부서지며 가라앉는 결) */
  crunch(ac, out, t0, dur, f0, f1, vol, drv) {
    const sr = ac.sampleRate, n = Math.max(1, Math.floor(sr * dur)), buf = ac.createBuffer(1, n, sr), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (n * 0.3));
    const s = ac.createBufferSource(), lp = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; lp.type = "lowpass"; lp.Q.value = 1.2;
    lp.frequency.setValueAtTime(f0, t0); lp.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
    g.gain.value = vol;
    s.connect(lp).connect(g).connect(this.drive(ac, out, drv || 3)); s.start(t0);
  },
  hall(ac) {
    if (this.hallNode && this.hallNode.context === ac) return this.hallNode;
    const sr = ac.sampleRate, len = Math.floor(sr * 1.65), ir = ac.createBuffer(2, len, sr), rise = Math.floor(sr * 0.018);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) { const env = Math.pow(1 - i / len, 2.8) * (i < rise ? i / rise : 1); d[i] = (Math.random() * 2 - 1) * env; } }
    const cv = ac.createConvolver(), lp = ac.createBiquadFilter();
    cv.buffer = ir; lp.type = "lowpass"; lp.frequency.value = 2400; lp.Q.value = 0.5;   // 깊고 어두운 석조 성당 잔향
    cv.connect(lp).connect(this.bus(ac));
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
     그래서 이미 제 소리가 있는 곳(전장의 카드 · 준비 완료 · 상점 사기 · 안 됨 토스트 · 수레바퀴)과 겹치지 않는다.
   - 창이 열리고 닫히는 것은 body의 자식이 붙고 떨어지는 것으로 안다. 창을 여는 누름은 단추 소리 대신 여는 소리 하나만 난다.
   - 전장(#board) 안에서는 단추만 맡는다. 카드 · 칸 · 성물은 js/game.js가 제 소리를 낸다 */
const FEEL_UI = {
  WIN: ".modal-wrap,.snd-pop,.kl-overlay,.result,.lv-banner,.help-wrap",   // v3.9 튜토리얼 · 매뉴얼 창(js/manual.js)
  QUIET_OPEN: ".lv-banner",   // 열릴 때 제 소리(levelUp)가 있다
  DECK: ".deck-tile,.grp-tile,.fac-tile",
  CARD: "[data-card],.mull-card,.pc-face,.xp-card,[data-pick],.card,.hand-card",
  CLOSE: "[data-close],.kl-close,.f-x",
  BTN: 'button,.btn,a[href],[role="button"],[role="tab"],[data-act],[data-nav],[data-go],[data-tab],[data-x],[data-r],[data-z],select,summary,input[type="checkbox"],input[type="radio"]',
  closed: new WeakSet(),
  cardAt: 0,
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
    if (name === "ui_card") this.cardAt = t0;   // v3.11.1 카드를 눌러 원본 카드 창이 열리면 여는 소리 대신 카드 소리
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
    if (open) FEEL.play(this.cardAt && performance.now() - this.cardAt < 400 ? "ui_card" : "ui_open"); else if (close) FEEL.play("ui_close");
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
