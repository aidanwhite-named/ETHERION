/* ETHERION — 효과음 프롬프트 만들기 (2026-11-14 · 설명 tools/sfx/PROMPT_SFX.md)
   게임 데이터(카드 이름 · 레벨 · 등급)와 카드별 소리 지시(notes/<깃발>.json), 공용 효과음 목록(sfx_common.json),
   공통 말(sfx_style.json)을 합쳐 Gemini(Lyria)에 그대로 붙여 넣을 프롬프트를 만든다.

   실행 (게임 폴더 맨 위에서):  node tools/sfx/build_sfx_prompts.js
   만드는 파일:
     tools/sfx/prompts/common.md              공용 효과음 (개별 3테이크)
     tools/sfx/prompts/cards/<깃발>.md         카드별 효과음 (개별 3테이크)
     tools/sfx/prompts/sfx.jsonl              기계용 개별 목록
     tools/sfx/prompts/batches/common.md      3분 단위 4초 간격 배치 프롬프트 (공용)
     tools/sfx/prompts/batches/<깃발>.md      3분 단위 4초 간격 배치 프롬프트 (카드)
     tools/sfx/prompts/sfx_batches.jsonl      3분 배치 분할용 메타데이터 (LLM이 4초 간격 곡을 쪼갤 때 참조)
   뺀 카드(js/retired.js)는 만들지 않는다. 소리 지시가 없는 카드 · 이제는 없는 카드의 지시는 끝에 알려 준다.
   새 카드를 만들면 notes/<깃발>.json에 한 줄을 더하고(쓰는 법 PROMPT_SFX.md 5장) 이 도구를 다시 돌린다. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(__dirname, "prompts");
const S = JSON.parse(fs.readFileSync(path.join(__dirname, "sfx_style.json"), "utf8"));
const COMMON = JSON.parse(fs.readFileSync(path.join(__dirname, "sfx_common.json"), "utf8"));
const FLAGS = ["B1", "B2", "B3", "G1", "G2", "G3", "A1", "A2", "A3"];

/* ---------- 1. 게임 데이터 (index.html과 같은 차례) ---------- */
const DATA_FILES = ["data", "names", "retired", "briefs", "specials", "uniques", "highcards", "pincards", "rarespells", "counterspells", "upgrades", "rebalance", "decks", "cards", "grades"];
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
  for (const f of DATA_FILES) {
    const p = path.join(ROOT, "js", f + ".js");
    if (fs.existsSync(p)) src += fs.readFileSync(p, "utf8") + "\n;\n";
  }
  src += "this.__o = { CARDS, GROUPS, RETIRED: (typeof RETIRED_CARDS !== 'undefined' ? RETIRED_CARDS : {}), STARTER: (typeof STARTER_DECKS !== 'undefined' ? STARTER_DECKS : {}) };";
  vm.runInContext(src, ctx, { filename: "etherion-data" });
  return ctx.__o;
}
const D = loadGame();
const NOTES = {};
for (const f of FLAGS) {
  const p = path.join(__dirname, "notes", f + ".json");
  NOTES[f] = fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")).cards || {}) : {};
}

/* ---------- 2. 말 고르기 ---------- */
const isToken = c => /^T[KS]-/.test(c.id);
const kindOf = c => c.type === "unit" ? "unit" : c.type === "item" ? "item" : "spell";
const gradeOf = c => isToken(c) ? "token" : (c.grade || "common");
const GRADE_KO = { common: "일반", uncommon: "고급", rare: "레어", epic: "에픽", unique: "유니크", special: "스페셜", upgrade: "강화", token: "소환물" };
const SPELL_KO = { atk: "공격 마법", def: "방어 마법", any: "공용 마법", hand: "핸드 마법" };
const lvOf = c => Math.max(1, Math.min(8, c.lv || 1));
const sent = s => { s = String(s || "").trim(); return /[.!?]$/.test(s) ? s : s + "."; };
const secs = n => (Math.round(n * 10) / 10).toFixed(1).replace(/\.0$/, "");
const stamp = t => `[${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}]`;
const stepOf = len => Math.max(3, Math.ceil(len) + 2);
const faction = g => { const F = S.flags[g]; return `${F.en} (${F.world})`; };
const gradeTail = c => S.grades[gradeOf(c)] || "";

