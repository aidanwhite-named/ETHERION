# 그림이 필요한 카드 프롬프트 모음

> 2026-11-27 · 프롬프트 판 n2 · `tools/art/prompts/cards.jsonl`(`node tools/art/build_prompts.js`, 지금 카드 데이터와 같음)과 `img/cards/`의 실제 그림 파일 · 장부 `art_map.csv`로 다시 셈. 은퇴 카드(`js/retired.js`)는 목록에 없다.
> 쓰는 법: 카드 하나의 코드 상자 안 글을 통째로 Gemini 새 대화에 붙여 넣는다. 받은 그림은 `tools/art/inbox/`에 넣고 `python3 tools/art/artmap.py import --model gemini`. 다시 그린 그림도 같은 방법으로 넣으면 장부 상태가 "들어감"으로 바뀐다.
> 차례: ① 그림 없는 카드(깃발 A1~G3 → 카드 ID) ② 다시 그릴 카드.

## 개수

| | 장 |
|---|---:|
| 살아 있는 카드(소환물 17장 포함) | 706 |
| 그림 있음 | 573 |
| **그림 없음** | **133** |
| **다시 그릴 것**(그림은 있음) | **22** |
| 이번에 그릴 것 합 | 155 |

등급별 그림 있음 / 전체:

| 등급 | 그림 있음 | 전체 | 없음 |
|---|---:|---:|---:|
| 일반 | 229 | 362 | 133 |
| 고급 | 129 | 129 | 0 |
| 레어 | 59 | 59 | 0 |
| 에픽 | 63 | 63 | 0 |
| 유니크 | 18 | 18 | 0 |
| 스페셜 | 18 | 18 | 0 |
| 강화 | 40 | 40 | 0 |
| 소환물 | 17 | 17 | 0 |

그림 없는 카드 — 깃발 · 종류별:

| 깃발 | 유닛 | 공격 마법 | 방어 마법 | 공용 마법 | 핸드 마법 | 아이템 | 합 |
|---|---:|---:|---:|---:|---:|---:|---:|
| A1 모르카스의 그믐 | 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| A2 솔란테의 새벽 | 0 | 0 | 0 | 1 | 0 | 1 | 2 |
| A3 벨루미르의 별 | 0 | 0 | 0 | 1 | 0 | 0 | 1 |
| B1 도르마크의 심장불 | 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| B2 소르그림의 방패 | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| B3 케라운의 벼락 | 3 | 5 | 3 | 7 | 1 | 4 | 23 |
| G1 고르바스의 발톱 | 21 | 6 | 1 | 3 | 0 | 4 | 35 |
| G2 베르단의 뿔 | 21 | 3 | 5 | 5 | 0 | 4 | 38 |
| G3 마렌시아의 노래 | 16 | 1 | 3 | 6 | 0 | 5 | 31 |
| **합** | **62** | **15** | **12** | **23** | **1** | **20** | **133** |

## ① 그림 없는 카드 (133장)

### A1 모르카스의 그믐 (1장)

#### IA1-3 · 저주 인형
일반 · 아이템 · 레벨 3

```
Landscape 5:4 painting of one object — the object itself is the subject. Through a keyhole, its black outline framing the view: a bare table in a locked room, and at the left of the opening a hand-long straw poppet lies pinned to a board. It is bound with twine at neck and waist, and a lock of copper hair is knotted round its middle. Three long pins stand in its chest and a fourth lies ready beside a pincushion. The candle on the table burns with its flame blown flat sideways, as if by a shout from the poppet's stitched mouth, and the wine in a cup shivers in rings. The single candle makes one amber island on the table inside the keyhole; all around the opening is violet-black.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Setting, the land of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IA1-3 저주 인형.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A2 솔란테의 새벽 (2장)

#### S2-1 · 빛의 성표
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. A small pendant — a thin disc of pale gold stamped with a rising sun, on a knotted linen cord — is caught in mid-air as it swings out to the right, the cord running off the top of the frame. At that instant the point of a thrusting sword has met it: the steel tip is flattening against the little disc like soft wax, a bright ring of sparks spreading from the touch, while the disc shows only one shallow new dent among several old ones. Bright open daylight from the left; the pendant's face flares pale gold and the blunted steel carries a cool blue sheen.
Colour: white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow.
Setting, the land of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: S2-1 빛의 성표.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SA2-07 · 심판의 저울
일반 · 공용 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A tall balance of pale gold stands on a stone table in a dim hall. In its left pan lie three identical black axes heaped together, with plumed officers' helmets stacked beside them; in its right pan, a single white feather. The beam has tipped the wrong way: the heaped iron rides high, weightless, the axes beginning to drift up off the pan like smoke, while the feather's pan has sunk to the table and pressed a dent into the stone. One tall coloured window throws red and blue patches across the table; a pale-gold beam falls exactly on the feather.
Colour: stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams.
Setting, the land of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SA2-07 심판의 저울.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### A3 벨루미르의 별 (1장)

#### SA3-08 · 대폭풍
일반 · 공용 마법 · 레벨 4

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A marching host seen from directly overhead reads as a pattern on the plain: hundreds of small dark figures in blocks, and every spear, pike and banner among them is laid over flat in the same direction, like wheat combed by one great hand. Tents have torn loose and tumble toward the right edge with camp stools and cooking pots skittering after them like leaves. At the head of the host one figure has gone down on one knee, head bowed into the wind, and the grass around it is pressed into a long swirling fan. Bruised grey-violet storm light with silver rain driven sideways; long wind-teal streaks cross the whole plain from left to right.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Setting, the land of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SA3-08 대폭풍.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B1 도르마크의 심장불 (1장)

#### IB1-3 · 나팔 산탄총
일반 · 아이템 · 레벨 3

```
Landscape 5:4 painting of one object — the object itself is the subject. Laid out and seen from straight above on a square of grey oilcloth: a short, heavy blunderbuss lies on the diagonal with its trumpet-flared muzzle toward the upper right. Around it, neatly arranged, are its ramrod, a powder horn, a coil of slow-match with one end faintly smouldering, and a leather pouch that has spilled its mixed shot — iron balls, bent nails and pebbles — across the cloth. Flat pale daylight from a window out of frame; the smouldering match-end is the one orange point.
Colour: ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d).
Setting, the land of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IB1-3 나팔 산탄총.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B2 소르그림의 방패 (1장)

#### B2-25 · 공방 수호 골렘
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. Dead-on and symmetrical at the end of a stone corridor: a golem of riveted steel plate stands square to us, so broad that its shoulders touch both walls and its bulk hides all but the curved rim of the round vault door behind it. Its square fists hang at its sides, each as big as an ore cart. Cobwebs run from its elbows to the door frame, grey dust lies deep on its feet, and across the dusty floor one fresh set of footprints comes halfway toward it, stops, and turns back. Cold grey light from a shaft behind the viewer falls evenly on its plates in blue-grey and white; two pale furnace points glow where its eyes sit.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B2-25 공방 수호 골렘.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### B3 케라운의 벼락 (23장)

#### GN-B3-2 · 뇌명 포격
일반 · 공격 마법 · 레벨 4

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The instant of impact, close up: a bolt as thick as a tree trunk slams down in the left of the frame onto an iron-plated war cart at the head of a column, which is already bursting into white splinters. From the strike point crawling arcs fan out along the soaked ground, racing away under a receding line of boots and spear-butts and climbing each one in turn. Mud and steam jump up in a ring. Everything is bleached white-yellow by the strike, with the boots and spear shafts cut out as hard black shapes.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: GN-B3-2 뇌명 포격.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### HB3-1 · 예지
일반 · 핸드 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The held breath before a strike: on a rain-wet windowsill in the right of the frame stands a small glass bell holding two leaves of gold foil, which have just sprung wide apart. Beyond the pane the sky is still whole, yet a faint ghost of the coming bolt already hangs there — a pale, spidery branching line from cloud to far hilltop. Every raindrop on the glass has stopped mid-slide. Even grey rain light; the gold leaves hold the one warm glint, repeated tiny in each stilled drop.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: HB3-1 예지.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IB3-1 · 구리 코일
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. Laid out neatly and seen from straight above on a scorched leather work mat: in the upper part, a wrist coil — a snug spiral of bright copper wire, seven turns, riveted to a worn buckled strap with two brass contact studs. Below it lie the things that go with it: wire snips, a wooden winding peg, a few curled offcuts, a stub of beeswax. Across the mat run two old burn lines side by side, one hair-thin, one twice as fat. Warm lamplight from one side; copper and brass glow amber, and a last tiny yellow spark sits on one stud.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IB3-1 구리 코일.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IB3-2 · 축전 장갑
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. A pair of heavy quilted gauntlets hangs by wooden pegs from a wire strung across a rainy yard, in the left of the frame, like washing put out to catch the storm. Copper threads are stitched across the knuckles and small brass studs dot the fingertips. The left glove has taken a charge and glows from inside, its fist a soft lantern; its twin beside it hangs dark, dripping and perfectly ordinary. Pale grey sky behind them; the lit glove's yellow shines through the wet leather seams and in the drops falling from the other.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IB3-2 축전 장갑.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IB3-4 · 번개 병
일반 · 아이템 · 레벨 3

```
Landscape 5:4 painting of one object — the object itself is the subject. Caught in the instant it meets the floor: a stoppered glass jar, dropped, strikes the flagstones in the right of the frame and opens like a flower — curved shards flying outward, the wax-sealed cork spinning up, a copper carrying-ring bouncing away. From the heart of the break the freed bolt bursts in every direction at once, brighter than it ever was behind glass. The burst bleaches the floor white-yellow and turns each flying shard into a hard black blade with a burning edge.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IB3-4 번개 병.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IB3-5 · 학술원 법전
일반 · 아이템 · 레벨 3

```
Landscape 5:4 painting of one object — the object itself is the subject. Glimpsed through the brass lattice of a locked book-cage in a dim library: a single massive volume lies closed on a slanted desk in the left of the frame, bound in scorched grey leather with copper corners and a heavy clasp, a grounding chain running from its spine to the floor. From between its pages a dozen slender forks of lightning stand up like bookmarks of light, licking the inside of the cage. Blue darkness; the little forks give a cold yellow-white light that picks out the lattice in silhouette.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IB3-5 학술원 법전.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MB-03 · 축전 방출
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Straight at us: the open neck of a big glass jar, tipped on its side on a sandbag in the left of the frame, has become the muzzle of a gun. Its cork spins away past the edge of the picture, and out of the neck explodes a furious tangle of pent-up lightning, forking wider as it comes, three bright prongs already almost touching the viewer. Inside the glass the rest still boils and crowds toward the opening. Deep blue night; the burst is yellow-white with violet-edged coronas and lights the jar's glass from the inside.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MB-03 축전 방출.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MB-07 · 과부하 회로
일반 · 공격 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from the side, a thick copper cable runs the whole width of the frame along a workshop wall, from a humming generator at the left to three sword blades clamped in a rack at the right. Every safety fuse along it has been pulled and hangs by its cord. A fat bulge of white current is travelling down the line: behind it the cloth insulation smokes and chars, ahead of it the three blades are starting to shine. Warm amber workshop gloom; the travelling surge glares yellow-white and drags a trail of lamp-lit smoke behind it.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MB-07 과부하 회로.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MB-11 · 낙뢰 조준
일반 · 공격 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Directly overhead, looking down on a patch of dark ground ruled with chalk lines into a careful aiming grid. Exactly on the central cross lies a great star of fresh scorch, at its heart the melted stump of a huge two-handed axe. Just outside the grid's lower edge sits a second, much smaller scorch — right under a brass sighting tripod, one of whose three legs is quietly on fire. Flat yellow-green storm light; the big scorch still glows yellow in its cracks and the small flame on the tripod leg adds one warm point.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MB-11 낙뢰 조준.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### NB3-1 · 연쇄 번개
일반 · 공격 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. We look straight down the bolt's own path. Close in front, a round iron shield has a fist-wide hole burnt clean through its centre, the rim dripping molten yellow; through that hole we see a second shield further on with a smaller hole, and through that a third, where the last thin thread of lightning is just now arriving. The holes line up like the rings of a telescope, each dimmer than the one before. Coppery dusk-brown gloom; the molten rims are the light, brightest nearest us and fading down the tunnel of holes.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: NB3-1 연쇄 번개.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### NB3-2 · 운명의 동전
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. An emblem laid out on a dark slate tabletop: a brass spring-flipper with its arm just released, and above it a single coin hanging in mid-air, already turned face-up — a stamped sun — and held there by two thread-fine arcs from a pair of copper prongs. Beneath it a neat row of five more coins lies in a line pointing left, every one showing the same sun, linked rim to rim by tiny sparks. Warm lamplight from the left on brass and copper; the two arcs give the hanging coin a sharp yellow rim.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: NB3-2 운명의 동전.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PN-B3-C1 · 새끼 뇌수
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. Seen through a ring of reaching arms: thick rubber gloves and coat sleeves push in from every edge of the frame toward a wicker basket padded with scorched rags. In it sits a wolf-and-weasel cub the size of a kitten, blue-white fur fizzing with harmless sparks, stubby zigzag tail upright, looking off to the right with complete calm. The loose threads on every sleeve stand straight out toward it. Yellow-green daylight under a brewing sky; the cub's fur is a soft lamp lighting the gloves from the middle.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PN-B3-C1 새끼 뇌수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PN-B3-C3 · 절연 갑주 기관
일반 · 유닛 · 레벨 6

