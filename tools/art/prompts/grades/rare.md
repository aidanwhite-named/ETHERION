# 레어 (Rare) — 카드 일러스트 프롬프트 (59장, n2)

> 3단 — 처음으로 신비가 눈에 보인다. 되풀이해 이야기할 만한 인상적인 순간. 더 대담한 명암과 깊은 공간, 윤곽을 따라 차가운 사파이어 빛, 빛 받은 곳의 선명한 색, 주인공 둘레에 옅게 빛나는 안개와 떠도는 에테르 알갱이, 섬세한 장식과 반짝이는 묘사.

등급 줄(모든 레어 프롬프트에 들어 있다): `Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 프롬프트 맨 끝 줄이 파일 이름(`<카드ID> <카드 이름>.png`)을 알려 준다 — 나온 그림(가로 5:4)을 그 이름으로 `tools/art/inbox/`에 두고(이름이 달라도 카드 ID만 앞에 있으면 된다) → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저(같은 개체 · 장소 · 배색, 다른 시점 · 새 구도 — 섬네일로 나란히 놓아 같은 개체이면서 한눈에 더 강한 다른 그림으로 읽히는지 본다).

## 1. 그림 없는 카드 — 먼저 그린다 · 1장

### MG-14 · 숲의 무게
베르단의 뿔 · 공용 마법 · 레벨 3 · 레어 · 틀 `inside` R R `thorndark` · 프롬프트 n2 → `tools/art/inbox/MG-14 숲의 무게.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. We are inside a forest that is tipping over: every trunk around us leans at the same steep slant toward the right, roots tearing half out of the ground, canopy sliding like a single green roof. Leaves, birds' nests and loose stones pour sideways through the air. At the far right end of the lean, small and already bowed, the first of a row of shields is buckling under the nearest trunk while the next shield braces for its turn. Thorn-dark gloom under the sliding canopy, with a hard wedge of green daylight opening on the left where the roots have lifted.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MG-14 숲의 무게.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

## 3. 그림 있음 — 그리지 않는다 (참고용) · 58장

### RS-A1-1 · 피의 창 — 그림 있음
모르카스의 그믐 · 공격 마법 · 레벨 2 · 레어 · 틀 `path` R L `bloodink` · 프롬프트 n2 → `tools/art/inbox/RS-A1-1 피의 창.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Side view across a dark hall, the whole flight in one frame. At the left a spear long as a wagon pole flies toward the right, head and shaft one piece of dark red glass: faceted at the point, still liquid at the tail, where it stretches into a string of round drops trailing back out of the left edge. Its line passes level above a row of low helmets and shield rims, aimed past them all at the one crested helm a head taller than the rest, far right. Black hall with a thread of violet in one high window; the spear glows deep crimson from within and reddens the helmet crowns beneath it.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-A1-1 피의 창.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-A1-2 · 흡혈 장막 — 그림 있음
모르카스의 그믐 · 방어 마법 · 레벨 2 · 레어 · 틀 `pov` R R `frostindigo` · 프롬프트 n2 → `tools/art/inbox/RS-A1-2 흡혈 장막.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. We are the ones advancing on the canyon gate: two spear shafts thrust in from the left edge, ours and our neighbour's, and both spearheads are steaming away from the tip, their steel boiling off in two plumes of silver vapour that stream to the right. There a tall curtain of shadow hangs across the gateway and billows out toward us, drinking the plumes through its folds like a wick. Behind the dark cloth stands a broad gatekeeper's outline, and the edge of its long axe brightens with every wisp that arrives. Cold blue-violet night with frost in the air; the only brightness is the stolen silver, fading on the spearheads and gathering on the axe.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-A1-2 흡혈 장막.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-A1-3 · 정신 지배 — 그림 있음
모르카스의 그믐 · 공용 마법 · 레벨 2 · 레어 · 틀 `under` B B `eclipse` · 프롬프트 n2 → `tools/art/inbox/RS-A1-3 정신 지배.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From the trampled ground, looking steeply up. In the lower part of the frame one spearman in silhouette, seen from behind, has stepped out of his rank; his dropped shield lies nearest the lens. He hangs a hand's breadth above the earth, held up by a dozen taut violet threads hooked to his helmet, his wrists and the butt of his spear. The threads rise straight overhead and meet at a black disc with a hair-thin cold rim where the moon should be. His spear point is swinging round toward the rank he left. Total eclipse: a thin cold ring of light rims helmet, shoulders and spear while everything else stays black in violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-A1-3 정신 지배.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### US-A1-2 · 그림자 계약 — 그림 있음
모르카스의 그믐 · 공격 마법 · 레벨 2 · 레어 · 틀 `inside` D R `candle` · 프롬프트 n2 → `tools/art/inbox/US-A1-2 그림자 계약.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Inside the falling shadow itself, looking out: sheets of ink-dark shade pour down past the lens on every side like a black waterfall, leaving one ragged opening at the right. Through it, lit by a single candle, hangs the thing they pour from: a folded parchment draped over the edge of a high desk, its red wax seal swinging on a ribbon, darkness streaming out from beneath the seal. Far below, where the fall lands, a rack of three plain swords waits, and the third blade has already turned black from tip to hilt. One candle on the desk makes a small amber island around parchment and seal; the falling shade around us is black with violet in its folds.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-A1-2 그림자 계약.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IR-A1 · 녹타르 피의 가면 — 그림 있음
모르카스의 그믐 · 아이템 · 레벨 3 · 레어 · 틀 `bench` L R `candle` · 프롬프트 n2 → `tools/art/inbox/IR-A1 녹타르 피의 가면.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. On a mask-maker's workbench, at the right of the frame, an executioner's half-mask of black lacquered leather is clamped upright in a small wooden vice, turned in profile toward the left. Where a mouth would be it has a grille of fine silver slats, like gills. Just left of it a squat bottle of red ink stands open, and a faint red mist is lifting off the ink and drifting sideways into the slats, as if the empty mask were breathing in. Awls, waxed thread and a row of rivets lie around the vice. A single candle stub at the bench's edge makes one small amber pool; the workshop beyond is black, with violet in its deepest shadows.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IR-A1 녹타르 피의 가면.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MA-16 · 피의 맹약 — 그림 있음
모르카스의 그믐 · 공격 마법 · 레벨 3 · 레어 · 틀 `symbol` F L `bonepale` · 프롬프트 n2 → `tools/art/inbox/MA-16 피의 맹약.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A still life on a floor of pale ash. At the left, close and facing us squarely, stands one wide two-handled cup of bone-white horn, a dark red tide-line drying just below its rim. Behind it and away to the right, weapons stand planted upright in the ash in receding rows: sabres, axes, pikes. Each blade wears a single bead of the same dark red at its tip. Beside every weapon a shield lies face down where it was dropped, and a faint violet glow rises from the dregs in the cup. Flat, sourceless ash-grey light drains horn, steel and ash to bone tones; the dregs in the cup give the single violet glow.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MA-16 피의 맹약.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A1-R · 그림자 계약 집행자 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 4 · 레어 · 틀 `far` N R `frostindigo` · 프롬프트 n2 → `tools/art/inbox/PN-A1-R 그림자 계약 집행자.png`

