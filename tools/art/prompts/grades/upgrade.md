# 강화 (Empowered) — 카드 일러스트 프롬프트 (40장, n2)

> 레어와 에픽 사이(3.5단) — 원래 카드의 그 개체가 한 단계 오른 모습. 장면은 원래 카드와 같은 자리 · 방향 · 배색 · 장소에서 그 이야기의 다음 순간을 그린다(2026-11-22). 원래 카드 그림이 있으면 함께 넣는다(없어도 장면 글만으로 이어진다). 더 큰 몸 · 보강한 장비, 발밑에서 오르는 청록빛, 무늬 · 뿔 · 갈기 · 이음매를 따라 도는 빛, 선명한 색과 옅게 빛나는 안개.

등급 줄(모든 강화 프롬프트에 들어 있다): `Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 나온 그림(가로 5:4)은 `tools/art/inbox/<카드ID>.jpg` → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저(원래 카드와 같은 틀 · 다음 순간 — 섬네일로 나란히 놓아 짝으로 읽히는지 본다).

## 1. 그림 없는 카드 — 먼저 그린다 · 40장

### UP-A1-09 · 모르크 거미 여왕
모르카스의 그믐 · 유닛 · 레벨 3 · 강화 · 틀 `under` R X `eclipse` · 원래 카드 `A1-09` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A1-09.jpg`

```
Landscape 5:4 painting. From the bottom of the same deep canyon, looking straight up: the two rock walls rise like the sides of a well to a thin crooked strip of night sky, and the web of black threads now fills the whole shaft in three great tiers, one above another. On the lowest tier, close above us and as broad as a cart, the same spider with clustered violet eyes spreads her legs wide and creeps toward the right-hand wall, where three lanterns hang wrapped in silk, the nearest still alight. Her young, small as cats, work along the upper tiers. The strip of sky gives a thin cold light that outlines every tier and leg; the one burning lantern is a warm speck in violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A1-11 · 계약단 쥐 선봉장
모르카스의 그믐 · 유닛 · 레벨 3 · 강화 · 틀 `eye` R L `violetshade` · 원래 카드 `A1-11` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A1-11.jpg`

```
Landscape 5:4 painting. At eye level before the same stone offering-ledge, and now it stands at the head of the line: the same rat soldier, grey-furred with one torn ear, upright at the left of the frame and facing right, a head taller, broad-shouldered, a pale scar across its brow. Over plain dark leather it wears the same dented pauldron with two more strapped above it, and its spear rests in the crook of its arm. On the ledge three identical brass cups pour equal measures of violet flame into one wide bowl. Behind it, soft in the gloom, a file of rat soldiers waits, each holding a cup. The joined violet flame lights its muzzle, knuckles and the stacked pauldrons from the right; the barracks vault behind is purple-black.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A1-15 · 피를 마시는 마검
모르카스의 그믐 · 유닛 · 레벨 4 · 강화 · 틀 `ground` F B `frostindigo` · 원래 카드 `A1-15` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A1-15.jpg`

```
Landscape 5:4 painting. Camera on frosted flagstones, looking along the ground: the same black sword stands upright by itself in the lower middle of the frame, point resting on the stone, edge turned toward us — longer and broader now, and the eye carved on its guard has opened, a slit of red. Thick red smoke climbs from the blade in three twisting strands. The empty gauntlets around it have grown to a wide circle of many pairs, old and new, and the three nearest pairs lie with their fingers touching the blade. The hoarfrost has melted in a dark ring about its point. Cold blue-violet night air; a tarnished-silver gleam runs down the edge, and the open eye throws a thin red light on the nearest gauntlets.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A1-18 · 그림자 학살자
모르카스의 그믐 · 유닛 · 레벨 4 · 강화 · 틀 `reflect` L R `bonepale` · 원래 카드 `A1-18` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A1-18.jpg`