```
Landscape 5:4 painting. Seen exactly side-on, like a figure on a wall relief, a massive walking engine plods to the right in the left half of the frame, its body wrapped in overlapping skirts of black rubber and thick green glass plates. Along its flank a whole row of snapped sword blades and spearheads stands embedded, every one sunk to the same shallow depth, and a fork of lightning splashing against the same flank spreads out flat and runs off in harmless rivulets. Pale grey rain light; the glass plates hold cool reflections, and the spent bolt leaves small yellow sparks hopping in the puddles.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PN-B3-C3 절연 갑주 기관.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PN-B3-U2 · 뇌명 고원의 뇌조
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. The horizon tips steeply as a great slate-grey storm bird launches itself from a boulder, wings flung across the whole width of the frame, lightning-tipped plumes streaking, beak and arc-lamp eyes aimed to the left. The boulder it has just left is already taking a bolt. Down the tilted slope behind, every earlier perch is a scorched rock with a surveyor's wooden stake and a strip of rag hammered in beside it. Black thunderhead; the fresh strike lights the bird's underwings yellow from below and behind.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PN-B3-U2 뇌명 고원의 뇌조.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PS-B3-2 · 전극 교환
일반 · 공용 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Lying beneath it all and looking straight up at a rain-grey sky: two heavy cables cross overhead in a great X. One ends in a brass clamp biting the head of a huge war hammer in the upper left, whose glow is draining away to dull iron; the other ends in a clamp on a little dagger in the lower right, which blazes brighter by the moment. Along the cables the light can be seen flowing from the one to the other, and raindrops fall toward us past it all. Soft grey daylight from above; the travelling current is a string of small yellow sparks, mirrored in the falling drops.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PS-B3-2 전극 교환.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### RB3-1 · 케라운 대방전
일반 · 공용 마법 · 레벨 4

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The whole plateau is seen at once from a far ridge at night, and all of it is alight: a vast branching tree of lightning lies flat across the land from edge to edge of the frame, every branch a glowing seam in the ground, and from each seam short bolts leap upward into the cloud ceiling like grass in wind. The chimneys and spires of a small city are thin black hairs against the glare, and the ground itself seems to flinch. The land's own white-yellow glare lights the cloud base from below and blacks out everything standing on it.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: RB3-1 케라운 대방전.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SB3-01 · 정전기
일반 · 공격 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A small grey fur pelt hangs over a wooden rail in the left of the frame, every hair standing straight out like a startled cat, a rod of honey-coloured amber still resting where it was rubbed. From the bristling hair tips three tiny crooked sparks are jumping to the left, each to one of three iron buckles on a belt that hangs from a nail at the frame's edge. A dark room; the three sparks are the only light, pale yellow with blue fringes, just enough to show the fur's halo.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SB3-01 정전기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SB3-02 · 피뢰침
일반 · 방어 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A cross-section of the ground under a storm. Above the surface, in the right of the frame, a single iron rod stands on a low rise, and a great bolt that was falling elsewhere has bent sideways in mid-sky to pour itself down it. Below the surface the earth is cut open: the rod's buried copper root carries the fire down and lets it fan out into the dark soil in fading branches, harmless among stones, roots and one sleeping mole. Black cloud above; the bent bolt is searing yellow, dimming to a faint glow as it spreads underground.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SB3-02 피뢰침.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SB3-03 · 충전 코일
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The whole frame is filled, edge to edge, with turn upon turn of bright copper wire wound tight around a great spool — hundreds of parallel lines like a ploughed field. A soft glow is rising inside the windings from the bottom of the picture upward, tiny sparks hop from one turn to the next, and a dusting of iron filings stands on end along the wire like fur. Two axe heads laid across the windings have begun to shine. Amber lamplight on the copper from the left; the charge adds a yellow shimmer that climbs turn by turn.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SB3-03 충전 코일.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SB3-04 · 전격 장막
일반 · 방어 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The view is framed like a doorway by a ragged breach in a thick city wall, and the gap is hung from top to bottom with a curtain of fine vertical lightning threads, swaying a little like strings of beads. Through its shimmer, on the far side, three dim shapes have stopped short, each with one arm half raised. On the rubble at the curtain's foot lie three dropped spears, their iron heads still fizzing. The curtain's white-yellow glare fills the breach and turns the wall's broken edges into hard black teeth.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SB3-04 전격 장막.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SB3-05 · 축전 방벽
일반 · 방어 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Aftermath at the foot of a barricade: a row of squat glass storage drums stands shoulder to shoulder across the top of the frame, a low steady fence of arcs humming from terminal to terminal. On the churned ground before them, in the lower part of the picture, lies a single dropped sword, still smoking — its tip blued by heat, its leather grip scorched with the dark print of four fingers — and beside it one empty gauntlet, fingers curled. Blue night; the arc fence gives a low yellow light with violet-white haloes, catching the sword's edge and the wisps of smoke.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SB3-05 축전 방벽.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SB3-06 · 뇌운 소환
일반 · 공용 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. High above the ground, looking straight down: a black, lightning-veined cloud slides across the left of the frame, towed by a cable drawn taut as a fishing line. The cable runs down to the right, to a great brass winch bolted to bare rock, its reel turning. All around the winch a cluster of small round umbrellas has just popped open, seen from above as a scatter of neat dark discs. Rain-grey daylight; the cloud's inner bolts flare searing yellow through its top, and the first drops streak the umbrellas.
Colour: thunderhead — black and rain-grey split by searing electric yellow (#ffd84a).
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SB3-06 뇌운 소환.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SB3-09 · 벼락 폭풍
일반 · 공용 마법 · 레벨 4

```
Landscape 5:4 painting of a spell — the magic itself is the subject. It is raining lightning. The whole frame is filled with hundreds of short thin bolts falling on a slant like a downpour, over a street of steep roofs and the tents of a siege camp beyond the wall. Where real rain would splash, each bolt bursts into a little crown of sparks — on the cobbles, on the roof slates, on the tent poles — and the gutters run with liquid light toward us. Night; countless yellow-white strokes with violet edges light the street from every side at once.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SB3-09 벼락 폭풍.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G1 고르바스의 발톱 (35장)

#### G1-01 · 결투장의 어린 들소
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. Straight overhead: a round duel ring of trampled clay fenced with crooked stakes, a single fire-bowl burning at its centre so that every stake throws a long shadow outward like a spoke. At the left edge a young bison calf — thin legs, a hump only beginning, horns still two short buds — has its forehooves inside the gate gap and its hind hooves still outside. Behind it runs a line of small hoofprints; ahead, clay churned by much larger hooves. Night; the fire-bowl is the only light, warming the clay ochre and stretching the calf's shadow back out through the gate.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-01 결투장의 어린 들소.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-04 · 어린 하이에나
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. From deep inside an earthen den, looking out through its round mouth set left of centre: a hyena pup stands in the daylight outside, facing in, with a thigh bone as big as its own head clamped crosswise in its jaws — far too wide for the hole, jammed against both sides of the entrance. One round ear is freshly nicked, the spotted fur is dusty, and the eyes above the bone are bright with a giggle. Dark roots and packed earth fill the right of the frame. Sunlit dust haze glares outside the den mouth and spills a soft ochre wedge onto the tunnel floor.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-04 어린 하이에나.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-05 · 초원 하이에나
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. Strict side view, flat as a frieze: three spotted hyenas pace in single file from left to right along the outside of a fence of rough stakes, high shoulders sloping to low hips, heads carried low. Between the stakes behind them only dust and the stamping legs of a crowd can be seen. The last hyena has its nose pushed between two stakes; the first has stopped in mid-step, one paw raised, round ears turned toward the noise. Slate storm light before rain, flat and shadowless, with red clay dust hanging at knee height.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-05 초원 하이에나.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-08 · 돌발톱 가고일
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. Seen from behind, high on a cliff ledge in the upper half of the frame: a row of weathered grey boulders, and the middle one has shoulders. A hunter's spear, waterskin and bedroll have been propped against it for the night. Now two stone wings are lifting off its back, cracking a skin of lichen and spilling pebbles over the gear, and hooked stone talons flex on the ledge. Far below, past its folded haunches, lie the dark plain and a pale bend of river. A full moon from the upper left paints the granite bone-white; the land below is grey-blue dark.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-08 돌발톱 가고일.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-10 · 돌엄니 멧돼지
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. Through a ragged hole torn in a windbreak of woven branches: beyond it a heavy boar, mud-caked, dark bristles up, stone-grey tusks low, is already twenty paces on and still running toward the right edge, small in the right of the opening. From the hole to its heels runs one straight, deep furrow of turned earth, clods still in the air, as neat as a ploughed row across the pale grass. Slate-grey storm light from a low sky; wind drives grit and torn grass sideways through the hole.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-10 돌엄니 멧돼지.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-12 · 돌팔매 어린 거인
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. A stumpy young giant of cracked boulders, saplings and grass tufts sprouting from its shoulders, stands at the right and hurls a rock toward the left. Its throwing arm appears four times in one sweeping arc — cocked back, overhead, forward, flung open — each earlier arm fainter, like a trail of dust. The rock, the size of a cart, has just left the last hand. Behind the giant a hill stands unmoved, with two giant handprints pressed into its side. Slate-grey storm sky and flat cold light; grit streams off the arm at each of its four positions.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-12 돌팔매 어린 거인.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-13 · 자갈 코카트리스
일반 · 유닛 · 레벨 3

```
Landscape 5:4 painting. Dead-on and symmetrical: a rooster-headed beast sits low in the frame on a nest of twigs, stiff grey wings half spread, stone comb upright, both round eyes glaring straight at us while a scaly serpent tail coils around the eggs. Around the nest lies a perfect circle of grey gravel. At its rim things are caught in mid-change — a grass tuft whose near half is pebbles, a lizard of small stones, a dropped feather crumbling to grit. Hazy midday sun through dust, soft and shadowless, with ochre grassland glowing beyond the grey circle.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-13 자갈 코카트리스.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-15 · 흑요 발톱 바실리스크
일반 · 유닛 · 레벨 3

```
Landscape 5:4 painting. From the ground among dry grass stems: a long, low lizard with black glassy scales and an ochre crest sprawls along the top of an obsidian outcrop in the upper frame, facing right, jaws clamped on the rock's edge as it grinds a claw against it. Flakes of black glass slide down toward us. In the blurred foreground stands a hare of grey stone, caught in mid-leap, with grass grown up around its legs. Low afternoon sun from the right; straw-pale grass glows around the black rock and each glass claw shows one hard white glint.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-15 흑요 발톱 바실리스크.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-19 · 바위등 곰 기수
일반 · 유닛 · 레벨 4

