/* ETHERION — 마법 장면 연출 (2026-11-24, 사용자: "깃발을 대표하는 마법은 그 마법다운 장면으로")
   js/spellfx.js 는 마법을 "발사체 하나가 대상 하나에게" 날아가 맞는 모양으로 그린다. 이 파일은 그 위에 깃발마다 대표 마법의 **장면**을 얹는다:
     포르탄(B1 불)   bombard 포격 — 쏘아 올린 포탄이 하늘에서 적진에 차례로 떨어져 터짐 / firesea 불바다 — 불길이 줄을 훑고 지나감
     칼데른(B2 쇠)   hammer 큰 망치가 내려찍음 / rivets 리벳 일제 사격 / plates 강화 — 쇠판이 양옆에서 맞물림
     케라운(B3 번개) storm 먹구름이 끼고 벼락이 차례로 / chain 연쇄 — 앞 유닛에서 다음 유닛으로 튀는 전류
     카르노(G1 땅)   fissure 땅이 줄을 따라 갈라지며 바위가 솟음 / roar 함성의 충격파
     베르단(G2 숲)   vines 덩굴이 감아 조임 / bramble 강화 — 가시 덤불이 둘러 자람
     셀레네아(G3 물) tide 물마루가 적진을 쓸고 지나감 / wash 강화 — 맑은 물이 차올라 씻김
     녹타르(A1 암흑) lance 피의 창이 내리꽂힘 / reap 파괴 — 낫이 가름 / drain 약화 — 혼이 빨려 나감
     솔란테(A2 빛)   judgment 해가 뜨고 빛줄기가 내리침 / wings 보호 — 빛의 날개가 감쌈
     벨루미르(A3 바람) volley 화살비 — 날아와 꽂혀 떨림 / gale 돌풍이 줄을 훑음
   어느 마법이 어느 장면인지는 아래 BY_ID(카드 ID) — 없으면 AREA_OF(원소 모양)로, 셋 이상을 한꺼번에 치는 마법만 장면으로 바꾼다. 나머지는 예전 그대로.
   끼우는 곳: SpellFX.cast 를 감싼다(js/game.js 는 그대로). 장면이 맡은 대상은 장면이, 나머지 숫자는 원래 cast 가 그린다.
   돌려주는 값은 원래와 같다 — Map(대상 → 숫자를 띄울 때까지 ms). **숫자 · 체력은 맞는 순간에 바뀐다**(js/game.js runCombat hitAt).
   연출 3단계(js/impact.js applyFx): 저사양(fx-low, 폰 · 앱) = 조각을 줄인 가벼운 판 / 중간 = 기본 / 고사양(fx-high) = 잔불 · 물보라 · 파편 · 잔상 · 빛 번짐 · 맞은 줄의 약한 흔들림을 더한 판.
     고사양에서는 장면이 없는 마법도 맞는 순간 원소별 잔여 입자(RICH_HIT)가 더해진다.
   움직임 줄이기 · 배속 0 · 화면 없는 대전이면 아무것도 하지 않는다(SpellFX.kit.off). 판의 결과는 건드리지 않는다(연출만 — Math.random 써도 됨).
   소리: 맞는 순간 sp_land_<원소>(차례로 높아짐) · 셋 이상이면 sp_area — js/spellfx.js 와 같은 규칙. 장면 소리 자리(sc_*)는 파일이 생기면 난다(없으면 조용히 넘어감). */
"use strict";

