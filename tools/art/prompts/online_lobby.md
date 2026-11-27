# 온라인 대전 방 — 그림 프롬프트 (2026-11-26)

온라인 대전의 **방 목록**과 **방 대기실**(js/rooms.js · css/rooms.css)에 들어갈 그림 세 장의 프롬프트다. GPT(이미지) · Gemini에 그대로 붙여 넣는다.
서사는 `docs/WORLD.md`, 그림 규칙은 `docs/STYLE_GUIDE.md`(0 · 2.5 · 2.17 · 6장), 쓰는 법은 `tools/art/PROMPT_GUIDE.md`(장면을 직접 쓰는 긍정문)를 따른다.

- **지금 게임**: 그림 없이 CSS로 그린다. 두 화면 모두 메뉴 배경(`img/ui/menu/menu_bg.jpg`) 위에 옅은 빛 두 점을 얹고, 빈 자리는 점선 액자에 깃대만 선 빈 깃발이다.
- **넣는 법**: 아래 파일 이름으로 저장하고 `css/rooms.css` 맨 위의 `--rm-art-lobby` · `--rm-art-room` · `--rm-art-seat`에 `url("../img/ui/online/…")`를 넣는다. 폰 · 앱용 작은 판(`*_m.jpg`, 가로 1920)도 함께 만들어 `css/mobile.css`에서 같은 변수에 넣는다.
- **공통 규칙**: 패널 · 글자 · 깃발 문장이 그림 위에 올라가므로 **가운데는 어둡고 잔잔하게**, 밝은 것은 가장자리에 둔다. 사람의 얼굴이 또렷이 보이는 인물은 두지 않는다(자리의 주인은 모험가 자신이다).

---

## 1. 방 목록 배경 — `img/ui/online/lobby_bg.jpg`

### 무엇을 그리나
- **린데어 성로 관문 곁의 "결투 게시 회랑".** 모험가들이 결투 상대를 찾으러 오는 긴 돌 회랑이다. 벽에는 결투를 청하는 깃발과 나무 패가 줄지어 걸려 있고(방 하나 = 패 하나), 회랑 끝 아치 문 너머로 등불 켠 결투장이 멀리 보인다.
- 방 목록 표가 화면 왼쪽 3/4를, 내 깃발 고르기가 오른쪽 1/4을 덮는다. 그래서 **볼거리는 위쪽 띠와 양옆 끝, 맨 아래**에 둔다.
- 밤. 벽 등불은 구리빛, 아치 문 안쪽에는 하늘빛 에테르 막이 옅게 걸려 있다.

### 크기
16:9 가로, 3840×2160. 폰용 1920×1080은 받은 뒤 줄여 만든다.

### 프롬프트 (영어 — 그대로 붙여 넣기)

```
Dark fantasy game menu background, painterly digital painting, calm and cinematic. Exactly 16:9 landscape, 3840x2160.

Scene: a long stone gallery at night beside the great gate of a free trade city, the place where adventurers come to find a duel. The viewer stands inside the gallery looking down its length.
- Left and right edges: tall stone pillars receding into the distance. Between them hang rows of small wooden challenge plaques on iron hooks and narrow swallow-tailed cloth banners in muted colors — ember red, forest green, storm blue, violet, bone white — each stirred slightly by a night draft. Copper wall lanterns (#d4893a) glow beside them.
- Top edge: a ribbed stone vault with a thin band of gold inlay catching the lantern light; a few motes of sky-blue ether (#8fdcff) drift under the ceiling.
- Far end of the gallery, small and centered low: a round-topped archway whose opening holds a thin sky-blue ether veil; through it, far away, a ring of tiny lanterns marks an open duelling ground under the stars.
- Floor at the bottom edge: worn dark flagstones with a single inlaid gold diamond in the middle and faint reflections of the lanterns.

Composition: the central 65% of the image is deep shadow and soft blue-black haze with very low contrast, so that menu panels and text can sit on top of it. All the brighter details live in the outer edges and the small archway at the far end.

Mood: quiet expectation before a challenge; a hall that is waiting for someone to step forward. Palette: night blue #07080d to #101830, muted gold #d9b46a, copper lantern light #d4893a, ether sky-blue #8fdcff, small touches of violet #a57ae6.

Empty of people. Painterly brushwork with soft edges, rich dark values, plain wood and cloth surfaces with blank faces.
```

---

## 2. 방 대기실 배경 — `img/ui/online/room_bg.jpg`

### 무엇을 그리나
- **결투가 시작되기 직전의 "맞섬의 방".** 둥근 돌방 한가운데에 낮은 돌 탁자(에테르 판)가 있고, 탁자 양쪽에 **빈 의자가 하나씩 마주 놓여 있다.** 왼쪽 의자 뒤에는 따뜻한 구리빛 등불이, 오른쪽 의자 뒤에는 차가운 하늘빛 에테르 등이 서 있어 두 편이 빛의 색으로 나뉜다.
- 화면에서는 왼쪽 자리 패널(나)과 오른쪽 자리 패널(상대)이 그림 위에 놓이고 가운데에 "VS"가 선다. 맨 오른쪽 1/4은 채팅 창이 덮는다. 그래서 **의자와 등불은 패널 뒤로 살짝 비치는 실루엣**이면 되고, 가운데 탁자 위에 옅은 빛 한 줄기만 선다.
- 천장에서 가는 금빛 사슬에 매달린 고리 등(칠룡의 고리를 닮은 일곱 불빛, 한 자리는 꺼져 있음)이 방을 내려다본다.

