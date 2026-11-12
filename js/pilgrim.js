/* ETHERION — 성로 순례 (v3.25, v3.26)
   하루에 한 번 길이 열린다. 린데어 환석에서 떠나 성로의 여덟 관문(내 깃발을 뺀 여덟 깃발)을 차례로 지나 아홉 번째, 망각의 숲에서 내 덱을 든 "비친 나"와 싸운다.
   - 하루 최대 PILGRIM.fights판(12 = 아홉 관문 + 다시 도전 3번). 이겨야 다음 관문으로 간다. 지면 같은 관문에 다시(그 판도 하루 판 수에 든다). 판은 시작할 때 센다.
   - 상대는 컴퓨터 '어려움'. 덱은 내 덱 점수에 맞춰 그 자리에서 꾸민다(js/aideck.js aiDeckFor, 관문마다 PILGRIM.scale). 숲의 상대는 내 깃발 덱을 내 덱 점수의 PILGRIM.forestScale(105%)로 꾸민 "비친 나"(v3.35, 예전에는 내 덱 그대로).
   - 보상: ① 그날 첫 승 = 큰 조각(first). 그대로 받거나, 걸고 카드 한 장(꽝 없음 — 일반 80% … 유니크, 스페셜은 없음). 계정당 하루 한 번.
           v3.26 실제로 주는 곳은 Store.pilgrimClaim(js/pilgrim-rules.js) 하나. 서버로 열면 서버가 서버 시계로 날짜를 검사한다.
           ② 판마다 전투 정산은 보통의 battleRate배(작은 조각). 컴퓨터와 대전의 "이기면 카드 1장"은 없다.
           ③ 아홉째(숲)를 이기면 완주 보너스(done).
           ④ 한 주(수요일에 리셋) 동안 첫 승을 한 날 = 걸음. 3 · 5 · 7걸음에 이정표 보상.
   - 이야기(v3.26 순례기): 관문을 처음 지나면 그 깃발의 소문이 순례기에 영원히 남는다(u.pilgrim.lore). 소문 여덟 + 숲을 지나면 "동쪽의 기록"이 열린다.
     지난 주의 걸음과 기억은 u.pilgrim.book에 쌓인다. 화면은 두 탭: 오늘의 길(지도 + 관문) · 순례기.
   - 관문은 깃발에 묶이지 않는다: 판마다 대기실에서 고른 깃발의 저장된 덱으로 싸운다.
   - 길의 날짜(관문 · 판 수)는 이 기기의 시계. 첫 승 보상만 서버가 다시 확인한다.
   - 점수 구간별 승패를 u.pilgrim.stats에 남긴다. 콘솔에서 Pilgrim.report().
   저장: Store user.pilgrim (기기가 정하는 칸). 수치는 js/pilgrim-rules.js의 PILGRIM, 글은 js/pilgrimtext.js. */
"use strict";

/* ---------- 길 ---------- */
/* 오늘의 길: 다른 두 진영의 여섯 깃발(섞어서) → 내 진영의 나머지 두 깃발(섞어서). 씨앗이 같으면 같은 길 */
function pilRoute(g, seed) {
  const rnd = mulberry32(seed >>> 0), F = GROUPS[g].faction;
  const sh = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  return sh(GROUP_IDS.filter(x => GROUPS[x].faction !== F)).concat(sh(FACTIONS[F].groups.filter(x => x !== g)));
}
/* 두 진영 사이: kin 같은 진영 · war 아다만트 ↔ 푸른숲 · friend 푸른숲 ↔ 비술 · cold 아다만트 ↔ 비술 (docs/WORLD.md 6장) */
function pilRelation(a, b) {
  if (a === b) return "kin";
  const k = [a, b].sort().join("+");
  return k === "brass+verdant" ? "war" : k === "arcane+verdant" ? "friend" : "cold";
}

