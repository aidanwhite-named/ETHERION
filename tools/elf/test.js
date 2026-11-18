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
ok(ctx.ev('["SA3-04","MA-11","SA3-06","NA3-3","NA3-2","NA3-4","MA-07","HA3-1","HA3-2"].every(id => (typeof SPELL_BRIEF === "undefined" || SPELL_BRIEF[id]) && CARDS[id].flavor)'), '짧은 문구 · 서사');
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
// v3.93 활 콤보: 궁사회 무기고(SA3-06) · 별빛 연사(NA3-3)
ok(ctx.ev('CARDS["SA3-06"].name === "궁사회 무기고" && CARDS["SA3-06"].lv === 2 && CARDS["SA3-06"].type === "atk" && CARDS["NA3-3"].name === "별빛 연사" && CARDS["NA3-3"].lv === 3'), '활 마법 이름 · 레벨 · 종류');
ok(ctx.ev('(typeof SPELL_BRIEF === "undefined" || (SPELL_BRIEF["SA3-06"] && SPELL_BRIEF["NA3-3"])) && CARDS["SA3-06"].flavor && SPELL_KW["활"]'), '활 마법 짧은 문구 · 서사 · [활] 뜻');
ok(ctx.ev('a3HasBow(mk("A3-01")) && !a3HasBow(mk("A3-04")) && a3HasBow(mk("A3-04", { item: { id: "C2-1", coins: [] } })) && !a3HasBow(mk("A3-04", { item: { id: "IA3-3", coins: [] } }))'), '[활]: 사수 유닛 · 활 아이템 (망토는 아님)');
T('궁사회 무기고', `const a = setT(mk("A3-04"), 1, 0, 9), b = mk("A3-05", { item: { id: "IA3-3", coins: [] } }), d = setT(mk("B2-01"), 5, 0, 30);
  const a0 = a.t.a, b0 = b.t.a; const P = [side(0, ["SA3-06", a, b]), side(1, [d])]; fight(P, 0);
  ok(a.t.keep && a.t.keep.bow && abilOf(a).ranged && a.t.a === a0 + 2, "아이템 없는 유닛: 활 · [원거리] · 공 +2 (" + [a.t.a, a0] + ")");
  ok(a.t.alive && a.t.dmg === 0, "[원거리]로 반격 없음");
  ok(!(b.t.keep && b.t.keep.bow) && b.t.a === b0, "아이템 든 유닛은 그대로");
  resetTurn(a); ok(a3HasBow(a) && !abilOf(a).ranged, "다음 턴: 활은 남고 [원거리]는 꺼짐");`);
T('별빛 연사', `const a = setT(mk("A3-01"), 0, 0, 9), b = setT(mk("A3-04", { item: { id: "C2-1", coins: [] } }), 0, 0, 9), c = setT(mk("A3-05"), 0, 0, 9);
  const d1 = setT(mk("B2-01"), 0, 3, 30), d2 = setT(mk("B2-02"), 0, 5, 30); const P = [side(0, ["NA3-3", a, b, c]), side(1, [d1, d2])]; fight(P, 0);
  ok(d2.t.dmg === 4, "활 2기 × 2 = 상대 전체 피해 4, 방어 무시 (" + d2.t.dmg + ")");`);
T('별빛 연사 · 활 없음', `const c = setT(mk("A3-05"), 0, 0, 9), d2 = setT(mk("B2-02"), 0, 0, 30), d1 = setT(mk("B2-01"), 0, 0, 30);
  const P = [side(0, ["NA3-3", c]), side(1, [d1, d2])]; fight(P, 0); ok(d2.t.dmg === 0, "활이 없으면 헛것");`);
T('무기고 → 연사 콤보', `const a = setT(mk("A3-04"), 0, 0, 9), b = setT(mk("A3-05"), 0, 0, 9), c = setT(mk("A3-01", { item: { id: "IA3-3", coins: [] } }), 0, 0, 9);
  const d1 = setT(mk("B2-01"), 0, 0, 40), d2 = setT(mk("B2-02"), 0, 0, 40); const P = [side(0, ["SA3-06", "NA3-3", a, b, c]), side(1, [d1, d2])]; fight(P, 0);
  ok(d2.t.dmg === 6, "활 받은 2기 + 사수 1기 = 3 × 2 = 6 (" + d2.t.dmg + ")");`);
