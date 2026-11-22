# 유니크 (Unique) — 카드 일러스트 프롬프트 (18장, n2)

> 5단 — 전설적이고 맹렬하다. 그 깃발에서 가장 대담한 그림. 연극 같은 명암과 깊은 어둠을 가르는 눈부신 주광, 주인공이 제 힘으로 타오르듯 빛난다. 보석처럼 선명하고 녹은 금속 같은 색, 소용돌이치는 주황 금빛 불티 · 아지랑이 · 주인공을 휘감는 가는 금세공 빛줄, 이음매마다 빛이 새는 장인의 세공.

등급 줄(모든 유니크 프롬프트에 들어 있다): `Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 나온 그림(가로 5:4)은 `tools/art/inbox/<카드ID>.jpg` → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저.

## 1. 그림 없는 카드 — 먼저 그린다 · 16장

### UN-A1-7 · 모르카스의 영혼 수확자
모르카스의 그믐 · 유닛 · 레벨 6 · 유니크 · 틀 `through` F L `candle` · 프롬프트 n2 → `tools/art/inbox/UN-A1-7.jpg`

```
Landscape 5:4 painting. Glimpsed through the broken arch of a canyon bridge: a hooded reaper tall as the canyon wall fills the left of the frame, leaning toward us, its body grey-violet mist wound in rusted anchor chains, its scythe blade hanging over the bridge like a second arch. On the span below, soldiers small as candle stubs have fallen, and from each a small amber figure rises, flattens into a glowing sheet of parchment and flutters up into the reaper's huge open hand, where a sheaf already burns softly. In its misty chest one sheet-shaped hollow stays dark. The captive figures glow like candle flames inside their sheets, warm amber on hood and chains; everything else is deep violet canyon dark.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-A2-7 · 솔란테의 새벽 사제
솔란테의 새벽 · 유닛 · 레벨 6 · 유니크 · 틀 `ground` L R `rosedawn` · 프롬프트 n2 → `tools/art/inbox/UN-A2-7.jpg`

```
Landscape 5:4 painting. Daybreak on a battlefield, from the eye level of the fallen. In the near foreground lies an open gauntlet, palm up, in blue shadow. Striding toward us from the right comes a robed colossus, broken siege towers around its knees: a hierophant of pale stone with a smooth golden mask, both arms raised to carry the rising sun inside a great golden ring, so that the edge of daylight advances with its steps. The first gold line has reached the gauntlet's fingertips, and two fingers begin to curl. Behind it, in full light, fallen knights rise to their knees. Sunrise from directly behind it: warm pink-gold on everything it has passed, cold blue-lilac shadow on everything still ahead of it.
Colour: rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-A3 · 바늘탑 별지기
벨루미르의 별 · 유닛 · 레벨 6 · 유니크 · 틀 `reflect` R C `starindigo` · 프롬프트 n2 → `tools/art/inbox/UN-A3.jpg`

```
Landscape 5:4 painting. A shallow bronze basin of still water in the floor of a high lookout fills the frame, and the scene lives in its mirror. Among the reflected stars, upside down, a dragon of the upper air lies coiled three times around the needle spire itself: indigo scales each set with a silver star, wings of thin cloud, whiskers streaming like comet tails, the lookout's lantern a spark beside its claw. Its head has just swung toward the basin's right rim, one great calm silver eye wide open, where a dull violet glow creeps in among the mirrored stars. Clear indigo night; the basin holds dragon and stars in silver on black water, with one teal wind streak crossing its surface from the right.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-A3-7 · 벨루미르의 주문 사냥꾼
벨루미르의 별 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F R `aurora` · 프롬프트 n2 → `tools/art/inbox/UN-A3-7.jpg`

