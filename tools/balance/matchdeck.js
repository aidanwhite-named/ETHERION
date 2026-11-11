// 컴퓨터 맞춤 덱(js/aideck.js, v3.24.4) 확인.
// node tools/balance/matchdeck.js build                      — 깃발 × 비율마다 덱을 꾸려 점수가 맞는지 · 규칙을 지키는지 · 걸린 시간
// node tools/balance/matchdeck.js play <비율들 0.85,1,1.15> <비율마다 판 수> [씨앗]  — 그 비율로 꾸민 덱 vs 9깃발 기본 덱(둘 다 어려움 컴퓨터) 승률
const fs = require('fs'), path = require('path'); const { load } = require('./harness');
const dir = path.join(__dirname, '../../js');
const ctx = load(dir, fs.readFileSync(path.join(dir, 'grades.js'), 'utf8') + '\n' + fs.readFileSync(path.join(dir, 'aideck.js'), 'utf8'));
const GS = ['B1', 'B2', 'B3', 'G1', 'G2', 'G3', 'A1', 'A2', 'A3'];
(async () => {
  if ((process.argv[2] || 'build') === 'build') {
    const RS = [0.7, 0.85, 0.95, 1, 1.05, 1.12, 1.25, 1.4, 1.6];
    console.log('목표 비율 → 꾸민 덱의 실제 비율 (깃발마다 30번, 평균 · 가장 벗어난 값)');
    let bad = 0, n = 0; const t0 = process.hrtime.bigint();
    for (const g of GS) {
      const st = ctx.ev(`deckScore(STARTER_DECKS["${g}"]).total`); const row = [];
      for (const r of RS) {
        let s = 0, worst = 0;
        for (let i = 0; i < 30; i++) {
          const d = ctx.ev(`aiDeckBuild("${g}", ${Math.round(st * r)}, mulberry32(${1000 + i}))`); n++;
          const cnt = Object.values(d.cards).reduce((a, b) => a + b, 0);
          const ok = cnt === 40 && Object.keys(d.cards).every(id => ctx.ev(`CARDS["${id}"] && CARDS["${id}"].group === "${g}" && ${d.cards[id]} <= maxCopiesOf("${id}")`)) && ctx.ev(`deckScore(${JSON.stringify(d.cards)}).total`) === d.score;
          if (!ok) bad++;
          s += d.score / st; if (Math.abs(d.score / st - r) > Math.abs(worst - r) || i === 0) worst = d.score / st;
        }
        row.push(`${r.toFixed(2)}→${(s / 30).toFixed(2)}(${worst.toFixed(2)})`);
      }
      console.log(`  ${g} 기본 ${st}: ` + row.join('  '));
    }
    console.log(`규칙 어김 ${bad} / ${n}덱 · 덱 하나에 ${(Number(process.hrtime.bigint() - t0) / 1e6 / n).toFixed(2)}ms (점검 포함)`);
    const t1 = process.hrtime.bigint(); ctx.ev(`for (let i = 0; i < 500; i++) aiDeckBuild(GROUP_IDS[i % 9], Math.round(deckScore(STARTER_DECKS[GROUP_IDS[i % 9]]).total * (0.85 + (i % 7) * 0.08)), mulberry32(i))`);
    console.log(`꾸미기만: 덱 하나에 ${(Number(process.hrtime.bigint() - t1) / 1e6 / 500).toFixed(2)}ms`);
    return;
  }
  const RS = (process.argv[3] || '0.85,1,1.15').split(',').map(Number), N = +process.argv[4] || 18, base = +process.argv[5] || 7000;
  for (const r of RS) {
    let w = 0, sc = 0; const t0 = Date.now();
    for (let i = 0; i < N; i++) {
      ctx.seed(base + i); const a = GS[i % 9], b = GS[(i * 2 + Math.floor(i / 9) + 1) % 9], swap = i % 2 === 1;
      const d = ctx.ev(`aiDeckBuild("${a}", Math.round(deckScore(STARTER_DECKS["${a}"]).total * ${r}), mulberry32(${base + i}))`);
      sc += d.score / ctx.ev(`deckScore(STARTER_DECKS["${a}"]).total`);
      const pa = { name: 'A', group: a, cards: d.cards, isAI: true, ai: 'hard' }, pb = { name: 'B', group: b, cards: ctx.ev(`STARTER_DECKS["${b}"]`), isAI: true, ai: 'hard' };
      const g = await ctx.playHeadless(swap ? { p0: pb, p1: pa } : { p0: pa, p1: pb });
      if (g.winner === (swap ? 1 : 0)) w++;
    }
    const p = w / N, se = Math.sqrt(p * (1 - p) / N);
    console.log(`비율 ${r.toFixed(2)} (실제 ${(sc / N).toFixed(2)}) 덱 vs 기본 덱: ${(p * 100).toFixed(0)}% ± ${(se * 196).toFixed(0)} (${w}/${N}) · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
})();
