/* ETHERION — 모험가 레벨 (v3.6)
   환석 조각이 곧 경험치다. 지갑의 조각은 카드를 사면 줄지만, 경험치는 "지금까지 벌어들인 조각의 합"이라 줄지 않는다.
   - 경험치가 되는 수입: 전투(부서진 카드 2%) · 승리/패배 정산 · 전장의 작은 게임 · 크로네아의 수레바퀴 · 원정 완주
     = Store.addGold로 들어오는 + 수입 전부.
   - 되지 않는 것: 카드 판매(산 값을 돌려받는 것이라, 사고팔기를 되풀이해 레벨을 올릴 수 없게), 새 모험가의 처음 지갑.
   - 곡선: Lv k → k+1 에 필요한 조각 = first × e^(grow·(k−1) + curve·(k−1)²), 1,000 단위로 반올림.
     승리 한 판 평균 ≈ 18,000 조각, 패배 ≈ 4,600 조각 (tools/level/measure.js, 기본 덱끼리 300판).
       Lv 2  = 180,000   ≈ 10승
       Lv 5  ≈ 75만       ≈ 승률 50%로 66판
       Lv 10 ≈ 184만      ≈ 160판
       Lv 30 ≈ 880만      ≈ 770판
       Lv 50 ≈ 2,580만    ≈ 2,300판
       Lv 70 ≈ 7,690만    ≈ 6,800판   ← 고인물 대부분은 5~70 사이
       Lv 90 ≈ 2억 6,700만             ← 99의 절반쯤
       Lv 99 ≈ 5억                     ≈ 44,000판 (거의 닿지 않는 끝)
     표 전체는 docs/LEVELS.md. 경제(보상)를 바꾸면 tools/level/measure.js로 다시 재고 first를 맞춘다.
   - 서버로 옮길 때: 서버가 u.xp(누적 경험치, 정수)를 정본으로 가진다. 레벨은 저장하지 않고 같은 표(LEVEL.of)로 계산한다.
     경험치를 더하는 곳은 Store.addXp 하나뿐이니 그곳을 서버 요청으로 바꾸면 된다(지금은 이 브라우저 localStorage). */
"use strict";

const LEVEL = {
  max: 99,
  first: 180000,      // Lv 1 → 2 (승리 약 10판)
  grow: 0.029,        // 레벨마다 필요량이 약 3%씩 늘고
  curve: 0.00026,     // 높은 레벨일수록 더 가파르게 (Lv 90 ≈ 99의 절반)
  round: 1000,
  noXp: /^판매/,       // 이 이유로 들어온 조각은 경험치가 아니다
  table: null,        // table[L] = Lv L이 되는 누적 경험치 (table[1] = 0)
  build() {
    const t = [0, 0];
    for (let L = 1; L < this.max; L++) {
      const k = L - 1, step = Math.round(this.first * Math.exp(this.grow * k + this.curve * k * k) / this.round) * this.round;
      t.push(t[L] + step);
    }
    this.table = t; return t;
  },
  need(L) { return L >= this.max ? 0 : this.table[L + 1] - this.table[L]; },   // Lv L → L+1 필요량
  of(xp) {
    const t = this.table; let lo = 1, hi = this.max;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (xp >= t[m]) lo = m; else hi = m - 1; }
    return lo;
  },
  /* 누적 경험치 → { lv, into(이번 레벨에서 모은 양), need(이번 레벨 필요량), left(남은 양), p(0~1), top(최대 레벨) } */
  info(xp) {
    xp = Math.max(0, Math.floor(xp || 0));
    const lv = this.of(xp), top = lv >= this.max;
    const need = top ? 0 : this.need(lv), into = xp - this.table[lv];
    return { xp, lv, top, need, into, left: top ? 0 : need - into, p: top ? 1 : into / need };
  }
};
LEVEL.build();

const fmtNum = n => Math.round(n).toLocaleString("ko-KR");

