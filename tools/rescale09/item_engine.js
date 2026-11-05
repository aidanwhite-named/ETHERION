/* ---------- item engine (shared by page and precompute) ---------- */
function makeEngine(UNITS, S) {
  "use strict";
  const P = 0.5;
  const dmg = (a, d) => (a > d ? a - d : 0);
  const IDX = { a: 0, d: 1, h: 2 };
  function outcomes(base, coins, lock) {
    let m = new Map([[base.a + "," + base.d + "," + base.h, 1]]);
    for (const [st, n, v] of coins) {
      if (lock && lock[st] && v < 0) continue;
      for (let i = 0; i < n; i++) {
        const nm = new Map();
        for (const [k, pr] of m) {
          nm.set(k, (nm.get(k) || 0) + pr * (1 - P));
          const s = k.split(",").map(Number); s[IDX[st]] += v; const k2 = s.join(",");
          nm.set(k2, (nm.get(k2) || 0) + pr * P);
        }
        m = nm;
      }
    }
    const out = [];
    for (const [k, pr] of m) { const [a, d, h] = k.split(",").map(Number); out.push({ a, d, h: Math.max(1, h), p: pr }); }
    return out;
  }
  const FULL = { a: 1, d: 1, h: 1 };
  function debuff(o, lock) {
    if (!S.q) return o;
    const out = o.map(x => ({ a: x.a, d: x.d, h: x.h, p: x.p * (1 - S.q) }));
    for (const st of ["a", "d", "h"]) for (const x of o) {
      const y = { a: x.a, d: x.d, h: x.h, p: x.p * S.q / 3 };
      if (!(lock && lock[st])) { y[st] -= S.mag; if (y.h < 1) y.h = 1; }
      out.push(y);
    }
    return out;
  }
  function worn(card, it) {
    if (!it) return { a: card.a, d: card.d, h: card.h, co: card.co, lock: null };
    if (it.set) return { a: it.set.a, d: it.set.d, h: it.set.h, co: it.co || [], lock: FULL };
    return { a: card.a + (it.a || 0), d: card.d + (it.d || 0), h: card.h + (it.h || 0), co: card.co.concat(it.co || []), lock: it.lock || null };
  }
  function dist(card, it, env) {
    const w = worn(card, it);
    const o = outcomes(w, w.co, w.lock);
    return env ? debuff(o, w.lock) : o;
  }
  // pierce: ignore up to N of positive defense ([마력 공격] = ignore it all)
  // [마력 공격 N]: own attacks ignore up to N defense (counters do not). magic === true means all.
  const pierceOf = it => (it && it.magic ? (it.magic === true ? 99 : +it.magic) : 0);
  const pierceCtr = () => 0;
  const effD = (y, pierce) => (y.d > 0 ? Math.max(0, y.d - (pierce || 0)) : y.d);

  /* ---------- exact 1:1, two turns (each side attacks once) ---------- */
  function res(ax, ay, bx, by, x, y, xFirst, rx, ry) {
    if (xFirst) return ax >= y.h ? 1 : (!rx && by >= x.h) ? 0 : ay >= x.h ? 0 : (!ry && bx >= y.h) ? 1 : 0.5;
    return ay >= x.h ? 0 : (!ry && bx >= y.h) ? 1 : ax >= y.h ? 1 : (!rx && by >= x.h) ? 0 : 0.5;
  }
  // protection on the first damage a unit takes in a turn: shield (coin) cancels it, ward N reduces it
  const guard = (amt, on, ward) => (amt <= 0 ? 0 : on ? 0 : Math.max(0, amt - ward));
  function fight(x, y, ix, iy, xFirst, b) {
    // b: [critX, critY, shieldX t0, shieldX t1, shieldY t0, shieldY t1]
    const S_ = [{ u: x, i: ix || {}, crit: b[0], sh: [b[2], b[3]] }, { u: y, i: iy || {}, crit: b[1], sh: [b[4], b[5]] }];
    for (let t = 0; t < 2; t++) {
      const A = S_[(t === 0) === xFirst ? 0 : 1], D = S_[(t === 0) === xFirst ? 1 : 0];
      let usedD = false, usedA = false;
      const hitD = amt => { if (amt <= 0) return 0; if (!usedD) { usedD = true; return guard(amt, D.i.shield && D.sh[t], D.i.ward || 0); } return amt; };
      const hitA = amt => { if (amt <= 0) return 0; if (!usedA) { usedA = true; return guard(amt, A.i.shield && A.sh[t], A.i.ward || 0); } return amt; };
      const base = (A.i.mirror ? Math.max(0, D.u.d) : dmg(A.u.a, effD(D.u, pierceOf(A.i)))) * (A.crit ? 2 : 1);
      const tot = hitD(A.i.throw || 0) + hitD(base);
      if (tot >= D.u.h) return A === S_[0] ? 1 : 0;
      if (!A.i.ranged) { const c = hitA(dmg(D.u.a, effD(A.u, pierceCtr(D.i)))); if (c >= A.u.h) return A === S_[0] ? 0 : 1; }
    }
    return 0.5;
  }
  const special = it => it && (it.ward || it.shield || it.magic || it.mirror);
  function duel(x, y, ix, iy, xFirst) {
    if (!special(ix) && !special(iy)) {
      const yd = effD(y, pierceOf(ix)), xd = effD(x, pierceOf(iy));
      const bx = dmg(x.a, yd), by = dmg(y.a, xd);
      const tx = ix ? ix.throw || 0 : 0, ty = iy ? iy.throw || 0 : 0;
      const cx = ix && ix.crit, cy = iy && iy.crit, rx = !!(ix && ix.ranged), ry = !!(iy && iy.ranged);
      if (!cx && !cy) return res(bx + tx, by + ty, bx, by, x, y, xFirst, rx, ry);
      let r = 0;
      for (const mx of cx ? [1, 2] : [1]) for (const my of cy ? [1, 2] : [1]) r += (cx ? 0.5 : 1) * (cy ? 0.5 : 1) * res(bx * mx + tx, by * my + ty, bx, by, x, y, xFirst, rx, ry);
      return r;
    }
    const opts = [ix && ix.crit, iy && iy.crit, ix && ix.shield, ix && ix.shield, iy && iy.shield, iy && iy.shield].map(f => (f ? [0, 1] : [0]));
    let r = 0, n = 0; const b = [0, 0, 0, 0, 0, 0];
    (function rec(k, w) {
      if (k === 6) { r += w * fight(x, y, ix, iy, xFirst, b); return; }
      const o = opts[k]; for (const v of o) { b[k] = v; rec(k + 1, w / o.length); }
    })(0, 1);
    return r;
  }

  /* ---------- pools ---------- */
  const elig = it => c => !it || !it.cls || !it.cls.length || it.cls.includes("공용") || it.cls.includes(c.cl);
  const clsKey = it => (!it || !it.cls || !it.cls.length || it.cls.includes("공용") ? "공용" : it.cls.slice().sort().join("·"));
  let pools = {}, plainD = new Map(), hostCache = new Map();
  function rebuild() {
    pools = {}; plainD = new Map(); hostCache = new Map();
    for (let L = 1; L <= 8; L++) pools[L] = UNITS.filter(c => c.lv === L && c.up === 0);
  }
  // hosts: every unit of that level the item can be worn by (upkeep cards included)
  function hostPool(L, it) { const k = clsKey(it) + "|" + L; let v = hostCache.get(k); if (!v) { v = UNITS.filter(c => c.lv === L && elig(it)(c)); hostCache.set(k, v); } return v; }
  const pd = c => { let v = plainD.get(c); if (!v) { v = dist(c, null, false); plainD.set(c, v); } return v; };
  function wrVsOpp(xo, it, opp, oppIt) {
    const yo = oppIt ? dist(opp, oppIt, false) : pd(opp); let sa = 0, sd = 0;
    for (const a of xo) for (const b of yo) { const pp = a.p * b.p; sa += pp * duel(a, b, it, oppIt, true); sd += pp * duel(a, b, it, oppIt, false); }
    return { w: (sa + sd) / 2 * 100, wa: sa * 100, wd: sd * 100 };
  }
  function wrVs(xo, it, L, filt) {
    const pool = filt ? pools[L].filter(filt) : pools[L]; if (!pool.length) return NaN; let t = 0;
    for (const Y of pool) { const yo = pd(Y); for (const a of xo) for (const b of yo) t += a.p * b.p * (duel(a, b, it, null, true) + duel(a, b, it, null, false)) / 2; }
    return t / pool.length * 100;
  }
  const logit = p => { p = Math.min(0.995, Math.max(0.005, p / 100)); return Math.log(p / (1 - p)); };
  function eqFromWr(get, Lh) {
    let L = Lh;
    if (get(L) < 50) {
      while (L > 1 && get(L) < 50) L--;
      if (get(L) < 50) { const a = logit(get(1)), sl = logit(get(1)) - logit(get(2)); return 1 + a / (sl > 0.05 ? sl : logit(78)); }
      const a = logit(get(L)), b = logit(get(L + 1)); return L + a / (a - b);
    }
    while (L < 8 && get(L + 1) >= 50) L++;
    if (L === 8) { const a = logit(get(8)), sl = logit(get(7)) - a; return 8 + a / (sl > 0.05 ? sl : logit(67.6)); }
    const a = logit(get(L)), b = logit(get(L + 1)); return L + a / (a - b);
  }
  function eqLevel(card, it, env) {
    const xo = dist(card, it, env); const w = {};
    return eqFromWr(L => (w[L] != null ? w[L] : (w[L] = wrVs(xo, it, L))), card.lv);
  }
  let baseEq = new Map();
  function hostBase(c) { let v = baseEq.get(c); if (v == null) { v = eqLevel(c, null, true); baseEq.set(c, v); } return v; }
  const W8 = { deck: { 1: 6, 2: 6, 3: 6, 4: 6, 5: 4, 6: 4, 7: 4, 8: 4 }, flat: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 } };
  const hostLevels = it => (it && it.set ? [1] : [1, 2, 3, 4, 5, 6, 7, 8]);
  function avgW(per, it) { const w = W8[S.weight] || W8.deck; let s = 0, ws = 0; for (const L of hostLevels(it)) { if (per[L] == null || isNaN(per[L])) continue; s += per[L] * w[L]; ws += w[L]; } return ws ? s / ws : NaN; }
  // gain of one unit wearing the item (1:1, exact)
  const gainOn = (c, it) => eqLevel(c, it, true) - hostBase(c);
  function itemDuel(it, wantHosts, filt) {
    const per = {}, hosts = [];
    for (let L = 1; L <= 8; L++) {
      let g = 0, n = 0; const hs = hostPool(L, it).filter(filt || (() => true));
      for (const c of hs) { const v = gainOn(c, it); g += v; n++; if (wantHosts) hosts.push([v, c]); }
      per[L] = n ? g / n : NaN;
    }
    return { per, avg: avgW(per, it), hosts };
  }

  /* ---------- n vs n skirmish (Monte Carlo) ---------- */
  function rollU(card, it, debuffed) {
    const w = worn(card, it); const u = { a: w.a, d: w.d, h: w.h };
    for (const [st, n, v] of w.co) { if (w.lock && w.lock[st] && v < 0) continue; for (let i = 0; i < n; i++) if (Math.random() < P) u[st] += v; }
    if (debuffed && S.q && Math.random() < S.q) { const st = "adh"[(Math.random() * 3) | 0]; if (!(w.lock && w.lock[st])) u[st] -= S.mag; }
    if (u.h < 1) u.h = 1; it = it || {};
    u.pierce = pierceOf(it); u.cpierce = 0; u.shred = it.shred ? 1 : 0; u.sh = 0; u.ranged = !!it.ranged; u.crit = it.crit ? 1 : 0; u.thr = it.throw || 0; u.every = !!it.every;
    u.ward = it.ward || 0; u.shield = !!it.shield; u.shOn = false; u.used = false; u.alive = true; u.thrown = false;
    return u;
  }
  // first damage a unit takes this turn passes through its protection; `used` is the plan's scratch set
  function hit(u, amt, used) {
    if (amt <= 0) return 0;
    if (!u.used && !used.has(u)) { used.add(u); if (u.shOn) return 0; return Math.max(0, amt - u.ward); }
    return amt;
  }
  // [관통]: an attack also lowers the target's defense by the amount it blocked (until the end of the turn)
  function seqEval(order, T, thrower, crits, used) {
    let acc = thrower ? hit(T, thrower.thr, used) : 0, losses = 0; const dead = [];
    const d0 = T.d > 0 ? Math.max(0, T.d - T.sh) : T.d; let td = d0;
    if (acc >= T.h) return { kill: true, at: -1, losses, dead, shred: 0 };
    for (let i = 0; i < order.length; i++) {
      const A = order[i]; let d = dmg(A.a, td > 0 ? Math.max(0, td - A.pierce) : td); if (A.crit && crits[i]) d *= 2;
      if (A.shred && td > 0) td -= Math.min(A.a, td);
      acc += hit(T, d, used); if (acc >= T.h) return { kill: true, at: i, losses, dead, shred: d0 - td };
      if (!A.ranged && hit(A, dmg(T.a, effD(A, T.cpierce)), used) >= A.h) { losses++; dead.push(A); }
    }
    return { kill: false, at: order.length - 1, losses, dead, shred: d0 - td };
  }
  const roughVuln = (A, T) => !A.ranged && !A.shOn && dmg(T.a, effD(A, T.cpierce)) - A.ward >= A.h;
  function orderFor(units, T) { return units.slice().sort((x, y) => (y.shred - x.shred) || (y.crit - x.crit) || (roughVuln(x, T) - roughVuln(y, T))); }
  function sideTurn(att, tgt) {
    let avail = att.filter(u => u.alive);
    for (;;) {
      const thrower = att.find(u => u.alive && u.thr && !u.thrown);
      let best = null; const n = avail.length;
      for (const T of tgt) {
        if (!T.alive) continue;
        for (const useThr of thrower ? [0, 1] : [0]) {
          for (let m = useThr ? 0 : 1; m < 1 << n; m++) {
            const sub = []; for (let i = 0; i < n; i++) if (m >> i & 1) sub.push(avail[i]);
            const anyShred = sub.some(A => A.shred);
            let maxSum = useThr ? thrower.thr : 0; for (const A of sub) maxSum += dmg(A.a, anyShred ? Math.min(T.d, 0) : effD(T, A.pierce)) * (A.crit ? 2 : 1);
            if (maxSum < T.h) continue;
            const ord = orderFor(sub, T); const ci = ord.findIndex(u => u.crit);
            const br = ci >= 0 ? [[0, 1 - P], [1, P]] : [[0, 1]];
            let pk = 0, el = 0;
            for (const [c, pr] of br) { const r = seqEval(ord, T, useThr ? thrower : null, ord.map((u, i) => (i === ci ? c : 0)), new Set()); if (r.kill) pk += pr; el += pr * r.losses; }
            if (pk <= 0) continue;
            const v = pk - el; if (v < -1e-9) continue;
            const key = v * 100 - sub.length - useThr * 0.5;
            if (!best || key > best.key) best = { key, T, ord, useThr };
          }
        }
      }
      if (!best) return;
      const used = new Set();
      const r = seqEval(best.ord, best.T, best.useThr ? thrower : null, best.ord.map(u => (u.crit && Math.random() < P ? 1 : 0)), used);
      used.forEach(u => (u.used = true)); best.T.sh += r.shred;
      if (best.useThr) thrower.thrown = true;
      const attacked = r.kill ? best.ord.slice(0, r.at + 1) : best.ord;
      r.dead.forEach(u => (u.alive = false));
      if (r.kill) best.T.alive = false;
      avail = avail.filter(u => u.alive && !attacked.includes(u));
      if (!tgt.some(u => u.alive)) return;
      if (!avail.length && !att.find(u => u.alive && u.thr && !u.thrown)) return;
    }
  }
  function game(X, Y, xFirst) {
    for (let t = 0; t < 8; t++) {
      for (const u of X.concat(Y)) { u.used = false; u.sh = 0; u.shOn = u.shield && Math.random() < P; }
      const xAtk = (t % 2 === 0) === xFirst;
      if (xAtk) { sideTurn(X, Y); X.forEach(u => { u.thrown = !u.every; }); } else sideTurn(Y, X);
      if (!X.some(u => u.alive) || !Y.some(u => u.alive)) break;
    }
    const ax = X.filter(u => u.alive).length, ay = Y.filter(u => u.alive).length;
    return ax > ay ? 1 : ax < ay ? 0 : 0.5;
  }
  const pick = a => a[(Math.random() * a.length) | 0];
  const SIZES = [2, 3, 4, 5];
  // host wears the item (or nothing); everyone else is a level-L unit; the rival comes from level R
  function wrBoard(it, hosts, L, R, n, N) {
    let s = 0;
    for (let i = 0; i < N; i++) {
      const X = [rollU(pick(hosts), it, true)], Y = [rollU(pick(pools[R]), null, true)];
      for (let k = 1; k < n; k++) { X.push(rollU(pick(pools[L]))); Y.push(rollU(pick(pools[L]))); }
      s += game(X, Y, i % 2 === 0);
    }
    return s / N * 100;
  }
  function eqBoard(it, hosts, L, n, N) { const w = {}; return eqFromWr(R => (w[R] != null ? w[R] : (w[R] = wrBoard(it, hosts, L, R, n, N))), L); }
  let baseBoard = new Map();
  // unequipped hosts of the same pool give the baseline (equals L for an all-level-L, upkeep-0 pool)
  function boardBase(it, L, n, N) {
    const k = clsKey(it) + "|" + L + "|" + n; let v = baseBoard.get(k);
    if (v == null) { v = eqBoard(null, hostPool(L, it), L, n, N * 2); baseBoard.set(k, v); }
    return v;
  }
  async function itemBoard(it, N, tick) {
    const per = {}, bySize = {}; for (const n of SIZES) bySize[n] = {};
    for (const L of hostLevels(it)) {
      const hs = hostPool(L, it); if (!hs.length) { per[L] = NaN; continue; }
      let s = 0;
      for (const n of SIZES) { const g = eqBoard(it, hs, L, n, N) - boardBase(it, L, n, N); bySize[n][L] = g; s += g; if (tick) await tick(); }
      per[L] = s / SIZES.length;
    }
    const sz = {}; for (const n of SIZES) sz[n] = avgW(bySize[n], it);
    return { per, avg: avgW(per, it), bySize: sz };
  }
  function setBoardBase(obj) { for (const k in obj) baseBoard.set(k, obj[k]); }
  function getBoardBase() { const o = {}; baseBoard.forEach((v, k) => (o[k] = v)); return o; }
  rebuild();
  return { dist, duel, worn, wrVs, wrVsOpp, eqLevel, hostBase, gainOn, itemDuel, itemBoard, avgW, rebuild, hostPool, elig, clsKey,
    get pools() { return pools; }, setBoardBase, getBoardBase,
    clear() { baseEq = new Map(); plainD = new Map(); baseBoard = new Map(); hostCache = new Map(); }, rollU, game };
}
if (typeof module !== "undefined") module.exports = makeEngine;