```
Landscape 5:4 painting. Over the shoulder of a war-painted rider sitting with arms crossed: ahead of us stretches the broad back of a cave bear, brown fur grown through with mossy stones like a hillside, the saddle strap lost among them. The bear lies flat with its chin on its paws and one eye half open, deciding. Beyond its ears, far down the pale slope, the dust of the rest of the war band is already moving away. Moonlight from high on the right silvers the stones on the bear's back; the plain below is grey-blue.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-19 바위등 곰 기수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-23 · 전쟁북 오우거
일반 · 유닛 · 레벨 4

```
Landscape 5:4 painting. At eye level, a few steps away: a vast pot-bellied ogre walks toward us, filling the frame from edge to edge, a drum of stretched bear hide strapped across his belly and a thigh-bone beater in each fist. One beater has just landed — dust jumps off the drumskin in a ring, and the same shiver runs through his stomach, his bone charms and his heavy jowls. His small eyes are shut in concentration. A single campfire low on the left lights the drumhead and the underside of his arms warm ochre against the night.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-23 전쟁북 오우거.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-25 · 고르바스의 아이
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. A shallow rain pool on cracked clay fills almost the whole frame, and in it, upside down, stands the reflection of a hulking giant made of fractured boulders, turf and small pines on its shoulders, dull ochre light in the cracks of its face, one fist closing. The water answers the fist: tight rings of ripples cross the reflection and pebbles hop at the pool's rim. Along the top edge only its real stone feet are visible. Slate-grey storm sky mirrored in the pool, flat cold light, with ochre showing only inside the giant's cracks.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-25 고르바스의 아이.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-27 · 어미 동굴곰
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. Far across a thawing mountainside at night: patches of bone-white snow and bare ochre earth, and high on the right a small black cave mouth. In front of it a cave bear stands broadside, tiny at this distance, facing right, stones and moss humped on her back; two smaller shapes peer out from the dark behind her legs. A single line of footprints climbs the snow toward the cave, stops, and bends away in a wide careful arc. A high moon lights the snow patches bone-white and leaves the cave and the bear as dark shapes with pale rims.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-27 어미 동굴곰.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-28 · 초원 들소 떼
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. Edge to edge, the frame is packed with running bison heading right — dark shaggy humps, short curved horns, rolling eyes, dust boiling up between the bodies so that only backs and heads surface, row behind row to the top of the picture. On one bull near the middle a snapped hitching post trails its rope and a dented cooking pot swings from a horn: whatever stood in the way is travelling with them now. Low sun from behind the herd turns the dust pale straw and edges every hump with light; long shadows fall toward us.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-28 초원 들소 떼.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-32 · 흑요 거수 도마뱀
일반 · 유닛 · 레벨 6

```
Landscape 5:4 painting. From close behind, low to the ground: the thick tail of an ox-sized lizard lashes across the bottom of the frame, black glassy scales throwing off grit, and beyond it the broad armoured back races away toward the left horizon on splayed, clawed legs. On both sides the dry grass of the whole plain lies pressed flat in a single direction, baring streaks of rust-red clay, and a flock of startled birds lifts on the far right. Slate storm light from above, with one pale break at the horizon that slides along the wet-looking black scales.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-32 흑요 거수 도마뱀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-33 · 순례하는 바위 거인
일반 · 유닛 · 레벨 7

```
Landscape 5:4 painting. Far up a long mountainside, small in the upper part of the frame, a giant of fractured boulders with a grove of pines on its shoulders stands frozen in mid-stride, climbing toward the right where a snow peak waits. Its footprints come up the slope from the lower left like a record of years: the nearest to us holds tall pines and the smoke of a small camp, the next young birches, the next only grass, and the newest, under its lifted heel, is bare red clay. Slate storm light over the whole slope, with a single pale shaft falling on the giant and its newest footprint.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-33 순례하는 바위 거인.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-35 · 대지 진동 웜
일반 · 유닛 · 레벨 7

```
Landscape 5:4 painting. The ground cut open in a clean cross-section: along the top runs a thin strip of sunlit grassland with a few tiny herd animals and a ring of standing stones, all tilting. Below it, through layers of clay, gravel and roots, a tunnel as wide as a canyon holds a colossal eyeless worm ringed with rock plates, its head in the lower right, round maw stretched wide in a yawn of stone teeth. Cracks climb from the yawn to the surface. Late sun lights the surface strip pale straw; the layers below darken from ochre to deep umber around the worm.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-35 대지 진동 웜.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-36 · 미노타우로스 대족장
일반 · 유닛 · 레벨 7

```
Landscape 5:4 painting. High behind his shoulders, looking down: a towering bull-headed chieftain stands at the left of the frame with his back to us, forward-swept horns spanning wider than a wagon, one hand resting on a stone-headed axe planted in the earth. He has simply stopped. Across the plain below him, thin dust trails from every direction are already bending toward the spot, and at his hooves tiny figures are stacking spears and digging the first fire pits. High hazy sun; the dust trails glow pale ochre against the darker grass and his shadow falls short at his hooves.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-36 미노타우로스 대족장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-41 · 방패 든 오우거
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. From underneath, looking up: the pale ribbed inside of a giant marsh-turtle shell fills the upper frame like a roof, held overhead by one thick grey-ochre arm. Beneath it the ogre's heavy-browed face looks down at us, patient, and pressed against his pot belly three small war-painted youngsters peer up from under the rim. Arrow shafts and slingstones clatter off the outside and drop past the edge of the shell. Grey storm daylight leaks in around the shell's rim; the faces beneath are lit softly by light bouncing off the pale ground.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-41 방패 든 오우거.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-42 · 떨어진 고르바스의 비늘
일반 · 유닛 · 레벨 4

```
Landscape 5:4 painting. Side-on, flat as a carving: a single dragon scale as tall as a hut stands upright on its edge in the right third of the frame, a curved slab of layered slate with turf and pebbles grown on its outer face, leaning slightly to the left as if bracing. On the ground before it lie dozens of snapped sword blades and split axe heads, and one sword still quivers where it has just struck. In the narrow lee behind it: undisturbed grass and a sleeping goat. Cold moonlight from the upper left whitens the slab's edge and the broken blades; ochre veins show faintly inside the scale.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-42 떨어진 고르바스의 비늘.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G1-43 · 장벽 바위 정령
일반 · 유닛 · 레벨 6

```
Landscape 5:4 painting. From ground level behind it: a wall of huge boulders stretches across the whole frame, each stone hovering a finger above the earth, shoulder to shoulder, with dust curling in the seams and a dull ochre glow deep in the cracks; the middle stones form a rough head and two braced arms. Through the narrow gaps, the tips of halberds and the dust of an enemy line show on the far side. In the near foreground, bare heels step backward toward us. Sunlit dust haze from beyond the wall leaks through the seams in thin bright slits; this side lies in soft brown shade.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G1-43 장벽 바위 정령.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### I2-2 · 송곳니 광전 도끼
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. A rough double-bladed axe stands buried where its one blow landed, at the left of the frame: both crescent blades of dark chipped iron, lashed with rawhide to a haft as thick as a wrist, have gone clean through a tall enemy shield and on into the hard-packed earth beneath, splitting the shield from rim to boss. The haft still trembles, two wolf fangs swinging from it on a cord. In the grass behind lies the wielder's own small round shield, face down, thrown aside unscratched. Slate storm light from above; wind drives grit across the blades and into the fresh split of the shield.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: I2-2 송곳니 광전 도끼.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG1-1 · 사냥꾼 발톱
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. On a flat stone lies a hunter's hand strap, set right of centre — a band of dark rawhide cut to cross the back of a hand, with one long curved claw stitched to it in thick sinew, polished by wear, its tip chipped. Laid out next to it on the stone, in order, are the bleached toe bones of a great bear's paw: four still end in their claws, the fifth ends bare. A bone needle threaded with sinew rests between the two. One small fire just out of frame on the left warms the rawhide and bone ochre and throws long soft shadows across the stone.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG1-1 사냥꾼 발톱.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG1-3 · 격노의 문신
일반 · 아이템 · 레벨 3

```
Landscape 5:4 painting of one object — the object itself is the subject. A tattooist's work, half done: on a flat rock lie a row of bone needles lashed to short sticks, a small tapping mallet, and an upturned battered shield used as a tray for a mussel shell of dark red pigment. Stretched on a frame of sticks beside them is a patch of pale hide carrying the pattern — jagged interlocking fangs. The finished half of the pattern smoulders a dull blood red, as if lit from under the skin; the other half is still plain charcoal line. Dim slate daylight under a storm sky falls from the left across rust-red clay; the red half of the pattern gives off a faint glow of its own.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG1-3 격노의 문신.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### M2-1 · 송곳니 문신
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. One broad tawny forepaw, cropped at the wrist, rests claws-forward at the right of the frame on a crumpled steel breastplate. Across the shaved skin above its four toes runs a fresh tattoo of interlocking fangs in soot-black line, the skin around it still raised and smeared with ash. The paw points toward the right; under it the breastplate is torn open in four parallel rips that match the claws exactly. A bone tattooing needle lies beside it on the metal. Cold moonlight from above gives the steel and the claws a bone-white edge; the tattoo lines stay deep black.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: M2-1 송곳니 문신.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MG-04 · 원한의 일격
일반 · 공격 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Across a moonlit plain, small with distance, stands a row of low burial mounds, each marked with a weapon planted upright. From the top of every mound a thin stream of dust is rising and bending through the air toward one point high in the frame, where the streams knot together into a single enormous fist of packed earth and stone, knuckles down, hanging over the open ground beyond the last mound. The fist is one stream from finished, and already tilting to fall. Cold moonlight from the right whitens the mounds and the dust streams; the underside of the fist is dark ochre.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MG-04 원한의 일격.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MG-05 · 대지 진동
일반 · 공격 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A slice through the earth, across the whole frame. On the surface at the far left, a row of heavy bare feet comes down together, seen only to the shin. Beneath them the layers of clay and gravel carry the blow to the right as a wave that grows as it travels — a faint ripple under the feet, a rolling swell in the middle, and at the far right a heave that splits the turf, where a line of boots staggers and spears tip against one another. Hazy sunlit dust above the surface; below it the earth layers show in bands of matte ochre and sandstone brown.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MG-05 대지 진동.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MG-13 · 뼈 부수기
일반 · 공격 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A great bleached skull of a horned steppe beast sits on a flat boulder in dry grass, caught halfway through a blow that comes from the right: its right half is still whole — smooth brow, one long horn, a dark eye socket — while its left half has already burst into chalk-white splinters and powder streaming away to the left. Between the two halves the air holds the faint shape of a huge fist made of dust. Buckled armour plates lie cast off in the grass below. Late-afternoon sun from the right; the flying bone dust glows pale straw and every splinter throws a long umber shadow.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MG-13 뼈 부수기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MG-16 · 대지 붕괴
일반 · 공격 마법 · 레벨 3

```
Landscape 5:4 painting of a spell — the magic itself is the subject. From inside the collapse, falling with it and looking up: a ragged disc of slate-grey sky shrinks overhead, ringed by breaking edges of turf. Between us and the sky hang slabs of red clay, boulders, uprooted grass, spears, a cart wheel and small tumbling figures from both sides of the fight, all dropping together — one of them spread-eagled, another already twisting to land on its feet. Walls of raw red earth slide past on every side. Storm daylight pours down through the opening as the only light; red dust thickens it into a dim rust haze toward the bottom.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MG-16 대지 붕괴.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### NG1-2 · 무리의 포효
일반 · 공격 마법 · 레벨 4

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Coming straight at us across the plain: a wall of sound made visible — a curved front of dust, torn grass and skipping pebbles as wide as the horizon, already bending back the long lances planted along the bottom of the frame and stripping the plumes from them. Behind the front, small on a long low ridge, an unbroken row of howling shapes stands with heads thrown back, crowded from one end of the ridge to the other. Slate storm sky; the dust front is lit from above in dull grey-brown, darkest at its base where the grit flies thickest.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: NG1-2 무리의 포효.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PN-G1-C3 · 바윗덩이 거구
일반 · 유닛 · 레벨 6

