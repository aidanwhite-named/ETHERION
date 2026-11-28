# 린데어 상점 · 세 진영 명판 — 그림 프롬프트 (2026-11-28)

상점 왼쪽 조직도(`js/shop.js` `shopNodeHTML` · `css/shop.css`)의 명판 네 개 — **린데어 상점 · 거골 연합 · 용맥 맹약 · 신탁 성회** — 에 들어갈 그림 네 장의 프롬프트다. GPT(이미지) · Gemini에 그대로 붙여 넣는다.
서사는 `docs/WORLD.md`(4 · 6 · 10장), 그림 규칙은 `docs/STYLE_GUIDE.md`(0 · 1.1 · 2.14 · 6.6), 쓰는 법은 `tools/art/PROMPT_GUIDE.md`(있는 것만 긍정문으로)를 따른다.

- **지금 게임**(2026-11-28 적용): 네 장 모두 들어가 있다 — `img/ui/shop/shop_<lindear|brass|verdant|arcane>.jpg`(768²) · `*_m.jpg`(384², 폰 · 앱). 명판 판(`.rq-plate`) 위 · 글자 아래에 `.org-art`(`js/shop.js` `shopNodeHTML` · `css/shop.css`)로 깐다. 그림을 바꾸려면 같은 이름으로 덮어쓰고 `index.html`의 `shop.css?v=` 를 올린다.
- **그림이 맡을 것**: 명판의 **바탕 그림**이다. 문장 · 이름 · 영문 · 카드 수 · 선택 테두리는 지금처럼 코드가 위에 얹는다(그림 안에 글자 · 숫자 없음, 0.2).
- **한 장 = 그 진영이 힘을 얻는 방식**: 거골은 **캔다**(거인의 몸을 광맥처럼), 용맥은 **빌린다**(용과의 맹약), 신탁은 **받는다**(신의 뜻). 린데어는 셋이 유일하게 마주치는 **중립의 자유 교역 도시**. 장면마다 그 진영의 땅 · 수도와 그 힘의 절대자(거인 · 용 · 신)가 배경에 보이게 한다.
- **작게 보인다**: 진영 명판은 폭 약 95px, 상점 명판은 약 190px × 80px다. 그래서 **굵은 실루엣 하나 + 색 덩어리**로 읽혀야 한다. 잔 디테일은 크게 볼 때의 덤이다.
- **크기 · 짜임 (네 장 공통)**: **1:1 정사각, 2048×2048 JPG.** 한 장을 진영 명판(세로로 조금 긴 칸)과 상점 명판(가로로 긴 칸) 양쪽에 잘라 쓸 수 있게 —
  - 주인공(랜드마크)은 **가운데 50%** 안에, 화면 높이의 위쪽 2/3에 둔다.
  - **아래 1/3은 어둡고 잔잔하게**(이름 · 영문 · 카드 수가 올라감). 바닥 · 물 · 그림자로 자연스럽게 어두워지게.
  - **가장자리는 밤하늘 남색 `#07080d`로 스며들게**(명판 판과 이어지도록). 테두리 · 액자는 그리지 않는다.
  - 얼굴이 또렷한 인물은 두지 않는다(멀리 작은 실루엣은 괜찮다).
- **파일 · 넣는 법**: 아래 이름으로 `img/ui/shop/`에 저장하고 Claude에게 "상점 명판 그림 넣어 줘"라고 하면 된다(아직 코드 연결 없음 — 넣을 때 `css/shop.css`의 `.org-node.root` · `.org-node.faction.fac-<id>` 바탕에 그림을 깔고, 위에 글자가 읽히도록 아래쪽 어둠 그라데이션을 얹는다. 폰 · 앱용 작은 판 `*_m.jpg`(512×512)도 함께).
- **한 벌로 보이게**: **1번(린데어)** 을 먼저 만들고, 마음에 들면 나머지 세 장은 1번 그림을 참고 이미지로 함께 넣고 이 문장을 덧붙인다:
  `Match the attached reference exactly in rendering style, framing, scale, lighting and level of detail; only the place, materials and colours change.`

### 공통 머리 · 꼬리 (각 프롬프트 안에 이미 들어 있음)
- 머리: `Dark fantasy card game UI illustration, painterly digital painting, cinematic and calm. Exactly 1:1 square, 2048x2048.`
- 꼬리: `Composition: one bold landmark silhouette in the central half of the image, in the upper two thirds, readable even when the picture is shown 96 pixels wide. The lower third falls into deep, calm shadow with very low contrast. All four edges dissolve softly into night blue #07080d, with no border or frame. Painterly brushwork with soft edges and rich dark values; every banner, sign and cloth is plain and unmarked, and the painting carries no lettering.`