T('시위 당기기', `const a = setT(mk("A3-04"), 3, 0, 1), d = setT(mk("B2-01"), 5, 0, 30); const P = [side(0, ["SA3-04", a]), side(1, [d])]; fight(P, 0);
  ok(a.t.alive && a.t.dmg === 0 && abilOf(a).ranged, "[원거리]로 반격 없음");`);
T('바람의 사냥', `const a = setT(mk("A3-04"), 3, 0, 1), d1 = setT(mk("B2-01"), 5, 0, 30), d2 = setT(mk("B2-02"), 1, 0, 9);
  const P = [side(0, ["NA3-4", a]), side(1, [d1, d2])]; fight(P, 0);
  ok(a.t.alive && a.t.dmg === 0 && d2.t.dmg === 3, "상대 전체 −3 · [원거리] (" + [a.t.dmg, d2.t.dmg] + ")");`);

// v3.95 혼란의 바람(SA3-02, 전 바람 장벽): 상대 맨 앞 1기 방어 ↔ 남은 체력(방어 0이면 쓰러짐), 공격 L2
ok(ctx.ev('CARDS["SA3-02"].name === "혼란의 바람" && CARDS["SA3-02"].lv === 2 && CARDS["SA3-02"].type === "atk" && gradeOf("SA3-02") === "uncommon" && CARDS["SA3-02"].flavor && (typeof SPELL_BRIEF === "undefined" || SPELL_BRIEF["SA3-02"])'), '혼란의 바람 이름 · 레벨 · 공격 · 고급');
T('혼란의 바람', `const f1 = setT(mk("B2-01"), 0, 3, 7), f2 = setT(mk("B2-02"), 0, 2, 9);
  const P = [side(0, ["SA3-02"]), side(1, [f1, f2])]; fight(P, 0);
  ok(f1.t.d === 7 && hpLeft(f1) === 3, "3/7 → 방 7 · 체 3 (" + [f1.t.d, hpLeft(f1)] + ")");
  ok(f2.t.d === 2 && hpLeft(f2) === 9, "둘째는 그대로 (1기만)");`);
T('혼란의 바람 · 방어 0', `const f1 = setT(mk("B2-01"), 0, 0, 5); const P = [side(0, ["SA3-02"]), side(1, [f1])]; fight(P, 0);
  ok(!f1.t.alive, "방어 0이면 체력 0이 되어 쓰러짐");`);
T('혼란의 바람 · 저주 면역', `const f1 = setT(mk("B2-01"), 0, 6, 2); f1.t.lock = true;
  const P = [side(0, ["SA3-02"]), side(1, [f1])]; fight(P, 0);
  ok(f1.t.d === 6 && hpLeft(f1) === 2, "방어가 내려갈 저주 면역 유닛은 그대로 (" + [f1.t.d, hpLeft(f1)] + ")");
  const g1 = setT(mk("B2-02"), 0, 1, 5); g1.t.lock = true; const Q = [side(0, ["SA3-02"]), side(1, [g1])]; fight(Q, 0);
  ok(g1.t.d === 5 && hpLeft(g1) === 1, "방어가 오르는 쪽은 맞바꿈 (" + [g1.t.d, hpLeft(g1)] + ")");`);
T('찢는 바람 → 혼란의 바람', `const f1 = setT(mk("B2-01"), 0, 3, 9), f2 = setT(mk("B2-02"), 0, 3, 9);
  const P = [side(0, ["NA3-1", "SA3-02"]), side(1, [f1, f2])]; fight(P, 0);
  ok(!f1.t.alive && f2.t.alive, "방어 0이 된 맨 앞 유닛이 맞바꿈으로 쓰러짐");`);
T('혼란의 바람 → [방어무시]', `const a = setT(mk("A3-01"), 4, 0, 5), d = setT(mk("B2-01"), 0, 4, 9);
  const P = [side(0, ["SA3-02", a]), side(1, [d])]; fight(P, 0);
  ok(abilOf(a).magic && !d.t.alive, "방 9 · 체 4가 된 상대를 [방어무시] 공격 4로 쓰러뜨림");`);
