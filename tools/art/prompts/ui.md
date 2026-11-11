# 전장 그림 프롬프트

참고 그림(지금 게임 그림)을 함께 넣어야 자리가 맞는다. 층으로 나뉜 그림은 같은 묶음끼리 차례로 만든다.
저장 크기 · 투명 처리는 각 항목의 설명대로. 자동으로 하려면 `tools/art/README.md`.

## battle_bg — 전장 배경
저장 파일 `img/ui/battle/battle_bg.jpg` · 1920×1080 JPG · 참고 그림: `tools/art/ref/battle_bg.jpg`

전장 화면 전체에 깔린다(불투명도 .9, 위치 center 60%). 가운데는 카드가 올라가므로 어둡고 고요하게. 숫자 · 카드 자리는 코드.

```
Wide 16:9 background painting for the battle screen of a dark-fantasy card game, seen from a low elevated view at night.
Horizon at about 40% height. Left: a dark mountain range that is secretly the body of a sleeping stone giant, with a slanted row of small orange mine-lamp lights climbing its slope. Right: distant silhouette of white-stone arcane spires (three tall needle towers) with faint violet lights at their tips. Sky: deep violet-indigo night with thin clouds and stars; very faint in the sky above the centre, a huge ghostly circle with a five-pointed star (the halo of the gods), barely visible.
Foreground ground plane: a vast dark stone plaza or dark still water, and lying on it in perspective a huge ancient engraved ring (the Ring of Seven Dragons) with seven softly glowing gem seats around it (see palette order), the east seat empty and dark with a broken section of the ring.
The centre 60% of the image must stay dark, calm and low-contrast — playing cards are placed on top of it. No bright spots in the middle. Overall quite dark, cinematic.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```

## card_back — 카드 뒷면 · 덱 맨 위
저장 파일 `img/ui/deck/card_back_plain.png` · 1000×1400 PNG · 참고 그림: `tools/art/ref/card_back.png`

글씨 없는 원본(card_back_plain.png). 만든 뒤 python tools/art/cardback_text.py 로 ETHERION 글씨를 얹어 card_back.png를 굽는다(v3.19.2). 덱 맨 위 · 상대 핸드 · 뽑혀 날아오는 카드가 함께 쓴다(5:7). 덱 옆면(금박)과 장수는 코드. 모서리는 CSS가 둥글게 자른다.

```
The back side of a playing card, portrait 5:7, filling the whole image edge to edge (no background around the card).
Thin black outer edge, then a hammered gold border, inside a deep indigo-violet nebula field with a faint diamond lattice and tiny stars, ornate gold corner brackets with small sky-blue gems in the four corners, small gold diamonds at top and bottom centre.
Centre: the ETHERION sigil — an outer ring of seven carved wedge-shaped bronze/adamant stones (the seven giants), inside a gold ring with seven round element gems in the palette order and an EMPTY dark socket in the east (right) with a dotted broken ring segment, a five-pointed star drawn in violet light lines (#a57ae6) inside a thin circle, and at the very centre an EMPTY black circle with a gold rim (Arche — nothing inside it).
Symmetrical, precise, ornamental, readable at small size (96 px wide).
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```

## pyre_back — 소각장(성화대) — 뒤 층
저장 파일 `img/ui/pyre/pyre_back.png` · 800×1120 PNG · 참고 그림: `tools/art/ref/pyre_back.png`, `tools/art/ref/pyre_full.png`

세 층(뒤 → 타는 카드 → 불꽃 → 앞 테두리) 중 맨 뒤. 그릇 · 안쪽 잔불 · 손잡이 · 받침. 투명 모양은 지금 그림 그대로 씌운다.

```
Isolated object on a transparent background: a wide hammered-bronze ritual brazier bowl seen slightly from above, the inside of the bowl glowing with red-orange embers and charred black fragments, a thin gold rim, two round ring handles left and right, a band of small glowing rune marks and seven tiny element gems around the bowl's outer side (east seat empty).
Below: a short dark stone stem and a three-step dark violet-black stone base; the bottom step has seven small carved rectangular niches outlined in gold (the seven giants).
The bowl and base occupy the lower part of the image exactly as in the reference; everything above the bowl is empty/transparent. NO flames in this layer (flames are a separate layer).
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```

