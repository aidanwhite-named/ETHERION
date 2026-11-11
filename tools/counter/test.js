// v3.32 무효 마법 시험 — 화면 없이. node tools/counter/test.js
// 장면마다 전장을 직접 만들어 엔진(runCombatCore)을 돌리고 [무효]가 맞게 도는지 본다. 마지막에 무효 마법을 넣은 덱으로 실제 대전(보통 · 어려움).
const fs = require('fs'), path = require('path'); const { load } = require('../balance/harness');
const dir = path.join(__dirname, '../../js'); const rd = f => fs.readFileSync(path.join(dir, f), 'utf8');
const ctx = load(dir, 'var localStorage = { getItem() { return null; }, setItem() {} };\n' + ['grades.js', 'store.js', 'economy.js'].map(rd).join('\n'));
const ev = s => ctx.ev(s);
let fail = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log('  ✗ ' + m); } };
ev(`var UIDN = 1000;
function mk(id, o) { const it = Object.assign({ uid: ++UIDN, id, item: null, summoned: 0 }, o || {}); if (isUnit(it)) resetTurn(it); return it; }
function side(idx, ids) { const f = ids.map(x => x ? (typeof x === "string" ? mk(x) : x) : null); while (f.length < RULES.slots) f.push(null); return { idx, name: "P" + idx, life: 30, crystals: [], burn: [], reload: 0, bonus: 0, field: f }; }
function fight(P, att, turn, seed) { const X = ctx(P, att, turn || 2, [], { seed: seed || 7 }); runCombatCore(X); resetRng(); return X; }
function logs(X) { return X.rec.flatMap(s => s.logs.map(l => l[0])).join("\\n"); }
var findId = (p, id) => p.field.find(u => u && u.id === id);`);
const T = (name, code) => { try { ctx.ev('{' + code + '}'); } catch (e) { fail++; n++; console.log('  ✗ ' + name + ' 오류: ' + e.message); } };
ctx.ok = ok;
const IDS = ['CS-B1', 'CS-B2', 'CS-B3', 'CS-G1', 'CS-G2', 'CS-G3', 'CS-A1', 'CS-A2', 'CS-A3'];
ctx.IDS = IDS;

// 카드 · 등급 · 글
ok(ev('COUNTER_SPELLS.length') === 9 && ev('GROUP_IDS.every(g => COUNTER_SPELLS.filter(s => s.g === g).length === 1)'), '깃발마다 1장 · 9장');
ok(ev('IDS.every(id => CARDS[id] && CARDS[id].type === "atk" && gradeOf(id) === "uncommon")'), '모두 공격 마법 · 고급');
ok(ev('IDS.every(id => [2, 3].includes(CARDS[id].lv) && CARDS[id].ops[0].op === "negate")'), '모두 2 · 3레벨, 첫 효과가 [무효]');
ok(ev('IDS.filter(id => CARDS[id].lv === 2).every(id => CARDS[id].ops.length === 1)') && ev('IDS.filter(id => CARDS[id].lv === 3).every(id => CARDS[id].ops.length >= 2)'), '2레벨은 [무효]만, 3레벨은 [무효] + 효과 하나');
ok(ev('IDS.every(id => CARDS[id].name.replace(/\\s/g, "").length <= 6 && COUNTER_SPELLS.find(s => s.id === id).brief && /\\[무효\\]/.test(CARDS[id].text))'), '이름 6글자 이하 · 짧은 문구 · 글에 [무효]');
ok(ev('new Set(CARD_LIST.map(c => c.name)).size === new Set(CARD_LIST.map(c => c.id)).size || IDS.every(id => CARD_LIST.filter(c => c.name === CARDS[id].name).length === 1)'), '이름이 다른 카드와 겹치지 않음');
ok(/발동하지 않고 부서진다/.test(ev('spellKwDesc("무효")')), '[무효] 말풍선 뜻');
ev(rd('view.js').match(/function spellKwOff[\s\S]*?\n}\n/)[0]);
ok(ev('spellKwOff(CARDS["CS-G3"]).has("[보호막]") && !spellKwOff(CARDS["CS-G3"]).has("[무효]")'), '씻김의 노래: 해제 키워드는 빨간 칩, [무효]는 아님');

