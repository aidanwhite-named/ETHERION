/* ETHERION v3.20.1 — 개발용 전투 로그 (BLog)
   한 판에서 일어난 일을 글로 남겨, 나중에 "이 카드가 왜 이렇게 됐지?"를 확인할 때 쓴다.
   - 화면의 "전투 기록"(game.js log)과 같은 줄을 모두 받아, 줄마다 [R라운드 T턴 단계] 머리표를 붙인다.
   - 판 처음: 모드 · 판 규칙 · 두 사람의 덱 50장(카드 이름[ID]).
   - 턴 시작: 양쪽 핸드(보충 뒤) · 생명 · 결정 · 덱 장수.
   - 전투 전 · 전투 후 · 판 끝: 판 상태 — 칸마다 카드[ID] · Lv · 공/방/남은 체력/최대 체력 · 아이템 · 상태(수호 · 보호막 · 불굴 · 가시 · 가호 · 쓰러짐 · 빼앗음).
   - 전투의 수마다 "⤷" 줄: 누가(몇 번 칸) 누구를(몇 번 칸) 쳤는지 · 떠오른 효과 글자(−3, 공 +2 …)와 그 뒤의 공/방/체.
   감춤: 온라인 대전에서는 상대 핸드를 장수만 적는다(로그를 열어 상대 패를 엿보지 못하게).
   저장: localStorage "etherion.battlelog"(지난 판들, 글자 수가 넘치면 오래된 판부터 지움) · "etherion.battlelog.cur"(지금 판, 전투가 끝날 때마다).
         창을 닫아 끝나지 못한 판은 다음 판을 시작할 때 "(중단)"으로 옮긴다.
   꺼내기: 전장의 "전투 기록" 서랍 · 결과 창의 단추 — 이 판 내려받기 · 지난 판 모두 내려받기 · 폴더에 자동 저장.
     폴더 자동 저장(Chrome · Edge): 한 번 폴더를 고르면 판이 끝날 때마다 그 폴더에 .txt를 쓴다. 브라우저를 다시 열면 허락을 한 번 더 묻는다
     (서랍의 "폴더 허락" 단추). 허락 전에 끝난 판은 허락하는 순간 함께 쓴다.
   콘솔: BLog.text() · BLog.download() · BLog.downloadAll() · BLog.list() · BLog.clear()
   판의 결과에는 손대지 않는다(읽기만 한다). 화면 없이 도는 판(cfg.headless — 균형 도구)에서는 꺼져 있다. */
"use strict";

const BLOG_VER = "3.32";   // 로그 형식 · 게임 버전 표시. 게임 버전을 올리면 함께 고친다