```
Landscape 5:4 painting. The same shadow-play screen of stretched pale cloth fills the frame, lit from behind, and the wolf-like shadow thrown on it from the right has grown until its back presses the top edge: a head with too many fangs facing left, smoke fraying from its outline. Along the lower edge most of the paper-puppet heroes are gone — bare sticks stand where they were, three puppets hang from its closed jaws, and the last few lean away to the left. Where its forepaw falls, real black claws have torn through the cloth, and two violet eyes burn through it above. The lamp behind the screen bleaches the cloth bone-white; every shape on it is flat black, the claws and eyes edged with violet.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A1-23 · 대낫 사신
모르카스의 그믐 · 유닛 · 레벨 5 · 강화 · 틀 `back` B B `bloodink` · 원래 카드 `A1-23` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A1-23.jpg`

```
Landscape 5:4 painting. Seen from behind, low in the frame: the same tall hooded reaper in a tattered black robe wades away from us through the night field where rolled parchments grow upright on thin stalks like wheat, each tied with a red ribbon. The scythe in his bone hands is a great one now, its blade as long as he is tall, caught at the end of a full swing. The narrow swath behind him has become a broad road of stubble three strokes wide, and above every stump hangs a looping flourish of red ink. Three thick ledgers swing from his belt. Moonless black sky; the hanging red flourishes glow crimson along the whole mown road, and a thread of violet edges the long blade.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-11 · 창뿔 유니콘
솔란테의 새벽 · 유닛 · 레벨 3 · 강화 · 틀 `tilt` F C `vigil` · 원래 카드 `A2-11` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A2-11.jpg`

```
Landscape 5:4 painting. A tilted frame in the same night stable, grown too small for him: a young white stallion with a flying gold mane stands planted in the straw where the foal once skidded, legs square, head lowered toward us. The horn on his brow is a pearly spiral as long as a spear, and the clean wedge it cuts through the darkness now runs the whole length of the stable and out through the open door, across the yard to the far gate. Every straw, bucket and cobweb inside the wedge stands clear; the stalls on either side stay black, three foals watching from them. One hanging stable lantern glows small and amber behind him; the long wedge of clear air before the horn is cool and shadowless.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-15 · 솔란테의 서약 기사
솔란테의 새벽 · 유닛 · 레벨 4 · 강화 · 틀 `reflect` F C `rosedawn` · 원래 카드 `A2-15` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A2-15.jpg`

```
Landscape 5:4 painting. The same still puddle on the rain-washed terrace fills most of the frame, and in it, upside down, stands the reflection of the same figure of white marble flecked with gold leaf — now in white-gold plate over its robe, both stone hands on the pommel of the same plain sword set point-down, chin level, perfectly upright. Its feet in gilded sabatons and the sword's tip enter the top edge of the picture. In the reflection three thin sword-shaped rays of light hang point-down over its head like a crown, and three white ribbons tied at its elbow stir in the wind. Pink-gold dawn clouds fill the water around the reflected figure; the wet stone at the frame's edges is dull lilac.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-17 · 황금 스핑크스
솔란테의 새벽 · 유닛 · 레벨 4 · 강화 · 틀 `high` L C `whitegold` · 원래 카드 `A2-17` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A2-17.jpg`

```
Landscape 5:4 painting. Looking down from the top of the same gatehouse: the lion-bodied sphinx lies across the threshold, grown so that her flanks touch both gateposts, her fur turned bright gold, folded wings gilded at their edges, the sun-disk crown blazing from above. Her calm face is turned left toward a traveller who stands straight before her, hat held still against his chest. Behind her the white gate stands open at last, and the earlier arrivals are filing through it with their bundles, their cooking pot left warm and steaming by the road. Clear mid-morning sun from the right throws the gate tower's cool blue shadow across half the road; the sphinx lies in full light, her crown the brightest thing in the frame.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-22 · 솔란테의 대성종
솔란테의 새벽 · 유닛 · 레벨 5 · 강화 · 틀 `over` B L `firstlight` · 원래 카드 `A2-22` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A2-22.jpg`

```
Landscape 5:4 painting. Over the bronze shoulder of the same bell in its open belfry, close at the left of the frame — a far greater bell now, its shoulder filling the whole left side, three bands of rising-sun engravings running round its rim. It hangs at the top of its stroke toward the arch, light pouring from its mouth. Beyond the arch the sun stands a full hand above the horizon, exactly in line with the bell's lip; across the citadel below shutters are opening street by street, and three rings of bright air spread outward over the dark country. Cold blue-grey lingers in the far country; the bell's inner glow and the risen sun warm the belfry and the nearest roofs.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-24 · 빛의 대거울
솔란테의 새벽 · 유닛 · 레벨 5 · 강화 · 틀 `echo` L X `rosedawn` · 원래 카드 `A2-24` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A2-24.jpg`

