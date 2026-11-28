/* ETHERION — 한눈에 보기 (2026-11-28)
   튜토리얼을 열지 않는 사람을 위해, 첫 대전이 시작되기 직전에 한 번 저절로 뜨는 짧은 그림 안내(다섯 장면, 장면마다 6~8초).
   ① 카드를 에테르로(결정화) ② 에테르만큼의 레벨 ③ 이기는 법 ④ 소각 · 셔플 ⑤ 카드 부수기.
   - 어디서: game.js startMatch(컴퓨터 · 연습 · 순례 · 원정 — 다시보기 · headless 제외) · online.js startOnline 앞. 본 뒤에는 etherion.pref.introSeen.
     다시 보기는 튜토리얼 목록의 0장(js/manual.js Tutorial).
   - 장면 = 무대(640×330, 창 폭에 맞춰 줄임) + 자막 세 줄. 시간표(steps)대로 무대에 t1 · t2 … · 자막 c1 · c2 … 클래스를 붙이고, 움직임은 CSS 전환(css/intro.css).
   - 카드 그림은 지금 깃발의 실제 카드 그림(ART_INDEX). 숫자는 설명용으로 고정. */
"use strict";

const Intro = (() => {
  const W = 640, H = 330;
  let wrap = null, done = null, idx = 0, timers = [], onKey = null, onRs = null;

  const need = () => typeof Prefs === "undefined" || !Prefs.get("introSeen", false);
  const esc2 = s => typeof esc === "function" ? esc(s) : String(s);

  /* 지금 깃발에서 그림 있는 유닛을 레벨별로 고른다(없으면 모든 깃발에서) */
  function pickCards() {
    const u = typeof Store !== "undefined" && Store.user && Store.user();
    const g = (typeof App !== "undefined" && App.lobbyGroup) || (u && u.group) || "B1";
    const art = c => typeof ART_INDEX !== "undefined" && ART_INDEX && ART_INDEX[c.id];
    const ok = c => c.type === "unit" && art(c) && !c.special && !c.unique && !c.base;
    const own = CARD_LIST.filter(c => c.group === g && ok(c)), all = CARD_LIST.filter(ok);
    const used = new Set();
    const by = lv => { const f = L => L.find(c => c.lv === lv && !used.has(c.id)) || L.find(c => !used.has(c.id)); const c = f(own) || f(all); if (c) used.add(c.id); return c; };
    return { l1: by(1), l2: by(2), l3: by(3), l5: by(5), x1: by(2), x2: by(4), x3: by(1), x4: by(3), me: by(4), foe: by(3) };
  }
  /* 작은 카드: 그림 · 레벨 구슬 · 이름 (+ 공 · 방 · 체) */
  function mc(c, o) {
    o = o || {};
    const col = (typeof GROUPS !== "undefined" && GROUPS[c.group] && GROUPS[c.group].color) || "#d9b46a";
    const st = o.s ? `<span class="it-st"><i class="a">${o.s[0]}</i><i class="d">${o.s[1]}</i><i class="h">${o.s[2]}</i></span>` : "";
    return `<div class="it-c ${o.cls || ""}" style="--fc:${col};${o.pos || ""}"><span class="it-art" style="background-image:url('img/cards/${ART_INDEX[c.id]}')"></span><b class="it-lv">${o.lv != null ? o.lv : c.lv}</b><span class="it-nm">${esc2(c.name)}</span>${st}${o.tag ? `<span class="it-tag">${o.tag}</span>` : ""}</div>`;
  }
  const pos = (x, y) => `left:${x}px;top:${y}px`;
  function orb(lit, n) {
    let ring = "";
    for (let k = 0; k < RULES.maxCrystals; k++) ring += `<i class="${k < lit ? "on" : ""}" style="--k:${k}"></i>`;
    return `<div class="it-orb"><div class="it-ring">${ring}</div><span class="it-orb-core"><b class="it-num">${n}</b><small>에테르</small></span></div>`;
  }
  const setNum = (st, sel, v) => { const e = st.querySelector(sel); if (e) { e.textContent = v; e.classList.remove("pop"); void e.offsetWidth; e.classList.add("pop"); } };
  const lightRing = (st, n) => st.querySelectorAll(".it-ring i").forEach((e, k) => e.classList.toggle("on", k < n));
  const HX = k => 250 + k * 96;   // 핸드 칸 x

  const SCENES = [
    { t: "카드를 에테르로", dur: 6800,
      cap: ["지금 쓰기 어려운 카드를 하나 골라", "에테르 구슬에 넣으면 결정이 되고", "에테르가 1 늘어납니다. 결정은 판 끝까지 매 턴 에테르를 줍니다."],
      note: "한 턴에 한 장 · 카드를 누른 뒤 구슬을 누르거나 끌어다 놓기 (C)",
      html: K => `${orb(0, 0)}
        ${[K.l1, K.l2, K.l3].map((c, k) => mc(c, { pos: pos(HX(k), 180) })).join("")}
        ${mc(K.l5, { cls: "it-mv", pos: pos(HX(3), 180) })}
        <span class="it-plus">+1</span>`,
      steps: [[300, "t1 c1"], [1800, "t2 c2"], [2550, "t3", st => { setNum(st, ".it-num", 1); lightRing(st, 1); }], [3200, "c3"]] },

    { t: "에테르만큼 레벨", dur: 7800,
      cap: ["카드 왼쪽 위의 숫자가 레벨입니다", "레벨이 곧 그 카드를 내는 데 드는 에테르", "에테르 3이면 Lv 3 한 장, 또는 Lv 1 + Lv 2를 낼 수 있습니다"],
      note: "에테르는 결정 수만큼 매 턴 다시 차오릅니다",
      html: K => `${orb(3, 3)}
        ${mc(K.l1, { cls: "it-ok", pos: pos(HX(0), 180) })}${mc(K.l2, { cls: "it-ok", pos: pos(HX(1), 180) })}
        ${mc(K.l3, { cls: "it-ok it-pick", pos: pos(HX(2), 180) })}${mc(K.l5, { cls: "it-no", pos: pos(HX(3), 180), tag: "에테르 부족" })}
        <div class="it-lens"><b>3</b><small>LEVEL</small></div>
        <span class="it-eq">에테르 3 = Lv 3까지</span>`,
      steps: [[300, "t1 c1"], [2000, "t2 c2"], [3700, "t3 c3"], [5300, "t4", st => { setNum(st, ".it-num", 0); lightRing(st, 0); }]] },

    { t: "이기는 법", dur: 8000,
      cap: ["서로의 생명은 " + RULES.startLife + ". 상대의 생명을 먼저 0으로 만들면 승리합니다.", "막지 못한 공격, 그리고 카드를 뽑은 장수만큼 내 생명도 줄어듭니다.", "내 생명이 먼저 0이 되거나 덱이 다 떨어지면 패배입니다."],
      note: "",
      html: () => `<div class="it-life foe"><span>상대</span><b class="it-lf">${RULES.startLife}</b><i class="it-bar"><em></em></i></div>
        <div class="it-life me"><span>나</span><b class="it-lf">${RULES.startLife}</b><i class="it-bar"><em></em></i><span class="it-draw">카드 4장 뽑음 −4</span></div>
        <div class="it-win">승리</div>`,
      steps: (() => {
        const S = RULES.startLife, life = (who, v) => st => { const p = st.querySelector(".it-life." + who); setNum(p, ".it-lf", v); p.querySelector(".it-bar em").style.width = (v / S * 100) + "%"; p.classList.remove("hit"); void p.offsetWidth; p.classList.add("hit"); };
        return [[300, "c1"], [1000, "", life("foe", S - 14)], [2000, "", life("me", S - 6)], [3000, "", life("foe", S - 33)],
          [3900, "c2 t1", life("me", S - 10)], [5100, "t2 c3", life("foe", 0)]];
      })() },

    { t: "소각 · 셔플", dur: 8200,
      cap: ["필요 없는 카드는 소각장에 버립니다 (X)", "핸드가 마음에 안 들면 셔플 — 덱에 섞고 새로 뽑습니다 (S)", "셔플은 한 턴에 한 번, 카드를 내기 전에만. 생명 1을 냅니다."],
      note: "",
      html: K => `<div class="it-burn"><span class="it-fire"></span><small>소각장</small></div>
        <div class="it-deck"><span></span><span></span><span></span><small>덱</small></div>
        <div class="it-lchip">생명 <b class="it-lf">${RULES.startLife}</b></div><span class="it-minus">−1</span>
        ${mc(K.x1, { cls: "it-b0", pos: pos(200, 175) })}${mc(K.x2, { cls: "it-b1", pos: pos(296, 175) })}${mc(K.x3, { cls: "it-b2", pos: pos(392, 175) })}
        ${mc(K.x4, { cls: "it-n1", pos: pos(296, 175) })}${mc(K.l5, { cls: "it-n2", pos: pos(392, 175) })}`,
      steps: [[300, "t1 c1"], [1200, "t2"], [2900, "t3 c2"], [3800, "t4", st => setNum(st, ".it-lf", RULES.startLife - 1)], [4600, "t5"], [5600, "c3"]] },

    { t: "카드 부수기", dur: 8000,
      cap: ["내 유닛이 상대의 맨 앞 유닛을 공격합니다", "공격력이 상대의 방어력 + 체력 이상이면 그 카드를 부술 수 있습니다", "모자라면 상대는 살아남아 반격합니다. 받은 피해는 턴이 끝나면 회복됩니다."],
      note: "피해 = 공격 − 방어",
      html: K => `<div class="it-shat" style="${pos(200, 14)}">${mc(K.foe, { cls: "h1", s: [3, 2, 4] })}${mc(K.foe, { cls: "h2", s: [3, 2, 4] })}<i class="sp s1"></i><i class="sp s2"></i><i class="sp s3"></i><i class="sp s4"></i></div>
        ${mc(K.me, { cls: "it-atk", pos: pos(200, 186), s: [7, 1, 5] })}
        <div class="it-calc"><p class="l1"><i class="a">공격 7</i></p><p class="l2"><i class="d">방어 2</i> + <i class="h">체력 4</i> = 6</p><p class="l3">7 ≥ 6 → 부서짐</p></div>`,
      steps: [[300, "c1"], [1000, "t1"], [1500, "t2"], [2700, "t3"], [3300, "t4 c2"], [5000, "c3"]] }
  ];

  function clear() { timers.forEach(clearTimeout); timers = []; }
  function fit() {
    if (!wrap) return;
    const box = wrap.querySelector(".it-view"); if (!box) return;
    const k = Math.min(1, box.clientWidth / W);
    box.style.setProperty("--k", k); box.style.height = (H * k) + "px";
  }
  function show(i) {
    clear();
    idx = Math.max(0, Math.min(SCENES.length - 1, i));
    const S = SCENES[idx], K = pickCards(), last = idx === SCENES.length - 1;
    wrap.querySelector(".it-no").textContent = idx + 1;
    wrap.querySelector(".it-title").textContent = S.t;
    wrap.querySelectorAll(".it-dot").forEach((d, k) => { d.classList.toggle("on", k === idx); d.classList.toggle("seen", k < idx); });
    const sc = wrap.querySelector(".it-scene");
    sc.className = "it-scene s" + idx;
    sc.innerHTML = `<div class="it-view"><div class="it-stage">${S.html(K)}</div></div>
      <ol class="it-cap">${S.cap.map((x, k) => `<li class="k${k + 1}"><span>${k + 1}</span>${x}</li>`).join("")}</ol>${S.note ? `<p class="it-note">${S.note}</p>` : ""}`;
    fit();
    const st = sc.querySelector(".it-stage");
    S.steps.forEach(([ms, cls, fn]) => timers.push(setTimeout(() => { if (cls) cls.split(" ").forEach(c => sc.classList.add(c)); if (fn) fn(st); }, ms)));
    const bar = wrap.querySelector(".it-prog em");
    bar.style.transition = "none"; bar.style.width = "0"; void bar.offsetWidth;
    bar.style.transition = `width ${S.dur}ms linear`; bar.style.width = "100%";
    if (!last) timers.push(setTimeout(() => show(idx + 1), S.dur + 900));
    wrap.querySelector('[data-i="prev"]').disabled = !idx;
    const nx = wrap.querySelector('[data-i="next"]');
    nx.textContent = last ? (done ? "전투 시작" : "닫기") : "다음";
    nx.classList.toggle("primary", last);
    if (typeof FEEL !== "undefined" && i) FEEL.play("page_turn", .5);
  }
  function close() {
    clear();
    if (onKey) removeEventListener("keydown", onKey, true);
    if (onRs) removeEventListener("resize", onRs);
    onKey = onRs = null;
    if (wrap) wrap.remove(); wrap = null;
    if (typeof Prefs !== "undefined") Prefs.set("introSeen", true);
    const cb = done; done = null;
    if (cb) cb();
  }
  /* cb가 있으면 닫을 때(건너뛰기 · 전투 시작 · Esc) 그것을 부른다 — 첫 대전 앞 */
  function open(cb) {
    if (wrap) close();
    done = cb || null;
    wrap = document.createElement("div");
    wrap.className = "intro-wrap";
    wrap.innerHTML = `<div class="intro" role="dialog" aria-modal="true" aria-label="한눈에 보기">
      <header class="it-head"><p class="hx-eyebrow">HOW TO PLAY · 1분 만에 알기</p>
        <h2><span class="it-no">1</span><span class="it-title"></span></h2>
        <button type="button" class="it-skip" data-i="skip">${cb ? "건너뛰고 시작" : "닫기"} ›</button></header>
      <div class="it-prog"><em></em></div>
      <div class="it-scene"></div>
      <footer class="it-foot"><div class="it-dots">${SCENES.map((s, k) => `<button type="button" class="it-dot" data-g="${k}" title="${s.t}" aria-label="${k + 1}. ${s.t}"></button>`).join("")}</div>
        <div class="it-btns"><button type="button" class="btn sm" data-i="again" title="이 장면 다시">↻</button><button type="button" class="btn sm" data-i="prev">이전</button><button type="button" class="btn sm" data-i="next">다음</button></div></footer>
    </div>`;
    document.body.appendChild(wrap);
    wrap.addEventListener("click", e => {
      const g = e.target.closest("[data-g]"); if (g) { show(+g.dataset.g); return; }
      const b = e.target.closest("[data-i]"); if (!b) return;
      const v = b.dataset.i;
      if (v === "skip") close(); else if (v === "prev") show(idx - 1); else if (v === "again") show(idx);
      else if (v === "next") { if (idx === SCENES.length - 1) close(); else show(idx + 1); }
    });
    onKey = e => {
      if (!wrap) return;
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
      else if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); e.stopPropagation(); if (idx === SCENES.length - 1) close(); else show(idx + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); show(idx - 1); }
    };
    addEventListener("keydown", onKey, true);
    onRs = fit; addEventListener("resize", onRs);
    show(0);
  }
  return { need, open, close };
})();
