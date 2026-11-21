/* ETHERION — 카드 장면 지시 도우미 (n판, 2026-11-20)
   카드 일러스트 프롬프트의 중심은 카드마다 손으로 쓰는 "장면 지시"(tools/art/art_scenes/<깃발>.json)다.
   이 도구는 그 장면을 쓸 때 볼 자료를 뽑아 주고(todo), 다 쓴 장면을 검사한다(lint).

   실행 (게임 폴더 맨 위에서):
     node tools/art/scene_tool.js todo [깃발 …] [--all]   장면이 없는 카드의 자료 + 틀 제안 (--all = 이미 쓴 카드도)
     node tools/art/scene_tool.js lint [깃발 …]            장면 검사 (오류가 있으면 종료 코드 1)
     node tools/art/scene_tool.js add <파일.json> …        다른 곳에 써 둔 장면({ 카드ID: { shot … } })을 깃발 파일에 넣는다(같은 ID는 바꿔 씀)

   자료 = 카드 이름 · 종류(kin)와 생김새 참고(art_kinds.json) · 서사 · 효과 · 원래 카드.
   틀 제안 = shot · dir · place · pal 을 그 깃발에서 아직 덜 쓴 것부터 고르게 나눠 준 것(씨앗 고정 — 다시 돌려도 같다).
            제안은 출발점이다. 카드에 더 맞는 틀이 있으면 바꿔 쓰되 lint가 통과해야 한다. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..", "..");
const S = JSON.parse(fs.readFileSync(path.join(__dirname, "art_style.json"), "utf8"));
const KINDS = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, "art_kinds.json"), "utf8")); } catch (e) { return {}; } })();
const SCENE_DIR = path.join(__dirname, "art_scenes");
/* 옛 g4 카드별 그림 지시 — 내용 참고용(스페셜 · 유니크 · 일부 마법). 없어도 된다 */
const OLD_NOTES = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, "legacy_g4", "art_notes_g4.json"), "utf8")); } catch (e) { return {}; } })();

const DATA_FILES = ["data", "names", "retired", "briefs", "specials", "uniques", "highcards", "pincards", "rarespells", "counterspells", "upgrades", "rebalance", "abyss", "gnome", "orc", "mermaid", "rares", "elf", "goblin", "newabil", "troll", "celestial", "kinds", "statguide", "itemtune", "itemrework", "spelltune", "decks", "cards", "wording", "lore", "grades"];
function loadGame() {
  const stub = () => null;
  const ctx = {
    console, navigator: {}, location: { search: "", hash: "" },
    localStorage: { getItem: stub, setItem: stub, removeItem: stub },
    document: { getElementById: stub, querySelector: stub, querySelectorAll: () => [], addEventListener: stub, createElement: () => ({ style: {}, setAttribute: stub }) },
    addEventListener: stub, setTimeout, clearTimeout
  };
  ctx.window = ctx; vm.createContext(ctx);
  let src = "";
  for (const f of DATA_FILES) { const p = path.join(ROOT, "js", f + ".js"); if (fs.existsSync(p)) src += fs.readFileSync(p, "utf8") + "\n;\n"; }
  src += "this.__o = { CARDS, GROUPS, RETIRED: (typeof RETIRED_CARDS !== 'undefined' ? RETIRED_CARDS : {}), UNIQUE_ABIL: (typeof UNIQUE_ABIL !== 'undefined' ? UNIQUE_ABIL : {}) };";
  vm.runInContext(src, ctx, { filename: "etherion-data" });
  return ctx.__o;
}

const isToken = c => /^T[KS]-/.test(c.id);
const gradeKey = c => isToken(c) ? "token" : (c.grade || "common");
const typeOf = c => c.type === "unit" ? "unit" : c.type === "item" ? "item" : "spell";
const LEGACY = new Set(S.legacyGrades || []);
const FLAGS = Object.keys(S.flags);

function loadScenes() {
  const all = {}, where = {};
  if (!fs.existsSync(SCENE_DIR)) return { all, where };
  for (const f of fs.readdirSync(SCENE_DIR).filter(x => x.endsWith(".json")).sort()) {
    let j;
    try { j = JSON.parse(fs.readFileSync(path.join(SCENE_DIR, f), "utf8")); }
    catch (e) { console.error(`✗ ${f}: JSON을 읽지 못함 — ${e.message}`); process.exitCode = 1; continue; }
    for (const id of Object.keys(j)) { if (id[0] === "_") continue; all[id] = j[id]; where[id] = f; }
  }
  return { all, where };
}

