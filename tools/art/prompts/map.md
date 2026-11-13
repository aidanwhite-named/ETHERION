# 카일란 대륙 지도 — 게임 지도 바탕 그림 프롬프트 (v3.43)

게임 지도(`js/kailan.js`, 위쪽 띠의 "지도")는 **좌표 1200×900** 위에 지명 · 도시 · 관문 · 용 같은 지점을 코드가 얹는다.
이 프롬프트로 그리는 그림은 그 **아래 바탕(지형)만** 맡는다 — 그래서 **글자가 하나도 없어야 하고, 땅 모양이 참고 그림과 같아야 한다.**
(지금 받은 `img/ui/map/kailan_map.jpg`는 지명이 영어로 그려져 있고 땅 모양이 달라, 지도 화면의 "그림 지도" 보기로만 쓴다.)

## 그림 AI에 함께 넣을 것
- **참고 그림 `tools/art/ref/kailan_map_ref.jpg`(1600×1200)를 꼭 첨부한다.** 게임 지도에서 지명을 뺀 땅 모양 · 지형 기호 · 진영 영역이다. 해안선 · 산맥 · 숲 · 사막 · 강의 **자리와 크기를 그대로** 따라 그리게 한다.
- 받은 그림은 `img/ui/map/kailan_base.jpg`로 저장(크기는 아래). 다른 이름으로 받았으면 Claude에게 "이 그림을 지도 바탕으로 맞춰 넣어 줘"라고 넘긴다 — 참고 그림과 겹쳐 보며 어긋난 만큼 옮기고 줄여 넣는다.

## 크기
- 비율 **정확히 4:3, 가로가 긴 그림**. **3840×2880(4K)** 권장, 최소 2400×1800. (게임은 1200×900 좌표에 맞춰 줄여 쓰고, 확대해도 흐려지지 않게 크게 받는다.)

## 프롬프트 (영어 — 그대로 붙여 넣기)

```
Fantasy world map illustration of the continent of Kailan, for a dark-themed card game. TRACE THE ATTACHED REFERENCE IMAGE EXACTLY: keep every coastline, mountain range, forest, desert, river, island and region boundary in the same position, size and shape — the game will overlay its own labels and markers at fixed coordinates, so the geography must line up 1:1 with the reference.

Format: exactly 4:3 landscape, 3840x2880 pixels, top-down view, north is up, the whole map fills the frame edge to edge (no border frame, no paper edge, no title cartouche).

ABSOLUTELY NO TEXT: no letters, no words, no place names, no numbers, no runes as text, no compass rose, no scale bar, no banners, no legend, no signature, no watermark. Pure terrain painting only.

Style: "night-sky sea chart" — painted fantasy cartography in deep night tones (navy, charcoal, muted gold), glowing thin coastlines in pale ether-blue (#8fdcff) with a soft gold inner line, terrain drawn as hand-painted cartographic symbols (small peaked mountains with one-sided shading, clustered round trees, dune strokes), subtle star-dust texture over the sea. Dark, calm and low-contrast so that light labels on top stay readable. No characters, no ships, no sea monsters.

Geography (follow the reference positions):
- West: a long north–south coastline; a column of pale iron-grey mountains along the west coast (Iron-frame range) and a broad green forest belt in the southwest (Primeval forest range).
- North: a frozen white tundra strip along the top edge, with giant footprint-shaped hollows in the snow in the northwest and a cold plateau crackling with faint lightning.
- Center: a tall north–south mountain spine running down the middle of the land (the sleeping giant's backbone), with a mountain pass and a rusty marsh near its middle.
- Northwest quarter: warm copper-brown industrial highlands (forges, quarries) — tint only, no buildings larger than tiny dots.
- Southwest quarter: lush green woodland and grassland with one river flowing south to the sea.
- East-center: a large region tinted dusky violet (twilight cliffs, dark canyon to the south of it, a black-branched forest at its western edge); a thin needle-like spire at its north.
- Southeast: an ochre desert with dunes and a red volcanic ridge further east-south.
- Far northeast: a scatter of small broken floating rock islands.
- Far east: the land fades into a colorless grey "empty land" behind a straight bright vertical wall (the Twilight Barrier) — colors drain away east of the wall, with fine cracks.
- South: the sea along the bottom edge, with a deep dark trench and a few small rocky islets; the sea also wraps the west edge.

Palette: sea #04070d–#0d1a2c, land #1c1b1f–#1b1914, faction tints very soft (copper #d4893a northwest, green #6fae55 southwest, violet #9b6ddb east-center), empty land grey #34343a.
```

## 확인할 것 (받은 뒤)
- 글자 · 문장 · 나침반 · 배 · 괴물이 들어갔으면 다시.
- 참고 그림과 반투명으로 겹쳐 봤을 때 해안선 · 가운데 산맥 · 동쪽 장벽 자리가 맞는지(어긋나면 Claude가 옮겨 맞추거나, 많이 다르면 다시).
- 가운데 · 지명이 놓일 자리가 너무 밝거나 복잡하지 않은지(글자가 위에 얹힌다).
