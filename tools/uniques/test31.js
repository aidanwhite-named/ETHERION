// v3.31 유니크 강화 특수능력 시험 — 화면 없이. node tools/uniques/test31.js
// 장면마다 전장을 직접 만들어 엔진(runCombatCore)을 돌리고 결과를 본다. 마지막에 유니크를 넣은 덱으로 실제 대전.
const fs = require('fs'), path = require('path'); const { load } = require('../balance/harness');
const dir = path.join(__dirname, '../../js'); const rd = f => fs.readFileSync(path.join(dir, f), 'utf8');
const ctx = load(dir, 'var localStorage = { getItem() { return null; }, setItem() {} };\n' + ['grades.js', 'store.js', 'economy.js'].map(rd).join('\n'));
const ev = s => ctx.ev(s);
let fail = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log('  ✗ ' + m); } };
ev(`var UIDN = 1000;
function mk(id, o) { const it = Object.assign({ uid: ++UIDN, id, item: null, summoned: 0 }, o || {}); resetTurn(it); return it; }
function side(idx, ids) { const f = ids.map(x => x ? (typeof x === "string" ? mk(x) : x) : null); while (f.length < RULES.slots) f.push(null); return { idx, name: "P" + idx, life: 30, crystals: [], burn: [], reload: 0, bonus: 0, field: f }; }
function fight(P, att, turn, seed) { const X = ctx(P, att, turn || 2, [], { seed: seed || 7 }); runCombatCore(X); resetRng(); return X; }
function next(P) { for (const p of P) for (const u of p.field) if (u && isUnit(u)) { resetTurn(u); } }
function logs(X) { return X.rec.flatMap(s => s.logs.map(l => l[0])).join("\\n"); }
var findId = (p, id) => p.field.find(u => u && u.id === id);`);
const T = (name, code) => { try { ctx.ev('{' + code + '}'); } catch (e) { fail++; n++; console.log('  ✗ ' + name + ' 오류: ' + e.message); } };
ctx.ok = ok;

// 18장 · 등급 · 덱 규칙
ok(ev('UNIQUE_UNITS.length') === 18 && ev('new Set(UNIQUE_UNITS.map(u => u.gift.u)).size') === 18, '유니크 18장 · 능력 18가지 모두 다름');
ok(ev('UNIQUE_UNITS.every(u => gradeOf(u.id) === "unique" && CARDS[u.id].limit === 1 && UNIQUE_ABIL[u.gift.u])'), '모두 유니크 등급 · 1장 · 능력 글 있음');
ok(ev('GROUP_IDS.every(g => UNIQUE_UNITS.filter(u => u.g === g).length === 2)'), '깃발마다 2장');
ok(ev('CARD_LIST.filter(c => gradeOf(c) === "unique").every(c => c.type === "unit" && c.gift && c.gift.u)'), '유니크는 강화 특수능력을 가진 유닛뿐');
ok(ev('itemAbilities(CARDS["UN-B1"].gift)[0]') === '[시한 화약]' && ev('itemKwDesc("[시한 화약]")').includes('화약통'), '카드 글: [시한 화약] 칩과 뜻');
ok(ev('uniqueBlock({ "UN-B1": 1, "UN-B1-7": 1 }, "UN-B2")') && !ev('uniqueBlock({ "UN-B1": 1 }, "UN-B1-7")'), '덱에 유니크 2종까지');
T('덱 검사', `const u = { collection: {}, decks: {}, admin: true }; const d = Object.assign({}, STARTER_DECKS.B1); const ks = Object.keys(d).filter(k => CARDS[k].type === "unit" && d[k] === 1).slice(0, 2); for (const k of ks) delete d[k]; d["UN-B1"] = 1; d["UN-B1-7"] = 1; ok(Store.validateDeck(u, "B1", d).ok, "유니크 2종 덱은 저장됨: " + Store.validateDeck(u, "B1", d).msg); d["SP-B1"] ? 0 : 0;`);