```
Landscape 5:4 painting. A great oval mirror in a gilt frame, tall as a gate, stands upright on its own in the same cloister walk at the right, its silvered face turned left, two smaller mirrors set behind it like half-folded wings. Three thrown javelins are painted as overlapping moments along three lines across the frame: ghost-images flying in from the left edge, three tips just touching the glass, and all three already speeding back out the way they came, joined into one bright shaft of light. The glass itself holds only dawn sky, perfectly calm. Pink-gold dawn fills the mirror and spills from it across the paving in a wide bright fan; the arches behind are lilac shadow.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-10 · 속사 하피
벨루미르의 별 · 유닛 · 레벨 3 · 강화 · 틀 `eye` B R `moonsilver` · 원래 카드 `A3-10` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A3-10.jpg`

```
Landscape 5:4 painting. On the same swaying rope bridge between two rock pinnacles, at eye level: the harpy stands tall in the right of the frame with her back to us, a bird-woman with storm-grey and teal wings for arms, wild wind-tossed hair and hooked black talons. Her wings are full and glossy now, every gap regrown, and both are flung wide in the instant after a volley. Ahead of her three fans of feather-darts fly out into the night toward the far pinnacle, and a new feather is already sliding into each empty place. Shed feathers lie ankle-deep on the planks behind her. A full moon high on the left bleaches the feather drifts blue-white and silvers the flying darts.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-11 · 질풍 그리핀
벨루미르의 별 · 유닛 · 레벨 3 · 강화 · 틀 `eye` F L `thinair` · 원래 카드 `A3-11` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A3-11.jpg`

```
Landscape 5:4 painting. The same stone landing ledge in the left of the frame, at eye level: a young griffin, now the size of a horse, has just touched down facing us, chest out, teal-grey eagle head sleek, broad wings still half open, golden beak, tawny lion haunches, tail lashing. The leather message tube on its chest harness is buckled shut, and three more sealed scrolls are gripped in its foreclaws. Behind it the wind of its arrival is still coming in: cloud torn into a long straight furrow across the right of the sky, pennants on the ledge standing straight out. Clear, pale noon light at high altitude, white cloud banks below the ledge and a cool shadow under its spread wings.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-18 · 쌍둥이자리 궁수장
벨루미르의 별 · 유닛 · 레벨 4 · 강화 · 틀 `front` F X `starindigo` · 원래 카드 `A3-18` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A3-18.jpg`

```
Landscape 5:4 painting. Dead-on and mirror-symmetrical on the same bare hilltop: the two archers drawn by stars stand side by side across the frame, taller now and densely set with bright points, thin silver lines joining them, night sky inside their outlines, and between their shoulders a third, fainter star-figure has begun to trace itself. Their great bows are lowered after the shot in matching poses. On the exact centre line three arrows of light fly toward us nose to tail, each riding the glowing groove of the one before, and the groove has widened into a bright road. Deep indigo night; the figures' star points and the arrows' silver road are the light, with one faint teal wind streak.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-23 · 별여우 순찰대장
벨루미르의 별 · 유닛 · 레벨 5 · 강화 · 틀 `top` L L `moonsilver` · 원래 카드 `A3-23` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A3-23.jpg`

```
Landscape 5:4 painting. Straight overhead, like a map: the same high plateau of pale grass, standing stones and dry stream beds at night, its web of starlit paths now complete to every edge of the frame. In the left of the picture a large indigo fox speckled with stars trots toward the left, a small silver badge at its throat, its long brush tail parted into three plumes that lay three bright strokes side by side — the newest trail a broad road. Behind it three smaller star-foxes follow nose to tail along the fresh light. Full moon straight above: blue-silver grass, small sharp shadows beside each stone, the trails paler silver with a breath of teal.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-24 · 번개 텐구 대장
벨루미르의 별 · 유닛 · 레벨 5 · 강화 · 틀 `close` R L `stormcloud` · 원래 카드 `A3-24` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-A3-24.jpg`

