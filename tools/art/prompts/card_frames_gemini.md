# 깃발 프레임 8장 — 제미나이용 (v3 레퍼런스)

기준 그림: `tools/art/frames_wip/b1_unit_gen_v3.jpg` (B1 유닛, 창 x 11~96 · y 9.5~63.5% — 목표와 1% 안).
B1은 v3로 끝났으니 나머지 8깃발 유닛판만 만든다. 마법 · 아이템판은 유닛 8장을 확인한 뒤에 따로 한다.
그림 뒤 손질(5:7 맞추기 · 창 정확히 맞추기)은 Claude가 스크립트로 한다.

---

## A. 제미나이에게 먼저 보낼 지시 (그대로 붙여 넣기)

```text
카드 프레임 8장을 만들어 줘. 규칙:

1. 깃발 하나에 그림 하나. 깃발마다 따로 생성해.
   - 새 대화(새 세션)를 열 수 있으면 깃발마다 새 대화에서 그려.
   - 새 대화를 열 수 없으면, 그리기 전에 먼저 "새 대화는 못 연다"고 말하고 멈춰. 그러면 내가 직접 깃발마다 새 대화를 열어서 프롬프트를 붙일게.
   - 새 대화는 못 열어도 이미지 생성을 매번 따로 호출할 수 있으면, 그 사실도 알려 줘. 이때 생성 호출마다 첨부 그림은 레퍼런스 1장(b1_unit_gen_v3.jpg)만 넣고, 앞에서 만든 그림은 넣지 마.
2. 이미지 토큰을 아끼고 싶어. 만든 그림을 다시 열어 보거나 서로 비교하지 마. 파일로 저장만 해.
3. 레퍼런스: tools/art/frames_wip/b1_unit_gen_v3.jpg — 창의 위치 · 크기 · 모서리, 테두리 두께(왼쪽은 넓게, 위 · 오른쪽은 얇게), 장식이 놓이는 자리, 비율을 이 그림과 똑같이 해.
   재질 · 색 · 장식 모양은 전부 그 깃발 것으로 바꿔. v3의 불꽃 장식 · 구리색은 남기지 마.
4. 프롬프트: tools/art/prompts/card_frames_gemini.md 의 "B. 깃발별 프롬프트"에서 그 깃발 블록 하나만 써.
5. 저장: tools/art/frames_wip/<ID>_unit_gen_v1.jpg (예: B2_unit_gen_v1.jpg). 순서: B2 B3 G1 G2 G3 A1 A2 A3.
6. 끝나면 저장한 파일 이름 목록만 짧게 알려 줘. 수치 평가는 하지 마(내가 따로 잰다).
```

---

## B. 깃발별 프롬프트 (깃발마다 하나씩, v3 그림과 함께)

매 블록 맨 앞 줄(LAYOUT)은 같다. 직접 붙여 넣을 때도 블록 하나를 통째로 복사하면 된다.

### B2 · 소르그림의 방패
```text
LAYOUT: Use the attached card frame as an exact layout template. Keep the same canvas ratio, the same artwork window position, size and rounded corners, the same border thicknesses (wide left margin, thin top and right borders), and the same places for the edge and corner ornaments. Fill the window with flat dark gray. Keep the top-left corner calm and plain, and the bottom third open, smooth and dark for text. Replace every material, color and ornament with the theme below — keep none of the reference's flames or copper. No text, numbers, symbols or icons.
THEME (Sorgrim's Shield — metal element, #a9b4c2): heavy brushed gunmetal steel and dark slate-iron armor plating (#222730 to #0c0e13), crisp chamfered fortress edges, small recessed steel bolts in the corners, a machined steel-and-aged-brass window bezel with cool silver-steel highlights. Edge relief: interlocking gears, stamped steel crests, piston joints, thin glowing forge seams between layered plates.
CARD TYPE — UNIT: solid and martial, a sturdy weighty bezel; the plainest, boldest version.
```

### B3 · 케라운의 벼락
```text
LAYOUT: Use the attached card frame as an exact layout template. Keep the same canvas ratio, the same artwork window position, size and rounded corners, the same border thicknesses (wide left margin, thin top and right borders), and the same places for the edge and corner ornaments. Fill the window with flat dark gray. Keep the top-left corner calm and plain, and the bottom third open, smooth and dark for text. Replace every material, color and ornament with the theme below — keep none of the reference's flames or copper. No text, numbers, symbols or icons.
THEME (Keraun's Thunder — lightning element, #ffd84a): dark midnight-blue enameled metal and polished antique brass (#1c1d2a to #0b0c14), fine clockwork-like brass filigree etchings, a refined brass-and-gold window bezel with a faint electric-gold sheen. Edge relief: wound copper coils, small lightning-rod spires, brass gauges, thin arcs of light leaping between electrodes.
CARD TYPE — UNIT: solid and martial, a sturdy weighty bezel; the plainest, boldest version.
```

### G1 · 고르바스의 발톱
```text
LAYOUT: Use the attached card frame as an exact layout template. Keep the same canvas ratio, the same artwork window position, size and rounded corners, the same border thicknesses (wide left margin, thin top and right borders), and the same places for the edge and corner ornaments. Fill the window with flat dark gray. Keep the top-left corner calm and plain, and the bottom third open, smooth and dark for text. Replace every material, color and ornament with the theme below — keep none of the reference's flames or copper. No text, numbers, symbols or icons.
THEME (Gorvath's Claw — earth element, #b88a5a): weathered dark basalt stone and heavy dark-brown oiled leather (#241b15 to #0e0c0a), rugged chiseled edge wear, aged bronze and carved bone-ivory corner pieces, a stout hammered-bronze window bezel tinted warm earth-ochre. Edge relief: carved bone and fang ornaments, deep claw gouges in the stone, knotted rope bindings, cracked earth.
CARD TYPE — UNIT: solid and martial, a sturdy weighty bezel; the plainest, boldest version.
```

