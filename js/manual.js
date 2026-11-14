/* ETHERION — 튜토리얼 · 매뉴얼 (v3.9, 가이드 2.20)
   튜토리얼은 상단 띠의 퀘스트 옆, 매뉴얼 · 룰북은 연대기 머리에서 연다(v3.55.4).
   - 튜토리얼(Tutorial): 세 장 — ① 대기실 둘러보기(실제 화면의 칸을 하나씩 밝혀 짚는다) ② 전투 배우기(그림으로 아홉 쪽)
     ③ 연습 대전(전장의 "첫 판 안내"(js/game.js Guide)를 다시 켜고 컴퓨터와 대전). 마친 장은 ✓ (localStorage etherion.pref.tut).
   - 매뉴얼(Manual): 고서 한 권 — 왼쪽 목차 · 찾기, 오른쪽 본문(열다섯 장). 숫자와 능력 뜻은 코드(RULES · GRADES · ITEM_KW · SPELL_KW ·
     ECON · SHOP_STOCK · DRAGONS · FACTIONS · GROUPS)에서 바로 읽어, 규칙이 바뀌면 매뉴얼도 따라 바뀐다.
   - v3.55 룰북(js/rulebook.js RulebookUI): 세 번째 명판. 순례 · 합성 · 상점 · 보상 · 교역소 · 레벨 장은 룰북으로 옮겼고, 매뉴얼에는 연결 장(「룰북」)만 남았다.
   그림은 모두 HTML/CSS(가이드 0.1). 모양은 css/manual.css. 움직임은 창이 열릴 때 한 번 뿐이다(반복 움직임 없음). */
"use strict";