```
Landscape 5:4 painting. We are inside the spell: a hurled sphere of green and violet fire whose curved wall of flame rings the picture. An arrow long as a ship's mast has punched in through the upper right, and the fire swirls down its moon-silver shaft like water down a drain. Through the torn hole, far off yet huge in the clear night, stands the archer: a titan of black star-glass with slow stars drifting inside its limbs and a crown of silver spires, one foot on each of two sky-islands, crescent-moon bow raised, a thread of stolen fire running back into it. The fire around us is the light, teal-green and violet like an aurora; beyond the hole the night is dark and the hunter's eyes are two cold stars.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B1 · 포르탄 포병대장
도르마크의 심장불 · 유닛 · 레벨 6 · 유니크 · 틀 `top` N C `ember` · 프롬프트 n2 → `tools/art/inbox/UN-B1.jpg`

```
Landscape 5:4 painting. Straight down onto a star-shaped gun bastion, and a horned lord of fire lies on his back across it: a colossus of living flame inside cracked black iron plate, great curled horns scraping the parapet, wings of smoke spread flat over the walls, furnace jaws open in a grin. The battery's cannons lie around his shoulders like dropped nails. From his outstretched right claw a fuse thick as a ship's cable burns in a hissing spiral toward a ring of twelve powder kegs. Shadows of an advancing army, each spearman small as a grain, reach in from the top edge. The spiralling spark and the embers sinking in his chest light the bastion from within; everything beyond the kegs is deep night.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B1-7 · 탈라쿠스의 불씨 포수
도르마크의 심장불 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F C `whitehot` · 프롬프트 n2 → `tools/art/inbox/UN-B1-7.jpg`

```
Landscape 5:4 painting. Looking out from deep inside the bore of a siege gun wide as a tunnel: dark rifled iron rings the whole picture, and framed in the bright circle at its centre the head of a colossal dragon leans in toward us, plated in cooled black lava with fire in every crack, one furnace-gold eye turned to the bore. Between its foreteeth it lowers a shell big as a wagon, and sunk into the shell's nose an ember beats like a heart, black-red and dripping fire. Past its jaw, on the plain, yesterday's hits still burn in a dotted line. The pulsing ember lights its teeth and throat from below, white-hot at its core; a thin gold dawn outlines its horns and folded wings.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B2 · 브론의 첫 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F C `snowlight` · 프롬프트 n2 → `tools/art/inbox/UN-B2.jpg`

```
Landscape 5:4 painting. From inside the hollow chest of a half-built golem tall as a watchtower, looking out through its open breast-hatch, whose rim of salvaged plates rings the picture. Leaning down toward us, its face alone filling the opening like a cliff, is a titan of an old golem — hand-hammered plates of uneven size, crooked rows of rivets big as shields, a boiler patched many times. Between two huge, careful fingertips it lowers a salvaged furnace-heart, still glowing, into the cavity where we sit. Behind it snow falls on a valley of fallen machines, each already missing a part. Snow daylight blazes white behind the old titan, rimming its dented shoulders against the dark hatch; the heart in its fingers lights its face plates warm from below.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B2-7 · 두르크하임 사슬 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 유니크 · 틀 `silhouette` N X `forgeheart` · 프롬프트 n2 → `tools/art/inbox/UN-B2-7.jpg`

```
Landscape 5:4 painting. Two black shapes against the blazing mouth of a gate into the mountain: a pair of square colossi stand at the far left and right of the frame, each as tall as the gate tower behind it, joined collar to collar by one chain with links the size of wagons across the whole picture. A hurled boulder big as a house bursts on the left golem's shoulder. The chain has snapped taut and level, links glowing, and the right golem digs its heels in and leans away, taking half the blow. A besieging army's torches flicker around their ankles. The molten orange glow of the foundry city behind the gate backlights everything; golems and chain are pure black, with orange fire along each link's edge.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B3 · 즈라크의 병지기
케라운의 벼락 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F X `copperlab` · 프롬프트 n2 → `tools/art/inbox/UN-B3.jpg`

```
Landscape 5:4 painting. From inside a great empty glass jar tall as a bell tower, looking out: the curved wall bends the world like a lens, and bending close over it from outside is the keeper, a colossus of thundercloud bound in copper bands — a mask of beaten copper for a face, two eyes of ball lightning, a crown of lightning rods — kneeling over the roofless coil hall with both vast hands cupped around the glass. Between us and that face, in the middle of the jar's air, loose threads of lightning drift together and knot into a small bright tangle. The gathering tangle is the single light, painting the keeper's copper mask from below in yellow while the amber-brown laboratory city behind falls away into darkness.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-B3-7 · 케라운 자기장 탑
케라운의 벼락 · 유닛 · 레벨 6 · 유니크 · 틀 `ground` L X `thunderhead` · 프롬프트 n2 → `tools/art/inbox/UN-B3-7.jpg`

