# 일반 (Common) — 카드 일러스트 프롬프트 (362장, n2)

> 1단 — 있는 그대로의 세계. 조용하고 담백하지만 정성껏 그린 그림. 빛은 장면에 쓴 광원뿐(덧붙인 빛 없음), 절제한 흙빛 색, 공기에는 먼지 · 연기 · 안개까지만, 닳고 손때 묻은 꾸밈없는 재질. 화려함이 아니라 관찰 · 질감 · 개성으로 좋은 그림.

등급 줄(모든 일반 프롬프트에 들어 있다): `Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 나온 그림(가로 5:4)은 `tools/art/inbox/<카드ID>.jpg` → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저(원래 카드와 같은 틀 · 다음 순간 — 섬네일로 나란히 놓아 짝으로 읽히는지 본다).

## 1. 그림 없는 카드 — 먼저 그린다 · 361장

### A1-04 · 피의 박쥐 떼
모르카스의 그믐 · 유닛 · 레벨 1 · 일반 · 틀 `swarm` N X `violetshade` · 프롬프트 n2 → `tools/art/inbox/A1-04.jpg`

```
Landscape 5:4 painting. The whole frame is a ceiling crowded with small black bats hanging upside down in overlapping rows among dusty rafters and cobwebs, wings folded like wet leather, red pin-prick eyes open here and there. We look straight up at them from beneath; at the centre of the pattern one bat has dropped loose and spreads its red-veined wings toward us, and from the lower edge a long quill pen is held up to it like an offered perch. Purple gloom of a tall archive hall, with a faint upward glow from an unseen desk lamp catching needle fangs and wing veins.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-05 · 녹타르 구울
모르카스의 그믐 · 유닛 · 레벨 1 · 일반 · 틀 `silhouette` R C `bonepale` · 프롬프트 n2 → `tools/art/inbox/A1-05.jpg`

```
Landscape 5:4 painting. At the far end of a narrow back alley a colourless glow fills an archway, and against it the black outline of a gaunt creature crawls on all fours toward the right — spine arched, elbows higher than its back, overlong arms ending in cracked nails, jaw hanging open. From its wrist dangles a broken debtor's tally-cord of knots. Overturned crates and one gnawed bone lie in the dark foreground. Flat ash-white mist-light from behind turns everything to silhouette; the only colour is two faint violet points where its eyes are.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-06 · 값으로 떼인 그림자
모르카스의 그믐 · 유닛 · 레벨 1 · 일반 · 틀 `ground` R R `violetshade` · 프롬프트 n2 → `tools/art/inbox/A1-06.jpg`

```
Landscape 5:4 painting. Camera resting on the cobblestones of an empty night street: a flat, paper-thin human shadow with frayed, torn edges slides along by itself toward the right, bending up the wall at the right side of the frame where its long arm stretches toward the sill of a shuttered window. Its feet end in ragged strips, as if cut away with shears. A lost glove and a puddle fill the near foreground. A faint violet seam glows along the shadow's cut edges; the street lies in purple-black gloom under a moonless sky.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### HA1-1 · 소매치기
모르카스의 그믐 · 핸드 마법 · 레벨 1 · 일반 · 틀 `macro` R C `eclipse` · 프롬프트 n2 → `tools/art/inbox/HA1-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Extreme close-up of a handshake in a crowded night market, filling the centre of the frame: a broad, ringed merchant's hand on the left clasped by a thin grey-gloved hand reaching in from the right. In the gap between the palms the gloved fingers press a dull lead token into the merchant's grip. At the same instant a third hand of thin violet smoke, slipping out of the grey glove's cuff, slides a gold signet ring off his little finger and carries it away to the right. A thin cold rim of light from a stall lantern behind outlines both hands; the gold ring is one bright glint in violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### HA1-2 · 손끝 저주
모르카스의 그믐 · 핸드 마법 · 레벨 1 · 일반 · 틀 `through` N C `violetshade` · 프롬프트 n2 → `tools/art/inbox/HA1-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Framed by the dark parted flaps of a campaign tent: inside, in the centre, a suit of plate armour waits on its wooden stand beside a cot, polished for the morning. On the left shoulder plate sits a single fingertip mark, small as a thumbprint and glowing dull violet, and from it hair-fine black veins are spreading across the steel like frost cracks. Under the blanket on the cot a sleeper lies curled, and three small puffs of violet breath hang above the pillow, one for each cough. Purple-black night inside the tent; the fingertip mark and the hanging breaths glow luminous violet on steel and canvas.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-01 · 공포의 칼날
모르카스의 그믐 · 공격 마법 · 레벨 1 · 일반 · 틀 `top` R L `candle` · 프롬프트 n2 → `tools/art/inbox/MA-01.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Straight down onto night paving where two sentries stand guard, seen only as two helmet crowns, two pairs of shoulders and a small brazier between them, in the left of the frame. Across the stones sweeps the long shadow of one huge blade, cast by an unseen sword and moving to the right like the hand of a sundial. It has just passed through the two men's own shadows: each shadow is sliced cleanly in two and slipped apart, while the men above stand whole. In both shadows the hand on the sword hilt is blurred with trembling. The brazier lays one small amber pool on dark stone; the blade's shadow is deeper black with a faint violet fringe.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-04 · 피의 공명
모르카스의 그믐 · 공격 마법 · 레벨 1 · 일반 · 틀 `cut` U B `bloodink` · 프롬프트 n2 → `tools/art/inbox/MA-04.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A cross-section of the ground beneath a paved yard. On the stones along the top, a few dark red drops have fallen here and there. The cut earth shows where each one went: thin red threads seep down through soil and cracked rock and meet in a buried hollow in the lower part of the frame, where the gathered red trembles like a struck bell, ring inside ring. From its centre one column has just burst straight upward, splitting the paving beneath a pair of planted iron boots and lifting the slabs. Black earth and rock lit from within by the deep crimson pool; a thread of violet marks the rim of each ring.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-A1-1 · 영혼 착취
모르카스의 그믐 · 공격 마법 · 레벨 1 · 일반 · 틀 `swarm` L X `eclipse` · 프롬프트 n2 → `tools/art/inbox/PS-A1-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Hundreds of bright steel filings fill the frame, streaming in one curving flock from the upper right to the lower left like iron dust drawn to a lodestone. They peel from the edges of two great weapons crossed in the upper right, a broad axe and a halberd, which are left dull, pitted and soft-edged as lead. They gather on a single plain short sword standing point-down at the lower left, coating it in a thickening edge that shines brighter with every sliver. A thin cold rim of light catches each filing against black; the growing edge glows violet-white while the robbed weapons sink into silhouette.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-A1-2 · 역병의 족쇄
모르카스의 그믐 · 공용 마법 · 레벨 1 · 일반 · 틀 `macro` L R `frostindigo` · 프롬프트 n2 → `tools/art/inbox/PS-A1-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Freezing night air, magnified: at the right edge the lower rim of a helmet and its dark mouth-slit, and before it a plume of white breath hanging in the cold. A rusted iron shackle, hinged and padlocked, has closed around the plume itself and pinches the cloud to a narrow waist, its chain hanging down out of the frame. Before the pinch the breath is clean and white; past it, it comes out thin and rust-brown, and flecks of rust drift leftward on the air toward a second, smaller breath-cloud at the left edge. Blue-violet frost-light from above; the white breath glows like tarnished silver and the rust is the one warm stain.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA1-02 · 그림자 손아귀
모르카스의 그믐 · 공용 마법 · 레벨 1 · 일반 · 틀 `impact` L C `candle` · 프롬프트 n2 → `tools/art/inbox/SA1-02.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. By a watch-fire at night, the pool of shadow at a halberdier's feet has become a hand. Five black fingers, each thicker than his leg, have risen out of the ground around him and are closing at this instant, the thumb already hooked across his greaves; we see him only from the waist down, in the centre, his dropped halberd bouncing on the stones. The hand's flat black wrist runs away to the left along the ground like a road, and he is tilting that way. Three dark drops soak into the earth where the wrist begins. The watch-fire at the right edge is the only light, amber on boots and greaves; the hand is flat black with a violet sheen.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-07 · 그림자 도플갱어
모르카스의 그믐 · 유닛 · 레벨 2 · 일반 · 틀 `over` R X `bonepale` · 프롬프트 n2 → `tools/art/inbox/A1-07.jpg`

```
Landscape 5:4 painting. Over the shoulder of a cloaked traveller whose hood and raised lantern fill the right foreground: facing him from the left of a narrow canyon path, turned toward the right, stands his own likeness, only half finished. One half already wears his cloak, his beard, his startled look; the other half is still smooth, blank grey wax with a rippling mirror sheen and a hand whose five fingers are all the same length. Thin wisps of shadow run between the two like thread drawn off a spool. The lantern's pale flame drains the scene to bone-white and ash-grey, with one violet glimmer deep in the copy's unfinished eye.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-08 · 계약의 서큐버스
모르카스의 그믐 · 유닛 · 레벨 2 · 일반 · 틀 `close` L L `eclipse` · 프롬프트 n2 → `tools/art/inbox/A1-08.jpg`

```
Landscape 5:4 painting. Tight close-up at the left of the frame: a slender horned temptress in dark velvet, seen from the collarbone up and turned three-quarters toward the left, smiling with closed lips. Her thin tail curls up beside her cheek, its tip a gold quill nib beaded with ink, and she holds a rolled, ribbon-tied parchment against her chin like a finger asking for silence. Behind her, soft and out of focus, a sleeper's open hand lies on a pillow with a small balance-scale mark glowing on the palm. A thin cold rim of light traces her horns, cheek and one bat-wing edge from behind; her face stays in violet shadow.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-09 · 모르크 그림자 거미
모르카스의 그믐 · 유닛 · 레벨 2 · 일반 · 틀 `under` R X `eclipse` · 프롬프트 n2 → `tools/art/inbox/A1-09.jpg`

```
Landscape 5:4 painting. From the bottom of a deep canyon, looking straight up: the two rock walls rise like the sides of a well to a thin crooked strip of night sky, and across that strip stretches a huge web of black threads, visible only where it crosses the pale gap. A large spider with clustered eyes clings to it, legs spread wide, creeping toward the right-hand wall where a fallen lantern, its flame just dying, hangs tangled with a boot and a dropped satchel. The strip of sky gives a thin cold light that outlines web and legs; the dying lantern is one last warm speck in violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-11 · 계약단 쥐 병사
모르카스의 그믐 · 유닛 · 레벨 2 · 일반 · 틀 `eye` R L `violetshade` · 프롬프트 n2 → `tools/art/inbox/A1-11.jpg`

```
Landscape 5:4 painting. At eye level, as if standing next in line: a rank-and-file rat soldier, lean and grey-furred with one torn ear, stands upright at the left of the frame, facing right toward a stone offering-ledge. It wears plain dark leather with one dented pauldron, a spear leaning in the crook of its arm, and with its teeth it tightens a cloth strip around its own paw. On the ledge the small brass cup it has just filled sits beside an identical cup that pours out an equal measure of violet flame. The measured violet flame lights its muzzle and knuckles from the right; the barracks vault behind it is purple-black.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### HA1-3 · 저주 전염
모르카스의 그믐 · 핸드 마법 · 레벨 2 · 일반 · 틀 `before` N X `frostindigo` · 프롬프트 n2 → `tools/art/inbox/HA1-3.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A long weapon rack runs across the whole frame in a cold barracks hall before dawn, a dozen sheathed swords hanging in a row by their hilts. The two in the middle have turned black with a creeping tarnish and grown so heavy that their iron pegs bend, and one has sunk its point a thumb deep into the floorboards. From both of them thin fingers of the same tarnish are reaching along the rail, left and right, and have just touched the hilts of the clean swords on either side. Blue-violet half-light from a frosted window; the clean fittings shine like tarnished silver beside the two dead-black swords.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### I2-3 · 그림자 투척 단검
모르카스의 그믐 · 아이템 · 레벨 2 · 일반 · 틀 `hand` D C `violetshade` · 프롬프트 n2 → `tools/art/inbox/I2-3.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. One gloved hand, cropped at the wrist, hangs in the centre of the frame with its fingers just opened over the edge of a rooftop. A hand's breadth below the fingertips flies the dagger it has let go: slim and matte black, a leaf-shaped blade with a ring pommel and a grip wound in dark cord, small enough to hide in a sleeve, its point already aimed at the lamplit alley far below. At the wrist, where the frame cuts it, the leather sleeve-sheath it came from is still unbuckled, its strap flying loose. Purple-black night above the roofs; a luminous violet edge runs along the blade and the glove's knuckles.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IA1-1 · 피의 서약 부적
모르카스의 그믐 · 아이템 · 레벨 2 · 일반 · 틀 `hung` N T `bloodink` · 프롬프트 n2 → `tools/art/inbox/IA1-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A paper charm hangs by a red thread from a nail in a window beam, in the upper part of the frame, turning slowly. It is one long strip of coarse hand-made paper folded over on itself five times and bound with a knot, the size of a thumb, its corners worn soft and one edge stained dark. Lit from behind, the folded layers show what was brushed inside: red strokes lying one over another in a single tangled knot of lines. On the sill below sit a tiny brush and a thimble cup with a red rim. A candle behind the charm shines through the paper, turning the tangled strokes deep crimson against a black room and one violet pane of night.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IA1-2 · 흑요 단검
모르카스의 그믐 · 아이템 · 레벨 2 · 일반 · 틀 `used` N R `bloodink` · 프롬프트 n2 → `tools/art/inbox/IA1-2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A dagger knapped from black volcanic glass stands where it was driven, deep in a thick oak door-post at the right of the frame. Its blade is glossy and rippled with scalloped flake scars, the edge thin enough to let light through, the bone handle bound in dark cord worn pale by a thumb. From the slit it has made, the wood weeps a steady thin line of dark red sap that runs down the post to a small pool on the threshold. Higher up the same post, three older cuts still hold wet red seams. Night doorway, black wood and black glass; a low red gleam lies on the running sap and a violet glint on the blade's edge.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-05 · 피의 저울
모르카스의 그믐 · 공용 마법 · 레벨 2 · 일반 · 틀 `impact` U R `bloodink` · 프롬프트 n2 → `tools/art/inbox/MA-05.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Close on a shallow pan of black bronze in the lower left foreground at the instant a third dark-red drop lands in it, throwing up a tiny crown of splash beside the two already there. Behind it, on the right, the opposite pan is flying upward, and the huge armoured brute who stood in it is flung up with it, boots leaving the bronze, his great axe spinning out of his hands toward the top of the frame. Blackness all around; the three drops glow deep crimson and redden the underside of the rising pan, which carries one violet glint.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-09 · 지옥불
모르카스의 그믐 · 공격 마법 · 레벨 2 · 일반 · 틀 `object` U L `violetshade` · 프롬프트 n2 → `tools/art/inbox/MA-09.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A thick steel breastplate stands propped on a stone hearth at the left of the frame and burns like a log. Violet-black flames feed on the metal itself: the plate has split along a grain like firewood, and its thick edges crumble into glowing iron coals that drop and pile beneath it. Laid across it, a heavy helm and a pair of greaves are catching in turn, thickest parts first. Beside the hearth a thin leather jerkin hangs on a peg, cool and untouched. The violet fire is the only light, luminous at its core, throwing purple shadows up the chimney stones.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-A1-C1 · 어린 흡혈귀
모르카스의 그믐 · 유닛 · 레벨 2 · 일반 · 틀 `under` F C `bloodink` · 프롬프트 n2 → `tools/art/inbox/PN-A1-C1.jpg`

```
Landscape 5:4 painting. Up from the bottom of a crystal goblet, through a last finger of dark red wine: the round rim of the glass frames the face of a slight young vampire as he tips it to drink. Two small new fangs show, his red eyes are wide and uneasy, and a high black collar a size too large stands around his thin neck. The hand on the stem is wrapped in a fresh linen bandage tied with ribbon, and an older bandage shows at his wrist. A red wax seal on a cord hangs from his cuff and taps the glass. Candlelight behind his head shines down through the wine, staining everything deep crimson, with a violet shadow in the hollow of the collar.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA1-01 · 심연의 부름
모르카스의 그믐 · 공용 마법 · 레벨 2 · 일반 · 틀 `object` U R `bonepale` · 프롬프트 n2 → `tools/art/inbox/SA1-01.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A heap of cold grey ash and cinders in a burning-pit, and at the right of the frame a scorched iron helmet is rising out of it, ash pouring from its crown and cheek-plates as its wearer stands up. One ash-caked gauntlet has broken the surface beside it, fingers spread on the cinders. On the rim of the pit two dark red drops have fallen on the ash and glow like coals, and from each a thin violet thread runs down into the heap and comes up again inside the helmet's eye-slit. Colourless overcast on grey ash; the two drops are small red coals and the helmet's eye-slit holds a single violet glow.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA1-04 · 거울 환영
모르카스의 그믐 · 공용 마법 · 레벨 2 · 일반 · 틀 `reflect` F C `candle` · 프롬프트 n2 → `tools/art/inbox/SA1-04.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A tall standing mirror in a black frame fills the centre of the picture, and in the lower right foreground the armoured back and helmet of a broad-shouldered champion face it, sword raised. In the glass his reflection has the same build, the same stance, the same notched sword, and wears only a plain linen shirt, bare-headed, bare-armed. The reflection is leaving the mirror: one bare foot is already planted on the real floorboards on this side, and the glass bulges round its knee like the skin of water. Two candles in sconces on the mirror frame light the glass amber; the figure stepping through is edged in violet where it breaks the surface.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA1-06 · 피의 제물
모르카스의 그믐 · 공격 마법 · 레벨 2 · 일반 · 틀 `ring` N C `bloodink` · 프롬프트 n2 → `tools/art/inbox/SA1-06.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from above: seven small bronze cups stand in a ring on black stone, each holding a little dark red, and in the centre of the ring a sword stands upright with its point in the rock. From every cup a fine red thread runs inward along the ground like the spoke of a wheel and climbs the blade, filling its fuller. The sword's reach has grown with them: from the place where its point meets the stone, a thin red line shoots outward across the floor, past the ring and off the edge of the frame. Darkness all round; the cups and threads glow deep crimson, and the long red line has a violet core.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-15 · 피를 마시는 칼
모르카스의 그믐 · 유닛 · 레벨 3 · 일반 · 틀 `ground` F B `frostindigo` · 프롬프트 n2 → `tools/art/inbox/A1-15.jpg`

```
Landscape 5:4 painting. Camera on frosted flagstones, looking along the ground: a black sword stands upright by itself in the lower middle of the frame, point resting on the stone, its edge turned toward us and a closed eye carved on the guard. A thin red smoke rises from the blade. Around it lie three pairs of empty gauntlets of different make and age, each pair closer to the blade than the last, and a fourth pair, new and polished, has just been dropped at the edge of the frame. Cold blue-violet night air and hoarfrost; a tarnished-silver gleam runs down the blade's edge.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-17 · 모르카스의 밴시
모르카스의 그믐 · 유닛 · 레벨 3 · 일반 · 틀 `over` B L `frostindigo` · 프롬프트 n2 → `tools/art/inbox/A1-17.jpg`

```
Landscape 5:4 painting. Close behind her and looking past her shoulder: a floating woman-spirit with long white hair and a tattered translucent gown hovers at the left of the frame, facing away from us toward a heavy house door at the right. Her head is thrown back, and the iron knocker, the lantern beside it and the frost on the step all tremble in rings spreading from her unseen mouth. Under the door a line of warm light shows two pairs of feet standing very still inside. Blue-violet frost-light outside, her hair and gown glowing like tarnished silver; the only warmth is the thin strip under the door.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-18 · 그림자 송곳니
모르카스의 그믐 · 유닛 · 레벨 3 · 일반 · 틀 `reflect` L R `bonepale` · 프롬프트 n2 → `tools/art/inbox/A1-18.jpg`

```
Landscape 5:4 painting. A shadow-play screen of stretched pale cloth fills the frame, lit from behind, with paper-puppet silhouettes of tiny armoured heroes on sticks ranged along its lower edge. Looming over them from the right, thrown on the same cloth by something alive, is a far larger shadow: a wolf-like head with too many fangs, facing left, smoke fraying from its outline, its jaws already closed over the first puppet. Two violet points burn through the cloth where its eyes are. The lamp behind the screen bleaches the cloth bone-white; every shape on it is flat black.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IA1-3 · 저주 인형
모르카스의 그믐 · 아이템 · 레벨 3 · 일반 · 틀 `through` N L `candle` · 프롬프트 n2 → `tools/art/inbox/IA1-3.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Through a keyhole, its black outline framing the view: a bare table in a locked room, and at the left of the opening a hand-long straw poppet lies pinned to a board. It is bound with twine at neck and waist, and a lock of copper hair is knotted round its middle. Three long pins stand in its chest and a fourth lies ready beside a pincushion. The candle on the table burns with its flame blown flat sideways, as if by a shout from the poppet's stitched mouth, and the wine in a cup shivers in rings. The single candle makes one amber island on the table inside the keyhole; all around the opening is violet-black.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IA1-4 · 심연의 가면
모르카스의 그믐 · 아이템 · 레벨 3 · 일반 · 틀 `stand` F C `bonepale` · 프롬프트 n2 → `tools/art/inbox/IA1-4.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A mask rests on a turned wooden wig stand, facing us in the centre of the frame, with an empty hood draped behind it where a head would be. It is a smooth oval of bone-white lacquer, blank as an egg, with shallow hollows in place of eyes and mouth. Across its left half a face has been started in thin dark-red brushstrokes: one eyebrow, one eye, half of a mouth, the lines still wet and one of them running. The right half stays bare. A fine brush lies across a small dish at the foot of the stand. Flat ash-pale light drains stand, hood and lacquer to bone and grey; a faint violet glow sits deep in the blank eye hollow.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NA1-1 · 그림자 강탈
모르카스의 그믐 · 공용 마법 · 레벨 3 · 일반 · 틀 `path` L X `frostindigo` · 프롬프트 n2 → `tools/art/inbox/NA1-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Side view across frozen ground split by a chalk line. On the right an iron-bound strongbox stands beside a planted banner pole, and its shadow has been pulled out long and tight like a black rope, right across the line to the far left of the frame, where its end is wound three times round an iron stake. The box is following its shadow: it has slid a full length leftward, ploughing two furrows through the frost. Along the stretched shadow's edges small black flakes are already peeling off and drifting back to the right. A cold blue-white lantern low at the right edge throws the light; frost glitters like tarnished silver around the ink-black shadow.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-21 · 피의 라미아
모르카스의 그믐 · 유닛 · 레벨 4 · 일반 · 틀 `through` R L `bloodink` · 프롬프트 n2 → `tools/art/inbox/A1-21.jpg`

```
Landscape 5:4 painting. Glimpsed through the low gap beneath a stone altar slab: a pale woman's torso on thick dark-crimson snake coils lies curled in the hollow at the left, facing right, red slit eyes fixed on a row of tiny glass measures. Through a drain hole in the slab, single red drops fall into the last measure, and she slides one bead along a counting cord for each. The glass stands a finger short of its mark, and the tip of her tail is already sliding out toward a pair of kneeling knees at the right edge. A little candle-glow leaks down through the drain hole and catches the falling drops; her gold armlets and scales glint crimson in near-black shadow.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-23 · 계약 수확 사신
모르카스의 그믐 · 유닛 · 레벨 4 · 일반 · 틀 `back` B B `bloodink` · 프롬프트 n2 → `tools/art/inbox/A1-23.jpg`

```
Landscape 5:4 painting. Seen from behind, low in the frame: a tall hooded reaper in a tattered black robe wades away from us into a night field where rolled parchments grow upright on thin stalks like wheat, each tied with a red ribbon. A ledger swings at his hip. With bone hands he hooks the tip of his scythe round a single stalk and draws it toward him. Behind him runs the narrow swath he has already cut: bare stubble, and above each stump one small looping flourish of red ink left hanging in the air like a curl of smoke. Moonless black sky; the hanging red flourishes give a faint crimson glow along the mown strip, and a thread of violet edges the scythe blade.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-24 · 달 없는 늑대인간
모르카스의 그믐 · 유닛 · 레벨 4 · 일반 · 틀 `high` L T `eclipse` · 프롬프트 n2 → `tools/art/inbox/A1-24.jpg`

```
Landscape 5:4 painting. From high above, looking straight down into a round stone well in a bare courtyard: its still black water lies in the middle of the frame like a dark moon inside a pale rim. On the upper edge of the well a hulking black-furred werewolf crouches, turned to the left, one clawed hand braced on the stones, the torn sleeves of a shirt still hanging from its huge shoulders. Its wolf head bends over the water, where the reflected sky is crowded with stars around one round patch of pure black. Starlight only, under a moonless sky: a thin cold rim on the well's edge, on wet fur and claws; the rest is black and violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-42 · 흑요 갑주 해골
모르카스의 그믐 · 유닛 · 레벨 4 · 일반 · 틀 `front` F X `frostindigo` · 프롬프트 n2 → `tools/art/inbox/A1-42.jpg`

```
Landscape 5:4 painting. Dead-on and symmetrical: a suit of heavy black obsidian plate stands in a narrow canyon gateway and fills it from wall to wall, a tall slab of black stone planted before it as a shield. Rain is falling hard. It runs in at the armour's open collar and pours straight out again at the elbows, the hips and the knees in thin steady streams. Through a chipped gap in the breastplate show a few bleached ribs and the dark hollow behind them, and in the visor slit two violet lights look straight at us. Cold blue-violet night rain; the wet stone plates shine like tarnished silver and the two eye-lights glow steadily behind the falling water.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-25 · 장막의 삼두견
모르카스의 그믐 · 유닛 · 레벨 5 · 일반 · 틀 `tilt` R C `violetshade` · 프롬프트 n2 → `tools/art/inbox/A1-25.jpg`

```
Landscape 5:4 painting. Tilted frame, caught as it surges to its feet: a broad black hound the size of an ox, three heads on three spiked iron collars, fills the centre and faces right toward a hanging wall of darkness from which a small cloaked traveller has just stepped. Each head asks its own question: the lowest pushes its muzzle against his empty scabbard, the middle one snuffs at his open, bare hands, and the highest strains toward his hood, nostrils wide. Broken chains swing from the collars and violet embers drip from three sets of jaws. Purple-black gloom; six burning violet eyes and the dripping embers are the light, edging muzzles, collar spikes and the traveller's cloak.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-28 · 찢기지 않는 계약서
모르카스의 그믐 · 유닛 · 레벨 5 · 일반 · 틀 `ground` F C `frostindigo` · 프롬프트 n2 → `tools/art/inbox/A1-28.jpg`

```
Landscape 5:4 painting. Camera on the cold flagstones of an archive aisle between towering shelves. In the centre a parchment scroll as tall as a doorway stands on its own lower coil and sways toward us like a hooded snake, its curled edges hooked like claws, three red wax seals staring from its face like eyes. Its loose end has unrolled along the floor to our feet like a tongue. On it kneels a small clerk, his shears dropped beside him, a ribbon knotted round his wrist, his quill touching a single glowing red line. Blue-violet archive dusk with frost on the stones; the one red line glows and the seals gleam like tarnished coins.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### RA1-1 · 최후의 계약
모르카스의 그믐 · 공용 마법 · 레벨 5 · 일반 · 틀 `after` N X `bonepale` · 프롬프트 n2 → `tools/art/inbox/RA1-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A dark plain covered from edge to edge with thousands of small candles, bone-white ones across the left half and black ones across the right, every one of them just snuffed in the same instant. From each wick a thread of smoke climbs perfectly straight, and all the threads stop at exactly the same height, so that their tops rule one level line across the whole frame. In the foreground, on a flat stone, lies a single disc of sealing wax, still soft, pressed with a closed eye, two ribbons of equal length laid out to left and right. Windless ash-grey twilight; the smoke threads are pale against a colourless sky and the soft seal holds one last violet glow.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-29 · 심연의 어둑시니
모르카스의 그믐 · 유닛 · 레벨 6 · 일반 · 틀 `eye` B L `candle` · 프롬프트 n2 → `tools/art/inbox/A1-29.jpg`

```
Landscape 5:4 painting. At eye level on a street cut into the canyon wall: a towering shape of gathered darkness in a long ash-grey mantle strides away from us down the left side of the frame, its shoulders higher than the iron lamp posts, its head lost in the dark above them. The three lamps nearest us are dark, each trailing a thread of smoke, and the one beside its shoulder is shrinking to a red wick as it passes. Far ahead the lamps still burn in a warm row, and small townsfolk hurry indoors and pull their shutters closed. Amber lamp pools ahead of it and black street behind; a faint violet glow leaks from the hem of its mantle.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-30 · 모르카스의 칼
모르카스의 그믐 · 유닛 · 레벨 6 · 일반 · 틀 `profile` L L `frostindigo` · 프롬프트 n2 → `tools/art/inbox/A1-30.jpg`

```
Landscape 5:4 painting. Strict side view, flat as a frieze, along a frozen avenue: a black greatsword as long as a tall man glides leftward on its own at shoulder height, point first, at the left of the frame. A closed eye is carved on its guard, the cracked leather grip is worn into the shape of four fingers, and an empty sword-belt trails from the hilt, its buckle scoring the frost. Behind it, to the right, a bronze statue of a swordsman has been cut through at the waist, and its upper half is only now beginning to slide. Moonless blue-violet night; frost glitters like tarnished silver, and a thin red smoke along the blade's edge is the one warm colour.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-32 · 저주 군단의 리치
모르카스의 그믐 · 유닛 · 레벨 6 · 일반 · 틀 `close` F C `bonepale` · 프롬프트 n2 → `tools/art/inbox/A1-32.jpg`

```
Landscape 5:4 painting. Tight on the head and shoulders, face-on in the centre: a yellowed skull under a dented iron crown, violet flames standing in both eye sockets, the frayed collar of a rotted robe around bare neck bones. Tied to one collarbone by a faded ribbon hang a blank brass archive tag and a blob of dark sealing wax, like the claim ticket for something left in safekeeping. One finger-bone is raised beside the jaw, pointing forward. Behind him, soft and grey, an endless column of the dead marches past in step, rank after rank into the mist. Flat ash-grey overcast drains bone, robe and marchers to one pale tone; the two violet eye-flames are the single colour.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-43 · 감긴 눈의 저울
모르카스의 그믐 · 유닛 · 레벨 6 · 일반 · 틀 `low` N C `violetshade` · 프롬프트 n2 → `tools/art/inbox/A1-43.jpg`

```
Landscape 5:4 painting. From its foot, looking up: a balance of tarnished black bronze rises like a gate tower, its pillar climbing the centre of the frame to a great beam carved with one closed eye. The pan on the right hangs low over us, stacked as neatly as a merchant's weights with the blows it has taken: rows of arrowheads, snapped sword tips, a mace head. The pan on the left brims with dense shadow that spills over its rim like smoke. A spent arrow still quivers in the pillar, and at the plinth a small axeman, knee-high to it, backs away. Purple-black gloom under a moonless sky; luminous violet edges the beam, the chains and the lid of the carved eye.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-A1-C3 · 계약에 묶인 시체 거인
모르카스의 그믐 · 유닛 · 레벨 6 · 일반 · 틀 `back` B C `bonepale` · 프롬프트 n2 → `tools/art/inbox/PN-A1-C3.jpg`

