/* ETHERION v3.46 — 퀘스트 화면: 퀘스트(오늘 · 이번 주 · 별 자리) · 업적과 칭호 · 카드 도감 · 온라인 등급 · 지난 판 다시보기.
   규칙과 보상은 js/quests.js(서버와 같은 파일), 다시보기 기록은 js/replays.js. 모양은 css/journal.css.
   상단 띠의 "퀘스트" 단추(screens.js headerHTML)에 받을 것의 수가 점으로 뜬다(Journal.badge). */
"use strict";

const Journal = {
  tab: "quest", flag: null,
  badgeHTML() { const u = Store.user(), n = u && typeof questReady === "function" ? questReady(u) : 0; return n ? `<i class="tb-badge jr-badge" title="받을 보상 ${n}개">${n > 99 ? "99+" : n}</i>` : ""; },
  badge() {
    for (const b of document.querySelectorAll('.tb-nav[data-nav="journal"]')) { const old = b.querySelector(".jr-badge"); if (old) old.remove(); b.insertAdjacentHTML("beforeend", this.badgeHTML()); }
  }
};

function showJournal(tab) {
  const u = Store.user(); if (!u) return showTitle();
  App.screen = "journal"; Bg.set("calm");
  if (tab) Journal.tab = tab;
  if (questOk(u)) { const r = Store.questSync(u); if (r && r.ok === false && r.msg) toast(r.msg, "warn"); }
  else questFresh(u);   // 필멸자 · 관리자: 보기만 (빈 칸을 채워 화면이 그려지게)
  const tabs = [["quest", "일일 · 주간"], ["ach", "업적 · 칭호"], ["book", "카드 도감"], ["rank", "온라인 등급"], ["replay", "다시보기"]];
  $("#app").innerHTML = `<section class="screen screen-journal">
    ${headerHTML("퀘스트")}
    <div class="journal">
      <nav class="jr-tabs" role="tablist">${tabs.map(([k, l]) => `<button type="button" class="jr-tab${Journal.tab === k ? " on" : ""}" data-jtab="${k}" role="tab" aria-selected="${Journal.tab === k}">${l}${jrTabDot(u, k)}</button>`).join("")}</nav>
      <div class="jr-body">${questOk(u) || Journal.tab === "replay" || Journal.tab === "book" ? jrBody(u) : `<p class="jr-empty">필멸자 · 관리자 계정은 퀘스트 · 업적 · 등급 보상이 없습니다. '새 모험가'로 등록하면 퀘스트을 쓸 수 있습니다.</p>`}</div>
    </div>
  </section>`;
  const root = $(".screen-journal");
  bindHeader(root);
  bindPreview(root);
  root.addEventListener("click", jrClick);
}
function jrTabDot(u, k) {
  if (!questOk(u)) return "";
  const Q = u.quests || {};
  let n = 0;
  if (k === "quest") { n = (Q.daily || []).concat(Q.weekly || []).filter(q => q.done && !q.got).length + QUEST.stars.filter((s, i) => (Q.stars || 0) >= s.n && !(Q.starGot || []).includes(i)).length; }
  if (k === "ach") n = ACHIEVEMENTS.filter(a => !u.ach.got[a.id] && a.v(u) >= a.goal).length;
  if (k === "book") for (const g of GROUP_IDS) { const b = questBookOf(u, g); n += QUEST.book.filter(m => b.pct >= m.p && !u.book.got.includes(g + ":" + m.p)).length; }
  if (k === "rank") n = u.rank && u.rank.prev && !u.rank.prev.got && QUEST.tiers[u.rank.prev.best].gold ? 1 : 0;
  return n ? `<i class="jr-dot">${n}</i>` : "";
}
function jrBody(u) {
  if (Journal.tab === "ach") return jrAch(u);
  if (Journal.tab === "book") return jrBook(u);
  if (Journal.tab === "rank") return jrRank(u);
  if (Journal.tab === "replay") return typeof Replays !== "undefined" ? Replays.listHTML() : "";
  return jrQuest(u);
}
const jrBar = (n, goal) => `<span class="jr-bar"><i style="--p:${Math.min(1, goal ? n / goal : 0).toFixed(3)}"></i></span>`;
const jrNum = n => Math.round(n).toLocaleString("ko-KR");

