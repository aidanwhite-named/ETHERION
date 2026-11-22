# 에픽 (Epic) — 카드 일러스트 프롬프트 (63장, n2)

> 4단 — 웅장하고 힘이 가득하다. 세계가 주인공에 반응한다. 깊은 대기를 가르는 빛줄기, 주인공을 감싸고 주변까지 물들이는 은은한 기운, 깊고 진하게 빛나는 색, 움직이는 날씨와 그 바람에 실려 흐르는 보랏빛 비술 입자, 화려하고 귀한 재질과 정교한 세공.

등급 줄(모든 에픽 프롬프트에 들어 있다): `Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 프롬프트 맨 끝 줄이 파일 이름(`<카드ID> <카드 이름>.png`)을 알려 준다 — 나온 그림(가로 5:4)을 그 이름으로 `tools/art/inbox/`에 두고(이름이 달라도 카드 ID만 앞에 있으면 된다) → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저(같은 개체 · 장소 · 배색, 다른 시점 · 새 구도 — 섬네일로 나란히 놓아 같은 개체이면서 한눈에 더 강한 다른 그림으로 읽히는지 본다).

## 1. 그림 없는 카드 — 먼저 그린다 · 57장

### EP-A1-3 · 장막의 처형자
모르카스의 그믐 · 유닛 · 레벨 7 · 에픽 · 틀 `tilt` R X `violetshade` · 프롬프트 n2 → `tools/art/inbox/EP-A1-3 장막의 처형자.png`

```
Landscape 5:4 painting. The frame tips steeply as it comes: a hooded, legless ghost as tall as a gate tower sweeps out of a hanging wall of darkness on the left, torn shroud and rusted chains streaming behind it. Below, a file of pilgrims with torches crosses a narrow causeway, each smaller than one link of its chain, and every torch flame is blown flat to the right. The foremost pilgrim has raised an open hand toward the hollow hood, and the ghost's long misty arm is already coming down over him, fingers spread wider than a cartwheel. Purple-black night with a luminous violet glow inside the hood and along the chains; the torches are a thin line of blown orange sparks.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-A1-3 장막의 처형자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-A2-1 · 성광의 검
솔란테의 새벽 · 공격 마법 · 레벨 2 · 에픽 · 틀 `ring` N C `rosedawn` · 프롬프트 n2 → `tools/art/inbox/US-A2-1 성광의 검.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From high above a dark heath at dawn: a company has locked its round shields into one tight ring on the ground. From the boss of every shield a long blade of pure light is thrusting outward, so the ring has become a sun with thirty straight rays. Where the rays cross the armour of the surrounding enemy, they pass clean through plate and helm as if through mist. Wind flattens the grass outward in rings, and the low fog is blown back in a widening circle. The blades are white-gold and cast long lilac shadows outward from every enemy shape; the retreating fog catches pink-gold.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-A2-1 성광의 검.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-A2-1 · 새벽성 문지기 라마수
솔란테의 새벽 · 유닛 · 레벨 3 · 에픽 · 틀 `front` F B `glare` · 프롬프트 n2 → `tools/art/inbox/EP-A2-1 새벽성 문지기 라마수.png`

```
Landscape 5:4 painting. Dead-on and symmetrical: a white gate arch fills the frame, and square in its opening, low in the picture, stands a winged bull of pale limestone with a crowned, bearded, calm human face, gold inlay glinting in its carved feathers, looking straight at us. A storm of sleet drives in from behind the viewer and stops along the line of its front hooves; behind it the paving is dry and the street blazes with morning. On the left gate-pillar a bull-shaped recess stands empty; on the right its stone twin still sleeps in the wall. White-gold light pours out of the gate behind the bull, turning it into a dark shape with burning edges, while the sleet in front is grey and wind-driven.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-A2-1 새벽성 문지기 라마수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PI-A2 · 솔란테의 날개 깃
솔란테의 새벽 · 아이템 · 레벨 3 · 에픽 · 틀 `used` D R `glare` · 프롬프트 n2 → `tools/art/inbox/PI-A2 솔란테의 날개 깃.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. On a storm-swept pilgrim road, a single white feather as long as a lance stands quill-up at the right of the frame, its tip driven down through a waist-high boundary stone that it has sliced cleanly in two, the cut faces smooth as mirrors. Rain drives sideways across the whole road, yet around the feather the drops slow, hang and slide away, leaving a calm dry sheath of air. Far above it the storm cloud has opened in one long feather-shaped rift. The feather blazes white-gold from within and the rift above pours the same light down; road, rain and split stone are dark shapes against it.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PI-A2 솔란테의 날개 깃.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-A2-2 · 태양 심판
솔란테의 새벽 · 공용 마법 · 레벨 3 · 에픽 · 틀 `column` D L `glare` · 프롬프트 n2 → `tools/art/inbox/US-A2-2 태양 심판.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. High noon over a packed battle line, every shadow shrunk to a small pool underfoot. From a small white sun at the very top of the frame, two needle-straight columns of concentrated light stand down into a thicket of raised weapons — one on the tallest greatsword at the left, one on the second-tallest halberd. Both blades are white-hot from the tip downward, beads of molten steel running to the hilt, heat shimmer bending the air. Every lower blade around them is untouched, and the dust between hangs in slow bright curtains. Vertical midday glare from straight overhead, white-gold and merciless, with the crowd below reduced to dark shapes and short black shadows.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-A2-2 태양 심판.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-A2-2 · 황혼 장벽 파수장
솔란테의 새벽 · 유닛 · 레벨 5 · 에픽 · 틀 `eye` L R `rosedawn` · 프롬프트 n2 → `tools/art/inbox/EP-A2-2 황혼 장벽 파수장.png`

```
Landscape 5:4 painting. On the walk of an immense white wall, standing beside its captain: a tall white wolf in scarred pale armour holds the outermost bastion at the right, upright on his hind legs a step ahead of his sentries, facing left with ears forward and one gauntleted forepaw raised. Left of the wall the land is empty — flat, colourless, featureless — and from it a towering bank of grey dust is rolling in. Its first gust breaks on his breastplate and comes apart into clean bright air; his cloak streams back toward the lit city side. Late pink-gold light comes from the city side behind him, warm on his back and the wall, while the grey front ahead swallows all colour.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-A2-2 황혼 장벽 파수장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A2-E · 황혼 장벽의 맹세자
솔란테의 새벽 · 유닛 · 레벨 6 · 에픽 · 틀 `echo` R B `glare` · 프롬프트 n2 → `tools/art/inbox/PN-A2-E 황혼 장벽의 맹세자.png`

```
Landscape 5:4 painting. Low in the frame an ancient suit of hollow white-gold armour kneels before a sealed door of grey stone, both gauntlets pressed flat on its seam, a steady light glowing inside the empty visor, helm bowed to the right — one figure, perfectly sharp. Everything around it is painted as many moments at once: the sun as a string of overlapping discs arcing over the wall, drifts of snow, leaves and dust lying in layers against its greaves, ivy that has climbed its grounded lance. A sheet of light as thin as glass still covers the door under its hands. The streak of overlapping suns blazes white-gold across the top of the frame; the kneeling armour and the grey door are dark, clear shapes beneath it.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A2-E 황혼 장벽의 맹세자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-A2-3 · 황혼의 대천사
솔란테의 새벽 · 유닛 · 레벨 7 · 에픽 · 틀 `pov` R R `stainedglass` · 프롬프트 n2 → `tools/art/inbox/EP-A2-3 황혼의 대천사.png`

