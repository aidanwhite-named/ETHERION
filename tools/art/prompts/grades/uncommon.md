# 고급 (Superior) — 카드 일러스트 프롬프트 (129장, n2)

> 2단 — 솜씨와 숙련. 자신 있고 말끔하다. 장면의 빛에 윤곽을 따는 깨끗한 두 번째 빛, 조금 더 맑고 진한 색, 공기는 아직 평범하지만(마법 없음) 모서리 · 금속에 따뜻한 금빛이 몇 점, 잘 만들고 잘 손질한 재질과 더 또렷한 묘사.

등급 줄(모든 고급 프롬프트에 들어 있다): `Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 프롬프트 맨 끝 줄이 파일 이름(`<카드ID> <카드 이름>.png`)을 알려 준다 — 나온 그림(가로 5:4)을 그 이름으로 `tools/art/inbox/`에 두고(이름이 달라도 카드 ID만 앞에 있으면 된다) → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저(같은 개체 · 장소 · 배색, 다른 시점 · 새 구도 — 섬네일로 나란히 놓아 같은 개체이면서 한눈에 더 강한 다른 그림으로 읽히는지 본다).

## 1. 그림 없는 카드 — 먼저 그린다 · 95장

### NA3-1 · 찢는 바람
벨루미르의 별 · 공격 마법 · 레벨 2 · 고급 · 틀 `after` N B `stormcloud` · 프롬프트 n2 → `tools/art/inbox/NA3-1 찢는 바람.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. After the wind has gone through: a row of steel breastplates hangs on a line of planted spears across the lower part of the frame, like washing left out in a storm. Each one has been slit along every seam and between every rivet into long narrow strips that still flap and curl in the dying breeze, bright metal fluttering like torn cloth. Loose rivets lie scattered on the ground like dropped buttons, and one pauldron rocks to a stop on its back. Grey-violet cloud breaking after the gust; a wet silver light on the steel strips and a last teal streak of wind low over the grass.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: NA3-1 찢는 바람.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SA3-02 · 혼란의 바람
벨루미르의 별 · 공격 마법 · 레벨 2 · 고급 · 틀 `transform` N L `duskrose` · 프롬프트 n2 → `tools/art/inbox/SA3-02 혼란의 바람.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A straw practice dummy in a steel cuirass stands on its post in the left of the frame, wrapped in a slow twisting wind and caught halfway through a muddle. Down one side the cuirass has turned to plaited straw, soft and bulging, with its rivets now only knots. The straw arm beside it has turned to hard riveted steel, bright as a new breastplate. The boundary between the two wanders across the chest like a tide line. A single arrow hangs in the air a hand's breadth from the straw patch. Rose and peach dusk from the right warms the straw; the steel parts hold deep teal reflections of the darkening sky.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SA3-02 혼란의 바람.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A3-16 · 갑옷 틈 송골매
벨루미르의 별 · 유닛 · 레벨 3 · 고급 · 틀 `inside` F R `duskrose` · 프롬프트 n2 → `tools/art/inbox/A3-16 갑옷 틈 송골매.png`

```
Landscape 5:4 painting. From inside a closed steel helmet, looking out: dark padded iron surrounds the whole picture, and the only opening is the narrow eye-slit, a horizontal band of open sky. In the right of that band a falcon is coming straight at us in a stoop, slate-grey wings swept back, white barred breast, hooked beak, yellow talons just beginning to open. It is small yet, but aimed exactly along the slit. Our own quick breath has fogged the lower rim of the steel. Rose and peach dusk sky fills the slit and lays one thin warm stripe across the dark inside of the helm.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A3-16 갑옷 틈 송골매.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IA3-6 · 번개 깃 화살
벨루미르의 별 · 아이템 · 레벨 3 · 고급 · 틀 `making` N T `stormcloud` · 프롬프트 n2 → `tools/art/inbox/IA3-6 번개 깃 화살.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. On a rain-lashed rooftop, a copper lightning rod rises out of the top of the frame, and clamped beneath it in a small brass vice stands one arrow, point down, half made: an ash shaft, a narrow steel head, three white fletchings still tied on with thread. A thin thread of lightning has come down the rod and is winding itself round the fletchings turn by turn, like yarn onto a bobbin. Finished arrows wait in a rack beside it, their feathers faintly crackling. Grey-violet storm cloud close overhead and silver rain; the winding lightning lights the fletchings and wet copper in white-teal.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IA3-6 번개 깃 화살.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A3-20 · 벨루미르의 펼친 책
벨루미르의 별 · 유닛 · 레벨 4 · 고급 · 틀 `low` R X `starindigo` · 프롬프트 n2 → `tools/art/inbox/A3-20 벨루미르의 펼친 책.png`

```
Landscape 5:4 painting. Flat on the floor of a domed reading room, looking up: a book as large as a door floats open overhead, blank pale vellum pages fanned and turning in a wind of its own, silver clasps and corners glinting. From the turning leaves, strings of bright points joined by hair-thin lines lift off like small constellations and drift to the right across the whole frame, toward an empty suit of plate on a wooden stand. They pass through the breastplate as light passes through glass and come out behind it, leaving the steel whole. The dome above is dark indigo and open to the stars; the lifted points light the pages and the armour with cold silver.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A3-20 벨루미르의 펼친 책.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A3-42 · 폭풍의 눈동자
벨루미르의 별 · 유닛 · 레벨 5 · 고급 · 틀 `over` F L `stormcloud` · 프롬프트 n2 → `tools/art/inbox/A3-42 폭풍의 눈동자.png`

```
Landscape 5:4 painting. Over the hunched shoulder of someone in a storm-shredded cloak at the right edge, whose spear has just been sliced into three clean lengths by the wind: ahead, in the left of the frame, a single great eye as wide as a doorway floats in a well of calm air and stares back at us. Its glassy iris is flecked with stars, its lashes are silver, and a torn scrap of starry indigo cloth trails beneath it. Around the calm, a wall of grey cloud spins, carrying other cut spear shafts. Grey-violet storm light with silver rain in the spinning wall; the calm centre is paler, and the eye holds a cold teal gleam.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A3-42 폭풍의 눈동자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A3-C3 · 장궁 그리핀 기사
벨루미르의 별 · 유닛 · 레벨 6 · 고급 · 틀 `eye` R L `thinair` · 프롬프트 n2 → `tools/art/inbox/PN-A3-C3 장궁 그리핀 기사.png`

```
Landscape 5:4 painting. On the firing line of a long archery range, at eye level: a griffin the size of a warhorse stands in the left of the frame where a bowman would, tawny lion body braced, a silver knight's collar round its feathered neck, teal-grey wings just slammed down in a single beat. At its golden foreclaws lies its ceremonial longbow, unstrung and still tied with a presentation ribbon. From the wingbeat a lance of spiralling air crosses the whole range to the right, and at the far end a hanging sandbag is bursting apart. Cool, clear morning light at altitude with white cloud behind the butts; the air lance shows as a pale teal shimmer.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A3-C3 장궁 그리핀 기사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A3-34 · 하피 여왕
벨루미르의 별 · 유닛 · 레벨 7 · 고급 · 틀 `top` N C `stormcloud` · 프롬프트 n2 → `tools/art/inbox/A3-34 하피 여왕.png`

```
Landscape 5:4 painting. Straight down from above, through the hole of a dark ring of thundercloud that turns slowly in mid-air like a crown, small lightning flickering round its band. Framed in the hole, far beneath, sits the wearer: a giant harpy on a nest as wide as a tower roof, storm-grey and teal wings mantled over a clutch of pale eggs, wild hair blown outward, black talons hooked on the rim. Dozens of ordinary harpies roost around the nest's edge, the size of sparrows beside her. Grey-violet storm gloom; the cloud ring's flickers light her hair and wing edges from above in cold silver and teal.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A3-34 하피 여왕.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1-03 · 타들어 가는 도화선
도르마크의 심장불 · 유닛 · 레벨 1 · 고급 · 틀 `back` B R `coldnight` · 프롬프트 n2 → `tools/art/inbox/B1-03 타들어 가는 도화선.png`

```
Landscape 5:4 painting. From behind, low on the stone floor of a powder store: in the right foreground a fat iron bomb is being dragged along by the tarred cord knotted through its lug. The cord — a living fuse — snakes away across the flagstones into the distance, where its sputtering spark-head, tiny and bright, slithers out through the half-open iron door into the night. Every crate edge and broom handle it brushed along the way carries a small new flame. Cold blue moonlight falls through the doorway and rims the bomb's curve; the spark and the little flames are the warm points.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B1-03 타들어 가는 도화선.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MB-04 · 도화선
도르마크의 심장불 · 공격 마법 · 레벨 1 · 고급 · 틀 `before` R X `coldnight` · 프롬프트 n2 → `tools/art/inbox/MB-04 도화선.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A thin fuse cord lies across cracked dry ground in a long S-curve from the lower left corner to the upper right, where it vanishes between the planted boots of a shield line seen only from the knees down. Halfway along, a hissing spark eats the cord and throws up a low trail of smoke — charred black line behind it, clean pale cord still ahead. Deep night; the travelling spark is the single light, picking out pebbles, boot-toes and the lower rims of the shields.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MB-04 도화선.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1-41 · 잿껍질 달팽이
도르마크의 심장불 · 유닛 · 레벨 2 · 고급 · 틀 `far` L B `coldnight` · 프롬프트 n2 → `tools/art/inbox/B1-41 잿껍질 달팽이.png`

```
Landscape 5:4 painting. A vast flat ash plain under a night sky, seen from far off: across its whole width runs one thin, faintly smoking line in a slow curve, and at its near end, small in the lower part of the frame, a large snail inches leftward under a shell crusted with grey ash, a molten glow leaking from beneath the rim. Beside the trail lies a single dropped leather glove, its fingertips charred. Blue moonlight silvers the ash and the long trail; the warm seam under the shell and a cool glint on its crust mark the snail.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B1-41 잿껍질 달팽이.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### CS-B1 · 덫 태우기
도르마크의 심장불 · 공격 마법 · 레벨 2 · 고급 · 틀 `after` N C `ashfall` · 프롬프트 n2 → `tools/art/inbox/CS-B1 덫 태우기.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The moment after: in the centre of a ring of white ash lies a great spring-jawed trap, sprung and ruined — iron teeth warped, its coiled spring unwound and still glowing, the trigger plate sagging, the charred stub of a thrown torch clamped in its jaws. Soot fans outward across the ground in a starburst, broken only by two clean shapes where two shields stood, both now lying face down. Grey smoky daylight; the cooling spring is the single orange thing left, with a thin bright edge along the warped teeth.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-B1 덫 태우기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PS-B1-1 · 역화
도르마크의 심장불 · 공용 마법 · 레벨 2 · 고급 · 틀 `transform` U R `coldnight` · 프롬프트 n2 → `tools/art/inbox/PS-B1-1 역화.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A huge two-handed war axe is caught at the top of its swing in the right of the frame, raised against the night sky, and it is half one thing and half another: the lower haft and the two gauntlets gripping it are still whole and dark, while from the middle upward the weapon is turning into a burst of fire, the head splitting along glowing cracks and its fragments already flying. Loose grains of black powder trickle from the haft. Deep blue night; the bursting head is the light, orange-white, with a cold moon-rim on the steel of the gauntlets.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PS-B1-1 역화.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SB1-05 · 기폭
도르마크의 심장불 · 공용 마법 · 레벨 2 · 고급 · 틀 `far` N B `ember` · 프롬프트 n2 → `tools/art/inbox/SB1-05 기폭.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Across a black plain, very far away: a long column on the march shows only as a row of small clinging fires strung along the lower part of the frame like beads — and at this instant every one of them bursts at once into an identical round fireball. High in the upper right a single red signal rocket hangs at the top of its climb, the cue they all answered. Moonless night; the row of bursts and the lone rocket are the only lights, each with a thin gold rim of lit smoke.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SB1-05 기폭.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SB1-06 · 방어 포대
도르마크의 심장불 · 방어 마법 · 레벨 2 · 고급 · 틀 `through` B X `brassglow` · 프롬프트 n2 → `tools/art/inbox/SB1-06 방어 포대.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Inside the dark of a casemate, the view is framed by a wide low gun-slit: the smoking muzzle of a concealed cannon juts into the left foreground, and out in the daylight beyond, a shield line advances toward us across open ground. A shot has just landed behind it, among the rear rank — a burst of earth and smoke — and the helmets of the front rank are only now turning to look back. Warm slow-match glow on the cannon's brass inside the dark vault; flat daylight outside, a thin bright edge on the slit's stone.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SB1-06 방어 포대.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SB1-08 · 화약고 폭파
도르마크의 심장불 · 공용 마법 · 레벨 2 · 고급 · 틀 `impact` N C `whitehot` · 프롬프트 n2 → `tools/art/inbox/SB1-08 화약고 폭파.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The exact instant a stone powder house lets go, seen from close by: its slate roof lifts off whole on a dome of white fire, the walls bulge outward stone by stone with light blazing through every opening joint, and the iron-banded door hangs in mid-air a pace in front of its frame. Barrel staves and hoops are already spinning out of the glare toward every edge of the picture. The blast is the light: a blinding yellow-white core, orange through the gaps in the stonework, crimson shadow beyond, with gold glints on the flying hoops.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SB1-08 화약고 폭파.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1-13 · 잿불 박쥐 떼
도르마크의 심장불 · 유닛 · 레벨 3 · 고급 · 틀 `under` U X `coldnight` · 프롬프트 n2 → `tools/art/inbox/B1-13 잿불 박쥐 떼.png`

```
Landscape 5:4 painting. From the floor of a volcanic shaft, looking straight up: far overhead the round mouth of the crater frames a disc of starry night, and between it and us hundreds of bats spiral upward in a tightening corkscrew, every vein of their leathery wings glowing ember-orange. The sparks shaken from their wings fall back down the shaft toward the viewer like slow burning rain, the nearest ones large and soft. Cool blue starlight in the disc above, warm ember light from the wings and falling sparks washing the shaft walls.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B1-13 잿불 박쥐 떼.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IB1-5 · 도르마크의 화염포
도르마크의 심장불 · 아이템 · 레벨 3 · 고급 · 틀 `macro` N C `coldnight` · 프롬프트 n2 → `tools/art/inbox/IB1-5 도르마크의 화염포.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. So close that the breech of a hand-cannon fills the frame: thick heat-blued iron clamped by four bolts around a small round window of smoky crystal, and behind the crystal a shard of living fire pulses in its chamber, pressing light out through every hairline gap. The brass sighting rail above it is worn bright by a thumb, and the wood of the stock below is charred in a clean arc. Cold blue night light on the iron; the shard's orange glow leaks through the crystal and edges each bolt head in gold.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IB1-5 도르마크의 화염포.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1-22 · 불 뿜는 키메라
도르마크의 심장불 · 유닛 · 레벨 4 · 고급 · 틀 `close` F X `whitehot` · 프롬프트 n2 → `tools/art/inbox/B1-22 불 뿜는 키메라.png`

```
Landscape 5:4 painting. Three quarrelling heads crowd the whole frame in close-up: a singed-maned lion roaring on the left, a goat with curled horns butting in from the right, and between and above them a serpent — the beast's own tail — striking down to hiss in both their faces. Each mouth holds a flame at a different stage: a spark, a tongue of fire, a full roaring jet. The cracked hide between the necks glows with heat. The three mouth-fires light the heads from within and below, white-hot at the jet, with a thin gold rim from a burning treeline behind.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B1-22 불 뿜는 키메라.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1-42 · 끓는 용암 슬라임
도르마크의 심장불 · 유닛 · 레벨 4 · 고급 · 틀 `high` N C `whitehot` · 프롬프트 n2 → `tools/art/inbox/B1-42 끓는 용암 슬라임.png`

