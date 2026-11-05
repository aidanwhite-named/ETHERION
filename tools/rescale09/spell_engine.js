// 규칙: 전장 5칸, 마법도 1칸 차지. 마법은 대기열에서 맨 앞이 되는 순간 발동한다 (resolve 참고).
// 유닛은 1번 칸부터 차례로 공격하고, 방어 쪽은 대기열(맨 앞 생존 유닛)이 받아낸다. 살아남으면 반격.
// 피해는 그 턴 안에서만 누적된다. 방어 유닛이 없으면 공격 유닛의 레벨만큼 직접 피해.
(function (root) {
  "use strict";

  // ---------- 난수 (재현 가능) ----------
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return function () {
      s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  }

  // ---------- 유닛 인스턴스 ----------
  function rollCard(c, R) {
    let a = c.a, d = c.d, h = c.h;
    for (const [st, n, v] of c.co) for (let i = 0; i < n; i++) if (R() < 0.5) {
      if (st === "a") a += v; else if (st === "d") d += v; else h += v;
    }
    return { a, d, h: Math.max(1, h) };
  }
  function inst(c, roll, col) {
    return {
      c, lv: c.lv, col,
      base: { a: c.a, d: c.d, h: Math.max(1, c.h) }, // 코인 없는 값 (정화용)
      roll: { a: roll.a, d: roll.d, h: roll.h },
      a: roll.a, d: roll.d, h: roll.h, dmg: 0, alive: true,
      shield: false, thorns: 0, taunt: false, lock: false, rest: false
    };
  }
  const hpLeft = u => u.h - u.dmg;

  // ---------- 피해 ----------
  function hurt(u, x) { // 고정 피해 (방어 무시)
    if (!u.alive || x <= 0) return 0;
    if (u.shield) { u.shield = false; return 0; }
    u.dmg += x;
    if (hpLeft(u) <= 0) u.alive = false;
    return x;
  }
  const hit = (a, d) => (a > d ? a - d : 0);

  // ---------- 범위 ----------
  // side: "foe" 상대 / "ally" 아군 / "both"
  // area: back n = 이 마법 뒤 n칸(칸 번호 k+1..k+n), all = 전장 전체, front n = 상대 대기열 맨 앞 n기,
  //       maxA n = 공격이 가장 높은 n기, behind = 이 마법 바로 뒤의 아군 1기
  function pick(st, caster, side, area, k, cls) {
    const mine = caster === "atk" ? st.att : st.def;
    const theirs = caster === "atk" ? st.def : st.att;
    const pools = side === "foe" ? [theirs] : side === "ally" ? [mine] : [mine, theirs];
    let out = [];
    for (const P of pools) {
      let L = P.filter(u => u.alive && (!cls || u.c.cl === cls));
      if (area.t === "back") L = L.filter(u => u.col > k && u.col <= k + area.n);
      else if (area.t === "front") L = queue(L).slice(0, area.n);
      else if (area.t === "maxA") L = L.slice().sort((x, y) => y.a - x.a || y.lv - x.lv || x.col - y.col).slice(0, area.n);
      else if (area.t === "behind") L = L.filter(u => u.col > k).sort((x, y) => x.col - y.col).slice(0, 1);
      out = out.concat(L);
    }
    return out;
  }
  const queue = L => L.slice().sort((x, y) => (y.taunt - x.taunt) || x.col - y.col);

  // ---------- 마법 효과 ----------
  // op: dmg x | mod {a,d,h} | atk0 | swap | shield | thorns x | taunt | lock | destroy | clean(코인 뒷면) | rest(이번 턴 행동 안 함)
  //     copy (behind 유닛의 공방체를 대상 전원이 복사)
  function coinX(op, R) {
    let x = op.x || 0;
    const fl = Math.floor(x); if (x !== fl) x = fl + (R() < x - fl ? 1 : 0); // 소수 크기는 확률 반올림 (기준 마법 전용)
    if (op.coin) for (let i = 0; i < op.coin[0]; i++) if (R() < 0.5) x += op.coin[1];
    return x;
  }
  function cast(st, sp, caster, k, R, log) {
    const res = { lifeCost: sp.cost && sp.cost.life || 0, lifeGain: sp.gain && sp.gain.life || 0 };
    const ops = sp.ops.filter(o => o.op !== "lock").concat(sp.ops.filter(o => o.op === "lock"));
    for (const op of ops) {
      if (op.op === "copy") {
        const src = pick(st, caster, "ally", { t: "behind" }, k)[0];
        if (!src) continue;
        const sa = src.a, sd = src.d, sh = src.h;
        for (const u of pick(st, caster, op.side || "both", { t: "all" }, k)) {
          u.a = sa; if (!u.lock) u.d = sd; u.h = sh; if (hpLeft(u) <= 0) u.alive = false;
        }
        log && log.push(`[마법] 전장 모든 유닛이 ${src.c.n}의 ${sa}/${sd}/${sh}로 바뀜`);
        continue;
      }
      const T = pick(st, caster, op.side, op.area, k, op.cls);
      const x = coinX(op, R);
      for (const u of T) {
        switch (op.op) {
          case "dmg": hurt(u, x); break;
          case "mod": {
            const f = v => { if (!v) return 0; const fl = Math.floor(v); return v === fl ? v : fl + (R() < v - fl ? 1 : 0); };
            let ma = f(op.a), md = f(op.d), mh = f(op.h);
            if (op.coin) { const c = x; if (op.cs === "d") md += c; else if (op.cs === "h") mh += c; else ma += c; }
            if (ma) u.a = Math.max(0, u.a + ma);
            if (md && !u.lock) u.d += md;
            if (mh) { u.h += mh; if (hpLeft(u) <= 0) u.alive = false; }
            break; }
          case "atk0": if (!op.coin || x > 0) u.a = 0; break;
          case "swap": if (!u.lock) { const t = u.a; u.a = Math.max(0, u.d); u.d = t; } break;
          case "shield": if (!op.coin || x > 0) u.shield = true; break; // 코인이 붙으면 앞면일 때만
          case "thorns": u.thorns += x; break;
          case "taunt": u.taunt = true; break;
          case "lock": u.lock = true; if (u.d < u.roll.d) u.d = u.roll.d; break; // 먼저 깎인 방어는 카드 값으로 되돌리고, 이후 변화를 막는다
          case "destroy": if (!op.coin || x > 0) { u.alive = false; u.dmg = u.h; } break;
          case "clean": { const da = u.a - u.roll.a, dd = u.d - u.roll.d, dh = u.h - u.roll.h;
            u.roll = { a: u.base.a, d: u.base.d, h: u.base.h };
            u.a = Math.max(0, u.base.a + da); if (!u.lock) u.d = u.base.d + dd; u.h = Math.max(1, u.base.h + dh);
            if (hpLeft(u) <= 0) u.alive = false; break; }
          case "rest": u.rest = true; break;
          case "strip": u.shield = false; u.thorns = 0; u.lock = false; u.taunt = false; break; // 보호막·가시·고정·수호를 끈다
        }
      }
      if (log) { const LB = { strip: "강화 해제", dmg: "피해", mod: "스탯 변화", atk0: "공격 0", swap: "공방 교환", shield: "보호막", thorns: "가시", taunt: "수호", lock: "고정", destroy: "파괴", clean: "코인 뒷면", rest: "쉼" };
        const SD = { foe: caster === "atk" ? "방어 쪽" : "공격 쪽", ally: caster === "atk" ? "공격 쪽" : "방어 쪽", both: "양쪽" };
        log.push(`[마법] ${SD[op.side] || ""} ${T.length}기에 ${LB[op.op] || op.op}${(op.op === "dmg" || op.op === "thorns") ? " " + x : ""}${T.length ? ": " + T.map(u => u.c.n).join(", ") : ""}`); }
    }
    return res;
  }

  // ---------- 전투 ----------
  function fight(st, log) {
    let direct = 0;
    const atks = st.att.filter(u => u.alive && !u.rest).sort((x, y) => x.col - y.col);
    for (const A of atks) {
      if (!A.alive) continue;
      const Q = queue(st.def.filter(u => u.alive));
      const D = Q[0];
      if (!D) { direct += A.lv; log && log.push(`${A.c.n} 직접 피해 ${A.lv}`); continue; }
      const dealt = hit(A.a, D.d);
      if (dealt > 0) hurt(D, dealt);
      if (D.thorns) hurt(A, D.thorns);
      if (D.alive && A.alive && !D.rest) hurt(A, hit(D.a, A.d));
      log && log.push(`${A.c.n} → ${D.c.n}: 피해 ${dealt}${D.alive ? `, 남은 체력 ${hpLeft(D)}, 반격` : ", 쓰러짐"}${A.alive ? "" : " · 공격한 유닛도 쓰러짐"}`);
    }
    return direct;
  }

  // ---------- 점수 (시전자 관점) ----------
  // 쓰러뜨린 상대 유닛 레벨 합 − 잃은 내 유닛 레벨 합 + W×(준 직접 피해 − 받은 직접 피해 + 생명 회복 − 생명 대가)
  function score(st, caster, direct, res, W) {
    const lost = L => L.reduce((s, u) => s + (u.alive ? 0 : u.lv), 0);
    const mine = caster === "atk" ? st.att : st.def, theirs = caster === "atk" ? st.def : st.att;
    const dmgSign = caster === "atk" ? 1 : -1;
    return lost(theirs) - lost(mine) + W * (dmgSign * direct + (res ? res.lifeGain - res.lifeCost : 0));
  }

  // ---------- 보드 생성 ----------
  // 내 유닛은 상대적 순서를 지키며 비어 있는 칸을 채운다. 상대 유닛은 5칸 중 무작위 칸.
  function cols(n, R) { const a = [1, 2, 3, 4, 5]; for (let i = 4; i > 0; i--) { const j = (R() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n).sort((x, y) => x - y); }
  function sampleBoard(P, s, myCamp, R, opt) {
    const lvOf = () => { const lo = Math.max(1, s - opt.spread), hi = Math.max(1, s); return lo + ((R() * (hi - lo + 1)) | 0); };
    const nM = opt.nMin + ((R() * (opt.nMax - opt.nMin + 1)) | 0);
    const nF = opt.nMin + ((R() * (opt.nMax - opt.nMin + 1)) | 0);
    const mine = [], foes = [];
    for (let i = 0; i < nM; i++) {
      const L = lvOf(); let p = P.byCampLv[myCamp][L];
      // 클래스 중심 덱: opt.focus = { cls, p } 이면 내 유닛이 p 확률로 그 클래스 (그 레벨에 없으면 진영 전체에서)
      if (opt.focus && R() < opt.focus.p) { const q = P.byCampClsLv[myCamp][opt.focus.cls] && P.byCampClsLv[myCamp][opt.focus.cls][L]; if (q && q.length) p = q; }
      mine.push(p[(R() * p.length) | 0]);
    }
    for (let i = 0; i < nF; i++) { const p = opt.foeCamp ? P.byCampLv[opt.foeCamp][lvOf()] : P.byLv[lvOf()]; foes.push(p[(R() * p.length) | 0]); }
    return { mine, foes, foeCols: cols(nF, R) };
  }

  // 한 칸 k를 비우고 나머지 칸에 내 유닛을 순서대로 채운다
  function layout(cards, k) { const free = [1, 2, 3, 4, 5].filter(c => c !== k); return cards.map((c, i) => [c, free[i]]); }

  function build(b, rolls, myRole, k, extraUnit) {
    const mineCards = extraUnit ? b.mine.slice(0, extraUnit.at).concat([extraUnit.card], b.mine.slice(extraUnit.at)) : b.mine;
    const mine = layout(mineCards, k).map(([c, col], i) => inst(c, rolls.mine[i] || rolls.extra, col));
    const foes = b.foes.map((c, i) => inst(c, rolls.foes[i], b.foeCols[i]));
    return myRole === "atk" ? { att: mine, def: foes } : { att: foes, def: mine };
  }
  const baseRoll = c => ({ a: c.a, d: c.d, h: Math.max(1, c.h) });

  // 마법 1장을 넣은 결과 − 넣지 않은 결과 (같은 코인 결과로 비교)
  // ---------- 한 턴 처리: 마법은 대기열의 한 자리 ----------
  // mine/opp: { sp, k } (k = 마법이 놓인 칸). 발동 시점:
  //  - 앞에 유닛이 없는 마법은 전투 전에 발동 (양쪽이면 공격 마법 먼저)
  //  - 방어 쪽: 앞 칸의 방어 유닛이 모두 쓰러지는 순간 발동
  //  - 공격 쪽: 앞 칸의 공격 유닛이 모두 공격을 마치면(쓰러졌든 살았든) 발동
  //  - 끝까지 앞이 막힌 마법은 유닛 전투가 끝난 뒤 발동 (그 턴의 피해는 아직 남아 있다)
  //  - 같은 때 준비되면 공격 마법 → 방어 마법, 같은 쪽이면 칸 번호 순
  function resolve(st, role, mine, opp, seedM, seedO, log) {
    const other = role === "atk" ? "def" : "atk";
    const pend = [];
    if (mine) pend.push({ sp: mine.sp, who: role, k: mine.k, R: rng(seedM) });
    if (opp) pend.push({ sp: opp.sp, who: other, k: opp.k, R: rng(seedO) });
    let res = null; const acted = new Set();
    const ready = p => p.who === "atk"
      ? st.att.every(u => u.col >= p.k || acted.has(u) || !u.alive)
      : !st.def.some(u => u.alive && u.col < p.k);
    const fire = all => {
      for (;;) {
        let p = null;
        for (const w of ["atk", "def"]) {
          const L = pend.filter(q => q.who === w && (all || ready(q))).sort((a, b) => a.k - b.k);
          if (L.length) { p = L[0]; break; }
        }
        if (!p) return;
        pend.splice(pend.indexOf(p), 1);
        log && log.push(`▶ ${p.who === "atk" ? "공격" : "방어"} 마법 발동 (${p.k}번 칸${all ? ", 전투 뒤" : ""})${p.sp.name ? ": " + p.sp.name : ""}`);
        const r = cast(st, p.sp, p.who, p.k, p.R, log);
        if (p.who === role) res = r;
      }
    };
    let direct = 0;
    fire(false);
    const atks = st.att.slice().sort((x, y) => x.col - y.col);
    for (const A of atks) {
      if (A.alive && !A.rest) {
        const D = queue(st.def.filter(u => u.alive))[0];
        if (!D) { direct += A.lv; log && log.push(`${A.c.n} 직접 피해 ${A.lv}`); }
        else {
          const dealt = hit(A.a, D.d);
          if (dealt > 0) hurt(D, dealt);
          if (D.thorns) hurt(A, D.thorns);
          if (D.alive && A.alive && !D.rest) hurt(A, hit(D.a, A.d));
          log && log.push(`${A.c.n} → ${D.c.n}: 피해 ${dealt}${D.alive ? `, 남은 체력 ${hpLeft(D)}, 반격` : ", 쓰러짐"}${A.alive ? "" : " · 공격한 유닛도 쓰러짐"}`);
        }
      }
      acted.add(A);
      fire(false);
    }
    fire(true);
    return { res, direct };
  }
  function oppSlot(b, opp, role, noCoin, R) {
    const free = [1, 2, 3, 4, 5].filter(c => !b.foeCols.includes(c));
    let best = free[0], bv = -1e9; const seed = (R() * 1e9) | 0;
    for (const k of free) {
      const st = build(b, noCoin, role, 6);
      const o = resolve(st, role, null, { sp: opp, k }, 0, seed);
      const v = -score(st, role, o.direct, null, W0);
      if (v > bv) { bv = v; best = k; }
    }
    return best;
  }
  const W0 = 0.5;
  function evalSpellOnce(b, sp, role, R, W, oppSp) {
    const rolls = { mine: b.mine.map(c => rollCard(c, R)), foes: b.foes.map(c => rollCard(c, R)) };
    const noCoin = { mine: b.mine.map(baseRoll), foes: b.foes.map(baseRoll) };
    const opp = oppSp ? { sp: oppSp, k: oppSlot(b, oppSp, role, noCoin, R) } : null;
    // 배치: 코인 없는 카드 값으로 가장 좋은 칸을 고른다 (마법은 뒷면이라 상대는 모르고 배치한다)
    const seed = (R() * 1e9) | 0;
    let bestK = 1, bestV = -1e9;
    for (let k = 1; k <= 5; k++) {
      const st = build(b, noCoin, role, k);
      const o = resolve(st, role, { sp, k }, null, seed, 0);
      const v = score(st, role, o.direct, o.res, W);
      if (v > bestV) { bestV = v; bestK = k; }
    }
    const sM = (R() * 1e9) | 0, sO = (R() * 1e9) | 0;
    const st0 = build(b, rolls, role, 6);
    const o0 = resolve(st0, role, null, opp, sM, sO);
    const v0 = score(st0, role, o0.direct, null, W);
    const st1 = build(b, rolls, role, bestK);
    const o1 = resolve(st1, role, { sp, k: bestK }, opp, sM, sO);
    const v1 = score(st1, role, o1.direct, o1.res, W);
    return v1 - v0;
  }

  // 유닛 1장을 더 넣은 결과 − 넣지 않은 결과 (가장 좋은 순서에 끼워 넣음)
  function evalUnitOnce(b, card, role, R, W) {
    const rolls = { mine: b.mine.map(c => rollCard(c, R)), foes: b.foes.map(c => rollCard(c, R)), extra: null };
    const xr = rollCard(card, R);
    let bestAt = 0, bestV = -1e9;
    const noCoin = { mine: b.mine.map(baseRoll), foes: b.foes.map(baseRoll), extra: null };
    for (let at = 0; at <= b.mine.length; at++) {
      const r = { mine: noCoin.mine.slice(0, at).concat([baseRoll(card)], noCoin.mine.slice(at)), foes: noCoin.foes };
      const st = build(b, r, role, 6, { at, card });
      const v = score(st, role, fight(st), null, W);
      if (v > bestV) { bestV = v; bestAt = at; }
    }
    const st0 = build(b, rolls, role, 6);
    const v0 = score(st0, role, fight(st0), null, W);
    const r1 = { mine: rolls.mine.slice(0, bestAt).concat([xr], rolls.mine.slice(bestAt)), foes: rolls.foes };
    const st1 = build(b, r1, role, 6, { at: bestAt, card });
    const v1 = score(st1, role, fight(st1), null, W);
    return v1 - v0;
  }

  // withUpkeep: 유지비 카드도 판에 넣는다 (점수는 카드에 적힌 레벨로 센다)
  function pools(units, withUpkeep) {
    const P = { byLv: {}, byCampLv: { B: {}, G: {}, A: {} }, byCampClsLv: { B: {}, G: {}, A: {} } };
    for (const c of units) {
      if (c.up !== 0 && !withUpkeep) continue;
      (P.byLv[c.lv] = P.byLv[c.lv] || []).push(c);
      const cp = c.f[0];
      (P.byCampLv[cp][c.lv] = P.byCampLv[cp][c.lv] || []).push(c);
      if (c.cl) { const m = P.byCampClsLv[cp][c.cl] = P.byCampClsLv[cp][c.cl] || {}; (m[c.lv] = m[c.lv] || []).push(c); }
    }
    return P;
  }

  // 단계 s에서 레벨 ℓ 유닛을 넣었을 때의 기대 이득 (ℓ = 1..8)
  function unitCurve(P, s, camp, role, N, opt, seed) {
    const R = rng(seed), out = [];
    for (let L = 1; L <= 8; L++) {
      let t = 0; const pool = P.byCampLv[camp][L];
      for (let i = 0; i < N; i++) { const b = sampleBoard(P, s, camp, R, opt); if (b.mine.length > 4) b.mine.pop(); t += evalUnitOnce(b, pool[(R() * pool.length) | 0], role, R, opt.W); }
      out.push(t / N);
    }
    return out;
  }
  // oppPool: 상대가 쓸 수 있는 반대 역할 마법 목록. 표본마다 opt.pVs 확률로 그중 하나를 상대가 쓴다.
  function spellGain(P, sp, s, camp, role, N, opt, seed, oppPool) {
    const R = rng(seed); let t = 0;
    for (let i = 0; i < N; i++) {
      const b = sampleBoard(P, s, camp, R, opt); if (b.mine.length > 4) b.mine.pop();
      const o = oppPool && oppPool.length && R() < opt.pVs ? oppPool[(R() * oppPool.length) | 0] : null;
      t += evalSpellOnce(b, sp, role, R, opt.W, o);
    }
    return t / N;
  }
  // 이득 g를 유닛 곡선(×비율 r)으로 되돌려 레벨로 환산
  function toLevel(curve, r, g) {
    const T = curve.map(v => v * r);
    if (g <= T[0]) { const s = Math.max(1e-6, T[1] - T[0]); return 1 + (g - T[0]) / s; }
    for (let i = 0; i < 7; i++) if (g <= T[i + 1]) return i + 1 + (g - T[i]) / Math.max(1e-6, T[i + 1] - T[i]);
    const s = Math.max(1e-6, T[7] - T[6]); return 8 + (g - T[7]) / s;
  }

  // ---------- 기준 마법 (잣대) ----------
  // 유닛 카드 v0.1 레벨별 평균 내구(체력+방어). 기준 마법의 수치를 이 비율로 늘리고 줄인다.
  const DUR = [3.2, 4.6, 5.7, 6.9, 8.6, 10.4, 12.4, 14.6];
  function refSpell(kind, L) {
    if (kind === "atk") { const k = DUR[L - 1] / DUR[1];
      return { ops: [{ op: "dmg", side: "foe", area: { t: "back", n: 3 }, x: 2 * k }] }; }
    const k = DUR[L - 1] / DUR[2];
    return { ops: [{ op: "dmg", side: "foe", area: { t: "back", n: 3 }, x: 2 * k }, { op: "mod", side: "ally", area: { t: "back", n: 3 }, d: 1 * k }] };
  }
  // 단계 s에서 레벨 1..8 기준 마법의 이득
  function refCurve(P, s, camp, kind, N, opt, seed, oppPool) {
    const out = []; for (let L = 1; L <= 8; L++) out.push(spellGain(P, refSpell(kind, L), s, camp, kind, N, opt, seed, oppPool)); return out;
  }

  const API = { resolve, oppSlot, DUR, refSpell, refCurve, rng, rollCard, inst, cast, fight, score, sampleBoard, build, evalSpellOnce, evalUnitOnce, pools, unitCurve, spellGain, toLevel, queue, hpLeft };
  if (typeof module !== "undefined") module.exports = API; else root.MagicEngine = API;
})(this);
