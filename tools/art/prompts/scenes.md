# 메뉴 화면 배경 · 배경의 세 존재 — 그림 프롬프트 (게임 v3.45, 세 존재 v3.55.4 고침)

GPT(이미지) · Gemini에 그대로 붙여 넣는 프롬프트 두 장이다. 서사는 `docs/WORLD.md`(0 · 2 · 4 · 10장), 그림 규칙은 `docs/STYLE_GUIDE.md`(0 · 2.10 · 2.17 · 6.3 · 6.4 · 6.6)를 따른다.

- **지금 게임**: 메뉴 화면(대기실 · 상점 · 교역소 · 덱 조정실 · 원정 · 순례 · 관리자 · 입장 관문)은 임시로 **타이틀 그림**(`img/title/title_art.jpg`)을 어둡게 덮어 깐다(`css/menu-art.css`). 움직이던 별 하늘과 3D 세 존재(`js/titans.js`)는 PC · 폰 모두 끄고 있다.
- **두 장의 관계**: 1번(메뉴 배경)은 땅과 하늘만, 2번(세 존재)은 그 위에 겹치는 층이다. 그래서 **1번에는 거인 · 신 · 용의 모습을 그리지 않는다.** 두 장을 하나로 받고 싶으면 1번 프롬프트 끝의 "한 장으로 받을 때" 문장을 붙인다.
- 받은 그림을 넣는 법: 아래 파일 이름으로 저장하고 Claude에게 "메뉴 배경(세 존재) 그림 넣어 줘"라고 하면 된다. 코드는 `js/screens.js`의 `MENU_ART` 한 줄(1번), 세 존재 층(2번)은 새로 얹는다.

---

## 1. 메뉴 화면 배경 — `img/ui/menu/menu_bg.jpg`

### 무엇을 그리나 (서사)
- **린데어 자유시의 높은 테라스에서 밤에 내려다본 카일란.** 린데어는 남쪽 해안의 중립 도시로, 상인 평의회가 있고 성로의 중심 관문이 있다. 게임의 상점 · 교역소가 모두 "린데어"다. 모험가들이 모여 출정을 준비하는 곳이라 메뉴 화면 전체의 무대로 맞다.
- 남쪽 해안에서 북쪽 내륙을 바라본다. 그래서 **왼쪽 = 서쪽, 오른쪽 = 동쪽**이다. 2.10의 배치(왼쪽 거인 · 가운데 신 · 오른쪽 용)와 땅이 맞물린다.
  - 왼쪽(서): 잿빛 철골 산맥과 녹철 구릉. 아다만트의 용광로 · 갱도 불빛(구리빛)이 아주 작게 있고, 매연이 옅게 깔린다.
  - 가운데 먼 곳(북): 땅 가운데를 남북으로 달리는 산등성이(잠든 거인의 등뼈). 그 끝에 대륙 최고봉 왕좌봉이 하늘에 닿는다.
  - 오른쪽(동): 성좌 고원. 흰 성벽과 첨탑(새벽성 엘라드 · 벨루미르의 바늘)에 보랏빛 등불이 있다. 그 너머 먼 동쪽 끝은 색이 빠진 회색으로 흐려진다(빈 땅).
  - 아래 가까운 곳: 린데어의 지붕들, 등불 켠 광장, **성로 관문**(돌 아치 문, 안쪽에 하늘빛 에테르 막). 관문에서 금빛 등불 길(성로)이 내륙으로 뻗는다.
  - 하늘: 깊은 밤 남색, 별, 옅은 성운. 하늘 높이 **일곱 원소색 별이 고리를 이루고 동쪽 한 자리만 비어 있다**(칠룡의 고리를 별자리로). 아주 흐린 금빛 다섯 꼭짓점 별 후광이 하늘 가운데 높이 비친다(신의 기척, 모습은 없음).
- **가운데 60%는 어둡고 잔잔하게** 둔다. 메뉴 패널 · 카드 · 글자가 그 위에 올라간다(2.17 전장 배경과 같은 규칙). 밝은 것은 양옆과 위아래 가장자리에만 둔다.