```
Landscape 5:4 painting. Far across a frost-white square in a canyon city, three small figures stand motionless in a row at the right. The middle one is a man-tall raven standing upright in a long dark coat, a folded contract with a dangling seal held flat to its breast under one wing. Shadow pours from the paper down its coat and along the ground to the guards on either side, climbing their halberds and edging the blades in violet. Before them one figure kneels, and above its bowed head hangs a single puff of white breath, the only one in the square. Moonless blue-violet night; frost on the paving and tarnished silver lamps along the canyon wall give a cold, even glimmer.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A1-R 그림자 계약 집행자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-A2-3 · 빛의 결계 — 그림 있음
솔란테의 새벽 · 공용 마법 · 레벨 1 · 레어 · 틀 `reflect` R C `glare` · 프롬프트 n2 → `tools/art/inbox/RS-A2-3 빛의 결계.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A sword blade thrust level from the left fills the middle of the frame, tip toward the right, and its polished flat works as a mirror. Reflected there, a ring of white-gold light is drawn on dark ground, and inside the ring stand two planted boots and the butt of a grounded spear. The front half of the blade has already crossed above the ring. From that line on, the steel holds only blank white glare, its reflection burnt out, and the tip sags like a candle left in the sun. The ring of light is the only source, blinding white-gold in the mirror of the blade; everything around the steel is dark.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-A2-3 빛의 결계.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PS-A2-1 · 대신 속죄 — 그림 있음
솔란테의 새벽 · 방어 마법 · 레벨 2 · 레어 · 틀 `through` F R `vigil` · 프롬프트 n2 → `tools/art/inbox/PS-A2-1 대신 속죄.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Framed by the dark arch of a wall gate, a torch-lit bridge at night. At the right of the opening two shield-bearers stand in file, facing us, the second a step behind the first. A war hammer swung in from the left edge has landed square on the front shield, and that shield stays smooth and whole. The crack has opened in the shield behind it, in the same place, its edges glowing gold, and a thread of light runs between the two, taut as a plucked string. The rear bearer only bows its head. Deep night on the wall; two small torches with pale-gold halos light the bridge, and the glowing crack is the brightest thing in view.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PS-A2-1 대신 속죄.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-A2-1 · 빛의 심판 — 그림 있음
솔란테의 새벽 · 공격 마법 · 레벨 2 · 레어 · 틀 `cut` R X `stainedglass` · 프롬프트 n2 → `tools/art/inbox/RS-A2-1 빛의 심판.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A cutaway side view in the deep shade of a white wall. At the left two enamelled shields, one ruby, one blue, lie face up on pale paving. From each a ribbon of coloured light lifts, and the two braid into one level shaft of pale gold, thick as a mast, that runs across the whole frame to the right. It has bored through a first dark tower shield planted upright, shown sliced in half around the glowing tunnel, comes out thinner, and enters a second as fine as a needle. Deep morning shade below the wall; the shaft throws ruby, blue and pale-gold patches along the paving and rims each sliced edge.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-A2-1 빛의 심판.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IR-A2 · 솔란테의 맹세 방패 — 그림 있음
솔란테의 새벽 · 아이템 · 레벨 3 · 레어 · 틀 `top` U T `stainedglass` · 프롬프트 n2 → `tools/art/inbox/IR-A2 솔란테의 맹세 방패.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Overhead, the pale flagstones of an oath hall after a night's vigil. In the upper part a kite shield of ivory enamel lies face up, tapered end toward the top edge, a gilded half-sun on its broad end, and a skin of pale-gold light rests on its face like oil on water, level to the rim. A white cord is looped round its rim and tied in one fresh knot. Below it lie two unbuckled arm straps and a candle burnt down to a stub in a pool of cooled wax. Deep morning shade under tall windows; ruby and blue patches lie on the pale floor, and one pale-gold beam rests exactly on the shield.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IR-A2 솔란테의 맹세 방패.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-A2-2 · 응보의 빛 — 그림 있음
솔란테의 새벽 · 방어 마법 · 레벨 3 · 레어 · 틀 `impact` U B `glare` · 프롬프트 n2 → `tools/art/inbox/RS-A2-2 응보의 빛.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At arm's length, the instant a blow lands. Low in the frame a dark pike thrust in from the right has stopped dead against one great feather of solid white-gold light, broad as a door. Where point meets feather, a bright copy of the pike head is peeling off the steel like a cast from a mould. Above, a dozen such copies hang in the air, axe heads, sword blades, arrow points, climbing in a neat stack toward the top, and every one has turned to point back the way it came. Blinding white-gold glare from the feather of light itself fills the frame behind the impact and cuts the pike into a hard black shape.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-A2-2 응보의 빛.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A2-R · 새벽빛 방패 사자 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 4 · 레어 · 틀 `tilt` B T `stainedglass` · 프롬프트 n2 → `tools/art/inbox/PN-A2-R 새벽빛 방패 사자.png`