```
Landscape 5:4 painting. First person, from the ranks sheltering beneath it: our own gauntleted hand rises at the bottom edge to shade our eyes, and overhead one colossal wing roofs the whole sky, each feather as long as a ship's sail, sunlight glowing through them in bands of colour. The wing reaches in from the right, where its owner towers over the field in gold armour, as tall as a citadel keep. A storm of dark missiles bursts into sparks along the wing's upper side. Under its far edge the sun is low and red, still above the horizon. Low sun shines through the feathers from above, laying jewel-coloured patches on helmets and spear-points in the deep shade beneath.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-A2-3 황혼의 대천사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PI-A3 · 벨루미르의 별 시위
벨루미르의 별 · 아이템 · 레벨 2 · 에픽 · 틀 `hand` R C `duskrose` · 프롬프트 n2 → `tools/art/inbox/PI-A3 벨루미르의 별 시위.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. One hand in a worn three-finger shooting glove, cropped at the wrist, holds a bowstring at full draw in the centre of the frame, pulling toward the right. The string is the subject: three strands of twisted starlight, thin as fishing line, with pin-sized stars strung along it like dew on a spider's thread, bending sharply round the fingertips. Where the string touches the leather, a hard silver frost has spread over the glove and set it rigid in the pose of the pull. A spent enemy arrow spins away, flicked aside by the taut string. Rose and peach dusk behind the hand, deep teal in the glove's shadows; the string's own white starlight outshines the sky.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PI-A3 벨루미르의 별 시위.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-A3-1 · 바늘탑의 실프 사수
벨루미르의 별 · 유닛 · 레벨 3 · 에픽 · 틀 `pov` F C `duskrose` · 프롬프트 n2 → `tools/art/inbox/EP-A3-1 바늘탑의 실프 사수.png`

```
Landscape 5:4 painting. First person, as her target: we look down a long tunnel that the wind has bored through the cloud for her, its spiralling walls narrowing to a bright ring far away. In that ring at the centre stands a slender half-transparent girl of moving air, hair and limbs streaming into gusts, holding a bow whose empty string still quivers. Halfway along the tunnel, already large and coming straight at us, flies what she loosed in place of an arrow: a single hard point of starlight with a few thin silver strokes around it. Rose and peach dusk glows through the tunnel's far mouth behind her; the cloud walls are deep teal, and the star point is white.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-A3-1 바늘탑의 실프 사수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-A3-2 · 벨루미르의 눈
벨루미르의 별 · 공용 마법 · 레벨 3 · 에픽 · 틀 `through` D T `aurora` · 프롬프트 n2 → `tools/art/inbox/US-A3-2 벨루미르의 눈.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Framed between two upraised blades that have stopped dead in the dark foreground, the fists that hold them cropped at the bottom corners: beyond them a whole battlefield stands halted, small and still. In the upper part of the frame the night cloud has drawn apart into one long lens-shaped opening like a lid lifting. Inside it the stars are gathered into a round iris with a dark pupil of empty sky at its centre, turned downward, and a single cone of cold light falls from it across every lifted blade. Teal-green and violet aurora fringes the edges of the opening; the cone of light is cold white and throws long shadows toward us.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-A3-2 벨루미르의 눈.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### NA3-4 · 바람의 사냥
벨루미르의 별 · 공용 마법 · 레벨 4 · 에픽 · 틀 `path` R X `moonsilver` · 프롬프트 n2 → `tools/art/inbox/NA3-4 바람의 사냥.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At the left edge a huge ivory hunting horn banded in silver is chained to a rock ledge above the clouds, its bell pointing right, frost shaken from it in a ring. Out of the bell rolls a gale made visible: a long widening funnel of torn cloud running the whole width of the frame, with a hundred arrows riding inside it point-first like a shoal of fish. The front of the funnel has taken the shape of running hounds, mist-bodied and stretched flat out, baying toward the right. Full moon above the cloud sea: blue-silver light on the horn and the funnel's upper edge, sharp shadow beneath, teal in the hounds' wake.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: NA3-4 바람의 사냥.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-A3-2 · 번개구름 고래
벨루미르의 별 · 유닛 · 레벨 5 · 에픽 · 틀 `far` R T `stormcloud` · 프롬프트 n2 → `tools/art/inbox/EP-A3-2 번개구름 고래.png`

```
Landscape 5:4 painting. Far across a rain-dark plain, a thundercloud in the unmistakable shape of a whale swims slowly to the right along the top of the frame, storm-grey flanks billowing, tail flukes trailing mist, lightning flickering inside its body like veins. Out at the edges of the storm the lightning falls in thin threads. Directly beneath the whale's belly every bolt comes down as thick as a tree trunk, a row of white pillars standing on the plain, and a line of tiny bowmen below raises its bows in salute. Grey-violet storm dusk; the thick bolts under the whale light its belly white from below and silver the rain around them.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-A3-2 번개구름 고래.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A3-E · 이사크의 첫 제자
벨루미르의 별 · 유닛 · 레벨 6 · 에픽 · 틀 `close` L R `starindigo` · 프롬프트 n2 → `tools/art/inbox/PN-A3-E 이사크의 첫 제자.png`

