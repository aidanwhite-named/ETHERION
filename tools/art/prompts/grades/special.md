# 스페셜 (Special) — 카드 일러스트 프롬프트 (18장, n2)

> 6단(최고) — 눈에 보이는 신화. 가장 신비롭고 강렬하고 화려하다. 깃발마다 하나뿐인 존재(유닛)와 성소의 유물(아이템) — 주인공 자체가 광원이고 광휘가 겹겹이다(흰 불빛 심 · 넓은 후광 · 화면을 가로지르는 진홍과 금의 큰 고리와 긴 빛살). 모든 카드 가운데 가장 빛나는 무지갯빛 색, 불티의 폭풍과 에테르 빛의 장막이 공기를 채우고 땅 · 하늘 · 날씨가 주인공 쪽으로 휜다. 필멸의 솜씨를 넘어 안에서부터 빛나는 재질.

등급 줄(모든 스페셜 프롬프트에 들어 있다): `Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 나온 그림(가로 5:4)은 `tools/art/inbox/<카드ID>.jpg` → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저.

## 3. 그림 있음 — 그리지 않는다 (참고용) · 18장

### SR-A1 · 하르간의 양손검 — 그림 있음
모르카스의 그믐 · 아이템 · 레벨 4 · 스페셜 · 틀 `shrine` R L `frostindigo` · 프롬프트 n2 → `tools/art/inbox/SR-A1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. In a frost-rimmed crypt a sheathed greatsword made for a hand far larger than a man's lies on a black plinth. Its two-handed grip and wide crossguard fill the left third, and the scabbard runs away to the right into the dark, longer than the frame can hold. A tarnished silver chain ties crossguard to scabbard mouth and carries two wax seals, one old and broken, one whole. Along the plinth's foot offerings lie in a row: breastplates and helmets, unbuckled and laid open like empty shells, each smaller than the sword's pommel. Cold blue-violet light falls from a slit high in the crypt wall, silvering frost, chain and crossguard; the scabbard's far end fades into darkness.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SP-A1 · 그림자 없는 아즈라 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 8 · 스페셜 · 틀 `top` B L `violetshade` · 프롬프트 n2 → `tools/art/inbox/SP-A1.jpg`

```
Landscape 5:4 painting. Straight down from high above a canyon city: black roofs, bridges and stairs picked out by violet lamps. Every shadow in it, of towers, bridges and people small as grains, lies stretched toward one point in the left third, like compass needles toward a lodestone. There stands a figure taller than any spire: a body of gathered darkness under a thin crescent crown, face turned down and away, a train of night spilling from her shoulders through the streets like ink. Around her feet lies a ring of bare, bright paving, shadowless. Sunless violet lamplight glows along roof edges and bridge rails in purple-black gloom; the bare ring at her feet shines pale, as if lit from within.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SR-A2 · 세렌의 활 — 그림 있음
솔란테의 새벽 · 아이템 · 레벨 4 · 스페셜 · 틀 `making` N R `stainedglass` · 프롬프트 n2 → `tools/art/inbox/SR-A2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. In a gate chapel a pale silver bow taller than the doorway stands upright in a wooden stringing frame at the right. Its string is being made of light: thin pale-gold beams slant in through a tall coloured window that faces the empty land, and a small twisting-hook at the upper nock has wound a dozen of them into one bright cord reaching halfway down the bow. The remaining beams hang loose in the air like warp threads. A stringer's glove and a block of beeswax at its foot look like toys. Morning sun through stained glass lays jewel-coloured patches on pale stone in deep shade; the pale-gold beams are the brightest things in the chapel.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SP-A2 · 솔란테의 첫 기사 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 8 · 스페셜 · 틀 `far` F T `glare` · 프롬프트 n2 → `tools/art/inbox/SP-A2.jpg`

