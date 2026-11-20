# 유니크 (Unique) — 카드 일러스트 프롬프트 (18장, n1)

> 깃발의 이름난 전설 한 장면. 그 깃발에서 가장 대담한 그림 — 연극 같은 명암, 장인의 세공, 녹은 주황 금빛 불티.

등급 한 줄(모든 유니크 프롬프트에 들어 있다): `Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 나온 그림(가로 5:4)은 `tools/art/inbox/<카드ID>.jpg` → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저.

## 1. 그림 없는 카드 — 먼저 그린다 · 16장

### UN-A1-7 · 모르카스의 영혼 수확자
모르카스의 그믐 · 유닛 · 레벨 6 · 유니크 · 틀 `through` F L `candle` · 프롬프트 n1 → `tools/art/inbox/UN-A1-7.jpg`

```
Landscape 5:4 painting. Seen through a sheet of parchment held up between us and its holder, filling the left two-thirds of the frame. Inside the sheet, held in its fibres like a leaf pressed in amber, glows the small figure of a spearman, both palms pressed to the paper from within. Behind it a hooded ghost of grey-violet mist leans close to study it, two pale hands pinching its corners. At the lower right more sheets are fanned in the crook of its arm, each lit by its own small captive figure, and in the ghost's misty chest one sheet-shaped hollow stays dark. The captive figures glow like candle flames inside their sheets, warm amber on the hood's edge; everything else is deep violet dark.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-A2-7 · 솔란테의 새벽 사제
솔란테의 새벽 · 유닛 · 레벨 6 · 유니크 · 틀 `ground` L R `rosedawn` · 프롬프트 n1 → `tools/art/inbox/UN-A2-7.jpg`

```
Landscape 5:4 painting. Daybreak on a battlefield, seen from the ground at the eye level of the fallen. Across the near foreground stretches an armoured arm and an open gauntlet, palm up, in cold blue shadow. Walking toward us from the right comes a seraph priestess in pale robes, barefoot, wings half open, the rising sun exactly behind her, so that the edge of daylight on the ground advances with her feet. Its first gold line has just reached the gauntlet's fingertips, and two fingers have begun to curl. Behind her, in full light, fallen knights are already rising to their knees. Sunrise from directly behind her: warm pink-gold on everything she has passed, cold blue-lilac shadow on everything still ahead of her.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-A3 · 바늘탑 별지기
벨루미르의 별 · 유닛 · 레벨 6 · 유니크 · 틀 `reflect` R C `starindigo` · 프롬프트 n1 → `tools/art/inbox/UN-A3.jpg`

```
Landscape 5:4 painting. A shallow bronze basin of still water, set in the floor of a high lookout, fills the frame from above at a slant, and the scene lives in its mirror. Among the reflected stars, upside down, leans a tall high elf archer, silver hair hanging past long pointed ears, his long elegant bow already raised. One grey feather floats on the water. It has just swung to point at the basin's right rim, where the first ripple is arriving and a dull violet glow has crept in among the mirrored stars. His arrow points the same way. Clear indigo night; the basin holds the stars in silver on black water, with one teal wind streak crossing its surface from the right.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-A3-7 · 벨루미르의 주문 사냥꾼
벨루미르의 별 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F R `aurora` · 프롬프트 n1 → `tools/art/inbox/UN-A3-7.jpg`

```
Landscape 5:4 painting. We are inside the spell: a hurled sphere of green and violet fire whose curved wall of flame rings the picture. An arrow has punched in through the upper right; its moon-silver head hangs an arm's length away, and the fire is swirling down the shaft like water down a drain. Through the torn hole, small in the clear night, stands the one who shot it, a tall night elf with dusky violet-blue skin, silver-white hair, long swept-back ears and faintly glowing eyes, his silver bow still raised, a thread of the stolen fire running back into it. The fire around us is the light, teal-green and violet like an aurora; beyond the hole the night is dark and his eyes are two small stars.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B1 · 포르탄 포병대장
도르마크의 심장불 · 유닛 · 레벨 6 · 유니크 · 틀 `top` N C `ember` · 프롬프트 n1 → `tools/art/inbox/UN-B1.jpg`

```
Landscape 5:4 painting. Seen from directly above: an old goblin artillery captain lies on his back on the flagstones of a gun platform, arms flung wide, long grey ear-tufts singed, a cracked brass spyglass beside him — and he is grinning. From his outstretched right hand a lit fuse runs across the stones in a hissing spiral toward a ring of twelve powder kegs that surrounds him. Long shadows of advancing spearmen reach into the frame from the top edge. The spiralling spark and a toppled lantern light him from one side; everything beyond the kegs is deep night.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B1-7 · 탈라쿠스의 불씨 포수
도르마크의 심장불 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F C `whitehot` · 프롬프트 n1 → `tools/art/inbox/UN-B1-7.jpg`

