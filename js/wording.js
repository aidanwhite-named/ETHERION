/* ETHERION v3.38 — 카드 글 다듬기 (cards.js 다음, grades.js 앞에 읽는다. 서버 규칙 묶음에도 들어간다)
   데이터 파일(data.js · highcards.js …)의 마법 글은 그대로 두고, 화면에 보이는 글만 여기서 한 번에 바꾼다.
   ① "맨 앞 2기" → "맨 앞 유닛 2개" (엔진은 원래 마법 칸을 건너뛰고 살아 있는 유닛만 센다 — engine.js pickTargets · queueOf)
   ② 낱말의 뜻을 나눈다 (매뉴얼 "피해와 체력 −"):
      피해   = 방어만큼 줄어든 뒤 체력을 깎는 것 (맞붙기 · 반격 · 투척 · 물리 피해 · 연쇄 · 꿰뚫기)
      체력 −N = 방어와 상관없이 체력이 N 깎이는 것 (마법 · 사격 · 불씨 · 축전 …). 보호막 · 가호는 둘 다 막는다
      그래서 방어를 보지 않는 마법의 "피해 N"은 "체력 −N"으로, "피해 2 +1C"는 "체력 −2 −1C"(앞면마다 1 더 깎임)로 쓴다.
      "물리 피해"(방어만큼 줄어듦)는 그대로 "피해".
   새 마법을 만들 때는 처음부터 이 말로 적어도 되고, 예전 말로 적어도 여기서 바뀐다. 바뀐 글은 node tools/wording_check.js 로 본다 */