// 1 시한 화약
T('시한 화약', `const big = mk("A1-30"); const ub = mk("UN-B1"); ub.t.h = 1; const r = mk("A1-30");
  const P = [side(0, [big]), side(1, [ub, r, mk("A1-30")])]; r.t.h = 99; P[1].field[2].t.h = 99; for (const u of P[0].field) if (u) u.t.h = 99;
  let X = fight(P, 0, 2); const F = P[1].field;
  ok(!findId(P[1], "UN-B1") && F[0] && F[0].id === "TK-U-BOMB" && F[1] === r && F.slice(3).every(u => u && u.id === "TK-U-BOMB"), "시한 화약: 쓰러진 제 자리(1번) + 빈 칸마다 화약통 (" + F.map(u => u && u.id) + ")");
  ok(!logs(X).includes("화약통이 터졌다") && !P[0].field.some(u => u && u.t.keep && u.t.keep.scorch > 0), "시한 화약: 놓인 턴에는 터지지 않음");
  next(P); X = fight(P, 1, 3); const L = logs(X); const sc = u => (u && u.t.keep && u.t.keep.scorch) || 0;
  ok(L.includes("[시한 화약] 불붙은 화약통이 터졌다") && sc(big) === 3 && L.split("[시한 화약] 불붙은 화약통이 터졌다 → 맞은 유닛 없음").length === 3, "시한 화약: 다음 턴 같은 칸 번호(1번)의 상대에 [화상 3], 맞은편이 빈 화약통 2개는 불발 (" + sc(big) + ")");
  ok(!findId(P[1], "TK-U-BOMB"), "시한 화약: 터진 화약통은 사라짐");`);
T('화약통 깔기 · 마법 뒤', `const P = [side(0, []), side(1, [])];
  const b2 = mk("TK-U-BOMB"); b2.t.keep = { fuse: 3, face: 3 }; P[1].field = [mk("A1-30"), b2, null, null, null];
  P[0].field = [mk("MB-04"), mk("A1-30"), null, null, null]; const Y = fight(P, 0, 4); const M = logs(Y);
  ok(/화약통이 터졌다/.test(M) && M.indexOf("도화선") >= 0 && M.indexOf("도화선") < M.indexOf("화약통이 터졌다"), "화약통 깔기: 다음 턴 시작 마법이 먼저 발동한 뒤 터짐");`);
// 2 불씨 전염
T('불씨 전염', `const e = mk("UN-B1-7"); const tg = mk("G2-36"); tg.t.h = 40; const P = [side(0, [e]), side(1, [tg])]; fight(P, 0, 2);
  ok(tg.t.keep.ember === 2, "불씨: 맞은 유닛에 불씨");
  next(P); tg.t.h = 40; let X = fight(P, 1, 3);
  ok(/불씨가 탄다/.test(logs(X)) && tg.t.keep.ember != null, "불씨: 다음 턴부터 매 턴 피해 2 (꺼지지 않음)");`);
// 3 고철 골렘
T('고철 골렘', `const g = mk("UN-B2"); const w1 = mk("B2-01"), w2 = mk("B2-02"), w3 = mk("B2-05"), w4 = mk("B2-08"); for (const w of [w1, w2, w3, w4]) w.t.h = 1;
  const P = [side(0, ["A1-30", "A1-30", "A1-30", "A1-30"]), side(1, [w1, w2, w3, w4, g])]; const X = fight(P, 0, 2);
  ok(!!findId(P[1], "TK-U-SCRAP"), "고철 골렘: 내 유닛 4기가 쓰러지면 골렘 " + (g.t.keep.scrap || 0));`);
// 4 강철 사슬
T('강철 사슬', `const L = mk("UN-B2-7"), m = mk("B2-36"); const P = [side(0, ["A1-30"]), side(1, [m, L])]; const X = fight(P, 0, 2);
  ok(/강철 사슬/.test(logs(X)) && L.t.dmg > 0, "강철 사슬: 앞 유닛이 받는 피해의 절반을 대신 받음 " + L.t.dmg + "/" + m.t.dmg);`);