const SpellScene = (() => {
  if (typeof SpellFX === "undefined" || !SpellFX.kit) return null;
  const { mk, anim, sparks, rise, flash, ring, screenFlash, shake, glow, fly, puff, svgLayer, jag, path, block, explode, splash, bubble, aura, curse, K, off, later, snd, px, rnd, ctr, EL_COL, FXC, P_OF_EL } = SpellFX.kit;
  const root = document.documentElement.classList;
  const tier = () => (root.contains("fx-low") ? 0 : root.contains("fx-high") ? 2 : 1);   // 0 저사양 · 1 중간 · 2 고사양
  const sndR = (n, v, rate) => { if (typeof FEEL !== "undefined" && FEEL.playAt && typeof G !== "undefined" && G && !G.cfg.headless && G.speed !== 0) FEEL.playAt(n, v, rate, true); else snd(n, v); };
  const pick = (a, b, c) => [a, b, c][tier()];   // 단계별 값

  /* ---------- 어느 마법이 어느 장면인가 ---------- */
  const BY_ID = {
    // 포르탄 잿불 고블린 (불)
    "SB1-09": "bombard", "US-B1-2": "bombard", "MC-16": "bombard", "RS-B1-3": "bombard", "SB1-06": "bombard", "MB-01": "bombard", "RS-B1-2": "bombard", "RS-B1-1": "firesea",
    // 칼데른 무쇠수염 (쇠)
    "US-B2-1": "hammer", "RS-B2-1": "hammer", "SB2-06": "hammer", "RS-B2-3": { hit: "rivets", buff: "plates" }, "RB2-1": "rivets", "MB-06": { hit: "rivets", buff: "plates" }, "SB2-02": "rivets",
    "SB2-09": { buff: "plates", shield: "plates" }, "RS-B2-2": { buff: "plates", shield: "plates" }, "MB-08": { buff: "plates", shield: "plates" }, "PS-B2-1": { buff: "plates" },
    // 케라운 번개 노움 (번개)
    "SB3-06": "storm", "SB3-09": "storm", "RB3-1": "storm", "RS-B3-2": "storm", "GN-B3-2": "storm", "SB3-01": "storm", "SB3-04": "storm",
    "NB3-1": "chain", "US-B3-2": "chain", "RS-B3-1": "chain",
    // 카르노 바위주먹 (땅)
    "MG-16": "fissure", "RS-G1-3": "fissure", "MG-05": "fissure", "NG1-2": "roar", "US-G1-2": "roar", "SG1-09": "roar", "SG1-02": "roar",
    // 베르단 이끼 트롤 (숲)
    "MC-14": "vines", "NG2-1": "vines", "RS-G2-1": "vines", "SG2-01": "vines", "RG2-1": "vines", "MC-11": "vines",
    "RS-G2-2": { buff: "bramble" }, "SG2-09": { buff: "bramble" }, "SG2-07": { buff: "bramble" }, "SG2-03": { buff: "bramble" },
    // 셀레네아 푸른비늘 (물)
    "RG3-1": "tide", "NG3-1": "tide", "US-G3-2": { hit: "tide", buff: "wash" }, "RS-G3-3": { hit: "tide", buff: "wash" }, "US-G3-1": "tide",
    "MG-15": { buff: "wash" }, "RS-G3-2": { buff: "wash" },
    // 녹타르 심연 (암흑)
    "RS-A1-1": "lance", "MA-04": "lance", "US-A1-2": "lance", "SA1-06": "lance", "MA-05": "reap", "US-A1-1": "reap", "RA1-1": "reap",
    "PS-A1-1": { debuff: "drain" }, "RS-A1-2": { debuff: "drain" },
    // 솔란테 성광 (빛)
    "RA2-1": { hit: "judgment", shield: "wings" }, "US-A2-2": { hit: "judgment", shield: "wings" }, "SA2-04": { hit: "judgment", shield: "wings" }, "RS-A2-1": "judgment", "MA-14": "judgment",
    "NA2-2": { shield: "wings", buff: "wings" }, "MA-02": { shield: "wings" }, "RS-A2-2": { buff: "wings" }, "RS-A2-3": { shield: "wings" }, "CS-A2": { shield: "wings" },
    // 벨루미르 폭풍 (바람)
    "NA3-2": "volley", "NA3-3": "volley", "MA-11": "volley", "NA3-4": "volley",
    "NA3-1": { hit: "gale", debuff: "gale" }, "US-A3-2": { hit: "gale", debuff: "gale" }, "RS-A3-2": { hit: "gale", debuff: "gale" }, "SA3-08": { debuff: "gale" }, "MC-06": { debuff: "gale" }, "RA3-1": { hit: "gale", debuff: "gale" }
  };
  /* 장면을 따로 정하지 않은 마법: 셋 이상을 한꺼번에 치면 원소 모양(SpellFX.themeOf().k)에 맞는 장면으로 */
  const AREA_OF = { shell: "bombard", meteor: "bombard", fireball: "firesea", steel: "rivets", bolt: "storm", rock: "fissure", quake: "fissure", thorn: "vines", water: "tide", wave: "tide", holy: "judgment", spear: "judgment", wind: "gale", arrows: "volley" };
  function defOf(id, th, nHit) {
    const c = id && typeof CARDS !== "undefined" ? CARDS[id] : null;
    let d = BY_ID[id] || (c && c.base && BY_ID[c.base]) || null;
    if (typeof d === "string") d = { hit: d };
    if (!d && nHit >= 3 && AREA_OF[th.k]) d = { hit: AREA_OF[th.k] };
    return d || {};
  }

  /* ---------- 공통 조각 ---------- */
  const land = (env, i, at) => later(() => sndR("sp_land_" + env.el, 0.5 + 0.02 * Math.min(i, 5), 1 + 0.035 * Math.min(i, 5)), at);
  const hook = (name, v, at) => later(() => snd(name, v), at || 0);   // 장면 소리 자리 (파일이 없으면 조용히 넘어간다)
  /* 맞은 카드 위를 덮는 조각 (그을음 · 물기 · 쇠판): 카드 네모에 맞춘다 */
  function cover(r, cls, vars, ms, kf) {
    const d = mk("sc-cover " + cls, r.left, r.top, Object.assign({ "--w": px(r.width), "--h": px(r.height) }, vars || {}));
    anim(d, kf || [{ opacity: 0 }, { offset: 0.15, opacity: 1 }, { offset: 0.6, opacity: 0.85 }, { opacity: 0 }], ms * K(), { easing: "ease-out" });
    return d;
  }
  /* 맞은 줄 전체가 아주 조금 흔들린다 — 고사양만 (화면 전체는 흔들지 않는다, v3.16.3) */
  function nudge(el, n) {
    if (tier() < 2 || !el) return;
    const row = el.closest(".frow") || el.parentElement; if (!row || !row.animate) return;
    try { row.animate([{ translate: "0 0" }, { translate: `${-n * 0.6}px ${n}px` }, { translate: `${n * 0.5}px ${-n * 0.5}px` }, { translate: `${-n * 0.25}px ${n * 0.25}px` }, { translate: "0 0" }], { duration: 240 * K(), easing: "ease-out", composite: "add" }); } catch (e) {}
  }
  function squash(el, sx, sy, ms) {
    if (!el || !el.animate) return;
    try { el.animate([{ scale: "1 1" }, { offset: 0.25, scale: `${sx} ${sy}` }, { offset: 0.6, scale: `${2 - sx - (1 - sx) * 0.6} ${2 - sy - (1 - sy) * 0.6}` }, { scale: "1 1" }], { duration: ms * K(), easing: "ease-out" }); } catch (e) {}
  }
  function lean(el, deg, ms) {
    if (!el || !el.animate) return;
    try { el.animate([{ rotate: "0deg", translate: "0 0" }, { offset: 0.3, rotate: deg + "deg", translate: `${deg * 1.2}px 0px` }, { offset: 0.65, rotate: -deg * 0.35 + "deg" }, { rotate: "0deg", translate: "0 0" }], { duration: ms * K(), easing: "ease-out" }); } catch (e) {}
  }
  /* 한 줄(같은 높이)에 놓인 대상끼리 묶는다 — 양쪽 전장을 모두 치는 마법은 줄마다 따로 훑는다 */
  function rows(T) {
    const out = [];
    for (const t of T) { const g = out.find(g => Math.abs(g.y - t.b.y) < t.r.height * 0.5); if (g) g.T.push(t); else out.push({ y: t.b.y, T: [t] }); }
    for (const g of out) {
      g.T.sort((a, b) => a.b.x - b.b.x);
      g.x0 = g.T[0].r.left; g.x1 = g.T[g.T.length - 1].r.right; g.top = Math.min(...g.T.map(t => t.r.top)); g.bot = Math.max(...g.T.map(t => t.r.bottom)); g.cw = g.T[0].r.width; g.h = g.bot - g.top;
    }
    return out;
  }
  /* 발동한 카드에서 하늘로 쏘아 올리는 줄기 (포탄 · 화살): 화면 위로 나갔다가 곧 대상 위로 떨어진다 */
  function launchUp(env, n, col, w, arrow) {
    if (!env.src) return;
    const k = K(), H = env.src.y + 80;
    for (let i = 0; i < n; i++) later(() => {
      const dx = rnd(-60, 60), rot = (Math.atan2(-H, dx) * 180 / Math.PI).toFixed(1) + "deg";
      const s = arrow ? mk("sc-arrow", env.src.x + rnd(-14, 14), env.src.y, { "--w": px(w) }) : mk("sc-streak", env.src.x + rnd(-14, 14), env.src.y, { "--c": col, "--w": px(w || 5), "--h": px(Math.max(46, H * 0.16)) });
      anim(s, [{ translate: "0px 0px", opacity: 0.2, rotate: arrow ? rot : "0deg" }, { offset: 0.15, opacity: 1 }, { translate: `${px(dx)} ${px(-H)}`, opacity: 0.7, rotate: arrow ? rot : "0deg" }], (arrow ? 240 : 210) * k, { easing: "cubic-bezier(.3,0,.8,.6)" });
    }, i * 45 * k);
  }
  /* 빛 번짐: 흰 속심 없이 넓고 옅게 — 고사양 */
  function bloom(x, y, s, col, ms) {
    const f = mk("sc-bloom", x, y, { "--c": col, "--s": px(s) });
    anim(f, [{ scale: "0.3", opacity: 0.9 }, { offset: 0.25, scale: "1", opacity: 0.7 }, { scale: "1.2", opacity: 0 }], ms * K());
  }
  /* 지나간 자리에 흐릿하게 남는 잔상 — 고사양 */
  function ghost(cls, x, y, vars, rot, ms) {
    const g = mk(cls + " sc-ghost", x, y, vars);
    anim(g, [{ opacity: 0.5, rotate: rot || "0deg" }, { opacity: 0, rotate: rot || "0deg" }], ms * K(), { easing: "linear" });
  }

  /* ---------- 장면: run(T, env) — T[i] = { key, el, r, b, blocked }, T[i].at 에 맞는 때(ms)를 적는다 ---------- */
  const SC = {
    /* 포격: 쏘아 올린 포탄이 하늘에서 떨어져 하나씩 터진다 */
    bombard(T, env) {
      const k = K(), q = tier(), fall = pick(240, 300, 320) * k, gap = pick(90, 110, 120) * k, t0 = (env.src ? 250 : 60) * k;
      if (env.src) { flash(env.src.x, env.src.y, 90, env.col, 260); if (q) puff(env.src.x, env.src.y - 10, 46, "#6a605a", 600, -40); launchUp(env, Math.min(T.length, pick(2, 4, 6)), "#ffb05a", 6); }
      hook("sc_cannon", 0.9);
      T.forEach((t, i) => {
        const cw = t.r.width, st = t0 + i * gap, lean0 = env.src ? Math.max(-1, Math.min(1, (env.src.x - t.b.x) / (cw * 4))) : 0.4;
        const from = { x: t.b.x + lean0 * cw * 1.3 + cw * 0.35, y: Math.min(-50, t.r.top - innerHeight * 0.3) }, deg = (Math.atan2(t.b.y - from.y, t.b.x - from.x) * 180 / Math.PI).toFixed(1) + "deg";
        t.at = st + fall;
        later(() => {
          if (q) { const sh = mk("sc-shadow", t.b.x, t.b.y + t.r.height * 0.18, { "--s": px(cw * 0.9) }); anim(sh, [{ scale: "0.3", opacity: 0 }, { scale: "1", opacity: 0.75 }], fall, { easing: "ease-in" }); }
          const bm = mk("sc-bomb", from.x, from.y, { "--z": px(Math.max(14, cw * 0.2)) });
          fly(bm, from, t.b, fall, { face: true, ease: "cubic-bezier(.45,0,1,.8)", scale: [0.75, 1.25], every: q > 1 ? 32 : 40, trail: q ? (x, y) => { puff(x, y, cw * 0.13, "#6a605a", 420, -4); if (q > 1) ghost("sc-bomb", x, y, { "--z": px(Math.max(14, cw * 0.2)) }, deg, 140); } : null });
          hook("sc_whistle", 0.5);
        }, st);
        later(() => {
          explode(t.b, cw, env.col, 1.05, t.el); land(env, i, 0);
          if (t.blocked) block(t.b, cw, t.el);
          if (q) cover(t.r, "sc-scorch", null, 1100);
          if (q > 1) {
            bloom(t.b.x, t.b.y, cw * 3, "#ff9a4a", 560);   // 빛 번짐
            sparks(t.b.x, t.b.y, { n: 9, col: "#3a302a", size: Math.max(5, cw * 0.06), dist: cw * 1.5, dur: 900, grav: cw * 1.6, cls: "p-sq", spin: 420, ang: -90, spread: 80 });   // 파편
            for (let j = 0; j < 4; j++) later(() => puff(t.b.x + rnd(-0.2, 0.2) * cw, t.b.y - j * cw * 0.16, cw * rnd(0.5, 0.75), "#3f3833", 1300, -cw * 0.75), (80 + j * 90) * k);   // 연기 기둥
            later(() => rise(t.r, { n: 9, col: "#ff9a4a", size: Math.max(3, cw * 0.035), dur: 1300, cls: "p-ember", spread: 500 }), 120 * k);   // 잔불
            nudge(t.el, 4);
          }
        }, t.at);
      });
    },
    /* 불바다: 불길이 줄 한쪽에서 다른 쪽으로 훑고, 지나간 카드마다 불이 붙는다 */
    firesea(T, env) {
      const k = K(), q = tier(); let n = 0;
      hook("sc_fire", 0.9);
      for (const g of rows(T)) {
        const dir = env.src && env.src.x > (g.x0 + g.x1) / 2 ? -1 : 1, xa = dir > 0 ? g.x0 - g.cw : g.x1 + g.cw, xb = dir > 0 ? g.x1 + g.cw : g.x0 - g.cw;
        const D = (360 + 95 * g.T.length) * k, t0 = 140 * k, nf = pick(3, 5, 8);
        for (let j = 0; j < nf; j++) {
          const f = mk("sc-flame", xa - dir * j * g.cw * 0.16, g.bot - g.h * 0.03, { "--w": px(g.cw * rnd(0.34, 0.5)), "--h": px(g.h * rnd(0.6, 1.05)) });
          anim(f, [{ translate: "0px 0px", scale: "1 0.2", opacity: 0 }, { offset: 0.12, scale: "1 1", opacity: 1 }, { offset: 0.5, scale: "0.9 1.15" }, { offset: 0.85, scale: "1.05 0.9", opacity: 0.95 }, { translate: `${px(xb - xa)} 0px`, scale: "0.8 0.4", opacity: 0 }], D * 1.08, { easing: "linear", delay: t0 });
        }
        if (q > 1) { const heat = mk("sc-heat", (g.x0 + g.x1) / 2, g.bot, { "--w": px(g.x1 - g.x0 + g.cw * 2), "--h": px(g.h * 0.9) }); anim(heat, [{ opacity: 0 }, { offset: 0.3, opacity: 0.8 }, { offset: 0.7, opacity: 0.6 }, { opacity: 0 }], D + 1100 * k, { delay: t0 }); }
        (dir > 0 ? g.T : g.T.slice().reverse()).forEach(t => {
          const cw = t.r.width, i = n++;
          t.at = t0 + D * (Math.abs(t.b.x - xa) / Math.abs(xb - xa));
          later(() => {
            for (let j = 0, m = pick(2, 3, 5); j < m; j++) {
              const f = mk("sc-flame", t.r.left + cw * (0.18 + 0.64 * (j + rnd(0.1, 0.9)) / m), t.r.bottom - t.r.height * 0.04, { "--w": px(cw * rnd(0.22, 0.34)), "--h": px(t.r.height * rnd(0.45, 0.85)) });
              anim(f, [{ scale: "1 0", opacity: 0.9 }, { offset: 0.15, scale: "1 1.1", opacity: 1 }, { offset: 0.4, scale: "0.85 0.9" }, { offset: 0.65, scale: "1.05 1" }, { scale: "0.6 0.2", opacity: 0 }], pick(520, 700, 950) * k * rnd(0.8, 1.1), { easing: "ease-out", delay: j * 30 * k });
            }
            flash(t.b.x, t.b.y, cw * 1.5, env.col, 380); sparks(t.b.x, t.r.bottom - 6, { n: 10, col: FXC.spark, size: Math.max(3, cw * 0.04), dist: cw * 0.9, dur: 700, grav: -cw * 0.5, cls: "p-ember", ang: -90, spread: 60 });
            shake(t.el, 9); glow(t.el, env.col, 360); land(env, i, 0);
            if (t.blocked) block(t.b, cw, t.el);
            if (q) cover(t.r, "sc-scorch", null, 1000);
            if (q > 1) { later(() => rise(t.r, { n: 10, col: "#ff9a4a", size: Math.max(3, cw * 0.035), dur: 1400, cls: "p-ember", spread: 600 }), 150 * k); for (let j = 0; j < 3; j++) later(() => puff(t.b.x + rnd(-0.3, 0.3) * cw, t.r.top + cw * 0.1, cw * 0.6, "#3f3833", 1200, -cw * 0.6), (200 + j * 120) * k); nudge(t.el, 3); }
          }, t.at);
        });
      }
    },
    /* 해일: 물마루가 줄을 쓸고 지나가며, 덮친 카드마다 물이 튄다 */
    tide(T, env) {
      const k = K(), q = tier(); let n = 0;
      hook("sc_wave", 0.9);
      for (const g of rows(T)) {
        const dir = env.src && env.src.x > (g.x0 + g.x1) / 2 ? -1 : 1, xa = dir > 0 ? g.x0 - g.cw * 0.7 : g.x1 + g.cw * 0.7, xb = dir > 0 ? g.x1 + g.cw * 1.2 : g.x0 - g.cw * 1.2;
        const D = (420 + 110 * g.T.length) * k, t0 = 150 * k, wh = g.h * 1.2;
        const wave = (cls, d0, h, op) => {
          const w = mk("sc-wave " + cls, xa, g.bot + g.h * 0.06, { "--c": env.col, "--w": px(g.cw * 3.3), "--h": px(h) });
          anim(w, [{ translate: "0px 0px", opacity: 0, scale: `${dir} 0.5` }, { offset: 0.12, opacity: op, scale: `${dir} 1` }, { offset: 0.5, scale: `${dir} 1.06` }, { offset: 0.85, opacity: op, scale: `${dir} 0.92` }, { translate: `${px(xb - xa)} 0px`, opacity: 0, scale: `${dir} 0.55` }], D, { easing: "linear", delay: t0 + d0 });
          return w;
        };
        const crest = wave("", 0, wh, 0.96);
        if (q) later(() => { const id = setInterval(() => { if (!crest.isConnected) { clearInterval(id); return; } const r = crest.getBoundingClientRect(); sparks(r.left + r.width * (dir > 0 ? 0.92 : 0.08), r.top + r.height * 0.14, { n: 2, col: "#eafaff", size: Math.max(3, g.cw * 0.035), dist: g.cw * 0.4, dur: 520, grav: g.cw * 0.7, cls: "p-ring", ang: -90 - dir * 30, spread: 45 }); }, q > 1 ? 48 : 60); }, t0);
        if (q > 1) wave("back", 150 * k, wh * 0.62, 0.6);   // 뒤따르는 잔물결
        (dir > 0 ? g.T : g.T.slice().reverse()).forEach(t => {
          const cw = t.r.width, i = n++;
          t.at = t0 + D * (Math.abs(t.b.x - dir * t.r.width * 0.25 - xa) / Math.abs(xb - xa));
          later(() => {
            splash(t.b, t.r, t.el, { col: env.col, blocked: t.blocked }); land(env, i, 0);
            lean(t.el, dir * 3.5, 520);
            if (q) cover(t.r, "sc-wet", { "--c": env.col }, 1000);
            if (q > 1) {
              for (let j = 0; j < 3; j++) puff(t.b.x + rnd(-0.4, 0.4) * cw, t.r.top + rnd(0, 0.3) * t.r.height, cw * rnd(0.5, 0.8), "#cfefff", 800, -cw * 0.35);   // 물보라
              sparks(t.b.x, t.r.top + t.r.height * 0.2, { n: 12, col: "#bfe9ff", size: Math.max(3, cw * 0.035), dist: cw * 1.2, dur: 1100, grav: cw * 1.5, cls: "p-ring", ang: -90 + dir * 20, spread: 70 });
              later(() => sparks(t.b.x, t.r.bottom - 4, { n: 6, col: "#8fd8ff", size: Math.max(3, cw * 0.03), dist: cw * 0.35, dur: 900, grav: cw * 0.5, cls: "p-drop", ang: 90, spread: 50 }), 260 * k);   // 떨어지는 물방울
              ring(t.b.x, t.r.bottom - 2, cw * 1.5, "#bfe9ff", 800, { cls: "ell", from: 0.3, to: 1.2, delay: 120 * k }); nudge(t.el, 3);
            }
          }, t.at);
        });
      }
    },
    /* 화살비: 쏘아 올린 화살이 비스듬히 쏟아져 카드에 꽂히고 떨린다 */
    volley(T, env) {
      const k = K(), q = tier(), fl = 250 * k, t0 = (env.src ? 230 : 60) * k, per = pick(2, 3, 5), stay = pick(380, 700, 1000) * k;
      if (env.src) launchUp(env, Math.min(8, T.length * pick(1, 2, 3)), "", Math.max(30, T[0].r.width * 0.44), true);
      hook("sc_arrows", 0.9);
      const sgn = env.src && env.src.x > innerWidth / 2 ? 1 : -1, H = innerHeight;
      T.forEach((t, i) => {
        const cw = t.r.width, st = t0 + i * 85 * k, aw = Math.max(30, cw * 0.44);
        t.at = st + fl;
        const shot = (to, j, miss) => {
          const ang = Math.atan2(H * 0.6, -sgn * H * (0.3 + rnd(-0.03, 0.03))), ux = Math.cos(ang), uy = Math.sin(ang);
          const end = { x: to.x - ux * aw * 0.5, y: to.y - uy * aw * 0.5 }, from = { x: end.x - ux * H * 0.75, y: end.y - uy * H * 0.75 }, deg = (ang * 180 / Math.PI).toFixed(1) + "deg";
          later(() => {
            const ar = mk("sc-arrow", from.x, from.y, { "--w": px(aw) });
            fly(ar, from, end, fl, { face: true, ease: "cubic-bezier(.4,0,1,.85)" });
            if (q > 1) { const ln = mk("sc-trace", end.x, end.y, { "--w": px(H * 0.3), "--c": "#f2f6ff" }); anim(ln, [{ rotate: deg, opacity: 0, scale: "0.2 1" }, { offset: 0.7, rotate: deg, opacity: 0.55, scale: "1 1" }, { rotate: deg, opacity: 0, scale: "1 1" }], fl * 1.5); }
            later(() => {
              const s = mk("sc-arrow stuck" + (miss ? " miss" : ""), end.x, end.y, { "--w": px(aw) });
              anim(s, [{ rotate: deg, translate: `${px(ux * 5)} ${px(uy * 5)}` }, { offset: 0.05, rotate: `calc(${deg} + 5deg)`, translate: "0px 0px" }, { offset: 0.12, rotate: `calc(${deg} - 4deg)` }, { offset: 0.2, rotate: `calc(${deg} + 2.5deg)` }, { offset: 0.3, rotate: `calc(${deg} - 1deg)` }, { offset: 0.4, rotate: deg, opacity: 1 }, { offset: 0.85, rotate: deg, opacity: 1 }, { rotate: deg, opacity: 0 }], stay, { easing: "linear" });
              if (!miss) { puff(to.x, to.y, cw * 0.16, "#7a6a50", 340, -3); snd("sp_thunk", 0.5); hook("sc_thunk", 0.5); }
              if (q > 1 && !miss) sparks(to.x, to.y, { n: 3, col: "#f2f6ff", size: Math.max(5, cw * 0.05), dist: cw * 0.4, dur: 900, grav: cw * 0.5, cls: "p-leaf", spin: 300 });   // 깃털
            }, fl);
          }, st + j * pick(60, 48, 40) * k - fl * 0 );
        };
        for (let j = 0; j < per; j++) shot({ x: t.r.left + cw * rnd(0.2, 0.8), y: t.r.top + t.r.height * rnd(0.22, 0.72) }, j, false);
        if (q > 1) for (let j = 0; j < 2; j++) shot({ x: t.b.x + rnd(-0.8, 0.8) * cw, y: t.r.bottom + rnd(4, 18) }, per + j, true);   // 빗나가 바닥에 꽂히는 화살
        later(() => { shake(t.el, 7); glow(t.el, "#f2f6ff", 240); land(env, i, 0); if (t.blocked) block(t.b, cw, t.el); nudge(t.el, 2); }, t.at);
      });
    },
    /* 돌풍: 바람 줄기와 칼날이 줄을 훑고 지나가며 카드가 쏠린다 (피해 · 약화 둘 다) */
    gale(T, env) {
      const k = K(), q = tier(); let n = 0;
      hook("sc_gale", 0.9);
      for (const g of rows(T)) {
        const dir = env.src && env.src.x > (g.x0 + g.x1) / 2 ? -1 : 1, xa = dir > 0 ? g.x0 - g.cw * 1.2 : g.x1 + g.cw * 1.2, xb = dir > 0 ? g.x1 + g.cw * 1.4 : g.x0 - g.cw * 1.4;
        const D = (340 + 70 * g.T.length) * k, t0 = 120 * k;
        for (let j = 0, m = pick(4, 8, 14); j < m; j++) {
          const s = mk("sc-gust", xa, g.top + g.h * rnd(0.05, 0.95), { "--c": j % 3 ? "#e9fffb" : env.col, "--w": px(g.cw * rnd(0.8, 1.8)), "--t": px(rnd(1.5, 3.5)) });
          anim(s, [{ translate: "0px 0px", opacity: 0, scale: `${dir} 1` }, { offset: 0.2, opacity: 0.9 }, { offset: 0.8, opacity: 0.8 }, { translate: `${px(xb - xa)} ${px(rnd(-16, 16))}`, opacity: 0, scale: `${dir} 1` }], D * rnd(0.75, 1.1), { easing: "cubic-bezier(.3,.1,.5,1)", delay: t0 + rnd(0, D * 0.4) });
        }
        for (let j = 0; j < pick(1, 2, 3); j++) later(() => {
          const y = g.top + g.h * (0.3 + 0.2 * j), bl = mk("sfx-crescent wind", xa, y, { "--c": env.col, "--z": px(Math.max(26, g.cw * 0.5)) });
          fly(bl, { x: xa, y }, { x: xb, y: y + rnd(-10, 10) }, D, { spin: dir * 1080, wob: 14, wobN: 3, ease: "cubic-bezier(.3,.1,.6,1)" });
        }, t0 + j * 70 * k);
        if (q > 1) for (let j = 0; j < 14; j++) {   // 바람에 실려 가는 잎 · 먼지
          const p = mk("sfx-p " + (j % 2 ? "p-leaf" : "p-streak"), xa, g.top + g.h * rnd(0, 1), { "--c": j % 2 ? "#b7e8c8" : "#e9fffb", "--z": px(rnd(4, 8)) });
          anim(p, [{ translate: "0px 0px", opacity: 0, rotate: "0deg" }, { offset: 0.15, opacity: 1 }, { translate: `${px(xb - xa)} ${px(rnd(-50, 30))}`, opacity: 0, rotate: `${rnd(360, 900) * dir}deg` }], D * rnd(1.1, 1.8), { easing: "cubic-bezier(.2,.4,.5,1)", delay: t0 + rnd(0, D * 0.6) });
        }
        (dir > 0 ? g.T : g.T.slice().reverse()).forEach(t => {
          const cw = t.r.width, i = n++;
          t.at = t0 + D * (Math.abs(t.b.x - xa) / Math.abs(xb - xa));
          later(() => {
            ring(t.b.x, t.b.y, cw * 1.25, env.col, 480, { cls: "swirl", from: 0.4, to: 1.15, rot: dir * 240 });
            sparks(t.b.x, t.b.y, { n: 8, col: "#e9fffb", size: 4, dist: cw * 0.9, dur: 420, cls: "p-streak", face: true, ang: dir > 0 ? 0 : 180, spread: 35 });
            lean(t.el, dir * 5, 560);
            if (t.hit) { shake(t.el, 7); land(env, i, 0); if (t.blocked) block(t.b, cw, t.el); } else glow(t.el, env.col, 420, true);
            if (q > 1) { ring(t.b.x, t.b.y, cw * 0.9, "#e9fffb", 700, { cls: "swirl", from: 0.6, to: 1.3, rot: -dir * 320, delay: 80 * k }); nudge(t.el, 2); }
          }, t.at);
        });
      }
    },
    /* 뇌우: 줄 위에 먹구름이 끼고, 구름에서 벼락이 대상마다 차례로 내리꽂힌다 */
    storm(T, env) {
      const k = K(), q = tier(), t0 = pick(200, 300, 320) * k, gap = 95 * k; let n = 0, last = 0;
      hook("sc_thunder", 0.9);
      for (const g of rows(T)) {
        const cy = Math.max(g.cw * 0.3, g.top - g.cw * 0.06), W = g.x1 - g.x0, life = t0 + g.T.length * gap + 520 * k, blobs = pick(2, 4, 6);
        for (let j = 0; j < blobs; j++) {
          const c = mk("sc-cloud", g.x0 + W * ((j + 0.5) / blobs) + rnd(-0.1, 0.1) * g.cw, cy + rnd(-0.08, 0.08) * g.cw, { "--w": px(W / blobs * 1.9 + g.cw * 0.6), "--h": px(g.cw * rnd(0.62, 0.82)), "--c": env.col });
          anim(c, [{ opacity: 0, scale: "0.6", translate: `${px(rnd(-30, 30))} ${px(-g.cw * 0.2)}` }, { offset: Math.min(0.4, t0 / life), opacity: 0.95, scale: "1", translate: "0px 0px" }, { offset: 0.8, opacity: 0.9, scale: "1.05" }, { opacity: 0, scale: "1.15" }], life, { easing: "ease-out" });
        }
        g.T.forEach(t => {
          const cw = t.r.width, i = n++;
          t.at = t0 + i * gap; last = Math.max(last, t.at);
          later(() => {
            const svg = svgLayer(), top = { x: t.b.x + rnd(-0.35, 0.35) * cw, y: cy + g.cw * 0.1 };
            const main = jag(top, t.b, 9, Math.max(14, cw * 0.2)), ds = [main.d];
            for (let j = 0, m = pick(0, 1, 3); j < m; j++) { const md = main.mids[1 + Math.floor(Math.random() * Math.max(1, main.mids.length - 2))]; if (md) ds.push(jag(md, { x: md.x + rnd(-1, 1) * cw * 0.8, y: md.y + rnd(20, 70) }, 4, 10).d); }
            ds.forEach((d, j) => { const w = Math.max(2.5, cw * 0.045) * (j ? 0.5 : 1); path(svg, d, "bolt-glow", env.col, w * 2.6); path(svg, d, "bolt-core", "#fffbe6", w * 0.7); });
            anim(svg, [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 0.2, offset: 0.25 }, { opacity: 1, offset: 0.36 }, { opacity: 0.5, offset: 0.62 }, { opacity: 0 }], 380 * k, { easing: "linear" });
            flash(top.x, top.y, cw * 1.6, env.col, 260);   // 구름 속이 번쩍
            flash(t.b.x, t.b.y, cw * 1.5, env.col, 340); flash(t.b.x, t.b.y, cw * 0.7, "#ffffff", 160);
            sparks(t.b.x, t.b.y, { n: 12, col: env.col, size: Math.max(3, cw * 0.04), dist: cw * 0.85, dur: 420, cls: "p-streak", face: true });
            shake(t.el, 9); glow(t.el, env.col, 300); land(env, i, 0);
            if (t.blocked) block(t.b, cw, t.el);
            if (q > 1) {
              screenFlash("#fff8d0", 0.1, 180);
              for (let j = 0; j < 3; j++) later(() => {   // 카드 둘레를 기는 잔류 전류
                const s2 = svgLayer(), a = { x: t.r.left + rnd(0, 1) * cw, y: t.r.top + rnd(0, 1) * t.r.height }, d = jag(a, { x: a.x + rnd(-0.6, 0.6) * cw, y: a.y + rnd(-0.4, 0.4) * t.r.height }, 5, 9).d;
                path(s2, d, "bolt-glow", env.col, 4); path(s2, d, "bolt-core", "#fffbe6", 1.4);
                anim(s2, [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 0.2, offset: 0.5 }, { opacity: 0.9, offset: 0.7 }, { opacity: 0 }], 200 * k, { easing: "linear" });
              }, (160 + j * 130) * k);
              sparks(t.b.x, t.r.bottom - 4, { n: 8, col: "#fff3a8", size: 3, dist: cw * 0.8, dur: 800, grav: cw * 1.2, cls: "p-ember", ang: -90, spread: 75 });
              ring(t.b.x, t.r.bottom - 3, cw * 1.5, env.col, 520, { cls: "ell", from: 0.3, to: 1.25 }); nudge(t.el, 3);
            }
          }, t.at);
        });
      }
      if (q) screenFlash("#fff8d0", 0.16, 240);
    },
    /* 연쇄: 앞서 맞은 유닛에서 다음 유닛으로 전류가 튄다 (한 수에 한 대상 — 엔진이 대상마다 수를 끊는다) */
    chain(T, env) {
      const k = K(), q = tier();
      T.forEach((t, i) => {
        const cw = t.r.width, prev = CH.uid === env.uid && performance.now() - CH.t < 2400 ? CH.pt : null, from = prev || env.src || { x: t.b.x, y: -30 };
        t.at = (70 + i * 90) * k;
        if (CH.uid !== env.uid) CH.n = 0;
        CH.uid = env.uid; CH.t = performance.now(); CH.pt = t.b;
        later(() => {
          const svg = svgLayer(), d = jag(from, t.b, 8, Math.max(12, cw * 0.18)).d;
          path(svg, d, "bolt-glow", env.col, Math.max(6, cw * 0.11)); path(svg, d, "bolt-core", "#fffbe6", Math.max(2, cw * 0.03));
          anim(svg, [{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 0.25, offset: 0.3 }, { opacity: 1, offset: 0.42 }, { opacity: 0.5, offset: 0.7 }, { opacity: 0 }], pick(300, 380, 520) * k, { easing: "linear" });
          flash(t.b.x, t.b.y, cw * 1.4, env.col, 320); flash(t.b.x, t.b.y, cw * 0.6, "#ffffff", 150);
          ring(t.b.x, t.b.y, cw * 0.9, env.col, 620, { from: 0.5, to: 1.15 });   // 전류가 머무는 고리 — 다음 대상으로 튈 자리
          sparks(t.b.x, t.b.y, { n: 10, col: env.col, size: Math.max(3, cw * 0.04), dist: cw * 0.8, dur: 400, cls: "p-streak", face: true });
          shake(t.el, 8); glow(t.el, env.col, 300); sndR("sp_land_" + env.el, 0.5, 1 + 0.05 * Math.min(CH.n++, 6));
          if (t.blocked) block(t.b, cw, t.el);
          if (q > 1) {
            if (prev) later(() => { const s2 = svgLayer(), d2 = jag(from, t.b, 8, Math.max(12, cw * 0.2)).d; path(s2, d2, "bolt-glow", env.col, 5); path(s2, d2, "bolt-core", "#fffbe6", 1.6); anim(s2, [{ opacity: 0 }, { opacity: 0.9, offset: 0.3 }, { opacity: 0.1, offset: 0.6 }, { opacity: 0.7, offset: 0.8 }, { opacity: 0 }], 260 * k, { easing: "linear" }); }, 150 * k);
            sparks((from.x + t.b.x) / 2, (from.y + t.b.y) / 2, { n: 5, col: "#fff3a8", size: 3, dist: cw * 0.5, dur: 600, grav: cw * 0.7, cls: "p-ember" });
            screenFlash("#fff8d0", 0.08, 160); nudge(t.el, 2);
          }
        }, t.at);
      });
    },
    /* 대지 균열: 땅이 줄을 따라 갈라지고, 금이 닿는 카드 밑에서 바위가 솟는다 */
    fissure(T, env) {
      const k = K(), q = tier(); let n = 0;
      hook("sc_crack", 0.9);
      for (const g of rows(T)) {
        const dir = env.src && env.src.x > (g.x0 + g.x1) / 2 ? -1 : 1, y = g.bot - g.h * 0.05, xa = dir > 0 ? g.x0 - g.cw * 0.5 : g.x1 + g.cw * 0.5, xb = dir > 0 ? g.x1 + g.cw * 0.4 : g.x0 - g.cw * 0.4;
        const D = (260 + 75 * g.T.length) * k, t0 = 120 * k, hold = D + pick(500, 800, 1300) * k;
        const svg = svgLayer(), d = jag({ x: xa, y }, { x: xb, y: y + rnd(-4, 4) }, 6 + g.T.length * 3, Math.max(6, g.cw * 0.07)).d;
        const ps = [path(svg, d, "crack-glow", q > 1 ? "#ff9a4a" : env.col, Math.max(5, g.cw * 0.07)), path(svg, d, "crack", "#1a1008", Math.max(2.4, g.cw * 0.028))];
        for (const p of ps) { const L = (p.getTotalLength && p.getTotalLength()) || 2000; p.style.strokeDasharray = L; p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: D, delay: t0, easing: "linear", fill: "both" }); }
        anim(svg, [{ opacity: 1 }, { offset: 0.75, opacity: 1 }, { opacity: 0 }], t0 + hold, { easing: "linear" });
        (dir > 0 ? g.T : g.T.slice().reverse()).forEach(t => {
          const cw = t.r.width, i = n++;
          t.at = t0 + D * (Math.abs(t.b.x - xa) / Math.abs(xb - xa));
          later(() => {
            for (let j = 0, m = pick(2, 3, 5); j < m; j++) {
              const sp = mk("sc-spike", t.r.left + cw * (0.16 + 0.68 * (j + rnd(0.2, 0.8)) / m), t.r.bottom + t.r.height * 0.03, { "--w": px(cw * rnd(0.18, 0.28)), "--h": px(t.r.height * rnd(0.4, 0.8)) }), rot = rnd(-14, 14).toFixed(0) + "deg";
              anim(sp, [{ scale: "1 0", rotate: rot }, { offset: 0.16, scale: "1 1.12", rotate: rot }, { offset: 0.26, scale: "1 1", rotate: rot }, { offset: 0.75, scale: "1 1", opacity: 1, rotate: rot }, { scale: "0.8 0.1", opacity: 0, rotate: rot }], pick(600, 800, 1000) * k, { easing: "cubic-bezier(.2,.8,.3,1)", delay: j * 22 * k });
            }
            flash(t.b.x, t.r.bottom - 6, cw * 1.2, env.col, 300);
            sparks(t.b.x, t.r.bottom - 4, { n: 9, col: "#8a6a48", size: Math.max(4, cw * 0.055), dist: cw * 0.9, dur: 650, grav: cw * 1.0, cls: "p-sq", ang: -90, spread: 70, spin: 300 });
            for (let j = 0; j < 3; j++) puff(t.b.x + rnd(-0.5, 0.5) * cw, t.r.bottom - 4, cw * rnd(0.4, 0.6), "#7a6045", 850, -cw * 0.3);
            shake(t.el, 12); land(env, i, 0);
            if (t.blocked) block(t.b, cw, t.el);
            if (q > 1) {
              sparks(t.b.x, t.r.bottom - 4, { n: 8, col: "#5c4630", size: Math.max(6, cw * 0.075), dist: cw * 1.5, dur: 1000, grav: cw * 1.9, cls: "p-sq", ang: -90, spread: 55, spin: 500 });   // 큰 돌덩이
              for (let j = 0; j < 4; j++) later(() => puff(t.b.x + rnd(-0.7, 0.7) * cw, t.r.bottom - rnd(0, 0.3) * cw, cw * rnd(0.6, 0.9), "#8a7256", 1500, -cw * 0.2), j * 110 * k);   // 오래 남는 흙먼지
              sparks(t.b.x, t.r.bottom - 2, { n: 5, col: "#ff9a4a", size: 3, dist: cw * 0.5, dur: 900, grav: -cw * 0.3, cls: "p-ember", ang: -90, spread: 50 });
              nudge(t.el, 5);
            }
          }, t.at);
        });
      }
    },
    /* 함성: 발동한 쪽에서 충격파가 부채꼴로 번져 적진을 한꺼번에 때린다 */
    roar(T, env) {
      const k = K(), q = tier(), R = rows(T)[0], to = { x: (R.x0 + R.x1) / 2, y: R.y }, from = env.src || { x: to.x, y: to.y + R.h * 2 }, fl = 330 * k;
      const deg = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI + 90;
      hook("sc_roar", 0.9);
      for (let j = 0, m = pick(2, 3, 5); j < m; j++) {
        const w = mk("sc-roar", from.x, from.y, { "--c": "#f1d2a4", "--s": px(R.cw * 1.3) });
        anim(w, [{ translate: "0px 0px", rotate: deg + "deg", scale: "0.3", opacity: 0 }, { offset: 0.15, opacity: 0.95 }, { translate: `${px(to.x - from.x)} ${px(to.y - from.y)}`, rotate: deg + "deg", scale: String(Math.max(1.6, (R.x1 - R.x0) / (R.cw * 1.3) * 1.15)), opacity: 0 }], fl * 1.25, { easing: "cubic-bezier(.2,.5,.4,1)", delay: j * pick(90, 75, 55) * k });
      }
      T.forEach((t, i) => {
        const cw = t.r.width;
        t.at = fl * 0.85 + i * 28 * k;
        later(() => {
          flash(t.b.x, t.b.y, cw * 1.3, env.col, 300);
          sparks(t.b.x, t.b.y, { n: 9, col: "#9a7350", size: Math.max(4, cw * 0.05), dist: cw * 0.9, dur: 560, grav: cw * 0.6, cls: "p-sq", ang: deg - 90, spread: 60, spin: 260 });
          puff(t.b.x, t.r.bottom - 6, cw * 0.6, "#7a6045", 760, -cw * 0.25);
          shake(t.el, 11); glow(t.el, env.col, 280); land(env, i, 0);
          if (t.blocked) block(t.b, cw, t.el);
          if (q > 1) {
            if (typeof slash === "function") slash(t.b.x, t.b.y, Math.max(110, cw * 1.25), "#f1d2a4");   // 발톱 자국
            for (let j = 0; j < 3; j++) later(() => puff(t.b.x + rnd(-0.6, 0.6) * cw, t.r.bottom - rnd(0, 0.4) * cw, cw * rnd(0.5, 0.8), "#8a7256", 1300, -cw * 0.2), j * 100 * k);
            sparks(t.b.x, t.b.y, { n: 6, col: "#f1d2a4", size: 4, dist: cw * 1.3, dur: 380, cls: "p-streak", face: true, ang: deg - 90, spread: 25 }); nudge(t.el, 4);
          }
        }, t.at);
      });
    },
    /* 덩굴: 땅을 기어 온 덩굴이 카드를 휘감아 조이고 가시가 터진다 */
    vines(T, env) {
      const k = K(), q = tier(), grow = pick(240, 320, 340) * k;
      hook("sc_vine", 0.9);
      T.forEach((t, i) => {
        const cw = t.r.width, r = t.r, st = (60 + i * 85) * k;
        t.at = st + grow;
        later(() => {
          const svg = svgLayer(), life = grow + pick(420, 620, 900) * k;
          for (let v = 0, m = pick(1, 2, 2); v < m; v++) {
            const side = v % 2 ? -1 : 1, turns = 1.7 + v * 0.45 + rnd(-0.15, 0.15), ph = rnd(-0.5, 0.5); let d = "";
            for (let s = 0; s <= 26; s++) { const u = s / 26, x = t.b.x + side * Math.sin(u * Math.PI * turns + ph) * cw * (0.54 - 0.12 * u), y = r.bottom + r.height * 0.06 - u * r.height * (1.02 - v * 0.08); d += (s ? " L" : "M") + x.toFixed(1) + " " + y.toFixed(1); }
            const ps = [path(svg, d, "vine-dark", "#1f3a16", Math.max(6, cw * 0.085)), path(svg, d, "vine", v ? "#4f8a32" : "#3f7a2e", Math.max(4, cw * 0.06))];
            if (q) ps.push(path(svg, d, "vine-hi", "#b4ea7c", Math.max(1.2, cw * 0.014)));
            for (const p of ps) { const L = (p.getTotalLength && p.getTotalLength()) || 1500; p.style.strokeDasharray = L; p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: grow * (1 + v * 0.12), delay: v * 40 * k, easing: "cubic-bezier(.3,.6,.4,1)", fill: "both" }); }
          }
          anim(svg, [{ opacity: 1, scale: "1" }, { offset: grow / life, opacity: 1, scale: "1" }, { offset: Math.min(0.95, (grow + 110 * k) / life), opacity: 1, scale: "0.94 0.97" }, { offset: 0.8, opacity: 1, scale: "0.96 0.98" }, { opacity: 0, scale: "0.96 0.98" }], life, { easing: "linear" });
          svg.style.transformOrigin = `${px(t.b.x)} ${px(t.b.y)}`;
        }, st);
        later(() => {
          squash(t.el, 0.9, 0.96, 420);
          sparks(t.b.x, t.b.y, { n: 10, col: env.col, size: Math.max(6, cw * 0.07), dist: cw * 0.85, dur: 720, grav: cw * 0.4, cls: "p-leaf", spin: 360 });
          for (let j = 0, m = pick(2, 4, 7); j < m; j++) { const a = rnd(0, Math.PI * 2), th2 = mk("sc-thornlet", t.b.x + Math.cos(a) * cw * 0.5, t.b.y + Math.sin(a) * r.height * 0.45, { "--z": px(Math.max(8, cw * 0.12)) }), rot = (a * 180 / Math.PI + 90).toFixed(0) + "deg"; anim(th2, [{ rotate: rot, scale: "1 0" }, { offset: 0.2, rotate: rot, scale: "1 1.2" }, { offset: 0.7, rotate: rot, scale: "1 1", opacity: 1 }, { rotate: rot, scale: "1 0.3", opacity: 0 }], 600 * k); }
          shake(t.el, 8); glow(t.el, env.col, 300); land(env, i, 0);
          if (t.blocked) block(t.b, cw, t.el);
          if (q > 1) { ring(t.b.x, t.b.y, cw * 1.5, env.col, 560, { cls: "dark", from: 1.3, to: 0.5, ease: "cubic-bezier(.6,0,.4,1)" }); later(() => sparks(t.b.x, r.top, { n: 8, col: "#8fd06a", size: Math.max(5, cw * 0.06), dist: cw * 0.7, dur: 1400, grav: cw * 0.9, cls: "p-leaf", spin: 500, ang: 90, spread: 80 }), 150 * k); nudge(t.el, 3); }
        }, t.at);
      });
    },
    /* 가시 덤불(강화): 카드 둘레에 가시 덤불이 자라 감싼다 */
    bramble(T, env) {
      const k = K(), q = tier();
      hook("sc_vine", 0.7);
      T.forEach((t, i) => {
        const cw = t.r.width, r = t.r, st = i * 70 * k;
        t.at = st + 200 * k;
        later(() => {
          for (let j = 0, m = pick(4, 6, 9); j < m; j++) {
            const x = r.left + cw * (0.04 + 0.92 * j / (m - 1)), edge = Math.abs(j / (m - 1) - 0.5) * 2;
            const sp = mk("sfx-thorn", x, r.bottom + r.height * 0.03, { "--w": px(cw * rnd(0.1, 0.15)), "--h": px(r.height * (0.25 + 0.5 * edge) * rnd(0.8, 1.1)) }), rot = ((j / (m - 1) - 0.5) * 40).toFixed(0) + "deg";
            anim(sp, [{ scale: "1 0", rotate: rot }, { offset: 0.25, scale: "1 1.1", rotate: rot }, { offset: 0.35, scale: "1 1", rotate: rot }, { offset: 0.8, scale: "1 1", opacity: 1, rotate: rot }, { scale: "0.7 0.2", opacity: 0, rotate: rot }], pick(650, 850, 1100) * k, { easing: "cubic-bezier(.2,.8,.3,1)", delay: Math.abs(j - m / 2) * 26 * k });
          }
          ring(t.b.x, r.bottom - 3, cw * 1.3, env.col, 600, { cls: "ell", from: 0.3, to: 1.15 });
        }, st);
        later(() => {
          rise(r, { n: 8, col: env.col, size: Math.max(5, cw * 0.06), dur: 800, cls: "p-leaf" }); glow(t.el, env.col, 600); sndR("sp_buff", 0.8, 1 + 0.03 * Math.min(i, 4));
          if (q > 1) { const svg = svgLayer(), d = `M${r.left - 3} ${r.bottom} C ${r.left - cw * 0.2} ${r.top + r.height * 0.5}, ${r.left + cw * 0.1} ${r.top - 6}, ${t.b.x} ${r.top - 4} S ${r.right + cw * 0.2} ${r.top + r.height * 0.5}, ${r.right + 3} ${r.bottom}`; const ps = [path(svg, d, "vine-dark", "#1f3a16", 6), path(svg, d, "vine", "#4f8a32", 3.6)]; for (const p of ps) { const L = (p.getTotalLength && p.getTotalLength()) || 900; p.style.strokeDasharray = L; p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 380 * k, easing: "ease-out", fill: "both" }); } anim(svg, [{ opacity: 1 }, { offset: 0.7, opacity: 1 }, { opacity: 0 }], 1100 * k, { easing: "linear" }); sparks(t.b.x, r.top, { n: 6, col: "#f6c7d8", size: 5, dist: cw * 0.7, dur: 1200, grav: cw * 0.5, cls: "p-leaf", spin: 300 }); }
        }, t.at);
      });
    },
    /* 큰 망치: 망치가 크게 휘둘러 내려찍고 쇳조각이 튄다 */
    hammer(T, env) {
      const k = K(), q = tier(), sw = 230 * k;
      hook("sc_swing", 0.8);
      T.forEach((t, i) => {
        const cw = t.r.width, st = (90 + i * 150) * k, L = cw * 1.25, P = { x: t.b.x + L * 0.707, y: t.b.y - L * 0.707 };
        t.at = st + sw;
        later(() => {
          const h = mk("sc-hammer", P.x, P.y, { "--l": px(L), "--hh": px(cw * 0.5), "--c": env.col });
          anim(h, [{ rotate: "262deg", opacity: 0 }, { offset: 0.1, rotate: "266deg", opacity: 1 }, { offset: 0.5, rotate: "135deg", opacity: 1, easing: "linear" }, { offset: 0.56, rotate: "141deg" }, { offset: 0.8, rotate: "150deg", opacity: 1 }, { rotate: "170deg", opacity: 0 }], sw * 2, { easing: "cubic-bezier(.6,0,.9,.4)" });
          if (q > 1) for (let j = 1; j <= 3; j++) later(() => ghost("sc-hammer", P.x, P.y, { "--l": px(L), "--hh": px(cw * 0.5), "--c": env.col }, (262 - j * 30) + "deg", 170), sw * (0.5 + j * 0.13));
        }, st);
        later(() => {
          flash(t.b.x, t.b.y, cw * 1.3, "#e6edf5", 260); flash(t.b.x, t.b.y, cw * 0.6, "#ffffff", 140);
          sparks(t.b.x, t.b.y, { n: 16, col: "#ffe7a0", size: 3, dist: cw * 1.1, dur: 500, grav: cw * 0.7, cls: "p-streak", face: true });
          ring(t.b.x, t.r.bottom - t.r.height * 0.08, cw * 1.7, "#1d1410", 600, { cls: "ell dark", from: 0.4, to: 1.2, op0: 0.8 });
          squash(t.el, 1.06, 0.88, 380); shake(t.el, 13); glow(t.el, "#e6edf5", 240); land(env, i, 0); hook("sc_anvil", 0.9);
          if (t.blocked) block(t.b, cw, t.el);
          if (q) sparks(t.b.x, t.b.y, { n: 6, col: "#a9b4c2", size: Math.max(4, cw * 0.05), dist: cw * 1.0, dur: 700, grav: cw * 1.2, cls: "p-sq", spin: 500 });
          if (q > 1) {
            const svg = svgLayer(); for (let j = 0; j < 6; j++) { const a = rnd(0, Math.PI * 2), d = jag(t.b, { x: t.b.x + Math.cos(a) * cw * 0.55, y: t.b.y + Math.sin(a) * t.r.height * 0.5 }, 4, 6).d; path(svg, d, "crack-glow", "#ffe7a0", 4); path(svg, d, "crack", "#12151c", 2); }
            anim(svg, [{ opacity: 0 }, { offset: 0.08, opacity: 1 }, { offset: 0.6, opacity: 1 }, { opacity: 0 }], 800 * k, { easing: "ease-out" });
            ring(t.b.x, t.b.y, cw * 2.4, "#e6edf5", 520, { from: 0.2, to: 1.1 });
            sparks(t.b.x, t.b.y, { n: 10, col: "#ffcf6e", size: 3, dist: cw * 1.6, dur: 950, grav: cw * 2, cls: "p-ember", ang: -90, spread: 85 }); nudge(t.el, 6);
          }
        }, t.at);
      });
    },
    /* 리벳 일제 사격: 리벳이 줄지어 곧게 날아가 박힌다 */
    rivets(T, env) {
      const k = K(), q = tier(), per = pick(2, 3, 5), fl = 170 * k;
      hook("sc_rivets", 0.9);
      T.forEach((t, i) => {
        const cw = t.r.width, st = (70 + i * 75) * k, a = env.src || { x: t.b.x, y: -50 };
        t.at = st + fl;
        for (let j = 0; j < per; j++) later(() => {
          const to = { x: t.r.left + cw * rnd(0.2, 0.8), y: t.r.top + t.r.height * rnd(0.2, 0.75) }, rv = mk("sfx-rivet", a.x, a.y, { "--z": px(Math.max(7, cw * 0.08)) });
          if (q && env.src && !j) flash(a.x, a.y, 50, "#ffe7a0", 160);
          fly(rv, a, to, fl, { face: true, ease: "cubic-bezier(.5,0,.9,.6)" });
          if (q > 1) { const deg = (Math.atan2(to.y - a.y, to.x - a.x) * 180 / Math.PI).toFixed(1) + "deg", ln = mk("sc-trace", to.x, to.y, { "--w": px(Math.hypot(to.x - a.x, to.y - a.y) * 0.5), "--c": "#ffe7a0" }); anim(ln, [{ rotate: deg, opacity: 0 }, { offset: 0.6, rotate: deg, opacity: 0.5 }, { rotate: deg, opacity: 0 }], fl * 1.6); }
          later(() => {
            sparks(to.x, to.y, { n: 5, col: "#ffe7a0", size: 3, dist: cw * 0.6, dur: 380, grav: cw * 0.5, cls: "p-streak", face: true });
            if (q) { const m = mk("sc-rivetmark", to.x, to.y, { "--z": px(Math.max(6, cw * 0.07)) }); anim(m, [{ scale: "1.8", opacity: 1 }, { offset: 0.15, scale: "1" }, { offset: 0.7, opacity: 1 }, { opacity: 0 }], pick(500, 800, 1200) * k); }
            if (q > 1) sparks(to.x, to.y, { n: 2, col: "#a9b4c2", size: Math.max(4, cw * 0.045), dist: cw * 0.9, dur: 800, grav: cw * 1.5, cls: "p-sq", spin: 600 });
          }, fl);
        }, st + j * pick(60, 45, 34) * k);
        later(() => { flash(t.b.x, t.b.y, cw * 0.9, "#e6edf5", 240); shake(t.el, 8); glow(t.el, "#e6edf5", 220); land(env, i, 0); if (t.blocked) block(t.b, cw, t.el); nudge(t.el, 2); }, t.at);
      });
    },
    /* 쇠판(강화 · 고정): 쇠판 두 장이 양옆에서 미끄러져 와 맞물리고 리벳이 박힌다 */
    plates(T, env) {
      const k = K(), q = tier();
      T.forEach((t, i) => {
        const cw = t.r.width, r = t.r, st = i * 70 * k, cl = 200 * k;
        t.at = st + cl;
        later(() => {
          for (const s of [-1, 1]) {
            const p = mk("sc-plate", t.b.x + s * cw * 0.25, t.b.y, { "--w": px(cw * 0.52), "--h": px(r.height * 1.02), "--c": env.col });
            anim(p, [{ translate: `${px(s * cw * 0.9)} 0px`, opacity: 0 }, { offset: 0.22, translate: "0px 0px", opacity: 0.95, easing: "ease-in" }, { offset: 0.27, translate: `${px(s * 3)} 0px` }, { offset: 0.32, translate: "0px 0px", opacity: 0.95 }, { offset: 0.5, opacity: 0.42 }, { offset: 0.8, opacity: 0.3 }, { translate: "0px 0px", opacity: 0 }], cl / 0.22, { easing: "linear" });
          }
        }, st);
        later(() => {
          flash(t.b.x, t.b.y, cw * 0.8, "#ffffff", 180);
          sparks(t.b.x, t.b.y, { n: 8, col: "#ffe7a0", size: 3, dist: cw * 0.6, dur: 380, cls: "p-streak", face: true, ang: -90, spread: 30 }); sparks(t.b.x, t.b.y, { n: 6, col: "#ffe7a0", size: 3, dist: cw * 0.6, dur: 380, cls: "p-streak", face: true, ang: 90, spread: 30 });
          glow(t.el, "#e6edf5", 500); sndR("sp_shield", 0.8, 1 + 0.03 * Math.min(i, 4)); hook("sc_clamp", 0.7);
          [[0.14, 0.1], [0.86, 0.1], [0.14, 0.9], [0.86, 0.9]].forEach(([fx, fy], j) => later(() => { const m = mk("sc-rivetmark", r.left + cw * fx, r.top + r.height * fy, { "--z": px(Math.max(6, cw * 0.075)) }); anim(m, [{ scale: "2.2", opacity: 1 }, { offset: 0.2, scale: "1" }, { offset: 0.7, opacity: 1 }, { opacity: 0 }], 700 * k); }, (40 + j * 55) * k));
          if (q > 1) { cover(r, "sc-sheen", { "--c": "#ffffff" }, 700); for (const s of [-1, 1]) puff(t.b.x + s * cw * 0.5, r.bottom - 6, cw * 0.5, "#dfe6ee", 900, -cw * 0.5); rise(r, { n: 6, col: "#e6edf5", size: Math.max(4, cw * 0.05), dur: 800, cls: "p-sq" }); }
        }, t.at);
      });
    },
    /* 피의 창: 붉은 창이 비스듬히 내리꽂혀 박힌 채 남는다 */
    lance(T, env) {
      const k = K(), q = tier(), fl = 230 * k, H = innerHeight;
      hook("sc_lance", 0.9);
      T.forEach((t, i) => {
        const cw = t.r.width, st = (120 + i * 110) * k, lw = Math.max(90, cw * 1.5), sgn = t.b.x > innerWidth / 2 ? 1 : -1;
        const ang = Math.atan2(H * 0.6, -sgn * H * 0.22), ux = Math.cos(ang), uy = Math.sin(ang), deg = (ang * 180 / Math.PI).toFixed(1) + "deg";
        const end = { x: t.b.x - ux * lw * 0.42, y: t.b.y - uy * lw * 0.42 }, from = { x: end.x - ux * H * 0.7, y: end.y - uy * H * 0.7 };
        t.at = st + fl;
        later(() => {
          const s = mk("sc-lance", from.x, from.y, { "--w": px(lw), "--c": FXC.blood });
          fly(s, from, end, fl, { face: true, ease: "cubic-bezier(.6,0,1,.6)", every: 26, trail: q ? (x, y) => { sparks(x, y, { n: 1, col: FXC.blood, size: 4, dist: cw * 0.1, dur: 420, grav: cw * 0.5, cls: "p-drop" }); if (q > 1) ghost("sc-lance", x, y, { "--w": px(lw), "--c": FXC.blood }, deg, 150); } : null });
        }, st);
        later(() => {
          const s = mk("sc-lance stuck", end.x, end.y, { "--w": px(lw), "--c": FXC.blood });
          anim(s, [{ rotate: deg, translate: `${px(ux * 8)} ${px(uy * 8)}` }, { offset: 0.06, rotate: `calc(${deg} + 3deg)`, translate: "0px 0px" }, { offset: 0.14, rotate: `calc(${deg} - 2deg)` }, { offset: 0.24, rotate: deg }, { offset: 0.8, rotate: deg, opacity: 1 }, { rotate: deg, opacity: 0 }], pick(450, 700, 950) * k, { easing: "linear" });
          if (typeof slash === "function") slash(t.b.x, t.b.y, Math.max(120, cw * 1.3), FXC.blood);
          flash(t.b.x, t.b.y, cw * 1.2, FXC.blood, 320);
          sparks(t.b.x, t.b.y, { n: 12, col: FXC.blood, size: Math.max(4, cw * 0.05), dist: cw * 0.8, dur: 640, grav: cw * 0.9, cls: "p-drop" });
          shake(t.el, 11); glow(t.el, FXC.blood, 320, true); land(env, i, 0);
          if (t.blocked) block(t.b, cw, t.el);
          if (q > 1) { ring(t.b.x, t.r.bottom - 4, cw * 1.4, "#5a0612", 900, { cls: "ell dark", from: 0.3, to: 1.1, op0: 0.85 }); later(() => sparks(t.b.x, t.b.y + cw * 0.2, { n: 8, col: FXC.blood, size: Math.max(4, cw * 0.045), dist: cw * 0.5, dur: 1100, grav: cw * 1.0, cls: "p-drop", ang: 90, spread: 60 }), 160 * k); screenFlash(FXC.blood, 0.08, 260); nudge(t.el, 4); }
        }, t.at);
      });
    },
    /* 낫(파괴): 어둠의 낫이 카드를 가르고 혼이 빠져나간다 */
    reap(T, env) {
      const k = K(), q = tier(), fl = 240 * k;
      hook("sc_reap", 0.9);
      T.forEach((t, i) => {
        const cw = t.r.width, st = (100 + i * 120) * k, s = i % 2 ? -1 : 1, a = { x: t.b.x + s * cw * 1.3, y: t.b.y - t.r.height * 0.5 }, b = { x: t.b.x - s * cw * 1.1, y: t.b.y + t.r.height * 0.45 };
        t.at = st + fl * 0.55;
        later(() => {
          const c = mk("sfx-crescent sc-scythe", a.x, a.y, { "--c": env.col, "--z": px(Math.max(60, cw * 1.25)) });
          fly(c, a, b, fl, { spin: -s * 300, ease: "cubic-bezier(.4,0,.6,1)", every: 36, trail: q > 1 ? (x, y) => ghost("sfx-crescent sc-scythe", x, y, { "--c": env.col, "--z": px(Math.max(60, cw * 1.25)) }, null, 160) : null });
        }, st);
        later(() => {
          if (typeof slash === "function") slash(t.b.x, t.b.y, Math.max(140, cw * 1.5), env.col);
          ring(t.b.x, t.b.y, cw * 1.6, FXC.curse, 560, { cls: "dark", from: 1.4, to: 0.2, ease: "cubic-bezier(.6,0,.4,1)" });
          rise(t.r, { n: 8, col: "#cbb6ff", size: Math.max(8, cw * 0.1), dur: 900, cls: "p-wisp" });
          shake(t.el, 12); glow(t.el, env.col, 420, true); land(env, i, 0);
          if (t.blocked) block(t.b, cw, t.el);
          if (q > 1) { cover(t.r, "sc-dusk", null, 900); if (env.src) for (let j = 0; j < 4; j++) later(() => { const w = mk("sfx-void sc-soul", t.b.x, t.b.y, { "--c": "#cbb6ff", "--z": px(Math.max(12, cw * 0.16)) }); fly(w, t.b, env.src, 520 * k, { wob: cw * 0.5 * (j % 2 ? 1 : -1), wobN: 2, ease: "cubic-bezier(.5,0,.6,1)", scale: [1, 0.4] }); }, (100 + j * 70) * k); nudge(t.el, 3); }
        }, t.at);
      });
    },
    /* 혼 빨기(약화): 대상에게서 어둠 가닥이 뽑혀 발동한 카드로 빨려 간다 */
    drain(T, env) {
      const k = K(), q = tier();
      hook("sc_drain", 0.8);
      T.forEach((t, i) => {
        const cw = t.r.width, st = i * 90 * k, to = env.src || { x: t.b.x, y: t.b.y + t.r.height * 2 };
        t.at = st + 140 * k;
        later(() => {
          ring(t.b.x, t.b.y, cw * 1.3, env.col, 600, { cls: "dark", from: 0.5, to: 1.2 });
          glow(t.el, env.col, 700, true); sndR("sp_debuff", 0.8, 1 - 0.03 * Math.min(i, 4));
          for (let j = 0, m = pick(3, 5, 9); j < m; j++) later(() => {
            const a = { x: t.r.left + cw * rnd(0.15, 0.85), y: t.r.top + t.r.height * rnd(0.2, 0.8) }, w = mk("sfx-void sc-soul", a.x, a.y, { "--c": j % 2 ? FXC.blood : "#b99bff", "--z": px(Math.max(12, cw * rnd(0.14, 0.22))) });
            fly(w, a, to, pick(380, 460, 520) * k, { wob: cw * rnd(0.2, 0.5) * (j % 2 ? 1 : -1), wobN: 2, ease: "cubic-bezier(.5,0,.7,1)", scale: [1, 0.45], every: 40, trail: q > 1 ? (x, y) => sparks(x, y, { n: 1, col: env.col, size: 6, dist: 8, dur: 360, cls: "p-wisp" }) : null });
          }, (80 + j * pick(70, 55, 40)) * k);
          if (q > 1 && env.src) { const svg = svgLayer(); for (let j = 0; j < 2; j++) { const d = jag(t.b, to, 7, cw * 0.2).d; path(svg, d, "bolt-glow", env.col, 5); path(svg, d, "bolt-core", "#e7dcff", 1.2); } anim(svg, [{ opacity: 0 }, { offset: 0.2, opacity: 0.8 }, { offset: 0.5, opacity: 0.3 }, { offset: 0.7, opacity: 0.7 }, { opacity: 0 }], 620 * k, { easing: "linear" }); cover(t.r, "sc-dusk", null, 800); }
        }, st);
      });
    },
    /* 심판: 줄 위에 해가 뜨고, 빛줄기가 대상마다 차례로 내리친다 */
    judgment(T, env) {
      const k = K(), q = tier(), t0 = pick(200, 290, 310) * k, gap = 90 * k; let n = 0;
      hook("sc_choir", 0.9);
      for (const g of rows(T)) {
        const sun = { x: (g.x0 + g.x1) / 2, y: Math.max(g.cw * 0.35, g.top - g.cw * 0.25) }, life = t0 + g.T.length * gap + 620 * k, S = g.cw * pick(1.2, 1.5, 1.9);
        const d = mk("sc-sun", sun.x, sun.y, { "--c": env.col, "--s": px(S) });
        anim(d, [{ scale: "0.2", opacity: 0, rotate: "0deg" }, { offset: Math.min(0.4, t0 / life), scale: "1", opacity: 1, rotate: "30deg" }, { offset: 0.8, scale: "1.06", opacity: 0.95, rotate: "70deg" }, { scale: "1.4", opacity: 0, rotate: "90deg" }], life, { easing: "ease-out" });
        if (q > 1) { const h = mk("sc-rays", sun.x, sun.y, { "--c": env.col, "--s": px(Math.max(g.x1 - g.x0, g.cw * 3) * 1.5) }); anim(h, [{ opacity: 0, rotate: "0deg", scale: "0.6" }, { offset: 0.3, opacity: 0.55, scale: "1" }, { offset: 0.8, opacity: 0.4 }, { opacity: 0, rotate: "24deg", scale: "1.1" }], life + 300 * k, { easing: "ease-out" }); }
        g.T.forEach(t => {
          const cw = t.r.width, i = n++, dx = t.b.x - sun.x, dy = t.b.y - sun.y, len = Math.hypot(dx, dy), deg = (Math.atan2(dy, dx) * 180 / Math.PI).toFixed(1) + "deg";
          t.at = t0 + i * gap;
          later(() => {
            const bm = mk("sc-beam", sun.x, sun.y, { "--c": env.col, "--w": px(len + t.r.height * 0.3), "--t": px(cw * 0.5) });
            anim(bm, [{ rotate: deg, scale: "0 0.6", opacity: 1 }, { offset: 0.18, rotate: deg, scale: "1 1", opacity: 1 }, { offset: 0.5, rotate: deg, scale: "1 1.25", opacity: 0.85 }, { rotate: deg, scale: "1 0.1", opacity: 0 }], pick(380, 480, 640) * k, { easing: "cubic-bezier(.3,.7,.3,1)" });
            later(() => {
              ring(t.b.x, t.r.bottom - t.r.height * 0.08, cw * 1.6, env.col, 520, { cls: "ell", from: 0.3, to: 1.3 });
              flash(t.b.x, t.b.y, cw * 1.4, env.col, 380); flash(t.b.x, t.b.y, cw * 0.6, "#ffffff", 180);
              rise(t.r, { n: 8, col: env.col, size: Math.max(6, cw * 0.06), dur: 700, cls: "p-dia", spread: 120 });
              shake(t.el, 9); glow(t.el, env.col, 320); land(env, i, 0);
              if (t.blocked) block(t.b, cw, t.el);
              if (q > 1) { const st = mk("sfx-star", t.b.x, t.b.y, { "--c": env.col, "--s": px(cw * 1.9) }); anim(st, [{ scale: "0.2", rotate: "0deg", opacity: 1 }, { offset: 0.3, scale: "1", opacity: 1 }, { scale: "1.25", rotate: "45deg", opacity: 0 }], 640 * k); later(() => rise(t.r, { n: 8, col: "#fffdf0", size: Math.max(4, cw * 0.04), dur: 1400, cls: "p-dia", spread: 500 }), 120 * k); ring(t.b.x, t.r.top + cw * 0.1, cw * 0.9, "#fff6cf", 900, { cls: "ell", from: 0.6, to: 1.05, delay: 100 * k }); nudge(t.el, 3); }
            }, 0);
          }, t.at - 70 * k);
        });
        if (q > 1) screenFlash("#fff3c8", 0.12, 520);
      }
    },
    /* 빛의 날개(보호막 · 강화): 카드 뒤에서 날개가 펼쳐져 감싸고 깃털이 내린다 */
    wings(T, env) {
      const k = K(), q = tier();
      hook("sc_wings", 0.8);
      T.forEach((t, i) => {
        const cw = t.r.width, r = t.r, st = i * 80 * k, sh = { x: t.b.x, y: r.top + r.height * 0.42 };
        t.at = st + 230 * k;
        later(() => {
          for (const s of [-1, 1]) {
            const w = mk("sc-wing", sh.x, sh.y, { "--c": env.col, "--w": px(cw * pick(0.9, 1.0, 1.1)), "--h": px(r.height * 0.8) });
            anim(w, [{ scale: `${s * 0.15} 0.5`, rotate: `${s * 40}deg`, opacity: 0 }, { offset: 0.22, scale: `${s} 1.05`, rotate: `${-s * 8}deg`, opacity: 1 }, { offset: 0.34, scale: `${s * 0.94} 1`, rotate: "0deg" }, { offset: 0.62, scale: `${s} 1`, rotate: `${-s * 4}deg`, opacity: 0.95 }, { scale: `${s * 0.3} 0.9`, rotate: `${s * 55}deg`, opacity: 0 }], pick(820, 1000, 1250) * k, { easing: "cubic-bezier(.3,.7,.3,1)" });
          }
        }, st);
        later(() => {
          if (t.kinds.has("shield")) { bubble(t.el, r, env.col); sndR("sp_shield", 0.8, 1 + 0.03 * Math.min(i, 4)); } else { glow(t.el, env.col, 620); rise(r, { n: 8, col: env.col, size: Math.max(5, cw * 0.055), dur: 760, cls: "p-dia" }); sndR("sp_buff", 0.8, 1 + 0.03 * Math.min(i, 4)); }
          ring(t.b.x, r.bottom - 3, cw * 1.3, env.col, 600, { cls: "ell", from: 0.3, to: 1.2 });
          if (q > 1) { ring(t.b.x, r.top - cw * 0.08, cw * 0.8, "#fff6cf", 1100, { cls: "ell", from: 0.5, to: 1 }); for (let j = 0; j < 8; j++) { const p = mk("sfx-p p-leaf sc-feather", t.b.x + rnd(-1, 1) * cw, r.top + rnd(-0.1, 0.3) * r.height, { "--c": "#fff", "--z": px(rnd(6, 10)) }); anim(p, [{ translate: "0px 0px", opacity: 0, rotate: "0deg" }, { offset: 0.15, opacity: 0.95 }, { translate: `${px(rnd(-30, 30))} ${px(r.height * rnd(0.6, 1.0))}`, opacity: 0, rotate: `${rnd(-240, 240).toFixed(0)}deg` }], rnd(1100, 1600) * k, { easing: "cubic-bezier(.3,.3,.5,1)", delay: rnd(0, 400) * k }); } }
        }, t.at);
      });
    },
    /* 씻김(강화 · 회복): 맑은 물이 발밑에서 차올라 지나가고 물방울이 떠오른다 */
    wash(T, env) {
      const k = K(), q = tier();
      hook("sc_wash", 0.8);
      T.forEach((t, i) => {
        const cw = t.r.width, r = t.r, st = i * 80 * k;
        t.at = st + 220 * k;
        later(() => {
          const w = mk("sc-pool", t.b.x, r.bottom, { "--c": env.col, "--w": px(cw * 1.15), "--h": px(r.height * 1.05) });
          anim(w, [{ scale: "1 0.05", opacity: 0 }, { offset: 0.3, scale: "1 1", opacity: 0.85 }, { offset: 0.6, scale: "1.04 0.9", opacity: 0.6 }, { scale: "1.1 0.2", opacity: 0 }], pick(700, 850, 1050) * k, { easing: "cubic-bezier(.3,.7,.3,1)" });
          ring(t.b.x, r.bottom - 3, cw * 1.35, env.col, 640, { cls: "ell", from: 0.3, to: 1.2 });
        }, st);
        later(() => {
          rise(r, { n: 9, col: "#bfe9ff", size: Math.max(5, cw * 0.06), dur: 850, cls: "p-ring" }); glow(t.el, env.col, 620); sndR(t.kinds.has("heal") ? "sp_heal" : "sp_buff", 0.8, 1 + 0.03 * Math.min(i, 4));
          if (q > 1) { cover(r, "sc-wet", { "--c": env.col }, 900); later(() => rise(r, { n: 8, col: FXC.heal, size: Math.max(4, cw * 0.045), dur: 1300, cls: "p-dia", spread: 500 }), 120 * k); ring(t.b.x, r.bottom - 3, cw * 1.7, "#eafaff", 900, { cls: "ell", from: 0.4, to: 1.15, delay: 160 * k }); }
        }, t.at);
      });
    }
  };
  const CH = { uid: null, t: 0, pt: null, n: 0 };   // 연쇄: 바로 앞에 맞은 자리

  /* ---------- 고사양: 장면이 없는 마법도 맞는 순간 원소별 잔여 입자 · 빛 번짐을 더한다 ---------- */
  const RICH_HIT = {
    fire(t, cw) { rise(t.r, { n: 8, col: "#ff9a4a", size: Math.max(3, cw * 0.035), dur: 1300, cls: "p-ember", spread: 500 }); cover(t.r, "sc-scorch", null, 1000); for (let j = 0; j < 2; j++) puff(t.b.x + rnd(-0.2, 0.2) * cw, t.r.top + cw * 0.2, cw * 0.6, "#3f3833", 1200, -cw * 0.6); },
    water(t, cw) { cover(t.r, "sc-wet", { "--c": EL_COL.water }, 900); sparks(t.b.x, t.r.top + cw * 0.2, { n: 10, col: "#bfe9ff", size: Math.max(3, cw * 0.035), dist: cw * 1.1, dur: 1000, grav: cw * 1.5, cls: "p-ring", ang: -90, spread: 70 }); ring(t.b.x, t.r.bottom - 2, cw * 1.5, "#bfe9ff", 800, { cls: "ell", from: 0.3, to: 1.2 }); },
    lightning(t, cw) { for (let j = 0; j < 3; j++) later(() => { const s = svgLayer(), a = { x: t.r.left + rnd(0, 1) * cw, y: t.r.top + rnd(0, 1) * t.r.height }, d = jag(a, { x: a.x + rnd(-0.6, 0.6) * cw, y: a.y + rnd(-0.4, 0.4) * t.r.height }, 5, 9).d; path(s, d, "bolt-glow", EL_COL.lightning, 4); path(s, d, "bolt-core", "#fffbe6", 1.4); anim(s, [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 0.2, offset: 0.5 }, { opacity: 0.9, offset: 0.7 }, { opacity: 0 }], 200 * K(), { easing: "linear" }); }, (140 + j * 130) * K()); sparks(t.b.x, t.r.bottom - 4, { n: 8, col: "#fff3a8", size: 3, dist: cw * 0.8, dur: 800, grav: cw * 1.2, cls: "p-ember", ang: -90, spread: 75 }); },
    earth(t, cw) { sparks(t.b.x, t.b.y, { n: 7, col: "#5c4630", size: Math.max(6, cw * 0.07), dist: cw * 1.4, dur: 1000, grav: cw * 1.8, cls: "p-sq", ang: -90, spread: 70, spin: 500 }); for (let j = 0; j < 3; j++) later(() => puff(t.b.x + rnd(-0.6, 0.6) * cw, t.r.bottom - rnd(0, 0.3) * cw, cw * rnd(0.6, 0.85), "#8a7256", 1400, -cw * 0.2), j * 110 * K()); },
    forest(t, cw) { sparks(t.b.x, t.r.top, { n: 9, col: "#8fd06a", size: Math.max(5, cw * 0.06), dist: cw * 0.7, dur: 1400, grav: cw * 0.9, cls: "p-leaf", spin: 500, ang: 90, spread: 80 }); },
    metal(t, cw) { sparks(t.b.x, t.b.y, { n: 6, col: "#a9b4c2", size: Math.max(4, cw * 0.05), dist: cw * 1.1, dur: 850, grav: cw * 1.5, cls: "p-sq", spin: 600 }); sparks(t.b.x, t.b.y, { n: 9, col: "#ffcf6e", size: 3, dist: cw * 1.4, dur: 900, grav: cw * 1.9, cls: "p-ember", ang: -90, spread: 85 }); },
    dark(t, cw) { cover(t.r, "sc-dusk", null, 900); rise(t.r, { n: 8, col: "#b99bff", size: Math.max(8, cw * 0.1), dur: 1100, cls: "p-wisp", spread: 400 }); },
    light(t, cw) { rise(t.r, { n: 9, col: "#fffdf0", size: Math.max(4, cw * 0.04), dur: 1400, cls: "p-dia", spread: 500 }); ring(t.b.x, t.r.top + cw * 0.1, cw * 0.9, "#fff6cf", 900, { cls: "ell", from: 0.6, to: 1.05 }); },
    wind(t, cw) { ring(t.b.x, t.b.y, cw * 0.9, "#e9fffb", 700, { cls: "swirl", from: 0.6, to: 1.3, rot: -320 }); sparks(t.b.x, t.b.y, { n: 8, col: "#b7e8c8", size: 6, dist: cw * 1.2, dur: 1000, grav: cw * 0.3, cls: "p-leaf", spin: 600 }); }
  };

  /* ---------- SpellFX.cast 를 감싼다 ---------- */
  const HIT_RE = /\b(dmg|miss|block)\b/;
  const base = SpellFX.cast;
  function cast(s, ctx) {
    if (off() || !s || !s.floats || !s.floats.length) return base(s, ctx);
    const fx = s.fx || {}, id = fx.spell || (ctx && ctx.id), th = SpellFX.themeOf(id);
    const by = new Map();
    for (const f of s.floats) {
      const key = String(f[0]), c = f[2] || "";
      if (/\blightmote\b/.test(c) || /^(life|crys)/.test(key)) continue;
      const kind = /\bdmg\b/.test(c) ? "dmg" : /\bheal\b/.test(c) ? "heal" : /\bblock\b/.test(c) ? "block" : /\bshield\b/.test(c) ? "shield" : /\bdebuff\b/.test(c) ? "debuff" : /\bmiss\b/.test(c) ? "miss" : "buff";
      if (!by.has(key)) by.set(key, new Set());
      by.get(key).add(kind);
    }
    const all = [];
    for (const [key, kinds] of by) {
      const el = typeof uidEl === "function" ? uidEl(+key) : null; if (!el) continue;
      const r = el.getBoundingClientRect(); if (r.width < 2) continue;
      const hit = kinds.has("dmg") || kinds.has("miss") || kinds.has("block");
      all.push({ key, el, r, b: ctr(r), kinds, hit, blocked: hit && !kinds.has("dmg"), at: 0 });
    }
    const hits = all.filter(t => t.hit), def = defOf(id, th, hits.length);
    const srcEl = typeof uidEl === "function" ? uidEl(fx.shown || (ctx && ctx.uid)) : null;
    const env = { src: srcEl ? ctr(srcEl.getBoundingClientRect()) : null, col: th.col, el: th.el, uid: ctx && ctx.uid, id };
    const took = new Map();
    const play = (name, T) => {
      if (!name || !SC[name] || !T.length) return;
      try { SC[name](T, env); } catch (e) { if (typeof console !== "undefined") console.warn("SpellScene " + name, e); if (window.__log) window.__log("SCENE ERR " + name + " " + e.message); return; }   // 장면이 실패하면 그 대상은 원래 연출로
      for (const t of T) took.set(t.key, t.at);
      if (T[0].hit && T.length >= 3) { const lastAt = Math.max(...T.map(t => t.at)); later(() => sndR("sp_area", 0.7, 1), lastAt + 70 * K()); }
    };
    play(def.hit, hits);
    for (const kind of ["debuff", "shield", "buff"]) if (def[kind]) play(def[kind], all.filter(t => !t.hit && !took.has(t.key) && (t.kinds.has(kind) || (kind === "buff" && t.kinds.has("heal")))));
    let out;
    if (took.size) {
      const rest = s.floats.filter(f => !took.has(String(f[0])));
      out = rest.length ? base(Object.assign({}, s, { floats: rest }), ctx) : new Map();
      for (const [k2, v] of took) out.set(k2, v);
    } else out = base(s, ctx);
    if (tier() === 2) for (const t of hits) {   // 고사양: 원래 연출로 맞은 대상에 잔여 입자
      if (took.has(t.key) || t.blocked) continue;
      const fn = RICH_HIT[th.el], at = out.get(t.key) || 0;
      later(() => { bloom(t.b.x, t.b.y, t.r.width * 2.8, th.col, 520); if (fn) fn(t, t.r.width); nudge(t.el, 3); }, at);
    }
    return out;
  }
  SpellFX.cast = cast;
  return { BY_ID, AREA_OF, SC, defOf, tier, base };
})();
