/* ETHERION — 전투 효과 그림 (2026-11-24, tools/art/fx_overlays.json · img/fx/*.webp)
   그린 효과 그림(투명 WebP)을 연출 위에 잠깐 겹쳐 띄운다 — 움직이는 것은 transform · opacity 뿐, 흐림 · 그림자 없음.
     타격 FX-H-*  : 마법이 맞는 순간(SpellFX.cast 를 SpellScene 바깥에서 한 번 더 감싼다 — 숫자가 뜨는 때에 맞춤) · [사격] 명중(js/game.js gunHit)
     마법 FX-S-*  : 마법이 아군을 회복(HEAL) · 강화(BUFF, 빛 깃발은 가호 WARD) · 보호막(SHIELD) · 상대를 약화(CURSE) · 피의 마법(BLOOD — 암흑 깃발의 강화 · 회복, 생명을 바친 마법은 발동한 카드 위)
     무기 FX-W-*  : [사격] 총 쏘기 연출(고사양, js/game.js gunShot)의 흐린 총 대신 그 깃발의 무기 그림
   연출 3단계(js/impact.js applyFx): 저사양 = 맞은 대상 4기까지 · 작게 · 섞기 없음 / 중간 = 8기 · 보통 / 고사양 = 12기 · 크게 · screen 섞기 + 옅은 잔상 한 장.
   불러오기: 판이 시작될 때(startMatch → warm) 두 깃발의 그림과 마법 그림 6장만 쉬는 틈에 불러 둔다. 아직 안 불러진 그림은 그 회에는 건너뛴다(연출은 원래대로).
   판의 결과는 건드리지 않는다(연출만). 움직임 줄이기 · 배속 0 · 화면 없는 대전이면 아무것도 하지 않는다. */
"use strict";