```
Landscape 5:4 painting. Close on the head and shoulders of a snow leopard archer in the right of the frame, face lifted to the upper left an instant after the shot: bow arm still stretched skyward, string paw open beside a small round ear, silver rosetted fur blown back. A second, older bow is slung across the back, its grip bound in faded cord. Beyond the bow a dotted line of tiny lights climbs to one bright star, every arrow ever loosed from this spot, still on its way, and the high cloud has drawn aside in a lane to let them pass. Indigo night full of stars; the one aimed-at star is brightest and puts a thin silver edge on the cheek, whiskers and bow limb.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A3-E 이사크의 첫 제자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-A3-3 · 하늘 요람의 감시자
벨루미르의 별 · 유닛 · 레벨 7 · 에픽 · 틀 `front` F C `starindigo` · 프롬프트 n2 → `tools/art/inbox/EP-A3-3 하늘 요람의 감시자.png`

```
Landscape 5:4 painting. Face to face with it, dead centre: an owl the size of a hill fills the frame, perched on a round stone gate that serves it as a branch, its indigo plumage dotted with so many silver points that its outline melts into the night sky behind it. Only the two round gold eyes are certain, staring straight at us. Low in front of its breast a long pale dragon of wind has stopped in the middle of a loop, thin as a thread beside the owl, and the weathercock it stole is slipping from its claws. Moonless indigo night thick with stars; the gold eyes are the light, gilding the gate stones and the dragon's pale coils.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-A3-3 하늘 요람의 감시자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-B1-1 · 유폭
도르마크의 심장불 · 공격 마법 · 레벨 2 · 에픽 · 틀 `column` U C `coldnight` · 프롬프트 n2 → `tools/art/inbox/US-B1-1 유폭.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A single pillar of fire and smoke stands in the centre of the frame, rising from a dropped powder sack on a night road straight up through the cloud layer, where it has punched a ring-shaped hole and the clouds are rolling back from it. At its foot the blast spreads sideways in a low expanding ring that is lifting a whole line of shields, carts and tent-poles off the ground. The pillar's upper half mushrooms above the clouds. Deep indigo night; the pillar lights the undersides of the retreating clouds orange and throws long shadows outward along the road.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-B1-1 유폭.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-B1-1 · 포르탄 척탄수장
도르마크의 심장불 · 유닛 · 레벨 3 · 에픽 · 틀 `echo` R L `coldnight` · 프롬프트 n2 → `tools/art/inbox/EP-B1-1 포르탄 척탄수장.png`

```
Landscape 5:4 painting. On a storm-lashed parapet a wiry long-armed monkey with soot-dark fur and a crest of flame stands braced in the left third, bandoliers heavy with round grenades. Its throwing arm repeats in eight overlapping ghost positions like an opening fan, and from each a fizzing grenade has just left: dozens of them hang in a wide rising arc that sweeps across the whole sky to the right, every lit fuse drawing its own bright thread through the slanting rain. Indigo storm night with wind-torn cloud; the swarm of fuse-sparks lights the rain and its bared teeth from the right.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-B1-1 포르탄 척탄수장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PI-B1 · 도르마크의 심장불
도르마크의 심장불 · 아이템 · 레벨 3 · 에픽 · 틀 `found` N B `whitehot` · 프롬프트 n2 → `tools/art/inbox/PI-B1 도르마크의 심장불.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. A fist-sized clot of living fire lies where it was set down on a slab of black basalt in the lower part of the frame, and it has melted itself a shallow glassy bowl in the rock. Rain is falling hard, and every drop turns to steam before it lands, so a white column climbs from the fire into the storm. A pair of long iron tongs lies beside it, the tips drooping and half melted. Storm dark; the clot is the light, blinding yellow-white at its heart, turning the steam column orange and the wet rock crimson.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PI-B1 도르마크의 심장불.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-B1-2 · 도르마크 포격
도르마크의 심장불 · 공격 마법 · 레벨 4 · 에픽 · 틀 `path` L X `magmadusk` · 프롬프트 n2 → `tools/art/inbox/US-B1-2 도르마크 포격.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A side view of one shell's whole flight across a stormy dusk sky, from right to left: its glowing trail climbs out of the lower right, and high in the middle of the frame the shell has burst once — a wide ring of fire and sparks pushing the storm clouds apart. Out of that ring a white-hot core has kept going, and at the lower left it strikes the ridge and bursts a second time, larger, the two blasts joined by one curving thread of light. Violet-brown storm dusk with rain curtains on the horizon; both bursts light the cloud bellies from inside, the land below in wine-dark shadow.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-B1-2 도르마크 포격.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-B1-2 · 화관의 불사조
도르마크의 심장불 · 유닛 · 레벨 5 · 에픽 · 틀 `over` D L `magmadusk` · 프롬프트 n2 → `tools/art/inbox/EP-B1-2 화관의 불사조.png`

```
Landscape 5:4 painting. Over the shoulder of a great bird of fire in a vertical dive: its blazing head and one swept-back wing fill the upper left, feathers burning to ash and rekindling in the slipstream, long flame plumes streaming up out of frame. We look straight down past its beak through a hole punched in the cloud deck to a tiny gun battery on a mountain spur far below, where one lit fuse shows as a single pinpoint. Wine-red dusk above the clouds, the volcanic slopes glowing from below through the gap; the bird's own fire lights the torn cloud edges.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-B1-2 화관의 불사조.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B1-E · 뛰는 심장불 조각
도르마크의 심장불 · 유닛 · 레벨 6 · 에픽 · 틀 `reflect` N C `coldnight` · 프롬프트 n2 → `tools/art/inbox/PN-B1-E 뛰는 심장불 조각.png`

```
Landscape 5:4 painting. A still black crater lake fills the frame, and in it hangs the reflection of a jagged ember the size of a boulder — a glowing crystal with a cracked rock rind, floating just above the water, the real thing cropped by the top edge. Each beat of its light sends a perfect ring racing outward across the lake, so the reflection trembles inside five concentric circles. Shore pebbles hover a finger's width above the ground, mist recoiling from every pulse. Deep indigo night; the shard's orange-white pulse is the only light, caught on each ring crest and on the underside of the mist.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B1-E 뛰는 심장불 조각.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-B1-3 · 용을 노린 거포
도르마크의 심장불 · 유닛 · 레벨 7 · 에픽 · 틀 `profile` L R `ashfall` · 프롬프트 n2 → `tools/art/inbox/EP-B1-3 용을 노린 거포.png`

```
Landscape 5:4 painting. In strict side view a monstrous cast-iron cannon, long as a street and filling the right two-thirds of the frame, rears its barrel like a raised head toward the left, carriage wheels splayed like forelegs, snapped chains swinging, scaffolding and ladders clinging to its flank like twigs. Its muzzle glows dull red. Far away at the left edge, beyond a driving ash-storm, a volcano smokes, and a tiny winged shape circles its summit. Pale storm light sifted through blowing ash, with lightning flickering in the volcano's plume; the heating muzzle is the one warm note.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-B1-3 용을 노린 거포.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-B2-2 · 강철 행군
소르그림의 방패 · 공격 마법 · 레벨 2 · 에픽 · 틀 `far` L X `snowlight` · 프롬프트 n2 → `tools/art/inbox/US-B2-2 강철 행군.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. High across a valley, the whole mountain range in view: along the valley floor a column of square steel ranks advances toward the left, small as a line of stitches, every right foot down at the same instant. The mountains answer the step. From each peak along the skyline an identical plume of snow has let go together, a row of avalanches starting in unison; the ice of a frozen lake has cracked in straight parallel lines; and a flock of rooks has gone up from the pines in a single sheet. Foreground pebbles hover above their ledge. Bright overcast mountain daylight, snow white and granite grey; the column is a thread of dull steel, the avalanche plumes softly lit from above.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-B2-2 강철 행군.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-B2-1 · 가시철 고슴도치
소르그림의 방패 · 유닛 · 레벨 3 · 에픽 · 틀 `high` N R `snowlight` · 프롬프트 n2 → `tools/art/inbox/EP-B2-1 가시철 고슴도치.png`