```
Landscape 5:4 painting. Head and shoulders of the same tengu fill the left of the frame, turned toward the right: the crow-beaked face, glossy black feathers beaded with rain, a streak of white now through his crest, one broad wing hunched behind. A lacquered war-bow is raised with three arrows on the string at once; the other hand holds his fan of long storm feathers high. Three threads of lightning have come down from the cloud at the fan's bidding and sit on the three steel points as bright beads, crackling into one another. Dark grey-violet thundercloud presses low overhead; the three beads of lightning light the beak, the fan and the wet feathers from below with cold white-teal.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B1-12 · 폭약 공병장
도르마크의 심장불 · 유닛 · 레벨 3 · 강화 · 틀 `swarm` L X `whitehot` · 원래 카드 `B1-12` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B1-12.jpg`

```
Landscape 5:4 painting. Cat-sized rats with burning silvery-red fur fill the frame from edge to edge, the same living tide pouring leftward out of the white-hot crack in the rock at the upper right — and now it runs in three orderly columns. At the head of the middle column, larger than the rest and reared upright on its hind legs, goes their chief, a loop of measuring cord across its chest and a coil of fuse over one shoulder, flame-tipped tail held high like a banner, an iron comb at its belt. Each rat behind it carries a small clay charge in its teeth. All light pours from the crevice behind them, a blinding core that turns the nearest rats to bright outlines and the far ones to crimson shadow.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B1-17 · 거포 거북
도르마크의 심장불 · 유닛 · 레벨 4 · 강화 · 틀 `profile` R L `ashfall` · 원래 카드 `B1-17` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B1-17.jpg`

```
Landscape 5:4 painting. Strict side view, flat as a diagram: on the same firing ledge at the left stands the huge tortoise facing right, grown half again as large, its shell of cooled black lava split by glowing seams and girded with scorched brass bands. Where one crater used to be, three smoking vents now rise along its back. Three glowing rocks have been lobbed together and hang in three high smoke arcs across the pale sky. Along the ground runs the row of white range-posts, and beyond the last of them a far ridge is already marked with three rising puffs of dust. Even grey daylight under a high ash haze; the lobbed rocks and the shell seams are the warm notes.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B1-18 · 불개미 철벽대
도르마크의 심장불 · 유닛 · 레벨 4 · 강화 · 틀 `cut` R B `ember` · 원래 카드 `B1-18` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B1-18.jpg`

```
Landscape 5:4 painting. The same cross-section through the ground: a thin strip along the top shows the plank floor of the powder store with its sacks and crates; below is dark earth riddled with tunnels. In the main tunnel across the bottom of the frame the dog-sized ants with glossy red-black shells have locked themselves shoulder to shoulder, three rows deep, into a living wall facing right, mandibles meshed, every joint glowing. Their shells are thicker now, ridged like plate. Beyond the wall the tunnel is choked with fallen earth from a blast; behind it the egg chamber lies safe and whole. Underground dark; the ants' hot joints are the light, a solid bar of orange points where the wall stands.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B1-24 · 박격포 명사수
도르마크의 심장불 · 유닛 · 레벨 5 · 강화 · 틀 `low` R B `ashfall` · 원래 카드 `B1-24` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B1-24.jpg`

```
Landscape 5:4 painting. Down beside the baseplate of the mortar, looking up: the same stocky wolverine gunner in a scorched leather apron stands square at the lower left, grizzled now, one forepaw raised with a single claw up to sight the sky, a brass spyglass tucked in its belt. Beside it three stubby tubes stand in a row on one plate, all breathing smoke. High above, three curved lines of smoke climb together over the top of the tall battlement wall toward the right, their shells three small dark dots in a tight cluster against the pale sky. Pale overcast afternoon; the last orange of the muzzle flashes still glows inside the three mouths.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-12 · 단조 명장
소르그림의 방패 · 유닛 · 레벨 3 · 강화 · 틀 `macro` N C `forgeheart` · 원래 카드 `B2-12` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B2-12.jpg`

