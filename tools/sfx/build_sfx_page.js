/* ETHERION 소리 프롬프트 페이지 만들기 (2026-11-14): tools/sfx/prompts/sfx.jsonl + tools/sfx/sfx_common.json + tools/bgm/PROMPT_BGM.md → 한 장짜리 HTML
   claude.ai 아티팩트로 올린 "ETHERION 소리 프롬프트" 페이지의 원본. 프롬프트를 다시 만들었으면(build_sfx_prompts.js) 이것도 다시 돌려 같은 주소에 올린다.
   실행: node tools/sfx/build_sfx_page.js <내보낼 html 경로>   (경로를 안 주면 임시 폴더) */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..", "..");
const OUT = process.argv[2] || path.join(require("os").tmpdir(), "etherion-sound-prompts.html");

/* 배경음 */
const md = fs.readFileSync(path.join(ROOT, "tools/bgm/PROMPT_BGM.md"), "utf8");
/* "## 4. 곡별 프롬프트 — 1부 …" 아래의 "### N. 제목 — `id` (쓸 곳)" 하나가 한 곡. 첫 문단이 **굵은 글**로 시작하면 성향 줄 */
const TRACK = /^(\d+)\.\s*(.+?)\s+—\s+`([a-z_]+)`\s*\((.+)\)\s*$/;
const bgm = [];
for (const sec of md.split(/\n## /).slice(1)) {
  const part = ((sec.split("\n")[0].match(/—\s*(.+)$/) || [])[1] || "").trim();
  for (const s of sec.split(/\n### /).slice(1)) {
    const m = s.split("\n")[0].match(TRACK);
    if (!m) continue;
    const blocks = [...s.matchAll(/```text\n([\s\S]*?)\n```/g)].map(x => x[1]);
    const paras = s.split("\n").slice(1).join("\n").split("**프롬프트**")[0].trim().split(/\n\s*\n/);
    const tag = /^\*\*/.test(paras[0] || "") ? paras.shift().trim() : "";
    const place = m[4], sc = [];
    if (/타이틀/.test(place)) sc.push("title");
    if (/대기실|상점|교역소|덱 조정실|보관소|순례|대장간|원정/.test(place)) sc.push("town");
    if (/대전/.test(place)) sc.push("battle");
    bgm.push({ n: +m[1], title: m[2], id: m[3], place, part, tag, sc, desc: paras.join(" ").replace(/\s*\n\s*/g, " "), prompt: blocks[0], short: blocks[1] });
  }
}
if (!bgm.length || bgm.some(b => !b.prompt || !b.short)) throw new Error("PROMPT_BGM.md에서 곡을 읽지 못했다");

/* 효과음 */
const rows = fs.readFileSync(path.join(ROOT, "tools/sfx/prompts/sfx.jsonl"), "utf8").trim().split("\n").map(JSON.parse);
const COMMON = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/sfx/sfx_common.json"), "utf8"));
const groups = COMMON.groups.map(g => ({ id: g.id, ko: g.ko }));
const common = rows.filter(r => r.kind === "common" || r.kind === "music").map(r => ({ id: r.id, gr: r.group, when: r.when, now: r.now, len: r.sounds[0].len, music: r.kind === "music", p: r.gemini }));
const cards = rows.filter(r => ["unit", "spell", "item"].includes(r.kind)).map(r => ({ id: r.id, g: r.group, k: r.kind, name: r.name, en: r.en, ko: r.ko, lv: r.lv, gr: r.grade, st: r.spellType || "", s: r.starter ? 1 : 0, p: r.gemini }));

const DATA = { bgm, groups, common, cards };
const json = JSON.stringify(DATA).replace(/</g, "\\u003c");

const html = `<title>ETHERION 소리 프롬프트</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans+KR:wght@400;600&family=Song+Myung&display=swap">
<style>
/* Layout: one reading column under a sticky tab-and-filter bar; every prompt is a row card with copy and done controls */
:root{
  --bg:#0a0c15; --surface:#121522; --surface-2:#191d2e; --line:#2b3047;
  --ink:#ece6d6; --ink-2:#b9b2a0; --muted:#8a8577;
  --gold:#d9b46a; --gold-hi:#f6e2a8; --on-gold:#1a1408; --ether:#8fdcff; --good:#7fd49a;
  --f-display:"Cinzel","Times New Roman",serif;
  --f-title:"Song Myung","Nanum Myeongjo","AppleMyungjo",serif;
  --f-body:"IBM Plex Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;
  --f-mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  color-scheme:dark;
}
@media (prefers-color-scheme: light){
  :root:not([data-theme="dark"]){
    --bg:#eef0f6; --surface:#ffffff; --surface-2:#f4f5fa; --line:#d4d8e5;
    --ink:#1b1e2b; --ink-2:#424860; --muted:#666c80;
    --gold:#8a6a2a; --gold-hi:#6b5020; --on-gold:#fffaf0; --ether:#1d6f99; --good:#2f7d4a;
    color-scheme:light;
  }
}
:root[data-theme="light"]{
  --bg:#eef0f6; --surface:#ffffff; --surface-2:#f4f5fa; --line:#d4d8e5;
  --ink:#1b1e2b; --ink-2:#424860; --muted:#666c80;
  --gold:#8a6a2a; --gold-hi:#6b5020; --on-gold:#fffaf0; --ether:#1d6f99; --good:#2f7d4a;
  color-scheme:light;
}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font-family:var(--f-body);font-size:15px;line-height:1.55;
  padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:0 48px}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:10;background:var(--bg)}
.wrap{max-width:880px;margin:0 auto}
.top{padding-block:28px 18px;display:grid;gap:8px}
.eyebrow{margin:0;font-family:var(--f-display);font-weight:700;letter-spacing:.32em;font-size:13px;color:var(--gold)}
h1{margin:0;font-family:var(--f-title);font-weight:400;font-size:clamp(28px,6vw,40px);line-height:1.15;text-wrap:balance}
.lede{margin:0;color:var(--ink-2);max-width:62ch}
.tally{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:6px;font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.tally b{color:var(--ink);font-weight:600}
details.how{margin-top:10px;border:1px solid var(--line);border-radius:10px;background:var(--surface);padding:0 14px}
details.how summary{cursor:pointer;padding:12px 0;font-weight:600;color:var(--gold-hi)}
details.how ol{margin:0 0 12px;padding-left:20px;display:grid;gap:6px;color:var(--ink-2)}
details.how code{font-family:var(--f-mono);font-size:12.5px;background:var(--surface-2);padding:1px 5px;border-radius:4px;color:var(--ink)}
.fix{display:grid;gap:8px;margin:0 0 14px}
.fix-row{display:flex;gap:10px;align-items:flex-start;background:var(--surface-2);border-radius:8px;padding:10px 12px}
.fix-row p{margin:0;flex:1;min-width:0;font-size:13.5px}
.fix-row p span{display:block;font-family:var(--f-mono);font-size:12.5px;color:var(--ink);overflow-wrap:anywhere}
.bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--bg);padding-block:10px 10px;border-bottom:1px solid var(--line);display:grid;gap:10px}
.tabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none}
.tab{flex:0 0 auto;border:1px solid var(--line);background:var(--surface);color:var(--ink-2);border-radius:999px;padding:7px 14px;font:inherit;font-size:14px;cursor:pointer}
.tab b{font-family:var(--f-display);font-weight:600;margin-left:6px;color:var(--muted);font-size:12px}
.tab[aria-selected="true"]{background:var(--gold);border-color:var(--gold);color:var(--on-gold);font-weight:600}
.tab[aria-selected="true"] b{color:var(--on-gold)}
[hidden]{display:none !important}
.row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.search{flex:1 1 220px;min-width:0;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:8px;padding:8px 12px;font:inherit;font-size:14px}
.search::placeholder{color:var(--muted)}
.chips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}
.chip{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);background:var(--surface);color:var(--ink-2);border-radius:6px;padding:5px 10px;font:inherit;font-size:13px;cursor:pointer;white-space:nowrap}
.chip[aria-pressed="true"]{border-color:var(--gold);color:var(--ink);background:var(--surface-2);box-shadow:inset 0 0 0 1px var(--gold)}
.dot{width:9px;height:9px;border-radius:50%;background:var(--fc,var(--muted));flex:0 0 auto}
.toggle{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--ink-2);cursor:pointer;padding:5px 4px}
.toggle input{accent-color:var(--gold)}
.count{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums;margin:14px 0 8px}
.list{display:grid;gap:10px}
.p{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px;display:grid;gap:8px;min-width:0}
.p.done{opacity:.62}
.p-head{display:grid;gap:3px;min-width:0}
.p-id{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-family:var(--f-mono);font-size:12px;color:var(--muted)}
.star{font-family:var(--f-body);font-size:12px;color:var(--gold);font-weight:600}
.music{font-family:var(--f-body);font-size:12px;color:var(--ether);font-weight:600}
.p h3{margin:0;font-family:var(--f-title);font-weight:400;font-size:20px;line-height:1.3}
.p h3 .en{font-family:var(--f-display);font-size:13px;font-weight:600;color:var(--ink-2);letter-spacing:.04em;margin-left:6px}
.meta{margin:0;font-size:13px;color:var(--muted)}
.meta code{font-family:var(--f-mono);font-size:12.5px;color:var(--ink-2)}
.gloss{margin:0;color:var(--ink-2);font-size:14px}
.txt{margin:0;font-family:var(--f-mono);font-size:12.5px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere;background:var(--surface-2);border-radius:8px;padding:10px 12px;color:var(--ink);
  display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}
.txt .dim{color:var(--muted)}
.p.open .txt{display:block;-webkit-line-clamp:unset}
.acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.btn{border:1px solid var(--line);background:var(--surface-2);color:var(--ink);border-radius:8px;padding:7px 14px;font:inherit;font-size:14px;cursor:pointer}
.btn.copy{background:var(--gold);border-color:var(--gold);color:var(--on-gold);font-weight:600}
.btn.copy.did{background:transparent;color:var(--gold);}
.btn:focus-visible,.tab:focus-visible,.chip:focus-visible,.search:focus-visible,.toggle input:focus-visible{outline:2px solid var(--ether);outline-offset:2px}
.mark{display:inline-flex;align-items:center;gap:6px;font-size:14px;color:var(--ink-2);cursor:pointer;margin-left:auto}
.mark input{accent-color:var(--good);width:18px;height:18px}
.more-wrap{display:flex;justify-content:center;margin-top:14px}
.empty{color:var(--muted);text-align:center;padding:40px 0}
.bgm-desc{margin:0;color:var(--ink-2);font-size:14px}
.bgm-tag{margin:2px 0 6px;font-size:13.5px;color:var(--muted)}
.bgm-tag b{color:var(--gold);font-weight:600}
.bgm-num{font-family:var(--f-display);font-weight:700;color:var(--gold);font-size:13px;letter-spacing:.12em}
.note{font-size:12.5px;color:var(--muted);margin:16px 0 0}
.toast{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:9px 16px;border-radius:999px;font-size:14px;z-index:20;max-width:calc(100% - 32px);text-align:center}
@media (prefers-reduced-motion: no-preference){ .toast{transition:opacity .2s} }
</style>

<div class="wrap">
  <header class="top">
    <p class="eyebrow">ETHERION</p>
    <h1>소리 프롬프트</h1>
    <p class="lede">Gemini의 음악 만들기(Lyria)에 그대로 붙여 넣는 프롬프트입니다. 배경음 ${bgm.length}곡, 공용 효과음 ${common.length}개, 카드 ${cards.length}장의 공격 · 방어 · 발동 · 장착 소리가 들어 있습니다.</p>
    <div class="tally" id="tally"></div>
    <details class="how">
      <summary>쓰는 법</summary>
      <ol>
        <li>Gemini 앱에서 음악 만들기를 고릅니다. 배경음은 3분이 되는 Lyria 3 Pro로, 안 되면 각 곡의 30초판으로 만드세요.</li>
        <li><b>복사</b>를 눌러 프롬프트를 통째로 붙여 넣습니다. 맨 앞 줄과 맨 끝 줄은 지우지 마세요. 음악이 끼어드는 것을 막는 줄입니다.</li>
        <li>효과음은 한 번에 같은 소리가 세 테이크(사이 무음) 나옵니다. 유닛은 공격 세 번 다음 방어 세 번입니다. 세 테이크 모두 씁니다.</li>
        <li>받은 파일은 카드에 적힌 이름으로 저장합니다. 배경음 <code>audio/inbox/bgm/</code>, 공용 효과음 <code>audio/inbox/sfx/</code>, 카드 효과음 <code>audio/inbox/sfx/cards/</code>.</li>
        <li>만든 것은 <b>만듦</b>에 표시해 두세요. 표시는 이 기기의 브라우저에만 저장됩니다.</li>
      </ol>
      <div class="fix" id="fixes"></div>
    </details>
  </header>

  <div class="bar" id="bar">
    <div class="tabs" role="tablist" aria-label="프롬프트 종류">
      <button class="tab" role="tab" id="tab-bgm" data-view="bgm">배경음<b>${bgm.length}</b></button>
      <button class="tab" role="tab" id="tab-common" data-view="common">공용 효과음<b>${common.length}</b></button>
      <button class="tab" role="tab" id="tab-cards" data-view="cards">카드 효과음<b>${cards.length}</b></button>
    </div>
    <div class="row" id="ctl-search">
      <input class="search" id="q" type="search" placeholder="이름 · 카드 ID · 소리로 찾기" autocomplete="off">
      <label class="toggle"><input type="checkbox" id="only-todo"> 안 만든 것만</label>
      <label class="toggle" id="star-wrap"><input type="checkbox" id="only-star"> ★기본 덱만</label>
    </div>
    <div class="chips" id="chips-a"></div>
    <div class="chips" id="chips-b"></div>
  </div>

  <p class="count" id="count"></p>
  <main class="list" id="list" aria-live="polite"></main>
  <div class="more-wrap"><button class="btn" id="more" hidden>더 보기</button></div>
  <p class="note">프롬프트 원본은 저장소의 <code>tools/bgm/PROMPT_BGM.md</code> · <code>tools/sfx/prompts/</code>에 있습니다.</p>
</div>
<div class="toast" id="toast" hidden></div>

<script type="application/json" id="data">${json}</script>
<script>
(function(){
  "use strict";
  var D = JSON.parse(document.getElementById("data").textContent);
  var FLAG = {B1:["잿불 고블린","#f06a48"],B2:["무쇠수염 드워프","#a3afbd"],B3:["번개 노움","#e9bd3c"],G1:["바위주먹 오크","#c99260"],G2:["이끼 트롤","#5fbf7a"],G3:["푸른비늘 인어","#5cb3e0"],A1:["심연 마족","#ac82dc"],A2:["성광 천족","#f0cf6a"],A3:["폭풍 하이엘프","#6cc9c1"]};
  var FLAGS = ["B1","B2","B3","G1","G2","G3","A1","A2","A3"];
  var KIND = {unit:"유닛",spell:"마법",item:"아이템"};
  var GRADE = {common:"일반",uncommon:"고급",rare:"레어",epic:"에픽",unique:"유니크",special:"스페셜",upgrade:"강화",token:"소환물"};
  var SPELL = {atk:"공격 마법",def:"방어 마법",any:"공용 마법",hand:"핸드 마법"};
  var GROUP = {}; D.groups.forEach(function(g){ GROUP[g.id] = g.ko; });
  var FIXES = [
    ["효과음이 음악처럼 나올 때","No music at all. Only the sound effects from the timeline, with complete silence between them."],
    ["배경음을 더 잔잔하게","Same piece, but softer and calmer, with a simpler accompaniment."],
    ["주제가 잘 안 들릴 때","Make the main theme simpler and repeat it more clearly at each section."],
    ["정점이 너무 셀 때","Make the climax warmer and gentler, not dramatic."],
    ["노래 · 합창이 들어갈 때 (13번 말고)","Instrumental only, no vocals or choir at all."],
    ["1부에 북 · 타악기가 들어갈 때","Remove all drums and percussion completely."],
    ["2부의 북 · 타악기가 너무 클 때","Same piece, but make the drums softer, rounder and further behind the melody."],
    ["너무 빠르거나 바쁠 때","Same piece, a little slower and lighter, with fewer notes."],
    ["곡에 물소리 · 바람 소리가 섞일 때","Music only, no sound effects."],
    ["13번 합창에 가사가 들릴 때","Keep the choir wordless: only soft 'ah' and 'oo' vowels, no lyrics."],
    ["13번 합창을 아예 뺄 때","Replace the choir with strings and organ. Instrumental."],
    ["8번 신시사이저가 거슬릴 때","Replace the synthesizer with celesta and marimba. Acoustic instruments only."]
  ];
  var KEY = "etherion.soundPrompts.done";
  var done = {};
  try { (JSON.parse(localStorage.getItem(KEY) || "[]") || []).forEach(function(k){ done[k] = 1; }); } catch (e) {}
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(Object.keys(done))); } catch (e) {} }

  var st = { view: "bgm", q: "", todo: false, star: false, flag: "", kind: "", group: "", part: "", scene: "", shown: 40 };
  var PAGE = 40;
  var $ = function(id){ return document.getElementById(id); };
  function bold(s){ return esc(s).replace(/\\*\\*(.+?)\\*\\*/g, "<b>$1</b>"); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[c]; }); }
  /* 모든 프롬프트에 똑같이 붙는 줄은 흐리게 (복사는 원문 그대로) */
  var DIM = /^(Sound effects only|Dark-fantasy card game\\.|Fantasy card game, interface|Clean, close, dry studio|Warm, natural concert-hall recording; no drums)/;
  function fmt(p){ return String(p).split("\\n").map(function(l){ return DIM.test(l) ? '<span class="dim">' + esc(l) + '</span>' : esc(l); }).join("\\n"); }

  var toastT = 0;
  function toast(msg){ var t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(function(){ t.hidden = true; }, 2200); }
  function copy(text, card){
    var ok = function(){ toast("복사했습니다. Gemini에 붙여 넣으세요."); };
    var fail = function(){
      if (card) { card.classList.add("open"); var pre = card.querySelector(".txt"); if (pre) { var r = document.createRange(); r.selectNodeContents(pre); var s = getSelection(); s.removeAllRanges(); s.addRange(r); } }
      toast("자동 복사가 막혔습니다. 선택된 글을 길게 눌러 복사하세요.");
    };
    try { navigator.clipboard.writeText(text).then(ok, fail); } catch (e) { fail(); }
  }

  /* 고칠 때 쓰는 짧은 말 */
  $("fixes").innerHTML = FIXES.map(function(f, i){ return '<div class="fix-row"><p>' + esc(f[0]) + '<span>' + esc(f[1]) + '</span></p><button class="btn" type="button" data-fix="' + i + '">복사</button></div>'; }).join("");
  $("fixes").addEventListener("click", function(e){ var b = e.target.closest("[data-fix]"); if (b) copy(FIXES[+b.dataset.fix][1]); });

  function tally(){
    var n = function(list, key){ return list.filter(function(x){ return done[key(x)]; }).length; };
    var b = n(D.bgm, function(x){ return "bgm:" + x.id; }), c = n(D.common, function(x){ return "sfx:" + x.id; }), k = n(D.cards, function(x){ return "card:" + x.id; });
    var sk = D.cards.filter(function(x){ return x.s; });
    $("tally").innerHTML = '<span>배경음 <b>' + b + ' / ' + D.bgm.length + '</b></span><span>공용 효과음 <b>' + c + ' / ' + D.common.length + '</b></span><span>카드 효과음 <b>' + k + ' / ' + D.cards.length + '</b></span><span>그중 ★기본 덱 <b>' + n(sk, function(x){ return "card:" + x.id; }) + ' / ' + sk.length + '</b></span>';
  }

  function chips(){
    var a = $("chips-a"), b = $("chips-b");
    if (st.view === "cards") {
      a.innerHTML = '<button class="chip" type="button" data-flag="" aria-pressed="' + (st.flag === "") + '">모든 깃발</button>' + FLAGS.map(function(f){ return '<button class="chip" type="button" data-flag="' + f + '" aria-pressed="' + (st.flag === f) + '"><span class="dot" style="--fc:' + FLAG[f][1] + '"></span>' + esc(FLAG[f][0]) + '</button>'; }).join("");
      b.innerHTML = [["","모든 종류"],["unit","유닛 — 공격 · 방어"],["spell","마법 — 발동"],["item","아이템 — 장착"]].map(function(k){ return '<button class="chip" type="button" data-kind="' + k[0] + '" aria-pressed="' + (st.kind === k[0]) + '">' + k[1] + '</button>'; }).join("");
      a.hidden = b.hidden = false;
    } else if (st.view === "common") {
      a.innerHTML = '<button class="chip" type="button" data-group="" aria-pressed="' + (st.group === "") + '">모두</button>' + D.groups.map(function(g){ return '<button class="chip" type="button" data-group="' + g.id + '" aria-pressed="' + (st.group === g.id) + '">' + esc(g.ko) + '</button>'; }).join("");
      a.hidden = false; b.hidden = true; b.innerHTML = "";
    } else {
      var parts = []; D.bgm.forEach(function(x){ if (parts.indexOf(x.part) < 0) parts.push(x.part); });
      a.innerHTML = '<button class="chip" type="button" data-part="" aria-pressed="' + (st.part === "") + '">모두 ' + D.bgm.length + '</button>' + parts.map(function(p){ var n = D.bgm.filter(function(x){ return x.part === p; }).length; return '<button class="chip" type="button" data-part="' + esc(p) + '" aria-pressed="' + (st.part === p) + '">' + esc(p) + ' ' + n + '</button>'; }).join("");
      b.innerHTML = [["","모든 자리"],["title","타이틀"],["town","대기실 쪽"],["battle","대전"]].map(function(k){ return '<button class="chip" type="button" data-scene="' + k[0] + '" aria-pressed="' + (st.scene === k[0]) + '">' + k[1] + '</button>'; }).join("");
      a.hidden = b.hidden = false;
    }
    $("ctl-search").hidden = st.view === "bgm";
    $("star-wrap").hidden = st.view !== "cards";
  }

  function match(hay){ if (!st.q) return true; var q = st.q.toLowerCase(); return hay.toLowerCase().indexOf(q) >= 0; }
  function items(){
    if (st.view === "bgm") return D.bgm.filter(function(x){ return (!st.part || x.part === st.part) && (!st.scene || x.sc.indexOf(st.scene) >= 0); });
    if (st.view === "common") return D.common.filter(function(x){ return (!st.group || x.gr === st.group) && (!st.todo || !done["sfx:" + x.id]) && match(x.id + " " + x.when + " " + (x.now || "")); });
    return D.cards.filter(function(x){ return (!st.flag || x.g === st.flag) && (!st.kind || x.k === st.kind) && (!st.star || x.s) && (!st.todo || !done["card:" + x.id]) && match(x.id + " " + x.name + " " + x.en + " " + x.ko); });
  }

  function cardBGM(x){
    var key = "bgm:" + x.id;
    return '<article class="p' + (done[key] ? " done" : "") + '" data-key="' + key + '">' +
      '<div class="p-head"><div class="p-id"><span class="bgm-num">' + x.n + '</span><span>' + esc(x.id) + '</span><span>' + esc(x.place) + '</span></div>' +
      '<h3>' + esc(x.title) + '</h3>' + (x.tag ? '<p class="bgm-tag">' + bold(x.tag) + '</p>' : '') + '<p class="bgm-desc">' + esc(x.desc) + '</p><p class="meta">받을 파일 <code>' + esc(x.id) + '.mp3</code></p></div>' +
      '<pre class="txt">' + esc(x.prompt) + '</pre>' +
      '<div class="acts"><button class="btn copy" type="button" data-copy="full">3분판 복사</button><button class="btn" type="button" data-copy="short">30초판 복사</button><button class="btn" type="button" data-open>펼치기</button>' +
      '<label class="mark"><input type="checkbox" data-done' + (done[key] ? " checked" : "") + '> 만듦</label></div></article>';
  }
  function cardCommon(x){
    var key = "sfx:" + x.id;
    return '<article class="p' + (done[key] ? " done" : "") + '" data-key="' + key + '">' +
      '<div class="p-head"><div class="p-id"><span>' + esc(GROUP[x.gr] || "") + '</span>' + (x.music ? '<span class="music">짧은 음악</span>' : "") + '</div>' +
      '<h3>' + esc(x.when) + '</h3>' +
      '<p class="meta">' + (x.now ? '지금 소리 <code>' + esc(x.now) + '</code>' : '새 자리') + ' · 약 ' + x.len + '초 · 받을 파일 <code>' + esc(x.id) + '.mp3</code></p></div>' +
      '<pre class="txt">' + fmt(x.p) + '</pre>' + acts(key) + '</article>';
  }
  function cardCard(x){
    var key = "card:" + x.id, meta = KIND[x.k] + (x.k === "spell" && SPELL[x.st] ? " · " + SPELL[x.st] : "") + " · Lv" + x.lv + " · " + (GRADE[x.gr] || x.gr);
    return '<article class="p' + (done[key] ? " done" : "") + '" data-key="' + key + '">' +
      '<div class="p-head"><div class="p-id"><span class="dot" style="--fc:' + FLAG[x.g][1] + '"></span><span>' + esc(x.id) + '</span><span>' + esc(FLAG[x.g][0]) + '</span>' + (x.s ? '<span class="star">★기본 덱</span>' : "") + '</div>' +
      '<h3>' + esc(x.name) + '<span class="en">' + esc(x.en) + '</span></h3>' +
      '<p class="gloss">' + esc(x.ko) + '</p>' +
      '<p class="meta">' + esc(meta) + ' · 받을 파일 <code>' + esc(x.id) + '.mp3</code></p></div>' +
      '<pre class="txt">' + fmt(x.p) + '</pre>' + acts(key) + '</article>';
  }
  function acts(key){ return '<div class="acts"><button class="btn copy" type="button" data-copy="full">복사</button><button class="btn" type="button" data-open>펼치기</button><label class="mark"><input type="checkbox" data-done' + (done[key] ? " checked" : "") + '> 만듦</label></div>'; }

  var cur = [];
  function render(keepShown){
    if (!keepShown) st.shown = PAGE;
    document.querySelectorAll(".tab").forEach(function(t){ t.setAttribute("aria-selected", t.dataset.view === st.view ? "true" : "false"); });
    chips();
    cur = items();
    var list = cur.slice(0, st.view === "bgm" ? cur.length : st.shown);
    var fn = st.view === "bgm" ? cardBGM : st.view === "common" ? cardCommon : cardCard;
    $("list").innerHTML = list.length ? list.map(fn).join("") : '<p class="empty">맞는 프롬프트가 없습니다. 거르기를 풀어 보세요.</p>';
    $("count").textContent = st.view === "bgm" ? "배경음 " + cur.length + "곡 · 쓸 곳은 제안입니다" : cur.length + "개 중 " + list.length + "개 보는 중";
    var left = cur.length - list.length;
    $("more").hidden = st.view === "bgm" || left <= 0;
    $("more").textContent = "더 보기 (" + left + "개 남음)";
    tally();
  }
  function find(key){ for (var i = 0; i < cur.length; i++) { var x = cur[i]; var k = (st.view === "bgm" ? "bgm:" : st.view === "common" ? "sfx:" : "card:") + x.id; if (k === key) return x; } return null; }

  $("list").addEventListener("click", function(e){
    var card = e.target.closest(".p"); if (!card) return;
    var x = find(card.dataset.key); if (!x) return;
    var cb = e.target.closest("[data-copy]");
    if (cb) { copy(st.view === "bgm" ? (cb.dataset.copy === "short" ? x.short : x.prompt) : x.p, card); cb.classList.add("did"); return; }
    var ob = e.target.closest("[data-open]");
    if (ob) { var o = card.classList.toggle("open"); ob.textContent = o ? "접기" : "펼치기"; }
  });
  $("list").addEventListener("change", function(e){
    if (!e.target.matches("[data-done]")) return;
    var card = e.target.closest(".p"), key = card.dataset.key;
    if (e.target.checked) done[key] = 1; else delete done[key];
    card.classList.toggle("done", e.target.checked); save(); tally();
  });
  $("bar").addEventListener("click", function(e){
    var t = e.target.closest(".tab"); if (t) { go(t.dataset.view); return; }
    var c = e.target.closest(".chip"); if (!c) return;
    if ("flag" in c.dataset) st.flag = c.dataset.flag; else if ("kind" in c.dataset) st.kind = c.dataset.kind; else if ("group" in c.dataset) st.group = c.dataset.group; else if ("part" in c.dataset) st.part = c.dataset.part; else if ("scene" in c.dataset) st.scene = c.dataset.scene;
    render();
  });
  $("q").addEventListener("input", function(){ st.q = this.value.trim(); render(); });
  $("only-todo").addEventListener("change", function(){ st.todo = this.checked; render(); });
  $("only-star").addEventListener("change", function(){ st.star = this.checked; render(); });
  $("more").addEventListener("click", function(){ st.shown += PAGE; render(true); });

  var VIEWS = ["bgm","common","cards"];
  function go(v){ if (VIEWS.indexOf(v) < 0) v = "bgm"; st.view = v; if (location.hash !== "#" + v) { try { history.replaceState(null, "", "#" + v); } catch (e) {} } render(); }
  addEventListener("hashchange", function(){ var v = location.hash.slice(1); if (v !== st.view && VIEWS.indexOf(v) >= 0) { st.view = v; render(); } });
  go(location.hash.slice(1));
})();
</script>
`;
fs.writeFileSync(OUT, html);
console.log("wrote", OUT, (html.length / 1024).toFixed(0) + " KB", "bgm", bgm.length, "common", common.length, "cards", cards.length);
