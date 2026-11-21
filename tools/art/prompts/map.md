# 카일란 대륙 지도 — 새 지도 그림 프롬프트 (2판, 게임 v3.95 · 2026-11-21)

GPT(이미지) · Gemini에 그대로 붙여 넣는 프롬프트다. 서사는 `docs/WORLD.md` 10장, 그림 규칙은 `docs/STYLE_GUIDE.md` 0.2 · 5 · 5.6 · 6.6을 따른다.

- **2판은 땅 모양부터 새로 그린다(사용자 결정, 2026-11-21).** 1판(v3.43)은 코드가 그린 지도(`tools/art/ref/kailan_map_ref.jpg`)를 따라 그리게 했다. 2판은 참고 그림 없이 그림 AI가 대륙의 모양을 새로 잡고, **받은 그림에 맞춰 게임 좌표(`js/kailan.js`)를 옮긴다.**
- **그대로 두는 것 = 방위 관계.** 누가 어느 쪽에 있는지는 세계관(`docs/WORLD.md` 10장) · 연대기 · 소설에 적혀 있어 바꾸지 않는다 — 칠룡의 고리 여덟 방위(북 왕좌봉 · 북동 파편 군도 · 동 빈 땅 · 남동 화관 산맥 · 남 해구 · 남서 태고림 · 서 철골 산맥 · 북서 뇌명 고원), 가운데 남북으로 누운 오르둔(머리 왕좌봉 · 등뼈 · 서쪽 갈비 능선 · 동쪽 손바닥 = 성좌 고원), 진영의 땅(북서 거골 · 남서 용맥 · 동 신탁), 남쪽 해안의 린데어, 서쪽 안개 바다 · 남쪽 침몰해. 북쪽(동토)과 동쪽(빈 땅)은 바다가 아니라 땅이 화면 밖으로 이어진다.
- **새로 잡는 것 = 모양.** 해안선(만 · 곶 · 반도 · 섬), 산맥이 휘는 모양, 지역의 크기와 비율. 지금 지도는 땅이 화면을 네모나게 채우고 지역이 반듯한 칸으로 나뉘어 있다.
- **이 그림이 맡는 일**: 게임 지도(위쪽 띠의 "지도")와 순례 지도의 바탕. 지명 · 지점 표식 · 관문 · 용 · 칠룡의 고리 · 성로 · 진영 경계 · 나침반 · 축척 · 제목은 코드가 얹는다 — 그림에는 **글자와 지도 기호가 하나도 없어야 한다.**
- **그 밖에 1판과 달라진 것**
  - 진영 색을 네모난 색 면으로 칠하지 않는다 — 땅의 재질(구리빛 구릉 · 숲 지붕 · 보랏빛 고원)에서 색이 배어 나오고 경계는 자연스럽게 섞인다.
  - 산 · 숲을 도장 찍듯 늘어놓은 기호가 아니라 붓으로 그린 지형(능선 · 비탈 · 숲 지붕)으로. 카드 일러스트와 같은 회화풍.
  - 땅이 잠든 거인의 몸이라는 설정을 산의 모양에 살짝 담는다(알아보는 사람만 알아보게, 사람 모습은 그리지 않음).
  - **도시는 불빛으로만**(11곳, 화면 폭의 1%를 넘지 않는 점 무리). 좌표를 그림에 맞추므로 지점 표식이 그 불빛 위에 앉는다. 불빛을 빼고 싶으면 프롬프트의 `SETTLEMENTS` 문단을 지우고 `DO NOT PAINT` 맨 앞에 `cities, towns, lights,`를 넣는다.
  - 큰 밝은 면 금지 — 1판 그림은 북서쪽 동토가 하얗게 떠서 그 위의 지명이 안 읽혔다.

## 그림 AI에 함께 넣을 것
- **없다.** 옛 참고 그림(`kailan_map_ref.jpg`)이나 지금 바탕(`kailan_base.jpg`)을 넣으면 옛 땅 모양을 따라 그린다.

## 크기
- 비율 **정확히 4:3, 가로가 긴 그림**(지도 화면 · 순례 화면의 지도 칸이 4:3이다). **3840×2880(4K)** 권장, 최소 2400×1800. 4:3을 못 주는 AI면 가장 가까운 큰 그림으로 받는다(넣을 때 4:3으로 자른다 — 그 경우 양옆 가장자리에 중요한 것이 없는지 본다).
- 게임은 PC 2400×1800 · 폰 1600×1200으로 줄여 쓴다.

## 프롬프트 (영어 — 그대로 붙여 넣기)