### 크기
16:9 가로, 3840×2160. 폰용 1920×1080은 받은 뒤 줄여 만든다.

### 프롬프트 (영어 — 그대로 붙여 넣기)

```
Dark fantasy game menu background, painterly digital painting, still and solemn. Exactly 16:9 landscape, 3840x2160.

Scene: a round stone chamber prepared for a duel of cards, seen straight on from the doorway at eye level, moments before the two duelists arrive.
- Center, low in the frame: a wide, low stone table with a smooth dark top; a single thin seam of sky-blue ether light (#8fdcff) runs across it from left to right, dividing it into two halves.
- Left third: one empty high-backed wooden chair facing right toward the table, seen in dark silhouette. Behind it stands a tall iron lamp with a warm copper flame (#d4893a) that paints the left wall in soft amber.
- Right third: a matching empty high-backed chair facing left, in dark silhouette. Behind it stands a tall crystal lamp holding cold sky-blue ether light that paints the right wall in soft blue.
- Above, near the top edge: a ring-shaped chandelier on thin gold chains carrying seven small lights in seven colors — earth #b88a5a, wind #9fe3d6, fire #ff6b3d, water #4fb3ff, forest #58b85f, metal #a9b4c2, lightning #ffd84a — six lit and one dark socket.
- Walls: curved dark stone with shallow niches; in each niche hangs a furled cloth banner, its colors muted by shadow.
- Floor at the bottom edge: a circle of gold inlay around the table, catching both the amber light and the blue light.

Composition: symmetrical, the warm left side and the cold right side meeting at the table. The middle band of the image between the two chairs stays dark and low in contrast, and the lamps and chandelier sit near the outer edges and the top, because interface panels will cover the center and the right quarter.

Mood: held breath; two seats waiting to be taken. Palette: night blue #07080d to #101830, muted gold #d9b46a, copper amber #d4893a on the left, ether sky-blue #8fdcff on the right.

Empty of people. Painterly brushwork with soft edges and deep dark values; all cloth and stone surfaces are plain and unmarked.
```

---

## 3. 빈 자리 그림 — `img/ui/online/seat_empty.png`

### 무엇을 그리나
- 방 대기실에서 **상대가 아직 오지 않은 자리**의 위쪽 띠(깃발 천 자리, 가로로 긴 칸)에 들어간다. 지금은 점선 깃발 모양이다.
- **깃대에 말려 묶인 채 아직 펼치지 않은 깃발 하나.** 누가 올지 모르므로 천은 색이 빠진 잿빛이고 문장이 없다. 깃대 끝의 작은 금 마름모 장식만 등불을 받아 빛난다.
- 자리 패널의 어두운 남색 위에 얹히므로 **배경은 투명**(또는 순수한 검정 — 받은 뒤 뺀다).

### 크기
가로 4:1, 1200×300, 투명 배경 PNG. (깃발 명판 천 `img/ui/banner/*.png`와 같은 크기 · 자리.)

### 프롬프트 (영어 — 그대로 붙여 넣기)

```
Game UI ornament, painterly digital painting on a transparent background. Exactly 4:1 landscape, 1200x300.

Subject: a single banner pole lying horizontally across the frame from left to right, with its cloth still rolled up and tied around the pole by two thin cords — a banner that has not been unfurled yet because its bearer has not arrived.
- The pole is dark aged wood with small bands of dull gold (#d9b46a); at its right end sits a small gold diamond-shaped finial that catches a warm glint of lantern light.
- The rolled cloth is ash grey with soft folds and a plain, unmarked surface; one loose corner hangs down a little at the center, slightly translucent.
- A faint sky-blue ether mote (#8fdcff) drifts above the loose corner.

Lighting: soft warm light from the upper left, gentle shadow underneath the pole. Muted, quiet values so that pale text can be read on top of it.

Painterly brushwork with soft edges; the object floats alone with clean transparent space all around it.
```

---

## 넣은 뒤 확인

- 방 목록: 표의 방 제목 · 방장 이름 · 상태 글자가 배경 위에서 또렷이 읽히는가(가운데가 밝으면 `.rooms::before`의 `opacity`를 낮춘다).
- 방 대기실: 두 자리 패널의 이름 · 덱 점수 · 준비 명판이 읽히는가, 왼쪽은 따뜻한 빛 · 오른쪽은 찬 빛이 패널 가장자리로 비치는가.
- 폰 가로(844×390)에서 작은 판이 걸리는가, `node tools/mobile_lite.js`를 다시 돌렸는가.