/* 한 소리를 세 테이크로: 시작 시각 t에서 [take1, take2, take3] 줄과 다음 시각을 돌려준다 */
function takes(t, label, desc, len, rule) {
  const step = stepOf(len), lines = [];
  const pre = label ? label + ", take" : "Take";
  lines.push(`${stamp(t)} ${pre} 1: ${sent(desc)} About ${secs(len)} seconds.`);
  lines.push(`${stamp(t + step)} ${pre} 2: the same sound, slightly varied.`);
  lines.push(`${stamp(t + 2 * step)} ${pre} 3: the same sound, slightly varied.`);
  if (rule) lines.push(`Takes: ${sent(rule)}`);
  return { lines, next: t + 3 * step };
}
const tail = extra => [extra, S.studio].filter(Boolean).join("\n");
const single = (desc, len, ctx) => `${sent(desc)} About ${secs(len)} seconds. ${ctx} ${S.single}`;

/* ---------- 3. 카드 → 프롬프트 ---------- */
function cardJob(c, n) {
  const g = c.group, kind = kindOf(c), lv = lvOf(c), L = S.levels[String(lv)];
  const ctxLine = `Dark-fantasy card game. Faction: ${faction(g)}.`;
  const ctxShort = `Dark-fantasy card game, ${S.flags[g].en}.`;
  const job = { id: c.id, group: g, kind, name: c.name, en: n.en, ko: n.ko, lv, grade: gradeOf(c), file: c.id, sounds: [] };
  if (D.STARTER[g] && D.STARTER[g][c.id]) job.starter = true;   // 기본 덱에 든 카드 — 먼저 만들면 좋다
  let body = [S.lead, ctxLine];
  if (kind === "unit") {
    body.push(`Card: "${n.en}" - ${L.size}.`);
    const a = takes(0, "ATTACK", n.atk, L.atk);
    const d = takes(a.next + 1, "DEFENSE", n.def, L.def);
    body = body.concat(a.lines, d.lines, [`${stamp(d.next)} Silence until the end.`]);
    job.sounds.push({ key: c.id + ".atk", takes: [1, 2, 3], len: L.atk, single: single(n.atk, L.atk, `${L.size[0].toUpperCase() + L.size.slice(1)} attack sound. ${ctxShort}`) });
    job.sounds.push({ key: c.id + ".def", takes: [4, 5, 6], len: L.def, single: single(n.def, L.def, `${L.size[0].toUpperCase() + L.size.slice(1)} block or hit-taken sound. ${ctxShort}`) });
  } else if (kind === "spell") {
    const len = Math.min(S.spell.max, S.spell.base + S.spell.per * lv);
    body.push(`Spell card: "${n.en}" - ${S.spell.what}.`);
    const a = takes(0, "", n.cast, len);
    body = body.concat(a.lines, [`${stamp(a.next)} Silence until the end.`]);
    job.spellType = c.type;
    job.sounds.push({ key: c.id + ".cast", takes: [1, 2, 3], len, single: single(n.cast, len, `Spell sound. ${ctxShort}`) });
  } else {
    const len = S.item.len;
    body.push(`Item card: "${n.en}" - ${S.item.what}.`);
    const a = takes(0, "", n.equip, len);
    body = body.concat(a.lines, [`${stamp(a.next)} Silence until the end.`]);
    job.sounds.push({ key: c.id + ".equip", takes: [1, 2, 3], len, single: single(n.equip, len, `Equip sound. ${ctxShort}`) });
  }
  job.gemini = body.join("\n") + "\n" + tail(gradeTail(c));
  return job;
}

/* ---------- 4. 공용 효과음 → 프롬프트 ---------- */
function commonJob(it, grp) {
  const job = { id: it.id, group: grp.id, kind: it.music ? "music" : "common", when: it.when, now: it.now || "", file: it.id, sounds: [] };
  if (it.music) {
    const step = Math.max(6, Math.ceil(it.len) + 3);
    job.gemini = [
      `Short orchestral stinger for a fantasy card game, about ${secs(it.len)} seconds long: ${sent(it.desc)}`,
      `${stamp(0)} Version 1.`,
      `${stamp(step)} Version 2: a different variation of the same idea.`,
      `${stamp(2 * step)} Version 3: another variation.`,
      `${stamp(3 * step)} Silence until the end.`,
      "Warm, natural concert-hall recording; no drums, no synths. Instrumental, no vocals."
    ].join("\n");
    job.sounds.push({ key: it.id, takes: [1, 2, 3], len: it.len, single: `Short orchestral stinger, about ${secs(it.len)} seconds: ${sent(it.desc)} Instrumental, no vocals.` });
  } else {
    const a = takes(0, "", it.desc, it.len, it.takes);
    job.gemini = [S.lead, "Fantasy card game, interface and battle sounds.", ...a.lines, `${stamp(a.next)} Silence until the end.`].join("\n") + "\n" + tail("");
    job.sounds.push({ key: it.id, takes: [1, 2, 3], len: it.len, single: single(it.desc, it.len, "Fantasy card game.") });
  }
  return job;
}