```
Landscape 5:4 painting. Looking steeply down into a mountain pass during a blizzard: at the right the pass narrows to a slot between two rock walls, one cart wide, and the slot is plugged by a single curled ball of iron spikes the size of a boar — rivets and nails for spines, a wet black nose just showing. Snapped spear shafts and a bent sword stand stuck in it. Back from the plug, down every switchback to the left edge, an entire invading column has stalled: carts, banners, a grounded battering ram, hundreds of small figures stamping their feet. Snow-white storm light with driving flakes; granite walls grey, the spiked ball a dark steel knot dusted white on its windward side.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-B2-1 가시철 고슴도치.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PI-B2 · 소르그림의 힘줄
소르그림의 방패 · 아이템 · 레벨 3 · 에픽 · 틀 `pair` L L `forgeheart` · 프롬프트 n2 → `tools/art/inbox/PI-B2 소르그림의 힘줄.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. At the left of the frame, on a ledge of an exposed ore face at nightfall, lies a coil of cable as thick as a wrist — dark-red iron fibres twisted like the strands of a tendon, wound in three loops with its free end pointing left. Beside it the cliff shows its source: a vein of the same dark-red ore, bared like a sinew, ending in a clean cut stub with the identical twisted grain. The coil glows dull orange from within. It has burned through its sledge, and the heather around has caught fire. Blue-black nightfall on the mountain; the coil's orange heat lights the cut vein, the charred sledge and the small flames in the heather.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PI-B2 소르그림의 힘줄.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-B2-1 · 철골 해머
소르그림의 방패 · 공격 마법 · 레벨 3 · 에픽 · 틀 `origin` B T `forgeheart` · 프롬프트 n2 → `tools/art/inbox/US-B2-1 철골 해머.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Looking along the hammer from its butt end: we stand behind the last of a single file of square steel machines, each gripping the shoulders of the one ahead, plates locking edge to edge so the file becomes one straight beam running away from us up the frame. At the far end, high in the upper frame, the foremost machines have clenched together into a massive block — the head — hanging over a fortress's gate towers at the top of its swing. Dark-red seams light up in sequence along the beam, back to front, like a pulse. Storm dusk, gunmetal and dim; the orange-red pulse in the seams travels up the beam and gathers as a molten glow inside the raised head.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-B2-1 철골 해머.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-B2-2 · 강철 분쇄 골렘
소르그림의 방패 · 유닛 · 레벨 5 · 에픽 · 틀 `back` B L `patina` · 프롬프트 n2 → `tools/art/inbox/EP-B2-2 강철 분쇄 골렘.png`

```
Landscape 5:4 painting. From behind the rust-brown, hunched back of a mining golem at the left of the frame — boiler stack between its shoulders, forearms ending in blunt steel breaker-heads still grey with quarry dust — we see what its blow has done. The line of tower shields before it has split along one clean fracture, exactly as a rock face splits: plates shearing in flat slabs, rivets spraying like gravel. The crack runs on past the steel, across the ground and up the cliff beyond, where a whole slab of mountain is starting to slide. Dim dust-brown daylight; rust and green-blue stains on the golem's back, steel-grey shards catching light as they fly, the fresh crack pale in dark rock.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-B2-2 강철 분쇄 골렘.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B2-E · 페로스를 본 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 에픽 · 틀 `close` F C `mirror` · 프롬프트 n2 → `tools/art/inbox/PN-B2-E 페로스를 본 골렘.png`

```
Landscape 5:4 painting. The head and chest of a golem fill the frame, facing us, and every plate of it is polished to a perfect mirror. In the curved breastplate we see ourselves as its foes do — a small, warped line of spearmen on a narrow rock bridge, lamps raised, hesitating. But the smooth dome of its face reflects something else entirely, something absent from the cavern: one vast slit-pupilled eye with an iris of molten metal, scaled lids of steel around it, staring out as if it were still in front of the golem. The spearmen's lamps are the only true light, returned as hard silver glare; the reflected eye glows by itself, pale gold in a monochrome mirror.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B2-E 페로스를 본 골렘.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-B2-3 · 두르크하임 성문 거상
소르그림의 방패 · 유닛 · 레벨 7 · 에픽 · 틀 `through` B C `coldsteel` · 프롬프트 n2 → `tools/art/inbox/EP-B2-3 두르크하임 성문 거상.png`

```
Landscape 5:4 painting. Framed by a vast empty gateway in a mountain wall, seen from inside the city: the bare hinge pins on either jamb are thick as tree trunks, and the night wind now pours in through the hole. Out on the causeway beyond, dead centre, the gate itself is walking away from us — a steel colossus whose broad flat back is two riveted door-leaves with a drop-bar across them, a lit guardroom window in one shoulder. Far ahead a line of enemy torches wavers. On the threshold, small as nails, the gate watch stand in a row, cloaks streaming. Blue-grey dusk outside under a hard clear sky; the gateway's inner edge is slate shadow, and one warm window glows in the colossus's shoulder.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-B2-3 두르크하임 성문 거상.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PI-B3 · 즈라크의 번개 병
케라운의 벼락 · 아이템 · 레벨 2 · 에픽 · 틀 `reflect` R R `greensky` · 프롬프트 n2 → `tools/art/inbox/PI-B3 즈라크의 번개 병.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Alone on a storm-swept stone table in the right of the frame stands a tall, heavy-shouldered glass jar, its copper lid torn open from inside and curled back like a peel. A few leftover threads of lightning twitch within. Its curved side mirrors the world behind us: racing cloud, bending grass — and, filling that reflected sky, the vast bright outline of a many-armed figure of lightning leaning down toward its old prison. Eerie flat yellow-green storm light and a gale tearing at the grass; the reflection burns sharper and yellower than anything real in the scene.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PI-B3 즈라크의 번개 병.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-B3-1 · 번개 폭주
케라운의 벼락 · 공격 마법 · 레벨 2 · 에픽 · 틀 `inside` N X `greensky` · 프롬프트 n2 → `tools/art/inbox/US-B3-1 번개 폭주.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. In the middle aisle of a storehouse, in the instant every jar on its tall shelves bursts at once: thousands of glass shards hang in the air like frozen hail, and six freed bolts go wild among them, each a different way — one corkscrewing up through the roof, one skipping along a rafter, two caroming off the iron pillars, one diving to the floor, one swerving straight toward us. Slates lift off overhead and storm rain pours in through the holes. Sick yellow-green storm light through the broken roof; the bolts are hard yellow and every shard carries a spark.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-B3-1 번개 폭주.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-B3-1 · 볼타리움 방전 실험체
케라운의 벼락 · 유닛 · 레벨 3 · 에픽 · 틀 `over` B T `thunderhead` · 프롬프트 n2 → `tools/art/inbox/EP-B3-1 볼타리움 방전 실험체.png`

