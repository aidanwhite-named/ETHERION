/* ETHERION i18n — 게임 화면의 말 바꾸기 (2026-11-27). 한국어(기본) · English · 日本語 · 简体中文
   ■ 원칙: 게임 데이터 · 규칙 코드 · 서버는 **한국어 그대로** 둔다(엔진 · 서버 검산 · 정규식이 한국어 글을 읽는다).
     말은 **화면에 나가는 마지막 순간**에만 바꾼다:
       ① 화면 글: innerHTML · insertAdjacentHTML · textContent · innerText 로 넣는 순간 그 속의 글 마디(text node)와
          말풍선 속성(data-tip · title · placeholder · aria-label · alt)을 사전으로 바꾼다(동기 — 글 맞춤 fitBriefs 등이 바뀐 글을 잰다).
          그 밖의 길로 들어온 글은 MutationObserver가 받는다. 캔버스 fillText · alert/confirm/prompt도.
       ② 카드: 이름 · 서사 · 종류 · 마법 글은 카드 ID 번역(js/i18n/cards.<말>.js)으로 만든 "한국어 → 번역" 표가 ①에서 같이 쓰인다.
          마법 글은 kwHTML이 통째로 바꾸고(I18N.tr), 핸드 짧은 문구는 spellBriefHTML이 카드 ID로 바꾼다(I18N.brief).
       ③ 키워드: [사격 1] · "사격 1" 은 용어집(js/i18n/glossary.js KW)으로.
   ■ 사전(js/i18n/ui.<말>.js, I18N_UI): { "한국어 글": "번역" }. 열쇠의 {0} {1} …는 아무 글이나 받는 자리(숫자 · 이름) —
     받은 글도 다시 번역해 끼운다. 줄바꿈(\n)이 든 글은 줄마다, 못 찾으면 " · " 로 나눠 조각마다 찾는다. 끝까지 못 찾으면 한국어 그대로(I18N.miss에 모인다).
   ■ 번역하지 않는 곳: data-i18n-skip 속성이 붙은 요소 안(소설 · 연대기 · 카일란 · 순례 대사), 입력칸 값, 채팅 · 이름 같은 사람 글(data-i18n-skip).
   ■ 말 고르기: 설정 창 "언어". localStorage etherion.pref.lang("ko"|"en"|"ja"|"zh"). 바꾸면 다시 읽는다(location.reload) — 저장은 그대로.
   새 화면 글 · 카드를 더하는 법은 AGENTS.md "다국어". 검사: node tools/i18n/check.js */
