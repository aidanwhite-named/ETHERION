# 소환물 (Summoned) — 카드 일러스트 프롬프트 (17장, n2)

> 사다리 밖 — 마법이 방금 불러낸 것. 일반처럼 조용하되 불려 나온 빛만 남는다. 단순하고 또렷하게, 아직 흩어지지 않은 에테르 푸른빛이 가장자리에 남아 있다.

등급 줄(모든 소환물 프롬프트에 들어 있다): `Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 나온 그림(가로 5:4)은 `tools/art/inbox/<카드ID>.jpg` → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저.

## 1. 그림 없는 카드 — 먼저 그린다 · 17장

### TK-A1-1 · 봉랍 사역마
모르카스의 그믐 · 유닛 · 레벨 4 · 소환물 · 틀 `front` F C `bloodink` · 프롬프트 n2 → `tools/art/inbox/TK-A1-1.jpg`

```
Landscape 5:4 painting. Face-on and centred: a lean figure of dark red sealing wax is rising out of a round seal of red wax on a bare stone floor. It is finished only down to the ribs: narrow head, shoulders and thin arms are set and glossy, while everything below is still a twisting rope of molten wax and red-black smoke rooted in the seal. Its ember eyes are just opening and both hands are tugging a collar of wax ribbon straight. Beside the seal stands a small empty cup, one last dark drop still hanging from its lip. The soft seal glows crimson from below, lighting its chin and the smoke; the room beyond is black, with a faint violet edge on the shoulders.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-A2-1 · 빛의 기사
솔란테의 새벽 · 유닛 · 레벨 4 · 소환물 · 틀 `front` F C `whitegold` · 프롬프트 n2 → `tools/art/inbox/TK-A2-1.jpg`

```
Landscape 5:4 painting. Face-on and centred: a knight made wholly of white-gold light stands on bare sunlit flagstones, a plain sword of the same light held upright before its empty, glowing visor. It is only just finished — helm, breastplate and sword-arm are solid and bright, while its legs are still being drawn up in fine threads of light from a small steady flame burning on the stone at its feet. Clear pale daylight with cool blue shadows; the figure is brighter than the day and lays a soft gold pool on the stones around it.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TS-A3-1 · 별똥별 조각
벨루미르의 별 · 공격 마법 · 레벨 1 · 소환물 · 틀 `impact` D B `starindigo` · 프롬프트 n2 → `tools/art/inbox/TS-A3-1.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A splinter of fallen star the size of a thumbnail strikes the flat of a halberd blade planted upright in the grass, low in the frame, at the very instant of contact: a white-hot chip with a short straight tail of sparks behind it, coming down steeply from the upper right. A small ring of sparks jumps from the steel, a bright dent is forming under the chip, and the whole shaft has begun to shiver. Clear indigo night with stars; the chip's white spark is the only light, picking out the blade edge and a few grass blades.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TS-A3-2 · 돌개바람
벨루미르의 별 · 공격 마법 · 레벨 1 · 소환물 · 틀 `column` U R `thinair` · 프롬프트 n2 → `tools/art/inbox/TS-A3-2.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One slender whirlwind stands on a mountain path in the right of the frame, a single twisting column of dust and air as tall as a tower and hardly wider than a doorway, leaning a little as it walks. Round and round inside it climb the things it has picked up: a helmet, one boot, a wooden bucket, a handful of arrows and a scarf, each higher than the last. Its foot scours a clean circle in the gravel. High, pale midday light; the column is bright on its sunward side with a cool shadow down the other and a teal thread up its core.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TS-A3-3 · 불씨
벨루미르의 별 · 공격 마법 · 레벨 1 · 소환물 · 틀 `macro` L L `stormcloud` · 프롬프트 n2 → `tools/art/inbox/TS-A3-3.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Very close on a single ember riding the wind: an orange speck the size of a barley grain, in the left of the frame, carried leftward on a visible curl of air with a hair of smoke behind it. It is about to touch the frayed fringe of a hanging war banner, and the nearest threads have already begun to glow and curl. Beyond the fringe everything is a soft grey blur of cloth and rain. Dull grey-violet storm daylight; the ember is the one warm point, with a faint teal edge on the curl of air that carries it.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TS-A3-4 · 쌍둥이 메아리
벨루미르의 별 · 공용 마법 · 레벨 1 · 소환물 · 틀 `ring` N C `aurora` · 프롬프트 n2 → `tools/art/inbox/TS-A3-4.jpg`

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Two iron helmets sit on neighbouring posts in the centre of the frame, seen square on, and each has just been struck on the brow in exactly the same place by a slim bolt of pale light, one bolt solid and bright, the other its fainter double, arriving half a beat behind. From the two strike points two identical sets of rings spread outward through the air like ripples from a pair of stones dropped together, and where the rings cross they make a bright lens between the helmets. Darkness behind the posts; the bolts and their rings glow teal-green, the fainter double shading to violet.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-U-BOMB · 불붙은 화약통
도르마크의 심장불 · 유닛 · 레벨 1 · 소환물 · 틀 `silhouette` N R `coldnight` · 프롬프트 n2 → `tools/art/inbox/TK-U-BOMB.jpg`

