# 에테르 제단 · 클래스 아이콘 · 단체 깃발 프롬프트 (v3.10.2)

GPT(이미지) · Gemini에 그대로 붙여 넣는다. 영어 프롬프트가 결과가 더 안정적이다.
- **GPT**: 설정에서 배경 투명(transparent)을 고르거나 프롬프트 끝의 "transparent background"를 그대로 둔다.
- **Gemini**: 투명을 못 만들면 "plain flat very dark background (#07080d)"로 바꿔 그리게 하고, 넣을 때 바탕을 지운다(Claude에게 넘기거나 `gen.py`의 `"alpha": "key"`).
- 공통으로 끝에 붙일 문장(이미 각 프롬프트에 들어 있음): *No text, no letters, no numbers, no signature, no watermark.*
- 클래스 아이콘 · 깃발 그림은 아직 게임 코드가 쓰지 않는다. 그림이 나오면 Claude에게 "이 그림으로 바꿔 줘" 하면 끼워 넣는다.

---

## 1. 에테르 제단 — `img/ui/ether/ether_back.png` (1:1, 720×720 이상, 투명)

게임이 가운데에 하늘빛 구슬과 숫자, 둘레에 결정 9칸 · 금 정수를 얹는다. 그림은 **가운데 지름 36% 원을 비우는 것** 하나만 지키면 된다.

### 1-A. 용 (거대한 에테르 용이 구슬을 감싼 모습)
```
Square game UI emblem, isolated on a transparent background, front view, centred.
A majestic ancient ether dragon coiled in a full circle around an EMPTY round centre, as if guarding a source of pure magic. Dark indigo-violet scales with fine texture, a thin glowing sky-blue (#8fdcff) rim light, small gold accents on horns and claws. The head rests near the top, looking slightly down; wings folded close to the body; the tail wraps around the bottom.
The centre is a perfect circle exactly 36% of the image width, in the exact middle: leave it empty, or fill it only with a soft pale sky-blue glow fading outward. Do not paint any orb, sphere or gem in the centre.
The whole emblem fills about 95% of the square and stays readable at 120 pixels.
Style: dark fantasy card game art, painterly digital painting, rich texture, dramatic rim lighting, night sky and gold rune theme.
No text, no letters, no numbers, no signature, no watermark, no UI frame. Do not paint rows of crystals or counters.
```

### 1-B. 제단 고리 (용 대신 고대 마법 제단)
```
Square game UI emblem, isolated on a transparent background, front view, centred.
An ancient circular ether altar ring seen from the front: carved dark stone and hammered gold, engraved glowing sky-blue (#8fdcff) runes, faint arcs of magical energy and drifting ether motes around it, small dragon-claw shaped prongs holding the ring. Mysterious, sacred, high fantasy.
The centre is a perfect circle exactly 36% of the image width, in the exact middle: leave it empty, or fill it only with a soft pale sky-blue glow fading outward. Do not paint any orb, sphere or gem in the centre.
The emblem fills about 95% of the square and stays readable at 120 pixels.
Style: dark fantasy card game art, painterly digital painting, rich texture, dramatic lighting, night sky and gold runes.
No text, no letters, no numbers, no signature, no watermark, no UI frame. Do not paint rows of crystals or counters.
```

### 1-C. (선택) 앞 층 — `img/ui/ether/ether_front.png`
뒤 층 그림을 참고 이미지로 함께 넣는다. 용의 발톱이 구슬을 움켜쥐는 식으로 구슬 앞에 겹칠 부분이 있을 때만.
```
Using the attached image as the exact reference (same size, position and style), paint ONLY the parts that pass in front of the empty central circle — for example the dragon's front claws gripping the lower edge of the circle. Everything else fully transparent.
No text, no letters, no numbers, no signature, no watermark.
```

---

## 2. 클래스 아이콘 4개 — `img/ui/class/<이름>.png` (1:1, 512×512, 투명)

카드 오른쪽 위 동그라미 안에 **아주 작게(약 20px)** 들어간다. 동그라미 테두리와 클래스 색은 게임이 그리므로, 그림은 **상징 하나만**, 굵은 실루엣으로.