```
Landscape 5:4 painting. Before sunrise, from far out on the empty plain, a pilgrim road runs straight toward the horizon, and the horizon is a body. Along the top of the frame kneels a figure made wholly of daybreak, facing us: its two outspread wings are the whole band of first light, its upright sword a single ray climbing out of sight. The white citadel stands against its bent knee like a chess piece, towers dark against the glow. Overhead the night sky and its stars stop in a clean arc around the raised blade. White-gold glare pours from the kneeling figure along the horizon; citadel, road and a few pilgrim lanterns are dark shapes and sparks before it under lingering stars.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SR-A3 · 이벨의 깃펜 — 그림 있음
벨루미르의 별 · 아이템 · 레벨 4 · 스페셜 · 틀 `motion` L B `aurora` · 프롬프트 n2 → `tools/art/inbox/SR-A3.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. In a sealed archive hall the floor is a bed of pale sand, raked perfectly smooth. Low in the frame a great white quill, long as a spear, glides alone to the left a hand's breadth above it, its cut nib trailing a ribbon of teal-green and violet light. Under the ribbon, and only there, a line of footprints has appeared in the sand, ending below the nib; ahead the sand lies untouched. Behind, at the right, stands the silver cradle it rose from, ringed by dry inkwells left as offerings. Dark hall lit by the quill's own trail, teal-green and violet like an aurora, rippling over sand, shelves and the silver cradle.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SP-A3 · 별을 푼 이사크 — 그림 있음
벨루미르의 별 · 유닛 · 레벨 8 · 스페셜 · 틀 `tilt` N X `starindigo` · 프롬프트 n2 → `tools/art/inbox/SP-A3.jpg`

```
Landscape 5:4 painting. The sky has been tugged askew: the cloud sea's horizon slants steeply across the frame, and the needle spires along it lean like pins. Above them, spanning the frame from corner to corner, reclines a figure the size of the sky, drawn the way a constellation is drawn: bright points at brow, shoulders, elbows and knees, fine silver lines between, and clear dark wind for flesh. Between its two hands one constellation is half undone; stars slide like beads along a loosened silver thread while the fingers tie them into a new shape. Moonless indigo night dense with stars; the loosened thread and the figure's joint-stars shine silver, and teal wind streaks cross its dark body.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SR-B1 · 도르마크의 갈비뼈 화로 — 그림 있음
도르마크의 심장불 · 아이템 · 레벨 4 · 스페셜 · 틀 `pair` D R `ashfall` · 프롬프트 n2 → `tools/art/inbox/SR-B1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Under the mountain, a vault arched by the ribs of something colossal: ash-pale bone, each rib thick as a tower, curving into the dark. One rib ends in a sawn stump high on the wall. Beneath that gap, in the right of the frame, stands what was made from it — a brazier taller than a doorway, carved from one length of the same pale bone and banded with black iron, full of low orange fire. On the step below, one offering candle burns, and the brazier's flames have doubled, leaning down over the rim toward it. Muted ash-pale gloom under the bone vault; the brazier is the single orange source, throwing long rib shadows up the walls.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SP-B1 · 불을 삼킨 자 — 그림 있음
도르마크의 심장불 · 유닛 · 레벨 8 · 스페셜 · 틀 `far` R L `coldnight` · 프롬프트 n2 → `tools/art/inbox/SP-B1.jpg`

```
Landscape 5:4 painting. Many miles away across a dark ash plain: the tallest peak of a volcanic range, at the left of the frame, is a seated figure of black basalt — knees drawn up like two spurs, shoulders in cloud, a furnace-bright fire showing through the cracks of its ribs. Its head turns to the right and it breathes out: the breath leaves as a level rank of fire-bolts, side by side like one battery's salvo, and along the skyline ahead every crater has lit in answer, one tall flame in each. At its ankle a fortress's chimneys stand small as stubble. Blue-black night with a low moon behind thin smoke; the rib-glow, the salvo and the lit craters string one line of orange across the indigo.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SR-B2 · 소르그림의 첫 갑주 — 그림 있음
소르그림의 방패 · 아이템 · 레벨 4 · 스페셜 · 틀 `through` R B `mirror` · 프롬프트 n2 → `tools/art/inbox/SR-B2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Glimpsed through a reliquary grille whose bars are swords — every one bent back double on itself at the same place — set upright across the foreground. Between them, low in the frame on a block of raw iron ore, rests a cuirass that was grown rather than forged: one hollow knuckle of a colossal rib, grey bone-metal with natural flanges curving round like shoulder guards, two plain leather straps its only made parts, its breast turned toward the right. Its surface is smooth and bright enough to mirror the bent blades. A cold shaft of daylight from a slot in the rock falls on the grey breast; all else is darkness mirrored in silver on the bent blades.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SP-B2 · 철의 심장을 삼킨 자 — 그림 있음
소르그림의 방패 · 유닛 · 레벨 8 · 스페셜 · 틀 `reflect` L R `mirror` · 프롬프트 n2 → `tools/art/inbox/SP-B2.jpg`