### 크기
- **16:9 가로, 3840×2160**(4K). AI가 그 크기를 못 주면 가장 큰 16:9로 받는다. 폰 · 앱용 1920×1080(`menu_bg_m.jpg`)은 받은 뒤 줄여 만든다.

### 프롬프트 (영어 — 그대로 붙여 넣기)

```
Dark fantasy game menu background, painterly digital painting, cinematic and calm. Exactly 16:9 landscape, 3840x2160.

Scene: night view of a fantasy continent seen from a high stone terrace of Linder, a neutral free trade city on the southern coast, looking north inland. Low horizon, wide night sky.
- Foreground (bottom edge, dark silhouettes only): the stone balustrade and the edges of two arches of the terrace; below it, the rooftops of the city with small warm lanterns, a lantern-lit plaza, and a great stone archway gate whose inner surface glows with a thin sky-blue ether veil (#8fdcff). From the gate a road of tiny golden lights winds inland into the night.
- Left (west): grey iron mountains and copper-brown highlands with a few tiny forge and mine lights in copper orange (#d4893a) and thin drifting smoke.
- Center distance (north): a long mountain ridge running away from the viewer like a sleeping giant's spine, ending in one very tall peak touching the sky.
- Right (east): a plateau with white walls and needle-thin spires lit by small violet lamps (#a57ae6); far beyond, at the right edge, the land fades into colorless grey haze with faint cracks (the empty land).
- Sky: deep night blue (#07080d to #101830), many fine stars, a faint nebula. High in the sky, a ring of seven softly glowing stars in seven colors — earth #b88a5a, wind #9fe3d6, fire #ff6b3d, water #4fb3ff, forest #58b85f, metal #a9b4c2, lightning #ffd84a — with one empty place on its eastern side. Above the center, an extremely faint golden five-pointed star halo (#f6e2a8), like a presence without a body.

Composition: keep the central 60% of the image dark, low-contrast and quiet (menu panels and text will sit on top); put the brighter details toward the left and right edges and the bottom. No people, no giant, no god, no dragon figures.

Mood: night sky and golden runes, quiet anticipation before a journey. Palette: night blue #07080d, muted gold #d9b46a, ether sky-blue #8fdcff, with small accents of copper #d4893a, violet #a57ae6 and green #6fae55.

No text, no letters, no numbers, no logo, no title, no runes as writing, no UI frame, no border, no watermark, no signature. Not photorealistic, no bold cartoon outlines, no bright white background.
```

**한 장으로 받을 때**(세 존재까지 한 그림에) — 위 프롬프트의 `No people, no giant, no god, no dragon figures.`를 지우고 2번 프롬프트의 "Figures" 문단을 그 자리에 붙인다. 그러면 2번 층은 따로 만들지 않는다.

### 확인할 것 (받은 뒤)
- [ ] 글자 · 로고 · 숫자가 하나도 없다
- [ ] 가운데가 어둡다 — 패널을 올려도 글자가 읽힌다(게임에서는 위 .55 → 아래 .72로 더 어둡게 덮는다, `css/menu-art.css`)
- [ ] 왼쪽 구리빛(아다만트) · 오른쪽 보랏빛(비술) · 하늘의 일곱 별 고리(동쪽 빈 자리)가 보인다
- [ ] 거인 · 신 · 용의 모습이 없다(한 장으로 받기로 했으면 2.10 배치대로 있다)

---

## 2. 배경의 세 존재 — `img/ui/menu/titans.png`

> v3.55.7: 이 프롬프트로 받은 그림(`tools/art/out/raw/ui/menu/titans_net.png`, 4K)을 1번 위에 겹치지 않고 **메뉴 배경 한 장**(`img/ui/menu/menu_bg.jpg` · 폰 `menu_bg_m.jpg`)으로 쓴다. 예전 1번 그림은 `menu_bg_v1.jpg` 로 보관.

