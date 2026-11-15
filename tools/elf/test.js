// v3.70 바람 궁수 엘프 시험 — 화면 없이. node tools/elf/test.js
// 후퇴(retreat) · 빗발치는 화살(volley) · 새 마법 8장 · 유닛 · 아이템 이름을 전장을 직접 만들어 본다.
const fs = require('fs'), path = require('path'); const { load } = require('../balance/harness');
const dir = path.join(__dirname, '../../js'); const rd = f => fs.readFileSync(path.join(dir, f), 'utf8');
const ctx = load(dir, 'var localStorage = { getItem() { return null; }, setItem() {} };\n' + ['grades.js', 'store.js', 'economy.js'].map(rd).join('\n'));
let fail = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log('  ✗ ' + m); } };
ctx.ok = ok;
ctx.ev(`var UIDN = 1000;
function mk(id, o) { const it = Object.assign({ uid: ++UIDN, id, item: null, summoned: 0 }, o || {}); if (isUnit(it)) resetTurn(it); return it; }
function side(idx, ids) { const f = ids.map(x => x ? (typeof x === "string" ? mk(x) : x) : null); while (f.length < RULES.slots) f.push(null); return { idx, name: "P" + idx, life: 30, crystals: [], burn: [], reload: 0, bonus: 0, field: f, hand: [], deck: [] }; }
function fight(P, att, turn, seed) { const X = ctx(P, att, turn || 2, [], { seed: seed || 7 }); runCombatCore(X); resetRng(); return X; }
function logs(X) { return X.rec.flatMap(s => s.logs.map(l => l[0])).join("\\n"); }
function setT(u, a, d, h) { u.t.a = a; u.t.d = d; u.t.h = h; u.t.dmg = 0; return u; }`);
const T = (name, code) => { try { ctx.ev('{' + code + '}'); } catch (e) { fail++; n++; console.log('  ✗ ' + name + ' 오류: ' + e.message); } };

// 카드 · 이름 · 등급
ok(ctx.ev('CARDS["SA3-04"].name === "시위 당기기" && CARDS["MA-07"].name === "치고 빠지기" && CARDS["NA3-4"].name === "바람의 사냥"'), '마법 이름');
ok(ctx.ev('gradeOf("NA3-4") === "epic" && gradeOf("HA3-2") === "uncommon" && gradeOf("MA-07") === "common"'), '마법 등급 (에픽 1장)');
ok(ctx.ev('CARDS["HA3-1"].type === "def" && CARDS["MA-07"].type === "any" && CARDS["HA3-2"].type === "hand"'), '마법 종류');
ok(ctx.ev('["SA3-04","MA-11","NA3-3","NA3-2","NA3-4","MA-07","HA3-1","HA3-2"].every(id => (typeof SPELL_BRIEF === "undefined" || SPELL_BRIEF[id]) && CARDS[id].flavor)'), '짧은 문구 · 서사');
ok(ctx.ev('CARDS["A3-01"].name === "바늘탑 견습 사수" && CARDS["C2-1"].name === "견습 단궁" && CARDS["C2-1"].item.icon === "bow"'), '유닛 · 아이템 이름');
ok(ctx.ev('CARDS["A3-01"].cl === "마도" && CARDS["A3-01"].gift.magic === 1 && CARDS["C2-1"].item.magic === 3'), '클래스 · 능력 그대로');
ok(ctx.ev('(() => { const R = RETIRED_CARDS, seen = {}; for (const c of Object.values(CARDS)) { if (R[c.id] || /^T[KS]-/.test(c.id)) continue; if (seen[c.name] && (c.group === "A3" || CARDS[seen[c.name]].group === "A3")) return false; seen[c.name] = c.id; } return true; })()'), '엘프 카드 이름이 다른 카드와 겹치지 않음');
ok(ctx.ev('Object.values(CARDS).filter(c => c.group === "A3" && c.type === "unit" && !RETIRED_CARDS[c.id]).every(c => !/마도사|마법사|술사|서생|서기|학자|현자|결계사/.test(c.name))'), '엘프 유닛 이름에 마법사 낱말 없음');
ok(ctx.ev('Object.values(STARTER_DECKS.A3 || {}).length > 0 && Object.keys(STARTER_DECKS.A3).every(id => CARDS[id] && !RETIRED_CARDS[id])'), '기본 덱 카드');

