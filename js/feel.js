/* ETHERION — 손맛(Feel): 누름·집기·놓기·맞기의 소리와 진동, 그리고 리듬을 맞추는 시간 값
   - 소리는 파일 없이 WebAudio로 합성한다. 음량은 설정에서 끄기/작게/보통 (localStorage etherion.pref.sfx)
   - 같은 소리가 한 프레임 안에 여러 번 겹치면 한 번만 낸다(컴퓨터가 카드 여러 장을 한꺼번에 놓을 때)
   - 터치로 조작할 때만 아주 짧게 진동한다(지원하는 기기)
   - 시간 값(FEEL.t)은 한곳에 모아 둔다. 리듬을 바꾸고 싶으면 여기 숫자만 고친다
   - v3.14 타격감: 모든 소리가 압축 · 리미터 버스(bus)를 지난다. 맞는 순간의 바닥 소리 imp_* (킥 · 왜곡 몸통 · 부서지는 결)는 js/impact.js가 낸다
   - 전면 리마스터: 묵직한 철컥거림(2단 래치), 맑고 입체적인 스테레오 전당 잔향(초기 반사 + 디퓨전), 선명한 어택과 풍부한 저음, 파친코 전용 사운드 */
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

  /* 스테레오 패닝 (-1 왼쪽 ~ +1 오른쪽). 미지원 환경이면 out 그대로 */
  pan(ac, out, p) {
    if (!p || !ac.createStereoPanner) return out;
    const n = ac.createStereoPanner();
    n.pan.value = Math.max(-1, Math.min(1, p));
    n.connect(out);
    return n;
  },

  /* 기본 소리 조각 */
  tone(ac, out, t0, f0, f1, dur, type, vol) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(Math.max(18, f0), t0);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(18, f1), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(out); o.start(t0); o.stop(t0 + dur + 0.025);
  },
  noise(ac, out, t0, dur, freq, q, vol, sweepTo) {
    const n = Math.max(1, Math.floor(ac.sampleRate * dur));
    const buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; f.type = "bandpass"; f.Q.value = q || 1;
    f.frequency.setValueAtTime(Math.max(30, freq), t0);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(Math.max(30, sweepTo), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f).connect(g).connect(out); s.start(t0); s.stop(t0 + dur + 0.025);
  },
  /* 스테레오 바람/스윙: 좌우로 스쳐가는 입체 기류 */
  whoosh(ac, out, t0, dur, f0, f1, vol, pan0, pan1) {
    const n = Math.max(1, Math.floor(ac.sampleRate * dur));
    const buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; f.type = "bandpass"; f.Q.value = 1.6;
    f.frequency.setValueAtTime(Math.max(40, f0), t0);
    f.frequency.exponentialRampToValueAtTime(Math.max(40, f1), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    if (ac.createStereoPanner && (pan0 != null || pan1 != null)) {
      const p = ac.createStereoPanner();
      p.pan.setValueAtTime(pan0 || 0, t0);
      if (pan1 != null) p.pan.linearRampToValueAtTime(pan1, t0 + dur);
      s.connect(f).connect(g).connect(p).connect(out);
    } else {
      s.connect(f).connect(g).connect(out);
    }
    s.start(t0); s.stop(t0 + dur + 0.025);
  },
  /* 묵직한 목재/두꺼운 카드 슬리브/석판 탭 */
  woodTap(ac, out, t0, f, vol) {
    this.tone(ac, out, t0, f, f * 0.48, 0.048, "sine", vol);
    this.tone(ac, out, t0, f * 2.1, f * 1.15, 0.022, "triangle", vol * 0.45);
    this.noise(ac, out, t0, 0.022, f * 3.2, 1.4, vol * 0.32, f * 1.6);
  },
  /* 2단 기계식 걸쇠 "철-컥!": 묵직한 1차 맞물림(철) → 26ms 뒤 단단한 스틸 잠금(컥) */
  latch(ac, out, t0, f, vol) {
    const pL = this.pan(ac, out, -0.12), pR = this.pan(ac, out, 0.12);
    // 1단: "철-" (묵직한 금속 슬라이드 + 저음 충격)
    this.burst(ac, pL, t0, 0.004, 2800, vol * 0.55);
    this.noise(ac, pL, t0, 0.022, f * 1.8, 2.2, vol * 0.42, f * 2.6);
    this.tone(ac, out, t0, 185, 72, 0.055, "sine", vol * 0.72);
    this.clang(ac, pL, t0, f * 0.72, 0.065, vol * 0.22, 4, 0);
    // 2단: "컥!" (26ms 뒤 단단하게 잠기는 스틸 스냅 + 댐핑된 몸통)
    const k = t0 + 0.026;
    this.burst(ac, pR, k, 0.0035, 4200, vol * 0.85);
    this.snap(ac, out, k, f * 1.35, vol * 0.48);
    this.kick(ac, out, k, 150, 52, 0.085, vol * 0.82, 1.4);
    this.clang(ac, pR, k, f * 1.08, 0.11, vol * 0.3, 5, 0.4);
    // 3단: 잠금 핀 미세 안착 (62ms 뒤)
    this.snap(ac, pL, k + 0.036, f * 1.9, vol * 0.16);
  },

  /* 이름 붙은 소리. v = 0~1 세기 */
  play(name, v, pj) {
    const lv = this.vol[this.level]; if (!lv) return;
    const now = performance.now();
    this.lastAny = now;
    const cool = name === "pach_tick" ? 16 : 45;
    if (this.last[name] && now - this.last[name] < cool) return;
    this.last[name] = now;
    const ac = this.ctx(); if (!ac) return;
    const out = ac.createGain(); out.gain.value = lv * (v == null ? 1 : v) * (this.TRIM[name] || 1); out.connect(this.bus(ac));
    if (this.HALL[name]) { const send = ac.createGain(); send.gain.value = this.HALL[name]; out.connect(send).connect(this.hall(ac)); }
    const t = ac.currentTime + 0.002;
    const j = pj || 1;
    switch (name) {
      /* ---------- 카드 조작 & 핸드 ---------- */
      case "select": { // 핸드/유닛 고르기: 묵직한 목재·청동 집어 올림 + 단단한 클릭
        const r = 0.96 + Math.random() * 0.08;
        this.woodTap(ac, out, t, 175 * r, 0.13);
        this.snap(ac, out, t + 0.006, 1450 * r, 0.035);
        this.ring(ac, out, t + 0.01, 587 * r, 0.24, 0.034, [1, 1.5, 2.5], [1, 0.45, 0.18], 2.2);
        break;
      }
      case "unselect": { // 고르기 풀기: 낮고 절제된 가죽·나무 내려놓음
        const r = 0.96 + Math.random() * 0.08;
        this.woodTap(ac, out, t, 130 * r, 0.1);
        this.tone(ac, out, t + 0.005, 380 * r, 190 * r, 0.06, "sine", 0.03);
        break;
      }
      case "handHover": { // 핸드에서 카드와 카드를 넘나듦: 묵직하고 고급스러운 중량감 ("툭-스윽")
        const r = 0.93 + Math.random() * 0.14;
        const p = this.pan(ac, out, (Math.random() - 0.5) * 0.25);
        this.woodTap(ac, p, t, 142 * r, 0.095);
        this.noise(ac, p, t + 0.004, 0.038, 480 * r, 1.1, 0.042, 290 * r);
        this.tone(ac, p, t, 78 * r, 48 * r, 0.045, "sine", 0.075);
        break;
      }

      /* ---------- UI / 메뉴 / 창 ---------- */
      case "ui_click": { // 메뉴 단추: 묵직하고 정교한 기계식 석판/강철 스위치
        const pL = this.pan(ac, out, -0.08), pR = this.pan(ac, out, 0.08);
        this.woodTap(ac, pL, t, 195, 0.12);
        this.snap(ac, pR, t, 1650, 0.05);
        this.clang(ac, pR, t + 0.003, 760, 0.09, 0.032, 4, 0.2);
        this.snap(ac, out, t + 0.022, 2100, 0.025);
        break;
      }
      case "ui_card": { // 메뉴 · 상점 · 도감 카드 누름: 중후한 양피지·청동 5도 화음
        const r = 0.97 + Math.random() * 0.06;
        this.woodTap(ac, out, t, 180 * r, 0.11);
        this.snap(ac, out, t + 0.004, 1750 * r, 0.032);
        this.ring(ac, this.pan(ac, out, -0.18), t + 0.01, 523.25 * r, 0.34, 0.036, [1, 1.5, 2.5], [1, 0.45, 0.15], 2.0);
        this.ring(ac, this.pan(ac, out, 0.18), t + 0.045, 784 * r, 0.3, 0.028, [1, 1.5, 2.5], [1, 0.4, 0.14], 2.4);
        break;
      }
      case "ui_deck": { // 덱 고르기: 무거운 철제 자물쇠 철컥
        this.latch(ac, out, t, 680, 0.14);
        this.buzz(10);
        break;
      }
      case "ui_open": { // 창 열림: 장엄한 석판·금속 문이 스르륵 열리며 걸쇠 풀림
        this.whoosh(ac, out, t, 0.16, 420, 1800, 0.065, -0.35, 0.35);
        this.latch(ac, out, t + 0.04, 620, 0.12);
        this.ring(ac, out, t + 0.065, 440, 0.26, 0.028, [1, 1.5], [1, 0.4], 1.5);
        this.buzz(10);
        break;
      }
      case "ui_close": { // 창 닫힘: 묵직하게 닫히며 잠김
        this.whoosh(ac, out, t, 0.11, 1600, 320, 0.055, 0.3, -0.3);
        this.latch(ac, out, t + 0.03, 500, 0.13);
        this.buzz(12);
        break;
      }

      /* ---------- 전장 배치: 철컥! 올라가는 맛 ---------- */
      case "pick": { // 카드를 집어 듦: 가죽/쇠 테두리가 스치며 찰칵 들림
        this.whoosh(ac, out, t, 0.065, 900, 2600, 0.045, -0.2, 0.2);
        this.woodTap(ac, out, t + 0.015, 195, 0.11);
        this.snap(ac, out, t + 0.025, 1950, 0.032);
        break;
      }
      case "hover": { // 놓을 자리에 닿음: 단단하고 짧은 자석/래치 틱
        this.snap(ac, out, t, 2200, 0.024);
        this.clang(ac, out, t, 1450, 0.032, 0.014, 3, 0);
        break;
      }
      case "suck": { // 칸이 빨아들임: 묵직하게 솟구쳐 오르며 기류가 모임
        this.whoosh(ac, out, t, 0.22, 260, 2200, 0.09, -0.3, 0.0);
        this.tone(ac, out, t + 0.01, 110, 380, 0.2, "sine", 0.06);
        this.tone(ac, out, t + 0.02, 58, 135, 0.19, "triangle", 0.055);
        break;
      }
      case "place": { // 전장 착지: 묵직한 석판 충격 + 선명한 2단 강철 "철-컥!" 잠금
        // 1) 무거운 착지 충격 + "철-"
        this.kick(ac, out, t, 165, 42, 0.18, 0.34, 1.8);
        this.burst(ac, out, t, 0.005, 1400, 0.16);
        this.noise(ac, this.pan(ac, out, -0.22), t, 0.045, 1600, 1.1, 0.09, 650);
        // 2) "컥!" — 단단한 강철 걸쇠가 슬롯에 꽉 맞물림 (28ms 뒤)
        const k = t + 0.028;
        this.burst(ac, this.pan(ac, out, 0.22), k, 0.004, 3600, 0.18);
        this.snap(ac, out, k, 1850, 0.095);
        this.kick(ac, out, k, 210, 62, 0.09, 0.22, 1.5);
        this.clang(ac, this.pan(ac, out, 0.15), k, 920, 0.14, 0.065, 5, 0.35);
        // 3) 잠금 핀 여운 클릭 (72ms 뒤)
        this.snap(ac, this.pan(ac, out, -0.15), t + 0.072, 2400, 0.032);
        this.clang(ac, out, t + 0.072, 1380, 0.065, 0.022, 3, 0);
        this.buzz(16);
        break;
      }
      case "move": { // 자리 바꾸기: 미끄러지다 철컥
        this.whoosh(ac, out, t, 0.07, 1100, 2200, 0.045, -0.25, 0.25);
        this.latch(ac, out, t + 0.035, 860, 0.11);
        break;
      }
      case "crystal": { // 결정화: 맑고 깊은 수정 공명 + 스파클
        this.ring(ac, this.pan(ac, out, -0.2), t, 880, 0.36, 0.045, [1, 1.5, 2.76], [1, 0.4, 0.15], 2.5);
        this.ring(ac, this.pan(ac, out, 0.2), t + 0.05, 1318.5, 0.4, 0.035, [1, 1.5, 2.5], [1, 0.35, 0.12], 3.0);
        this.tone(ac, out, t, 220, 293.7, 0.28, "sine", 0.055);
        this.noise(ac, out, t + 0.02, 0.24, 5800, 3.2, 0.015);
        break;
      }
      case "equip": { // 장착: 칼날이 칼집을 스르륵 가르고 들어가 묵직하게 "철컥!"
        this.whoosh(ac, out, t, 0.11, 1400, 4200, 0.06, -0.35, 0.25);
        this.scrape(ac, out, t, 0.1, 1800, 3400, 0.055, 0.5);
        this.latch(ac, out, t + 0.095, 780, 0.18);
        this.buzz(14);
        break;
      }
      case "burn": { // 소각: 거친 화염 포효 + 재가 흩어짐
        this.whoosh(ac, out, t, 0.3, 380, 1800, 0.12, -0.25, 0.25);
        this.tone(ac, out, t, 115, 55, 0.26, "sine", 0.11);
        this.crackle(ac, out, t + 0.04, 0.24, 24, 2400, 0.08, 1.4);
        break;
      }
      case "deny": { // 안 됨: 무딘 철문 두 번 쿵-쿵
        this.woodTap(ac, out, t, 135, 0.12);
        this.clang(ac, out, t, 310, 0.06, 0.032, 3, 0);
        this.woodTap(ac, out, t + 0.085, 115, 0.11);
        this.clang(ac, out, t + 0.085, 270, 0.06, 0.028, 3, 0);
        break;
      }
      case "confirm": { // 공격완료 / 방어완료 / 준비완료: 묵직한 전장 방패 타격 + 강철 5도 공명 + 웅장한 결의
        const pL = this.pan(ac, out, -0.28), pR = this.pan(ac, out, 0.28);
        // 1) 전쟁 북/방패 묵직한 타격
        this.kick(ac, out, t, 140, 40, 0.24, 0.36, 2.0);
        this.burst(ac, out, t, 0.005, 1800, 0.16);
        // 2) 좌우 강철 칼날 교차 & 걸쇠 잠금
        this.scrape(ac, pL, t, 0.065, 1800, 3800, 0.055, 0.45);
        this.snap(ac, out, t + 0.045, 2100, 0.08);
        // 3) 장엄한 D5도 브라스/청동 종 화음 (D4 -> A4 -> D5)
        this.ring(ac, pL, t + 0.02, 293.66, 0.55, 0.045, [1, 2, 3], [1, 0.42, 0.16], 1.8);
        this.ring(ac, pR, t + 0.055, 440, 0.62, 0.05, [1, 2, 3.01], [1, 0.4, 0.15], 2.2);
        this.ring(ac, out, t + 0.09, 587.33, 0.72, 0.042, [1, 1.5, 2.76], [1, 0.4, 0.14], 2.6);
        this.noise(ac, out, t + 0.08, 0.28, 5200, 2.4, 0.018);
        this.buzz(15);
        break;
      }
      case "hit": { // 일반 타격
        this.kick(ac, out, t, 130, 38, 0.18, 0.34, 2.0);
        this.burst(ac, out, t, 0.005, 1400, 0.16);
        this.noise(ac, out, t, 0.13, 850, 0.7, 0.14, 220);
        this.buzz(18);
        break;
      }
      case "hitBig": { // 생명 직접 타격: 묵직한 심장 충격
        this.kick(ac, out, t, 105, 28, 0.28, 0.42, 2.6);
        this.burst(ac, out, t, 0.006, 1100, 0.2);
        this.noise(ac, out, t, 0.24, 620, 0.55, 0.18, 130);
        this.buzz(28);
        break;
      }
      case "draw": { // 카드 뽑기: 두꺼운 카드가 스륵-착! 뽑히는 경쾌하고 묵직한 질감
        this.whoosh(ac, out, t, 0.11, 1400, 3600, 0.085, -0.25, 0.2);
        this.woodTap(ac, out, t + 0.025, 215, 0.09);
        this.snap(ac, out, t + 0.035, 2050, 0.022);
        break;
      }
      case "shuffle": { // 덱 섞기: 묵직한 카드 다발 차라락
        for (let i = 0; i < 7; i++) {
          const p = this.pan(ac, out, (i % 2 ? 1 : -1) * 0.22);
          this.woodTap(ac, p, t + i * 0.034, 170 + i * 18, 0.065);
          this.noise(ac, p, t + i * 0.034, 0.026, 1600 + i * 140, 1.3, 0.042);
        }
        this.latch(ac, out, t + 0.25, 640, 0.09);
        break;
      }
      case "swing": { // 뛰쳐나감: 입체적인 바람 가름
        this.whoosh(ac, out, t, 0.18, 520, 2200, 0.08, -0.35, 0.35);
        this.tone(ac, out, t, 140, 75, 0.14, "sine", 0.045);
        break;
      }
      case "shatter": { // 카드 파열: 묵직한 충격 + 좌우로 튀는 유리/석판 파편
        const r = 0.95 + Math.random() * 0.1;
        this.burst(ac, out, t, 0.006, 2200 * r, 0.24);
        this.kick(ac, out, t, 145 * r, 36, 0.2, 0.34, 2.2);
        this.crackle(ac, this.pan(ac, out, -0.3), t + 0.005, 0.18, 85, 1800, 0.32, 2.1);
        this.crackle(ac, this.pan(ac, out, 0.3), t + 0.04, 0.22, 60, 1400, 0.24, 1.6);
        for (let i = 0; i < 6; i++) {
          const d = 0.08 + i * 0.042 + Math.random() * 0.03;
          const f = (1800 + Math.random() * 2400) * r;
          const p = this.pan(ac, out, (Math.random() - 0.5) * 0.8);
          this.noise(ac, p, t + d, 0.007, f * 1.2, 1.2, 0.045 * (1 - i * 0.1));
          this.bell(ac, p, t + d, f, 0.08 + Math.random() * 0.04, 0.014 * (1 - i * 0.1), [1, 1.73, 2.61], [1, 0.45, 0.2]);
        }
        this.buzz(24);
        break;
      }
      case "coinHeads": { // 코인 앞면: 맑고 묵직한 황금 동전 핑~ 울림 + 탁자 착지
        const f = 1760;
        const coin = [1, 1.59, 2.14, 2.65, 2.92, 3.5], camp = [1, 0.72, 0.55, 0.4, 0.3, 0.18];
        this.burst(ac, out, t, 0.004, 4800, 0.14);
        this.tone(ac, out, t, 190, 80, 0.06, "sine", 0.07);
        this.ring(ac, this.pan(ac, out, -0.15), t + 0.002, f, 0.9, 0.062, coin, camp, 5.2);
        this.ring(ac, this.pan(ac, out, 0.15), t + 0.105, f, 0.52, 0.034, coin.slice(0, 4), camp, 6.5);
        [0.2, 0.258, 0.302, 0.336, 0.362].forEach((d, i) => {
          const a = 0.028 * (1 - i * 0.14);
          this.noise(ac, out, t + d, 0.005, 4800, 0.8, a);
          this.ring(ac, out, t + d, f, 0.09, a * 0.35, [1, 1.59, 2.14], [1, 0.6, 0.4], 0);
        });
        this.buzz(10);
        break;
      }
      case "coinTails": { // 코인 뒷면: 묵직하게 판에 떨어지는 둔탁한 턱
        this.woodTap(ac, out, t, 180, 0.11);
        this.tone(ac, out, t, 140, 75, 0.08, "triangle", 0.06);
        break;
      }

      /* ---------- 파친코 (js/pachinko.js) 전용 사운드 ---------- */
      case "pach_spin": { // SPIN 버튼 & 레버 당김: 철컥 걸쇠 + 경쾌한 기계 모터 가속
        this.latch(ac, out, t, 880, 0.14);
        this.whoosh(ac, out, t + 0.03, 0.24, 420, 3200, 0.08, -0.4, 0.4);
        this.tone(ac, out, t + 0.03, 220, 880, 0.22, "triangle", 0.055);
        this.chime(ac, this.pan(ac, out, 0.2), t + 0.06, 1046.5, 0.18, 0.035);
        break;
      }
      case "pach_tick": { // 릴 회전 틱: 실제 파친코 구슬/래칫 핀이 튕기는 경쾌하고 찰진 소리
        const r = 0.92 + Math.random() * 0.16;
        const p = this.pan(ac, out, (pj || 0));
        this.burst(ac, p, t, 0.002, 3400 * r, 0.075);
        this.tone(ac, p, t, 1450 * r, 620 * r, 0.016, "triangle", 0.055);
        this.tone(ac, p, t, 280 * r, 140 * r, 0.014, "sine", 0.045);
        break;
      }
      case "pach_stop": { // 릴 정지: 묵직한 기계 스토퍼 "철컥-팅!" (릴 순서에 따라 음정 상승)
        const p = this.pan(ac, out, ((j - 1.12) * 2.2) || 0);
        this.kick(ac, p, t, 180 * j, 60, 0.08, 0.24, 1.5);
        this.snap(ac, p, t, 2200 * j, 0.08);
        this.chime(ac, p, t + 0.008, 784 * j, 0.22, 0.045);
        break;
      }
      case "pach_win": { // 파친코 당첨! (pj = 1 단체, 2 진영, 3 카드)
        const lv = Math.round(pj || 1);
        const notes = lv === 1 ? [523.25, 659.25, 783.99, 1046.5]
          : lv === 2 ? [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98]
          : [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98, 2093.0, 2637.02];
        notes.forEach((f, i) => {
          const dt = t + i * 0.068;
          const p = this.pan(ac, out, (i % 2 ? 0.35 : -0.35));
          this.chime(ac, p, dt, f, 0.38, 0.065);
          this.tone(ac, p, dt, f * 0.5, f * 0.5, 0.22, "triangle", 0.032);
        });
        // 구슬/황금 동전 쏟아지는 소리
        const coins = lv * 7;
        for (let i = 0; i < coins; i++) {
          const dt = t + 0.1 + i * (0.042 + Math.random() * 0.02);
          const f = 2200 + Math.random() * 1400;
          const p = this.pan(ac, out, (Math.random() - 0.5) * 0.85);
          this.ring(ac, p, dt, f, 0.14, 0.026, [1, 1.58, 2.3], [1, 0.5, 0.25], 5);
        }
        this.kick(ac, out, t, 130, 45, 0.2, 0.26, 1.5);
        break;
      }
      case "pach_miss": { // 꽝: 짧고 깔끔한 기계 정지
        this.woodTap(ac, out, t, 145, 0.09);
        this.tone(ac, out, t + 0.03, 220, 140, 0.12, "triangle", 0.04);
        break;
      }

      /* ---------- 마법 (js/spellfx.js) ---------- */
      case "sp_reveal":
        this.whoosh(ac, out, t, 0.45, 320, 2400, 0.075, -0.35, 0.35);
        this.tone(ac, out, t, 146.8, 293.7, 0.42, "sine", 0.07);
        this.chime(ac, out, t + 0.36, 880, 0.45, 0.042);
        break;
      case "sp_cannon":
        this.kick(ac, out, t, 150, 34, 0.3, 0.4, 2.4);
        this.burst(ac, out, t, 0.008, 1200, 0.22);
        this.noise(ac, out, t, 0.14, 820, 0.65, 0.18, 220);
        this.whoosh(ac, out, t + 0.04, 0.34, 1400, 520, 0.045, -0.3, 0.3);
        break;
      case "sp_boom":
        this.kick(ac, out, t, 105, 24, 0.6, 0.46, 2.8);
        this.burst(ac, out, t, 0.01, 900, 0.28);
        this.noise(ac, this.pan(ac, out, -0.25), t, 0.52, 720, 0.5, 0.22, 85);
        this.noise(ac, this.pan(ac, out, 0.25), t + 0.02, 0.42, 1600, 0.8, 0.12, 240);
        this.crackle(ac, out, t + 0.05, 0.32, 32, 1800, 0.14, 1.5);
        this.buzz(30);
        break;
      case "sp_meteor":
        this.whoosh(ac, out, t, 0.46, 2400, 320, 0.11, -0.45, 0.45);
        this.tone(ac, out, t, 880, 140, 0.46, "sine", 0.045);
        break;
      case "sp_fire":
        this.whoosh(ac, out, t, 0.32, 380, 1900, 0.13, -0.3, 0.3);
        this.tone(ac, out, t, 160, 75, 0.24, "sine", 0.08);
        break;
      case "sp_zap":
        for (let i = 0; i < 6; i++) this.noise(ac, this.pan(ac, out, (Math.random() - 0.5) * 0.7), t + i * 0.02, 0.02, 3200 + Math.random() * 2800, 2.4, 0.09);
        this.tone(ac, out, t, 1550, 62, 0.2, "square", 0.036);
        this.kick(ac, out, t + 0.04, 85, 28, 0.36, 0.28, 2.2);
        this.buzz(16);
        break;
      case "sp_shoot":
        this.burst(ac, out, t, 0.004, 3200, 0.14);
        this.whoosh(ac, out, t, 0.085, 1900, 4200, 0.09, -0.2, 0.2);
        this.tone(ac, out, t, 680, 260, 0.075, "triangle", 0.03);
        break;
      case "sp_clang":
        this.bell(ac, this.pan(ac, out, -0.2), t, 420, 0.52, 0.07, [1, 2.76, 5.4, 8.93], [1, 0.6, 0.35, 0.18]);
        this.kick(ac, out, t, 145, 58, 0.1, 0.18, 1.5);
        this.burst(ac, this.pan(ac, out, 0.2), t, 0.005, 3400, 0.15);
        this.buzz(12);
        break;
      case "sp_heave":
        this.whoosh(ac, out, t, 0.22, 420, 140, 0.09, -0.3, 0.3);
        this.tone(ac, out, t, 115, 68, 0.2, "sine", 0.085);
        break;
      case "sp_rock":
        this.kick(ac, out, t, 90, 26, 0.36, 0.38, 2.4);
        this.noise(ac, out, t, 0.32, 280, 0.55, 0.2, 70);
        for (let i = 0; i < 4; i++) this.noise(ac, this.pan(ac, out, (Math.random() - 0.5) * 0.6), t + 0.04 + i * 0.045, 0.032, 950 + i * 240, 1.3, 0.06);
        this.buzz(22);
        break;
      case "sp_quake":
        this.noise(ac, out, t, 0.92, 115, 0.42, 0.26, 45);
        this.kick(ac, out, t, 56, 22, 0.92, 0.36, 2.6);
        for (let i = 0; i < 4; i++) this.crackle(ac, this.pan(ac, out, (i % 2 ? 0.3 : -0.3)), t + 0.06 + i * 0.1, 0.08, 14, 1100, 0.08, 1.2);
        this.buzz(40);
        break;
      case "sp_thorn":
        this.burst(ac, out, t, 0.004, 3000, 0.15);
        this.noise(ac, this.pan(ac, out, -0.2), t, 0.06, 2800, 1.1, 0.11);
        this.noise(ac, this.pan(ac, out, 0.2), t + 0.03, 0.28, 1400, 1.2, 0.06, 500);
        this.tone(ac, out, t, 220, 410, 0.085, "triangle", 0.04);
        break;
      case "sp_arrows":
        this.tone(ac, out, t, 185, 135, 0.15, "triangle", 0.075);
        for (let i = 0; i < 5; i++) this.whoosh(ac, out, t + 0.04 + i * 0.048, 0.1, 3800, 1750, 0.042, -0.35 + i * 0.16, 0.35 - i * 0.12);
        break;
      case "sp_thunk":
        this.woodTap(ac, out, t, 210, 0.14);
        this.noise(ac, out, t, 0.03, 1250, 1.1, 0.06);
        break;
      case "sp_water":
        this.tone(ac, out, t, 220, 480, 0.14, "sine", 0.065);
        this.whoosh(ac, out, t, 0.2, 680, 1900, 0.055, -0.25, 0.25);
        break;
      case "sp_wave":
        this.whoosh(ac, out, t, 0.56, 220, 1300, 0.13, -0.45, 0.45);
        this.noise(ac, out, t + 0.32, 0.42, 1650, 0.65, 0.09, 300);
        break;
      case "sp_splash":
        this.noise(ac, out, t, 0.34, 2400, 0.75, 0.14, 320);
        for (let i = 0; i < 5; i++) {
          const f = 440 + Math.random() * 520;
          this.tone(ac, this.pan(ac, out, (Math.random() - 0.5) * 0.7), t + 0.04 + i * 0.042, f, f * 1.85, 0.055, "sine", 0.042);
        }
        this.buzz(12);
        break;
      case "sp_dark":
        this.tone(ac, this.pan(ac, out, -0.25), t, 73.4, 52, 0.55, "sawtooth", 0.035);
        this.tone(ac, this.pan(ac, out, 0.25), t, 77.2, 54.5, 0.55, "sawtooth", 0.035);
        this.tone(ac, out, t, 55, 41, 0.55, "sine", 0.1);
        this.whoosh(ac, out, t, 0.45, 200, 950, 0.075, -0.3, 0.3);
        break;
      case "sp_slash":
        this.whoosh(ac, out, t, 0.095, 3400, 1050, 0.13, -0.45, 0.45);
        this.whoosh(ac, out, t + 0.06, 0.095, 2900, 880, 0.11, 0.45, -0.45);
        this.kick(ac, out, t, 125, 48, 0.16, 0.22, 1.5);
        this.buzz(14);
        break;
      case "sp_holy":
        this.tone(ac, out, t, 146.8, 146.8, 0.95, "sine", 0.07);
        this.bell(ac, this.pan(ac, out, -0.2), t, 587.3, 1.1, 0.06, [1, 2, 3, 4.2], [1, 0.45, 0.2, 0.08]);
        this.bell(ac, this.pan(ac, out, 0.2), t + 0.05, 880, 0.95, 0.038, [1, 2, 3], [1, 0.4, 0.15]);
        this.noise(ac, out, t, 0.5, 5600, 2.8, 0.02);
        break;
      case "sp_smite":
        this.bell(ac, out, t, 784, 0.65, 0.065, [1, 2, 3], [1, 0.4, 0.15]);
        this.kick(ac, out, t, 140, 42, 0.34, 0.3, 2.0);
        this.burst(ac, out, t, 0.006, 3200, 0.18);
        this.buzz(16);
        break;
      case "sp_wind":
        this.whoosh(ac, out, t, 0.46, 320, 2200, 0.1, -0.5, 0.5);
        this.whoosh(ac, out, t + 0.14, 0.34, 2100, 440, 0.065, 0.4, -0.4);
        break;
      case "sp_gust":
        this.whoosh(ac, out, t, 0.34, 1300, 380, 0.1, 0.35, -0.35);
        this.tone(ac, out, t, 440, 210, 0.22, "sine", 0.036);
        break;
      case "sp_buff":
        this.tone(ac, out, t, 146.8, 146.8, 0.42, "sine", 0.06);
        [293.7, 349.2, 440, 587.3].forEach((f, i) => this.tone(ac, this.pan(ac, out, (i - 1.5) * 0.22), t + i * 0.055, f, f, 0.26, "triangle", 0.048));
        this.noise(ac, out, t + 0.08, 0.3, 5200, 2.5, 0.016);
        break;
      case "sp_debuff":
        this.tone(ac, this.pan(ac, out, -0.2), t, 293.7, 196, 0.4, "sawtooth", 0.028);
        this.tone(ac, this.pan(ac, out, 0.2), t, 277.2, 185, 0.4, "sawtooth", 0.028);
        this.tone(ac, out, t, 110, 73.4, 0.38, "sine", 0.075);
        this.whoosh(ac, out, t, 0.34, 950, 200, 0.05, 0.25, -0.25);
        break;
      case "sp_shield":
        this.ring(ac, this.pan(ac, out, -0.2), t, 440, 0.52, 0.048, [1, 1.5], [1, 0.5], 2.0);
        this.ring(ac, this.pan(ac, out, 0.2), t + 0.02, 880, 0.42, 0.028, [1, 1.5], [1, 0.4], 2.5);
        this.tone(ac, out, t, 146.8, 146.8, 0.45, "sine", 0.05);
        this.noise(ac, out, t, 0.22, 4400, 2.4, 0.028);
        break;
      case "sp_heal":
        this.tone(ac, out, t, 146.8, 146.8, 0.5, "sine", 0.05);
        [392, 440, 587.3, 784].forEach((f, i) => this.tone(ac, this.pan(ac, out, (i - 1.5) * 0.2), t + i * 0.05, f, f, 0.42, "sine", 0.038));
        break;
      case "levelUp":
        this.tone(ac, out, t, 110, 110, 1.15, "sine", 0.12);
        this.tone(ac, out, t + 0.26, 146.8, 146.8, 1.2, "sine", 0.08);
        [293.7, 349.2, 440].forEach((f, i) => this.bell(ac, this.pan(ac, out, (i - 1) * 0.28), t + i * 0.09, f, 0.95, 0.048, [1, 2, 3], [1, 0.35, 0.12]));
        this.bell(ac, out, t + 0.3, 587.3, 1.5, 0.065, [1, 2, 3, 4.2], [1, 0.45, 0.2, 0.08]);
        this.noise(ac, out, t + 0.28, 0.6, 5600, 2.8, 0.02);
        this.buzz(20);
        break;

      /* ---------- v3.7.1 카드가 카드를 침: 입체감 + 선명한 어택 + 공간 잔향 ---------- */
      case "atk_rend": { // 찢기: 좌우 엇갈린 세 갈래 발톱 찢김 + 묵직한 타격
        this.whoosh(ac, out, t, 0.05, 2400 * j, 5400 * j, 0.06, -0.35, 0.35);
        [0, 0.075].forEach((p, k) => {
          const panN = this.pan(ac, out, k ? 0.32 : -0.32);
          for (let i = 0; i < 11; i++) {
            const dt = t + 0.012 + p + i * 0.01 + Math.random() * 0.003;
            this.noise(ac, panN, dt, 0.016, (2200 + Math.random() * 2800) * j, 1.5, (k ? 0.06 : 0.09) * (1 - i / 15));
          }
        });
        this.burst(ac, out, t + 0.015, 0.005, 2800 * j, 0.16);
        this.kick(ac, out, t + 0.015, 160 * j, 54 * j, 0.14, 0.24, 1.8);
        this.buzz(16);
        break;
      }
      case "atk_slash": { // 베기: 좌→우 칼바람 + 면도날 슬라이스 + 강철 공명 잔향
        this.whoosh(ac, out, t, 0.075, 1800 * j, 6800 * j, 0.075, -0.48, 0.48);
        this.burst(ac, this.pan(ac, out, 0.2), t + 0.046, 0.004, 4200 * j, 0.18);
        this.noise(ac, this.pan(ac, out, 0.25), t + 0.048, 0.065, 5800 * j, 1.1, 0.12, 2200 * j);
        this.ring(ac, this.pan(ac, out, -0.2), t + 0.05, 1680 * j, 0.38, 0.034, [1, 2.71, 4.53], [1, 0.5, 0.25], 4);
        this.kick(ac, out, t + 0.048, 175 * j, 65 * j, 0.12, 0.2, 1.5);
        this.buzz(14);
        break;
      }
      case "atk_chop": { // 찍기: 무거운 스윙 + 콰직 박히는 도끼 + 나무/갑주 파편
        this.whoosh(ac, out, t, 0.075, 900 * j, 2800 * j, 0.065, -0.3, 0.2);
        const k = t + 0.055;
        this.kick(ac, out, k, 150 * j, 46 * j, 0.19, 0.34, 2.1);
        this.burst(ac, out, k, 0.005, 1800 * j, 0.22);
        this.tone(ac, out, k, 430 * j, 280 * j, 0.055, "triangle", 0.07);
        this.crackle(ac, this.pan(ac, out, 0.28), k + 0.01, 0.1, 18, 1500 * j, 0.12, 1.4);
        this.ring(ac, this.pan(ac, out, -0.2), k, 1120 * j, 0.22, 0.018, [1, 2.76], [1, 0.4], 3);
        this.buzz(22);
        break;
      }
      case "atk_pierce": { // 찌르기: 슉 날아들어 푹! 꽂히고 자루 떨림
        this.whoosh(ac, out, t, 0.05, 3000 * j, 7400 * j, 0.07, -0.35, 0.35);
        this.burst(ac, out, t + 0.038, 0.004, 2800 * j, 0.18);
        this.kick(ac, out, t + 0.038, 250 * j, 82 * j, 0.09, 0.24, 1.6);
        [0, 0.028, 0.056, 0.084].forEach((d, i) => this.tone(ac, this.pan(ac, out, (i % 2 ? 0.18 : -0.18)), t + 0.048 + d, 210 * j, 185 * j, 0.032, "triangle", 0.032 * (1 - i * 0.2)));
        this.buzz(12);
        break;
      }
      case "atk_whip": { // 후려치기: 휘익 감겨 와 짝! 터지는 스테레오 스냅
        this.whoosh(ac, out, t, 0.085, 1200 * j, 5600 * j, 0.065, -0.45, 0.45);
        this.burst(ac, out, t + 0.075, 0.004, 4600 * j, 0.26);
        this.tone(ac, out, t + 0.075, 2400 * j, 860 * j, 0.016, "square", 0.024);
        this.kick(ac, out, t + 0.075, 220 * j, 95 * j, 0.08, 0.14, 1.2);
        this.noise(ac, this.pan(ac, out, 0.25), t + 0.085, 0.2, 2600 * j, 1.2, 0.04, 900 * j);
        this.buzz(14);
        break;
      }
      case "atk_punch": { // 때리기: 묵직한 육체 타격 + 펀치
        this.burst(ac, out, t, 0.005, 1600 * j, 0.16);
        this.noise(ac, out, t, 0.045, 1150 * j, 0.9, 0.17, 440 * j);
        this.kick(ac, out, t, 130 * j, 46 * j, 0.15, 0.38, 2.0);
        this.tone(ac, out, t, 260 * j, 98 * j, 0.045, "triangle", 0.07);
        this.buzz(18);
        break;
      }
      case "atk_smash": { // 내려치기: 거대한 땅울림 + 좌우 파편
        this.kick(ac, out, t, 102 * j, 32 * j, 0.32, 0.42, 2.5);
        this.burst(ac, out, t, 0.007, 1100 * j, 0.24);
        this.crackle(ac, this.pan(ac, out, -0.35), t + 0.02, 0.16, 22, 1100 * j, 0.12, 1.3);
        this.crackle(ac, this.pan(ac, out, 0.35), t + 0.035, 0.16, 18, 1300 * j, 0.1, 1.3);
        this.noise(ac, out, t + 0.02, 0.26, 230, 0.6, 0.09, 75);
        this.buzz(26);
        break;
      }
      case "atk_metal": { // 쇠 타격: 무거운 강철 충돌 + 스테레오 공명 + 리벳 튕김
        this.kick(ac, out, t, 128 * j, 42 * j, 0.22, 0.34, 2.0);
        this.burst(ac, out, t, 0.005, 3200 * j, 0.22);
        this.ring(ac, this.pan(ac, out, -0.22), t + 0.003, 320 * j, 0.72, 0.05, [1, 2.76, 5.4, 8.93], [1, 0.6, 0.35, 0.18], 2.6);
        this.ring(ac, this.pan(ac, out, 0.22), t + 0.003, 1260 * j, 0.34, 0.022, [1, 1.59, 2.14], [1, 0.5, 0.3], 6);
        [0.055, 0.095, 0.125].forEach((d, i) => this.noise(ac, this.pan(ac, out, (i % 2 ? 0.3 : -0.3)), t + d, 0.014, (4000 - i * 400) * j, 2.2, 0.048 - i * 0.01));
        this.buzz(24);
        break;
      }
      case "atk_shot": { // 사격이 맞음: 날아드는 탄환 + 박히는 충격 + 튕김
        this.whoosh(ac, out, t, 0.04, 5200, 2400, 0.055, -0.25, 0.25);
        this.burst(ac, out, t + 0.028, 0.004, 2400 * j, 0.2);
        this.kick(ac, out, t + 0.028, 210 * j, 64 * j, 0.11, 0.28, 1.8);
        this.noise(ac, out, t + 0.035, 0.12, 950, 0.8, 0.06, 280);
        if (Math.random() < 0.45) this.tone(ac, this.pan(ac, out, (Math.random() - 0.5) * 0.7), t + 0.048, 3400 * j, 1650 * j, 0.16, "sine", 0.018);
        this.buzz(16);
        break;
      }
      case "atk_blast": { // 폭발: 폭압 킥 + 스테레오 화염 + 파편
        this.kick(ac, out, t, 118 * j, 28 * j, 0.44, 0.4, 2.6);
        this.burst(ac, out, t, 0.008, 1800, 0.24);
        this.noise(ac, this.pan(ac, out, -0.25), t, 0.38, 820, 0.5, 0.2, 110);
        this.noise(ac, this.pan(ac, out, 0.25), t + 0.02, 0.3, 1400, 0.7, 0.12, 220);
        this.crackle(ac, out, t + 0.06, 0.22, 20, 2400, 0.09, 1.4);
        this.buzz(28);
        break;
      }
      case "atk_wind": { // 바람: 좌우 휘몰아쳐 베고 지나감
        this.whoosh(ac, out, t, 0.18, 700 * j, 3400 * j, 0.09, -0.5, 0.5);
        this.whoosh(ac, out, t + 0.1, 0.14, 4200 * j, 1400 * j, 0.11, 0.45, -0.45);
        this.kick(ac, out, t + 0.11, 155 * j, 65 * j, 0.1, 0.16, 1.2);
        this.buzz(14);
        break;
      }
      case "atk_zap": { // 번개: 스테레오 방전 + 꽂히는 전기 충격
        for (let i = 0; i < 5; i++) this.noise(ac, this.pan(ac, out, (Math.random() - 0.5) * 0.7), t + i * 0.018, 0.018, 3800 + Math.random() * 3600, 2.6, 0.09);
        this.tone(ac, out, t, 1700 * j, 80 * j, 0.14, "square", 0.034);
        this.kick(ac, out, t + 0.028, 135 * j, 45 * j, 0.15, 0.26, 2.0);
        this.buzz(16);
        break;
      }
      case "atk_water": { // 물: 철썩 + 스테레오 물방울
        this.whoosh(ac, out, t, 0.24, 2400 * j, 480, 0.14, -0.35, 0.35);
        this.kick(ac, out, t, 180 * j, 72 * j, 0.11, 0.2, 1.4);
        for (let i = 0; i < 4; i++) {
          const f = (600 + Math.random() * 520) * j;
          this.tone(ac, this.pan(ac, out, (Math.random() - 0.5) * 0.7), t + 0.05 + i * 0.045, f, f * 1.9, 0.05, "sine", 0.036);
        }
        this.buzz(12);
        break;
      }
      case "atk_dark": { // 어둠: 좌우 맥놀이 심연 드론 + 둔탁한 타격
        this.tone(ac, this.pan(ac, out, -0.3), t, 92 * j, 58 * j, 0.32, "sawtooth", 0.032);
        this.tone(ac, this.pan(ac, out, 0.3), t, 97 * j, 61 * j, 0.32, "sawtooth", 0.032);
        this.whoosh(ac, out, t, 0.28, 1300 * j, 240, 0.08, -0.3, 0.3);
        this.kick(ac, out, t + 0.035, 115 * j, 36 * j, 0.22, 0.28, 2.0);
        this.ring(ac, out, t + 0.035, 220 * j, 0.42, 0.018, [1, 2.4, 3.9], [1, 0.5, 0.25], 1.5);
        this.buzz(16);
        break;
      }
      case "atk_holy": { // 빛: 밝은 청동 종 + 내리꽂히는 심판 + 반짝임
        this.bell(ac, this.pan(ac, out, -0.2), t, 1318 * j, 0.52, 0.055, [1, 2, 3], [1, 0.4, 0.15]);
        this.bell(ac, this.pan(ac, out, 0.2), t + 0.02, 1975 * j, 0.45, 0.028, [1, 2], [1, 0.4]);
        this.kick(ac, out, t, 165 * j, 64 * j, 0.22, 0.24, 1.5);
        this.noise(ac, out, t + 0.03, 0.34, 7800, 3.2, 0.02);
        this.buzz(16);
        break;
      }
      case "atk_earth": { // 대지: 북처럼 둥-쿵 + 흙/방울
        this.kick(ac, out, t, 88 * j, 40 * j, 0.32, 0.38, 2.2);
        this.tone(ac, out, t, 164 * j, 90 * j, 0.06, "triangle", 0.08);
        this.noise(ac, out, t, 0.14, 420 * j, 0.7, 0.12, 150);
        [0.05, 0.08, 0.1].forEach((d, i) => this.noise(ac, this.pan(ac, out, (i % 2 ? 0.25 : -0.25)), t + d, 0.012, 2800 + i * 300, 2.6, 0.045 - i * 0.008));
        this.buzz(22);
        break;
      }
      /* 나가는 소리 */
      case "atk_heave":
        this.whoosh(ac, out, t, 0.22, 380 * j, 1200 * j, 0.08, -0.35, 0.35);
        this.tone(ac, out, t, 120 * j, 82 * j, 0.2, "sine", 0.055);
        break;
      case "atk_fire":
        this.burst(ac, out, t, 0.006, 2200, 0.24);
        this.noise(ac, out, t, 0.09, 1400 * j, 0.6, 0.22, 380);
        this.kick(ac, out, t, 185 * j, 48 * j, 0.13, 0.28, 2.0);
        this.noise(ac, out, t + 0.05, 0.4, 650, 0.6, 0.05, 200);
        this.buzz(12);
        break;
      case "atk_fuse":
        this.noise(ac, out, t, 0.22, 5200, 2.8, 0.04, 6800);
        this.whoosh(ac, out, t + 0.08, 0.14, 900, 2600, 0.06, -0.3, 0.3);
        break;
      case "atk_cast":
        this.whoosh(ac, out, t, 0.24, 340, 2800, 0.055, -0.35, 0.35);
        this.tone(ac, out, t, 220 * j, 660 * j, 0.24, "triangle", 0.03);
        this.bell(ac, out, t + 0.18, 1760 * j, 0.22, 0.02, [1, 2.5], [1, 0.3]);
        break;
      case "sp_block":
        this.burst(ac, out, t, 0.004, 3200, 0.12);
        this.clang(ac, out, t, 1200, 0.08, 0.03, 3, 0.2);
        break;

      /* ---------- v3.14 타격감 바닥 (js/impact.js) ---------- */
      case "imp_hit": {
        const p = v == null ? 1 : Math.min(1.3, v);
        this.burst(ac, out, t, 0.005, 1400, 0.42);
        this.kick(ac, out, t, 155 * j, 36, 0.22 + p * 0.08, 0.72, 2.2);
        this.tone(ac, out, t, 320 * j, 85, 0.06, "triangle", 0.16);
        this.crunch(ac, out, t + 0.002, 0.08 + p * 0.05, 3200, 280, 0.3, 3.8);
        this.buzz(20);
        break;
      }
      case "imp_kill": {
        this.burst(ac, out, t, 0.006, 1200, 0.54);
        this.kick(ac, out, t, 130, 28, 0.54, 0.88, 2.6);
        this.kick(ac, out, t + 0.012, 58, 22, 0.65, 0.44, 0);
        this.crunch(ac, out, t, 0.18, 3600, 240, 0.4, 4.8);
        this.burst(ac, out, t + 0.038, 0.01, 2400, 0.25);
        this.noise(ac, out, t + 0.02, 0.58, 210, 0.48, 0.15, 65);
        this.buzz(36);
        break;
      }
      case "imp_life": {
        this.burst(ac, out, t, 0.006, 1000, 0.52);
        this.kick(ac, out, t, 115, 24, 0.48, 0.9, 2.8);
        this.crunch(ac, out, t, 0.16, 2200, 170, 0.36, 4.8);
        this.kick(ac, out, t + 0.18, 88, 26, 0.32, 0.48, 2.0);
        this.noise(ac, out, t + 0.02, 0.64, 160, 0.55, 0.14, 55);
        this.buzz([30, 90, 20]);
        break;
      }
      case "imp_crit": {
        this.snap(ac, out, t, 2600, 0.085);
        this.scrape(ac, this.pan(ac, out, -0.25), t, 0.12, 3600, 1600, 0.085, 0.35);
        this.clang(ac, this.pan(ac, out, 0.25), t + 0.005, 980, 0.52, 0.065, 7, 1);
        this.kick(ac, out, t, 140, 42, 0.16, 0.38, 1.8);
        this.burst(ac, out, t + 0.012, 0.008, 3200, 0.28);
        break;
      }
      case "imp_block": {
        this.snap(ac, out, t, 1800, 0.085);
        this.clang(ac, this.pan(ac, out, -0.2), t, 420, 0.56, 0.11, 7, 1.1);
        this.clang(ac, this.pan(ac, out, 0.2), t, 890, 0.34, 0.055, 5, 0);
        this.kick(ac, out, t, 125, 48, 0.14, 0.52, 1.8);
        this.ring(ac, out, t + 0.01, 1850, 0.34, 0.024, [1, 1.5, 2.2], [1, 0.5, 0.3], 3.5);
        this.noise(ac, out, t, 0.05, 3600, 0.9, 0.1);
        this.buzz(14);
        break;
      }
      case "imp_spell": {
        this.burst(ac, out, t, 0.005, 1250, 0.34);
        this.kick(ac, out, t, 145, 34, 0.3, 0.64, 2.0);
        this.noise(ac, out, t, 0.24, 1250, 0.58, 0.11, 220);
        break;
      }
      case "imp_land": // 카드 착지 바닥음 (place의 철컥함과 조화)
        this.kick(ac, out, t, 110, 38, 0.14, 0.36, 1.6);
        this.noise(ac, out, t, 0.07, 320, 0.7, 0.05, 120);
        break;
      case "imp_whoosh":
        this.whoosh(ac, out, t, 0.24, 320, 1400, 0.12, -0.35, 0.35);
        this.tone(ac, out, t, 78, 48, 0.2, "sine", 0.12);
        break;
    }
  },
  /* 종소리: 배음(ratio)마다 사인파를 겹쳐 길게 울린다 */
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
        g.gain.exponentialRampToValueAtTime(Math.max(0.0002, amp), t0 + 0.0006);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
        o.connect(g).connect(out); o.start(t0); o.stop(t0 + d + 0.02);
      });
    }
    if (tick) this.burst(ac, out, t0, 0.004, 4500, vol * 1.6 * tick);
  },
  burst(ac, out, t0, dur, hp, vol) {
    const sr = ac.sampleRate, n = Math.max(1, Math.floor(sr * dur)), buf = ac.createBuffer(1, n, sr), d = buf.getChannelData(0);
    const k = sr * dur * 0.22;
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / k);
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; f.type = "highpass"; f.frequency.value = hp; f.Q.value = 0.7; g.gain.value = vol;
    s.connect(f).connect(g).connect(out); s.start(t0);
  },
  chime(ac, out, t0, f, dur, vol) {
    this.burst(ac, out, t0, 0.002, 7000, vol * 0.5);
    this.ring(ac, out, t0, f, dur, vol, [1, 2.76, 5.4, 8.9], [1, 0.42, 0.2, 0.08], 3.2);
  },
  jingle(ac, out, t0, n, f, gap, vol) {
    for (let i = 0; i < n; i++) {
      const at = t0 + i * gap * (0.7 + Math.random() * 0.6), q = f * (0.88 + Math.random() * 0.3), a = vol * (1 - i * 0.12);
      this.burst(ac, out, at, 0.0015, 8000, a * 0.6);
      this.ring(ac, out, at, q, 0.09 + Math.random() * 0.05, a, [1, 1.53, 2.31], [1, 0.5, 0.25], 6);
    }
  },
  snap(ac, out, t0, f, vol) {
    this.burst(ac, out, t0, 0.003, 5000, vol * 1.4);
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(f * 2.4, t0);
    o.frequency.exponentialRampToValueAtTime(f * 0.8, t0 + 0.012);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + 0.0005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.022);
    o.connect(g).connect(out); o.start(t0); o.stop(t0 + 0.04);
  },
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
    g.gain.linearRampToValueAtTime(Math.max(0.0002, vol), t0 + dur * 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    hp.connect(g).connect(out); s.start(t0); s.stop(t0 + dur + 0.02);
  },
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
  /* 입체 전당 잔향 & 음량 밸런스 */
  TRIM: { imp_kill: 0.85, imp_life: 0.82, deny: 0.65, equip: 0.85, move: 0.78, place: 0.92, select: 0.88, ui_card: 0.85, ui_click: 0.82, ui_close: 0.82, ui_deck: 0.85, ui_open: 0.85, unselect: 0.8, confirm: 0.95 },
  HALL: {
    draw: 0.12, shatter: 0.28, place: 0.18, confirm: 0.28, equip: 0.18, handHover: 0.04,
    ui_click: 0.10, ui_card: 0.14, ui_deck: 0.16, ui_open: 0.22, ui_close: 0.20,
    select: 0.12, unselect: 0.08, pick: 0.08, move: 0.09, deny: 0.08, coinHeads: 0.16,
    swing: 0.14, suck: 0.16,
    pach_spin: 0.16, pach_stop: 0.18, pach_win: 0.28, pach_miss: 0.12,
    atk_rend: 0.22, atk_slash: 0.26, atk_chop: 0.24, atk_pierce: 0.20, atk_whip: 0.22,
    atk_punch: 0.18, atk_smash: 0.28, atk_metal: 0.28, atk_shot: 0.26, atk_blast: 0.30,
    atk_wind: 0.26, atk_zap: 0.26, atk_water: 0.24, atk_dark: 0.30, atk_holy: 0.32, atk_earth: 0.26,
    atk_heave: 0.16, atk_fire: 0.26, atk_fuse: 0.14, atk_cast: 0.24,
    imp_hit: 0.18, imp_kill: 0.28, imp_life: 0.30, imp_crit: 0.24, imp_block: 0.24, imp_spell: 0.22, imp_land: 0.14,
    sp_boom: 0.30, sp_quake: 0.32, sp_dark: 0.30, sp_holy: 0.32, sp_smite: 0.28, sp_zap: 0.22, sp_rock: 0.24, sp_clang: 0.24, sp_buff: 0.22, sp_debuff: 0.24, sp_heal: 0.24, levelUp: 0.34
  },
  hallNode: null,
  /* 선명하고 펀치감 있는 마스터 버스: 턱 막힌 중저역(-1.4dB @280Hz) 정리 · 선명한 어택(+1.8dB @2.6kHz) · 공기감(+1.4dB @6.8kHz) · 깊은 저역(+2.2dB @95Hz) */
  busNode: null,
  bus(ac) {
    if (this.busNode && this.busNode.context === ac) return this.busNode;
    const low = ac.createBiquadFilter(), mud = ac.createBiquadFilter(), pres = ac.createBiquadFilter(), air = ac.createBiquadFilter();
    low.type = "lowshelf"; low.frequency.value = 95; low.Q.value = 0.7; low.gain.value = 2.2;
    mud.type = "peaking"; mud.frequency.value = 280; mud.Q.value = 0.85; mud.gain.value = -1.4;
    pres.type = "peaking"; pres.frequency.value = 2600; pres.Q.value = 0.7; pres.gain.value = 1.8;
    air.type = "highshelf"; air.frequency.value = 6800; air.Q.value = 0.7; air.gain.value = 1.4;
    const c = ac.createDynamicsCompressor(), mk = ac.createGain(), lim = ac.createDynamicsCompressor();
    c.threshold.value = -14; c.knee.value = 12; c.ratio.value = 2.8; c.attack.value = 0.003; c.release.value = 0.14;
    mk.gain.value = 1.18;
    lim.threshold.value = -1.2; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = 0.001; lim.release.value = 0.08;
    low.connect(mud).connect(pres).connect(air).connect(c).connect(mk).connect(lim).connect(ac.destination);
    return (this.busNode = low);
  },
  /* 왜곡(tanh): 낮은 소리에 배음을 붙여 작은 스피커에서도 "쿵"이 살아나게 */
  curves: {},
  drive(ac, out, amt) {
    const k = Math.round(amt * 10);
    if (!this.curves[k]) { const n = 1024, c = new Float32Array(n), a = k / 10, d = Math.tanh(a); for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; c[i] = Math.tanh(x * a) / d; } this.curves[k] = c; }
    const ws = ac.createWaveShaper(); ws.curve = this.curves[k]; ws.oversample = "2x"; ws.connect(out); return ws;
  },
  kick(ac, out, t0, f0, f1, dur, vol, drv) {
    const dst = drv ? this.drive(ac, out, drv) : out;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(f0, t0); o.frequency.exponentialRampToValueAtTime(f1, t0 + dur * 0.35);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + 0.002);
    g.gain.setValueAtTime(Math.max(0.0002, vol), t0 + dur * 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(dst); o.start(t0); o.stop(t0 + dur + 0.02);
  },
  crunch(ac, out, t0, dur, f0, f1, vol, drv) {
    const sr = ac.sampleRate, n = Math.max(1, Math.floor(sr * dur)), buf = ac.createBuffer(1, n, sr), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (n * 0.3));
    const s = ac.createBufferSource(), lp = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; lp.type = "lowpass"; lp.Q.value = 1.2;
    lp.frequency.setValueAtTime(f0, t0); lp.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
    g.gain.value = vol;
    s.connect(lp).connect(g).connect(this.drive(ac, out, drv || 3)); s.start(t0);
  },
  /* 입체 전당 잔향: 초기 반사음(Early Reflections) + 스테레오 디퓨전 테일 */
  hall(ac) {
    if (this.hallNode && this.hallNode.context === ac) return this.hallNode;
    const sr = ac.sampleRate, len = Math.floor(sr * 1.45), ir = ac.createBuffer(2, len, sr), rise = Math.floor(sr * 0.012);
    const erL = [0.011, 0.019, 0.029, 0.043, 0.058], erR = [0.014, 0.023, 0.034, 0.049, 0.064];
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) {
        const env = Math.pow(1 - i / len, 2.4) * (i < rise ? i / rise : 1);
        d[i] = (Math.random() * 2 - 1) * env * 0.72;
      }
      const er = c === 0 ? erL : erR;
      er.forEach((sec, idx) => {
        const p = Math.floor(sr * sec);
        if (p < len) d[p] += (idx % 2 ? -1 : 1) * 0.48 * Math.pow(0.8, idx);
      });
    }
    const cv = ac.createConvolver(), lp = ac.createBiquadFilter();
    cv.buffer = ir; lp.type = "lowpass"; lp.frequency.value = 5800; lp.Q.value = 0.5;
    cv.connect(lp).connect(this.bus(ac));
    return (this.hallNode = cv);
  },
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