```
Landscape 5:4 painting. From deep inside a cannon barrel, looking out through the round mouth of the bore: the dark rifled iron makes a ring around the whole picture, and framed in the bright circle at its centre a goblin gunner with notched ears leans in toward us, one eye screwed shut, lowering a shell held in long tongs. Sunk into the shell's nose is an ember that beats like a heart, black-red and dripping fire. Over his shoulder, down on the plain, yesterday's hits still burn in a dotted line. The pulsing ember lights his face from below, white-hot at its core; a thin gold dawn outlines his ears and the tongs.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B2 · 브론의 첫 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F C `snowlight` · 프롬프트 n1 → `tools/art/inbox/UN-B2.jpg`

```
Landscape 5:4 painting. From inside the hollow chest of a half-built golem, looking out through its open breast-hatch: the hatch rim of mismatched salvaged plates rings the whole picture. Leaning in toward us, filling the opening, is a very old golem — hand-hammered plates of uneven size, crooked rows of rivets, a boiler patched many times, a small worn smith's hammer hung on a chain around its neck. In both huge, careful hands it lowers a salvaged furnace-heart, still faintly glowing, into the cavity where we sit. Behind it snow falls on a field of fallen machines, each already missing a part. Overcast snow daylight behind the old golem rims its dented shoulders in white; the small heart in its hands warms its face plates and the hatch rim from below.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B2-7 · 두르크하임 사슬 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 유니크 · 틀 `silhouette` N X `forgeheart` · 프롬프트 n1 → `tools/art/inbox/UN-B2-7.jpg`

```
Landscape 5:4 painting. Two black shapes against the blazing mouth of a gate into the mountain: a pair of square, heavy golems stand at the far left and far right of the frame, one before each gatepost, and a single thick chain runs from the collar of one to the collar of the other across the whole width of the picture. A boulder is bursting on the left golem's shoulder. The chain has snapped taut and level, links glowing, and the right golem — untouched — has dug its heels in and leans away, taking half the weight of the blow. The molten orange glow of the foundry city behind the gate backlights everything; golems and chain are pure black, with orange fire along each chain link's edge.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B3 · 즈라크의 병지기
케라운의 벼락 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F X `copperlab` · 프롬프트 n1 → `tools/art/inbox/UN-B3.jpg`

```
Landscape 5:4 painting. From inside a great empty glass jar, looking out: the curved wall bends the world like a lens, and pressed close to it from outside is the watchful face of an old gnome — big nose flattened a little against the glass, brass goggles, wild grey hair, both small palms spread on the surface. Between us and that face, in the middle of the jar's air, loose threads of lightning drift together and knot into a small bright tangle, as if remembering a shape. The gathering tangle is the single light, painting the keeper's face from below in yellow while the amber-brown laboratory behind falls away into darkness.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B3-7 · 케라운 자기장 탑
케라운의 벼락 · 유닛 · 레벨 6 · 유니크 · 틀 `ground` L X `thunderhead` · 프롬프트 n1 → `tools/art/inbox/UN-B3-7.jpg`

```
Landscape 5:4 painting. The camera lies in trampled mud among the litter of a rout: a dozen dropped coins, every one fallen with the same death's-head face upward, a snapped horseshoe, a pair of dice both showing a single pip. All of it is creeping leftward in little furrows, drawn toward a colossal lattice tower that strides across the left of the frame, wound from foot to crown in a slow spiral of live lightning like thread on a spindle. Arcs of iron filings hang in the air between. The spiral of lightning is the stage light, raking across the mud from the left, gilding the coin rims and leaving the far field black.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G1 · 바위송곳니 대족장
고르바스의 발톱 · 유닛 · 레벨 6 · 유니크 · 틀 `back` B R `strawgold` · 프롬프트 n1 → `tools/art/inbox/UN-G1.jpg`

```
Landscape 5:4 painting. Seen from behind, at the height of his shoulders: the great chieftain stands in the right third of the frame on a rise of bare rock, a massive orc with a mane of bone-tied braids, one fist thrust at the sky, head thrown back in a howl, a beaten enemy's war horn crushed under his heel. Across the wide plain before him five long plumes of dust race in from the horizon and converge on him like the strokes of a claw — hyenas at full run, the nearest already close enough to count their spots. A low sun straight ahead of him backlights the five dust plumes pale straw and cuts his figure almost to silhouette, rim-lit along braids, fist and tusks.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G1-7 · 가르운 약탈왕
고르바스의 발톱 · 유닛 · 레벨 6 · 유니크 · 틀 `echo` L X `bonemoon` · 프롬프트 n1 → `tools/art/inbox/UN-G1-7.jpg`