/* ---------- 경험치 (Store 확장) ---------- */
Object.assign(Store, {
  xp(u) {
    u = u || this.user(); if (!u) return 0;
    if (u.xp == null) {
      // 레벨이 생기기 전 계정: 지갑 기록(최근 100건)에 남은 수입으로 처음 값을 채운다. 새 계정은 0
      u.xp = (u.ledger || []).reduce((s, r) => s + (r.n > 0 && !LEVEL.noXp.test(r.why || "") ? r.n : 0), 0);
    }
    return u.xp;
  },
  level(u) { return LEVEL.of(this.xp(u)); },
  /* 경험치를 더하는 유일한 곳 (서버가 생기면 여기서 서버에 보낸다). 저장은 부르는 쪽(addGold)이 한다 */
  addXp(u, n, why) {
    u = u || this.user(); n = Math.round(n);
    if (!u || !(n > 0)) return null;
    const before = this.xp(u), lvBefore = LEVEL.of(before);
    u.xp = before + n;
    const lv = LEVEL.of(u.xp);
    return { n, why: why || "", before, after: u.xp, lvBefore, lv, up: lv - lvBefore };
  }
});
/* 조각 수입 = 경험치. economy.js의 addGold를 감싼다 (구매는 −, 판매는 noXp라 경험치가 되지 않는다) */
(function () {
  const addGold = Store.addGold;
  Store.addGold = function (u, n, why) {
    u = u || this.user();
    let r = null;
    if (u && n > 0 && !LEVEL.noXp.test(why || "")) r = this.addXp(u, n, why);
    const out = addGold.call(this, u, n, why);
    if (r && r.up > 0) LevelUI.levelUp(r);
    return out;
  };
  const save = Store.save;
  Store.save = function () { save.call(this); LevelUI.paint(); };
})();