```
Landscape 5:4 painting. Over the hunched shoulder of a stitched-together creature — patched hide laced with copper wire, a bolt at the neck, glass gauges sunk into its back — standing on a rain-swept rampart with its back to us. The upper frame is a sky full of incoming arrows and slung stones, and from the electrodes along its spine thin crooked arcs leap up to them one by one; each missile touched goes dark and drops, smoking, like a shot bird. Storm dusk with driving rain; the arcs light the downpour in yellow sheets and rim the creature's wet shoulders against black cloud.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-B3-1 볼타리움 방전 실험체.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-B3-2 · 케라운의 신경
케라운의 벼락 · 공격 마법 · 레벨 3 · 에픽 · 틀 `column` U L `thunderhead` · 프롬프트 n2 → `tools/art/inbox/US-B3-2 케라운의 신경.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Out of a long seam that has opened in the earth from our feet to the horizon, four pillars of lightning stand straight up into the cloud in a receding row: the nearest, in the left of the frame, as thick as an old oak and blinding, the next two a little slimmer, the last far off and thin. Each has punched a glowing hole in the overcast, rings of flung gravel and dust hang around their bases, and at the foot of the nearest a timber palisade is flying apart in splinters. The pillars light the underside of the black storm in yellow-white rings and throw four sets of long shadows across the scorched ground.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-B3-2 케라운의 신경.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-B3-2 · 연쇄 번개뱀
케라운의 벼락 · 유닛 · 레벨 5 · 에픽 · 틀 `front` F C `cobalt` · 프롬프트 n2 → `tools/art/inbox/EP-B3-2 연쇄 번개뱀.png`

```
Landscape 5:4 painting. Head-on and symmetrical: the open jaws of a serpent made of living lightning rush straight at us in the centre of the frame, fangs of white fire, eyes like arc lamps. Behind the head its zigzag body runs back down the middle of a drowned parade ground, threaded through a receding row of empty iron armours on posts like a needle through beads — each breastplate it has passed glows and steams in the rain. A night downpour; the serpent's white-blue body lights the falling rain from within, and its glare shivers across the flooded ground.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-B3-2 연쇄 번개뱀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B3-E · 케라운 신경 증폭기
케라운의 벼락 · 유닛 · 레벨 6 · 에픽 · 틀 `far` R C `cobalt` · 프롬프트 n2 → `tools/art/inbox/PN-B3-E 케라운 신경 증폭기.png`

```
Landscape 5:4 painting. Far across a flat night heath, a single seam of light runs dead straight along the ground from the left edge to the horizon — an exposed nerve of the land. Small in the centre, a walking machine as tall as a windmill straddles it on long legs, a copper-banded glass drum slung beneath like a spider's body, drinking the glow. A pulse has just passed through it and races on to the right, and every pylon standing in line down the seam shudders in a ring of sparks while the clouds above brighten in the same row. Cobalt darkness; the seam and the travelling pulse are the light, laying long shadows outward to both sides.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B3-E 케라운 신경 증폭기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-B3-3 · 케라운의 피뢰탑
케라운의 벼락 · 유닛 · 레벨 7 · 에픽 · 틀 `cut` R L `wetglass` · 프롬프트 n2 → `tools/art/inbox/EP-B3-3 케라운의 피뢰탑.png`

```
Landscape 5:4 painting. A cross-section through the storm plateau. In the lower half, cut open like a diagram, a root of pale branching light as thick as a river lies in the black rock — a sleeping nerve. Above, in the left of the frame, a colossal lattice tower bristling with rods walks to the right across the surface on four iron legs, and from each foot a copper taproot plunges down through the stone to drink from the nerve; the lifted foot trails its root, dripping sparks, as rain sweeps past in sheets. Rain-grey daylight above ground; below, the nerve glows yellow-white and lights the cut rock from inside.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-B3-3 케라운의 피뢰탑.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-G1-1 · 결투 신청
고르바스의 발톱 · 공격 마법 · 레벨 2 · 에픽 · 틀 `path` R R `redearth` · 프롬프트 n2 → `tools/art/inbox/US-G1-1 결투 신청.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from the side across a storm-dark plain: a heavy throwing blade spins from left to right high over two facing battle lines, its flight drawn as a long arc of scattered dust, and the grass beneath that arc is parting into a straight open lane as both lines pull back from it. The blade is a heartbeat from landing point-down at the feet of the tallest figure on the right — a towering armoured champion who has already lowered his visor toward it. Slate storm clouds split along the same arc, and one hard shaft of light follows the blade down onto red clay.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-G1-1 결투 신청.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-G1-1 · 흑요 사이클롭스 투사
고르바스의 발톱 · 유닛 · 레벨 3 · 에픽 · 틀 `far` B R `ochredust` · 프롬프트 n2 → `tools/art/inbox/EP-G1-1 흑요 사이클롭스 투사.png`

