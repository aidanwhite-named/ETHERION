전장 그림의 원본 (v3.9.14, 스타일 가이드 0.1 · 6.6)
그리는 스크립트는 SVG를 만들고, render.js(Playwright)가 PNG/JPG로 굽는다. 이 폴더에서 실행:
  node cardback.js → card_back.svg   → node render.js card_back.svg ../deck/card_back.png 2
  node heart.js    → heart_glass/blood/top.svg → node render.js heart_glass.svg ../life/heart_glass.png 10 (blood · top도 같게)
  node battlebg.js → battle_bg.svg  → node render.js battle_bg.svg ../battle/battle_bg.jpg 1 jpg
  성화대: ../pyre/pyre.svg를 pyre_render.js로(층마다 back · fire · front)
그림을 이미지 생성 AI나 VectorCraft 그림으로 바꿔도 된다. 크기 · 비율 · 층 나눔만 같으면 코드는 그대로.
에테르 제단(../ether/ether_back.png · ether_front.png)은 v3.10.2부터 그리는 스크립트가 없다 — 자유 그림을 넣고, 결정 · 정수 자리는 js/game.js ETHER_SLOTS에서 맞춘다.
