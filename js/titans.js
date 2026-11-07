/* ETHERION — 배경의 세 존재: 거인(몸) · 신(뜻) · 용(힘). docs/WORLD.md 1장, docs/STYLE_GUIDE.md 2.10
   이미지 파일 없이 코드로 빚은 진짜 3D 모형을 WebGL2로 그린다(라이브러리 없음, 인터넷 불필요).
   - 색은 힘을 쓰는 진영의 색: 거인 = 아다만트 --brass, 신 = 비술 --arcane + --gold, 용 = 푸른숲 --verdant.
   - 은은하게: 어두운 몸에 가장자리 빛만 얇게 돈다. 세기는 화면마다 STRENGTH 한곳에서 정한다.
   - 마우스를 움직이면 카메라가 움직여 가까운 것(용)이 먼 것(신)보다 크게 밀린다(시차).
   - 은은한 배경이라 작게 그려 늘려 쓴다(해상도 SCALE, 안티에일리어싱 없음). 내장 그래픽을 기준으로 맞췄다.
   - 게임이 느려지면 스스로 덜 그린다(QUALITY: 1초에 20장 → 10장 → 4장, 해상도도 함께 내림). 게임 조작이 배경보다 먼저다.
   - 움직임 줄이기 설정이면 한 장만 그린다. WebGL2가 없으면 조용히 빠진다(별 배경만 남음).
   - 전장(대전 화면)에서는 그리지 않는다(v3.5.9, 게임이 버벅이지 않게). */
"use strict";