// 후퇴: 공격 턴 — 맨 앞 유닛이 맨 뒤로, 나중 차례에 [원거리]로 공격
T('치고 빠지기 (공격)', `const a1 = setT(mk("A3-01"), 3, 0, 1), a2 = setT(mk("A3-04"), 1, 0, 9), d = setT(mk("B2-01"), 2, 0, 30);
  const P = [side(0, ["MA-07", a1, a2]), side(1, [d])]; const X = fight(P, 0);
  const L = P[0].field.filter(u => u && isUnit(u)); ok(L[L.length - 1] === a1, "맨 앞 유닛이 맨 뒤로");
  ok(a1.t.alive && a1.t.dmg === 0, "[원거리]로 반격을 받지 않음 (피해 " + a1.t.dmg + ")");
  ok(/\\[후퇴\\]/.test(logs(X)), "후퇴 로그");`);
// 후퇴: 방어 턴 — 엄호 후퇴로 맨 앞이 물러서면 다음 유닛이 맞는다
T('엄호 후퇴 (방어)', `const f1 = setT(mk("A3-15"), 7, 0, 1), f2 = setT(mk("A3-41"), 0, 2, 20); const a = setT(mk("B2-26"), 6, 0, 9);   // 코인 없는 유닛
  const P = [side(0, [a]), side(1, ["HA3-1", f1, f2])]; fight(P, 0);
  ok(f1.t.alive && f1.t.dmg === 0, "물러선 저격수는 맞지 않음");
  ok(f2.t.dmg > 0 && a.t.a === 6 - 2, "다음 유닛이 맞고, 상대 공격 −2 (" + a.t.a + ")");`);
// 유닛 하나뿐이면 물러서지 않고 능력만
T('후퇴 혼자', `const a1 = setT(mk("A3-01"), 3, 0, 5), d = setT(mk("B2-01"), 2, 0, 30);
  const P = [side(0, ["MA-07", a1]), side(1, [d])]; const X = fight(P, 0); ok(/물러서지 않았다/.test(logs(X)) && a1.t.dmg === 0, "혼자면 제자리 · [원거리]");`);
// 빗발치는 화살: 맨 앞은 맞지 않고 뒤는 모두 −3
T('빗발치는 화살', `const fs = [0, 1, 2].map(i => setT(mk("B1-0" + (i + 1)), 0, 1, 9)); const P = [side(0, ["NA3-2"]), side(1, fs)]; fight(P, 0);
  ok(fs[0].t.dmg === 0 && fs[1].t.dmg === 3 && fs[2].t.dmg === 3, "맨 앞 0 · 뒤 3 · 3 (" + fs.map(u => u.t.dmg) + ")");`);
// 마무리 화살: 남은 체력이 낮은 2기
T('마무리 화살', `const fs = [setT(mk("B1-01"), 0, 0, 9), setT(mk("B1-02"), 0, 0, 2), setT(mk("B1-03"), 0, 0, 3)]; const P = [side(0, ["MA-11"]), side(1, fs)]; fight(P, 0);
  ok(fs[0].t.dmg === 0 && !fs[1].t.alive && !fs[2].t.alive, "체력 2 · 3인 둘을 쓰러뜨림");`);
// 꿰뚫는 화살 · 시위 당기기 · 바람의 사냥: 능력 부여
T('꿰뚫는 화살', `const a = setT(mk("A3-04"), 2, 0, 9), d = setT(mk("B3-41"), 0, 2, 30); const P = [side(0, ["NA3-3", a]), side(1, [d])]; fight(P, 0);
  ok(d.t.dmg === 5, "공 2+3 · 방 2 · 방어무시 2 → 피해 5 (" + d.t.dmg + ")");`);
T('시위 당기기', `const a = setT(mk("A3-04"), 3, 0, 1), d = setT(mk("B2-01"), 5, 0, 30); const P = [side(0, ["SA3-04", a]), side(1, [d])]; fight(P, 0);
  ok(a.t.alive && a.t.dmg === 0 && abilOf(a).ranged, "[원거리]로 반격 없음");`);
T('바람의 사냥', `const a = setT(mk("A3-04"), 3, 0, 1), d1 = setT(mk("B2-01"), 5, 0, 30), d2 = setT(mk("B2-02"), 1, 0, 9);
  const P = [side(0, ["NA3-4", a]), side(1, [d1, d2])]; fight(P, 0);
  ok(a.t.alive && a.t.dmg === 0 && d2.t.dmg === 3, "상대 전체 −3 · [원거리] (" + [a.t.dmg, d2.t.dmg] + ")");`);

console.log(fail ? `✗ ${fail}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exitCode = fail ? 1 : 0;