공통 꼬리(각 프롬프트 끝에 이미 들어 있음):
`Single bold symbol, centred, filling 80% of the square, isolated on a transparent background. Thick simple silhouette that stays recognisable at 20 pixels; minimal inner detail. Polished ivory-and-gold metal with a soft inner glow in <색>. No circle frame, no badge border, no text, no letters, no watermark.`

### 무도 — 자기 몸의 힘 (골렘 · 수인 · 트렌트 · 정령 · 맹수) · 색 `#ff9d6a`
```
Game class icon "martial body": a clenched fist seen from the front, knuckles forward, with faint ember-orange energy cracks along the knuckles like inner strength bursting out.
Single bold symbol, centred, filling 80% of the square, isolated on a transparent background. Thick simple silhouette that stays recognisable at 20 pixels; minimal inner detail. Polished ivory-and-gold metal with a soft inner glow in warm orange (#ff9d6a). No circle frame, no badge border, no text, no letters, no watermark.
```

### 무장 — 무기와 도구의 힘 (병사 · 사수 · 기사) · 색 `#c3cfe2`
```
Game class icon "arms": two crossed longswords forming an X, blades up, with clear crossguards and pommels, a cold steel gleam on the edges.
Single bold symbol, centred, filling 80% of the square, isolated on a transparent background. Thick simple silhouette that stays recognisable at 20 pixels; minimal inner detail. Polished steel-and-gold metal with a soft inner glow in pale steel blue (#c3cfe2). No circle frame, no badge border, no text, no letters, no watermark.
```

### 마도 — 자기 마력의 힘 (마법사 · 술사 · 학자) · 색 `#ae92ff`
```
Game class icon "arcane": a sharp four-pointed magic star with a smaller four-pointed star at its lower right, radiating thin violet sparks, like a spell being cast.
Single bold symbol, centred, filling 80% of the square, isolated on a transparent background. Thick simple silhouette that stays recognisable at 20 pixels; minimal inner detail. Polished ivory-and-gold metal with a soft inner glow in violet (#ae92ff). No circle frame, no badge border, no text, no letters, no watermark.
```

### 기도 — 초월자에게 빌린 힘 (사제 · 무녀 · 사도 · 계약자) · 색 `#ffd66e`
```
Game class icon "prayer": two hands pressed together in prayer, pointing up, with a small radiant light shining just above the fingertips. Not a cross, not a chalice.
Single bold symbol, centred, filling 80% of the square, isolated on a transparent background. Thick simple silhouette that stays recognisable at 20 pixels; minimal inner detail. Polished ivory-and-gold metal with a soft inner glow in holy gold (#ffd66e). No circle frame, no badge border, no text, no letters, no watermark.
```

### (선택) 공용 — 모든 클래스 · 색 `#d8c48e`
```
Game class icon "universal": a simple gold ring with four tiny notches at north, east, south and west, like a compass seal.
Single bold symbol, centred, filling 80% of the square, isolated on a transparent background. Thick simple silhouette that stays recognisable at 20 pixels. Polished antique gold with a soft glow (#d8c48e). No text, no letters, no watermark.
```

---

## 3. 단체 깃발 9개 — `img/ui/flags/<ID>.png` (가로 5:2, 예 1500×600, 투명)

전장 왼쪽 위 · 아래의 군기. 모양은 지금과 같게: **왼쪽 금 장대, 오른쪽 끝 제비꼬리(V자 홈), 가로로 펄럭이는 천.** 천의 **왼쪽 1/4에 단체 문장**을 수놓고, **나머지 3/4은 무늬 없는 천**으로 비운다(게임이 아이디 · 단체 이름 · 공격/방어를 그 위에 쓴다).

공통 앞부분(각 프롬프트에 이미 들어 있음):
`Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.`

공통 꼬리:
`Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.`

### B1 잿불 고블린 (아다만트 · 화염) — 대포
```
Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.
Faction: Cinder Goblins, goblin artillery of a brass-and-steam alliance. Cloth: scorched deep red-orange (#f06a48) canvas with soot stains and singed edges, riveted brass trim. Emblem: a slanted cannon barrel on a small wheel with puffs of gunpowder smoke, glowing ember orange (#ff6b3d).
Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.
```