// 2026-11-28 사슬 몫은 골렘 방어만큼 줄고, 마법은 그대로, 여러 유닛을 치는 마법에는 나누지 않음
T('강철 사슬 · 방어 · 마법', `const run = (id) => { const L = mk("UN-B2-7"), m = mk("B2-36"); m.t.h = 99; m.t.a = 50; m.t.d = 0; L.t.h = 99; fight([side(0, [id]), side(1, [m, L])], 0, 2); return [L.t.dmg, m.t.dmg, L.t.d]; };
  const [a, b, d] = run("NB1-1"); ok(b === 1 && a === Math.max(0, 2 - d), "강철 사슬: 물리 피해 3 → 앞 1 · 사슬 2 − 방어 " + a + "/" + b);
  const [c, e] = run("RS-A1-1"); ok(c === 3 && e === 3, "강철 사슬: 단일 마법 피해 6 → 3 · 3 (방어로 줄지 않음) " + c + "/" + e);
  const [f, g] = run("SB1-09"); ok(f === 3 && g === 3, "강철 사슬: 전체 마법에는 나누지 않음 " + f + "/" + g);`);
T('강철 사슬 · 방어와 마법', `const mkS = () => { const m = mk("B2-36"), g = mk("UN-B2-7"); m.t.h = 50; g.t.h = 50; const P = [side(0, ["A1-30"]), side(1, [m, g])]; return { X: ctx(P, 0, 2, [], { seed: 1 }), m, g }; };
  let s = mkS(); hurt(s.X, s.m, 8); ok(s.m.t.dmg === 4 && s.g.t.dmg === 4 - s.g.t.d, "강철 사슬: 맞붙은 피해의 절반을 나눠 받고 제 방어만큼 줄인다 " + s.g.t.dmg);
  s = mkS(); s.X.casting = 1; s.X.castBy = 0; s.X.linkSolo = true; hurt(s.X, s.m, 8); ok(s.m.t.dmg === 4 && s.g.t.dmg === 4, "강철 사슬: 단일 마법 피해는 방어로 줄지 않는다");
  s = mkS(); s.X.casting = 1; s.X.castBy = 0; s.X.linkSolo = false; hurt(s.X, s.m, 8); ok(s.m.t.dmg === 8 && s.g.t.dmg === 0, "강철 사슬: 여러 유닛을 치는 마법에는 발동하지 않는다");
  ok(!linkSoloOp({ op: "dmg", area: { t: "all" } }) && linkSoloOp({ op: "dmg", area: { t: "back", n: 1 } }), "강철 사슬: 대상 1기 효과만 단일 피해");`);
// 5 축전
T('축전', `const c = mk("UN-B3"); c.t.keep.charge = 2; const P = [side(0, [c]), side(1, ["A2-01", "A2-02"])]; const X = fight(P, 0, 2);
  ok(/모은 (번개|플라즈마)를 풀었다/.test(logs(X)) && c.t.keep.charge === 0, "축전: 충전 3이면 전투 시작에 전체 피해");
  const P2 = [side(0, ["SB3-01", mk("UN-B3")]), side(1, ["A2-01"])]; const X2 = fight(P2, 0, 2); const u = findId(P2[0], "UN-B3"); ok(u && u.t.keep.charge >= 1, "축전: 내 마법이 발동하면 충전 " + (u && u.t.keep.charge));`);
// 6 자기장 교란
T('자기장 교란', `const j = mk("UN-B3-7"); const a = mk("B1-34"); const P = [side(0, [a]), side(1, [j])]; const X = fight(P, 0, 2, 11);
  const cs = X.rec.find(s => s.fx.coin); ok(cs && cs.fx.coin.coinsA.every(k => k.v > 0 ? !k.heads : k.heads) && cs.fx.coin.coinsA.every(k => k.p === 0 || k.p === 1), "자기장 교란: 상대 코인은 손해 보는 면 · 다시 던질 수 없음");`);
// 7 늑대 무리
T('늑대 무리', `const w = mk("UN-G1"); const P = [side(0, [w]), side(1, ["B1-04"])]; const X = fight(P, 0, 2);
  const wolf = findId(P[0], "TK-U-WOLF"); ok(!!wolf, "늑대 무리: 쓰러뜨리면 늑대");
  next(P); fight(P, 1, 3); ok(!findId(P[0], "TK-U-WOLF"), "늑대 무리: 다음 턴 전투가 끝나면 흩어짐");`);