```
Landscape 5:4 painting. Extreme close-up of the same two ape palms held side by side before a bed of glowing coals, with their places changed. On the right is the hand that was the apprentice's, grown broad and soot-grained, its fur gone silver at the wrist where the same iron ring gleams, the callus ridge thick and yellow, the hammer groove polished deep. On the left a small new hand, pink at the edges, copies its pose. Across the master's palm lie three hammers of rising size, the smallest the plain one it began with, and a glowing blade-blank rests on its fingertips. Coals behind push molten orange between the fingers and along the edges of both hands; a dim steel-grey light from the front shows the palms.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-17 · 무쇠뿔 산양왕
소르그림의 방패 · 유닛 · 레벨 4 · 강화 · 틀 `far` L R `coldsteel` · 원래 카드 `B2-17` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B2-17.jpg`

```
Landscape 5:4 painting. From across the same gorge at dusk, nearer than before: the long rampart of grey stone climbs the mountain's spine from the left, tower after tower, to the bare crag on the right of the frame. On it stands the same shaggy grey mountain goat facing left along the wall, now as tall as the battlements, its curled horns of dark raw iron grown to a full double turn, wider than its shoulders. Three new courses of iron-banded masonry run from the wall's broken end to the rock beneath its hooves, closing the gap. In its lee stand three younger goats with short iron horns. Blue-grey dusk under a clearing sky; the last cold light catches the great iron horns and the new iron bands in hard pale highlights against slate rock.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-18 · 증기 황소 우두머리
소르그림의 방패 · 유닛 · 레벨 4 · 강화 · 틀 `profile` R L `lamplit` · 원래 카드 `B2-18` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B2-18.jpg`

```
Landscape 5:4 painting. Flat as a frieze, the same street of the underground city in side view: at the left the polished bronze bull stands facing right, head low, grown to fill the height of the street, three glowing firebox doors now in a row along its riveted boiler belly and the brass valve between its horns singing. Twin jets of steam roar from its nostrils the whole length of the frame, and every hanging lantern ahead is flung level on its chain, shop shutters bowing inward. Behind its tail three smaller bronze bulls stand in file, heads low in the same pose. The flung street lanterns throw warm streaks over black stone; bronze flanks and steam catch amber, the vault overhead stays dark.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-22 · 쇠 먹는 불가사리 왕
소르그림의 방패 · 유닛 · 레벨 5 · 강화 · 틀 `high` R B `lamplit` · 원래 카드 `B2-22` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B2-22.jpg`

```
Landscape 5:4 painting. Down from a balcony into the same narrow lane of the underground city: the plank doors along both sides are gone entirely, only empty stone doorways left, and the nearest lamp brackets have been bitten off short. At the bottom of the frame the culprit ambles toward the right, now the size of an ox-cart and filling the lane wall to wall — bull's head, short trunk-like snout, fur of bristling needles grown long as swords, its hide plated with half-sunk shields and gate hinges. It chews steadily, three links of anchor chain trailing from the corner of its mouth. The lamps still standing leave small warm circles down the dark lane; the needle fur glints steel-grey wherever a circle touches it.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-24 · 철골 가고일 수문장
소르그림의 방패 · 유닛 · 레벨 5 · 강화 · 틀 `silhouette` R R `snowlight` · 원래 카드 `B2-24` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B2-24.jpg`

```
Landscape 5:4 painting. Against the same white snow-sky, a black shape crouches on the timber lintel of the mine mouth at the right of the frame, facing right: the gargoyle of open iron girders, grown twice as broad, its bat wings of riveted sheet steel spread wide to roof the whole entrance, long hooked jaw lifted. The sky still shows through its hollow ribcage, and the wind drives three streams of snow through the gaps into long plumes on the far side. Three heavy chains hang from its claws across the mine mouth, and below, a file of lantern-carriers walks out beneath it, each touching a cap to it. Overcast mountain daylight behind it, bright and flat; the gargoyle and the mine mouth are solid black, the blown snow a soft grey veil.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B3-12 · 방전 요정 여왕
케라운의 벼락 · 유닛 · 레벨 3 · 강화 · 틀 `eye` B L `flash` · 원래 카드 `B3-12` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B3-12.jpg`

