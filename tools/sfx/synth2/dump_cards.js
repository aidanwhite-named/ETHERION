/* ETHERION 효과음 v2 — 게임 카드 자료를 JSON 으로 뽑는다 (render2.py 가 부른다).
   node tools/sfx/synth2/dump_cards.js  → 표준 출력에 [{id,type,group,el,lv,grade,kin,name,gift,ops,item,hint{atk,def,cast,equip}} …]
   소리는 카드 자료(깃발 원소 · 종류 · 레벨 · 등급 · 능력 · 마법 효과)로 만든다. notes/<깃발>.json 의 글은
   "무엇으로 치고 무엇으로 막는가"를 가르는 낱말 힌트로만 읽는다(문장을 소리로 옮기지 않는다). */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..", "..", "..");
const FLAGS = ["B1", "B2", "B3", "G1", "G2", "G3", "A1", "A2", "A3"];
const src0 = fs.readFileSync(path.join(ROOT, "tools/sfx/build_sfx_prompts.js"), "utf8");
const DATA_FILES = eval(src0.match(/const DATA_FILES = (\[[^\]]+\])/)[1]);   // 게임 자료 파일 차례는 프롬프트 도구와 같게
const stub = () => null;
const ctx = { console, navigator: {}, location: { search: "", hash: "" }, localStorage: { getItem: stub, setItem: stub, removeItem: stub },
  document: { getElementById: stub, querySelector: stub, querySelectorAll: () => [], addEventListener: stub, createElement: () => ({ style: {}, setAttribute: stub }) },
  addEventListener: stub, setTimeout, clearTimeout };
ctx.window = ctx; vm.createContext(ctx);
let src = "";
for (const f of DATA_FILES) { const p = path.join(ROOT, "js", f + ".js"); if (fs.existsSync(p)) src += fs.readFileSync(p, "utf8") + "\n;\n"; }
src += "this.__o = { CARDS, RETIRED: (typeof RETIRED_CARDS !== 'undefined' ? RETIRED_CARDS : {}), KIND: (typeof KIND !== 'undefined' ? KIND : {}), KIND_DEF: (typeof KIND_DEF !== 'undefined' ? KIND_DEF : {}) };";
vm.runInContext(src, ctx, { filename: "etherion-data" });
const D = ctx.__o, NOTES = {};
for (const f of FLAGS) { const p = path.join(ROOT, "tools/sfx/notes", f + ".json"); NOTES[f] = fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")).cards || {}) : {}; }
/* 2026-11-24 레거시 목록에 남아 있지만 새 효과로 다시 살릴 마법 — 소리를 미리 만든다 (build_sfx_prompts.js 와 같은 목록) */
const MAKE_RETIRED = new Set(["SG3-07", "SG3-08"]);
const out = [];
for (const c of Object.values(D.CARDS)) {
  if ((D.RETIRED[c.id] && !MAKE_RETIRED.has(c.id)) || !FLAGS.includes(c.group)) continue;
  const n = NOTES[c.group][c.id] || {};
  const tok = /^T[KS]-/.test(c.id);
  const kin = c.type === "unit" ? (c.kin || D.KIND[c.id] || (c.base && D.KIND[c.base]) || (c.special ? "" : D.KIND_DEF[c.group]) || "") : "";
  out.push({ id: c.id, type: c.type, group: c.group, el: c.el, lv: Math.max(1, Math.min(8, c.lv || 1)), grade: tok ? "token" : (c.grade || "common"),
    name: c.name, kin, cl: c.cl || "", a: c.a || 0, d: c.d || 0, h: c.h || 0, gift: c.gift || {}, ops: c.ops || null, text: c.text || "",
    item: c.item ? { cat: c.item.cat, icon: c.item.icon, cls: c.item.cls, ranged: c.item.ranged, magic: c.item.magic } : null,
    en: n.en || "", hint: { atk: n.atk || "", def: n.def || "", cast: n.cast || "", equip: n.equip || "" } });
}
process.stdout.write(JSON.stringify(out));