const FXArt = (() => {
  const V = "fx1";
  const HIT_OF_FLAG = { B1: "FIRE", B2: "STEEL", B3: "BOLT", G1: "QUAKE", G2: "THORN", G3: "WAVE", A1: "SHADOW", A2: "HOLY", A3: "WIND" };
  const HIT_OF_EL = { fire: "FIRE", metal: "STEEL", lightning: "BOLT", earth: "QUAKE", forest: "THORN", water: "WAVE", dark: "SHADOW", light: "HOLY", wind: "WIND" };
  const HIT_OF_K = { meteor: "METEOR", arrows: "ARROWS", wave: "WAVE", quake: "QUAKE" };
  const BOW = { A2: 1, A3: 1, G1: 1, G2: 1 };          // 세워 든 활 (나머지는 가로로 누운 총 · 쇠뇌)
  const MUZZLE = { B1: 1, B3: 1 };                      // 총구 불꽃이 어울리는 무기 (화승총 · 코일총)
  const root = document.documentElement.classList;
  const tier = () => (root.contains("fx-low") ? 0 : root.contains("fx-high") ? 2 : 1);
  const pick = (a, b, c) => [a, b, c][tier()];
  const layer = () => document.getElementById("fx-layer");
  const K = () => (typeof kSpeed === "function" ? kSpeed() : 1);
  const off = () => !layer() || (typeof RM === "function" && RM()) || typeof G === "undefined" || !G || G.speed === 0 || (G.cfg && G.cfg.headless);
  const rnd = (a, b) => a + Math.random() * (b - a);
  const later = (fn, ms) => (ms > 4 ? setTimeout(() => { if (layer()) fn(); }, ms) : fn());

  /* ---------- 불러오기 ---------- */
  const imgs = {};   // id → Image (complete 이면 씀)
  function load(id) {
    if (imgs[id]) return imgs[id];
    const im = new Image();
    im.decoding = "async";
    im.src = `img/fx/${id}.webp?v=${V}`;
    if (im.decode) im.decode().catch(() => {});
    return (imgs[id] = im);
  }
  const ready = id => { const im = imgs[id] || load(id); return im.complete && im.naturalWidth > 0 ? im : null; };
  function warm(groups) {
    if (typeof G === "undefined" || !G || (G.cfg && G.cfg.headless)) return;
    const gs = groups || (G.players || []).map(p => p.group).filter(Boolean);
    const ids = ["FX-S-HEAL", "FX-S-BUFF", "FX-S-SHIELD", "FX-S-CURSE", "FX-S-WARD", "FX-S-BLOOD"];
    for (const g of gs) {
      if (HIT_OF_FLAG[g]) ids.push("FX-H-" + HIT_OF_FLAG[g]);
      if (g === "B1") ids.push("FX-H-METEOR");
      if (g === "A3") ids.push("FX-H-ARROWS");
      if (tier() === 2) ids.push("FX-W-" + g);   // 무기는 고사양(총 쏘기 연출)에서만 쓰인다
    }
    const go = () => { for (const id of ids) load(id); };
    if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 2500 }); else setTimeout(go, 600);
  }
  const flagOf = uid => { const it = typeof G !== "undefined" && G && G.reg && G.reg[uid]; const c = it && typeof CARDS !== "undefined" ? CARDS[it.id] : null; return (c && c.group) || null; };

  /* ---------- 한 장 띄우기 ----------
     o: x y(기준점, 화면 px) · w(폭) · ax ay(그림 안의 기준점 0~1, 기본 가운데) · rot · flip · kf(Web Animations 키프레임 — transform 은 translate · scale · rotate 낱개 속성) · dur · delay */
  function show(id, o) {
    const im = ready(id); if (!im) return null;
    const L = layer(); if (!L) return null;
    const w = o.w, h = w * im.naturalHeight / im.naturalWidth;
    const d = im.cloneNode();
    d.className = "fxa" + (tier() === 2 ? " fxa-hi" : "") + (o.cls ? " " + o.cls : "");
    d.alt = "";
    const ax = o.ax != null ? o.ax : 0.5, ay = o.ay != null ? o.ay : 0.5;
    d.style.cssText = `left:${(o.x - w * ax).toFixed(1)}px;top:${(o.y - h * ay).toFixed(1)}px;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px;transform-origin:${ax * 100}% ${ay * 100}%;transform:rotate(${o.rot || 0}deg) scaleY(${o.flip ? -1 : 1})`;
    L.appendChild(d);
    const ms = Math.max(16, o.dur * K());
    const a = d.animate(o.kf, { duration: ms, delay: (o.delay || 0) * K(), easing: o.ease || "ease-out", fill: "both" });
    a.onfinish = () => d.remove();
    setTimeout(() => d.remove(), ms + (o.delay || 0) * K() + 400);
    return d;
  }
  const fade = (pk, k2) => [{ opacity: 0, scale: String(k2 || 0.6) }, { offset: 0.18, opacity: pk, scale: "1" }, { offset: 0.55, opacity: pk * 0.85 }, { opacity: 0, scale: "1.12" }];

  /* ---------- 타격: 대상 카드 네모 r 에 맞춰 ---------- */
  const HIT = {
    FIRE(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.5 * s, rot: rnd(-25, 25), dur: 560, kf: [{ opacity: 0, scale: "0.35" }, { offset: 0.15, opacity: 1, scale: "1" }, { offset: 0.5, opacity: 0.8, scale: "1.1" }, { opacity: 0, scale: "1.22" }] }; },
    METEOR(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.3 * s, ax: 0.75, ay: 0.75, dur: 300, ease: "cubic-bezier(.5,0,1,.6)", lead: 260, kf: [{ opacity: 0, translate: `${-r.w * 1.6}px ${-r.w * 1.6}px` }, { offset: 0.25, opacity: 1 }, { offset: 0.85, opacity: 1, translate: "0px 0px" }, { opacity: 0, translate: `${r.w * 0.1}px ${r.w * 0.1}px` }], then: "FIRE" }; },
    STEEL(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.45 * s, rot: rnd(0, 360), dur: 480, kf: [{ opacity: 0, scale: "0.3", rotate: "0deg" }, { offset: 0.14, opacity: 1, scale: "1" }, { opacity: 0, scale: "1.25", rotate: "25deg" }] }; },
    BOLT(r, s) { return { x: r.cx, y: r.cy + r.h * 0.1, w: r.w * 1.05 * s, ay: 0.92, dur: 420, ease: "linear", kf: [{ opacity: 0 }, { offset: 0.08, opacity: 1 }, { offset: 0.22, opacity: 0.25 }, { offset: 0.34, opacity: 1 }, { offset: 0.6, opacity: 0.7 }, { opacity: 0 }] }; },
    QUAKE(r, s) { return { x: r.cx, y: r.b + r.h * 0.05, w: r.w * 1.5 * s, ay: 0.9, dur: 620, kf: [{ opacity: 0, scale: "1 0.2" }, { offset: 0.18, opacity: 1, scale: "1 1.05" }, { offset: 0.5, opacity: 0.85, scale: "1 1" }, { opacity: 0, scale: "1.05 0.95" }] }; },
    THORN(r, s) { return { x: r.cx, y: r.b, w: r.w * 1.35 * s, ay: 0.96, dur: 720, kf: [{ opacity: 0, scale: "0.7 0.1" }, { offset: 0.3, opacity: 1, scale: "1 1" }, { offset: 0.7, opacity: 0.85 }, { opacity: 0, scale: "1 1.04" }] }; },
    WAVE(r, s) { return { x: r.cx, y: r.cy + r.h * 0.12, w: r.w * 1.6 * s, dur: 600, kf: [{ opacity: 0, translate: `${-r.w * 0.7}px 0px`, scale: "0.8" }, { offset: 0.3, opacity: 1, translate: "0px 0px", scale: "1" }, { offset: 0.65, opacity: 0.8 }, { opacity: 0, translate: `${r.w * 0.35}px ${-r.h * 0.05}px`, scale: "1.06" }] }; },
    SHADOW(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.3 * s, dur: 460, kf: [{ opacity: 0, translate: `${r.w * 0.35}px ${-r.w * 0.35}px`, scale: "1.15" }, { offset: 0.2, opacity: 1, translate: "0px 0px", scale: "1" }, { offset: 0.6, opacity: 0.8 }, { opacity: 0, translate: `${-r.w * 0.08}px ${r.w * 0.08}px` }] }; },
    HOLY(r, s) { return { x: r.cx, y: r.cy + r.h * 0.15, w: r.w * 0.95 * s, ay: 0.82, dur: 620, kf: [{ opacity: 0, scale: "0.6 0.2" }, { offset: 0.16, opacity: 1, scale: "1 1" }, { offset: 0.55, opacity: 0.85 }, { opacity: 0, scale: "1.15 1" }] }; },
    WIND(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.5 * s, dur: 520, kf: [{ opacity: 0, translate: `${r.w * 0.6}px ${r.w * 0.1}px`, rotate: "18deg" }, { offset: 0.25, opacity: 1, translate: "0px 0px", rotate: "0deg" }, { offset: 0.6, opacity: 0.75 }, { opacity: 0, translate: `${-r.w * 0.45}px ${-r.w * 0.05}px`, rotate: "-10deg" }] }; },
    ARROWS(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.35 * s, ax: 0.42, ay: 0.58, dur: 380, ease: "cubic-bezier(.3,0,.6,1)", lead: 120, kf: [{ opacity: 0, translate: `${r.w * 0.9}px ${-r.w * 0.9}px` }, { offset: 0.35, opacity: 1, translate: "0px 0px" }, { offset: 0.7, opacity: 0.85 }, { opacity: 0 }] }; }
  };
  const SPELL = {
    HEAL(r, s) { return { x: r.cx, y: r.b - r.h * 0.12, w: r.w * 1.05 * s, ay: 0.8, dur: 900, kf: [{ opacity: 0, scale: "0.4", translate: "0px 0px" }, { offset: 0.25, opacity: 0.95, scale: "1" }, { offset: 0.65, opacity: 0.8 }, { opacity: 0, scale: "1.05", translate: `0px ${-r.h * 0.2}px` }] }; },
    BUFF(r, s) { return { x: r.cx, y: r.b, w: r.w * 0.95 * s, ay: 0.93, dur: 820, kf: [{ opacity: 0, scale: "0.8 0.15" }, { offset: 0.25, opacity: 0.95, scale: "1 1" }, { offset: 0.65, opacity: 0.8 }, { opacity: 0, scale: "1 1.1" }] }; },
    SHIELD(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.25 * s, dur: 820, kf: [{ opacity: 0, scale: "0.7" }, { offset: 0.22, opacity: 0.8, scale: "1.04" }, { offset: 0.4, scale: "1" }, { offset: 0.7, opacity: 0.6 }, { opacity: 0, scale: "1.06" }] }; },
    WARD(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.05 * s, dur: 860, kf: [{ opacity: 0, scale: "0.5", rotate: "-30deg" }, { offset: 0.25, opacity: 0.95, scale: "1", rotate: "0deg" }, { offset: 0.65, opacity: 0.8 }, { opacity: 0, scale: "1.1", rotate: "12deg" }] }; },
    CURSE(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.1 * s, dur: 860, kf: [{ opacity: 0, scale: "1.35", rotate: "20deg" }, { offset: 0.28, opacity: 0.95, scale: "1", rotate: "0deg" }, { offset: 0.7, opacity: 0.8 }, { opacity: 0, scale: "0.9" }] }; },
    BLOOD(r, s) { return { x: r.cx, y: r.cy, w: r.w * 1.1 * s, dur: 820, kf: fade(0.95, 0.5) }; }
  };
  const rectOf = el => { const q = el.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height, cx: q.left + q.width / 2, cy: q.top + q.height / 2, b: q.bottom }; };
  /* 타격 한 장: at = 맞는 순간(ms). 미리 날아오는 그림(메테오 · 화살비)은 at 보다 lead ms 먼저 뜬다 */
  function hitAt(name, el, at, s0) {
    const fn = HIT[name]; if (!fn || !el) return;
    const s = (s0 || 1) * pick(0.85, 1, 1.18), lead = (fn(rectOf(el), 1).lead || 0) * K();
    later(() => {
      const r = rectOf(el); if (r.w < 2) return;
      const o = fn(r, s);
      show("FX-H-" + name, o);
      if (o.then) later(() => hitAt(o.then, el, 0, s0), lead);   // 메테오: 떨어진 뒤 폭발
      else if (tier() === 2 && !o.lead) show("FX-H-" + name, Object.assign({}, o, { w: o.w * 1.25, cls: "fxa-ghost", delay: 40, dur: o.dur * 1.2 }));   // 고사양: 옅은 잔상 한 장
    }, Math.max(0, at - lead));
  }
  function spellAt(name, el, at, s0) {
    const fn = SPELL[name]; if (!fn || !el) return;
    const s = (s0 || 1) * pick(0.85, 1, 1.15);
    later(() => { const r = rectOf(el); if (r.w < 2) return; show("FX-S-" + name, fn(r, s)); }, at);
  }

  /* ---------- SpellFX.cast 를 감싼다 (SpellScene 바깥) ---------- */
  function wrapCast() {
    if (typeof SpellFX === "undefined" || !SpellFX.cast || SpellFX.cast.__fxa) return;
    const inner = SpellFX.cast;
    const cast = function (s, ctx) {
      const out = inner(s, ctx);
      try { if (!off() && s && s.floats && s.floats.length) overlay(s, ctx, out); } catch (e) { if (typeof console !== "undefined") console.warn("FXArt", e); }
      return out;
    };
    cast.__fxa = true;
    SpellFX.cast = cast;
  }
  function overlay(s, ctx, out) {
    const fx = s.fx || {}, id = fx.spell || (ctx && ctx.id), th = SpellFX.themeOf(id);
    const by = new Map();
    for (const f of s.floats) {
      const key = String(f[0]), c = f[2] || "";
      if (/^life/.test(key) && /\bdmg\b/.test(c) && /제물|대가|피/.test(String(f[1] || ""))) {   // 피의 대가: 생명을 바친 마법 — 발동한 카드 위에 피의 인장
        const src = typeof uidEl === "function" ? uidEl(fx.shown || (ctx && ctx.uid)) : null;
        if (src) spellAt("BLOOD", src, (out && out.get && out.get(key)) || 0, 1.1);
      }
      if (/\blightmote\b/.test(c) || /^(life|crys)/.test(key)) continue;
      const kind = /\bdmg\b/.test(c) ? "dmg" : /\bheal\b/.test(c) || /치유|회복|정화/.test(String(f[1] || "")) ? "heal" : /\bblock\b/.test(c) ? "block" : /\bshield\b/.test(c) ? "shield" : /\bdebuff\b/.test(c) ? "debuff" : /\bmiss\b/.test(c) ? "miss" : "buff";
      if (!by.has(key)) by.set(key, new Set());
      by.get(key).add(kind);
    }
    const cap = pick(4, 8, 12), hitName = HIT_OF_K[th.k] || HIT_OF_EL[th.el] || "FIRE";
    const blood = th.k === "blood";
    let n = 0;
    for (const [key, kinds] of by) {
      if (n >= cap) break;
      const el = typeof uidEl === "function" ? uidEl(+key) : null; if (!el) continue;
      const at = (out && out.get && (out.get(key) != null ? out.get(key) : out.get(+key))) || 0;
      if (kinds.has("dmg")) { hitAt(hitName, el, at); n++; continue; }
      if (kinds.has("miss") || kinds.has("block")) continue;   // 막힌 타격은 원래 연출(막힘 표시)만
      const sp = kinds.has("debuff") ? "CURSE" : kinds.has("shield") ? "SHIELD" : kinds.has("heal") ? (blood || th.el === "dark" ? "BLOOD" : "HEAL") : (blood || th.el === "dark" ? "BLOOD" : th.el === "light" ? "WARD" : "BUFF");
      spellAt(sp, el, at); n++;
    }
  }

  /* ---------- [사격] — js/game.js gunShot · gunHit 에서 부른다 ---------- */
  /* 무기 그림 (고사양 총 쏘기). 돌려주는 값: { el, half(기준점에서 총구까지 px), muzzle } — 그림이 아직 없으면 null(원래 SVG 총) */
  function weapon(uid, w) {
    const g = flagOf(uid), im = g && ready("FX-W-" + g); if (!im) return null;
    const ratio = im.naturalHeight / im.naturalWidth, bow = !!BOW[g];
    const ww = bow ? w * 0.62 : w;            // 활은 세워 든 그림이라 폭을 줄여 높이를 맞춘다
    const d = im.cloneNode(); d.alt = ""; d.className = "fxa-weapon";
    d.style.width = ww.toFixed(1) + "px"; d.style.height = (ww * ratio).toFixed(1) + "px";
    return { el: d, w: ww, h: ww * ratio, half: ww * 0.47, muzzle: !!MUZZLE[g], bow };
  }
  function gunHitArt(actUid, tEl) {
    if (off() || !tEl) return;
    const g = flagOf(actUid), name = HIT_OF_FLAG[g]; if (!name) return;
    hitAt(name, tEl, 0, 0.8);
  }

  wrapCast();
  return { warm, show, hitAt, spellAt, weapon, gunHitArt, ready, load, HIT_OF_FLAG, tier };
})();