```
Landscape 5:4 painting. Looking down from above onto a wobbling blob of molten rock the size of a cart, black crust plates drifting on its glowing surface like continents around a hollow that suggests a face. Three cannonballs sit half-swallowed in it, slow ripples spreading from each. At its edge lies a sword whose blade droops over the crust like a melted candle, the hilt still cool and dark on the stone floor. The slime is its own light, white-yellow at the core and orange at the rim, with a hard glint on the cannonballs' upper curves.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B1-42 끓는 용암 슬라임.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1-25 · 공성 두꺼비
도르마크의 심장불 · 유닛 · 레벨 5 · 고급 · 틀 `back` B C `magmadusk` · 프롬프트 n2 → `tools/art/inbox/B1-25 공성 두꺼비.png`

```
Landscape 5:4 painting. Seen from behind on a rocky rise: the broad warty back of a wagon-sized toad fills the lower centre, its throat sac swollen so huge that it bulges out past both sides of its head, glowing molten through the stretched skin. Far ahead across a darkening valley stands a walled keep; two earlier gobs of lava already burn on its roofs, and a third hangs at the top of its arc above the wall. Wine-red dusk; the sac's glow rims the toad's outline from the front and paints the rocks around it orange, with a cool edge of sky-light on its back.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B1-25 공성 두꺼비.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1-31 · 화관의 불뱀
도르마크의 심장불 · 유닛 · 레벨 6 · 고급 · 틀 `eye` R L `coldnight` · 프롬프트 n2 → `tools/art/inbox/B1-31 화관의 불뱀.png`

```
Landscape 5:4 painting. Standing on the bank of a lava river at night: in the left third the head and neck of a great serpent rear out of the molten flow, facing right and upstream, coal-black scales edged in glowing orange, molten fangs dripping. Its long body breaks the surface behind it in two more arcs against the current. On the near bank a bitten tree stump still burns with one small steady flame. Deep blue night above, the river's orange glare from below; a cold moon-rim along the serpent's crest.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B1-31 화관의 불뱀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1-43 · 포르탄 가마 정령
도르마크의 심장불 · 유닛 · 레벨 6 · 고급 · 틀 `silhouette` B C `ember` · 프롬프트 n2 → `tools/art/inbox/B1-43 포르탄 가마 정령.png`

```
Landscape 5:4 painting. A black outline plugs the V-shaped notch of a mountain pass: a squat walking kiln as tall as a gatehouse, seen from behind, brick shoulders, stubby legs and a smoking chimney for a head, all in flat silhouette. The glow of its open furnace mouth pours away from us down the far slope, turning the smoke beyond into an orange fan against which its shape is cut. On the near side the ground lies dark and calm. Backlit entirely by its own furnace; a thin orange edge catches the rivets and the chimney smoke, the rest near-black.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B1-43 포르탄 가마 정령.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1-33 · 도르마크의 분화구
도르마크의 심장불 · 유닛 · 레벨 7 · 고급 · 틀 `over` L R `magmadusk` · 프롬프트 n2 → `tools/art/inbox/B1-33 도르마크의 분화구.png`

```
Landscape 5:4 painting. Over the craggy shoulder of a walking volcano: its basalt flank and the glowing lip of its open crater fill the right foreground, three lava bombs just flung out and trailing smoke in long arcs to the left. Far below and away, across a dim plain, a walled town the size of a thumbnail sits under the falling stones, a few already burning in its fields. Beneath the cone, one stubby rock leg is planted on a pine wood. Violet-brown dusk; the crater's glow lights the flank from within, and a pale rim of last daylight edges the smoke trails.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B1-33 도르마크의 분화구.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B2-05 · 두르크하임 견습공
소르그림의 방패 · 유닛 · 레벨 1 · 고급 · 틀 `top` F X `mirror` · 프롬프트 n2 → `tools/art/inbox/B2-05 두르크하임 견습공.png`

```
Landscape 5:4 painting. Straight down from the roof of an underground hall: a young pangolin apprentice whose scales still shine copper-bright stands in the middle of a tight ring of five old iron-grey pangolin smiths who all lean inward, sniffing at him, their long tapered snouts pointing at him like spokes that fill the frame. He tilts his narrow face straight up toward us, into one thin shaft of daylight from a vent far above, and hugs a brand-new round shield polished so bright that it mirrors all five wrinkled snouts. One narrow shaft of pale daylight drops from the vent onto his face and the shield; the hall around is dark silver-grey, the shield returning cold bright reflections.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B2-05 두르크하임 견습공.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### CS-B2 · 봉인 쐐기
소르그림의 방패 · 공격 마법 · 레벨 1 · 고급 · 틀 `after` N B `coldsteel` · 프롬프트 n2 → `tools/art/inbox/CS-B2 봉인 쐐기.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. What is left of a spell, lying in the lower part of the frame on a stone floor: a disc of conjured light the size of a cartwheel, its ring of bright blades caught half-open like a shutter, has gone hard and grey as cooled slag and dropped where it hung. A black iron wedge is driven clean through its centre, struck so recently that it still rings — a fine dust jumps around it. Along the crack the last blue sparks leak out and die, and the blades nearest the wedge have already dulled to plain iron. Cold blue-grey light from the dying sparks plays over the grey disc; the wedge is a hard black shape with one white glint on its struck head.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-B2 봉인 쐐기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B2-07 · 걸어 다니는 리벳 방패
소르그림의 방패 · 유닛 · 레벨 2 · 고급 · 틀 `over` R T `coldsteel` · 프롬프트 n2 → `tools/art/inbox/B2-07 걸어 다니는 리벳 방패.png`

```
Landscape 5:4 painting. Over the hunched shoulder and ore basket of a kneeling carrier in the dark foreground, we look up a short flight of rock steps: at the top of the frame a riveted tower shield stands on its own two stubby iron feet, braced and turned toward the right, its worn leather arm-straps dangling empty behind it. A slingstone has just burst against its face; in the fresh dent a bright new rivet is pushing up through the steel like a bud, and the shield is already tipping its top rim forward to slam down in answer. Cold blue-grey light from the pass on the right rakes across the shield face, picking each rivet out in a crisp white point; the carrier is a slate shadow.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B2-07 걸어 다니는 리벳 방패.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B2-1 · 파쇄 망치
소르그림의 방패 · 공격 마법 · 레벨 2 · 고급 · 틀 `impact` D R `coldsteel` · 프롬프트 n2 → `tools/art/inbox/RS-B2-1 파쇄 망치.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The instant of a single tap, close up: at the right of the frame the small square face of a hammer, coming straight down, has just touched one seam at the shoulder of a heavy, ornate suit of plate armour. That one touch is undoing the whole. Plates spring apart along every joint at once, rivets jump out in a ring, buckles fly open, and the cuirass, pauldron and gorget hang for a moment as separate pieces in the air, each still perfect, with clear gaps of daylight between them. A chalk cross marks the struck seam. Cold clear light from the left; blue-grey steel with white highlights on each separating edge, and slate shadow in the gaps between the plates.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B2-1 파쇄 망치.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SB2-01 · 철갑 돌진
소르그림의 방패 · 공격 마법 · 레벨 2 · 고급 · 틀 `path` R X `snowlight` · 프롬프트 n2 → `tools/art/inbox/SB2-01 철갑 돌진.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Side-on across a snowy slope, the track of a charge runs the whole width of the frame from left to right: a straight trench ploughed through a drift, then a palisade with one clean gap smashed in it, then a field wall of stone with the same gap, stakes and stones still tumbling. At the right end the thing that made it is still going — a tight wedge of iron shoulders and pauldrons at a heavy jog, seen only as plate and steam, heads lost in the snow they throw up. Beyond them one more fence waits. Overcast snow daylight, white and granite grey; the armoured wedge is dull steel inside a cloud of thrown powder snow.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SB2-01 철갑 돌진.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B2-15 · 강철 대장장이
소르그림의 방패 · 유닛 · 레벨 3 · 고급 · 틀 `pov` F R `lamplit` · 프롬프트 n2 → `tools/art/inbox/B2-15 강철 대장장이.png`

```
Landscape 5:4 painting. First person across a shop counter: on the right a broad one-eyed smith with slate-grey skin, a single round eye under a heavy brow and bare, burn-freckled forearms holds a finished sword blade out toward us, flat on two open palms. The steel is long cold, yet its edges blur with a fine tremor. Everything near it answers: water in a tin cup on the counter stands in tight rings, loose filings crawl in a line toward the blade, the thongs of his leather apron quiver, and our own reaching fingertips, entering at the bottom edge, hover an inch away. One oil lamp behind his shoulder makes a small warm pool on the counter; the humming blade carries a thin cold streak of steel-grey light along its length.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B2-15 강철 대장장이.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IB2-6 · 골렘 핵
소르그림의 방패 · 아이템 · 레벨 3 · 고급 · 틀 `shrine` N C `lamplit` · 프롬프트 n2 → `tools/art/inbox/IB2-6 골렘 핵.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. In a rock-wall niche at the centre of the frame sits the core of a giant machine, laid on a folded soot-black apron: a sphere the size of a pumpkin, banded with dark iron hoops and riveted straps, a round port of thick glass in its face behind which a slow orange glow turns. The hoops are scored where great tongs gripped it. Along the ledge in front, offerings have been set out in a row — cups of lamp oil, three lumps of coal, a worn rasp, a braid of grey beard tied with wire. Two small oil flames on the ledge and the core's own slow glow make a warm pool in the niche; the hall beyond is black with steel-grey glints.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IB2-6 골렘 핵.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B2-U1 · 두르크하임 방패공
소르그림의 방패 · 유닛 · 레벨 3 · 고급 · 틀 `over` R L `forgeheart` · 프롬프트 n2 → `tools/art/inbox/PN-B2-U1 두르크하임 방패공.png`