/* 대상 카드 = 뺀 카드가 아니고, 옛 프롬프트를 쓰는 등급(스페셜 · 레어)이 아닌 카드 */
function targets(D, flags) {
  return Object.keys(D.CARDS).filter(id => !D.RETIRED[id]).map(id => D.CARDS[id])
    .filter(c => !LEGACY.has(gradeKey(c)) && S.flags[c.group] && (!flags.length || flags.includes(c.group)))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/* 씨앗 고정 난수 */
function rng(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) { h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
/* 덜 쓴 것부터: count/weight가 가장 작은 낱말(같으면 씨앗 난수), 둘째 후보도 함께 */
function deal(counts, weights, rnd, avoid) {
  const keys = Object.keys(weights).filter(k => k !== avoid);
  const scored = keys.map(k => ({ k, s: (counts[k] || 0) / weights[k] + rnd() * 0.9 / weights[k] })).sort((x, y) => x.s - y.s);
  return [scored[0].k, scored[1] ? scored[1].k : scored[0].k];
}

const GIFT_KO = { ignite: "점화", ranged: "원거리", farmor: "화염 갑주", thorns: "가시", regen: "재생", ward: "가호", purify: "정화", taunt: "수호", bash: "방패 반격", firm: "굳건", crit: "치명", shred: "관통", chain: "연쇄", shield: "보호막", throw: "투척", magic: "방어무시", arcane: "마력 공격", heal: "치유", intercept: "요격", bleed: "출혈", leech: "흡혈", rob: "강탈", veil: "그림자 걸음", pact: "피의 계약", aura: "오라(양옆 아군 강화)", calm: "바다의 보호", every: "매 턴", u: "유니크 능력" };
const TYPE_KO = { unit: "유닛", atk: "공격 마법", def: "방어 마법", any: "공용 마법", hand: "핸드 마법", item: "아이템" };
const DIR_W = { unit: { L: 3, R: 3, F: 2, B: 1.5, N: 0.5 }, spell: { L: 2, R: 2, F: 1.5, B: 1, U: 1.5, D: 1.5, N: 2 }, item: { N: 3, L: 1, R: 1, U: 0.5, D: 0.5 } };
const PLACE_W = { C: 3, L: 3, R: 3, X: 1.5, T: 1, B: 1 };

function giftText(c) {
  const g = c.gift || {}, out = [];
  for (const k of Object.keys(g)) { if (k === "evName" || k === "evText" || k === "auraG") continue; out.push(`[${GIFT_KO[k] || k}${typeof g[k] === "number" ? " " + g[k] : ""}]`); }
  if (c.rev) out.push(`성향 ${c.rev}`);
  return out.join(" ") || "능력 없음";
}

function cmdTodo(flags, all) {
  const D = loadGame(), { all: SC } = loadScenes();
  const list = targets(D, flags);
  const byFlag = {};
  for (const c of list) (byFlag[c.group] = byFlag[c.group] || []).push(c);
  const out = [];
  for (const g of Object.keys(byFlag).sort()) {
    const F = S.flags[g], K = KINDS[g] || { kinds: {} };
    const cards = byFlag[g];
    /* 이미 쓴 장면의 쓰임을 세고, 없는 카드에 덜 쓴 것부터 나눠 준다 */
    const cnt = { unit: {}, spell: {}, item: {} }, dcnt = { unit: {}, spell: {}, item: {} }, pcnt = {}, palc = {};
    if (!all) for (const c of cards) { const s = SC[c.id]; if (!s) continue; const t = typeOf(c);
      cnt[t][s.shot] = (cnt[t][s.shot] || 0) + 1; dcnt[t][s.dir] = (dcnt[t][s.dir] || 0) + 1; pcnt[s.place] = (pcnt[s.place] || 0) + 1; palc[s.pal] = (palc[s.pal] || 0) + 1; }
    const todo = cards.filter(c => all || !SC[c.id]);
    if (!todo.length) continue;
    const palW = {}; Object.keys(F.palettes).forEach(k => palW[k] = 1);
    out.push(`# ${g} ${F.ko} (${F.en}) — 장면을 쓸 카드 ${todo.length}장`, "",
      `깃발 한 줄: ${F.world}`,
      `배색(pal): ${Object.keys(F.palettes).map(k => `\`${k}\` ${F.palettes[k]}`).join(" / ")}`,
      `장소 낱말: ${F.locales.join(", ")}`, "");
    /* 섞어서 나눠 주되(낮은 레벨에 같은 틀이 몰리지 않게) 적는 차례는 카드 ID */
    const r = rng("n1:" + g), order = todo.map(c => ({ c, k: r() })).sort((a, b) => a.k - b.k).map(x => x.c), sug = {};
    for (const c of order) {
      const t = typeOf(c), W = {}; Object.keys(S.shots[t]).forEach(k => W[k] = S.shots[t][k].w);
      const [a, b] = deal(cnt[t], W, r); cnt[t][a] = (cnt[t][a] || 0) + 1;
      const [d] = deal(dcnt[t], DIR_W[t], r); dcnt[t][d] = (dcnt[t][d] || 0) + 1;
      const [p] = deal(pcnt, PLACE_W, r); pcnt[p] = (pcnt[p] || 0) + 1;
      const [pl, pl2] = deal(palc, palW, r); palc[pl] = (palc[pl] || 0) + 1;
      sug[c.id] = { a, b, d, p, pl, pl2 };
    }
    for (const c of todo) {
      const t = typeOf(c), gk = gradeKey(c), G = S.grades[gk], x = sug[c.id];
      const head = [`### ${c.id} · ${c.name} — ${TYPE_KO[c.type] || c.type} · ${G.ko} · 레벨 ${c.lv}`];
      const L = [];
      if (t === "unit") {
        const kk = c.kin && K.kinds[c.kin];
        L.push(`종류: ${c.kin || "(없음)"}${kk ? ` =${kk.en}: ${kk.who} / 실루엣: ${kk.silhouette} / 재질: ${kk.materials}` : ""} · 클래스 ${c.cl || "-"} · 공/방/체 ${c.a}/${c.d}/${c.h} · ${giftText(c)}`);
        if (c.gift && c.gift.u && D.UNIQUE_ABIL[c.gift.u]) { const u = D.UNIQUE_ABIL[c.gift.u]; L.push(`유니크 능력: ${[u.n || u.name, u.text || u.desc].filter(Boolean).join(" — ")}`); }
        if (c.base && D.CARDS[c.base]) { const B = D.CARDS[c.base]; L.push(`원래 카드: ${B.id} ${B.name} — ${(B.flavor || "").trim()}`); }
      } else if (t === "item") {
        const it = c.item || {};
        L.push(`분류 ${it.cat || "-"} · 아이콘 ${it.icon || "-"} · 공/방/체 +${c.a}/${c.d}/${c.h} · ${giftText(Object.assign({}, c, { gift: Object.assign({}, c.gift) }))}`);
      } else L.push(`효과: ${(c.text || "").replace(/\s+/g, " ").trim()}${c.comeback ? " (역전 마법)" : ""}`);
      const lore = (c.flavor || (c.item && c.item.desc) || "").trim();
      if (lore) L.push(`서사: ${lore}`);
      if (c.special) L.push(t === "item" ? "스페셜 아이템 = 성소에 모신 하나뿐인 유물. 물건이 주인공이고 주인 · 신 · 거인은 화면 밖(흔적 · 크기 단서로만)." : "스페셜 유닛 = 깃발마다 하나뿐인 신화적 존재. 제 원소로 이루어진 몸, 요새 · 군대 · 용과 견줄 크기 — 평범한 종족의 모습으로 쓰지 않는다(종족 낱말 없음).");
      if (typeof OLD_NOTES[c.id] === "string") L.push(`옛 그림 지시(무엇인지 내용만 참고 — 시점 · 구도 · 빛은 새로 정한다): ${OLD_NOTES[c.id]}`);
      L.push(`제안 틀: shot \`${x.a}\`(${S.shots[t][x.a].en}) 또는 \`${x.b}\` · dir ${x.d} · place ${x.p} · pal \`${x.pl}\` 또는 \`${x.pl2}\``);
      out.push(head[0], ...L, "");
    }
  }
  process.stdout.write(out.join("\n") + "\n");
}

