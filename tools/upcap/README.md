# 유지비 상한 도구 (v3.12.7)

규칙: 유닛의 유지비는 **레벨 − 1까지**(레벨 아이콘 중 적어도 한 칸은 꽉 찬 소환 칸).

- `node tools/upcap/upcap.js` — 상한을 넘는 카드와 고칠 안을 찍는다. `--write`면 `js/data.js`에 쓴다(카드에 `preUp` = 바꾸기 전 값).
- 맞추는 법: 유지비를 레벨 − 1로 내리고, v1.3 가격표(공 1.2 · 방어 계단 · 체 1)로 목표 가격 = 새 (레벨, 유지비) 칸 평균 + 옛 칸 평균에서 벗어나 있던 몫. 1:1 승률은 보조. 같은 레벨 · 유지비에 똑같은 카드는 만들지 않는다.
- 새 카드를 만들거나 수치를 다시 뽑는 도구는 `tools/rescale/lib.js`의 `maxUp(lv)` · `checkUpkeep(units)`를 쓴다. 게임은 `js/cards.js`의 `maxUpkeep`에서 다시 검사한다(넘으면 콘솔 오류 + 상한으로 자름).
- `plan.json` · `table.md` 이번에 고친 19장, `rr_before.txt` · `rr_after.txt` 대전 확인.
