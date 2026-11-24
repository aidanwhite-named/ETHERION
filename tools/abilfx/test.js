// 2026-11-24 능력 전용 연출 · 연출 끄기 시험 — 화면 없이. node tools/abilfx/test.js
// 1) 엔진이 맞는 수에 [연쇄] fx.chain · [꿰뚫기] fx.pierce, [너울] 수에 fx.swell 표시를 남기는지(판 셈은 그대로)
// 2) js/abilfx.js 가 연출 3단계에서 오류 없이 조각을 만들고, 연출 끄기(RM) · 배속 0 · 화면 없는 대전이면 아무것도 만들지 않는지
// 3) 연출 끄기 설정이 js/impact.js applyFx · js/game.js RM · 설정 창에 이어져 있는지(글 검사)
const fs = require('fs'), path = require('path'), vm = require('vm'); const { load } = require('../balance/harness');
const ROOT = path.join(__dirname, '../..'), dir = path.join(ROOT, 'js'); const rd = f => fs.readFileSync(path.join(dir, f), 'utf8');
const ctx = load(dir, 'var localStorage = { getItem() { return null; }, setItem() {} };\n' + ['grades.js', 'store.js', 'economy.js'].map(rd).join('\n'));
let fail = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log('  ✗ ' + m); } };
ctx.ok = ok;
ctx.ev(`var UIDN = 1000;
function mk(id, o) { const it = Object.assign({ uid: ++UIDN, id, item: null, summoned: 0 }, o || {}); if (isUnit(it)) resetTurn(it); return it; }
function side(idx, ids) { const f = ids.map(x => x ? (typeof x === "string" ? mk(x) : x) : null); while (f.length < RULES.slots) f.push(null); return { idx, name: "P" + idx, life: 30, crystals: [], burn: [], reload: 0, bonus: 0, field: f }; }
function fight(P, att) { const X = ctx(P, att, 2, [], { seed: 7 }); runCombatCore(X); resetRng(); return X; }
function setT(u, a, d, h) { u.t.a = a; u.t.d = d; u.t.h = h; u.t.dmg = 0; u.t.noCoin = true; return u; }
function hitOf(X, k) { return X.rec.find(s => s.fx.hit && s.fx[k] != null); }`);
const T = (name, code) => { try { ctx.ev('{' + code + '}'); } catch (e) { fail++; n++; console.log('  ✗ ' + name + ' 오류: ' + e.message); } };

T('연쇄 표시', `const a = setT(mk("B1-01"), 8, 0, 20); a.t.gx = { chain: true };
  const d1 = setT(mk("B2-01"), 0, 0, 2), d2 = setT(mk("B2-02"), 0, 1, 20);
  const X = fight([side(0, [a]), side(1, [d1, d2])], 0), s = hitOf(X, "chain");
  ok(s && s.fx.chain === d2.uid && s.fx.tgt === d1.uid && s.fx.act === a.uid, "맞는 수 fx.chain = 다음 유닛");
  ok(s && s.floats.some(f => f[0] === d2.uid && /연쇄/.test(f[1])), "같은 수에 연쇄 피해 글자");
  ok(d2.t.dmg === 5, "연쇄 피해 8 − 2 − 방 1 = 5 (" + d2.t.dmg + ")");`);
T('꿰뚫기 표시', `const a = setT(mk("B1-01"), 4, 0, 20); a.t.pierce = true;
  const d1 = setT(mk("B2-01"), 0, 0, 20), d2 = setT(mk("B2-02"), 0, 1, 20);
  const X = fight([side(0, [a]), side(1, [d1, d2])], 0), s = hitOf(X, "pierce");
  ok(s && s.fx.pierce === d2.uid && s.fx.tgt === d1.uid, "맞는 수 fx.pierce = 바로 뒤 유닛");
  ok(d2.t.dmg === 3, "꿰뚫기 피해 4 − 방 1 = 3 (" + d2.t.dmg + ")");`);
T('보통 공격엔 표시 없음', `const a = setT(mk("B1-01"), 4, 0, 20), d1 = setT(mk("B2-01"), 0, 0, 20), d2 = setT(mk("B2-02"), 0, 1, 20);
  const X = fight([side(0, [a]), side(1, [d1, d2])], 0); ok(!X.rec.some(s => s.fx.chain != null || s.fx.pierce != null || s.fx.swell), "chain · pierce · swell 없음");`);
T('너울 표시', `const a = setT(mk("B1-01"), 3, 0, 20); a.t.gx = { swell: true };
  const d1 = setT(mk("B2-01"), 0, 0, 20), d2 = setT(mk("B2-02"), 0, 0, 20);
  const P = [side(0, [a]), side(1, [d1, d2])], X = fight(P, 0), s = X.rec.find(z => z.fx.swell);
  ok(s && s.fx.swell.u === d1.uid && s.fx.swell.w === d2.uid && s.fx.swell.by === a.uid, "fx.swell = { by, u, w }");
  ok(s && s.snap.players[1].field[0] === d2.uid && s.snap.players[1].field[1] === d1.uid, "그 수의 그림에서 자리가 바뀜");
  ok(P[1].field[1] === d1, "판에서도 밀려남");`);