/* ---------- lint ---------- */
const RACE_WORDS = [
  { ko: ["고블린"], re: /\b(goblin|goblins)\b/i }, { ko: ["드워프"], re: /\b(dwarf|dwarfs|dwarves|dwarven|dwarvish)\b/i }, { ko: ["노움"], re: /\b(gnome|gnomes|gnomish)\b/i },
  { ko: ["오크"], re: /\b(orc|orcs|orcish)\b/i }, { ko: ["트롤"], re: /\b(troll|trolls|trollish)\b/i }, { ko: ["인어"], re: /\b(merfolk|mermaid|mermaids|merman|mermen|merrow)\b/i },
  { ko: ["마족", "악마", "임프"], re: /\b(demon|demons|demonic|fiend|fiends|devil|devils)\b/i }, { ko: ["천족", "천사", "세라", "케루"], re: /\b(seraph|seraphs|seraphim|angel|angels|angelic|cherub|cherubs|cherubim)\b/i },
  { ko: ["엘프"], re: /\b(elf|elves|elven|elvish)\b/i }
];
const PROPER = /\b(Dormak|Sorgrim|Keraun|Gorvath|Verdan|Marencia|Morkas|Solante|Belumir|Talakus|Ordun|Auragon|Ignal|Feros|Astrak|Fortan|Durkheim|Voltarium|Garun|Silvaniel|Selenea|Noctar|Elad|Kailan|Etherion|Arche)\b/;
const NEG = /\b(no|not|never|without|avoid|zero|none)\b/gi;
const words = s => String(s || "").trim().split(/\s+/).filter(Boolean).length;