```
Landscape 5:4 painting. Over the broad left shoulder of a beaver shield-smith — wet red-brown fur, scorched leather apron — who fills the left of the frame: he holds his own round shield up before him toward the right, facing the glow of a furnace door. Its face is covered in dents, each hammered flat, in tidy rows like a tally. One blunt claw rests on the newest, where a broken arrowhead is still lodged. His wide flat tail, shod in a plate of dark iron, lies on the anvil beside him, and the next shield he has hammered cools on a hook. The furnace mouth on the right paints each dent with a molten orange rim; his shoulder and round ear are dark gunmetal shapes against it.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B2-U1 두르크하임 방패공.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B2-42 · 과열 압착기
소르그림의 방패 · 유닛 · 레벨 4 · 고급 · 틀 `front` F C `forgeheart` · 프롬프트 n2 → `tools/art/inbox/B2-42 과열 압착기.png`

```
Landscape 5:4 painting. Square-on, filling the frame: an upright press automaton stands facing us on thick piston legs, and its whole front is two slab-like pressing plates held apart like opened jaws, top and bottom, their inner faces glowing dull orange with heat. Stamped flat into those faces are the outlines of what it met earlier — a breastplate, a kettle helm, a wheel, a ladle. Between the plates a gear-cased core ticks, red-hot. On the floor ahead lies a wheelbarrow rolled out as thin as a tray. The plates and the core glow orange from within and light the scorched floor; the rest of its frame is dark gunmetal with heat shimmer above.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B2-42 과열 압착기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B2-U2 · 광맥 갑충
소르그림의 방패 · 유닛 · 레벨 5 · 고급 · 틀 `low` B R `coldsteel` · 프롬프트 n2 → `tools/art/inbox/PN-B2-U2 광맥 갑충.png`

```
Landscape 5:4 painting. From low among the rubble, looking up: on the right the great domed back of a beetle looms like a boulder, its shell raw ore — rough grey rock seamed with veins of bright iron — as it faces away from us and gnaws at an exposed vein in the cliff. A miner's pickaxe has just bounced off the dome and hangs in the air above it, the steel point curled over and the haft splitting lengthwise. Around the beetle's feet lies a scatter of earlier tries: bent chisels, a snapped crowbar, one leather wrist brace. Cold daylight from a cleft above strikes the shell from the left, blue-grey rock with white sparks on the iron veins; the cliff behind is slate.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B2-U2 광맥 갑충.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B2-C3 · 철골 망치 거상
소르그림의 방패 · 유닛 · 레벨 6 · 고급 · 틀 `tilt` R R `coldsteel` · 프롬프트 n2 → `tools/art/inbox/PN-B2-C3 철골 망치 거상.png`

```
Landscape 5:4 painting. A tilted frame, caught between two beats: on the right a steel colossus whose arms are solid hammers from the elbow down — square heads as big as mine carts, their striking faces worn mirror-bright — twists toward the right. Its left hammer is still raised across its chest where it has just stopped a catapult stone, which is breaking apart against it; its right is already falling, a blur of grey, onto the siege engine below. A rope ladder and a tiny oil-can crew cling to its shin, mid-chore. Cold clear morning light from the left; blue-grey plate with crisp white glints on the worn hammer faces, slate shadow under its arms.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B2-C3 철골 망치 거상.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B2-33 · 오르둔의 뼈 기사
소르그림의 방패 · 유닛 · 레벨 7 · 고급 · 틀 `through` R L `coldsteel` · 프롬프트 n2 → `tools/art/inbox/B2-33 오르둔의 뼈 기사.png`

```
Landscape 5:4 painting. Seen through a row of three stone doorways, one behind another: each lintel has been broken upward in the same tall notch, the shape of a helmet crest, and rubble lies fresh on every threshold. Beyond the last doorway, at the left, the cause walks on toward the right — a giant suit of pale grey plate armour with a tower shield on its arm, empty inside, a cold glow in its visor, its helm brushing the vault. It holds itself perfectly upright. A steward carrying a lamp reaches only to its knee, and has to trot. Cold blue-grey light from high clerestory slits falls in bars across the doorways; the armour's bone-pale plates take crisp white highlights.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B2-33 오르둔의 뼈 기사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B3-05 · 볼타리움 학도
케라운의 벼락 · 유닛 · 레벨 1 · 고급 · 틀 `front` F X `copperlab` · 프롬프트 n2 → `tools/art/inbox/B3-05 볼타리움 학도.png`

```
Landscape 5:4 painting. Dead-on and symmetrical: a small meerkat student stands bolt upright in the exact middle of a round examination floor, facing us, while a blackened starburst of scorch marks radiates from its hind feet to every edge of the frame. Its fur smokes and stands on end, brass goggles hang crooked on its pointed snout, the tip of its tail is singed — and both forepaws hug a thick closed notebook tight against its chest, perfectly unharmed. Warm amber lamps ring the hall overhead, and a last yellow spark crawling along the copper rail behind picks out the student's edges.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B3-05 볼타리움 학도.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### CS-B3 · 합선
케라운의 벼락 · 공격 마법 · 레벨 1 · 고급 · 틀 `transform` N C `greensky` · 프롬프트 n2 → `tools/art/inbox/CS-B3 합선.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A great wheel of pale witch-fire — some enemy's spell — hangs in the air over a battlefield, caught half-changed: its left half still turns and blazes, its right half has gone dark and brittle like burnt wire, shedding ash. Exactly on the seam, one humble strand of copper wire lies hooked across two of the wheel's spokes, glowing white-hot and pouring the stolen light down into the mud as a thin waterfall of sparks. Flat green-yellow storm light; the wheel's dying glow and the falling sparks are the bright things, with a hard glint along the wire.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-B3 합선.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IB3-3 · 피뢰 지팡이
케라운의 벼락 · 아이템 · 레벨 2 · 고급 · 틀 `used` N T `greensky` · 프롬프트 n2 → `tools/art/inbox/IB3-3 피뢰 지팡이.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Planted upright and alone on a bare hilltop stands a tall ash-wood staff, its upper end rising into the top of the frame, where a forked copper spike is bound on with wire and still glows from the strike it has just taken. Thin arcs keep hopping off the prongs of their own accord to the nearest grass heads. At its foot the sandy soil has fused into a collar of rough glass, faintly smoking. Flat yellow-green sky behind; the spike's fading glow and the stray arcs are the sharp yellow notes, with a pale rim down the wood.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IB3-3 피뢰 지팡이.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MC-08 · 파문
케라운의 벼락 · 공용 마법 · 레벨 2 · 고급 · 틀 `ring` N C `thunderhead` · 프롬프트 n2 → `tools/art/inbox/MC-08 파문.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Concentric rings of lightning spread outward across a sheet of standing water from one strike point in the centre of the frame, like ripples from a dropped stone, each ring a thin crackling circle. A crested iron helm stands on a post in the shallows, caught as a ring passes through it: on the side still ahead of the ring it wears a glowing shell of protective light and a wreath of thorns; on the side already crossed, shell and thorns are lifting away in curled flakes. Black storm sky over grey water; the rings are searing yellow, each carrying its own reflection, with a cold rim along the helm's crest.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MC-08 파문.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B3-13 · 볼타리움 호문쿨루스
케라운의 벼락 · 유닛 · 레벨 3 · 고급 · 틀 `silhouette` R C `wetglass` · 프롬프트 n2 → `tools/art/inbox/B3-13 볼타리움 호문쿨루스.png`

```
Landscape 5:4 painting. Backlit against a tall rain-streaked window, a small artificial person sits in black silhouette on the rim of its own open glass vat, in the middle of a cluttered desk, facing right. The outline tells everything: an oversized bald head studded with electrode knobs, trailing wires, a thin arm holding a pen to a long ribbon of paper that spools off the desk in loops, carrying one endless jagged ink line. Pale grey night-rain light through the glass; each far-off flash prints a small yellow glint on the vat's rim and the wet pane.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B3-13 볼타리움 호문쿨루스.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### C4-1 · 별을 읽는 보주
케라운의 벼락 · 아이템 · 레벨 3 · 고급 · 틀 `macro` D C `cobalt` · 프롬프트 n2 → `tools/art/inbox/C4-1 별을 읽는 보주.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. So close that the orb's curve fills the frame from side to side: within the clear crystal hang hundreds of tiny bright motes, a whole night sky sealed in glass. A hair-thin thread of lightning is travelling among them of its own accord, hopping from mote to mote downward through the middle of the sphere and leaving each one joined to the last, so that a crooked constellation grows as we watch. One brass claw of its cradle intrudes at the lower edge. Deep blue dark inside the glass; the thread is yellow-white, each touched mote flaring with a small violet-white corona and a fine glint on the brass.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: C4-1 별을 읽는 보주.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B3-U1 · 피뢰탑 자석령
케라운의 벼락 · 유닛 · 레벨 3 · 고급 · 틀 `swarm` L R `flash` · 프롬프트 n2 → `tools/art/inbox/PN-B3-U1 피뢰탑 자석령.png`

```
Landscape 5:4 painting. The whole frame is a storm of small iron things in flight — nails, keys, needles, horseshoes, a pair of scissors — all streaming along great curving lines, like filings around a magnet, toward the right. There, where the curves gather, floats a small rough figure of dark, lightning-pitted iron, facing left with arms open, bearded with clinging filings, a bent copper rod for a spine. Blue sparks jump wherever two pieces touch. A white-yellow flash behind the figure turns the flying iron into hard black shapes with bright edges, each spark a blue pinpoint.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B3-U1 피뢰탑 자석령.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B3-42 · 가시촉수 구름해파리
케라운의 벼락 · 유닛 · 레벨 5 · 고급 · 틀 `high` D L `cobalt` · 프롬프트 n2 → `tools/art/inbox/B3-42 가시촉수 구름해파리.png`

```
Landscape 5:4 painting. Looking down from above the storm: a translucent jellyfish the size of a barn floats in the left of the frame, its bell a small glowing cloud, and its long tentacles hang straight down through a ragged hole in the cloud deck to a land tiny and dark far beneath. Light runs down every tentacle in beads. One of them has snagged a paper kite, and the kite's string glows all the way to the ground. Moonless cobalt night above the clouds; the bell's violet-white corona lights the cloud rim, and the tentacles carry yellow down into the dark.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B3-42 가시촉수 구름해파리.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B3-29 · 케라운의 뇌운
케라운의 벼락 · 유닛 · 레벨 6 · 고급 · 틀 `reflect` L B `wetglass` · 프롬프트 n2 → `tools/art/inbox/B3-29 케라운의 뇌운.png`

```
Landscape 5:4 painting. We look down into a broad rain pool on black rock, and the pool holds the whole sky: a brooding thundercloud hangs upside-down in it, filling the lower two-thirds of the frame, a vague heavy-browed face formed by its billows and turned to the left, lightning flickering behind the eyes. A few last raindrops ring the face with ripples. Along the top edge runs a thin strip of the real far shore, where one fine bolt comes down to touch the water. Pale grey rain light on the water; the cloud's inner flashes and the single bolt lay small yellow sparks on every ripple.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B3-29 케라운의 뇌운.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B3-34 · 폭뢰 기관
케라운의 벼락 · 유닛 · 레벨 7 · 고급 · 틀 `eye` L L `thunderhead` · 프롬프트 n2 → `tools/art/inbox/B3-34 폭뢰 기관.png`