"use strict";
const WORDING = (() => {
  const josaEulReul = n => (/[013678]$/.test(String(n)) ? "을" : "를");   // 일 · 영 · 삼 · 육 · 칠 · 팔 → 을
  const DMG_OPS = new Set(["dmg", "multi", "chain", "perAlly", "blast", "sumDef", "echo", "tithe", "paidHit", "volley", "a3Volley", "g1Ram", "gbBlast"]);   // v3.65 피의 제물 · 피의 공명 · v3.70/v3.93 빗발치는 화살 · 별빛 연사 · v3.82/v3.88 몸통 박치기 · 화약고 폭파
  /* ① 유닛 수 */
  const units = t => t.replace(/(유닛 )?(\d+)기(?![사술병계])/g, (m, u, n) => `유닛 ${n}개`);
  /* ⓪ v3.62 "뒤 N칸"은 칸이 아니라 유닛을 센다(engine.js pickTargets — 사이의 마법 칸은 건너뜀):
     "아군 뒤 N칸의 유닛" → "아군 유닛 N"(이 마법 뒤의 아군 유닛 N기) · "상대 뒤 N칸의 유닛" → "적 유닛 N"(상대 맨 앞 N기)
     "이 마법 바로 뒤 아군 유닛" → "아군 유닛 1" */
  const josaEunNeun = n => (/[013678]$/.test(String(n)) ? "은" : "는");
  const backN = t => t
    .replace(/(상대|아군) 뒤 (\d+)칸의 유닛(은|을)?/g, (m, s, n, j) => `${s === "상대" ? "적" : "아군"} 유닛 ${n}${j === "은" ? josaEunNeun(n) : j === "을" ? josaEulReul(n) : ""}`)
    .replace(/상대 맨 뒤 (\d+)기는/g, (m, n) => `적 유닛 ${n}${josaEunNeun(n)}`)   // cards.js foeBackText를 거친 옛 글
    .replace(/상대 맨 뒤 (\d+)기/g, "적 유닛 $1")
    .replace(/이 마법 바로 뒤 아군 유닛/g, "아군 유닛 1");
  /* ② 방어를 보지 않는 피해 → 체력 − */
  function hp(t) {
    const prot = [];   // "물리 피해" · "자기 방어만큼" 문장은 잠시 빼 둔다
    t = t.replace(/물리 피해[^.]*?(?=[.]|$)/g, m => { prot.push(m); return `\u0000${prot.length - 1}\u0000`; });
    t = t.replace(/피해 (\d+)를 받는다/g, (m, n) => `체력이 ${n} 깎인다`)
      .replace(/피해 (\d+(?: → \d+)+)/g, (m, s) => "체력 " + s.split(" → ").map(x => "−" + x).join(" → "))
      .replace(/피해 (\d+) \+(\d+)C(×\d+)?/g, (m, n, v, k) => `체력 −${n} −${v}C${k || ""}`)
      .replace(/피해 (\d+)[을를] 더 받는다/g, (m, n) => `체력 −${n} 더`)
      .replace(/피해 (\d+)([을를])/g, (m, n) => `체력 −${n}${josaEulReul(n)}`)
      .replace(/피해 (\d+)/g, (m, n) => `체력 −${n}`)
      .replace(/피해 \(/g, "체력 −(")
      .replace(/에게 피해\. 쓰러뜨리고 남은 피해는/g, "의 체력을 깎는다. 쓰러뜨리고 남은 몫은");
    return t.replace(/\u0000(\d+)\u0000/g, (m, i) => prot[+i]);
  }
  /* 핸드 짧은 문구: {적 앞2} → {적 앞 2개}, 피해2 → ♥−2, +1C → −1C (피해 뒤) */
  function brief(s, hasDmg) {
    s = s.replace(/\{(적|아군) 뒤(\d+)\}/g, "{$1 유닛 $2}").replace(/\{뒤 아군\}/g, "{아군 유닛 1}");   // v3.62 뒤 N = 유닛 N기 (마법 칸은 건너뜀)
    s = s.replace(/\{([^}]*?)(앞|최강|최약)(\d+)\}/g, (m, a, w, n) => {
      const stat = /[⚔⛨♥]\s*$/.test(a);
      const lbl = w === "최강" ? (stat ? " 높은" : "공격 높은") : w === "최약" ? (stat ? " 낮은" : "공격 낮은") : w;
      return `{${a}${lbl} ${n}개}`;
    });   // v3.65 "최강"은 뜻이 모호 — 스탯 아이콘 뒤면 "높은", 없으면 "공격 높은 N개"
    if (!hasDmg) return s;
    return s.replace(/(^|[^리] ?)피해 ?(\d+(?:→\d+)+)/g, (m, p, xs) => p + "♥" + xs.split("→").map(x => "−" + x).join("→"))
      .replace(/(^|[^리] ?)피해 ?(\d+) \+(\d+)C(×\d+)?/g, (m, p, n, v, k) => `${p}♥−${n} −${v}C${k || ""}`)
      .replace(/(^|[^리] ?)피해 ?(\d+)/g, (m, p, n) => `${p}♥−${n}`)
      .replace(/피해 = /g, "♥− ");
  }
  /* ③ 2026-11-24 맺음말 (사용자 — "마법 설명을 전부 서술이 아니라 맺음말로. 깎음, 데미지, 공격, 감소, 줄임 이런 식으로"):
     문장 끝 "~다"를 명사형으로 — 깎는다 → 깎음 · 준다 → 줌 · 줄어든다 → 줄어듦 · 있다 → 있음 · 된다 → 됨.
     문장 끝 = 뒤에 "." · ")" · ":" · 글 끝, 또는 끝 괄호 "(…)." 앞. "바다" · "~마다"는 낱말이라 그대로. 분위기 글(desc)은 건드리지 않는다 */
  const hj = ch => { const c = ch.charCodeAt(0) - 0xAC00; return c >= 0 && c < 11172 ? c % 28 : -1; };
  const sj = (ch, j) => { const c = ch.charCodeAt(0) - 0xAC00; return String.fromCharCode(0xAC00 + c - (c % 28) + j); };
  function nounWord(w) {
    if (/(바|마)다$/.test(w)) return w;
    const s = w.slice(0, -1), L = s.slice(-1);
    if (s.length >= 2 && L === "는" && hj(s.slice(-2, -1)) > 0) return s.slice(0, -1) + "음";   // 깎는다 → 깎음
    if (L === "든") return s.slice(0, -1) + "듦";   // 줄어든다 → 줄어듦
    const j = hj(L); if (j < 0) return w;
    if (j === 4 || j === 0) return s.slice(0, -1) + sj(L, 16);   // 준다 → 줌 · 이다 → 임
    if (j === 8) return s.slice(0, -1) + sj(L, 10);   // ㄹ 받침 → ㄻ
    return s + "음";   // 있다 → 있음
  }
  const nounEnd = t => typeof t === "string" ? t.replace(/([가-힣]+다)(?=[.):]|$|\([^()]*\)\s*(?:[.:]|$))/g, (m, w) => nounWord(w)) : t;   // "깎는다(최대 N)." 처럼 끝 괄호 앞도
  function apply() {
    const changed = [];
    for (const c of typeof CARD_LIST !== "undefined" ? CARD_LIST : []) {
      if (!c.text) continue;
      const hasDmg = (c.ops || []).some(o => DMG_OPS.has(o.op) && !o.phys);
      const before = c.text;
      let t = units(backN(before));
      if (hasDmg) t = hp(t);
      if (t !== before) { c.text = t; changed.push([c.id, before, t]); }
      if (typeof SPELL_BRIEF !== "undefined" && SPELL_BRIEF[c.id]) {
        const b0 = SPELL_BRIEF[c.id], b1 = brief(b0, hasDmg);
        if (b1 !== b0) { SPELL_BRIEF[c.id] = b1; changed.push([c.id + " (핸드)", b0, b1]); }
      }
    }
    /* 능력 사전의 "피해 N(방어 무시)" */
    const fix = o => { if (!o) return; for (const k in o) { const v = o[k]; if (typeof v === "string") o[k] = v.replace(/피해 (\d+)\(방어 무시\)를 준다/g, "체력 −$1").replace(/피해 (\d+)\(방어 무시\)/g, "체력 −$1"); else if (v && typeof v.text === "string") v.text = v.text.replace(/피해 (\d+)\(방어 무시\)를 준다/g, "체력 −$1").replace(/피해 (\d+)\(방어 무시\)/g, "체력 −$1"); } };
    if (typeof ITEM_KW !== "undefined") fix(ITEM_KW);
    if (typeof UNIQUE_ABIL !== "undefined") fix(UNIQUE_ABIL);
    /* ③ 맺음말: 능력 뜻(말풍선 · 카드 면 · 매뉴얼) · 마법 글 · 아이템/타고난 능력 글 */
    const ne = o => { if (o) for (const k in o) if (typeof o[k] === "string") o[k] = nounEnd(o[k]); };
    for (const n of ["ITEM_KW", "ITEM_KW_SHORT", "ITEM_KW_GEN", "SPELL_KW", "UNIQUE_ABIL_SHORT"]) { try { ne(eval(n)); } catch (e) {} }
    if (typeof UNIQUE_ABIL !== "undefined") for (const k in UNIQUE_ABIL) UNIQUE_ABIL[k].text = nounEnd(UNIQUE_ABIL[k].text);
    if (typeof RARE_AURA !== "undefined") for (const g in RARE_AURA) RARE_AURA[g].text = nounEnd(RARE_AURA[g].text);
    for (const c of typeof CARDS !== "undefined" ? Object.values(CARDS) : []) {   // 덱에 못 넣는 카드(CARD_LIST 밖)도 화면에 보일 수 있어 CARDS 전부
      if (c.text && c.type !== "unit" && c.type !== "item") c.text = nounEnd(c.text);
      for (const o of [c.item, c.gift]) if (o && o.evText) o.evText = nounEnd(o.evText);
    }
    if (typeof COUNTER_SPELLS !== "undefined") for (const c of COUNTER_SPELLS) if (c.text) c.text = nounEnd(c.text);
    return changed;
  }
  const changed = apply();
  return { changed, units, hp, brief, backN, nounEnd };
})();