```
Landscape 5:4 painting. A single squat powder keg stands alone in the right of the frame on the floor of an empty trench bay, a plain black barrel shape against a low distant glow. From its bung rises a short fuse, and the spark eating it is the one bright thing in the picture, a thin thread of smoke climbing straight up into the night air. Deep blue night; a far fire on the horizon outlines the keg, and the fuse-spark touches its top hoop with orange.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-B2-1 · 파수 골렘
소르그림의 방패 · 유닛 · 레벨 3 · 소환물 · 틀 `eye` F C `forgeheart` · 프롬프트 n2 → `tools/art/inbox/TK-B2-1.jpg`

```
Landscape 5:4 painting. At eye level in a workshop passage: a compact golem of riveted plate, hardly taller than a door, steps out of a wall alcove straight toward us, one foot already over the sill. The dust sheet that covered it is sliding off one shoulder, and the furnace seams of its chest are brightening from dull red to orange, section by section, as it wakes. Above the alcove an alarm bell is still swinging on its bracket, and the pull-chain beside it sways. The waking seams throw molten orange across the alcove and the falling cloth; the passage around is dark gunmetal with a faint grey sheen.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-U-SCRAP · 고철 골렘
소르그림의 방패 · 유닛 · 레벨 3 · 소환물 · 틀 `ground` L R `patina` · 프롬프트 n2 → `tools/art/inbox/TK-U-SCRAP.jpg`

```
Landscape 5:4 painting. Down among the bolts and broken plates of a scrapyard floor: on the right a newly assembled golem pushes itself up to sitting and turns its head toward the left. Every part of it comes from a different machine — one arm of green-stained bronze, the other of rusted steel with a different rivet pattern, a dented boiler chest, a head with one round eye-lens and one square. The hoist chain that lowered its last piece still hangs slack from its shoulder, and a first unsteady puff of steam leaves its neck. Dim grey light over the scrap heaps; rust red and verdigris on mismatched plates, one weak ember glow starting behind the round lens.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-G1-1 · 그림자 하이에나
고르바스의 발톱 · 유닛 · 레벨 2 · 소환물 · 틀 `pov` F C `strawgold` · 프롬프트 n2 → `tools/art/inbox/TK-G1-1.jpg`

```
Landscape 5:4 painting. First person, looking down the length of our own long shadow stretched across pale dry ground: out of the shadow's chest a spotted hyena is climbing as if out of a pool — head, bristling shoulders and forepaws already solid and leaping at us with jaws wide, hips and hind legs still flat black shadow lying on the earth. A few grass stems lean away from it. Low late sun from behind us makes the shadow long and sharp and lights the hyena's face full on.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-U-WOLF · 잿빛 먼지 짐승
고르바스의 발톱 · 유닛 · 레벨 2 · 소환물 · 틀 `eye` R R `redearth` · 프롬프트 n2 → `tools/art/inbox/TK-U-WOLF.jpg`