/* ---------- 5. 만들기 ---------- */
const live = Object.values(D.CARDS).filter(c => !D.RETIRED[c.id] && FLAGS.includes(c.group));
const jobs = [], missing = [], wrong = [];
const KIND_KEYS = { unit: ["atk", "def"], spell: ["cast"], item: ["equip"] };
for (const c of live) {
  const n = NOTES[c.group][c.id], kind = kindOf(c);
  if (!n) { missing.push(`${c.id} ${c.name}`); continue; }
  const need = KIND_KEYS[kind];
  if (!n.en || !n.ko || need.some(k => !n[k])) { wrong.push(`${c.id} ${c.name} (필요: en · ko · ${need.join(" · ")})`); continue; }
  jobs.push(cardJob(c, n));
}
const liveIds = new Set(live.map(c => c.id));
const stale = [];
for (const f of FLAGS) for (const id in NOTES[f]) if (!liveIds.has(id)) stale.push(`${f} ${id}`);

const commonJobs = [];
for (const grp of COMMON.groups) for (const it of grp.items) commonJobs.push(commonJob(it, grp));

fs.mkdirSync(path.join(OUT, "cards"), { recursive: true });
const HEAD = "<!-- 자동 생성: node tools/sfx/build_sfx_prompts.js — 손으로 고치지 말 것. 고칠 곳은 tools/sfx/notes/ · sfx_common.json · sfx_style.json -->\n";
const fence = s => "```text\n" + s + "\n```";

/* 공용 */
{
  let md = HEAD + "# ETHERION 공용 효과음 프롬프트\n\n";
  md += `> ${commonJobs.length}개. Gemini에 \`text\` 상자를 통째로 붙여 넣는다. 한 번에 같은 소리가 세 테이크(사이 무음) 나온다.\n`;
  md += "> 받은 파일은 항목의 **파일** 이름으로 `audio/inbox/sfx/`에 넣는다(예: `ui_click.mp3`). 설명은 `tools/sfx/PROMPT_SFX.md`.\n";
  md += "> **지금** = 이 자리에서 지금 나는 소리 이름(`js/feel.js`). '새 자리'는 아직 소리가 없는 곳이라, 넣을 때 코드도 함께 고친다.\n\n";
  for (const grp of COMMON.groups) {
    const js = commonJobs.filter(j => j.group === grp.id);
    md += `## ${grp.ko} (${js.length})\n\n`;
    for (const j of js) {
      md += `### ${j.id} — ${j.when}\n`;
      md += `지금: ${j.now ? "`" + j.now + "`" : "새 자리"} · 약 ${secs(j.sounds[0].len)}초${j.kind === "music" ? " · 짧은 음악" : ""} · 파일 \`${j.file}\`\n\n${fence(j.gemini)}\n\n`;
    }
  }
  fs.writeFileSync(path.join(OUT, "common.md"), md);
}