// 8 전리품
T('전리품', `const l = mk("UN-G1-7"); const v = mk("A2-01"); v.item = { uid: 5555, id: "IA2-1", equipped: 1 }; resetTurn(v);
  const P = [side(0, [l]), side(1, [v])]; const X = fight(P, 0, 2);
  ok(l.item && l.item.id === "IA2-1" && l.item.from === 1 && !P[1].burn.includes("IA2-1"), "전리품: 아이템을 빼앗아 장착");`);
T('전리품 성장', `const l = mk("UN-G1-7"); const P = [side(0, [l]), side(1, ["B1-04"])]; fight(P, 0, 2); ok(l.t.keep.grow && l.t.keep.grow.a === 1, "전리품: 아이템 없는 유닛을 쓰러뜨리면 공격 +1"); const a0 = CARDS["UN-G1-7"].a; resetTurn(l); ok(l.t.a === a0 + 1, "전리품: 다음 턴에도 +1 남음");`);
T('폭풍의 눈 회피', `let heads = 0, good = 0; for (let s = 1; s <= 30; s++) { const P = [side(0, ["B1-34", "B1-34", "B1-34"]), side(1, ["UN-A3"])]; const L = logs(fight(P, 0, 2, s));
    const h = /\\[폭풍의 눈\\][^\\n]*앞면/.test(L), m = (L.match(/빗나갔다/g) || []).length; if (h) heads++; if (h ? m === 1 : m === 0) good++; }
  ok(heads > 5 && heads < 30 && good === 30, "폭풍의 눈: 전투 시작 코인 앞면이면 이 유닛을 친 첫 공격 하나만 빗나가고, 뒷면이면 빗나감 없음 (앞면 " + heads + "/30 · 맞음 " + good + "/30)");`);
// 9 다시 자라는 뿌리
T('다시 자라는 뿌리', `const r = mk("UN-G2"); r.t.h = 1; const P = [side(0, ["B1-34"]), side(1, [r])]; fight(P, 0, 2);
  ok(!!findId(P[1], "TK-U-ROOT") && !P[1].burn.includes("UN-G2"), "뿌리: 쓰러지면 뿌리가 남음");
  next(P); P[0].field = [null, null, null, null, null]; const X = fight(P, 1, 3); const b = findId(P[1], "UN-G2");
  ok(!!b && b.t.keep.rooted && !findId(P[1], "TK-U-ROOT"), "뿌리: 다음 턴 되살아남");`);
// 10 씨앗
T('씨앗', `const s = mk("UN-G2-7"); const P = [side(0, [s]), side(1, [])]; fight(P, 1, 2);
  ok(!!findId(P[0], "TK-U-SAPLING"), "씨앗: 전투가 끝나면 묘목");
  next(P); fight(P, 1, 3); ok(!!findId(P[0], "TK-U-TREE"), "씨앗: 한 턴 지난 묘목은 어린 고목");`);
// 11 돌아오는 물결
T('돌아오는 물결', `const mkP = sp => { const t = mk("UN-G3"); const P = [side(0, []), side(1, sp.concat([t]))]; P[1].burn = ["G3-01", "G3-08", "G3-19"]; P[1].fell = ["G3-08", "G3-01"]; return P; };
  let P = mkP(["MB-01", "MB-01"]); const X = fight(P, 1, 2);
  ok(/발동/.test(logs(X)) && JSON.stringify(P[1].back) === '["G3-01"]' && !P[1].burn.includes("G3-01") && P[1].burn.includes("G3-08"), "물결: 마법 발동 때 가장 최근 쓰러진 유닛 1장만 핸드로(턴에 한 번) " + JSON.stringify(P[1].back));
  P = mkP([]); fight(P, 1, 2); ok(!(P[1].back || []).length, "물결: 마법이 없으면 발동하지 않음");
  P = mkP(["MB-01"]); P[1].fell = []; fight(P, 1, 2); ok(!(P[1].back || []).length && ["G3-01", "G3-08", "G3-19"].every(id => P[1].burn.includes(id)), "물결: 쓰러지지 않고 소각장에 간 카드(결정화 등)는 가져오지 않음");
  const v = mk("G3-01"); v.t.h = 1; P = [side(0, ["A1-30"]), side(1, [v, mk("UN-G3")])]; fight(P, 0, 2); ok(P[1].burn.includes("G3-01") && (P[1].fell || []).includes("G3-01"), "물결: 쓰러진 유닛은 소각장으로(기록에 남음)");`);