```
Landscape 5:4 painting. Far below a towering mountain wall, small in the lower right of the frame, a one-eyed giant pit fighter stands with his back to us in a ring of trampled clay, one fist — sheathed in a gauntlet studded with black obsidian — raised over a fallen opponent's club. A wind-driven curtain of dust sweeps the crowd around the ring. High in the mountainside above, a slab of rock and pine forest has lifted like an eyelid, and one vast reptile eye looks down at him. Sun through blowing dust; a broad pale shaft falls from the upper left across the open eye and down onto the ring.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-G1-1 흑요 사이클롭스 투사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PI-G1 · 카르노의 결투 장갑
고르바스의 발톱 · 아이템 · 레벨 3 · 에픽 · 틀 `motion` L C `stormslate` · 프롬프트 n2 → `tools/art/inbox/PI-G1 카르노의 결투 장갑.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Caught in mid-air above a trampled hilltop: a single huge gauntlet tumbles through the centre of the frame toward the left, flung away — layered ash-grey hide, knuckle plates of slate-dark scale, a cuff cut with row upon row of small notches, its wrist straps whipping behind it. The wind of its flight has pulled a spiral of dust up after it, and far below, small in the lower right, a crowd of onlookers has turned to follow it, every head tipped back. A slate storm sky churns overhead; one break of pale light catches the knuckle plates and the trailing spiral of dust.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PI-G1 카르노의 결투 장갑.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-G1-2 · 대지의 격노
고르바스의 발톱 · 공격 마법 · 레벨 3 · 에픽 · 틀 `origin` B C `strawgold` · 프롬프트 n2 → `tools/art/inbox/US-G1-2 대지의 격노.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From just behind a line of stamping heels at the bottom edge, looking out along the blow: the plain ahead has stopped being flat — a long hump is travelling away from us under the grass like a shrug under a blanket, lifting boulders and whole stands of pine, and at the horizon it breaks the surface as a ridge of slate-grey scales the size of hills. An enemy line caught on its slope is sliding off both sides. Low sun from the left throws the travelling hump's long umber shadow across pale straw grass; dust lifts off the scales in bright veils.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-G1-2 대지의 격노.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-G1-2 · 털코뿔소 기수
고르바스의 발톱 · 유닛 · 레벨 5 · 에픽 · 틀 `profile` L X `stormslate` · 프롬프트 n2 → `tools/art/inbox/EP-G1-2 털코뿔소 기수.png`

```
Landscape 5:4 painting. Side-on like a long frieze across the whole frame: three ranks of spearmen stand one behind another from right to left, and a woolly rhinoceros charging toward the left has already gone straight through the first two — each shows the same ragged gap, with spears and splintered shafts still spinning in the air above it. Its long forward horn is a hand's width from the third rank. A single war-painted rider lies flat along the shaggy ochre-brown hump, and rain and grit slant across everything. A slate storm front fills the sky; one break of pale light travels with the rhino while the ranks stand in grey rain.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-G1-2 털코뿔소 기수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G1-E · 왕좌봉 맘모스
고르바스의 발톱 · 유닛 · 레벨 6 · 에픽 · 틀 `top` D B `redearth` · 프롬프트 n2 → `tools/art/inbox/PN-G1-E 왕좌봉 맘모스.png`

```
Landscape 5:4 painting. Straight down from the sky onto a steep mountainside: at the bottom of the frame a mammoth ploughs downhill through scree and old snow — domed, rock-crusted head, long spiralling tusks, a back of red-brown wool with one small war-painted rider clinging between the shoulders. Above it the whole upper frame is a spreading fan of landslide: tumbling boulders, red clay, uprooted pines and bursts of snow, its leading edge already at the mammoth's heels. Slate storm light, shadowless; red clay dust and powdered snow boil up from the slide in pale clouds.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G1-E 왕좌봉 맘모스.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-G1-3 · 왕좌봉 결투왕
고르바스의 발톱 · 유닛 · 레벨 7 · 에픽 · 틀 `ground` L L `bonemoon` · 프롬프트 n2 → `tools/art/inbox/EP-G1-3 왕좌봉 결투왕.png`

```
Landscape 5:4 painting. Ground level on a windswept summit at night: in the snow of the foreground lies a trail of snapped spears, a cloven axe haft and a split war club, leading away up the slope. At the end of it, toward the left, a huge scarred silverback gorilla in hide fist-wraps stands hammering one fist against a curved grey claw as tall as a watchtower — the nearest of a row of claws rising out of the snow, each one a hill. A long sleeping breath from somewhere above flattens his fur and hurls ice dust past us. Moonlight on snow, bone-white and grey-blue; the gale of breath carries glittering ice dust across the dark claws.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-G1-3 왕좌봉 결투왕.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-G2-2 · 고목의 분노
베르단의 뿔 · 공격 마법 · 레벨 2 · 에픽 · 틀 `symbol` D C `autumnrot` · 프롬프트 n2 → `tools/art/inbox/US-G2-2 고목의 분노.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. An emblem set up on a storm-lashed hilltop: a rough balance made from one forked bough. On its left pan lies a single cross-cut slab of ancient trunk, ring upon ring too fine to count, and it has slammed down so hard that the ground beneath is cracked and sunk. The right pan, heaped with iron maces, chains and ingots, has been flung high into the air, spilling its load. Gale-driven russet leaves streak across the frame, and far behind, whole rows of old trees are leaning out of the earth. Dark storm light with a low amber break in the cloud behind the balance, edging the slab and the flying iron.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-G2-2 고목의 분노.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-G2-1 · 엉겅퀴 덩굴귀
베르단의 뿔 · 유닛 · 레벨 3 · 에픽 · 틀 `under` L L `mossdeep` · 프롬프트 n2 → `tools/art/inbox/EP-G2-1 엉겅퀴 덩굴귀.png`

```
Landscape 5:4 painting. Under the surface of a rust-brown swamp pool, we look up: the water above ripples with rain, and through it looms the warped dark shape of a beast knotted from thistle and briar, wading leftward along the left of the frame. Its trailing tendrils hang down into the water like drinking straws, each drawing up a twisting thread of rust from the sunken iron around us — a boiler plate, a cartwheel rim, links of chain. Where the tendrils break the surface, their thorns have the grey gleam of forged spikes. Storm daylight filters down green-brown through the pool, and a flash of lightning above the surface outlines the creature for an instant.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-G2-1 엉겅퀴 덩굴귀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PI-G2 · 드리엔의 씨앗
베르단의 뿔 · 아이템 · 레벨 3 · 에픽 · 틀 `found` U B `mossdeep` · 프롬프트 n2 → `tools/art/inbox/PI-G2 드리엔의 씨앗.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Half-buried in the silt at the bottom of a clear forest pool lies a seed the size of a fist, its dark husk cracked open on a core of green light. It has already begun: a white root has gone down into the silt, and a pale stem climbs through the water toward the bright surface, unfolding leaves as it rises. Around it, in a widening ring, the drowned things of the pool have sprouted — a sunken boat-hook wrapped in new shoots, a rotten oar in leaf — and small fish circle in the glow. Shafts of green daylight fall through the wind-rippled surface above, crossing the seed's own steady glow in the dim water.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PI-G2 드리엔의 씨앗.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SG2-08 · 고목 내려찍기
베르단의 뿔 · 공용 마법 · 레벨 4 · 에픽 · 틀 `object` D B `sunshaft` · 프롬프트 n2 → `tools/art/inbox/SG2-08 고목 내려찍기.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At the bottom of a fresh crater lies one object: a great iron tower shield, pressed flat into the earth like a coin into clay, its face stamped with the grain of bark. Around it the ground is cracked in rings, and slabs of shed bark as big as doors lie where they fell, with more still tumbling down the crater wall. Thick drops of amber sap are raining in, and above the rim the shadow of an enormous root is lifting away through swirling dust and torn leaves. Shafts of golden-green sun break through the dust cloud over the crater, striking the flattened shield and each falling drop of sap.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SG2-08 고목 내려찍기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-G2-2 · 실바니엘의 활 드라이어드
베르단의 뿔 · 유닛 · 레벨 5 · 에픽 · 틀 `eye` F L `thorndark` · 프롬프트 n2 → `tools/art/inbox/EP-G2-2 실바니엘의 활 드라이어드.png`