```
Landscape 5:4 painting. At eye level in a walled work yard, a house-sized walking engine of riveted steel squats in the left of the frame, facing left, the row of fat glass domes along its back just beginning to glow. The yard around it emptied a breath ago: a ladder still rocks against its flank, a wrench lies where it fell, a dropped cap is still rolling, and the gate at the right swings on its hinges. Black cloud presses low over the yard; the domes' rising yellow glow is the main light, with a thin cold rim of daylight along every rivet.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B3-34 폭뢰 기관.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B3-36 · 천둥 뇌수
케라운의 벼락 · 유닛 · 레벨 7 · 고급 · 틀 `far` L T `flash` · 프롬프트 n2 → `tools/art/inbox/B3-36 천둥 뇌수.png`

```
Landscape 5:4 painting. Far across the rooftops of a city of chimneys and wire, a beast the size of a cathedral crouches on the highest roof ridge like a cat on a wall, in the upper part of the frame: wolf-headed and long-bodied, facing left, its blue-white fur bristling with arcs and its tail a jagged zigzag still joined to the sky by the bolt it rode down. On every roof around it, weathervanes and little wind-wheels are spinning themselves into bright blurs. The bolt's white-yellow flash floods the scene from above and turns the roofs into hard black steps, while the beast's own fur gives a cooler rim.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: B3-36 천둥 뇌수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### CS-G1 · 덫 짓밟기
고르바스의 발톱 · 공격 마법 · 레벨 1 · 고급 · 틀 `ring` N C `redearth` · 프롬프트 n2 → `tools/art/inbox/CS-G1 덫 짓밟기.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Centred and radial, seen from steeply above: one enormous bare footprint has just been stamped into red clay, and around it lie the remains of a trap made of pale cold light — a ring of half-risen jaws and snare loops, snapped in mid-spring, their bright fragments flying outward in every direction and dimming as they go. A second ring, of dust and clods, is still spreading from the heel. The toes of the print point toward the right. Slate storm daylight; the dying trap fragments give the only cold glints, quickly swallowed by rust-red dust.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-G1 덫 짓밟기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G1-03 · 돌 던지는 개코원숭이
고르바스의 발톱 · 유닛 · 레벨 1 · 고급 · 틀 `pov` F R `bonemoon` · 프롬프트 n2 → `tools/art/inbox/G1-03 돌 던지는 개코원숭이.png`

```
Landscape 5:4 painting. First-person view from the foot of a rocky hill: a round pebble, huge and blurred, is already flying straight at us, filling the lower left of the frame. Up on a boulder at the right a big maned baboon holds the perfect follow-through of a thrower — long arm extended, weight on the front hand, dog-like muzzle split in a yellow-fanged grin. Beside its hind foot sits a tidy heap of chosen stones, sorted by size. Clear moonlit night; cold light from behind the hill rims the mane and the flying stone in bone white.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G1-03 돌 던지는 개코원숭이.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MG-01 · 송곳니 돌격
고르바스의 발톱 · 공격 마법 · 레벨 1 · 고급 · 틀 `before` D T `firelit` · 프롬프트 n2 → `tools/art/inbox/MG-01 송곳니 돌격.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From the receiving side, the breath before it lands: a low row of hunched shoulders and grounded spear shafts crosses the bottom of the frame, dark and still. Above and behind them, out of the night, two great shapes are already in the air at the top of the picture, knees drawn up, and all that the light catches of them is the pale curve of bared tusks, the whites of eyes and the edges of two raised stone axes beginning to fall. Dust hangs where their feet left the ground. One small fire off to the left rakes the tusks and axe edges with warm ochre light; the rest is deep night.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MG-01 송곳니 돌격.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-G1-1 · 늑대 기습
고르바스의 발톱 · 공격 마법 · 레벨 1 · 고급 · 틀 `object` N R `strawgold` · 프롬프트 n2 → `tools/art/inbox/RS-G1-1 늑대 기습.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One steel breastplate, torn from its straps, turns in the air at the right of the frame and tells the whole attack: across its left side a crescent of deep fang punctures has buckled the metal inward, and straight through that weakened crescent runs a single long gash opened by an axe, bright at its edges. Snapped buckles trail behind it. Far beyond, small and already wheeling away through the grass, a great wolf carries a rider low on its back. Low afternoon sun from the left flashes once on the gash and lays long umber shadows across the pale grass.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-G1-1 늑대 기습.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G1-07 · 초원 켄타우로스
고르바스의 발톱 · 유닛 · 레벨 2 · 고급 · 틀 `high` F R `strawgold` · 프롬프트 n2 → `tools/art/inbox/G1-07 초원 켄타우로스.png`

```
Landscape 5:4 painting. From high above, looking down a long slope of dry grass: a dun-bodied centaur gallops toward the lower right of the frame, braided hair and mane streaming, and a single narrow wake of flattened grass runs back behind it all the way to the upper left corner — a whole day's run in one line. Its horn bow is at full draw for the first time, one obsidian-tipped arrow on the string, the quiver at its flank otherwise empty. Late-afternoon sun from the left lays long umber shadows across the straw-pale grass and lights the bow's horn edge.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G1-07 초원 켄타우로스.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MC-01 · 웅크린 늑대
고르바스의 발톱 · 방어 마법 · 레벨 2 · 고급 · 틀 `top` R L `bonemoon` · 프롬프트 n2 → `tools/art/inbox/MC-01 웅크린 늑대.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Straight overhead on a moonlit field of tall dry grass: across the left half of the frame a dozen wolves lie pressed flat in a wide crescent, each in its own dented hollow, grey backs level with the stems, ears folded, muzzles tucked so that every fang is hidden. Along the right edge the front of an advancing line has stopped short — a row of crested helms and levelled spears, the spear points wavering toward one hollow, then another. A high moon bleaches the grass bone-white and drops a small sharp shadow inside each wolf's hollow.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MC-01 웅크린 늑대.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G1-C1 · 바위송곳니 막내
고르바스의 발톱 · 유닛 · 레벨 2 · 고급 · 틀 `high` F C `stormslate` · 프롬프트 n2 → `tools/art/inbox/PN-G1-C1 바위송곳니 막내.png`

```
Landscape 5:4 painting. Looking down from the eye height of a grown fighter: a small sabre-toothed cub stands in the middle of the frame glaring up at us, chin out, a knucklebone tied in the tuft of its neck fur — and the two fangs it bares are as long and scarred as any adult's, far too big for its small jaw. Thick tawny legs and heavy paws of older brothers wall it in on both sides. Behind its heels a training post lies bitten clean in two. Grey storm daylight from above, even and cool, with pale grit settling on its shoulders and fangs.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G1-C1 바위송곳니 막내.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SG1-09 · 몸통 박치기
고르바스의 발톱 · 공격 마법 · 레벨 2 · 고급 · 틀 `macro` L L `ochredust` · 프롬프트 n2 → `tools/art/inbox/SG1-09 몸통 박치기.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Extreme close-up of the line where two masses meet: from the right, a packed wall of shoulders in hide and bone armour has just slammed into a row of wooden shields on the left. Along the seam everything is breaking at once — bone plates on the right star with cracks and shed chips, while the shield boards on the left split along the grain, rivets springing out, a far deeper dent already folding the whole row backward. Ochre dust squirts from the seam like breath. Hard hazy sun from above; the flying chips and the dust in the seam hang bright against the dark crush of bodies.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SG1-09 몸통 박치기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G1-14 · 돌격 미노타우로스
고르바스의 발톱 · 유닛 · 레벨 3 · 고급 · 틀 `tilt` F C `ochredust` · 프롬프트 n2 → `tools/art/inbox/G1-14 돌격 미노타우로스.png`

```
Landscape 5:4 painting. The whole frame tilts as a bull-headed giant charges straight at us, head down, eyes squeezed shut, iron nose ring swung flat by the speed. It has just burst through a stockade — split logs are still turning in the air behind it — and a splintered cart wheel and a length of fence rail hang impaled on its forward-swept horns from earlier collisions. One cloven hoof is about to land in the foreground. Hard afternoon sun from behind turns the churned dust into an ochre haze around the dark hide and horns.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G1-14 돌격 미노타우로스.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IG1-4 · 바위 주술 토템
고르바스의 발톱 · 아이템 · 레벨 3 · 고급 · 틀 `stored` R L `strawgold` · 프롬프트 n2 → `tools/art/inbox/IG1-4 바위 주술 토템.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Set down at the left of the frame, far behind the fighting: a wooden back-frame with rawhide shoulder straps, and lashed into it a knee-high totem of grey rock — a heavy-browed face roughed out with a few deep cuts, banded with rust-red clay paint, a string of knucklebones around its neck. Its hollow eyes look toward the right, where a battle shows only as a thin line of dust on the horizon. The grass around the frame stands untrampled. Late-afternoon sun from the right lays the frame's long umber shadow across pale straw grass and warms the painted bands.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IG1-4 바위 주술 토템.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IG1-6 · 송곳니 전쟁 도끼
고르바스의 발톱 · 아이템 · 레벨 3 · 고급 · 틀 `stand` N X `ochredust` · 프롬프트 n2 → `tools/art/inbox/IG1-6 송곳니 전쟁 도끼.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. A chieftain's war axe rests across a rack made of two forked antlers, spanning the frame from edge to edge: a long haft of dark wood wrapped in braided hide and hung with a row of wolf fangs, and one broad bearded blade whose edge has been honed bright and whose back ends in a fang-shaped spike. Behind the rack two thick wooden posts stand one behind the other, and both have been cut through by the same slanting stroke — their upper halves lie together in the dust. Hazy sun from the upper right; fine dust drifts through the light and the honed edge carries one pale line.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IG1-6 송곳니 전쟁 도끼.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-G1-3 · 대지 가르기
고르바스의 발톱 · 공용 마법 · 레벨 3 · 고급 · 틀 `impact` R L `firelit` · 프롬프트 n2 → `tools/art/inbox/RS-G1-3 대지 가르기.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At arm's length from the blow: the knuckles of a huge strap-bound fist, entering at the lower left corner, have just met bare ground, and from under them a crack is tearing away toward the upper right faster than the dust can follow — the two lips of earth already lifting apart like a split log, pebbles hanging in the air above the gap, the fissure forking as it races toward a dark palisade on the horizon. A single torch lying in the dirt lights the knuckles and the near edges of the crack warm ochre; the far plain is black.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-G1-3 대지 가르기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G1-21 · 흑요 켄타우로스 궁수
고르바스의 발톱 · 유닛 · 레벨 4 · 고급 · 틀 `close` R L `redearth` · 프롬프트 n2 → `tools/art/inbox/G1-21 흑요 켄타우로스 궁수.png`

```
Landscape 5:4 painting. Tight on the upper body of a centaur at the left of the frame, in profile, aiming to the right: war-painted cheek pressed to the string, one narrowed eye, braided hair bound with bone beads. The horn bow fills the foreground, its stave cut with notch after notch from tip to grip, the newest still pale. The obsidian arrowhead points across the frame at a blurred distant line of fighters where one tall crested standard rises above the rest. Slate storm sky; a break of low light from the right picks out the notches and the black glass arrowhead, red dust in the air.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G1-21 흑요 켄타우로스 궁수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G1-26 · 전쟁군주 투르크
고르바스의 발톱 · 유닛 · 레벨 5 · 고급 · 틀 `macro` R C `ochredust` · 프롬프트 n2 → `tools/art/inbox/G1-26 전쟁군주 투르크.png`

```
Landscape 5:4 painting. Extreme close-up of one eye of an old sabre-toothed cat, looking toward the right: heavy scarred brow smeared with rust-red war paint, tawny fur gone grey and stiff with dust, the curve of one long chipped fang rising into the lower corner. In the dark of the amber eye sits a small, sharp reflection — a saw-toothed mountain pass with a long column of followers pouring down through it, raising dust, the column wider at the near end than at the far. Hard sunlit haze from the right lights every scar and dust grain in the fur; the eye holds the brightest point.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G1-26 전쟁군주 투르크.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G1-U2 · 곰가죽 광전사
고르바스의 발톱 · 유닛 · 레벨 5 · 고급 · 틀 `front` F X `stormslate` · 프롬프트 n2 → `tools/art/inbox/PN-G1-U2 곰가죽 광전사.png`

```
Landscape 5:4 painting. Square to the viewer and symmetrical, from the waist up, filling the frame: a hulking bear-man stands with arms hanging wide, human fingers ending in bear claws, rust-red war paint dragged through the fur of his muzzle and chest. Down the middle of his chest runs a row of old leather lacings from the day he tied the hide on — now sunk into living fur, the skin healed shut around every knot. A bone-charm necklace bites tight into his thick neck. Storm-grey daylight from directly above; grit blows across him from one side and the eyes sit in shadow under the brow.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G1-U2 곰가죽 광전사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G1-29 · 그롬의 바위 정령
고르바스의 발톱 · 유닛 · 레벨 6 · 고급 · 틀 `profile` L R `stormslate` · 프롬프트 n2 → `tools/art/inbox/G1-29 그롬의 바위 정령.png`

```
Landscape 5:4 painting. In pure profile on a bare ridge: a broad man-shaped figure of rough boulders stands facing left, each stone hanging a hand's width from the next, daylight showing through every seam and slow dust turning in the gaps where a deep ochre glow sits. The boulders are lichen-grey on their old faces and pale where they were freshly split. Behind its heels, at the right edge, a trail of smaller stones is still rolling uphill to join. Flat slate storm light from behind the ridge; the figure reads dark with ochre seams, grit blowing through the gaps.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G1-29 그롬의 바위 정령.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G1-34 · 고르바스의 고르곤
고르바스의 발톱 · 유닛 · 레벨 7 · 고급 · 틀 `reflect` F L `firelit` · 프롬프트 n2 → `tools/art/inbox/G1-34 고르바스의 고르곤.png`