```
Landscape 5:4 painting. Over the heavy shoulder of the camp's biggest fighter, whose war-painted neck and jaw edge the right foreground: he is looking up. In front of him, at the centre of a ring of hide tents, sits a lump of several dozen boulders fused into one rounded body with stubby limbs and a blunt head turned to the left, taller than the tallest tent pole, dust drifting from its seams. Children have already stacked a row of pebbles on its knee. One campfire at its feet lights the lower boulders warm ochre and lets the top of the hulk fade into the night.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PN-G1-C3 바윗덩이 거구.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PS-G1-1 · 승전의 함성
일반 · 공격 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A rough stone rampart at the left of the frame is coming apart by itself, course by course: its top edge has already dropped into a ragged staircase, and loose stones are still hopping off each step and rolling into the grass, small puffs of dust marking where the last ones landed. Far off to the right, tiny in the battlefield haze, a handful of figures stand with heads thrown back and fists raised toward it. Clearing sky after the fight; warm hazy sun from the right lights the settling dust and the pale faces of the stones.
Colour: ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PS-G1-1 승전의 함성.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### RG1-1 · 우두머리 사냥
일반 · 공용 마법 · 레벨 4

```
Landscape 5:4 painting of a spell — the magic itself is the subject. After it is over: an empty plain under a fading night sky, grass combed flat by the wind. Three tall crested helmets lie far apart in the dust, each beside a broken commander's standard, and around each one the ground is stamped with hundreds of paw prints and bare footprints running inward from every side like the rays of a star. A few tufts of grey fur and a dropped fang necklace are the only things still moving. Last moonlight, grey-blue and cold, on bone-white helmets and standards, with the torn earth showing dry ochre.
Colour: bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: RG1-1 우두머리 사냥.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG1-01 · 사냥감 몰이
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Between two leaning boulders, from the end where the hunt is waiting, a narrowing gap frames a herd of steppe antelope squeezed into a stone funnel. The drive has sorted them: at the very front, alone in the gap and nearest to us, comes the thinnest one, limping, eyes wide, while the stronger animals are packed behind it shoulder to shoulder. Along the tops of the boulders run the pricked ears of wolves, keeping pace. Grey storm daylight from behind the herd; grit hangs in the gap and the lead animal is rimmed in pale dust.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG1-01 사냥감 몰이.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG1-02 · 숨통 끊기
일반 · 방어 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Small with distance, on a slope of red clay, a beaten line is trying to leave the field: a dozen figures strung out across the frame, climbing toward the left, each one staggering, leaning on a spear or on a neighbour. Directly behind every one of them a single low grey shape has risen from the grass and matched its pace — one pursuer to each, close enough to touch. The lowest pair on the slope has already stopped. Slate storm light, flat and cold, with rust-red dust smoking off the slope behind the climbing line.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG1-02 숨통 끊기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG1-04 · 사냥감 표식
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. An emblem laid out in the dirt: at the right of the frame a dented enemy helmet sits on a short stake, and down the middle of its brow runs one thick thumb-drawn stripe of wet ochre clay, still dripping. At the foot of the stake stand a small clay paint pot and a tallow lamp. All around, just beyond the lamp's reach, pairs of eyes shine in the dark, every pair turned toward the stripe. The single tallow flame lights the helmet and the wet stripe warm ochre and puts a point of light in each waiting eye.
Colour: firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame.
Setting, the land of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG1-04 사냥감 표식.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G2 베르단의 뿔 (38장)

#### G2-02 · 이끼 코다마
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. The frame tilts with its cocked head: a thumb-high pale spirit with a round head and hollow dark eyes pushes up out of a deep boot-print in the moss, on the right of the picture, leaning rightward as its head rattles mid-turn, blurred like a shaken seedpod. Chalky fragments of its former body lie in the print around it, and fat raindrops burst on the moss. Dim green shade under old trees during a shower; each raindrop and the spirit's pale wet head hold one small soft highlight.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-02 이끼 코다마.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-03 · 나무늘보 견습 궁수
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. Between fern stems on the forest floor, among arrows stuck crookedly in the leaf mould, we look across to the lowest bough of an immense tree on the left, where a young sloth with moss greening its shaggy fur hangs by its hind claws and one arm, slowly drawing a bow much too big for it toward the left. A straw target hangs untouched beyond it; far above, out of focus, rope bridges and platforms crowd the higher branches. Golden-green sun slants down through the canopy in dusty shafts, lighting the apprentice and leaving the missed arrows in soft shade.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-03 나무늘보 견습 궁수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-05 · 어린 트렌트
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. Over the rough, mossy shoulder of an old tree-elder, a knee-high young treant stands in the middle of a leaf-strewn deer path, facing us. Its bark face is turned up with its knothole mouth half open, stuck mid-word — while its bare root-toes are spread wide and pressed into the soil, where fallen acorns hop and tremble from some far-off footfall only it can feel. Low amber afternoon light through thinning russet leaves, warm on the little one's face, with the elder's shoulder a dark soft blur in front.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-05 어린 트렌트.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-08 · 오소리 숲지기
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. At eye level in a dark grove, an old grey badger crouches in the middle of the frame, turned to the right, pressing fresh soil flat with both broad foreclaws at the foot of a great tree; a wooden spade leans against its shoulder. Behind it, older mounds recede between the trunks, each one overgrown with a small crowd of red flowers — the nearest thick, the farthest only a few bright specks. Last grey-green daylight falls from one gap in the canopy onto its striped head and the newest mound; the red flowers glow faintly in the gloom.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-08 오소리 숲지기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-09 · 숲 사티로스
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. Flat as a painted frieze, in strict side view: a goat-legged satyr with curled horns and shaggy haunches strides leftward across the full width of the frame along a fallen log. He keeps blowing a set of reed pipes held in one hand while the other swings a shield of charred bark, split by a pale forked lightning scar, into the path of a thrown javelin that splinters against it. His pointed beard and the pipes' tassels stream behind him. Even grey rain-light from above, soft and shadowless, with fine drizzle beading on horn, fur and bark.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-09 숲 사티로스.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-11 · 갓버섯 보초
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. Beneath a hanging plank bridge, looking up from the shadows: daylight shows in thin slits between the planks, and across one slit the dark sole of a boot is passing. Along a root-ledge just under the planks, on the right, a row of five squat mushroom folk tilt their broad blood-red caps upward to listen, stalk-bodies pressed together. From each cap a fine white thread runs up to the underside of the bridge, quivering. Green twilight falls through the gaps in narrow blades; the row of red caps is the only colour in the damp near-dark.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-11 갓버섯 보초.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-13 · 고목 거미
일반 · 유닛 · 레벨 3

```
Landscape 5:4 painting. Through a ragged tear in a curtain of grey silk we peer into the web-shrouded crown of an old tree: every branch is wrapped, and russet leaves hang caught in the veils like coins. In the middle, flattened against the trunk and patterned exactly like its bark, a spider the size of a cart shows itself only by eight dew-wet knees and a single forelimb flicking a fresh line of silk out toward the left. Amber autumn light glows through the silk from behind, turning the veils translucent and the hidden spider into a darker patch of bark.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-13 고목 거미.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-15 · 에일렌 뿔사슴
일반 · 유닛 · 레벨 3

```
Landscape 5:4 painting. From inside the fresh pale notch an axe has cut into a trunk — the wedge of raw wood framing the view above and below — we look out at the forest edge, where a herd of great stags has stopped grazing on the right. Every head is lifted, and every crown of mossy, branch-like antlers is turned straight toward us. A single wood chip is still falling past the opening. Dim green shade under the edge trees; the raw wood of the notch glows pale around the view and the stags' eyes hold small wet highlights.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-15 에일렌 뿔사슴.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-20 · 실바니엘 호랑이
일반 · 유닛 · 레벨 4

```
Landscape 5:4 painting. Over the cloaked shoulder of a climber halted on a broad wooden stair that winds around a giant trunk, we meet the stare of a great tiger lying across the next step on the right — amber fur, moss-green stripes, one paw hanging over the edge. Behind it, on every higher step curving out of sight, another tiger lies the same way. A single falling leaf has stopped in the air in front of its nose. Golden-green sunshafts fall through the canopy across the stair, striping the tigers a second time with light and shadow.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-20 실바니엘 호랑이.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-21 · 트렌트 전사
일반 · 유닛 · 레벨 4

```
Landscape 5:4 painting. A burnt-out hollow trunk frames the view like a black cave mouth; from inside it we watch a broad treant stride leftward along a ridge in the upper part of the picture. One flank of its trunk is still scorched black and cracked; the other has leafed again. Its branch-arms are balled into fists of knotted wood, and around its root-feet a burnt clearing shows the first green shoots through wet ash. Grey rain-light over the clearing; drizzle streaks the opening, and the fresh shoots are the brightest green in a field of ash.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-21 트렌트 전사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-25 · 떨어진 베르단의 뿔가지
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. Directly from above, an autumn forest floor: in the upper half of the frame stands a huge forked branch shaped like a stag's antler, dark ancient wood furred with moss, walking on splayed root-legs toward the right, a faint green glow running in its grain. Around it every fallen leaf lies in neat concentric rings, each leaf turned the same way, while beyond the outermost ring the leaves are a wind-blown jumble. At the ring's edge a squirrel sits frozen with one leaf in its paws. Low amber sun rakes across the floor from the left, throwing the antler's long forked shadow over the ordered leaves.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-25 떨어진 베르단의 뿔가지.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-26 · 에일렌의 코다마
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. Looking up from the foot of an immense old tree in drifting fog: on the right, perched on a burl a little above us, sits a pale round-headed spirit the size of a child, hollow dark eyes turned down and to the left, one hand resting on the bark as if counting. All the way up the trunk, hundreds of small round knots in the bark look like faces. At the bottom edge of the frame a woven cradle hangs from one root, and beside another root stands a small cairn of mossy stones. Soft silver light sifts down the trunk through the fog from far above; the spirit's pale body is the brightest shape in the grey-green haze.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-26 에일렌의 코다마.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-28 · 장벽 뿌리 거수
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. What seemed a bank of giant tangled roots and packed soil, up close: an axe stands sunk an inch deep in one root, and right beside the cut an eye the size of a cartwheel has opened among the roots — amber, calm, looking straight at us. Pebbles and moss shift where a brow of knotted wood has lifted. Along the lower edge three more axes lie set down neatly on the moss, handles side by side. Green-gold light slants through mist onto the roots; the wet eye carries one bright highlight.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-28 장벽 뿌리 거수.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-30 · 가시등 고슴도치
일반 · 유닛 · 레벨 6

```
Landscape 5:4 painting. The road below the gate-top of a tree-city, seen from above: a ball of bramble thorns as big as a boar sits on the right side of the track, exactly where it has sat for generations — the wheel ruts swing around it in a deep, polished curve. Its spines have put out leaves and blackberries, a wren nests among them, and from a gap near the ground a damp brown snout and one sleepy eye point toward the right. Heavy green shade at the gateway; soft daylight from the left picks out the wet snout and the nearest thorns.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-30 가시등 고슴도치.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-31 · 드리엔의 그린맨
일반 · 유닛 · 레벨 6

```
Landscape 5:4 painting. A grey, long-dead slope of bare earth and dry bracken under low drifting fog, viewed from a height: in the upper part of the picture a tall figure woven entirely of oak leaves, ivy and blossom walks toward the right, his calm leaf-mask face lowered. Behind him, winding up from the bottom-left corner, his path is marked by a ribbon of small flowers — white, violet, pale yellow — opening out of the dead ground, the newest still unfolding at his heels. Flat silver fog-light over the slope; only the ribbon of blossoms and the wet shine of his leaves hold colour.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-31 드리엔의 그린맨.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-32 · 태고림 거목
일반 · 유닛 · 레벨 6