```
Landscape 5:4 painting. At eye level, a few steps away: a lean long-legged beast shaped out of blown ash-grey dust lopes off toward the right edge of the frame, glancing back at us over one high shoulder — a narrow fanged head, two eyes like cooling embers, flanks and tail streaming away behind it as grit. Its feet leave a neat line of prints in the dust, the hindmost already thinning into drifting grains. Behind it on the left, a trampled patch of ground and one abandoned boot are all that remains of the fight. Slate-grey sky after a storm; soft even light, red clay dust settling low over the ground.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-G1-2 · 우두머리 하이에나
고르바스의 발톱 · 유닛 · 레벨 4 · 소환물 · 틀 `silhouette` L T `firelit` · 프롬프트 n2 → `tools/art/inbox/TK-G1-2.jpg`

```
Landscape 5:4 painting. A black outline against a column of firelit smoke: a heavy-shouldered hyena stands on a lip of rock in the upper part of the frame, facing left, high withers sloping to low hips, stiff mane along the spine, head lowered with the jaws hanging open on a low laugh. One scarred ear is cut clean against the light. Loose dust still slides from its flanks as if it had stepped out of the ground a moment ago; the hollow below it is dark. A single watchfire hidden in the hollow lights the smoke behind it warm ochre; everything in front is night.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-G2-1 · 덩굴 방벽
베르단의 뿔 · 유닛 · 레벨 1 · 소환물 · 틀 `through` N R `rainmist` · 프롬프트 n2 → `tools/art/inbox/TK-G2-1.jpg`

```
Landscape 5:4 painting. A wall of freshly grown vines fills the frame, stems as thick as wrists braided tight, and near the right side one last gap is knitting shut: tendrils reach across it from both edges like fingers, and through the narrowing hole we glimpse a strip of fog-pale meadow beyond. The leaves around the gap are new and glossy; at the wall's left end they are already yellowing and curling. Soft silver light from the fog beyond the wall shines through the gap and through the thin new leaves.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-U-ROOT · 뿌리
베르단의 뿔 · 유닛 · 레벨 1 · 소환물 · 틀 `eye` F R `mossdeep` · 프롬프트 n2 → `tools/art/inbox/TK-U-ROOT.jpg`

```
Landscape 5:4 painting. Beside a broad fresh stump, at eye level, on the right of the frame: one thick root has risen from its base overnight and curled up and over the cut face like an arm, holding against the wood a fallen slab of bark that still bears a sleeping face, turned toward us. Thorn shoots are budding along the root. Chips and sawdust lie undisturbed around it. Deep green shade, damp with dew; a soft glow of daylight from the left rests on the pale cut wood.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-U-SAPLING · 묘목
베르단의 뿔 · 유닛 · 레벨 1 · 소환물 · 틀 `ground` L R `sunshaft` · 프롬프트 n2 → `tools/art/inbox/TK-U-SAPLING.jpg`

```
Landscape 5:4 painting. Ground-level, in trampled mud after a fight: on the right of the frame a sapling a hand high stands in a small patted mound of fresh earth, two bright leaves open and leaning to the left toward the light. Its mound still shows the press of enormous twig fingers. Beside it an upturned dented helmet has filled with rainwater like a bowl, and mist hangs over the churned field behind. Low golden-green sun through thinning mist lights the two leaves from behind so they glow.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-U-TREE · 어린 고목
베르단의 뿔 · 유닛 · 레벨 3 · 소환물 · 틀 `tilt` B C `autumnrot` · 프롬프트 n2 → `tools/art/inbox/TK-U-TREE.jpg`

```
Landscape 5:4 painting. A young tree-creature, twice a man's height, wrenches its root-feet out of a small earth mound, and the frame tilts with its first lurching step away from us, in the middle of the picture. Clods of soil fly from its roots, its few branches whip with the motion and shed russet leaves, and a dented helmet, lifted off the ground by one root as it rose, swings from it by the chin-strap. Low amber evening light from ahead of it throws its long unsteady shadow back toward us across the torn ground.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### TK-G3-1 · 물의 정령
마렌시아의 노래 · 유닛 · 레벨 2 · 소환물 · 틀 `high` U C `glasscalm` · 프롬프트 n2 → `tools/art/inbox/TK-G3-1.jpg`

```
Landscape 5:4 painting. A round stone spring basin seen from above: at its centre a small figure of clear water is rising toward us on a twisting column, head and lifted arms formed, everything below the waist still a rope of spring water. Drops she has shaken loose hang in the air around her in a loose halo, and the surface she left is still dimpled where she stood up. Soft misted daylight from above; every hanging drop holds a pale spark, and the basin floor shows blue-grey through her body.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```