```
Landscape 5:4 painting. On the topmost bough of a giant tree, at arm's length to our left, a slender woman of pale living bark has just loosed her bow straight past us — the string still a blur, her twig fingers open. Already the foliage is closing over her: leaves slide across her shoulder and bow arm like a curtain, leaving one calm eye and a few red blossoms in her leaf-hair uncovered. Wind strips leaves from the crown and whirls them into the dark gulf on the right, where the lamps of a tree-city glimmer far below. Night wind under a thin green moon; her pale bark and the red blossoms catch what little light comes through the leaves.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-G2-2 실바니엘의 활 드라이어드.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G2-E · 태고림 이끼뿔 사슴
베르단의 뿔 · 유닛 · 레벨 6 · 에픽 · 틀 `pov` F L `sunshaft` · 프롬프트 n2 → `tools/art/inbox/PN-G2-E 태고림 이끼뿔 사슴.png`

```
Landscape 5:4 painting. First-person, and far too close: a stag as big as a barn has lowered its head to look at us, its muzzle and one dark eye filling the lower left of the frame. Above them its antlers spread across the whole upper picture carrying an entire small forest — mossy boughs, fern banks, slender birches rooted in the forks — with a wisp of its own cloud snagged in the tines and a flight of finches bursting out as the head moves. Thorned briars hang from the lowest tines like a fringe. Golden-green shafts through moving mist behind the antlers back-light each tiny tree; its breath steams toward us in the cool air.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G2-E 태고림 이끼뿔 사슴.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-G2-3 · 베르단의 고목 거인
베르단의 뿔 · 유닛 · 레벨 7 · 에픽 · 틀 `echo` B L `mossdeep` · 프롬프트 n2 → `tools/art/inbox/EP-G2-3 베르단의 고목 거인.png`

```
Landscape 5:4 painting. Walking away from us down a mountainside of ancient pines, a colossal tree-giant is caught as three overlapping moments of one stride, each ghost of it farther downhill on the left of the frame. Its trunk-body carries a forked crown shaped like a stag's antlers, and tall pines reach only to its root-ankles. In each footprint behind it a thicket of thorns is already sprouting. Low cloud tears open around its shoulders, and a flock of birds scatters at the height of its knees. Storm light breaks through the torn cloud ahead of the giant, rimming its bark in green while the slope behind stays in deep wet shade.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-G2-3 베르단의 고목 거인.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PI-G3 · 마렌시아의 비늘
마렌시아의 노래 · 아이템 · 레벨 2 · 에픽 · 틀 `nature` N L `moontide` · 프롬프트 n2 → `tools/art/inbox/PI-G3 마렌시아의 비늘.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. A single scale as broad as a cartwheel, clear and faintly blue like thick ice, stands on edge in knee-deep sea at the left of the frame. The water has arranged itself around it: the tide parts and flows past on both sides, leaving a pool of perfect calm around it. Moonlight striking the scale leaps off as one long beam across the frame, and in that beam a whole shoal of silver fish hangs stopped in mid-turn, every eye fixed on the light. A high moon behind drifting cloud; the reflected beam is brighter than its source, with faint mist lifting where it touches the water.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PI-G3 마렌시아의 비늘.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-G3-1 · 넬리아의 노래
마렌시아의 노래 · 공용 마법 · 레벨 2 · 에픽 · 틀 `under` D X `trench` · 프롬프트 n2 → `tools/art/inbox/US-G3-1 넬리아의 노래.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Lying on the seabed, we look straight up through a column of deep blue water toward a pale wavering disc of daylight. Sinking slowly toward us, scattered across the whole frame, comes everything the song has rinsed off the listeners above: gilded crests, plumes, enamelled badges, medals on ribbons, a jewelled scabbard, flakes of gold leaf turning as they fall. High overhead the surface flexes with the slow rhythm of a song, each pulse shaking loose another glittering fall. Shafts of cold light slant down from the surface through drifting particles, flashing on each sinking ornament before the dark takes it.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-G3-1 넬리아의 노래.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-G3-1 · 진주빛 해파리
마렌시아의 노래 · 유닛 · 레벨 3 · 에픽 · 틀 `far` R C `stormsea` · 프롬프트 n2 → `tools/art/inbox/EP-G3-1 진주빛 해파리.png`

```
Landscape 5:4 painting. Far out on a storm-dark sea the water has done something strange: around one small glowing shape the swell has stood up into a smooth, steep hill of water, rain sliding off it. Inside, drifting toward the right, hangs a pearl-luminous jellyfish as big as a temple bell, its dome clenched tight and its long tentacles trailing strings of light. A volley of arrows meets the raised water and skids away along its flank as thin silver streaks. Slate squall light and slanting rain; the jellyfish's own glow lights the lifted water from within, a soft green lantern in the gloom.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-G3-1 진주빛 해파리.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-G3-2 · 조수의 귀환
마렌시아의 노래 · 공용 마법 · 레벨 4 · 에픽 · 틀 `path` R L `coraldawn` · 프롬프트 n2 → `tools/art/inbox/US-G3-2 조수의 귀환.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Side-on across a mile of drained tidal flat at dawn: the sea is coming back as one long low wall of foam, racing from left to right, its front set in the left third of the frame. Ahead of it, on the dry right, a palisaded camp with tents and tethered pack beasts is seconds from being swept. Behind it, where it has already passed, beached fishing boats float upright again on calm rose-coloured water, and gulls wheel over the returning tide. The sun rises behind the bore, shooting pink rays through its spray and long shadows across the bare flats.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-G3-2 조수의 귀환.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-G3-2 · 심해 나가 작살 기사
마렌시아의 노래 · 유닛 · 레벨 5 · 에픽 · 틀 `top` R R `glasscalm` · 프롬프트 n2 → `tools/art/inbox/EP-G3-2 심해 나가 작살 기사.png`

```
Landscape 5:4 painting. Straight down from high above onto a windless, fog-pale sea. In the right third a naga floats upright at the centre of its own coiled serpent tail, a spiral of teal scales and fin crests, one arm stretched out to the right, open-handed. Across the rest of the frame a single white wake draws a huge loop over the mirror water — the track of a long barbed harpoon now riding its private current home, shaft-first, toward the waiting palm. The fog itself has peeled away along the loop. Shadowless white fog-light from all around; the loop of wake and the harpoon's wet barbs carry the only bright glints.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-G3-2 심해 나가 작살 기사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G3-E · 우르보아 비늘 기사
마렌시아의 노래 · 유닛 · 레벨 6 · 에픽 · 틀 `through` L R `stormsea` · 프롬프트 n2 → `tools/art/inbox/PN-G3-E 우르보아 비늘 기사.png`