// 12 세이렌의 노래
T('세이렌', `const s = mk("UN-G3-7"); const v = mk("B1-04"); const P = [side(0, [s]), side(1, [v])]; fight(P, 0, 2);
  ok(P[0].field.includes(v) && v.t.alive && v.from === 1 && s.t.keep.sang, "세이렌: 쓰러질 상대 유닛이 내 편으로");`);
// 13 계약의 낙인
T('낙인', `const b = mk("UN-A1"); const v = mk("G2-36"); const P = [side(0, [b]), side(1, [v])]; fight(P, 0, 2);
  ok(v.t.keep.brand && uUpkeepOf(v) === (CARDS["G2-36"].up || 0) + 1, "낙인: 유지비 +1");`);
// 14 영혼 강탈
T('영혼 강탈', `let s = mk("UN-A1-7"); let P = [side(0, [s]), side(1, ["B1-04", "B1-03"])]; fight(P, 0, 2);
  ok(!(P[0].gain || []).length && P[1].burn.includes("B1-04"), "영혼 강탈: 공격으로 쓰러뜨린 카드는 소각장으로 " + JSON.stringify(P[0].gain));
  s = mk("UN-A1-7"); s.t.h = 20; P = [side(0, ["B1-04", "B1-03"]), side(1, [s])]; fight(P, 0, 2);
  ok((P[1].gain || []).length === 1 && !P[0].burn.includes(P[1].gain[0]), "영혼 강탈: 반격으로 쓰러뜨린 카드가 턴에 한 장 핸드로 " + JSON.stringify(P[1].gain) + " " + JSON.stringify(P[0].burn));
  next(P); s.t.h = 20; P[0].field = [mk("B1-04"), null, null, null, null]; fight(P, 0, 3);
  ok((P[1].gain || []).length === 2, "영혼 강탈: 다음 턴에 다시 " + JSON.stringify(P[1].gain));`);
// 15 날개 그늘
T('날개 그늘', `const w = mk("UN-A2"); const v = mk("A2-01"); const P = [side(0, ["A1-30"]), side(1, [v, w])]; P[1].light = 30; const X = fight(P, 0, 2);
  ok(/날개 그늘/.test(logs(X)) && P[1].field.includes(v) && P[1].light < 30, "날개 그늘: 앞 유닛이 쓰러질 공격 피해를 새벽빛으로 줄임 " + P[1].light);`);
T('날개 그늘 · 새벽빛 없음', `const w = mk("UN-A2"); const v = mk("B1-04"); v.t.h = 1; const P = [side(0, ["A1-30"]), side(1, [v, w])]; P[1].light = 0; const X = fight(P, 0, 2);
  ok(!/날개 그늘/.test(logs(X)) && !P[1].field.includes(v), "날개 그늘: 새벽빛이 없으면 발동 안 함");`);
T('날개 그늘 · 맨 앞이 날개면 안 지킴', `const w = mk("UN-A2"); w.t.h = 1; const P = [side(0, ["A1-30"]), side(1, [w, mk("B1-04")])]; P[1].light = 30; const X = fight(P, 0, 2);
  ok(!/날개 그늘/.test(logs(X)) && P[1].light === 30, "날개 그늘: 제 뒤 유닛 · 자신은 지키지 않음");`);
// 16 새벽의 부활
T('새벽의 부활', `const d = mk("UN-A2-7"); d.t.h = 1; const P = [side(0, ["A1-30"]), side(1, [d])]; const hi = CARDS["A2-01"].lv > CARDS["A2-21"].lv ? "A2-01" : "A2-21", lo = hi === "A2-01" ? "A2-21" : "A2-01"; P[1].burn = [hi, lo, "MB-01"]; P[1].fell = [hi, lo]; fight(P, 0, 2);
  ok(!!findId(P[1], hi) && !P[1].burn.includes(hi) && P[1].burn.includes(lo) && P[1].burn.includes("UN-A2-7") && !findId(P[1], "UN-A2-7"), "새벽의 부활: 쓰러지면 쓰러진 유닛 중 가장 높은 레벨이 되살아남 " + JSON.stringify(P[1].burn));`);