const Pilgrim = {
  now: () => Date.now(),
  fresh() { return { week: "", weekN: 0, steps: 0, claimed: [], day: "", start: null, route: null, seed: 0, stage: 0, fights: 0, first: false, pend: null, firstResult: null, cur: null, last: null, news: [], stats: {}, lore: {}, book: [], tot: { days: 0, done: 0, rolls: 0, grades: {} } }; },
  chapter(n) { const C = PILGRIM_TEXT.chapters; return C[((n || 0) % C.length + C.length) % C.length]; },
  /* 오늘의 순례 상태. 날이 바뀌었으면 새 길, 수요일을 넘겼으면 새 주 (싸우는 중에는 넘기지 않는다) */
  get() {
    const u = Store.user(); if (!u) return null;
    let p = u.pilgrim, ch = false;
    if (!p) { p = u.pilgrim = this.fresh(); ch = true; }
    if (!p.lore) { p.lore = {}; ch = true; }
    if (!p.book) { p.book = []; ch = true; }
    if (!p.tot.grades) p.tot.grades = {};
    if (p.route && p.day) for (let i = 0; i < Math.min(p.stage, p.route.length); i++) if (!p.lore[p.route[i]]) { p.lore[p.route[i]] = p.day; ch = true; }   // v3.25에 오늘 이미 지난 관문
    const t = this.now(), day = pilDayKey(t), week = pilWeekKey(t);
    if (p.cur && t - p.cur.at > 3 * 3600e3) { p.cur = null; ch = true; }   // 끝내지 못한 판(창을 닫음)이 길을 막지 않게
    if (!p.cur) {
      if (p.day !== day) {
        if (p.pend) this._claim(u, p, "keep");   // 고르지 않고 넘긴 첫 승 보상은 조각으로
        Object.assign(p, { day, start: null, route: null, seed: 0, stage: 0, fights: 0, first: false, pend: null, firstResult: null, last: null, news: [] });
        ch = true;
      }
      if (p.week !== week) {
        if (p.week && p.steps > 0) { p.book.unshift({ week: p.week, n: p.weekN || 0, steps: p.steps }); if (p.book.length > 26) p.book.length = 26; }   // 지난 주의 걸음은 순례기로
        if (p.week) p.weekN = (p.weekN || 0) + 1;
        p.week = week; p.steps = 0; p.claimed = []; ch = true;
      }
    }
    if (ch) Store.save();
    return p;
  },
  /* 순례 화면에 돌아왔는데 판이 걸려 있으면(전투 중에 나감) 그 판은 진 것으로 둔다 — 판 수는 이미 셌다 */
  dropCur() { const u = Store.user(), p = u && u.pilgrim; if (p && p.cur) { p.last = { stage: p.cur.stage, won: false, left: true }; this._stat(p, p.cur, false); p.cur = null; Store.save(); } },
  left(p) { return Math.max(0, PILGRIM.fights - p.fights); },
  canFight(p) { return !!p && !p.pend && p.stage < PILGRIM.gates && p.fights < PILGRIM.fights; },
  /* 지금 설 관문: { kind: "flag", g } 또는 { kind: "forest" }. 길은 첫 판을 시작할 때 정해진다 */
  node(p, i) { i = i == null ? p.stage : i; return p.route && i < p.route.length ? { kind: "flag", g: p.route[i] } : i < PILGRIM.gates - 1 ? { kind: "unknown" } : { kind: "forest" }; },
  /* 순례기: 들은 소문 수(깃발) · 동쪽의 기록이 열렸나 */
  heard(p) { return GROUP_IDS.filter(g => p.lore && p.lore[g]).length; },
  /* 한 판 시작: 판 수를 세고 대전 설정을 돌려준다 (못 싸우면 null) */
  begin(f) {
    const u = Store.user(), p = this.get();
    if (!this.canFight(p) || !Store.deckPlayable(u, f)) return null;
    if (!p.route) { p.start = f; p.seed = (Math.random() * 1e9) >>> 0; p.route = pilRoute(f, p.seed); }
    const cards = Object.assign({}, Store.deck(u, f).cards);
    const ratio = deckScore(cards).total / deckScore(STARTER_DECKS[f]).total;
    let p1;
    if (p.stage < p.route.length) {
      const og = p.route[p.stage];
      const d = aiDeckFor(og, f, cards, { scale: PILGRIM.scale[p.stage] || 1, seed: p.seed + p.stage * 101 });   // 같은 관문에 다시 도전하면 같은 상대
      p1 = { name: GROUPS[og].ai, group: og, cards: d.cards, isAI: true, ai: PILGRIM.ai };
    } else {   // v3.35 숲: 내 깃발로, 내 덱 점수의 105% (같은 날 다시 도전하면 같은 덱)
      const d = aiDeckFor(f, f, cards, { scale: PILGRIM.forestScale || 1, seed: p.seed + 9 * 101 });
      p1 = { name: PILGRIM_TEXT.forest.who, group: f, cards: d.cards, isAI: true, ai: PILGRIM.ai };
    }
    p.fights++;
    p.cur = { stage: p.stage, f, ratio: Math.round(ratio * 1000) / 1000, at: this.now() };
    Store.save();
    return { mode: "ai", pil: true, econRate: PILGRIM.battleRate, p0: { name: u.id, group: f, cards }, p1 };
  },
  _stat(p, c, won) {
    const k = (Math.round(c.ratio * 20) / 20).toFixed(2) + ":" + c.stage;
    const s = p.stats[k] = p.stats[k] || [0, 0]; s[won ? 0 : 1]++;
  },
  /* 경기 끝 (screens.js onMatchEnd가 부른다) */
  onEnd(g) {
    const u = Store.user(), p = u && u.pilgrim; if (!p || !p.cur) return;
    const c = p.cur, won = g.winner === 0; p.cur = null;
    this._stat(p, c, won);
    p.last = { stage: c.stage, won };
    if (won) {
      this._lore(p, c.stage);
      p.stage = c.stage + 1;
      if (!p.first) {   // 그날 첫 승: 큰 보상(고르기 전까지 pend) + 이번 주의 한 걸음
        p.first = true; p.pend = { gold: PILGRIM.first };
        p.tot.days++; p.steps = Math.min(7, (p.steps || 0) + 1);
        this._milestone(u, p);
      }
      if (p.stage >= PILGRIM.gates) { p.tot.done++; p.news.push({ k: "done", gold: PILGRIM.done }); Store.addGold(u, PILGRIM.done, "순례 완주"); }
    }
    Store.save();
  },
  /* 관문을 처음 지나면 그 깃발의 소문이 순례기에 남는다. 소문 여덟 + 숲 = 동쪽의 기록 */
  _lore(p, stage) {
    const n = this.node(p, stage), L = p.lore = p.lore || {};
    if (n.kind === "flag" && !L[n.g]) { L[n.g] = p.day; p.news.push({ k: "lore", g: n.g }); }
    if (n.kind === "forest" && !L.forest) L.forest = p.day;
    if (!L.truth && L.forest && this.heard(p) >= PILGRIM_TEXT.truth.need) { L.truth = p.day; p.news.push({ k: "truth" }); }
  },
  _milestone(u, p) {
    const n = p.steps, m = PILGRIM.steps[n]; if (!m || p.claimed.includes(n)) return;
    p.claimed.push(n);
    if (m.gold) { p.news.push({ k: "step", n, gold: m.gold }); Store.addGold(u, m.gold, "순례 이정표"); }
    if (m.card) { const grade = pilRollGrade(m.card) || Object.keys(m.card).pop(); const r = pilPickCard(u, grade); p.news.push({ k: "step", n, card: r.id, grade, gold: r.gold }); }
  },
  _card(u, grade) { return pilPickCard(u, grade); },   // 예전 이름 (v3.25)
  /* 첫 승 보상을 실제로 받는다. 서버로 열면 서버가 날짜를 확인한다.
     거절(이미 받은 날 · 기기 날짜가 서버와 다름)이면 보상은 사라지고 이유가 남는다. 서버에 닿지 않으면 그대로 두어 다시 누를 수 있다 */
  _claim(u, p, choice) {
    let r;
    try { r = Store.pilgrimClaim(u, choice, p.day); } catch (e) { console.error(e); r = null; }
    r = r || { ok: false, net: true, msg: "서버가 답하지 않습니다. 잠시 뒤 다시 눌러 주세요." };
    if (r.ok) {
      p.pend = null;
      if (r.k === "card") { p.tot.rolls = (p.tot.rolls || 0) + 1; p.tot.grades[r.grade] = (p.tot.grades[r.grade] || 0) + 1; p.firstResult = { k: "card", id: r.id, grade: r.grade, gold: r.gold, stake: r.stake }; }
      else p.firstResult = { k: "gold", gold: r.gold };
    } else if (r.dup || r.clock) { p.pend = null; p.firstResult = { k: "denied", msg: r.msg }; }
    Store.save();
    return r;
  },
  /* 첫 승 보상을 그대로 받는다 / 걸고 카드 한 장 */
  keep() { const u = Store.user(), p = this.get(); if (!p || !p.pend) return p && p.firstResult; const r = this._claim(u, p, "keep"); return r.ok ? p.firstResult : r; },
  gamble() { const u = Store.user(), p = this.get(); if (!p || !p.pend) return null; const r = this._claim(u, p, "gamble"); return r.ok ? p.firstResult : r; },
  /* 이 기기에 있는 모든 모험가의 점수 구간별 승패 (콘솔: Pilgrim.report()) */
  report() {
    const out = {};
    for (const id in Store.data.users) { const s = (Store.data.users[id].pilgrim || {}).stats || {}; for (const k in s) { const o = out[k] = out[k] || [0, 0]; o[0] += s[k][0]; o[1] += s[k][1]; } }
    const rows = Object.keys(out).sort().map(k => { const [band, st] = k.split(":"), [w, l] = out[k]; return { "덱 비율": band, "관문": +st + 1, 승: w, 패: l, "승률%": Math.round(w / (w + l) * 100) }; });
    if (typeof console !== "undefined" && console.table) console.table(rows);
    return rows;
  }
};