### 무엇을 그리나 (서사 · 2.10 표 그대로)
- 근원신 아르케가 에테르를 셋으로 나눠 빚은 **거인(몸) · 신(뜻) · 용(힘).** **셋은 동격이고 서로 싸우지 않는다** — 함께 세계를 이루는 말없는 균형으로 그린다. 대결 · 지배 다툼으로 그리지 않는다. 아르케는 모습으로 그리지 않는다.
- **배치는 고정**: 왼쪽 거인 · 가운데 뒤(높이) 신 · 오른쪽 용. 타이틀 그림 · 상단 문장과 같은 자리.
  - **거인(몸, 구리빛 #d4893a)**: 갑옷 없음. **산맥 그 자체만큼 거대한 원시의 거상** — 나이를 알 수 없는 바위 얼굴(수염 · 주름 · 늙은 왕의 모습 없음), 날카롭게 깎인 턱과 이마, 젊고 힘이 넘치는 어깨. 산맥에서 반쯤 일어난 몸으로, 허리 아래는 봉우리 절벽 사이로 사라지고 두 주먹으로 땅을 짚는다. 등뼈가 그대로 산맥이 되어 왼쪽 화면 밖으로 이어진다. **크기 비교**: 어깨에 구름이 걸리고, 주먹 옆 발치에 성채와 마을 불빛이 개미만 하게 보인다. 성탑처럼 각진 돌 관, 화로처럼 타는 눈. 갈라진 틈에 아다만트 광맥 세 빛(뼈 회색 #9ea3b3 · 검붉은 #b31a1f · 푸른 #61a8ff). 가슴께에 구리빛 심장불, 어깨 비탈에 지그재그 갱도 등불과 용광로 불 하나(아다만트가 거인의 몸을 캔다).
  - **신(뜻, 보라 #a57ae6 + 금 #f6e2a8)**: **거인 · 용과 같은 격의 거대한 존재** — 하늘에 떠서 화면 위쪽 1/3을 거의 채운다(머리에서 허리까지 화면 높이의 약 35%). 작거나 흐리게 그리지 않는다. 얼굴 없는 긴 옷, 두 팔을 벌려 뜻을 내린다. 머리 뒤 후광 고리 셋과 금빛 빛살 안에 다섯 꼭짓점 별(위가 꼭짓점, 보랏빛 선, 꼭짓점에 금빛 점) — 머리가 별 가운데에 온다. 몸을 비스듬히 감는 보랏빛 궤도 둘. 황금 갑옷 · 무기 없음. 옷자락은 아래로 갈수록 별빛 안개로 풀어진다.
  - **용(힘, 초록 #6fae55)**: 똬리 튼 긴 몸, 활짝 편 두 날개, 큰 머리는 가운데 쪽을 본다. 목덜미에 일곱 원소 보석이 머리 쪽부터 대지 · 바람 · 화염 · 물 · 숲 · 금속 · 번개 색 차례로 박혀 있다.
- 셋 모두 **어두운 몸에 가장자리 빛**(림 라이트), 발치는 어둠에 잠긴다. v3.55.4: 전에는 "글자보다 눈에 띄면 안 된다"로 너무 어둡고 작게 나왔다 — 이제는 또렷하고 웅장하게 그리고, 글자가 읽히게 하는 일은 게임의 어두운 막(`css/menu-art.css` `#menu-art.own::after`)이 맡는다.
- **가운데 아래(가로 가운데 40%, 세로 아래 55%)는 비워 둔다** — 메뉴 패널 자리. 신은 그 위, 화면 위쪽 1/3을 크게 채운다.

### 크기 · 바탕
- **16:9 가로, 3840×2160**. 1번 배경 위에 겹치는 층이다.
- **투명 바탕 PNG가 가장 좋다**(GPT 이미지는 투명 바탕을 고를 수 있다). 투명이 안 되면(Gemini 등) **완전한 검정 #000000 바탕**으로 받는다 — 게임이 검정을 투명으로 바꾸거나 밝게 합성(screen)해서 얹는다(전장 불꽃 층과 같은 방법, STYLE_GUIDE 6.7).

### 프롬프트 (영어 — 그대로 붙여 넣기)

```
Dark fantasy game background layer, painterly digital painting, epic and majestic. 4K UHD resolution: exactly 16:9 landscape, 3840x2160 pixels, highly detailed. Transparent background (if transparency is not possible: pure black #000000 background with nothing else in it — no sky, no stars, no ground).

Figures: three primordial colossal beings shaped from the world's ether, standing together in silent balance — equals, not fighting, not facing each other as enemies. Dark bodies with clear rim light, their feet and lower parts sinking into darkness.
- Left: a colossal primordial stone titan as vast as the mountain range itself, rising half out of it, no armor. Ageless, powerful, youthful build — a sharp, chiseled rock face with a strong jaw and brow; NO beard, no wrinkles, not an old man, not an old king. Below the waist he disappears between cliff peaks; both massive fists press on the ground. His spine continues as the mountain range running off the left edge; clouds drift around his shoulders and peaks rise on them. Show his immense scale: beside his fists, a fortress and a village of tiny lights look like ants. A crown of angular stone like a castle tower (nine stones of alternating height), eyes burning like furnaces. Cracks in his body glow with three ore veins: bone grey #9ea3b3, dark blood red #b31a1f, breath blue #61a8ff; a copper ember heart in his chest. On his left shoulder slope, a zigzag of nine tiny mine lanterns and one furnace fire. Rim light copper #d4893a.
- Center top: a colossal faceless god floating in the sky, as vast and majestic as the giant and the dragon — clearly visible, not small, not faint. From head to waist the god fills about 35% of the image height across the upper third. Long robes, both arms opened wide outward, granting will; the hem of the robes dissolves downward into starlit mist. Behind the head three halo rings and rotating golden rays, framing a five-pointed star (one point up, violet lines, golden dots at the points); the head sits in the star's empty center. Two violet orbits wrap diagonally around the body (upper solid, lower dotted). No golden armor, no weapon. Strong rim light violet #a57ae6 with gold #f6e2a8.
- Right: a long dragon coiled on itself with both wings spread wide, a large head turned toward the center. Along the nape of its neck, seven gemstones from head to tail: earth #b88a5a, wind #9fe3d6, fire #ff6b3d, water #4fb3ff, forest #58b85f, metal #a9b4c2, lightning #ffd84a. Rim light green #6fae55.

Composition: keep the lower central area (central 40% of the width, lower 55% of the height) empty — menu panels will sit there. The giant fills the left third, the dragon the right third, the god fills the upper center large and high. Three equal colossal presences, epic and awe-inspiring, with clear readable silhouettes and strong rim light; medium contrast (the game darkens the image behind text, so do not make it murky).

Mood: night sky and golden runes, ancient and solemn. No text, no letters, no numbers, no logo, no UI frame, no border, no watermark, no signature. Not photorealistic, no bold cartoon outlines, no golden armor, no battle.
```

### 확인할 것 (받은 뒤)
- [ ] 왼쪽 거인 · 가운데 위 신 · 오른쪽 용 — 자리가 맞다
- [ ] 셋이 싸우거나 서로 노려보지 않는다
- [ ] 가운데 아래가 비어 있다
- [ ] 바탕이 투명이거나 완전한 검정이다(별 · 땅 · 안개가 섞이면 겹쳤을 때 1번 배경을 가린다)
- [ ] 용 목덜미 보석 일곱의 차례, 신의 다섯 꼭짓점 별, 거인의 갑옷 없음
- [ ] 거인이 늙은 노인 · 수염 난 왕처럼 보이지 않고, 발치의 작은 성 · 마을로 산만 한 크기가 느껴진다
- [ ] 신이 작거나 흐리지 않고 위쪽 1/3을 크게 채운다(거인 · 용과 같은 격)
