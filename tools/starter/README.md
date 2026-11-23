# 기본 덱 도구 (2026-11-23)

기본 덱 규칙과 승률 재기. 규칙 · 결과는 `docs/STARTER_DECKS.md`.

- `rules.js` — 규칙 검사 `check(g, deck)`(바닐라 유닛 · 마법 13~17 + 레어 1 · 아이템 2 · 50장 · 레벨 곡선)
- `rr.js decks.json|old [판 수] [이름]` — 9깃발 리그전(보통 컴퓨터, 쌍마다 판 수, `SEED=`로 씨앗)
- `probe.js decks.json 깃발 '[["이름",{"del":{},"add":{}}],…]'` — 바꿔 본 덱들의 승률을 같은 씨앗으로 견줌
- `put.js decks.json 깃발 '{"del":{},"add":{}}'` — 바꾼 것을 json에 씀(규칙 검사)
- `opt.js in.json out.json 회차 시도` — 50%로 모으는 언덕 오르기(느림, 1회차 약 1시간)
- `apply.js decks.json` — `js/decks.js` `DECK_LISTS` 장수만 바꿈
- `decks.json` — 지금 기본 덱
