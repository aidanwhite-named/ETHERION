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
  const DMG_OPS = new Set(["dmg", "multi", "chain", "perAlly", "blast", "sumDef", "echo"]);
  /* ① 유닛 수 */
  const units = t => t.replace(/(유닛 )?(\d+)기(?![사술병계])/g, (m, u, n) => `유닛 ${n}개`);
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
    s = s.replace(/\{([^}]*?)(앞|뒤|최강|최약)(\d+)\}/g, (m, a, w, n) => `{${a}${w} ${n}${/^아군/.test(a) && w === "뒤" ? "칸" : "개"}}`);   // 아군 뒤 N = 이 마법 다음 N칸
    if (!hasDmg) return s;
    return s.replace(/(^|[^리] ?)피해 ?(\d+(?:→\d+)+)/g, (m, p, xs) => p + "♥" + xs.split("→").map(x => "−" + x).join("→"))
      .replace(/(^|[^리] ?)피해 ?(\d+) \+(\d+)C(×\d+)?/g, (m, p, n, v, k) => `${p}♥−${n} −${v}C${k || ""}`)
      .replace(/(^|[^리] ?)피해 ?(\d+)/g, (m, p, n) => `${p}♥−${n}`)
      .replace(/피해 = /g, "♥− ");
  }
  function apply() {
    const changed = [];
    for (const c of typeof CARD_LIST !== "undefined" ? CARD_LIST : []) {
      if (!c.text) continue;
      const hasDmg = (c.ops || []).some(o => DMG_OPS.has(o.op) && !o.phys);
      const before = c.text;
      let t = units(before);
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
    if (typeof ITEM_KW !== "undefined") {
      ITEM_KW["증폭"] = "이 유닛이 전장에 있으면 내 공격 마법이 깎는 체력이 {n} 늘어난다(체력 −N 마법).";
      ITEM_KW["가호"] = "매 턴 처음 받는 피해(체력 −N 포함)를 {n}만큼 줄인다.";
      ITEM_KW["보호막 코인"] = "매 턴 시작에 코인을 던져 앞면이면, 그 턴 처음 받는 피해 · 체력 −N 한 번을 통째로 막는다.";
    }
    if (typeof SPELL_KW !== "undefined" && SPELL_KW["보호막"]) SPELL_KW["보호막"] = "그 턴에 처음 받는 피해 · 체력 −N 한 번을 통째로 막는다. 막고 나면 사라진다.";
    return changed;
  }
  const changed = apply();
  return { changed, units, hp, brief };
})();