/* ---------- 퀘스트 ---------- */
function jrQuest(u) {
  const Q = u.quests, now = Date.now();
  const left = ms => { const h = Math.floor(ms / 3600e3), m = Math.floor(ms % 3600e3 / 60e3); return h >= 24 ? `${Math.floor(h / 24)}일 ${h % 24}시간` : `${h}시간 ${m}분`; };
  const nextDay = new Date(now); nextDay.setHours(24, 0, 0, 0);
  const nextWeek = new Date(pilWeekKey(now) + "T00:00:00"); nextWeek.setDate(nextWeek.getDate() + 7);
  const row = (q, kind, i) => `<li class="jr-q${q.done ? " done" : ""}${q.got ? " got" : ""}">
      <div class="jr-q-main"><b>${esc(questText(q))}</b>${jrBar(q.n, q.goal)}<small>${jrNum(q.n)} / ${jrNum(q.goal)}</small></div>
      <div class="jr-q-side"><span class="jr-gold"><i class="shard" aria-hidden="true"></i>${jrNum(q.gold)}</span><span class="jr-star">★${kind === "weekly" ? QUEST.starWeekly : QUEST.starDaily}</span>
        ${q.got ? '<span class="jr-ok">받음</span>' : q.done ? `<button type="button" class="btn xs primary" data-qclaim="${kind}:${i}">받기</button>`
          : kind === "daily" && (Q.reroll || 0) < QUEST.rerollPerDay ? `<button type="button" class="btn xs ghost" data-qreroll="${i}" title="하루 한 번, 끝내지 않은 퀘스트를 다른 것으로">바꾸기</button>` : ""}</div>
    </li>`;
  const stars = Q.stars || 0, top = QUEST.stars[QUEST.stars.length - 1].n;
  const box = (s, i) => {
    const got = (Q.starGot || []).includes(i), can = stars >= s.n && !got;
    const what = [s.gold ? `${jrNum(s.gold)} 조각` : "", s.spins ? `수레바퀴 표 ${s.spins}장` : "", s.card ? jrCardOdds(s.card) : "", s.title ? `칭호 「${titleName(s.title)}」` : ""].filter(Boolean).join(" · ");
    return `<div class="jr-chest${got ? " got" : can ? " can" : ""}" style="--x:${(s.n / top * 100).toFixed(2)}%">
        <button type="button" class="jr-chest-b" ${can ? `data-star="${i}"` : "disabled"} title="별 ${s.n}개: ${esc(what)}">${got ? "✓" : "◆"}</button>
        <small>★${s.n}</small><span class="jr-chest-what">${esc(what)}</span></div>`;
  };
  return `<div class="jr-quest">
    <section class="jr-card"><header><h3>오늘의 퀘스트</h3><small>새 퀘스트까지 ${left(nextDay - now)} · 셋 모두 받으면 수레바퀴 표 ${QUEST.allDailySpins}장${Q.allBonus ? " (받음)" : ""}</small></header>
      <ul class="jr-qs">${(Q.daily || []).map((q, i) => row(q, "daily", i)).join("")}</ul></section>
    <section class="jr-card"><header><h3>주간 퀘스트</h3><small>새 주까지 ${left(nextWeek - now)}</small></header>
      <ul class="jr-qs">${(Q.weekly || []).map((q, i) => row(q, "weekly", i)).join("")}</ul></section>
    <section class="jr-card jr-stars"><header><h3>별 자리 <b>★${stars}</b></h3><small>퀘스트를 받을 때마다 별(오늘 ★${QUEST.starDaily} · 이번 주 ★${QUEST.starWeekly}). 별이 모이면 상자를 엽니다. 새 주에 처음부터.</small></header>
      <div class="jr-track"><span class="jr-track-fill" style="--p:${Math.min(1, stars / top).toFixed(3)}"></span>${QUEST.stars.map(box).join("")}</div></section>
  </div>`;
}
function jrCardOdds(t) {
  const ks = Object.keys(t), nm = g => (typeof GRADES !== "undefined" && GRADES[g] ? GRADES[g].name : g);
  return ks.length === 1 ? `${nm(ks[0])} 카드` : ks.map(g => `${nm(g)} ${Math.round(t[g] * 100)}%`).join(" / ") + " 카드";
}