```
Landscape 5:4 painting. From behind it: the broad stitched back of a giant as tall as a town gate fills the centre, grey flesh pieced in mismatched panels and held with iron staples, one shoulder higher than the other. Stapled between the shoulder blades hangs a long sheet of parchment covered in rows of tally strokes, a wax seal at its foot. Chains bolted to the staples run to both wrists and have snapped taut, stopping its raised fist an arm's length short of the gate. On a ladder against its hip a tiny clerk adds one more stroke with a brush. Flat bone-white daylight under ash-coloured cloud; the seal's rim gives one small violet gleam on the grey back.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A1-34 · 대가의 집행자
모르카스의 그믐 · 유닛 · 레벨 7 · 일반 · 틀 `far` R L `eclipse` · 프롬프트 n2 → `tools/art/inbox/A1-34.jpg`

```
Landscape 5:4 painting. Far off across the rooftops of a sleeping canyon town: at the left a robed figure three houses tall stands in the street, its head a smooth blank oval, heavy chains wound across its chest and a spiked iron weight hanging from one fist. With its other hand it has lifted the whole tiled roof off a narrow house, as one lifts the lid of a pot, and it bends to the right to look inside. In the opened attic a tiny man crouches under a table beside one lit candle. Along the street every shutter is closed tight. A thin cold band of light along the canyon rim behind outlines the oval head, the lifted roof and the chimneys; the town is silhouette in violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-03 · 새벽 종다리 떼
솔란테의 새벽 · 유닛 · 레벨 1 · 일반 · 틀 `silhouette` R R `firstlight` · 프롬프트 n2 → `tools/art/inbox/A2-03.jpg`

```
Landscape 5:4 painting. Backlit against the first thin band of dawn, a row of small larks perches along the teeth of a battlement — black shapes with beaks wide open in song, all facing right toward the coming sun. One bird in the right of the frame still sleeps, head tucked under its wing, and in the sky exactly behind it a notch of night lingers, darker than the rest. Pale gold light rises from below the wall line; everything in front of it is clean black silhouette under a blue-grey sky.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-04 · 솜털 새끼 비둘기
솔란테의 새벽 · 유닛 · 레벨 1 · 일반 · 틀 `eye` L C `rosedawn` · 프롬프트 n2 → `tools/art/inbox/A2-04.jpg`

```
Landscape 5:4 painting. At eye level on a garden stair, a white dove fledgling has tripped on the worn top step and hangs in mid-tumble, stubby wings flung forward to the left, pink feet in the air — only three or four true feathers showing among the down on each wing. Under the chick a soft pane of warm light has slid out across the stones like a cushion and holds it a hand's breadth above the steps. Low pink-gold morning light slants across the garden from the left, with lilac shadow under the stair and the hedges.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-05 · 문장 독수리
솔란테의 새벽 · 유닛 · 레벨 1 · 일반 · 틀 `back` B R `rosedawn` · 프롬프트 n2 → `tools/art/inbox/A2-05.jpg`

```
Landscape 5:4 painting. From just behind a white eagle perched on an upturned helmet in the right foreground: its gold-edged wings are half open in a stiff, symmetrical crest pose, and it looks away from us at a great white banner hanging in the hall beyond. There, among the embroidered sun-rays, an eagle-shaped patch of bare unfaded linen and loose gold threads shows exactly where it used to be. Rose-gold dawn comes through the cloth from behind, so the empty patch glows brighter than the stitched parts around it.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-06 · 떠도는 후광
솔란테의 새벽 · 유닛 · 레벨 1 · 일반 · 틀 `ground` L C `firstlight` · 프롬프트 n2 → `tools/art/inbox/A2-06.jpg`

```
Landscape 5:4 painting. Camera down in wet roadside grass, looking up a pilgrim road lined with knee-high stone saints in little niches. Over the nearest saint's bald stone head hovers a plain ring of golden light, far too wide for it and tilted like an oversized hat, already sliding off to the left toward the next statue in the row. Faint sparks trail from it and bead on the grass blades in the foreground. Blue-grey hour before sunrise; the ring is the warmest thing in sight and gilds the stone head beneath it.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-02 · 솔란테의 가호
솔란테의 새벽 · 방어 마법 · 레벨 1 · 일반 · 틀 `object` L R `rosedawn` · 프롬프트 n2 → `tools/art/inbox/MA-02.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A steel breastplate, a pair of pauldrons and a helmet lie where they were dropped in trampled grass at the right of the frame, straps still swinging. From them a line of bare footprints leads away to the left toward a distant battle line — and each footprint is brimming with soft light, like a cup filled to the lip. A single feather of the same light is settling into the empty breastplate. Low pink-gold dawn from the left, the direction the footprints lead, leaves the abandoned steel in lilac shadow.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-08 · 맹세의 고정
솔란테의 새벽 · 방어 마법 · 레벨 1 · 일반 · 틀 `symbol` N L `stainedglass` · 프롬프트 n2 → `tools/art/inbox/MA-08.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. On a deep stone windowsill, set to the left of the frame, two empty steel gauntlets lie clasped as if shaking hands, lashed together with white cord. The knot at the centre has hardened into a lump of bright iron, still glowing at its core. Thick black drops are falling onto it from above; each one beads up like rain on wax and rolls away, leaving the cord and the steel clean. The coloured window above puts patches of red and blue on the sill; the hardened knot glows pale gold of its own.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA2-01 · 돌격 나팔
솔란테의 새벽 · 공격 마법 · 레벨 1 · 일반 · 틀 `origin` B B `whitegold` · 프롬프트 n2 → `tools/art/inbox/SA2-01.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Looking down the length of a long brass trumpet from just behind its mouthpiece, high on a watchtower: the dented tube runs away from us along the bottom of the frame to its flared bell, and from the bell the note is leaving as widening rings of bright, trembling air. The rings roll out over the field below, and where the first one passes, two small plumes of dust have already broken forward from the front of a waiting line. Early sun from behind the viewer gilds the brass and throws the tower's long cool shadow out across the field below.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA2-02 · 인내의 기도
솔란테의 새벽 · 공용 마법 · 레벨 1 · 일반 · 틀 `after` N L `vigil` · 프롬프트 n2 → `tools/art/inbox/SA2-02.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A plain round shield leans alone against a camp stool beside a dead campfire, at the left of the frame, in the darkest hour of night. Its pale face is hacked by dozens of sword cuts and dents, and every cut is filled with a thin seam of soft gold light, like cracks mended with gold; the oldest, deepest cuts glow brightest. A fresh notch near the rim is only just beginning to kindle. Far off, the sky is black except for the faintest grey line at the horizon. The seams of light in the shield are the only glow, pale gold on the trampled ground around it; the horizon line is still cold grey.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA2-04 · 정의의 일격
솔란테의 새벽 · 공격 마법 · 레벨 1 · 일반 · 틀 `path` R X `glare` · 프롬프트 n2 → `tools/art/inbox/SA2-04.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A longsword has just finished a downward cut, its point resting in the split crown of a black iron helm at the lower right. The stroke still hangs in the air as a bright crescent sweeping down from the upper left. From the cleft in the helm the same light is already running back the other way — up the flat of the blade, round the crossguard, and on in a widening spiral that closes like a sleeve over the gauntlet at the top left corner. The crescent and the returning spiral are the light, white-gold and hard; helm, steel and ground are dark shapes against them.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-07 · 맹세의 발키리
솔란테의 새벽 · 유닛 · 레벨 2 · 일반 · 틀 `profile` L R `whitegold` · 프롬프트 n2 → `tools/art/inbox/A2-07.jpg`

```
Landscape 5:4 painting. Strict side view, flat as a carved frieze, along the rail of a narrow stone bridge: at the right a winged shieldmaiden in gold scale armour drops out of the sky feet-first, great white wings swept straight up, her round wood-and-gold shield thrust out to the left. It meets a falling axe-blade that enters from the left edge, a hand's width above a young spearman who has slipped to one knee beneath it. Her spear is still held upright, unused. High clear morning sun from behind the viewer, flat and bright on white stone and feathers, with thin blue shadows.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-09 · 새벽 수탉 수호병
솔란테의 새벽 · 유닛 · 레벨 2 · 일반 · 틀 `over` F C `glare` · 프롬프트 n2 → `tools/art/inbox/A2-09.jpg`

```
Landscape 5:4 painting. Over the dark, spiked shoulder of an advancing attacker in the near foreground: a line of the citadel's spearmen stands in blinding morning light. Dead centre in the front rank is the plainest of them — a young white rooster guard with a small red comb, an undecorated helmet a little too big for him and a spear with a mended shaft held under one wing — feet planted, looking straight at us. Behind him rise the taller plumes and gilded crests of every higher rank. The sun stands directly behind the line, burning its edges white and turning the attacker's shoulder into a black shape.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-11 · 어린 유니콘
솔란테의 새벽 · 유닛 · 레벨 2 · 일반 · 틀 `tilt` F C `vigil` · 프롬프트 n2 → `tools/art/inbox/A2-11.jpg`

```
Landscape 5:4 painting. A tilted frame catches a gangly white foal mid-skid in the straw of a night stable, legs splayed, gold mane flying, head swung toward us. The horn on its brow is a pearly stub as long as a finger, yet straight ahead of it the darkness is cut away in a clean wedge: every straw, bucket and cobweb inside that wedge stands clear, while the stalls on either side stay black. One hanging stable lantern glows small and amber behind the foal; the wedge of clear air in front of the horn is cool and shadowless.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IA2-1 · 압수한 흑요검
솔란테의 새벽 · 아이템 · 레벨 2 · 일반 · 틀 `stand` L L `firstlight` · 프롬프트 n2 → `tools/art/inbox/IA2-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A dagger of black volcanic glass, its edge chipped like flint and its hilt wrapped in dark hide, lies in a cradle of white marble at the left of a bare sacristy shelf, point toward the left. It is tied down like a prisoner: three white linen tapes cross the blade, each pressed to the marble with a round seal of pale wax. Where the black glass touches the stone, a faint grey stain has begun to spread into the white. Cool grey-blue light before sunrise from a narrow window, a low stripe of pale gold just touching the wax seals.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IA2-2 · 은빛 방패
솔란테의 새벽 · 아이템 · 레벨 2 · 일반 · 틀 `hung` N R `whitegold` · 프롬프트 n2 → `tools/art/inbox/IA2-2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A small round shield of polished silver hangs from a wall peg by its strap at the right of a whitewashed guardroom, its face plain and slightly domed, the rim rubbed thin by years of polishing. A single sunbeam from a high window strikes it and is thrown back across the room as a bright trembling disc of light, which has landed on a row of dull helmets on the far shelf and set one of them blazing. One hard beam of morning sun from the upper left; the rest of the room is soft ivory with cool blue shadow.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-10 · 순교의 서약
솔란테의 새벽 · 방어 마법 · 레벨 2 · 일반 · 틀 `path` N X `vigil` · 프롬프트 n2 → `tools/art/inbox/MA-10.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Three tall candles stand in a row on a chapel rail, seen side-on in the dark. The middle one has just been struck through: its upper half is toppling, wick trailing smoke. Its flame has split in two and is leaping away in twin bright arcs, left and right, across the gaps to its neighbours — whose own flames are swelling as it lands, each widening into a flat, shield-shaped sheet of light. Night in a side chapel; the three flames and the two travelling arcs are the only light, haloed pale gold in the dark.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-A2-C1 · 새벽성 작은 성상
솔란테의 새벽 · 유닛 · 레벨 2 · 일반 · 틀 `macro` N C `vigil` · 프롬프트 n2 → `tools/art/inbox/PN-A2-C1.jpg`

```
Landscape 5:4 painting. Inside a street-side wall niche, very close: the two small marble hands of a knee-high saint figure pressed together in prayer, veined white stone flecked with worn gold leaf. Looped over the stone wrists hangs a real, weather-cracked leather sword-belt with an empty scabbard, long since stiff. A tiny clay votive lamp burns on the niche floor by the figure's toes, and someone has tucked a fresh sprig of white flowers between the stone fingers. The little lamp lights the hands from below in warm gold; the street beyond the niche is night.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-A2-2 · 질서의 빛
솔란테의 새벽 · 공용 마법 · 레벨 2 · 일반 · 틀 `top` N X `firstlight` · 프롬프트 n2 → `tools/art/inbox/PS-A2-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Straight down onto bare ground where a rank of mismatched weapons lies side by side, hilts aligned along the bottom: a huge cleaver, a pike, a hooked axe, a broadsword and, at one end, a small dagger. A ruler-straight bar of pale-gold light lies across them all at the height of the dagger's point. Below the bar every blade is solid steel; above it the longer blades have gone pale and glassy, mere outlines of themselves, already fading. Even blue-grey light on the ground; the bar is the one pale-gold line in the picture and casts thin shadows from the hilts.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### S2-1 · 빛의 성표
솔란테의 새벽 · 아이템 · 레벨 2 · 일반 · 틀 `motion` R R `whitegold` · 프롬프트 n2 → `tools/art/inbox/S2-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A small pendant — a thin disc of pale gold stamped with a rising sun, on a knotted linen cord — is caught in mid-air as it swings out to the right, the cord running off the top of the frame. At that instant the point of a thrusting sword has met it: the steel tip is flattening against the little disc like soft wax, a bright ring of sparks spreading from the touch, while the disc shows only one shallow new dent among several old ones. Bright open daylight from the left; the pendant's face flares pale gold and the blunted steel carries a cool blue sheen.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA2-07 · 심판의 저울
솔란테의 새벽 · 공용 마법 · 레벨 2 · 일반 · 틀 `symbol` N C `stainedglass` · 프롬프트 n2 → `tools/art/inbox/SA2-07.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A tall balance of pale gold stands on a stone table in a dim hall. In its left pan lie three identical black axes heaped together, with plumed officers' helmets stacked beside them; in its right pan, a single white feather. The beam has tipped the wrong way: the heaped iron rides high, weightless, the axes beginning to drift up off the pan like smoke, while the feather's pan has sunk to the table and pressed a dent into the stone. One tall coloured window throws red and blue patches across the table; a pale-gold beam falls exactly on the feather.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-15 · 솔란테의 맹세자
솔란테의 새벽 · 유닛 · 레벨 3 · 일반 · 틀 `reflect` F C `rosedawn` · 프롬프트 n2 → `tools/art/inbox/A2-15.jpg`

```
Landscape 5:4 painting. A still puddle on a rain-washed terrace fills most of the frame, and in it, upside down, stands the reflection of a robed figure of white marble flecked with gold leaf, both stone hands on the pommel of a plain sword set point-down, chin level, perfectly upright. Only its bare marble feet and the sword's tip enter the top edge of the picture. In the reflection a thin sword-shaped ray of light hangs point-down exactly over its head. Pink-gold dawn clouds fill the water around the reflected figure; the wet stone at the frame's edges is dull lilac.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-16 · 새벽 순찰 사자
솔란테의 새벽 · 유닛 · 레벨 3 · 일반 · 틀 `back` R R `firstlight` · 프롬프트 n2 → `tools/art/inbox/A2-16.jpg`

```
Landscape 5:4 painting. From behind a great golden lion as it pads away up a ridge of plateau grass toward the upper right, tail low, mane spread like a fan of rays. Everything ahead of it is the blackest hour of night. Behind it, running from the bottom-left corner of the frame up to its hind paws, the strip of grass it has already walked glows soft gold, as if morning had arrived there first. The sun is still below the horizon; only the glowing track and the lion's mane light the scene, under a blue-black sky with one pale line at its edge.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-17 · 진실을 묻는 스핑크스
솔란테의 새벽 · 유닛 · 레벨 3 · 일반 · 틀 `high` L C `whitegold` · 프롬프트 n2 → `tools/art/inbox/A2-17.jpg`

```
Landscape 5:4 painting. Looking down from the top of a gatehouse: a lion-bodied sphinx lies across the threshold of a closed white gate, folded white wings along her flanks, sun-disk crown seen from above, her calm face turned left toward one small traveller who stands before her twisting his hat in his hands. Off to the side of the road a handful of earlier arrivals sit on their bundles around a cold cooking pot, still waiting. Clear mid-morning sun from the right throws the gate tower's cool blue shadow across half the road and leaves the sphinx in full light.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### I3-2 · 엘라드 탑 방패
솔란테의 새벽 · 아이템 · 레벨 3 · 일반 · 틀 `pair` N L `whitegold` · 프롬프트 n2 → `tools/art/inbox/I3-2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A tall rectangular tower shield of pale steel, as high as a man's chest, stands upright on its own at the left of a white gate threshold, grounded on its bottom spike, its gilded rim nicked along the top edge. Directly behind it the threshold stone is worn into two shallow, foot-shaped hollows, polished smooth by generations standing in exactly that place. Leaf litter has blown into every corner of the gateway except those two hollows. Morning sun slants through the gate arch from the right, bright on the shield face, with a cool blue shadow stretching behind it over the hollows.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IA2-5 · 솔란테의 성검
솔란테의 새벽 · 아이템 · 레벨 3 · 일반 · 틀 `reflect` N L `stainedglass` · 프롬프트 n2 → `tools/art/inbox/IA2-5.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A plain, perfectly kept longsword lies on a folded white cloth on a stone bench in a shadowed hall, at the left of the frame, its crossguard straight and its grip bound in white leather worn grey. Patches of red, blue and green from high windows lie on the flagstones all around. The mirror-bright flat of the blade shows something else: a clear pale-gold sunrise over a far, flat horizon, small and sharp, as if the steel still looked at one particular morning. Deep cool shade with jewel-coloured window patches on the floor; the sunrise held in the blade is the brightest, purest light.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-14 · 새벽의 해방
솔란테의 새벽 · 공용 마법 · 레벨 3 · 일반 · 틀 `inside` L R `glare` · 프롬프트 n2 → `tools/art/inbox/MA-14.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From inside a flood of dawn as it bursts through a long tear in the night sky: streaks of white-gold light race past the camera toward the left, where the land is still dark. There a line of raised weapons stands black against the glare, and the light is reaching them tallest first: the highest-held sword is already a bar of blinding white, the next half-lit, the lowest still dark. Behind the blades, the leftover light is settling softly over the ground like warm mist. All light comes from behind and around the viewer on the right, overexposed white-gold, cutting hard black shapes out of everything in front of it.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NA2-1 · 구원의 빛
솔란테의 새벽 · 공용 마법 · 레벨 3 · 일반 · 틀 `far` D L `rosedawn` · 프롬프트 n2 → `tools/art/inbox/NA2-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Far off across a grey field at dawn, a dark battle line stands along a low rise — spears, horned helms and ragged standards, all in silhouette. One soft shaft of light comes down through the clouds onto a single place left of centre in that line, and the figure standing there has turned small, white and still: a knee-high marble saint with folded hands, bright as a chess piece among black ones. Its neighbours lean away from it; an axe lies dropped in the grass at its foot. A break in pink-gold dawn cloud lets one beam through; the rest of the field lies in lilac-grey shade.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NA2-2 · 빛의 날개
솔란테의 새벽 · 공용 마법 · 레벨 3 · 일반 · 틀 `macro` L C `whitegold` · 프롬프트 n2 → `tools/art/inbox/NA2-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The instant of contact, in extreme close-up: the tip of a steel sword, thrusting in from the right, presses into a single feather made of light — and stops. The feather bows under the point like a drawn bow, its fine barbs flaring brighter where the steel touches, a few motes shaken loose. Behind it, soft and out of focus, overlapping rows of the same glowing feathers curve away like the inside of an enormous folded wing. The feathers give their own soft pale-gold light; a cool blue reflection runs along the steel.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-20 · 알바트로스 날개기사
솔란테의 새벽 · 유닛 · 레벨 4 · 일반 · 틀 `high` L R `firstlight` · 프롬프트 n2 → `tools/art/inbox/A2-20.jpg`

```
Landscape 5:4 painting. Seen from high on the keep above: a great white albatross in a knight's breastplate stands at the right of a wide stair landing with both wings spread to their full span and curved forward like a roof. From this height the wings are two long white blades, black at the tips, and under their trailing feathers the helmets of a dozen smaller comrades are still ducking in, the last one running. A sword rides at its side, still deep in its scabbard, and its head is turned left, counting them. Grey-blue half-light before sunrise; a low gold band at the horizon catches only the upper edges of the feathers.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-21 · 맹세를 지키는 백조
솔란테의 새벽 · 유닛 · 레벨 4 · 일반 · 틀 `under` F T `rosedawn` · 프롬프트 n2 → `tools/art/inbox/A2-21.jpg`

```
Landscape 5:4 painting. From under the surface of a clear cloister pond, looking up: the broad white belly of a great swan floats overhead in the upper part of the frame, riding low in the water, black webbed feet paddling slowly. From beneath both folded wings hang dozens of knotted cords, each ending in a small gold ring or a wax-sealed token, trailing down into the water like roots. Its long neck curves down through the surface and one calm eye regards us. Pink-gold dawn sky shimmers through the rippled surface above the swan, and the hanging rings catch it as they turn in lilac water.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-22 · 새벽을 울리는 성종
솔란테의 새벽 · 유닛 · 레벨 4 · 일반 · 틀 `over` B L `firstlight` · 프롬프트 n2 → `tools/art/inbox/A2-22.jpg`

```
Landscape 5:4 painting. Over the bronze shoulder of a great bell hanging in an open belfry, close at the left of the frame: it has swung out toward the arch and hangs at the top of its stroke, light spilling from its mouth, rising-sun engravings running round its rim. Beyond the arch lie the sleeping citadel and dark country — and exactly in line with the bell's lip, the first sliver of sun has just come over the horizon, as if called. Cold blue-grey before dawn; the bell's own inner glow and the single sliver of sun are the two warm notes.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-24 · 빛을 되비추는 거울
솔란테의 새벽 · 유닛 · 레벨 4 · 일반 · 틀 `echo` L X `rosedawn` · 프롬프트 n2 → `tools/art/inbox/A2-24.jpg`

```
Landscape 5:4 painting. A tall oval mirror in a gilt frame stands upright on its own in a cloister walk at the right, its silvered face turned left. One thrown javelin is painted as five overlapping moments along a single line across the frame: three ghost-images flying in from the left edge, one with its tip just touching the glass, and one already speeding back out the way it came, point first. The glass itself holds only bright dawn sky, perfectly calm. Pink-gold dawn fills the mirror and spills from it across the paving; the arches behind are lilac shadow.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-A2-C2 · 엘라드의 오파님
솔란테의 새벽 · 유닛 · 레벨 4 · 일반 · 틀 `through` F L `firstlight` · 프롬프트 n2 → `tools/art/inbox/PN-A2-C2.jpg`

```
Landscape 5:4 painting. From outside and a little below the battlements, looking in through one narrow gap between two white merlons at the left of the frame: the gap is filled by two interlocking golden wheels turning slowly in white fire, their rims set with dozens of watchful eyes, every eye on this side looking out at us. The stone sill beneath them is worn into a smooth shallow bowl. Across the rest of the wall, ivy and old swallows' nests have grown undisturbed right up to that one gap. Blue-grey hour before dawn on the wall face; the wheels' white fire spills out through the gap as the only warm light.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-27 · 새벽 유니콘
솔란테의 새벽 · 유닛 · 레벨 5 · 일반 · 틀 `far` L R `rosedawn` · 프롬프트 n2 → `tools/art/inbox/A2-27.jpg`

```
Landscape 5:4 painting. Far across a wide plateau at sunrise, a white unicorn gallops along the crest of a long ridge from right to left, small against the sky. The rising sun sits exactly on its back like a rider, so that horse and sun seem to travel together. Ahead of it, down on the darker plain at the far left, one tiny horseman is fleeing, and the unicorn's horn burns as a single needle of light aimed at him. The sun is the only light, low and pink-gold behind the ridge; long lilac shadows run toward the viewer across the grass.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-28 · 광장의 성자상
솔란테의 새벽 · 유닛 · 레벨 5 · 일반 · 틀 `silhouette` R L `glare` · 프롬프트 n2 → `tools/art/inbox/A2-28.jpg`

```
Landscape 5:4 painting. Against a blazing morning sky, a larger-than-life stone saint strides to the right across an open plaza, left of centre, one heavy foot just lifted, robes carved in stiff folds, its blessing hand now closed into a fist. Along its shoulders and on its bald head sits a row of pigeons, riding calmly; one flaps to keep its balance. At the far left stands the empty plinth it stepped down from, with a few pigeons still waiting on it. The sun is directly behind the figure, so statue, birds and plinth are dark shapes rimmed in white-gold glare.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### RA2-1 · 심판의 날
솔란테의 새벽 · 공용 마법 · 레벨 5 · 일반 · 틀 `under` D C `glare` · 프롬프트 n2 → `tools/art/inbox/RA2-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Flat on the ground in the middle of a battle, looking at the sky: spear points, pike shafts and the tops of two different armies' standards lean in from every edge of the frame toward a sky that has become one sheet of white, brighter than noon. Every tip and banner, on both sides alike, is bleaching away from the top down. Directly overhead, one vast feathered wing crosses the glare as a dark shape, and the small patch of air beneath it keeps its ordinary colours. The whole sky is the light source, flat and blinding; only the underside of the wing and what lies beneath it hold shadow and colour.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-29 · 새벽성 발키리 대장
솔란테의 새벽 · 유닛 · 레벨 6 · 일반 · 틀 `macro` R T `whitegold` · 프롬프트 n2 → `tools/art/inbox/A2-29.jpg`

```
Landscape 5:4 painting. Extreme close-up of a weathered hand in a dented gold gauntlet, coming in from the top of the frame, cutting one more small half-sun notch into a block of white wall-stone with the butt-spike of a spear. The stone, and every stone around it to the edges of the picture, is already crowded with hundreds of the same little notches, the oldest worn almost smooth. A single white feather, greyed at the tip, has drifted into the corner. Raking early sun from the left makes every notch a small crisp shadow in the pale stone.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-30 · 새벽 삼족오
솔란테의 새벽 · 유닛 · 레벨 6 · 일반 · 틀 `profile` L C `vigil` · 프롬프트 n2 → `tools/art/inbox/A2-30.jpg`

```
Landscape 5:4 painting. Painted like a figure on a wall, in pure profile: a great three-legged crow of gold fire stands facing left in a snow-covered orchard, one burning wing folded across its breast, the other spread wide behind. Tucked against the folded wing, a small night sentry has fallen asleep on his feet, cheek resting in the flames, cloak and hair untouched; a sparrow roosts on one blazing feather above him, and the snow around the three clawed feet lies unmelted. Winter night; the wings are the only light, a steady gold glow that warms the sleeper's face and fades a few paces out across the snow.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-31 · 네 얼굴의 케루빔
솔란테의 새벽 · 유닛 · 레벨 6 · 일반 · 틀 `cut` R X `whitegold` · 프롬프트 n2 → `tools/art/inbox/A2-31.jpg`

```
Landscape 5:4 painting. A wall cut away like a doll's house shows the inside of a white guard tower: a square central chamber with a low passage running off to each side. In the chamber stands a bulky four-winged guardian in gold-bronze plumage whose head has four faces — a lion's in profile watching the left passage, an eagle's watching the right, a calm human face toward us. In the right-hand passage a small cloaked figure creeps away and glances back, straight into the eagle's bright eye. Daylight falls in through the cut wall, pale and even on ivory stone; the passages darken toward their far ends.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-A2-C3 · 황혼 장벽 페가수스
솔란테의 새벽 · 유닛 · 레벨 6 · 일반 · 틀 `close` L X `whitegold` · 프롬프트 n2 → `tools/art/inbox/PN-A2-C3.jpg`

```
Landscape 5:4 painting. Head and one outstretched wing of a white winged horse fill the frame, in flight and heading left into a hard wind: pale mane blown flat along its neck, ears back, nostrils wide, eye calm. The great wing spans the picture behind its head, flight feathers frayed and grey with dust at the tips, held rigidly open as grit rattles off them. Far below, along the bottom edge, a white wall runs like a chalk line between warm fields and flat grey emptiness. Thin high daylight from the right, behind the horse, rims mane and feather edges in pale gold; the air ahead of it is flat grey.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-33 · 대성당 색유리 수호자
솔란테의 새벽 · 유닛 · 레벨 7 · 일반 · 틀 `far` F C `vigil` · 프롬프트 n2 → `tools/art/inbox/A2-33.jpg`

```
Landscape 5:4 painting. From the far end of a night-dark cathedral, looking down its whole length: at the other end stands a figure as tall as the vault, built from thousands of coloured glass panes and dark lead lines — a winged guardian holding a wing-shaped shield, facing us. It glows from within with stored daylight, like a lantern the size of a tower. A long crack runs across its breast, yet every pane beside the crack is as bright as the rest. At its ankles, a few night watchmen with lanterns are the size of its smallest panes. The figure's own held daylight throws soft jewel colours on the nearest pillars; the watchmen's lanterns are tiny warm points in the dark below.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A2-34 · 엘라드의 샛별
솔란테의 새벽 · 유닛 · 레벨 7 · 일반 · 틀 `top` N C `rosedawn` · 프롬프트 n2 → `tools/art/inbox/A2-34.jpg`

```
Landscape 5:4 painting. Straight down from high above a walled courtyard at sunrise: a white-gold star with four long cross-shaped rays hangs over it, its rays reaching from wall to wall, a small luminous figure at its heart. Outside a wide circle beneath it, everything throws a long lilac dawn shadow — trees, a handcart, the well, three early risers. Inside the circle the same kinds of things stand on bare bright paving with their shadows simply missing. Low pink-gold sunrise from the right draws long lilac shadows everywhere except under the star, where the light is white and falls from straight above.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-04 · 망루 부엉이
벨루미르의 별 · 유닛 · 레벨 1 · 일반 · 틀 `close` L C `aurora` · 프롬프트 n2 → `tools/art/inbox/A3-04.jpg`

```
Landscape 5:4 painting. Tight close-up on a small round owl perched on a lookout parapet, its face filling the centre of the frame: indigo feathers dotted with silver points like a night sky, soft down ruffled by the wind, two huge gold eyes wide open and turned to the left. Beside it on the stone lie an old watchman's brass spyglass, lens cap still on, and a pair of wire spectacles. In each gold eye sits the same tiny reflection: a thin horizon line with one far spark of campfire. Deep night; slow teal-green and violet aurora ribbons overhead tint the feathers, and the eyes carry their own steady gold glow.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-05 · 바람 실프
벨루미르의 별 · 유닛 · 레벨 1 · 일반 · 틀 `eye` R L `moonsilver` · 프롬프트 n2 → `tools/art/inbox/A3-05.jpg`

```
Landscape 5:4 painting. At eye level on a windswept plateau, as if crouched beside her: a small, slender wind spirit shaped like a half-transparent girl of moving air kneels behind a boulder in the left of the frame, looking right toward a far row of enemy tents. One airy hand counts on its fingers; in the turf at her knee stands her tally, small feathers stuck upright in groups of five. A sentry's torch is swinging her way, and her hair and legs have already unravelled into streaks of wind carrying leaves. A full moon behind thin cloud turns the grass and her body blue-silver; the small torch at the camp is the only warm point.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-07 · 치고 빠지기
벨루미르의 별 · 공용 마법 · 레벨 1 · 일반 · 틀 `top` R X `moonsilver` · 프롬프트 n2 → `tools/art/inbox/MA-07.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Straight down onto a field of fresh snow that records the whole fight as tracks. A trail of light, narrow footprints zigzags from left to right across the frame, and at each corner of the zigzag two prints stand side by side with a single dropped feather. From each such stop a ruler-straight scratch of an arrow's passage runs back to the left. Heavy bootprints plod after the light ones, and at every stop they arrive at, a wide slash is cut into empty snow. Full moon directly overhead: blue-silver snow, every print filled with sharp shadow, a faint teal sheen along the arrow scratches.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-A3-1 · 순환
벨루미르의 별 · 공용 마법 · 레벨 1 · 일반 · 틀 `ring` N C `starindigo` · 프롬프트 n2 → `tools/art/inbox/PS-A3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A round slab of dark stone lies centred under the night sky, and overhead the stars have smeared into concentric arcs around the pole, like the grooves of a turned bowl. On the slab three shallow hollows mark the points of a triangle, joined by one circular groove. A sword, a round shield and a small lit lamp are each caught sliding along that groove from its own hollow toward the next one round, leaving three fresh curved scratches of the same length. Indigo night; the wheeling star arcs give a cold silver light, and the little lamp adds one warm point on the stone.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA3-01 · 돌풍
벨루미르의 별 · 공격 마법 · 레벨 1 · 일반 · 틀 `impact` R R `thinair` · 프롬프트 n2 → `tools/art/inbox/SA3-01.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The instant a hard gust lands, at arm's length: it strikes a coat of overlapping steel scales from the front, in the right of the frame, and every scale flips up on its rivet at once like shingles on a roof in a gale, baring the quilted cloth beneath. The wearer is cropped at chin and belt. The same wind curls on round the edge of the frame and fills a grey cloak in the near left foreground like a sail, driving it forward into the picture. Pale, clear daylight high in the mountains; the lifted scales flash white and the gust shows as fine wind-teal streaks.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-09 · 바늘탑 조인 활잡이
벨루미르의 별 · 유닛 · 레벨 2 · 일반 · 틀 `far` L L `duskrose` · 프롬프트 n2 → `tools/art/inbox/A3-09.jpg`