---

## 1. 린데어 상점 — `img/ui/shop/shop_lindear.jpg`

### 무엇을 그리나
- **밤의 린데어 자유시, 부두 위 노점 거리.** 세 진영이 유일하게 마주치는 중립의 교역 도시다. 지금 상점 배경(2.14)과 같은 곳을 가까이서 본 장면 — 그래서 같은 상징(환석 · 크로네아의 물레 · 신전 둥근 지붕 · 등불 줄 · 세 진영 깃발)을 쓴다.
- 주인공은 **노점 한가운데의 큰 놋쇠 저울**(명판의 ⚖ 문장을 그림으로). 저울 한쪽 접시에는 하늘빛 에테르 조각이, 다른 쪽에는 카드 한 묶음(뒷면만)이 올라 균형을 이룬다.
- 저울 뒤로 언덕 위 **환석**(돌 아홉의 고리, 속이 하늘빛)과 **크로네아 신전의 둥근 지붕**, 하늘에는 금빛 선으로 그린 **크로네아의 물레**가 희미하게 걸려 있다. 물레의 실 한 가닥이 끊어져 있다(크로네아의 상징 "물레와 끊어진 실").
- 양옆에 노점 천막과 등불 줄, 부두에 **세 진영의 깃발**(구리 · 초록 · 보라, 문장 없는 천)이 나란히, 멀리 돛배 두어 척.

### 프롬프트 (영어 — 그대로 붙여 넣기)

```
Dark fantasy card game UI illustration, painterly digital painting, cinematic and calm. Exactly 1:1 square, 2048x2048.

Scene: the night market of a neutral free trade city on a southern harbour, the one place where three rival realms meet to trade. The viewer stands at a market stall on the quay, at eye level.
- Center, upper half: a large old brass balance scale standing on a dark wooden stall counter. One pan holds a small heap of glowing sky-blue ether crystal shards (#8fdcff); the other holds a neat stack of face-down playing cards with dark backs and thin gold edges. The two pans hang perfectly level, catching warm lantern light on their rims.
- Behind the scale, on a low hill across the water: a ring of nine standing stones whose hollow centre breathes soft sky-blue ether light, and beside it the round dome of a quiet temple with a small spinning-wheel finial.
- Sky: deep night blue with scattered stars; a huge faint spinning wheel drawn in thin gold lines (#d9b46a) hangs over the city, one of its threads cut and drifting loose.
- Left and right edges: the striped cloth roofs of neighbouring stalls and strings of copper lanterns (#d4893a) sagging between poles; at the quay's edge three tall plain banners side by side, one copper (#d4893a), one moss green (#6fae55), one violet (#a57ae6); two sailing ships rest on the dark water far behind.
- Lower third: the dark plank quay and black harbour water holding long, broken reflections of the lanterns.

Mood: a fair and watchful place where everything has its price; quiet bargaining after dark. Palette: night blue #07080d to #101830, muted gold #d9b46a, copper lantern light #d4893a, ether sky-blue #8fdcff, small touches of the three banner colours.

Composition: one bold landmark silhouette in the central half of the image, in the upper two thirds, readable even when the picture is shown 96 pixels wide. The lower third falls into deep, calm shadow with very low contrast. All four edges dissolve softly into night blue #07080d, with no border or frame. Painterly brushwork with soft edges and rich dark values; every banner, sign and cloth is plain and unmarked, and the painting carries no lettering.
```

---

## 2. 거골 연합 — `img/ui/shop/shop_brass.jpg`

### 무엇을 그리나
- **"캔다" — 잠든 거인의 몸을 광맥처럼 파는 진영.** 녹철 구릉의 수도 **코그하번**을, 거인의 몸 위에 세운 도시로 그린다.
- 주인공은 **언덕에서 아치처럼 솟은 거인의 갈비뼈**. 수천 년 굳어 회색 **아다만트**가 된 뼈이고, 그 사이사이에 용광로 · 굴뚝 · 톱니바퀴 · 구리 관이 박혀 있다. 뼈 틈에서 주황 불빛과 증기가 샌다.
- 세 깃발이 작게 보인다: 뼈 위 성벽의 **포대**(심장불 — 화염) · 비계에 선 **반쯤 지은 쇠 골렘**(방패 — 금속) · 뾰족한 **피뢰탑과 번개 담은 유리병**(벼락 — 번개, 노란 불꽃).
- 절대자 = **거인**: 먼 능선 전체가 옆으로 누운 거인의 감은 얼굴 옆모습이다. 그 턱선을 따라 갱도의 등불이 점점이 이어진다.
- 거인이 뒤척이는 대가: 땅에 금이 가 있고 그 틈으로 검붉은 빛(굳은 피의 아다만트)이 비친다.