/* ---------- 업적 · 칭호 ---------- */
function jrAch(u) {
  const cats = [...new Set(ACHIEVEMENTS.map(a => a.cat))];
  const done = ACHIEVEMENTS.filter(a => u.ach.got[a.id]).length;
  const item = a => {
    const v = a.v(u), got = !!u.ach.got[a.id], can = !got && v >= a.goal;
    return `<li class="jr-a t${a.tier}${got ? " got" : can ? " can" : ""}">
        <i class="jr-medal" title="${ACH_TIER[a.tier]} 등급">${ACH_TIER[a.tier]}</i>
        <div class="jr-a-main"><b>${esc(a.name)}</b><small>${esc(a.text)}${a.title ? ` · 칭호 「${esc(titleName(a.title))}」` : ""}</small>${got ? "" : jrBar(v, a.goal) + `<small class="jr-a-n">${jrNum(Math.min(v, a.goal))} / ${jrNum(a.goal)}</small>`}</div>
        <div class="jr-a-side"><span class="jr-gold"><i class="shard" aria-hidden="true"></i>${jrNum(a.gold)}</span>${got ? '<span class="jr-ok">받음</span>' : can ? `<button type="button" class="btn xs primary" data-ach="${a.id}">받기</button>` : ""}</div>
      </li>`;
  };
  const titles = u.titles || [];
  return `<div class="jr-ach">
    <section class="jr-card jr-titles"><header><h3>칭호</h3><small>업적 · 별 자리 · 도감 · 시즌 보상으로 얻습니다. 단 칭호는 이름 옆에 보입니다.</small></header>
      <div class="jr-tchips">${titles.length ? `<button type="button" class="jr-tchip${!u.title ? " on" : ""}" data-title="">달지 않음</button>` + titles.map(t => `<button type="button" class="jr-tchip${u.title === t ? " on" : ""}" data-title="${esc(t)}">${esc(titleName(t))}</button>`).join("") : '<span class="muted small">아직 얻은 칭호가 없습니다.</span>'}</div></section>
    <p class="jr-sum">이룬 업적 <b>${done}</b> / ${ACHIEVEMENTS.length} · 동 → 은 → 금 → 백금 → 성좌 순으로 어렵습니다</p>
    ${cats.map(c => `<section class="jr-card"><header><h3>${esc(c)}</h3></header><ul class="jr-as">${ACHIEVEMENTS.filter(a => a.cat === c).sort((x, y) => x.tier - y.tier || x.goal - y.goal).map(item).join("")}</ul></section>`).join("")}
  </div>`;
}

/* ---------- 카드 도감 ---------- */
function jrBook(u) {
  const mine = GROUP_IDS.filter(g => Store.ownsGroup(u, g));
  const g = Journal.flag && GROUPS[Journal.flag] ? Journal.flag : (mine[0] || GROUP_IDS[0]);
  const flagBtn = x => { const b = questBookOf(u, x); return `<button type="button" class="jr-flag${x === g ? " on" : ""}${Store.ownsGroup(u, x) ? " mine" : ""}" data-jflag="${x}" style="--gc:${GROUPS[x].color}">${groupEmblem(x)}<span>${GROUPS[x].name}</span><small>${b.pct}%</small></button>`; };
  const b = questBookOf(u, g), ok = questOk(u);
  const ms = QUEST.book.map(m => { const key = g + ":" + m.p, got = ok && u.book.got.includes(key), can = ok && !got && b.pct >= m.p;
    return `<div class="jr-ms${got ? " got" : can ? " can" : ""}"><b>${m.p}%</b><small>${jrNum(m.gold)} 조각${m.title ? ` · 칭호 「${titleName("flag:" + g)}」` : ""}</small>${got ? '<span class="jr-ok">받음</span>' : can ? `<button type="button" class="btn xs primary" data-book="${g}:${m.p}">받기</button>` : ""}</div>`; }).join("");
  const col = u.collection || {}, all = Store.allCards(u);
  const cards = questBookPool(g).map(id => CARDS[id]).sort((x, y) => x.lv - y.lv || (x.type > y.type ? 1 : -1));
  const cell = c => { const k = all ? maxCopiesOf(c) : col[c.id] || 0, m = maxCopiesOf(c);
    return `<div class="jr-cell${k ? "" : " none"}${k >= m ? " full" : ""}" data-card="${c.id}" title="${esc(c.name)}${c.flavor ? "\n" + esc(c.flavor) : ""}">${cardHTML(c, { size: "sm" })}<span class="jr-cnt">${k} / ${m}</span></div>`; };
  return `<div class="jr-book">
    <div class="jr-flags">${GROUP_IDS.map(flagBtn).join("")}</div>
    <section class="jr-card"><header><h3>${groupEmblem(g)} ${GROUPS[g].name} <small>${GROUPS[g].en}</small></h3>
      <small>종류 ${b.have} / ${b.all} · 장수 ${jrNum(b.got)} / ${jrNum(b.max)} (최대 장수까지 센다)</small></header>
      ${jrBar(b.got, b.max)}
      <div class="jr-mss">${ms}</div></section>
    <div class="jr-grid">${cards.map(cell).join("")}</div>
  </div>`;
}