```
Landscape 5:4 painting. Across a quenching pool as wide as a parade ground: the far rim crosses mid-frame, lined with small kneeling golems whose eye-lamps are just opening. Above it forge steam hides almost everything: a shadow as tall as the hall, the pale glow of something beating. Below, the black water shows what the steam conceals: upside-down in the right of the frame, a seated colossus of white steel turned toward the left, one hand on an anvil the size of a house, chest plates parted on a heart of silver valves and pistons. The heart's cold silver-white pulse is the only light, soft and blurred in the steam above, sharp and bright in the black water below.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SR-B3 · 케라운의 벼락 심장 — 그림 있음
케라운의 벼락 · 아이템 · 레벨 4 · 스페셜 · 틀 `stand` L T `greensky` · 프롬프트 n2 → `tools/art/inbox/SR-B3.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. On an open hilltop shrine a life-size forearm of green-stained copper rises from a basalt block, palm up, and high in the frame its open hand holds the relic: a helmet-sized shard of a colossal heart turned to dark glass — one curved chamber wall and the stump of a vessel — with a knot of lightning swelling inside. A thick arc winds down the copper forearm in a slow spiral and earths in the stone. Far off at the left a spell flares on the plain, and every spark on the shard leans left toward it, mid-beat. Flat yellow-green storm light before the rain; the shard's swelling glow is electric yellow and lights the copper palm and fingers from within.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SP-B3 · 일곱 번째 — 그림 있음
케라운의 벼락 · 유닛 · 레벨 8 · 스페셜 · 틀 `top` U C `thunderhead` · 프롬프트 n2 → `tools/art/inbox/SP-B3.jpg`

```
Landscape 5:4 painting. Straight down into a generator pit as wide as a town square. At the centre stands a machine of glass vessels and copper hoops, lightning standing inside them in the shape of shoulders and arms, its clear dome head tipped back so the bright knot within and two lamp eyes look straight up at us. Around it six burnt-out sister frames lie slumped and black in a ring, each still cabled to the middle. Under the floor grating a pale root of light branches away. Between the cables, small as rivets, coated makers stand with upturned faces. Night rain falling into the pit; the machine's own yellow lightning and the pale glow under the grating light the black wrecks and the wet upturned faces.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SR-G1 · 고르바스의 부러진 송곳니 — 그림 있음
고르바스의 발톱 · 아이템 · 레벨 4 · 스페셜 · 틀 `nature` U C `strawgold` · 프롬프트 n2 → `tools/art/inbox/SR-G1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A hilltop shrine in tall dry grass: at the centre a broken fang of weathered bone stands point-up, tall as a great pine, its snapped root sunk in the earth, and the steppe has taken it back — turf has swelled around its base like a gum, lichen maps its sunward side, grass seeds in every crack and a crust of dry clay climbs it in rings. Sun-bleached hide cords circle its girth, a ladder of lashed poles leans a third of the way up, and offering bowls the size of thimbles dot the turf below. Late afternoon sun from the left warms the bone's sunward side to dry ochre and lays its long umber shadow across the straw-pale grass.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SP-G1 · 잿갈기 카르노 — 그림 있음
고르바스의 발톱 · 유닛 · 레벨 8 · 스페셜 · 틀 `tilt` D C `ochredust` · 프롬프트 n2 → `tools/art/inbox/SP-G1.jpg`