```
Landscape 5:4 painting. From far off, the sheer outer wall of a needle-thin stone tower rises through the left third of the frame, ringed by narrow wooden galleries, and on every gallery hangs one round straw target, a vertical row of them dwindling out of sight above and below. Small against the wall, a bird-headed archer with brown and white feathers glides down past them on half-open wings, pale-wood bow in hand, turned to the left toward the stone. Each target above carries a single arrow in its centre; the ones below wait clean. Sunset above the cloud sea: rose and peach light rakes the wall from the right, with deep teal shadow under each gallery.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-10 · 깃화살 하피
벨루미르의 별 · 유닛 · 레벨 2 · 일반 · 틀 `eye` B R `moonsilver` · 프롬프트 n2 → `tools/art/inbox/A3-10.jpg`

```
Landscape 5:4 painting. On a swaying rope bridge strung between two rock pinnacles, at eye level: a slight young harpy walks away from us along the planks in the right of the frame, a bird-woman with storm-grey and teal wings for arms, wild wind-tossed hair and hooked black talons. Her wings show ragged gaps where feathers are missing, and she is tugging out one more with her teeth. Behind her, toward us, the bridge lies ankle-deep in shed feathers like drifted snow, and feather-darts bristle from every post and handrope. A full moon high on the left bleaches the feather drifts blue-white and throws the rope shadows sharp across the planks.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-11 · 새끼 그리핀
벨루미르의 별 · 유닛 · 레벨 2 · 일반 · 틀 `eye` F L `thinair` · 프롬프트 n2 → `tools/art/inbox/A3-11.jpg`

```
Landscape 5:4 painting. A griffin cub the size of a large dog sits bolt upright on a stone landing ledge in the left of the frame, at eye level and facing us, chest puffed out: fluffy teal-grey eagle head and stubby wings, golden beak, tawny lion haunches, tail curled over its paws. The leather message tube on its chest harness hangs open and empty. Far behind it, high in the right of the sky, a small sealed scroll tumbles along on the wind, still on its way. Clear, pale noon light at high altitude, white cloud banks below the ledge and a soft cool shadow under the cub.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### C2-1 · 견습 단궁
벨루미르의 별 · 아이템 · 레벨 2 · 일반 · 틀 `hung` N L `stormcloud` · 프롬프트 n2 → `tools/art/inbox/C2-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A short, stubby bow of plain ash hangs by its hemp string from a wooden peg beside a narrow window, in the left of the frame, lit from behind. It is a learner's bow: barely an arm long, the grip wrapped in new cord over old, one limb tip chipped and mended with glue and thread, a row of small dents along the belly. The peg is one of a long row at child height, worn to a groove, and the draught through the window keeps the bow turning slowly on its string. Grey-violet storm daylight from the window behind it outlines the bow and string in silver; the wall beside it is in soft shade.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### HA3-1 · 엄호 후퇴
벨루미르의 별 · 방어 마법 · 레벨 2 · 일반 · 틀 `path` R X `stormcloud` · 프롬프트 n2 → `tools/art/inbox/HA3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Side view of trampled ground in driving wind, everything streaming to the right: dust, torn grass, and at the right edge the heels of one pair of boots and the hem of a cloak blown out ahead of its wearer as he backs away. Above them, crossing the whole frame the other way, a flat flight of arrows passes leftward against the wind. At the left edge two upraised weapons, an axe and a mace, hang stalled in mid-swing above a fresh hedge of shafts that has just planted itself in front of their owners' boots. Grey-violet storm light with silver rain blown flat; the wind shows as wind-teal streaks, all running to the right.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MA-11 · 마무리 화살
벨루미르의 별 · 공격 마법 · 레벨 2 · 일반 · 틀 `origin` B C `duskrose` · 프롬프트 n2 → `tools/art/inbox/MA-11.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Riding just behind two arrows in flight, looking along their shafts: their grey fletchings blur in the near foreground at the left and right, and their paths converge ahead. In front of them, across a trampled field, stands a line of round shields held edge to edge. Most are whole and bright. Two, near the centre, are split and lashed together with rope, sagging lower than their neighbours, and each arrowhead points exactly at one of those two. Low rose-peach sun from behind us lights the shield faces; the two cracked ones sit in a dip of deep teal shadow.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MC-06 · 무장 해제
벨루미르의 별 · 공용 마법 · 레벨 2 · 일반 · 틀 `swarm` U X `aurora` · 프롬프트 n2 → `tools/art/inbox/MC-06.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Weapons fill the air from edge to edge: swords, hand-axes, spears, a mace and a dozen daggers tumble upward and outward on a spiralling wind, hilts first, lanyards whipping. The small ones turn low and near; the largest, a great two-handed sword and a halberd, are already far up and shrinking. Along the bottom edge a row of open gauntlets and gloved hands still reaches after them, fingers spread, with dust and torn banner cloth spinning between. Night; teal-green and violet aurora ribbons twist overhead in the same spiral, glinting along every turning blade.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-A3-C1 · 별자리 사냥개
벨루미르의 별 · 유닛 · 레벨 2 · 일반 · 틀 `echo` R X `aurora` · 프롬프트 n2 → `tools/art/inbox/PN-A3-C1.jpg`

```
Landscape 5:4 painting. One bounding run across the night sky, shown as five overlapping moments from left to right: a lean hound drawn by nine bright points and thin silver lines, with only dark sky inside its outline, gathers, leaps, stretches, lands and leaps again. The earliest outline at the left has faded to a faint dotted sketch, each later one is brighter, and the last, at the right edge, is the living hound itself with its star-point nose lifted. Low along the bottom, a fence and one bare tree give the sky its size. Teal-green and violet aurora ribbons hang behind the run; the hound's points are white-silver and the land below is black.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-A3-2 · 별의 모사
벨루미르의 별 · 공용 마법 · 레벨 2 · 일반 · 틀 `far` N X `moonsilver` · 프롬프트 n2 → `tools/art/inbox/PS-A3-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from a long way off, on a bare ridge against the night sky: at the left stands one huge horned brute with a club, a black shape as tall as a gatehouse. Facing it at the right stand two slim figures half its height. Above and around each slim figure, points of starlight joined by thin silver lines have drawn the brute's outline again at its full size, same horns, same shoulders, same club, and the two small figures are stepping forward into those outlines like hands into gloves. Full moon behind the ridge; all three figures are blue-black shapes, and the copied outlines glitter silver with a breath of teal.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA3-04 · 시위 당기기
벨루미르의 별 · 공격 마법 · 레벨 2 · 일반 · 틀 `before` L R `aurora` · 프롬프트 n2 → `tools/art/inbox/SA3-04.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The held breath before the shot. Along the right side of the frame a rank of bows stands at full draw, seen from just behind the arrowheads: a receding row of steel points, bent limbs and strings pulled back past the edge of the picture, every point level with the next like the teeth of a comb, all aimed left. In front of them the ground ends at a wide chasm. On its far lip, small and distant, a line of raised blades stands halted at the brink. Night under teal-green and violet aurora; its glow runs along every taut string and puts one cold glint on each arrowhead.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-13 · 폭풍 히포그리프
벨루미르의 별 · 유닛 · 레벨 3 · 일반 · 틀 `profile` R X `duskrose` · 프롬프트 n2 → `tools/art/inbox/A3-13.jpg`

```
Landscape 5:4 painting. A long flat side view under a low dark cloud ceiling: a hippogriff gallops through the air toward the right, eagle head and grey-white wings stretched forward, horse hindquarters and streaming tail behind, the whole animal spanning the middle of the frame. From its tail back to the left edge hangs a slanting veil of rain that ends exactly where the animal does. Below, a chalk road runs across the picture, dark and puddled behind it, white and dusty ahead, with a clean line between. Low evening sun slips under the cloud from the right, turning the dry road peach and the rain veil rose against teal shadow.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-15 · 담비 저격수
벨루미르의 별 · 유닛 · 레벨 3 · 일반 · 틀 `high` L C `stormcloud` · 프롬프트 n2 → `tools/art/inbox/A3-15.jpg`

```
Landscape 5:4 painting. Looking down from above onto a narrow cliff ledge: a pine marten sniper kneels at the centre, lean and still, dark fur and short cloak blowing, a pale bib at its throat, a long elegant bow resting across its knee. A single arrow stands in its quiver. Its muzzle is lifted in a thin whistle. Far below it the canyon runs off to the left, planted with a line of ribbon poles, and the ribbons are swinging round one after another to point the same way, toward a small red gourd hung on a rope at the canyon's end. Flat grey-violet storm light with a silver drizzle hanging in the canyon; the ribbons are wind-teal and the gourd a single red point.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-18 · 쌍둥이자리 궁수
벨루미르의 별 · 유닛 · 레벨 3 · 일반 · 틀 `front` F X `starindigo` · 프롬프트 n2 → `tools/art/inbox/A3-18.jpg`

```
Landscape 5:4 painting. Dead-on and mirror-symmetrical: two archers drawn by stars stand side by side across the frame, each a figure of bright points joined by thin silver lines with only night sky inside the outline, their two bows lowered after the shot in matching poses. Between them, on the exact centre line, their two arrows of light fly toward us nose to tail, the second riding the glowing groove the first has left in the air. Both star-traced heads tilt at the same angle to watch. Deep indigo night on a bare hilltop; the figures' own star points and the arrows' silver trail are the light, with one faint teal wind streak.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-41 · 고요의 구름고래
벨루미르의 별 · 유닛 · 레벨 3 · 일반 · 틀 `cut` L C `thinair` · 프롬프트 n2 → `tools/art/inbox/A3-41.jpg`

```
Landscape 5:4 painting. A cross-section through a whale made of cloud, swimming slowly to the left across the middle of a bright sky: the cut shows its soft billowing white hide as a thick rim and, inside, one great hollow of perfectly still air. Thin sharp streaks of wind slash in through its flank from outside and, once within, slow down, curl up and lie still. In the calm of the hollow a dropped feather hangs level and three small birds doze on a ledge of mist. Clear pale daylight all round; the whale's cloud glows white from within, and the tamed wind streaks show as soft teal.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### C3-1 · 폭풍의 활
벨루미르의 별 · 아이템 · 레벨 3 · 일반 · 틀 `macro` N C `starindigo` · 프롬프트 n2 → `tools/art/inbox/C3-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Extreme detail of a bowstring at its nocking point, crossing the centre of the frame from top to bottom: wound round the string like wool on a spindle sits a tiny thundercloud the size of a walnut, dark and slowly turning. Hair-thin lightning jumps from it to the bow's grip a finger's width away, a grip of dark horn bound in copper wire and freckled with small scorch marks. A single raindrop the size of a pinhead falls from the cloud. Indigo night behind, a few stars out of focus; the small lightning is the only light, flashing white-teal on copper and horn.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IA3-4 · 회오리 화살통
벨루미르의 별 · 아이템 · 레벨 3 · 일반 · 틀 `cut` U T `thinair` · 프롬프트 n2 → `tools/art/inbox/IA3-4.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A cutaway view of a quiver, the near side of its tube removed to show the inside: tooled grey leather with a silver rim and a spiral seam, standing upright. Within, a tight coil of pale-teal wind winds up through the tube around a dozen shafts, ruffling their grey fletchings in the upper part of the frame. One arrow has risen halfway out of the mouth on the updraught, turning slowly. A worn shoulder strap and a patch of darker leather show where a hand has rested for years. Even, pale daylight against white cloud, with cool soft shadow inside the tube and a teal shine on the coil of wind.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IA3-5 · 벨루미르의 장궁
벨루미르의 별 · 아이템 · 레벨 3 · 일반 · 틀 `shrine` N R `starindigo` · 프롬프트 n2 → `tools/art/inbox/IA3-5.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. In a stone niche of an observatory wall, in the right of the frame, a longbow taller than a grown man rests across two silver brackets: slender pale wood the colour of bone, limbs inlaid with tiny silver points joined by hair-fine lines like constellations, the grip smooth and unmarked. Offerings crowd the ledge beneath it: single arrows laid side by side, shallow bowls of grey feathers, candle stubs burnt to pools. Dust lies on everything except the bow, and one fresh feather still rocks in its bowl. Starlight falls through a roof slit onto the bow alone, silver on indigo stone; the candle stubs are cold and dark.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NA3-2 · 빗발치는 화살
벨루미르의 별 · 공격 마법 · 레벨 3 · 일반 · 틀 `under` D X `thinair` · 프롬프트 n2 → `tools/art/inbox/NA3-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Crouched behind a great tower shield and looking straight up: the dark back of the shield, with its arm straps and rivets, walls off the bottom and one side of the frame. Everything above its rim is pale sky, and the sky is full of arrows on their way down, hundreds of dark points with small grey fletchings behind them, the nearest already long and close, falling steeply over the shield's top edge onto the ground where we hide. Thin white daylight behind the falling shafts turns them to clean dark strokes; the shield's inner face is in cool shadow.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NA3-3 · 별빛 연사
벨루미르의 별 · 공격 마법 · 레벨 3 · 일반 · 틀 `transform` U X `starindigo` · 프롬프트 n2 → `tools/art/inbox/NA3-3.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A whole volley caught halfway through its change, rising from the bottom of the frame to the top. Low down, the arrows are still wood and feather, a dense sheaf of shafts just clear of a row of humming bowstrings. In the middle of the frame their heads have kindled white and the shafts are thinning to lines of light. At the top they are arrows only in their direction: hundreds of bright streaks spreading across the night and settling in among the real stars, thick as a river of them. Deep indigo night; the kindled arrowheads light the bow limbs below in silver, and the sky above brightens where the streaks gather.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-A3-U1 · 별문자 부엉이
벨루미르의 별 · 유닛 · 레벨 3 · 일반 · 틀 `macro` R C `moonsilver` · 프롬프트 n2 → `tools/art/inbox/PN-A3-U1.jpg`

```
Landscape 5:4 painting. Extreme close-up of one outstretched owl wing in mid-beat, sweeping toward the right: each indigo flight feather carries its own small mark, a few silver dots joined by fine lines, different on every feather. With the stroke, the marks are peeling off the feather tips as glowing figures and flying away in a ruler-straight file. Snow blows hard across the frame from top to bottom, and the file of marks holds its line through it. A round gold eye and a wedge of downy face watch from the left corner. Full moon behind the wing: blue-silver light through the feather vanes, sharp shadows of the barbs, the marks a cool teal-white.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-19 · 폭풍탑 조인 궁수
벨루미르의 별 · 유닛 · 레벨 4 · 일반 · 틀 `silhouette` R C `moonsilver` · 프롬프트 n2 → `tools/art/inbox/A3-19.jpg`

```
Landscape 5:4 painting. Backlit against an enormous full moon, a rank of guild archers stands along a narrow stone causeway in clean black outline, all turned to the right: slim cloaked shapes with long ears, bows held upright, every chin lifted. In the centre of the row one outline differs: a crested feathered head with a hooked beak, wings folded along the arms, taloned feet gripping the stone. That beak is tilted a little higher than every chin beside it. The moon's disc behind them is the whole light, blue-silver, rimming feathers and bowstrings with a hair of white.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-22 · 바람 타는 그리핀
벨루미르의 별 · 유닛 · 레벨 4 · 일반 · 틀 `tilt` D R `aurora` · 프롬프트 n2 → `tools/art/inbox/A3-22.jpg`

```
Landscape 5:4 painting. A steeply tilted frame, the horizon running corner to corner: in the right of the picture a griffin has just clapped its teal-grey wings shut and tips into a headfirst drop, golden beak down, tawny lion body stretched, golden foreclaws reaching. All around it the wind has stopped with the wings. Leaves, a paper kite and its string, thistle seeds and one of its own shed feathers hang motionless in the air where the gust left them, and far below the smoke of a single chimney stands in a perfectly straight column. Night, with teal-green and violet aurora ribbons behind the griffin; their glow edges the folded wings and each hanging seed.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-23 · 벨루미르의 별여우
벨루미르의 별 · 유닛 · 레벨 4 · 일반 · 틀 `top` L L `moonsilver` · 프롬프트 n2 → `tools/art/inbox/A3-23.jpg`

```
Landscape 5:4 painting. Straight overhead, like a map: a high plateau of pale grass, standing stones and dry stream beds at night, and across all of it a web of thin glowing lines, every footpath, ford and sheep track dusted with starlight, crossing and branching to the edges of the frame. At the end of the newest line, in the left of the picture, trots a slim indigo fox speckled with tiny stars, heading left, its long brush tail sweeping the ground and leaving the fresh bright stroke behind it. Full moon straight above: blue-silver grass, small sharp shadows beside each stone, the trails a paler silver with a breath of teal.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-24 · 번개 화살 텐구
벨루미르의 별 · 유닛 · 레벨 4 · 일반 · 틀 `close` R L `stormcloud` · 프롬프트 n2 → `tools/art/inbox/A3-24.jpg`

```
Landscape 5:4 painting. Head and shoulders of a tengu fill the left of the frame, turned toward the right: a crow-beaked face, glossy black feathers beaded with rain, one broad wing hunched behind. In one hand a lacquered bow hangs low with an arrow already on the string; the other hand flicks a fan of long storm feathers over the arrowhead. A hair-thin thread of lightning has come down from the cloud at the fan's bidding and sits on the steel point as a small bright bead, like a bird on a perch. Dark grey-violet thundercloud presses low overhead; the bead of lightning lights the beak and fan from below with a cold white-teal.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### RA3-1 · 폭풍의 눈
벨루미르의 별 · 공용 마법 · 레벨 4 · 일반 · 틀 `inside` N T `stormcloud` · 프롬프트 n2 → `tools/art/inbox/RA3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Standing on the calm floor of a storm's eye, looking outward and up: a towering wall of grey cloud turns all the way round us, and a small disc of clear sky sits straight overhead in the upper part of the frame. Inside the wall everything has stopped. Raindrops hang in the air as beads. A thrown spear hangs level, a flail stands halted in a mailed fist with its chain a stiff arc, a banner droops. From both ends of the stilled field, thin plumes of breath-mist rise slowly toward the bright disc. Grey-violet storm wall all round with silver rain frozen in it; a pale shaft falls from the open disc of sky above.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SA3-08 · 대폭풍
벨루미르의 별 · 공용 마법 · 레벨 4 · 일반 · 틀 `top` R X `stormcloud` · 프롬프트 n2 → `tools/art/inbox/SA3-08.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A marching host seen from directly overhead reads as a pattern on the plain: hundreds of small dark figures in blocks, and every spear, pike and banner among them is laid over flat in the same direction, like wheat combed by one great hand. Tents have torn loose and tumble toward the right edge with camp stools and cooking pots skittering after them like leaves. At the head of the host one figure has gone down on one knee, head bowed into the wind, and the grass around it is pressed into a long swirling fan. Bruised grey-violet storm light with silver rain driven sideways; long wind-teal streaks cross the whole plain from left to right.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-26 · 폭풍 사냥 히포그리프
벨루미르의 별 · 유닛 · 레벨 5 · 일반 · 틀 `reflect` L B `stormcloud` · 프롬프트 n2 → `tools/art/inbox/A3-26.jpg`

```
Landscape 5:4 painting. Low sun breaks through the storm and prints a shadow on the rain-slick rock of a mountain shelf, and the shadow is the picture: across the lower part of the frame lies the huge black shape of a hippogriff in a stoop toward the left, hooked beak open, wings spread, eagle talons reaching, horse hind legs and tail trailing. The shadow of its foreclaws has just closed over a running stag, the one solid creature in view, small at the left, legs stretched in full flight. Every puddle between them holds a piece of torn grey sky. One low shaft of pale sun from the right cuts under grey-violet storm cloud, silver-white on the wet stone, with rain still falling through it.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-28 · 별똥별 임프
벨루미르의 별 · 유닛 · 레벨 5 · 일반 · 틀 `back` B L `starindigo` · 프롬프트 n2 → `tools/art/inbox/A3-28.jpg`

```
Landscape 5:4 painting. Close behind it: a gangly, child-sized imp made of white-hot sparks sits on the copper ball that tops a slender spire, in the left of the frame, legs dangling over the drop, small feathered wings folded, pointed ears pricked. Its back is to us and one thin arm is raised high, waving. Out in the huge sky it faces, a shooting star is crossing from right to left. The copper around its seat is dotted with small scorched rings, one for every night it has waited here. Clear indigo night crowded with stars; the imp's own glow warms the copper and trails a few sparks down the wind.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-29 · 활 당기는 사수자리
벨루미르의 별 · 유닛 · 레벨 6 · 일반 · 틀 `under` R C `aurora` · 프롬프트 n2 → `tools/art/inbox/A3-29.jpg`

```
Landscape 5:4 painting. From the bottom of a round observatory shaft, looking straight up through its open roof ring: the dark stone rim circles the frame, and the disc of sky inside is filled by one colossal archer made of stars, bright points joined by thin silver lines, half horse, half bowman, aimed toward the right. Its string has just been released, and a single star-arrow streaks from the bow. On the rim, tiny hooded heads peer up, and one small arm lifts a hoop of woven willow on a pole into the arrow's path. Teal-green and violet aurora ribbons ripple behind the star figure; the shaft walls below stay black with a faint green sheen.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-30 · 폭풍 송골매
벨루미르의 별 · 유닛 · 레벨 6 · 일반 · 틀 `eye` F C `thinair` · 프롬프트 n2 → `tools/art/inbox/A3-30.jpg`

```
Landscape 5:4 painting. In a long archers' hall, at eye level down the length of the table: a falcon as tall as a man perches on the carved back of the head chair at the centre, facing us, slate-grey wings folded, white barred breast, yellow talons sunk in the wood, sharp eyes half-lidded. Along both sides, hooded guild members seen from behind hold out strips of meat on the tips of arrows. Through the tall open window behind the bird, a thunderhead waits close against the sill like a tethered horse. Pale high daylight pours through the window around the dark cloud, backlighting the falcon's shoulders and leaving the table in cool shade.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-31 · 파편 군도의 명궁
벨루미르의 별 · 유닛 · 레벨 6 · 일반 · 틀 `ground` F R `duskrose` · 프롬프트 n2 → `tools/art/inbox/A3-31.jpg`

```
Landscape 5:4 painting. Camera on the turf of a small floating rock island, looking through a thicket of old arrows stuck in the ground at every angle, a hundred years of misses, shafts weathered silver, fletching rotted to threads. Beyond them, in the right of the frame, a tall weather-beaten mountain goat archer faces us, grey-streaked beard, swept-back horns worn smooth, a wool cloak over worn grey-green leathers, unstringing a plain pale-wood longbow. Behind his shoulder, on a neighbouring shard of rock adrift in the wind, a single dead pine holds one arrow in the exact middle of a knot. Dusk above the clouds: peach light from the left on his face and the old shafts, deep teal shadow pooling between the arrows.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-32 · 회오리 텐구
벨루미르의 별 · 유닛 · 레벨 6 · 일반 · 틀 `over` L C `thinair` · 프롬프트 n2 → `tools/art/inbox/A3-32.jpg`

```
Landscape 5:4 painting. Over the broad black-feathered shoulder of a towering tengu, whose crow beak and one glossy wing edge the right foreground: he has already lowered his lacquered bow and is idly scratching his neck with a fan of storm feathers. Ahead of him, receding to the left across a dry salt flat, three whirlwinds stand in a perfect row, each as tall as a watchtower, and each has a neat round hole punched through its waist. One thin vapour line runs through all three holes, and a shepherd's hut beside the nearest shows their size. Hard pale daylight at altitude under a thin white sky; the whirlwinds are bright dust columns with cool blue shadow down one side.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-33 · 별을 겨누는 자
벨루미르의 별 · 유닛 · 레벨 7 · 일반 · 틀 `profile` U X `duskrose` · 프롬프트 n2 → `tools/art/inbox/A3-33.jpg`

```
Landscape 5:4 painting. A flat side view of the evening sky above a sea of cloud. From a torn hole in the cloud deck at the lower left, a white-hot streak climbs on a long diagonal to the upper right: a shooting star going the wrong way, its small blazing head leading, its tail of sparks spanning the entire frame and still dragging wisps of cloud upward. Along the bottom edge the tips of a few stone spires poke through the cloud, tiny beside it. Just ahead of its head, one early star has dimmed inside a faint ring. Rose and peach afterglow along the cloud tops, deep teal above; the streak is the brightest thing in the sky and whitens the rim of the cloud hole.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-35 · 하늘 찢는 로크
벨루미르의 별 · 유닛 · 레벨 7 · 일반 · 틀 `high` R C `thinair` · 프롬프트 n2 → `tools/art/inbox/A3-35.jpg`

```
Landscape 5:4 painting. High above a white sea of cloud, looking down on the back of a colossal bird in the centre of the frame: brown-grey wings spread so wide that a drifting sky-island with a watchtower fits beneath one wingtip, horn-coloured hooked beak pointed to the right. Behind it the cloud sea is split by one long straight cut, a canyon torn open in its wake all the way to the left edge, and at the bottom of the cut lie dark blue fields and a thread of river. Bright thin sunlight from the upper left; the cloud is dazzling white, the cut is cool blue shadow, and each great feather throws its own edge.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### A3-36 · 폭풍탑 탑주
벨루미르의 별 · 유닛 · 레벨 7 · 일반 · 틀 `back` B L `starindigo` · 프롬프트 n2 → `tools/art/inbox/A3-36.jpg`

```
Landscape 5:4 painting. Seen from behind, in the left of the frame: a very tall giant whose body is grey storm cloud, shoulders trailing mist under a short wind-blown cloak, stands before the immense bronze door of a tower and turns a silver key as long as a forearm in its lock. Across his back hangs the oldest bow in the place, unstrung, its dark wood worn pale at the grip by many hands. Two small hooded apprentices wait at his knee, sharing one lantern and one yawn. Starry indigo night above the door; the apprentices' lantern throws warm light up the bronze and silvers the edge of the old bow.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-02 · 화약 짐꾼
도르마크의 심장불 · 유닛 · 레벨 1 · 일반 · 틀 `high` L T `ashfall` · 프롬프트 n2 → `tools/art/inbox/B1-02.jpg`

```
Landscape 5:4 painting. Looking steeply down a stair hacked into a grey cliff: near the top of the frame a small soot-grey mule climbs leftward under two bulging powder sacks roped across its back, a load twice its own bulk, long ears flattened, one ember-rimmed hoof testing the next worn step. The rock face drops away beneath it through drifting ash to the bottom of the frame, where a hair-thin thread of lava glows in the gorge. A dislodged pebble hangs in the air below its hind hoof. Flat overcast noon, shadowless and pale; the distant lava thread is the only colour in the whole drop.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-05 · 불꽃 임프
도르마크의 심장불 · 유닛 · 레벨 1 · 일반 · 틀 `tilt` R L `brassglow` · 프롬프트 n2 → `tools/art/inbox/B1-05.jpg`

```
Landscape 5:4 painting. A tilted, lurching frame catches a knee-high imp of living flame in mid-hop at the lower left, cinder-black body cracked with glowing seams, whip tail of fire lashing as it bounds toward the right and glances back with a cheeky ember-eyed grin. Behind it the bristles of a straw broom sweep in from the left edge, already singed and smoking. Beyond stands a heavy iron-banded door, firmly shut. Warm lamplight from a caged lantern on the wall; the imp itself throws a second, flickering glow across the floorboards.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### HB1-1 · 탄약고 기습
도르마크의 심장불 · 핸드 마법 · 레벨 1 · 일반 · 틀 `symbol` N C `coldnight` · 프롬프트 n2 → `tools/art/inbox/HB1-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Five identical ammunition crates stand in a neat row across a dark field, evenly spaced like pieces laid out for a game, seen straight on. Four sit untouched and cold. The second from the right is wholly ablaze, lid lifting, flames roaring upward and throwing the long shadows of the others across the grass. In the foreground lie three small hooded lanterns; two have tipped over and gone dark. Midnight, moonless and blue-black; the one burning crate is the whole light of the scene.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MB-01 · 산탄 포격
도르마크의 심장불 · 공격 마법 · 레벨 1 · 일반 · 틀 `swarm` D X `ashfall` · 프롬프트 n2 → `tools/art/inbox/MB-01.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Under a low grey sky the air is full of iron: hundreds of dark musket-ball-sized shot fill the frame from edge to edge, each drawn out into a short slanting streak, falling to the lower left like a rain squall seen from the side. Where the first of them land, a ploughed field jumps in dozens of small spurts of mud, and a lone wicker shield planted in the furrows is already coming apart. Dull daylight; each ball carries a faint orange heat-glint on its leading side, the only colour in the grey.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-B1-2 · 불붙은 각오
도르마크의 심장불 · 공격 마법 · 레벨 1 · 일반 · 틀 `column` U C `ember` · 프롬프트 n2 → `tools/art/inbox/PS-B1-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Two fuse cords hang straight down the centre of the frame side by side, taut and vertical from top to bottom in the dark. On each, at exactly the same height, a spark is climbing: below the sparks the cords are already grey curls of ash drifting away, above them still clean and pale. At the very top edge the round iron bellies of two bombs just enter the picture. Pitch dark all round; the two sparks are the only light, each ringed by a small orange halo of lit smoke.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB1-01 · 연막탄
도르마크의 심장불 · 방어 마법 · 레벨 1 · 일반 · 틀 `inside` N X `ashfall` · 프롬프트 n2 → `tools/art/inbox/SB1-01.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From inside a rolling bank of thick yellow-grey powder smoke: vague shapes of spears and helmets dissolve a few paces away, and three wavering orange glows — small fires clinging to unseen shields — are the only fixed points in the murk. At the bottom edge a cracked clay smoke-pot still spins on the trampled ground, pouring out fresh smoke. Flat, choked daylight filtered through the smoke; the three small fires hang in it like lanterns in fog.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB1-03 · 불의 장막
도르마크의 심장불 · 방어 마법 · 레벨 1 · 일반 · 틀 `origin` B C `whitehot` · 프롬프트 n2 → `tools/art/inbox/SB1-03.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Standing at the near end of a long ditch and looking straight down its length: a channel of dark glistening oil runs away from us to the vanishing point, and a wall of flame is racing along it into the distance, already standing man-high where it has passed. On the left the fire lights an empty parapet of sandbags; on the right, open ground where the tip of a dropped sword lies burning. Night; the fire-wall is the light, yellow-white at its base and deep red in the smoke rolling off its top.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-08 · 연막 정령
도르마크의 심장불 · 유닛 · 레벨 2 · 일반 · 틀 `pov` F C `ember` · 프롬프트 n2 → `tools/art/inbox/B1-08.jpg`

```
Landscape 5:4 painting. First-person view from behind a shield rim: the viewer's own gloved hand presses a rag to the mouth at the bottom edge, and straight ahead, a few paces off, a body of thick gunpowder smoke as tall as a doorway drifts closer over churned ground. A vague grin opens in it, embers wink deep inside like slow eyes, and two long wispy arms unroll toward the cough. Night after a cannonade; the only light is the dull orange of the embers buried inside the smoke, glinting on the shield rim.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-10 · 포르탄 불개
도르마크의 심장불 · 유닛 · 레벨 2 · 일반 · 틀 `ground` L R `ember` · 프롬프트 n2 → `tools/art/inbox/B1-10.jpg`

```
Landscape 5:4 painting. Ground-level view across wet cobblestones beneath a raised iron portcullis: a lean wolf-sized hound with smouldering ember-red fur lies on the right, chin on its soot-black paws, eyes fixed leftward on a pair of muddy boots striding past in the blurred foreground. Its half-open jaws leak a coal-red glow, and each breath lifts a curl of smoke toward the dark gate arch above. The only light is the hound's own glowing throat and fur tips, warming the cobbles and the iron teeth of the gate from below.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-12 · 화서 무리
도르마크의 심장불 · 유닛 · 레벨 2 · 일반 · 틀 `swarm` L X `whitehot` · 프롬프트 n2 → `tools/art/inbox/B1-12.jpg`