```
Landscape 5:4 painting. Through a fence of levelled spear shafts and driving rain in the foreground, we glimpse it coming: a naga knight rearing on its serpent tail in the right of the frame, advancing left, armoured in the shed scales of some far greater serpent — dark overlapping plates each as broad as a door. Spear points skid off them in spurts of spray and splinter. Behind it the sea heaves under a turning waterspout, and the rain bends toward the armour. Bruised storm light; a pale shaft through the cloud catches the wet scale-plates, and white spray rims the knight from behind.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G3-E 우르보아 비늘 기사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-G3-3 · 마렌시아의 대무녀
마렌시아의 노래 · 유닛 · 레벨 7 · 에픽 · 틀 `front` F B `coraldawn` · 프롬프트 n2 → `tools/art/inbox/EP-G3-3 마렌시아의 대무녀.png`

```
Landscape 5:4 painting. Dead-centre and facing us, a towering priestess shaped of living sea water rises from the waves in the lower part of the frame, foam for hair, sheets of clear water hanging from her wrists like vestments, both hands lifted. Around her, in perfect symmetry, the dawn sea has stood up in a ring of water walls tall as cliffs; inside the translucent wall behind her a vast finned coil slides past — a sea dragon answering. Pilgrims' lanterns line a far causeway like sparks, and a thrown sword passing through her shoulder leaves only a splash. First rose-pink sunlight comes from directly behind her through the standing water, turning the walls and her whole body luminous.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-G3-3 마렌시아의 대무녀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

## 3. 그림 있음 — 그리지 않는다 (참고용) · 6장

### US-A3-1 · 그믐의 계약서 — 그림 있음
모르카스의 그믐 · 핸드 마법 · 레벨 1 · 에픽 · 틀 `far` N T `eclipse` · 프롬프트 n2 → `tools/art/inbox/US-A3-1 그믐의 계약서.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A vast night sky like a sheet of dark parchment, creased with faint fold lines and ruled with thin rows of stars. Where the moon should hang, in the upper part of the frame, sits a great round seal of black wax with a thin bright rim, and two long clouds trail from it like ribbons. Far below on the plain lies an army's camp, small as scattered grain: every campfire in it has shrunk to an ember, every banner hangs wilted on its pole, and the grass around the tents has turned grey in a slowly widening circle. The seal's thin cold rim is the brightest light, as in an eclipse; the camp is silhouette under violet haze, its fires dying red points.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-A3-1 그믐의 계약서.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-A1-1 · 심연 칼날 무희 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 3 · 에픽 · 틀 `echo` R X `violetshade` · 프롬프트 n2 → `tools/art/inbox/EP-A1-1 심연 칼날 무희.png`

```
Landscape 5:4 painting. One turn of a dance shown as five overlapping moments across a small stage: the same tall black mantis in dark silk sashes repeats from left to right in fading afterimages, her two crescent blade-arms drawing one unbroken silver ribbon through all five. The last and sharpest figure, at the right, sinks into a bow with both blades folded behind her back. Along the bottom edge runs a dark row of spectators' heads, and in the middle of the row one seat stands empty, a feathered hat still settling onto its cushion. Violet footlights glow up from the stage edge and rim every afterimage; the house beyond the front row is purple-black.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-A1-1 심연 칼날 무희.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PI-A1 · 모르카스의 저울추 — 그림 있음
모르카스의 그믐 · 아이템 · 레벨 3 · 에픽 · 틀 `stored` N L `eclipse` · 프롬프트 n2 → `tools/art/inbox/PI-A1 모르카스의 저울추.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. In a bare stone niche at the left of the frame sits a single scale weight of black bronze, the size of a fist: a squat cone with a ring handle on top and a closed eye cast in its side, its foot worn bright where it once sat in a pan. The shelf beneath it has dented like soft wax, a crack running to the wall, and everything near leans toward it: a hanging plumb line pulled off true, a spider's thread, the falling dust. Above, the hook it was taken from hangs empty. A thin cold slit of light from behind rims the cone, its ring and the bent plumb line; the niche is black with violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PI-A1 모르카스의 저울추.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-A1-1 · 침묵의 저울 — 그림 있음
모르카스의 그믐 · 공용 마법 · 레벨 3 · 에픽 · 틀 `column` D B `eclipse` · 프롬프트 n2 → `tools/art/inbox/US-A1-1 침묵의 저울.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One taut cable of braided black wire drops the whole height of the frame down a sheer shaft. At its end, low in the picture, a round bronze pan as wide as a courtyard is sinking into rising darkness, carrying two tiny armoured figures who stand back to back, their torch flames stretched straight upward by the descent. At the top edge shows the end of a great beam carved with a closed eye, and beside it a second cable runs up out of sight, tight, while four dark red drops fall from above and pass the sinking pan. A thin cold line of light at the shaft's mouth rims the beam and the cables; below, the two torches are sparks sinking into violet-black.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-A1-1 침묵의 저울.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### EP-A1-2 · 녹타르 처형대장 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 5 · 에픽 · 틀 `profile` R X `bonepale` · 프롬프트 n2 → `tools/art/inbox/EP-A1-2 녹타르 처형대장.png`

```
Landscape 5:4 painting. In strict profile along a stone gallows bridge. At the left end a huge gaunt figure with a stag's skull for a head, antlers pushing through an executioner's hood, has just finished one level swing toward the right, his long-hafted axe at full stretch. A pale arc from the blade runs on down the bridge through a queue of oath-breakers, and they go over one after another like dominoes: the first already flat, the middle ones leaning, the last still upright with his helmet lifting off. Beyond them every hanging rope on the bridge swings out to the right. Bone-white fog fills the canyon behind the bridge and turns figures and ropes to ash-grey shapes; one violet gleam runs along the axe edge.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: EP-A1-2 녹타르 처형대장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A1-E · 심연 장막의 거래인 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 6 · 에픽 · 틀 `silhouette` F C `eclipse` · 프롬프트 n2 → `tools/art/inbox/PN-A1-E 심연 장막의 거래인.png`

```
Landscape 5:4 painting. A tall scarecrow in a long coat and a wide-brimmed hat stands black against a slit of cold light, where a sky-high curtain of darkness has parted behind him. He faces us in the centre, mid-stride, a pedlar's case hanging half-empty from one hand. Straight through his chest runs a clean-edged gap the shape of a missing puzzle piece, and the cold light shines through it onto the ground. Dust, dead leaves and the tails of his coat all stream backward toward the curtain, and a thin line of them is being drawn through the gap in his chest. The slit of pale light behind him rims hat, shoulders and coat; all else is silhouette in violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A1-E 심연 장막의 거래인.png — this is the name of the downloaded file only; the painting itself stays wordless.
```