### 프롬프트 (영어 — 그대로 붙여 넣기)

```
Dark fantasy card game UI illustration, painterly digital painting, cinematic and calm. Exactly 1:1 square, 2048x2048.

Scene: the industrial capital of a realm that takes its power by mining the body of a sleeping giant, built on rust-coloured iron hills at night. The viewer looks up at the city from a road below.
- Center, upper half: three colossal curved rib bones rising out of the hillside like the arches of a cathedral, each bone weathered to a dark grey metallic stone. Between and inside the ribs the city is wedged in: brick furnaces, riveted iron walkways, great copper pipes and toothed gear wheels. Orange furnace light (#ff6b3d) and white steam leak from the gaps between the bones.
- On top of the nearest rib: a squat fortress wall with a row of short black cannon barrels. Beside it, inside a wooden scaffold, a half-built iron golem stands motionless, its hollow chest glowing faintly. Higher up, two needle-thin lightning-rod towers carry glass jars full of crackling yellow lightning (#ffd84a).
- Far background: the whole distant ridge is the profile of an enormous sleeping giant lying on its side, eyes closed, its brow and jaw shaped from the mountain itself; a dotted line of tiny mine lanterns follows the line of its jaw.
- Sky: night blue smudged with brown smoke drifting from the chimneys; a few stars show through.
- Lower third: a dark cracked road and rubble; inside one deep crack a thin dark-crimson glow shows, as if the earth were bleeding metal.

Mood: proud, relentless craft; a city that took what was never given. Palette: night blue #07080d to #101830, copper #d4893a, deep copper brown #3a2412, rust, furnace orange #ff6b3d, steel grey #a9b4c2, small sparks of lightning yellow #ffd84a, muted gold #d9b46a.

Composition: one bold landmark silhouette in the central half of the image, in the upper two thirds, readable even when the picture is shown 96 pixels wide. The lower third falls into deep, calm shadow with very low contrast. All four edges dissolve softly into night blue #07080d, with no border or frame. Painterly brushwork with soft edges and rich dark values; every banner, sign and cloth is plain and unmarked, and the painting carries no lettering.
```

---

## 3. 용맥 맹약 — `img/ui/shop/shop_verdant.jpg`

### 무엇을 그리나
- **"빌린다" — 용과 맺은 맹약으로 힘을 빌리는 진영.** 에일렌 대삼림의 트롤 거목 도시 **실바니엘**, 맹약의 회의가 열리는 곳.
- 주인공은 **강어귀에 선 거대한 고목**. 줄기에 이끼 덮인 집과 덩굴 다리가 감겨 있고, 뿌리는 달빛 비친 석호에 잠긴다. 가지에 반딧불 같은 초록 빛.
- 세 깃발이 작게 보인다: 숲 가장자리 초원의 **야영지 모닥불**(발톱 — 대지) · 고목 자체와 덩굴(뿔 — 숲) · 석호 위 **흰 신전의 작은 돔**(노래 — 물).
- 절대자 = **용**: 뒤의 산 능선은 등에 바위와 숲이 자란 **고르바스**의 등이고, 고목 꼭대기 안개 속에 **베르단**의 고목 가지 뿔이 겹쳐 보이며, 석호 수면 아래로 **마렌시아**의 반투명한 지느러미가 지나간다. 셋 다 형체가 반쯤만 드러난다(빌린 힘의 주인은 늘 곁에 있지만 앞에 서지 않는다).
- 불탄 숲의 밤을 잊지 않은 표시: 고목 아래쪽 줄기 한 면에 오래된 그을린 흉터, 그 위를 새 이끼가 덮는다.

### 프롬프트 (영어 — 그대로 붙여 넣기)