```
Landscape 5:4 painting. Cat-sized rats with burning silvery-red fur fill the frame from edge to edge, a living tide pouring leftward out of a white-hot crack in the rock at the upper right and over warm rubble. Glowing whiskers, ember eyes and flame-tipped tails repeat like a pattern. One rat near the lower left has stopped to groom, and a tuft of its unburnt fur has caught on an iron comb left on a stone. All light pours from the crevice behind them, a blinding core that turns the nearest rats to bright outlines and the far ones to crimson shadow.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB1-1 · 화승총 개머리판
도르마크의 심장불 · 아이템 · 레벨 2 · 일반 · 틀 `used` N R `ember` · 프롬프트 n2 → `tools/art/inbox/IB1-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A heavy walnut musket stock lies where it was last swung, in the right of the frame on trampled ground: its barrel bent, the brass butt-plate cracked and smeared with mud, resting across an iron helm with a deep fresh dent in its crown. Splinters of the stock are scattered around, and the gun's slow-match, still looped through the lock, smoulders with one small red coal. Night after the fighting; the match-coal is the single light, a small orange glow on wood grain, brass and the dented steel.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB1-2 · 불씨 탄띠
도르마크의 심장불 · 아이템 · 레벨 2 · 일반 · 틀 `hung` N C `brassglow` · 프롬프트 n2 → `tools/art/inbox/IB1-2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A broad leather belt hangs from an iron peg in the middle of the frame, lit from behind so that its load reads in outline: a row of small corked powder flasks in stitched loops, each with a short fuse standing up like a stalk. One loop near the buckle hangs empty. The leather is scorched along its lower edge, and a tinderbox dangles from it on a thong. A forge glow behind the belt rims every flask in amber; the front is soft brown shadow with a glint on the buckle.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MB-05 · 불씨 뿌리기
도르마크의 심장불 · 공격 마법 · 레벨 2 · 일반 · 틀 `macro` R T `ember` · 프롬프트 n2 → `tools/art/inbox/MB-05.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Extremely close on a burlap sack splitting open in mid-air at the top of the frame: the coarse weave chars and tears, and hundreds of small live coals spill out of the rip and tumble down and to the right, the nearest ones sharp enough to show their cracked, pulsing surfaces and the hair of smoke each one trails. Far below, out of focus, lie the pale ridges of sleeping tents. Black night; the coals light themselves and the torn edge of the sack, everything else lost in dark.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MC-02 · 날 세우기
도르마크의 심장불 · 공격 마법 · 레벨 2 · 일반 · 틀 `reflect` R R `ashfall` · 프롬프트 n2 → `tools/art/inbox/MC-02.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Two long bayonets lie side by side across a wet grey whetstone in the right of the frame, points to the right, freshly honed. Their polished flats work as narrow mirrors: in them runs the reflection of a pale evening sky and, along the bottom, a row of tiny orange match-lights waiting in the dusk. A bright hairline of light travels the full length of each edge, and beads of water stand on the stone. Soft grey last light from above; the reflected match-lights are the one warm colour, doubled along both blades.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NB1-1 · 철갑 포탄
도르마크의 심장불 · 공격 마법 · 레벨 2 · 일반 · 틀 `path` R L `brassglow` · 프롬프트 n2 → `tools/art/inbox/NB1-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen exactly side-on: at the left a thick iron-bound shield stands planted in the earth with a clean round hole punched through its centre, splinters and rivets still flying out of the back. To the right of it the cannonball that made the hole — banded in layers of dark iron, glowing dull at the seams — is still going, skipping along the ground in a long shallow furrow marked by a row of dust puffs that runs to the right edge. Low amber evening light from the left turns the dust puffs to brass and throws the shield's long shadow along the furrow.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B1-C1 · 새끼 살라만더
도르마크의 심장불 · 유닛 · 레벨 2 · 일반 · 틀 `close` R B `brassglow` · 프롬프트 n2 → `tools/art/inbox/PN-B1-C1.jpg`

```
Landscape 5:4 painting. A tight close-up in the ash of a hearth: a small lizard with wet-looking skin of living flame lies curled along the bottom of the frame, head to the right, one eye half open in mild annoyance. Its tail stands up behind it burning like a lamp wick, and from the top edge the frayed end of a slow-match cord dips down to touch the tail-tip and catch. The lizard's own glow warms the grey ash and the sooty hearth bricks behind; the room beyond is brown dark.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-14 · 녹철 불원숭이
도르마크의 심장불 · 유닛 · 레벨 3 · 일반 · 틀 `through` F L `magmadusk` · 프롬프트 n2 → `tools/art/inbox/B1-14.jpg`

```
Landscape 5:4 painting. Through a narrow notch between two rust-red boulders in the foreground we glimpse a wiry soot-dark monkey wedged deep in a crevice on the left, almost entirely hidden: one bright eye, a flattened crest of flame on its head, and a long arm cocked back with a red-hot pebble aimed straight at us. Three earlier stones lie cooling from orange to grey on the gravel just inside the gap. Dusk in the rusty hills, wine-dark and dim; the pebble and the pinched crest glow against the shadowed rock.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-16 · 잿너구리 폭파공
도르마크의 심장불 · 유닛 · 레벨 3 · 일반 · 틀 `macro` N C `brassglow` · 프롬프트 n2 → `tools/art/inbox/B1-16.jpg`

```
Landscape 5:4 painting. Extreme close-up of two soot-black raccoon paws at work on a workbench: long nimble fingers with small dark claws stretch a fuse cord along a stick cut with plain notches, a small knife already resting on the exact notch. A masked grey muzzle with singed whiskers and the tip of a ringed tail intrude at the top corner. Pushed aside behind the paws lies an abacus with its beads in a hopeless tangle, beside a bundle of charge sticks. A single oil lamp just out of frame throws warm amber light across the knuckles and the brass ferrule of the knife.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-17 · 포대 거북
도르마크의 심장불 · 유닛 · 레벨 3 · 일반 · 틀 `profile` R L `ashfall` · 프롬프트 n2 → `tools/art/inbox/B1-17.jpg`

```
Landscape 5:4 painting. Strict side view, flat as a diagram: on a firing ledge at the left stands a huge tortoise, facing right, its shell of cooled black lava split by glowing seams, a small smoking crater in the middle of its back. From that crater a glowing rock has been lobbed in a high smoke arc across the pale sky. Along the ground runs a row of white range-posts set out for the guns, and the rock is sailing far beyond the last of them toward the right edge. Even grey daylight under a high ash haze; the lobbed rock and the shell seams are the only warm notes.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-18 · 화약고 불개미
도르마크의 심장불 · 유닛 · 레벨 3 · 일반 · 틀 `cut` R B `ember` · 프롬프트 n2 → `tools/art/inbox/B1-18.jpg`

```
Landscape 5:4 painting. A cross-section through the ground: a thin strip along the top shows the plank floor of a powder store with sacks and crates stacked in a row; everything below is dark earth riddled with tunnels and chambers. Dog-sized ants with glossy red-black shells march rightward through them in tight columns, joints and mandibles glowing, one chamber stacked with eggs, another swept perfectly clean directly beneath the stores. Underground dark; the ants' own hot joints are the light, a moving chain of small orange points along each tunnel.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB1-3 · 나팔 산탄총
도르마크의 심장불 · 아이템 · 레벨 3 · 일반 · 틀 `top` R X `ashfall` · 프롬프트 n2 → `tools/art/inbox/IB1-3.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Laid out and seen from straight above on a square of grey oilcloth: a short, heavy blunderbuss lies on the diagonal with its trumpet-flared muzzle toward the upper right. Around it, neatly arranged, are its ramrod, a powder horn, a coil of slow-match with one end faintly smouldering, and a leather pouch that has spilled its mixed shot — iron balls, bent nails and pebbles — across the cloth. Flat pale daylight from a window out of frame; the smouldering match-end is the one orange point.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB1-4 · 포수의 망원경
도르마크의 심장불 · 아이템 · 레벨 3 · 일반 · 틀 `reflect` N L `magmadusk` · 프롬프트 n2 → `tools/art/inbox/IB1-4.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A brass spyglass, dented and wrapped in scorched leather, rests fully extended on a sandbag at the lip of a gun emplacement, set in the left of the frame and pointing away into the dusk. Its wide front lens, turned three-quarters toward us, holds a tiny, sharp, upside-down image of a distant fortified ridge, with one bright point of light exactly where the wall is cracked. Low orange dusk glints along the brass tube; the little image inside the lens is the brightest thing in the picture.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MC-16 · 불신의 포화
도르마크의 심장불 · 공용 마법 · 레벨 3 · 일반 · 틀 `top` N X `whitehot` · 프롬프트 n2 → `tools/art/inbox/MC-16.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Straight overhead above a dark field at the instant a barrage lands: a dozen small shell-bursts blossom all across the frame like white-hot flowers, each with its own ring of flung earth, and at the bottom edge two far larger bursts open side by side, their shock rings overlapping. Between the blasts the ground shows the faint grid of trampled paths and a few abandoned shields, tiny as coins. Night; every burst is its own light, yellow-white at the heart and crimson where the smoke begins.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B1-U1 · 용광로 화로령
도르마크의 심장불 · 유닛 · 레벨 3 · 일반 · 틀 `profile` R L `ember` · 프롬프트 n2 → `tools/art/inbox/PN-B1-U1.jpg`

```
Landscape 5:4 painting. In flat side view on a dark stone floor: at the left squats a pot-bellied iron brazier on three legs, a flame face peering out between its grate bars toward the right. A line of spilled black powder trails across the floor in front of it, and above that line one stray spark drifts down through the dark. The brazier has shot out a thin tongue of flame, frog-quick, to catch the spark in mid-air. Almost total dark; the coals behind the grate throw barred orange light across the floor and the powder grains.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### RB1-1 · 화약통 깔기
도르마크의 심장불 · 공용 마법 · 레벨 3 · 일반 · 틀 `cut` N B `magmadusk` · 프롬프트 n2 → `tools/art/inbox/RB1-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A cross-section of a trench line under a dusk sky: the cut earth shows three firing bays dug side by side in the lower half of the frame, and in each bay, where a defender should stand, sits a powder keg with its fuse lit. A single dented helmet rests on the parapet. Above the grass line, at the top edge, the tips of spears and the toes of many boots are arriving. Wine-red dusk above ground; down in the bays the three fuse-sparks light the kegs and the raw earth walls from below.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-21 · 불엄니 멧돼지
도르마크의 심장불 · 유닛 · 레벨 4 · 일반 · 틀 `tilt` L X `coldnight` · 프롬프트 n2 → `tools/art/inbox/B1-21.jpg`

```
Landscape 5:4 painting. The frame is tipped along a steep scree slope as a hulking boar hurtles down it from upper right to lower left, smouldering bristles flattened by speed, cinder hooves locked and skidding in a spray of gravel. The red-hot tips of its long tusks draw two glowing streaks through the dark air behind it. Dead ahead in the lower left corner waits a squat stone gatepost. Clear cold night with a blue half-moon behind the ridge; the tusk-streaks and sparks under the hooves are the only warm light.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-24 · 울버린 박격포수
도르마크의 심장불 · 유닛 · 레벨 4 · 일반 · 틀 `low` R B `ashfall` · 프롬프트 n2 → `tools/art/inbox/B1-24.jpg`

```
Landscape 5:4 painting. Down beside the baseplate of a stubby mortar, looking up: a stocky wolverine gunner in a scorched leather apron leans back at the lower left with a forepaw clamped over each small round ear, squinting skyward, the tube beside it still breathing smoke. High above, a curved line of smoke climbs over the top of a tall battlement wall toward the right, and at its very tip the shell is a small dark dot against the pale sky. Pale overcast afternoon; the last orange of the muzzle flash still glows inside the mortar's mouth.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB1-09 · 대포격
도르마크의 심장불 · 공격 마법 · 레벨 4 · 일반 · 틀 `transform` L X `ashfall` · 프롬프트 n2 → `tools/art/inbox/SB1-09.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One landscape, half changed: the left half of the frame is still a quiet meadow with a lane, a fence and a line of poplars; the right half is a grey moonscape of overlapping craters, splintered stumps and standing smoke. Between the two runs a wall of earth caught in mid-air, a whole line of shells bursting at once as the bombardment walks leftward across the land. Overcast and ash-pale; the row of bursts at the seam carries the only orange, lighting the smoke from inside.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-26 · 화관의 불거인
도르마크의 심장불 · 유닛 · 레벨 5 · 일반 · 틀 `far` R L `ember` · 프롬프트 n2 → `tools/art/inbox/B1-26.jpg`

```
Landscape 5:4 painting. Far off on a night mountainside, a man-shaped figure of half-cooled magma — black rock crust, fire leaking from every crack, tall enough to wade through the pines around his knees — stands small in the left third and faces right. Before him rises a colossal spire of dark rock shaped exactly like a single upright finger, knuckle creases and all, many times his height. He holds up his own burning hand beside it to compare. Moonless dark; his own cracks are the light, a small fierce glow that reaches only the base of the vast finger.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-27 · 폭렬 이프리트
도르마크의 심장불 · 유닛 · 레벨 5 · 일반 · 틀 `eye` L R `brassglow` · 프롬프트 n2 → `tools/art/inbox/B1-27.jpg`

```
Landscape 5:4 painting. At eye level inside a cluttered workshop: on the right a tall fire spirit — a muscular torso of roaring flame rising from a column of smoke, crowned with sparks — leans toward the whitewashed wall on the left and presses one burning palm flat against it. The wall is already crowded with black star-shaped soot bursts of every size. On the bench between, measuring scoops and open powder jars stand abandoned. The spirit's own flame is the lamp of the room, amber on brass tools and deep brown in the rafters.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B1-U2 · 도르마크의 불거미
도르마크의 심장불 · 유닛 · 레벨 5 · 일반 · 틀 `through` L R `magmadusk` · 프롬프트 n2 → `tools/art/inbox/PN-B1-U2.jpg`

```
Landscape 5:4 painting. Glowing threads of molten stone cross the near foreground like the strands of a harp, and through them we see the weaver in the right of the frame: a spider as big as a carriage, obsidian legs and a swollen magma abdomen, walking leftward along its web strung between two colossal curved pillars of rock that rise like ribs. Caught in the nearest strands, a bat and a bird have already cooled to grey stone. A cavern lit from below by a magma glow, violet-brown above; the fresh threads shine orange and dull to grey where they have set.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-30 · 용암 땅굴웜
도르마크의 심장불 · 유닛 · 레벨 6 · 일반 · 틀 `top` R T `ashfall` · 프롬프트 n2 → `tools/art/inbox/B1-30.jpg`

```
Landscape 5:4 painting. Straight down from high above a hillside of pale dry grass: a bare, blackened track as wide as a road meanders up through it from the bottom edge like a dead river, the grass along its banks withered grey. At the upper right the track ends where an enormous segmented worm arches out of the broken earth and back in, three glowing basalt coils showing, a cart on a nearby lane the size of a seed. High thin daylight, almost shadowless; the molten glow between the worm's rings is the single hot colour on the slope.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-32 · 탈라쿠스의 역청 괴물
도르마크의 심장불 · 유닛 · 레벨 6 · 일반 · 틀 `ground` B R `brassglow` · 프롬프트 n2 → `tools/art/inbox/B1-32.jpg`

```
Landscape 5:4 painting. The camera lies on the ground at the rim of a huge footprint filled with glossy black tar, an oily rainbow sheen sliding across it; a long-handled ladle and a half-filled bucket stand at its edge. A line of the same sticky prints leads away up the right side of the frame to their maker, already distant: a slumped, dripping hulk of bitumen shambling off with dull embers sunk in its back. A hooded lantern left by the bucket spreads amber light over the tar, which mirrors it like dark brass.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B1-C3 · 포격 폭탄벌레
도르마크의 심장불 · 유닛 · 레벨 6 · 일반 · 틀 `pov` F C `whitehot` · 프롬프트 n2 → `tools/art/inbox/PN-B1-C3.jpg`

```
Landscape 5:4 painting. First person, and in the worst place to stand: an ox-sized scorched-black beetle is seen from directly behind, wing-cases toward us, hind legs braced and abdomen hoisted high so that its nozzle points straight into the lens. A cone of boiling, burning spray is already bursting from it, the nearest droplets huge and blurred, while a second charge swells bright inside the abdomen plates. The spray itself is the light, white-yellow at its core and orange at the edges, throwing the beetle's legs into crimson shadow.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-34 · 화관 베히모스
도르마크의 심장불 · 유닛 · 레벨 7 · 일반 · 틀 `far` L T `magmadusk` · 프롬프트 n2 → `tools/art/inbox/B1-34.jpg`

```
Landscape 5:4 painting. Far across an ash plain, what looked like a mountain ridge is walking: a horned four-legged colossus whose back is a jagged volcanic crest, lava glowing in the cracks of its hide like distant campfires. It crosses the horizon from right to left, as tall as the range behind it. In the lower foreground a tiny cart road with a row of milestones lies in its shadow, already broken by one crater-sized footprint. The last red light behind the range turns the beast into a dark mass; its lava seams are the only warm points on the darkening plain.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B1-36 · 작렬의 사자왕
도르마크의 심장불 · 유닛 · 레벨 7 · 일반 · 틀 `front` F C `whitehot` · 프롬프트 n2 → `tools/art/inbox/B1-36.jpg`

```
Landscape 5:4 painting. Dead-on and symmetrical: a huge soot-black lion sits enthroned at the centre on a stepped pyramid of stacked iron bombs and brass shell casings, forepaws planted wide, jaws open in a roar straight at us. His mane is a great ruff of fuse cords, every strand lit and spitting sparks like candles on a cake, and a small iron crown rides the top of it. At the foot of the pyramid, tiny soot-furred attendants on both sides crouch with their paws over their ears. The ring of mane-sparks is the light, white-hot around his face and falling to deep crimson down the steps of the pyramid.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-01 · 리벳 일꾼
소르그림의 방패 · 유닛 · 레벨 1 · 일반 · 틀 `high` B L `lamplit` · 프롬프트 n2 → `tools/art/inbox/B2-01.jpg`

```
Landscape 5:4 painting. Looking down from a gantry onto the curved back-plate of an unfinished golem laid flat on trestles: at the left a small woodpecker with a beak of blued steel clings to the plate with its back to us, head drawn far back over the next rivet in a long gleaming row. A chalk line runs beside the row, and a chalk tick marks where yesterday's work ended, well short of today's. A bucket of cherry-red rivets steams beside its claws, and a pair of tiny tongs lies ready. A single hanging oil lamp pools warm light on the plate around it; the workshop beyond falls away into black, the hot rivets glowing small and red.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-02 · 톱니 태엽쥐
소르그림의 방패 · 유닛 · 레벨 1 · 일반 · 틀 `over` L X `snowlight` · 프롬프트 n2 → `tools/art/inbox/B2-02.jpg`

```
Landscape 5:4 painting. From just behind a palm-sized clockwork mouse, over its brass back and the big wind-up key still turning between its shoulders: it scurries leftward along a frosty window ledge that crosses the whole frame, gear-wheel teeth bared, glass-bead eyes fixed on what waits at the far left — a thick, calloused apprentice's forefinger, already wrapped in one linen bandage, held out and wavering. Tiny scratch marks and three dropped cog-teeth dot the ledge behind it, and snow presses against the panes. Flat white daylight through the snowed-up window, cool and even, with soft grey shadows and a clean glint on brass key and steel teeth.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-06 · 강철 문지기 갑옷
소르그림의 방패 · 유닛 · 레벨 1 · 일반 · 틀 `under` R R `patina` · 프롬프트 n2 → `tools/art/inbox/B2-06.jpg`

```
Landscape 5:4 painting. Up through the rusty bars of a drain grate set in a workshop doorstep: the iron slats stripe the foreground, and above them on the right a short, dented, empty suit of plate armour stoops, turned toward the right. Behind its visor slit there is only a faint ember glow. With two gauntlet fingers it lifts the tip of a visitor's long braided beard — the visitor is only boot soles and that beard entering from the right edge — and holds it up to the glow to inspect the braid clasp. Dim green-brown daylight from the doorway above; the rust-red ember inside the helm warms the beard tip and the edges of the grate bars.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MB-02 · 리벳 보강
소르그림의 방패 · 방어 마법 · 레벨 1 · 일반 · 틀 `transform` R X `mirror` · 프롬프트 n2 → `tools/art/inbox/MB-02.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A great curved armour plate fills the frame, caught half-mended: across its left half every seam is drawn tight under bright new rivets; across its right half the seams still gape, rivet holes stand empty and one panel hangs by a corner. The mending is travelling rightward — a stream of rivets flies in from the left edge, each one seating itself in the next empty hole with a small star of sparks, and just ahead of the stream the loose panel is already swinging flat. Old rivets, sheared in two, drop away from the mended seams. Polished new rivet heads flash bright silver in a cold beam from above; the unmended half stays dull grey, and the sparks are small white stars.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MB-08 · 장갑 고정
소르그림의 방패 · 방어 마법 · 레벨 1 · 일반 · 틀 `macro` N C `lamplit` · 프롬프트 n2 → `tools/art/inbox/MB-08.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The seam between two thick armour plates, enormously magnified, runs across the middle of the frame: a row of slotted screw heads sits along it, and all of them are turning the last quarter-turn at once, by themselves, thin curls of bright swarf lifting from each slot. The seam has closed to a hairline. Against it presses a thread of violet-black smoke — a curse hunting for a way in — which flattens, splays into searching fingers and slides off the steel like water off wax. Warm lamplight from the upper left rakes low across the plates, raising every screw slot and curl of swarf; the smoke absorbs it, dull violet-black.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-B2-1 · 강철 맹세
소르그림의 방패 · 방어 마법 · 레벨 1 · 일반 · 틀 `object` N B `patina` · 프롬프트 n2 → `tools/art/inbox/PS-B2-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A single steel gauntlet, closed in a fist, stands knuckles-down on a stone in the lower part of the frame where rusty run-off trickles from a culvert and across the stones. Everything else the water has touched is eaten orange and green — a chain, a row of nails, a fallen helmet flaking apart, a pick fused to its own hook. The red water parts around the gauntlet and rejoins beyond it; drops that land on its plates bead and roll away, and the steel is as clean and bright as the day it was made. Dim overcast light in a drainage cut; rust red and verdigris everywhere in half-dark, and one clear silver-grey gleam on the gauntlet.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-B2-2 · 담금질
소르그림의 방패 · 방어 마법 · 레벨 1 · 일반 · 틀 `cut` D C `forgeheart` · 프롬프트 n2 → `tools/art/inbox/PS-B2-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A cross-section through a stone quenching pool: the waterline cuts the frame in half. Chains are lowering a great kite-shaped slab of worked steel straight down through its centre. Above the surface the slab still glows soft orange and shows a thick rounded rim and a bulging middle. Below the surface the same metal has turned dark blue-grey and changed its shape as it hardens — the rim drawn out to a keen edge, the bulge pressed flat and dense. At the line itself the water boils white, and strings of bubbles climb the submerged half. Above the water, molten orange light on steam and chains; below, cold dark gunmetal water lit only by the boiling line and one pale edge.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB2-02 · 리벳 사출
소르그림의 방패 · 공격 마법 · 레벨 1 · 일반 · 틀 `ring` N C `mirror` · 프롬프트 n2 → `tools/art/inbox/SB2-02.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A mirror-polished round shield fills the frame face-on. Punched into it in a tight ring around the boss are eleven red-hot rivets, each driven up to its head, and around each one the bright steel has bloomed into concentric haloes of temper colour — straw, bronze, violet, blue — so the shield's face is a ring of ringed targets. A twelfth rivet is arriving at the top of the ring on a straight white thread of steam, a hand's width from the metal. Cracks join the earlier hits like wheel spokes, and the boss has begun to sag. The shield reflects a dark hall in silver-grey; the rivets glow orange at their cores and tint the steel around them, the steam thread is white.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB2-03 · 용접 수리
소르그림의 방패 · 공용 마법 · 레벨 1 · 일반 · 틀 `inside` U C `coldsteel` · 프롬프트 n2 → `tools/art/inbox/SB2-03.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Inside a cracked armour shell, looking out through the split: a jagged vertical crack runs up the middle of the frame, and through it we see a strip of battlefield — churned mud, a planted banner pole, falling arrows. A blinding white bead of weld is climbing the crack from the bottom, closing it like a seam being sewn; below the bead the steel is whole and cooling from yellow to red to grey, above it the gap still shows the fight. Sparks shower inward past us, and two arrowheads piercing the plate glow in the heat. The weld bead is the light, blue-white and fierce, throwing the inner rivets into sharp relief; a slit of grey daylight shows through the crack above it.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-09 · 증기 골렘
소르그림의 방패 · 유닛 · 레벨 2 · 일반 · 틀 `profile` R C `coldsteel` · 프롬프트 n2 → `tools/art/inbox/B2-09.jpg`

```
Landscape 5:4 painting. In flat side view on a loading ramp: a waist-high golem of riveted plate, with a pot-bellied boiler for a chest and a tin smokestack on one shoulder, has stopped dead in mid-stride toward the right, one square foot still lifted, a tall stack of iron ingots balanced in its arms. From its whistle the last thread of steam droops and thins like a sigh, and the glow in its seams has dimmed to a dull line. Just ahead of its raised toe waits a full coal scuttle with the shovel standing in it. Blue-grey evening light in an open shed, cool and shadowless; the last steam catches a pale highlight, and the boiler seams keep only a faint dying orange.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-12 · 단조 견습장인
소르그림의 방패 · 유닛 · 레벨 2 · 일반 · 틀 `macro` N C `forgeheart` · 프롬프트 n2 → `tools/art/inbox/B2-12.jpg`

```
Landscape 5:4 painting. Extreme close-up of two open ape palms held side by side in front of a bed of glowing coals: on the left the broad young hand of an apprentice, fringed with gunmetal-grey fur, on the right the larger, soot-grained hand of its old master. Each leathery palm carries the same ridge of yellow callus under the fingers and the same polished groove where a hammer haft sits; the young one's are still pink at the edges. A small plain hammer rests in the crook of the apprentice's thumb, and an iron ring gleams on its wrist. Coals behind push molten orange between the fingers and along the edges of both hands; a dim steel-grey light from the front shows the palms.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-41 · 폭주 태엽 인형
소르그림의 방패 · 유닛 · 레벨 2 · 일반 · 틀 `echo` R X `lamplit` · 프롬프트 n2 → `tools/art/inbox/B2-41.jpg`

```
Landscape 5:4 painting. One headlong run shown as four overlapping moments across the whole frame, left to right: the same knee-high brass doll with a round rivet-eyed head and an oversized wind-up key whirring in its back appears four times — sprinting, sprinting faster, arms flung out, and at the far right flat against a sheet-steel door with its key still spinning. The door already carries a neat row of doll-shaped dents at exactly that height. Shed cogs and one spring mark the floor along its track. A caged lamp above the door lights the right side warm amber; the earlier figures fade leftward into darkness with steel-grey glints on their keys.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB2-1 · 리벳 각인
소르그림의 방패 · 아이템 · 레벨 2 · 일반 · 틀 `used` N C `patina` · 프롬프트 n2 → `tools/art/inbox/IB2-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Above a rutted haul road a drag chain is stretched taut across the frame, from a mired ore wagon to a winch, and spliced into its middle, dead centre, are two overlapping slabs of old armour plate joined by a single rivet. Its broad domed head carries a small angular rune, one stroke crossed by two. Everything else in the line is giving way: chain links pulled long and thin, a hook straightening, the wagon's towing ring drawn into an oval. The riveted seam stays tight as a closed eyelid, rust and green stains weeping around it. Dim wet daylight at a mine mouth; red-brown rust and verdigris on plate and chain, and a dull steel shine on the rivet's rubbed dome.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB2-2 · 강철 장갑판
소르그림의 방패 · 아이템 · 레벨 2 · 일반 · 틀 `hung` N R `coldsteel` · 프롬프트 n2 → `tools/art/inbox/IB2-2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A single standard armour plate — a thick, gently curved rectangle of steel as long as a forearm, with a rolled edge and a row of rivet holes down each side — hangs on two short chains from an overhead rail at the right of a proving bay, backlit by a window. The oak beam that carries the rail bows visibly under the weight. The plate's face shows a tight cluster of shallow dimples, and on the flagstones beneath lies what made them: five crossbow bolts with their heads mashed flat. Identical plates wait racked in the shadows. Cold daylight from a high window behind the plate outlines its edges in crisp white; the face is blue-grey, each dimple holding a small slate shadow.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MB-06 · 방열 철벽
소르그림의 방패 · 방어 마법 · 레벨 2 · 일반 · 틀 `pov` F T `forgeheart` · 프롬프트 n2 → `tools/art/inbox/MB-06.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. First person, advancing across a frozen lake: along the far shore, across the upper part of the frame from end to end, stands a wall of tall iron plates planted edge to edge, each glowing from dull red at the foot to orange at the top, the air above it rippling. The ice has rotted back from it in a wide strip of open, steaming black water. Our own spear, thrust out ahead at the bottom of the frame, is glowing at the tip and beginning to droop like a candle, and the leather of our glove smokes. Grey dusk over the ice; the plate wall is the light source, pouring molten orange onto the steam, the black water and the sagging spear.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NB2-2 · 방패벽 함성
소르그림의 방패 · 방어 마법 · 레벨 2 · 일반 · 틀 `top` U C `snowlight` · 프롬프트 n2 → `tools/art/inbox/NB2-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from directly above on trampled snow: a line of shield tops and helmets runs across the frame from edge to edge, shoulder to shoulder. At its centre one shield, plainly thicker and broader than the rest, has moved a full pace ahead of the line toward the top of the picture, and the two bootprints behind it are fresh. The shout that sent it shows on the ground — loose snow has been blown forward in nested arcs fanning out from the whole line, all converging on that one broad back like a hand pushing. Flat white mountain daylight from directly above; the arcs in the snow show as faint blue-grey ridges, steel rims catching a dull sheen.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B2-C1 · 리벳 집게 게
소르그림의 방패 · 유닛 · 레벨 2 · 일반 · 틀 `cut` L L `patina` · 프롬프트 n2 → `tools/art/inbox/PN-B2-C1.jpg`

```
Landscape 5:4 painting. A rust-water pool below a spoil tip, shown in cross-section: the orange surface line runs across the upper frame, and the cut shows cloudy red-brown water over a bed of silt strewn with dropped rivets. On the left a broad crab with a riveted iron shell faces left and reaches one heavy tong-like pincer for another rivet; the other pincer is pressing one into its own shell with a twist. The shell is studded in careful straight rows, front to back, with a single gap left to fill. Dull daylight filters down through rusty water, red-brown and dim; the rivet heads on the shell hold small steel-grey glints, green-blue weed at the edges.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB2-06 · 압착 프레스
소르그림의 방패 · 공격 마법 · 레벨 2 · 일반 · 틀 `under` D C `patina` · 프롬프트 n2 → `tools/art/inbox/SB2-06.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Flat on the ground beneath it, looking straight up: the underside of a huge iron pressing plate fills almost the whole frame and is coming down. Its face is a grid of bolt heads, scabbed with rust and green stains and polished bare in the middle from years of flattening ingots. Daylight survives only as a narrowing band around its four edges, where the great screw-posts rise at the corners and chains run off toward a team hauling outside. A spear propped upright under the plate is bowing, and a helmet beside it is already half its height. A thin band of grey daylight around the plate's rim is the only light, grazing rust red and verdigris on the bolt heads as the dark closes.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-16 · 장갑 태엽거미
소르그림의 방패 · 유닛 · 레벨 3 · 일반 · 틀 `reflect` L C `lamplit` · 프롬프트 n2 → `tools/art/inbox/B2-16.jpg`

```
Landscape 5:4 painting. A long black puddle between mine-cart rails fills the centre of the frame, and in it, bright and sharp, hangs the reflection of what clings to the gallery roof above: a pony-sized clockwork spider sheathed in overlapping armour plates, its head toward the left, six spiked steel legs hooked into the rock while the front pair turn a roof bolt home. Its glass lens eyes glint. On the wet floor beside the puddle lie the things it has outlasted: a burnt-out lantern, a cold lunch pail and a folded blanket. A single miner's lamp left on a ledge at the right lights the roof warm amber; the puddle returns it as a clean bright image ringed by black water.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-17 · 무쇠뿔 산양
소르그림의 방패 · 유닛 · 레벨 3 · 일반 · 틀 `far` L R `coldsteel` · 프롬프트 n2 → `tools/art/inbox/B2-17.jpg`