/* ---------- 화면: 가운데 아래의 조각 · 레벨 판, 레벨 업 연출, 결과 화면 ---------- */
const LevelUI = {
  el: null, on: false, raf: 0,
  mount() {
    if (this.el || !document.body) return;
    const el = document.createElement("div");
    el.className = "lv-hud"; el.hidden = true;
    el.innerHTML = `<span class="lv-orb" aria-hidden="true"><small>LV</small><b></b></span>
      <span class="lv-body">
        <span class="lv-top"><span class="lv-gold"><i class="shard" aria-hidden="true"></i><b></b><small>조각</small></span><span class="lv-next"></span></span>
        <span class="lv-bar" aria-hidden="true"><i></i></span>
      </span>`;
    document.body.appendChild(el);
    this.el = el;
    this.paint(true);
  },
  /* 메뉴 화면(배경 모드 calm: 대기실 · 교역소 · 덱 조정실 · 원정 · 보관소)에서만 보인다. 타이틀 · 입장 · 전장에서는 숨김 */
  scene(mode) {
    this.on = mode === "calm";
    this.paint(true);
  },
  paint(now) {
    if (!now) { if (!this.raf) this.raf = requestAnimationFrame(() => { this.raf = 0; this.paint(true); }); return; }
    const el = this.el; if (!el) return;
    const u = Store.user(), show = this.on && !!u;
    el.hidden = !show;
    document.body.classList.toggle("lv-on", show);
    if (!show) return;
    const admin = Store.isAdmin(u), I = LEVEL.info(Store.xp(u));
    el.querySelector(".lv-orb b").textContent = I.lv;
    el.querySelector(".lv-gold b").textContent = admin ? "∞" : fmtNum(Store.gold(u));
    el.querySelector(".lv-next").textContent = I.top ? "최대 레벨" : `다음 레벨까지 ${fmtNum(I.left)}`;
    el.querySelector(".lv-bar i").style.setProperty("--p", I.p.toFixed(4));
    el.classList.toggle("top", I.top);
    el.title = `모험가 레벨 ${I.lv}${I.top ? " (최대)" : ` · ${fmtNum(I.into)} / ${fmtNum(I.need)}`}\n`
      + `지갑 ${admin ? "∞ (관리자)" : fmtGold(Store.gold(u))} · 누적 경험치 ${fmtNum(I.xp)}\n`
      + `벌어들인 환석 조각이 곧 경험치입니다. 카드를 사도 경험치는 줄지 않고, 판 값은 경험치가 되지 않습니다.`;
  },
  /* 레벨이 오름: 메뉴 화면이면 가운데에 띠, 전장이면 결과 화면이 대신 보여 준다 */
  levelUp(r) {
    this.paint();
    if (typeof App !== "undefined" && App.screen === "game") return;
    if (this.el) { this.el.classList.remove("up"); void this.el.offsetWidth; this.el.classList.add("up"); setTimeout(() => this.el && this.el.classList.remove("up"), 1800); }
    this.banner(r.lvBefore, r.lv);
  },
  banner(from, to) {
    document.querySelectorAll(".lv-banner").forEach(x => x.remove());
    const b = document.createElement("div");
    b.className = "lv-banner"; b.setAttribute("role", "status");
    b.innerHTML = `<div class="lvb-inner"><p class="lvb-eye">THE ETHER RISES</p><h2 class="lvb-title">LEVEL UP</h2>
      <p class="lvb-lv"><span>${from}</span><i aria-hidden="true">→</i><b>${to}</b></p><p class="lvb-sub">모험가 레벨 ${to}${to >= LEVEL.max ? " · 최대 레벨에 닿았습니다" : ""}</p></div>`;
    document.body.appendChild(b);
    if (typeof FEEL !== "undefined") FEEL.play("levelUp");
    const close = () => { b.classList.add("out"); setTimeout(() => b.remove(), 500); };
    b.addEventListener("click", close);
    setTimeout(close, 2600);
  },
  /* 결과 화면: 이번 판 경험치(= 이번 판 수입)와 막대. gain은 이미 Store에 더해진 뒤의 값 */
  resultHTML(gain) {
    const u = Store.user(); if (!u) return "";
    const after = Store.xp(u), before = Math.max(0, after - Math.max(0, gain || 0));
    const A = LEVEL.info(before), B = LEVEL.info(after);
    return `<div class="res-xp" data-from="${before}" data-to="${after}">
      <span class="rx-orb" aria-hidden="true"><small>LV</small><b>${A.lv}</b></span>
      <span class="rx-body">
        <span class="rx-top"><span>경험치 <b>+${fmtNum(gain || 0)}</b></span><span class="rx-next">${B.top ? "최대 레벨" : `Lv ${B.lv + 1}까지 ${fmtNum(B.left)}`}</span></span>
        <span class="rx-bar"><i style="--p:${A.p.toFixed(4)}"></i></span>
      </span>
      ${B.lv > A.lv ? `<span class="rx-up">LEVEL UP <b>${A.lv} → ${B.lv}</b></span>` : ""}
    </div>`;
  },
  /* 막대를 이전 값에서 채워 올린다. 레벨을 넘으면 끝까지 채우고 → 숫자 올림 → 0에서 다시 */
  playResult(root) {
    const box = root && root.querySelector(".res-xp"); if (!box) return;
    const from = +box.dataset.from, to = +box.dataset.to, bar = box.querySelector(".rx-bar i"), orb = box.querySelector(".rx-orb b");
    const A = LEVEL.info(from), B = LEVEL.info(to);
    const reduced = typeof FEEL !== "undefined" && FEEL.reduced && FEEL.reduced();
    const set = (p, lv) => { bar.style.setProperty("--p", p.toFixed(4)); if (lv != null) orb.textContent = lv; };
    if (reduced || B.lv === A.lv) { setTimeout(() => set(B.p), 450); if (B.lv > A.lv) { orb.textContent = B.lv; box.classList.add("leveled"); } return; }
    let lv = A.lv;
    const step = () => {
      if (!box.isConnected) return;
      if (lv < B.lv) {
        set(1);
        setTimeout(() => {
          lv++; box.classList.add("instant"); set(0, lv); void bar.offsetWidth; box.classList.remove("instant");
          box.classList.remove("pop"); void orb.offsetWidth; box.classList.add("pop");
          if (lv === B.lv) { box.classList.add("leveled"); if (typeof FEEL !== "undefined") FEEL.play("levelUp"); }
          setTimeout(step, 120);
        }, Math.max(260, 700 / (B.lv - A.lv)));
      } else set(B.p);
    };
    setTimeout(step, 500);
  }
};

LevelUI.mount();
if (!LevelUI.el) document.addEventListener("DOMContentLoaded", () => LevelUI.mount());
if (typeof Bg !== "undefined" && !Bg.levelHooked) {
  const set = Bg.set;
  Bg.set = function (mode) { set.call(this, mode); LevelUI.scene(mode); };
  Bg.levelHooked = true;
}
