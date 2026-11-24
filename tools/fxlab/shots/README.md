# 마법 연출 프레임 찍기 (tools/fxlab/shots)

브라우저 창 없이(헤드리스 Firefox) **실제 게임 화면**에서 마법 한 장을 발동시켜, 정해 둔 순간들의 화면을 한 장에 나란히 찍는다. `js/spellscene.js` · `js/spellfx.js` 연출을 고친 뒤 눈으로 확인하는 용도.

```
python3 tools/fxlab/shots/serve.py &          # 작은 서버 (포트 8791)
tools/fxlab/shots/shot.sh tide "G3:NG3-1,G3-06,G3-07" "G1:G1-10,G1-05,G1-08,G1-10" "330,560,800" rich
PERF=1 tools/fxlab/shots/shot.sh tide "G3:RG3-1,G3-06,G3-07" "G2:G2-11,G2-13,G2-11,G2-13" 0 rich   # 성능: log.txt
```

- `sheet.html` — 순간마다 게임(`index.html`)을 iframe 으로 하나씩 띄우고, 판을 손으로 차린 뒤(`G` · `mkPlayer` · `mkInst` · `resetTurn`) `runCombat()`. N번째 마법 수(`nth`)가 시작된 때부터 t ms 뒤에 그 iframe 의 애니메이션 · 타이머를 멈춘다. 소리는 끈다.
- 내 쪽 첫 카드가 마법, 나머지는 유닛. 여러 효과가 있는 마법은 `nth` 로 몇 번째 효과(수)인지 고른다(예: 파쇄 망치의 피해는 2).
- 단계: `low`(폰 · 앱) · `lite`(중간, 기본) · `rich`(고사양). `NOSCENE=1` 이면 장면 없이 예전 연출.
- 자동 시험(화면 없이 모든 장면 × 3단계): `node tools/fxlab/test.js`
