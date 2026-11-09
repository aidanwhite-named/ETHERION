# 레어 · 에픽 · 유니크 추가 카드 도구 (v3.18)

카드는 `js/highcards.js`, 설명과 잰 값은 `docs/HIGHCARDS_v3.18.md`.

```
# 1. 카드 대전 시뮬레이터로 새 카드의 대전 값 (카드마다 상대 1곳당 120판)
node tools/cardsim/cardsim.js --cards EP-B1-1,IR-B1,US-B1-1 --games 120 --base 240 --out tools/highcards/out/sim
node tools/highcards/analyze.js tools/highcards/out/sim/result_1of1.json tools/highcards/out/unique_unit_values.json

# 2. 유니크 마법: 섬멸전 실험실 (같은 레벨 기존 마법과 비교한 순위 · z). 2코어에서 2분쯤
node tools/highcards/lab.js 1500
```

- `analyze.js`의 둘째 인자는 `tools/cardsim/out_v15/cards.csv`에 없는 카드(v3.2 유니크 유닛 등)의 값을 덧씌우는 json. 덱에서 뺀 카드가 그런 카드일 때 쓴다.
- `out/`: `sim*_values.json`(측정마다 풀어 낸 값), `lab_final.*`(마지막 실험실), `unique_unit_values.json`(v3.2 유니크 유닛 1장 값을 2장으로 적은 것).

## v3.24 레어 마법 실험실 (`lab_rare.js`)
```
# 레어 마법(RS-)을 같은 레벨 일반 · 고급 마법(뺀 카드 · 유니크 · 역전 · 계략 제외)과 견준다. 같은 레벨 유니크 값도 보인다
node tools/highcards/lab_rare.js 2000                  # 27장 모두
node tools/highcards/lab_rare.js 2000 RS-B1-1,RS-G2-3  # 몇 장만
SEED=777 node tools/highcards/lab_rare.js 2000         # 다른 판 묶음으로 다시
node tools/highcards/lab_rare.js 2000 --base           # 기존 마법 값을 다시 잰다(카드를 고친 뒤)
```
- 기존 마법 값은 `out/rare_base_<판 수>[_s<시드>].json`에 남겨 다음부터는 새 마법만 잰다(2코어에서 처음 2분, 그 뒤 몇 초). 결과 `out/lab_rare*.json`.
- 카드 목표와 잰 값은 `docs/RARESPELLS_v3.24.md`.