```
Dark fantasy card game UI illustration, painterly digital painting, cinematic and calm. Exactly 1:1 square, 2048x2048.

Scene: the great tree city at the heart of an ancient forest on a southwestern coast, the meeting place of a covenant whose people borrow their strength from dragons. Moonlit night; the viewer stands on the shore of a still lagoon, looking across the water at the tree.
- Center, upper half: one immense ancient tree rising from the far shore, its trunk wide as a castle, wrapped in moss-covered round houses, rope bridges and hanging vines; small green lights (#58b85f) glow like fireflies among the branches. One side of the lower trunk carries an old charred scar, now half covered by fresh bright moss. Its great roots reach down into the lagoon.
- Behind the tree: a long mountain ridge that is the back of a sleeping dragon of stone, rocks and small pine forests growing along its spine. High in the mist above the tree crown, the faint shape of huge antlers made of old branches blends into the canopy. Under the lagoon's surface, the long translucent fin of a sea dragon glides past, glowing pale blue (#4fb3ff).
- Left edge: at the forest's end, open grassland with a few hide tents and a red-orange campfire. Right edge: on a small island in the lagoon, a white stone temple with a little dome, its windows lit softly blue.
- Sky: deep night blue with a large pale moon partly behind the tree's crown.
- Lower third: the dark, mirror-still lagoon holding a soft reflection of the tree and the moon, reeds at the near shore.

Mood: patient, living strength; a promise between the small and the immense. Palette: night blue #07080d to #101830, moss green #6fae55, deep forest green #14281a, firefly green #58b85f, lagoon blue #4fb3ff, earth brown #b88a5a, moonlight silver, muted gold #d9b46a.

Composition: one bold landmark silhouette in the central half of the image, in the upper two thirds, readable even when the picture is shown 96 pixels wide. The lower third falls into deep, calm shadow with very low contrast. All four edges dissolve softly into night blue #07080d, with no border or frame. Painterly brushwork with soft edges and rich dark values; every banner, sign and cloth is plain and unmarked, and the painting carries no lettering.
```

---

## 4. 신탁 성회 — `img/ui/shop/shop_arcane.jpg`

### 무엇을 그리나
- **"받는다" — 신에게 서약하고 뜻을 내려받는 진영.** 오르둔의 손바닥 위인 **성좌 고원**, 수도 **새벽성 엘라드**.
- 주인공은 **고원 끝의 흰 성벽 도시와 그 위로 솟은 첨탑 벨루미르의 바늘**. 첨탑 꼭대기가 구름을 뚫고, 끝에서 하늘빛 관문이 별을 향해 열려 있다.
- 세 깃발이 작게 보인다: 흰 성벽과 금 둥근 지붕(새벽 — 빛) · 바늘 첨탑(별 — 바람, 첨탑을 감도는 청록 바람 줄기) · 고원 한쪽을 가르는 **모르크 협곡**의 깊은 그림자와 그 바닥의 보랏빛(그믐 — 암흑, 녹타르).
- 절대자 = **신**: 하늘의 별자리가 신들의 모습이다 — 지평선 쪽에 **여섯 날개 모양으로 퍼지는 새벽빛**(솔란테), 첨탑 위로 **펼친 책 모양의 별자리**(벨루미르), 협곡 위에 **저울 모양의 어두운 별 무리**(모르카스). 셋 다 별을 이은 선으로만 보인다.
- 세계의 방패: 멀리 동쪽 끝에 낮고 긴 **황혼의 장벽**, 그 너머는 별이 없는 잿빛 빈 땅.

### 프롬프트 (영어 — 그대로 붙여 넣기)

```
Dark fantasy card game UI illustration, painterly digital painting, cinematic and calm. Exactly 1:1 square, 2048x2048.

Scene: a high eastern plateau where an order of oath-takers receives power from the gods, an hour before dawn. The viewer stands on the plateau's edge, looking across at the holy capital.
- Center, upper half: a city of pale white walls and slender gold-capped domes on a cliff, and rising far above it a single needle-thin spire that pierces a layer of cloud; at its very tip a small ring of sky-blue ether light (#8fdcff) opens toward the stars. Thin teal wind streams (#9fe3d6) spiral around the spire.
- Right side of the plateau: a deep canyon splits the ground; its walls fall into black shadow, and far down at its floor a faint violet glow (#a57ae6) rises like smoke from a hidden city.
- Sky: deep violet-blue night with dense stars. Three constellations are drawn by faint lines between stars: low on the horizon, a pale dawn glow spreading in the shape of six great wings; above the spire, stars forming an open book; above the canyon, a cluster of dim stars forming a balance scale.
- Far background on the eastern horizon: a long, low fortified wall, and beyond it a grey starless emptiness.
- Lower third: dark stone of the plateau edge in shadow, a few low steps and a plain stone altar holding a single small flame.

Mood: solemn devotion with a price; light and darkness standing in an uneasy alliance. Palette: night blue #07080d to #101830, arcane violet #a57ae6, deep violet #231636, white stone, dawn gold #f0cf6a, muted gold #d9b46a, ether sky-blue #8fdcff, small teal accents #9fe3d6.

Composition: one bold landmark silhouette in the central half of the image, in the upper two thirds, readable even when the picture is shown 96 pixels wide. The lower third falls into deep, calm shadow with very low contrast. All four edges dissolve softly into night blue #07080d, with no border or frame. Painterly brushwork with soft edges and rich dark values; every banner, sign and cloth is plain and unmarked, and the painting carries no lettering.
```