"use strict";
const I18N = (() => {
  const LANGS = [["ko", "한국어"], ["en", "English"], ["ja", "日本語"], ["zh", "简体中文"]];
  const KEY = "etherion.pref.lang";
  const LI = { en: 0, ja: 1, zh: 2 };
  let lang = "ko";
  try {
    const raw = localStorage.getItem(KEY);
    let v = raw; try { v = JSON.parse(raw); } catch (e) {}
    if (v && LI[v] != null) lang = v;
  } catch (e) {}
  const on = lang !== "ko";
  const V = "i4";
  if (on && typeof document !== "undefined" && document.readyState === "loading") {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    document.documentElement.classList.add("lang-" + lang);
    document.write(`<script src="js/i18n/glossary.js?v=${V}"></script><script src="js/i18n/ui.${lang}.js?v=${V}"></script><script src="js/i18n/cards.${lang}.js?v=${V}"></script>`);
  }
  const HANGUL = /[가-힣]/;
  const exact = new Map();     // 한국어 → 번역 (사전 · 용어집 · 카드)
  const pats = [];             // { re, out, anchor, n }
  const kwTo = new Map(), kwFrom = new Map();   // 키워드 한국어 ↔ 번역
  let kwRe = null;
  const memo = new Map();
  const miss = new Set();
  let ready = false, cardsReady = false;

  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function addPattern(k, v) {
    const parts = k.split(/\{(\d+)\}/);   // [lit, idx, lit, idx, lit]
    let src = "^", order = [], anchor = "";
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 && order.includes(+parts[i])) { src += "\\" + (order.indexOf(+parts[i]) + 1); order.push(-1); }   // 같은 자리가 두 번 → 같은 글
      else if (i % 2) { src += "([\\s\\S]*?)"; order.push(+parts[i]); }
      else { src += esc(parts[i]); if (parts[i].length > anchor.length) anchor = parts[i]; }
    }
    pats.push({ re: new RegExp(src + "$"), out: v, order, anchor, lit: parts.filter((x, i) => !(i % 2)).join("").length });
  }
  function init() {
    if (ready || !on) return;
    ready = true;
    const G = typeof I18N_GLOSSARY !== "undefined" ? I18N_GLOSSARY : { KW: {}, TERM: {} };
    const li = LI[lang];
    for (const [k, arr] of Object.entries(G.TERM)) if (arr[li]) exact.set(k, arr[li]);
    for (const [k, arr] of Object.entries(G.KW)) if (arr[li]) { kwTo.set(k, arr[li]); kwFrom.set(arr[li], k); exact.set(k, arr[li]); }
    const names = [...kwTo.keys()].sort((a, b) => b.length - a.length).map(esc);
    kwRe = names.length ? new RegExp(`^(${names.join("|")})((?:\\s*[+−\\-]?(?:\\d+|N)[^가-힣]*)?)$`) : null;
    const U = typeof I18N_UI !== "undefined" ? I18N_UI : {};
    for (const [k, v] of Object.entries(U)) {
      if (v == null) continue;   // "" = 조사 조각(을 · 를 …)처럼 번역에서 없어지는 글
      if (/\{\d+\}/.test(k)) addPattern(k, v); else exact.set(k, v);
    }
    pats.sort((a, b) => b.lit - a.lit);
  }
  /* 카드 번역 표는 카드 데이터(CARDS)가 다 읽힌 뒤 처음 쓸 때 만든다 */
  function initCards() {
    if (cardsReady || !on || typeof CARDS === "undefined" || typeof I18N_CARDS === "undefined") return;
    cardsReady = true;
    for (const id in I18N_CARDS) {
      const c = CARDS[id], t = I18N_CARDS[id];
      if (!c || !t) continue;
      if (t.n && c.name) exact.set(c.name, t.n);
      if (t.f && c.flavor) exact.set(c.flavor, t.f);
      if (t.k && c.kin) exact.set(c.kin, t.k);
      if (t.t && c.text) exact.set(c.text, t.t);
    }
    memo.clear();
  }

  /* 한 글 바꾸기 */
  function tr(s) {
    if (!on || s == null) return s;
    s = String(s);
    if (!HANGUL.test(s)) return s;
    if (!ready) init();
    if (!cardsReady) initCards();
    const hit = memo.get(s);
    if (hit !== undefined) return hit;
    const r = trCore(s);
    if (memo.size > 20000) memo.clear();
    memo.set(s, r);
    return r;
  }
  function trCore(s) {
    const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const lead = m[1], core = m[2], tail = m[3];
    const out = trPiece(core);
    return out === core ? s : lead + out + tail;
  }
  function trPiece(core, depth) {
    depth = depth || 0;
    if (!HANGUL.test(core)) return core;
    let v = exact.get(core);
    if (v !== undefined) return v;
    const norm = core.replace(/\s+/g, " ");
    if (norm !== core && (v = exact.get(norm)) !== undefined) return v;
    if (core.includes("\n")) return core.split("\n").map(l => trCore(l)).join("\n");
    if (depth > 5) return core;
    // 끝의 마침표만 다른 글
    const dot = core.match(/^([\s\S]+?)([.。])$/);
    if (dot && (v = exact.get(dot[1])) !== undefined) return /[.。!?！？]$/.test(v) ? v : v + (lang === "en" ? "." : "。");
    // 키워드 칩: "사격 1" · "보호막" · "[가시 N]"
    if (kwRe) { const k = core.match(kwRe); if (k) return kwTo.get(k[1]) + k[2]; }
    const kwOnly = core.match(/^\[([^\[\]]+)\]$/);
    if (kwOnly) { const t = trPiece(kwOnly[1], depth + 1); if (t !== kwOnly[1]) return "[" + t + "]"; }
    // 머리 기호 + 사전에 그대로 있는 글: "— 모험가끼리 …"
    const lead0 = core.match(/^([—–\-·:•▲▼◆◈◎✦✧★☆※→]+\s*)([\s\S]+)$/u);
    if (lead0 && (v = exact.get(lead0[2])) !== undefined) return lead0[1] + v;
    // 자리표시 열쇠
    const pv = trPattern(core, depth);
    if (pv !== null) return pv;
    // 문장 여러 개: 문장마다
    const sents = core.split(/(?<=[.。!?])\s+(?=\S)/);
    if (sents.length > 1) { const o = sents.map(x => trPiece(x, depth + 1)); if (o.some((x, i) => x !== sents[i])) return o.join(lang === "en" ? " " : ""); }
    // 따옴표 · 머리 기호로 감싼 글: “…” 「…」 — … ▲ …
    const q = core.match(/^([“"「『(（])([\s\S]+)([”"」』)）])$/);
    if (q) { const t = trPiece(q[2], depth + 1); if (t !== q[2]) return q[1] + t + q[3]; }
    const lead = core.match(/^([—–\-·:•▲▼◆◈◎✦✧★☆※→⚔⛨♥☾⚓✚✖➶⤓🏹🔒≋]+\s*)([\s\S]+)$/u);
    if (lead) { const t = trPiece(lead[2], depth + 1); if (t !== lead[2]) return lead[1] + t; }
    // "[사격 1] 뜻 …" (키워드 이름 + 뜻) · "공격 3" (낱말 + 숫자)
    const head = core.match(/^(\[[^\[\]]+\])\s+([\s\S]+)$/);
    if (head) return trPiece(head[1], depth + 1) + " " + trPiece(head[2], depth + 1);
    const num = core.match(/^([^\d]+?)\s*([+−\-]?\d+(?:[~\/]\d+)?%?[.。]?)$/);
    if (num && (v = exact.get(num[1])) !== undefined) return v + " " + num[2];
    // [키워드] · 「카드 이름」이 섞인 글: 괄호 속만 바꾼 뒤 다시
    if (/\[[^\[\]]*[가-힣][^\[\]]*\]|「[^」]*[가-힣][^」]*」/.test(core)) {
      const t = core.replace(/\[([^\[\]]+)\]/g, (x, inner) => "[" + trPiece(inner, depth + 1) + "]").replace(/「([^」]+)」/g, (x, inner) => "「" + trPiece(inner, depth + 1) + "」");
      if (t !== core) { if (!HANGUL.test(t)) return t; const again = exact.get(t); if (again !== undefined) return again; const r = splitTry(t, depth); return r; }
    }
    return splitTry(core, depth);
  }
  function trPattern(core, depth) {
    for (const p of pats) {
      if (p.anchor && !core.includes(p.anchor)) continue;
      const mm = p.re.exec(core);
      if (!mm) continue;
      const caps = mm.slice(1);
      if (p.lit <= 2 && caps.some(c => HANGUL.test(c))) continue;   // "{0}장" 같은 짧은 열쇠는 숫자 자리만 — "무장"을 "무 + 장"으로 자르지 않게
      const capOf = d => { let g = 0; for (const o of p.order) { if (o === -1) continue; if (o === d) return caps[g]; g++; } return ""; };
      return p.out.replace(/\{(\d+)\}/g, (x, d) => { const c = capOf(+d); if (c == null) return ""; const w = c.match(/^(\s*)([\s\S]*?)(\s*)$/); return w[1] + trPiece(w[2], depth + 1) + w[3]; });
    }
    return null;
  }
  /* 나눠서 찾기: " · " / " — " / ": " / " / " / ", " / "(…)" */
  function splitTry(core, depth) {
    for (const sep of [" · ", " — ", " – ", " / ", " | ", " + ", " × ", "·", ", ", ": "]) {
      if (!core.includes(sep)) continue;
      const parts = core.split(sep);
      if (parts.length > 2) for (let i = 1; i < parts.length; i++) {   // 앞 · 뒤 두 덩이로: "LINDEAR MARKET · (린데어 자유시 상점 · …)"
        const a = parts.slice(0, i).join(sep), b = parts.slice(i).join(sep), ta = trPiece(a, depth + 1), tb = trPiece(b, depth + 1);
        if (!HANGUL.test(ta) && !HANGUL.test(tb)) return ta + sep + tb;
      }
      const outp = parts.map(p => trPiece(p, depth + 1));
      if (outp.some((o, i) => o !== parts[i])) return outp.join(sep);
    }
    const pm = core.match(/^([\s\S]*?)\s*\(([^()]+)\)$/);
    if (pm) { const a = trPiece(pm[1], depth + 1), b = trPiece(pm[2], depth + 1); if (a !== pm[1] || b !== pm[2]) return `${a} (${b})`; }
    if (depth === 0) miss.add(core);
    return core;
  }

  /* ---------- DOM ---------- */
  const ATTRS = ["data-tip", "title", "placeholder", "aria-label", "alt"];
  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "CODE", "PRE"]);
  /* 소설 · 세계관 글의 뿌리: 연대기(cr-overlay) · 카일란(kl-overlay) · 순례 대사 · 순례기(pg-*) · 채팅(rm-chat-*) */
  const SKIP_CLASS = ["cr-overlay", "kl-overlay", "pg-say", "pg-lore", "pg-truth", "pg-book", "pg-redact"];
  function skipCls(el) { const c = el.classList; if (!c || !c.length) return false; for (const k of SKIP_CLASS) if (c.contains(k)) return true; return false; }
  function skipEl(el) { return el.nodeType === 1 && (SKIP_TAGS.has(el.tagName) || el.hasAttribute("data-i18n-skip") || skipCls(el)); }
  function inSkip(node) {
    for (let n = node; n && n.nodeType !== 9 && n.nodeType !== 11; n = n.parentNode) if (n.nodeType === 1 && (n.hasAttribute("data-i18n-skip") || n.tagName === "TEXTAREA" || skipCls(n))) return true;
    return false;
  }
  function doAttrs(el) {
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (v && HANGUL.test(v)) { const t = tr(v); if (t !== v) el.setAttribute(a, t); }
    }
    if (el.tagName === "INPUT" && (el.type === "button" || el.type === "submit") && HANGUL.test(el.value)) el.value = tr(el.value);
  }
  function doText(n) {
    const v = n.data;
    if (v && HANGUL.test(v)) { const t = tr(v); if (t !== v) n.data = t; }
  }
  function walk(root) {
    if (!on || !root) return;
    if (root.nodeType === 3) { if (!inSkip(root.parentNode)) doText(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.nodeType === 1) { if (skipEl(root)) return; doAttrs(root); }
    const w = document.createTreeWalker(root, 5 /* ELEMENT | TEXT */, { acceptNode: n => n.nodeType === 1 && skipEl(n) ? 2 /* REJECT */ : 1 });
    let n;
    while ((n = w.nextNode())) { if (n.nodeType === 3) doText(n); else doAttrs(n); }
  }
  function hookDom() {
    const wrapSet = (proto, prop, after) => {
      const d = Object.getOwnPropertyDescriptor(proto, prop);
      if (!d || !d.set) return;
      Object.defineProperty(proto, prop, { configurable: true, enumerable: d.enumerable, get: d.get, set(v) { d.set.call(this, v); after(this); } });
    };
    const afterHTML = el => { if (!inSkip(el)) walk(el); };
    wrapSet(Element.prototype, "innerHTML", afterHTML);
    wrapSet(Element.prototype, "outerHTML", el => { if (el.parentNode && !inSkip(el.parentNode)) walk(el.parentNode); });
    wrapSet(HTMLElement.prototype, "innerText", afterHTML);
    wrapSet(Node.prototype, "textContent", n => { if (n.nodeType === 1 && !inSkip(n)) walk(n); else if (n.nodeType === 3 && !inSkip(n.parentNode)) doText(n); });
    const iah = Element.prototype.insertAdjacentHTML;
    Element.prototype.insertAdjacentHTML = function (pos, html) {
      iah.call(this, pos, html);
      const p = /^(beforebegin|afterend)$/i.test(pos) ? this.parentNode : this;
      if (p && !inSkip(p)) walk(p);
    };
    const sa = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (a, v) {
      if (ATTRS.includes(a) && typeof v === "string" && HANGUL.test(v) && !inSkip(this)) v = tr(v);
      return sa.call(this, a, v);
    };
    for (const P of [typeof CanvasRenderingContext2D !== "undefined" && CanvasRenderingContext2D.prototype]) if (P) for (const f of ["fillText", "strokeText", "measureText"]) {
      const o = P[f]; P[f] = function (s, ...r) { return o.call(this, typeof s === "string" ? tr(s) : s, ...r); };
    }
    for (const f of ["alert", "confirm"]) { const o = window[f]; if (o) window[f] = m => o.call(window, tr(m)); }
    if (window.prompt) { const o = window.prompt; window.prompt = (m, d) => o.call(window, tr(m), d); }
    const mo = new MutationObserver(recs => {
      for (const r of recs) {
        if (r.type === "childList") { for (const n of r.addedNodes) if (n.nodeType === 3 ? !inSkip(n.parentNode) : !inSkip(n)) walk(n); }
        else if (r.type === "characterData") { if (!inSkip(r.target.parentNode)) doText(r.target); }
        else if (r.type === "attributes") { const el = r.target, v = el.getAttribute(r.attributeName); if (v && HANGUL.test(v) && !inSkip(el)) { const t = tr(v); if (t !== v) sa.call(el, r.attributeName, t); } }
      }
    });
    const start = () => { mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS }); walk(document.body); };
    if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
  }
  if (on && typeof document !== "undefined" && typeof Element !== "undefined") hookDom();

  /* ---------- 카드 · 키워드 도우미 (view.js · cards.js가 부른다) ---------- */
  function cardOf(id) { return on && typeof I18N_CARDS !== "undefined" ? I18N_CARDS[id] : null; }
  return {
    LANGS, lang, on, miss,
    tr, walk,
    t: (ko, ...args) => { let s = on ? tr(ko) : ko; return args.length ? s.replace(/\{(\d+)\}/g, (m, i) => args[+i] != null ? args[+i] : m) : s; },
    /* 마법 짧은 문구(SPELL_BRIEF 꼴) — 없으면 null */
    brief: id => { const c = cardOf(id); return c && c.b || null; },
    /* "Shot 1" → "사격 1" (번역된 키워드의 뜻을 찾을 때) */
    kwKo: s => {
      if (!on) return s;
      if (!ready) init();
      const m = String(s).match(/^(.+?)((?:\s*[+−\-]?\d+.*)?)$/);
      if (m && kwFrom.has(m[1].trim())) return kwFrom.get(m[1].trim()) + m[2];
      for (const [loc, ko] of kwFrom) if (String(s).startsWith(loc)) return ko + String(s).slice(loc.length);
      return s;
    },
    set(v) {
      if (!LANGS.some(l => l[0] === v)) return;
      try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
      location.reload();
    },
    label: v => (LANGS.find(l => l[0] === v) || LANGS[0])[1]
  };
})();