```
Landscape 5:4 painting. The whole frame tips as the plain lurches. At its centre, veiled in dust and seen from a far ridge level with his shoulders, a mesa-tall titan of cracked sandstone and granite kneels and sets the knuckles of a hide-strapped boulder fist against the earth like a knock on a door. Cracks race outward from the fist through a ring of standing stones that reach only to its lowest knuckle, and hide tents the size of pebbles slide askew below us. From his bowed head and shoulders a mane of grey ash pours away across the sky. Midday sun strained through tan dust falls in pale shafts across his sandstone shoulders, and the ash mane lays a long grey shadow over the plain.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SR-G2 · 베르단의 첫 뿔 — 그림 있음
베르단의 뿔 · 아이템 · 레벨 4 · 스페셜 · 틀 `used` L R `autumnrot` · 프롬프트 n2 → `tools/art/inbox/SR-G2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Inside a hollow-tree shrine deep in russet leaves, the relic lies along a root altar on the right: one shed antler of living wood, each tine thick as a tree trunk, amber leaves still clinging to its points. From its base pale roots have just crawled across the floor to the left and closed around a dropped felling axe and a dented lantern; a thread of mist is drawn back along each root, and where they rejoin the altar a deep split in the wood is knitting shut with fresh bark. Offering bowls small as acorns line the step. Amber light slants in from the upper left through a split in the hollow's wall, catching the mist threads and russet leaves while the recesses stay dark green.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SP-G2 · 은월 리시엘 — 그림 있음
베르단의 뿔 · 유닛 · 레벨 8 · 스페셜 · 틀 `top` U R `sporeglow` · 프롬프트 n2 → `tools/art/inbox/SP-G2.jpg`

```
Landscape 5:4 painting. From the height of the moon, a burnt land lies straight below like a map: grey ash dotted with black stumps. Across it runs one line of footprints, each a lake-sized oval packed with full-grown trees and lit pale-lime from within, the oldest spilling forest over their edges. At its head, in the upper right, their maker walks on up the frame, an island of moving canopy veined with silver, and its long shadow on the ash shows what the leaves hide: a tall, slender shape with branching hair. A charred watchtower beside one print is seed-small. A waxing moon low on the left throws long shadows across the ash, silver on the walking canopy, while the footprints glow pale-lime and blue-green.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SR-G3 · 마렌시아의 눈물 성배 — 그림 있음
마렌시아의 노래 · 아이템 · 레벨 4 · 스페셜 · 틀 `macro` R T `moontide` · 프롬프트 n2 → `tools/art/inbox/SR-G3.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Extreme close-up of a chalice's rim across the top of the frame: a lip of pearl nacre clasped by tiny pale coral branches. The water in it — one single tear, too large for the cup — stands above the lip in a trembling curve and keeps its own tide: a line of hair-fine white breakers runs around the rim toward the right, where one bright thread has just spilled over and slides down the bowl. Below, out of focus, it crosses a sea-stone altar scored by old blade marks and turns into the deepest first. Silver-blue moonlight from behind and above shines through the standing water and pale mist, and each tiny breaker and the spilled thread carries a white glint.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SP-G3 · 바다를 잠재우는 자 — 그림 있음
마렌시아의 노래 · 유닛 · 레벨 8 · 스페셜 · 틀 `swarm` N T `trench` · 프롬프트 n2 → `tools/art/inbox/SP-G3.jpg`

```
Landscape 5:4 painting. Deep in the open sea the whole frame is hung with sleepers: sperm whales standing upright like grey pillars, slack-finned sharks, turtles, furled shoals — hundreds of bodies, edge to edge, all asleep and all tilted toward one place. Along the top the surface glows where a being of clear water leans down through it, a calm face, joined hands and hair as long as rivers, each whale the size of one of her fingers. From her lips pale rings sink through the sleepers into the dark, where one long curve far below is a closed eyelid. Navy-black depth lit only by the water-blue glow of her body at the surface and the pale sinking rings, with small cold glints on the sleepers' backs.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```