## pyre_fire — 소각장(성화대) — 불꽃 층
저장 파일 `img/ui/pyre/pyre_fire.png` · 800×1120 PNG · 참고 그림: `tools/art/ref/pyre_fire.png`, `out:pyre_back`

화면 합성(screen)으로 얹는 불꽃. 검은 바탕으로 그리면 검정이 투명이 된다. 불꽃 밑동은 그림 높이 약 69~76%(그릇 안). 불이 없을 때는 코드가 낮게 줄여 잔불로 쓴다.

```
Only flames on a pure black background (#000000), nothing else: a tall magical fire rising from the inside of a bowl (the base of the flames is a flat line at about 72-76% of the image height, width about 70% of the image).
Colour: white-hot gold-orange at the base, turning into ether sky-blue (#8fdcff) at the tips, with a few orange and sky-blue sparks drifting upward. Painterly, soft glowing edges.
Same position and size as the reference flame. No bowl, no ground, no smoke clouds.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```

## pyre_front — 소각장(성화대) — 앞 테두리 층
저장 파일 `img/ui/pyre/pyre_front.png` · 800×1120 PNG · 참고 그림: `tools/art/ref/pyre_front.png`, `out:pyre_back`

타는 카드 · 불꽃 앞에 오는 그릇의 앞 테두리(금 고리)만.

```
Isolated on transparent background: only the thin elliptical gold rim of the brazier bowl (front lip), polished hammered gold with tiny diamond studs, exactly matching the bowl of the reference in size and position. Nothing else.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```

## ether_back — 에테르 제단 — 뒤 층 (삼위일체: 신 · 거인 · 용, 원판 없음)
저장 파일 `img/ui/ether/ether_back.png` · 720×720 PNG · 참고 그림: 없음

에테르 원형 장치의 그림(v3.24.3 원판 없음). 세계관 1장의 세 갈래 — 위 신(뜻) · 왼쪽 아래 거인(몸) · 오른쪽 아래 용(힘)이 정삼각형 구도로 둘러싼다. v3.19.8 그림은 세 존재가 큰 돌 원판(도넛) 안에 갇혀 있었다 → 둥근 것은 가운데 구멍 둘레의 얇은 룬 고리 하나뿐, 세 존재는 틀 · 원판 · 배경판 없이 저마다의 실루엣으로 서고, 그림 바깥 윤곽은 날개 · 어깨 · 뿔이 만드는 들쭉날쭉한 모양. 지킬 것: ① 가운데 지름 46%(330px) 원은 완전히 비운다 — 코드가 하늘빛 구슬과 숫자를 그 위에 그린다. ② 지름 46~60% 얇은 룬 고리만 — 결정 9칸 · 정수가 그 위에 놓인다. ③ 세 존재는 그 바깥, 사이사이는 어두운 바탕(빛은 몸 둘레에만). ④ 세 존재가 그림 틀 안에 다 들어온다. 게임에 넣을 때 js/game.js ETHER_ART.size = 104 × 그림 px ÷ 구멍 px, 결정이 겹치면 ETHER_SLOTS.