/* 깃발별 카드 */
const byLv = (a, b) => a.lv - b.lv;
for (const f of FLAGS) {
  const G = D.GROUPS[f] || {}, js = jobs.filter(j => j.group === f);
  const units = js.filter(j => j.kind === "unit").sort(byLv), spells = js.filter(j => j.kind === "spell").sort(byLv), items = js.filter(j => j.kind === "item").sort(byLv);
  let md = HEAD + `# ${f} ${G.name} (${S.flags[f].en}) — 카드별 효과음 프롬프트\n\n`;
  md += `> ${js.length}장. 유닛은 한 번에 **공격 3 + 방어 3** 테이크, 마법은 **발동 3**, 아이템은 **장착 3** 테이크가 나온다.\n`;
  md += "> 받은 파일 이름 = 카드 ID(예: `" + (units[0] ? units[0].id : f + "-01") + ".mp3`), 넣을 곳 `audio/inbox/sfx/cards/`. 설명은 `tools/sfx/PROMPT_SFX.md`.\n";
  md += `> ★기본 덱 = 이 깃발의 기본 덱에 든 카드(${js.filter(j => j.starter).length}장). 처음 시작한 모험가가 가장 자주 듣는 소리라 먼저 만들면 좋다.\n`;
  md += `> 이 깃발의 소리 재료: ${S.flags[f].palette}. 막을 때: ${S.flags[f].guard}.\n\n`;
  const sec = (title, list, meta) => {
    if (!list.length) return "";
    let s = `## ${title} (${list.length})\n\n`;
    for (const j of list) s += `### ${j.id} ${j.name} · ${j.en}\n${meta(j)}${j.starter ? " · ★기본 덱" : ""} — ${j.ko}\n\n${fence(j.gemini)}\n\n`;
    return s;
  };
  md += sec("유닛", units, j => `Lv${j.lv} · ${GRADE_KO[j.grade] || j.grade}`);
  md += sec("마법", spells, j => `Lv${j.lv} · ${SPELL_KO[j.spellType] || "마법"} · ${GRADE_KO[j.grade] || j.grade}`);
  md += sec("아이템", items, j => `Lv${j.lv} · ${GRADE_KO[j.grade] || j.grade}`);
  fs.writeFileSync(path.join(OUT, "cards", f + ".md"), md);
}

/* 기계용 목록 */
fs.writeFileSync(path.join(OUT, "sfx.jsonl"), commonJobs.concat(jobs).map(j => JSON.stringify(j)).join("\n") + "\n");

/* ---------- 5b. 3분 단위 4초 간격 배치 (LLM 분할용 헤더 · 메타데이터 포함) ---------- */
const BATCH_INTERVAL = 4;      // 효과음 간격(초)
const BATCH_DURATION = 180;    // 곡 길이(초) = 3분
const BATCH_MAX_SLOTS = 44;    // 00:00 ~ 02:52 (44개 × 4초 = 176초, 02:56~03:00 무음)
const BATCH_OUT = path.join(OUT, "batches");
fs.mkdirSync(BATCH_OUT, { recursive: true });

/* 단위(유닛은 atk+def 2슬롯, 나머지는 1슬롯)를 쪼개지 않고 N개 배치로 고르게 나눈다 */
function packBatches(unitsWithSlots, maxSlots = BATCH_MAX_SLOTS) {
  const total = unitsWithSlots.reduce((n, u) => n + u.slots.length, 0);
  const numBatches = Math.max(1, Math.ceil(total / maxSlots));
  const target = Math.ceil(total / numBatches);
  const batches = [];
  let cur = [], curLen = 0;
  for (const u of unitsWithSlots) {
    const need = u.slots.length;
    if (cur.length && (curLen + need > maxSlots || (batches.length < numBatches - 1 && curLen >= target))) {
      batches.push(cur);
      cur = [];
      curLen = 0;
    }
    cur.push(...u.slots);
    curLen += need;
  }
  if (cur.length) batches.push(cur);
  return batches;
}

function buildBatchRecord(batchId, group, kind, ctxLine, slots) {
  const timedSlots = slots.map((s, idx) => {
    const startSec = idx * BATCH_INTERVAL;
    return {
      index: idx + 1,
      start_sec: startSec,
      stamp: stamp(startSec),
      key: s.key,
      output_file: s.output_file,
      card_id: s.card_id || null,
      role: s.role || null,
      title: s.title,
      en: s.en || null,
      ko: s.ko || null,
      meta: s.meta || "",
      len: s.len,
      desc: s.desc
    };
  });
  const endSilence = stamp(timedSlots.length * BATCH_INTERVAL);
  const lines = [
    S.lead,
    `3-minute (180s) sequential sound effects pack: ${timedSlots.length} isolated sound effects placed strictly every ${BATCH_INTERVAL} seconds with complete silence between sounds.`,
    ctxLine
  ];
  for (const s of timedSlots) {
    lines.push(`${s.stamp} #${String(s.index).padStart(2, "0")} [${s.key}]: ${sent(s.desc)} About ${secs(s.len)} seconds.`);
  }
  lines.push(`${endSilence} Silence until the end.`);
  lines.push("Clean, close, dry studio recording with a short natural tail. Every sound starts right on its 4-second timestamp and is followed by complete silence until the next timestamp.");

  return {
    batch_id: batchId,
    group,
    kind,
    inbox_file: `audio/inbox/sfx/batches/batch_${batchId}.mp3`,
    interval_sec: BATCH_INTERVAL,
    duration_sec: BATCH_DURATION,
    count: timedSlots.length,
    note: `4초 간격(0s, 4s, 8s...)으로 ${timedSlots.length}개 효과음이 순서대로 들어간 3분 곡. 무음/4초 그리드 기준으로 분할하여 각 슬롯의 output_file 이름으로 저장한다.`,
    slots: timedSlots,
    prompt: lines.join("\n")
  };
}