```
Landscape 5:4 painting. The camera lies in trampled mud among the litter of a rout: a dozen dropped coins, every one fallen with the same death's-head face upward, a snapped sword, a pair of dice both showing a single pip. All of it creeps leftward in little furrows, drawn toward a walking tower tall as the thunderhead above it, a colossus of steel lattice and copper striding on four legs across the left of the frame, wound from foot to cloud-hidden crown in a slow spiral of live lightning like thread on a spindle. Arcs of iron filings hang in the air between. The spiral of lightning is the stage light, raking across the mud from the left, gilding the coin rims and leaving the far field black.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G1 · 바위송곳니 대족장
고르바스의 발톱 · 유닛 · 레벨 6 · 유니크 · 틀 `back` B R `strawgold` · 프롬프트 n2 → `tools/art/inbox/UN-G1.jpg`

```
Landscape 5:4 painting. From behind, level with his shoulders, high above the plain: in the right third of the frame stands a tusked giant warlord tall as a watchtower, hide like cracked clay daubed with rust-red war paint, bone-tied braids down his back, two stone fangs long as standing stones in his lower jaw. One foot rests on a toppled siege tower, his head thrown back in a roar. Before him five plumes of dust race in from the horizon and converge on him like the strokes of a claw — his pack at full run, lean grey fanged dust-beasts. A low sun straight ahead of him backlights the five dust plumes pale straw and cuts his figure almost to silhouette, rim-lit along braids, shoulders and fangs.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G1-7 · 가르운 약탈왕
고르바스의 발톱 · 유닛 · 레벨 6 · 유니크 · 틀 `echo` L X `bonemoon` · 프롬프트 n2 → `tools/art/inbox/UN-G1-7.jpg`

```
Landscape 5:4 painting. One charge shown as five overlapping moments across the frame, right to left: the same six-armed giant king, tall as a siege tower, red-clay skin, tusked jaw, a crown hammered from broken shields, appears five times, each figure more solid than the last and with one more hand filled. At the far right he swings a single bone club; next a second hand holds a foe's sword; then a brass-bound halberd; then a gilded mace; and at the far left, fully solid, his last hand lifts an elegant curved blade from the ground. Knee-high soldiers scatter between his feet. A full moon behind the last figure throws the row into hard light and deep shadow, each stolen weapon catching one bright edge.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G2 · 첫 고목의 가시지기
베르단의 뿔 · 유닛 · 레벨 6 · 유니크 · 틀 `cut` F B `sporeglow` · 프롬프트 n2 → `tools/art/inbox/UN-G2.jpg`

```
Landscape 5:4 painting. The forest floor at night, cut open like a section. Along the top, above the ground line, stands a fresh stump wide as a village square, a two-handed saw and small ladders abandoned across it, ringed by a hedge of thorns. Everything below the line is the keeper himself: a root-mass as big as a hill, shaped like a hunched titan, his old bark face set in the earth just under the stump with both eyes alight, root-arms gripping buried boulders the size of houses. From his brow a single pale shoot has already pushed up through the stump's heart. His eyes burn pale-lime in the black earth and blue-green fungus threads blaze along every root, lighting the soil, the boulders and the underside of the stump.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G2-7 · 베르단의 씨앗지기
베르단의 뿔 · 유닛 · 레벨 6 · 유니크 · 틀 `silhouette` L L `rainmist` · 프롬프트 n2 → `tools/art/inbox/UN-G2-7.jpg`