```
Square composition on a plain flat very dark background (#07080d), seen from the front: the ether altar emblem of a dark-fantasy card game.
In the exact centre, a perfectly round EMPTY hole 46% of the image width: plain flat dark background only, nothing painted inside it.
Directly around the hole, one thin calm ring of worn gold and stone with faint glowing ancient runes, out to about 60% of the image width. This thin rune ring is the only circular shape in the whole image.
Around the ring, three colossal beings of the ether stand free in an equilateral triangle, each leaning toward the centre — with no frame, no disc, no plate and no background panel behind them; each is a free-standing figure with its own natural silhouette against the dark background: at the top, a radiant winged god with a five-pointed star halo, arms opening toward the centre (will, arcane violet and gold light); at the bottom left, a massive mountain-stone giant veined with glowing adamant magma, shoulder and fist turned toward the centre (body, brass and ember orange); at the bottom right, a roaring jade-green horned dragon with spread wings, curling toward the centre (power, verdant light).
Each being carries its own light only close to its body — soft glow, mist, embers, sparks — fading into the dark background; clear dark gaps separate the three. The outer outline of the emblem is irregular, shaped by wings, shoulders, horns and tail, not round.
All three stay outside the rune ring and fully inside the square with a small dark margin; the emblem fills about 95% of the square and reads clearly at small size (about 120 px on screen).
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
No outer circle, no round disc, no donut-shaped stone plate, no medallion, no coin, no wreath, no rosette, no circular border or circular background behind the three beings; the only round thing is the thin rune ring around the empty centre.
No nebula, starfield or coloured backdrop filling the space between the beings — between them is the plain dark background.
Do not paint a central orb, gem, sphere, portal or glowing core — the centre stays empty dark background. Do not paint crystals arranged as slots or counters.
No part of the three beings enters the rune ring or the empty centre. Nothing is cut off by the edges of the image.
```

## ether_front — 에테르 제단 — 앞 층 (선택)
저장 파일 `img/ui/ether/ether_front.png` · 720×720 PNG · 참고 그림: `out:ether_back`

선택. 구슬 앞에 겹칠 부분만(구슬을 감싸는 발톱 · 몸 토막 · 앞 테두리 등). 없으면 만들지 않아도 된다 — 뒤 층만으로도 게임에 들어간다.

```
Isolated on transparent background, matching the altar of the reference: only the elements that pass in front of the central orb (for example claws gripping it or a segment of the coil crossing its lower edge). Same materials and light as the reference. Everything else transparent.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Match the reference exactly in position and size; paint only the parts that overlap the front of the central orb, leave everything else transparent.
```

## heart_glass — 생명(심장석) — 빈 보석
저장 파일 `img/ui/life/heart_glass.png` · 480×600 PNG · 참고 그림: `tools/art/ref/heart_glass.png`

생명이 빠진 부분에 보이는 어두운 빈 보석. 세 장(빈 보석 · 핏빛 · 금 테)이 정확히 겹친다.

```
Isolated on transparent background: a large faceted gem shaped like an elongated hexagonal shield (pointed top, pointed bottom), dark smoky garnet glass, almost empty and drained, with subtle facet lines and one soft white highlight at upper left. Exactly the same outline and facets as the reference.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```

## heart_blood — 생명(심장석) — 핏빛 보석
저장 파일 `img/ui/life/heart_blood.png` · 480×600 PNG · 참고 그림: `tools/art/ref/heart_blood.png`, `out:heart_glass`

생명만큼 아래에서 차오르는 층(코드가 위를 잘라 냄). 위아래 어디를 잘라도 어색하지 않게 고르게.

```
Isolated on transparent background: the same faceted gem as the reference, but full of glowing living blood-red light (#e0344a to deep crimson), bright core in the centre, luminous facets, faint inner swirl like a beating heart. Light evenly distributed from top to bottom (the game crops it from the top). Exactly the same outline and facets.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```

## heart_top — 생명(심장석) — 금 테
저장 파일 `img/ui/life/heart_top.png` · 480×600 PNG · 참고 그림: `tools/art/ref/heart_top.png`, `out:heart_blood`

보석 위에 얹는 금 테와 네 발톱 장식. 가운데는 비워 둔다(보석이 보여야 함). 금 간 자국은 코드.

```
Isolated on transparent background: only an ornate gold bezel frame tracing the outline of the gem, with four leaf-shaped gold prongs at top, bottom, left and right, each with a small red jewel. The inside of the frame is completely empty/transparent. Exactly the same shape as the reference.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```

## crest_logo — 상단 문장 로고 (ETHERION)
저장 파일 `img/ui/crest/crest_logo.png` · 1200×240 PNG · 참고 그림: 없음

상단 띠 가운데 ETHERION 문장 자리. 글자 뒤에 거인(산맥/청동 불빛) · 용(거대한 날개와 목) · 신(오각별 후광과 신성한 빛)의 웅장한 어두운 실루엣이 배치된다. 그림이 있으면 그 그림을 쓰고, 없으면 코드로 된 글자를 쓴다.