```
Landscape 5:4 painting. A miner's shovel lies dropped on stony ground, and its worn-bright blade, filling the left half of the frame and tilted toward us, holds a reflection: a tall woman half turned to cracked grey stone, a crown of stone snakes rearing from her head, two eyes glowing dull ochre as she walks closer. Beside the shovel stand the boots and shins of its owner, already grey granite to the knee, with a fallen lantern still alight between them. The fallen lantern's small flame is the only light, warming the shovel blade and the stone shins from below.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G1-34 고르바스의 고르곤.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G2-04 · 어린 드라이어드
베르단의 뿔 · 유닛 · 레벨 1 · 고급 · 틀 `top` R X `mossdeep` · 프롬프트 n2 → `tools/art/inbox/G2-04 어린 드라이어드.png`

```
Landscape 5:4 painting. A bird's view, straight down: a small dryad of smooth pale bark sleeps curled around the foot of a sapling, leaf-hair fanned over the moss. Thorny vines spiral outward from her across the whole frame like the arms of a galaxy — and on the right side three of them have lifted off the ground, thorns bared, toward the toe of a boot just entering the picture. She sleeps on. Soft green shade with one warm fleck of sun on her cheek; dew along the raised vines catches a clean rim of light.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-04 어린 드라이어드.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PS-G2-1 · 나이테
베르단의 뿔 · 방어 마법 · 레벨 1 · 고급 · 틀 `after` N X `mossdeep` · 프롬프트 n2 → `tools/art/inbox/PS-G2-1 나이테.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. After the blows have stopped: the flank of a living trunk fills the frame, bearing a dozen shallow cuts, and in each cut the same thing shows — tight growth rings, and around them one new ring, pale and wet, already grown across the wound like a seal. On the roots below lie three blunted spearheads and one snapped haft. A last curl of bark settles to the ground. Heavy green shade; the fresh rings shine pale and wet as if lit from inside the wood.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PS-G2-1 나이테.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-G2-1 · 재생의 숲
베르단의 뿔 · 공용 마법 · 레벨 1 · 고급 · 틀 `path` R X `sporeglow` · 프롬프트 n2 → `tools/art/inbox/US-G2-1 재생의 숲.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Side-on through a hacked grove at night, something unseen is passing from left to right, marked only by a drifting line of pollen at head height. To the left, where it has been, every lopped bough is whole again, each join wearing a tight collar of new thorns. To the right, branches still hang broken. And exactly at the front of the pollen line a fallen bough is rising off the ground toward the place it was cut from, splinters turning to fit. The drifting pollen glows pale lime and lights each mended bough as it passes; ahead of it the grove is still black.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-G2-1 재생의 숲.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### CS-G2 · 이끼 덮기
베르단의 뿔 · 공격 마법 · 레벨 2 · 고급 · 틀 `ring` U L `rainmist` · 프롬프트 n2 → `tools/art/inbox/CS-G2 이끼 덮기.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A hostile spell-circle of burning lines lies on a stone floor, left of centre, and moss is closing over it from every side at once: ring after ring of thick green cushion creeping inward, hissing where it meets the fire. Only a hand-wide eye of orange light is left in the middle, guttering, with a thread of smoke rising straight up from it. Across the mossed-over outer rings two deep footprints are already filling with tiny new shoots. Grey overcast light on wet moss; the last orange glow underlights the smoke and the innermost green ring.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-G2 이끼 덮기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G2-41 · 대벌레 투창수
베르단의 뿔 · 유닛 · 레벨 2 · 고급 · 틀 `macro` L L `thorndark` · 프롬프트 n2 → `tools/art/inbox/G2-41 대벌레 투창수.png`

```
Landscape 5:4 painting. The long twig-jointed foreleg of a giant stick insect in extreme close-up, at the left of the frame, knuckles like knots of bark, at the instant its hooked tip opens: a rough javelin snapped from a living branch is leaving its grip toward the left, twigs trimmed, one stubborn leaf still on the shaft — limb and javelin almost twins. Out of focus behind, a row of earlier javelins stands stuck in the ground at odd angles, each one already sprouting leaves. Deep shade in a thorn thicket; a low green skylight from behind rims the jointed limb and the flying shaft, and red berries dot the dark.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-41 대벌레 투창수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IG2-3 · 이끼 부적
베르단의 뿔 · 아이템 · 레벨 2 · 고급 · 틀 `top` N B `rainmist` · 프롬프트 n2 → `tools/art/inbox/IG2-3 이끼 부적.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. The wet top of an old boulder, seen from directly above: in the lower part of the frame lies a charm barely bigger than a palm — a tight ring braided from living moss, bound with bark cord, with three snail-shell beads on its tassel. Above it on the stone is the pale bare patch the moss was lifted from, the same size and shape, and around them the maker's things are laid out in a row: a bone needle, a coil of cord, a wooden comb. Soft silver rain-light from directly above; beads of water on the moss and the bone needle catch fine bright glints.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IG2-3 이끼 부적.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MC-11 · 침묵
베르단의 뿔 · 공용 마법 · 레벨 2 · 고급 · 틀 `top` N C `rainmist` · 프롬프트 n2 → `tools/art/inbox/MC-11 침묵.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Straight down onto a flooded stretch of forest floor in rain: across the whole frame the water is dimpled with overlapping raindrop rings — except for one perfect circle in the middle where the surface lies flat as glass and the raindrops hang as round beads just above it. Inside that circle two swords rest where they were let fall, crossed, half under water, and a war horn lies beside them, its mouth full of still water. Soft silver rain-light from above; the still circle reflects the pale sky like a mirror while the rest of the water glitters.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MC-11 침묵.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IG2-6 · 베르단의 뿌리
베르단의 뿔 · 아이템 · 레벨 3 · 고급 · 틀 `making` R L `sporeglow` · 프롬프트 n2 → `tools/art/inbox/IG2-6 베르단의 뿌리.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. On a slab of wood in a root-walled workshop, a living root is being trained into shape: wooden pegs stand in the branching pattern of the veins of an arm, and a pale, scale-barked root has been led through half of them, gripping each peg as it goes, its growing tip still nosing toward the next. The far half of the pattern is bare pegs. On the right, a steel arm-guard used for testing lies split along its seam, a root-tip still wedged in the gap. Night in the workshop; blue-green fungus lamps on the wall give a cold glow, with a fine bright edge along the root's scales.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IG2-6 베르단의 뿌리.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### M4-1 · 트렌트의 나이테
베르단의 뿔 · 아이템 · 레벨 3 · 고급 · 틀 `hung` N C `thorndark` · 프롬프트 n2 → `tools/art/inbox/M4-1 트렌트의 나이테.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. A slice of ancient trunk cut so thin that light passes through it hangs by three red cords from a low branch, as wide as a doorway, in the middle of the frame. Lit from behind, its thousand rings show as fine dark lines in glowing wood, tight as the grooves of a shell, with the outermost ring thicker and paler than the rest. Below it, on a flat stone, wait a bowl of ink and a bundle of thorn needles for copying the pattern onto skin. Near-dark forest; a low green skylight behind the slice makes it glow like stained glass, edged with a thin bright rim.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: M4-1 트렌트의 나이테.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G2-U1 · 덩굴손 픽시
베르단의 뿔 · 유닛 · 레벨 3 · 고급 · 틀 `far` F C `autumnrot` · 프롬프트 n2 → `tools/art/inbox/PN-G2-U1 덩굴손 픽시.png`

```
Landscape 5:4 painting. A wide stretch of autumn forest floor seen from snail height — acorn cups like basins, a red toadstool rising like a tower, a fallen leaf as big as a tent. Small in the very centre, a pixie with leaf wings hovers facing us, its whole body wound in curling green tendrils like bandages; only the right arm is bare, drawing a twig bow with a thorn for an arrow, aimed straight at the viewer. One loose tendril is knotting itself around a scratch on its knee. Amber late light floods the leaf litter from behind the toadstool, with a bright rim on the leaf wings and the thorn's tip.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G2-U1 덩굴손 픽시.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G2-42 · 독가시 말벌떼
베르단의 뿔 · 유닛 · 레벨 4 · 고급 · 틀 `swarm` B X `thorndark` · 프롬프트 n2 → `tools/art/inbox/G2-42 독가시 말벌떼.png`

```
Landscape 5:4 painting. The whole frame is wasps: finger-long bodies striped amber and black, glassy wings blurred, each tail ending in a hooked thorn, all diving away from us in one slanting direction. Through the gaps in the swarm we glimpse, below, the grey papery dome of their nest wedged in a thorn tree, and the forest path beneath it, which swings out in a wide, careful half-circle around the tree before continuing. Near-dark thorn forest with a narrow blade of green daylight from above striking wings and thorn-tips; red rosehips glint in the briars.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-42 독가시 말벌떼.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G2-C2 · 가시덤불 덩굴귀
베르단의 뿔 · 유닛 · 레벨 4 · 고급 · 틀 `cut` R X `thorndark` · 프롬프트 n2 → `tools/art/inbox/PN-G2-C2 가시덤불 덩굴귀.png`

```
Landscape 5:4 painting. A cutaway through the bank of a rust-stained swamp: above the ground line, in the upper third, a low beast of knotted bramble and thistle crawls toward the right, spines raised. Below the line the frame is all earth in layers — peat, clay, gravel — and through every layer its roots plunge straight down like anchor cables, the deepest still pushing into bedrock. Beside the creature a snapped rope and an iron grapple lie where someone gave up pulling. Dim overcast above the bank; underground the cut earth is near-black, the roots pale, with a few blood-red thistle heads on the beast.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G2-C2 가시덤불 덩굴귀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G2-27 · 베르단의 레쉬
베르단의 뿔 · 유닛 · 레벨 5 · 고급 · 틀 `far` L R `autumnrot` · 프롬프트 n2 → `tools/art/inbox/G2-27 베르단의 레쉬.png`

```
Landscape 5:4 painting. Far off between autumn trunks, a trail of footprints through fallen leaves runs in one wide loop and returns to its own beginning, where a small traveller stands staring at a rag tied to a twig — the marker they left an hour ago. On the right, taller than the saplings and almost one of them, a gaunt figure of bark and twigs with a stag's antlers and a beard of grey lichen watches, turned to the left, two green eyes alight. Dull amber dusk seeps through bare branches; the green glow of its eyes and a fine bright rim on the antlers set it apart from the trunks.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-27 베르단의 레쉬.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G2-U2 · 균사 뿌리지기
베르단의 뿔 · 유닛 · 레벨 5 · 고급 · 틀 `high` L L `sporeglow` · 프롬프트 n2 → `tools/art/inbox/PN-G2-U2 균사 뿌리지기.png`

```
Landscape 5:4 painting. High above the floor between the giant roots of a tree-city, the view drops onto a stout mushroom-keeper with a broad spotted cap standing on the left, turned leftward, both stubby hands paying out white threads. The threads spread from its feet across the whole ground like a spider's web laid flat, running from root to root to root, and along them small beads of light are sliding in both directions — messages passing between the trees. Thorn-like spurs stud the rim of its cap. Night under the canopy; the web of threads and the travelling beads glow pale lime, lighting the keeper's cap from below.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G2-U2 균사 뿌리지기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G2-43 · 벼락 맞은 분노목
베르단의 뿔 · 유닛 · 레벨 6 · 고급 · 틀 `back` L R `sunshaft` · 프롬프트 n2 → `tools/art/inbox/G2-43 벼락 맞은 분노목.png`

```
Landscape 5:4 painting. Behind and below the shoulder of a huge treant on the right of the frame — one half of its trunk living bark, the other half split and burnt to charcoal, with a pale lightning scar down the seam — we see what it is striding toward on the left: a small abandoned campfire with a kettle still on it. One great branch-arm is already raised over the flames. Behind it lie a flattened lantern and a crushed iron brazier. Golden-green morning shafts cut through the mist behind the giant; the little fire is a single warm spark in its shadow.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-43 벼락 맞은 분노목.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G2-35 · 고목 장로회
베르단의 뿔 · 유닛 · 레벨 7 · 고급 · 틀 `far` N X `sunshaft` · 프롬프트 n2 → `tools/art/inbox/G2-35 고목 장로회.png`

