/* ETHERION — 날씨: 카일란의 하늘
   비가 오면 가는 빗줄기가, 눈이 오면 눈송이가 화면 위에 살짝 내린다. 맑으면 아무것도 없다.
   - 따로 둔 캔버스(#weather-canvas)에 그린다. UI 위에 얇게 겹치되(클릭은 통과) 패널·모달보다는 아래.
   - 날씨는 앱을 켤 때 한 번 정하고, 경기가 시작될 때마다 다시 정한다(경기 기록에 적힌다).
   - 움직임 줄이기 설정이면 그리지 않는다. */
"use strict";

const Weather = {
  KINDS: {
    clear: { name: "맑음", icon: "☀", w: 40, line: "카일란의 하늘이 맑다." },
    rain:  { name: "비",   icon: "☂", w: 30, line: "카일란에 가벼운 비가 내린다." },
    snow:  { name: "눈",   icon: "❄", w: 30, line: "카일란에 눈이 흩날린다." }
  },
  kind: "clear", cv: null, ctx: null, drops: [], raf: 0, w: 0, h: 0, reduced: false, wind: 0,
  init() {
    this.reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = document.createElement("canvas"); cv.id = "weather-canvas"; cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    this.cv = cv; this.ctx = cv.getContext("2d");
    const rs = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      this.w = innerWidth; this.h = innerHeight;
      cv.width = this.w * dpr; cv.height = this.h * dpr; this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.fill();
    };
    rs(); addEventListener("resize", rs);
    this.roll();
    const loop = () => { this.draw(); this.raf = requestAnimationFrame(loop); };
    loop();
  },
  /* 날씨 뽑기 (가중치). 결과를 돌려준다 */
  roll() {
    const ks = Object.keys(this.KINDS); let r = Math.random() * ks.reduce((s, k) => s + this.KINDS[k].w, 0);
    let k = ks[0]; for (const x of ks) { r -= this.KINDS[x].w; if (r <= 0) { k = x; break; } }
    this.set(k); return k;
  },
  set(k) {
    if (!this.KINDS[k]) k = "clear";
    this.kind = k; this.wind = k === "rain" ? 0.6 + Math.random() * 0.6 : 0.15 + Math.random() * 0.3;
    this.fill();
    document.documentElement.dataset.weather = k;
    const chip = document.querySelector(".weather-chip"); if (chip) chip.innerHTML = this.chipHTML(true);
  },
  info() { return this.KINDS[this.kind]; },
  chipHTML(inner) { const K = this.info(); const s = `<i>${K.icon}</i><b>${K.name}</b>`; return inner ? s : `<span class="weather-chip" title="${esc(K.line)}">${s}</span>`; },
  fill() {
    this.drops = [];
    if (this.kind === "clear" || !this.w) return;
    const n = this.kind === "rain" ? Math.round(this.w * this.h / 9000) : Math.round(this.w * this.h / 14000);
    for (let i = 0; i < n; i++) this.drops.push(this.drop(true));
  },
  drop(any) {
    const z = Math.random();           // 깊이: 멀수록 작고 느리고 옅다
    if (this.kind === "rain") return { x: Math.random() * this.w, y: any ? Math.random() * this.h : -20, z, len: 8 + z * 14, v: 7 + z * 9, a: 0.08 + z * 0.22 };
    return { x: Math.random() * this.w, y: any ? Math.random() * this.h : -8, z, r: 0.8 + z * 2.2, v: 0.4 + z * 0.9, sway: Math.random() * 6.28, a: 0.25 + z * 0.55 };
  },
  draw() {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    if (this.kind === "clear" || this.reduced || !this.drops.length) return;
    const t = performance.now() / 1000;
    if (this.kind === "rain") {
      ctx.lineCap = "round"; ctx.lineWidth = 1;
      for (const d of this.drops) {
        d.y += d.v; d.x += this.wind * d.v * 0.25;
        if (d.y > h + 20) Object.assign(d, this.drop(false));
        if (d.x > w + 10) d.x = -10;
        ctx.strokeStyle = `rgba(170,200,235,${d.a})`;
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - this.wind * d.len * 0.25, d.y - d.len); ctx.stroke();
      }
    } else {
      for (const d of this.drops) {
        d.y += d.v; d.sway += 0.012 + d.z * 0.01; d.x += Math.sin(d.sway + t * 0.3) * 0.35 + this.wind * 0.3;
        if (d.y > h + 8) Object.assign(d, this.drop(false));
        if (d.x > w + 8) d.x = -8; else if (d.x < -8) d.x = w + 8;
        ctx.fillStyle = `rgba(236,240,255,${d.a})`;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
      }
    }
  }
};