```
Top-down fantasy world map painting of the continent of Kailan, for a dark-themed card game. This is the terrain layer of the in-game map: the game will later place its own labels, markers, roads and borders on top, fitted to whatever you paint. So design the land freely and make it beautiful, but keep every place below in its stated compass position, make each one clearly recognisable and distinct from its neighbours, and put no text and no map symbols in the picture.

FORMAT: exactly 4:3 landscape, 3840x2880. Straight top-down orthographic view, north is up. The map fills the frame edge to edge: no border, no paper edge, no frame, no cartouche.

DESIGN FREEDOM: you are designing the shape of this continent. Give it a memorable, natural silhouette: an irregular coastline with deep bays, headlands, a few peninsulas, river mouths and offshore islands; mountain ranges that curve and fork the way real ones do; regions of unequal size that flow into one another. Avoid a blocky land that simply fills the frame, straight coasts, evenly spaced features, regions laid out like rectangles, and symmetry.

FRAME RULES:
- Sea lies to the west and to the south only. The western ocean takes between a tenth and a fifth of the width, varying with the coast. The southern sea takes the bottom 12-18% of the height.
- To the north and to the east the land does not end in a coast: it runs off the top edge as frozen tundra, and off the right edge as a colourless dead land.
- Leave the sea plain and empty in the bottom-left and bottom-right corners (each about 22% of the width by 10% of the height); the game puts its title and compass there.
- Leave quiet, uncluttered ground around every feature so a label can sit beside it.

STYLE: an illuminated night atlas. A hand-painted relief map in the painterly style of dark fantasy card art, as if the continent were seen from very high above on a moonless night, lit only by its own faint ether. Terrain is painted as real relief with soft brushwork (ridgelines, slopes, forest canopy, dune ripples) under a gentle light from the upper left; stylised like a plate from an old atlas, not a satellite photo, and not flat icons or rows of stamped symbols. Deep night values everywhere: sea #04070d to #0d1a2c, land #14141a to #24221e. Colour arrives as muted, low-saturation glazes that melt into each other along irregular natural edges, never as flat coloured blocks. The coastline carries a thin pale ether-blue glow (#8fdcff) on the water side and a hairline of muted gold (#d9b46a) on the land side. Fine star-dust speckle on the sea only.

READABILITY: light-coloured labels will be laid over the whole map, so keep it calm. Dark and low-contrast overall; no large bright areas anywhere (snow, lightning, lava, city lights and the wall are thin accents, not floodlights); no busy detail in the open lowlands.

THE SLEEPING GIANT (subtle: suggest it, never illustrate it): a giant lies buried north to south through the middle of this continent. His head is the great peak in the north, his spine is the central mountain range, one rib is the ridge that branches west from it, and his open right hand is the plateau to the east. The western iron range is the forearm of another giant, with bare metal sinews. Someone who knows the legend may notice the anatomy in the shapes of the mountains. Nobody should see a figure, a face, fingers or a skeleton.

THE RING OF EIGHT: eight sites sit at the eight compass points around the centre of the land, roughly on one great oval that spans most of the continent. North: the great peak. North-east: the floating islands. East: the dead land (an empty place on the ring). South-east: the volcanic range. South: the sea trench. South-west: the old-growth forest range. West: the iron range. North-west: the lightning plateau. Keep them on that oval, each at its own compass point.

GEOGRAPHY (compass positions are fixed; exact shapes, sizes and curves are yours):

Centre
1. Central spine: one continuous range of high sharp peaks running north to south through the middle of the land, slightly sinuous, with irregular knots like vertebrae. It stops short of the south coast and leaves a lowland corridor along the shore, the only easy way between west and east. One narrow snow-choked notch crosses its upper third.
2. The great peak: at the northern head of the spine, the single tallest mountain on the map, snow-capped and dominant.
3. Rib ridge: a lower ridge branching west from the middle of the spine and reaching toward the western range, gently bowed like a rib. It divides the north-west from the south-west. It is broken by one gap, a mountain pass, about a third of the way along from the spine.

North-west
4. Lightning plateau: a raised cold tableland in the north-west. Thin branching lightning (#ffd84a) crawls over its surface like nerves. Fine and small.
5. Giant's footprints: beyond the plateau, at the edge of the tundra in the far north-west, two enormous footprint-shaped lakes: dark water in frozen ground, each a long basin with a few toe hollows, weathered until almost natural. Not cartoon feet.
6. Copper highlands: between the plateau and the rib ridge, rolling copper-brown hills (a low-saturation glaze of #d4893a) scarred by quarries and open-pit terraces, under a thin soot haze.
7. River: thin. It rises on the lightning plateau, flows south-east through the copper highlands, passes through the gap in the rib ridge, runs south through the great forest and reaches the sea on the south-west coast. Clear ice blue (#7cc6e8) at its source; from the pass onward it turns rust orange-brown (#b8744a), polluted.

West and south-west
8. Iron range: a north-south range along the middle of the west coast. Near-black rock with exposed metal veins that glint cold steel grey (#b9c3d0).
9. Rust marsh: a small rust-red wetland with stained pools just south of the pass, where the river spreads out.
10. Great forest: the heart of the south-west, dense dark-green canopy (a glaze of #6fae55), with one faintly brighter ancient crown at its centre. Its northern edge is ragged, with stump clearings where it is being logged.
11. Old-growth range: forested mountains near the south-west corner, between the forest and the sea, older and darker green, mossy.
12. Lagoon: a small still lagoon on the south-west coast.
13. Steppe: pale dry-gold grassland with long wind streaks, between the great forest and the southern end of the spine, down to the south coast.

East
14. Eastern plateau: a high plateau east of the spine, with cliff edges along its north and west sides, pale stone under a dusky violet twilight glaze (#9b6ddb). Its outline reads faintly like a cupped palm. Keep its interior smooth and quiet.
15. Black wood: a leafless, black-branched forest at the plateau's western edge, facing the spine.
16. Canyon: a narrow north-south crack in the southern part of the plateau, pitch black with a faint violet rim.
17. Fog marsh: a grey-violet misty swamp below the plateau's southern edge.
18. Desert: ochre-red dunes (#c99a5a), rippled like skin, in the south-east interior between the corridor at the spine's end and the volcanic range.
19. Volcanic range: black cones in the south-east with thin veins of lava (#ff7a4a) and thin smoke: the glow of a banked heart-fire, not an eruption.
20. Floating islands: about six broken shards of rock hanging in the air in the north-east, above the plateau's northern rim, each casting a soft shadow on the ground below, with a faint teal rim light (#9fe3d6).
21. The wall: a great wall along the whole eastern edge of the plateau, running north to south, almost straight with slight bends: a thin line of pale stone with tiny buttress ticks on its east face, softly lit warm white (#f3e6c0). Thin, not a glowing beam.
22. The dead land: everything east of the wall, out to the right edge, has lost its colour. Within a short distance of the wall the land drains to flat ash grey (#34343a) with hairline cracks: no vegetation, no glow, no sign of life. To the north and south the grey fades gradually back into ordinary dark land.
23. Far north-east corner: a dim, half-seen mountain range lost in haze, as if never properly surveyed.

North and the seas
24. Tundra: the northern edge of the land is frozen ground in a dim blue-white (#cfd8e6 at low strength) that fades out southward. Dim, never white.
25. Sea trench: in the southern sea, due south of the continent's middle, a long east-west trench, the darkest thing on the map, with a very faint slow pulse of deep blue light in its depth. In the south-west sea, the barely visible outline of a drowned land lying under the water. A few tiny rocky islets off the west and south coasts.

SETTLEMENTS (lights only): eleven places, each a small cluster of pin-point lights no wider than 1% of the frame, with no drawn building larger than a few pixels, no icon and no label.
- Copper-orange lights (#d4893a): a steam city on the upper river in the copper highlands, with a smudge of smoke; a fortress on the heights overlooking the pass from the north; a town at the foot of the lightning plateau; a mine town on the eastern slope of the iron range.
- Soft green-gold lights: a town among giant trees in the western part of the great forest; a wide camp of scattered fires on the steppe; a temple town on the lagoon.
- Pale violet-white lights (#a57ae6): a white walled city in the middle of the eastern plateau; one needle-thin spire near the plateau's northern rim, below the floating islands; a town of dim violet lights down inside the canyon.
- Golden lights (#d9b46a): a harbour city on the south coast, where the spine ends and the corridor opens.

DO NOT PAINT (the game adds these itself): roads, bridges, gates, portals, dragons, creatures, people, ships, banners, region borders, a ring or oval line, a compass rose, a scale bar, a title, a legend, a grid, map icons of any kind.

NO TEXT ANYWHERE: no letters, no words, no place names, no numbers, no runes or glyphs, no signature, no watermark.

Also avoid: photorealistic satellite imagery, parchment or sepia paper, daylight colours, bold cartoon outlines, a decorative border.
```