```
Ornate fantasy game title logo for 'ETHERION' in a wide horizontal banner format (5:1 aspect ratio), on a pure black or transparent background.
Center: the word 'ETHERION' rendered in carved metallic gold and hammered bronze typography with sharp classical serif edges, intricate glowing golden rune engravings, and soft cyan/violet ether highlights along the bevels.
Behind the lettering, dramatic dark mythical silhouettes of the three world forces:
(1) Left: a colossal stone Giant silhouette rising like a mountain ridge with faint glowing orange mine-lamps and molten bronze seams;
(2) Center-top: a majestic celestial Dragon silhouette spreading massive dark wings over the title, with subtle glowing ether sky-blue (#8fdcff) along its horns, scales, and eyes;
(3) Right: an ethereal divine God silhouette draped in cosmic starlight with a faint glowing five-pointed star halo (#a57ae6) and thin sacred light rays beaming downward.
The overall silhouettes are dark and atmospheric so the gold 'ETHERION' letters remain instantly legible and prominent.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, brass orange #d4893a, arcane violet #a57ae6.
No UI buttons, no border frame, no other text besides 'ETHERION'.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```

## battle_bg_war — 전장 배경 2 (3파전 — 거인 · 용 · 신의 격돌)
저장 파일 `img/ui/battle/battle_bg_war.jpg` · 1920×1080 JPG · 참고 그림: `tools/art/ref/battle_bg.jpg`

전장 두 번째 배경: 잠에서 깨어난 대지의 거인, 하늘을 뒤덮은 원소의 용, 천상에서 강림하는 비술의 신이 격돌하는 3파전 전장. 가운데 60%는 카드 가독성을 위해 어둡고 차분하게 유지.

```
Wide 16:9 cinematic dark-fantasy battle background painting showing the epic three-way clash of the Giant, the Dragon, and the God at night.
Horizon at about 40% height.
Left: a colossal stone and adamantine Giant awakening from the mountains, towering against the stormy sky, steam and glowing orange molten fire bursting from its chest and cracked skin, brandishing a massive stone fist.
Top-Right sky: an enormous ancient elemental Dragon descending through thunderclouds, coils spanning across the sky, jaws wide releasing a torrent of sky-blue ether lightning (#8fdcff), glowing dragon scales and majestic horns.
Far-Right / High heavens: a radiant and terrifying divine manifestation of the God, a celestial towering figure of pure cosmic void and blinding violet-gold starlight (#a57ae6), surrounded by floating geometric glyphs and a colossal glowing five-pointed halo shining through split clouds.
The three titans clash toward the center from three angles (Earth & Fire vs Sky & Ether vs Cosmos & Divinity).
Foreground: dark shattered stone arena with ancient cracked runes, still dark reflective water or obsidian stone floor.
The centre 60% of the image where playing cards are placed must remain dark, shadowed and low-contrast so card text is readable. Keep explosive clashes and bright highlights in the upper sky and far corners.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic cinematic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8, ether sky-blue #8fdcff, brass orange #d4893a, arcane violet #a57ae6.
No text, no letters, no numbers, no signature, no watermark, no UI frame.
Style: dark fantasy game art, painterly digital painting with rich texture, dramatic lighting; theme 'night sky and golden runes'.
Palette: night #07080d / #0d1019, gold #d9b46a / #f6e2a8 / #8a6a2a, ether sky-blue #8fdcff, faction colours brass #d4893a, verdant #6fae55, arcane #a57ae6.
Seven dragon element gems (when a ring of gems appears) in this order clockwise from north: earth #b88a5a (N), wind #9fe3d6 (NE), [east seat EMPTY], fire #ff6b3d (SE), water #4fb3ff (S), forest #58b85f (SW), metal #a9b4c2 (W), lightning #ffd84a (NW). The empty east seat is a dark empty socket.
No text, no letters, no numbers, no signature, no watermark, no UI frame, no buttons.
Keep exactly the same position, size, outline and layout as the reference image; repaint only the surface (materials, light, texture).
```
