/* ETHERION v3.46 — 지난 판 다시보기.
   컴퓨터와 대전 · 순례 · 원정 판은 시드와 사람 쪽 수(G.vlog: 행동 · 멀리건 · 준비 완료 · 코인 다시 던지기)만 있으면 똑같이 다시 둘 수 있다(서버 검산과 같은 방법, js/game.js "v3.40 서버 검산").
   - 판을 시작할 때 시드가 없으면 하나 정하고(cfg.seed) 수를 기록한다(cfg.keepLog → G.vlog). 서버 모드는 서버가 준 시드 · 검산 기록을 그대로 쓴다.
   - 판이 끝나면(screens.js onMatchEnd) 이 기기(localStorage)에 마지막 KEEP판을 남긴다. 기기마다 따로다.
   - 다시 볼 때는 cfg.replay(사람 쪽 수를 기록대로) + cfg.replayView(수 사이를 천천히 · 코인 다시 던지기 창 없음 · 보상 · 기록 없음).
   - 온라인 대전은 두 기기의 수가 오가므로 기록하지 않는다. */
"use strict";

const Replays = {
  KEY: "etherion.replays", KEEP: 5,
  all() { try { const a = JSON.parse(localStorage.getItem(this.KEY) || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; } },
  put(a) { try { localStorage.setItem(this.KEY, JSON.stringify(a.slice(0, this.KEEP))); } catch (e) { /* 저장소가 가득 참 · 막힘 — 다시보기만 못 남긴다 */ } },
  /* 판 끝 */
  save(g) {
    try {
      if (!g || !g.cfg || g.cfg.replayView || g.online || g.mode !== "ai" || !Array.isArray(g.vlog) || g.cfg.seed == null || g.cfg.headless) return;
      const c = g.cfg, u = Store.user();
      const side = p => p ? JSON.parse(JSON.stringify({ name: p.name, group: p.group, faction: p.faction, cards: p.cards, isAI: !!p.isAI, ai: p.ai })) : null;
      const rec = { at: Date.now(), who: u ? u.id : "", kind: c.pil ? "pil" : c.exp ? "exp" : "ai", won: g.winner === 0, turn: g.turn,
        seed: c.seed >>> 0, p0: side(c.p0), p1: side(c.p1), rules: c.rules || null, log: g.vlog.slice(0, 5000) };
      if (!rec.p0 || !rec.p1) return;
      this.put([rec].concat(this.all()));
    } catch (e) { console.warn("다시보기를 남기지 못했습니다", e); }
  },
  remove(i) { const a = this.all(); a.splice(i, 1); this.put(a); },
  kindName: { ai: "컴퓨터와 대전", pil: "성로 순례", exp: "원정" },
  listHTML() {
    const u = Store.user(), a = this.all().map((r, i) => ({ r, i })).filter(x => !u || !x.r.who || x.r.who === u.id);
    const when = t => { const d = new Date(t), p = n => String(n).padStart(2, "0"); return `${d.getMonth() + 1}/${d.getDate()} ${p(d.getHours())}:${p(d.getMinutes())}`; };
    const gname = s => s && GROUPS[s.group] ? GROUPS[s.group].name : "?";
    return `<section class="jr-card jr-replays"><header><h3>지난 판 다시보기</h3><small>컴퓨터와 대전 · 순례 · 원정의 마지막 ${this.KEEP}판을 이 기기에 남깁니다(온라인 대전은 남기지 않음). 보상 · 전적에는 세지 않습니다.</small></header>
      ${a.length ? `<ul class="jr-rps">${a.map(({ r, i }) => `<li class="jr-rp ${r.won ? "win" : "lose"}">
          <span class="jr-rp-res">${r.won ? "승" : "패"}</span>
          <div class="jr-rp-main"><b>${groupEmblem(r.p0.group)} ${esc(gname(r.p0))} <small>vs</small> ${groupEmblem(r.p1.group)} ${esc(gname(r.p1))}</b>
            <small>${this.kindName[r.kind] || ""}${r.p1.ai === "hard" ? " · 어려움" : r.p1.ai ? " · 보통" : ""} · ${r.turn}턴 · ${when(r.at)}</small></div>
          <button type="button" class="btn xs primary" data-replay="${i}">다시 보기</button><button type="button" class="btn xs ghost" data-rdel="${i}" title="이 기록 지우기">지우기</button>
        </li>`).join("")}</ul>` : '<p class="jr-empty">아직 남은 판이 없습니다. 컴퓨터와 대전 · 순례 · 원정을 한 판 마치면 여기에 생깁니다.</p>'}
    </section>`;
  },
  play(i) {
    const r = this.all()[i]; if (!r) return toast("기록을 찾지 못했습니다.", "warn");
    App.screen = "game"; Bg.set("off");
    const tag = document.createElement("div"); tag.id = "replay-tag"; tag.innerHTML = `<b>다시보기</b><small>${r.won ? "이긴 판" : "진 판"} · ${r.turn}턴 — 나가기는 오른쪽 위 메뉴</small>`;
    document.body.appendChild(tag);
    startMatch({ mode: "ai", seed: r.seed, p0: r.p0, p1: r.p1, rules: r.rules || undefined, replay: r.log.slice(), replayAll: r.log.slice(), replayView: true, expect: { won: r.won, turn: r.turn },
      onExit: () => { tag.remove(); App.screen = null; showJournal("replay"); } });
  }
};

/* 판을 시작할 때: 다시 볼 수 있게 시드를 정하고 사람 쪽 수를 기록한다 (컴퓨터와 대전 · 순례 · 원정) */
if (typeof startMatch === "function") {
  const sm0 = startMatch;
  startMatch = function (cfg) {
    if (cfg && !cfg.headless && !cfg.replay && cfg.mode === "ai") {
      cfg.keepLog = true;
      if (cfg.seed == null) cfg.seed = (Math.random() * 4294967296) >>> 0;
    }
    return sm0.apply(this, arguments);
  };
}