```
Landscape 5:4 painting. A thrown hatchet wheels in from the right across a steeply tilted frame. At the top of a flight of pale steps a great golden lion stands with its back to us, facing a tall east window, mane flared wide like the rays of the sun rising behind the glass. Light comes through window and mane together and fans out in jewel-coloured rays across the two spearmen flanking it. The hatchet, aimed at the right-hand spearman, has met one ray in mid-air and skids off it in a spray of gold. Sunrise through the east window: pale-gold beams and ruby, blue and green patches on pale stone, the steps below still in deep shade.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A2-R 새벽빛 방패 사자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-A3-1 · 칼바람 — 그림 있음
벨루미르의 별 · 공격 마법 · 레벨 1 · 레어 · 틀 `object` F R `starindigo` · 프롬프트 n2 → `tools/art/inbox/RS-A3-1 칼바람.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. On a high practice ledge at night, an empty suit of practice armour, dented breastplate and helmet, hangs on a wooden post at the right, facing us. Two thin crescents of teal wind have just crossed it, one after the other, and the two leather straps at its shoulder hang cut clean through, their ends still flying; the breastplate swings open on its one remaining buckle. An arm's length short of the post an arrow is still in the air, arriving late. Deep indigo night crowded with stars; the two wind crescents glow teal and lay a silver edge along the breastplate's rim.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-A3-1 칼바람.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-A3-2 · 역풍 장벽 — 그림 있음
벨루미르의 별 · 방어 마법 · 레벨 2 · 레어 · 틀 `cut` R L `aurora` · 프롬프트 n2 → `tools/art/inbox/RS-A3-2 역풍 장벽.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A side-on slice through the night air beside a needle spire, the wind made visible like grain in cut wood. In the left third a standing wall of it rises from the stair to the top of the frame: ribbons of teal-green and violet streaming upward, then hairpinning back toward the right. Three sword blades thrust in from the right edge at different heights have entered the wall, and each has been turned with the flow: the steel bends round in a smooth hook until its point aims back along its own blade. Dark night; the wind ribbons themselves glow teal-green and violet like an aurora, sheening the bent steel and the spire's edge.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-A3-2 역풍 장벽.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SA3-06 · 궁사회 무기고 — 그림 있음
벨루미르의 별 · 공격 마법 · 레벨 2 · 레어 · 틀 `symbol` L R `duskrose` · 프롬프트 n2 → `tools/art/inbox/SA3-06 궁사회 무기고.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The inside wall of a spire-top armoury at dusk, its doors standing open on the left. The wall is rows of wooden pegs, and each pair holds only a pale outline, unweathered wood in the shape of a bow. At the right the last longbow is lifting off its pegs, wrapped in a curl of teal wind and drifting left toward the door. Below lean the things left in exchange, a sword, a hatchet, a cudgel, and across the floor boot prints and large paw prints lead out together. Rose and peach dusk slants in through the open doors from the left, with deep teal shadow under every peg.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SA3-06 궁사회 무기고.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IR-A3 · 별 문자 화살 — 그림 있음
벨루미르의 별 · 아이템 · 레벨 3 · 레어 · 틀 `used` D L `moonsilver` · 프롬프트 n2 → `tools/art/inbox/IR-A3 별 문자 화살.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. An arrow stands buried head-down in the planks of a lookout platform, at the left of the frame, its shaft still quivering. It has pinned the tail of a small diamond-shaped kite of grey silk to the boards. The shaft is pale wood pricked along its length with tiny silver dots linked by scratched lines. Behind it, hanging in the still air, the flight path remains as a thin line of mist: straight at first, then doubling back around a flagpole, then one tight corner before the plunge down to where the arrow stands. A high full moon behind the viewer turns the boards blue-silver with razor-sharp shadows; the mist trail is faintly teal where it turns.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IR-A3 별 문자 화살.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-A3-3 · 회오리 칼날 — 그림 있음
벨루미르의 별 · 공용 마법 · 레벨 3 · 레어 · 틀 `reflect` F B `moonsilver` · 프롬프트 n2 → `tools/art/inbox/RS-A3-3 회오리 칼날.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A long white terrace wall under a full moon, and on it, sharp as cut paper, the shadow of something coming up behind us: a leaning funnel as wide as a gatehouse, its outline flickering with hundreds of small crescent shapes that circle inside it like a shoal. Along the foot of the wall, in the lower part of the frame, the shadows of spearmen caught in it are down on hands and knees, spears tumbling from their grip, one helmet lifting away. The funnel's shadow swells as it comes. The moon hangs low and full behind us: blue-silver wall, ink-sharp shadows, one breath of teal along the funnel's edge.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-A3-3 회오리 칼날.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-A3-R · 별빛 궁수장 — 그림 있음
벨루미르의 별 · 유닛 · 레벨 4 · 레어 · 틀 `swarm` B B `moonsilver` · 프롬프트 n2 → `tools/art/inbox/PN-A3-R 별빛 궁수장.png`