```
Landscape 5:4 painting. One charge shown as five overlapping moments across the whole frame, right to left: the same broad, grinning orc appears five times, each figure more solid than the last. At the far right he swings a plain bone club; next he holds a foe's short sword; then a long brass-bound halberd; then a gilded mace; and at the far left, fully solid, he straightens up with an elegant curved blade just lifted from an open hand on the ground. Behind each figure the weapon he dropped is still falling. A full moon behind the last figure throws the row into hard light and deep shadow, each stolen weapon catching one bright edge.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G2 · 첫 고목의 가시지기
베르단의 뿔 · 유닛 · 레벨 6 · 유니크 · 틀 `cut` F B `sporeglow` · 프롬프트 n1 → `tools/art/inbox/UN-G2.jpg`

```
Landscape 5:4 painting. The forest floor at night, cut open like a section. Along the top of the frame, above the ground line, stands a broad fresh stump with a two-handed saw abandoned across it, ringed by a hedge of thorns. Everything below the line is the keeper himself: a root-mass as big as a hill, shaped like a hunched giant, his old bark face set in the earth just under the stump with both eyes open and alight, root-arms spread wide and gripping buried boulders. From his brow a single pale shoot has already pushed up through the heart of the stump. Darkness above and below; the only light is the green glow of his eyes and the faint blue-green fungus threads tracing every root.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G2-7 · 베르단의 씨앗지기
베르단의 뿔 · 유닛 · 레벨 6 · 유니크 · 틀 `silhouette` L L `rainmist` · 프롬프트 n1 → `tools/art/inbox/UN-G2-7.jpg`

```
Landscape 5:4 painting. All silhouette against silver morning fog: on the left an old tree-giant walks out of the frame to the left, bent like a gardener, and from every one of his branches hang seed pouches — gourds, woven bags, pods on cords — swinging with his stride. Behind him, across the rest of the picture, his wake rises in steps: a broken siege tower, then a staked sapling, then a young tree, then a tall one, then the dark wall of a whole grove. One pouch has just let fall a single seed. Luminous silver mist behind everything turns keeper, pouches and trees into flat black shapes; the one falling seed catches a bright glint.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G3 · 샘물의 노래꾼
마렌시아의 노래 · 유닛 · 레벨 6 · 유니크 · 틀 `profile` L R `moontide` · 프롬프트 n1 → `tools/art/inbox/UN-G3.jpg`

```
Landscape 5:4 painting. A moonlit shore in strict profile, composed like a frieze. At the right a merfolk singer kneels in the shallows facing left, head thrown back, throat fins flared, one hand open toward the sea. Rolling in from the left to meet her comes a single long wave, and inside its translucent face stand her fallen comrades — upright, eyes closed, spears still in their hands, carried home like figures in green glass. On the wet sand between, their empty outlines wait. A hard white moon behind the wave lights it from within and throws the singer into deep theatrical shadow, one cheek and throat edged in silver.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G3-7 · 마렌시아의 세이렌
마렌시아의 노래 · 유닛 · 레벨 6 · 유니크 · 틀 `pov` F C `coraldawn` · 프롬프트 n1 → `tools/art/inbox/UN-G3-7.jpg`

```
Landscape 5:4 painting. Through the eyes of a soldier wading knee-deep in the surf: our own two gauntleted hands grip our sword the wrong way round, blade clasped in the fists, hilt held out like an offering. Straight ahead, risen from the sea, a pale siren faces us and sings — fin-webbed arms spread wide, long dark hair streaming like kelp, fish tail coiled in the swell, a conch at her throat. At the edges of our sight the men on either side are doing the same. Sunrise blazes directly behind her head, burning rose and gold through her fins; our gauntlets and blade stay in cold blue shadow.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

## 3. 그림 있음 — 그리지 않는다 (참고용) · 2장

### UN-A1 · 피의 서약자 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 6 · 유니크 · 틀 `pov` F R `bloodink` · 프롬프트 n1 → `tools/art/inbox/UN-A1.jpg`

```
Landscape 5:4 painting. Through the eyes of the one he has just struck: our own gauntleted arm and dented shield rise along the bottom edge, and on the shield a round seal of red wax has been stamped where his blade landed, still smoking, ribbon and all. A thread of red ink runs from that seal through the air to the tip of his long sword. He stands over us at the right, a tall horned demon with pale skin and calm glowing eyes; in his other hand a scroll hangs open, and on it a fresh red line is drawing itself. A dark hall with a thread of violet in its high windows; the smoking seal and the wet red line give the only glow, crimson on steel and jaw.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-A2 · 엘라드의 날개 방패 — 그림 있음
솔란테의 새벽 · 유닛 · 레벨 6 · 유니크 · 틀 `reflect` R X `vigil` · 프롬프트 n1 → `tools/art/inbox/UN-A2.jpg`

```
Landscape 5:4 painting. The pale stone flank of a great hall at night fills the frame, and across it falls one enormous shadow: a figure with both wings flung wide. Inside the shadow's outline the stone is clean, and a huddle of weary soldiers sits untouched at the wall's foot. Outside the outline, wall and ground bristle with burning arrows. The shadow's owner stands at the far right edge, cropped by the frame — a seraph knight braced toward the firelight, a dozen arrow shafts standing in her spread wing. A great blaze beyond the right edge throws her shadow leftward; the burning arrows are small gold flames scattered through the dark.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Unique: one legend's defining image, the most daring picture of its banner — theatrical chiaroscuro, masterwork detail, molten orange-gold (#ff8a2a) embers and filigree light.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```