```
Landscape 5:4 painting. The same hand-sized sprite of pure spark hovers with her back to us in the left of the frame, brighter and steadier now, arms held wide, her spiky hair drawn up into a crown of small arcs. Around her bursts a great star of lightning with three rings, and it is burning a huge fresh black star into the whitewashed laboratory wall, covering all the ghosts of the older scorch-stars. Three smaller spark sprites hover in a row behind her like attendants. The ladder, bucket and brush stand beside the wall, seen from a few steps away at eye level. The burst bleaches the wall white-yellow and throws hard black shadows of ladder and bucket off to the right.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B3-18 · 안경원숭이 수석공학자
케라운의 벼락 · 유닛 · 레벨 4 · 강화 · 틀 `macro` F R `wetglass` · 원래 카드 `B3-18` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B3-18.jpg`

```
Landscape 5:4 painting. The same tarsier engineer's enormous amber eye fills the right half of the frame in extreme close-up, peering straight at us through a brass goggle now fitted with three stacked lenses on swing-arms, fine fur silvered where it curls over the rim. In front of the lenses, sharp and enormous, the long slender fingers with round padded tips hold three tweezers at once, fanned like chopsticks, threading three hair-thin copper wires through a tiny finished clockwork heart of steel cogs that has begun to turn. Out of focus behind: a cold mug and the head of a smith's hammer. Grey dawn through a wet workshop window; three beads of solder glow yellow at the wire ends and twinkle in the lenses.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B3-22 · 전격 수호거상
케라운의 벼락 · 유닛 · 레벨 5 · 강화 · 틀 `back` L C `cobalt` · 원래 카드 `B3-22` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B3-22.jpg`

```
Landscape 5:4 painting. From behind the same boxy guardian machine of riveted steel and copper coils, grown into a colossus that stands astride the city gate: its back fills the middle of the frame from edge to edge, crowned with three tall coils, porcelain insulators gleaming like a collar. Past its left flank we look down the night road where a long column approaches, tiny and dim — and every buckle, blade and wheel rim among them is picked out by a trembling spark, the sparks drawn upward in thin threads toward the three coils. Deep blue night; the coils blaze yellow, and their light reaches all the way down the road wherever it finds metal.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B3-23 · 병 속의 원로교수 두뇌
케라운의 벼락 · 유닛 · 레벨 5 · 강화 · 틀 `over` B R `copperlab` · 원래 카드 `B3-23` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-B3-23.jpg`

```
Landscape 5:4 painting. Over the shoulder of the same glass jar on spindly brass legs, standing at the lectern in the right foreground: the jar is taller now, capped with a brass dome, and the wrinkled brain floating in its glowing fluid wears its copper wires swept back like a long white-gold wig. Two smaller jars stand wired to it at either side. Beyond, the tiers of wooden benches climb into shadow, and three arcs leap from the lid across the hall at once — every student on every bench sits bolt upright, hair on end, quills moving together. Amber lecture-hall lamps and the jar's yellow fluid; the three arcs draw sharp bright lines through the brown gloom.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-PN-B3-C2 · 길들인 축전기
케라운의 벼락 · 유닛 · 레벨 5 · 강화 · 틀 `ground` L L `flash` · 원래 카드 `PN-B3-C2` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-PN-B3-C2.jpg`

```
Landscape 5:4 painting. The same glass drum on six spindly brass legs walks calmly toward the left across the left of the frame, seen by a camera lying on the cobbles of the lane. It is crammed full of lightning and glows a steady white: its old cracks are mended with bright seams of solder, three new copper hoops gird it, and a leather harness is buckled over them with a brass bell at the front. From its terminal knobs three tidy arcs reach down in turn and light the three street lamps it passes. A mended rivet shines on every leg. The drum's steady glare bleaches the lane white-yellow and throws the legs' black shadows long across the cobbles toward us.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G1-11 · 흑요 창술사
고르바스의 발톱 · 유닛 · 레벨 3 · 강화 · 틀 `through` F C `firelit` · 원래 카드 `G1-11` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G1-11.jpg`

```
Landscape 5:4 painting. Through the triangular door of the same hide tent, glimpsed from outside in the dark: the mongoose spearman now stands just inside facing us, lean and scarred across the muzzle, long tail curled round its feet, holding its spear upright in both clawed paws. The spearhead is a long clean leaf of knapped black obsidian, bound with fresh sinew and catching the light like black glass. Behind it three more finished spears lean in a row against the tent pole, and on the scrap of hide at its feet lie the chips and the two rejected points it began with. One small tallow flame inside the tent lights its paws, jaw and the obsidian leaf from below; the tent flaps are dark frames on both sides.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G1-18 · 오우거 대주술사
고르바스의 발톱 · 유닛 · 레벨 4 · 강화 · 틀 `silhouette` L L `strawgold` · 원래 카드 `G1-18` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G1-18.jpg`