// 1 맨 앞 마법을 무효 — 발동하지 않고 상대 소각장으로
T('기본', `const P = [side(0, ["CS-B2", "A1-30"]), side(1, ["SB1-03", "B1-01", "SB1-01"])];
  const X = fight(P, 0, 2); const L = logs(X);
  ok(/참호 사격.*무효/.test(L) && !/참호 사격 발동/.test(L), "무효: 상대 1번 칸 방어 마법이 발동하지 않음");
  ok(/연막탄 발동/.test(L), "무효: 1장만 — 뒤의 마법은 그대로 발동");
  ok(P[1].burn.includes("SB1-03") && !P[0].burn.includes("SB1-03"), "무효로 부서진 마법은 원래 주인의 소각장으로");
  ok(X.broken.some(b => b.p === 1 && b.id === "SB1-03" && b.how === "spell"), "부서진 카드 기록(조각 정산)");`);
// 2 공격 마법이 먼저 — 상대 1번 칸 방어 마법보다 앞
T('먼저 발동', `const P = [side(0, ["CS-A3", "A1-30"]), side(1, ["SB1-01", "B1-01"])];
  const X = fight(P, 0, 2); const L = logs(X);
  ok(L.indexOf("주문 끊기 발동") >= 0 && !/연막탄 발동/.test(L), "1번 칸 [무효]가 상대 1번 칸 마법보다 먼저");`);
// 3 뒤 칸에 두면 이미 풀린 마법은 겨누지 않고 다음 마법
T('뒤 칸', `const a = mk("A1-30"); a.t.a = 30; const P = [side(0, [a, "CS-B3"]), side(1, ["SB1-03", "B1-01", "SB1-01"])];
  const X = fight(P, 0, 2); const L = logs(X);
  ok(/참호 사격 발동/.test(L) && /연막탄.*무효/.test(L), "뒤 칸: 앞 유닛이 싸우는 동안 풀린 마법은 두고 남은 맨 앞 마법을 무효");`);
// 4 대상이 없을 때 — 3레벨의 다른 효과는 그대로
T('대상 없음', `const P = [side(0, ["CS-A2", "A1-30"]), side(1, ["B1-01"])];
  const X = fight(P, 0, 2); const L = logs(X);
  ok(/무효로 할 마법이 없다/.test(L), "대상 없음: 헛것");
  ok(X.rec.some(s => s.floats.some(f => f[1] === "보호막")) && X.rec.some(s => s.floats.some(f => f[1] === "⚔+2")), "대상 없음: 3레벨의 다른 효과(보호막)는 남");`);
// 5 3레벨 효과
T('덫 태우기', `const P = [side(0, ["CS-B1", "A1-30"]), side(1, ["SB1-03", "B1-01", "B1-02"])]; const u1 = P[1].field[1], u2 = P[1].field[2];
  const X = fight(P, 0, 2, 3); ok(/참호 사격.*무효/.test(logs(X)) && X.rec.some(s => s.floats.some(f => f[0] === u2.uid && /−1|1$/.test(f[1]))), "덫 태우기: 무효 + 맨 앞 2기 피해 1");`);
T('씻김의 노래', `const d = mk("A2-01"); d.t.shield = true; d.t.taunt = true; const P = [side(0, ["CS-G3", "A1-30"]), side(1, ["SB1-03", d])];
  const X = fight(P, 0, 2); ok(/참호 사격.*무효/.test(logs(X)) && X.rec.some(s => s.floats.some(f => f[0] === d.uid && f[1] === "강화 해제")), "씻김의 노래: 무효 + 맨 앞 유닛 강화 해제");`);
T('피의 침묵', `const P = [side(0, ["CS-A1", "A1-30"]), side(1, ["SB1-03", "B1-01", "B1-30"])];
  const X = fight(P, 0, 2); ok(/참호 사격.*무효/.test(logs(X)) && P[0].life <= 29, "피의 침묵: 생명 1 · 무효");`);