---

# 명판 문장 아이콘 4장 (2026-11-28)

- **적용됨**(2026-11-28): 네 장 모두 상점 명판에 들어가 있다(256² 투명, 원본 1024²는 `tools/art/out/shop_emblem/`, `js/shop.js` `shopNodeHTML` · `css/shop.css` `.emblem.pic`). 명판 동그라미는 테 · 바탕 없이 그림만. 진영 문장 셋은 `factionCrestSVG`(`js/pachinko.js`)를 거쳐 다른 화면(대기실 덱 보관함 · 파친코 · 미니게임 · 매뉴얼 · 상점 배경 깃발)에서도 쓴다.

명판 위쪽 동그라미 안의 문장 — 상점의 **⚖ 글자**, 진영의 **코드로 그린 임시 문장**(`js/pachinko.js` `factionCrestSVG`: 거골 = 톱니 고리와 점 셋, 용맥 = 잎 셋, 신탁 = 그믐달과 별 셋) — 을 그린 문장으로 바꾼다.
- **뜻은 이어받는다**: 지금 문장의 모양(저울 · 톱니 · 세 잎 · 그믐달과 별)을 가운데 상징으로 남기고, 진영이 힘을 얻는 방식(캔다 · 빌린다 · 받는다)과 세 깃발을 더한다. 세 깃발 문장(`img/ui/emblem/<ID>.png`, `flags.md`)과 같은 붓질 · 같은 마감으로 한 벌이 되게 한다.
- **자리 · 크기**: 동그라미(`.emblem`) 안. 상점 명판 52px, 다른 화면(덱 머리 · 파친코 · 매뉴얼 …) 64~72px. 동그라미 테두리 · 진영색 빛은 코드가 그리므로 **그림은 둥근 칸 안에 들어가는 덩어리**면 된다(세로로 긴 깃발 문장과 다르다).
- **크기 · 바탕**: 1:1 정사각, 1024×1024 PNG, **투명 바탕**(Gemini는 `plain flat very dark background (#07080d)` 로 그리고 넣을 때 바탕을 지운다). 문장은 가운데 지름 약 85% 원 안에 들어가게.
- **파일**: `img/ui/emblem/shop_lindear.png` · `faction_brass.png` · `faction_verdant.png` · `faction_arcane.png`. 받으면 Claude에게 "명판 문장 넣어 줘" — 상점만 바꿀지, `factionCrestSVG`를 쓰는 다른 화면도 함께 바꿀지 그때 정한다.
- **한 벌로 보이게**: 거골을 먼저 만들고, 나머지 셋은 그 그림(또는 깃발 문장 `B1.png`)을 참고 이미지로 넣고 이 문장을 덧붙인다:
  `Match the attached reference exactly in rendering style, framing, scale, lighting and level of detail; only the subject, materials and colours change.`

### 공통 꼬리 (각 프롬프트 끝에 이미 들어 있음)
`Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the emblem's main colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 40 pixels, fine painterly detail inside. Centred and compact, the whole emblem fits inside a circle about 85% of the image width; isolated on a transparent background. The emblem carries no lettering, numbers or signature.`

