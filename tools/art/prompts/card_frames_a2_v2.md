# A2 · 솔란테의 새벽 — 유닛 프레임 다시 그리기 (2026-11-20)

> **완료 (2026-11-20):** 사용자가 새로 그린 그림(`frames_wip/A2_unit_gen_v2.png`)을 확정해 게임 프레임으로 바꿨다. 이 문서는 기록용.

왜: 지금 프레임(`frames_wip/A2_unit_gen_v1.png`)은 왼쪽 넓은 테두리 한가운데에 금빛 깃털 · 별 · 해 방패 장식이 세로로 길게 있다.
게임은 바로 그 자리(카드 폭 2.4~7.6% · 높이 13.6~70%)에 레벨 아이콘을 최대 8개 세로로 놓기 때문에, 5번째 아이콘부터 장식 위에 겹친다.
다른 8깃발은 이 띠가 비어 있거나 장식이 가장자리로 비켜 있어 괜찮다.

쓰는 법: 제미나이 **새 대화**에 아래 두 안 중 하나를 붙인다.
- **안 1(추천)**: 지금 A2 그림을 첨부하고 고치게 한다 — 색 · 재질이 그대로 남는다.
- **안 2**: 안 1이 창 자리까지 바꿔 버리면, B1 레퍼런스(`frames_wip/b1_unit_gen_v3.jpg`)를 첨부하고 새로 그린다.

받은 그림은 `tools/art/frames_wip/A2_unit_gen_v2.png`로 저장하고 `fit_frame.py`의 F 목록에서 A2를 바꾼 뒤 `python3 fit_frame.py`를 다시 돌린다.
아래쪽 장식 자리가 달라졌으면 `css/frames.css`의 `.fr-A2` 값(`--fl` · `--fr` · `--fb` · `--nr`)도 다시 본다.

---

## 안 1 — 지금 A2 그림 고치기 (첨부: A2_unit_gen_v1.png)

```
Edit the attached card frame. Keep everything exactly as it is — the canvas ratio, the artwork window position, size and rounded corners, the border thicknesses, the twilight-navy marble, the burnished-gold window bezel, the colors and the lighting — and change only the left border.

The wide left border, between the outer card edge and the gold window bezel, must become a calm, plain vertical strip from the top-left corner piece down to the bottom of the artwork window (about 12% to 72% of the card height): smooth dark twilight-navy marble with at most one very thin straight gold inlay line running down its outer edge. This strip will hold small game icons, so it needs to be empty and evenly dark along its whole length.

Move the feathers of light, the small wings, the sunburst rays and the rising-sun shield out of that strip: put them on the right edge of the card and in the bottom-left corner, below the bottom of the artwork window, next to the text area. Keep the top-left corner calm and plain. Keep the window filled with flat dark gray. No text, numbers, symbols or icons.
```

## 안 2 — 새로 그리기 (첨부: b1_unit_gen_v3.jpg)

```
LAYOUT: Use the attached card frame as an exact layout template. Keep the same canvas ratio, the same artwork window position, size and rounded corners, the same border thicknesses (wide left margin, thin top and right borders). Fill the window with flat dark gray. Keep the top-left corner calm and plain, and the bottom third open, smooth and dark for text. Replace every material, color and ornament with the theme below — keep none of the reference's flames or copper. No text, numbers, symbols or icons.
LEFT STRIP: The wide left border, between the outer card edge and the window bezel, from the top-left corner down to the bottom of the artwork window (about 12% to 72% of the card height), is a calm, plain, evenly dark strip of smooth marble with at most one very thin straight gold inlay line along its outer edge. Small game icons will sit there, so keep every ornament out of it.
THEME (Solante's Dawn — light element, #ffe9a8): deep twilight-navy cathedral marble and dark antique ivory-slate (#1c1d2b to #0c0d16), inlaid dawn-gold gold-leaf filigree, small sunburst engravings in the top-right and bottom corners, a burnished-gold window bezel with soft pale-sunlight highlights. Edge relief on the right edge and in the bottom-left corner below the window: layered feathers of light, small wings, sunburst rays, a rising-sun shield motif.
CARD TYPE — UNIT: solid and martial, a sturdy weighty bezel; the plainest, boldest version.
```