```
Landscape 5:4 painting. The same enormous pot-bellied ogre, a black silhouette against the pale straw-coloured evening sky at the left of the frame, has risen to its knees with one huge ear still tilted to the ground, and brings one open palm down flat on the earth. Bone charms hang from its neck in three long strings, and a horned headdress crowns the shape. To the right the plain answers: the ground lifts into three slow concentric ridges like rings on a pond, grass riding their crests, pebbles hanging a hand's width in the air, the farthest ring reaching the horizon. The sun has just set behind it; a low band of pale light outlines the whole shape and every ridge of earth, and throws its long shadow toward us.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G1-24 · 하이에나 대무리장
고르바스의 발톱 · 유닛 · 레벨 5 · 강화 · 틀 `low` L L `firelit` · 원래 카드 `G1-24` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G1-24.jpg`

```
Landscape 5:4 painting. The same big scarred hyena stands laughing on the bare mound at the left of the frame, seen from low in the grass against the night sky — huge and grizzled now, one ear torn to a stump, three healed claw scars across its broad muzzle, bristling mane, head thrown back and to the left with heavy jaws wide open. The pack has arrived: all along the bottom edge and up the sides of the mound stand hyenas in three ranks, heads raised, laughing with it. A necklace of knuckle-bones hangs on its chest. The cooking fire at the mound's foot has been fed to a blaze and lights its chest, throat and the nearest faces from below; stars behind.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G2-17 · 두꺼비 대주술사
베르단의 뿔 · 유닛 · 레벨 4 · 강화 · 틀 `back` B C `sporeglow` · 원래 카드 `G2-17` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G2-17.jpg`

```
Landscape 5:4 painting. The same broad warty toad shaman squats on its root with its back to us, grown as big as a boulder, moss thick along its spine and small mushrooms sprouting from its shoulders, a wad of moss bulging one cheek, the staff hung with seed-rattles and snail shells planted upright beside it. The half-circle of old trees before it has answered: their trunks bow low, roots lifted out of the soil like feet, and three of them have stepped forward. A great wreath of pale green breath-puffs drifts from its wide mouth and coils through all their branches. Night; the breath-puffs glow pale lime and light the bowing branches and the edge of its mossy shoulders.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G2-22 · 맨드레이크 수문장
베르단의 뿔 · 유닛 · 레벨 5 · 강화 · 틀 `back` R R `sporeglow` · 원래 카드 `G2-22` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G2-22.jpg`

```
Landscape 5:4 painting. The same mandrake, seen from just behind, now stands its full height on forked root-legs with soil still clinging to them: its gnarled root-skinned shoulders and flared crown of broad leaves fill the right foreground, turned toward the right, root-arms spread wide as it screams. The scream shows as three great rings of shuddering air that flatten the thorn thicket ahead into a cleared lane, and the five-way fork of paths beyond is shut — briars woven across four of them, a gate of living thorn standing open on the fifth. Spades and lanterns lie dropped along the path. Night; cold blue-green fungus-light among the briars edges its leaves and catches the trembling rings of air.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G2-23 · 드리엔의 대사도
베르단의 뿔 · 유닛 · 레벨 5 · 강화 · 틀 `close` L R `thorndark` · 원래 카드 `G2-23` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G2-23.jpg`

```
Landscape 5:4 painting. Close on the face of the same dryad singing, on the right of the frame: smooth pale bark with a fine gold grain now showing, eyes closed, lips parted, her blossom-and-leaf hair risen into a crown in full flower. From her mouth three ribbons of leaves stream out to the left across the picture and braid into one — and the leaves that were burnt black are turning green again as they fly, their ember-red rims cooling to new shoots. Where the braid passes, charred branches behind it break into bud. A single bead of sap shines on her cheek. Dark forest dusk behind her; a cool green skylight from above shapes her face, and the last ember-edged leaves are the warm sparks.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-11 · 조수 예언 문어
마렌시아의 노래 · 유닛 · 레벨 3 · 강화 · 틀 `over` L B `stormsea` · 원래 카드 `G3-11` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G3-11.jpg`

