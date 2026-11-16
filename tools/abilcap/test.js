// node tools/abilcap/test.js — v3.84 유닛 특수능력 상한 3개 · 같은 능력은 칸마다 따로 (js/cards.js ABIL_CAP · engine itemKept / abilPieces)
const path = require('path'); const { load } = require('../balance/harness');
const c = load(path.join(__dirname, '../../js'));
let fails = 0, n = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.log('✗ ' + msg); } else console.log('✓ ' + msg); };
c.ev(`var TU=8e6;
function mk(o){ o=typeof o==='string'?{id:o}:o; return {uid:++TU,id:o.id,item:o.item?{id:o.item,coins:[]}:null}; }
function side(idx, ids){ const f=ids.map(x=>x?mk(x):null); return {idx,name:'P'+idx,life:40,crystals:[],burn:[],reload:0,bonus:0,field:f.concat(Array(RULES.slots-f.length).fill(null))}; }
function prep(P){ for(const p of P) for(const it of p.field) if(it&&isUnit(it)) resetTurn(it); }
this.side=side; this.prep=prep; this.mk=mk;`);
const ab = (id, item) => c.ev(`abilOf(${JSON.stringify({ id, item: item ? { id: item, coins: [] } : null, t: null })})`);
const slots = (id, item) => c.ev(`(()=>{const s=unitAbilSlots(CARDS[${JSON.stringify(id)}], ${item ? `CARDS[${JSON.stringify(item)}].item` : 'null'}); return {own:s.own.map(x=>x.raw),keep:s.keep.map(x=>x.raw),cut:s.cut.map(x=>x.raw)};})()`);

// 1. 칸 세기
ok(c.ev('ABIL_CAP') === 3, '상한 3');
{ const s = slots('SP-A3', 'SR-G1'); ok(s.own.length === 3 && !s.keep.length && s.cut.join() === '[포식],[관통]', '별을 푼 이사크(3칸) + 아이템 → 아이템 능력 모두 잘림 ' + JSON.stringify(s)); }
{ const a0 = ab('SP-A3'), a1 = ab('SP-A3', 'SR-G1'); ok(!a1.devour && !a1.shred && a1.snipe === a0.snipe && a1.magic, '이사크: 능력은 그대로(포식 · 관통 없음)'); }
{ const s = slots('PN-G2-E', 'SR-G2'); ok(s.keep.join() === '[뿌리 흡수]' && s.cut.join() === '[가시 2]', '2칸 유닛 + 2칸 아이템 → 앞 능력만 ' + JSON.stringify(s)); }
{ const a = ab('PN-G2-E', 'SR-G2'); ok(a.drain && a.thorns === 2, '이끼뿔 사슴: 뿌리 흡수 붙음 · 가시는 자기 2만 (' + a.thorns + ')'); }
{ const s = slots('G2-04', 'IG2-1'); ok(s.own.join() === '[가시 1]' && s.keep.join() === '[가시 1]', '같은 능력도 두 칸 ' + JSON.stringify(s)); }
{ const s = slots('G2-01', 'SR-G2'); ok(s.keep.length === 2 && !s.cut.length, '능력 없는 유닛은 아이템 2칸 모두'); }
{ const s = slots('PN-G2-U2', 'IG2-1'); ok(s.own.join() === '[가시 1]' && s.keep.length === 1, '표시(고정 · 버팀)는 칸으로 세지 않음 ' + JSON.stringify(s)); }
// 투척도 칸 안에서만
{ const it = c.ev('Object.values(CARDS).find(x=>x.type==="item"&&x.item.throw&&!x.item.every)'); if (it) { const s = slots('SP-A3', it.id); ok(s.cut.some(r => /투척/.test(r)) && !c.ev(`itemKept({id:"SP-A3",item:{id:"${it.id}"}}).throw`), '이사크에게 [투척] 아이템 → 투척 잘림 (' + it.id + ')'); } }

// 2. 가시 [1][1]: 피해 1이 두 번
{ const P = [c.side(0, ['G2-01']), c.side(1, [{ id: 'G2-04', item: 'IG2-1' }])]; c.prep(P);
  const d = P[1].field[0], a = P[0].field[0];
  ok(d.t.thorns === 2 && JSON.stringify(c.ev('fitPieces')(d.t.thornsP, d.t.thorns)) === '[1,1]', '가시 칸 [1,1] (합 2)');
  const X = c.ev('ctx')(P, 0, 1, []); a.t.h = 30; a.t.d = 0; a.t.noCoin = true; d.t.noCoin = true; d.t.h = 30; d.t.d = 0; d.t.ward = 0;
  const h0 = a.t.dmg; c.ev('attackOne')(X, a);
  const th = X.rec.flatMap(r => r.floats).filter(f => f[0] === a.uid && /^가시/.test(f[1]));
  ok(th.length === 2 && th.every(f => /−1$/.test(f[1])), '가시 피해 숫자가 두 번 −1 ' + JSON.stringify(th.map(f => f[1])));
  const fr = X.rec.map(r => r.floats.filter(f => f[0] === a.uid && /^가시/.test(f[1])).length);
  ok(fr.filter(x => x).length === 2, '가시 두 번은 다른 수(차례로 보임) ' + JSON.stringify(fr)); }