```
Landscape 5:4 painting. Across a wide glade, far away, a ring of seven ancient trees sits in council, each as tall as an old oak with a long seamed face in its bark, roots folded beneath it like crossed legs and heavy boughs resting in its lap, bracket fungus stepping up their backs. The seasons have passed over them mid-debate: snow still caps the elders at the left of the ring, blossom covers those in the middle, and russet leaves drift from those on the right. A herd of deer grazes inside the circle, small as mice. Golden-green sunshafts fall through morning mist into the glade, with a cool rim of light along the snow-capped crowns.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-35 고목 장로회.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### CS-G3 · 씻김의 노래
마렌시아의 노래 · 공격 마법 · 레벨 1 · 고급 · 틀 `after` N X `glasscalm` · 프롬프트 n2 → `tools/art/inbox/CS-G3 씻김의 노래.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. What is left a moment after the song passed: a wide stone court awash in a finger of clear water, and across it the wreck of a great spell-circle that had been drawn in glowing amber lines — its arcs now running like wet chalk, bleeding into milky ribbons that drain between the flagstones. One last curved segment still glows, already softening at the edges. Flecks of gold leaf and a loosened wax seal drift on the runoff toward the lower edge. Pale, windless morning after rain; flat grey light mirrored in the standing water, with the dying amber of the last line as the only warmth.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-G3 씻김의 노래.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G3-01 · 석호 수습 무녀
마렌시아의 노래 · 유닛 · 레벨 1 · 고급 · 틀 `close` L R `lagoon` · 프롬프트 n2 → `tools/art/inbox/G3-01 석호 수습 무녀.png`

```
Landscape 5:4 painting. Tight close-up at the waterline: a young tree frog novice, chin-deep in the lagoon on the right of the frame, sings her first note with eyes wide and anxious, glancing left, her pale throat swelled into a small trembling bubble. Her skin is wet leaf-green and a sprig of red seaweed lies draped across her brow. The surface in front of her lips carries her voice leftward as a row of fine standing ripples — and they wobble, uneven and trembling, exactly as her note does. High clear sun through shallow turquoise water throws dancing light up under her chin; a soft rim from the bright sand behind.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-01 석호 수습 무녀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G3-08 · 물결의 메아리
마렌시아의 노래 · 유닛 · 레벨 2 · 고급 · 틀 `through` L R `moontide` · 프롬프트 n2 → `tools/art/inbox/G3-08 물결의 메아리.png`

```
Landscape 5:4 painting. Through a ragged hole in a fishing net hung to dry on mangrove roots, we glimpse the lagoon beyond: on the right a faint singing figure made only of upright rings of water and light glides leftward, each ring trailing a paler copy of itself, and a paler one after that. Where its soft glow falls through the mesh, the torn strands around the hole are quietly knitting themselves closed, knot by knot. Moonlight and mist over still water; the figure's own cool glow rims the wet net strands from behind.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-08 물결의 메아리.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MG-11 · 뒤집힌 물거울
마렌시아의 노래 · 공용 마법 · 레벨 2 · 고급 · 틀 `reflect` N C `moontide` · 프롬프트 n2 → `tools/art/inbox/MG-11 뒤집힌 물거울.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A sword stands planted point-down in the shallows of a still pool, and a round shield leans against it. The picture is mostly their reflection, filling the lower two-thirds of the frame in the mirror-flat water — and the reflection has it backwards: where the sword stands, the water shows a broad shield; where the shield leans, a long bright blade. A single ripple is just beginning to cross the image from one side. A clear moon overhead, silver on steel and water; the reflected blade gleams brighter than the real one.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MG-11 뒤집힌 물거울.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SG3-02 · 물빛 신기루
마렌시아의 노래 · 공용 마법 · 레벨 2 · 고급 · 틀 `far` N R `lagoon` · 프롬프트 n2 → `tools/art/inbox/SG3-02 물빛 신기루.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Across a dazzling sheet of shallow water, far off, a great stone watchtower in the right of the frame is misbehaving: caught in a band of shimmering water-light, it bends and sways in a slow S like a reed in wind, its top hanging upside down in the glare. In the near left corner, sharp and dark, a real marsh reed stands rigid as a pillar, perfectly straight, as though the two had exchanged natures. Blinding midday sun on the shallows; the wavering mirage band is the brightest thing, with a thin bright edge along the reed.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SG3-02 물빛 신기루.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G3-41 · 물살 돌격 범고래
마렌시아의 노래 · 유닛 · 레벨 3 · 고급 · 틀 `back` B B `lagoon` · 프롬프트 n2 → `tools/art/inbox/G3-41 물살 돌격 범고래.png`

```
Landscape 5:4 painting. Riding the same wave, just behind its tail: the glossy black back and tall notched dorsal fin of an orca fill the lower part of the frame as a surging current carries it up a bright beach, away from us, at full ramming speed. Ahead, a barricade of wicker screens and stakes is already bursting apart to either side. Beyond it the dry sand climbs wide and empty, a very long way for an orca. Noon sun on white surf and turquoise water; spray around the fin catches a second, cooler light from the wave face.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-41 물살 돌격 범고래.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IG3-4 · 진주 성표
마렌시아의 노래 · 아이템 · 레벨 3 · 고급 · 틀 `reflect` N R `stormsea` · 프롬프트 n2 → `tools/art/inbox/IG3-4 진주 성표.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. A holy badge of dark silver, worked as a wreath of cresting waves around one large deep-sea pearl, lies on a fold of wet oilcloth in the right of the frame. The pearl holds the whole world curved in its surface: a grey horizon, storm clouds, a white line of surf. From it rises a thin curl of sea-mist, like breath on cold air, and the fringe of the cloth beside it stirs. Stormy daylight from a window off-frame gleams on the pearl; a second, cooler glint runs along the silver wave crests.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IG3-4 진주 성표.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IG3-6 · 석호의 비늘
마렌시아의 노래 · 아이템 · 레벨 3 · 고급 · 틀 `hand` N R `moontide` · 프롬프트 n2 → `tools/art/inbox/IG3-6 석호의 비늘.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. One wet paw reaches in from the right edge, cropped at the wrist: the dark webbed paw of a sea otter, fur slicked flat, grains of lagoon sand between the pads. Pinched between two blunt claws, held out toward us, is a single scale — large as a coin, thin as a petal, flashing violet and green. A thread of weed still clings to its edge, and a bead of water runs down it and hangs at the tip. Moonlight from the upper left makes the scale flare like a tiny mirror; a faint silver rim follows the wet fur.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IG3-6 석호의 비늘.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G3-19 · 셀레네아 무녀장
마렌시아의 노래 · 유닛 · 레벨 4 · 고급 · 틀 `back` B B `stormsea` · 프롬프트 n2 → `tools/art/inbox/G3-19 셀레네아 무녀장.png`

```
Landscape 5:4 painting. From close behind her: a white beluga choir-mistress rises upright from the water at the bottom of the frame, back to us, a mantle of knotted cord and sea-glass over her smooth pale shoulders, one flipper lifted like a conductor's hand. Before her the whole storm-roughened lagoon has obeyed the first note — every whitecap, every ripple, every reed and strand of floating weed lies combed flat in one direction, away from her, like fur stroked by a hand. Slate sky with one bright break ahead of her; cold light edges her back and every combed wave crest.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-19 셀레네아 무녀장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### NG3-1 · 거센 파도
마렌시아의 노래 · 공용 마법 · 레벨 4 · 고급 · 틀 `pov` F T `stormsea` · 프롬프트 n2 → `tools/art/inbox/NG3-1 거센 파도.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Standing on the shingle with the wave already above us: a steep green wall of sea fills the frame, its lip curling over at the very top edge, about to come down. Through its translucent face show churned sand, torn kelp and a tumbling fence post. Along the crest, small against the sky, a few dark finned singers ride upright as if on a chariot, mouths open. Storm light from behind the wave glows through its thin upper lip; the base is slate-dark, streaked with white spray.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: NG3-1 거센 파도.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G3-27 · 해구 투구게
마렌시아의 노래 · 유닛 · 레벨 5 · 고급 · 틀 `eye` L R `trench` · 프롬프트 n2 → `tools/art/inbox/G3-27 해구 투구게.png`

```
Landscape 5:4 painting. At eye level on the seabed, where a shelf of rock ends at a black drop. On the right crouches a horseshoe crab as large as a hay wagon, domed olive carapace rimmed with spines, long spike tail raised, facing left toward the abyss it guards. In the layered cliff behind it, picked out by the dim light, are the stone imprints of others exactly like it — the same dome, the same tail — pressed into rock a hundred strata deep. Dim blue light sifts down from far above; a second, colder glow rises from the drop and rims each spine.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-27 해구 투구게.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G3-U2 · 탈라쿠스의 아귀
마렌시아의 노래 · 유닛 · 레벨 5 · 고급 · 틀 `macro` L C `trench` · 프롬프트 n2 → `tools/art/inbox/PN-G3-U2 탈라쿠스의 아귀.png`

```
Landscape 5:4 painting. In black water, magnified until it fills our sight: a glowing lure, a soft bulb on a stalk, hangs in the centre of the frame, and inside it the light swells and fades like a heartbeat, a faint branching of veins showing through. Just behind, half-emerged from the dark and angled left, are the things it belongs to — one huge pale eye and a few curved needle teeth. Deep in the background a seam in the trench wall glows and dims in the very same rhythm. The lure is the single near light, warm white against navy black; the far seam answers with a colder blue pulse.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G3-U2 탈라쿠스의 아귀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G3-32 · 심해의 산갈치 왕
마렌시아의 노래 · 유닛 · 레벨 6 · 고급 · 틀 `profile` R L `glasscalm` · 프롬프트 n2 → `tools/art/inbox/G3-32 심해의 산갈치 왕.png`

```
Landscape 5:4 painting. In strict side view, flat as a carved relief, the head and long neck of a huge silver oarfish break the surface at the left, facing right: a tall crest of scarlet fin-rays stands on its brow like a crown, two long red barbels trail from its chin, and its mirror-bright flank sheds sheets of water. Before it the whole sea has stopped to hold its breath — flat as polished slate to the horizon, a wave halted mid-curl behind its back, three flying fish and their droplets hanging fixed in the air. Pale fogged daylight, even and still; a thin cold gleam along its crest and wet flank from the bright horizon ahead.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-32 심해의 산갈치 왕.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G3-C3 · 해구의 노래 고래
마렌시아의 노래 · 유닛 · 레벨 6 · 고급 · 틀 `top` R L `coraldawn` · 프롬프트 n2 → `tools/art/inbox/PN-G3-C3 해구의 노래 고래.png`

```
Landscape 5:4 painting. High overhead, the open sea is a sheet of hammered pink and blue, and in the left of it lies the long barnacled back of a great whale, heading right, just beneath the surface. Its song shows on the water: broad smooth arcs spreading ahead of it across the whole frame, calming the chop wherever they pass. Far below the camera a long skein of migrating seabirds crosses the arcs, heading for another season. Low dawn sun from the right draws long glitter along each arc and a thin bright edge on the whale's back.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G3-C3 해구의 노래 고래.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G3-34 · 마렌시아의 왕게
마렌시아의 노래 · 유닛 · 레벨 7 · 고급 · 틀 `profile` L R `stormsea` · 프롬프트 n2 → `tools/art/inbox/G3-34 마렌시아의 왕게.png`

```
Landscape 5:4 painting. Side-on like a stone frieze: on a storm-beaten reef a king crab the size of a gatehouse stands in the right of the frame facing left, one enormous claw raised straight up in the salute of an oath. It has held that salute for ages — barnacles sheathe its legs, weed has grown over its feet, and in the crook of the lifted claw a pair of seabirds has built a nest. Breakers burst against its spined red carapace; a snapped ship's mast leans on the rocks below. Storm light under a torn sky; white spray flares behind the claw, and a shaft of pale sun finds the nest.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-34 마렌시아의 왕게.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

## 3. 그림 있음 — 그리지 않는다 (참고용) · 34장

### A1-01 · 계약의 저주 인형 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 1 · 고급 · 틀 `high` B L `bloodink` · 프롬프트 n2 → `tools/art/inbox/A1-01 계약의 저주 인형.png`

```
Landscape 5:4 painting. Looking down onto a scribe's cluttered desk: a small burlap rag doll with mismatched button eyes sits slumped at the left edge, its back to us, a corner of folded parchment poking from a split seam like stuffing. One rusty pin already stands in its shoulder, and its own stubby hand is pushing a second pin into its other arm. Across the desk to the right lies a row of five sealed, ribboned scrolls, one of them twitching on the wood. A single guttering tallow stub at the top edge throws long black shadows from the pins across the desk; the wax seals glow deep crimson.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A1-01 계약의 저주 인형.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MC-05 · 환각 — 그림 있음
모르카스의 그믐 · 공용 마법 · 레벨 1 · 고급 · 틀 `transform` L R `violetshade` · 프롬프트 n2 → `tools/art/inbox/MC-05 환각.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A bank of violet mist drifts across a column on the march, and one pikeman on the right of the frame is caught half inside it, turned to the left. Where the mist covers him he is a horned monster: curved horns, a glowing eye, a clawed hand on a hooked blade. Where the mist has already thinned, the same body is plainly a comrade, with a dented kettle helm, a patched tabard and a startled open mouth. In the lower left foreground the back of another helmet and a raised sword are already swinging toward him. Purple-black gloom with the mist glowing luminous violet from inside, brightest along the line where monster turns back into man.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MC-05 환각.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A1-41 · 사슬에 묶인 망령 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 2 · 고급 · 틀 `top` L C `bonepale` · 프롬프트 n2 → `tools/art/inbox/A1-41 사슬에 묶인 망령.png`