function formatBatchMd(title, intro, batches) {
  let md = HEAD + `# ${title}\n\n${intro}\n\n`;
  for (const b of batches) {
    const lastStamp = b.slots[b.slots.length - 1].stamp;
    md += `## batch_${b.batch_id} (${b.count}개 · 00:00 ~ ${lastStamp.slice(1, -1)} · 총 3분)\n\n`;
    md += `- **넣을 파일**: \`${b.inbox_file}\`\n`;
    md += `- **규칙**: ${b.interval_sec}초 간격 (\`00:00\`부터 4초마다 1개, 총 ${b.count}개, 나머지 무음)\n`;
    md += `- **분할 참조**: \`tools/sfx/prompts/sfx_batches.jsonl\` (\`batch_id: "${b.batch_id}"\`)\n\n`;
    md += "| 순번 | 시각 | 초 | 키 | 저장 파일 | 길이 | 대상 · 설명 |\n";
    md += "|---:|---|---:|---|---|---:|---|\n";
    for (const s of b.slots) {
      md += `| ${String(s.index).padStart(2, "0")} | \`${s.stamp.slice(1, -1)}\` | ${s.start_sec} | \`${s.key}\` | \`${s.output_file}\` | ${secs(s.len)}s | ${s.title}${s.meta ? " (" + s.meta + ")" : ""} |\n`;
    }
    md += `\n${fence(b.prompt)}\n\n`;
  }
  return md;
}

const batchRecords = [];

/* 공용 배치 (music: true 제외) */
{
  const commonUnits = [];
  for (const grp of COMMON.groups) {
    for (const it of grp.items) {
      if (it.music) continue;
      commonUnits.push({
        slots: [{
          key: it.id,
          output_file: `${it.id}.mp3`,
          title: it.when,
          ko: it.when,
          meta: grp.ko,
          len: it.len,
          desc: it.desc
        }]
      });
    }
  }
  const packed = packBatches(commonUnits);
  const recs = packed.map((slots, i) => buildBatchRecord(
    `common_${String(i + 1).padStart(2, "0")}`,
    "common",
    "common",
    "Fantasy card game, interface and battle sounds.",
    slots
  ));
  batchRecords.push(...recs);
  fs.writeFileSync(
    path.join(BATCH_OUT, "common.md"),
    formatBatchMd(
      "ETHERION 공용 효과음 — 3분 배치 프롬프트 (4초 간격)",
      "> 0.1~2.5초 공용 효과음을 **4초 간격**으로 최대 44개씩 묶은 3분 곡 프롬프트다(짧은 음악 4곡 `victory`·`defeat`·`pach_win3`·`levelUp`은 `common.md`에서 따로 만든다).\n> 각 곡의 헤더 표와 `tools/sfx/prompts/sfx_batches.jsonl`에 순서대로 제목·키가 기록되어 있어, 나중에 Claude가 4초 간격 곡을 쪼갤 때 어떤 효과음인지 바로 알 수 있다.",
      recs
    )
  );
}