// 가시 한 칸이면 예전과 같은 한 번
{ const P = [c.side(0, ['G2-01']), c.side(1, ['IG2-4' && 'G2-01'])]; P[1].field[0].item = { id: 'IG2-4', coins: [] }; c.prep(P);
  const d = P[1].field[0], a = P[0].field[0]; const X = c.ev('ctx')(P, 0, 1, []); a.t.h = 30; d.t.h = 30; a.t.noCoin = d.t.noCoin = true; d.t.ward = 0;
  c.ev('attackOne')(X, a); const th = X.rec.flatMap(r => r.floats).filter(f => f[0] === a.uid && /^가시/.test(f[1]));
  ok(th.length === 1 && /−2$/.test(th[0][1]), '[가시 2] 한 칸은 한 번 −2 ' + JSON.stringify(th.map(f => f[1]))); }

// 3. 가호 [1][1]: 첫 피해를 1 줄이고 곧바로 또 1
{ const wu = c.ev('Object.keys(CARDS).find(id=>CARDS[id].type==="unit"&&CARDS[id].gift&&abilSlotsOf(CARDS[id].gift).length===1&&CARDS[id].gift.ward===1)');
  const P = [c.side(0, ['G2-01']), c.side(1, [{ id: wu, item: 'S2-1' }])]; c.prep(P);
  const u = P[1].field[0]; u.t.h = 30;
  ok(u.t.ward === 2 && JSON.stringify(c.ev('fitPieces')(u.t.wardP, u.t.ward)) === '[1,1]', '가호 칸 [1,1] (' + wu + ')');
  const X = c.ev('ctx')(P, 0, 1, []); const got = c.ev('hurt')(X, u, 5);
  const fl = X.rec.flatMap(r => r.floats).concat(X.floats).filter(f => f[0] === u.uid).map(f => f[1]);
  ok(got === 3 && u.t.dmg === 3, '피해 5 − 가호 1 − 가호 1 = 3 (' + got + ')');
  ok(fl.filter(x => x === '가호 −1').length === 2 && X.rec.length >= 2, '"가호 −1"이 두 번, 수마다 ' + JSON.stringify(fl));
  const got2 = c.ev('hurt')(X, u, 2); ok(got2 === 2, '가호는 첫 피해에만 (' + got2 + ')'); }
{ const P = [c.side(0, ['G2-01']), c.side(1, [{ id: 'G2-01', item: 'S2-1' }])]; c.prep(P); const u = P[1].field[0]; u.t.h = 30;
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('hurt')(X, u, 1); ok(X.rec.length === 0 && X.floats.some(f => f[1] === '가호'), '가호 한 칸은 예전과 같음'); }

// 4. 사격 [1][1]: 두 발, 첫 발에 쓰러지면 다음 유닛
{ const P = [c.side(0, [{ id: 'EP-A3-1', item: 'IA3-1' }]), c.side(1, ['G2-01', 'G2-01'])]; c.prep(P);
  const s = P[0].field[0], f1 = P[1].field[0], f2 = P[1].field[1];
  ok(c.ev('abilOf')(s).snipe === 2 && JSON.stringify(c.ev('abilPieces')(s, 'snipe')) === '[1,1]', '사격 칸 [1,1]');
  f1.t.dmg = f1.t.h - 1; f2.t.dmg = f2.t.h - 2;   // 앞 유닛 남은 체력 1 · 뒤 유닛 2
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('snipeOne')(X, s);
  ok(!f1.t.alive && f2.t.dmg === f2.t.h - 1, '첫 발이 남은 체력 1을 쓰러뜨리고 둘째 발은 다음 유닛 (' + f1.t.alive + ', 남은 ' + (f2.t.h - f2.t.dmg) + ')');
  const shots = X.rec.filter(r => r.fx.sn && !r.fx.hit).length; ok(shots === 2, '쏘는 연출 두 번 (' + shots + ')'); }
{ const P = [c.side(0, ['EP-A3-3']), c.side(1, ['G2-01', 'G2-01'])]; c.prep(P); const s = P[0].field[0];
  const X = c.ev('ctx')(P, 0, 1, []); c.ev('snipeOne')(X, s); ok(X.rec.filter(r => r.fx.sn && !r.fx.hit).length === 1, '[사격 2] 한 칸은 한 발'); }

console.log(`${n - fails}/${n} 통과`);
process.exit(fails ? 1 : 0);