const Help = (() => {
  const PK = "etherion.pref.";
  const pget = (k, d) => { try { const v = localStorage.getItem(PK + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  const pset = (k, v) => { try { localStorage.setItem(PK + k, JSON.stringify(v)); } catch (e) {} };
  const prog = () => pget("tut", {}) || {};
  const mark = k => { const p = prog(); p[k] = 1; pset("tut", p); };
  const ico = k => typeof menuIcon === "function" ? menuIcon(k) : "";
  const n = v => Math.round(v).toLocaleString("ko-KR");
  const pct = p => (p * 100 >= 1 ? +(p * 100).toFixed(1) : +(p * 100).toFixed(2)) + "%";

  /* ---------- 창 ---------- */
  let cur = null, onKey = null;
  function close() {
    if (cur) { cur.remove(); cur = null; }
    if (onKey) { removeEventListener("keydown", onKey, true); onKey = null; }
    document.documentElement.classList.remove("help-open");
  }
  function open(cls, html, keys) {
    close();
    const w = document.createElement("div");
    w.className = "help-wrap " + cls;
    w.innerHTML = html;
    document.body.appendChild(w); cur = w;
    document.documentElement.classList.add("help-open");
    /* 바깥(어두운 바탕)을 누르면 닫힌다. 둘러보기는 막이 화면 전체라 바깥 누름으로 닫지 않는다 */
    w.addEventListener("click", e => { if ((e.target === w && !w.classList.contains("help-tour")) || e.target.closest("[data-close]")) close(); });
    onKey = e => {
      if (!cur) return;
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); return; }
      if (keys) keys(e);
    };
    addEventListener("keydown", onKey, true);
    return w;
  }
  const closeBtn = '<button type="button" class="hx-x" data-close aria-label="닫기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>';

  /* ---------- 그림 조각 (튜토리얼 · 매뉴얼이 같이 쓴다) ---------- */
  const mu = (name, a, d, h, cls) => `<span class="mu ${cls || ""}"><em>${name}</em><span class="mu-s"><i class="s-a" title="공격">${a}</i><i class="s-d" title="방어">${d}</i><i class="s-h" title="체력">${h}</i></span></span>`;
  const statKey = '<span class="hx-key"><i class="s-a">공</i> 공격 · <i class="s-d">방</i> 방어 · <i class="s-h">체</i> 체력</span>';
  function flowFig() {
    const st = [["보충", `두 사람 모두 핸드 ${RULES.handSize}장까지`, "뽑은 장수만큼 생명 −"], ["공격 준비", "공격하는 쪽이 먼저", "유닛 · 공격 마법 · 아이템"], ["방어 준비", "상대 배치를 보고", "유닛 · 방어 마법 · 아이템"], ["전투", "1번 칸부터 차례로", "코인 · 공격 · 반격"], ["정리", "받은 피해 회복", "공격과 방어가 바뀜"]];
    return `<ol class="hx-flow">${st.map(([t, a, b], i) => `<li style="--i:${i}"><b>${t}</b><small>${a}</small><small>${b}</small></li>`).join("")}</ol>`;
  }
  function etherFig() {
    return `<div class="hx-ether">
      <span class="hx-orb ess"><b>1</b><small>위대한 정수</small></span><i class="hx-op">+</i>
      <span class="hx-orb crys"><b>3</b><small>결정 3개</small></span><i class="hx-op">=</i>
      <span class="hx-orb eth"><b>4</b><small>이번 턴 에테르</small></span><i class="hx-op">→</i>
      <span class="hx-spend"><span><b>Lv 4</b> 한 장</span><span>또는 <b>Lv 2</b> 두 장</span><span>또는 <b>Lv 3</b> + 코인 뒤집기 1번</span></span>
    </div>`;
  }
  function slotRow(who, cells) {
    return `<div class="hx-row ${who}"><span class="hx-who">${who === "me" ? "나" : "상대"}</span>${cells.map((c, i) => `<span class="hx-slot${c ? "" : " empty"}"><small>${i + 1}</small>${c || ""}</span>`).join("")}</div>`;
  }
  function combatFig() {
    return `<div class="hx-field">${statKey}
      ${slotRow("foe", [mu("방패병", 3, 2, 5, "front"), mu("척후병", 2, 0, 2), "", "", ""])}
      <div class="hx-mid"><span>공격하는 쪽: 나 → 1번 칸부터 차례로 <b>상대의 맨 앞</b>과 맞붙는다</span></div>
      ${slotRow("me", [mu("창병", 5, 1, 4, "go"), mu("궁수", 4, 0, 3), "", "", ""])}
    </div>
    <ol class="hx-steps">
      <li><b>① 창병 → 방패병</b> 피해 = 공격 5 − 방어 2 = <em>3</em> → 방패병 체력 5 → 2. 살아남은 방패병이 <b>반격</b>: 3 − 1 = <em>2</em> → 창병 체력 4 → 2.</li>
      <li><b>② 궁수 → 방패병</b> (아직 맨 앞) 4 − 2 = <em>2</em> → 체력 2 → 0, 쓰러진다. 쓰러진 쪽은 반격하지 못한다. 척후병이 맨 앞으로 당겨진다.</li>
      <li><b>③ 끝</b> 내 유닛이 모두 한 번씩 공격했다. 받은 피해는 턴이 끝나면 낫는다 — 창병은 다음 턴 체력 4로 돌아온다.</li>
    </ol>`;
  }
  function directFig() {
    return `<div class="hx-field small">
      ${slotRow("foe", ["", "", "", "", ""])}
      <div class="hx-mid"><span>막을 유닛이 없다 → 공격 유닛의 <b>레벨만큼</b> 상대 생명이 준다</span></div>
      ${slotRow("me", [mu("Lv 3 기사", 4, 2, 5, "go"), "", "", "", ""])}
    </div>
    <p class="hx-cap">상대 생명 −3. 대신 맞은 쪽은 <b>다음 턴 에테르 +1</b>(한 턴에 한 번) — 지는 쪽에게 주는 역전의 기회.</p>`;
  }
  function spellFig() {
    const sp = (t, k) => `<span class="hx-sp k-${k}"><b>${t}</b><small>뒷면</small></span>`;
    return `<div class="hx-field small">
      ${slotRow("me", [mu("창병", 5, 1, 4), mu("궁수", 4, 0, 3), sp("공격 마법", "atk"), mu("기사", 4, 2, 5), ""])}
    </div>
    <p class="hx-cap">칸 번호 순서대로 진행된다 — 1 · 2번이 공격하고, 3번 공격 마법이 뒤집혀 발동하고, 4번 기사가 공격한다.</p>`;
  }
  function coinFig() {
    return `<div class="hx-coins">
      <span class="hx-coin h"><b>앞면</b><small>적힌 값이 붙는다</small></span>
      <span class="hx-coin t"><b>뒷면</b><small>붙지 않는다</small></span>
      <span class="hx-coin-rule"><span><b>공격하는 유닛</b> — 맞붙을 때마다 새로 던진다</span><span><b>방어하는 유닛</b> — 그 전투에서 처음 맞붙을 때 한 번, 끝까지 그대로</span><span><b>뒷면 코인 누르기</b> — 에테르 1로 그 코인만 다시 던진다 (− 코인은 앞면을 누른다)</span></span>
    </div>`;
  }
  const typeChips = () => `<div class="hx-types">
    <span class="hx-type k-unit"><b>유닛</b><small>칸에 서서 싸운다 · 유지비</small></span>
    <span class="hx-type k-atk"><b>공격 마법</b><small>내 공격 턴 · 뒷면으로 칸에</small></span>
    <span class="hx-type k-def"><b>방어 마법</b><small>내 방어 턴 · 뒷면으로 칸에</small></span>
    <span class="hx-type k-any"><b>공용 마법</b><small>어느 턴이든 · 뒷면으로 칸에</small></span>
    <span class="hx-type k-hand"><b>계략 마법</b><small>칸 없이 바로 발동</small></span>
    <span class="hx-type k-item"><b>아이템</b><small>내 유닛에 장착 · 유지비 없음</small></span>
  </div>`;

  /* 카드 읽기: 지금 덱의 실제 카드 한 장 위에 번호를 붙인다 */
  function sampleCard() {
    const g = (typeof App !== "undefined" && App.lobbyGroup) || "B1";
    const L = CARD_LIST.filter(c => c.type === "unit" && c.group === g && !c.special && !c.unique && !c.gift);
    return L.find(c => c.up > 0 && c.co && c.co.length && c.lv >= 3) || L.find(c => c.co && c.co.length) || L[0] || CARD_LIST[0];
  }
  const READ_PTS = [   // v3.19 판타지 마스터즈식 배치 (css/fmcard.css)
    [".c-type", "카드 종류", "왼쪽 위 네모 = 유닛(투구) · 마법(칼 · 방패 · 눈 — 공격 · 방어 · 공용 · 계략) · 아이템(보석). 그 옆이 이름."],
    [".c-pips", "레벨 · 유지비", "왼쪽 세로 아이콘 수 = 레벨 = 소환 비용(에테르). <b>하늘빛 테두리의 빈 아이콘 수 = 유지비</b> — 살아남으면 다음 턴부터 매 턴 그만큼 에테르가 빠진다. 유지비는 레벨 − 1까지(금빛 아이콘이 적어도 하나)."],
    [".c-box", "코인 · 특수 능력", "그림 아래 글 상자. 맨 위 줄이 코인 — 공 · 방 · 체 아이콘 뒤의 <b>+</b>와 겹친 동전. 앞면이면 그 값이 붙는다(<b>+2●</b>는 앞면마다 +2). 그 아래 공격 기술 — 유닛은 늘 한 줄로, 특수 능력이 있으면 그 이름(사격 2 · 투척 2 …), 없으면 <b>일반공격</b>. 마법은 효과. [능력]에 마우스를 올리면 뜻."],
    [".c-clsico", "클래스", "오른쪽 아래 열 맨 위 동그라미(무도 · 무장 · 마도 · 기도). 아이템의 [○○ 전용]과 같아야 장착된다."],
    [".c-vstats", "공격 · 방어 · 체력", "오른쪽 아래 세로 숫자, 위부터 공 · 방 · 체. 금빛 숫자 · 자물쇠는 아래로 깎이지 않는 값."]
  ];
  function cardReadHTML() {
    const c = sampleCard();
    return `<div class="hx-read"><div class="hx-read-card" data-read>${cardHTML(c, { size: "lg" })}</div>
      <ol class="hx-read-list">${READ_PTS.map(([, t, d], i) => `<li><span class="hx-num">${i + 1}</span><b>${t}</b><span>${d}</span></li>`).join("")}</ol></div>`;
  }
  /* 카드 위 번호: 그려진 뒤 각 부분의 자리를 재서 붙인다 */
  function pinRead(root) {
    root.querySelectorAll("[data-read]").forEach(box => {
      box.querySelectorAll(".hx-pin").forEach(x => x.remove());
      const br = box.getBoundingClientRect(); if (!br.width) return;
      READ_PTS.forEach(([sel], i) => {
        const t = box.querySelector(sel); if (!t) return;
        const r = t.getBoundingClientRect();
        const p = document.createElement("span"); p.className = "hx-pin"; p.textContent = i + 1;
        const right = sel === ".c-clsico" || sel === ".c-vstats";
        const name = sel === ".c-type";
        p.style.left = (right ? r.right - br.left + 4 : name ? r.left - br.left + Math.min(r.width / 2, 60) - 10 : r.left - br.left - 22) + "px";
        p.style.top = (name ? r.top - br.top - 22 : sel === ".c-vstats" || sel === ".c-pips" ? r.top - br.top + r.height / 2 - 10 : r.top - br.top + Math.max(0, r.height / 2 - 10)) + "px";
        box.appendChild(p);
      });
    });
  }

  /* ================= 매뉴얼 ================= */
  function kwRows(obj, gen) {
    return Object.keys(obj).map(k => {
      let t = (gen && gen[k]) || obj[k];
      t = t.replace(/\{S\}/g, "그 스탯은").replace(/\{n\}/g, "N").replace(/\{m\}/g, "4 − N");
      const label = /\{n\}/.test(obj[k]) ? `[${k} N]` : `[${k}]`;
      return `<tr><th>${esc(label)}</th><td>${esc(t)}</td></tr>`;
    }).join("");
  }
  function dragonRows() {
    if (typeof DRAGONS === "undefined") return "";
    const L = Object.values(DRAGONS).concat(typeof VOID_SEAT !== "undefined" ? [VOID_SEAT] : []);
    return L.map(d => `<tr><th>${esc(d.name)}<small>${esc(d.title)}</small></th><td><b>${esc(d.ruleName)}</b> — ${esc(d.ruleText)}</td></tr>`).join("");
  }
  function factionHTML() {
    return Object.values(FACTIONS).map(F => `<div class="mn-fac fac-${F.id}" style="--fc:${F.color}">
      <p class="mn-fac-h">${typeof factionCrestSVG === "function" ? `<span class="mn-crest">${factionCrestSVG(F.id)}</span>` : ""}<b>${F.name}</b><small>${F.en} · ${F.motto}</small></p>
      <div class="mn-groups">${F.groups.map(g => { const G = GROUPS[g]; return `<div class="mn-grp" style="--gc:${G.color}">${typeof groupEmblem === "function" ? groupEmblem(g) : ""}<div><b>${G.name}</b><small>${G.en} · ${G.role} · ${ELEMENTS[G.el] ? ELEMENTS[G.el].name || "" : ""}</small><p>${G.blurb}</p><p class="mn-motto">“${G.motto}”</p></div></div>`; }).join("")}</div>
    </div>`).join("");
  }

  const CH = [
    { id: "start", t: "처음 시작하기", en: "Getting Started", body: () => `
      <p class="mn-lead">ETHERION은 세 진영 아홉 단체 가운데 <b>한 단체의 카드 ${RULES.deckSize}장</b>으로 덱을 짜서 싸우는 카드 대전입니다. 유닛을 전장 ${RULES.slots}칸에 세우고, 마법과 아이템으로 거들어 상대의 생명 ${RULES.startLife}을 먼저 0으로 만들면 이깁니다.</p>
      <h3>들어가는 길</h3>
      <table class="mn-table"><tr><th>새 모험가</th><td>이름과 암호를 정하고, 깃발(단체)을 최대 ${typeof REG_MAX_FLAGS !== "undefined" ? REG_MAX_FLAGS : 3}개까지 무료로 골라(진영마다 하나까지) 그 덱으로 시작합니다. 지갑에는 환석 조각 ${n(ECON.startGold)}.</td></tr>
      <tr><th>로그인</th><td>등록한 이름과 암호로 들어갑니다.</td></tr>
      <tr><th>로그인 없이 시작</th><td>등록 없이 필멸자로. 아홉 단체의 덱과 모든 카드를 씁니다.</td></tr></table>
      <p class="mn-note">기록은 이 브라우저에 저장됩니다(서버 없음). 다른 브라우저나 기기에서는 이어지지 않습니다.</p>
      <h3>처음이라면 이 순서로</h3>
      <ol class="mn-ol"><li>상단 띠의 <b>튜토리얼</b>(퀘스트 옆) — 대기실 둘러보기와 전투 배우기.</li>
      <li>덱 보관함에서 덱을 고르고 <b>컴퓨터와 대전</b>. 첫 판에는 전장에 짧은 안내가 뜹니다.</li>
      <li>이기고 지며 <b>환석 조각</b>을 모아 상점에서 카드를 사고, <b>덱 조정실</b>에서 덱을 고칩니다.</li>
      <li>덱이 손에 익으면 <b>순례</b> — 하루에 한 번 열리는 길에서 여덟 관문과 망각의 숲을 지납니다.</li></ol>` },

    { id: "screens", t: "화면 안내", en: "The Halls", body: () => `
      <h3>상단 띠</h3>
      <table class="mn-table"><tr><th>왼쪽</th><td><b>대기실</b> · <b>상점</b> · <b>교역소</b> · <b>퀘스트</b> · <b>튜토리얼</b>(관리자는 <b>보관소</b>도) · <b>지도</b> · <b>연대기</b>. 지금 있는 곳 아래에 금 마름모.</td></tr>
      <tr><th>가운데</th><td><b>ETHERION</b> — 누르면 대기실로.</td></tr>
      <tr><th>오른쪽</th><td><b>설정</b> · <b>소리</b>(배경음 · 효과음 켜기/끄기와 음량) · <b>모험가 인장</b>(이름과 전적) · <b>나가기</b>.</td></tr></table>
      <h3>대기실</h3>
      <table class="mn-table"><tr><th>덱 보관함</th><td>왼쪽. 단체마다 덱 하나. 상자를 누르면 그 덱이 가운데에 펼쳐집니다. 막대 10칸 = ${RULES.deckSize}장, 금빛이면 저장된 덱(출전 가능).</td></tr>
      <tr><th>덱 보기</th><td>가운데. 단체 소개와 레벨 곡선(레벨별 장수), 종류(유닛 · 마법 · 아이템)와 등급으로 거르기, 카드를 누르면 크게.</td></tr>
      <tr><th>출정의 단</th><td>PC는 오른쪽 열 아래 2 × 2, 폰은 깃발을 누르면 뜨는 창. <b>덱 조정실</b> · <b>컴퓨터와 대전</b> · <b>순례</b> · <b>온라인 대전</b>(친구와 각자의 기기에서 · 방 코드로).</td></tr>
      <tr><th>수레바퀴 · 채팅</th><td>오른쪽. 크로네아의 수레바퀴(대전 한 판마다 표 1장), 대기실 채팅(지금은 이 기기에만 저장).</td></tr>
      <tr><th>레벨 판</th><td>아래 가운데. 모험가 레벨 · 환석 조각 · 다음 레벨까지의 경험치.</td></tr>
      <tr><th>튜토리얼 · 매뉴얼 · 룰북</th><td>튜토리얼은 상단 띠의 퀘스트 옆, 매뉴얼 · 룰북은 <b>연대기</b>를 열면 위쪽 머리에서 고릅니다. 언제든 다시 열 수 있습니다.</td></tr></table>
      <h3>덱 조정실 · 상점</h3>
      <p><b>덱 조정실</b>은 덱을 고치는 곳입니다. 왼쪽 카드 보관함에서 눌러 넣고, 오른쪽 덱에서 눌러 뺍니다. 바닥 마법진의 눈금 ${RULES.deckSize}개가 장수만큼 켜지고, 촛불 여덟이 레벨 곡선을 보여 줍니다. <b>저장</b>해야 출전할 수 있습니다.</p>
      <p><b>상점</b>(린데어 자유시)는 카드를 사고파는 곳입니다. 왼쪽 계보에서 진영 · 단체를 고르면 그 카드가 값 · 재고와 함께 나옵니다.</p>
      <h3>전장</h3>
      <p>위가 상대, 아래가 나. 소각장은 맨 왼쪽, 덱은 오른쪽, 내 에테르(결정)는 왼쪽 아래, 핸드는 아래 한 줄. 가운데 띠에 지금 단계 · 턴 시간 · <b>준비 완료</b> · 설정칸(속도 · 설정 · 기록 · 규칙 · 소리 · 항복).</p>` },

    { id: "cards", t: "카드", en: "Cards", body: () => `
      <h3>종류</h3>${typeChips()}
      <h3>카드 읽기</h3>${cardReadHTML()}
      <p>전장의 핸드 · 전장 카드는 그림이 잘 보이게 간단히 나옵니다 — 이름 · 레벨 아이콘 · 공격/방어/체력 · 특수 능력만. 레벨 숫자 · 클래스 · 설명은 카드를 <b>누르면</b> 상대 전장 오른쪽에 뜨는 큰 카드에서 봅니다.</p>
      <h3>등급</h3>
      <p>카드 이름 아래 · 상점 단추 옆의 색이 등급입니다. 희귀할수록 상점 재고가 적습니다. 유니크 · 스페셜 · 강화는 덱에 한 장만 넣을 수 있습니다. 강화는 같은 카드 3장을 합쳐서만 얻습니다.</p>
      <p class="mn-tip">등급마다 카드 수 · 덱에 넣는 장수 · 상점 값은 <a href="#" data-rb="cards">룰북 「카드와 등급」</a>에.</p>
      <h3>클래스</h3>
      <p>유닛은 클래스 하나(<span class="mn-cl cl-1">무도</span> <span class="mn-cl cl-2">무장</span> <span class="mn-cl cl-3">마도</span> <span class="mn-cl cl-4">기도</span>)를 가집니다. 클래스는 <b>아이템 장착에만</b> 쓰입니다 — 유닛 오른쪽 아래 열 맨 위의 클래스 아이콘이 아이템 이름 옆의 <b>[○○ 전용]</b>에 들어 있으면 장착됩니다. <span class="mn-cl cl-0">공용</span> 아이템은 누구에게나. 아이템에는 클래스 아이콘이 없습니다.</p>` },

    { id: "deck", t: "덱 만들기", en: "Building a Deck", body: () => `
      <table class="mn-table"><tr><th>장수</th><td>정확히 <b>${RULES.deckSize}장</b>.</td></tr>
      <tr><th>같은 카드</th><td><b>${RULES.maxCopies}장</b>까지. 유니크 · 스페셜처럼 한 장만 되는 카드는 카드에 적혀 있습니다.</td></tr>
      <tr><th>단체</th><td><b>한 단체의 카드만</b> — 그 단체의 유닛 · 마법 · 아이템.</td></tr>
      <tr><th>저장</th><td>${RULES.deckSize}장을 맞추고 <b>저장</b>해야 대전 · 순례에 나갈 수 있습니다. 덱 조정실의 「기본 덱」으로 처음 덱을 다시 불러옵니다.</td></tr></table>
      <h3>요령</h3>
      <ul class="mn-ul"><li><b>레벨 곡선</b>: 에테르는 결정이 쌓이며 천천히 늘어납니다. 낮은 레벨(1~3) 카드가 넉넉해야 초반에 칸을 채울 수 있습니다.</li>
      <li><b>결정 재료</b>: 핸드 카드는 결정이 됩니다. 쓰기 애매한 카드도 결정으로 바뀌어 에테르가 됩니다.</li>
      <li><b>유지비</b>: 빈 아이콘이 많은 큰 유닛은 강하지만 매 턴 에테르를 먹습니다. 두세 장이면 충분합니다.</li>
      <li><b>마법 · 아이템</b>: 공격 마법은 공격 턴, 방어 마법은 방어 턴에만 냅니다. 한쪽에 치우치지 않게.</li></ul>
      <p class="mn-note">상점에서 산 카드는 그 단체 덱의 초안에 바로 들어갈 수 있습니다(상점의 「산 카드를 덱 초안에 바로 넣기」).</p>` },

    { id: "flow", t: "대전의 흐름", en: "Flow of a Duel", body: () => `
      <h3>시작</h3>
      <p>생명 ${RULES.startLife} · 덱 ${RULES.deckSize}장. 동전으로 먼저 공격할 쪽을 정하고, 두 사람 모두 핸드 ${RULES.handSize}장을 뽑습니다(생명 ${RULES.startLife - RULES.handSize}). 처음에 한 번 <b>멀리건</b> — 고른 카드를 덱에 되돌리고 같은 장수를 새로 뽑습니다(생명은 줄지 않음).</p>
      <h3>한 턴</h3>${flowFig()}
      <ul class="mn-ul"><li><b>보충</b>: 턴이 시작되면 두 사람 모두 핸드를 ${RULES.handSize}장까지 뽑고, <b>뽑은 장수만큼(최소 1) 생명이 줄어듭니다.</b> 핸드를 많이 쓸수록 생명이 빨리 줍니다.</li>
      <li><b>공격 준비 → 방어 준비</b>: 공격하는 쪽이 먼저 놓고 준비 완료, 방어하는 쪽은 그 배치를 보고 놓습니다. 마법은 뒷면이라 상대에게 보이지 않습니다.</li>
      <li><b>전투</b>: 저절로 진행됩니다. 코인을 세우고, 손해 본 코인(뒷면 + 코인 · 앞면 − 코인)을 뒤집을지 고르는 것만 합니다.</li>
      <li><b>정리</b>: 받은 피해가 낫고, 다음 턴에는 공격과 방어가 바뀝니다. 공격 턴과 방어 턴이 한 번씩 지나면 <b>1 라운드</b>.</li></ul>
      <h3>승패</h3>
      <p><b>생명이 0 아래로</b> 깎이거나 <b>덱이 0</b>이 되면 집니다. 생명이 딱 0인 동안은 아직 지지 않아 공격 · 방어를 계속할 수 있습니다. 두 사람이 동시에 그렇게 되면 다음 턴에 공격할 쪽이 집니다. 설정칸의 항복으로 언제든 끝낼 수 있습니다(패배로 기록).</p>` },

    { id: "ether", t: "에테르 · 결정 · 유지비", en: "Ether", body: () => `
      ${etherFig()}
      <table class="mn-table"><tr><th>에테르</th><td>카드를 내는 힘. <b>위대한 정수 ${RULES.essence} + 결정 수</b>가 매 턴 들어옵니다. 남은 에테르는 다음 턴으로 넘어가지 않습니다.</td></tr>
      <tr><th>비용</th><td><b>Lv N 카드 = 에테르 N</b> (유닛 · 마법 · 아이템 모두).</td></tr>
      <tr><th>결정화</th><td>준비 단계에 핸드 1장을 내 에테르(왼쪽 아래 원)에 놓으면 <b>결정</b>이 되어 매 턴 에테르가 1 늘어납니다. 바친 카드는 <b>소각장</b>으로 갑니다(결정은 그대로 남습니다). 한 턴에 ${RULES.crystalsPerTurn}장씩 한도가 쌓이므로, 세 턴 쉬었다면 한 번에 세 장도 됩니다. 결정은 최대 ${RULES.maxCrystals}개(에테르 최대 ${RULES.essence + RULES.maxCrystals}).</td></tr>
      <tr><th>유지비</th><td>레벨 아이콘 중 <b>하늘빛 테두리의 빈 칸 수</b>(최대 레벨 − 1). 소환할 때는 레벨만큼 내고, 살아남으면 <b>다음 턴부터 매 턴</b> 그만큼 에테르가 빠집니다. 준비를 마칠 때 모자라면 유지비가 큰 유닛부터 소각됩니다.</td></tr>
      <tr><th>직접 공격 보너스</th><td>막지 못해 생명을 맞은 쪽은 <b>다음 턴에만 에테르 +1</b> (한 턴에 한 번).</td></tr>
      <tr><th>장전</th><td>[장전 N]이 붙은 마법을 쓰면 다음 턴 에테르가 N 줄어듭니다.</td></tr></table>
      <p class="mn-tip">남긴 에테르는 버려지지 않습니다 — 전투 중 <b>뒷면 코인(− 코인은 앞면)을 다시 던지는 데</b>(에테르 1) 씁니다.</p>` },

    { id: "combat", t: "전투와 코인", en: "Combat & Coins", body: () => `
      ${combatFig()}
      <h3>맞붙기</h3>
      <ul class="mn-ul"><li>공격하는 쪽 유닛이 <b>1번 칸부터 차례로</b>, 상대 대기열의 <b>맨 앞 유닛</b>과 맞붙습니다(같은 번호끼리가 아닙니다). 유닛마다 한 번씩 공격합니다.</li>
      <li><b>피해 = 공격 − 방어</b> (0 아래로는 내려가지 않음). 체력이 0이 되면 쓰러져 부서지고, 남은 카드는 왼쪽으로 당겨집니다.</li>
      <li>맞은 유닛이 살아 있으면 <b>반격</b>합니다(같은 계산).</li>
      <li>받은 피해는 그 턴 안에서만 쌓이고, 턴이 끝나면 낫습니다. <b>한 턴 안에 쓰러뜨려야</b> 합니다.</li>
      <li>상대 칸이 비어 막을 유닛이 없으면, 공격 유닛의 <b>레벨만큼</b> 상대 생명이 줍니다.</li></ul>
      ${directFig()}
      <h3>코인</h3>${coinFig()}
      <ul class="mn-ul"><li>코인의 앞면이 나올 확률은 ${Math.round(RULES.coinP * 100)}%. 공 · 방 · 체 코인이 같은 순번이면 동전 하나로 함께 앞 · 뒷면이 됩니다. 장착한 아이템의 코인도 함께 셉니다(동전은 최대 5개).</li>
      <li>내 코인은 내가 <b>운명 봉인</b>(Space · Enter)으로 세웁니다. 몇 초가 지나면 저절로 멈춥니다.</li>
      <li>멈춘 뒤 내 유닛의 <b>뒷면 코인을 누르면 에테르 1</b>로 그 코인만 다시 던집니다. <b>− 코인</b>(앞면이면 값이 깎이는 코인)은 거꾸로 <b>앞면</b>이 나왔을 때 다시 던집니다. 맞붙을 때마다 한 번. 이미 정해진 방어 코인은 다시 던질 수 없습니다.</li>
      <li><b>한 번 정해진 코인은 마법으로도 바뀌지 않습니다.</b> 코인을 건드리는 마법은 아직 던지지 않은 코인에만 듣습니다.</li>
      <li>코인 때문에 체력이 0 이하가 되면 그 유닛은 쓰러집니다.</li></ul>` },

    { id: "rites", t: "마법", en: "Rites", body: () => `
      <table class="mn-table"><tr><th><span class="mn-dot k-atk"></span>공격 마법</th><td>내 공격 턴에만. 칸에 뒷면으로 놓입니다.</td></tr>
      <tr><th><span class="mn-dot k-def"></span>방어 마법</th><td>내 방어 턴에만. 칸에 뒷면으로 놓입니다.</td></tr>
      <tr><th><span class="mn-dot k-any"></span>공용 마법</th><td>어느 턴에든. 칸에 뒷면으로 놓입니다.</td></tr>
      <tr><th><span class="mn-dot k-hand"></span>계략 마법</th><td>핸드를 겨냥하는 마법. 공격 · 방어 준비 어느 때나, 칸 없이 내는 즉시 발동합니다. 핸드 카드에 건 스탯 변화는 그 카드가 전장에 나와도 이 판 내내 남습니다.</td></tr></table>
      <h3>핸드의 짧은 문구</h3>
      <ul class="mn-ul"><li>핸드 · 전장의 마법 카드 아래쪽에는 효과가 짧게 적혀 있습니다. 전문은 카드를 누르면 크게 보입니다.</li>
      <li>앞의 칩이 대상입니다. <b>적 앞 2개</b> · <b>적 유닛 2</b> = 상대 맨 앞 유닛 2기 · <b>적 최강 1개</b> = 공격이 가장 높은 1기 · <b>아군 유닛 2</b> = 이 마법 뒤의 아군 유닛 2기 · <b>나</b> = 내 생명 · <b>대가</b> = 먼저 내는 생명. 붉은 칩은 상대, 푸른 칩은 내 쪽, 금 칩은 양쪽입니다.</li>
      <li>칼 · 방패 · 핏방울은 공격 · 방어 · 체력, <b>+●</b>는 카드 숫자 옆과 같은 코인입니다. 끝의 <b>더</b>는 앞 줄에 더해 받는다는 뜻입니다.</li></ul>
      <h3>언제 발동하나</h3>
      ${spellFig()}
      <ul class="mn-ul"><li>마법도 대기열의 한 자리입니다. 같은 때면 공격 마법 → 방어 마법, 같은 쪽이면 칸 번호 순.</li>
      <li>“적 유닛 N”은 마법을 놓은 자리와 상관없이 <b>상대 대기열의 맨 앞 N기</b>입니다(상대 유닛이 N기보다 적으면 모두). “아군 유닛 N”은 이 마법 <b>뒤에 있는 아군 유닛 N기</b>입니다. 둘 다 사이에 놓인 마법 칸은 건너뛰고 유닛만 셉니다. 쓴 마법은 그 자리에서 부서집니다.</li>
      <li>전장은 늘 <b>왼쪽부터 빈틈없이</b> 찹니다. 새 카드는 맨 왼쪽 빈 칸에 놓이고, 카드가 부서지면 남은 카드가 바로 왼쪽으로 당겨집니다("이 칸에 부른다" 소환물은 그 자리를 채웁니다). 순서는 전장의 카드를 끌어 옮겨 바꿉니다.</li>
      <li>뒷면 마법은 준비하는 동안만 상대에게 가려집니다. <b>전투가 시작되면 양쪽 마법이 모두 앞면으로</b> 보입니다.</li></ul>
      <h3>피해와 체력 −</h3>
      <p><b>피해</b>는 <b>방어만큼 줄어든 뒤</b> 체력을 깎습니다 — 맞붙기 · 반격 · 투척 · 연쇄 · 꿰뚫기, 그리고 <b>물리 피해</b>라고 적힌 마법(마법이 부른 유닛의 공격도). 피해 3이 방어 1인 유닛에게는 2가 들어갑니다.</p>
      <p><b>체력 −N</b>은 <b>방어와 상관없이</b> 체력이 N 깎입니다 — 대부분의 마법 · 사격 · 불씨 · 축전. <b>체력 −2 −1●</b>은 2가 깎이고 코인 앞면마다 1이 더 깎인다는 뜻입니다.</p>
      <p>둘 다 <b>보호막</b>(통째로 막음, 보호막 코인은 절반)과 <b>가호</b>(N만큼 줄임)에는 막힙니다. "맨 앞 유닛 2개" · "적 유닛 2" · "아군 유닛 2"처럼 유닛을 세는 마법은 그 사이에 놓인 마법 칸을 건너뛰고 유닛만 셉니다.</p>
      <h3>메아리 · 빼앗기 · 대칭 · 대가</h3>
      <p><b>메아리</b> 마법(토네이도)은 전장 위에서 작은 마법을 불러 이어서 발동합니다. <b>빼앗기</b>(그림자 강탈)는 그 마법과 같은 칸 번호의 상대 카드를 가져와 내 전장 맨 뒤에 놓습니다 — 유닛이면 이번 턴 내 유닛(공격 턴이면 내 다른 유닛들 다음에 공격), 뒷면 마법이면 내 마법으로 발동합니다. 가져온 카드는 전투가 끝나면 원래 주인의 소각장으로 갑니다. <b>대칭</b>(거울 반전)은 상대 전장의 배치를 맨 앞 ↔ 맨 뒤로 뒤집습니다(대기 중인 마법 포함). 생명을 대가로 하는 마법은 발동할 때 생명을 냅니다(역전 마법에는 생명 대가가 없습니다).</p>
      <h3>스탯을 옮기는 마법 (v3.20)</h3>
      <p><b>순환</b>은 공격 → 방어 → 체력 → 공격으로, <b>역순환</b>은 공격 → 체력 → 방어 → 공격으로 값을 한 칸씩 옮깁니다. <b>맞바꿈</b>은 두 스탯을, <b>교환</b>은 아군 맨 앞과 상대 맨 앞의 같은 스탯을 바꿉니다. 체력은 남은 체력으로 읽고, 체력이 새 값이 되면 받은 피해는 지워집니다. <b>체력이 0이 되는 유닛은 쓰러집니다</b> — 방어 0인 유닛에게 순환을 걸면 그렇습니다. 🔒 고정된 스탯은 제자리에 남고, ▲ 버팀 · ▼ 눌림은 기준값에서 멈춥니다. 표시를 이번 턴만 거는 마법도 있습니다(강철 맹세 · 족쇄 등).</p>` },

    { id: "relics", t: "아이템", en: "Relics", body: () => `
      <ul class="mn-ul"><li>공격 · 방어 준비 어느 때나 <b>전장의 내 유닛 하나</b>에 장착합니다(핸드에서 유닛 위로 끌어 놓기). 유닛 하나에 하나.</li>
      <li><b>클래스가 맞아야</b> 합니다 — 아이템 이름 옆 <b>[마도 전용]</b>처럼 적힌 클래스가 유닛 오른쪽 아래 열 맨 위의 클래스 아이콘과 같으면 장착. [공용]은 누구에게나.</li>
      <li>비용은 레벨만큼, <b>유지비는 없습니다.</b> 아이템의 공 · 방 · 체와 코인이 유닛에 더해지고, [능력]이 생깁니다.</li>
      <li>[고정 공/방/체] 아이템은 유닛의 값을 적힌 값으로 바꿉니다(유닛 코인은 던지지 않음).</li>
      <li><b>스탯 표시</b>(v3.20) — 공 · 방 · 체 숫자 옆의 작은 그림. <b>🔒 고정</b>: 증가 · 감소 효과를 모두 받지 않습니다(그 스탯의 코인은 던지지 않음). <b>▲ 버팀</b>: 감소 효과를 받지 않습니다(피해 제외). <b>▼ 눌림</b>: 증가 효과를 받지 않습니다. 증가 · 감소 효과는 마법 · 특수능력 · 코인 · 저주로 스탯이 오르내리는 것입니다. 기준은 카드에 적힌 값(아이템이 더한 값 포함)이고, 받은 피해는 셋 다 그대로 쌓입니다. 체력에는 고정이 없습니다.</li>
      <li>아이템도 표시를 붙입니다. 숫자 없이 그림만 있으면 장착한 유닛의 그 스탯을 지금 값에서 묶고, <b>7🔒</b>처럼 부호 없는 숫자와 함께면 유닛 값과 상관없이 그 값이 됩니다. 유닛과 아이템의 표시가 겹치면 아이템을 따릅니다.</li>
      <li>유닛이 부서지면 아이템도 함께 부서집니다.</li></ul>
      <p class="mn-note">능력의 뜻은 다음 장 「능력 사전」에 모았습니다. 카드의 [능력]에 마우스를 올려도 나옵니다.</p>` },

    { id: "glossary", t: "능력 사전", en: "Glossary", body: () => `
      <h3>아이템 · 유닛 능력</h3>
      <table class="mn-table mn-kw">${kwRows(ITEM_KW, typeof ITEM_KW_GEN !== "undefined" ? ITEM_KW_GEN : null)}</table>
      <h3>마법의 능력</h3>
      <table class="mn-table mn-kw">${kwRows(SPELL_KW)}</table>
      <p class="mn-note">N은 카드에 적힌 숫자입니다. 예: [가호 2]는 매 턴 처음 받는 피해를 2만큼 줄인다.</p>` },

    { id: "actions", t: "할 수 있는 일", en: "Actions", body: () => `
      <table class="mn-table"><tr><th>소환 · 놓기</th><td>핸드 카드를 빈 칸에 끌어 놓거나 <b>더블클릭</b>(왼쪽부터 빈 칸). 빈 칸이 없으면 낼 수 없습니다.</td></tr>
      <tr><th>장착</th><td>아이템을 내 유닛 위에 끌어 놓습니다.</td></tr>
      <tr><th>결정화</th><td>핸드 카드를 내 에테르 원에 끌어 놓습니다 (C).</td></tr>
      <tr><th>자리 옮기기</th><td>전장 카드를 다른 칸으로 끌면 그 칸에 끼워 넣고 사이의 카드가 한 칸씩 밀립니다. 비용 없음.</td></tr>
      <tr><th>소각</th><td>핸드나 전장의 카드를 소각장(맨 왼쪽)에 버립니다 (X). 유지비를 줄이거나 칸을 비울 때. 소각한 카드는 조각이 되지 않습니다.</td></tr>
      <tr><th>셔플</th><td>핸드 전부를 덱에 섞고 같은 장수를 다시 뽑습니다 (S). 한 턴에 한 번, <b>생명 −1</b>. 그 턴에 카드를 냈거나 소각했으면 할 수 없습니다.</td></tr>
      <tr><th>코인 뒤집기</th><td>전투 중 내 유닛의 뒷면 코인(− 코인은 앞면 코인)을 눌러 에테르 1로 다시 던집니다.</td></tr>
      <tr><th>준비 완료</th><td>다 놓았으면 누릅니다 (Enter). 에테르가 모자라면 한 번 묻습니다.</td></tr></table>` },

    { id: "keys", t: "조작과 단축키", en: "Controls", body: () => `
      <table class="mn-table mn-keys">
      <tr><th><kbd>1</kbd>~<kbd>9</kbd></th><td>핸드 카드 고르기. 같은 번호를 한 번 더 = 전장에 올리기</td></tr>
      <tr><th><kbd>Q</kbd> <kbd>W</kbd> <kbd>E</kbd> <kbd>R</kbd> <kbd>T</kbd></th><td>1~5번 칸: 고른 카드를 놓기 · 장착 / 빈손이면 내 유닛 고르기 / 고른 유닛이 있으면 자리 옮기기</td></tr>
      <tr><th><kbd>C</kbd></th><td>고른 핸드 카드를 결정화</td></tr>
      <tr><th><kbd>X</kbd></th><td>고른 카드를 소각</td></tr>
      <tr><th><kbd>S</kbd></th><td>셔플</td></tr>
      <tr><th><kbd>Enter</kbd></th><td>준비 완료</td></tr>
      <tr><th><kbd>Space</kbd> · <kbd>Enter</kbd></th><td>코인 멈추기(운명 봉인)</td></tr>
      <tr><th><kbd>A</kbd></th><td>코인 '자동으로 봉인' 켜고 끄기 (전투 중 언제든 · 코인 창에서도)</td></tr>
      <tr><th><kbd>Esc</kbd></th><td>고른 것 취소 · 창 닫기</td></tr></table>
      <ul class="mn-ul"><li>카드를 누르면 상대 전장 오른쪽에 원본 카드가 크게 뜹니다(레벨 · 클래스 · 설명 · 지금 스탯). 내 카드면 왼쪽에 단추도 나옵니다. 다시 누르기 · 빈 곳 누르기 · Esc로 닫습니다. 소각장을 누르면 맨 위 카드를 봅니다.</li>
      <li>끌어서 놓기: 핸드 → 빈 칸(소환) · 내 유닛(장착) · 에테르(결정화) · 소각장. 전장 카드 → 다른 칸 · 소각장.</li>
      <li>설정칸의 속도(×0.5~×3)로 전투 빠르기를 바꿉니다. 「기록」에 지난 일이, 「규칙」에 짧은 요약이 있습니다.</li></ul>` },

    /* v3.55 순례 · 합성 · 상점 · 보상 · 교역소 · 레벨은 룰북(js/rulebook.js)으로 옮겼다 — 숫자도 거기서 데이터로 읽는다 */
    { id: "rulebook", t: "룰북 — 게임의 짜임", en: "Rulebook", body: () => typeof RULEBOOK === "undefined" ? "<p>룰북 파일이 없습니다.</p>" : `
      <p>상점 · 합성소(강화 · 승화) · 파친코 · 성로 순례 · 대전 보상 · 퀘스트 · 교역소 · 레거시 · 계정은 <b>룰북</b>에 섹션별로 있습니다. 대기실의 「룰북」 명판으로도 엽니다.</p>
      <ul class="mn-ul mn-rb">${RULEBOOK.map(x => `<li><a href="#" data-rb="${x.id}"><b>${x.t}</b></a> — ${x.sum || ""}</li>`).join("")}</ul>` },

    { id: "world", t: "세 진영 아홉 단체", en: "Factions", body: () => `
      <p>세 진영은 힘의 근원이 다릅니다 — 거인에게서 캔 아다만트, 숲과 대지, 신과 별. 이야기는 상단 띠의 <b>연대기</b>에서 읽을 수 있습니다.</p>${factionHTML()}` }
  ];

  function manualHTML() {
    return `<div class="man" role="dialog" aria-modal="true" aria-label="ETHERION 매뉴얼">
      <header class="man-head"><p class="hx-eyebrow">THE ADVENTURER'S CODEX</p><h2>매뉴얼</h2>${closeBtn}</header>
      <div class="man-body">
        <nav class="man-toc" aria-label="목차">
          <label class="man-find"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg><input type="search" placeholder="찾기 — 예: 유지비, 코인" aria-label="매뉴얼에서 찾기"></label>
          <ol>${CH.map((c, i) => `<li><a href="#mn-${c.id}" data-go="${c.id}"><span class="no">${String(i + 1).padStart(2, "0")}</span><span class="tt">${c.t}<small>${c.en}</small></span></a></li>`).join("")}</ol>
          <p class="man-none" hidden>찾는 말이 없습니다.</p>
        </nav>
        <div class="man-page" tabindex="0">${CH.map((c, i) => `<section class="mn-sec" id="mn-${c.id}" data-ch="${c.id}"><h2 class="mn-h"><span class="no">${String(i + 1).padStart(2, "0")}</span><span>${c.t}</span><small>${c.en}</small></h2>${c.body()}</section>`).join("")}
          <p class="mn-end">— 끝 —<br><small>모든 이름은 가칭입니다. 규칙의 근거는 js/game.js · js/engine.js 머리 주석과 docs/CHANGELOG.md.</small></p></div>
      </div>
    </div>`;
  }

  const Manual = {
    open(ch) {
      const w = open("help-manual", manualHTML());
      const page = w.querySelector(".man-page"), toc = w.querySelector(".man-toc");
      const links = [...toc.querySelectorAll("[data-go]")], secs = [...page.querySelectorAll(".mn-sec")];
      const setOn = id => links.forEach(a => a.classList.toggle("on", a.dataset.go === id));
      const go = id => { const s = page.querySelector("#mn-" + id); if (s) { page.scrollTop = s.offsetTop - 8; setOn(id); } };
      toc.addEventListener("click", e => { const a = e.target.closest("[data-go]"); if (!a) return; e.preventDefault(); if (!a.closest("li").hidden) go(a.dataset.go); });
      page.addEventListener("click", e => { const a = e.target.closest("[data-rb]"); if (!a || typeof RulebookUI === "undefined") return; e.preventDefault(); RulebookUI.open(a.dataset.rb); });   // v3.55 룰북으로
      /* 읽는 자리에 따라 목차 표시 */
      page.addEventListener("scroll", () => {
        const y = page.scrollTop + 40; let id = secs[0].dataset.ch;
        for (const s of secs) { if (s.hidden) continue; if (s.offsetTop <= y) id = s.dataset.ch; }
        setOn(id);
      }, { passive: true });
      /* 찾기: 그 말이 든 장만 남긴다 */
      const inp = toc.querySelector("input"), none = toc.querySelector(".man-none");
      inp.addEventListener("input", () => {
        const q = inp.value.trim().toLowerCase(); let shown = 0;
        secs.forEach((s, i) => { const hit = !q || s.textContent.toLowerCase().includes(q); s.hidden = !hit; links[i].closest("li").hidden = !hit; if (hit) shown++; });
        none.hidden = shown > 0; page.scrollTop = 0;
      });
      requestAnimationFrame(() => { pinRead(w); if (ch) go(ch); else setOn(CH[0].id); });
      w.querySelector(".man-page").focus({ preventScroll: true });
    }
  };

  /* ================= 튜토리얼 ================= */
  /* ① 대기실 둘러보기: 실제 화면의 칸을 밝혀 짚는다 */
  const TOUR = [
    { sel: ".decks", t: "덱 보관함", x: `단체마다 덱이 하나씩 있습니다. 상자를 누르면 그 덱이 가운데에 펼쳐집니다. 막대 10칸이 ${RULES.deckSize}장, <b>금빛</b>이면 저장되어 출전할 수 있는 덱입니다.` },
    { sel: ".dv-filter", t: "거르기", x: "전체 · 유닛 · 마법 · 아이템 명판과 그 아래 등급 칸. 누르면 그것만 보입니다. 다시 누르면 돌아옵니다." },
    { sel: "#dv-cards", t: "카드", x: "덱에 든 카드. <b>누르면 크게</b> 보고 설명을 읽을 수 있습니다. 카드의 [능력]에 마우스를 올리면 뜻이 나옵니다.", top: true },
    { sel: "#go-edit", t: "덱 조정실", x: `덱을 고치는 곳. ${RULES.deckSize}장 · 같은 카드 ${RULES.maxCopies}장까지 · 한 단체의 카드만. <b>저장</b>해야 출전합니다.` },
    { sel: ".altar-gates", t: "출정의 단", x: "<b>컴퓨터와 대전</b>(상대 단체를 골라 한 판) · <b>순례</b>(하루에 한 번 · 여덟 관문과 망각의 숲, 첫 승에 큰 보상) · <b>온라인 대전</b>(친구와 방 코드로)." },
    { sel: "#wheel-host", t: "크로네아의 수레바퀴", x: "대전을 한 판 마칠 때마다 표 1장. 문양 셋이 맞으면 환석 조각, 아주 드물게 카드." },
    { sel: ".chat", t: "대기실 채팅", x: "지금은 서버가 없어 이 기기에만 저장됩니다." },
    { sel: ".tbw-left", t: "길", x: "<b>대기실</b> · <b>상점</b>(카드를 사고팔기) · <b>교역소</b>(모험가끼리 카드 맞바꾸기) · <b>퀘스트</b> · <b>튜토리얼</b> · <b>지도</b> · <b>연대기</b>. 관리자는 <b>보관소</b>도. 가운데 ETHERION을 누르면 언제든 대기실로 돌아옵니다." },
    { sel: ".tbw-right", t: "설정 · 소리 · 인장", x: "화면 설정, 배경음 · 효과음, 내 인장(레벨 · 전적), 나가기." },
    { sel: ".user-chip.seal", t: "모험가 인장", x: "구슬의 숫자가 <b>모험가 레벨</b>, 그 아래 금빛 막대가 경험치. 이름 옆은 전적과 승률. <b>벌어들인 조각이 곧 경험치</b> — 카드를 사도 줄지 않습니다." },
    { sel: ".tb-shard", t: "환석 조각", x: "지갑. 전투 · 순례 · 수레바퀴로 모으고 상점에서 카드를 삽니다. 누르면 상점으로." },
    { sel: '.tb-nav[data-nav="tutorial"]', t: "튜토리얼 · 매뉴얼 · 룰북", x: "튜토리얼은 언제든 여기서 다시. <b>매뉴얼</b>(규칙 전부와 능력 사전) · <b>룰북</b>(상점 · 합성 · 순례 · 보상)은 <b>연대기</b>를 열면 위쪽에서 고릅니다. 다음은 <b>전투 배우기</b>입니다." }
  ];
  const Tour = {
    i: 0, w: null, list: [],
    start() {
      if (typeof showLobby === "function" && App.screen !== "lobby") showLobby();
      this.list = TOUR.filter(s => { const el = document.querySelector(s.sel); return el && el.getClientRects().length; });
      if (!this.list.length) return;
      this.i = 0;
      this.w = open("help-tour", `<div class="tour-hole" aria-hidden="true"></div><div class="tour-tip" role="dialog" aria-live="polite"></div>`, e => {
        if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); this.go(1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); this.go(-1); }
      });
      /* 밝힌 칸 밖을 눌러도 닫히지 않는다(어두운 막이 화면을 덮음) */
      this.w.addEventListener("click", e => {
        const b = e.target.closest("[data-t]"); if (!b) return;
        if (b.dataset.t === "next") this.go(1); else if (b.dataset.t === "prev") this.go(-1); else if (b.dataset.t === "end") close(); else if (b.dataset.t === "lesson") Lesson.open();
      });
      this.onResize = () => { if (this.w && this.w.isConnected) this.place(); else removeEventListener("resize", this.onResize); };
      addEventListener("resize", this.onResize);
      this.show();
    },
    go(d) {
      const j = this.i + d;
      if (j < 0) return;
      if (j >= this.list.length) { mark("tour"); Tutorial.open(); return; }
      this.i = j; this.show();
    },
    show() {
      const s = this.list[this.i], el = document.querySelector(s.sel); if (!el) return;
      /* 화면 밖이면 보이는 곳으로 */
      const r = el.getBoundingClientRect(), top = (document.querySelector(".topbar") || { offsetHeight: 0 }).offsetHeight;
      const fixed = getComputedStyle(el).position === "fixed" || el.closest(".topbar,.lv-hud");
      if (!fixed && (r.top < top + 8 || r.bottom > innerHeight - 8)) {
        const want = s.top || r.height > innerHeight - top - 40 ? r.top - top - 24 : r.top - (innerHeight - r.height) / 2;
        scrollBy({ top: want, behavior: "instant" });
      }
      const last = this.i === this.list.length - 1;
      this.w.querySelector(".tour-tip").innerHTML = `<p class="hx-eyebrow">대기실 둘러보기 · ${this.i + 1} / ${this.list.length}</p><h3>${s.t}</h3><p class="tt-x">${s.x}</p>
        <div class="tt-btns"><button type="button" class="btn xs ghost" data-t="end">끝내기</button><span class="tt-sp"></span>${this.i ? '<button type="button" class="btn xs" data-t="prev">이전</button>' : ""}<button type="button" class="btn xs primary" data-t="next">${last ? "다 봤어요" : "다음"}</button></div>`;
      requestAnimationFrame(() => this.place());
    },
    place() {
      const s = this.list[this.i], el = s && document.querySelector(s.sel); if (!el || !this.w) return;
      const hole = this.w.querySelector(".tour-hole"), tip = this.w.querySelector(".tour-tip");
      const r = el.getBoundingClientRect(), m = 8;
      const L = Math.max(4, r.left - m), T = Math.max(4, r.top - m), R = Math.min(innerWidth - 4, r.right + m), B = Math.min(innerHeight - 4, r.bottom + m);
      Object.assign(hole.style, { left: L + "px", top: T + "px", width: (R - L) + "px", height: (B - T) + "px" });
      const tw = tip.offsetWidth, th = tip.offsetHeight, g = 16;
      /* 오른쪽 → 왼쪽 → 아래 → 위 → 가운데 중 들어가는 곳 */
      const opts = [[R + g, (T + B) / 2 - th / 2, R + g + tw <= innerWidth - 8], [L - g - tw, (T + B) / 2 - th / 2, L - g - tw >= 8],
        [(L + R) / 2 - tw / 2, B + g, B + g + th <= innerHeight - 8], [(L + R) / 2 - tw / 2, T - g - th, T - g - th >= 8]];
      const o = opts.find(x => x[2]) || [innerWidth / 2 - tw / 2, innerHeight / 2 - th / 2];
      tip.style.left = Math.max(8, Math.min(innerWidth - tw - 8, o[0])) + "px";
      tip.style.top = Math.max(8, Math.min(innerHeight - th - 8, o[1])) + "px";
    }
  };

  /* ② 전투 배우기: 그림 아홉 쪽 */
  const PAGES = [
    { t: "무엇을 하면 이기나", x: () => `<div class="hx-goal"><span class="hx-life"><b>${RULES.startLife}</b><small>생명</small></span><span class="hx-vs">VS</span><span class="hx-life foe"><b>${RULES.startLife}</b><small>생명</small></span></div>
      <p>덱 ${RULES.deckSize}장으로 싸워 <b>상대의 생명 ${RULES.startLife}을 먼저 0으로</b> 만들면 이깁니다. 내 <b>덱이 다 떨어져도</b> 집니다.</p>
      <p>생명은 상대의 공격으로도 줄지만, 매 턴 <b>카드를 뽑을 때마다</b> 뽑은 장수만큼 줄어듭니다. 카드를 많이 쓸수록 생명이 빨리 닳는 것 — 이 게임의 저울입니다.</p>` },
    { t: "한 턴의 흐름", x: () => `${flowFig()}<p>한 턴에 한쪽만 공격합니다. 공격하는 쪽이 먼저 놓고, 방어하는 쪽은 그 배치를 <b>보고</b> 놓습니다. 다음 턴에는 공격과 방어가 바뀝니다.</p><p>준비를 다 했으면 <b>준비 완료</b>(Enter). 전투는 저절로 진행됩니다.</p>` },
    { t: "에테르 — 카드를 내는 힘", x: () => `${etherFig()}<p><b>Lv N 카드는 에테르 N.</b> 에테르는 위대한 정수 1에 <b>결정</b> 수만큼 더해집니다. 핸드 1장을 왼쪽 아래 에테르 원에 놓으면 결정이 됩니다(한 턴에 1장씩).</p><p>쓰지 않은 에테르는 사라지니, 남겼다면 전투 때 <b>코인을 다시 던지는 데</b> 쓰세요.</p>` },
    { t: "카드 읽기", x: () => cardReadHTML() },
    { t: "맞붙는 순서", x: () => `${combatFig()}` },
    { t: "막을 유닛이 없으면", x: () => `${directFig()}<p>그래서 맨 앞에 무엇을 세울지가 중요합니다. 단단한 유닛을 앞에, 약한 유닛은 뒤에. 칸을 비워 두면 생명을 내주는 대신 다음 턴 에테르를 얻습니다.</p>` },
    { t: "코인", x: () => `${coinFig()}<p>카드 숫자 옆 <b>+</b>와 동전이 코인입니다. 내 코인은 <b>운명 봉인</b>(Space)으로 세우고, 뒷면이 나왔다면 그 코인을 눌러 에테르 1로 한 번 더 던질 수 있습니다.</p>` },
    { t: "마법과 아이템", x: () => `${typeChips()}${spellFig()}<p><b>아이템</b>은 클래스(이름 옆 [○○ 전용])가 맞는 내 유닛 위로 끌어 놓아 장착합니다. 유지비가 없습니다.</p>` },
    { t: "유지비 · 셔플 · 소각", x: () => `<table class="mn-table"><tr><th>유지비</th><td>레벨 아이콘의 <b>하늘빛 빈 칸 수</b>(최대 레벨 − 1). 살아남은 유닛은 다음 턴부터 매 턴 그만큼 에테르를 먹습니다. 모자라면 큰 유닛부터 소각됩니다.</td></tr>
      <tr><th>셔플</th><td>핸드가 마음에 안 들면 덱에 섞어 다시 뽑기(S). 한 턴에 한 번, 생명 −1, 카드를 내기 전에만.</td></tr>
      <tr><th>소각</th><td>쓸모없는 카드를 소각장(맨 왼쪽)에 버립니다(X).</td></tr>
      <tr><th>멀리건</th><td>첫 핸드에서 고른 카드를 한 번 바꿉니다. 생명은 줄지 않습니다.</td></tr></table>
      <p>이제 해 볼 차례입니다. <b>연습 대전</b>을 시작하면 전장의 중요한 곳마다 짧은 안내가 뜹니다.</p>`, last: true }
  ];
  const Lesson = {
    i: 0,
    open(i) {
      this.i = i || 0;
      const w = open("help-lesson", `<div class="lesson" role="dialog" aria-modal="true" aria-label="전투 배우기"><header class="ls-head"><p class="hx-eyebrow">튜토리얼 · 전투 배우기</p><h2></h2>${closeBtn}</header><div class="ls-body"></div><footer class="ls-foot"></footer></div>`, e => {
        if (e.key === "ArrowRight") { e.preventDefault(); this.go(1); } else if (e.key === "ArrowLeft") { e.preventDefault(); this.go(-1); }
      });
      w.addEventListener("click", e => {
        const b = e.target.closest("[data-l]"); if (!b) return;
        const v = b.dataset.l;
        if (v === "next") this.go(1); else if (v === "prev") this.go(-1); else if (v === "practice") Tutorial.practice(); else if (v === "menu") Tutorial.open(); else if (v === "manual") Manual.open();
        else if (/^\d+$/.test(v)) { this.i = +v; this.show(); }
      });
      this.show();
    },
    go(d) { const j = this.i + d; if (j < 0 || j >= PAGES.length) return; this.i = j; this.show(); },
    show() {
      if (!cur) return;
      const P = PAGES[this.i], last = this.i === PAGES.length - 1;
      if (last) mark("lesson");
      cur.querySelector(".ls-head h2").innerHTML = `<span class="no">${this.i + 1}</span>${P.t}`;
      const body = cur.querySelector(".ls-body");
      body.innerHTML = `<div class="ls-page">${P.x()}</div>`; body.scrollTop = 0;
      cur.querySelector(".ls-foot").innerHTML = `<div class="ls-dots" role="tablist">${PAGES.map((p, k) => `<button type="button" class="ls-dot${k === this.i ? " on" : ""}" data-l="${k}" title="${p.t}" aria-label="${k + 1}쪽 ${p.t}"></button>`).join("")}</div>
        <div class="ls-btns">${this.i ? '<button type="button" class="btn sm" data-l="prev">이전</button>' : '<button type="button" class="btn sm ghost" data-l="menu">튜토리얼 목록</button>'}
        ${last ? '<button type="button" class="btn sm" data-l="manual">매뉴얼</button><button type="button" class="btn sm primary" data-l="practice">연습 대전 시작</button>' : '<button type="button" class="btn sm primary" data-l="next">다음</button>'}</div>`;
      requestAnimationFrame(() => pinRead(cur));
    }
  };

  const Tutorial = {
    open() {
      const p = prog();
      const ch = [
        ["tour", "1", "대기실 둘러보기", "LOBBY TOUR", "덱 보관함 · 덱 보기 · 출정의 단 · 수레바퀴 · 상단 띠를 하나씩 짚어 봅니다.", "약 1분"],
        ["lesson", "2", "전투 배우기", "THE FIRST DUEL", "이기는 법, 한 턴의 흐름, 에테르, 카드 읽기, 맞붙는 순서, 코인, 마법과 아이템 — 그림 아홉 쪽.", "약 3분"],
        ["practice", "3", "연습 대전", "SPARRING", "지금 덱으로 컴퓨터와 한 판. 전장의 중요한 곳마다 짧은 안내가 뜹니다.", "한 판"]
      ];
      const w = open("help-tut", `<div class="tut" role="dialog" aria-modal="true" aria-label="튜토리얼">
        <header class="tut-head"><p class="hx-eyebrow">FIRST STEPS IN ETHERION</p><h2>튜토리얼</h2>${closeBtn}</header>
        <p class="tut-lead">처음이라면 1부터 차례로. 마친 장에는 ✓가 붙습니다. 규칙 전부는 <button type="button" class="tut-link" data-c="manual">매뉴얼</button>에 있습니다.</p>
        <div class="tut-chs">${ch.map(([k, no, t, en, x, tm]) => `<button type="button" class="tut-ch${p[k] ? " done" : ""}" data-c="${k}"><span class="tc-no">${no}</span><span class="tc-body"><b>${t}</b><small class="en">${en}</small><span class="tc-x">${x}</span><span class="tc-tm">${p[k] ? "✓ 마침 · 다시 보기" : tm}</span></span></button>`).join("")}</div>
      </div>`);
      w.addEventListener("click", e => {
        const b = e.target.closest("[data-c]"); if (!b) return;
        const c = b.dataset.c;
        if (c === "tour") Tour.start(); else if (c === "lesson") Lesson.open(); else if (c === "practice") this.practice(); else if (c === "manual") Manual.open();
      });
      pset("tutSeen", 1); refreshDock();
    },
    /* ③ 연습 대전: 전장의 첫 판 안내(js/game.js Guide)를 다시 켜고 지금 덱으로 컴퓨터와 */
    practice() {
      close();
      try { if (typeof Prefs !== "undefined") Prefs.set("guideDone", false); Prefs.set("crysTeach", 0); if (typeof Guide !== "undefined") { Guide.seen = {}; Guide.queue = []; } } catch (e) {}
      mark("practice");
      const u = typeof Store !== "undefined" && Store.user();
      if (!u) return;
      const g = (typeof App !== "undefined" && App.lobbyGroup) || u.group;
      if (!Store.deckPlayable(u, g)) { const ok = GROUP_IDS.find(x => Store.ownsGroup(u, x) && Store.deckPlayable(u, x)); if (!ok) { toast(`저장된 ${RULES.deckSize}장 덱이 있어야 연습 대전을 할 수 있습니다. 덱 조정실에서 덱을 저장하세요.`, "warn"); return; } App.lobbyGroup = ok; }
      if (typeof startVsAI === "function") startVsAI(App.lobbyGroup, { practice: true });
    }
  };

  /* ---------- v3.55.4 상단 띠의 튜토리얼 단추(js/screens.js headerHTML, 퀘스트 옆) ----------
     예전 대기실 오른쪽의 튜토리얼 · 매뉴얼 · 룰북 명판(dockHTML)은 뺐다. 매뉴얼 · 룰북은 연대기 머리(js/chronicle.js)에서 연다.
     처음이면(튜토리얼을 연 적 없음) 단추에 "!" 점 */
  function tutBadgeHTML() { return pget("tutSeen", 0) ? "" : '<i class="tb-badge tut-badge" title="처음이라면 여기부터">!</i>'; }
  function refreshDock() { document.querySelectorAll('.tb-nav[data-nav="tutorial"] .tut-badge').forEach(x => x.remove()); }

  return { tutBadgeHTML, Manual, Tutorial, Tour, Lesson, close, openWin: open };   // openWin: 룰북(js/rulebook.js)이 같은 창을 쓴다
})();