## 다시 받을 때 붙이는 말 (받은 그림을 함께 넣고)
- 글자 · 기호가 들어갔을 때: `Same image, but remove every letter, label, icon, marker, compass and line that is not terrain. Change nothing else.`
- 방위가 틀렸을 때(예: 화산이 남서에): `Keep the style and the coastline, but move the volcanic range to the south-east and the old-growth forest range to the south-west.` — 틀린 곳만 바꿔 적는다.
- 땅이 네모나게 화면을 채웠을 때: `Redesign the coastline: deeper bays, headlands and peninsulas on the west and south coasts, a wider and more irregular western ocean. Keep every place at its compass position.`
- 너무 밝거나 어수선할 때: `Darker and calmer: lower the contrast, dim the snow and the plateau, remove small details from the open lowlands.`
- 진영 색이 색 면으로 칠해졌을 때: `No flat coloured blocks: let the copper, green and violet tints fade into the dark land along irregular natural edges.`
- 도시가 크게 그려졌을 때: `Shrink every settlement to a tiny cluster of pin-point lights; no drawn buildings.`

## 확인할 것 (받은 뒤)
- [ ] 글자 · 숫자 · 나침반 · 축척 · 고리 선 · 길 · 배 · 괴물이 하나도 없다
- [ ] 여덟 방위가 맞다 — 북 큰 봉우리 · 북동 떠 있는 섬 · 동 회색 땅 · 남동 화산 · 남 해구 · 남서 숲 산맥 · 서 쇠 산맥 · 북서 번개 고원. 여덟 곳을 이으면 찌그러지지 않은 큰 타원이 된다
- [ ] 지형 25곳이 모두 있고 서로 겹치지 않는다(특히 갈비 능선의 틈 · 강이 그 틈을 지남 · 등뼈 남쪽 끝의 해안 길목 · 석호 · 협곡 · 장벽)
- [ ] 불빛 11곳이 제자리에 있고 건물이 크게 그려지지 않았다
- [ ] 바다는 서쪽 · 남쪽에만, 북쪽과 동쪽은 땅이 화면 밖으로 이어진다
- [ ] 큰 밝은 면이 없다 — 동토 · 고원 위에 밝은 지명을 얹어도 읽힌다
- [ ] 왼쪽 아래(제목 `KAILAN`) · 오른쪽 아래(나침반 · 축척) 바다가 비어 있다
- [ ] 사람 모습 · 얼굴 · 손가락이 보이지 않는다(거인의 몸은 산 모양으로만)