## 5. 린데어 상점 문장 — `img/ui/emblem/shop_lindear.png`
**뜻**: 지금의 ⚖. 세 진영이 같은 값으로 마주 서는 중립의 저울 + 린데어를 지키는 크로네아의 물레.
```
Heraldic emblem of a neutral free trade city's market.
Centre: an old brass balance scale seen from the front, perfectly level. The left pan holds a small cluster of glowing sky-blue ether crystals (#8fdcff); the right pan holds a neat stack of face-down cards with dark backs and thin gold edges.
Frame: behind the scale, a thin gold spinning wheel forms a ring around the whole emblem, its spokes fine as thread; one thread hangs cut from the wheel and drifts down beside the scale. Three short pennants hang from the scale's beam — copper (#d4893a), moss green (#6fae55), violet (#a57ae6) — plain cloth.
Palette: polished brass and muted gold #d9b46a, ether sky-blue #8fdcff, small touches of the three pennant colours; warm lantern light from below.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the emblem's main colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 40 pixels, fine painterly detail inside. Centred and compact, the whole emblem fits inside a circle about 85% of the image width; isolated on a transparent background. The emblem carries no lettering, numbers or signature.
```

## 6. 거골 연합 문장 — `img/ui/emblem/faction_brass.png`
**뜻**: 지금의 톱니 고리와 점 셋. "캔다" — 거인의 뼈를 물고 도는 톱니바퀴, 그 안의 세 불빛 = 심장불(화염) · 방패(금속) · 벼락(번개).
```
Heraldic emblem of an industrial alliance that mines the bodies of sleeping giants.
Centre: a heavy copper cogwheel seen face-on, its teeth biting into a huge curved fragment of grey petrified giant bone that passes through the wheel's hub like an axle. Set into the cogwheel's face are three round glowing sockets in a triangle: one ember orange (#ff6b3d), one cold steel grey (#a9b4c2), one crackling lightning yellow (#ffd84a).
Frame: thick riveted iron bands and short copper pipes around the rim; thin wisps of steam and a few orange sparks rise from the top; a hairline crack in the bone glows dark crimson.
Palette: copper #d4893a, deep copper brown #3a2412, gunmetal, grey adamant bone, the three socket colours; hot forge light from below.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the emblem's main colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 40 pixels, fine painterly detail inside. Centred and compact, the whole emblem fits inside a circle about 85% of the image width; isolated on a transparent background. The emblem carries no lettering, numbers or signature.
```

## 7. 용맥 맹약 문장 — `img/ui/emblem/faction_verdant.png`
**뜻**: 지금의 세 잎. "빌린다" — 한 씨앗에서 난 세 잎(대지 · 숲 · 물 = 발톱 · 뿔 · 노래)과 그것을 감싸 안은 용, 그리고 맹약의 매듭.
```
Heraldic emblem of a covenant whose people borrow their strength from dragons.
Centre: three broad leaves growing from a single glowing seed, spreading in a three-way spiral: one leaf of earthy brown-gold stone texture (#b88a5a), one of deep living green with moss (#58b85f), one translucent like water, pale blue (#4fb3ff). The seed at the centre glows soft green-gold.
Frame: a slender dragon with mossy scales and small branch-like antlers curls once around the three leaves in a protective ring, its head resting near its own tail; where head and tail meet, they are bound together by a knot of braided vine cord.
Palette: moss green #6fae55, deep forest green #14281a, earth brown #b88a5a, water blue #4fb3ff, a little muted gold #d9b46a; soft moonlight from above.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the emblem's main colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 40 pixels, fine painterly detail inside. Centred and compact, the whole emblem fits inside a circle about 85% of the image width; isolated on a transparent background. The emblem carries no lettering, numbers or signature.
```

## 8. 신탁 성회 문장 — `img/ui/emblem/faction_arcane.png`
**뜻**: 지금의 그믐달과 별 셋. "받는다" — 하늘에서 내려오는 별 셋(그믐 · 새벽 · 별)을 받는 펼친 손바닥(성좌 고원 = 오르둔의 손바닥).
```
Heraldic emblem of a holy order that receives its power from the gods.
Centre: a large silver-violet crescent moon, its open side facing up and right. Inside the curve of the crescent hang three small bright stars in a falling line: one dawn gold (#f0cf6a), one deep violet (#8b5cf6), one teal wind-blue (#9fe3d6).
Frame: below, an open upturned palm of pale white stone with fine gold lines along its creases rises to cup the crescent, as if receiving it; thin rays of soft light fall from the stars into the palm; a narrow ribbon of pale cloth wraps the wrist.
Palette: arcane violet #a57ae6, deep violet #231636, moon silver, white stone, dawn gold #f0cf6a, small teal accent #9fe3d6; cool starlight from above.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the emblem's main colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 40 pixels, fine painterly detail inside. Centred and compact, the whole emblem fits inside a circle about 85% of the image width; isolated on a transparent background. The emblem carries no lettering, numbers or signature.
```