/* ---------- 지도: 카일란 대륙 위의 오늘의 길 (v3.26) ----------
   바탕은 숨겨진 기록의 지도(js/kailan.js mapSVG, 지점 · 이름 없이)를 그대로 쓰고, 그 위에 린데어 환석 → 여덟 관문 → 망각의 숲을 잇는다.
   도시 좌표는 지도(Kailan.places)에서 읽는다. 지도 파일이 없으면 아래 PIL_AT. 숲의 자리는 PILGRIM_TEXT.forest.at */
const PIL_AT = { B1: [455, 372], B2: [215, 365], B3: [362, 236], G1: [505, 700], G2: [360, 575], G3: [338, 781], A1: [784, 566], A2: [765, 405], A3: [812, 262], hub: [652, 746] };
let pilBase = null;
function pilAt(k) {
  if (k === "forest") return PILGRIM_TEXT.forest.at;
  const P = typeof Kailan !== "undefined" && Kailan.places;
  if (P) { const o = k === "hub" ? P.find(x => x.id === "p_linde") : P.find(x => x.g === k && x.t !== "region"); if (o) return [o.x, o.y]; }
  return PIL_AT[k];
}
function pilMapHTML(p, f) {
  if (pilBase == null) { try { pilBase = typeof Kailan !== "undefined" && Kailan.mapSVG ? Kailan.mapSVG() : ""; } catch (e) { console.error(e); pilBase = ""; } }
  const TX = PILGRIM_TEXT, n1 = v => Math.round(v * 10) / 10, route = p.route || [];
  const keys = ["hub"].concat(route, route.length ? ["forest"] : []);
  const pts = keys.map(pilAt), can = Pilgrim.canFight(p), o = [];
  /* 길: 지난 길은 금빛, 다음 길은 깜빡이는 점선, 남은 길은 흐린 점선 */
  for (let i = 0; i + 1 < pts.length; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy) || 1;
    const off = Math.min(70, d * 0.2) * (i % 2 ? 1 : -1), cx = (x0 + x1) / 2 - dy / d * off, cy = (y0 + y1) / 2 + dx / d * off;
    const st = i < p.stage ? "done" : i === p.stage && can ? "next" : "todo";
    o.push(`<path class="pgm-leg ${st}" d="M${n1(x0)},${n1(y0)}Q${n1(cx)},${n1(cy)} ${n1(x1)},${n1(y1)}"/>`);
  }
  /* 출발: 린데어 환석 */
  const [hx, hy] = pilAt("hub");
  o.push(`<g class="pgm-hub" transform="translate(${hx} ${hy})"><circle r="10"/><circle r="3.6" class="c"/><text class="pgm-nm" y="30">${esc(TX.hub)}</text></g>`);
  /* 관문 */
  if (route.length) route.forEach((g, i) => {
    const [x, y] = pts[i + 1], O = GROUPS[g], st = i < p.stage ? " done" : i === p.stage && can ? " cur" : "";
    o.push(`<g class="pgm-node${st}" style="--gc:${O.color}" transform="translate(${x} ${y})"><circle class="ring" r="19"/><circle class="dot" r="12.5"/><text class="num" y="5">${i + 1}</text><text class="pgm-nm" y="38">${esc(O.name)}</text></g>`);
  });
  else GROUP_IDS.filter(g => g !== f).forEach(g => { const [x, y] = pilAt(g); o.push(`<g class="pgm-node idle" style="--gc:${GROUPS[g].color}" transform="translate(${x} ${y})"><circle class="dot" r="9"/><text class="pgm-nm" y="30">${esc(GROUPS[g].name)}</text></g>`); });
  /* 망각의 숲 */
  const [fx, fy] = pilAt("forest"), fst = p.stage >= PILGRIM.gates ? " done" : p.stage === PILGRIM.gates - 1 && can ? " cur" : "";
  o.push(`<g class="pgm-forest${fst}" transform="translate(${fx} ${fy})"><circle class="ring" r="24"/><circle class="dot" r="15"/><text class="num" y="6">?</text><text class="pgm-nm" y="44">${esc(TX.forest.name)}</text></g>`);
  /* 지금 서 있는 곳 */
  const [mx, my] = pts[Math.min(p.stage, pts.length - 1)] || [hx, hy];
  o.push(`<g class="pgm-me" transform="translate(${mx} ${my - 30})"><path d="M0,-9L7,0L0,9L-7,0Z"/></g>`);
  const passed = Math.min(p.stage, PILGRIM.gates - 1);
  return `<figure class="pg-map">
    <svg class="pg-map-svg" viewBox="150 170 900 660" role="img" aria-label="오늘의 순례길 지도"><g class="pgm-base">${pilBase}</g>${o.join("")}</svg>
    <figcaption>${route.length ? `${esc(TX.hub)}에서 성로를 따라 · 관문 <b>${passed}</b> / ${PILGRIM.gates - 1}${p.stage >= PILGRIM.gates ? " · 숲을 지났습니다" : ""}` : "첫 판을 시작하면 오늘의 길이 지도에 그려집니다."}</figcaption></figure>`;
}