```
Landscape 5:4 painting. Straight down onto a bare paved square, like a map. In the centre floats a small hooded ghost, child-sized, seen from above as a pale round hood pointing left and a torn shroud trailing away to the right. Rusted chains run from its body to four iron rings set in the paving, drawn tight like the spokes of a wheel. Three arrows stand in the stones around it, and from each arrow a fresh length of chain runs straight out of the frame, taut, back toward whoever loosed it. Shadowless ash-grey light flattens the square; the ghost gives a faint violet glow on the nearest links.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A1-41 사슬에 묶인 망령.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### CS-A1 · 침묵의 빙의 — 그림 있음
모르카스의 그믐 · 공격 마법 · 레벨 2 · 고급 · 틀 `origin` B T `bonepale` · 프롬프트 n2 → `tools/art/inbox/CS-A1 침묵의 빙의.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Looking along its path from where it starts: at the bottom edge, seen from behind, a thin camp boy sits slumped on a drum, and a pale thread of mist leaves the back of his hood and stretches away up the frame. Halfway along, it has taken one turn round the clapper of a camp alarm bell and holds it stopped in mid-swing. At the top the thread enters the visor of a towering armoured champion, whose raised greatsword is already sinking and whose knees have bent into the boy's own slump. Colourless ash-grey dusk over trampled ground; the thread is the one violet glow, brightest where it enters the helm.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-A1 침묵의 빙의.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A1-13 · 녹타르 듀라한 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 3 · 고급 · 틀 `profile` L R `candle` · 프롬프트 n2 → `tools/art/inbox/A1-13 녹타르 듀라한.png`

```
Landscape 5:4 painting. Strict side view, flat as a carved frieze: a headless figure in black plate armour strides toward the left along a colonnade, standing at the right of the frame, violet ghost-flame rising from the empty collar. Tucked under the near arm, its own helmeted head looks down at a small chained ledger held in the same hand, lips parted as if reading aloud; the far arm reaches forward and lifts a sword out of a rack by the blade. A row of identical empty racks recedes behind it. Evenly spaced candles in wall niches make amber pools along the colonnade; between them the armour drops into violet dark.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A1-13 녹타르 듀라한.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IA1-5 · 계약서 원본 — 그림 있음
모르카스의 그믐 · 아이템 · 레벨 3 · 고급 · 틀 `pair` N X `frostindigo` · 프롬프트 n2 → `tools/art/inbox/IA1-5 계약서 원본.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Two things share a bare wall in a cold archive vault. In a shallow niche on the left rests a thick folded document of yellowed vellum, bound with black ribbon and closed by five red wax seals along its fold, its edges darkened by handling. On the right hung the plain sword of whoever signed it: both iron wall hooks have bent open under its weight, and the sword has dropped point-first into the flagstones, sunk to a third of its blade, cracks spreading round it. Blue-violet vault light and a skin of frost on the wall; the steel is tarnished silver and the seals are small dark-red embers.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IA1-5 계약서 원본.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A1-U1 · 피의 맹세 검사 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 3 · 고급 · 틀 `cut` L B `bloodink` · 프롬프트 n2 → `tools/art/inbox/PN-A1-U1 피의 맹세 검사.png`

```
Landscape 5:4 painting. A cross-section of a grave, cut down through turf, roots and soil. In the pit at the bottom of the frame lies a knight in blackened, rusted plate, stretched out with his helm toward the left and wide awake: cold violet eyes open in the visor, both gauntlets folded over a long sword laid on his chest. The runes down its blade are lit blood-red only a third of the way from the hilt; the rest are dark. Above him the mound has split open again, and a shovel stands in the grass by a leaning headstone. Night above ground with a thread of violet on the headstone; below, the red runes light rust, soil and roots inside the pit.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A1-U1 피의 맹세 검사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### S3-1 · 계약의 인장 — 그림 있음
모르카스의 그믐 · 아이템 · 레벨 3 · 고급 · 틀 `top` N R `candle` · 프롬프트 n2 → `tools/art/inbox/S3-1 계약의 인장.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Directly overhead, a scribe's oak table. In the right of the frame stands a signet stamp, its turned black-horn handle worn glossy, seen from above as a dark disc, with its accessories laid round it: a stick of red sealing wax, a coil of ribbon, a candle stub in a dish and one fresh round wax impression. A deep sword-cut runs across the whole tabletop from left to right, straight as a ruled line, except where it meets the stamp: there it swerves in a neat half-circle around it and then runs on straight. The candle stub in its dish makes a small amber pool around the stamp; the far ends of the cut fade into violet shadow.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: S3-1 계약의 인장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A1-C2 · 모르크 협곡 셰이드 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 4 · 고급 · 틀 `eye` L C `candle` · 프롬프트 n2 → `tools/art/inbox/PN-A1-C2 모르크 협곡 셰이드.png`

```
Landscape 5:4 painting. On the canyon floor at night, at eye level. A watch lantern on an iron pole stands planted in the gravel, throwing a round pool of light, and in the centre a figure of dusky smoke, twice a man's height and thin as a pillar, is stepping leftward straight through that pool. Wherever the light falls its body thins to a faint shimmer, like breath on glass; above the lantern's reach its narrow head, two dim violet eyes and its long-fingered hands stay dense and dark. The fingers stretch ahead toward a small tent where a sentry's boots stick out. The lantern's amber pool is the only light, one small island in a vast dark canyon; violet lingers in the shade's eyes.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A1-C2 모르크 협곡 셰이드.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A1-27 · 녹타르 피의 군주 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 5 · 고급 · 틀 `reflect` F C `candle` · 프롬프트 n2 → `tools/art/inbox/A1-27 녹타르 피의 군주.png`

```
Landscape 5:4 painting. A long desk of mirror-polished black stone fills the frame, seen from just above its surface. Standing on it, real and upright, are a crystal goblet, a heavy iron archive key on its ring, and a rack of thumb-sized sealed vials, each tagged with a ribbon. The master of the desk appears only as an upside-down reflection in the stone, in the centre and facing us: a pale vampire in a high black-and-crimson collar, red eyes lowered, silver-ringed fingers tipping one tiny vial to his lips while his other hand rests a quill on a closed ledger. Two candles at the desk's far corners lay amber pools on the polished stone; the reflection lives in the violet dark between them.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A1-27 녹타르 피의 군주.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A1-U2 · 모르카스의 세리 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 5 · 고급 · 틀 `macro` D L `frostindigo` · 프롬프트 n2 → `tools/art/inbox/PN-A1-U2 모르카스의 세리.png`

```
Landscape 5:4 painting. Extreme close-up at floor level: one small silver coin has rolled into the crack between two floorboards. A hand of translucent grey-violet mist, each finger as long as a table knife, has reached down from the left and sunk straight through the solid wood to pinch the coin by its edge and draw it out. A rusted chain is looped round the wrist. Above, soft and out of focus, hang the hem of a torn shroud and the corner of a thick ledger gripped under the other arm, its clasp shut. Cold blue-violet light from a frosted window slants across the boards; the coin is a single point of tarnished silver.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A1-U2 모르카스의 세리.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A1-31 · 피의 공작 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 6 · 고급 · 틀 `high` L R `bloodink` · 프롬프트 n2 → `tools/art/inbox/A1-31 피의 공작.png`

```
Landscape 5:4 painting. Looking down from the rafters onto a long banquet table draped in black cloth. At every place, where the wineglass should stand, lies a folded oath sealed with red wax, a quill laid across it, and the gloved hands of the guests rest beside them, very still. Only the head of the table, at the right, has a goblet: there the oldest of the house, a pale vampire in a high crimson-lined collar, stands turned to the left, facing down the whole length of the table, and raises his full crystal glass in a toast. Low crimson candle-glow along the table picks out seals, silver rings and the dark wine; beyond the cloth all is black, with a thread of violet in the windows.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A1-31 피의 공작.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A1-35 · 모르크의 나이트메어 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 7 · 고급 · 틀 `eye` L R `candle` · 프롬프트 n2 → `tools/art/inbox/A1-35 모르크의 나이트메어.png`

```
Landscape 5:4 painting. Inside a child's small bedroom, at eye level. In the lower left a child sleeps under a quilt, and a storybook lies shut on the blanket with its ribbon marker only halfway through. From the right a horse of black smoke, far too large for the room, has pushed in through the wall as if through fog: its head alone is as long as the bed and hangs leftward over the sleeper, eyes like two coals, a mane of violet fire licking the ceiling beams. A line of smouldering hoofprints crosses the floorboards out of the dark. One bedside candle makes a small amber island around the pillow; the violet mane tints the ceiling and the rest of the room is black.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A1-35 모르크의 나이트메어.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A2-01 · 견습생의 기도 촛불 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 1 · 고급 · 틀 `far` R L `vigil` · 프롬프트 n2 → `tools/art/inbox/A2-01 견습생의 기도 촛불.png`

```
Landscape 5:4 painting. A long infirmary hall at night, seen from far down its aisle: two rows of empty cots recede into darkness. Small in the left of the frame, a living prayer candle of white beeswax, barely a hand tall, pads across the flagstones on stubby feet of melted wax, a calm tiny face glowing inside its finger-sized flame. It is heading right, toward the single occupied cot, where a bandaged arm hangs down to the floor. Its own small flame is the only light, a warm ring on the stone that barely reaches the nearest cot legs.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A2-01 견습생의 기도 촛불.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A2-41 · 돌격 페가수스 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 2 · 고급 · 틀 `high` L L `whitegold` · 프롬프트 n2 → `tools/art/inbox/A2-41 돌격 페가수스.png`

```
Landscape 5:4 painting. From above, looking down on a training field of pale grass: a white winged horse gallops hard toward the left, head lowered like a ram, broad wings clamped flat against its flanks, pale gold mane streaming. Behind it a dead-straight furrow of torn turf runs back across the frame through a row of straw practice figures and wicker hurdles, every one of them bowled over or split, a few feathers and straws still turning in the air. Bright early sun from the upper right lays the horse's cool blue shadow ahead of it on the grass.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A2-41 돌격 페가수스.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### CS-A2 · 정화의 빛 — 그림 있음
솔란테의 새벽 · 공격 마법 · 레벨 2 · 고급 · 틀 `transform` L B `whitegold` · 프롬프트 n2 → `tools/art/inbox/CS-A2 정화의 빛.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A hard edge of morning light is sliding from right to left across a paved road, and it has reached the middle of a hidden trap: a ring of black iron jaws set under scattered leaves in the lower part of the frame. The half still in shadow is sharp, dark, cocked iron. The half the light has crossed keeps its toothed shape for one last moment as pale ash, already lifting away on the air. A spearhead enters from the right edge, low and level, with the light gathered bright along its blade. Clear low sun from the right, ivory and pale gold on the lit paving, cool blue in the shadow the edge has yet to reach.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-A2 정화의 빛.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SA2-03 · 침묵의 기도 — 그림 있음
솔란테의 새벽 · 방어 마법 · 레벨 2 · 고급 · 틀 `swarm` D X `vigil` · 프롬프트 n2 → `tools/art/inbox/SA2-03 침묵의 기도.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Slow white down is falling straight through windless air across the whole frame, flake after flake, each faintly glowing. In the foreground a great curled war-horn lies on its side, its mouth packed soft with settled flakes, beside a drum whose skin is quilted white. Behind them stands a row of planted weapons that were burning and sparking a moment ago: wherever a flake has landed the fire has gone out in a neat dark ring, and thin threads of smoke rise perfectly vertical. Night; the falling flakes carry their own faint pale-gold glow, and the last few weapon-fires still burning are small and shrinking.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SA2-03 침묵의 기도.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A2-13 · 성광 색유리 기사 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 3 · 고급 · 틀 `through` R C `stainedglass` · 프롬프트 n2 → `tools/art/inbox/A2-13 성광 색유리 기사.png`

```
Landscape 5:4 painting. Through a knight-shaped hole in a tall leaded window — the empty lead outline still holding the shape of helm, shield and sword — we look into a shadowed nave. Inside, the missing figure walks to the right across the flagstones: a knight made of coloured glass panes joined by dark lead lines. The sunbeam pouring through the hole passes through his body and fans out as seven bands of colour over the floor and a dropped, stained bandage, which lies clean wherever the colours touch. A single hard morning beam enters through the hole from behind the viewer; the rest of the nave is deep cool shade.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A2-13 성광 색유리 기사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A2-U1 · 맹세를 새긴 기사 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 3 · 고급 · 틀 `eye` F L `vigil` · 프롬프트 n2 → `tools/art/inbox/PN-A2-U1 맹세를 새긴 기사.png`