T('새벽의 부활 · 쓰러진 유닛만', `const d = mk("UN-A2-7"); d.t.h = 1; const P = [side(0, ["A1-30"]), side(1, [d])]; P[1].burn = ["UN-A2", "A2-21"]; P[1].fell = ["A2-21"]; fight(P, 0, 2);
  ok(CARDS["UN-A2"].lv > CARDS["A2-21"].lv && !!findId(P[1], "A2-21") && P[1].burn.includes("UN-A2"), "새벽의 부활: 결정화 등으로 간 더 높은 유닛은 고르지 않음 " + JSON.stringify(P[1].burn));`);
T('새벽의 부활 · 살아 있으면 없음', `const d = mk("UN-A2-7"); const P = [side(0, []), side(1, [d])]; P[1].burn = ["A2-21"]; fight(P, 0, 2);
  ok(P[1].burn.includes("A2-21") && !findId(P[1], "A2-21"), "새벽의 부활: 살아 있으면 발동 안 함");`);
// 17 폭풍의 눈
T('폭풍의 눈', `let heads = 0, good = 0; for (let s = 1; s <= 40; s++) { const P = [side(0, ["MB-01"]), side(1, ["UN-A3", "A3-01"])]; const L = logs(fight(P, 0, 2, s));
    const h = /\\[폭풍의 눈\\][^\\n]*앞면/.test(L); if (h) heads++; if (h === /마법이 [^\\n]*빗나갔다/.test(L)) good++; }
  ok(heads > 5 && heads < 40 && good === 40, "폭풍의 눈: 전투 시작 코인 앞면이면 상대 마법이 빗나가고, 뒷면이면 맞는다 (앞면 " + heads + "/40 · 맞음 " + good + "/40)");`);
// 18 마력 흡수
T('마력 흡수', `const a = mk("UN-A3-7"); const P = [side(0, ["MB-01"]), side(1, [a])]; fight(P, 0, 2);
  ok(a.t.keep.mana === 1, "마력 흡수: 상대 마법마다 마력 1");`);

// 실제 대전: 깃발마다 유니크 2장을 넣은 덱으로 (유니크가 판에 나오도록 일반 유닛 2장과 바꿈)
(async () => {
  let games = 0, errs = 0; const fired = {};
  const KO = ev('Object.fromEntries(Object.entries(UNIQUE_ABIL).map(([k, v]) => [k, v.n]))');
  for (const g of ev('GROUP_IDS')) {
    const deck = ev(`Object.assign({}, STARTER_DECKS["${g}"])`);
    const ups = ev(`UNIQUE_UNITS.filter(u => u.g === "${g}").map(u => u.id)`);
    for (const id of ups) { const v = Object.keys(deck).filter(x => ev(`CARDS["${x}"].type`) === 'unit' && !ev(`CARDS["${x}"].limit`)).sort((a, b) => deck[b] - deck[a])[0]; deck[v]--; if (!deck[v]) delete deck[v]; deck[id] = 1; }
    for (let s = 0; s < 10; s++) {
      ctx.seed(900 + s + g.charCodeAt(1));
      try {
        const opp = ['G1', 'B2', 'A1'][s % 3];
        const gm = await ctx.playHeadless({ p0: { name: 'A', group: g, cards: deck, isAI: true, ai: 'normal' }, p1: { name: 'B', group: opp, cards: ev(`STARTER_DECKS["${opp}"]`), isAI: true, ai: 'normal' } });
        games++; if (gm.winner == null) errs++;
        const L = gm.log.map(l => l.text).join('\n');
        for (const k in KO) if (L.includes('[' + KO[k] + ']') || (k === 'timebomb' && L.includes('화약통'))) fired[k] = (fired[k] || 0) + 1;
      } catch (e) { errs++; console.log('   대전 오류', g, e.stack.split('\n').slice(0, 3).join(' | ')); }
    }
  }
  ok(errs === 0 && games === 90, `유니크 덱으로 실제 대전 ${games}판 오류 없음`);
  console.log('   대전 로그에 나온 능력:', Object.keys(KO).map(k => KO[k] + ' ' + (fired[k] || 0)).join(' · '));
  console.log(fail ? `실패 ${fail} / ${n}` : `모두 통과 (${n}개)`);
  process.exit(fail ? 1 : 0);
})();