```
Landscape 5:4 painting. From far across a gorge at dusk: a long rampart of grey stone climbs the mountain's spine from the left, tower after tower, and simply stops at a bare crag on the right of the frame, its last course of masonry butting against raw rock. On that crag, small and perfectly still, stands a shaggy grey mountain goat facing left along the wall, its huge curled horns of dark raw iron heavier than its head. Orange-brown ore veins streak the cliff beneath its hooves, licked to a shine at goat height. Blue-grey dusk under a clearing sky; the last cold light catches the iron horns and the licked ore in hard pale highlights against slate rock.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-18 · 증기 콧김 황소
소르그림의 방패 · 유닛 · 레벨 3 · 일반 · 틀 `profile` R L `lamplit` · 프롬프트 n2 → `tools/art/inbox/B2-18.jpg`

```
Landscape 5:4 painting. Flat as a frieze, a street of the underground city in side view: at the left a polished bronze bull with a round riveted boiler for a belly, one glowing firebox door in its flank and a brass valve between its horns stands facing right, head low. Twin jets of steam have just burst from its nostrils, and along the street ahead every hanging lantern swings away from it — the nearest flung almost level, the next half as far, the far ones only beginning to stir. A dropped loaf rolls along the cobbles. The swinging street lanterns throw small warm pools that slide over black stone; bronze flanks and steam catch amber, the vault overhead stays dark.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB2-4 · 오토마톤 심장
소르그림의 방패 · 아이템 · 레벨 3 · 일반 · 틀 `cut` N C `mirror` · 프롬프트 n2 → `tools/art/inbox/IB2-4.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A cutaway of a fist-sized drum of brass and steel, opened like a halved fruit, stands centred on a sheet of polished steel that doubles it in reflection. At its centre sits a sealed capsule of smoked glass holding one steady ember. Around the capsule turn three nested cages of fine gear wheels on spring arms, each ring able to give a little. The outermost ring has taken a blow: on one side its teeth are sheared and a spring is bent, the next ring has shifted a hair, and the capsule at the heart sits perfectly true. Bright silver-grey reflections on every gear tooth and on the mirror plate beneath; the ember adds one small warm point at the centre of a dark room.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB2-5 · 무쇠 방패
소르그림의 방패 · 아이템 · 레벨 3 · 일반 · 틀 `stand` U R `snowlight` · 프롬프트 n2 → `tools/art/inbox/IB2-5.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Planted upright on a timber post at the right, where a snow-covered stair reaches a mountain gate, stands a shield that used to be the palm of a giant machine's hand: a thick, cupped slab of dark iron taller than a door, the stubs of four finger knuckles along its top edge and a thumb joint at one side, old palm-creases showing as riveted seams. Fingers up, it faces down the stair like a hand raised to say halt. A grip of forged bar is bolted where the wrist was. Two spent arrows lie at the foot of the post. Flat white daylight under low cloud; the iron is granite grey with a pale steel sheen on the knuckle stubs, snow bright all around.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### M3-1 · 골렘의 룬
소르그림의 방패 · 아이템 · 레벨 3 · 일반 · 틀 `making` D C `forgeheart` · 프롬프트 n2 → `tools/art/inbox/M3-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Half made: a loaf-sized block of dark iron, a machine's heart, sits clamped in a screw-jig at the centre of a stone bench, and a single angular rune is being cut down into its top face. The left half of the mark is finished, a deep channel filled with molten orange light; the right half is only a scribed white line. A narrow chisel stands upright in the groove where the cutting stopped, its head mushroomed from blows, curls of bright iron around it. Beside the jig sits an uncut blank from the same bar, shrivelled to walnut size. The cut half of the rune glows molten orange and lights the chisel and the jig from below; the bench around is dark gunmetal.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-19 · 걸어 다니는 모루
소르그림의 방패 · 유닛 · 레벨 4 · 일반 · 틀 `tilt` F R `forgeheart` · 프롬프트 n2 → `tools/art/inbox/B2-19.jpg`

```
Landscape 5:4 painting. The frame lurches sideways with the rebound: a great soot-black anvil on four stubby iron legs barrels toward us from the right, its horn lowered like a snout, the hammer-scarred face on its back still glowing orange. The sledgehammer that struck it a heartbeat ago is flying back the way it came — head spinning end over end toward the upper left, the ash haft snapped in two — and a fan of sparks follows it. An empty tree-stump base stands behind it with four snapped bolts. The hot face and the sparks light the dark workshop from the right in molten orange; gunmetal shadows cover the floor and the far wall.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-22 · 쇠 먹는 불가사리
소르그림의 방패 · 유닛 · 레벨 4 · 일반 · 틀 `high` R B `lamplit` · 프롬프트 n2 → `tools/art/inbox/B2-22.jpg`

```
Landscape 5:4 painting. Down from a balcony into a narrow lane of the underground city: along both sides run plank doors, and each one shows a splintered round hole where its lock used to be, the hinges gone too, so that several hang askew. At the bottom of the frame the culprit ambles toward the right — a bear-sized beast with a bull's head, a short trunk-like snout and fur of bristling needles, its hide studded with half-sunk nail heads — chewing, the hasp of a padlock still sticking out of the corner of its mouth. Lamps in wall brackets leave small warm circles down the dark lane; the needle fur glints steel-grey wherever a circle touches it.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-24 · 철골 가고일
소르그림의 방패 · 유닛 · 레벨 4 · 일반 · 틀 `silhouette` R R `snowlight` · 프롬프트 n2 → `tools/art/inbox/B2-24.jpg`

```
Landscape 5:4 painting. Against a white snow-sky, a black shape crouches on the timber lintel of a mine mouth at the right of the frame, facing right: a gargoyle whose body is an open frame of iron girders, with folded bat wings of riveted sheet steel and a long hooked jaw. The sky shows straight through its hollow ribcage, and the wind is driving a stream of snow through the gaps between the ribs, bending into a long plume on the far side. Below, a small lantern-carrying figure walks out under it, collar up, taking it for carved stone. Overcast mountain daylight behind it, bright and flat; the gargoyle and the mine mouth are solid black, the blown snow a soft grey veil.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B2-C2 · 증기 굴착 두더지
소르그림의 방패 · 유닛 · 레벨 4 · 일반 · 틀 `back` B C `lamplit` · 프롬프트 n2 → `tools/art/inbox/PN-B2-C2.jpg`

```
Landscape 5:4 painting. From behind, at the mouth of a fresh round burrow bored into an ore face: deep in the tunnel the broad dark-furred rump and stub tail of a bulky mole recede from us, steel claws flinging grit back, and the hot steam of its breath rolls out along the roof toward the camera. At the rim of the burrow, entering from both sides of the frame, three pairs of frost-stiff mittened hands are held open to the warm draught. A tin of tea has been set on the burrow's lip to heat. One lantern on the ground glows warm amber through the steam; the surrounding rock is black with frost glints, the mole a dark shape in lit fog.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### RB2-1 · 공방 자폭 명령
소르그림의 방패 · 공용 마법 · 레벨 4 · 일반 · 틀 `before` N X `lamplit` · 프롬프트 n2 → `tools/art/inbox/RB2-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The held breath in a mine gallery: a rank of steel machines stands along the whole width of the frame, cropped at the shoulders so only their riveted chests and hanging hands show. In every chest, at the same instant, the furnace-heart has gone from orange to white, and hairline cracks are racing outward across each breastplate and up into the roof timbers. Dust begins to sift down, the lamps along the wall all swing the same way, and on the floor a brass command lever lies snapped off its post, its red wax seal broken. Small warm lamps along the gallery wall are being overpowered by the white hearts, which throw every rivet and roof prop into hard relief against black.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-25 · 공방 수호 골렘
소르그림의 방패 · 유닛 · 레벨 5 · 일반 · 틀 `front` F C `coldsteel` · 프롬프트 n2 → `tools/art/inbox/B2-25.jpg`

```
Landscape 5:4 painting. Dead-on and symmetrical at the end of a stone corridor: a golem of riveted steel plate stands square to us, so broad that its shoulders touch both walls and its bulk hides all but the curved rim of the round vault door behind it. Its square fists hang at its sides, each as big as an ore cart. Cobwebs run from its elbows to the door frame, grey dust lies deep on its feet, and across the dusty floor one fresh set of footprints comes halfway toward it, stops, and turns back. Cold grey light from a shaft behind the viewer falls evenly on its plates in blue-grey and white; two pale furnace points glow where its eyes sit.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-26 · 소르그림의 철갑 코뿔소
소르그림의 방패 · 유닛 · 레벨 5 · 일반 · 틀 `cut` L T `forgeheart` · 프롬프트 n2 → `tools/art/inbox/B2-26.jpg`

```
Landscape 5:4 painting. A mountain ridge cut open in cross-section: along the top of the frame, on the grass line, a massive rhinoceros armoured in overlapping dark-red iron plates walks toward the left, its horn of twisted iron lowered. Below it the cut rock fills two-thirds of the picture, and through it run thick cables of dark-red ore laid side by side like the sinews of a buried forearm. Directly under each planted foot the cables have bunched and tightened, glowing dull orange; where the rhino has already passed they lie slack and dark again. Pebbles hop along the surface. Dusk above the ridge, gunmetal and dim; the only warmth is the orange flex inside the ore cables, lighting the cut rock from within.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-27 · 두르크하임 근위장
소르그림의 방패 · 유닛 · 레벨 5 · 일반 · 틀 `close` L R `patina` · 프롬프트 n2 → `tools/art/inbox/B2-27.jpg`

```
Landscape 5:4 painting. Head and chest fill the right of the frame: a grizzled guardian lion-dog with one blunt horn on its brow looks off to the left, eyes narrowed under a dented helm, in rust-streaked plate. The picture is really its mane — an iron-grey fall of a dozen thick braids, and into every braid is plaited a keepsake of a blow it stopped: a snapped sword tip, a notched sliver of axe blade, a bent arrowhead, each brown or green with age. The newest shard, near its collar, is still bright. Behind its shoulder a slab of riveted gate stands shut. Dim grey light from an arrow slit on the left grazes the helm and the old blade shards, showing rust red and verdigris against steel grey.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-28 · 흐르는 수은
소르그림의 방패 · 유닛 · 레벨 5 · 일반 · 틀 `pov` F B `mirror` · 프롬프트 n2 → `tools/art/inbox/B2-28.jpg`

```
Landscape 5:4 painting. First person, looking down at our own heavy boots on the wet stone of a pump-room floor: a sledgehammer lies where we swung it, sunk in a cracked flagstone, and from every side bright beads of liquid metal are rolling back inward, joining into rivulets that race between our feet. In the lower part of the frame they have already pooled into one mirror-bright mass that swells up toward us in a smooth wave, knee-high and rising, and in its curved face our own warped reflection stares back — helmet, lamp and raised empty hands. Our helmet lamp is the only light; the liquid metal throws it back as hard silver glare, and the room around is black and grey.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-30 · 철골 산맥 와이번
소르그림의 방패 · 유닛 · 레벨 6 · 일반 · 틀 `ground` L T `snowlight` · 프롬프트 n2 → `tools/art/inbox/B2-30.jpg`

```
Landscape 5:4 painting. Camera on the ground among rust-red ore rubble on a bare ridge: across the upper part of the frame a huge wyvern sweeps past from right to left, barely a wing-beat above the rock, iron-scaled wings blotting half the sky, hind legs tucked tight against its belly. In passing it has hooked a boulder of ore from the outcrop with the steel barb of its tail and carries it off, all on the wing. A marmot, tiny beside one fallen scale as broad as a tabletop, flattens itself in the foreground stones. High overcast daylight, snow-white and even; the wyvern's underside is granite grey with rust streaks, its shadow a soft blur racing over the rubble.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-32 · 걷는 무쇠 성채
소르그림의 방패 · 유닛 · 레벨 6 · 일반 · 틀 `inside` F R `snowlight` · 프롬프트 n2 → `tools/art/inbox/B2-32.jpg`

```
Landscape 5:4 painting. From inside the dark gate tunnel of the underground city, looking out toward the daylight: the arch has been hacked far wider and taller than it was built — raw pale chisel scars, scaffolding and heaps of fresh rubble line both sides — and in the bright opening on the right the reason is coming in. A castle of stone battlements and iron plate walks toward us on four great piston legs, its corner turrets scraping the new arch and showering grit. Masons with barrows, ant-small by its feet, are still widening the far side. Snow-bright overcast daylight pours in through the gate behind the castle, turning it grey against white; the tunnel walls nearest us stay in shadow.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-43 · 자폭 오토마톤
소르그림의 방패 · 유닛 · 레벨 6 · 일반 · 틀 `top` N C `snowlight` · 프롬프트 n2 → `tools/art/inbox/B2-43.jpg`

```
Landscape 5:4 painting. Straight overhead on a snowfield where an army has drawn up: ranks of helmets and spear points make a tight grey pattern over the whole frame, except at the centre, where they bend away to leave a perfect empty circle of white. In the middle of the circle one tall brass-and-steel automaton stands alone, arms at its sides, a red core ticking behind the open gears of its chest and thawing a small dark ring in the snow. The only tracks inside the circle are its own. Every nearby helmet is turned toward it. Flat white daylight after snowfall, shadows short and soft; the red core is the single warm point in a field of white and steel grey.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-34 · 거대 증기 거상
소르그림의 방패 · 유닛 · 레벨 7 · 일반 · 틀 `tilt` R R `forgeheart` · 프롬프트 n2 → `tools/art/inbox/B2-34.jpg`

```
Landscape 5:4 painting. Tipped by the blast, the whole frame leans: at the right a steel colossus as tall as the cavern bends forward and breathes out toward the right, a furnace burning orange behind the grille of its chest. From vents along its jaw and shoulders a white flood of steam pours down and away, filling the chasm beside it to the brim. Cable-lift cars sway on their lines and vanish into the cloud one by one; on a ledge at its ankle, a row of miners the size of rivets hold their helmets on and lean into the gust. The chest furnace is the one strong light, molten orange through the grille and glowing inside the nearest steam; everything else is gunmetal and dim white.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-35 · 두르크하임 대장인
소르그림의 방패 · 유닛 · 레벨 7 · 일반 · 틀 `eye` R R `lamplit` · 프롬프트 n2 → `tools/art/inbox/B2-35.jpg`

```
Landscape 5:4 painting. At a visitor's eye level in a hall of finished golems: on the right an old grey elephant in a scarred leather apron, tusks capped in steel, stands facing right and presses the soot-black tip of his trunk against the breastplate of a steel giant whose head rises out of frame. Down the long rank behind him every golem carries the same small round soot mark on the same spot of its chest, at exactly the height his trunk can reach — dozens of them, shrinking into the dark. A lantern and a pot of soot sit at his feet. His lantern on the floor makes a small warm pool around his feet and the nearest golem's shins; the rank of golems fades to steel-grey glints in the black hall.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B2-36 · 청동 수호 거인
소르그림의 방패 · 유닛 · 레벨 7 · 일반 · 틀 `ground` R L `patina` · 프롬프트 n2 → `tools/art/inbox/B2-36.jpg`

```
Landscape 5:4 painting. Low on the flagstones of a mountain gate court: filling the left of the frame stands one colossal bronze foot, toes pointing right, the ankle above it crossed by a seam that glows faint orange and is pinned shut by a single nail whose head is as wide as a cartwheel. Green verdigris runs down from the nail like old tears. On the ground in front lies a litter of failed attempts — long pincers, a crowbar, a grappling hook, a toppled ladder — and every one has been dropped a good ten paces short. Dim overcast light in the court; the bronze is brown and green-blue with age, and the thin seam at the ankle is the only warm line.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-02 · 축전 견습생
케라운의 벼락 · 유닛 · 레벨 1 · 일반 · 틀 `far` B R `thunderhead` · 프롬프트 n2 → `tools/art/inbox/B3-02.jpg`

```
Landscape 5:4 painting. Far off on a storm-dark moor, a small lamb trudges away from us along a plank causeway in the right third of the frame. A carrying-yoke lies across its shoulders with a copper-banded flask of bottled lightning swinging at each end, and every lock of its charged wool stands straight out like a brush — the one lively detail in all that empty land. Ahead, the planks dwindle toward a single far lamp. Black cloud presses low over the moor; the two flasks cast the only glow, a small swaying pool of yellow on the wet planks.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-03 · 번개 반딧불 떼
케라운의 벼락 · 유닛 · 레벨 1 · 일반 · 틀 `close` L R `greensky` · 프롬프트 n2 → `tools/art/inbox/B3-03.jpg`

```
Landscape 5:4 painting. Tight close-up of a bent stalk of dry grass in the right of the frame, weighed down by five thumb-sized fireflies climbing leftward along it. Each swollen abdomen holds a crackling yellow spark that jumps to the next insect in a needle-fine arc, and their glassy wings stand half open. Behind them the rest of the swarm hangs out of focus, soft drifting dots above a cracked and faintly glowing seam in the ground. Flat yellow-green stormlight before the strike; the insects' own sparks are the sharpest points in the picture.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-04 · 정전기 요정
케라운의 벼락 · 유닛 · 레벨 1 · 일반 · 틀 `eye` L R `cobalt` · 프롬프트 n2 → `tools/art/inbox/B3-04.jpg`

```
Landscape 5:4 painting. Beside a heavy oak door at night, at eye level: on its brass doorknob, in the right of the frame, crouches a hand-sized sprite made of one crackling spark — spiky upright hair, flickering arc-wings, a wide mischievous grin turned to the left. From the left edge a bare fingertip reaches for the knob, and a thin jagged thread of light already bridges the last finger-width of air between them. A dark corridor; the sprite is the only lamp, throwing cobalt-blue shadows of knob and finger across the wood.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-06 · 새끼 뇌조
케라운의 벼락 · 유닛 · 레벨 1 · 일반 · 틀 `back` R L `cobalt` · 프롬프트 n2 → `tools/art/inbox/B3-06.jpg`

```
Landscape 5:4 painting. A newly hatched storm-bird chick, seen from just behind, perches at the left on the rim of a nest woven from glassy fulgurite twigs, its slate-grey down still damp and broken eggshell at its feet. It leans out to the right over a gulf of rolling black cloud and tries its stubby wings, and every feather tip spits a tiny spark into the wind. Far below, the cloud floor flickers from within. Night inside the storm; pulses of lightning deep in the cloud rim the chick's down in cobalt and pale yellow.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### HB3-1 · 예지
케라운의 벼락 · 핸드 마법 · 레벨 1 · 일반 · 틀 `before` N R `wetglass` · 프롬프트 n2 → `tools/art/inbox/HB3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The held breath before a strike: on a rain-wet windowsill in the right of the frame stands a small glass bell holding two leaves of gold foil, which have just sprung wide apart. Beyond the pane the sky is still whole, yet a faint ghost of the coming bolt already hangs there — a pale, spidery branching line from cloud to far hilltop. Every raindrop on the glass has stopped mid-slide. Even grey rain light; the gold leaves hold the one warm glint, repeated tiny in each stilled drop.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MB-03 · 축전 방출
케라운의 벼락 · 공용 마법 · 레벨 1 · 일반 · 틀 `pov` F L `cobalt` · 프롬프트 n2 → `tools/art/inbox/MB-03.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Straight at us: the open neck of a big glass jar, tipped on its side on a sandbag in the left of the frame, has become the muzzle of a gun. Its cork spins away past the edge of the picture, and out of the neck explodes a furious tangle of pent-up lightning, forking wider as it comes, three bright prongs already almost touching the viewer. Inside the glass the rest still boils and crowds toward the opening. Deep blue night; the burst is yellow-white with violet-edged coronas and lights the jar's glass from the inside.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MB-07 · 과부하 회로
케라운의 벼락 · 공격 마법 · 레벨 1 · 일반 · 틀 `path` R X `copperlab` · 프롬프트 n2 → `tools/art/inbox/MB-07.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from the side, a thick copper cable runs the whole width of the frame along a workshop wall, from a humming generator at the left to three sword blades clamped in a rack at the right. Every safety fuse along it has been pulled and hangs by its cord. A fat bulge of white current is travelling down the line: behind it the cloth insulation smokes and chars, ahead of it the three blades are starting to shine. Warm amber workshop gloom; the travelling surge glares yellow-white and drags a trail of lamp-lit smoke behind it.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NB3-2 · 운명의 동전
케라운의 벼락 · 공용 마법 · 레벨 1 · 일반 · 틀 `symbol` L C `copperlab` · 프롬프트 n2 → `tools/art/inbox/NB3-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. An emblem laid out on a dark slate tabletop: a brass spring-flipper with its arm just released, and above it a single coin hanging in mid-air, already turned face-up — a stamped sun — and held there by two thread-fine arcs from a pair of copper prongs. Beneath it a neat row of five more coins lies in a line pointing left, every one showing the same sun, linked rim to rim by tiny sparks. Warm lamplight from the left on brass and copper; the two arcs give the hanging coin a sharp yellow rim.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB3-01 · 정전기
케라운의 벼락 · 공격 마법 · 레벨 1 · 일반 · 틀 `object` L L `cobalt` · 프롬프트 n2 → `tools/art/inbox/SB3-01.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A small grey fur pelt hangs over a wooden rail in the left of the frame, every hair standing straight out like a startled cat, a rod of honey-coloured amber still resting where it was rubbed. From the bristling hair tips three tiny crooked sparks are jumping to the left, each to one of three iron buckles on a belt that hangs from a nail at the frame's edge. A dark room; the three sparks are the only light, pale yellow with blue fringes, just enough to show the fur's halo.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB3-02 · 피뢰침
케라운의 벼락 · 방어 마법 · 레벨 1 · 일반 · 틀 `cut` D R `thunderhead` · 프롬프트 n2 → `tools/art/inbox/SB3-02.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A cross-section of the ground under a storm. Above the surface, in the right of the frame, a single iron rod stands on a low rise, and a great bolt that was falling elsewhere has bent sideways in mid-sky to pour itself down it. Below the surface the earth is cut open: the rod's buried copper root carries the fire down and lets it fan out into the dark soil in fading branches, harmless among stones, roots and one sleeping mole. Black cloud above; the bent bolt is searing yellow, dimming to a faint glow as it spreads underground.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB3-03 · 충전 코일
케라운의 벼락 · 공용 마법 · 레벨 1 · 일반 · 틀 `swarm` N X `copperlab` · 프롬프트 n2 → `tools/art/inbox/SB3-03.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The whole frame is filled, edge to edge, with turn upon turn of bright copper wire wound tight around a great spool — hundreds of parallel lines like a ploughed field. A soft glow is rising inside the windings from the bottom of the picture upward, tiny sparks hop from one turn to the next, and a dusting of iron filings stands on end along the wire like fur. Two axe heads laid across the windings have begun to shine. Amber lamplight on the copper from the left; the charge adds a yellow shimmer that climbs turn by turn.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-09 · 전류 날다람쥐
케라운의 벼락 · 유닛 · 레벨 2 · 일반 · 틀 `silhouette` R R `wetglass` · 프롬프트 n2 → `tools/art/inbox/B3-09.jpg`

```
Landscape 5:4 painting. A flat black silhouette against a pale rain-grey sky: a flying squirrel in full glide, limbs flung wide, membranes stretched into a kite shape and tail streaming, crossing the right of the frame toward the right. Sagging wires hang across the sky in parallel rows, and the one it has just left has snapped — its two ends curl apart behind the animal, each spitting a small bright spark. Overcast daylight behind everything; the only colour is the yellow of the two sparks, doubled in the raindrops strung along the wires.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-10 · 피뢰침 까마귀
케라운의 벼락 · 유닛 · 레벨 2 · 일반 · 틀 `close` F R `wetglass` · 프롬프트 n2 → `tools/art/inbox/B3-10.jpg`

```
Landscape 5:4 painting. Tight on a black crow hunched in the rain, its head and breast filling the right half of the frame and its beak pointed straight at us. Blue-sheened feathers are beaded with water, and one unblinking eye holds a tiny reflected fork of lightning. Under its chest, twists of scavenged copper wire form the rim of a nest lashed around the base of a single upright metal spike that rises out of the top of the picture. Grey storm daylight, soft and wet; small yellow sparks creep along the spike and glint in every drop on the feathers.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-12 · 방전 요정
케라운의 벼락 · 유닛 · 레벨 2 · 일반 · 틀 `eye` B L `flash` · 프롬프트 n2 → `tools/art/inbox/B3-12.jpg`

```
Landscape 5:4 painting. A hand-sized sprite of pure spark hovers with its back to us in the left of the frame, arms thrown wide and spiky hair on end, at the very centre of a bursting star of arcs. The burst is burning a fresh black star into a laboratory wall that has been whitewashed many times — ghosts of older scorch-stars still show through the paint — while a ladder, a bucket and a wet brush stand abandoned beside it, all seen from a few steps away at eye level. The burst itself bleaches the wall white-yellow and throws hard black shadows of ladder and bucket off to the right.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### GN-B3-1 · 번개 바늘
케라운의 벼락 · 공격 마법 · 레벨 2 · 일반 · 틀 `macro` R C `copperlab` · 프롬프트 n2 → `tools/art/inbox/GN-B3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Extreme close-up of chain mail, each iron ring as big as a fist in the frame. One ring is rusted thin, and exactly through it passes a long copper needle travelling to the right, drawing behind it a thread of live lightning that has already stitched through a second weak ring further left. Around both punctures the links glow and begin to part. Warm amber gloom; the thread's yellow filament glare runs along the needle and beads on the oiled iron.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB3-1 · 구리 코일
케라운의 벼락 · 아이템 · 레벨 2 · 일반 · 틀 `top` N T `copperlab` · 프롬프트 n2 → `tools/art/inbox/IB3-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Laid out neatly and seen from straight above on a scorched leather work mat: in the upper part, a wrist coil — a snug spiral of bright copper wire, seven turns, riveted to a worn buckled strap with two brass contact studs. Below it lie the things that go with it: wire snips, a wooden winding peg, a few curled offcuts, a stub of beeswax. Across the mat run two old burn lines side by side, one hair-thin, one twice as fat. Warm lamplight from one side; copper and brass glow amber, and a last tiny yellow spark sits on one stud.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB3-2 · 축전 장갑
케라운의 벼락 · 아이템 · 레벨 2 · 일반 · 틀 `hung` N L `wetglass` · 프롬프트 n2 → `tools/art/inbox/IB3-2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A pair of heavy quilted gauntlets hangs by wooden pegs from a wire strung across a rainy yard, in the left of the frame, like washing put out to catch the storm. Copper threads are stitched across the knuckles and small brass studs dot the fingertips. The left glove has taken a charge and glows from inside, its fist a soft lantern; its twin beside it hangs dark, dripping and perfectly ordinary. Pale grey sky behind them; the lit glove's yellow shines through the wet leather seams and in the drops falling from the other.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MB-11 · 낙뢰 조준
케라운의 벼락 · 공격 마법 · 레벨 2 · 일반 · 틀 `top` N C `greensky` · 프롬프트 n2 → `tools/art/inbox/MB-11.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Directly overhead, looking down on a patch of dark ground ruled with chalk lines into a careful aiming grid. Exactly on the central cross lies a great star of fresh scorch, at its heart the melted stump of a huge two-handed axe. Just outside the grid's lower edge sits a second, much smaller scorch — right under a brass sighting tripod, one of whose three legs is quietly on fire. Flat yellow-green storm light; the big scorch still glows yellow in its cracks and the small flame on the tripod leg adds one warm point.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NB3-1 · 연쇄 번개
케라운의 벼락 · 공격 마법 · 레벨 2 · 일반 · 틀 `origin` B C `copperlab` · 프롬프트 n2 → `tools/art/inbox/NB3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. We look straight down the bolt's own path. Close in front, a round iron shield has a fist-wide hole burnt clean through its centre, the rim dripping molten yellow; through that hole we see a second shield further on with a smaller hole, and through that a third, where the last thin thread of lightning is just now arriving. The holes line up like the rings of a telescope, each dimmer than the one before. Coppery dusk-brown gloom; the molten rims are the light, brightest nearest us and fading down the tunnel of holes.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B3-C1 · 새끼 뇌수
케라운의 벼락 · 유닛 · 레벨 2 · 일반 · 틀 `through` R X `greensky` · 프롬프트 n2 → `tools/art/inbox/PN-B3-C1.jpg`

```
Landscape 5:4 painting. Seen through a ring of reaching arms: thick rubber gloves and coat sleeves push in from every edge of the frame toward a wicker basket padded with scorched rags. In it sits a wolf-and-weasel cub the size of a kitten, blue-white fur fizzing with harmless sparks, stubby zigzag tail upright, looking off to the right with complete calm. The loose threads on every sleeve stand straight out toward it. Yellow-green daylight under a brewing sky; the cub's fur is a soft lamp lighting the gloves from the middle.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-B3-2 · 전극 교환
케라운의 벼락 · 공용 마법 · 레벨 2 · 일반 · 틀 `under` R C `wetglass` · 프롬프트 n2 → `tools/art/inbox/PS-B3-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Lying beneath it all and looking straight up at a rain-grey sky: two heavy cables cross overhead in a great X. One ends in a brass clamp biting the head of a huge war hammer in the upper left, whose glow is draining away to dull iron; the other ends in a clamp on a little dagger in the lower right, which blazes brighter by the moment. Along the cables the light can be seen flowing from the one to the other, and raindrops fall toward us past it all. Soft grey daylight from above; the travelling current is a string of small yellow sparks, mirrored in the falling drops.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB3-04 · 전격 장막
케라운의 벼락 · 방어 마법 · 레벨 2 · 일반 · 틀 `through` N C `flash` · 프롬프트 n2 → `tools/art/inbox/SB3-04.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The view is framed like a doorway by a ragged breach in a thick city wall, and the gap is hung from top to bottom with a curtain of fine vertical lightning threads, swaying a little like strings of beads. Through its shimmer, on the far side, three dim shapes have stopped short, each with one arm half raised. On the rubble at the curtain's foot lie three dropped spears, their iron heads still fizzing. The curtain's white-yellow glare fills the breach and turns the wall's broken edges into hard black teeth.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB3-05 · 축전 방벽
케라운의 벼락 · 방어 마법 · 레벨 2 · 일반 · 틀 `after` D B `cobalt` · 프롬프트 n2 → `tools/art/inbox/SB3-05.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Aftermath at the foot of a barricade: a row of squat glass storage drums stands shoulder to shoulder across the top of the frame, a low steady fence of arcs humming from terminal to terminal. On the churned ground before them, in the lower part of the picture, lies a single dropped sword, still smoking — its tip blued by heat, its leather grip scorched with the dark print of four fingers — and beside it one empty gauntlet, fingers curled. Blue night; the arc fence gives a low yellow light with violet-white haloes, catching the sword's edge and the wisps of smoke.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB3-06 · 뇌운 소환
케라운의 벼락 · 공용 마법 · 레벨 2 · 일반 · 틀 `top` R L `thunderhead` · 프롬프트 n2 → `tools/art/inbox/SB3-06.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. High above the ground, looking straight down: a black, lightning-veined cloud slides across the left of the frame, towed by a cable drawn taut as a fishing line. The cable runs down to the right, to a great brass winch bolted to bare rock, its reel turning. All around the winch a cluster of small round umbrellas has just popped open, seen from above as a scatter of neat dark discs. Rain-grey daylight; the cloud's inner bolts flare searing yellow through its top, and the first drops streak the umbrellas.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-14 · 벼락 장어
케라운의 벼락 · 유닛 · 레벨 3 · 일반 · 틀 `under` L R `greensky` · 프롬프트 n2 → `tools/art/inbox/B3-14.jpg`