/* ---------- 순례기: 들은 소문 · 숲 · 동쪽의 기록 · 걸어온 주 · 기록 ---------- */
function pilBookHTML(p) {
  const TX = PILGRIM_TEXT, L = p.lore || {}, heard = Pilgrim.heard(p);
  const gradeName = g => GRADES[g] ? GRADES[g].name : g;
  const lore = GROUP_IDS.map(g => {
    const O = GROUPS[g], d = L[g];
    return d ? `<li class="on" style="--gc:${O.color}">${groupEmblem(g)}<div><b>${esc(TX.flags[g].place)}</b><small>${esc(O.ai)} · ${d}</small><p>${esc(TX.flags[g].rumor)}</p></div></li>`
      : `<li style="--gc:#6b6f80"><span class="emblem void">?</span><div><b>${esc(TX.flags[g].place)}</b><small>아직 듣지 못한 소문</small><p class="pg-redact"><i></i><i style="width:55%"></i></p></div></li>`;
  }).join("");
  const truth = L.truth
    ? `<div class="pg-truth"><h4>${esc(TX.truth.title)}</h4>${TX.truth.body.map(t => `<p>${esc(t)}</p>`).join("")}<p class="muted small">${esc(TX.truth.after)}</p></div>`
    : `<p class="pg-locked">🔒 ${esc(TX.truth.title)} — 소문 <b>${TX.truth.need}</b>개를 모으고 망각의 숲을 지나면 열립니다. <span>(소문 ${heard} · 숲 ${L.forest ? "지남" : "아직"})</span></p>`;
  const weekHTML = (w, steps, n, open) => {
    const ch = Pilgrim.chapter(n), mem = ch.memories.slice(0, steps).map((t, i) => `<li><b>${i + 1}</b><span>${esc(t)}</span></li>`).join("");
    return `<details class="pg-wk"${open ? " open" : ""}><summary><b>${esc(ch.title)}</b><span>${w} 주 · ${steps} / 7걸음</span></summary>${mem ? `<ol class="pg-mem">${mem}</ol>` : '<p class="muted small">아직 걸음이 없습니다.</p>'}</details>`;
  };
  const weeks = weekHTML(p.week, p.steps, p.weekN, true) + (p.book || []).map(b => weekHTML(b.week, b.steps, b.n, false)).join("");
  const T = p.tot || {}, gr = T.grades || {};
  const rolls = Object.keys(GRADES).filter(g => gr[g]).map(g => `<span class="grade-${g}">${gradeName(g)} ${gr[g]}</span>`).join(" ");
  return `<div class="pg-book">
    <section class="pg-sec"><h3>들은 소문 <small>${heard} / ${GROUP_IDS.length}</small></h3>
      <p class="muted small">관문을 처음 지나면 그 깃발의 수문장이 동쪽 이야기를 한 조각 들려줍니다. 내 깃발의 소문은 다른 깃발 덱으로 길을 열어야 들을 수 있습니다.</p>
      <ol class="pg-lore">${lore}</ol></section>
    <section class="pg-sec"><h3>${esc(TX.forest.name)} <small>${esc(TX.forest.place)}</small></h3>
      ${L.forest ? `<p class="pg-say">${esc(TX.forest.win)}</p><p class="muted small">처음 지난 날 ${L.forest}</p>` : `<p class="muted">아직 숲을 지나지 못했습니다. 여덟 관문을 모두 지나면 숲 앞에 섭니다.</p>`}
      ${truth}</section>
    <section class="pg-sec"><h3>걸어온 주 <small>그날 첫 승 = 한 걸음 · 수요일에 새 주</small></h3>${weeks}</section>
    <section class="pg-sec"><h3>순례 기록</h3>
      <dl class="pg-rec"><div><dt>첫 승을 한 날</dt><dd>${T.days || 0}</dd></div><div><dt>완주</dt><dd>${T.done || 0}</dd></div><div><dt>카드 뽑기</dt><dd>${T.rolls || 0}</dd></div><div><dt>들은 소문</dt><dd>${heard}</dd></div></dl>
      ${rolls ? `<p class="pg-rolls">${rolls}</p>` : ""}</section>
  </div>`;
}

