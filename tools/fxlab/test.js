/* 마법 장면 연출(js/spellscene.js) 시험 — 화면 없이:  node tools/fxlab/test.js
   1) BY_ID 의 카드가 모두 있고 마법이며, 적힌 장면이 모두 있는지
   2) 모든 장면을 연출 3단계(저사양 · 중간 · 고사양)로 가짜 화면에 돌려 오류 없이 끝나고, 대상마다 맞는 때(ms)를 돌려주는지
   3) 장면이 맡지 않은 숫자는 원래 SpellFX.cast 로 넘어가는지, 움직임 줄이기면 아무것도 하지 않는지 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..", "..");
const src0 = fs.readFileSync(path.join(ROOT, "tools/sfx/build_sfx_prompts.js"), "utf8");
const DATA_FILES = eval(src0.match(/const DATA_FILES = (\[[^\]]+\])/)[1]);
let ok = 0, bad = 0;
const t = (name, cond, more) => { if (cond) ok++; else { bad++; console.log("✗ " + name + (more ? " — " + more : "")); } };

const cls = new Set();
const noop = () => {};
const fakeEl = () => { const e = { style: { setProperty: noop }, isConnected: true, animate: () => ({}), remove: noop, closest: () => null, parentElement: null, getTotalLength: () => 300,
  getBoundingClientRect: () => ({ left: 300, top: 100, right: 410, bottom: 254, width: 110, height: 154 }) }; return e; };
const rectOf = uid => { const x = 200 + (uid % 10) * 120, y = uid >= 10 ? 400 : 90; return { left: x, top: y, right: x + 110, bottom: y + 154, width: 110, height: 154 }; };
let baseCalls = [], isOff = false, made = 0;
const kit = { mk: () => { made++; return fakeEl(); }, anim: noop, sparks: noop, rise: noop, flash: noop, ring: noop, screenFlash: noop, shake: noop, glow: noop, fly: (el, a, b, ms, o) => { if (o && o.trail) o.trail(a.x, a.y); }, puff: noop,
  svgLayer: () => { made++; return fakeEl(); }, jag: (a, b) => ({ d: "M0 0", mids: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }] }), path: () => fakeEl(), block: noop, explode: noop, splash: noop, bubble: noop, aura: noop, curse: noop,
  K: () => 1, off: () => isOff, later: fn => fn(), snd: noop, nQ: n => n, px: v => v + "px", rnd: (a, b) => (a + b) / 2, ctr: r => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 }),
  EL_COL: { fire: "#f00", water: "#00f", lightning: "#ff0", earth: "#850", forest: "#0f0", metal: "#aaa", dark: "#808", light: "#ffe", wind: "#9fe" }, FXC: { blood: "#e03", shield: "#9ef", heal: "#7e9", curse: "#315", spark: "#fd7" }, P_OF_EL: {} };
const stub = () => null;
const ctx = { console, navigator: {}, location: { search: "", hash: "" }, localStorage: { getItem: stub, setItem: stub, removeItem: stub }, performance: { now: () => Date.now() }, innerWidth: 1280, innerHeight: 720,
  setTimeout: noop, clearTimeout: noop, setInterval: () => 0, clearInterval: noop, addEventListener: stub,
  document: { getElementById: stub, querySelector: stub, querySelectorAll: () => [], addEventListener: stub, createElement: () => ({ style: {}, setAttribute: stub }), documentElement: { classList: { contains: c => cls.has(c) } } } };
ctx.window = ctx; vm.createContext(ctx);
let src = "";
for (const f of DATA_FILES) { const p = path.join(ROOT, "js", f + ".js"); if (fs.existsSync(p)) src += fs.readFileSync(p, "utf8") + "\n;\n"; }
src += "this.CARDS_ = CARDS; this.GROUPS_ = GROUPS;";
vm.runInContext(src, ctx, { filename: "etherion-data" });
ctx.kit = kit; ctx.baseCalls = baseCalls; ctx.rectOf = rectOf; ctx.fakeEl = fakeEl;
vm.runInContext(`var G = { cfg: {}, speed: 1 };
  var uidEl = uid => { const e = fakeEl(); const r = rectOf(uid); e.getBoundingClientRect = () => r; return e; };
  var SpellFX = { kit, themeOf(id) { const c = CARDS[id], el = (c && (c.el || (GROUPS[c.group] || {}).el)) || "dark"; return { k: ({ fire: "shell", metal: "steel", lightning: "bolt", earth: "rock", forest: "thorn", water: "water", dark: "shadow", light: "holy", wind: "wind" })[el], el, col: "#fff" }; },
    cast(s, c) { baseCalls.push(s.floats.map(f => f[0])); const m = new Map(); for (const f of s.floats) m.set(String(f[0]), 111); return m; } };`, ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "js/spellscene.js"), "utf8") + "\nthis.SS = SpellScene; this.castNow = (s, c) => SpellFX.cast(s, c);", ctx, { filename: "spellscene.js" });
const SS = ctx.SS, CARDS = ctx.CARDS_;
t("SpellScene 이 만들어짐", !!SS && typeof SS.SC === "object");

/* 1) 표 */
const KINDS = ["hit", "buff", "debuff", "shield"];
for (const id in SS.BY_ID) {
  const c = CARDS[id], d = typeof SS.BY_ID[id] === "string" ? { hit: SS.BY_ID[id] } : SS.BY_ID[id];
  t(id + " 카드가 있음", !!c);
  if (c) t(id + " 는 마법", c.type !== "unit" && c.type !== "item", c.type);
  for (const k in d) { t(id + " 갈래 " + k, KINDS.includes(k)); t(id + " 장면 " + d[k], typeof SS.SC[d[k]] === "function"); }
}
for (const k in SS.AREA_OF) t("AREA_OF " + k + " → " + SS.AREA_OF[k], typeof SS.SC[SS.AREA_OF[k]] === "function");
const flags = new Set(Object.keys(SS.BY_ID).map(id => CARDS[id] && CARDS[id].group));
for (const g of ["A1", "A2", "A3", "B1", "B2", "B3", "G1", "G2", "G3"]) t("깃발 " + g + " 에 장면이 있음", flags.has(g));

