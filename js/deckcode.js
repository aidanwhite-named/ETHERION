/* ETHERION v3.46 — 덱 코드: 덱을 짧은 글로 바꿔 친구에게 보내고, 받은 글로 덱을 꾸민다 (덱 조정실의 "덱 코드" 단추).
   모양: E1:<깃발>:<카드>,<카드>*<장수>,…   예) E1:B1:01*3,05*2,UP-B1-12,SB1-06*2
   - 카드 ID가 "<깃발>-"로 시작하면 그 앞을 떼고 적는다(B1-05 → 05). 장수 1은 적지 않는다.
   - 카드 ID를 그대로 쓰므로 카드가 더해져도 예전 코드가 그대로 읽힌다. 게임에서 뺀 카드는 건너뛴다.
   - 받은 덱은 내가 가진 장수까지만 넣고(덱 초안), 모자란 카드는 알려 준다. 저장은 덱 조정실의 저장 단추로. */
"use strict";

const DeckCode = {
  /* v3.48 친구 초대 링크: 서버에 붙은 등록 모험가 · 그 깃발 덱을 저장했을 때만 */
  inviteLink(u, g) {
    if (typeof Net === "undefined" || !Net.on || !u || u.guest || u.admin || !Store.deckPlayable(u, g) || typeof TRIAL === "undefined") return "";
    return `${Net.base}/?invite=${encodeURIComponent(u.id)}.${g}`;
  },
  /* 초대 링크로 열린 게임: 주소의 invite를 기억해 두고 등록 화면에 채운다 */
  pendingInvite() {
    try { const m = /[?&]invite=([^&#]+)/.exec(location.search); if (m) sessionStorage.setItem("etherion.invite", decodeURIComponent(m[1])); return sessionStorage.getItem("etherion.invite") || ""; } catch (e) { return ""; }
  },
  encode(g, cards) {
    const ids = Object.keys(cards || {}).filter(id => cards[id] > 0 && CARDS[id]).sort();
    return `E1:${g}:` + ids.map(id => (id.startsWith(g + "-") ? id.slice(g.length + 1) : id) + (cards[id] > 1 ? "*" + cards[id] : "")).join(",");
  },
  /* → { ok, g, cards, skipped:[…] } */
  decode(text) {
    const m = /E1:([A-Z]\d):([A-Za-z0-9\-*,]*)/.exec(String(text || "").replace(/\s+/g, ""));
    if (!m || !GROUPS[m[1]]) return { ok: false, msg: "덱 코드가 아닙니다. E1: 로 시작하는 글을 붙여 넣어 주세요." };
    const g = m[1], cards = {}, skipped = [];
    for (const part of m[2].split(",").filter(Boolean)) {
      const [raw, k] = part.split("*"), id = /^\d+$/.test(raw) ? g + "-" + raw : raw, c = CARDS[id];
      const n = Math.max(1, Math.min(9, Math.floor(+k || 1)));
      if (!c || !deckable(c, g)) { skipped.push(raw); continue; }
      cards[id] = Math.min(maxCopiesOf(c), (cards[id] || 0) + n);
    }
    return { ok: true, g, cards, skipped };
  },
  /* 덱 조정실의 창: 지금 덱의 코드 복사 · 받은 코드 넣기. apply(cards) = 덱 초안을 바꾼다 */
  async dialog(u, g, cards, apply) {
    const code = this.encode(g, cards), n = countMap(cards);
    const inv = this.inviteLink(u, g);   // v3.48 친구 초대 (서버 모드 · 저장한 덱)
    let input = "";
    const v = await modal(`<h3>덱 코드</h3>
      <p class="muted small">이 글을 친구에게 보내면 같은 덱을 꾸밀 수 있습니다. 받는 사람은 가진 카드만큼만 들어갑니다.</p>
      <label class="dc-row"><span>지금 덱 (${n}장)</span><textarea id="dc-out" readonly rows="3">${esc(code)}</textarea></label>
      <label class="dc-row"><span>받은 코드 넣기</span><textarea id="dc-in" rows="3" placeholder="E1:${g}:…"></textarea></label>
      ${inv ? `<div class="dc-row dc-inv"><span>친구 초대 링크 — 아직 가입하지 않은 친구가 이 링크로 등록하면, 내가 <b>저장한</b> ${esc(GROUPS[g].name)} 덱을 ${TRIAL.days}일 동안 써 볼 수 있습니다(카드를 사지 않아도)</span><textarea readonly rows="2">${esc(inv)}</textarea></div>` : ""}`,
      [{ label: "닫기", value: null }, { label: "복사", value: "copy" }].concat(inv ? [{ label: "초대 링크 복사", value: "invite" }] : []).concat([ { label: "넣기", value: "load", cls: "primary", onClick: w => { input = w.querySelector("#dc-in").value; } }]),
      { cls: "dc-modal", onOpen: w => { const t = w.querySelector("#dc-out"); t.addEventListener("focus", () => t.select()); } });
    if (v === "invite") {
      try { await navigator.clipboard.writeText(inv); toast("초대 링크를 복사했습니다. 친구에게 보내 주세요.", "good"); }
      catch (e) { toast("복사하지 못했습니다. 글을 길게 눌러 직접 복사해 주세요.", "warn"); }
      return;
    }
    if (v === "copy") {
      try { await navigator.clipboard.writeText(code); toast("덱 코드를 복사했습니다.", "good"); }
      catch (e) { toast("복사하지 못했습니다. 글을 길게 눌러 직접 복사해 주세요.", "warn"); }
      return;
    }
    if (v !== "load") return;
    const r = this.decode(input);
    if (!r.ok) return toast(r.msg, "warn");
    if (r.g !== g) return toast(`「${GROUPS[r.g].name}」 깃발의 덱입니다. 그 깃발의 덱 조정실에서 넣어 주세요.`, "warn");
    const own = {}, short = [];
    for (const id in r.cards) { const have = Store.ownedCount(u, id), k = Math.min(r.cards[id], have); if (k > 0) own[id] = k; if (have < r.cards[id]) short.push(`${CARDS[id].name} ${r.cards[id] - have}장`); }
    apply(own);
    const got = countMap(own);
    if (short.length || r.skipped.length) await modal(`<h3>덱을 넣었습니다 (${got}장)</h3>${short.length ? `<p>가지지 않아 빠진 카드:</p><p class="muted small">${short.map(esc).join(" · ")}</p>` : ""}${r.skipped.length ? `<p class="muted small">게임에 없는 카드 ${r.skipped.length}종은 건너뛰었습니다.</p>` : ""}<p class="muted small">빈 자리를 채우고 저장해 주세요.</p>`, [{ label: "확인", value: 1, cls: "primary" }]);
    else toast(`덱 코드로 ${got}장을 넣었습니다. 저장해야 반영됩니다.`, "good");
  }
};

/* ---------- v3.48 친구 초대 체험 덱: 대기실 덱 보관함 맨 위의 띠 ---------- */
function trialBannerHTML(u) {
  const T = typeof trialDeckOf === "function" ? trialDeckOf(u) : null; if (!T) return "";
  const left = T.until - Date.now(), days = Math.floor(left / 86400e3), hours = Math.floor(left % 86400e3 / 3600e3), G = GROUPS[T.group];
  return `<div class="trial-band" style="--gc:${G.color}">${groupEmblem(T.group)}
    <div class="tb-txt"><b>체험 덱 · ${esc(T.from)}님의 「${esc(T.name)}」</b><small>${esc(G.name)} · ${countMap(T.cards)}장 · ${days ? days + "일 " : ""}${hours}시간 남음 — 카드를 사지 않아도 컴퓨터와 대전 · 온라인 대전에 쓸 수 있습니다</small></div>
    <div class="tb-btns"><button type="button" class="btn xs" data-trial="view">카드 보기</button><button type="button" class="btn xs primary" data-trial="ai">컴퓨터와 대전</button><button type="button" class="btn xs primary alt" data-trial="online">온라인 대전</button></div>
  </div>`;
}
document.addEventListener("click", async e => {
  const b = e.target.closest("[data-trial]"); if (!b) return;
  const u = Store.user(), T = u && trialDeckOf(u); if (!T) { toast("체험 기간이 끝났습니다.", "warn"); return showLobby(); }
  if (b.dataset.trial === "ai") return startVsAI(T.group, { trial: true });
  if (b.dataset.trial === "online") return startOnline(T.group, { trial: true });
  const ids = sortDeckCards(Object.keys(T.cards).filter(id => T.cards[id] > 0 && CARDS[id]));
  await modal(`<h3>체험 덱 — ${esc(T.name)}</h3><p class="muted small">${esc(T.from)}님이 저장한 ${esc(GROUPS[T.group].name)} 덱 ${countMap(T.cards)}장. 마음에 드는 카드는 상점에서 사서 내 덱을 꾸려 보세요.</p>
    <div class="trial-cards">${ids.map(id => `<div class="tc-cell" data-card="${id}">${cardHTML(CARDS[id], { size: "sm" })}<span>×${T.cards[id]}</span></div>`).join("")}</div>`, [{ label: "닫기", value: 1, cls: "primary" }], { cls: "wide-modal" });
});