```
Landscape 5:4 painting. The same octopus with wise golden eyes sits in the harbour rock pool at the bottom of the frame, grown to fill the pool from rim to rim, seen over the hunched shoulders and straw hats of the three fishermen, dark and close in the foreground. All eight arms are raised from the water together, pointing left out to sea, and the cloud of black ink it unrolled lies spread on the pool like a chart with three clear channels through it. Behind the men every boat is lashed down double, and out on the left the first great wave is breaking exactly where the arms point. Heavy slate morning as the blow arrives; dull light from the open sea glints on wet skin and the spreading ink.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-12 · 산호등 대거북
마렌시아의 노래 · 유닛 · 레벨 3 · 강화 · 틀 `profile` R L `lagoon` · 원래 카드 `G3-12` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G3-12.jpg`

```
Landscape 5:4 painting. Strict side view underwater, flat as a painted frieze: the same sea turtle swims rightward from the left of the frame, flippers mid-stroke, grown vast — the reef on its domed shell now rises in three tiers of pink and ochre coral, anemones waving, whole shoals of striped fish keeping station above it, a small lantern-fish glowing among the branches. Near the crest the old break still shows, healed into the thickest, knobbiest crag of all. Three young turtles swim in its shadow, and the level floor of pale sand runs along the bottom edge far below. Clear midday sun from above plays over shell and sand in bright nets; the water behind fades to deep blue.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-17 · 석호 대치유 듀공
마렌시아의 노래 · 유닛 · 레벨 4 · 강화 · 틀 `far` R C `moontide` · 원래 카드 `G3-17` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G3-17.jpg`

```
Landscape 5:4 painting. Far across the same night lagoon a great grey dugong, broad as a ferry and plain in the middle of the frame, swims to the right with three bandaged figures lying side by side along its back, whiskered snout just clear of the surface. The water is so still that its wake reads like a drawing: three slow, perfect circles traced one inside another around the lagoon, the innermost just closing. One of the figures has sat up and is unwinding a bandage. Mangrove shadows and the lamps of the stilt village rim the horizon. A low moon lays one silver path across the lagoon; the three circular wakes catch it as thin bright lines.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-18 · 물기둥 산호 조율사
마렌시아의 노래 · 유닛 · 레벨 4 · 강화 · 틀 `ground` L R `coraldawn` · 원래 카드 `G3-18` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G3-18.jpg`

```
Landscape 5:4 painting. The same figure of branching pink and orange coral, grown taller than a mast with three great antlered branches and polyps glowing, stands in the right third of the reef flat, seen from a camera half-sunk at the waterline with foam and grit against the lens. It faces left with one antlered arm thrown upward. Behind it three pillars of seawater have risen in the very same pose — same lean, same crooked reach — each a little taller than the last, like a choir copying its conductor. A shoal of small fish hangs inside the nearest pillar. Warm early sun from the left lights the coral and shines through the standing water, which glows green-gold at its edges.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-24 · 검은 갈기 켈피
마렌시아의 노래 · 유닛 · 레벨 5 · 강화 · 틀 `high` R C `trench` · 원래 카드 `G3-24` — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다) · 프롬프트 n2 → `tools/art/inbox/UP-G3-24.jpg`

```
Landscape 5:4 painting. Looking steeply down, as into the tarn, but the water is now a whole sea inlet: at the centre the same water horse stands chest-deep, larger than a fishing boat, dark hide shining wet, and tosses its long seaweed mane to the right — a mane grown black as the abyss, trailing three coils on the current. The slow turning it once started has become a whirlpool that fills the frame, pale foam winding outward from its shoulders in tight spirals; three small boats ride the outer coil, tipped on their sides, with a lost riding boot. Its wet back is still bare and broad, one ear turned up toward us. Night; a cold glow from deep under the water lights the spirals from below, leaving the horse a dark shape with a wet sheen.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: this is the promoted form of a creature that has its own earlier card — its body, markings and belongings are exactly as described above.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```