```
Landscape 5:4 painting. Looking up from the silty bed of a rust-stained river: a long dark eel slides leftward through the murk in the right of the frame, a row of glowing yellow organs running from gill to tail like a string of lamps. Flakes of rust drift around it. High above, the rippling surface shows the warped shape of a plank bridge and one bare foot held hesitating just over the water, toes curled back. Weak yellow-green daylight filters down through the rusty water; the eel's own stripes light the silt beneath its belly.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-15 · 사슬 번개 정령
케라운의 벼락 · 유닛 · 레벨 3 · 일반 · 틀 `echo` F B `cobalt` · 프롬프트 n2 → `tools/art/inbox/B3-15.jpg`

```
Landscape 5:4 painting. A heavy iron chain sags across the lower part of the frame in a dark hall, and a jagged little figure made of branching lightning is caught three times along it in a single exposure: a fading blue ghost on the first link, a brighter one on the second, and the blinding white-yellow body itself springing off the third toward us. Beneath that third link a pair of long insulated tongs is falling, just let go. Pitch dark; the figure's three bodies are the only light, and each link it has touched still wears a violet-white corona.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-16 · 충전 거미
케라운의 벼락 · 유닛 · 레벨 3 · 일반 · 틀 `swarm` B T `thunderhead` · 프롬프트 n2 → `tools/art/inbox/B3-16.jpg`

```
Landscape 5:4 painting. A web of copper-bright strands fills the whole frame from edge to edge, strung between riveted girders that cross the corners. Dozens of trapped beetles and moths hang in it like beads, and each one that struggles sends a pulse of yellow light running up its thread. All the pulses converge on the upper middle, where a large spider with copper-sheened legs sits with its back to us, drinking in the charge. Black storm sky behind the lattice; the web is its own light, brightest at the knots nearest the spider.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-18 · 안경원숭이 공학자
케라운의 벼락 · 유닛 · 레벨 3 · 일반 · 틀 `macro` F R `wetglass` · 프롬프트 n2 → `tools/art/inbox/B3-18.jpg`

```
Landscape 5:4 painting. A tarsier engineer's enormous amber eye, magnified again behind one brass goggle lens, fills the right half of the frame in extreme close-up and peers straight at us, fine fur curling over the rim. In front of the lens, sharp and enormous, two long slender fingers with round padded tips hold tweezers and thread a hair-thin copper wire between the teeth of a steel cogwheel. Out of focus behind: a cold mug and the head of a heavy smith's hammer. Grey dawn through a wet workshop window; one bead of solder glows yellow at the wire's end and twinkles in the lens.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-41 · 절연 방호기
케라운의 벼락 · 유닛 · 레벨 3 · 일반 · 틀 `back` R L `greensky` · 프롬프트 n2 → `tools/art/inbox/B3-41.jpg`

```
Landscape 5:4 painting. A squat walking machine wrapped in black rubber sheeting and studded with white porcelain knobs stands like a wall in the left of the frame, seen from its sheltered side with its back to us. Beyond it to the right, bolt after bolt forks down out of a sick green sky and bends away around its outline. In its lee the ground is dry and perfectly calm, and a stray dog lies there asleep. Flat yellow-green storm light; the strikes flare yellow on the far side and leave the machine's back in dull matt shadow.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB3-4 · 번개 병
케라운의 벼락 · 아이템 · 레벨 3 · 일반 · 틀 `motion` D R `flash` · 프롬프트 n2 → `tools/art/inbox/IB3-4.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Caught in the instant it meets the floor: a stoppered glass jar, dropped, strikes the flagstones in the right of the frame and opens like a flower — curved shards flying outward, the wax-sealed cork spinning up, a copper carrying-ring bouncing away. From the heart of the break the freed bolt bursts in every direction at once, brighter than it ever was behind glass. The burst bleaches the floor white-yellow and turns each flying shard into a hard black blade with a burning edge.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IB3-5 · 학술원 법전
케라운의 벼락 · 아이템 · 레벨 3 · 일반 · 틀 `through` U L `cobalt` · 프롬프트 n2 → `tools/art/inbox/IB3-5.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Glimpsed through the brass lattice of a locked book-cage in a dim library: a single massive volume lies closed on a slanted desk in the left of the frame, bound in scorched grey leather with copper corners and a heavy clasp, a grounding chain running from its spine to the floor. From between its pages a dozen slender forks of lightning stand up like bookmarks of light, licking the inside of the cage. Blue darkness; the little forks give a cold yellow-white light that picks out the lattice in silhouette.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-20 · 뇌침 전갈
케라운의 벼락 · 유닛 · 레벨 4 · 일반 · 틀 `eye` F B `thunderhead` · 프롬프트 n2 → `tools/art/inbox/B3-20.jpg`

```
Landscape 5:4 painting. Across a slab of rain-wet rock, at its own eye level, a dog-sized scorpion with a dark segmented shell faces us squarely from the lower part of the frame, claws spread and tail arched high over its back. At the tip a crackling ball of lightning is swelling, pulling loose threads of light up out of the puddles around its legs. Pinned under one claw lies a scorched sheet of drafting paper bearing a single inked curve in the shape of that tail. Black storm sky; the stinger's yellow glare lights the shell from above and lies doubled on the wet stone.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-22 · 전격 수호기
케라운의 벼락 · 유닛 · 레벨 4 · 일반 · 틀 `back` L C `cobalt` · 프롬프트 n2 → `tools/art/inbox/B3-22.jpg`

```
Landscape 5:4 painting. From behind a boxy guardian machine of riveted steel and copper coils, squatting on the parapet above a city gate: its coil-crowned back fills the middle of the frame, porcelain insulators gleaming. Past its left flank we look down a night road where a short file of travellers approaches, tiny and dim — except that every buckle, blade and wheel rim among them is picked out by a small trembling spark. Deep blue night; the machine's coils hum with a yellow glow that reaches down the road only where it finds metal.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-23 · 병 속의 교수 두뇌
케라운의 벼락 · 유닛 · 레벨 4 · 일반 · 틀 `over` B R `copperlab` · 프롬프트 n2 → `tools/art/inbox/B3-23.jpg`

```
Landscape 5:4 painting. Over the shoulder of a glass jar on spindly brass legs, standing at a lectern in the right foreground: inside, a wrinkled brain floats in glowing fluid, copper wires trailing from it like a wig. Beyond the jar, tiers of wooden benches climb into shadow, filled with small slumped students. A single thin arc leaps from the jar's lid across the hall to the back row, where one sleeper has just shot upright, hair on end. Amber lecture-hall lamps and the jar's own yellow fluid; the arc draws one sharp bright line through the brown gloom.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-24 · 섬광 나방
케라운의 벼락 · 유닛 · 레벨 4 · 일반 · 틀 `pov` F L `flash` · 프롬프트 n2 → `tools/art/inbox/B3-24.jpg`

```
Landscape 5:4 painting. Through a brass-rimmed magnifying glass that our own gloved hand holds up in the left of the frame, a large moth clings to a soot-dark wall with its wings just snapping open. The two eye-spots on those dusty wings are bursting into blinding white-yellow, bleaching the lens, the glove and the wall, and the first hard black shadows are already flying outward. Dust shaken from the wings hangs sparkling in the glare. The moth's flash is the whole light of the scene, overexposing its centre and leaving only the edges of things dark.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### GN-B3-2 · 뇌명 포격
케라운의 벼락 · 공격 마법 · 레벨 4 · 일반 · 틀 `impact` D L `flash` · 프롬프트 n2 → `tools/art/inbox/GN-B3-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The instant of impact, close up: a bolt as thick as a tree trunk slams down in the left of the frame onto an iron-plated war cart at the head of a column, which is already bursting into white splinters. From the strike point crawling arcs fan out along the soaked ground, racing away under a receding line of boots and spear-butts and climbing each one in turn. Mud and steam jump up in a ring. Everything is bleached white-yellow by the strike, with the boots and spear shafts cut out as hard black shapes.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B3-C2 · 폭주 축전기
케라운의 벼락 · 유닛 · 레벨 4 · 일반 · 틀 `ground` L L `flash` · 프롬프트 n2 → `tools/art/inbox/PN-B3-C2.jpg`

```
Landscape 5:4 painting. A glass drum on six spindly brass legs, crammed so full of lightning that it bulges white, scrabbles toward the left across the left of the frame, seen by a camera lying on the cobbles of a lane. Popped rivets and a snapped copper hoop litter the foreground stones. Hairline cracks craze the glass, its last hoops strain, and stray arcs whip from the terminal knobs down to the ground at every stride. The drum's glare bleaches the lane white-yellow and throws the legs' black shadows long across the cobbles toward us.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### RB3-1 · 케라운 대방전
케라운의 벼락 · 공용 마법 · 레벨 4 · 일반 · 틀 `far` U X `flash` · 프롬프트 n2 → `tools/art/inbox/RB3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The whole plateau is seen at once from a far ridge at night, and all of it is alight: a vast branching tree of lightning lies flat across the land from edge to edge of the frame, every branch a glowing seam in the ground, and from each seam short bolts leap upward into the cloud ceiling like grass in wind. The chimneys and spires of a small city are thin black hairs against the glare, and the ground itself seems to flinch. The land's own white-yellow glare lights the cloud base from below and blacks out everything standing on it.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SB3-09 · 벼락 폭풍
케라운의 벼락 · 공용 마법 · 레벨 4 · 일반 · 틀 `swarm` D X `cobalt` · 프롬프트 n2 → `tools/art/inbox/SB3-09.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. It is raining lightning. The whole frame is filled with hundreds of short thin bolts falling on a slant like a downpour, over a street of steep roofs and the tents of a siege camp beyond the wall. Where real rain would splash, each bolt bursts into a little crown of sparks — on the cobbles, on the roof slates, on the tent poles — and the gutters run with liquid light toward us. Night; countless yellow-white strokes with violet edges light the street from every side at once.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-25 · 케라운의 번개 정령
케라운의 벼락 · 유닛 · 레벨 5 · 일반 · 틀 `top` R C `wetglass` · 프롬프트 n2 → `tools/art/inbox/B3-25.jpg`

```
Landscape 5:4 painting. Straight down from above, like a map: wet flagstones laid out with a neat grid of a hundred brass compasses, each a plain glass-faced disc with a single needle. Through the middle strides a jagged man-shaped figure of branching lightning with a blinding core, moving toward the right and trailing forked afterglow. Every needle near it has swung to point at it; those it has already passed are spinning in blurred circles. Rainy night; the figure throws hard yellow light outward across the stones, and each compass glass doubles it as a tiny spark.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-26 · 뇌전 박사
케라운의 벼락 · 유닛 · 레벨 5 · 일반 · 틀 `close` R X `copperlab` · 프롬프트 n2 → `tools/art/inbox/B3-26.jpg`

```
Landscape 5:4 painting. An elderly giant salamander scholar, broad flat head and tiny bright eyes, holds one bare foreleg up across the whole width of the frame like a certificate, in a tight close-up. Branching fern-like lightning scars run from the stubby fingertips over the leg, up the thick neck and across the smooth wet crown, each faintly lit from inside. The wide face, turned three-quarters to the right, wears the calm pride of someone showing a diploma; cracked brass goggles are pushed up on the forehead. A warm amber study lamp from the left; the scars carry their own thin yellow light along the damp skin.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-27 · 대형 축전기
케라운의 벼락 · 유닛 · 레벨 5 · 일반 · 틀 `far` B R `greensky` · 프롬프트 n2 → `tools/art/inbox/B3-27.jpg`

```
Landscape 5:4 painting. Deep under a city a vaulted brick cavern opens out, and far away at its right end stands a single glass drum the height of a grain silo, banded with copper hoops and brimming with slow-coiling light. A narrow catwalk leads away from us across the dark toward it, and on it two tiny figures creep forward on tiptoe with a shuttered lantern, its little flame leaning toward the glass. Fine threads of spark stray from the terminals to the nearest hoops. The drum's sour yellow-green glow is the only light in the vault, laying faint highlights on wet brick and the catwalk rail.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B3-U2 · 뇌명 고원의 뇌조
케라운의 벼락 · 유닛 · 레벨 5 · 일반 · 틀 `tilt` L X `thunderhead` · 프롬프트 n2 → `tools/art/inbox/PN-B3-U2.jpg`

```
Landscape 5:4 painting. The horizon tips steeply as a great slate-grey storm bird launches itself from a boulder, wings flung across the whole width of the frame, lightning-tipped plumes streaking, beak and arc-lamp eyes aimed to the left. The boulder it has just left is already taking a bolt. Down the tilted slope behind, every earlier perch is a scorched rock with a surveyor's wooden stake and a strip of rag hammered in beside it. Black thunderhead; the fresh strike lights the bird's underwings yellow from below and behind.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-31 · 전격 요새
케라운의 벼락 · 유닛 · 레벨 6 · 일반 · 틀 `through` N B `wetglass` · 프롬프트 n2 → `tools/art/inbox/B3-31.jpg`

```
Landscape 5:4 painting. Between two leaning iron pylons in the foreground a fence of live lightning is strung in five sagging, spitting strands, and we look through it. Beyond, low in the frame, squats a windowless fort of riveted plate and lattice turrets, its only wall this ring of arcs marching away around it. On our side of the fence every thistle head and grass blade stands stiffly on end, leaning toward the wire. Wet grey dusk; the fence strands burn yellow and lay trembling reflections on the puddled track that leads to the fort.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-32 · 천둥 폭풍 거인
케라운의 벼락 · 유닛 · 레벨 6 · 일반 · 틀 `profile` R R `flash` · 프롬프트 n2 → `tools/art/inbox/B3-32.jpg`

```
Landscape 5:4 painting. In strict side view, flat as a carved frieze, a giant of blue stone and storm cloud strides to the right across a treeless moor, filling the right two-thirds of the frame from ground to sky. Lightning runs in its limbs like veins and cloud boils off its shoulders. Under its leading heel a bolt has just struck, and behind it a row of earlier bolts still stands in each footprint. An old stone watchtower reaches only to its shin. The newest strike bleaches the ground white-yellow and cuts the giant's legs into hard dark shapes against it.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-B3-C3 · 절연 갑주 기관
케라운의 벼락 · 유닛 · 레벨 6 · 일반 · 틀 `profile` R L `wetglass` · 프롬프트 n2 → `tools/art/inbox/PN-B3-C3.jpg`

```
Landscape 5:4 painting. Seen exactly side-on, like a figure on a wall relief, a massive walking engine plods to the right in the left half of the frame, its body wrapped in overlapping skirts of black rubber and thick green glass plates. Along its flank a whole row of snapped sword blades and spearheads stands embedded, every one sunk to the same shallow depth, and a fork of lightning splashing against the same flank spreads out flat and runs off in harmless rivulets. Pale grey rain light; the glass plates hold cool reflections, and the spent bolt leaves small yellow sparks hopping in the puddles.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### B3-33 · 볼타리움 학장
케라운의 벼락 · 유닛 · 레벨 7 · 일반 · 틀 `tilt` U C `cobalt` · 프롬프트 n2 → `tools/art/inbox/B3-33.jpg`

```
Landscape 5:4 painting. The frame pitches steeply: on the swaying needle-tip of the highest tower, in the centre, an old white crane with a few singed plumes balances on one leg, the other foot hooked around the rod, wings half open against the gale, and thrusts an open glass bottle up at the sky in its long beak. Feathers and a scholar's ribbon whip sideways. Above, the whole storm bends toward that little bottle, its lightning coiling into one long serpentine shape with the hint of a dragon's horned head. Deep blue storm night; the coiling lightning overhead is the light, rimming the crane and the bottle in yellow-white.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-01 · 결투장의 어린 들소
고르바스의 발톱 · 유닛 · 레벨 1 · 일반 · 틀 `top` R L `firelit` · 프롬프트 n2 → `tools/art/inbox/G1-01.jpg`

```
Landscape 5:4 painting. Straight overhead: a round duel ring of trampled clay fenced with crooked stakes, a single fire-bowl burning at its centre so that every stake throws a long shadow outward like a spoke. At the left edge a young bison calf — thin legs, a hump only beginning, horns still two short buds — has its forehooves inside the gate gap and its hind hooves still outside. Behind it runs a line of small hoofprints; ahead, clay churned by much larger hooves. Night; the fire-bowl is the only light, warming the clay ochre and stretching the calf's shadow back out through the gate.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-04 · 어린 하이에나
고르바스의 발톱 · 유닛 · 레벨 1 · 일반 · 틀 `inside` F L `ochredust` · 프롬프트 n2 → `tools/art/inbox/G1-04.jpg`

```
Landscape 5:4 painting. From deep inside an earthen den, looking out through its round mouth set left of centre: a hyena pup stands in the daylight outside, facing in, with a thigh bone as big as its own head clamped crosswise in its jaws — far too wide for the hole, jammed against both sides of the entrance. One round ear is freshly nicked, the spotted fur is dusty, and the eyes above the bone are bright with a giggle. Dark roots and packed earth fill the right of the frame. Sunlit dust haze glares outside the den mouth and spills a soft ochre wedge onto the tunnel floor.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-05 · 초원 하이에나
고르바스의 발톱 · 유닛 · 레벨 1 · 일반 · 틀 `profile` R X `redearth` · 프롬프트 n2 → `tools/art/inbox/G1-05.jpg`

```
Landscape 5:4 painting. Strict side view, flat as a frieze: three spotted hyenas pace in single file from left to right along the outside of a fence of rough stakes, high shoulders sloping to low hips, heads carried low. Between the stakes behind them only dust and the stamping legs of a crowd can be seen. The last hyena has its nose pushed between two stakes; the first has stopped in mid-step, one paw raised, round ears turned toward the noise. Slate storm light before rain, flat and shadowless, with red clay dust hanging at knee height.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-G1-1 · 승전의 함성
고르바스의 발톱 · 공격 마법 · 레벨 1 · 일반 · 틀 `object` L L `ochredust` · 프롬프트 n2 → `tools/art/inbox/PS-G1-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A rough stone rampart at the left of the frame is coming apart by itself, course by course: its top edge has already dropped into a ragged staircase, and loose stones are still hopping off each step and rolling into the grass, small puffs of dust marking where the last ones landed. Far off to the right, tiny in the battlefield haze, a handful of figures stand with heads thrown back and fists raised toward it. Clearing sky after the fight; warm hazy sun from the right lights the settling dust and the pale faces of the stones.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG1-01 · 사냥감 몰이
고르바스의 발톱 · 공용 마법 · 레벨 1 · 일반 · 틀 `through` F C `stormslate` · 프롬프트 n2 → `tools/art/inbox/SG1-01.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Between two leaning boulders, from the end where the hunt is waiting, a narrowing gap frames a herd of steppe antelope squeezed into a stone funnel. The drive has sorted them: at the very front, alone in the gap and nearest to us, comes the thinnest one, limping, eyes wide, while the stronger animals are packed behind it shoulder to shoulder. Along the tops of the boulders run the pricked ears of wolves, keeping pace. Grey storm daylight from behind the herd; grit hangs in the gap and the lead animal is rimmed in pale dust.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG1-02 · 숨통 끊기
고르바스의 발톱 · 방어 마법 · 레벨 1 · 일반 · 틀 `far` L X `redearth` · 프롬프트 n2 → `tools/art/inbox/SG1-02.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Small with distance, on a slope of red clay, a beaten line is trying to leave the field: a dozen figures strung out across the frame, climbing toward the left, each one staggering, leaning on a spear or on a neighbour. Directly behind every one of them a single low grey shape has risen from the grass and matched its pace — one pursuer to each, close enough to touch. The lowest pair on the slope has already stopped. Slate storm light, flat and cold, with rust-red dust smoking off the slope behind the climbing line.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG1-04 · 사냥감 표식
고르바스의 발톱 · 공용 마법 · 레벨 1 · 일반 · 틀 `symbol` N R `firelit` · 프롬프트 n2 → `tools/art/inbox/SG1-04.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. An emblem laid out in the dirt: at the right of the frame a dented enemy helmet sits on a short stake, and down the middle of its brow runs one thick thumb-drawn stripe of wet ochre clay, still dripping. At the foot of the stake stand a small clay paint pot and a tallow lamp. All around, just beyond the lamp's reach, pairs of eyes shine in the dark, every pair turned toward the stripe. The single tallow flame lights the helmet and the wet stripe warm ochre and puts a point of light in each waiting eye.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-08 · 돌발톱 가고일
고르바스의 발톱 · 유닛 · 레벨 2 · 일반 · 틀 `back` B T `bonemoon` · 프롬프트 n2 → `tools/art/inbox/G1-08.jpg`

```
Landscape 5:4 painting. Seen from behind, high on a cliff ledge in the upper half of the frame: a row of weathered grey boulders, and the middle one has shoulders. A hunter's spear, waterskin and bedroll have been propped against it for the night. Now two stone wings are lifting off its back, cracking a skin of lichen and spilling pebbles over the gear, and hooked stone talons flex on the ledge. Far below, past its folded haunches, lie the dark plain and a pale bend of river. A full moon from the upper left paints the granite bone-white; the land below is grey-blue dark.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-10 · 돌엄니 멧돼지
고르바스의 발톱 · 유닛 · 레벨 2 · 일반 · 틀 `through` R R `stormslate` · 프롬프트 n2 → `tools/art/inbox/G1-10.jpg`

```
Landscape 5:4 painting. Through a ragged hole torn in a windbreak of woven branches: beyond it a heavy boar, mud-caked, dark bristles up, stone-grey tusks low, is already twenty paces on and still running toward the right edge, small in the right of the opening. From the hole to its heels runs one straight, deep furrow of turned earth, clods still in the air, as neat as a ploughed row across the pale grass. Slate-grey storm light from a low sky; wind drives grit and torn grass sideways through the hole.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-11 · 흑요 창잡이
고르바스의 발톱 · 유닛 · 레벨 2 · 일반 · 틀 `through` F C `firelit` · 프롬프트 n2 → `tools/art/inbox/G1-11.jpg`

```
Landscape 5:4 painting. A mongoose spearman sits cross-legged just inside the triangular door of a hide tent, glimpsed from outside in the dark, lashing a jagged shard of black obsidian to its spear shaft. One end of the wet sinew is clamped in its small sharp teeth, the other wound tight by quick clawed fingers, and its long tail lies curled around its feet. The shard's broken edge catches the light like black glass, and chips of obsidian and two rejected points lie on a scrap of hide at its knees. One small tallow flame inside the tent lights its paws and jaw from below; the tent flaps are dark frames on both sides.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-12 · 돌팔매 어린 거인
고르바스의 발톱 · 유닛 · 레벨 2 · 일반 · 틀 `echo` L R `stormslate` · 프롬프트 n2 → `tools/art/inbox/G1-12.jpg`

```
Landscape 5:4 painting. A stumpy young giant of cracked boulders, saplings and grass tufts sprouting from its shoulders, stands at the right and hurls a rock toward the left. Its throwing arm appears four times in one sweeping arc — cocked back, overhead, forward, flung open — each earlier arm fainter, like a trail of dust. The rock, the size of a cart, has just left the last hand. Behind the giant a hill stands unmoved, with two giant handprints pressed into its side. Slate-grey storm sky and flat cold light; grit streams off the arm at each of its four positions.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-41 · 방패 든 오우거
고르바스의 발톱 · 유닛 · 레벨 2 · 일반 · 틀 `under` F T `stormslate` · 프롬프트 n2 → `tools/art/inbox/G1-41.jpg`

```
Landscape 5:4 painting. From underneath, looking up: the pale ribbed inside of a giant marsh-turtle shell fills the upper frame like a roof, held overhead by one thick grey-ochre arm. Beneath it the ogre's heavy-browed face looks down at us, patient, and pressed against his pot belly three small war-painted youngsters peer up from under the rim. Arrow shafts and slingstones clatter off the outside and drop past the edge of the shell. Grey storm daylight leaks in around the shell's rim; the faces beneath are lit softly by light bouncing off the pale ground.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### I2-2 · 송곳니 광전 도끼
고르바스의 발톱 · 아이템 · 레벨 2 · 일반 · 틀 `used` D L `stormslate` · 프롬프트 n2 → `tools/art/inbox/I2-2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A rough double-bladed axe stands buried where its one blow landed, at the left of the frame: both crescent blades of dark chipped iron, lashed with rawhide to a haft as thick as a wrist, have gone clean through a tall enemy shield and on into the hard-packed earth beneath, splitting the shield from rim to boss. The haft still trembles, two wolf fangs swinging from it on a cord. In the grass behind lies the wielder's own small round shield, face down, thrown aside unscratched. Slate storm light from above; wind drives grit across the blades and into the fresh split of the shield.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG1-1 · 사냥꾼 발톱
고르바스의 발톱 · 아이템 · 레벨 2 · 일반 · 틀 `pair` N R `firelit` · 프롬프트 n2 → `tools/art/inbox/IG1-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. On a flat stone lies a hunter's hand strap, set right of centre — a band of dark rawhide cut to cross the back of a hand, with one long curved claw stitched to it in thick sinew, polished by wear, its tip chipped. Laid out next to it on the stone, in order, are the bleached toe bones of a great bear's paw: four still end in their claws, the fifth ends bare. A bone needle threaded with sinew rests between the two. One small fire just out of frame on the left warms the rawhide and bone ochre and throws long soft shadows across the stone.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### M2-1 · 송곳니 문신
고르바스의 발톱 · 아이템 · 레벨 2 · 일반 · 틀 `hand` R R `bonemoon` · 프롬프트 n2 → `tools/art/inbox/M2-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. One broad tawny forepaw, cropped at the wrist, rests claws-forward at the right of the frame on a crumpled steel breastplate. Across the shaved skin above its four toes runs a fresh tattoo of interlocking fangs in soot-black line, the skin around it still raised and smeared with ash. The paw points toward the right; under it the breastplate is torn open in four parallel rips that match the claws exactly. A bone tattooing needle lies beside it on the metal. Cold moonlight from above gives the steel and the claws a bone-white edge; the tattoo lines stay deep black.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MG-04 · 원한의 일격
고르바스의 발톱 · 공격 마법 · 레벨 2 · 일반 · 틀 `far` D T `bonemoon` · 프롬프트 n2 → `tools/art/inbox/MG-04.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Across a moonlit plain, small with distance, stands a row of low burial mounds, each marked with a weapon planted upright. From the top of every mound a thin stream of dust is rising and bending through the air toward one point high in the frame, where the streams knot together into a single enormous fist of packed earth and stone, knuckles down, hanging over the open ground beyond the last mound. The fist is one stream from finished, and already tilting to fall. Cold moonlight from the right whitens the mounds and the dust streams; the underside of the fist is dark ochre.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MG-05 · 대지 진동
고르바스의 발톱 · 공격 마법 · 레벨 2 · 일반 · 틀 `cut` R X `ochredust` · 프롬프트 n2 → `tools/art/inbox/MG-05.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A slice through the earth, across the whole frame. On the surface at the far left, a row of heavy bare feet comes down together, seen only to the shin. Beneath them the layers of clay and gravel carry the blow to the right as a wave that grows as it travels — a faint ripple under the feet, a rolling swell in the middle, and at the far right a heave that splits the turf, where a line of boots staggers and spears tip against one another. Hazy sunlit dust above the surface; below it the earth layers show in bands of matte ochre and sandstone brown.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MG-13 · 뼈 부수기
고르바스의 발톱 · 공격 마법 · 레벨 2 · 일반 · 틀 `transform` L C `strawgold` · 프롬프트 n2 → `tools/art/inbox/MG-13.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A great bleached skull of a horned steppe beast sits on a flat boulder in dry grass, caught halfway through a blow that comes from the right: its right half is still whole — smooth brow, one long horn, a dark eye socket — while its left half has already burst into chalk-white splinters and powder streaming away to the left. Between the two halves the air holds the faint shape of a huge fist made of dust. Buckled armour plates lie cast off in the grass below. Late-afternoon sun from the right; the flying bone dust glows pale straw and every splinter throws a long umber shadow.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-13 · 자갈 코카트리스
고르바스의 발톱 · 유닛 · 레벨 3 · 일반 · 틀 `front` F B `ochredust` · 프롬프트 n2 → `tools/art/inbox/G1-13.jpg`

```
Landscape 5:4 painting. Dead-on and symmetrical: a rooster-headed beast sits low in the frame on a nest of twigs, stiff grey wings half spread, stone comb upright, both round eyes glaring straight at us while a scaly serpent tail coils around the eggs. Around the nest lies a perfect circle of grey gravel. At its rim things are caught in mid-change — a grass tuft whose near half is pebbles, a lizard of small stones, a dropped feather crumbling to grit. Hazy midday sun through dust, soft and shadowless, with ochre grassland glowing beyond the grey circle.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-15 · 흑요 발톱 바실리스크
고르바스의 발톱 · 유닛 · 레벨 3 · 일반 · 틀 `ground` R T `strawgold` · 프롬프트 n2 → `tools/art/inbox/G1-15.jpg`

```
Landscape 5:4 painting. From the ground among dry grass stems: a long, low lizard with black glassy scales and an ochre crest sprawls along the top of an obsidian outcrop in the upper frame, facing right, jaws clamped on the rock's edge as it grinds a claw against it. Flakes of black glass slide down toward us. In the blurred foreground stands a hare of grey stone, caught in mid-leap, with grass grown up around its legs. Low afternoon sun from the right; straw-pale grass glows around the black rock and each glass claw shows one hard white glint.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-18 · 오우거 주술사
고르바스의 발톱 · 유닛 · 레벨 3 · 일반 · 틀 `silhouette` L L `strawgold` · 프롬프트 n2 → `tools/art/inbox/G1-18.jpg`

```
Landscape 5:4 painting. An enormous pot-bellied ogre kneels with its rump high and one cheek pressed flat to the ground, a black silhouette against a pale straw-coloured evening sky at the left of the frame. One hand is cupped behind a huge ear; the other is raised with a single finger up for silence. Bone charms hang from its neck as tiny dangling shapes. To the right the empty plain runs flat to the horizon, a few grass heads standing just as still. The sun has just set behind it; a low band of pale light outlines the whole shape and throws its long shadow toward us.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG1-3 · 격노의 문신
고르바스의 발톱 · 아이템 · 레벨 3 · 일반 · 틀 `making` N C `redearth` · 프롬프트 n2 → `tools/art/inbox/IG1-3.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A tattooist's work, half done: on a flat rock lie a row of bone needles lashed to short sticks, a small tapping mallet, and an upturned battered shield used as a tray for a mussel shell of dark red pigment. Stretched on a frame of sticks beside them is a patch of pale hide carrying the pattern — jagged interlocking fangs. The finished half of the pattern smoulders a dull blood red, as if lit from under the skin; the other half is still plain charcoal line. Dim slate daylight under a storm sky falls from the left across rust-red clay; the red half of the pattern gives off a faint glow of its own.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MG-16 · 대지 붕괴
고르바스의 발톱 · 공격 마법 · 레벨 3 · 일반 · 틀 `inside` U X `redearth` · 프롬프트 n2 → `tools/art/inbox/MG-16.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From inside the collapse, falling with it and looking up: a ragged disc of slate-grey sky shrinks overhead, ringed by breaking edges of turf. Between us and the sky hang slabs of red clay, boulders, uprooted grass, spears, a cart wheel and small tumbling figures from both sides of the fight, all dropping together — one of them spread-eagled, another already twisting to land on its feet. Walls of raw red earth slide past on every side. Storm daylight pours down through the opening as the only light; red dust thickens it into a dim rust haze toward the bottom.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-19 · 바위등 곰 기수
고르바스의 발톱 · 유닛 · 레벨 4 · 일반 · 틀 `over` B B `bonemoon` · 프롬프트 n2 → `tools/art/inbox/G1-19.jpg`