```
Landscape 5:4 painting. A high branch gives the view, looking down: at the top of the frame the vast trunk of an ancient tree, wide as a tower, shows a heavy-lidded bark face among its buttress roots, eyes nearly shut. Its shadow lies over the ground below like a pool. Outside the shadow, falling leaves streak past as blurs; inside it, the same leaves hang almost still in the air, and a leaping hare is held at the top of its bound, ears back. Golden-green sunshafts fall around the tree and stop at the edge of its shade, which stays cool, dim and perfectly calm.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-32 태고림 거목.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-33 · 첫 고목의 드라이어드
일반 · 유닛 · 레벨 7

```
Landscape 5:4 painting. Dead centre and facing us, a dryad as tall as a house steps out of the arched hollow of a colossal tree, pale bark limbs symmetrical, twig fingers spread, leaf-hair falling to her knees. Through the hollow behind her shines another age — giant ferns under a clear young morning — and its light spills out in a halo where spring flowers open at her feet. Outside that halo the forest is bare, wet and wintry, and two deer at the roots reach only to her ankle. Warm young daylight pours from the hollow behind her into a cold fog-grey present, rimming her whole outline.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-33 첫 고목의 드라이어드.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-34 · 베르단의 뿔 기사
일반 · 유닛 · 레벨 7

```
Landscape 5:4 painting. Down in the fallen leaves, past the blurred tips of ferns, a stag the size of a hall stands square above us in the middle of the picture, head turned to the right. Its forelegs rise like tree trunks, a fox trots under its belly with room to spare, and far above, its antlers branch like the crown of an oak — every tine ending in a tuft of new green leaves, with a pair of herons nesting in the fork. A garland of ivy hangs across its chest like a sash. Russet evening light comes low through the trunks from the left, warm on its spotted flank, the antler crown dark against an amber sky.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-34 베르단의 뿔 기사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G2-36 · 에일렌의 균사 심장
일반 · 유닛 · 레벨 7

```
Landscape 5:4 painting. Underground, in a cavern roofed with giant roots, we stand close under a heart as big as a house hanging on the left of the view — a great lobed mass of pale fungus wound in white threads, caught at the swell of a beat. From it thousands of fine filaments fan out to the right and up into the roots, and a pulse of blue-green light is travelling along them all at once. On a ledge beneath it a row of tiny cap-headed mushroom folk stands watching, small as thimbles. Total darkness except the heart's own pale-lime glow and the blue-green pulse running out through the threads.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G2-36 에일렌의 균사 심장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### I3-3 · 실바니엘 장궁
일반 · 아이템 · 레벨 3

```
Landscape 5:4 painting of one object — the object itself is the subject. A longbow hangs in mid-air between two giant boughs, tossed across the gap: taller than a man, cut from one dark stave with moss along its back and a grip bound in bark cord, turning slowly end over end on the left of the frame. Its string is still a humming blur from the shot just loosed, and on the right a vine swings wildly where its owner has already leapt away. Far below, mist fills the gap. Deep green canopy shade; a cool glow from the mist below rims the stave and the blurred string.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: I3-3 실바니엘 장궁.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG2-1 · 가시 문신
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. A patch of grey-green, bark-grained skin in extreme close-up, filling the frame: a vine of thorns is tattooed across it in dark sap-ink, winding from lower left to upper right. Along the middle of the vine the inked thorns have risen out of the skin as real ones, hard and curved, and on the tip of the longest hangs one bright red drop. A few torn threads of wool are snagged on the thorn beside it. Dim green forest light from the left; the wet red drop and the raised thorns hold sharp little highlights against near-black shadow.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG2-1 가시 문신.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG2-2 · 나무껍질 각인
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. Leaning against the foot of an ancient tree, in the lower part of the frame, stands a hand-sized carving block of pale wood, its face cut with a pattern of deep furrows — the exact pattern of the trunk's bark rising behind it, ridge for ridge. The block's oldest furrows have begun to grow real bark of their own, thick and lichen-spotted, so that half of it is carving and half is tree. A small mallet and a bowl of dark sap-ink sit beside it in the fallen leaves. Amber autumn light slants in from the left across block and trunk alike, deepening every furrow.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG2-2 나무껍질 각인.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG2-5 · 생명의 씨앗
일반 · 아이템 · 레벨 3

```
Landscape 5:4 painting of one object — the object itself is the subject. In an earth pocket beneath a great tree, a cage of pale roots curves around an empty space the size of a chest — bars arched like ribs — and in it, just left of where a heart would sit, rests a single seed as big as a walnut, its husk split by one green vein of light. Fine rootlets from the cage have already reached the seed and wrapped it. Moss cushions the pocket, and beyond its mouth the night forest is black. The seed's own pale-lime glow lights the root-ribs from inside, throwing their curved shadows over the moss.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG2-5 생명의 씨앗.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MC-14 · 갑옷째 휘감기
일반 · 공용 마법 · 레벨 3

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Through the narrow eye-slit of a helmet — its dark rim framing the view — a mass of green vines comes straight at us, the nearest tendrils already curling over the slit's edge. Our own steel gauntlets, raised in front, are wound round and round with vines that have found every joint; one plate is buckling outward with a twist. Past them, other suits of armour stand bound the same way, and an empty breastplate, peeled off whole, is sinking into the moss. Near-dark under the trees; a dull green light catches wet vine and bent steel, and a few red berries ride the tendrils.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MC-14 갑옷째 휘감기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MG-08 · 뿌리 결박
일반 · 방어 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from far across a valley: a line of small armoured figures crosses a bare ridge against the evening sky, and it is the back of the line, on the left, that has stopped. Around the last five marchers the ground has burst open, and dark roots arch out of it like the legs of great spiders, looped round ankles and shins; the figures lean and flail in place, while the front of the column walks on, unaware, toward the right. A band of dull russet dusk behind the ridge silhouettes roots and figures alike; the valley below is already dark green shadow.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MG-08 뿌리 결박.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MG-10 · 고목의 장막
일반 · 방어 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A curtain of hanging branches fills the frame from edge to edge: hundreds of thin, drooping withes let down from above, each strung with small leaves and long thorns like beads on cords. Sunlight comes through the gaps in green-gold slivers, and behind the curtain a sheltered figure is only a soft dark shape. On the left, at hand height, a torn leather glove hangs snagged on the thorns, still swinging. Back-lit by golden-green shafts from beyond the curtain, so every leaf glows and every thorn is a dark needle.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MG-10 고목의 장막.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### NG2-1 · 뿌리 파고들기
일반 · 공격 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A suit of plate armour towers over us, seen from the ground looking straight up against the night canopy: pale, questing roots have come up through the soil beneath it and out through every gap in the steel — the visor slit, the armpits, the elbow joints, between the fingers of both gauntlets — prising each plate a little wider. Beside its armoured feet a pair of bare feet stands untouched, a single root curving politely around the heel. Night; the roots carry a faint blue-green glow of their own that lights the armour from inside its seams.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: NG2-1 뿌리 파고들기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### NG2-3 · 숲의 재생
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The cut end of a moss-furred limb in extreme close-up, entering from the right: it shows wood-grain rings like a pruned branch, and from those rings five pale-green shoots are unfurling toward the left, already bending into the shape of fingers, the first one tipped with a tiny nail of bark. Beads of amber sap stand along the old bark edge, fine moss is creeping up the new shoots, and a few wood shavings are still drifting down past them. A single shaft of golden-green sun lights the shoots from behind so they glow translucent against deep shade.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: NG2-3 숲의 재생.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PN-G2-C1 · 이끼 덮인 묘목
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. A moss-covered sapling the height of a child, close up and set to the left of the picture, leans defiantly rightward: a small scowling bark face, two twig arms folded. Its stem is ringed with a ladder of healed scars, all at the same height, and the newest cut is closing under fresh moss as we watch. Beside it on the right lies a neat heap of its own lopped-off tops, a dozen of them, and a billhook with a chipped edge. Soft grey overcast morning; the wet moss on its stem is the greenest thing in the haze.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PN-G2-C1 이끼 덮인 묘목.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PN-G2-C3 · 늪가의 히드라
일반 · 유닛 · 레벨 6

```
Landscape 5:4 painting. The still, rust-stained water of a swamp fills the frame, and in it — upside down, rippling — hangs the reflection of a many-headed serpent leaning over the bank toward us: five thick moss-green necks draped in waterweed across the upper part of the picture. One neck ends in a healed scar from which two smaller heads, paler and rust-tinged, have sprouted side by side. At the bottom edge a snapped boar-spear stands out of the mud at the waterline. Dull green daylight under hanging moss; the water is a dark mirror with an orange film, and the two new heads catch the most light.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PN-G2-C3 늪가의 히드라.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PS-G2-2 · 뿌리 내림
일반 · 방어 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The ground is cut open to show both worlds. Above the line, left of centre, two long moss-furred legs stand planted from the knee down, bark climbing the shins like rising water, and a heavy club lies let go in the leaves beside them. Below the line, roots are bursting from both soles and driving down through the dark earth, forking, wrapping buried stones, already reaching twice as deep as the legs are tall. Overcast evening above; the cut earth is near-black, the new roots pale against it, and a few red berries lie in the leaf litter by the club.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PS-G2-2 뿌리 내림.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### RG2-1 · 숲의 정적
일반 · 공용 마법 · 레벨 3

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Framed by a dark arch of briars in the foreground, a battlefield glade where everything has stopped: a flight of sparrows hangs fixed in the air, falling leaves are pinned mid-drop, and a thrown spear rests in empty air halfway across. Small figures below stand locked with blades half raised. Only the thorns are moving — slow green tendrils have climbed the hanging spear like a trellis and are reaching, unhurried, for the nearest raised sword. Windless grey-green haze fills the glade with flat silver light; the briar arch in front is a black frame.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: RG2-1 숲의 정적.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG2-01 · 덩굴 조이기
일반 · 공격 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One tall vertical on the left of the picture: a twisting pillar of vines as thick as ship's rope rises from the forest floor, and gripped in the middle of its coils is a single suit of the heaviest plate — breastplate squeezed to an hourglass, pauldrons folded like paper, rivets popping outward. Thin tendrils have threaded every seam and are pulling tight. One steel gauntlet has dropped among the autumn leaves at the pillar's foot. Amber late light from the right rakes across the pillar, catching the bent steel edges and the rust-coloured leaves below.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG2-01 덩굴 조이기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG2-02 · 새순 갑옷
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The instant before a blow lands: a notched steel blade enters from the upper right and hangs a finger's width above a flank of cracked bark, and in every crack beneath it tight red-tipped buds are swelling to meet the edge, overlapping like the scales of a coat of mail. To the left an older cut is already filled with a ridge of fresh shoots, and the shavings from it are still falling. Near-dark, with one hard green-white glint along the blade's edge and a soft sheen on the wet buds.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG2-02 새순 갑옷.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG2-03 · 가시 울타리
일반 · 방어 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Dawn light on the inside of a canvas tent wall, which fills the frame like a screen: thrown across it from outside is the sharp shadow of a thorn hedge that was absent at nightfall — a dense lattice of briar stems and long spines, taller than the tent. Caught among the shadow-thorns hangs the shadow of a torn cloak. At the bottom edge, a bedroll and a tin cup sit in the warm half-dark. Low morning sun behind the hedge glows golden-green through the canvas, printing every thorn as a crisp dark line.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG2-03 가시 울타리.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG2-04 · 트렌트 행진
일반 · 공격 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A tall beech caught halfway between tree and walker, left of centre: one side of it still stands rooted in the ground, bark smooth, branches still; the other side has torn free — a root-leg lifted high and dripping soil, stepping toward us, a branch-arm swinging forward, a rough face half formed in the bark between the two halves. Behind it other trunks in the grove show the same first shudder. Night; blue-green fungus-light along the grove floor outlines the lifted root and the falling clods of earth.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG2-04 트렌트 행진.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG2-05 · 수액 몰아주기
일반 · 공용 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Looking along the ground from where it starts: in the near foreground three long, mossy hands lie pressed flat on a tangle of surface roots, and from under each palm a line of amber light runs away from us along the roots, converging on one old tree in the right middle distance. That tree is swollen like a full barrel, its bark split in long seams that brim with glowing sap; the trees beside it stand thin and dim. Dusk under russet leaves; the amber sap glowing in roots and bark seams is the only warm light.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG2-05 수액 몰아주기.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG2-07 · 엉겅퀴 요새
일반 · 방어 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At arm's length, a charging lance-point drives into a rampart of giant thistles on the left — stalks thick as fence posts, leaves edged with spines as long as daggers, crimson thistle-heads the size of cabbages — and stops dead at the instant of impact. The shaft bows and splits along its grain, and a burst of white thistledown explodes outward from the blow like a thrown snowball, filling the air toward the right. Deep green shade behind the wall, with soft daylight from the left on the pale down and the splintering shaft.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Setting, the land of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG2-07 엉겅퀴 요새.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

### G3 마렌시아의 노래 (31장)

#### G3-02 · 물방울 운디네
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. From beneath the surface of a spring basin, looking straight up through clear water: above the shifting ceiling a cupped scaled hand wavers, broken into shards of colour, and from its fingertips a thumb-sized figure of living water has just stepped off. She drops headfirst toward us through the surface — a tiny translucent girl, hair already dissolving into a comet of bubbles, arms folded like a diver's — while the mossy stone walls of the basin frame the edges of the view. Midday sun straight overhead pours through the surface in shifting bands; the little figure catches it like a lens.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-02 물방울 운디네.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-03 · 석호의 새끼 돌고래
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. Extreme close-up filling the frame: the beak of a young dolphin breaking the surface, turned three-quarters to the right, smiling around the prize clamped in its small teeth — a bent silver spoon, tarnished and dripping, bright as a fish. Water streams from its chin; one dark eye shines above, and the tip of a small dorsal fin behind is nicked. Far beyond it, soft and out of focus, lie the reef gap it slipped through and the open sea. Low first sunlight from the right flashes on the wet spoon and beads of water; the sea behind is still dawn-pink and dim.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-03 석호의 새끼 돌고래.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-04 · 진주조개 파수꾼
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. Directly overhead, as a gull would see it: low tide has drained the mouth of a lagoon to furrowed wet sand, and in the middle sits one giant ridged clam, stranded and unbothered, its shell open a hand's width on a pearl's steady glow. Tide channels fork around it and rejoin; the dotted tracks of wading birds and a line of small crabs all detour in neat curves around the spot. A last shallow pool clings to its base. Bright noon sun from above flattens the sand to pale cream and turquoise runnels; the pearl glints from inside the shadowed gape.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-04 진주조개 파수꾼.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-06 · 물결 해마
일반 · 유닛 · 레벨 1

```
Landscape 5:4 painting. Between two barnacled jetty pilings that stand dark in the near foreground, a pony-sized seahorse comes over a small wave straight toward us, set in the left of the gap. Its ridged body is beaded with spray, translucent fin crest raised, and its curled tail grips a sealed courier tube of bamboo capped with red wax. Behind it the sea-lane runs out past a line of marker floats to a thin far coast. The rose dawn sun sits low behind it on the sea-lane, haloing the fin crest and leaving the pilings as cool dark frames.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-06 물결 해마.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-07 · 작살 든 해달
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. Over the wet shoulder of a sea otter floating on its back at the right edge: whiskers, one raised paw, and a chipped coral-tipped harpoon drawn back to throw toward the left. Out across the moonlit lagoon stands a practice target, a hoop of woven reed on a pole, with three scavenged harpoons already bunched in its exact centre. Several others, longer and finer, float uselessly in the water beneath it. A high bright moon silvers the lagoon and the otter's slick fur; thin mist softens the far shore.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-07 작살 든 해달.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-09 · 셀레네아 나가 수비병
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. Close on the head and shoulders of a naga sentry in the upper part of the frame, coiled beneath a bridge of the lagoon city: fin-crested brow, a collar of scallop plates, cheek resting against the shaft of a spear so cold that beads of water run down it and drip from its point. Its eyes are turned upward to the slats of the bridge, where the soles of late walkers pass. Below, its tail winds twice round a weedy stone pier. Thin blades of moonlight fall between the bridge planks across its face and the wet spear; everything else is blue shadow.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-09 셀레네아 나가 수비병.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-10 · 어린 셀키
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. Camera down on a wet tidal rock among barnacles and limpets, at dawn. Stretched across the frame, a spotted grey sealskin is snagged fast on the rough crust, and at its right end a small dark-eyed selkie child has got head and one arm free and is hauling with all her weight, cheeks puffed. Past her, soft in the distance, two shrine singers wade by with their faces turned carefully toward the open sea. Rosy first light skims in low from the sea, shining on wet fur and rock pools and leaving long blue shadows.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-10 어린 셀키.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-14 · 조수 상어 전사
일반 · 유닛 · 레벨 3