function cmdLint(flags) {
  const D = loadGame(), { all: SC, where } = loadScenes();
  const list = targets(D, flags);
  const err = [], warn = [];
  const ids = new Set(list.map(c => c.id));
  for (const id of Object.keys(SC)) {
    const c = D.CARDS[id];
    if (flags.length && c && !flags.includes(c.group)) continue;
    if (!c) warn.push(`${id} (${where[id]}): 게임에 없는 카드 ID`);
    else if (!ids.has(id) && (!flags.length || flags.includes(c.group))) warn.push(`${id} (${where[id]}): 대상이 아님(뺀 카드이거나 스페셜 · 레어) — 프롬프트에 쓰이지 않는다`);
    if (c && where[id] !== c.group + ".json") warn.push(`${id}: ${where[id]}에 있음 — ${c.group}.json에 두는 것이 맞다`);
  }
  const byFlag = {};
  for (const c of list) {
    const s = SC[c.id], g = c.group, F = S.flags[g], t = typeOf(c);
    const B = byFlag[g] = byFlag[g] || { n: { unit: 0, spell: 0, item: 0 }, shot: { unit: {}, spell: {}, item: {} }, dir: { unit: {} }, place: {}, pal: {}, open: {}, total: 0, miss: [] };
    if (!s) { B.miss.push(c.id); continue; }
    const tag = `${c.id} ${c.name}`;
    if (!S.shots[t][s.shot]) err.push(`${tag}: shot "${s.shot}"는 ${t} 낱말이 아님 (${Object.keys(S.shots[t]).join(" ")})`);
    if (!S.dirs[s.dir] || s.dir === "_about") err.push(`${tag}: dir "${s.dir}" (L R F B U D N)`);
    if (!S.places[s.place] || s.place === "_about") err.push(`${tag}: place "${s.place}" (C L R T B X)`);
    if (!F.palettes[s.pal]) err.push(`${tag}: pal "${s.pal}"는 ${g} 배색이 아님 (${Object.keys(F.palettes).join(" ")})`);
    const text = `${s.scene || ""} ${s.light || ""}`;
    const n = words(s.scene);
    if (!s.scene || n < 35) err.push(`${tag}: scene이 너무 짧음(${n}단어, 45~100)`);
    else if (n > 115) err.push(`${tag}: scene이 너무 김(${n}단어, 45~100)`);
    else if (n < 45 || n > 100) warn.push(`${tag}: scene ${n}단어(45~100 권장)`);
    if (!s.light || words(s.light) < 5) err.push(`${tag}: light(빛 한 문장)가 없음`);
    else if (words(s.light) > 40) warn.push(`${tag}: light가 김(${words(s.light)}단어)`);
    if (/[가-힣]/.test(text)) err.push(`${tag}: 한글이 들어 있음(영어로만)`);
    /* 종족 낱말(goblin · orc · gnome …): 몸은 카드의 종류(kin)대로 쓴다 — 종류에 그 낱말이 든 유닛(세라프 · 엘프 …)만 통과 */
    for (const R of RACE_WORDS) {
      if (!R.re.test(text)) continue;
      const ok = t === "unit" && c.kin && R.ko.some(k => c.kin.includes(k));
      if (!ok) err.push(`${tag}: 종족 낱말 "${text.match(R.re)[0]}" — 이 카드는 ${t === "unit" ? `종류가 「${c.kin || "없음"}」` : "유닛이 아님"}`);
    }
    const pm = text.match(PROPER); if (pm) err.push(`${tag}: 고유명사 "${pm[0]}" — 그림 AI가 모르는 이름이다. 눈에 보이는 모습으로 풀어 쓴다`);
    const ng = text.match(NEG); if (ng) warn.push(`${tag}: 부정 낱말 ${[...new Set(ng.map(x => x.toLowerCase()))].join(", ")} — 있는 것만 긍정문으로`);
    if (t !== "unit" && /\b(caster|mage|wizard|sorcerer|sorceress|warrior|soldier|knight|archer|priest|priestess)s?\b/i.test(text)) warn.push(`${tag}: ${t === "item" ? "아이템" : "마법"} 장면에 인물 낱말 "${text.match(/\b(caster|mage|wizard|sorcerer|sorceress|warrior|soldier|knight|archer|priest|priestess)s?\b/i)[0]}" — 주인공이 인물이 되지 않는지 확인`);
    B.n[t]++; B.total++;
    B.shot[t][s.shot] = (B.shot[t][s.shot] || 0) + 1;
    if (t === "unit") B.dir.unit[s.dir] = (B.dir.unit[s.dir] || 0) + 1;
    B.place[s.place] = (B.place[s.place] || 0) + 1;
    B.pal[s.pal] = (B.pal[s.pal] || 0) + 1;
    const op = String(s.scene || "").toLowerCase().replace(/[^a-z ]/g, "").split(/\s+/).slice(0, 3).join(" ");
    (B.open[op] = B.open[op] || []).push(c.id);
  }
  const rep = [];
  for (const g of Object.keys(byFlag).sort()) {
    const B = byFlag[g], F = S.flags[g];
    if (B.miss.length) err.push(`${g}: 장면이 없는 카드 ${B.miss.length}장 — ${B.miss.join(", ")}`);
    for (const t of ["unit", "spell", "item"]) {
      const n = B.n[t]; if (!n) continue;
      const cap = t === "unit" ? Math.max(2, Math.ceil(n * 0.12)) : t === "spell" ? Math.max(2, Math.ceil(n * 0.15)) : 2;
      for (const k of Object.keys(B.shot[t])) if (B.shot[t][k] > cap) err.push(`${g} ${t}: shot "${k}" ${B.shot[t][k]}장 — 한 낱말은 ${cap}장까지(${n}장 가운데)`);
      if (t === "unit" && (B.shot.unit.low || 0) > 2) err.push(`${g} unit: 올려다보는 시점(low) ${B.shot.unit.low}장 — 2장까지`);
      const used = Object.keys(B.shot[t]).length, want = Math.min(Object.keys(S.shots[t]).length, t === "unit" ? Math.ceil(n * 0.4) : t === "spell" ? Math.ceil(n * 0.6) : Math.ceil(n * 0.8));
      if (used < want) err.push(`${g} ${t}: shot 종류 ${used}가지 — ${n}장이면 ${want}가지 이상`);
    }
    const nu = B.n.unit, dl = B.dir.unit.L || 0, dr = B.dir.unit.R || 0;
    if (nu >= 8) {
      if (dl > nu * 0.4 || dr > nu * 0.4) err.push(`${g} unit: 방향 L ${dl} · R ${dr} — 한쪽은 40%(${Math.floor(nu * 0.4)}장)까지`);
      if (Math.abs(dl - dr) > Math.max(3, nu * 0.12)) err.push(`${g} unit: 방향 L ${dl} · R ${dr} — 좌우가 비슷해야 한다`);
    }
    if (B.total >= 8 && (B.place.C || 0) > B.total * 0.4) err.push(`${g}: 가운데(place C) ${B.place.C}장 — 40%(${Math.floor(B.total * 0.4)}장)까지`);
    const pk = Object.keys(F.palettes), pcap = Math.ceil(B.total * 0.28);
    if (B.total >= 12) for (const k of pk) {
      if (!(B.pal[k])) err.push(`${g}: 배색 "${k}"를 한 번도 안 씀`);
      else if (B.pal[k] > pcap) err.push(`${g}: 배색 "${k}" ${B.pal[k]}장 — ${pcap}장까지`);
    }
    for (const op of Object.keys(B.open)) if (op && B.open[op].length > 3) warn.push(`${g}: 같은 말로 시작하는 장면 ${B.open[op].length}장 ("${op} …") — ${B.open[op].join(", ")}`);
    const f = o => Object.keys(o).sort((a, b) => o[b] - o[a]).map(k => `${k} ${o[k]}`).join(" · ");
    rep.push(`${g} ${F.ko}: ${B.total}장 (유닛 ${B.n.unit} · 마법 ${B.n.spell} · 아이템 ${B.n.item})${B.miss.length ? ` · 없음 ${B.miss.length}` : ""}`,
      `   유닛 shot: ${f(B.shot.unit)}`, `   마법 shot: ${f(B.shot.spell)}`, `   아이템 shot: ${f(B.shot.item)}`,
      `   유닛 방향: ${f(B.dir.unit)} · 자리: ${f(B.place)}`, `   배색: ${f(B.pal)}`);
  }
  console.log(rep.join("\n"));
  if (warn.length) console.log(`\n주의 ${warn.length}건\n` + warn.map(x => "  - " + x).join("\n"));
  if (err.length) { console.log(`\n오류 ${err.length}건\n` + err.map(x => "  ✗ " + x).join("\n")); process.exitCode = 1; }
  else console.log("\n오류 없음.");
}