/* 2) 장면마다 3단계로 돌려 본다: 상대 줄 4기(uid 1~4) + 내 줄 2기(uid 11 · 12 — 양쪽을 치는 마법) */
const firstId = name => Object.keys(SS.BY_ID).find(id => { const d = SS.BY_ID[id]; return d === name || (d && (d.hit === name || d.buff === name || d.debuff === name || d.shield === name)); });
for (const tier of [["fx-low"], [], ["fx-high"]]) {
  cls.clear(); tier.forEach(c => cls.add(c));
  for (const name in SS.SC) {
    const id = firstId(name); if (!id) { t(name + " 을 쓰는 카드가 있음", false); continue; }
    const d = typeof SS.BY_ID[id] === "string" ? { hit: SS.BY_ID[id] } : SS.BY_ID[id];
    const kind = Object.keys(d).find(k => d[k] === name), c = { hit: "dmg", buff: "buff", debuff: "debuff", shield: "shield" }[kind];
    const floats = [[1, "−3", c], [2, "−3", c], [3, "막음", kind === "hit" ? "miss" : c], [4, "−3", c], [11, "−3", c], [12, "−3", c], ["life0", "−1", "dmg"]];
    baseCalls.length = 0; made = 0;
    let out = null, err = null;
    const w = console.warn; console.warn = (a, e) => { err = e; };
    try { out = ctx.castNow({ floats, dur: 1400, fx: { spell: id, shown: 20 } }, { uid: 20, id }); } catch (e) { err = e; }
    console.warn = w;
    const tag = name + " [" + (tier[0] || "중간") + "]";
    t(tag + " 오류 없음", !err, err && err.message);
    t(tag + " 대상 6기의 때를 돌려줌", !!out && [1, 2, 3, 4, 11, 12].every(u => Number.isFinite(out.get(String(u))) && out.get(String(u)) !== 111 && out.get(String(u)) >= 0 && out.get(String(u)) < 2200), out && JSON.stringify([...out]));
    t(tag + " 조각을 만듦", made > 0);
    t(tag + " 생명 숫자는 원래 연출로", baseCalls.length === 1 && baseCalls[0].length === 1 && baseCalls[0][0] === "life0", JSON.stringify(baseCalls));
  }
}
/* 3) 장면이 없는 마법 · 움직임 줄이기 */
cls.clear(); baseCalls.length = 0;
const plain = Object.keys(CARDS).find(id => CARDS[id].type === "atk" && !SS.BY_ID[id]);
ctx.castNow({ floats: [[1, "−1", "dmg"]], dur: 800, fx: { spell: plain } }, { uid: 20, id: plain });
t("장면 없는 마법(대상 하나)은 원래 연출 그대로", baseCalls.length === 1 && baseCalls[0][0] === 1);
isOff = true; baseCalls.length = 0; made = 0;
ctx.castNow({ floats: [[1, "−3", "dmg"], [2, "−3", "dmg"], [3, "−3", "dmg"]], dur: 800, fx: { spell: "SB1-09" } }, { uid: 20, id: "SB1-09" });
t("움직임 줄이기 · 화면 없는 대전이면 장면을 만들지 않음", made === 0 && baseCalls.length === 1);

console.log(bad ? `실패 ${bad} / ${ok + bad}` : `통과 ${ok}개`);
process.exit(bad ? 1 : 0);