```
Landscape 5:4 painting. A film of ebbing water on a dark stone slipway, seen from close above, holds the whole story upside down. Cropped at the knees along the top edge stand the grey legs of a shark-headed fighter; below them, in the left of the mirror, hangs the full reflection — broad shoulders, tall dorsal fin, a whalebone blade edged with teeth already swinging back toward the right. Three sets of wet boot prints hurry into the frame from that side, straight into the returning shallows. The moon low behind the figure turns the wet stone to silver and draws the reflection in hard dark shapes.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-14 조수 상어 전사.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-15 · 넬리아의 정령
일반 · 유닛 · 레벨 3

```
Landscape 5:4 painting. Down among the offering vessels on the wet flagstones of a shrine. One thin stream of water is pouring itself from a smooth round gourd bowl into a dented bronze ewer with a jagged, broken lip — and it is two creatures at once. In the bowl its tail end still curls in a soft laughing loop; rising from the ewer, on the left, its upper half has become a furious little water-woman facing right, fists clenched, hair bristling in sharp spikes of spray. Soft grey daylight from an open doorway behind glows through the water figure and gleams on wet stone.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-15 넬리아의 정령.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-16 · 해마 근위병
일반 · 유닛 · 레벨 3

```
Landscape 5:4 painting. The whole frame tips with the force of a deep current. On the right a big armour-ridged seahorse leans hard into it, facing left, tail wound three times around a branch of black coral and stretched taut as a mooring line; grit, torn weed and a tumbling clay jar streak past its snout. Its fin crest is flattened, its eye steady. Behind its back, a soft pale glow and a few rising bubbles mark someone still singing. Deep water, almost black; a cold blue glow from behind outlines its plates, and specks of drifting plankton spark in the current.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-16 해마 근위병.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-28 · 석호의 자장가
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. A long grey shore seen from far off, sea and sky a single pale sheet. Small in the right of the frame a tall hooded shape of mist and slow water drifts leftward along the tideline, its edges curving like a pair of cradling arms. Behind it, one after another, a row of little reed rafts, each carrying a white-wrapped bundle and a candle, slides off the sand unpushed and follows it quietly out to sea. Windless fog at dusk; the candles and the shape's faint inner glow are the only warm and bright points on the still water.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-28 석호의 자장가.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-29 · 넬리아의 현신
일반 · 유닛 · 레벨 6

```
Landscape 5:4 painting. On a jetty at eye level, beside three small onlookers seen from behind — a child, an old woman, a fisherman with a net on his shoulder — we face a figure of clear flowing water risen from the lagoon, taller than the temple roofs. Its outline is three at once, sliding over one another like reflections: a laughing girl with loose streaming hair, a crowned queen in armour of spray, a bent elder leaning on a staff of falling water, all sharing one column below the waist. High bright sun behind the onlookers shines through the triple figure, scattering nets of light across the jetty and the shallows.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-29 넬리아의 현신.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-33 · 심해의 크라켄
일반 · 유닛 · 레벨 7

```
Landscape 5:4 painting. The sea cut open in cross-section, top to bottom. Along the upper edge runs the thin bright line of the surface with a row of tiny floating lamps where the singers are; beneath it, the long dark water column. From the black trench at the bottom rises the colossal dark-red mantle of a kraken, one huge eye open, barbed tentacles climbing through layer after layer of fading light — the longest tip coiling a single arm's reach below the lamps. Light dies downward from pale blue to black; a faint pulse of cold glow from the trench floor outlines the mantle from beneath.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-33 심해의 크라켄.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-36 · 샘물의 만조
일반 · 유닛 · 레벨 7

```
Landscape 5:4 painting. Against an enormous low moon stands the high tide itself: a towering swell of water risen like a striding figure, leaning left, so tall its foam crown brushes the top of the frame. It is all dark outline, with moonlight glowing green through its thin edges. At its feet lies a land cracked by drought, and a line of tiny people with jars and yokes files up to the one brimming spring from which the giant rises. The full moon directly behind makes the figure a translucent silhouette and lays its long shadow across the pale cracked earth.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-36 샘물의 만조.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### G3-42 · 해일 바다뱀
일반 · 유닛 · 레벨 5

```
Landscape 5:4 painting. One leap shown four times across the frame, left to right, like overlapping exposures: a long ribbon-finned sea serpent arcs out of the crest of a tidal wave, higher in each image, blue-green coils looping over the foam, until in the last it dives toward the right-hand shore. Under the earliest, faintest image the wave has already passed: only wet sand shining and a scatter of round shields lying face-up remain. Dawn sun low behind the wave shines pink and green through its lip and through the serpent's translucent fins.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: G3-42 해일 바다뱀.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG3-1 · 조개 부적
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. Half-made on a salt-bleached driftwood plank, set in the left of the frame: one small ribbed cockle shell, cream and rose, held in a notch, with a neat hole drilled halfway through its hinge. A bone awl and bow-drill lie where they were put down, a pinch of white shell dust beside them, and a cord of braided seagrass waits with its end already waxed for threading. Past the plank, the first thin wave of the tide slides up the sand. Soft fogged daylight from the sea; a mild sheen on the shell's ribs and the wet sand beyond.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG3-1 조개 부적.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG3-2 · 샘물 병
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. A small stoppered flask of thick sea-green glass hangs by a knotted cord from a mangrove root in the upper part of the frame, turning slowly over a spring. Lit from behind, the water inside glows clearer and brighter than the moon that lights it, and a blue wax seal on the stopper carries the print of a thumb. Below, out of focus, its glow lies as a pale disc on the black surface of the spring. The moon directly behind the flask shines through the glass; mist drifts between the roots.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG3-2 샘물 병.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG3-3 · 산호 단검
일반 · 아이템 · 레벨 2

```
Landscape 5:4 painting of one object — the object itself is the subject. Caught in mid-air above bright shallows: a dagger carved from one piece of red coral, its blade faintly branched like the reef it came from, grip bound in fish-skin. It was thrown from the upper left, and the thread of spray it trails shows the flight — a long curve that bends clean around a weedy mooring post, like a current rounding a rock, and now carries the dagger down toward the lower right. Noon sun from above; the red coral blazes against turquoise water, every droplet of the curved trail a spark.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG3-3 산호 단검.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG3-5 · 물방울 보주
일반 · 아이템 · 레벨 3