/* ---------- add: 써 둔 장면을 깃발 파일에 넣기 (정해진 모양으로 다시 씀) ---------- */
function writeFlag(g, about, obj) {
  const q = JSON.stringify, ids = Object.keys(obj);
  const body = ids.map(id => { const s = obj[id]; return `  ${q(id)}: {\n    "shot": ${q(s.shot)}, "dir": ${q(s.dir)}, "place": ${q(s.place)}, "pal": ${q(s.pal)},\n    "scene": ${q(s.scene)},\n    "light": ${q(s.light)}\n  }`; });
  fs.mkdirSync(SCENE_DIR, { recursive: true });
  fs.writeFileSync(path.join(SCENE_DIR, g + ".json"), "{\n" + [`  "_about": ${q(about)}`, ...body].join(",\n") + "\n}\n");
}
function cmdAdd(files) {
  const D = loadGame(), by = {};
  for (const f of files) {
    const j = JSON.parse(fs.readFileSync(f, "utf8"));
    for (const id of Object.keys(j)) {
      if (id[0] === "_") continue;
      const c = D.CARDS[id];
      if (!c || !S.flags[c.group]) { console.error(`✗ ${id}: 게임에 없는 카드이거나 깃발이 없음 — 넣지 않음`); process.exitCode = 1; continue; }
      (by[c.group] = by[c.group] || {})[id] = j[id];
    }
  }
  for (const g of Object.keys(by).sort()) {
    const fp = path.join(SCENE_DIR, g + ".json"), F = S.flags[g];
    const cur = fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, "utf8")) : {};
    const about = cur._about || `${g} ${F.ko} — 카드별 장면 지시. 쓰는 법은 tools/art/PROMPT_GUIDE.md, 검사는 node tools/art/scene_tool.js lint ${g}.`;
    const obj = {}; let add = 0, upd = 0;
    for (const id of Object.keys(cur)) if (id[0] !== "_") obj[id] = cur[id];
    for (const id of Object.keys(by[g])) { if (obj[id]) upd++; else add++; obj[id] = by[g][id]; }
    writeFlag(g, about, obj);
    console.log(`${g}.json: 더함 ${add} · 바꿈 ${upd} (모두 ${Object.keys(obj).length}장)`);
  }
}

const args = process.argv.slice(2), cmd = args.shift();
const flags = args.filter(a => FLAGS.includes(a));
if (cmd === "todo") cmdTodo(flags, args.includes("--all"));
else if (cmd === "lint") cmdLint(flags);
else if (cmd === "add") cmdAdd(args.filter(a => a.endsWith(".json")));
else console.log("쓰는 법: node tools/art/scene_tool.js todo [깃발 …] [--all]  |  lint [깃발 …]  |  add <파일.json> …");