```
Landscape 5:4 painting. Over the shoulder of a war-painted rider sitting with arms crossed: ahead of us stretches the broad back of a cave bear, brown fur grown through with mossy stones like a hillside, the saddle strap lost among them. The bear lies flat with its chin on its paws and one eye half open, deciding. Beyond its ears, far down the pale slope, the dust of the rest of the war band is already moving away. Moonlight from high on the right silvers the stones on the bear's back; the plain below is grey-blue.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-23 · 전쟁북 오우거
고르바스의 발톱 · 유닛 · 레벨 4 · 일반 · 틀 `eye` F X `firelit` · 프롬프트 n2 → `tools/art/inbox/G1-23.jpg`

```
Landscape 5:4 painting. At eye level, a few steps away: a vast pot-bellied ogre walks toward us, filling the frame from edge to edge, a drum of stretched bear hide strapped across his belly and a thigh-bone beater in each fist. One beater has just landed — dust jumps off the drumskin in a ring, and the same shiver runs through his stomach, his bone charms and his heavy jowls. His small eyes are shut in concentration. A single campfire low on the left lights the drumhead and the underside of his arms warm ochre against the night.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-24 · 하이에나 무리장
고르바스의 발톱 · 유닛 · 레벨 4 · 일반 · 틀 `low` L L `firelit` · 프롬프트 n2 → `tools/art/inbox/G1-24.jpg`

```
Landscape 5:4 painting. A big scarred hyena stands laughing on a bare mound at the left of the frame, seen from low in the grass against the night sky. Its head is thrown back and to the left, high shoulders hunched, heavy jaws wide open. All along the bottom edge, round ears and pairs of eyes are rising out of the grass and turning toward it — the scattered pack arriving from every side. The dying embers of an abandoned cooking fire at the mound's foot light its chest and throat from below; stars behind.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-42 · 떨어진 고르바스의 비늘
고르바스의 발톱 · 유닛 · 레벨 4 · 일반 · 틀 `profile` L R `bonemoon` · 프롬프트 n2 → `tools/art/inbox/G1-42.jpg`

```
Landscape 5:4 painting. Side-on, flat as a carving: a single dragon scale as tall as a hut stands upright on its edge in the right third of the frame, a curved slab of layered slate with turf and pebbles grown on its outer face, leaning slightly to the left as if bracing. On the ground before it lie dozens of snapped sword blades and split axe heads, and one sword still quivers where it has just struck. In the narrow lee behind it: undisturbed grass and a sleeping goat. Cold moonlight from the upper left whitens the slab's edge and the broken blades; ochre veins show faintly inside the scale.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NG1-2 · 무리의 포효
고르바스의 발톱 · 공격 마법 · 레벨 4 · 일반 · 틀 `pov` F X `stormslate` · 프롬프트 n2 → `tools/art/inbox/NG1-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Coming straight at us across the plain: a wall of sound made visible — a curved front of dust, torn grass and skipping pebbles as wide as the horizon, already bending back the long lances planted along the bottom of the frame and stripping the plumes from them. Behind the front, small on a long low ridge, an unbroken row of howling shapes stands with heads thrown back, crowded from one end of the ridge to the other. Slate storm sky; the dust front is lit from above in dull grey-brown, darkest at its base where the grit flies thickest.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### RG1-1 · 우두머리 사냥
고르바스의 발톱 · 공용 마법 · 레벨 4 · 일반 · 틀 `after` N X `bonemoon` · 프롬프트 n2 → `tools/art/inbox/RG1-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. After it is over: an empty plain under a fading night sky, grass combed flat by the wind. Three tall crested helmets lie far apart in the dust, each beside a broken commander's standard, and around each one the ground is stamped with hundreds of paw prints and bare footprints running inward from every side like the rays of a star. A few tufts of grey fur and a dropped fang necklace are the only things still moving. Last moonlight, grey-blue and cold, on bone-white helmets and standards, with the torn earth showing dry ochre.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-25 · 고르바스의 아이
고르바스의 발톱 · 유닛 · 레벨 5 · 일반 · 틀 `reflect` N X `stormslate` · 프롬프트 n2 → `tools/art/inbox/G1-25.jpg`

```
Landscape 5:4 painting. A shallow rain pool on cracked clay fills almost the whole frame, and in it, upside down, stands the reflection of a hulking giant made of fractured boulders, turf and small pines on its shoulders, dull ochre light in the cracks of its face, one fist closing. The water answers the fist: tight rings of ripples cross the reflection and pebbles hop at the pool's rim. Along the top edge only its real stone feet are visible. Slate-grey storm sky mirrored in the pool, flat cold light, with ochre showing only inside the giant's cracks.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-27 · 어미 동굴곰
고르바스의 발톱 · 유닛 · 레벨 5 · 일반 · 틀 `far` R R `bonemoon` · 프롬프트 n2 → `tools/art/inbox/G1-27.jpg`

```
Landscape 5:4 painting. Far across a thawing mountainside at night: patches of bone-white snow and bare ochre earth, and high on the right a small black cave mouth. In front of it a cave bear stands broadside, tiny at this distance, facing right, stones and moss humped on her back; two smaller shapes peer out from the dark behind her legs. A single line of footprints climbs the snow toward the cave, stops, and bends away in a wide careful arc. A high moon lights the snow patches bone-white and leaves the cave and the bear as dark shapes with pale rims.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-28 · 초원 들소 떼
고르바스의 발톱 · 유닛 · 레벨 5 · 일반 · 틀 `swarm` R X `strawgold` · 프롬프트 n2 → `tools/art/inbox/G1-28.jpg`

```
Landscape 5:4 painting. Edge to edge, the frame is packed with running bison heading right — dark shaggy humps, short curved horns, rolling eyes, dust boiling up between the bodies so that only backs and heads surface, row behind row to the top of the picture. On one bull near the middle a snapped hitching post trails its rope and a dented cooking pot swings from a horn: whatever stood in the way is travelling with them now. Low sun from behind the herd turns the dust pale straw and edges every hump with light; long shadows fall toward us.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-32 · 흑요 거수 도마뱀
고르바스의 발톱 · 유닛 · 레벨 6 · 일반 · 틀 `back` L B `redearth` · 프롬프트 n2 → `tools/art/inbox/G1-32.jpg`

```
Landscape 5:4 painting. From close behind, low to the ground: the thick tail of an ox-sized lizard lashes across the bottom of the frame, black glassy scales throwing off grit, and beyond it the broad armoured back races away toward the left horizon on splayed, clawed legs. On both sides the dry grass of the whole plain lies pressed flat in a single direction, baring streaks of rust-red clay, and a flock of startled birds lifts on the far right. Slate storm light from above, with one pale break at the horizon that slides along the wet-looking black scales.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-43 · 장벽 바위 정령
고르바스의 발톱 · 유닛 · 레벨 6 · 일반 · 틀 `ground` B X `ochredust` · 프롬프트 n2 → `tools/art/inbox/G1-43.jpg`

```
Landscape 5:4 painting. From ground level behind it: a wall of huge boulders stretches across the whole frame, each stone hovering a finger above the earth, shoulder to shoulder, with dust curling in the seams and a dull ochre glow deep in the cracks; the middle stones form a rough head and two braced arms. Through the narrow gaps, the tips of halberds and the dust of an enemy line show on the far side. In the near foreground, bare heels step backward toward us. Sunlit dust haze from beyond the wall leaks through the seams in thin bright slits; this side lies in soft brown shade.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-G1-C3 · 바윗덩이 거구
고르바스의 발톱 · 유닛 · 레벨 6 · 일반 · 틀 `over` L C `firelit` · 프롬프트 n2 → `tools/art/inbox/PN-G1-C3.jpg`

```
Landscape 5:4 painting. Over the heavy shoulder of the camp's biggest fighter, whose war-painted neck and jaw edge the right foreground: he is looking up. In front of him, at the centre of a ring of hide tents, sits a lump of several dozen boulders fused into one rounded body with stubby limbs and a blunt head turned to the left, taller than the tallest tent pole, dust drifting from its seams. Children have already stacked a row of pebbles on its knee. One campfire at its feet lights the lower boulders warm ochre and lets the top of the hulk fade into the night.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-33 · 순례하는 바위 거인
고르바스의 발톱 · 유닛 · 레벨 7 · 일반 · 틀 `far` R T `redearth` · 프롬프트 n2 → `tools/art/inbox/G1-33.jpg`

```
Landscape 5:4 painting. Far up a long mountainside, small in the upper part of the frame, a giant of fractured boulders with a grove of pines on its shoulders stands frozen in mid-stride, climbing toward the right where a snow peak waits. Its footprints come up the slope from the lower left like a record of years: the nearest to us holds tall pines and the smoke of a small camp, the next young birches, the next only grass, and the newest, under its lifted heel, is bare red clay. Slate storm light over the whole slope, with a single pale shaft falling on the giant and its newest footprint.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-35 · 대지 진동 웜
고르바스의 발톱 · 유닛 · 레벨 7 · 일반 · 틀 `cut` R B `strawgold` · 프롬프트 n2 → `tools/art/inbox/G1-35.jpg`

```
Landscape 5:4 painting. The ground cut open in a clean cross-section: along the top runs a thin strip of sunlit grassland with a few tiny herd animals and a ring of standing stones, all tilting. Below it, through layers of clay, gravel and roots, a tunnel as wide as a canyon holds a colossal eyeless worm ringed with rock plates, its head in the lower right, round maw stretched wide in a yawn of stone teeth. Cracks climb from the yawn to the surface. Late sun lights the surface strip pale straw; the layers below darken from ochre to deep umber around the worm.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G1-36 · 미노타우로스 대족장
고르바스의 발톱 · 유닛 · 레벨 7 · 일반 · 틀 `high` B L `ochredust` · 프롬프트 n2 → `tools/art/inbox/G1-36.jpg`

```
Landscape 5:4 painting. High behind his shoulders, looking down: a towering bull-headed chieftain stands at the left of the frame with his back to us, forward-swept horns spanning wider than a wagon, one hand resting on a stone-headed axe planted in the earth. He has simply stopped. Across the plain below him, thin dust trails from every direction are already bending toward the spot, and at his hooves tiny figures are stacking spears and digging the first fire pits. High hazy sun; the dust trails glow pale ochre against the darker grass and his shadow falls short at his hooves.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-02 · 이끼 코다마
베르단의 뿔 · 유닛 · 레벨 1 · 일반 · 틀 `tilt` R R `mossdeep` · 프롬프트 n2 → `tools/art/inbox/G2-02.jpg`

```
Landscape 5:4 painting. The frame tilts with its cocked head: a thumb-high pale spirit with a round head and hollow dark eyes pushes up out of a deep boot-print in the moss, on the right of the picture, leaning rightward as its head rattles mid-turn, blurred like a shaken seedpod. Chalky fragments of its former body lie in the print around it, and fat raindrops burst on the moss. Dim green shade under old trees during a shower; each raindrop and the spirit's pale wet head hold one small soft highlight.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-03 · 나무늘보 견습 궁수
베르단의 뿔 · 유닛 · 레벨 1 · 일반 · 틀 `ground` L L `sunshaft` · 프롬프트 n2 → `tools/art/inbox/G2-03.jpg`

```
Landscape 5:4 painting. Between fern stems on the forest floor, among arrows stuck crookedly in the leaf mould, we look across to the lowest bough of an immense tree on the left, where a young sloth with moss greening its shaggy fur hangs by its hind claws and one arm, slowly drawing a bow much too big for it toward the left. A straw target hangs untouched beyond it; far above, out of focus, rope bridges and platforms crowd the higher branches. Golden-green sun slants down through the canopy in dusty shafts, lighting the apprentice and leaving the missed arrows in soft shade.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-05 · 어린 트렌트
베르단의 뿔 · 유닛 · 레벨 1 · 일반 · 틀 `over` F C `autumnrot` · 프롬프트 n2 → `tools/art/inbox/G2-05.jpg`

```
Landscape 5:4 painting. Over the rough, mossy shoulder of an old tree-elder, a knee-high young treant stands in the middle of a leaf-strewn deer path, facing us. Its bark face is turned up with its knothole mouth half open, stuck mid-word — while its bare root-toes are spread wide and pressed into the soil, where fallen acorns hop and tremble from some far-off footfall only it can feel. Low amber afternoon light through thinning russet leaves, warm on the little one's face, with the elder's shoulder a dark soft blur in front.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NG2-3 · 숲의 재생
베르단의 뿔 · 공용 마법 · 레벨 1 · 일반 · 틀 `macro` L C `sunshaft` · 프롬프트 n2 → `tools/art/inbox/NG2-3.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The cut end of a moss-furred limb in extreme close-up, entering from the right: it shows wood-grain rings like a pruned branch, and from those rings five pale-green shoots are unfurling toward the left, already bending into the shape of fingers, the first one tipped with a tiny nail of bark. Beads of amber sap stand along the old bark edge, fine moss is creeping up the new shoots, and a few wood shavings are still drifting down past them. A single shaft of golden-green sun lights the shoots from behind so they glow translucent against deep shade.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-G2-2 · 뿌리 내림
베르단의 뿔 · 방어 마법 · 레벨 1 · 일반 · 틀 `cut` D L `thorndark` · 프롬프트 n2 → `tools/art/inbox/PS-G2-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The ground is cut open to show both worlds. Above the line, left of centre, two long moss-furred legs stand planted from the knee down, bark climbing the shins like rising water, and a heavy club lies let go in the leaves beside them. Below the line, roots are bursting from both soles and driving down through the dark earth, forking, wrapping buried stones, already reaching twice as deep as the legs are tall. Overcast evening above; the cut earth is near-black, the new roots pale against it, and a few red berries lie in the leaf litter by the club.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG2-01 · 덩굴 조이기
베르단의 뿔 · 공격 마법 · 레벨 1 · 일반 · 틀 `column` U L `autumnrot` · 프롬프트 n2 → `tools/art/inbox/SG2-01.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One tall vertical on the left of the picture: a twisting pillar of vines as thick as ship's rope rises from the forest floor, and gripped in the middle of its coils is a single suit of the heaviest plate — breastplate squeezed to an hourglass, pauldrons folded like paper, rivets popping outward. Thin tendrils have threaded every seam and are pulling tight. One steel gauntlet has dropped among the autumn leaves at the pillar's foot. Amber late light from the right rakes across the pillar, catching the bent steel edges and the rust-coloured leaves below.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG2-02 · 새순 갑옷
베르단의 뿔 · 공용 마법 · 레벨 1 · 일반 · 틀 `before` L C `thorndark` · 프롬프트 n2 → `tools/art/inbox/SG2-02.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The instant before a blow lands: a notched steel blade enters from the upper right and hangs a finger's width above a flank of cracked bark, and in every crack beneath it tight red-tipped buds are swelling to meet the edge, overlapping like the scales of a coat of mail. To the left an older cut is already filled with a ridge of fresh shoots, and the shavings from it are still falling. Near-dark, with one hard green-white glint along the blade's edge and a soft sheen on the wet buds.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG2-03 · 가시 울타리
베르단의 뿔 · 방어 마법 · 레벨 1 · 일반 · 틀 `reflect` N C `sunshaft` · 프롬프트 n2 → `tools/art/inbox/SG2-03.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Dawn light on the inside of a canvas tent wall, which fills the frame like a screen: thrown across it from outside is the sharp shadow of a thorn hedge that was absent at nightfall — a dense lattice of briar stems and long spines, taller than the tent. Caught among the shadow-thorns hangs the shadow of a torn cloak. At the bottom edge, a bedroll and a tin cup sit in the warm half-dark. Low morning sun behind the hedge glows golden-green through the canvas, printing every thorn as a crisp dark line.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-08 · 오소리 숲지기
베르단의 뿔 · 유닛 · 레벨 2 · 일반 · 틀 `eye` R C `thorndark` · 프롬프트 n2 → `tools/art/inbox/G2-08.jpg`

```
Landscape 5:4 painting. At eye level in a dark grove, an old grey badger crouches in the middle of the frame, turned to the right, pressing fresh soil flat with both broad foreclaws at the foot of a great tree; a wooden spade leans against its shoulder. Behind it, older mounds recede between the trunks, each one overgrown with a small crowd of red flowers — the nearest thick, the farthest only a few bright specks. Last grey-green daylight falls from one gap in the canopy onto its striped head and the newest mound; the red flowers glow faintly in the gloom.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-09 · 숲 사티로스
베르단의 뿔 · 유닛 · 레벨 2 · 일반 · 틀 `profile` L X `rainmist` · 프롬프트 n2 → `tools/art/inbox/G2-09.jpg`

```
Landscape 5:4 painting. Flat as a painted frieze, in strict side view: a goat-legged satyr with curled horns and shaggy haunches strides leftward across the full width of the frame along a fallen log. He keeps blowing a set of reed pipes held in one hand while the other swings a shield of charred bark, split by a pale forked lightning scar, into the path of a thrown javelin that splinters against it. His pointed beard and the pipes' tassels stream behind him. Even grey rain-light from above, soft and shadowless, with fine drizzle beading on horn, fur and bark.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-11 · 갓버섯 보초
베르단의 뿔 · 유닛 · 레벨 2 · 일반 · 틀 `under` U R `thorndark` · 프롬프트 n2 → `tools/art/inbox/G2-11.jpg`

```
Landscape 5:4 painting. Beneath a hanging plank bridge, looking up from the shadows: daylight shows in thin slits between the planks, and across one slit the dark sole of a boot is passing. Along a root-ledge just under the planks, on the right, a row of five squat mushroom folk tilt their broad blood-red caps upward to listen, stalk-bodies pressed together. From each cap a fine white thread runs up to the underside of the bridge, quivering. Green twilight falls through the gaps in narrow blades; the row of red caps is the only colour in the damp near-dark.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG2-1 · 가시 문신
베르단의 뿔 · 아이템 · 레벨 2 · 일반 · 틀 `macro` N X `thorndark` · 프롬프트 n2 → `tools/art/inbox/IG2-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A patch of grey-green, bark-grained skin in extreme close-up, filling the frame: a vine of thorns is tattooed across it in dark sap-ink, winding from lower left to upper right. Along the middle of the vine the inked thorns have risen out of the skin as real ones, hard and curved, and on the tip of the longest hangs one bright red drop. A few torn threads of wool are snagged on the thorn beside it. Dim green forest light from the left; the wet red drop and the raised thorns hold sharp little highlights against near-black shadow.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG2-2 · 나무껍질 각인
베르단의 뿔 · 아이템 · 레벨 2 · 일반 · 틀 `pair` N B `autumnrot` · 프롬프트 n2 → `tools/art/inbox/IG2-2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Leaning against the foot of an ancient tree, in the lower part of the frame, stands a hand-sized carving block of pale wood, its face cut with a pattern of deep furrows — the exact pattern of the trunk's bark rising behind it, ridge for ridge. The block's oldest furrows have begun to grow real bark of their own, thick and lichen-spotted, so that half of it is carving and half is tree. A small mallet and a bowl of dark sap-ink sit beside it in the fallen leaves. Amber autumn light slants in from the left across block and trunk alike, deepening every furrow.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MG-08 · 뿌리 결박
베르단의 뿔 · 방어 마법 · 레벨 2 · 일반 · 틀 `far` N L `autumnrot` · 프롬프트 n2 → `tools/art/inbox/MG-08.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from far across a valley: a line of small armoured figures crosses a bare ridge against the evening sky, and it is the back of the line, on the left, that has stopped. Around the last five marchers the ground has burst open, and dark roots arch out of it like the legs of great spiders, looped round ankles and shins; the figures lean and flail in place, while the front of the column walks on, unaware, toward the right. A band of dull russet dusk behind the ridge silhouettes roots and figures alike; the valley below is already dark green shadow.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MG-10 · 고목의 장막
베르단의 뿔 · 방어 마법 · 레벨 2 · 일반 · 틀 `swarm` D X `sunshaft` · 프롬프트 n2 → `tools/art/inbox/MG-10.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A curtain of hanging branches fills the frame from edge to edge: hundreds of thin, drooping withes let down from above, each strung with small leaves and long thorns like beads on cords. Sunlight comes through the gaps in green-gold slivers, and behind the curtain a sheltered figure is only a soft dark shape. On the left, at hand height, a torn leather glove hangs snagged on the thorns, still swinging. Back-lit by golden-green shafts from beyond the curtain, so every leaf glows and every thorn is a dark needle.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NG2-1 · 뿌리 파고들기
베르단의 뿔 · 공격 마법 · 레벨 2 · 일반 · 틀 `under` U C `sporeglow` · 프롬프트 n2 → `tools/art/inbox/NG2-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A suit of plate armour towers over us, seen from the ground looking straight up against the night canopy: pale, questing roots have come up through the soil beneath it and out through every gap in the steel — the visor slit, the armpits, the elbow joints, between the fingers of both gauntlets — prising each plate a little wider. Beside its armoured feet a pair of bare feet stands untouched, a single root curving politely around the heel. Night; the roots carry a faint blue-green glow of their own that lights the armour from inside its seams.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-G2-C1 · 이끼 덮인 묘목
베르단의 뿔 · 유닛 · 레벨 2 · 일반 · 틀 `close` R L `rainmist` · 프롬프트 n2 → `tools/art/inbox/PN-G2-C1.jpg`

```
Landscape 5:4 painting. A moss-covered sapling the height of a child, close up and set to the left of the picture, leans defiantly rightward: a small scowling bark face, two twig arms folded. Its stem is ringed with a ladder of healed scars, all at the same height, and the newest cut is closing under fresh moss as we watch. Beside it on the right lies a neat heap of its own lopped-off tops, a dozen of them, and a billhook with a chipped edge. Soft grey overcast morning; the wet moss on its stem is the greenest thing in the haze.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG2-04 · 트렌트 행진
베르단의 뿔 · 공격 마법 · 레벨 2 · 일반 · 틀 `transform` F L `sporeglow` · 프롬프트 n2 → `tools/art/inbox/SG2-04.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A tall beech caught halfway between tree and walker, left of centre: one side of it still stands rooted in the ground, bark smooth, branches still; the other side has torn free — a root-leg lifted high and dripping soil, stepping toward us, a branch-arm swinging forward, a rough face half formed in the bark between the two halves. Behind it other trunks in the grove show the same first shudder. Night; blue-green fungus-light along the grove floor outlines the lifted root and the falling clods of earth.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG2-05 · 수액 몰아주기
베르단의 뿔 · 공용 마법 · 레벨 2 · 일반 · 틀 `origin` R R `autumnrot` · 프롬프트 n2 → `tools/art/inbox/SG2-05.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Looking along the ground from where it starts: in the near foreground three long, mossy hands lie pressed flat on a tangle of surface roots, and from under each palm a line of amber light runs away from us along the roots, converging on one old tree in the right middle distance. That tree is swollen like a full barrel, its bark split in long seams that brim with glowing sap; the trees beside it stand thin and dim. Dusk under russet leaves; the amber sap glowing in roots and bark seams is the only warm light.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG2-07 · 엉겅퀴 요새
베르단의 뿔 · 방어 마법 · 레벨 2 · 일반 · 틀 `impact` R L `mossdeep` · 프롬프트 n2 → `tools/art/inbox/SG2-07.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At arm's length, a charging lance-point drives into a rampart of giant thistles on the left — stalks thick as fence posts, leaves edged with spines as long as daggers, crimson thistle-heads the size of cabbages — and stops dead at the instant of impact. The shaft bows and splits along its grain, and a burst of white thistledown explodes outward from the blow like a thrown snowball, filling the air toward the right. Deep green shade behind the wall, with soft daylight from the left on the pale down and the splintering shaft.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-13 · 고목 거미
베르단의 뿔 · 유닛 · 레벨 3 · 일반 · 틀 `through` L C `autumnrot` · 프롬프트 n2 → `tools/art/inbox/G2-13.jpg`

```
Landscape 5:4 painting. Through a ragged tear in a curtain of grey silk we peer into the web-shrouded crown of an old tree: every branch is wrapped, and russet leaves hang caught in the veils like coins. In the middle, flattened against the trunk and patterned exactly like its bark, a spider the size of a cart shows itself only by eight dew-wet knees and a single forelimb flicking a fresh line of silk out toward the left. Amber autumn light glows through the silk from behind, turning the veils translucent and the hidden spider into a darker patch of bark.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-15 · 에일렌 뿔사슴
베르단의 뿔 · 유닛 · 레벨 3 · 일반 · 틀 `inside` F R `mossdeep` · 프롬프트 n2 → `tools/art/inbox/G2-15.jpg`

```
Landscape 5:4 painting. From inside the fresh pale notch an axe has cut into a trunk — the wedge of raw wood framing the view above and below — we look out at the forest edge, where a herd of great stags has stopped grazing on the right. Every head is lifted, and every crown of mossy, branch-like antlers is turned straight toward us. A single wood chip is still falling past the opening. Dim green shade under the edge trees; the raw wood of the notch glows pale around the view and the stags' eyes hold small wet highlights.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-17 · 두꺼비 주술사
베르단의 뿔 · 유닛 · 레벨 3 · 일반 · 틀 `back` B C `sporeglow` · 프롬프트 n2 → `tools/art/inbox/G2-17.jpg`

```
Landscape 5:4 painting. A broad warty toad shaman squats on a root with its back to us, moss growing along its spine, a wad of moss bulging one cheek, its staff hung with seed-rattles and snail shells laid across its knees. What it is talking to stands before it: a half-circle of old trees whose trunks all bend inward, crowns lowered like listening heads. A string of pale green breath-puffs drifts from its wide mouth up into the leaning branches. Night; the breath-puffs glow pale lime and light the undersides of the leaning branches and the edge of its mossy shoulders.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### I3-3 · 실바니엘 장궁
베르단의 뿔 · 아이템 · 레벨 3 · 일반 · 틀 `motion` N L `mossdeep` · 프롬프트 n2 → `tools/art/inbox/I3-3.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A longbow hangs in mid-air between two giant boughs, tossed across the gap: taller than a man, cut from one dark stave with moss along its back and a grip bound in bark cord, turning slowly end over end on the left of the frame. Its string is still a humming blur from the shot just loosed, and on the right a vine swings wildly where its owner has already leapt away. Far below, mist fills the gap. Deep green canopy shade; a cool glow from the mist below rims the stave and the blurred string.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG2-5 · 생명의 씨앗
베르단의 뿔 · 아이템 · 레벨 3 · 일반 · 틀 `stored` N X `sporeglow` · 프롬프트 n2 → `tools/art/inbox/IG2-5.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. In an earth pocket beneath a great tree, a cage of pale roots curves around an empty space the size of a chest — bars arched like ribs — and in it, just left of where a heart would sit, rests a single seed as big as a walnut, its husk split by one green vein of light. Fine rootlets from the cage have already reached the seed and wrapped it. Moss cushions the pocket, and beyond its mouth the night forest is black. The seed's own pale-lime glow lights the root-ribs from inside, throwing their curved shadows over the moss.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MC-14 · 갑옷째 휘감기
베르단의 뿔 · 공용 마법 · 레벨 3 · 일반 · 틀 `pov` F C `thorndark` · 프롬프트 n2 → `tools/art/inbox/MC-14.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Through the narrow eye-slit of a helmet — its dark rim framing the view — a mass of green vines comes straight at us, the nearest tendrils already curling over the slit's edge. Our own steel gauntlets, raised in front, are wound round and round with vines that have found every joint; one plate is buckling outward with a twist. Past them, other suits of armour stand bound the same way, and an empty breastplate, peeled off whole, is sinking into the moss. Near-dark under the trees; a dull green light catches wet vine and bent steel, and a few red berries ride the tendrils.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### RG2-1 · 숲의 정적
베르단의 뿔 · 공용 마법 · 레벨 3 · 일반 · 틀 `through` N C `rainmist` · 프롬프트 n2 → `tools/art/inbox/RG2-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Framed by a dark arch of briars in the foreground, a battlefield glade where everything has stopped: a flight of sparrows hangs fixed in the air, falling leaves are pinned mid-drop, and a thrown spear rests in empty air halfway across. Small figures below stand locked with blades half raised. Only the thorns are moving — slow green tendrils have climbed the hanging spear like a trellis and are reaching, unhurried, for the nearest raised sword. Windless grey-green haze fills the glade with flat silver light; the briar arch in front is a black frame.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-20 · 실바니엘 호랑이
베르단의 뿔 · 유닛 · 레벨 4 · 일반 · 틀 `over` F R `sunshaft` · 프롬프트 n2 → `tools/art/inbox/G2-20.jpg`

```
Landscape 5:4 painting. Over the cloaked shoulder of a climber halted on a broad wooden stair that winds around a giant trunk, we meet the stare of a great tiger lying across the next step on the right — amber fur, moss-green stripes, one paw hanging over the edge. Behind it, on every higher step curving out of sight, another tiger lies the same way. A single falling leaf has stopped in the air in front of its nose. Golden-green sunshafts fall through the canopy across the stair, striping the tigers a second time with light and shadow.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-21 · 트렌트 전사
베르단의 뿔 · 유닛 · 레벨 4 · 일반 · 틀 `inside` L T `rainmist` · 프롬프트 n2 → `tools/art/inbox/G2-21.jpg`

```
Landscape 5:4 painting. A burnt-out hollow trunk frames the view like a black cave mouth; from inside it we watch a broad treant stride leftward along a ridge in the upper part of the picture. One flank of its trunk is still scorched black and cracked; the other has leafed again. Its branch-arms are balled into fists of knotted wood, and around its root-feet a burnt clearing shows the first green shoots through wet ash. Grey rain-light over the clearing; drizzle streaks the opening, and the fresh shoots are the brightest green in a field of ash.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-22 · 가시숲 맨드레이크
베르단의 뿔 · 유닛 · 레벨 4 · 일반 · 틀 `back` R R `sporeglow` · 프롬프트 n2 → `tools/art/inbox/G2-22.jpg`

```
Landscape 5:4 painting. A mandrake sunk waist-deep in black soil, seen from just behind: its gnarled, root-skinned shoulders and crown of broad leaves fill the right foreground, turned toward the right, forked root-arms braced on the ground as it screams. The scream shows as rings of shuddering air that bend the thorn thicket ahead of it, and at their far edge a dropped spade and an overturned lantern lie on a path that forks five ways into the briars. Night; cold blue-green fungus-light among the briars edges its leaves and catches the trembling rings of air.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-23 · 드리엔의 사도
베르단의 뿔 · 유닛 · 레벨 4 · 일반 · 틀 `close` L R `thorndark` · 프롬프트 n2 → `tools/art/inbox/G2-23.jpg`

```
Landscape 5:4 painting. Close on the face of a dryad singing, on the right of the frame: smooth pale bark, eyes closed, lips parted, blossom-and-leaf hair lifted as if by her own breath. From her mouth a ribbon of leaves streams out to the left across the picture — fresh green ones first, and among them a few leaves burnt black, their edges still rimmed with ember-red. A single bead of sap runs down her cheek like a tear. Dark forest dusk behind her; a cool green skylight from above shapes her face, and the ember-edged leaves are the only warm sparks.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-25 · 떨어진 베르단의 뿔가지
베르단의 뿔 · 유닛 · 레벨 5 · 일반 · 틀 `top` R T `autumnrot` · 프롬프트 n2 → `tools/art/inbox/G2-25.jpg`

