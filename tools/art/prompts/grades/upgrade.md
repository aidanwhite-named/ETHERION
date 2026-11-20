# 강화 (Empowered) — 카드 일러스트 프롬프트 (40장, n1)

> 원래 카드의 그 개체가 한 단계 오른 모습. 원래 카드 그림을 함께 넣고 그린다. 보강한 몸 · 장비, 발밑에서 오르는 청록빛.

등급 한 줄(모든 강화 프롬프트에 들어 있다): `Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.`

카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 나온 그림(가로 5:4)은 `tools/art/inbox/<카드ID>.jpg` → `python3 tools/art/artmap.py import`.

**그리는 차례**: 1 그림 없는 카드(유니크 → 에픽 → 고급 → 일반 → 강화 → 소환물 → 레어 → 스페셜) → 2 다시 그리기(장부 `art_map.csv` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저.

## 1. 그림 없는 카드 — 먼저 그린다 · 40장

### UP-A1-09 · 모르크 거미 여왕
모르카스의 그믐 · 유닛 · 레벨 3 · 강화 · 틀 `far` L R `frostindigo` · 원래 카드 `A1-09` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A1-09.jpg`

```
Landscape 5:4 painting. Far across the canyon, a whole cliff face is veiled from rim to floor in a web of black threads, and hung in it are the things that fell: a cart, a rowing boat, a bronze bell. High on the right sits the weaver, a spider now the size of a pony, her clusters of violet eyes turned left along a thread where a file of her young, each as big as a cat, carries wrapped bundles toward her. The first bundle has reached her, and she is cutting her share from it before the rest goes on. Cold blue-violet dusk in the gorge; frost on the threads turns the web to a sheet of tarnished silver around her black body.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A1-11 · 마족 선봉장
모르카스의 그믐 · 유닛 · 레벨 3 · 강화 · 틀 `close` R C `violetshade` · 원래 카드 `A1-11` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A1-11.jpg`

```
Landscape 5:4 painting. Tight on the head and shoulders of a demon soldier turned three-quarters to the right: short curved horns, ashen skin, eyes glowing violet under a scarred brow. On his near shoulder sits the same dented pauldron he has always worn, and roped on top of it are two more of different make, both scratched. Three ribboned wax seals hang at his throat on cords, one bright, two cracked. Three strips of cloth are knotted round the spear shaft against his cheek, and behind him, out of focus, two spears stand planted in the ground with a helmet on each. Three small violet flames burning along his spearhead light his cheek and the stacked pauldrons from the right; purple-black dusk behind.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A1-15 · 피를 마시는 마검
모르카스의 그믐 · 유닛 · 레벨 4 · 강화 · 틀 `pov` B T `eclipse` · 원래 카드 `A1-15` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A1-15.jpg`

```
Landscape 5:4 painting. First person: our own two hands in new polished gauntlets reach forward along the bottom edge, fingers open to take a sword's grip, and close on empty air. The black sword has already gone, flying away from us in the upper part of the frame by itself, point first, toward a line of raised shields on a ridge. The eye carved on its guard, shut until now, has opened and glances back at us, red. Red smoke trails from its edge in a long streamer, and three older pairs of gauntlets lie scattered on the frosted ground beneath its path. A thin cold band of light along the ridge silhouettes shields and blade; the open eye and its smoke are the one red in violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A1-18 · 그림자 학살자
모르카스의 그믐 · 유닛 · 레벨 4 · 강화 · 틀 `tilt` F R `eclipse` · 원래 카드 `A1-18` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A1-18.jpg`

```
Landscape 5:4 painting. A tilted frame on a lantern-hung square, mid-bound: a wolf-like beast of black smoke with far too many ivory fangs comes at us from the right, out in the open light, violet eyes wide. Caught on its fur and dragged behind it like a torn cloak are the shadows of the whole square: the long shadows of a statue, a fountain, a market cart and three fleeing townsfolk, all ripped loose from their owners and stretched toward the beast. Behind it the square stands bright and bare, the stone around every plinth and wheel evenly lit. Hard pale light from behind rims the beast's smoke and each dragged shadow in a thin cold line; its eyes and the haze around it are violet.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A1-23 · 대낫 사신
모르카스의 그믐 · 유닛 · 레벨 5 · 강화 · 틀 `high` L T `bonepale` · 원래 카드 `A1-23` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A1-23.jpg`

```
Landscape 5:4 painting. High over a pale field where rolled parchments grow on stalks in long straight rows, looking down. At the top of the frame a hooded reaper in a tattered black robe stands knee-deep in a drift of cut scrolls, a ledger at his belt, and swings leftward a new scythe whose blade is as long as a roof beam. One sweep has taken an entire row: thirty stalks tip over together, all the same way, like a wave. Over the fallen row a whole line of small looping ink flourishes rises at once. Ash-grey overcast drains field and robe of colour; a single violet gleam runs the length of the great blade.
Colour: bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-11 · 창뿔 유니콘
솔란테의 새벽 · 유닛 · 레벨 3 · 강화 · 틀 `inside` R L `firstlight` · 원래 카드 `A2-11` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A2-11.jpg`

```
Landscape 5:4 painting. From deep inside a dark tunnel under the citadel, looking out toward its arched mouth at the left: a young white stallion with a gold mane steps in from the daylight, head lowered, a pearly spiral horn as long as a spear levelled before him like a lance. Ahead of the horn's tip, a full stride before any light could reach, the blackness of the tunnel is splitting open along a straight seam that runs to the right across the frame, the dark peeling back to both sides like a slit curtain. Pale morning light frames the horse from the tunnel mouth behind; the seam it cuts through the dark glows soft gold from within.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-15 · 솔란테의 서약 기사
솔란테의 새벽 · 유닛 · 레벨 4 · 강화 · 틀 `through` L R `vigil` · 원래 카드 `A2-15` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A2-15.jpg`

```
Landscape 5:4 painting. Through the gap of a heavy chapel door left ajar — dark wood filling both sides of the frame — we see a narrow slice of the vigil inside, right of centre. A seraph stands there in new white-gold plate, wings folded, both hands on the pommel of the same plain sword set point-down, facing left toward an unseen altar. Three narrow white ribbons are tied above his left elbow, each a little more faded than the last. A thin sword-shaped ray of light rests across his shoulder like an accolade. One small oil lamp burns low inside; the single ray falls from a high slit window, and the door in the foreground stays black.
Colour: night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-17 · 황금 스핑크스
솔란테의 새벽 · 유닛 · 레벨 4 · 강화 · 틀 `back` B R `firstlight` · 원래 카드 `A2-17` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A2-17.jpg`

```
Landscape 5:4 painting. From behind the right shoulder of a couchant sphinx whose fur has turned bright gold, wing feathers gilded at their edges, the back of her sun-disk crown blazing like a lamp. She faces a short line of travellers waiting at the foot of a white stair, and her glow throws each one's shadow long across the road behind them — a shepherd's, a pedlar's, a child's. The fourth, a well-dressed man already edging backward, stands on bare bright paving, his shadow gone. Blue-grey dawn before the sun; the sphinx's own golden glow is the light that casts the travellers' shadows away from her.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-22 · 솔란테의 대성종
솔란테의 새벽 · 유닛 · 레벨 5 · 강화 · 틀 `under` D L `glare` · 원래 카드 `A2-22` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A2-22.jpg`

```
Landscape 5:4 painting. Looking straight up through the open trapdoor of a belfry floor, its dark timber edges framing the view: the mouth of an enormous bronze bell hangs overhead, filling the upper left, its great clapper swung to one side at the instant of striking. Light pours down out of the bell onto us, the rising-sun engravings along its rim seen from beneath, and rings of pale gold spread outward from the rim through the rafters and away through the open arches. A bell rope falls past the camera to the lower right. The bell's inner light is the single source, blinding at its centre and bronze-gold on the rim, with the trapdoor frame and rafters black against it.
Colour: holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it.
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A2-24 · 빛의 대거울
솔란테의 새벽 · 유닛 · 레벨 5 · 강화 · 틀 `profile` L R `firstlight` · 원래 카드 `A2-24` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A2-24.jpg`

```
Landscape 5:4 painting. Side-on, on a bare terrace: three tall oval mirrors in gilt frames stand at the right, overlapping one behind another like half-folded wings, their bright faces turned left and seen as three thin blazing edges. Their backs, toward the right, are dull grey and gritty like wall-stone. From the left a single dark bolt streaks in level across the frame, and from the three faces three bright bolts are already streaking back along the same line. Cold blue-grey before sunrise; the mirror faces blaze pale gold as if they already held the day, and the returning bolts are the brightest marks in the picture.
Colour: first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8).
Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-10 · 속사 하피
벨루미르의 별 · 유닛 · 레벨 3 · 강화 · 틀 `front` F C `duskrose` · 원래 카드 `A3-10` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A3-10.jpg`

```
Landscape 5:4 painting. Head-on and symmetrical, at the centre of the frame: a harpy, a bird-woman with wings for arms, hangs in the air facing us, both storm-grey and teal wings flung forward at once, wild hair streaming up, hooked black talons spread. From each wing a fan of feather-darts has just left, points toward us, a dozen in the air at every distance. Along both wings, in every gap they left, bright new quills are already pushing out in tight rows, still sheathed, a full second plumage halfway grown. Rose and peach sunset behind her rims every dart and new quill with warm light; her face and breast sit in deep teal shade.
Colour: dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-11 · 질풍 그리핀
벨루미르의 별 · 유닛 · 레벨 3 · 강화 · 틀 `high` L X `thinair` · 원래 카드 `A3-11` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A3-11.jpg`

```
Landscape 5:4 painting. A bird's-eye view of a long ridge meadow planted with a line of signal wind-socks that runs the width of the frame. A young griffin streaks low along the line toward the left, teal-grey wings swept back, golden beak forward, tawny hindquarters stretched, its shadow racing beside it. Every wind-sock behind it stands straight out and the grass there lies flat; every wind-sock ahead of it still hangs limp in calm air. A herdsman far ahead has only just started to turn his head. Bright thin daylight from the right, white cloud lapping the ridge; cool shadows, with the flattened grass shining paler than the still grass.
Colour: thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-18 · 쌍둥이자리 궁수장
벨루미르의 별 · 유닛 · 레벨 4 · 강화 · 틀 `far` L R `moonsilver` · 원래 카드 `A3-18` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A3-18.jpg`

```
Landscape 5:4 painting. A frozen mountain pass under a full moon, seen from a great distance: on a ridge in the right of the frame stand two tall archers drawn by stars, densely set with bright points, thin silver lines joining them, night sky inside their outlines, both bows just released in a single motion. One line of light leaves them and runs leftward across the whole valley. In the last stretch, near the left edge, it forks cleanly in two and lands in two snow-capped cairns standing side by side. Blue-silver moonlight on snow with sharp black shadows; the forked line of light is the only brighter thing, edged with teal.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-23 · 별여우 순찰대장
벨루미르의 별 · 유닛 · 레벨 5 · 강화 · 틀 `ground` L L `aurora` · 원래 카드 `A3-23` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A3-23.jpg`

```
Landscape 5:4 painting. Ground level at a fork in a frosted path: one deep armoured bootprint fills the near foreground, crisp in the rime. In the left of the frame a large indigo fox, coat speckled with tiny stars, has lowered its muzzle to the print, nose almost touching, ears pricked forward, breath smoking, facing left down the branch the boot came from. Behind it a tail of starlight twice the length of its body lies along the ground, curls across both paths and runs off over the hill. Teal-green and violet aurora ribbons overhead colour the frost; the fox's tail is a line of silver-white light across the dark ground.
Colour: aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-A3-24 · 번개 텐구 대장
벨루미르의 별 · 유닛 · 레벨 5 · 강화 · 틀 `silhouette` L R `stormcloud` · 원래 카드 `A3-24` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-A3-24.jpg`

```
Landscape 5:4 painting. A black shape against a white flash: in the right of the frame a big tengu stands on a storm-wet parapet in pure silhouette, crow beak, broad wings half open, a lacquered bow slung at his back, his fan of storm feathers pointing left like a conductor's hand. Along the parapet in front of him stands a row of seven unlit lanterns. One needle-thin bolt of lightning has come down out of the cloud into the middle lantern alone, and its wick now burns with a small steady flame. Sheet lightning behind grey-violet cloud backlights him; silver rain slants through, and the one lit lantern is a warm dot.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B1-12 · 폭약 공병장
도르마크의 심장불 · 유닛 · 레벨 3 · 강화 · 틀 `through` R L `brassglow` · 원래 카드 `B1-12` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B1-12.jpg`

```
Landscape 5:4 painting. Framed by the round mouth of a burrow ringed with stones and roots: inside, at the left, one big rat rears upright on its hind legs facing right, silvery-red fur burning steadily, whiskers glowing, ember eyes sharp, a loop of measuring cord worn across its chest like a sash of rank. Behind it the tunnel runs away into the earth, and along one wall neat bundles of charges sit at even intervals, linked by a single cord. Its burning fur fills the burrow with amber light, bright on the root tips at the opening and fading to brown down the tunnel.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B1-17 · 거포 거북
도르마크의 심장불 · 유닛 · 레벨 4 · 강화 · 틀 `front` F C `magmadusk` · 원래 카드 `B1-17` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B1-17.jpg`

```
Landscape 5:4 painting. Head-on and perfectly centred: a huge old tortoise faces us squarely, blunt head low between pillar legs, its shell of cooled black lava split by glowing seams and reinforced with scorched brass bands. Where one crater used to be, three smoking vents now rise from its back in a row, and all three are firing at once — three columns of fire and stones leaning together into one plume overhead. The ground under its feet has sunk in a single shallow dish. Dusk gloom; the three eruptions light the shell from above and the seams glow from within, wine-red shadow everywhere else.
Colour: magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B1-18 · 불개미 철벽대
도르마크의 심장불 · 유닛 · 레벨 4 · 강화 · 틀 `swarm` F X `brassglow` · 원래 카드 `B1-18` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B1-18.jpg`

```
Landscape 5:4 painting. The whole frame is a wall of ants: dog-sized bodies with glossy red-black shells locked together shoulder to shoulder and stacked row on row like fitted masonry, heads tucked, mandibles meshed, facing us. Every joint glows hot. Where blows have landed, three patches of shell shine yellow-white, and in front of one a snapped spear and a bent arrow are still tumbling away. Warm amber glow rises from the joints across the whole wall; the struck patches are the brightest points.
Colour: furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B1-24 · 박격포 명사수
도르마크의 심장불 · 유닛 · 레벨 5 · 강화 · 틀 `back` B L `coldnight` · 원래 카드 `B1-24` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B1-24.jpg`

```
Landscape 5:4 painting. His back is to us: a goblin gunner in a scorched apron stands on an ammunition crate in the left of the frame, one arm stretched out with the thumb raised to sight along it, huge ears black against the sky. Beyond him the night is ruled with glowing shell trails — his own a single clean high arc, and beneath it a spray of lower, wobblier arcs from the mortar pits down the line, where small crews are cranking their tubes to match. Deep blue night; the arcs glow orange like long-exposure trails and rim his shoulders and ears with warm light.
Colour: cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light.
Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-12 · 단조 명장
소르그림의 방패 · 유닛 · 레벨 3 · 강화 · 틀 `far` R L `lamplit` · 원래 카드 `B2-12` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B2-12.jpg`

```
Landscape 5:4 painting. Far across a huge dark smithing hall, most of the frame empty stone: at the left, small in his one pool of light, the same dwarf — copper-red beard grown to his chest and still braided with its iron ring, burn-scarred leather apron — stands at an anvil facing right, bringing down a single great hammer with a head three times the size of an apprentice's. On the wall behind him hang three short ash hafts, each empty of its head. The stroke has landed: one ring of sparks spreads, and grit sifts from the whole vault. A single lamp over the anvil and the spark ring make one warm island at the left; the rest of the hall is black with faint steel-grey edges.
Colour: lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-17 · 무쇠뿔 산양왕
소르그림의 방패 · 유닛 · 레벨 4 · 강화 · 틀 `profile` L L `snowlight` · 원래 카드 `B2-17` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B2-17.jpg`

```
Landscape 5:4 painting. In strict side view on a knife-edge ridge during a blizzard: at the left a big shaggy grey goat, its curled horns of dark raw iron grown to a double turn and wider than its shoulders, stands facing left into snow that flies level across the frame. The storm breaks on the horns and chest and parts around him. Behind his back, to the right, a file of nine smaller goats waits nose to tail in a long clear wedge of still air where the snow stays out, the last a kid. White storm daylight, shadowless; the king's windward side is caked with snow, the herd in the calm wedge shows clean grey wool and dark iron horn.
Colour: mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-18 · 증기 황소 우두머리
소르그림의 방패 · 유닛 · 레벨 4 · 강화 · 틀 `through` L C `forgeheart` · 원래 카드 `B2-18` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B2-18.jpg`

```
Landscape 5:4 painting. Through the rattling bars of a lift-cage gate, blurred with vibration in the foreground: far down a long cart tunnel a great polished bronze bull — three round firebox doors now glowing in a row along its riveted boiler belly, the brass valve between its horns blowing — stands side-on, facing left, with one forehoof just driven into the floor. The shock is travelling toward us: rails jumping from their sleepers in sequence, each hanging lamp kicked outward in turn, curtains of dust dropping from every roof prop. Smaller bronze bulls crowd the tunnel behind it. Three orange fireboxes light the far tunnel like a row of small suns; nearer, the lamps swing through dust, and the cage bars are dark gunmetal.
Colour: forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-22 · 쇠 먹는 불가사리 왕
소르그림의 방패 · 유닛 · 레벨 5 · 강화 · 틀 `far` B L `mirror` · 원래 카드 `B2-22` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B2-22.jpg`

```
Landscape 5:4 painting. From far off across a scrapyard under a pale moon: in the middle distance a bare circle of swept, scratched ground marks where a whole hill of scrap stood yesterday, ringed by the heaps that remain. At the left, walking away from us, goes the beast that ate it — bull-headed, trunk-snouted, grown taller than the wrecked golems it passes, needle fur bristling silver, its hide plated with swallowed locks and gear wheels. Strung out behind it, a dozen smaller needle-furred young shuffle across the bare circle, noses down, picking up the last nuts and washers. Hard white moonlight turns every needle and scrap edge to bright silver on black; the bare circle shines like a dull mirror.
Colour: mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B2-24 · 철골 가고일 수문장
소르그림의 방패 · 유닛 · 레벨 5 · 강화 · 틀 `eye` L T `patina` · 원래 카드 `B2-24` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B2-24.jpg`

```
Landscape 5:4 painting. At eye level before the last door at the bottom of the deepest shaft, a low iron door crossed by three chains: in the upper part of the frame, crouched along its lintel, sits a large gargoyle of iron girders with a long hooked jaw, head turned to the left, its riveted sheet-steel wings half opened and curved down around the doorway like a canopy. A cold draught from under the door bends the flame of a lamp left on the floor and blows a thin frost through the gargoyle's hollow ribs. The floor dust before the door lies smooth. One small lamp on the floor, its flame leaning; rust red and green-blue corrosion on girders and chains, and a faint cold glow along the door's bottom edge.
Colour: rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light.
Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B3-12 · 방전 요정 여왕
케라운의 벼락 · 유닛 · 레벨 3 · 강화 · 틀 `through` F L `wetglass` · 원래 카드 `B3-12` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B3-12.jpg`

```
Landscape 5:4 painting. Glimpsed between the rungs of a paint-spattered ladder: the same hand-sized spark sprite, grown brighter and steadier, sits enthroned on the rim of a whitewash bucket in the left of the frame, facing us. Her spiky hair has drawn itself up into a crown of standing arcs, and between her cupped palms she holds a tight, patient ball of lightning. On the wall behind her head three old black scorch-stars make a ragged halo, and two lesser sprites circle like moths. Pale grey window light from the right; the held spark lays a small yellow glow on the wet paint and doubles in the bucket's water.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B3-18 · 노움 수석공학자
케라운의 벼락 · 유닛 · 레벨 4 · 강화 · 틀 `profile` R L `flash` · 원래 카드 `B3-18` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B3-18.jpg`

```
Landscape 5:4 painting. Along a long workbench at first light, in strict side view: at the left end the same big-nosed gnome engineer — brass goggles pushed up into wild hair, a smith's hammer hung from the belt — stands on a stool and throws a knife switch with both hands, facing right. Down the bench runs one finished machine built in three plainly different styles, toothed gears, copper windings and glass valves, now joined by a single wire and waking section by section. Three empty chairs stand pushed back. The first surge flares white-yellow in the windings and prints the gnome's profile in hard black against it.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B3-22 · 전격 수호거상
케라운의 벼락 · 유닛 · 레벨 5 · 강화 · 틀 `inside` F R `flash` · 원래 카드 `B3-22` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B3-22.jpg`

```
Landscape 5:4 painting. An iron helmet seen from inside: we look out through its narrow eye-slit, whose dark edges frame the view above and below. Out there in the right of the slit, astride a city gate, stands the same boxy guardian machine of riveted steel and porcelain insulators grown colossal, crowned now with three stacked rings of copper coil and turned to face us. A bolt has already left it — a white-yellow branch crossing the whole distance toward the slit, whose inner rim is beginning to glow. The oncoming bolt bleaches road and gate white-yellow and turns the helmet's interior into hard black.
Colour: the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-B3-23 · 병 속의 원로교수 두뇌
케라운의 벼락 · 유닛 · 레벨 5 · 강화 · 틀 `far` N C `greensky` · 원래 카드 `B3-23` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-B3-23.jpg`

```
Landscape 5:4 painting. Down the long slope of benches of an empty lecture hall at night, seen from the very back row: far away at the lectern, in the centre, stands the same brass-legged jar with its wire-wigged brain, now flanked by two more jars, all three bound together by loops of copper cable. Furious little arcs snap back and forth between the three lids as they go on arguing to the vacant seats. A mop and bucket wait in the aisle. Their fluid glows a sour yellow-green, the only light in the hall, flickering on the varnished bench-backs with every retort.
Colour: storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-PN-B3-C2 · 길들인 축전기
케라운의 벼락 · 유닛 · 레벨 5 · 강화 · 틀 `high` L C `wetglass` · 원래 카드 `PN-B3-C2` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-PN-B3-C2.jpg`

```
Landscape 5:4 painting. Seen from a rooftop, looking down into a cobbled lane: the same six-legged glass drum walks calmly to the left through the middle of the frame, its old cracks mended with bright seams of solder, a leather harness buckled over its copper hoops and a long rein leading out of the picture. From a little brass tap on its lid it lets go one small, exact spark at a time — and each street lamp it passes blinks alight behind it. Rainy dusk; the newly lit lamps and the drum's steady yellow glow lie doubled on the wet cobbles.
Colour: rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G1-11 · 흑요 창술사
고르바스의 발톱 · 유닛 · 레벨 3 · 강화 · 틀 `tilt` L R `redearth` · 원래 카드 `G1-11` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G1-11.jpg`

```
Landscape 5:4 painting. The frame tilts with his lunge: an orc spearman drives forward and down toward the left, back leg stretched, braid flying, both scarred hands sliding along a sinew-bound shaft. The spearhead leading the picture is a long, clean leaf of knapped black obsidian. On a cord around his neck three older points — chipped, snapped, worn short — swing out with the motion, and red dust sprays from his planted front foot. Storm light from the right skims the obsidian edge and the three old points; the sky behind is slate, the ground rust red.
Colour: red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G1-18 · 오우거 대주술사
고르바스의 발톱 · 유닛 · 레벨 4 · 강화 · 틀 `back` B L `stormslate` · 원래 카드 `G1-18` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G1-18.jpg`

```
Landscape 5:4 painting. From behind his broad, hide-draped back at the left of the frame: the enormous pot-bellied ogre sits cross-legged before a drum made of hide pegged over a pit in the ground, one huge ear still tilted downward, one palm just fallen on the skin. Ahead of him the plain itself replies — the earth has risen into slow concentric ridges like rings on a pond, grass riding their crests, pebbles hanging a hand's width in the air, the farthest ring reaching the hills. Slate storm sky over the plain; flat grey light with brown grit lifting off each ridge of earth.
Colour: steppe storm — slate grey and muted earth brown (#b88a5a), flying grit.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G1-24 · 하이에나 대무리장
고르바스의 발톱 · 유닛 · 레벨 5 · 강화 · 틀 `close` R X `strawgold` · 원래 카드 `G1-24` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G1-24.jpg`

```
Landscape 5:4 painting. Tight on the head and humped shoulders of a huge old hyena, filling the frame and turned toward the right: one ear torn to a stump, three sets of healed claw scars across the broad muzzle, bristling mane, heavy jaws just parting for a laugh. Behind it, soft with distance, the whole plain is holding still — a hundred hyenas sitting upright in the grass, a herd of antelope with every head raised, a flight of birds hanging as if pinned to the air. Windless late afternoon; low sun from the left rakes the scars and mane and leaves the still grass pale straw.
Colour: dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows.
Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G2-17 · 트롤 대주술사
베르단의 뿔 · 유닛 · 레벨 4 · 강화 · 틀 `far` R B `rainmist` · 원래 카드 `G2-17` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G2-17.jpg`

```
Landscape 5:4 painting. Far off and small at the bottom of a wide snowfield ringed by winter trees, the same lanky troll shaman stands awake among three snow-covered humps of sleeping kin, his rattle-hung staff levelled toward the right. From his feet a tide of living moss is pouring out across the snow in the direction he points — a broad green fan that has already climbed the nearest trunks and is rolling on toward the far trees, greening the white ground as it goes. Pale silver winter light through falling snow and mist; the moss is the one vivid green in a grey-white world, and his breath steams.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G2-22 · 맨드레이크 수문장
베르단의 뿔 · 유닛 · 레벨 5 · 강화 · 틀 `profile` L L `sunshaft` · 원래 카드 `G2-22` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G2-22.jpg`

```
Landscape 5:4 painting. In strict side view, like a carved frieze: the same mandrake, now standing its full height on forked root-legs with soil still clinging to them, plants itself on the left of the frame facing left, leafy crown flared, mouth stretched wide in a scream that ripples the air ahead of it. Behind it, filling the centre and right, a gateway of woven briar taller than a house is slamming shut at the sound — two walls of thorn swinging together, the gap between them already too narrow for a hand. Shafts of golden-green morning light fall between the closing thorn walls, cut thinner every instant, and edge the mandrake's crown.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G2-23 · 드리엔의 대사도
베르단의 뿔 · 유닛 · 레벨 5 · 강화 · 틀 `top` N X `mossdeep` · 원래 카드 `G2-23` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G2-23.jpg`

```
Landscape 5:4 painting. Seen from straight overhead, the same dryad singer — grown now into three slender pale-bark figures joined at one root — stands back to back on a round mossy knoll, three upturned faces singing as one, their mingled blossom-hair a single crown. From each mouth a ribbon of leaves, green with ember-edged black among them, curls outward; the three ribbons sweep around the trio in a great spiral and twist together into one rope of leaves that streams away to the right edge. Even green shade from the canopy above; the pale bark of the three faces and the spiral of leaves stand out against dark moss.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-11 · 조수 예언 문어
마렌시아의 노래 · 유닛 · 레벨 3 · 강화 · 틀 `silhouette` B L `lagoon` · 원래 카드 `G3-11` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G3-11.jpg`

```
Landscape 5:4 painting. A black cut-out against the white glare of sun on the lagoon: the tide-reading octopus, grown heavy and sure, sits on a sea-stack in the left of the frame with its back to us, one golden eye catching a spark. Seven arms are lifted and spread like the spokes of a wheel, each tip pinching a long bright thread of water drawn up from the sea, hauling the tide line in like a net. The eighth arm, off to one side, is busy with a half-eaten crab. Blinding afternoon sun low on the water straight ahead; rim light slides along each wet arm and turns the lifted threads to wire.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-12 · 산호등 대거북
마렌시아의 노래 · 유닛 · 레벨 3 · 강화 · 틀 `far` L R `glasscalm` · 원래 카드 `G3-12` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G3-12.jpg`

```
Landscape 5:4 painting. Far off on a flat grey sea lies what seems a small rock islet, set in the right of the frame: three tiers of pink and ochre coral crag, a few gulls roosting, a fishing skiff moored to a spur with its anchor line slack. Then the details arrive — a paddle flipper lying along the waterline, a blunt beaked head just lifting at the left end, and a slow bow-wave showing that the whole island is drifting patiently leftward. Still, fog-white morning; sea and sky share one pale tone, and the islet's reflection hangs beneath it almost unbroken.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-17 · 석호 대치유 듀공
마렌시아의 노래 · 유닛 · 레벨 4 · 강화 · 틀 `inside` B B `glasscalm` · 원래 카드 `G3-17` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G3-17.jpg`

```
Landscape 5:4 painting. Out through the dark stone arch of a water-gate: gliding away from us in the lower part of the opening is the broad grey back of a great dugong, wide as a ferry, with three bandaged figures laid side by side along it. It has just breathed out — a warm plume rolls from its whiskered snout, and the whole lagoon ahead has begun to steam, pale mist lifting off the water in sheets. Cold shade inside the arch; outside, soft white light fills the rising mist and outlines the three riders.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-18 · 물기둥 산호 조율사
마렌시아의 노래 · 유닛 · 레벨 4 · 강화 · 틀 `front` F C `stormsea` · 원래 카드 `G3-18` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G3-18.jpg`

```
Landscape 5:4 painting. Head-on and symmetrical: the coral spirit, now grown three great antlered branches, stands dead-centre on the reef facing us, pink and orange limbs spread level like the arms of a balance. Directly behind it three pillars of seawater stand shoulder to shoulder, trimmed to exactly the same height, their flat tops lined up like a parapet — a wall where there was open sea. Loose spray falls from the outer two as it corrects them. Grey squall light from above; the glowing polyps light the figure warmly from within against the cold green wall.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

### UP-G3-24 · 검은 갈기 켈피
마렌시아의 노래 · 유닛 · 레벨 5 · 강화 · 틀 `pov` B R `stormsea` · 원래 카드 `G3-24` — **원래 카드 그림을 먼저 그려 함께 넣을 것** · 프롬프트 n1 → `tools/art/inbox/UP-G3-24.jpg`

```
Landscape 5:4 painting. We are on its back. Our own hands are knotted deep in a mane of kelp gone black as the abyss, and ahead, right of centre, the water horse's neck and laid-back ears plunge away from us across open sea at full gallop. Wherever its hooves strike, the grey swell bends and follows, winding into broad spiral currents on both sides. Straight ahead the sea is opening into a wide dark funnel, and its stride only lengthens. Storm daylight, flat and grey-green; white spray flying back from its neck is the brightest thing in the frame.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Empowered: the same individual risen a rank — sturdier body and reinforced gear, steadier bearing, teal (#3fe0c0) energy rising from the ground beneath it.
Continuity: the same individual as in the attached reference picture, now promoted — same body, face, markings and colours, grown stronger.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```