const BLog = {
  KEY: "etherion.battlelog",
  CUR_KEY: "etherion.battlelog.cur",
  MAX_MATCHES: 40,
  MAX_CHARS: 1200000,          // 지난 판 모두의 글자 수 상한 (localStorage는 계정 저장소와 나눠 쓴다)
  cur: null,                   // { g, id, file, lines, ended, saved }
  PH: { setup: "시작", mulligan: "멀리건", atkPrep: "공격준비", defPrep: "방어준비", combat: "전투", over: "끝" },
  KIND: { atk: "공격 마법", def: "방어 마법", any: "공용 마법", hand: "계략", item: "아이템", unit: "유닛" },

  /* ---------- 판 시작 / 끝 ---------- */
  begin(g) {
    this.finishCur("(중단 — 다음 판이 시작됨)");
    this.cur = null;
    if (!g || !g.cfg || g.cfg.headless) return;
    this.recover();
    const d = new Date(), p2 = n => String(n).padStart(2, "0");
    const stamp = `${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}-${p2(d.getHours())}${p2(d.getMinutes())}${p2(d.getSeconds())}`;
    const grp = p => p.group || p.faction || "?";
    const c = this.cur = { g, id: stamp, file: `ETHERION_전투_${stamp}_${grp(g.players[0])}vs${grp(g.players[1])}.txt`, lines: [], ended: false, saved: false };
    const L = c.lines;
    L.push(`ETHERION 전투 로그 — ${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())} ${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`);
    let sig = ""; try { if (typeof Online !== "undefined") sig = " · 카드 데이터 " + Online.sig(); } catch (e) {}
    L.push(`게임 v${BLOG_VER}${sig}`);
    const mode = g.online ? "온라인 대전" : g.mode === "hotseat" ? "한 기기 두 사람" : g.cfg.exp ? "원정" : g.cfg.pil ? "성로 순례" : g.mode === "ai" ? "컴퓨터와 대전" : g.mode;
    L.push(`모드: ${mode}${g.online ? ` (내 자리 P${g.me})` : ""} · 판 규칙: ${g.rules && g.rules.name ? `${g.rules.name} — ${g.rules.text || ""}` : "없음"}`);
    g.players.forEach(p => {
      const gn = p.group && typeof GROUPS !== "undefined" && GROUPS[p.group] ? `${GROUPS[p.group].name}(${p.group})` : grp(p);
      L.push(`P${p.idx} ${p.name} — ${gn} · ${p.isAI ? "컴퓨터(" + (p.ai || "normal") + ")" : "사람"}`);
      const cards = (g.cfg["p" + p.idx] && g.cfg["p" + p.idx].cards) || {};
      if (g.online && p.idx !== g.me) { L.push(`   덱: ${this.count(cards)}장 (상대 덱이라 감춤)`); return; }
      const ids = Object.keys(cards).filter(id => cards[id] > 0).sort((a, b) => ((CARDS[a] && CARDS[a].lv) || 0) - ((CARDS[b] && CARDS[b].lv) || 0) || a.localeCompare(b));
      L.push(`   덱 ${this.count(cards)}장: ` + ids.map(id => `${this.ct(id)}×${cards[id]}`).join(", "));
    });
    L.push("머리표 [R라운드 T턴 단계] · 칸 = 전장 칸 번호(1이 맨 앞) · 공/방/체 = 공격/방어/남은 체력/최대 체력 · ⤷ = 전투의 한 수에서 바뀐 것(「」= 떠오른 글자, → 뒤는 그 수가 끝난 뒤 스탯, 칸 번호는 그 순간의 칸 — 쓰러진 카드가 빠지면 앞으로 당겨진다)");
    L.push("─".repeat(60));
  },
  /* 판이 끝났을 때 (game.js showResult · exitMatch) */
  end(g, why) {
    const c = this.cur; if (!c || c.g !== g || c.ended) return;
    if (g.phase === "over") {
      if (!(c.boardEnd && c.lines.length - c.boardEnd <= 1)) this.board("판 끝");   // 바로 앞이 "전투 후"면 같은 판이라 생략
      const w = g.players[g.winner];
      c.lines.push(`◆ 결과: ${w ? `P${w.idx} ${w.name} 승리` : "?"} — ${g.reason || ""} · 라운드 ${roundOf(g.turn)} · 턴 ${g.turn} · 생명 ${g.players.map(p => `P${p.idx} ${p.life}`).join(" / ")}`);
    } else {
      this.board("중단된 자리");
      c.lines.push(`◆ ${why || "판을 끝내지 않고 나감"}`);
    }
    c.ended = true;
    this.commit(c);
  },
  /* 끝나지 않은 채 남은 판을 정리 */
  finishCur(why) {
    const c = this.cur; if (!c || c.ended) return;
    c.lines.push(`◆ ${why}`); c.ended = true; this.commit(c);
  },

  /* ---------- 기록 ---------- */
  ok() { const c = this.cur; return !!(c && !c.ended && typeof G !== "undefined" && c.g === G); },
  tag(g) {
    const ph = g.phase === "combat" && this.cur && this.cur.combatTurn !== g.turn ? "턴시작" : (this.PH[g.phase] || g.phase);
    return `[R${roundOf(g.turn)} T${g.turn} ${ph}]`;
  },
  /* game.js log()가 부른다 — 화면 기록과 같은 줄 */
  line(text, cls) {
    if (!this.ok()) return;
    if (G.phase === "combat" && /^⚔ 전투 개시/.test(text)) this.cur.combatTurn = G.turn;
    this.cur.lines.push(`${this.tag(G)} ${text}`);
  },
  /* 턴 시작: 보충한 뒤의 핸드 */
  turnStart() {
    if (!this.ok()) return;
    const g = G, L = this.cur.lines;
    for (const p of g.players) {
      L.push(`${this.tag(g)}   P${p.idx} ${p.name}${p.idx === g.attacker ? "(공격)" : "(방어)"} 생명 ${p.life} · 결정 ${p.crystals.length} · 덱 ${p.deck.length} · 소각장 ${p.burn.length} · ${this.handText(p)}`);
    }
  },
  /* 판 상태 한 장 */
  board(label) {
    const c = this.cur; if (!c || c.ended || typeof G === "undefined" || c.g !== G) return;
    const g = G, L = c.lines;
    if (g.phase === "combat") c.combatTurn = g.turn;
    const T = this.tag(g);
    L.push(`${T} ┌─ 판 상태: ${label}`);
    for (const p of g.players) {
      let eth = ""; try { if (g.phase !== "over") eth = ` · 남은 에테르 ${ether(p)}`; } catch (e) {}
      L.push(`${T} │ P${p.idx} ${p.name}${p.idx === g.attacker ? "(공격)" : "(방어)"} 생명 ${p.life} · 결정 ${p.crystals.length}${eth} · 덱 ${p.deck.length} · 소각장 ${p.burn.length}`);
      const used = p.field.map((it, i) => it ? `${T} │   ${this.slotText(it, i + 1, it.t)}` : null).filter(Boolean);
      if (used.length) used.forEach(x => L.push(x)); else L.push(`${T} │   전장: 비어 있음`);
      L.push(`${T} │   ${this.handText(p)}`);
    }
    L.push(`${T} └─`);
    c.boardEnd = L.length;
  },
  /* 전투의 한 수 (game.js runCombat이 s.logs를 화면 기록에 넣은 바로 뒤에 부른다) */
  step(s) {
    if (!this.ok() || !s) return;
    const fx = s.fx || {}, sn = s.snap || null, parts = [];
    const at = k => this.where(k, sn);
    if (fx.act != null && fx.counter != null) parts.push(`반격: ${at(fx.counter)} → ${at(fx.act)}`);
    else if (fx.act != null && fx.tgt != null) parts.push(`${at(fx.act)} → ${at(fx.tgt)}${fx.sn ? " (사격)" : ""}${fx.hit ? " 맞음" : ""}`);
    else if (fx.act != null) parts.push(`${fx.reveal != null ? "공개" : "움직임"}: ${at(fx.act)}`);
    if (fx.spell) parts.push(`효과: ${fx.shown != null ? at(fx.shown) : this.ct(fx.spell)}${fx.shown != null && G.reg && G.reg[fx.shown] && G.reg[fx.shown].id !== fx.spell ? " → " + this.ct(fx.spell) : ""}`);
    if (fx.coin) parts.push(`맞붙음 #${fx.coin.n}: ${at(fx.coin.a)} vs ${at(fx.coin.d)}`);
    if (fx.spellCoin) parts.push(`마법 코인: ${this.ct(fx.spellCoin.id)}`);
    if (fx.conjure != null) parts.push(`나타남: ${at(fx.conjure)}`);
    if (fx.shatter && fx.shatter.length) parts.push(`부서짐: ${fx.shatter.map(at).join(", ")}`);
    if (fx.fizzle) parts.push(`자리 없어 사라짐: P${fx.fizzle.p} ${this.ct(fx.fizzle.id)}`);
    /* 떠오른 글자는 대상마다 모아 적고, 그 수가 끝난 뒤의 스탯을 한 번 붙인다 */
    const by = new Map();
    for (const f of s.floats || []) { const k = String(f[0]); if (!by.has(k)) by.set(k, []); by.get(k).push(f[1]); }
    for (const [k, txt] of by) {
      const u = sn && sn.units ? sn.units[k] : null;
      parts.push(`${at(k)} ${txt.map(x => `「${x}」`).join("")}${u ? ` → ${this.statText(u)}` : ""}`);
    }
    /* 맞기 직전의 수(다가감)는 바로 다음 "맞음" 줄과 같아 건너뛴다 */
    if (parts.length === 1 && fx.act != null && fx.tgt != null && !fx.hit && !(s.floats || []).length) return;
    if (parts.length) this.cur.lines.push(`${this.tag(G)}     ⤷ ${parts.join(" · ")}`);
  },

  /* ---------- 글로 바꾸기 ---------- */
  ct(id) { const c = typeof CARDS !== "undefined" && CARDS[id]; return c ? `${c.name}[${id}]` : `?[${id}]`; },
  count(m) { let n = 0; for (const k in m) n += m[k] || 0; return n; },
  statText(t) { return `공${t.a}/방${t.d}/체${t.h - t.dmg}/${t.h}${t.alive === false ? " 쓰러짐" : ""}`; },
  slotText(it, k, t) {
    if (!it) return `${k}번 —`;
    const c = CARDS[it.id] || {};
    if (c.type !== "unit") return `${k}번 ${this.KIND[c.type] || "마법"} ${this.ct(it.id)} Lv${c.lv}`;
    const g = G, bits = [];
    if (t) {
      if (t.taunt) bits.push("수호");
      if (t.shield) bits.push("보호막");
      if (t.endure) bits.push("불굴");
      if (t.thorns) bits.push("가시" + t.thorns);
      if (t.ward && !t.wardUsed) bits.push("가호" + t.ward);
    }
    if (it.from != null) bits.push(`빼앗음(원래 P${it.from})`);
    if (g && it.summoned === g.turn) bits.push("이번 턴 소환");
    return `${k}번 ${this.ct(it.id)} Lv${c.lv} ${t ? this.statText(t) : `공${c.a}/방${c.d}/체${c.h}`}${it.item ? ` · 아이템 ${this.ct(it.item.id)}` : ""}${bits.length ? " · " + bits.join(" ") : ""}`;
  },
  handText(p) {
    const g = G;
    if (g && g.online && p.idx !== g.me) return `핸드 ${p.hand.length}장 (상대 핸드라 감춤)`;
    return `핸드 ${p.hand.length}장: ${p.hand.map(it => this.ct(it.id)).join(", ") || "없음"}`;
  },
  /* uid 또는 "life0" 같은 열쇠 → "P1 2번 화염 고블린[B1-03]" */
  where(k, sn) {
    const m = typeof k === "string" && /^([a-z]+)(\d)$/.exec(k);
    if (m) {
      const i = +m[2], pl = sn && sn.players ? sn.players[i] : (G && G.players[i]);
      if (m[1] === "life") return `P${i} 생명${pl ? "(" + pl.life + ")" : ""}`;
      return `P${i} ${{ crys: "결정", ether: "에테르", burn: "소각장", deck: "덱", hand: "핸드" }[m[1]] || m[1]}`;
    }
    const uid = +k;
    if (sn && sn.players) for (let i = 0; i < sn.players.length; i++) {
      const j = sn.players[i].field.indexOf(uid);
      if (j >= 0) { const it = G && G.reg && G.reg[uid]; return `P${i} ${j + 1}번 ${it ? this.ct(it.id) : "uid" + uid}`; }
    }
    if (G) for (const p of G.players) { const j = p.field.findIndex(x => x && x.uid === uid); if (j >= 0) return `P${p.idx} ${j + 1}번 ${this.ct(p.field[j].id)}`; }
    const it = G && G.reg && G.reg[uid];
    return it ? this.ct(it.id) : String(k);
  },

  /* ---------- 저장 ---------- */
  text(c) { c = c || this.cur; return c ? c.lines.join("\n") + "\n" : ""; },
  list() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; } },
  setList(xs) {
    let total = xs.reduce((s, r) => s + r.text.length, 0);
    while (xs.length > 1 && (xs.length > this.MAX_MATCHES || total > this.MAX_CHARS)) total -= xs.shift().text.length;
    for (let tries = 0; tries < 40 && xs.length; tries++) {
      try { localStorage.setItem(this.KEY, JSON.stringify(xs)); return true; } catch (e) { xs.shift(); }
    }
    return false;
  },
  /* 전투가 끝날 때마다 지금 판을 따로 적어 둔다 (창을 닫아도 남게) */
  saveCur() {
    const c = this.cur; if (!c || c.ended) return;
    try { localStorage.setItem(this.CUR_KEY, JSON.stringify({ id: c.id, file: c.file, text: this.text(c) })); } catch (e) {}
  },
  /* 지난번에 끝나지 못한 판이 남아 있으면 지난 판으로 옮긴다 */
  recover() {
    let r = null; try { r = JSON.parse(localStorage.getItem(this.CUR_KEY)); } catch (e) {}
    if (!r || !r.text) return;
    try { localStorage.removeItem(this.CUR_KEY); } catch (e) {}
    const xs = this.list(); if (xs.some(x => x.id === r.id)) return;
    xs.push({ id: r.id, file: r.file, text: r.text + "◆ (중단 — 창을 닫았거나 새로 고침)\n", saved: false });
    this.setList(xs);
  },
  commit(c) {
    try { localStorage.removeItem(this.CUR_KEY); } catch (e) {}
    const xs = this.list().filter(x => x.id !== c.id);
    xs.push({ id: c.id, file: c.file, text: this.text(c), saved: false });
    this.setList(xs);
    this.flushDir();
  },
  clear() { try { localStorage.removeItem(this.KEY); localStorage.removeItem(this.CUR_KEY); } catch (e) {} },

  /* ---------- 내려받기 ---------- */
  dl(name, text) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + text], { type: "text/plain;charset=utf-8" }));
    a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  },
  download() {
    const c = this.cur;
    if (c) return this.dl(c.file, this.text(c) + (c.ended ? "" : "◆ (진행 중에 내려받음)\n"));
    const xs = this.list(); if (xs.length) return this.dl(xs[xs.length - 1].file, xs[xs.length - 1].text);
    this.say("아직 남은 전투 로그가 없습니다.", "warn");
  },
  downloadAll() {
    const xs = this.list();
    if (this.cur && !this.cur.ended) xs.push({ id: this.cur.id, file: this.cur.file, text: this.text(this.cur) + "◆ (진행 중)\n" });
    if (!xs.length) return this.say("아직 남은 전투 로그가 없습니다.", "warn");
    const sep = "\n" + "═".repeat(60) + "\n\n";
    this.dl(`ETHERION_전투로그_최근${xs.length}판.txt`, xs.map(x => x.text).join(sep));
  },
  say(t, cls) { if (typeof toast === "function") toast(t, cls || ""); else console.log(t); },

  /* ---------- 폴더에 자동 저장 (File System Access — Chrome · Edge) ---------- */
  dir: null, dirNeed: false,
  idb(mode, fn) {
    return new Promise((res, rej) => {
      if (typeof indexedDB === "undefined") return rej(new Error("no idb"));
      const q = indexedDB.open("etherion.battlelog", 1);
      q.onupgradeneeded = () => q.result.createObjectStore("kv");
      q.onerror = () => rej(q.error);
      q.onsuccess = () => { const tx = q.result.transaction("kv", mode), r = fn(tx.objectStore("kv")); tx.oncomplete = () => res(r && r.result); tx.onerror = () => rej(tx.error); };
    });
  },
  async getDir() {
    if (this.dir) return this.dir;
    try { this.dir = await this.idb("readonly", s => s.get("dir")) || null; } catch (e) { this.dir = null; }
    return this.dir;
  },
  canDir() { return typeof window !== "undefined" && typeof window.showDirectoryPicker === "function"; },
  async pickDir() {
    if (!this.canDir()) return this.say("이 브라우저는 폴더 저장을 지원하지 않습니다(Chrome · Edge에서 됩니다). 내려받기를 써 주세요.", "warn");
    let h;
    try { h = await window.showDirectoryPicker({ id: "etherion-battlelog", mode: "readwrite" }); } catch (e) { return; }
    this.dir = h; this.dirNeed = false;
    try { await this.idb("readwrite", s => s.put(h, "dir")); } catch (e) {}
    this.say(`전투 로그를 「${h.name}」 폴더에 판마다 저장합니다.`, "good");
    await this.flushDir(true);
    this.paint();
  },
  /* 폴더에 아직 쓰지 않은 판을 쓴다. ask: 단추를 눌렀을 때만 허락을 묻는다(브라우저 규칙) */
  async flushDir(ask) {
    const h = await this.getDir(); if (!h) return;
    try {
      let perm = await h.queryPermission({ mode: "readwrite" });
      if (perm !== "granted" && ask) perm = await h.requestPermission({ mode: "readwrite" });
      if (perm !== "granted") { this.dirNeed = true; this.paint(); return; }
      this.dirNeed = false;
      const xs = this.list(); let n = 0;
      for (const x of xs) {
        if (x.saved) continue;
        const fh = await h.getFileHandle(x.file, { create: true }), w = await fh.createWritable();
        await w.write("﻿" + x.text); await w.close();
        x.saved = true; n++;
      }
      if (n) this.setList(xs);
      if (n && ask) this.say(`「${h.name}」 폴더에 전투 로그 ${n}개를 썼습니다.`, "good");
    } catch (e) { console.warn("[전투 로그] 폴더 저장 실패", e); }
    this.paint();
  },
  async forgetDir() { this.dir = null; this.dirNeed = false; try { await this.idb("readwrite", s => s.delete("dir")); } catch (e) {} this.say("폴더 자동 저장을 껐습니다.", ""); this.paint(); },

  /* ---------- 단추 (전투 기록 서랍 · 결과 창) ---------- */
  btnsHTML() {
    const d = this.dir, dirLabel = !this.canDir() ? "" : this.dirNeed ? "폴더 허락" : d ? "폴더 ✓" : "폴더 저장";
    const dirTip = this.dirNeed ? `「${d ? d.name : ""}」 폴더에 다시 쓰려면 눌러 허락해 주세요` : d ? `판이 끝날 때마다 「${d.name}」 폴더에 .txt를 씁니다. 다른 폴더로 바꾸려면 누르세요 (Shift+누르기: 끄기)` : "고른 폴더(예: ETHERION\\logs)에 판이 끝날 때마다 로그 .txt를 자동으로 씁니다";
    return `<span class="blog-btns"><button type="button" class="btn xs ghost" data-blog="dl" data-tip="이 판의 개발용 전투 로그(.txt) — 칸 위치 · 스탯 · 공격과 피해를 모두 적은 것">⤓ 로그</button>`
      + `<button type="button" class="btn xs ghost" data-blog="all" data-tip="이 브라우저에 남은 지난 판들의 전투 로그를 한 파일로">지난 판</button>`
      + (dirLabel ? `<button type="button" class="btn xs ghost${this.dirNeed ? " blog-need" : ""}" data-blog="dir" data-tip="${dirTip}">${dirLabel}</button>` : "") + `</span>`;
  },
  paint() { if (typeof document === "undefined") return; document.querySelectorAll(".blog-btns").forEach(el => { el.outerHTML = this.btnsHTML(); }); }
};

if (typeof document !== "undefined") {
  document.addEventListener("click", e => {
    const b = e.target && e.target.closest && e.target.closest("[data-blog]"); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const k = b.dataset.blog;
    if (k === "dl") BLog.download();
    else if (k === "all") BLog.downloadAll();
    else if (k === "dir") { if (e.shiftKey && BLog.dir) BLog.forgetDir(); else if (BLog.dirNeed) BLog.flushDir(true); else BLog.pickDir(); }
  }, true);
  /* 폴더를 골라 둔 적이 있으면 허락 상태를 미리 알아 둔다 (단추 글자) */
  BLog.getDir().then(h => { if (h && h.queryPermission) h.queryPermission({ mode: "readwrite" }).then(p => { BLog.dirNeed = p !== "granted"; BLog.paint(); }).catch(() => {}); }).catch(() => {});
}