/* 깃발별 카드 배치 (★기본 덱 먼저, 유닛 → 마법 → 아이템, 레벨 순) */
for (const f of FLAGS) {
  const G = D.GROUPS[f] || {};
  const kindOrder = { unit: 0, spell: 1, item: 2 };
  const fJobs = jobs
    .filter(j => j.group === f)
    .sort((a, b) => (b.starter ? 1 : 0) - (a.starter ? 1 : 0) || kindOrder[a.kind] - kindOrder[b.kind] || a.lv - b.lv);

  const cardUnits = fJobs.map(j => {
    const c = D.CARDS[j.id], n = NOTES[f][j.id], L = S.levels[String(j.lv)];
    const gTail = gradeTail(c);
    const starterTag = j.starter ? " · ★기본 덱" : "";
    const metaBase = `Lv${j.lv} · ${GRADE_KO[j.grade] || j.grade}${starterTag}`;
    if (j.kind === "unit") {
      return {
        slots: [
          {
            key: `${j.id}.atk`,
            output_file: `cards/${j.id}_atk.mp3`,
            card_id: j.id,
            role: "atk",
            title: `${j.id} ${j.name} (공격)`,
            en: `${j.en} - attack`,
            ko: n.ko,
            meta: metaBase,
            len: L.atk,
            desc: `${L.size} attack: ${n.atk}${gTail ? " " + gTail : ""}`
          },
          {
            key: `${j.id}.def`,
            output_file: `cards/${j.id}_def.mp3`,
            card_id: j.id,
            role: "def",
            title: `${j.id} ${j.name} (방어)`,
            en: `${j.en} - defense`,
            ko: n.ko,
            meta: metaBase,
            len: L.def,
            desc: `${L.size} defense/hit: ${n.def}${gTail ? " " + gTail : ""}`
          }
        ]
      };
    } else if (j.kind === "spell") {
      const len = j.sounds[0].len;
      return {
        slots: [{
          key: `${j.id}.cast`,
          output_file: `cards/${j.id}_cast.mp3`,
          card_id: j.id,
          role: "cast",
          title: `${j.id} ${j.name} (발동)`,
          en: `${j.en} - spell cast`,
          ko: n.ko,
          meta: `${metaBase} · ${SPELL_KO[j.spellType] || "마법"}`,
          len,
          desc: `Spell cast: ${n.cast}${gTail ? " " + gTail : ""}`
        }]
      };
    } else {
      const len = j.sounds[0].len;
      return {
        slots: [{
          key: `${j.id}.equip`,
          output_file: `cards/${j.id}_equip.mp3`,
          card_id: j.id,
          role: "equip",
          title: `${j.id} ${j.name} (장착)`,
          en: `${j.en} - equip`,
          ko: n.ko,
          meta: metaBase,
          len,
          desc: `Item equip: ${n.equip}${gTail ? " " + gTail : ""}`
        }]
      };
    }
  });

  const packed = packBatches(cardUnits);
  const recs = packed.map((slots, i) => buildBatchRecord(
    `${f}_${String(i + 1).padStart(2, "0")}`,
    f,
    "cards",
    `Dark-fantasy card game. Faction: ${faction(f)}.`,
    slots
  ));
  batchRecords.push(...recs);
  fs.writeFileSync(
    path.join(BATCH_OUT, f + ".md"),
    formatBatchMd(
      `${f} ${G.name} (${S.flags[f].en}) — 3분 배치 프롬프트 (4초 간격)`,
      `> ★기본 덱 카드를 앞 배치에 먼저 모았다. 한 곡은 3분(4초 간격, 최대 44개)이며 유닛의 공격·방어는 같은 곡에 나란히 들어간다.\n> 각 곡의 헤더 표와 \`tools/sfx/prompts/sfx_batches.jsonl\`에 순서대로 카드·역할·파일명이 적혀 있어, 나중에 Claude가 곡을 쪼갤 때 그대로 대응된다.`,
      recs
    )
  );
}

fs.writeFileSync(path.join(OUT, "sfx_batches.jsonl"), batchRecords.map(r => JSON.stringify(r)).join("\n") + "\n");

/* ---------- 6. 알림 ---------- */
const count = k => jobs.filter(j => j.kind === k).length;
console.log(`공용 ${commonJobs.length} · 유닛 ${count("unit")} · 마법 ${count("spell")} · 아이템 ${count("item")} → 개별 프롬프트 ${commonJobs.length + jobs.length}개 · 3분 배치(4초 간격) ${batchRecords.length}곡, 소리 ${commonJobs.length + jobs.reduce((n, j) => n + j.sounds.length, 0)}개 (기본 덱 카드 ${jobs.filter(j => j.starter).length}장)`);
if (missing.length) console.log(`\n소리 지시가 없는 카드 ${missing.length}장 — notes/<깃발>.json에 더한다:\n  ` + missing.join("\n  "));
if (wrong.length) console.log(`\n지시가 모자란 카드 ${wrong.length}장:\n  ` + wrong.join("\n  "));
if (stale.length) console.log(`\n이제 게임에 없는 카드의 지시 ${stale.length}개(지워도 됨):\n  ` + stale.join("\n  "));