### G2 · 베르단의 뿔
```text
LAYOUT: Use the attached card frame as an exact layout template. Keep the same canvas ratio, the same artwork window position, size and rounded corners, the same border thicknesses (wide left margin, thin top and right borders), and the same places for the edge and corner ornaments. Fill the window with flat dark gray. Keep the top-left corner calm and plain, and the bottom third open, smooth and dark for text. Replace every material, color and ornament with the theme below — keep none of the reference's flames or copper. No text, numbers, symbols or icons.
THEME (Verdan's Antler — forest element, #58b85f): deep dark ancient bark and shadowed forest stone (#132118 to #090f0c), soft dark-emerald moss along the outer corners, slender vine-like aged-bronze filigree tracing the window bezel with muted forest-green accents. Edge relief: twisting roots and antler-like branches, thorny briars, amber sap beads, softly glowing moss.
CARD TYPE — UNIT: solid and martial, a sturdy weighty bezel; the plainest, boldest version.
```

### G3 · 마렌시아의 노래
```text
LAYOUT: Use the attached card frame as an exact layout template. Keep the same canvas ratio, the same artwork window position, size and rounded corners, the same border thicknesses (wide left margin, thin top and right borders), and the same places for the edge and corner ornaments. Fill the window with flat dark gray. Keep the top-left corner calm and plain, and the bottom third open, smooth and dark for text. Replace every material, color and ornament with the theme below — keep none of the reference's flames or copper. No text, numbers, symbols or icons.
THEME (Marencia's Song — water element, #4fb3ff): deep abyssal teal-navy polished lagoon stone (#10222e to #080f17), flowing wave-curved tarnished silver filigree along the edges, small mother-of-pearl sheen at the corners, a sculpted silver-and-pale-gold window bezel with soft cerulean waterlight. Edge relief: coral branches, spiral shells, pearls, rippling water rings carved in layered stone.
CARD TYPE — UNIT: solid and martial, a sturdy weighty bezel; the plainest, boldest version.
```

### A1 · 모르카스의 그믐
```text
LAYOUT: Use the attached card frame as an exact layout template. Keep the same canvas ratio, the same artwork window position, size and rounded corners, the same border thicknesses (wide left margin, thin top and right borders), and the same places for the edge and corner ornaments. Fill the window with flat dark gray. Keep the top-left corner calm and plain, and the bottom third open, smooth and dark for text. Replace every material, color and ornament with the theme below — keep none of the reference's flames or copper. No text, numbers, symbols or icons.
THEME (Morkas's New Moon — dark element, #8b5cf6): dark volcanic obsidian and blackened wrought iron (#1d1329 to #0a0810), sharp gothic dark-silver filigree hairlines, a faint amethyst-violet sheen along the window bezel, plum-violet shadow depth at the edges. Edge relief: heavy chains, blood-wax seals on curled contract scrolls, crescent-moon sigils, drifting shadow smoke.
CARD TYPE — UNIT: solid and martial, a sturdy weighty bezel; the plainest, boldest version.
```

### A2 · 솔란테의 새벽
```text
LAYOUT: Use the attached card frame as an exact layout template. Keep the same canvas ratio, the same artwork window position, size and rounded corners, the same border thicknesses (wide left margin, thin top and right borders), and the same places for the edge and corner ornaments. Fill the window with flat dark gray. Keep the top-left corner calm and plain, and the bottom third open, smooth and dark for text. Replace every material, color and ornament with the theme below — keep none of the reference's flames or copper. No text, numbers, symbols or icons.
THEME (Solante's Dawn — light element, #ffe9a8): deep twilight-navy cathedral marble and dark antique ivory-slate (#1c1d2b to #0c0d16), inlaid dawn-gold gold-leaf filigree, small sunburst engravings in the corners, a burnished-gold window bezel with soft pale-sunlight highlights. Edge relief: layered feathers of light, small wings, sunburst rays, a rising-sun shield motif.
CARD TYPE — UNIT: solid and martial, a sturdy weighty bezel; the plainest, boldest version.
```

### A3 · 벨루미르의 별
```text
LAYOUT: Use the attached card frame as an exact layout template. Keep the same canvas ratio, the same artwork window position, size and rounded corners, the same border thicknesses (wide left margin, thin top and right borders), and the same places for the edge and corner ornaments. Fill the window with flat dark gray. Keep the top-left corner calm and plain, and the bottom third open, smooth and dark for text. Replace every material, color and ornament with the theme below — keep none of the reference's flames or copper. No text, numbers, symbols or icons.
THEME (Belumir's Star — wind element, #9fe3d6): sleek dark storm-slate and misty teal-charcoal stone (#142326 to #090e12), ultra-slender sweeping wind-curve white-silver filigree, delicate feather-like metal flourishes at the corners, a crisp platinum-silver window bezel with pale wind-mint highlights. Edge relief: sweeping wind streaks, fletched arrows riding the wind, long feathers, tiny constellation glyphs.
CARD TYPE — UNIT: solid and martial, a sturdy weighty bezel; the plainest, boldest version.
```
