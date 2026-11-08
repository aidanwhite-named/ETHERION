# 덱 밸런스 도구 (Node.js 필요, 설치할 패키지 없음)

게임 파일(`js/`)을 그대로 불러와 화면 없이 컴퓨터끼리 대전시킵니다.

- `node tools/balance/rr.js js 50` — 9개 단체 기본 덱 라운드 로빈. 단체 쌍마다 50판(선·후공 바꿔 100판)을 돌리고 승률 표를 찍습니다. 2코어에서 50판이면 1분쯤.
- `node tools/balance/opt.js js 20 12 G2` — 덱 다듬기. 고목 수호회(G2) 덱의 카드를 한 장씩 바꿔 보고 같은 시드로 더 많이 이기면 남깁니다(20번 시도, 상대마다 12시드). 결과는 지금 폴더의 `decks.json`. 마음에 들면 `js/decks.js`에 옮깁니다.
- `node tools/balance/vs.js js 5` — 컴퓨터 난이도 비교(v3.16). 9 × 9 단체 쌍마다 5판씩 선·후공 바꿔(810판) 어려움이 보통을 몇 % 이기는지. 뒤 인자로 A난이도 · B난이도 · 단체(`hard normal B1,G2`), 환경 변수 `HARD='{"look2":0.6}'`로 `js/aihard.js`의 수치를 바꿔 보고, `SEED=`로 씨앗 묶음을 바꾼다. 같은 씨앗끼리만 비교한다.
- `node tools/balance/harddeck.js B1,G2 140 14` — 컴퓨터 '어려움'의 정예 덱 다듬기(v3.19.3). 단체의 모든 카드(레어 · 에픽 · 유니크 · 스페셜 포함)로 한 장씩 바꿔 9단체 기본 덱 상대로 더 이기고 새 시드로도 이기면 남긴다. 결과는 지금 폴더 `hard.json` → `js/decks.js` `HARD_DECK_LISTS`. `node tools/balance/harddeck_check.js B1,G2 4` — 어려움 컴퓨터가 몰 때 기본 덱 vs 정예 덱(`hard.json`이 없으면 `HARD_DECK_LISTS`).
- `harness.js` 게임 스크립트를 화면 없이 불러오는 부분, `pool.js` 여러 코어로 나눠 돌리는 부분.

v0.3 밸런스는 이 도구로 맞췄습니다 (README의 밸런스 표).