/* 2) js/abilfx.js 를 가짜 화면에서 */
const cls = new Set(), noop = () => {};
let made = 0;
const rectOf = uid => { const x = 200 + (uid % 10) * 120; return { left: x, top: 90, right: x + 110, bottom: 244, width: 110, height: 154 }; };
const fakeEl = r => ({ style: { setProperty: noop, getPropertyValue: () => "#ffcc66" }, classList: { add: noop, remove: noop }, isConnected: true, animate: () => ({}), remove: noop, appendChild: noop, setAttribute: noop,
  getTotalLength: () => 300, getBoundingClientRect: () => r || { left: 300, top: 100, right: 410, bottom: 254, width: 110, height: 154 } });
const layer = Object.assign(fakeEl(), { appendChild: () => { made++; } });
const vc = { console, Math, innerWidth: 1280, innerHeight: 720, setTimeout: fn => fn(),
  document: { documentElement: { classList: { contains: c => cls.has(c) } }, createElement: () => fakeEl(), createElementNS: () => fakeEl() } };
vm.createContext(vc);
vm.runInContext(`var G = { cfg: {}, speed: 1 }, OFF = false; var RM = () => OFF; var fxLayer = () => LAYER; var uidEl = uid => mkEl(rectOf(uid));
  var burst = () => {}, shakeEl = () => {}, sfx = () => {};`, Object.assign(vc, { LAYER: layer, mkEl: fakeEl, rectOf }));
vm.runInContext(rd('abilfx.js') + '\nthis.AB = AbilFX;', vc, { filename: 'abilfx.js' });
const AB = vc.AB;
ok(AB && AB.CHAIN_AT > 0 && AB.CHAIN_AT < 1 && AB.PIERCE_AT > 0 && AB.PIERCE_AT < 1, 'AbilFX 닿는 때 비율');
for (const tier of [['fx-low', 'fx-lite'], ['fx-lite'], ['fx-high']]) {
  cls.clear(); tier.forEach(c => cls.add(c));
  const tag = '[' + (tier.includes('fx-high') ? '고사양' : tier.includes('fx-low') ? '저사양' : '중간') + ']';
  for (const [nm, run] of [['연쇄', () => AB.chain(1, 2, 3, 900)], ['꿰뚫기', () => AB.pierce(1, 2, 3, 900)], ['너울', () => AB.swell({ by: 1, u: 2, w: 3 }, 900, { a: rectOf(2), b: rectOf(3) })]]) {
    made = 0; let err = null; try { run(); } catch (e) { err = e; }
    ok(!err, nm + ' ' + tag + ' 오류 없음' + (err ? ' — ' + err.message : '')); ok(made > 0, nm + ' ' + tag + ' 조각을 만듦');
  }
}
cls.add('fx-high'); let richN = 0, liteN = 0;
made = 0; AB.chain(1, 2, 3, 900); richN = made; cls.clear(); made = 0; AB.chain(1, 2, 3, 900); liteN = made;
ok(richN > liteN, '고사양 연쇄가 조각을 더 만듦 (' + richN + ' > ' + liteN + ')');
for (const [why, set] of [['연출 끄기 · 움직임 줄이기', () => { vc.OFF = true; }], ['배속 0', () => { vc.OFF = false; vc.G.speed = 0; }], ['화면 없는 대전', () => { vc.G.speed = 1; vc.G.cfg.headless = true; }]]) {
  set(); vm.runInContext('OFF = this.OFF || false', vc); made = 0;
  AB.chain(1, 2, 3, 900); AB.pierce(1, 2, 3, 900); AB.swell({ by: 1, u: 2, w: 3 }, 900, null);
  ok(made === 0, why + '이면 아무것도 그리지 않음 (' + made + ')');
}

/* 3) 연출 끄기 설정이 이어져 있는지 */
const imp = rd('impact.js'), game = rd('game.js'), idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
ok(/c\.toggle\("fx-off", off\)/.test(imp) && /contains\("mobile"\) && v !== "off"/.test(imp), 'applyFx: off → html.fx-off, 폰도 끄기 가능');
ok(/const RM = \(\) => document\.documentElement\.classList\.contains\("fx-off"\)/.test(game), 'RM()이 연출 끄기도 참');
ok((game.match(/\["off", "끄기"\]/g) || []).length >= 3, '설정 창 끄기 단추(PC · 폰 · 효과음)');
ok(/FX_OFF_PACE/.test(game) && /s\.dur \* PACE \* \(fxOff\(\) \? FX_OFF_PACE : 1\)/.test(game), '연출 끄기면 한 수가 짧아짐');
ok(/js\/abilfx\.js/.test(idx) && /css\/abilfx\.css/.test(idx) && idx.indexOf('js/abilfx.js') > idx.indexOf('js/game.js'), 'index.html 이 abilfx 를 game.js 뒤에 부름');

console.log(fail ? `✗ ${fail}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exitCode = fail ? 1 : 0;
