/* ETHERION — 손맛(Feel): 누름·집기·놓기·맞기의 소리와 진동, 그리고 리듬을 맞추는 시간 값
   - 소리는 파일 없이 WebAudio로 합성한다. 음량은 설정에서 끄기/작게/보통 (localStorage etherion.pref.sfx)
   - 같은 소리가 한 프레임 안에 여러 번 겹치면 한 번만 낸다(컴퓨터가 카드 여러 장을 한꺼번에 놓을 때)
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
    swap: 340,        // 자리 바꾸기에서 밀려난 카드가 뒤로 넘어가는 시간 (v1.7)
    draw: 480,        // 덱 → 핸드
    drawGap: 95,      // 여러 장 뽑을 때 간격
    away: 520,        // 소각장·에테르·장착으로 날아가기
    back: 400,        // 놓을 수 없는 곳에서 제자리로 (v1.7: 260 → 400)
    select: 280,      // 핸드 고르기/풀기 (v1.7: 200 → 280)
    hitStop: 65       // 맞는 순간 멈칫
  },
  vol: { off: 0, low: 0.45, mid: 1 },
  level: "mid",
  touch: false,
  ac: null,
  last: {},

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
  play(name, v) {
    const lv = this.vol[this.level]; if (!lv) return;
    const now = performance.now();
    if (this.last[name] && now - this.last[name] < 45) return;
    this.last[name] = now;
    const ac = this.ctx(); if (!ac) return;
    const out = ac.createGain(); out.gain.value = lv * (v == null ? 1 : v); out.connect(ac.destination);
    const t = ac.currentTime + 0.002;
    switch (name) {
      case "select":   // 핸드 고르기: 맑고 짧은 똑
        this.tone(ac, out, t, 1500, 1150, 0.045, "triangle", 0.05); break;
      case "unselect": // 풀기: 한 음 낮게
        this.tone(ac, out, t, 1050, 850, 0.04, "triangle", 0.04); break;
      case "pick":     // 카드를 집어 듦: 종이 스침 + 위로 오르는 음
        this.noise(ac, out, t, 0.06, 3200, 1.2, 0.05);
        this.tone(ac, out, t, 520, 780, 0.07, "sine", 0.045); break;
      case "hover":    // 놓을 자리에 닿음: 아주 작은 딸깍
        this.tone(ac, out, t, 2100, 2100, 0.022, "sine", 0.035); break;
      case "suck":     // v1.7 칸이 빨아들임: 아래에서 위로 좁아지는 숨 들이쉬는 바람 (착지 직전까지)
        this.noise(ac, out, t, 0.2, 380, 1.6, 0.04, 2200);
        this.tone(ac, out, t + 0.03, 90, 150, 0.17, "sine", 0.05); break;
      case "place":    // 전장에 착지(v1.7): 낮고 둥근 쿵 + 촘촘한 '착' (짧은 고음 마찰 두 겹) + 판이 울리는 여운
        this.tone(ac, out, t, 180, 58, 0.15, "sine", 0.22);
        this.noise(ac, out, t, 0.022, 3400, 1.8, 0.11);
        this.noise(ac, out, t + 0.012, 0.05, 1900, 1.1, 0.06, 900);
        this.tone(ac, out, t + 0.01, 1250, 900, 0.03, "triangle", 0.035);
        this.tone(ac, out, t + 0.02, 96, 88, 0.22, "sine", 0.06);
        this.buzz(14); break;
      case "move":     // 자리 바꾸기: 가볍게 미끄러짐
        this.noise(ac, out, t, 0.09, 1400, 1.4, 0.045, 700);
        this.tone(ac, out, t + 0.05, 240, 150, 0.06, "sine", 0.07); break;
      case "crystal":  // 결정화: 맑은 두 음
        this.tone(ac, out, t, 1320, 1760, 0.18, "sine", 0.05);
        this.tone(ac, out, t + 0.05, 1980, 2640, 0.22, "sine", 0.03); break;
      case "equip":    // 장착: 쇠 맞물림
        this.tone(ac, out, t, 880, 660, 0.06, "square", 0.025);
        this.noise(ac, out, t, 0.05, 4200, 3, 0.05); break;
      case "burn":     // 소각: 불 붙는 바람 소리
        this.noise(ac, out, t, 0.26, 600, 0.8, 0.09, 2400); break;
      case "deny":     // 안 됨: 낮게 두 번 툭툭 (거슬리지 않게)
        this.tone(ac, out, t, 150, 120, 0.06, "triangle", 0.08);
        this.tone(ac, out, t + 0.085, 130, 100, 0.07, "triangle", 0.07); break;
      case "confirm":  // 준비 완료: 위로 열리는 두 음
        this.tone(ac, out, t, 520, 520, 0.09, "triangle", 0.06);
        this.tone(ac, out, t + 0.07, 780, 780, 0.16, "triangle", 0.06); break;
      case "hit":      // 공격이 맞음
        this.tone(ac, out, t, 130, 45, 0.16, "sine", 0.24);
        this.noise(ac, out, t, 0.12, 900, 0.7, 0.13, 300);
        this.buzz(18); break;
      case "hitBig":   // 생명을 직접 침
        this.tone(ac, out, t, 110, 38, 0.24, "sine", 0.3);
        this.noise(ac, out, t, 0.2, 700, 0.6, 0.16, 200);
        this.buzz(28); break;
      case "draw":     // v1.9 덱에서 한 장 튀어 오름: 종이가 휙 스치는 소리 + 위로 오르는 작은 음
        this.noise(ac, out, t, 0.11, 2600, 1.3, 0.05, 5200);
        this.tone(ac, out, t + 0.02, 640, 980, 0.08, "sine", 0.028); break;
      case "shuffle":  // v1.9 섞기: 촤라락 (짧은 종이 소리 여러 번)
        for (let i = 0; i < 7; i++) this.noise(ac, out, t + i * 0.035, 0.03, 2800 + i * 120, 1.6, 0.045);
        this.tone(ac, out, t + 0.26, 300, 220, 0.08, "sine", 0.04); break;
      case "swing":    // 뛰쳐나감: 바람 가르는 소리
        this.noise(ac, out, t, 0.16, 900, 1.6, 0.05, 2600); break;

      /* ---------- v1.9.5 코인 ---------- */
      case "coinHeads": // 앞면: "차-창" — 짧은 쇠 긁힘(차) 뒤에 위로 4도 뛰는 맑은 종 두 개(창)와 반짝임
        this.noise(ac, out, t, 0.045, 6200, 1.4, 0.08);
        this.tone(ac, out, t, 2350, 2100, 0.035, "square", 0.012);
        this.bell(ac, out, t + 0.06, 1976, 0.5, 0.07, [1, 2, 3.01], [1, 0.32, 0.12]);
        this.bell(ac, out, t + 0.13, 2637, 0.75, 0.08, [1, 2, 3.01], [1, 0.3, 0.1]);
        this.noise(ac, out, t + 0.13, 0.3, 9000, 4, 0.018);
        this.buzz(10); break;
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
      case "sp_block":  // 막힘: 작은 쨍
        this.tone(ac, out, t, 1800, 1600, 0.05, "square", 0.018);
        this.noise(ac, out, t, 0.03, 4200, 2, 0.05); break;
    }
  },
  /* v1.9.5 종소리: 배음(ratio)마다 사인파를 겹쳐 길게 울린다 */
  bell(ac, out, t0, f, dur, vol, ratios, amps) {
    (ratios || [1]).forEach((r, i) => this.tone(ac, out, t0, f * r, f * r, dur * (1 - i * 0.18), "sine", vol * ((amps && amps[i]) != null ? amps[i] : 1)));
  },
  buzz(ms) { if (this.touch && navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} },

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