```
Landscape 5:4 painting. Arrows fill the moonlit air above a chasm from edge to edge, and every one is bending, like a flock on the turn. Low in the frame, back to us among his line of bowmen, stands a peacock captain: night-blue neck, a fanned crest, his long folded train sweeping the stone behind him, moon-silver bow lowered. From his shoulder hangs a strip of dark cloth set with open eyes, each casting a pale beam across the gap. Where a beam lands on the far ranks a bright dot marks an armour joint, and the arrows bend toward the dots. Full moon behind the bowmen: blue-silver arrows and sharp black shadows, with a breath of teal in the eye-beams.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-A3-R 별빛 궁수장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B1-2 · 매설 지뢰 — 그림 있음
도르마크의 심장불 · 방어 마법 · 레벨 1 · 레어 · 틀 `pov` D L `brassglow` · 프롬프트 n2 → `tools/art/inbox/RS-B1-2 매설 지뢰.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. First person, looking straight down at our own two boots on a steep mountain path paved with flat lava stones. Under the left boot, in the left of the frame, one stone like all the others has sunk a finger's depth, and a hair-thin seam of orange light has sprung up around it and is racing along the cracks toward a second stone one stride ahead. Smoke curls up between the bootlaces and the first grit is already lifting toward the lens. Beside the sunken stone, easy to miss, three pebbles sit in a deliberate row. Late amber light on soot-brown rock; the seam of fire under the boot is the brightest thing, glinting on brass eyelets and hobnails.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B1-2 매설 지뢰.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B1-3 · 불씨 탄막 — 그림 있음
도르마크의 심장불 · 공용 마법 · 레벨 2 · 레어 · 틀 `object` R R `whitehot` · 프롬프트 n2 → `tools/art/inbox/RS-B1-3 불씨 탄막.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One enormous two-handed sword stands raised, high at the right of the frame, above a dark rank of helmets and ordinary spears. From three shell-bursts fading in the sky behind, thousands of freed embers stream across the whole picture in long bending lines that all curve toward that single blade and crowd onto it. Its upper half is already sheathed in them and glowing yellow-white, sparks dripping from the cross-guard onto the gauntlets that hold it. The spears and short blades around it carry only an ember or two apiece. Black smoke-filled sky; the ember-crusted blade is the light source, blinding yellow-white along its edge and sinking to crimson on the helmets beneath.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B1-3 불씨 탄막.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IR-B1 · 명사수의 화승총 — 그림 있음
도르마크의 심장불 · 아이템 · 레벨 3 · 레어 · 틀 `hand` U R `brassglow` · 프롬프트 n2 → `tools/art/inbox/IR-B1 명사수의 화승총.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. At the right of the frame a single hand in a scorched leather glove, cropped at the wrist, holds a long matchlock musket upright by its fore-end, muzzle to the sky, a last thread of smoke leaving the barrel and the match cord glowing in its lock. The walnut stock is turned toward us: row under row of knife-cut notches cover it from the lock down to the brass butt-plate, the newest still pale. Far off at the left a long row of clay pots stands on a lava-stone wall, each holed through its exact middle. Sooty amber dusk on a firing range; the glowing match cord and a low furnace-orange horizon warm the brass fittings and catch the edge of every notch.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IR-B1 명사수의 화승총.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### NB1-3 · 불바람 — 그림 있음
도르마크의 심장불 · 공격 마법 · 레벨 3 · 레어 · 틀 `under` L T `ember` · 프롬프트 n2 → `tools/art/inbox/NB1-3 불바람.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Lying on the floor of a narrow mountain pass at night and looking straight up: the strip of sky between two black rock walls has become a river of wind made visible, long streamers of sparks and thin flame all racing leftward across the upper frame. Tall pennons on spear shafts lean in from below, snapping the same way; the foremost is ablaze along its whole length, those behind it only fringed with fire. Loose embers sift down toward the lens like slow snow and settle as tiny flames on helmet crests and spear tips. Deep night in the pass; the wind's own orange streamers overhead and the pinpoint embers settling on black iron are the only light.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: NB1-3 불바람.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B1-1 · 불바다 — 그림 있음
도르마크의 심장불 · 공격 마법 · 레벨 3 · 레어 · 틀 `ring` N C `magmadusk` · 프롬프트 n2 → `tools/art/inbox/RS-B1-1 불바다.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From a cliff-top battery we look down on a valley floor turned to a level sea of flame, shore to shore between black cliffs. At its centre the newest shell has just landed, and from that point ring-waves of fire roll outward one inside another, as ripples spread on a pond; a dozen smaller rings from other hits overlap them across the whole surface. A wrecked siege tower leans half-sunk in the burning, and more shells are still arcing down through the smoke. At the frame's lower edge lies a heap of emptied powder kegs. Violet-brown dusk under a lid of smoke; the fire sea lights the cliffs wine-red from below, and each ring crest burns orange-white.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B1-1 불바다.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B1-R · 포연 속의 불매 — 그림 있음
도르마크의 심장불 · 유닛 · 레벨 4 · 레어 · 틀 `ground` B R `ashfall` · 프롬프트 n2 → `tools/art/inbox/PN-B1-R 포연 속의 불매.png`