T('이끼 덮기', `const a = mk("A1-30"); const P = [side(0, ["CS-G2", a]), side(1, ["SB1-03", "B1-01"])]; const h0 = a.t.h;
  const X = fight(P, 0, 2); ok(/참호 사격.*무효/.test(logs(X)) && X.rec.some(s => s.floats.some(f => f[0] === a.uid && f[1] === "⚔+1 ♥+2")), "이끼 덮기: 무효 + 아군 맨 앞 체력 +2");`);
// 6 빼앗긴 마법 · opening 마법 · 소환 마법
T('opening', `const op = CARD_LIST.find(c => c.opening && c.group === "B2"); if (op) { const P = [side(0, ["CS-G1", "A1-30"]), side(1, ["B2-01", op.id])];
  const X = fight(P, 0, 2); ok(new RegExp(op.name + ".*무효").test(logs(X)), "opening 마법도 무효 (" + op.name + ")"); } else ok(true, "");`);
T('높은 레벨', `const sm = CARD_LIST.filter(c => c.type === "def" && c.lv >= 5 && !c.unique).sort((a, b) => b.lv - a.lv)[0]; const P = [side(0, ["CS-B2", "A1-30"]), side(1, [sm.id, "B1-01"])];
  const X = fight(P, 0, 2); ok(!new RegExp(sm.name + " 발동").test(logs(X)) && P[1].burn.includes(sm.id), "높은 레벨 방어 마법(" + sm.name + " " + sm.lv + "레벨)도 무효");`);
// 7 방어 턴에는 낼 수 없음 (공격 마법)
ok(ev('CARDS["CS-B2"].type') === 'atk', '방어 턴에는 낼 수 없는 공격 마법');

// 8 실제 대전 — 무효 마법 4장을 넣은 덱, 보통 · 어려움, 오류 없이 끝나고 실제로 무효가 일어남
(async () => {
  ev(`var NEG = { cast: 0, hit: 0 }; const _ng = SPELL_OPS.negate; SPELL_OPS.negate = function (X, c, it, k, op) { const b = X.negated || 0; _ng(X, c, it, k, op); if (X.rec) { NEG.cast++; if ((X.negated || 0) > b) NEG.hit++; } };`);
  const Gs = ['B1', 'B2', 'B3', 'G1', 'G2', 'G3', 'A1', 'A2', 'A3'];
  const deckWith = g => { const d = Object.assign({}, ev('STARTER_DECKS')[g]); const id = 'CS-' + g; const cut = Object.keys(d).filter(k => ev(`CARDS["${k}"].type`) !== 'unit' && ev(`CARDS["${k}"].lv`) <= 4).sort((a, b) => ev(`CARDS["${a}"].lv`) - ev(`CARDS["${b}"].lv`)); let k = 4; for (const c of cut) { while (k > 0 && d[c] > 0) { d[c]--; k--; } if (!d[c]) delete d[c]; } d[id] = 4 - k; return d; };
  let games = 0, errs = 0;
  for (const ai of ['normal', 'hard']) for (let i = 0; i < (ai === 'hard' ? 9 : 36); i++) {
    const a = Gs[i % 9], b = Gs[(i * 4 + 1) % 9];
    try { ctx.seed(100 + i); const g = await ctx.playHeadless({ p0: { name: 'A', group: a, cards: deckWith(a), isAI: true, ai }, p1: { name: 'B', group: b, cards: deckWith(b), isAI: true, ai } }); games++; if (g.winner == null) errs++; }
    catch (e) { errs++; console.log('  ✗ 대전 오류 ' + a + ' vs ' + b + ' ' + ai + ': ' + e.message); }
  }
  ok(!errs, `무효 마법 덱 실제 대전 ${games}판 오류 없음`);
  const N = ev('NEG'); ok(N.cast > 0, `컴퓨터가 무효 마법을 냄 (발동 ${N.cast}번 · 실제로 무효 ${N.hit}번)`);
  console.log(`무효 마법 발동 ${N.cast}번 · 그중 상대 마법을 무효로 한 것 ${N.hit}번`);
  console.log(fail ? `✗ ${fail}/${n} 실패` : `✓ ${n}개 모두 통과`);
  process.exitCode = fail ? 1 : 0;
})();