```
Landscape 5:4 painting of one object — the object itself is the subject. On a glassmaker's workbench among tongs, shears and a blowpipe sits a clear orb the size of an apple on a cork collar, and at its very centre floats one perfect drop of water. The bench around it is dry, except for this: thin dark wet lines have crept outward from under the orb along every crack and joint in the old planks, like roots, and one has reached the edge and hangs there as a bead. First rosy light through a workshop window on the left shines through the orb and throws a small bright lens-spot on the wood.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG3-5 물방울 보주.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IG3-8 · 조수의 삼지창
일반 · 아이템 · 레벨 3

```
Landscape 5:4 painting of one object — the object itself is the subject. A bronze trident, green with age, stands planted upright in the tidal shallows at the centre of the frame, and the sea has taken sides around it. To the left of the shaft the water is heaped a full hand higher, smooth and brimming; to the right it has drawn back to bare weed-covered rock where starfish and a flapping sole lie stranded. The step between the two levels runs straight out from the tines toward the horizon. Windless, soft-grey light; the raised water on one side reflects the sky like a mirror, the wet sand on the other only dully.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IG3-8 조수의 삼지창.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MC-03 · 뒤바뀐 물길
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Seen from straight above, a braided tidal channel on pale sand has just changed its mind: the bright main current swings into a new loop, drawn in streaks of foam. Caught in it, small crewless boats are being re-sorted like beads on a string — a broad, heavy barge shoved up to the head of the line on the left, a slim racing skiff dragged stern-first to the rear, oars trailing. High sun from above; turquoise water over white sand, each streak of the new current sparkling.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MC-03 뒤바뀐 물길.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MC-04 · 기원
일반 · 방어 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The held breath before the water arrives. At the foot of worn shrine steps, low in the frame, the lagoon has swelled up in one smooth, unbroken bulge that stands a hand higher than the stone it rests against — trembling, silent, a few floating prayer lamps riding its curve. On the next step up, at the right, waits a row of cracked boots and dented greaves, cropped at the knee, and a single finger of water is already reaching for the nearest. Moonlight from behind the lagoon shines through the swollen water's edge; the small lamps add warm points along it.
Colour: moon tide — silver-blue (#4fb3ff) moonlight and pale mist.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MC-04 기원.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MG-03 · 샘물 한 모금
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A dipper made from half a gourd rests on the mossy rim of a spring, set in the right of the frame, still rocking from the hand that put it down. One mouthful is gone from it; the water left inside glows faintly, and a last bright drop hangs from its lip. Beside the spring the grass holds the long flattened shape of someone who lay there exhausted — and from it, fresh wet footprints stride away uphill. Early sun slants in from the left through the trees, warm on the gourd and the dew, the spring itself clear blue.
Colour: coral dawn — coral pink and warm first light over water-blue (#4fb3ff).
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MG-03 샘물 한 모금.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MG-12 · 샘물의 축복
일반 · 공용 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A flung arc of water droplets fills the whole frame, hundreds of them frozen in the air, sweeping from a wet leafy sprig at the lower left toward the right. Each drop is a tiny lens holding the bright sky. Where the first of them land, on a string of polished brass luck-charms tied along a tent rope, the shine is sliding off the metal like paint in rain, leaving dull grey behind. Strong high sun from behind the spray lights every drop to a bright bead; the charms dim as the water touches them.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MG-12 샘물의 축복.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### NG3-2 · 역류
일반 · 공격 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A string of glass net-floats tethered in a narrow rock channel serves as the whole lesson. The current that held them streaming one way has just turned and runs backward, glowing with disturbed plankton, and the line has swung end for end: the smallest float, which trailed safely last, now leads on the left, nose-on to a curl of white water about to break over it, while the big lead float bobs sheltered at the rear. Night in the channel; cold blue plankton-light in the reversed current is the single light, glinting inside each glass ball.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: NG3-2 역류.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PN-G3-C1 · 살아 있는 물거울
일반 · 유닛 · 레벨 2

```
Landscape 5:4 painting. Low over a windless lagoon we look up at an upright oval of perfectly still water, taller than a man, standing on the surface in the left of the frame and facing us like a mirror on an invisible stand, its rim trembling with a few slow droplets. On a mooring post before it hangs a bronze helmet, cracked and badly dented. Inside the oval the same helmet hangs whole and polished, bright as the day it was made. Even soft-grey fog light; the mirror holds a cleaner, brighter version of it than the world around.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PN-G3-C1 살아 있는 물거울.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PS-G3-1 · 물의 거울
일반 · 공용 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One heavy drop of water hangs from the lowered tip of a halberd, magnified until it fills the centre of the frame. Inside the drop the world stands on its head, tiny and razor-sharp: a grey hillside, a row of battle standards and tent poles, all hanging head-down with the sky lying beneath them. Behind the drop the real field is only a soft blur of slate and green, and a second drop is gathering on the edge above. Overcast drizzle light from above; the drop gathers it into one bright inverted picture against the dull steel.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PS-G3-1 물의 거울.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PS-G3-2 · 썰물
일반 · 방어 마법 · 레벨 2

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At the high-water mark, looking out along the line the sea has taken: a rim of weed and driftwood at our feet, then wet sand ribbed and shining, scored with long keel-marks. On the right a war-boat lies stranded on its side, oars splayed, its standard pole fallen flat. Far ahead the tide is still running away from us in thin glistening sheets toward a horizon that keeps retreating. Pale, even evening light under high cloud; the wet flats mirror the sky so that boat and oars seem to float.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PS-G3-2 썰물.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### RG3-1 · 대해일
일반 · 공용 마법 · 레벨 4

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The sea in cross-section at the instant of one great heartbeat. Deep in the seabed at the bottom of the frame a vast dark seam like an artery has flashed bright, and from it a dome of pressure is rising through the black water, bending every layer it crosses. At the top the surface is already heaved into a long smooth hump, lifting a toy-small fishing pier and its lighthouse rock toward the sky. A pulse of cold blue from the seam below is the single light, fading upward through navy water to a dim grey surface.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: RG3-1 대해일.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG3-03 · 물의 장막
일반 · 방어 마법 · 레벨 1

```
Landscape 5:4 painting of a spell — the magic itself is the subject. A sheet of water thin as silk hangs upright in the dark, drawn up from the sea like a curtain, and a sword is caught halfway through it, thrusting from left to right. The half still on the near side is hard, bright, sharp steel. The half that has passed through emerges soft — the blade slumping into a rope of clear water that curves down and scatters as harmless drops. Black night; the veil itself glows faint water-blue and puts cold glints on the steel and the falling drops.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG3-03 물의 장막.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### SG3-09 · 대해류
일반 · 공용 마법 · 레벨 3

```
Landscape 5:4 painting of a spell — the magic itself is the subject. One anchored galley tells it. Out on the open sea the great current beneath her has turned, and the empty ship has swung right round on her anchor chain to lie stern-first, set in the left of the frame. From her prow the wreaths, ribbons and the carved luck-fish that hung there are tearing loose and streaming away to the left on the new flow, a long bright trail of them dwindling across the grey swell. Low slate sky; a pale band on the horizon lights the drifting charms and the wet curve of the hull.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Setting, the land of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: SG3-09 대해류.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

## ② 다시 그릴 카드 (22장)

그림은 들어가 있지만 장부 `art_map.csv`에 "다시"로 적힌 카드. 띠가 그려진 20장은 2026-11-26 깃발 줄의 "Banner" 낱말을 "Setting"으로 바꿔 고친 프롬프트이고, 화풍 줄의 "no border, frame, title strip or plaque"가 그 띠를 막는다 — 아래 프롬프트가 그 고친 판이다.

#### UN-A1 · 피의 서약자
유니크 · 유닛 · 레벨 6
다시 그리는 까닭: 예전 장면으로 그린 그림 — 지금 장면 프롬프트로 다시 (CHANGELOG "다시 그릴 그림: UN-A1 · UN-A2(옛 장면 그림)")

```
Landscape 5:4 painting. Through the eyes of the one he has struck: our dented shield rises along the bottom edge, a black wax seal smoking where he struck. A thin thread of blood-dark ink climbs from it to the tip of a greatsword long as a bridge. Filling the right of the hall stands a vampire lord tall as its pillars: bone-pale face under a crown of black iron thorns, violet eyes, membranous wings folded like a cloak. The same thread runs from his opened palm up the blade, and on a scroll long as a war banner a fresh line draws itself. Cold violet light falls from the high windows and gleams along wings, thorns and steel; the single wet thread of ink is the one dark-red line in the purple-black hall.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Setting, the land of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, violet (#8b5cf6). Saturation: jewel-bright and deep, with violet at its fullest strength. Air: thick with swirling motes and sparks of violet light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing violet at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-A1 피의 서약자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### UN-A2 · 엘라드의 날개 방패
유니크 · 유닛 · 레벨 6
다시 그리는 까닭: 예전 장면으로 그린 그림 — 지금 장면 프롬프트로 다시 (CHANGELOG "다시 그릴 그림: UN-A1 · UN-A2(옛 장면 그림)")

```
Landscape 5:4 painting. The pale stone flank of a citadel in the last blue of night fills the frame; across it falls one enormous shadow: a kneeling armoured figure with six wings flung wide, taller than the battlements. Inside the shadow's outline the stone is clean, and a weary garrison sits untouched at the wall's foot, small as chess pieces. Outside it, wall and ground bristle with iron siege bolts. The shadow's owner kneels at the far right edge, cropped by the frame — a winged colossus in white-gold plate behind a tower shield, bolts long as masts standing in her spread wings. The first low band of pale-gold dawn beyond the right edge throws her shadow leftward over cool blue-grey stone and gilds the rim of every feather.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Setting, the land of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its element. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its element colour, pale gold (#ffe9a8). Saturation: jewel-bright and deep, with pale gold at its fullest strength. Air: thick with swirling motes and sparks of pale gold light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing pale gold at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UN-A2 엘라드의 날개 방패.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B2-12 · 단조 견습장인
일반 · 유닛 · 레벨 2
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. Extreme close-up of two open ape palms held side by side in front of a bed of glowing coals: on the left the broad young hand of an apprentice, fringed with gunmetal-grey fur, on the right the larger, soot-grained hand of its old master. Each leathery palm carries the same ridge of yellow callus under the fingers and the same polished groove where a hammer haft sits; the young one's are still pink at the edges. A small plain hammer rests in the crook of the apprentice's thumb, and an iron ring gleams on its wrist. Coals behind push molten orange between the fingers and along the edges of both hands; a dim steel-grey light from the front shows the palms.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B2-12 단조 견습장인.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B2-16 · 장갑 태엽거미
일반 · 유닛 · 레벨 3
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. A long black puddle between mine-cart rails fills the centre of the frame, and in it, bright and sharp, hangs the reflection of what clings to the gallery roof above: a pony-sized clockwork spider sheathed in overlapping armour plates, its head toward the left, six spiked steel legs hooked into the rock while the front pair turn a roof bolt home. Its glass lens eyes glint. On the wet floor beside the puddle lie the things it has outlasted: a burnt-out lantern, a cold lunch pail and a folded blanket. A single miner's lamp left on a ledge at the right lights the roof warm amber; the puddle returns it as a clean bright image ringed by black water.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B2-16 장갑 태엽거미.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B2-18 · 증기 콧김 황소
일반 · 유닛 · 레벨 3
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. Flat as a frieze, a street of the underground city in side view: at the left a polished bronze bull with a round riveted boiler for a belly, one glowing firebox door in its flank and a brass valve between its horns stands facing right, head low. Twin jets of steam have just burst from its nostrils, and along the street ahead every hanging lantern swings away from it — the nearest flung almost level, the next half as far, the far ones only beginning to stir. A dropped loaf rolls along the cobbles. The swinging street lanterns throw small warm pools that slide over black stone; bronze flanks and steam catch amber, the vault overhead stays dark.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B2-18 증기 콧김 황소.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B2-19 · 걸어 다니는 모루
일반 · 유닛 · 레벨 4
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. The frame lurches sideways with the rebound: a great soot-black anvil on four stubby iron legs barrels toward us from the right, its horn lowered like a snout, the hammer-scarred face on its back still glowing orange. The sledgehammer that struck it a heartbeat ago is flying back the way it came — head spinning end over end toward the upper left, the ash haft snapped in two — and a fan of sparks follows it. An empty tree-stump base stands behind it with four snapped bolts. The hot face and the sparks light the dark workshop from the right in molten orange; gunmetal shadows cover the floor and the far wall.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B2-19 걸어 다니는 모루.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B2-27 · 두르크하임 근위장
일반 · 유닛 · 레벨 5
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. Head and chest fill the right of the frame: a grizzled guardian lion-dog with one blunt horn on its brow looks off to the left, eyes narrowed under a dented helm, in rust-streaked plate. The picture is really its mane — an iron-grey fall of a dozen thick braids, and into every braid is plaited a keepsake of a blow it stopped: a snapped sword tip, a notched sliver of axe blade, a bent arrowhead, each brown or green with age. The newest shard, near its collar, is still bright. Behind its shoulder a slab of riveted gate stands shut. Dim grey light from an arrow slit on the left grazes the helm and the old blade shards, showing rust red and verdigris against steel grey.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B2-27 두르크하임 근위장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B2-28 · 흐르는 수은
일반 · 유닛 · 레벨 5
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. First person, looking down at our own heavy boots on the wet stone of a pump-room floor: a sledgehammer lies where we swung it, sunk in a cracked flagstone, and from every side bright beads of liquid metal are rolling back inward, joining into rivulets that race between our feet. In the lower part of the frame they have already pooled into one mirror-bright mass that swells up toward us in a smooth wave, knee-high and rising, and in its curved face our own warped reflection stares back — helmet, lamp and raised empty hands. Our helmet lamp is the only light; the liquid metal throws it back as hard silver glare, and the room around is black and grey.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B2-28 흐르는 수은.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B2-32 · 걷는 무쇠 성채
일반 · 유닛 · 레벨 6
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. From inside the dark gate tunnel of the underground city, looking out toward the daylight: the arch has been hacked far wider and taller than it was built — raw pale chisel scars, scaffolding and heaps of fresh rubble line both sides — and in the bright opening on the right the reason is coming in. A castle of stone battlements and iron plate walks toward us on four great piston legs, its corner turrets scraping the new arch and showering grit. Masons with barrows, ant-small by its feet, are still widening the far side. Snow-bright overcast daylight pours in through the gate behind the castle, turning it grey against white; the tunnel walls nearest us stay in shadow.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B2-32 걷는 무쇠 성채.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B2-35 · 두르크하임 대장인
일반 · 유닛 · 레벨 7
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. At a visitor's eye level in a hall of finished golems: on the right an old grey elephant in a scarred leather apron, tusks capped in steel, stands facing right and presses the soot-black tip of his trunk against the breastplate of a steel giant whose head rises out of frame. Down the long rank behind him every golem carries the same small round soot mark on the same spot of its chest, at exactly the height his trunk can reach — dozens of them, shrinking into the dark. A lantern and a pot of soot sit at his feet. His lantern on the floor makes a small warm pool around his feet and the nearest golem's shins; the rank of golems fades to steel-grey glints in the black hall.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B2-35 두르크하임 대장인.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### IB2-2 · 강철 장갑판
일반 · 아이템 · 레벨 2
다시 그리는 까닭: 그림 안에 산맥 띠(명판)가 그려짐 — 깃발 줄 Banner 낱말 탓, 고친 프롬프트로 다시

```
Landscape 5:4 painting of one object — the object itself is the subject. A single standard armour plate — a thick, gently curved rectangle of steel as long as a forearm, with a rolled edge and a row of rivet holes down each side — hangs on two short chains from an overhead rail at the right of a proving bay, backlit by a window. The oak beam that carries the rail bows visibly under the weight. The plate's face shows a tight cluster of shallow dimples, and on the flagstones beneath lies what made them: five crossbow bolts with their heads mashed flat. Identical plates wait racked in the shadows. Cold daylight from a high window behind the plate outlines its edges in crisp white; the face is blue-grey, each dimple holding a small slate shadow.
Colour: cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: IB2-2 강철 장갑판.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MB-06 · 방열 철벽
일반 · 방어 마법 · 레벨 2
다시 그리는 까닭: 그림 안에 산맥 띠(명판)가 그려짐 — 깃발 줄 Banner 낱말 탓, 고친 프롬프트로 다시

```
Landscape 5:4 painting of a spell — the magic itself is the subject. First person, advancing across a frozen lake: along the far shore, across the upper part of the frame from end to end, stands a wall of tall iron plates planted edge to edge, each glowing from dull red at the foot to orange at the top, the air above it rippling. The ice has rotted back from it in a wide strip of open, steaming black water. Our own spear, thrust out ahead at the bottom of the frame, is glowing at the tip and beginning to droop like a candle, and the leather of our glove smokes. Grey dusk over the ice; the plate wall is the light source, pouring molten orange onto the steam, the black water and the sagging spear.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MB-06 방열 철벽.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### MB-08 · 장갑 고정
일반 · 방어 마법 · 레벨 1
다시 그리는 까닭: 그림 안에 산맥 띠(명판)가 그려짐 — 깃발 줄 Banner 낱말 탓, 고친 프롬프트로 다시

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The seam between two thick armour plates, enormously magnified, runs across the middle of the frame: a row of slotted screw heads sits along it, and all of them are turning the last quarter-turn at once, by themselves, thin curls of bright swarf lifting from each slot. The seam has closed to a hairline. Against it presses a thread of violet-black smoke — a curse hunting for a way in — which flattens, splays into searching fingers and slides off the steel like water off wax. Warm lamplight from the upper left rakes low across the plates, raising every screw slot and curl of swarf; the smoke absorbs it, dull violet-black.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: MB-08 장갑 고정.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PN-B2-C1 · 리벳 집게 게
일반 · 유닛 · 레벨 2
다시 그리는 까닭: 그림 안에 산맥 띠(명판)가 그려짐 — 깃발 줄 Banner 낱말 탓, 고친 프롬프트로 다시

```
Landscape 5:4 painting. A rust-water pool below a spoil tip, shown in cross-section: the orange surface line runs across the upper frame, and the cut shows cloudy red-brown water over a bed of silt strewn with dropped rivets. On the left a broad crab with a riveted iron shell faces left and reaches one heavy tong-like pincer for another rivet; the other pincer is pressing one into its own shell with a twist. The shell is studded in careful straight rows, front to back, with a single gap left to fill. Dull daylight filters down through rusty water, red-brown and dim; the rivet heads on the shell hold small steel-grey glints, green-blue weed at the edges.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PN-B2-C1 리벳 집게 게.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### PN-B2-C2 · 증기 굴착 두더지
일반 · 유닛 · 레벨 4
다시 그리는 까닭: 그림 안에 산맥 띠(명판)가 그려짐 — 깃발 줄 Banner 낱말 탓, 고친 프롬프트로 다시

```
Landscape 5:4 painting. From behind, at the mouth of a fresh round burrow bored into an ore face: deep in the tunnel the broad dark-furred rump and stub tail of a bulky mole recede from us, steel claws flinging grit back, and the hot steam of its breath rolls out along the roof toward the camera. At the rim of the burrow, entering from both sides of the frame, three pairs of frost-stiff mittened hands are held open to the warm draught. A tin of tea has been set on the burrow's lip to heat. One lantern on the ground glows warm amber through the steam; the surrounding rock is black with frost glints, the mole a dark shape in lit fog.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: PN-B2-C2 증기 굴착 두더지.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### RB2-1 · 공방 자폭 명령
일반 · 공용 마법 · 레벨 4
다시 그리는 까닭: 그림 아래에 깃발 풍경 띠가 그려짐 — 깃발 줄 Banner 낱말 탓, 고친 프롬프트로 다시

```
Landscape 5:4 painting of a spell — the magic itself is the subject. The held breath in a mine gallery: a rank of steel machines stands along the whole width of the frame, cropped at the shoulders so only their riveted chests and hanging hands show. In every chest, at the same instant, the furnace-heart has gone from orange to white, and hairline cracks are racing outward across each breastplate and up into the roof timbers. Dust begins to sift down, the lamps along the wall all swing the same way, and on the floor a brass command lever lies snapped off its post, its red wax seal broken. Small warm lamps along the gallery wall are being overpowered by the white hearts, which throw every rivet and roof prop into hard relief against black.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: RB2-1 공방 자폭 명령.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B3-04 · 정전기 요정
일반 · 유닛 · 레벨 1
다시 그리는 까닭: 그림 아래에 깃발 풍경 띠가 그려짐 — 깃발 줄 Banner 낱말 탓, 고친 프롬프트로 다시

```
Landscape 5:4 painting. Beside a heavy oak door at night, at eye level: on its brass doorknob, in the right of the frame, crouches a hand-sized sprite made of one crackling spark — spiky upright hair, flickering arc-wings, a wide mischievous grin turned to the left. From the left edge a bare fingertip reaches for the knob, and a thin jagged thread of light already bridges the last finger-width of air between them. A dark corridor; the sprite is the only lamp, throwing cobalt-blue shadows of knob and finger across the wood.
Colour: cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B3-04 정전기 요정.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B3-14 · 벼락 장어
일반 · 유닛 · 레벨 3
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. Looking up from the silty bed of a rust-stained river: a long dark eel slides leftward through the murk in the right of the frame, a row of glowing yellow organs running from gill to tail like a string of lamps. Flakes of rust drift around it. High above, the rippling surface shows the warped shape of a plank bridge and one bare foot held hesitating just over the water, toes curled back. Weak yellow-green daylight filters down through the rusty water; the eel's own stripes light the silt beneath its belly.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B3-14 벼락 장어.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### B3-18 · 안경원숭이 공학자
일반 · 유닛 · 레벨 3
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. A tarsier engineer's enormous amber eye, magnified again behind one brass goggle lens, fills the right half of the frame in extreme close-up and peers straight at us, fine fur curling over the rim. In front of the lens, sharp and enormous, two long slender fingers with round padded tips hold tweezers and thread a hair-thin copper wire between the teeth of a steel cogwheel. Out of focus behind: a cold mug and the head of a heavy smith's hammer. Grey dawn through a wet workshop window; one bead of solder glows yellow at the wire's end and twinkles in the lens.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the palette's key colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: B3-18 안경원숭이 공학자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### UP-B2-12 · 단조 명장
강화 · 유닛 · 레벨 3
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. At the anvil of the same forge, seen from below: a great ape with gunmetal-grey fur, the apprentice grown into a master, stands at the centre turned toward the right, fur gone silver at the brow and wrists, the same iron ring on one wrist, a scorched leather apron on its chest. One broad calloused hand holds a glowing blade on the anvil with tongs; the other brings a heavy hammer down, sparks bursting at the strike. On the rack behind hang three hammers of rising size, the small plain one first, and a young ape works the bellows. The bed of coals behind pushes molten orange along its fur and the anvil's edge; dark gunmetal gloom fills the hall.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher, at the height of its new title — larger in the frame, sturdier body, reinforced gear, commanding bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: the attached picture shows this same individual before its promotion — keep its body, face, markings, colours and the things it carries, and paint a wholly new picture of it grown stronger: the new viewpoint, pose and composition are the ones this scene describes.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UP-B2-12 단조 명장.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### UP-B2-18 · 증기 황소 우두머리
강화 · 유닛 · 레벨 4
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. Camera on the cobbles of the same underground street: the polished bronze bull comes straight toward us at the head of a herd, grown to fill the height of the street, head low, the brass valve shrieking between its horns, three firebox doors glowing in a row along its riveted boiler belly. One forehoof has just struck the ground in front of the lens — the cobbles jump, cracks run outward, and steam bursts from both nostrils along the walls. Behind its shoulders three smaller bronze bulls follow in file, and every hanging lantern swings wildly. Swinging street lanterns throw small warm pools over black stone; bronze and steam catch amber, and the vault overhead stays dark.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Setting, the land of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher, at the height of its new title — larger in the frame, sturdier body, reinforced gear, commanding bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: the attached picture shows this same individual before its promotion — keep its body, face, markings, colours and the things it carries, and paint a wholly new picture of it grown stronger: the new viewpoint, pose and composition are the ones this scene describes.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UP-B2-18 증기 황소 우두머리.png — this is the name of the downloaded file only; the painting itself stays wordless.
```

#### UP-B3-18 · 안경원숭이 수석공학자
강화 · 유닛 · 레벨 4
다시 그리는 까닭: 그림 위·아래에 깃발 풍경 띠(명판)가 그려짐 — 고친 프롬프트로 다시

```
Landscape 5:4 painting. From a gallery above the same wet-windowed workshop, looking down: the tarsier engineer stands on a stool in the right of the frame, huge-eyed, facing left, brass goggles with three stacked lenses pushed up on its silvered brow, a rolled plan under one arm and one long slender finger with a round padded tip pointing. Under that finger a great machine of steel cogs and copper windings fills the floor, just beginning to turn, and three apprentices in aprons hurry along it with soldering irons. A cold mug and a smith's hammer sit on the bench beside the stool. Grey dawn through wet windows; beads of solder glow yellow along the machine and twinkle in the three lenses.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Setting, the land of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher, at the height of its new title — larger in the frame, sturdier body, reinforced gear, commanding bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
Continuity: the attached picture shows this same individual before its promotion — keep its body, face, markings, colours and the things it carries, and paint a wholly new picture of it grown stronger: the new viewpoint, pose and composition are the ones this scene describes.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. One continuous painting from edge to edge — no border, frame, title strip or plaque, and no lettering.
Save the image file as: UP-B3-18 안경원숭이 수석공학자.png — this is the name of the downloaded file only; the painting itself stays wordless.
```
