# 유니크 (Unique) — 카드 일러스트 프롬프트 (18장, n2)

> 5단 — 전설적이고 맹렬하다. 그 깃발에서 가장 대담한 그림. 연극 같은 명암과 깊은 어둠을 가르는 눈부신 주광, 주인공이 제 힘으로 그 깃발의 색으로 빛난다. 보석처럼 선명하고 깊은 색(깃발 색이 가장 진하게), 소용돌이치는 깃발 색 빛 알갱이 · 불꽃 · 일렁이는 안개 · 주인공을 휘감는 가는 금세공 빛줄, 이음매마다 깃발 색 빛이 새는 장인의 세공. 등급 줄의 `{banner}` · `{bannerName}`은 생성기가 그 카드 깃발의 색(이름 + 색값 · 이름)으로 바꿔 넣는다(2026-11-22 — 주황 금 불티가 모든 유니크를 불의 깃발처럼 붉게 만들어 고침).

등급 줄(모든 유니크 프롬프트에 들어 있다): `Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, {banner}. Saturation: jewel-bright and deep, with {bannerName} at its fullest strength. Air: thick with swirling motes and sparks of {bannerName} light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing {bannerName} at the seams.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 프롬프트 맨 끝 줄이 파일 이름(`<카드ID> <카드 이름>.png`)을 알려 준다 — 나온 그림(가로 5:4)을 그 이름으로 `tools/art/inbox/`에 두고(이름이 달라도 카드 ID만 앞에 있으면 된다) → `python3 tools/art/artmap.py import`.

### UN-A1 · 피의 서약자
모르카스의 그믐 · 유닛 · 레벨 6 · 유니크 · 틀 `pov` F R `violetshade` · 프롬프트 n2 → `tools/art/inbox/UN-A1 피의 서약자.png`

```
Landscape 5:4 painting. Through the eyes of the one he has struck: our dented shield rises along the bottom edge, a black wax seal smoking where he struck. A thin thread of blood-dark ink climbs from it to the tip of a greatsword long as a bridge. Filling the right of the hall stands a vampire lord tall as its pillars: bone-pale face under a crown of black iron thorns, membranous wings folded like a cloak. The thread runs from his opened palm up the blade and down a blank scroll long as a banner, where one dark-red stroke creeps on alone. Cold violet light falls from the high windows and gleams along wings, thorns and steel; the single wet thread of ink is the one dark-red line in the purple-black hall.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Setting, the land of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, violet (#8b5cf6). Saturation: jewel-bright and deep, with violet at its fullest strength. Air: thick with swirling motes and sparks of violet light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing violet at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-A1 피의 서약자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-A1-7 · 모르카스의 영혼 수확자
모르카스의 그믐 · 유닛 · 레벨 6 · 유니크 · 틀 `through` F L `frostindigo` · 프롬프트 n2 → `tools/art/inbox/UN-A1-7 모르카스의 영혼 수확자.png`

```
Landscape 5:4 painting. Through the broken arch of a canyon bridge: a horned lord of the abyss, tall as the canyon wall, fills the left of the frame, leaning in — hollow obsidian plate crowned with long swept-back horns, violet shadow for a body, two eyes with slit vertical pupils shining in the helm, wax seals and silver scales on its chains. Its scythe blade hangs over the bridge like a second arch. Below, from each fallen soldier a violet-white wisp rises, flattens into a pale parchment sheet and drifts up into its clawed gauntlet. In its chest one sheet-shaped hollow stays dark. Cold violet light from its eyes and the rising wisps edges horns, chains and stone in the blue-black night; three tiny candle flames on the bridge rail are the only warm points.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Setting, the land of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, violet (#8b5cf6). Saturation: jewel-bright and deep, with violet at its fullest strength. Air: thick with swirling motes and sparks of violet light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing violet at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-A1-7 모르카스의 영혼 수확자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-A2 · 엘라드의 날개 방패
솔란테의 새벽 · 유닛 · 레벨 6 · 유니크 · 틀 `reflect` R X `firstlight` · 프롬프트 n2 → `tools/art/inbox/UN-A2 엘라드의 날개 방패.png`

```
Landscape 5:4 painting. The pale stone flank of a citadel in the last blue of night fills the frame; across it falls one enormous shadow: a kneeling armoured figure with six wings flung wide, taller than the battlements. Inside the shadow's outline the stone is clean, and a weary garrison sits untouched at the wall's foot, small as chess pieces. Outside it, wall and ground bristle with iron siege bolts. The shadow's owner kneels at the far right edge, cropped by the frame — a winged colossus in white-gold plate behind a tower shield, bolts long as masts standing in her spread wings. The first low band of pale-gold dawn beyond the right edge throws her shadow leftward over cool blue-grey stone and gilds the rim of every feather.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Setting, the land of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, pale gold (#ffe9a8). Saturation: jewel-bright and deep, with pale gold at its fullest strength. Air: thick with swirling motes and sparks of pale gold light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing pale gold at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-A2 엘라드의 날개 방패.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-A2-7 · 솔란테의 새벽 사제
솔란테의 새벽 · 유닛 · 레벨 6 · 유니크 · 틀 `ground` L R `glare` · 프롬프트 n2 → `tools/art/inbox/UN-A2-7 솔란테의 새벽 사제.png`

```
Landscape 5:4 painting. Daybreak on a battlefield, from the eye level of the fallen. In the foreground lies an open gauntlet, palm up, in blue shadow. Striding toward us from the right comes a robed colossus, broken siege towers around its knees: a hierophant of pale stone with a smooth golden mask, both arms raised to carry the rising sun inside a great golden ring, so that the edge of daylight advances with its steps. The first line of pale-gold light has reached the gauntlet's fingertips, and two fingers begin to curl. Behind it, in full light, fallen knights rise to their knees. The sun in the ring is a blinding white-gold disc directly behind the colossus: pale gold on everything it has passed, cool blue-grey shadow on everything still ahead of it.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Setting, the land of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, pale gold (#ffe9a8). Saturation: jewel-bright and deep, with pale gold at its fullest strength. Air: thick with swirling motes and sparks of pale gold light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing pale gold at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-A2-7 솔란테의 새벽 사제.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-A3 · 바늘탑 별지기
벨루미르의 별 · 유닛 · 레벨 6 · 유니크 · 틀 `reflect` R C `starindigo` · 프롬프트 n2 → `tools/art/inbox/UN-A3 바늘탑 별지기.png`

```
Landscape 5:4 painting. A shallow bronze basin of still water in the floor of a high lookout fills the frame, and the scene lives in its mirror. Among the reflected stars, upside down, a dragon of the upper air lies coiled three times around the needle spire itself: indigo scales each set with a silver star, wings of thin cloud, whiskers streaming like comet tails, the lookout's lantern a spark beside its claw. Its head has just swung toward the basin's right rim, one great calm silver eye wide open, where a dull violet glow creeps in among the mirrored stars. Clear indigo night; the basin holds dragon and stars in silver on black water, with one teal wind streak crossing its surface from the right.
Colour: star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver.
Setting, the land of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, wind-teal (#9fe3d6). Saturation: jewel-bright and deep, with wind-teal at its fullest strength. Air: thick with swirling motes and sparks of wind-teal light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing wind-teal at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-A3 바늘탑 별지기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-A3-7 · 벨루미르의 주문 사냥꾼
벨루미르의 별 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F R `aurora` · 프롬프트 n2 → `tools/art/inbox/UN-A3-7 벨루미르의 주문 사냥꾼.png`

```
Landscape 5:4 painting. We are inside the spell: a hurled sphere of teal-green and violet spell-light whose curved, rippling wall rings the picture. An arrow long as a ship's mast has punched in through the upper right, and the light swirls down its moon-silver shaft like water down a drain. Through the torn hole, far off yet huge in the clear night, stands the archer: a titan of black star-glass with slow stars drifting inside its limbs and a crown of silver spires, one foot on each of two sky-islands, crescent-moon bow raised, a thread of stolen light running back into it. The spell around us is the light, teal-green and violet like an aurora; beyond the hole the night is dark and the hunter's eyes are two cold stars.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Setting, the land of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, wind-teal (#9fe3d6). Saturation: jewel-bright and deep, with wind-teal at its fullest strength. Air: thick with swirling motes and sparks of wind-teal light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing wind-teal at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-A3-7 벨루미르의 주문 사냥꾼.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-B1 · 포르탄 포병대장
도르마크의 심장불 · 유닛 · 레벨 6 · 유니크 · 틀 `top` N C `ember` · 프롬프트 n2 → `tools/art/inbox/UN-B1 포르탄 포병대장.png`

```
Landscape 5:4 painting. Straight down onto a star-shaped gun bastion, and a horned lord of fire lies on his back across it: a colossus of living flame inside cracked black iron plate, great curled horns scraping the parapet, wings of smoke spread flat over the walls, furnace jaws open in a grin. The battery's cannons lie around his shoulders like dropped nails. From his outstretched right claw a fuse thick as a ship's cable burns in a hissing spiral toward a ring of twelve powder kegs. Shadows of an advancing army, each spearman small as a grain, reach in from the top edge. The spiralling spark and the embers sinking in his chest light the bastion from within; everything beyond the kegs is deep night.
Colour: embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d).
Setting, the land of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, fire-orange (#ff6b3d). Saturation: jewel-bright and deep, with fire-orange at its fullest strength. Air: thick with swirling motes and sparks of fire-orange light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing fire-orange at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-B1 포르탄 포병대장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-B1-7 · 탈라쿠스의 불씨 포수
도르마크의 심장불 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F C `whitehot` · 프롬프트 n2 → `tools/art/inbox/UN-B1-7 탈라쿠스의 불씨 포수.png`

```
Landscape 5:4 painting. Looking out from deep inside the bore of a siege gun wide as a tunnel: dark rifled iron rings the whole picture, and framed in the bright circle at its centre the head of a colossal dragon leans in toward us, plated in cooled black lava with fire in every crack, one furnace-gold eye turned to the bore. Between its foreteeth it lowers a shell big as a wagon, and sunk into the shell's nose an ember beats like a heart, black-red and dripping fire. Past its jaw, on the plain, yesterday's hits still burn in a dotted line. The pulsing ember lights its teeth and throat from below, white-hot at its core; a thin gold dawn outlines its horns and folded wings.
Colour: white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow.
Setting, the land of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, fire-orange (#ff6b3d). Saturation: jewel-bright and deep, with fire-orange at its fullest strength. Air: thick with swirling motes and sparks of fire-orange light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing fire-orange at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-B1-7 탈라쿠스의 불씨 포수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-B2 · 브론의 첫 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F C `snowlight` · 프롬프트 n2 → `tools/art/inbox/UN-B2 브론의 첫 골렘.png`

```
Landscape 5:4 painting. From inside the hollow chest of a half-built golem tall as a watchtower, looking out through its open breast-hatch, whose rim of salvaged plates rings the picture. Leaning down toward us, its face alone filling the opening like a cliff, is a titan of an old golem — hand-hammered plates of uneven size, crooked rows of rivets big as shields, a boiler patched many times. Between two huge, careful fingertips it lowers a salvaged furnace-heart, still glowing, into the cavity where we sit. Behind it snow falls on a valley of fallen machines, each already missing a part. Snow daylight blazes white behind the old titan, rimming its dented shoulders against the dark hatch; the heart in its fingers lights its face plates warm from below.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, steel-silver (#a9b4c2). Saturation: jewel-bright and deep, with steel-silver at its fullest strength. Air: thick with swirling motes and sparks of steel-silver light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing steel-silver at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-B2 브론의 첫 골렘.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-B2-7 · 두르크하임 사슬 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 유니크 · 틀 `silhouette` N X `coldsteel` · 프롬프트 n2 → `tools/art/inbox/UN-B2-7 두르크하임 사슬 골렘.png`

```
Landscape 5:4 painting. Two dark shapes against the snow-white daylight in the mouth of a mountain gate, seen from inside: two square colossi stand at the far left and right of the frame, each tall as the gate tower beside it, joined collar to collar by one chain with links the size of wagons. A hurled boulder big as a house bursts on the left golem's shoulder. The chain has snapped taut and level, frost flying from its links, and the right golem digs its heels in and leans away, taking half the blow. A besieging army's spear points glitter around their ankles. Hard white snow-light pours in through the gate behind them; golems and chain are blue-black steel, with a crisp silver edge along every link and rivet.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, steel-silver (#a9b4c2). Saturation: jewel-bright and deep, with steel-silver at its fullest strength. Air: thick with swirling motes and sparks of steel-silver light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing steel-silver at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-B2-7 두르크하임 사슬 골렘.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-B3 · 즈라크의 병지기
케라운의 벼락 · 유닛 · 레벨 6 · 유니크 · 틀 `inside` F X `cobalt` · 프롬프트 n2 → `tools/art/inbox/UN-B3 즈라크의 병지기.png`

```
Landscape 5:4 painting. From inside a great empty glass jar tall as a bell tower, looking out: the curved wall bends the world like a lens, and bending close over it from outside is the keeper, a colossus of thundercloud bound in copper bands — a mask of beaten copper for a face, two eyes of ball lightning, a crown of lightning rods — kneeling over the roofless coil hall with both vast hands cupped around the glass. Between us and that face, in the middle of the jar's air, loose threads of lightning drift together and knot into a small bright tangle. The gathering tangle is the single light, electric yellow with a violet-white corona, painting the keeper's mask from below while the laboratory city behind sinks into deep blue night.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, electric yellow (#ffd84a). Saturation: jewel-bright and deep, with electric yellow at its fullest strength. Air: thick with swirling motes and sparks of electric yellow light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing electric yellow at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-B3 즈라크의 병지기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-B3-7 · 케라운 자기장 탑
케라운의 벼락 · 유닛 · 레벨 6 · 유니크 · 틀 `ground` L X `thunderhead` · 프롬프트 n2 → `tools/art/inbox/UN-B3-7 케라운 자기장 탑.png`

```
Landscape 5:4 painting. The camera lies in trampled mud among the litter of a rout: a dozen dropped coins, every one fallen with the same death's-head face upward, a snapped sword, a pair of dice both showing a single pip. All of it creeps leftward in little furrows, drawn toward a walking tower tall as the thunderhead above it, a colossus of steel lattice and copper striding on four legs across the left of the frame, wound from foot to cloud-hidden crown in a slow spiral of live lightning like thread on a spindle. Arcs of iron filings hang in the air between. The spiral of lightning is the stage light, raking across the mud from the left, gilding the coin rims and leaving the far field black.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, electric yellow (#ffd84a). Saturation: jewel-bright and deep, with electric yellow at its fullest strength. Air: thick with swirling motes and sparks of electric yellow light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing electric yellow at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-B3-7 케라운 자기장 탑.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-G1 · 바위송곳니 대족장
고르바스의 발톱 · 유닛 · 레벨 6 · 유니크 · 틀 `back` B R `strawgold` · 프롬프트 n2 → `tools/art/inbox/UN-G1 바위송곳니 대족장.png`

```
Landscape 5:4 painting. From behind, level with his shoulders, high above the plain: in the right third of the frame stands a tusked giant warlord tall as a watchtower, hide like cracked clay daubed with rust-red war paint, bone-tied braids down his back, two stone fangs long as standing stones in his lower jaw. One foot rests on a toppled siege tower, his head thrown back in a roar. Before him five plumes of dust race in from the horizon and converge on him like the strokes of a claw — his pack at full run, lean grey fanged dust-beasts. A low sun straight ahead of him backlights the five dust plumes pale straw and cuts his figure almost to silhouette, rim-lit along braids, shoulders and fangs.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, ochre (#b88a5a). Saturation: jewel-bright and deep, with ochre at its fullest strength. Air: thick with swirling motes and sparks of ochre light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing ochre at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-G1 바위송곳니 대족장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-G1-7 · 가르운 약탈왕
고르바스의 발톱 · 유닛 · 레벨 6 · 유니크 · 틀 `echo` L X `bonemoon` · 프롬프트 n2 → `tools/art/inbox/UN-G1-7 가르운 약탈왕.png`

```
Landscape 5:4 painting. One charge shown as five overlapping moments across the frame, right to left: the same six-armed giant king, tall as a siege tower, ochre-clay skin, tusked jaw, a crown hammered from broken shields, appears five times, each figure more solid than the last and with one more hand filled. At the far right he swings a single bone club; next a second hand holds a foe's sword; then a brass-bound halberd; then a gilded mace; and at the far left, fully solid, his last hand lifts an elegant curved blade from the ground. Knee-high soldiers scatter between his feet. A full moon behind the last figure throws the row into hard light and deep shadow, each stolen weapon catching one bright edge.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, ochre (#b88a5a). Saturation: jewel-bright and deep, with ochre at its fullest strength. Air: thick with swirling motes and sparks of ochre light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing ochre at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-G1-7 가르운 약탈왕.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-G2 · 첫 고목의 가시지기
베르단의 뿔 · 유닛 · 레벨 6 · 유니크 · 틀 `cut` F B `sporeglow` · 프롬프트 n2 → `tools/art/inbox/UN-G2 첫 고목의 가시지기.png`

```
Landscape 5:4 painting. The forest floor at night, cut open like a section. Along the top, above the ground line, stands a fresh stump wide as a village square, a two-handed saw and small ladders abandoned across it, ringed by a hedge of thorns. Everything below the line is the keeper himself: a root-mass as big as a hill, shaped like a hunched titan, his old bark face set in the earth just under the stump with both eyes alight, root-arms gripping buried boulders the size of houses. From his brow a single pale shoot has already pushed up through the stump's heart. His eyes shine pale-lime in the black earth and blue-green fungus threads glow along every root, lighting the soil, the boulders and the underside of the stump.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, leaf-green (#58b85f). Saturation: jewel-bright and deep, with leaf-green at its fullest strength. Air: thick with swirling motes and sparks of leaf-green light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing leaf-green at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-G2 첫 고목의 가시지기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-G2-7 · 베르단의 씨앗지기
베르단의 뿔 · 유닛 · 레벨 6 · 유니크 · 틀 `silhouette` L L `rainmist` · 프롬프트 n2 → `tools/art/inbox/UN-G2-7 베르단의 씨앗지기.png`

```
Landscape 5:4 painting. All silhouette against silver morning fog: on the left an ancient tree-titan walks out of the frame, bent like a gardener, so tall that a whole grove rides on his shoulders and a broken siege tower behind him reaches only to his knee. From every branch hang seed pouches — gourds and woven bags, each big as a hut — swinging with his stride. Across the picture his wake rises in steps: the siege tower, a staked sapling, a young tree, a tall one, then the dark wall of a whole forest. One pouch lets fall a single seed. Luminous silver mist behind everything turns keeper, pouches and trees into flat black shapes; the one falling seed catches a bright glint.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, leaf-green (#58b85f). Saturation: jewel-bright and deep, with leaf-green at its fullest strength. Air: thick with swirling motes and sparks of leaf-green light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing leaf-green at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-G2-7 베르단의 씨앗지기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-G3 · 샘물의 노래꾼
마렌시아의 노래 · 유닛 · 레벨 6 · 유니크 · 틀 `profile` L R `moontide` · 프롬프트 n2 → `tools/art/inbox/UN-G3 샘물의 노래꾼.png`

```
Landscape 5:4 painting. A moonlit shore in strict profile, like a frieze. At the right a songstress tall as a lighthouse rises from the shallows facing left: a body of dark living coral and black pearl, robed in a falling veil of spring water, crowned with white coral branches, head thrown back in song, one long arm swept toward the sea, fishing boats beached around her waist like shells. Rolling in from the left comes a single long wave, and inside its translucent face stand her fallen comrades — upright, eyes closed, spears still in hand, carried home like figures in green glass. A hard white moon behind the wave lights it from within and throws the singer into deep theatrical shadow, crown and arm edged in silver.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, water-blue (#4fb3ff). Saturation: jewel-bright and deep, with water-blue at its fullest strength. Air: thick with swirling motes and sparks of water-blue light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing water-blue at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-G3 샘물의 노래꾼.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### UN-G3-7 · 마렌시아의 세이렌
마렌시아의 노래 · 유닛 · 레벨 6 · 유니크 · 틀 `pov` F C `lagoon` · 프롬프트 n2 → `tools/art/inbox/UN-G3-7 마렌시아의 세이렌.png`

```
Landscape 5:4 painting. Through the eyes of a soldier wading knee-deep in the surf: our two gauntleted hands grip our sword the wrong way round, blade clasped in the fists, hilt held out like an offering. Straight ahead, risen from the sea like an island, a colossal siren faces us and sings — her pale face taller than a ship's mast, fin-webbed arms spread wide as a harbour, dark hair streaming like kelp forests, a scaled tail coiling behind, her throat glowing mid-note as the song rolls toward us in great rings of turquoise light and standing water. At the edges of our sight a landing army does the same. High clear daylight behind her head shines turquoise through her fins and scatters pearl-white glitter over the water-blue swell; our gauntlets and blade stay in deep blue shadow.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, water-blue (#4fb3ff). Saturation: jewel-bright and deep, with water-blue at its fullest strength. Air: thick with swirling motes and sparks of water-blue light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing water-blue at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-G3-7 마렌시아의 세이렌.png — this is the name of the downloaded file only; the painting itself stays wordless.
```