```
Landscape 5:4 painting. The camera sits on the flagstones of a gun bastion beside a carriage wheel, deep in pale drifting powder smoke. Along the wall three gun crews in leather aprons work with blurred hands: a rammer driven home, a charge passed along, a linstock already swinging down. High in the right of the frame, seen from below and behind, a hawk with dark ember-edged wings banks away from us into the smoke, its thin fire trail closing one full circle above the battery. Sparks shed from its feathers drift down, and every slow-match they touch flares. Bone-white smoke flattens the daylight to pale grey; the hawk's circling fire trail and the flaring matches are the only orange.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B1-R 포연 속의 불매.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### NB2-1 · 과부하 가동 — 그림 있음
소르그림의 방패 · 공용 마법 · 레벨 2 · 레어 · 틀 `path` R B `patina` · 프롬프트 n2 → `tools/art/inbox/NB2-1 과부하 가동.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. In side view along the bottom of the frame, three boiler-driven golems charge to the right across an iron bridge, each dragging a long level streak of steam ripped from every seam. Their whistle valves are lashed shut with chain, rivet heads glow cherry-red, and the shaking has thrown the rust off them in clouds of red-brown flakes that hang along the whole run. The lightest frame comes last, the middling one ahead of it, and far out in front, buckling the deck plates at each stride, pounds the heaviest: a slab-sided hulk of doubled plate. Dim storm daylight over a chasm; rust-red flakes and green-stained copper pipes against steel grey, the steam streaks pale and the rivets small hot points.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: NB2-1 과부하 가동.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B2-2 · 골렘 방진 — 그림 있음
소르그림의 방패 · 방어 마법 · 레벨 2 · 레어 · 틀 `reflect` L L `coldsteel` · 프롬프트 n2 → `tools/art/inbox/RS-B2-2 골렘 방진.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. On a snowy saddle between two peaks, seen from high behind: at the left a rank of square iron golems stands shoulder plate locked to shoulder plate, facing left into a cold white glare of hostile spell-light. Their joined shadow is the subject. It falls to the right across the snow as one solid band, sealed from end to end, with a jagged top like a mountain ridge; inside it the snow lies clean and blue, tents stand, a watch-fire burns upright. Beyond the shadow's two ends the snow is scorched grey and the heather smokes. A harsh white glare from the left edge under a slate-blue dusk; the shadow band is cool blue-grey, and every steel shoulder carries a crisp white rim.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B2-2 골렘 방진.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IR-B2 · 아다만트 장갑판 — 그림 있음
소르그림의 방패 · 아이템 · 레벨 3 · 레어 · 틀 `motion` R R `snowlight` · 프롬프트 n2 → `tools/art/inbox/IR-B2 아다만트 장갑판.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Caught in mid-air at the right of the frame: a sheet of dull grey metal the size of a breastplate and thin as a roofing slate shoots flat out of a rolling-mill shed toward the right, over a snowy yard, a shimmer of vibration along its raw edge. Behind it the mill tells the rest: the two great steel rollers it has just passed between are scored with deep grooves, and the lower one has cracked clean across, its halves sagging while a snapped drive-chain whips loose. The sheet itself is flawless, cold and matte. Overcast snow daylight, white and even; the grey sheet is crisp against the snow, the cracked rollers dim inside the granite-dark shed.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IR-B2 아다만트 장갑판.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B2-3 · 리벳 폭풍 — 그림 있음
소르그림의 방패 · 공용 마법 · 레벨 3 · 레어 · 틀 `swarm` L X `forgeheart` · 프롬프트 n2 → `tools/art/inbox/RS-B2-3 리벳 폭풍.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Red-hot rivets fill the frame from edge to edge, thousands of them, flying leftward in slanting streaks like driven sleet. At the right edge the spilled hoppers of overturned riveting engines still pour them out. Midway the storm crosses a rack of plain square breastplates, and there the rivets seat themselves with small flashes, heads lining up in neat new rows along every seam. At the far left it meets a line of black spiked shields and goes straight through, leaving each one stitched with round holes that let the furnace glow shine out behind. Gunmetal gloom of a forge yard at night; the rivets are the light, orange-white streaks that stay glowing in the new seams and in every punched hole.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B2-3 리벳 폭풍.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B2-R · 소르그림의 방패령 — 그림 있음
소르그림의 방패 · 유닛 · 레벨 4 · 레어 · 틀 `swarm` L L `mirror` · 프롬프트 n2 → `tools/art/inbox/PN-B2-R 소르그림의 방패령.png`

```
Landscape 5:4 painting. A locked shield wall fills the frame from edge to edge — one rank kneeling, one standing, a third held overhead — round steel shields overlapping like scales, all tilted toward the left. In the left third a spirit holds one place in the line: translucent steel plates hanging in the shape of one huge raised forearm, elbow at the ground, fist above the helmets, a faint forge-glow at its core. The shields nearest it have taken on its sheen, dents smoothed and rims doubled by a ghostly second edge, the polish fading shield by shield toward the right. Hard silver light from a white sky is mirrored in every polished boss; the dark pass shows only as reflections, the spirit's core one small warm point.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B2-R 소르그림의 방패령.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B2-4 · 철벽 진격 — 그림 있음
소르그림의 방패 · 공격 마법 · 레벨 4 · 레어 · 틀 `column` F L `patina` · 프롬프트 n2 → `tools/art/inbox/RS-B2-4 철벽 진격.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A steep stair cut into a mountain pass runs down the left of the frame, and a column of locked tower shields comes down it straight at us, rank stacked above rank like a pillar of steel. Every rank leans forward at the same slant, each shield pressed flat on the backs below, so the weight of the whole stair bears down on the one great shield at the bottom, huge in the foreground. Its boss has just struck a timber barricade: logs burst apart, and grit and rainwater leap off every step at once. Dim storm light in the pass; rust-streaked shields with verdigris-green bosses, the splintered timber pale against wet dark rock.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B2-4 철벽 진격.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SB2-09 · 대공방 — 그림 있음
소르그림의 방패 · 공용 마법 · 레벨 4 · 레어 · 틀 `through` B L `lamplit` · 프롬프트 n2 → `tools/art/inbox/SB2-09 대공방.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Framed by the timber props of a mine gallery's mouth, high in a vast cavern's wall: the whole underground city lies below, level under level, and every furnace in it is lit — hundreds of small orange doors glowing in the black, a hammer rising and falling in each pool of light. In the left of the frame the great shaft climbs toward the surface, and up it, away from us, moves an endless chain of lift cradles, each carrying a freshly riveted shield or breastplate, dull red at the edges, toward a far bright gate. Black cavern dark holding hundreds of small warm furnace mouths; steel glints at the edge of each pool and all along the moving lift chain.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SB2-09 대공방.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IR-B3 · 구리 피뢰봉 — 그림 있음
케라운의 벼락 · 아이템 · 레벨 2 · 레어 · 틀 `stored` R L `flash` · 프롬프트 n2 → `tools/art/inbox/IR-B3 구리 피뢰봉.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. On the left, across a deep stone window ledge, a staff lies in two brass cradles: an ash-wood shaft bound with copper wire, ending in a sawn-off tower finial — a tapering copper spike with a ball and four prongs, green in the creases, the saw-cut end still bright. It points right, out through the open window, and at this instant a bolt is coming down exactly where it points, onto a lone iron post far out on the moor. On the skyline beyond stands the tower it came from, flat-topped where its tip was taken. The strike bleaches the window to white-yellow and turns staff, cradles and ledge into hard black shapes with burning copper edges.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IR-B3 구리 피뢰봉.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PS-B3-1 · 증폭 회로 — 그림 있음
케라운의 벼락 · 공용 마법 · 레벨 2 · 레어 · 틀 `impact` B R `greensky` · 프롬프트 n2 → `tools/art/inbox/PS-B3-1 증폭 회로.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At arm's length behind two front-rank fighters, seen only as plated backs in the right of the frame: bolted between each pair of shoulder blades is a copper frame of coils and glass tubes with a short rod on top, and a sagging cable joins the two. A hair-thin thread of lightning has just come down from the sky onto the nearer rod; it crosses the cable as thick as a rope and bursts from the farther frame away from us, thick as a tree trunk, toward a far siege tower. Every helmet plume stands on end. Flat yellow-green storm light over a rain-flattened plateau; the bolt is electric yellow, thin above and blinding where it leaves, rimming both backs.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PS-B3-1 증폭 회로.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B3-1 · 축전 해방 — 그림 있음
케라운의 벼락 · 공격 마법 · 레벨 2 · 레어 · 틀 `after` N B `thunderhead` · 프롬프트 n2 → `tools/art/inbox/RS-B3-1 축전 해방.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Three tall glass lightning jars stand in a row along the lower part of the frame, on a rain-wet parapet, joined neck to neck by one thick copper bar — and all three are spent: each belly dark and fogged from inside, each lid lifting an identical curl of smoke, the bar still glowing dull yellow from end to end. Beyond them the plain shows where the charge went: three scorched discs in a file along a trampled road, one behind another, each glazed to black glass, each the same width, each still steaming. Black storm cloud and grey rain; the cooling copper bar and the three smouldering discs are the only yellow in the scene.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B3-1 축전 해방.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B3-3 · 충전 완료 — 그림 있음
케라운의 벼락 · 공용 마법 · 레벨 2 · 레어 · 틀 `path` U T `flash` · 프롬프트 n2 → `tools/art/inbox/RS-B3-3 충전 완료.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One bolt crosses the upper part of the frame in side view, and it is ruler-straight: one white line rising from lower left to upper right, every fork and kink pressed out. It leaves the brass muzzle of a squat coil engine whose tall glass charge-column stands brim-full of light, the needle of its blank dial hard against the stop. On its way it threads a hanging chain's ring, an iron gate's keyhole and the gap between two crossed spears, then ends dead-centre on one shield boss and on the shield behind. The bolt overexposes everything to white-yellow; engine, chain, gate and shields stand as flat black cut-outs with thin glowing rims.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B3-3 충전 완료.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-B3-2 · 감전 덫 — 그림 있음
케라운의 벼락 · 방어 마법 · 레벨 3 · 레어 · 틀 `object` D R `copperlab` · 프롬프트 n2 → `tools/art/inbox/RS-B3-2 감전 덫.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A heavy sword hangs in mid-air above a workshop doorsill at the right of the frame, point down, an instant after leaving the hand that carried it: the steel gauntlet above is still sprung wide open, cropped at the wrist by the door frame. Along the oak sill runs a bright line of bare copper wire, and from it thin yellow arcs climb the blade to the hilt and on to the gauntlet's fingertips. Two more dropped blades already lie across the threshold. Inside, to the left, the workshop waits warm and orderly: coils, amber lamps, a steaming kettle. Amber lamplight from inside spills over the sill; the copper wire and the climbing arcs add sharp filament-yellow along the falling blade.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-B3-2 감전 덫.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-B3-R · 병 속의 번개 술사 — 그림 있음
케라운의 벼락 · 유닛 · 레벨 4 · 레어 · 틀 `ground` L T `copperlab` · 프롬프트 n2 → `tools/art/inbox/PN-B3-R 병 속의 번개 술사.png`

```
Landscape 5:4 painting. From puddle level on a cobbled lane: an open copper-banded bottle stands on the wet stones, and from its mouth a ribbon of yellow light climbs to the upper frame and swells into a small genie of crackling lightning drifting leftward. With a glass-handled rod it drops a spark into the next empty jar on an overhead wire. The jars behind it glow amber like street lamps; those ahead hang dark. Beside the lens one jar lies freshly shattered, and from its shards a thread of lightning runs to the butt of a sentry's staff, whose tip blazes double. Amber dusk between copper-roofed walls; the lit jars cast a warm filament-yellow down the lane and gild the wet cobbles.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-B3-R 병 속의 번개 술사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### NG1-1 · 격노 — 그림 있음
고르바스의 발톱 · 공격 마법 · 레벨 2 · 레어 · 틀 `after` D R `ochredust` · 프롬프트 n2 → `tools/art/inbox/NG1-1 격노.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The aftermath on a hillside camp: at the right, under a hide lean-to, three stretchers lie empty with their lashings burst outward, and unwound bandages, a snapped crutch and a splint trail out of the shade in a line. From there a swathe of gouged footprints plunges straight down the slope, each print deeper and wider than the last, to a rolling wall of rust-red dust far below — and inside the dust run small dark figures, every one with two points of red where the eyes would be. High dry sun in a tan dust haze; the lean-to throws one hard shadow, and the red cloud below stands matte against the pale clay slope.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: NG1-1 격노.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PS-G1-2 · 무리의 분노 — 그림 있음
고르바스의 발톱 · 공격 마법 · 레벨 2 · 레어 · 틀 `reflect` U C `firelit` · 프롬프트 n2 → `tools/art/inbox/PS-G1-2 무리의 분노.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Shadows on a canyon wall tell it. At the bottom a single small fire burns on the canyon floor, and around it sit the dark backs of a wolf pack of every size — a heavy leader with its head thrown back in a howl, lean yearlings, a cub half their height. On the sandstone wall that fills the centre of the picture every one of their shadows has risen to the same towering size as the leader's: a row of identical huge wolf-shapes with lifted muzzles, climbing toward the rim of the rock. One small fire at the foot of the wall is the only light, warming the sandstone in dry ochre and leaving the canyon above in deep darkness.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PS-G1-2 무리의 분노.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-G1-2 · 피의 맹세 — 그림 있음
고르바스의 발톱 · 방어 마법 · 레벨 2 · 레어 · 틀 `impact` B B `ochredust` · 프롬프트 n2 → `tools/art/inbox/RS-G1-2 피의 맹세.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A round hide shield has just hit the dust, face up, at the bottom of the frame, a ring of grit still jumping from under its rim. The rust-red clay handprint stamped on it is lifting off the hide as one bright thread and streaming away from us along the ground to the next shield in the file, upright a pace behind, where a second handprint is appearing over the first. Beyond that, shield after shield recedes into the sunlit haze, each stamped with a single red hand, with only dusty boots showing beneath. Hard midday sun through tan dust lights the file from the left; the red thread and the handprints are the only saturated colour in the clay-brown haze.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-G1-2 피의 맹세.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IR-G1 · 잿갈기 문신 — 그림 있음
고르바스의 발톱 · 아이템 · 레벨 3 · 레어 · 틀 `top` N L `firelit` · 프롬프트 n2 → `tools/art/inbox/IR-G1 잿갈기 문신.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. Straight down onto a tattooist's hide mat beside a small fire. In the left third a palm-wide swatch of pale cured hide is pegged flat, and on it the tattoo's pattern stands finished in ash-grey ink: a mane of long swept strokes, each tapering to a point as fine as a blade tip, all the points meeting at one small dot. Laid out around it are a bone tapping comb with stained teeth, a worn striker rod, a horn cup of grey ash paste and a twist of coarse grey hair tied with sinew. A single small flame just past the right edge warms hide, horn and bone in dry ochre while the rock around the mat sinks into deep darkness.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IR-G1 잿갈기 문신.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SG1-03 · 궁지의 송곳니 — 그림 있음
고르바스의 발톱 · 공격 마법 · 레벨 3 · 레어 · 틀 `under` F C `bonemoon` · 프롬프트 n2 → `tools/art/inbox/SG1-03 궁지의 송곳니.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Flat on our back on cold ground, looking straight up: from every edge of the frame bone-white stone fangs as long as spears close in toward the centre, the inside of one vast bite coming down on us, with the full moon caught in the shrinking gap between their points. Torn loose and tumbling up into that gap are a sword, highest and smallest, then a wrenched-off shoulder plate, then a helmet only just lifted away, its straps still flying, while grit sifts down from the fangs onto us. A full moon directly overhead backlights the ring of fangs, bone-white on their inner edges and grey-blue in shadow, with dry ochre grit drifting through the beam.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SG1-03 궁지의 송곳니.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SG1-08 · 송곳니 반격 — 그림 있음
고르바스의 발톱 · 방어 마법 · 레벨 3 · 레어 · 틀 `swarm` U L `redearth` · 프롬프트 n2 → `tools/art/inbox/SG1-08 송곳니 반격.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The ground has grown teeth. Across the whole frame rust-red clay is splitting open, and up through every crack push bone-white fangs — hundreds, from thumb-sized to tall as fence posts, thickest at the left — each pair snapping shut on whatever struck there: a sword blade bent double, a spear shaft bitten through, an empty iron-shod boot, an axe head. Chips of steel and clods of clay hang in the air above the bristling field, and at the far right the last heels of a charge are turning to run. Slate-grey storm light from above flattens the red clay, and each fang shows chalk-pale against it while ochre dust blows through the gaps.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SG1-08 송곳니 반격.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G1-R · 카르노를 쫓는 자 — 그림 있음
고르바스의 발톱 · 유닛 · 레벨 4 · 레어 · 틀 `close` R C `bonemoon` · 프롬프트 n2 → `tools/art/inbox/PN-G1-R 카르노를 쫓는 자.png`