```
Landscape 5:4 painting. Directly from above, an autumn forest floor: in the upper half of the frame stands a huge forked branch shaped like a stag's antler, dark ancient wood furred with moss, walking on splayed root-legs toward the right, a faint green glow running in its grain. Around it every fallen leaf lies in neat concentric rings, each leaf turned the same way, while beyond the outermost ring the leaves are a wind-blown jumble. At the ring's edge a squirrel sits frozen with one leaf in its paws. Low amber sun rakes across the floor from the left, throwing the antler's long forked shadow over the ordered leaves.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-26 · 에일렌의 코다마
베르단의 뿔 · 유닛 · 레벨 5 · 일반 · 틀 `low` L R `rainmist` · 프롬프트 n2 → `tools/art/inbox/G2-26.jpg`

```
Landscape 5:4 painting. Looking up from the foot of an immense old tree in drifting fog: on the right, perched on a burl a little above us, sits a pale round-headed spirit the size of a child, hollow dark eyes turned down and to the left, one hand resting on the bark as if counting. All the way up the trunk, hundreds of small round knots in the bark look like faces. At the bottom edge of the frame a woven cradle hangs from one root, and beside another root stands a small cairn of mossy stones. Soft silver light sifts down the trunk through the fog from far above; the spirit's pale body is the brightest shape in the grey-green haze.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-28 · 장벽 뿌리 거수
베르단의 뿔 · 유닛 · 레벨 5 · 일반 · 틀 `close` F C `sunshaft` · 프롬프트 n2 → `tools/art/inbox/G2-28.jpg`

```
Landscape 5:4 painting. What seemed a bank of giant tangled roots and packed soil, up close: an axe stands sunk an inch deep in one root, and right beside the cut an eye the size of a cartwheel has opened among the roots — amber, calm, looking straight at us. Pebbles and moss shift where a brow of knotted wood has lifted. Along the lower edge three more axes lie set down neatly on the moss, handles side by side. Green-gold light slants through mist onto the roots; the wet eye carries one bright highlight.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-30 · 가시등 고슴도치
베르단의 뿔 · 유닛 · 레벨 6 · 일반 · 틀 `high` R R `mossdeep` · 프롬프트 n2 → `tools/art/inbox/G2-30.jpg`

```
Landscape 5:4 painting. The road below the gate-top of a tree-city, seen from above: a ball of bramble thorns as big as a boar sits on the right side of the track, exactly where it has sat for generations — the wheel ruts swing around it in a deep, polished curve. Its spines have put out leaves and blackberries, a wren nests among them, and from a gap near the ground a damp brown snout and one sleepy eye point toward the right. Heavy green shade at the gateway; soft daylight from the left picks out the wet snout and the nearest thorns.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-31 · 드리엔의 그린맨
베르단의 뿔 · 유닛 · 레벨 6 · 일반 · 틀 `high` R T `rainmist` · 프롬프트 n2 → `tools/art/inbox/G2-31.jpg`

```
Landscape 5:4 painting. A grey, long-dead slope of bare earth and dry bracken under low drifting fog, viewed from a height: in the upper part of the picture a tall figure woven entirely of oak leaves, ivy and blossom walks toward the right, his calm leaf-mask face lowered. Behind him, winding up from the bottom-left corner, his path is marked by a ribbon of small flowers — white, violet, pale yellow — opening out of the dead ground, the newest still unfolding at his heels. Flat silver fog-light over the slope; only the ribbon of blossoms and the wet shine of his leaves hold colour.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-32 · 태고림 거목
베르단의 뿔 · 유닛 · 레벨 6 · 일반 · 틀 `high` N T `sunshaft` · 프롬프트 n2 → `tools/art/inbox/G2-32.jpg`

```
Landscape 5:4 painting. A high branch gives the view, looking down: at the top of the frame the vast trunk of an ancient tree, wide as a tower, shows a heavy-lidded bark face among its buttress roots, eyes nearly shut. Its shadow lies over the ground below like a pool. Outside the shadow, falling leaves streak past as blurs; inside it, the same leaves hang almost still in the air, and a leaping hare is held at the top of its bound, ears back. Golden-green sunshafts fall around the tree and stop at the edge of its shade, which stays cool, dim and perfectly calm.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-G2-C3 · 늪가의 히드라
베르단의 뿔 · 유닛 · 레벨 6 · 일반 · 틀 `reflect` F T `mossdeep` · 프롬프트 n2 → `tools/art/inbox/PN-G2-C3.jpg`

```
Landscape 5:4 painting. The still, rust-stained water of a swamp fills the frame, and in it — upside down, rippling — hangs the reflection of a many-headed serpent leaning over the bank toward us: five thick moss-green necks draped in waterweed across the upper part of the picture. One neck ends in a healed scar from which two smaller heads, paler and rust-tinged, have sprouted side by side. At the bottom edge a snapped boar-spear stands out of the mud at the waterline. Dull green daylight under hanging moss; the water is a dark mirror with an orange film, and the two new heads catch the most light.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-33 · 첫 고목의 드라이어드
베르단의 뿔 · 유닛 · 레벨 7 · 일반 · 틀 `front` F C `rainmist` · 프롬프트 n2 → `tools/art/inbox/G2-33.jpg`

```
Landscape 5:4 painting. Dead centre and facing us, a dryad as tall as a house steps out of the arched hollow of a colossal tree, pale bark limbs symmetrical, twig fingers spread, leaf-hair falling to her knees. Through the hollow behind her shines another age — giant ferns under a clear young morning — and its light spills out in a halo where spring flowers open at her feet. Outside that halo the forest is bare, wet and wintry, and two deer at the roots reach only to her ankle. Warm young daylight pours from the hollow behind her into a cold fog-grey present, rimming her whole outline.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-34 · 베르단의 뿔 기사
베르단의 뿔 · 유닛 · 레벨 7 · 일반 · 틀 `ground` R C `autumnrot` · 프롬프트 n2 → `tools/art/inbox/G2-34.jpg`

```
Landscape 5:4 painting. Down in the fallen leaves, past the blurred tips of ferns, a stag the size of a hall stands square above us in the middle of the picture, head turned to the right. Its forelegs rise like tree trunks, a fox trots under its belly with room to spare, and far above, its antlers branch like the crown of an oak — every tine ending in a tuft of new green leaves, with a pair of herons nesting in the fork. A garland of ivy hangs across its chest like a sash. Russet evening light comes low through the trunks from the left, warm on its spotted flank, the antler crown dark against an amber sky.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G2-36 · 에일렌의 균사 심장
베르단의 뿔 · 유닛 · 레벨 7 · 일반 · 틀 `close` N L `sporeglow` · 프롬프트 n2 → `tools/art/inbox/G2-36.jpg`

```
Landscape 5:4 painting. Underground, in a cavern roofed with giant roots, we stand close under a heart as big as a house hanging on the left of the view — a great lobed mass of pale fungus wound in white threads, caught at the swell of a beat. From it thousands of fine filaments fan out to the right and up into the roots, and a pulse of blue-green light is travelling along them all at once. On a ledge beneath it a row of tiny cap-headed mushroom folk stands watching, small as thimbles. Total darkness except the heart's own pale-lime glow and the blue-green pulse running out through the threads.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-02 · 물방울 운디네
마렌시아의 노래 · 유닛 · 레벨 1 · 일반 · 틀 `under` D C `lagoon` · 프롬프트 n2 → `tools/art/inbox/G3-02.jpg`

```
Landscape 5:4 painting. From beneath the surface of a spring basin, looking straight up through clear water: above the shifting ceiling a cupped scaled hand wavers, broken into shards of colour, and from its fingertips a thumb-sized figure of living water has just stepped off. She drops headfirst toward us through the surface — a tiny translucent girl, hair already dissolving into a comet of bubbles, arms folded like a diver's — while the mossy stone walls of the basin frame the edges of the view. Midday sun straight overhead pours through the surface in shifting bands; the little figure catches it like a lens.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-03 · 석호의 새끼 돌고래
마렌시아의 노래 · 유닛 · 레벨 1 · 일반 · 틀 `macro` R X `coraldawn` · 프롬프트 n2 → `tools/art/inbox/G3-03.jpg`

```
Landscape 5:4 painting. Extreme close-up filling the frame: the beak of a young dolphin breaking the surface, turned three-quarters to the right, smiling around the prize clamped in its small teeth — a bent silver spoon, tarnished and dripping, bright as a fish. Water streams from its chin; one dark eye shines above, and the tip of a small dorsal fin behind is nicked. Far beyond it, soft and out of focus, lie the reef gap it slipped through and the open sea. Low first sunlight from the right flashes on the wet spoon and beads of water; the sea behind is still dawn-pink and dim.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-04 · 진주조개 파수꾼
마렌시아의 노래 · 유닛 · 레벨 1 · 일반 · 틀 `top` N C `lagoon` · 프롬프트 n2 → `tools/art/inbox/G3-04.jpg`

```
Landscape 5:4 painting. Directly overhead, as a gull would see it: low tide has drained the mouth of a lagoon to furrowed wet sand, and in the middle sits one giant ridged clam, stranded and unbothered, its shell open a hand's width on a pearl's steady glow. Tide channels fork around it and rejoin; the dotted tracks of wading birds and a line of small crabs all detour in neat curves around the spot. A last shallow pool clings to its base. Bright noon sun from above flattens the sand to pale cream and turquoise runnels; the pearl glints from inside the shadowed gape.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-06 · 물결 해마
마렌시아의 노래 · 유닛 · 레벨 1 · 일반 · 틀 `through` F L `coraldawn` · 프롬프트 n2 → `tools/art/inbox/G3-06.jpg`

```
Landscape 5:4 painting. Between two barnacled jetty pilings that stand dark in the near foreground, a pony-sized seahorse comes over a small wave straight toward us, set in the left of the gap. Its ridged body is beaded with spray, translucent fin crest raised, and its curled tail grips a sealed courier tube of bamboo capped with red wax. Behind it the sea-lane runs out past a line of marker floats to a thin far coast. The rose dawn sun sits low behind it on the sea-lane, haloing the fin crest and leaving the pilings as cool dark frames.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MC-03 · 뒤바뀐 물길
마렌시아의 노래 · 공용 마법 · 레벨 1 · 일반 · 틀 `top` L X `lagoon` · 프롬프트 n2 → `tools/art/inbox/MC-03.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from straight above, a braided tidal channel on pale sand has just changed its mind: the bright main current swings into a new loop, drawn in streaks of foam. Caught in it, small crewless boats are being re-sorted like beads on a string — a broad, heavy barge shoved up to the head of the line on the left, a slim racing skiff dragged stern-first to the rear, oars trailing. High sun from above; turquoise water over white sand, each streak of the new current sparkling.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MC-04 · 기원
마렌시아의 노래 · 방어 마법 · 레벨 1 · 일반 · 틀 `before` R B `moontide` · 프롬프트 n2 → `tools/art/inbox/MC-04.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The held breath before the water arrives. At the foot of worn shrine steps, low in the frame, the lagoon has swelled up in one smooth, unbroken bulge that stands a hand higher than the stone it rests against — trembling, silent, a few floating prayer lamps riding its curve. On the next step up, at the right, waits a row of cracked boots and dented greaves, cropped at the knee, and a single finger of water is already reaching for the nearest. Moonlight from behind the lagoon shines through the swollen water's edge; the small lamps add warm points along it.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MG-03 · 샘물 한 모금
마렌시아의 노래 · 공용 마법 · 레벨 1 · 일반 · 틀 `object` N R `coraldawn` · 프롬프트 n2 → `tools/art/inbox/MG-03.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A dipper made from half a gourd rests on the mossy rim of a spring, set in the right of the frame, still rocking from the hand that put it down. One mouthful is gone from it; the water left inside glows faintly, and a last bright drop hangs from its lip. Beside the spring the grass holds the long flattened shape of someone who lay there exhausted — and from it, fresh wet footprints stride away uphill. Early sun slants in from the left through the trees, warm on the gourd and the dew, the spring itself clear blue.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### NG3-2 · 역류
마렌시아의 노래 · 공격 마법 · 레벨 1 · 일반 · 틀 `symbol` L L `trench` · 프롬프트 n2 → `tools/art/inbox/NG3-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A string of glass net-floats tethered in a narrow rock channel serves as the whole lesson. The current that held them streaming one way has just turned and runs backward, glowing with disturbed plankton, and the line has swung end for end: the smallest float, which trailed safely last, now leads on the left, nose-on to a curl of white water about to break over it, while the big lead float bobs sheltered at the rear. Night in the channel; cold blue plankton-light in the reversed current is the single light, glinting inside each glass ball.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-G3-1 · 물의 거울
마렌시아의 노래 · 공용 마법 · 레벨 1 · 일반 · 틀 `macro` D C `stormsea` · 프롬프트 n2 → `tools/art/inbox/PS-G3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One heavy drop of water hangs from the lowered tip of a halberd, magnified until it fills the centre of the frame. Inside the drop the world stands on its head, tiny and razor-sharp: a grey hillside, a row of battle standards and tent poles, all hanging head-down with the sky lying beneath them. Behind the drop the real field is only a soft blur of slate and green, and a second drop is gathering on the edge above. Overcast drizzle light from above; the drop gathers it into one bright inverted picture against the dull steel.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG3-03 · 물의 장막
마렌시아의 노래 · 방어 마법 · 레벨 1 · 일반 · 틀 `transform` R C `trench` · 프롬프트 n2 → `tools/art/inbox/SG3-03.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A sheet of water thin as silk hangs upright in the dark, drawn up from the sea like a curtain, and a sword is caught halfway through it, thrusting from left to right. The half still on the near side is hard, bright, sharp steel. The half that has passed through emerges soft — the blade slumping into a rope of clear water that curves down and scatters as harmless drops. Black night; the veil itself glows faint water-blue and puts cold glints on the steel and the falling drops.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-07 · 작살 든 해달
마렌시아의 노래 · 유닛 · 레벨 2 · 일반 · 틀 `over` L R `moontide` · 프롬프트 n2 → `tools/art/inbox/G3-07.jpg`

```
Landscape 5:4 painting. Over the wet shoulder of a sea otter floating on its back at the right edge: whiskers, one raised paw, and a chipped coral-tipped harpoon drawn back to throw toward the left. Out across the moonlit lagoon stands a practice target, a hoop of woven reed on a pole, with three scavenged harpoons already bunched in its exact centre. Several others, longer and finer, float uselessly in the water beneath it. A high bright moon silvers the lagoon and the otter's slick fur; thin mist softens the far shore.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-09 · 셀레네아 나가 수비병
마렌시아의 노래 · 유닛 · 레벨 2 · 일반 · 틀 `close` U T `moontide` · 프롬프트 n2 → `tools/art/inbox/G3-09.jpg`

```
Landscape 5:4 painting. Close on the head and shoulders of a naga sentry in the upper part of the frame, coiled beneath a bridge of the lagoon city: fin-crested brow, a collar of scallop plates, cheek resting against the shaft of a spear so cold that beads of water run down it and drip from its point. Its eyes are turned upward to the slats of the bridge, where the soles of late walkers pass. Below, its tail winds twice round a weedy stone pier. Thin blades of moonlight fall between the bridge planks across its face and the wet spear; everything else is blue shadow.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-10 · 어린 셀키
마렌시아의 노래 · 유닛 · 레벨 2 · 일반 · 틀 `ground` R X `coraldawn` · 프롬프트 n2 → `tools/art/inbox/G3-10.jpg`

```
Landscape 5:4 painting. Camera down on a wet tidal rock among barnacles and limpets, at dawn. Stretched across the frame, a spotted grey sealskin is snagged fast on the rough crust, and at its right end a small dark-eyed selkie child has got head and one arm free and is hauling with all her weight, cheeks puffed. Past her, soft in the distance, two shrine singers wade by with their faces turned carefully toward the open sea. Rosy first light skims in low from the sea, shining on wet fur and rock pools and leaving long blue shadows.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-11 · 조수 점술 문어
마렌시아의 노래 · 유닛 · 레벨 2 · 일반 · 틀 `over` L B `stormsea` · 프롬프트 n2 → `tools/art/inbox/G3-11.jpg`

```
Landscape 5:4 painting. An octopus with wise golden eyes sits in a harbour rock pool at the bottom of the frame, seen over the hunched shoulders and straw hats of three fishermen, dark and close in the foreground. It has spread all eight arms at once — one on each tide-stained stone, one on a mooring ring, one on a floating cork — and from under its mantle a cloud of black ink is unrolling to the left. Behind the men, every boat is still hauled up on the shingle. Heavy slate morning before a blow; dull light from the open sea glints on wet skin and the spreading ink.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-12 · 산호등 거북
마렌시아의 노래 · 유닛 · 레벨 2 · 일반 · 틀 `profile` R L `lagoon` · 프롬프트 n2 → `tools/art/inbox/G3-12.jpg`

```
Landscape 5:4 painting. Strict side view underwater, flat as a painted frieze: a sea turtle swims rightward from the left of the frame, flippers mid-stroke, carrying a small living reef on its domed shell — pink and ochre coral, a waving anemone, a few striped fish keeping station above it. Near the crest one old break shows, a pale wedge where newer coral has grown back thicker and knobbier than all the rest. A level floor of pale sand runs along the bottom edge. Clear midday sun from above plays over shell and sand in bright nets; the water behind fades to deep blue.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG3-1 · 조개 부적
마렌시아의 노래 · 아이템 · 레벨 2 · 일반 · 틀 `making` N L `glasscalm` · 프롬프트 n2 → `tools/art/inbox/IG3-1.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Half-made on a salt-bleached driftwood plank, set in the left of the frame: one small ribbed cockle shell, cream and rose, held in a notch, with a neat hole drilled halfway through its hinge. A bone awl and bow-drill lie where they were put down, a pinch of white shell dust beside them, and a cord of braided seagrass waits with its end already waxed for threading. Past the plank, the first thin wave of the tide slides up the sand. Soft fogged daylight from the sea; a mild sheen on the shell's ribs and the wet sand beyond.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG3-2 · 샘물 병
마렌시아의 노래 · 아이템 · 레벨 2 · 일반 · 틀 `hung` N T `moontide` · 프롬프트 n2 → `tools/art/inbox/IG3-2.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A small stoppered flask of thick sea-green glass hangs by a knotted cord from a mangrove root in the upper part of the frame, turning slowly over a spring. Lit from behind, the water inside glows clearer and brighter than the moon that lights it, and a blue wax seal on the stopper carries the print of a thumb. Below, out of focus, its glow lies as a pale disc on the black surface of the spring. The moon directly behind the flask shines through the glass; mist drifts between the roots.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG3-3 · 산호 단검
마렌시아의 노래 · 아이템 · 레벨 2 · 일반 · 틀 `motion` D X `lagoon` · 프롬프트 n2 → `tools/art/inbox/IG3-3.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. Caught in mid-air above bright shallows: a dagger carved from one piece of red coral, its blade faintly branched like the reef it came from, grip bound in fish-skin. It was thrown from the upper left, and the thread of spray it trails shows the flight — a long curve that bends clean around a weedy mooring post, like a current rounding a rock, and now carries the dagger down toward the lower right. Noon sun from above; the red coral blazes against turquoise water, every droplet of the curved trail a spark.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### MG-12 · 샘물의 축복
마렌시아의 노래 · 공용 마법 · 레벨 2 · 일반 · 틀 `swarm` R X `lagoon` · 프롬프트 n2 → `tools/art/inbox/MG-12.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A flung arc of water droplets fills the whole frame, hundreds of them frozen in the air, sweeping from a wet leafy sprig at the lower left toward the right. Each drop is a tiny lens holding the bright sky. Where the first of them land, on a string of polished brass luck-charms tied along a tent rope, the shine is sliding off the metal like paint in rain, leaving dull grey behind. Strong high sun from behind the spray lights every drop to a bright bead; the charms dim as the water touches them.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PN-G3-C1 · 살아 있는 물거울
마렌시아의 노래 · 유닛 · 레벨 2 · 일반 · 틀 `low` F L `glasscalm` · 프롬프트 n2 → `tools/art/inbox/PN-G3-C1.jpg`

```
Landscape 5:4 painting. Low over a windless lagoon we look up at an upright oval of perfectly still water, taller than a man, standing on the surface in the left of the frame and facing us like a mirror on an invisible stand, its rim trembling with a few slow droplets. On a mooring post before it hangs a bronze helmet, cracked and badly dented. Inside the oval the same helmet hangs whole and polished, bright as the day it was made. Even soft-grey fog light; the mirror holds a cleaner, brighter version of it than the world around.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### PS-G3-2 · 썰물
마렌시아의 노래 · 방어 마법 · 레벨 2 · 일반 · 틀 `origin` B R `glasscalm` · 프롬프트 n2 → `tools/art/inbox/PS-G3-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At the high-water mark, looking out along the line the sea has taken: a rim of weed and driftwood at our feet, then wet sand ribbed and shining, scored with long keel-marks. On the right a war-boat lies stranded on its side, oars splayed, its standard pole fallen flat. Far ahead the tide is still running away from us in thin glistening sheets toward a horizon that keeps retreating. Pale, even evening light under high cloud; the wet flats mirror the sky so that boat and oars seem to float.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-14 · 조수 상어 전사
마렌시아의 노래 · 유닛 · 레벨 3 · 일반 · 틀 `reflect` R L `moontide` · 프롬프트 n2 → `tools/art/inbox/G3-14.jpg`

```
Landscape 5:4 painting. A film of ebbing water on a dark stone slipway, seen from close above, holds the whole story upside down. Cropped at the knees along the top edge stand the grey legs of a shark-headed fighter; below them, in the left of the mirror, hangs the full reflection — broad shoulders, tall dorsal fin, a whalebone blade edged with teeth already swinging back toward the right. Three sets of wet boot prints hurry into the frame from that side, straight into the returning shallows. The moon low behind the figure turns the wet stone to silver and draws the reflection in hard dark shapes.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-15 · 넬리아의 정령
마렌시아의 노래 · 유닛 · 레벨 3 · 일반 · 틀 `ground` R L `glasscalm` · 프롬프트 n2 → `tools/art/inbox/G3-15.jpg`

```
Landscape 5:4 painting. Down among the offering vessels on the wet flagstones of a shrine. One thin stream of water is pouring itself from a smooth round gourd bowl into a dented bronze ewer with a jagged, broken lip — and it is two creatures at once. In the bowl its tail end still curls in a soft laughing loop; rising from the ewer, on the left, its upper half has become a furious little water-woman facing right, fists clenched, hair bristling in sharp spikes of spray. Soft grey daylight from an open doorway behind glows through the water figure and gleams on wet stone.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-16 · 해마 근위병
마렌시아의 노래 · 유닛 · 레벨 3 · 일반 · 틀 `tilt` L R `trench` · 프롬프트 n2 → `tools/art/inbox/G3-16.jpg`

```
Landscape 5:4 painting. The whole frame tips with the force of a deep current. On the right a big armour-ridged seahorse leans hard into it, facing left, tail wound three times around a branch of black coral and stretched taut as a mooring line; grit, torn weed and a tumbling clay jar streak past its snout. Its fin crest is flattened, its eye steady. Behind its back, a soft pale glow and a few rising bubbles mark someone still singing. Deep water, almost black; a cold blue glow from behind outlines its plates, and specks of drifting plankton spark in the current.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-17 · 석호 치유 듀공
마렌시아의 노래 · 유닛 · 레벨 3 · 일반 · 틀 `far` R C `moontide` · 프롬프트 n2 → `tools/art/inbox/G3-17.jpg`

```
Landscape 5:4 painting. Far across a night lagoon a plump grey dugong, small in the middle of the frame, swims to the right with a bandaged figure lying slack along its back, whiskered snout just clear of the surface. The water is so still that its wake reads like a drawing: one slow, perfect circle traced around the lagoon, almost closed. Mangrove shadows and the lamps of a distant stilt village rim the horizon. A low moon lays one silver path across the lagoon; the circular wake catches it as a thin bright line.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-18 · 물기둥 산호 정령
마렌시아의 노래 · 유닛 · 레벨 3 · 일반 · 틀 `ground` L R `coraldawn` · 프롬프트 n2 → `tools/art/inbox/G3-18.jpg`

```
Landscape 5:4 painting. A man-high figure of branching pink and orange coral, polyps glowing, stands in the right third of a reef flat, seen from a camera half-sunk at the waterline with foam and grit against the lens. It faces left with one antlered arm thrown upward. Just behind it a pillar of seawater has risen in the very same pose — same lean, same height, same crooked reach — like a shadow copying its owner. A small fish darts out of the lower corner. Warm early sun from the left lights the coral and shines through the standing water, which glows green-gold at its edges.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG3-5 · 물방울 보주
마렌시아의 노래 · 아이템 · 레벨 3 · 일반 · 틀 `bench` N C `coraldawn` · 프롬프트 n2 → `tools/art/inbox/IG3-5.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. On a glassmaker's workbench among tongs, shears and a blowpipe sits a clear orb the size of an apple on a cork collar, and at its very centre floats one perfect drop of water. The bench around it is dry, except for this: thin dark wet lines have crept outward from under the orb along every crack and joint in the old planks, like roots, and one has reached the edge and hangs there as a bead. First rosy light through a workshop window on the left shines through the orb and throws a small bright lens-spot on the wood.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### IG3-8 · 조수의 삼지창
마렌시아의 노래 · 아이템 · 레벨 3 · 일반 · 틀 `used` N C `glasscalm` · 프롬프트 n2 → `tools/art/inbox/IG3-8.jpg`

```
Landscape 5:4 painting of one object — the object itself is the subject. A bronze trident, green with age, stands planted upright in the tidal shallows at the centre of the frame, and the sea has taken sides around it. To the left of the shaft the water is heaped a full hand higher, smooth and brimming; to the right it has drawn back to bare weed-covered rock where starfish and a flapping sole lie stranded. The step between the two levels runs straight out from the tines toward the horizon. Windless, soft-grey light; the raised water on one side reflects the sky like a mirror, the wet sand on the other only dully.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### SG3-09 · 대해류
마렌시아의 노래 · 공용 마법 · 레벨 3 · 일반 · 틀 `object` L L `stormsea` · 프롬프트 n2 → `tools/art/inbox/SG3-09.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One anchored galley tells it. Out on the open sea the great current beneath her has turned, and the empty ship has swung right round on her anchor chain to lie stern-first, set in the left of the frame. From her prow the wreaths, ribbons and the carved luck-fish that hung there are tearing loose and streaming away to the left on the new flow, a long bright trail of them dwindling across the grey swell. Low slate sky; a pale band on the horizon lights the drifting charms and the wet curve of the hull.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-24 · 소용돌이 켈피
마렌시아의 노래 · 유닛 · 레벨 4 · 일반 · 틀 `high` R C `trench` · 프롬프트 n2 → `tools/art/inbox/G3-24.jpg`

```
Landscape 5:4 painting. Looking steeply down into a black tarn: at the centre a water horse stands chest-deep and tosses its long seaweed mane to the right, and the pool has begun to turn with it. Pale foam winds outward from its shoulders in a tightening spiral that already fills the frame; a lost riding boot and a single oar ride the outer coil. Its wet back is bare and broad, an easy seat, one ear turned up toward us. Night; a cold glow from under the water lights the spiral from below, leaving the horse a dark shape with a wet sheen.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### RG3-1 · 대해일
마렌시아의 노래 · 공용 마법 · 레벨 4 · 일반 · 틀 `cut` U B `trench` · 프롬프트 n2 → `tools/art/inbox/RG3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The sea in cross-section at the instant of one great heartbeat. Deep in the seabed at the bottom of the frame a vast dark seam like an artery has flashed bright, and from it a dome of pressure is rising through the black water, bending every layer it crosses. At the top the surface is already heaved into a long smooth hump, lifting a toy-small fishing pier and its lighthouse rock toward the sky. A pulse of cold blue from the seam below is the single light, fading upward through navy water to a dim grey surface.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-28 · 석호의 자장가
마렌시아의 노래 · 유닛 · 레벨 5 · 일반 · 틀 `far` L R `glasscalm` · 프롬프트 n2 → `tools/art/inbox/G3-28.jpg`

```
Landscape 5:4 painting. A long grey shore seen from far off, sea and sky a single pale sheet. Small in the right of the frame a tall hooded shape of mist and slow water drifts leftward along the tideline, its edges curving like a pair of cradling arms. Behind it, one after another, a row of little reed rafts, each carrying a white-wrapped bundle and a candle, slides off the sand unpushed and follows it quietly out to sea. Windless fog at dusk; the candles and the shape's faint inner glow are the only warm and bright points on the still water.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-42 · 해일 바다뱀
마렌시아의 노래 · 유닛 · 레벨 5 · 일반 · 틀 `echo` R X `coraldawn` · 프롬프트 n2 → `tools/art/inbox/G3-42.jpg`

```
Landscape 5:4 painting. One leap shown four times across the frame, left to right, like overlapping exposures: a long ribbon-finned sea serpent arcs out of the crest of a tidal wave, higher in each image, blue-green coils looping over the foam, until in the last it dives toward the right-hand shore. Under the earliest, faintest image the wave has already passed: only wet sand shining and a scatter of round shields lying face-up remain. Dawn sun low behind the wave shines pink and green through its lip and through the serpent's translucent fins.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-29 · 넬리아의 현신
마렌시아의 노래 · 유닛 · 레벨 6 · 일반 · 틀 `eye` F C `lagoon` · 프롬프트 n2 → `tools/art/inbox/G3-29.jpg`

```
Landscape 5:4 painting. On a jetty at eye level, beside three small onlookers seen from behind — a child, an old woman, a fisherman with a net on his shoulder — we face a figure of clear flowing water risen from the lagoon, taller than the temple roofs. Its outline is three at once, sliding over one another like reflections: a laughing girl with loose streaming hair, a crowned queen in armour of spray, a bent elder leaning on a staff of falling water, all sharing one column below the waist. High bright sun behind the onlookers shines through the triple figure, scattering nets of light across the jetty and the shallows.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-33 · 심해의 크라켄
마렌시아의 노래 · 유닛 · 레벨 7 · 일반 · 틀 `cut` U B `trench` · 프롬프트 n2 → `tools/art/inbox/G3-33.jpg`

```
Landscape 5:4 painting. The sea cut open in cross-section, top to bottom. Along the upper edge runs the thin bright line of the surface with a row of tiny floating lamps where the singers are; beneath it, the long dark water column. From the black trench at the bottom rises the colossal dark-red mantle of a kraken, one huge eye open, barbed tentacles climbing through layer after layer of fading light — the longest tip coiling a single arm's reach below the lamps. Light dies downward from pale blue to black; a faint pulse of cold glow from the trench floor outlines the mantle from beneath.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### G3-36 · 샘물의 만조
마렌시아의 노래 · 유닛 · 레벨 7 · 일반 · 틀 `silhouette` L X `moontide` · 프롬프트 n2 → `tools/art/inbox/G3-36.jpg`

```
Landscape 5:4 painting. Against an enormous low moon stands the high tide itself: a towering swell of water risen like a striding figure, leaning left, so tall its foam crown brushes the top of the frame. It is all dark outline, with moonlight glowing green through its thin edges. At its feet lies a land cracked by drought, and a line of tiny people with jars and yokes files up to the one brimming spring from which the giant rises. The full moon directly behind makes the figure a translucent silhouette and lays its long shadow across the pale cracked earth.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

## 3. 그림 있음 — 그리지 않는다 (참고용) · 1장

### A1-02 · 그림자 도둑 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 1 · 일반 · 틀 `inside` L R `candle` · 프롬프트 n2 → `tools/art/inbox/A1-02.jpg`

```
Landscape 5:4 painting. From inside a street lantern, past its sooty glass panes and the flame at the bottom edge: on the wet cobbles below, a thin black cat with a nicked ear crouches at the right, just outside the circle of light, and peels the long shadow of a passing merchant off the stones like a strip of black cloth, gathering it in its teeth as it creeps left. The merchant walks on out of frame, purse still on his belt, the lit cobbles at his heels bare. Warm amber from the lantern flame pools on the cobbles; beyond its edge the alley is violet-black.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```