// v3.95 되쏘는 바람(SA3-05, 전 회오리 방벽): 아군 맨 앞 2기 방어 +2 · 체력 +2 · [방어무시] — 반격에도
ok(ctx.ev('CARDS["SA3-05"].name === "되쏘는 바람" && CARDS["SA3-05"].lv === 2 && CARDS["SA3-05"].type === "def" && gradeOf("SA3-05") === "uncommon" && CARDS["SA3-05"].flavor'), '되쏘는 바람 이름 · 레벨 · 방어 · 고급');
T('되쏘는 바람 (방어 턴 반격)', `const f1 = setT(mk("B2-26"), 3, 0, 5), f2 = setT(mk("B2-26"), 1, 0, 5), a = setT(mk("B2-26"), 2, 4, 9);   // 코인 없는 유닛
  const P = [side(0, [a]), side(1, ["SA3-05", f1, f2])]; fight(P, 0);
  ok(f1.t.d === 2 && f2.t.d === 2, "아군 맨 앞 2기 방어 +2");
  ok(f1.t.dmg === 0, "공 2를 방어 2로 막음 (" + f1.t.dmg + ")");
  ok(a.t.dmg === 3, "반격 [방어무시]: 방 4를 무시하고 피해 3 (" + a.t.dmg + ")");`);
// v3.95 규칙: [방어무시]는 반격에도, [마력 공격]은 공격 + 상대 방어(N까지) · 반격엔 없음
T('[방어무시] 반격', `const d = setT(mk("A3-01"), 3, 0, 9), a = setT(mk("B2-26"), 1, 2, 9);
  const P = [side(0, [a]), side(1, [d])]; fight(P, 0);
  ok(abilOf(d).magic && a.t.dmg === 3, "반격이 방 2를 무시 (" + a.t.dmg + ")");`);
T('[마력 공격] 공 + 방', `ok(mrArc(5, 2, 2, false).dmg === 7 && mrArc(5, 4, 2, false).dmg === 7 && mrArc(5, 4, 2, true).dmg === 9 && mrArc(5, 3, 0, false).dmg === 2, "공 5 · 방 2 → 7, 방 4(N 2) → 7, 홀림 → 9, 없으면 2");
  const a = setT(mk("B2-26"), 5, 0, 9), d = setT(mk("B2-26"), 4, 2, 9); a.t.gx = { arcane: 2 };
  const P = [side(0, [a]), side(1, [d])]; fight(P, 0);
  ok(d.t.dmg === 7, "공격: 5 + 방 2 = 7 (" + d.t.dmg + ")");
  const b = setT(mk("B2-26"), 3, 1, 9), e = setT(mk("B2-26"), 5, 2, 9); e.t.gx = { arcane: 2 };
  const Q = [side(0, [b]), side(1, [e])]; fight(Q, 0);
  ok(b.t.dmg === 4, "반격엔 마력 공격 없음: 5 − 방 1 = 4 (" + b.t.dmg + ")");`);

// v3.95 별의 문자(US-A3-1) → 마족 그믐의 계약서: 깃발 · 이름 · 효과 · 저장 덱 정리
ok(ctx.ev('CARDS["US-A3-1"].group === "A1" && CARDS["US-A3-1"].name === "그믐의 계약서" && gradeOf("US-A3-1") === "epic" && CARDS["US-A3-1"].type === "hand" && CARDS["US-A3-1"].lv === 1'), '그믐의 계약서: 마족 · 에픽 핸드 L1');
ok(ctx.ev('deckable(CARDS["US-A3-1"], "A1") && !deckable(CARDS["US-A3-1"], "A3") && cardsOfGroup("A1").includes(CARDS["US-A3-1"]) && !cardsOfGroup("A3").includes(CARDS["US-A3-1"])'), '그믐의 계약서: 마족 덱에만');
ok(ctx.ev('Object.values(STARTER_DECKS).every(d => !d["US-A3-1"]) && [DECK_LISTS, HARD_DECK_LISTS].every(L => Object.values(L).every(d => !(d.cards || d)["US-A3-1"]))'), '기본 · 정예 덱에 없음');
ok(ctx.ev(`(() => { const d = Object.assign({}, STARTER_DECKS.A3); const k0 = countMap(d); d["US-A3-1"] = 1; const first = Object.keys(d)[0]; d[first]--; if (!d[first]) delete d[first];
  const col = {}; for (const id in d) col[id] = 4; Object.assign(col, { "US-A3-1": 1 });
  const u = { collection: col, decks: { A3: { cards: d } }, drafts: {}, owned: { A3: 1 } };
  const n = Store.fixMovedCards(u);
  return n === 1 && !u.decks.A3.cards["US-A3-1"] && countMap(u.decks.A3.cards) === k0 && Object.keys(u.decks.A3.cards).every(id => CARDS[id].group === "A3") && u.collection["US-A3-1"] === 1; })()`), '저장한 엘프 덱에서 빼고 같은 장수로 채움 · 보유는 그대로');

console.log(fail ? `✗ ${fail}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exitCode = fail ? 1 : 0;