```
Landscape 5:4 painting. Tight on the head and shoulders of a rangy ram at the centre of the frame, turned to the right: heavy curled horns chipped along their ridges, a scarred muzzle, rust-red paint across the brow, fleece rubbed grey with ash. He lowers his horns in challenge, eyes fixed on someone beyond the right edge, and a thong strung with dozens of stone chips hangs at his throat. At both edges the cropped shoulders of two companions lean in, lowering their own horned heads the same way. Behind them a long streak of grey smoke lies along the night horizon. A high moon from the left edges horns, brow and ash-grey fleece in bone white, with grey-blue night behind and dry ochre earth under the smoke.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G1-R 카르노를 쫓는 자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-G2-1 · 뿌리 습격 — 그림 있음
베르단의 뿔 · 공격 마법 · 레벨 2 · 레어 · 틀 `path` B R `sporeglow` · 프롬프트 n2 → `tools/art/inbox/RS-G2-1 뿌리 습격.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Night on the forest floor. From the lower left a raised seam of earth runs away from us across the leaf litter, glowing blue-green through its cracks, straight under the feet of a distant rank of armoured figures that stands facing us on the right. Behind their backs the seam has burst: a fan of pale roots, tall as saplings, rears out of the ground and curls over their helmets, tips already hooked round two ankles. Along the seam beads of pale-lime light slide back toward us, one after another, like sap rising in a stem. Black night under the canopy, lit only by the blue-green seam and the pale roots, which rim the rank of figures from behind.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-G2-1 뿌리 습격.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-G2-2 · 가시 덤불 — 그림 있음
베르단의 뿔 · 방어 마법 · 레벨 2 · 레어 · 틀 `object` L R `sporeglow` · 프롬프트 n2 → `tools/art/inbox/RS-G2-2 가시 덤불.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Told through one roadside lamp: on the right, where a forest road lay open at dusk, a thicket of bramble now stands thick as a wall, and deep inside it hangs the road's lamp — a glass globe of glowing fungus on a post that the stems have lifted and tipped toward the left. Its pale-lime light shines out through layer on layer of hooked thorns and throws their shadows huge across the last bare paving stones, which are already tilting as new shoots push up between them. Deep night; the caged lamp is the only source, pale-lime at its heart and blue-green where it filters through the leaves.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-G2-2 가시 덤불.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IR-G2 · 첫 고목의 껍질 — 그림 있음
베르단의 뿔 · 아이템 · 레벨 3 · 레어 · 틀 `hand` D L `mossdeep` · 프롬프트 n2 → `tools/art/inbox/IR-G2 첫 고목의 껍질.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. On the left of the frame one long, moss-knuckled hand, cropped at the wrist, comes down from above and holds a slab of ancient bark by its upper edge so that it hangs toward the forest floor — thick as a plank, deeply furrowed, silver-grey with green moss in the grooves. Its face is crossed by a dozen old sword cuts, and out of every cut a hooked thorn has grown, the newest still pale and beaded with sap. Below it on the moss lies the snapped tip of a blade, itself sprouting a first green thorn. Deep green shade under giant trees, with a little soft daylight from the right sliding along the wet bark ridges and the beads of sap.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IR-G2 첫 고목의 껍질.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-G2-3 · 끈질긴 이끼 — 그림 있음
베르단의 뿔 · 공용 마법 · 레벨 3 · 레어 · 틀 `impact` F B `sporeglow` · 프롬프트 n2 → `tools/art/inbox/RS-G2-3 끈질긴 이끼.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The instant a fall is stopped, at arm's length on the forest floor: low in the frame a huge moss-furred knee has buckled toward the ground and halted a hand's width above it, because the moss has thrown down a hundred green threads that struck the earth first and pulled taut like guy ropes. The jolt bursts a ring of glowing spores out of the fleece, rolling straight toward us, and beside the knee a dropped axe hangs caught in the same threads, a finger's breadth clear of the ground. Darkness under the trees; the spore ring is the light, pale-lime and blue-green, shining up onto the taut threads and the underside of the knee.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-G2-3 끈질긴 이끼.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SG2-09 · 베르단의 고목 — 그림 있음
베르단의 뿔 · 방어 마법 · 레벨 3 · 레어 · 틀 `after` B C `rainmist` · 프롬프트 n2 → `tools/art/inbox/SG2-09 베르단의 고목.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Morning after, in drifting rain: in the centre of a trampled clearing stands a tree that was a fallen branch last night — a trunk broader than a gatehouse, forking like an antler into tines hung with thorns as long as spears. Its crown bristles with hundreds of spent arrows caught among the thorns, their fletchings dripping. Beneath it, small and seen from behind, a line of figures with upright spears stands at ease, looking out into the mist, and last night's campfire still smokes between two roots that have lifted its ring of stones. Soft silver rain-light from all sides, with grey-green mist swallowing the clearing's edge and small bright glints on wet thorns and arrowheads.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SG2-09 베르단의 고목.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G2-R · 드리엔의 이끼 거인 — 그림 있음
베르단의 뿔 · 유닛 · 레벨 4 · 레어 · 틀 `profile` R R `autumnrot` · 프롬프트 n2 → `tools/art/inbox/PN-G2-R 드리엔의 이끼 거인.png`