const Titans = (() => {
  const STRENGTH = { title: .62, calm: .58, off: .46 };   /* Bg.set의 모드: 타이틀 · 메뉴 · 전장 */
  const TINT = {                                       /* [어두운 몸, 가장자리 빛, 빛나는 곳] 0~1 */
    giant:  [[.075, .05, .035], [.83, .54, .23], [1, .62, .24]],     /* #d4893a */
    god:    [[.055, .045, .09], [.65, .48, .9],  [.96, .85, .55]],   /* #a57ae6, #f6e2a8 */
    dragon: [[.035, .07, .045], [.44, .68, .33], [.72, .95, .55]]    /* #6fae55 */
  };
  const QUALITY = [{ ms: 50, scale: .72 }, { ms: 100, scale: .6 }, { ms: 250, scale: .5 }];
  const LITE_Q = 1;   /* v3.17 연출 '가볍게'(기본)는 QUALITY[1](1초에 10장)부터 */
  const MAT = { smooth: 0, rock: 1, scale: 2, membrane: 3, glow: 4, robe: 5, violet: 7, gem: 8 };   /* 6은 바닥 */
  /* 용 목덜미의 일곱 보석: 머리 쪽부터 대지 · 바람 · 화염 · 물 · 숲 · 금속 · 번개 (가이드 1.2 원소색, 2.15와 같은 순서) */
  const GEM = ["#b88a5a", "#9fe3d6", "#ff6b3d", "#4fb3ff", "#58b85f", "#a9b4c2", "#ffd84a"];
  /* 바닥 칠룡의 고리 여덟 자리(atan(z, x) 기준 45°마다: 0 = 동). 동쪽은 비었다. 남동 화염 · 남 물 · 남서 숲 · 서 금속 · 북서 번개 · 북 대지 · 북동 바람 */
  const SEAT = ["", "#ff6b3d", "#4fb3ff", "#58b85f", "#a9b4c2", "#ffd84a", "#b88a5a", "#9fe3d6"];
  const rgb = h => h ? [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16) / 255) : [0, 0, 0];

  /* ---------- 고정 시드 난수와 잡음: 다시 그려도 같은 모습 (가이드 5.1과 같은 mulberry32) ---------- */
  function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const fract = x => x - Math.floor(x);
  const hash3 = (x, y, z) => fract(Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453);
  const smooth = t => t * t * (3 - 2 * t);
  function noise(x, y, z) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), u = smooth(x - xi), v = smooth(y - yi), w = smooth(z - zi);
    const L = (a, b, t) => a + (b - a) * t, H = hash3;
    return L(L(L(H(xi, yi, zi), H(xi + 1, yi, zi), u), L(H(xi, yi + 1, zi), H(xi + 1, yi + 1, zi), u), v),
      L(L(H(xi, yi, zi + 1), H(xi + 1, yi, zi + 1), u), L(H(xi, yi + 1, zi + 1), H(xi + 1, yi + 1, zi + 1), u), v), w);
  }
  const fbm = (x, y, z) => noise(x, y, z) * .6 + noise(x * 2.1, y * 2.1, z * 2.1) * .28 + noise(x * 4.3, y * 4.3, z * 4.3) * .12;

  /* ---------- 벡터 ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  const lerp3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

  /* ---------- 모형 짓기: 위치 3 + 법선 3 + (재질, 움직임, u, v) 4 ---------- */
  class Mesh {
    constructor() { this.v = []; this.i = []; }
    get count() { return this.v.length / 10; }
    vert(p, n, mat, w, u, t) { this.v.push(p[0], p[1], p[2], n[0], n[1], n[2], mat, w, u, t); return this.count - 1; }
    grid(rows, cols, wrap) {   /* 방금 넣은 (rows+1)×(cols+1) 꼭짓점을 잇는다 */
      const base = this.count - (rows + 1) * (cols + 1);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const a = base + r * (cols + 1) + c, b = a + 1, d = a + cols + 1, e = d + 1;
        this.i.push(a, d, b, b, d, e);
      }
    }
    /* 타원체. rot: Y축 회전, disp: 표면 잡음 세기 */
    blob(c, r, o = {}) {
      const lat = o.lat || 20, lon = o.lon || 28, mat = o.mat ?? MAT.smooth, cy = Math.cos(o.rot || 0), sy = Math.sin(o.rot || 0), cz = Math.cos(o.roll || 0), sz = Math.sin(o.roll || 0);
      for (let a = 0; a <= lat; a++) {
        const th = a / lat * Math.PI;
        for (let b = 0; b <= lon; b++) {
          const ph = b / lon * Math.PI * 2;
          let d = [Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)];
          let p = [d[0] * r[0], d[1] * r[1], d[2] * r[2]];
          let n = norm([d[0] / r[0], d[1] / r[1], d[2] / r[2]]);
          const rotate = q => { const x1 = q[0] * cz - q[1] * sz, y1 = q[0] * sz + q[1] * cz; return [x1 * cy + q[2] * sy, y1, -x1 * sy + q[2] * cy]; };
          p = add(rotate(p), c); n = rotate(n);
          if (o.disp) { const s = o.dispScale || 1.25; p = add(p, mul(n, (fbm(p[0] * s + 9, p[1] * s, p[2] * s) - .5) * o.disp)); }
          this.vert(p, n, mat, o.w || 0, a / lat, b / lon);
        }
      }
      this.grid(lat, lon);
    }
    /* 길을 따라 뻗는 관. pts = [x, y, z, 반지름]. 몸통·팔다리·뿔 모두 이것 */
    tube(pts, o = {}) {
      const steps = o.steps || pts.length * 8, around = o.around || 14, mat = o.mat ?? MAT.smooth;
      const P = i => pts[Math.max(0, Math.min(pts.length - 1, i))];
      const samples = [];
      for (let s = 0; s <= steps; s++) {
        const f = s / steps * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f)), t = f - i, a = P(i - 1), b = P(i), c = P(i + 1), d = P(i + 2);
        const cr = k => .5 * (2 * b[k] + (c[k] - a[k]) * t + (2 * a[k] - 5 * b[k] + 4 * c[k] - d[k]) * t * t + (3 * b[k] - a[k] - 3 * c[k] + d[k]) * t * t * t);
        samples.push([cr(0), cr(1), cr(2), Math.max(.002, cr(3))]);
      }
      let side = norm(cross(sub(samples[1], samples[0]).slice(0, 3), o.up || [0, 0, 1]));
      const frames = [];
      samples.forEach((q, s) => {
        const ta = norm(sub(samples[Math.min(steps, s + 1)], samples[Math.max(0, s - 1)]).slice(0, 3));
        side = norm(sub(side, mul(ta, dot(side, ta))));
        const up = cross(ta, side);
        frames.push({ p: q.slice(0, 3), ta, side, up, r: q[3] });
        for (let k = 0; k <= around; k++) {
          const ang = k / around * Math.PI * 2, n = add(mul(side, Math.cos(ang)), mul(up, Math.sin(ang)));
          let p = add(q.slice(0, 3), mul(n, q[3]));
          if (o.disp) p = add(p, mul(n, (fbm(p[0] * 1.25 + 9, p[1] * 1.25, p[2] * 1.25) - .5) * o.disp));
          this.vert(p, n, mat, o.w || 0, s / steps, k / around);
        }
      });
      this.grid(steps, around);
      return frames;
    }
    cone(base, tip, r, o = {}) {
      const m = lerp3(base, tip, .45);
      this.tube([[...base, r], [...m, r * .72], [...tip, .002]], { steps: 8, around: o.around || 7, up: o.up || [.3, .2, .9], ...o });
    }
    /* 얇은 판(날개막): 두 길 사이를 메운다. 양면 */
    sheet(pa, pb, o = {}) {
      const rows = pa.length - 1, cols = o.cols || 6;
      for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
        let p = lerp3(pa[r], pb[r], c / cols);
        if (o.dent) p = lerp3(p, o.pivot, o.dent * Math.sin(c / cols * Math.PI) * Math.pow(r / rows, 2.2));
        const n = norm(cross(sub(pa[Math.min(rows, r + 1)], pa[Math.max(0, r - 1)]), sub(pb[r], pa[r])));
        const w = o.flap ? o.flap(p) : 0;
        this.vert(p, n, o.mat ?? MAT.membrane, w, r / rows, c / cols);
      }
      this.grid(rows, cols);
    }
  }

  /* ---------- 거인: 갑옷 없이 산맥에서 반쯤 일어난 몸 (세계관 4-1: 잠든 몸이 산맥이 되었다) ----------
     - 허리 아래는 땅(자기 몸이 된 산)에 묻혀 있고, 두 주먹으로 땅을 짚어 몸을 일으킨다.
     - 등뼈가 그대로 산맥이 되어 왼쪽 화면 밖으로 이어진다. 어깨에도 봉우리가 솟는다.
     - 상단 문장(가이드 2.15)과 같은 얼굴: 성탑처럼 각진 돌 관, 돌 수염, 화로처럼 타는 눈.
     - 갈라진 틈의 빛은 아다만트 광맥 세 빛(뼈 회색 · 피 검붉은색 · 숨 푸른빛, 셰이더).
     - 왼쪽 어깨 비탈을 따라 갱도의 등불이 지그재그로 오른다: 필멸자(아다만트)가 거인의 몸을 캔다. */
  function buildGiant() {
    const m = new Mesh(), R = MAT.rock, rock = (c, r, o = {}) => m.blob(c, r, { mat: R, disp: .55, lat: 26, lon: 36, ...o });
    const r = rng(20261105);
    /* 땅: 거인을 둘러싼 산. 허리 아래가 앞쪽 봉우리 절벽 사이로 사라진다 */
    rock([.3, -4.4, -1.2], [5.4, 1.7, 2.4], { disp: .95, lat: 22, lon: 40 });
    rock([-5.0, -3.4, -1.8], [3.0, 2.2, 2.2], { disp: .95 });
    for (let k = 0; k < 10; k++) {
      const x = -6.2 + k * 1.3 + r() * .4, z = 1.0 + r() * .7 - Math.abs(x) * .1, h = 1.7 + r() * 1.5 - (Math.abs(x - .2) < 2.2 ? .9 : 0);
      m.cone([x, -5.6, z], [x + (r() - .5) * .6, -5.6 + h + 1.2, z + .1], 1.05 + r() * .5, { mat: R, around: 7, disp: .4 });
    }
    rock([0, -1.5, .12], [1.95, 1.55, 1.25]);                            /* 허리 */
    rock([0, .45, .1], [2.5, 1.85, 1.45]);
    for (const s of [-1, 1]) {
      rock([s * 1.15, .85, .95], [1.25, .95, .68], { disp: .34 });       /* 가슴 */
      rock([s * .95, 1.75, -.2], [1.25, .8, .85]);                        /* 승모 */
      rock([s * 3.0, 1.4, 0], [1.5, 1.32, 1.35]);                         /* 어깨 */
      /* 팔: 바깥으로 벌려 땅을 짚는다. 주먹은 반쯤 땅에 박힌다 */
      m.tube([[s * 3.1, 1.0, 0, 1.1], [s * 3.95, -.55, .3, .92], [s * 4.35, -1.85, .8, 1.0], [s * 4.25, -2.85, 1.1, .82]], { mat: R, disp: .5, steps: 26, around: 22 });
      rock([s * 4.25, -3.25, 1.2], [1.12, .92, 1.0]);                     /* 주먹 */
    }
    /* 등뼈 = 산맥: 머리 뒤에서 왼쪽 바깥으로 낮아지며 이어지는 봉우리 */
    for (let k = 0; k < 11; k++) {
      const x = -1.1 - k * 1.0 + r() * .3, z = -1.5 - k * .32, y = 1.7 - k * .5, h = 2.5 - k * .12 + r() * .9;
      m.cone([x, y, z], [x - .25 - r() * .4, y + h, z - .2], .95 + r() * .55, { mat: R, around: 7, disp: .32 });
    }
    m.cone([1.2, 1.9, -1.3], [1.05, 4.4, -1.6], 1.0, { mat: R, around: 7, disp: .3 });   /* 오른쪽 등 봉우리(가운데 쪽은 낮게) */
    /* 어깨 봉우리 */
    for (let k = 0; k < 12; k++) {
      const s = k % 3 ? -1 : 1, base = [s * (2.4 + r() * 1.5), 2.0 + r() * .5, -.6 + r() * .9];
      const h = (s < 0 ? 1.2 : .7) + r() * (s < 0 ? 1.4 : .6);
      m.cone(base, add(base, [s * (.2 + r() * .4), h, -.2]), .42 + r() * .3, { mat: R, around: 6, disp: .18 });
    }
    rock([0, 3.05, .55], [.92, 1.08, .95], { disp: .3 });                 /* 머리 */
    rock([0, 3.42, 1.22], [.86, .26, .34], { disp: .12 });                /* 눈썹뼈 */
    rock([0, 2.42, 1.0], [.72, .46, .56], { disp: .2 });                  /* 턱 */
    rock([0, 2.95, 1.46], [.2, .34, .2], { disp: .08 });                  /* 코 */
    /* 돌 수염: 턱에서 아래로 늘어진 바위 */
    rock([0, 1.95, 1.18], [.62, .6, .42], { disp: .2 });
    for (const x of [-.46, -.17, .14, .43]) m.cone([x, 2.15, 1.15 + Math.abs(x) * -.2], [x * 1.25, .95 - Math.abs(x) * .4, 1.42], .27, { mat: R, around: 6 });
    /* 성탑처럼 각진 돌 관: 머리 둘레의 네모 돌, 높낮이를 번갈아 */
    for (let k = 0; k < 9; k++) {
      const a = k / 9 * Math.PI * 2 + .17, x = Math.sin(a) * .8, z = .55 + Math.cos(a) * .78, h = k % 2 ? .3 : .62;
      m.tube([[x, 3.62, z, .2], [x, 4.12 + h, z, .2]], { mat: R, steps: 2, around: 4, up: [0, 0, 1] });
    }
    for (const s of [-1, 1]) m.blob([s * .4, 3.2, 1.42], [.15, .07, .06], { mat: MAT.glow, lat: 6, lon: 8 });   /* 화로처럼 타는 눈 */
    /* 갱도의 등불: 왼쪽 어깨 비탈을 따라 지그재그로, 끝에 용광로 불 하나 */
    const S = [-3.0, 1.4, 0], SR = [1.5, 1.32, 1.35];
    for (let k = 0; k < 9; k++) {
      const th = .42 + k * .1, ph = (k % 2 ? .62 : .98) + k * .05, d = [-Math.sin(th) * Math.cos(ph) * .55, Math.cos(th), Math.sin(th) * Math.sin(ph)];
      const p = add(S, [d[0] * SR[0] * 1.2, d[1] * SR[1] * 1.2, d[2] * SR[2] * 1.2]);
      m.blob(p, [.045, .045, .045], { mat: MAT.glow, lat: 4, lon: 6 });
    }
    m.blob([-2.35, .25, 1.2], [.13, .09, .08], { mat: MAT.glow, lat: 6, lon: 8 });
    return m;
  }

  /* ---------- 신: 얼굴 없는 긴 옷의 형상, 두 팔을 벌려 뜻을 내린다. 머리 뒤로 후광과 빛살 ---------- */
  function buildGod() {
    const m = new Mesh();
    /* 옷: 돌림 곡면. 아래로 갈수록 주름이 깊다 */
    const prof = [[-9, 5.2], [-6, 3.9], [-3.5, 2.5], [-1.5, 1.42], [0, .92], [1.1, 1.18], [2.1, 1.62], [2.7, 1.3], [3.05, .42]];
    const rows = 70, cols = 96;
    const py = t => { const f = t * (prof.length - 1), i = Math.min(prof.length - 2, Math.floor(f)), u = smooth(f - i); return [prof[i][0] + (prof[i + 1][0] - prof[i][0]) * (f - i), prof[i][1] + (prof[i + 1][1] - prof[i][1]) * u]; };
    for (let a = 0; a <= rows; a++) {
      const [y, rad] = py(a / rows), depth = Math.max(0, (1 - (y + 9) / 11)), fold = depth * depth * .34 + .012;
      for (let b = 0; b <= cols; b++) {
        const th = b / cols * Math.PI * 2;
        const wav = Math.sin(th * 7 + y * .22) * .6 + Math.sin(th * 13 - y * .3 + 1.2) * .3 + Math.sin(th * 23 + 2) * .1;
        const rr = rad * (1 + fold * wav), dw = Math.cos(th * 7 + y * .22) * 4.2 + Math.cos(th * 13 - y * .3 + 1.2) * 3.9;
        const p = [Math.cos(th) * rr, y, Math.sin(th) * rr * .78];
        const n = norm([Math.cos(th) - Math.sin(th) * fold * dw, .1, Math.sin(th) + Math.cos(th) * fold * dw]);
        m.vert(p, n, MAT.robe, 0, a / rows, b / cols);
      }
    }
    m.grid(rows, cols);
    m.blob([0, 3.72, .05], [.52, .72, .56], { lat: 22, lon: 28 });            /* 머리: 이목구비 없음 */
    m.blob([0, 3.78, -.16], [.74, .94, .68], { mat: MAT.robe, lat: 20, lon: 28 });   /* 두건 */
    m.tube([[-1.55, 2.6, -.05, .26], [-.8, 2.88, .34, .36], [0, 2.95, .52, .4], [.8, 2.88, .34, .36], [1.55, 2.6, -.05, .26]], { mat: MAT.robe, steps: 30, around: 14 });   /* 망토 깃 */
    for (let k = 0; k < 7; k++) {   /* 관 */
      const a = (k - 3) * .29, base = [Math.sin(a) * .55, 4.4 + Math.cos(a) * .12, Math.cos(a) * .22 - .1], h = k === 3 ? 1.35 : k % 2 ? .62 : .9;
      m.cone(base, add(base, [Math.sin(a) * h * .55, h, 0]), .055, { mat: MAT.glow, around: 4, up: [0, 0, 1] });
    }
    /* 앞섶을 따라 흐르는 빛줄기와 가슴의 보주 */
    m.tube([[0, 2.45, 1.0, .018], [0, .9, .88, .022], [.05, -1.2, 1.22, .028], [-.05, -3.5, 2.0, .036], [.03, -6, 3.1, .045]], { mat: MAT.glow, steps: 40, around: 5 });
    m.blob([0, 2.15, 1.18], [.17, .17, .1], { mat: MAT.glow, lat: 8, lon: 12 });
    m.tube([[0, 3.05, 0, .36], [0, 3.35, .02, .3], [0, 3.6, .04, .3]], { steps: 8 });
    for (const s of [-1, 1]) {
      m.tube([[s * 1.2, 2.45, 0, .46], [s * 2.3, 1.55, .35, .5], [s * 3.3, 1.8, 1.0, .62], [s * 4.05, 2.55, 1.4, .95]], { mat: MAT.robe, steps: 34, around: 22 });
      m.blob([s * 4.2, 3.0, 1.5], [.24, .4, .13], { rot: s * .3, lat: 12, lon: 16 });     /* 펼친 손 */
      m.blob([s * 4.2, 3.95, 1.5], [.11, .11, .11], { mat: MAT.glow, lat: 8, lon: 10 });  /* 손 위의 빛 */
    }
    /* 후광: 돌지 않는 면 + 천천히 도는 빛살 (움직임 값이 음수면 머리 뒤 축으로 돈다) */
    const ring = (R, r, z, gap, w) => {
      const seg = 160, around = 6;
      for (let a = 0; a <= seg; a++) {
        const th = a / seg * Math.PI * 2, c = [Math.cos(th) * R, 3.85 + Math.sin(th) * R, z];
        for (let b = 0; b <= around; b++) {
          const ph = b / around * Math.PI * 2, n = [Math.cos(th) * Math.cos(ph), Math.sin(th) * Math.cos(ph), Math.sin(ph)];
          m.vert(add(c, mul(n, r)), n, MAT.glow, w, a / seg * gap, b / around);
        }
      }
      m.grid(seg, around);
    };
    ring(1.55, .035, -.8, 0, 0);
    ring(2.45, .022, -1.1, 26, -.05);
    ring(3.3, .05, -1.4, 7, .035);
    const n = 24;
    for (let k = 0; k < n; k++) {
      const th = k / n * Math.PI * 2, long = k % 2 === 0, a = long ? 1.75 : 1.8, b = long ? 3.15 : 2.35, dir = [Math.cos(th), Math.sin(th), 0];
      const base = add([0, 3.85, -1.05], mul(dir, a));
      m.cone(base, add([0, 3.85, -1.05], mul(dir, b)), long ? .07 : .04, { mat: MAT.glow, w: -.05, around: 4, up: [0, 0, 1] });
    }
    /* 다섯 꼭짓점 별(신 다섯의 뜻, 가이드 2.12): 위가 꼭짓점, 보랏빛 선 + 안쪽 오각형, 꼭짓점에 금빛 점.
       머리가 별의 빈 가운데에 온다 — 한가운데는 아르케의 자리라 아무것도 그리지 않는다 */
    const line = (a, b, r) => { const from = m.count; m.tube([[...a, r], [...b, r]], { mat: MAT.violet, steps: 1, around: 4, up: [0, 0, 1] }); for (let i = from; i < m.count; i++) m.v[i * 10 + 8] = 0; };
    const SR = 2.35, SI = SR * .382, sc = [0, 3.85, -.95], pt = (k, R) => { const a = Math.PI / 2 + k * Math.PI / 5; return add(sc, [Math.cos(a) * R, Math.sin(a) * R, 0]); };
    for (let k = 0; k < 10; k++) line(pt(k, k % 2 ? SI : SR), pt(k + 1, (k + 1) % 2 ? SI : SR), .028);
    for (let k = 0; k < 10; k += 2) { line(pt(k + 1, SI), pt(k + 3, SI), .016); m.blob(pt(k, SR), [.075, .075, .075], { mat: MAT.glow, lat: 6, lon: 8 }); }
    /* 성스러운 도형: 몸을 비스듬히 감는 보랏빛 궤도 둘(점선) */
    const orbit = (cy, R, tilt, roll, dash) => {
      const seg = 140, around = 4, ct = Math.cos(tilt), st = Math.sin(tilt), cr = Math.cos(roll), sr = Math.sin(roll);
      for (let a = 0; a <= seg; a++) {
        const th = a / seg * Math.PI * 2, x = Math.cos(th) * R, z0 = Math.sin(th) * R * .8, y0 = z0 * st, c = [x * cr - y0 * sr, cy + x * sr + y0 * cr, z0 * ct];
        for (let b = 0; b <= around; b++) { const ph = b / around * Math.PI * 2, n = [Math.cos(ph), Math.sin(ph), 0]; m.vert(add(c, mul(n, .022)), n, MAT.violet, 0, a / seg * dash, b / around); }
      }
      m.grid(seg, around);
    };
    orbit(.6, 2.3, .62, .32, 0);
    orbit(-1.6, 3.3, -.5, -.26, 46);
    return m;
  }

  /* ---------- 용: 똬리를 튼 긴 몸, 활짝 편 두 날개, 가운데(신 쪽)를 내려다보는 머리 ---------- */
  function buildDragon() {
    const m = new Mesh();
    const spine = [[4.8, -5.3, -3, .03], [3.8, -5.7, -1.2, .17], [1.9, -5.9, .4, .34], [-.4, -5.5, 1.1, .5], [-2.3, -4.4, .4, .66], [-2.2, -2.9, -1.1, .84],
      [-.5, -2.3, -1.5, .98], [1.0, -1.5, -.9, 1.1], [1.4, -.2, 0, 1.14], [.85, 1.1, .4, .9], [0, 2.25, .25, .66], [-.1, 3.45, -.2, .5], [-.85, 4.45, -.1, .41], [-1.95, 4.8, .2, .36]];
    const fr = m.tube(spine, { mat: MAT.scale, steps: 190, around: 20, up: [0, 0, 1] });
    /* 등 지느러미 가시: 꼬리 끝에서 목까지 */
    const coil = [-.4, -2.5, 0];
    for (let s = 8; s < fr.length - 6; s += 5) {
      const f = fr[s], k = s / fr.length, out = norm(add(mul(norm(sub(f.p, coil)), .9), [0, .35, -.3]));
      const h = (.16 + Math.sin(k * Math.PI) * .46) * (s % 10 ? .7 : 1);
      m.cone(add(f.p, mul(out, f.r * .75)), add(add(f.p, mul(out, f.r + h)), mul(f.ta, -h * .5)), f.r * .24 + .03, { around: 5 });
    }
    /* 목덜미 바깥 선의 일곱 원소 보석 (가이드 2.15): 머리 쪽부터, 보는 쪽으로 반쯤 드러나게 */
    GEM.forEach((_, i) => {
      const f = fr[Math.round((.955 - i * .036) * (fr.length - 1))], front = [0, .35, 1];
      const d = norm(add(mul(norm(sub(front, mul(f.ta, dot(front, f.ta)))), .8), mul(f.up, .2)));
      const from = m.count;
      m.blob(add(f.p, mul(d, f.r * .9)), [.13, .13, .13].map(x => x * (1.15 - i * .03)), { mat: MAT.gem, lat: 8, lon: 10 });
      for (let j = from; j < m.count; j++) m.v[j * 10 + 8] = i;
    });
    /* 머리: 마지막에 1.4배로 키운다(참고 그림처럼 머리가 또렷하게) */
    const head0 = m.count, H = [-2.5, 4.72, .25];
    m.blob(H, [.72, .42, .42], { roll: .1, lat: 16, lon: 22 });
    m.blob([-3.32, 4.46, .28], [.68, .23, .29], { roll: .18, lat: 14, lon: 18 });
    m.blob([-3.02, 4.14, .28], [.68, .11, .22], { roll: -.1, lat: 10, lon: 16 });        /* 아래턱 */
    m.blob([-2.85, 4.86, .54], [.24, .09, .1], { roll: .25, lat: 8, lon: 12 });          /* 눈두덩 */
    m.blob([-2.95, 4.76, .63], [.07, .05, .035], { mat: MAT.glow, lat: 6, lon: 8 });
    for (const s of [-1, 1]) {
      m.tube([[-2.2, 4.98, .25 + s * .24, .13], [-1.5, 5.45, .25 + s * .4, .1], [-.75, 5.72, .25 + s * .55, .06], [-.15, 5.65, .25 + s * .62, .004]], { steps: 18, around: 7 });
      m.cone([-1.95, 4.6, .25 + s * .36], [-1.2, 4.8, .25 + s * .85], .07, {});
    }
    for (let k = 0; k < 6; k++) m.cone([-3.75 + k * .17, 4.28, .46], [-3.76 + k * .17, 4.1, .47], .03, { around: 4, mat: MAT.smooth });
    for (let j = head0, P = [-1.95, 4.75, .22]; j < m.count; j++) for (let a = 0; a < 3; a++) m.v[j * 10 + a] = P[a] + (m.v[j * 10 + a] - P[a]) * 1.4;
    /* 앞다리 */
    const toes = [[-.42, -1.98, 2.0], [-.15, -2.05, 2.15], [.12, -2.0, 2.05]];
    m.tube([[1.4, -.3, .85, .44], [.35, -.85, 1.65, .32], [-.1, -1.55, 1.9, .2]], { mat: MAT.scale, steps: 16, around: 12 });
    toes.forEach(t => m.cone([-.1, -1.62, 1.9], t, .07, { around: 5 }));
    /* 날개: 어깨 → 팔꿈치 → 손목 → 네 손가락. 사이를 막으로 메운다 */
    const wing = (S, E, W, tips, root, span) => {
      const flap = p => { const d = Math.hypot(p[0] - S[0], p[1] - S[1], p[2] - S[2]) / span; return Math.min(1, d * d * 1.1 + d * .22); };
      const w = flap;
      const bone = (a, b, ra, rb, bend) => {
        const mid = add(lerp3(a, b, .5), bend || [0, 0, 0]);
        const pts = [[...a, ra], [...mid, (ra + rb) / 2], [...b, rb]], segs = 14, around = 8, base = m.count;
        m.tube(pts, { steps: segs, around, up: [0, 0, 1] });
        for (let i = base; i < m.count; i++) m.v[i * 10 + 7] = flap([m.v[i * 10], m.v[i * 10 + 1], m.v[i * 10 + 2]]);
      };
      bone(S, E, .28, .19); bone(E, W, .19, .12, [0, .15, 0]);
      const curve = (a, b, bend, n) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, c = add(lerp3(a, b, t), mul(bend, Math.sin(t * Math.PI))); return c; });
      const paths = tips.map(tip => { const bend = mul(norm(sub(tip, W)), 0); bone(W, tip, .1, .015, add(bend, [0, .25, 0])); return curve(W, tip, [0, .25, 0], 18); });
      for (let i = 0; i < paths.length - 1; i++) {
        /* 뒤쪽 가장자리를 손가락 사이에서 안으로 파이게 한다 */
        m.sheet(paths[i], paths[i + 1], { cols: 12, flap: w, dent: .2, pivot: W });
      }
      /* 마지막 손가락과 몸 사이의 막 */
      const last = paths[paths.length - 1], rootPath = curve(E, root, [0, -.3, 0], 18);
      m.sheet(last, rootPath, { cols: 12, flap: w, dent: .24, pivot: E });
      m.sheet(curve(S, E, [0, 0, 0], 18), curve(root, E, [0, 0, 0], 18), { cols: 5, flap: w });
    };
    /* 오른쪽(바깥쪽) 큰 날개와 왼쪽(뒤쪽) 날개 */
    wing([1.25, 1.0, -.55], [3.1, 3.3, -1.4], [4.5, 5.3, -1.7],
      [[5.6, 7.4, -2.4], [8.4, 5.9, -2.6], [9.3, 2.4, -2.5], [8.4, -.9, -2.2]], [2.1, -1.0, -.9], 8);
    wing([.55, 1.15, -.75], [-.9, 3.4, -2.3], [-2.2, 5.5, -3.0],
      [[-1.5, 7.9, -3.6], [-3.5, 7.7, -3.9], [-4.9, 6.1, -3.9], [-5.1, 3.7, -3.5]], [-.9, -.5, -1.6], 7);
    return m;
  }

  /* ---------- 바닥: 어둠에 잠긴 칠룡의 고리. 원근감의 기준선 ---------- */
  function buildFloor() {
    const m = new Mesh(), S = 42, n = [0, 1, 0];
    for (const [x, z] of [[-S, -S], [S, -S], [-S, S], [S, S]]) m.vert([x, 0, z], n, 6, 0, x, z);
    m.i.push(0, 2, 1, 1, 2, 3);
    return m;
  }

  /* ---------- 셰이더 ---------- */
  const VS = `#version 300 es
  precision highp float;
  layout(location=0) in vec3 aP; layout(location=1) in vec3 aN; layout(location=2) in vec4 aM;
  uniform mat4 uVP, uM; uniform float uT, uFlap; uniform vec3 uRot;
  out vec3 vW, vN, vL; out vec4 vM;
  void main() {
    vec3 p = aP, n = aN;
    if (aM.y < 0.) {                       /* 후광: 머리 뒤 축으로 돈다 */
      float a = uT * aM.y * 2.; vec2 q = p.xy - uRot.xy;
      p.xy = uRot.xy + mat2(cos(a), sin(a), -sin(a), cos(a)) * q;
    } else if (aM.y > 0.) {                /* 날개짓: 어깨에서 멀수록 크게 */
      float s = sin(uT * .62 + aM.y * .55);
      p.y += s * uFlap * aM.y; p.z -= s * uFlap * .35 * aM.y;
    }
    vL = p;
    vec4 w = uM * vec4(p, 1.); vW = w.xyz; vN = mat3(uM) * n; vM = aM;
    gl_Position = uVP * w;
  }`;
  /* 주의: 내장 그래픽의 D3D 변환기는 sin 해시 잡음과 반복문을 느리게 컴파일한다(12초). 잡음은 텍스처로 읽고, 바닥은 프로그램을 나눈다 */
  const FS = `#version 300 es
  precision highp float;
  in vec3 vW, vN, vL; in vec4 vM;
  uniform vec3 uCam, uBody, uRim, uHot, uGem[7]; uniform float uT, uK, uFogN, uFogF; uniform sampler2D uNoise;
  out vec4 o;
  void main() {
    float m = vM.x;
    vec3 V = normalize(uCam - vW), N = normalize(vN);
    if (m > .5 && m < 1.5) N = normalize(cross(dFdx(vW), dFdy(vW)));   /* 바위: 면이 깎인 듯 */
    if (dot(N, V) < 0.) N = -N;
    float nv = clamp(dot(N, V), 0., 1.);
    float key = clamp(dot(N, vec3(-.25, .92, .29)), 0., 1.), back = clamp(dot(N, vec3(.35, .25, -.9)) * .5 + .5, 0., 1.); back = back * back * back;
    float fres = 1. - nv; fres = fres * fres * fres;
    float rim = fres * (.55 + key * .9) + back * fres * .8;
    float bodyA = .62, emis = 0.; vec3 col = uBody * (.5 + key * 1.7);
    if (m > 3.5 && m < 4.5) {              /* 눈 · 후광 · 빛살 */
      float gap = abs(sin(vM.z * 3.1416));
      gap = (vM.z > 0. && vM.y != 0.) ? smoothstep(.1, .3, gap) : 1.;
      o = vec4(uHot * uK * .62 * gap, 0.); return;
    }
    if (m > 6.5 && m < 7.5) {              /* 신의 보랏빛 선: 별 · 궤도. vM.z > 0이면 점선 */
      float gap = vM.z > 0. ? smoothstep(.15, .35, abs(sin(vM.z * 3.1416))) : 1.;
      o = vec4(mix(uRim, uHot, .18) * uK * .8 * gap, 0.); return;
    }
    if (m > 7.5) {                         /* 용의 일곱 보석: 머리에서 꼬리로 차례로 반짝인다 */
      vec3 g = uGem[int(vM.z + .5)];
      float tw = .62 + .38 * pow(.5 + .5 * sin(uT * 1.1 - vM.z * .9), 3.);
      o = vec4((g * (.45 + nv * .9) + vec3(.25) * nv * nv * nv) * uK * tw, .5 * uK); return;
    }
    if (m > .5 && m < 1.5) {               /* 틈으로 비치는 아다만트 광맥: 뼈 회색 · 피 검붉은색 · 숨 푸른빛, 가슴께는 심장불 */
      vec2 q1 = vL.xy * .115, q2 = vL.zy * .115 + .37;
      float n1 = texture(uNoise, q1).r * .6 + texture(uNoise, q2).r * .4;
      float crack = 1. - smoothstep(.0, .009, abs(n1 - .5));
      float heart = 1. - smoothstep(.3, 4.6, length(vL - vec3(0., .4, .5)));
      float sel = texture(uNoise, vL.xy * .045 + vec2(.31, .77)).r;
      vec3 vein = mix(vec3(.62, .64, .7), vec3(.7, .1, .12), smoothstep(.42, .5, sel));
      vein = mix(vein, vec3(.38, .66, 1.), smoothstep(.56, .64, sel));
      emis = crack * (.16 + heart * .75) * (.8 + .2 * sin(uT * .9));
      col *= .55 + texture(uNoise, q1 * 4.3).r * 1.05 + key * .55;
      col += mix(vein, uHot, heart * heart) * emis;
      emis = 0.;
    } else if (m < 2.5 && m > 1.5) {       /* 비늘 */
      float u = vM.z * 150., v = vM.w * 24.;
      vec2 c = vec2(fract(u) - .5, fract(v + mod(floor(u), 2.) * .5) - .5);
      float sc = smoothstep(.34, .5, length(c * vec2(1., 1.25)));
      col *= 1. - sc * .55; rim *= 1. - sc * .25;
      col += uRim * .018 * (1. - sc);
    } else if (m > 2.5 && m < 3.5) {       /* 날개막: 뒤에서 빛이 비친다 */
      bodyA = .34;
      float vein = (1. - smoothstep(.0, .06, abs(fract(vM.w * 4. + vM.z * 1.2) - .5))) * .28;
      col = uBody * .6 + uRim * ((.08 + .16 * vM.z) * (.5 + back) + vein * .1);
      rim *= .25;
    } else if (m > 4.5) {                  /* 옷: 아래로 흐르는 결 */
      col *= (.85 + .35 * smoothstep(.2, .95, nv)) * (.55 + smoothstep(.0, .5, vM.z) * .5);
    }
    /* 깊이 안개: 멀수록 흐려지고, 발치는 어둠에 잠긴다 */
    float fog = 1. - smoothstep(uFogN, uFogF, length(uCam - vW));
    float F = uK * smoothstep(-7.2, -2.6, vW.y) * mix(.4, 1., fog);
    o = vec4((col + uRim * rim * .62 + uHot * emis) * F, bodyA * F);
  }`;
  const FS_DEPTH = `#version 300 es
  precision highp float;
  out vec4 o;
  void main() { o = vec4(0.); }`;
  const FS_FLOOR = `#version 300 es
  precision highp float;
  in vec3 vW;
  uniform vec3 uCam, uSeat[8]; uniform float uT, uK; uniform sampler2D uNoise;
  out vec4 o;
  float ring(float r, float R) { return 1. - smoothstep(.0, .018 + r * .0014, abs(r - R)); }
  float blob(vec2 p, vec2 c, float R) { vec2 d = (p - c) / R; return max(0., 1. - dot(d, d)); }
  void main() {
    vec3 V = normalize(uCam - vW);
    vec2 p = vW.xz;
    float r = length(p), a = atan(p.y, p.x);
    /* 동쪽 너머의 빈 땅: 색이 빠지고 고리의 선도 지워진다 */
    float voidM = smoothstep(.0, .7, blob(p, vec2(17., -4.), 8.5));
    float b = ring(r, 7.) + ring(r, 13.5) * 1.5 + ring(r, 20.) + ring(r, 26.5);
    float tick = smoothstep(.72, .98, cos(a * 56. + uT * .03)) * (1. - smoothstep(.0, .26, abs(r - 13.98)));
    float spoke = smoothstep(.994, 1., cos(a * 7. - uT * .02)) * smoothstep(5., 8., r) * (1. - smoothstep(12., 34., r)) * .45;
    float L = (b + tick + spoke) * (1. - smoothstep(8., 40., r)) * .3 * (1. - voidM * .9) + (1. - smoothstep(0., 26., r)) * .035;
    vec3 col = vec3(.85, .7, .42) * L;
    /* 칠룡의 고리 여덟 자리: 원소색 빛 일곱, 동쪽은 빈 점선 홈 */
    float k = mod(floor(a / .7854 + .5), 8.);
    vec2 seat = 13.5 * vec2(cos(k * .7854), sin(k * .7854));
    float d = length(p - seat);
    if (k < .5) {
      col += vec3(.55) * (1. - smoothstep(.0, .09, abs(d - .75))) * step(.5, fract(atan(p.y - seat.y, p.x - seat.x) * 1.9)) * .5;
    } else {
      float pulse = .8 + .2 * sin(uT * .7 + k * 1.3);
      col += uSeat[int(k)] * ((1. - smoothstep(.0, .42, d)) * 1.6 + (1. - smoothstep(.0, 2.4, d)) * .35) * pulse;
    }
    /* 고리 안의 필멸자 땅: 서북 아다만트의 용광로 불 · 서남 푸른숲의 숲빛 · 동 비술의 흰 첨탑 불빛 */
    vec2 g = p * 1.25, c = floor(g), f = fract(g) - .5;
    float h1 = fract(texture(uNoise, (c + .5) / 61.).r * 31.7), h2 = fract(texture(uNoise, (c + .5) / 47. + .5).r * 23.3);
    float dotL = (1. - smoothstep(.03, .12, length(f - (vec2(h1, h2) - .5) * .6))) * step(.55, h1 * h2 * 2.);
    float adam = blob(p, vec2(-7., -7.5), 4.8), verd = blob(p, vec2(-7., 2.5), 4.6), arc = blob(p, vec2(6.5, -3.), 4.2);
    float fl = .7 + .3 * sin(uT * 2.3 + h1 * 40.);
    col += dotL * (vec3(1., .55, .2) * adam * fl + vec3(.45, .8, .4) * verd + vec3(.85, .78, 1.) * arc * (.85 + .15 * sin(uT + h2 * 30.))) * 1.3;
    col += vec3(.75, .4, .16) * adam * adam * .05 + vec3(.25, .45, .2) * verd * verd * .04 + vec3(.45, .38, .7) * arc * arc * .05;
    /* 빈 땅: 회색 번짐과 잔금 */
    float n = texture(uNoise, p * .05).r;
    col = mix(col, vec3(.3, .3, .32) * (.08 + (1. - smoothstep(.0, .012, abs(n - .5))) * .35), voidM * .85);
    float sky = smoothstep(.0, .12, V.y), A = max(L, max(col.r, max(col.g, col.b)) * .6);
    o = vec4(col * uK * sky, A * .5 * uK * sky);
  }`;

  /* ---------- 행렬 ---------- */
  const persp = (fov, asp, n, f) => { const t = 1 / Math.tan(fov / 2), d = 1 / (n - f); return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) * d, -1, 0, 0, 2 * f * n * d, 0]; };
  function lookAt(e, c) {
    const z = norm(sub(e, c)), x = norm(cross([0, 1, 0], z)), y = cross(z, x);
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, e), -dot(y, e), -dot(z, e), 1];
  }
  const mmul = (a, b) => { const r = new Array(16).fill(0); for (let c = 0; c < 4; c++) for (let w = 0; w < 4; w++) for (let k = 0; k < 4; k++) r[c * 4 + w] += a[k * 4 + w] * b[c * 4 + k]; return r; };
  const model = (x, y, z, s, ry, rx = 0, rz = 0) => {
    const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx), cz = Math.cos(rz), sz = Math.sin(rz);
    const Y = [cy, 0, -sy, 0, 0, 1, 0, 0, sy, 0, cy, 0, 0, 0, 0, 1], X = [1, 0, 0, 0, 0, cx, sx, 0, 0, -sx, cx, 0, 0, 0, 0, 1], Z = [cz, sz, 0, 0, -sz, cz, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    const m = mmul(mmul(Y, X), Z); for (let i = 0; i < 12; i++) m[i] *= s; m[12] = x; m[13] = y; m[14] = z; return m;
  };

  /* ---------- 상태 ---------- */
  let gl, cv, prog, progF, progD, U = {}, UF = {}, UD = {}, parts = [], k = 0, kTo = 0, mx = 0, my = 0, tx = 0, ty = 0, last = 0, W = 0, H = 0, reduced = false, raf = 0, ready = false, q = 0, prevRaf = 0, slowSum = 0, slowN = 0, asleep = false;

  function upload(mesh) {
    const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.v), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(mesh.i), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 40, 0);
    gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 40, 12);
    gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 40, 24);
    gl.bindVertexArray(null);
    return { vao, n: mesh.i.length };
  }
  /* 컴파일 결과를 바로 묻지 않는다: 물으면 다 될 때까지 화면이 멈춘다 */
  function program(vs, fs) {
    const p = gl.createProgram(), mk = (type, src) => { const x = gl.createShader(type); gl.shaderSource(x, src); gl.compileShader(x); gl.attachShader(p, x); return x; };
    p._s = [mk(gl.VERTEX_SHADER, vs), mk(gl.FRAGMENT_SHADER, fs)]; gl.linkProgram(p); return p;
  }
  function whenLinked(list, cb) {
    const ext = gl.getExtension("KHR_parallel_shader_compile");
    const poll = () => (!ext || list.every(p => gl.getProgramParameter(p, ext.COMPLETION_STATUS_KHR))) ? cb() : setTimeout(poll, 120);
    poll();
  }
  /* 이음매 없는 값 잡음 텍스처 */
  function noiseTexture() {
    const S = 256, data = new Uint8Array(S * S);
    const per = (x, y, n) => { const xi = Math.floor(x), yi = Math.floor(y), u = smooth(x - xi), v = smooth(y - yi), H = (a, b) => fract(Math.sin(((a % n + n) % n) * 127.1 + ((b % n + n) % n) * 311.7) * 43758.5453);
      return (H(xi, yi) * (1 - u) + H(xi + 1, yi) * u) * (1 - v) + (H(xi, yi + 1) * (1 - u) + H(xi + 1, yi + 1) * u) * v; };
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const a = x / S, b = y / S; data[y * S + x] = 255 * (per(a * 8, b * 8, 8) * .55 + per(a * 16, b * 16, 16) * .3 + per(a * 32, b * 32, 32) * .15); }
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, S, S, 0, gl.RED, gl.UNSIGNED_BYTE, data); gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  }

  function resize() {
    const scale = Math.min(1.25, devicePixelRatio || 1) * QUALITY[q].scale;
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * scale); cv.height = Math.round(H * scale);
    gl.viewport(0, 0, cv.width, cv.height);
    if (reduced && ready) frame(performance.now(), true);
  }

  function frame(now, force) {
    if (!force) {
      raf = requestAnimationFrame(frame);
      /* 브라우저 전체의 프레임 간격을 재서, 2초 동안 평균 40ms를 넘으면 한 단계 내린다 (탭을 가렸다 돌아온 큰 간격은 뺀다) */
      const gap = now - prevRaf; prevRaf = now;
      if (gap < 500 && !document.hidden) {
        slowSum += gap; slowN++;
        if (slowSum > 2000) {
          if (slowSum / slowN > 40 && q < QUALITY.length - 1) { q++; resize(); }
          slowSum = 0; slowN = 0;
        }
      }
      if (now - last < QUALITY[q].ms) return;
    }
    last = now;
    const t = now / 1000;
    const ease = Math.min(1, QUALITY[q].ms / 50);
    k += (kTo - k) * .1 * ease; mx += (tx - mx) * .14 * ease; my += (ty - my) * .14 * ease;
    const warp = (typeof Bg !== "undefined" && Bg.warp) || 0;

    /* 화면이 좁으면 셋을 안쪽으로 모은다 */
    const asp = W / Math.max(1, H), fit = Math.min(1, asp / 1.6), spread = .42 + .58 * fit;
    const eye = [mx * 1.15, 2.1 - my * .6, 15.5 - warp * 11], at = [mx * .1, .75, -2];
    const VP = mmul(persp(.75, asp, .5, 90), lookAt(eye, at));

    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(progF);
    gl.uniformMatrix4fv(UF.uVP, false, VP); gl.uniform3fv(UF.uCam, eye); gl.uniform1f(UF.uT, t); gl.uniform1f(UF.uK, k);
    gl.useProgram(prog);
    gl.uniformMatrix4fv(U.uVP, false, VP); gl.uniform3fv(U.uCam, eye); gl.uniform1f(U.uT, t); gl.uniform1f(U.uK, k);

    const breath = Math.sin(t * .42);
    const place = {
      floor:  () => model(0, -6.4, -3, 1, 0),
      god:    () => model(.0, -.9 + Math.sin(t * .3) * .12, -11, 1.34, Math.sin(t * .11) * .05),
      giant:  () => model(-6.5 * spread, .55 + breath * .05, -1.5, 1.0, .36 + Math.sin(t * .09) * .018, .03 + breath * .006),
      dragon: () => model(5.55 * spread, .3 + Math.sin(t * .37) * .1, .2, .84, -.16 + Math.sin(t * .13) * .03, 0, Math.sin(t * .23) * .008)
    };
    for (const p of parts) {
      if (p.key === "floor") {
        gl.useProgram(progF); gl.uniformMatrix4fv(UF.uM, false, place.floor());
        gl.bindVertexArray(p.vao); gl.drawElements(gl.TRIANGLES, p.n, gl.UNSIGNED_INT, 0);
        gl.useProgram(prog); continue;
      }
      const M = place[p.key](), flap = p.key === "dragon" ? .42 : 0;
      gl.bindVertexArray(p.vao);
      /* 먼저 깊이만 그려, 앞면 한 겹만 색이 칠해지게 한다 */
      gl.useProgram(progD); gl.colorMask(false, false, false, false);
      gl.uniformMatrix4fv(UD.uVP, false, VP); gl.uniformMatrix4fv(UD.uM, false, M); gl.uniform1f(UD.uT, t); gl.uniform1f(UD.uFlap, flap); gl.uniform3f(UD.uRot, 0, 3.85, 0);
      gl.drawElements(gl.TRIANGLES, p.n, gl.UNSIGNED_INT, 0);
      gl.useProgram(prog); gl.colorMask(true, true, true, true);
      gl.uniformMatrix4fv(U.uM, false, M);
      const c = TINT[p.key] || TINT.god;
      gl.uniform3fv(U.uBody, c[0]); gl.uniform3fv(U.uRim, c[1]); gl.uniform3fv(U.uHot, c[2]);
      gl.uniform1f(U.uFlap, flap);
      gl.uniform3f(U.uRot, 0, 3.85, 0);
      gl.uniform1f(U.uFogN, p.fog[0]); gl.uniform1f(U.uFogF, p.fog[1]);
      gl.drawElements(gl.TRIANGLES, p.n, gl.UNSIGNED_INT, 0);
    }
    gl.bindVertexArray(null);
  }

  return {
    init() {
      if (cv) return;
      cv = document.createElement("canvas"); cv.id = "titans-canvas"; cv.setAttribute("aria-hidden", "true");
      gl = cv.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: true, powerPreference: "low-power" });
      if (!gl) { cv = null; return; }
      reduced = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
      if (document.documentElement.classList.contains("fx-lite")) q = LITE_Q;   // v3.17 연출 가볍게: 1초에 10장 · 해상도 낮게부터
      prog = program(VS, FS); progF = program(VS, FS_FLOOR); progD = program(VS, FS_DEPTH);
      /* 그래픽 칩이 느려도 게임은 먼저 뜬다: 컴파일이 끝나면 모형을 하나씩 지어 서서히 나타난다 */
      whenLinked([prog, progF, progD], () => {
        for (const q of [prog, progF, progD]) if (!gl.getProgramParameter(q, gl.LINK_STATUS)) { console.warn("Titans:", gl.getProgramInfoLog(q), gl.getShaderInfoLog(q._s[0]), gl.getShaderInfoLog(q._s[1])); cv = null; return; }
        for (const u of ["uVP", "uM", "uT", "uFlap", "uRot", "uCam", "uBody", "uRim", "uHot", "uK", "uFogN", "uFogF", "uGem"]) U[u] = gl.getUniformLocation(prog, u);
        for (const u of ["uVP", "uM", "uT", "uCam", "uK", "uSeat"]) UF[u] = gl.getUniformLocation(progF, u);
        gl.useProgram(prog); gl.uniform3fv(U.uGem, GEM.flatMap(rgb));
        gl.useProgram(progF); gl.uniform3fv(UF.uSeat, SEAT.flatMap(rgb));
        for (const u of ["uVP", "uM", "uT", "uFlap", "uRot"]) UD[u] = gl.getUniformLocation(progD, u);
        gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        noiseTexture();
        const bg = document.getElementById("bg-canvas"); bg.parentNode.insertBefore(cv, bg);
        const todo = [["floor", buildFloor, [10, 60]], ["god", buildGod, [20, 44]], ["giant", buildGiant, [12, 34]], ["dragon", buildDragon, [12, 34]]];
        const next = () => {
          if (todo.length) { const [key, fn, fog] = todo.shift(); parts.push({ key, fog, ...upload(fn()) }); setTimeout(next, 16); return; }
          addEventListener("resize", resize); resize();
          addEventListener("pointermove", e => { if (reduced) return; tx = e.clientX / W - .5; ty = e.clientY / H - .5; }, { passive: true });
          cv.addEventListener("webglcontextlost", e => { e.preventDefault(); cancelAnimationFrame(raf); });
          cv.addEventListener("webglcontextrestored", () => location.reload());
          ready = true;
          if (asleep) cv.style.display = "none";
          else if (reduced) { k = kTo; frame(performance.now(), true); } else raf = requestAnimationFrame(frame);
        };
        next();
      });
    },
    /* 지금 품질 단계 (점검용) */
    get quality() { return q; },
    lite(on) { const q0 = on ? LITE_Q : 0; if (on ? q < q0 : q !== q0) { q = q0; slowSum = slowN = 0; if (cv) resize(); } },   // v3.17 설정 창에서 바꿀 때
    /* Bg.set이 부른다 */
    mode(m) {
      /* v3.5.9: 전장("off")에서는 아예 그리지 않는다 — 캔버스를 숨기고 그리기 고리를 멈춘다. 다른 화면으로 나가면 다시 그린다 */
      const sleep = m === "off";
      if (sleep !== asleep) {
        asleep = sleep;
        if (cv) cv.style.display = sleep ? "none" : "";
        if (sleep) { cancelAnimationFrame(raf); raf = 0; }
        else if (ready && !reduced && !raf) raf = requestAnimationFrame(frame);
      }
      kTo = typeof m === "number" ? m : STRENGTH[m] ?? STRENGTH.calm;
      if (ready && reduced && !asleep) { k = kTo; frame(performance.now(), true); }
    }
  };
})();