```
Landscape 5:4 painting. All silhouette against silver morning fog: on the left an ancient tree-titan walks out of the frame, bent like a gardener, so tall that a whole grove rides on his shoulders and a broken siege tower behind him reaches only to his knee. From every branch hang seed pouches — gourds and woven bags, each big as a hut — swinging with his stride. Across the picture his wake rises in steps: the siege tower, a staked sapling, a young tree, a tall one, then the dark wall of a whole forest. One pouch lets fall a single seed. Luminous silver mist behind everything turns keeper, pouches and trees into flat black shapes; the one falling seed catches a bright glint.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G3 · 샘물의 노래꾼
마렌시아의 노래 · 유닛 · 레벨 6 · 유니크 · 틀 `profile` L R `moontide` · 프롬프트 n2 → `tools/art/inbox/UN-G3.jpg`

```
Landscape 5:4 painting. A moonlit shore in strict profile, like a frieze. At the right a songstress tall as a lighthouse rises from the shallows facing left: a body of dark living coral and black pearl, robed in a falling veil of spring water, crowned with white coral branches, head thrown back in song, one long arm swept toward the sea, fishing boats beached around her waist like shells. Rolling in from the left comes a single long wave, and inside its translucent face stand her fallen comrades — upright, eyes closed, spears still in hand, carried home like figures in green glass. A hard white moon behind the wave lights it from within and throws the singer into deep theatrical shadow, crown and arm edged in silver.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-G3-7 · 마렌시아의 세이렌
마렌시아의 노래 · 유닛 · 레벨 6 · 유니크 · 틀 `pov` F C `coraldawn` · 프롬프트 n2 → `tools/art/inbox/UN-G3-7.jpg`

```
Landscape 5:4 painting. Through the eyes of a soldier wading knee-deep in the surf: our two gauntleted hands grip our sword the wrong way round, blade clasped in the fists, hilt held out like an offering. Straight ahead, risen from the sea like an island, a colossal siren faces us and sings — her pale face taller than a ship's mast, fin-webbed arms spread wide as a harbour, dark hair streaming like kelp forests, a scaled tail coiling through the swell behind, a conch big as a boat at her throat. At the edges of our sight a landing army does the same. Sunrise blazes directly behind her head, burning rose and gold through her fins; our gauntlets and blade stay in cold blue shadow.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

## 2. 다시 그리기 · 2장

> 이미 그림이 있어 게임은 그대로 돌아간다. 1번을 다 그린 뒤 그린다.

### UN-A1 · 피의 서약자 — **다시 그리기**
모르카스의 그믐 · 유닛 · 레벨 6 · 유니크 · 틀 `pov` F R `bloodink` · 프롬프트 n2 → `tools/art/inbox/UN-A1.jpg`

```
Landscape 5:4 painting. Through the eyes of the one he has just struck: our dented shield rises along the bottom edge, a red wax seal smoking where his blade landed. A thread of red ink climbs from it to the tip of a greatsword long as a bridge. Filling the right of the hall stands a vampire lord tall as its pillars: bone-pale face under a crown of black iron thorns, vast membranous wings folded like a cloak. Blood runs from his opened palm up the blade, and on a scroll long as a war banner a fresh red line draws itself. A dark hall with a thread of violet in its high windows; the smoking seal and the wet red line give the only glow, crimson on steel, wing and jaw.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UN-A2 · 엘라드의 날개 방패 — **다시 그리기**
솔란테의 새벽 · 유닛 · 레벨 6 · 유니크 · 틀 `reflect` R X `vigil` · 프롬프트 n2 → `tools/art/inbox/UN-A2.jpg`

```
Landscape 5:4 painting. The pale stone flank of a citadel at night fills the frame, and across it falls one enormous shadow: a kneeling armoured figure with six wings flung wide, taller than the battlements. Inside the shadow's outline the stone is clean, and a whole weary garrison sits untouched at the wall's foot, small as chess pieces. Outside it, wall and ground bristle with burning siege bolts. The shadow's owner kneels at the far right edge, cropped by the frame — a winged colossus in white-gold plate behind a tower shield, bolts long as masts standing in her spread wings. A great blaze beyond the right edge throws her shadow leftward; the burning bolts are small gold flames scattered through the dark.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a blazing key light against deep black, and the subject burning with a power of its own. Saturation: jewel-bright and molten. Air: thick with swirling orange-gold (#ff8a2a) embers, heat-shimmer and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```