/* ---------- 온라인 등급 ---------- */
function jrRank(u) {
  const R = u.rank, pts = R.pts || 0, t = questTierOf(pts), T = QUEST.tiers[t], N = QUEST.tiers[t + 1];
  const P = R.prev, PT = P && QUEST.tiers[P.best];
  return `<div class="jr-rank">
    <section class="jr-card jr-rank-now"><header><h3>이번 시즌 <small>${esc(R.season || "")}</small></h3><small>온라인 대전만 셉니다 · 시즌은 달마다 · 같은 상대와는 하루 ${typeof REWARD !== "undefined" ? REWARD.pairDaily : 5}판까지</small></header>
      <div class="jr-tier t${t}"><i class="jr-tier-mark">${esc(T.name)}</i><div><b>${jrNum(pts)}점</b><small>${R.w || 0}승 ${R.l || 0}패 · 이번 시즌 최고 ${esc(QUEST.tiers[R.bestTier || 0].name)}</small>
        ${N ? jrBar(pts - T.pts, N.pts - T.pts) + `<small>${esc(N.name)}까지 ${jrNum(N.pts - pts)}점</small>` : "<small>가장 높은 등급입니다</small>"}</div></div>
      <p class="muted small">이기면 +${QUEST.rank.win}점(더 높은 등급을 이기면 +${QUEST.rank.win + QUEST.rank.up}), 지면 −${QUEST.rank.lose}점. 견습 · 기사는 등급 아래로 떨어지지 않습니다.</p></section>
    ${P && !P.got && PT && PT.gold ? `<section class="jr-card jr-prev"><header><h3>지난 시즌 ${esc(P.season)} 보상</h3></header><p>최고 등급 <b>${esc(PT.name)}</b> — ${jrNum(PT.gold)} 조각${PT.title ? ` · 칭호 「${esc(titleName(PT.title))}」` : ""}</p><button type="button" class="btn primary" data-rank="1">받기</button></section>` : ""}
    <section class="jr-card"><header><h3>등급과 시즌 보상</h3><small>시즌이 끝나면 그 시즌 최고 등급의 보상을 받습니다</small></header>
      <ol class="jr-tiers">${QUEST.tiers.map((x, i) => `<li class="t${i}${i === t ? " on" : ""}"><i class="jr-tier-mark">${esc(x.name)}</i><span>${jrNum(x.pts)}점~</span><small>${x.gold ? jrNum(x.gold) + " 조각" : "—"}${x.title ? ` · 칭호 「${esc(titleName(x.title))}」` : ""}</small></li>`).join("")}</ol></section>
  </div>`;
}

/* ---------- 누르기 ---------- */
async function jrClick(e) {
  const u = Store.user(); if (!u) return;
  const t = e.target.closest("[data-jtab],[data-qclaim],[data-qreroll],[data-star],[data-ach],[data-title],[data-jflag],[data-book],[data-rank],[data-replay],[data-rdel]");
  if (!t) return;
  const d = t.dataset, again = () => { showJournal(); Journal.badge(); };
  const gotMsg = (r, what) => {
    if (!r || r.ok === false) { toast((r && r.msg) || "받지 못했습니다.", "warn"); return; }
    const parts = [r.gold ? `+${jrNum(r.gold)} 조각` : "", r.spins ? `수레바퀴 표 ${r.spins}장` : "", r.card && CARDS[r.card] ? `카드 「${CARDS[r.card].name}」` : "", r.title ? `칭호 「${titleName(r.title)}」` : ""].filter(Boolean);
    toast(`${what}: ${parts.join(" · ") || "받았습니다"}`, "good");
    if (typeof FEEL !== "undefined") FEEL.play("coinHeads", 0.9);
  };
  if (d.jtab) { Journal.tab = d.jtab; return showJournal(); }
  if (d.jflag) { Journal.flag = d.jflag; return showJournal(); }
  if (d.qclaim) { const [k, i] = d.qclaim.split(":"); gotMsg(Store.questClaim(u, k, +i), "퀘스트"); return again(); }
  if (d.qreroll != null) { const r = Store.questReroll(u, +d.qreroll); if (r && r.ok === false) toast(r.msg, "warn"); return again(); }
  if (d.star != null) { gotMsg(Store.starClaim(u, +d.star), "별 자리"); return again(); }
  if (d.ach) { gotMsg(Store.achClaim(u, d.ach), "업적"); return again(); }
  if (d.title != null) { const r = Store.titleSet(u, d.title); if (r && r.ok === false) toast(r.msg, "warn"); return again(); }
  if (d.book) { const [g, p] = d.book.split(":"); gotMsg(Store.bookClaim(u, g, +p), "도감"); return again(); }
  if (d.rank) { gotMsg(Store.rankClaim(u), "시즌 보상"); return again(); }
  if (d.replay != null && typeof Replays !== "undefined") return Replays.play(+d.replay);
  if (d.rdel != null && typeof Replays !== "undefined") { Replays.remove(+d.rdel); return showJournal(); }
}

/* 상단 띠의 점: 레벨 판을 다시 칠할 때(저장 · 서버 응답) 함께 */
if (typeof LevelUI !== "undefined" && LevelUI.paint) { const p0 = LevelUI.paint; LevelUI.paint = function () { const r = p0.apply(this, arguments); try { Journal.badge(); } catch (e) {} return r; }; }