## 넣는 법 (받은 뒤 할 일 — 좌표를 그림에 맞춘다)
> **2026-11-21 한 번 넣었다**: 이 프롬프트로 받은 그림(게임에 넣은 것은 2000×1500)이 지금 바탕이고, 아래 1~3과 5의 스타일 가이드는 그 그림에 맞춰 고쳤다(`docs/CHANGELOG.md` "카일란 지도 새 그림"). 4와 아티팩트 지도는 남아 있다. **같은 그림의** 더 큰 원본(4K)이 있으면 그림 파일만 바꿔 끼우면 된다(좌표 그대로) — 단, 크게 키우면서 그림 AI가 다시 그린 판은 지형 자리가 달라지므로(실제로 그랬다) 좌표를 다시 잰다. 그림을 다시 받으면 아래를 처음부터.

받은 그림을 Claude에게 넘기며 "새 지도 넣어 줘"라고 하면 된다. 땅 모양이 바뀌므로 그림만 바꿔 끼우지 않고 아래를 함께 고친다.
1. 그림: 4:3으로 맞춰 `img/ui/map/kailan_base.jpg`(2400×1800) · `kailan_base_m.jpg`(1600×1200), `js/kailan.js` `BASE_MAP`의 `?v=` 올림. 옛 그림은 `_backup_art/<시각>/`.
2. `js/kailan.js`(좌표 1200×900): 장소 표 `P`의 x · y · 이름 자리(`lab`) 약 70곳, 진영 경계(`reg`), 잠든 거인 윤곽, 성로의 중심 `HUB`와 관문 좌표 목록. 칠룡의 고리 · 고리 바깥 안개는 용 좌표에서 저절로 따라온다.
3. `js/pilgrimtext.js`의 망각의 숲 자리(`at`) · `js/pilgrim.js`의 지도 틀(`viewBox` — 여덟 관문 · 린데어 환석 · 숲이 다 들어오게) · `PIL_AT`. 순례 지도는 도시 좌표를 `Kailan.places`에서 읽으므로 나머지는 따라온다.
4. 코드가 그리던 옛 지형(`COAST_KEY` · `if (!BASE_MAP)` 절)은 바탕 그림이 없을 때만 쓰인다 — 새 해안선에 맞추거나 그대로 둘지 그때 정한다. 참고 그림 `tools/art/ref/kailan_map_ref.jpg`도 옛 모양이다.
5. `docs/STYLE_GUIDE.md` 5장(지도 바탕 규칙 · 버전), 아티팩트 "카일란 대륙 전도"(지도는 두 벌 — 5장 "장소를 고치면 두 곳 모두 고친다").

지도 화면의 "그림 지도" 보기도 같은 바탕 그림을 쓴다(`js/kailan.js` `PIC_MAP`, 2026-11-21) — 바탕 파일을 바꾸면 함께 바뀐다. 옛 그림 `kailan_map.jpg`는 쓰이지 않는다.