```
Landscape 5:4 painting. A few steps away, at the height of its visor: a suit of white-gold plate stands guard at the left, at the head of a crypt stair, facing us with its visor raised — and the helmet is hollow. Where a face should be we see the inner curve of the helm's back, covered in fine glowing knot-like marks. The same light leaks from every joint, at elbow, knee and gorget. A faded cloak still hangs from its shoulders, pinned by a brooch gone green with age. Night in the crypt porch; the armour is lit from inside like a lantern, throwing thin bars of light through its joints onto the steps.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A2-U1 맹세를 새긴 기사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### S4-1 · 솔란테의 성유물 — 그림 있음
솔란테의 새벽 · 아이템 · 레벨 3 · 고급 · 틀 `found` D R `firstlight` · 프롬프트 n2 → `tools/art/inbox/S4-1 솔란테의 성유물.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. A gold reliquary shaped like a small sunburst, its rays finely chased and a rock-crystal window at its heart, lies tilted on its side in rain-pocked mud at the right of the frame, half sunk, a broken neck-chain trailing from it. The crystal is dull as fogged glass, with only the faintest ember far inside. The sky above is one lid of grey cloud — except at the far horizon, where a single narrow band of gold light falls on some other part of the land. Flat grey-blue overcast light with rain; the distant gold band on the horizon puts one thin warm edge along the reliquary's upper rays.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: S4-1 솔란테의 성유물.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A2-42 · 천벌의 집행자 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 4 · 고급 · 틀 `ground` F L `rosedawn` · 프롬프트 n2 → `tools/art/inbox/A2-42 천벌의 집행자.png`

```
Landscape 5:4 painting. On the white flagstones of a judgment court, seen from floor level: in the near foreground lies a small gold oath-ring broken in two halves. Just beyond it, at the left of the frame and facing us, stands a hooded, cloaked shape of solid pale light, its hood holding only brightness. From its lowered right hand a sword of black volcanic glass hangs point-down — the one dark thing in the picture — a single red drop running to its tip. A dotted line of the same red leads away between the columns. Soft pink-gold dawn fills the open court behind it and lays lilac shadows along the floor toward the camera.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A2-42 천벌의 집행자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A2-25 · 엘라드의 성화 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 5 · 고급 · 틀 `close` F L `stainedglass` · 프롬프트 n2 → `tools/art/inbox/A2-25 엘라드의 성화.png`

```
Landscape 5:4 painting. Tight on the upper body of a living flame: a white-gold fire in the rough shape of a slender person rises from a brass brazier at the left of the frame and leans toward us, its face only two calm brighter hollows. Between its cupped hands of fire a clot of black, oily smoke is burning away into clean white sparks. The brazier's rim, at the bottom edge, is worn smooth and bright by centuries of tending hands. The flame is its own white-gold light; behind it lies deep shade broken by a few jewel-coloured patches from high windows.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A2-25 엘라드의 성화.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A2-U2 · 솔란테의 성가대 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 5 · 고급 · 틀 `close` F T `stainedglass` · 프롬프트 n2 → `tools/art/inbox/PN-A2-U2 솔란테의 성가대.png`

```
Landscape 5:4 painting. A row of small brown-and-gold larks, seen close, perches shoulder to shoulder along the top rail of a choir stall, set high in the frame and facing us: chests puffed, beaks wide open in full song, eyes shut with effort, one visibly hoarse and hunched but still singing. Behind them, soft and blurred, hundreds more fill every ledge. Along the rail between their feet the dawn candles have burnt down to flat puddles of wax that have run in long drips down the carved wood. High sun through coloured windows — long past dawn — spots the birds and the old wood with small patches of red, blue and gold.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A2-U2 솔란테의 성가대.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A2-43 · 불꽃 날개 순교자 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 6 · 고급 · 틀 `swarm` B L `firstlight` · 프롬프트 n2 → `tools/art/inbox/A2-43 불꽃 날개 순교자.png`

```
Landscape 5:4 painting. The whole frame is full of burning feathers — hundreds of small tongues of white-gold fire streaming back toward us on the wind. They pour from a great white pelican running away from us at the left, already far ahead of its line, its two wings now only blazing ribs that shed flame with every stride. In the foreground the feathers settle on the bandaged arms and shoulders of the comrades it has left behind, and each dark stain they touch turns white. Blue-grey sky before sunrise; the falling fire lights everything from above and behind the runner.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A2-43 불꽃 날개 순교자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A2-36 · 새벽의 천사장 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 7 · 고급 · 틀 `ground` R C `firstlight` · 프롬프트 n2 → `tools/art/inbox/A2-36 새벽의 천사장.png`

```
Landscape 5:4 painting. Camera low in dew-wet plateau grass; a few blades and a spider's thread cross the foreground. Beyond them the white citadel is small on the skyline, and standing behind it, taller than its towers, an archangel in gold armour turns to the right with a lance of light upright in one hand, his many white wings just starting to open. Behind the opened wings the sky is already morning; behind the wings still folded it is night with stars. Pale gold spreads from the opened wings across a blue-grey sky and has just reached the nearest dewdrops.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A2-36 새벽의 천사장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A3-01 · 바늘탑 견습 사수 — 그림 있음
벨루미르의 별 · 유닛 · 레벨 1 · 고급 · 틀 `profile` R L `thinair` · 프롬프트 n2 → `tools/art/inbox/A3-01 바늘탑 견습 사수.png`

```
Landscape 5:4 painting. Strict side view, flat as a frieze, on a rope-railed practice terrace. In the left third stands a young hare apprentice, small in grey-green leathers a size too large, long ears laid back along its neck, facing right. A pale-wood bow hangs unused on one shoulder; at arm's length the apprentice holds a goose feather on a thread and studies its swing. Along the rail hang a pinwheel, a streamer and a chime, each stirring differently. At the far right a straw target stands untouched, and one stray arrow juts from a rail post wide of it. Pale high-altitude morning sun from the right, thin white cloud drifting below the terrace, cool shadows, the streamer on the rail a wind-teal stroke.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A3-01 바늘탑 견습 사수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A3-02 · 어린 하피 — 그림 있음
벨루미르의 별 · 유닛 · 레벨 1 · 고급 · 틀 `through` R R `stormcloud` · 프롬프트 n2 → `tools/art/inbox/A3-02 어린 하피.png`

```
Landscape 5:4 painting. Glimpsed through a ragged gap in a nest wall woven from hundreds of cast-off arrow fletchings and snapped shafts, wedged under a stone eave: a harpy fledgling, a downy bird-girl barely knee-high, with stubby storm-grey wing-arms, wild tufted hair and oversized black talons, crouches in the right of the opening. Bent to the right over a cast-off steel elbow guard, tongue between her teeth, she slides one stiff quill neatly into the seam between its plates. Rain streams past beyond the eave. Grey-violet storm daylight leaks in through the gaps behind her, silvering the rain and the edges of her teal-tipped down.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A3-02 어린 하피.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### CS-A3 · 주문 끊기 — 그림 있음
벨루미르의 별 · 공격 마법 · 레벨 1 · 고급 · 틀 `transform` D L `moonsilver` · 프롬프트 n2 → `tools/art/inbox/CS-A3 주문 끊기.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A spell caught half-undone in mid-air: a bright braided rope of teal-white fire slants down across the frame from the upper right. In the left third a plain grey-fletched arrow has just passed clean through it, and at that point the rope is cut. Above the cut it still blazes and writhes; below, the severed length has gone dull and grey, unravelling into three limp threads of smoke that sag toward the ground and go out one by one like snuffed wicks. The arrow flies on, trailing a single spark. Full moon over bare rock: blue-silver light and sharp shadows, the living half of the rope the one teal-white glare.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-A3 주문 끊기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### HA3-2 · 정찰 — 그림 있음
벨루미르의 별 · 핸드 마법 · 레벨 1 · 고급 · 틀 `object` N C `duskrose` · 프롬프트 n2 → `tools/art/inbox/HA3-2 정찰.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Inside a dim campaign tent, a rack of weapons waits in a row for morning, and the story is told by the first one: a great two-handed sword at the centre of the frame, bound into its scabbard by a knot tied of wind itself, a tight visible twist of dust and air around hilt and crossguard, with one small grey feather caught in it. The others on the rack hang free. The tent flap beside them is still swaying, and a line of fine dust on the floor leads out under it. Rose dusk light slips in through the moving flap and lies across the bound hilt; the rest of the tent is deep teal shadow.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: HA3-2 정찰.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MA-03 · 무력화 — 그림 있음
벨루미르의 별 · 공용 마법 · 레벨 1 · 고급 · 틀 `macro` D C `thinair` · 프롬프트 n2 → `tools/art/inbox/MA-03 무력화.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. So close that one steel gauntlet fills the centre of the frame, clenched round the haft of a raised war hammer. From every knuckle joint and from the cuff, thin pale-teal streams of air are hissing outward like breath from a pricked bellows. The leather palm has gone slack, the fingers are opening one after another, little finger first, and the heavy iron head is already tipping downward, the haft sliding through the loosening grip. Flat, pale high-altitude daylight with a white sky behind; the escaping air catches the light as faint teal threads.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MA-03 무력화.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A3-07 · 돌풍 임프 — 그림 있음
벨루미르의 별 · 유닛 · 레벨 2 · 고급 · 틀 `through` L C `thinair` · 프롬프트 n2 → `tools/art/inbox/A3-07 돌풍 임프.png`

```
Landscape 5:4 painting. Framed by the long D-shaped gap between a drawn bow and its string: at the right edge a gloved hand still holds the string at half draw, the nock empty, fingers pinching air. Through that window, at the centre of the frame, a tiny imp made of a swirling gust, with pointed ears, a wide grin, small feathered wings and gangly limbs of wisping air, streaks away to the left, hugging the stolen arrow like a lance and steering it at an apple set on a fence post down the range. A torn-off feather spins in its wake. Bright, thin mountain daylight from above; white cloud beyond the range, cool shadow inside the bow's curve, the imp a pale teal blur.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: A3-07 돌풍 임프.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SA3-05 · 되쏘는 바람 — 그림 있음
벨루미르의 별 · 방어 마법 · 레벨 2 · 고급 · 틀 `pov` F C `stormcloud` · 프롬프트 n2 → `tools/art/inbox/SA3-05 되쏘는 바람.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. First person, mid-stroke: our own sword blade enters from the bottom edge and is skidding off to one side, turned by a tight whirlwind that wraps something directly ahead like a cocoon of spinning rain, dust and feathers. Sparks and droplets spray from where steel meets wind. At the centre of the whirl a narrow slit has opened, and through it, steady and very near, a broadhead arrow on a drawn string points straight at the gap beneath our raised arm. Grey-violet storm light; the whirl is silver rain and wind-teal streaks, and the arrowhead inside it holds one hard white glint.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SA3-05 되쏘는 바람.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IA3-3 · 궁사회 망토 — 그림 있음
벨루미르의 별 · 아이템 · 레벨 3 · 고급 · 틀 `stand` N R `aurora` · 프롬프트 n2 → `tools/art/inbox/IA3-3 궁사회 망토.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. A hooded cloak of grey-teal wool hangs on a plain wooden stand on an open balcony, in the right of the frame, clasped at the throat with a silver brooch shaped like a feather, its hem stitched with a line of small silver quills and frayed at one corner. A slow wind circles the cloak of its own accord and keeps the hem turning. Caught in that turning hem, four spent arrows drift round and round at knee height like fish in an eddy, still looking for the way through. Night beyond the balcony rail, with teal-green and violet aurora ribbons that tint the wool and glint on the brooch.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IA3-3 궁사회 망토.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A3-U2 · 하늘 요람 그리핀 — 그림 있음
벨루미르의 별 · 유닛 · 레벨 5 · 고급 · 틀 `profile` L T `duskrose` · 프롬프트 n2 → `tools/art/inbox/PN-A3-U2 하늘 요람 그리핀.png`

```
Landscape 5:4 painting. In strict profile, like a figure on a coat of arms: a large griffin sits upright on a nest of branches at the foot of a round stone gate, high in the frame, facing left with half-closed eyes, teal-grey eagle head and folded wings, golden beak, tawny lion body, tail wrapped round two speckled eggs. A gale is having its fun all around: slates, a pennant and a string of bells fly past, and the translucent tail of a wind-serpent whips across the lower frame. One crest feather on the griffin's head lies perfectly flat. Dusk above the clouds: rose and peach light on the gate and the griffin's breast, deep teal shadow under the nest.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A3-U2 하늘 요람 그리핀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```