### B2 무쇠수염 드워프 (아다만트 · 금속) — 골렘
```
Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.
Faction: Ironbeard Dwarves, master smiths with steel automatons. Cloth: heavy steel-grey (#a3afbd) woven cloth reinforced with riveted iron plates along the edge, brass corner caps. Emblem: the head and broad shoulders of a square-headed iron golem, forge-light glowing in its eye slits, cool metal sheen (#a9b4c2).
Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.
```

### B3 번개 노움 (아다만트 · 번개) — 번개
```
Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.
Faction: Thunder Gnomes, scholar-inventors of a lightning-rod city. Cloth: deep navy cloth with amber-yellow (#e9bd3c) trim, small copper coil studs along the border. Emblem: a bold jagged lightning bolt inside a glass flask outline, crackling bright yellow (#ffd84a).
Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.
```

### G1 바위주먹 오크 (푸른숲 · 대지) — 송곳니
```
Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.
Faction: Rockfist Orcs, nomad warriors of the howling steppe. Cloth: rough earth-brown hide (#c99260) stitched with leather cord, a fringe of small bones and wolf fur at the swallowtail. Emblem: three great curved fangs side by side, painted in ochre and bone white (#b88a5a).
Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.
```

### G2 이끼 트롤 (푸른숲 · 숲) — 고목
```
Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.
Faction: Moss Trolls and treants of an ancient forest city. Cloth: deep green woven bark-cloth (#5fbf7a) with patches of living moss and tiny vines along the trim, a carved wooden pole tip. Emblem: a round ancient tree with a wide crown and deep roots, soft forest-green glow (#58b85f).
Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.
```

### G3 푸른비늘 인어 (푸른숲 · 물) — 샘
```
Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.
Faction: Bluescale Merfolk and water priestesses of a lagoon temple. Cloth: translucent sea-blue silk (#5cb3e0) shimmering like water, pearl-studded trim, faint fish-scale pattern only at the border. Emblem: a single water drop above three flowing wave lines, clear aqua glow (#4fb3ff).
Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.
```

### A1 심연 마족 (비술 · 암흑) — 눈
```
Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.
Faction: Abyssal Fiends, demon pact-makers of a shadow city in a sunless canyon. Cloth: near-black violet velvet (#ac82dc on deep shadow), tattered smoky edges, a blood-red wax seal at the swallowtail. Emblem: a single open eye with a vertical slit pupil, glowing violet (#8b5cf6).
Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.
```

### A2 성광 천족 (비술 · 빛) — 빛과 검
```
Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.
Faction: Radiant Seraphs and holy knights of a white-walled dawn citadel. Cloth: pure white silk with gold (#f0cf6a) embroidered trim, small feather motifs at the swallowtail. Emblem: a radiant sun disc with a sword pointing down beneath it, warm golden light (#ffe9a8).
Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.
```

### A3 폭풍 하이엘프 (비술 · 바람) — 소용돌이
```
Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.
Faction: Storm High Elves, mages of cloud-piercing spires. Cloth: light silvery teal silk (#6cc9c1) billowing strongly in the wind, silver thread trim, a few loose torn page fragments fluttering at the swallowtail. Emblem: two interlocking spiral whirlwinds, pale wind-teal glow (#9fe3d6).
Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.
```

> `Wide 5:2 horizontal war banner for a dark-fantasy card game, isolated on a transparent background, seen from the front. A short ornate gold pole on the left edge; the cloth hangs horizontally from it and ends on the right in a swallowtail (V-shaped notch), with a gentle wave. The heraldic emblem is embroidered on the LEFT quarter of the cloth, near the pole. The remaining three quarters of the cloth must be PLAIN and calm (only subtle fabric texture and a thin trim border), because the game writes names on it.` · `Style: dark fantasy, painterly digital painting, rich fabric texture, dramatic rim light. No text, no letters, no numbers, no signature, no watermark.`는 위 B1 프롬프트의 첫 문단 · 마지막 줄을 그대로 붙인다.
> 아홉 장이 한 벌로 보이게: 먼저 B1을 만들고, 마음에 들면 나머지는 **B1 그림을 참고 이미지로 함께 넣고** "same banner shape, pole and composition as the reference, only change cloth and emblem" 한 줄을 더한다.