```
Landscape 5:4 painting. Strict side view, flat as a frieze, among falling russet leaves: at the right third a tall giant heaped wholly of living moss stands facing right, round-shouldered, arms hanging past its knees. An axe-stroke has parted the moss along its ribs; a hedge of black thorns bristles in the gap, and behind the thorns glows a core of amber holding old leaves and a dragonfly. From its feet moss creeps along the ground both ways and climbs the shields of two small spearmen, one ahead and one behind, budding thorns on their rims. Low amber afternoon light from the left rakes through the falling leaves, and the amber core adds its own warm glow against dark green shade.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G2-R 드리엔의 이끼 거인.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### IR-G3 · 넬리아의 물방울 — 그림 있음
마렌시아의 노래 · 아이템 · 레벨 2 · 레어 · 틀 `cut` L L `trench` · 프롬프트 n2 → `tools/art/inbox/IR-G3 넬리아의 물방울.png`

```
Landscape 5:4 painting of one object — the object itself is the subject. A cutaway view on the left of the frame: a small sea-worn clay ewer, spout turned left, sliced cleanly in half from lip to foot to show the thickness of its wall. In the hollow hangs a single drop of water, round as a pearl and bright as a cold star, clear of every wall. The clay is cracked through in five places, and in the cut face each crack is filling from the inside with a seam of blue-white light, the innermost already closed to smooth new clay. Around it lies the dark of a deep spring. The drop is the only light, a cold water-blue point that picks out the cut edge of the clay and fades into navy darkness all around.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IR-G3 넬리아의 물방울.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-G3-1 · 작살 물살 — 그림 있음
마렌시아의 노래 · 공격 마법 · 레벨 2 · 레어 · 틀 `inside` D L `stormsea` · 프롬프트 n2 → `tools/art/inbox/RS-G3-1 작살 물살.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From inside the spell itself: we ride within a hollow, spiralling tube of green-blue water, its walls streaked white with speed, plunging steeply down toward the lower left. Ahead of us a long bone harpoon rides the tube, barbs first, its line trailing back past us, and at the tube's mouth its point is just meeting a raised round shield — whose painted rings and pale glow are peeling off in the flow like wet pigment, streaming back along the walls in ribbons, while the bare wood splits around the barb. Slate storm daylight filters through the rushing green-blue walls, and white spray and the harpoon's wet barbs take the brightest highlights.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-G3-1 작살 물살.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-G3-2 · 포말 장막 — 그림 있음
마렌시아의 노래 · 방어 마법 · 레벨 2 · 레어 · 틀 `ring` F L `coraldawn` · 프롬프트 n2 → `tools/art/inbox/RS-G3-2 포말 장막.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A single tall curtain of white water rises from the dawn shallows and curves over the shelter behind it, one smooth silken sheet, glassy and thin, with a soft white mane rolling along its crest like the lip of a breaking wave. Through the sheet, left of centre, we see the blurred warm shapes of the figures crouched safely behind. A sword blade has just struck from the right and is sliding off along the curve, its edge trailing one long ribbon of pale water, while the sheet bends round the blow and closes again behind it, unbroken. Low mist drifts across the wet sand in wide, soft bands. First coral-pink sun from low behind us glows through the thin water so the whole curtain turns rose and gold at its edges over water-blue shallows, and the blade carries one cold glint.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-G3-2 포말 장막.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### MG-15 · 치유의 조수 — 그림 있음
마렌시아의 노래 · 공용 마법 · 레벨 3 · 레어 · 틀 `through` U T `trench` · 프롬프트 n2 → `tools/art/inbox/MG-15 치유의 조수.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Framed by the broken ribs of a beached boat, we look out over a night battlefield on a tidal flat as the flood drains away. The ebbing water glows from within, a sheet of water-blue light sliding back toward the sea and steaming faintly with warmth. High in the frame, wherever it has passed, small dark figures are getting up — one on hands and knees, one sitting, one already standing — each still streaming bright water from shoulders and fingertips, while spears lie where they fell and glowing drops run down the timbers beside us. Deep night under a black sky; the tide's own cold blue glow lights the flat from below and outlines the rising figures and the boat's ribs.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MG-15 치유의 조수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### RS-G3-3 · 밀물의 노래 — 그림 있음
마렌시아의 노래 · 공용 마법 · 레벨 3 · 레어 · 틀 `impact` F L `lagoon` · 프롬프트 n2 → `tools/art/inbox/RS-G3-3 밀물의 노래.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A clear, sunlit wave has just burst over a gaming blanket spread on white sand at the left of the frame and surges straight toward us, its face combed into fine even ripples as if a sound were passing through it. It is carrying the whole game away — a spill of coins, a rabbit-foot charm, a braided lucky knot, a handful of knucklebones, the wooden stake-bowl — all tumbling in turquoise foam right before us. Every coin in the water has turned the same smooth, unmarked side up. High sun through shallow turquoise water throws dancing bright nets over the white sand, and the foam and coin faces flash pearl white.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: RS-G3-3 밀물의 노래.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### SG3-01 · 환각의 통제 — 그림 있음
마렌시아의 노래 · 공용 마법 · 레벨 3 · 레어 · 틀 `column` B C `stormsea` · 프롬프트 n2 → `tools/art/inbox/SG3-01 환각의 통제.png`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. On a storm-beaten shore, heavy green-blue swells break white everywhere except along one narrow lane of water that lies flat as glass, running straight out from the beach. A lone bare-headed figure, small and seen from behind, wades down that lane, already waist-deep, spear trailing slack from one hand. Ahead of him, dead centre, the lane ends at a single tall column of pale mist and light standing on the sea from wave to cloud, its foot ringed with slow ripples. His helmet rolls in the foam at our feet. Slate storm cloud and flying spray overhead; the column is the one pale source, silvering the flat lane and the wet back of the walking figure.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: SG3-01 환각의 통제.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### PN-G3-R · 넬리아의 물그릇 무녀 — 그림 있음
마렌시아의 노래 · 유닛 · 레벨 4 · 레어 · 틀 `tilt` F C `lagoon` · 프롬프트 n2 → `tools/art/inbox/PN-G3-R 넬리아의 물그릇 무녀.png`

```
Landscape 5:4 painting. The horizon tips steeply as a sea-nymph comes straight toward us at the centre, waist-deep in sunlit turquoise shallows — skin like mother-of-pearl, hair of drifting green kelp, pearls at her brow — bearing a wide pearl-white bowl level in both hands. The water in it is deep-sea dark, and from it pale rings spread through the air like ripples. A volley of arrows slants down across the tilted sky; each one that crosses a ring turns to a string of bright drops and spatters as rain on the shoulders of the two spearmen flanking her. High midday sun from the upper right; the turquoise shallows throw rippling light up under the bowl and every falling drop flashes pearl white.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G3-R 넬리아의 물그릇 무녀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```