/* ---------- 화면 ---------- */
function pilUntil(ms) { const m = Math.max(1, Math.ceil(ms / 60000)); return m >= 60 ? `${Math.floor(m / 60)}시간 ${m % 60}분` : `${m}분`; }
const pilPct = x => +(x * 100).toFixed(1) + "%";
function showPilgrim(f) {
  Store.ensureOpen();
  const u = Store.user(); if (!u) return showLogin();
  App.screen = "pilgrim"; Bg.set("calm");
  Pilgrim.dropCur();
  const p = Pilgrim.get(), TX = PILGRIM_TEXT, tab = App.pilTab === "book" ? "book" : "road";
  f = f || App.lobbyGroup || p.start || u.group;
  const G_ = GROUPS[f], FA = FACTIONS[G_.faction];
  const playable = Store.deckPlayable(u, f);
  const now = new Date(Pilgrim.now()), midnight = new Date(now); midnight.setHours(24, 0, 0, 0);
  const daysToWeek = ((PILGRIM.resetDow - now.getDay() + 7) % 7) || 7;
  const gradeName = g => GRADES[g] ? GRADES[g].name : g;
  const cardBox = id => (id && CARDS[id] ? `<div class="pg-cardbox">${cardHTML(CARDS[id], { size: "md" })}</div>` : "");
  const server = typeof Net !== "undefined" && Net.on;

  /* 길: 여덟 관문 + 숲 */
  const nodeHTML = i => {
    const n = Pilgrim.node(p, i);
    const st = i < p.stage ? " done" : i === p.stage && Pilgrim.canFight(p) ? " cur" : "";
    const road = i < PILGRIM.gates - 1 ? '<i class="xp-road"></i>' : "";
    /* v3.33 관문 = 아치 문: 꼭대기 쐐기 마름모(번호) · 안쪽 깃발 빛 · 큰 문양 · 지난 관문은 금 봉인 */
    const arch = (inner, mark) => `<span class="pg-arch"><span class="pg-key"><i>${mark}</i></span>${inner}${i < p.stage ? '<span class="pg-seal">✓</span>' : ""}${st === " cur" ? '<span class="pg-now">지금</span>' : ""}</span>`;
    if (n.kind === "flag") { const O = GROUPS[n.g]; return `<li class="xp-node pg-gate${st}" style="--gc:${O.color}">${arch(groupEmblem(n.g), i + 1)}<b>${esc(O.name)}</b><small>${esc(TX.flags[n.g].place.replace(/의 관문$| 관문$/, ""))}</small>${road}</li>`; }
    if (n.kind === "forest") return `<li class="xp-node pg-gate pg-forest${st}" style="--gc:#8d86a8">${arch('<span class="emblem void">?</span>', "✦")}<b>${esc(TX.forest.name)}</b><small>${esc(TX.forest.who)}</small></li>`;
    return `<li class="xp-node pg-gate pg-unknown" style="--gc:#6b6f80">${arch('<span class="emblem void">·</span>', i + 1)}<b>관문</b><small>${i + 1}번째</small>${road}</li>`;
  };
  /* 한 주의 걸음 */
  const chap = Pilgrim.chapter(p.weekN);
  const stepHTML = n => {
    const m = PILGRIM.steps[n], on = n <= p.steps;
    const tip = m ? (m.gold ? fmtGold(m.gold) : m.card && m.card.uncommon ? "고급 카드 1장" : "레어 이상 카드 1장") : "";
    return `<li class="pg-step${on ? " on" : ""}${m ? " mile" : ""}" title="${n}걸음${tip ? " · " + tip : ""}"><i></i>${m ? `<small>${tip}</small>` : ""}</li>`;
  };
  const lastMem = p.steps ? chap.memories[Math.min(p.steps, chap.memories.length) - 1] : "";

  /* 방금 일어난 일: 지난 판의 말 · 새 소문 · 이정표 · 완주 · 첫 승 보상의 결과 */
  const notes = [];
  if (p.last && p.route) {
    const ln = Pilgrim.node(p, p.last.stage);
    if (ln.kind === "flag") notes.push(p.last.won ? `<p class="pg-say"><b>${esc(GROUPS[ln.g].ai)}</b>${esc(TX.flags[ln.g].rumor)}</p>` : `<p class="pg-say lost"><b>${esc(GROUPS[ln.g].ai)}</b>${esc(TX.lose)}</p>`);
    else if (ln.kind === "forest") notes.push(`<p class="pg-say${p.last.won ? "" : " lost"}">${esc(p.last.won ? TX.forest.win : TX.forest.lose)}</p>`);
  }
  for (const n of p.news) {
    if (n.k === "done") notes.push(`<p class="pg-news"><b>순례 완주</b> 망각의 숲을 지났습니다. <em>+${fmtGold(n.gold)}</em></p>`);
    else if (n.k === "lore") notes.push(`<p class="pg-news"><b>새 소문</b> ${esc(TX.flags[n.g].place)}의 이야기가 <a href="#" data-p="book">순례기</a>에 적혔습니다.</p>`);
    else if (n.k === "truth") notes.push(`<p class="pg-news hit"><b>${esc(TX.truth.title)}</b> 흩어진 소문이 하나로 이어졌습니다. <a href="#" data-p="book">순례기에서 읽기</a></p>`);
    else if (n.k === "step") notes.push(`<p class="pg-news"><b>${n.n}걸음 이정표</b> ${n.card ? `${gradeName(n.grade)} 카드 「${esc(CARDS[n.card].name)}」${n.gold ? ` (이미 다 가져서 ${fmtGold(n.gold)})` : ""}` : `<em>+${fmtGold(n.gold)}</em>`}</p>${n.card ? cardBox(n.card) : ""}`);
  }
  const fr = p.firstResult;
  if (fr) notes.push(fr.k === "gold" ? `<p class="pg-news"><b>오늘의 첫 승</b> <em>+${fmtGold(fr.gold)}</em></p>`
    : fr.k === "denied" ? `<p class="pg-news miss"><b>오늘의 첫 승</b> ${esc(fr.msg)}</p>`
    : fr.k === "miss" ? `<p class="pg-news miss"><b>오늘의 첫 승 · 뽑기</b> ${esc(TX.gamble.miss)}</p>`
    : `<p class="pg-news hit"><b>오늘의 첫 승 · 뽑기</b> ${esc(TX.gamble.hit)} <span class="grade-${fr.grade}">${gradeName(fr.grade)}</span> 「${esc(fr.id ? CARDS[fr.id].name : "")}」${fr.gold ? ` (이미 다 가져서 ${fmtGold(fr.gold)})` : ""}</p>${cardBox(fr.id)}`);

  let body;
  if (p.pend) {
    const G = PILGRIM.gamble;
    body = `<div class="xp-card pg-first">
      <p class="eyebrow">오늘의 첫 승</p><h3>환석 ${fmtGold(p.pend.gold)}</h3>
      <p>${esc(TX.gamble.ask)}</p>
      <ul class="pg-odds">${Object.keys(G).map(g => `<li class="grade-${g}">${gradeName(g)} <b>${pilPct(G[g])}</b></li>`).join("")}</ul>
      <p class="muted small">걸면 이 ${fmtGold(p.pend.gold)} 대신 <b>카드 한 장</b>을 받습니다 — 꽝은 없고, 스페셜은 나오지 않습니다. 카드는 가진 깃발의 카드 가운데 덜 가진 것이 먼저 나옵니다. 하루에 한 번${server ? " — 서버가 서버의 날짜로 확인합니다" : ""}.</p>
      <div class="xp-btns"><button class="btn" data-p="gamble">환석에 던진다 (카드 뽑기)</button><button class="btn primary" data-p="keep">조각을 받는다</button></div></div>`;
  } else if (!Pilgrim.canFight(p)) {
    const done = p.stage >= PILGRIM.gates;
    body = `<div class="xp-card xp-over ${done ? "won" : "lost"}">
      <h3>${done ? "오늘의 순례를 마쳤습니다" : "오늘은 더 싸울 수 없습니다"}</h3>
      <p>${done ? "여덟 관문과 망각의 숲을 모두 지났습니다." : `오늘의 ${PILGRIM.fights}판을 모두 썼습니다. ${p.stage}번째 관문까지 지났습니다.`} 새 길은 <b>${pilUntil(midnight - now)}</b> 뒤(자정)에 열립니다.</p>
      <div class="xp-btns"><button class="btn" data-p="book">순례기</button><button class="btn primary" data-p="lobby">대기실로</button></div></div>`;
  } else {
    const n = Pilgrim.node(p), forest = p.stage >= PILGRIM.gates - 1;
    const sc = playable ? deckScore(Store.deck(u, f).cards).total / deckScore(STARTER_DECKS[f]).total : 0;
    const scale = forest ? PILGRIM.forestScale || 1 : PILGRIM.scale[p.stage] || 1;
    let title, say, color;
    if (!p.route) { title = "길을 연다"; color = G_.color; say = `<p>${esc(TX.lead)}</p><p class="muted">첫 판을 시작하면 오늘의 길(여덟 깃발의 순서)이 정해집니다.</p>`; }
    else if (forest) { title = `${esc(TX.forest.name)} <small>${esc(TX.forest.who)}</small>`; color = "#8d86a8"; say = `<p class="pg-say">${esc(TX.forest.enter)}</p>`; }
    else { const O = GROUPS[n.g]; title = `${esc(TX.flags[n.g].place)} <small>${esc(O.ai)}</small>`; color = O.color; say = `<p class="pg-say">${esc(TX.greet[pilRelation(G_.faction, O.faction)])}</p>`; }
    body = `<div class="xp-card xp-next" style="--gc:${color}">
      <p class="eyebrow">${p.stage + 1} / ${PILGRIM.gates} · 오늘 남은 판 ${Pilgrim.left(p)}</p>
      <h3>${title}</h3>${say}
      <p class="xp-deck">${groupEmblem(f)} <b>${esc(G_.name)}</b> 덱으로 싸웁니다${playable ? ` · 기본 덱의 <b>${Math.round(sc * 100)}%</b> → 상대는 ${forest ? `내 깃발 기본 덱의 <b>${Math.round(sc * scale * 100)}%</b> (내 덱보다 ${Math.round((scale - 1) * 100)}% 셈)` : `제 깃발 기본 덱의 <b>${Math.round(sc * scale * 100)}%</b> (내 덱과 같은 세기)`}` : " · <span class=\"bad\">저장된 40장 덱이 없습니다</span>"} <span class="muted small">(다른 깃발로 싸우려면 대기실에서 깃발을 바꿉니다)</span></p>
      <p class="muted small">${p.first ? "오늘의 첫 승 보상은 받았습니다. 이 판은 전투 정산(작은 조각)만 있습니다." : `이기면 <b>오늘의 첫 승</b> — ${fmtGold(PILGRIM.first)} 또는 카드 한 장.`}${forest ? ` 숲을 지나면 완주 보너스 ${fmtGold(PILGRIM.done)}.` : ""} 지면 같은 관문에 다시 서고, 그 판도 오늘의 ${PILGRIM.fights}판에 듭니다.</p>
      <div class="xp-btns"><button class="btn" data-p="lobby">대기실로</button><button class="btn primary" data-p="fight" ${playable ? "" : "disabled"}>${forest ? "숲으로 들어간다" : "관문에 선다"}</button></div></div>`;
  }

  const heard = Pilgrim.heard(p);
  const road = `
      <div class="pg-week">
        <div class="pg-week-head"><b>${esc(chap.title)}</b><span>이번 주 <em>${p.steps}</em> / 7걸음 · 그날 첫 승이 한 걸음</span></div>
        <ol class="pg-steps">${[1, 2, 3, 4, 5, 6, 7].map(stepHTML).join("")}</ol>
        ${lastMem ? `<p class="pg-mem-last"><b>${p.steps}</b>${esc(lastMem)} <a href="#" data-p="book">지난 기억 보기</a></p>` : '<p class="muted small pg-mem-empty">걸음마다 기억이 한 줄씩 순례기에 남습니다.</p>'}
      </div>
      <div class="pg-way">${pilMapHTML(p, f)}<div class="pg-side">${notes.length ? `<div class="xp-card pg-notes">${notes.join("")}</div>` : ""}${body}</div></div>
      <ol class="xp-route pg-route">${Array.from({ length: PILGRIM.gates }, (_, i) => nodeHTML(i)).join("")}</ol>`;

  $("#app").innerHTML = `<section class="screen screen-exp screen-pil">
    ${headerHTML("성로 순례")}
    <div class="xp pg">
      <div class="xp-head fac-${G_.faction}" style="--gc:${G_.color}">
        ${groupEmblem(f, "big")}
        <div><p class="eyebrow">PILGRIMAGE · ${esc(FA.name)}</p><h2>성로 순례</h2>
        <p class="xp-lead">하루에 한 번 길이 열립니다. ${esc(TX.hub)}에서 떠나 <b>여덟 관문</b>에서 다른 깃발에게 인정받고, 아홉 번째 <b>망각의 숲</b>에서 나보다 조금 센(내 덱의 105%) 비친 나와 싸웁니다. 하루 <b>${PILGRIM.fights}판</b>까지. 그날 <b>첫 승</b>에 큰 보상이 있고, 숲을 지나면 조각을 더 받습니다.</p></div>
        <div class="pg-clock"><span>새 길까지 <b>${pilUntil(midnight - now)}</b></span><span>새 주까지 <b>${daysToWeek}일</b> (수요일)</span></div>
      </div>
      <div class="pg-tabs" role="tablist">
        <button type="button" role="tab" data-tab="road" aria-selected="${tab === "road"}" class="${tab === "road" ? "on" : ""}">오늘의 길</button>
        <button type="button" role="tab" data-tab="book" aria-selected="${tab === "book"}" class="${tab === "book" ? "on" : ""}">순례기 <small>소문 ${heard} / ${GROUP_IDS.length}</small>${p.lore && p.lore.truth ? " ✦" : ""}</button>
      </div>
      ${tab === "book" ? pilBookHTML(p) : road}
    </div>
  </section>`;
  const root = $(".screen-pil");
  bindHeader(root);
  root.addEventListener("click", ev => {
    const t = ev.target.closest("[data-tab]");
    if (t) { App.pilTab = t.dataset.tab; showPilgrim(f); return; }
    const b = ev.target.closest("[data-p]"); if (!b || b.disabled) return;
    ev.preventDefault();
    const x = b.dataset.p;
    if (x === "lobby") showLobby();
    else if (x === "book") { App.pilTab = "book"; showPilgrim(f); }
    else if (x === "keep" || x === "gamble") {
      const r = x === "keep" ? Pilgrim.keep() : Pilgrim.gamble();
      if (r && r.ok === false) toast(r.msg, "warn");
      else if (r && r.k === "card") toast(`${TX.gamble.hit} (${gradeName(r.grade)})`, "good");
      else if (r && r.k === "gold") toast(`환석 ${fmtGold(r.gold)}을 받았습니다.`, "good");
      showPilgrim(f);
    }
    else if (x === "fight") {
      const cfg = Pilgrim.begin(f);
      if (!cfg) { toast("지금은 싸울 수 없습니다.", "warn"); showPilgrim(f); return; }
      App.screen = "game"; Bg.set("off");
      cfg.onExit = () => { App.screen = null; App.pilTab = "road"; showPilgrim(f); };
      startMatch(cfg);
    }
  });
}
