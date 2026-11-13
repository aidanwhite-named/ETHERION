# 그림 AI 작업 도구 (v3.9.15 · 등급별 프롬프트 v3.31)

> **v3.31 등급별 프롬프트**: 카드 일러스트 프롬프트는 등급마다 연출이 다르고 깃발마다 고유 요소가 고정된다. 규칙서는 **`PROMPT_GUIDE.md`**(다른 AI에게 그대로 넘겨도 된다), 문구 원본은 `art_style.json`, 카드별 지시는 `art_notes.json`.
> 등급별로 모은 완성 프롬프트는 `prompts/grades/<등급>.md`(special · unique · epic · upgrade · rare · uncommon · common · token).
> 받은 그림은 `inbox/`에 넣고 `python tools/art/artmap.py import`(또는 `그림 연결.bat`) — 카드에 연결되고 장부 `art_map.csv` · 보드 `art_board.html`이 새로 만들어진다(5장).

카드 일러스트 788장(v3.31, 뺀 카드 제외 · 소환물 포함)과 전장 그림 10장(배경 · 카드 뒷면 · 소각장 · 에테르 · 생명)을
이미지 생성 AI(OpenAI · Gemini)로 그려 게임에 넣는 도구. 그림 규칙은 `docs/STYLE_GUIDE.md` 6장(특히 6.7).

| 파일 | 무엇 |
|---|---|
| `PROMPT_GUIDE.md` | **등급별 프롬프트 규칙서** — 세 축(등급 · 레벨 · 깃발), 등급 사다리, 깃발 고유성, 새 카드 프롬프트 쓰는 법, 연결 방법. 표는 build_prompts.js가 채운다 |
| `art_style.json` · `art_notes.json` | 그림 말의 원본(등급 · 레벨 · 깃발 · 진영 · 종류) · 카드별 그림 지시. 고치면 build_prompts.js를 다시 |
| `prompts/grades/<등급>.md` | 등급별 완성 프롬프트(그 등급의 연출 틀 + 카드마다) |
| `inbox/` · `artmap.py` · `그림 연결.bat` | 받은 그림을 카드에 연결 → `img/cards/<ID>.jpg`(600×750) · 목록 `art_index.js` |
| `art_map.csv` · `art_board.html` | 카드 ↔ 일러스트 장부(엑셀) · 보드(브라우저로 열기). artmap.py가 만든다 |
| `BRIEF.md` | **그림 AI에게 주는 지시서**(영어). 세계관 · 그림체 · 만들 그림 목록 · 저장 규칙. AI에게 "이 문서를 읽고 그려" 하고 넘기면 된다 |
| `prompts/cards/<단체>.md` | 카드마다 프롬프트(사람용). 채팅창(ChatGPT · Gemini)에 하나씩 붙여 넣을 때 |
| `prompts/ui.md` | 전장 그림 프롬프트(사람용). 참고 그림을 꼭 같이 넣는다 |
| `prompts/cards.jsonl` · `ui.jsonl` | 같은 내용을 프로그램용으로 (gen.py가 읽음) |
| `ui_assets.json` | 전장 그림 작업의 원본(크기 · 층 · 참고 그림 · 투명 처리 · 프롬프트) |
| `ref/` | 참고 그림 — v3.9.14 전장 그림을 얼려 둔 것. 새 그림이 같은 자리 · 모양을 따르게 한다. 지우지 않는다 |
| `build_prompts.js` | 게임 데이터에서 프롬프트를 다시 만든다. 카드 이름 · 설명을 고친 뒤 실행 |
| `gen.py` | 그림 AI에 보내고, 받은 그림을 게임 크기 · 투명 모양으로 다듬어 제자리에 넣는다 |
| `그림 만들기.bat` | Windows에서 gen.py를 여는 단추 |
| `out/` | 받은 원본(`raw/`) · 기록(`log.jsonl`) · 검토본(`review/`) · 모아 보기(`sheet_*.jpg`). 지워도 된다 |

## 1. 채팅창에 직접 넣는 방법 (API 키 없이)
1. `prompts/cards/B1.md`처럼 단체 파일을 연다.
2. 카드 하나의 ``` 안 글을 ChatGPT나 Gemini에 붙여 넣는다.
3. 받은 그림을 `tools/art/inbox/`에 카드 ID 이름으로 저장하고(예 `B1-01.jpg`) `python3 tools/art/artmap.py import`. 가운데 4:5로 잘라 `img/cards/B1-01.jpg`(600×750)로 넣는다(v3.41 고정 크기).
4. 게임을 새로 고치면 보인다.

전장 그림은 `prompts/ui.md`의 프롬프트와 **참고 그림(`tools/art/ref/…`)을 함께** 넣는다. 층으로 나뉜 그림(소각장 셋 · 생명 셋)은
자리가 1픽셀만 어긋나도 숫자 · 결정 · 타는 카드와 어긋나므로, 받은 그림은 `out/review/`에 두고 아래 2의 `--repost` 대신
gen.py로 다듬는 편이 안전하다(또는 Claude에게 "이 그림을 성화대 뒤 층으로 맞춰 넣어 줘" 하고 넘긴다).
**에테르 제단(`ether_back` · `ether_front`)은 예외**(v3.10.2): 참고 그림이 없다. v3.19.6부터 세 존재(위 신 · 왼쪽 아래 거인 · 오른쪽 아래 용)가 둘러싸는 그림이고, 가운데 구멍은 완전히 비우고 구멍 둘레는 얇은 룬 결계선만, 원판 전체가 그림 틀 안에 들어오게 한다. 구멍 크기가 바뀌면 `js/game.js`의 `ETHER_ART.size`로 맞춘다(스타일 가이드 2.11).
결정 9칸 · 위대한 정수의 자리는 그림을 넣은 뒤 `js/game.js`의 `ETHER_SLOTS` 표에서 그림에 맞춰 옮긴다.

## 2. 자동으로 한꺼번에 (API 키 필요)
준비: Python 3.9 이상과 Pillow — `python -m pip install pillow`. 그리고 API 키 하나
(OpenAI: platform.openai.com의 API keys · Gemini: aistudio.google.com의 API key). **채팅 구독과 별개이고 장마다 사용료가 나온다.**
키는 환경 변수(`OPENAI_API_KEY` / `GEMINI_API_KEY`)에 두거나, 없으면 실행할 때 물어본다. 어디에도 저장하지 않는다.

게임 폴더 맨 위에서:
```
python tools/art/gen.py --list --group B1                        # 무엇을 만들지 보기만
python tools/art/gen.py --provider openai --ids B1-01,MB-01,IB1-1  # 세 장만 시험 (유닛 · 마법 · 아이템)
python tools/art/gen.py --provider gemini --group B1              # 한 단체 전부
python tools/art/gen.py --provider openai --only ui --set pyre     # 소각장 세 층 (뒤 → 불꽃 → 앞, 차례대로)
python tools/art/gen.py --provider openai --only ui                # 전장 그림 10장
python tools/art/gen.py --sheet --group B1                        # 만든 그림 모아 보기 → out/sheet_*.jpg
```
- **이미 그림이 있는 카드는 건너뛴다.** 다시 그리려면 `--force`(옛 그림은 `_backup_art/<시각>/`에 남는다).
- 전장 그림은 지금 그림을 바꾸므로 처음엔 `--review`로 `out/review/`에 받아 보고 마음에 들면 `--review` 없이 `--repost`로 넣는다.
- 중간에 끊겨도 다시 실행하면 남은 것부터 이어 한다. 실패한 장은 `out/log.jsonl`에 이유가 남는다.
- 그 밖의 선택: `--type unit|atk|def|any|hand|item` · `--grade special,unique` · `--limit N` · `--model 이름` · `--quality low|medium|high`(OpenAI) · `--workers 2`(동시 요청 수) · `--extra "덧붙일 말"` · `--yes`(묻지 않기).
- `--provider mock`: API 없이 가짜 그림으로 흐름만 시험(`--review`와 함께).

### gen.py가 하는 일
1. 프롬프트(+ 전장 그림이면 참고 그림)를 AI에 보낸다. 참고 그림은 요청 비율의 판 가운데에 맞춰 놓아 자리가 그대로 대응하게 한다.
2. 받은 그림을 `out/raw/<ID>.png`로 남기고, 게임 크기로 자른다(카드 600×750 JPG, 전장 그림은 각 크기).
3. 투명 처리: 전장 층 그림은 **지금 그림(ref)의 투명 모양을 그대로 씌운다**(코드가 얹는 결정 · 숫자 · 핏빛 높이와 어긋나지 않게). 불꽃 층은 검은 바탕을 투명으로. 에테르 제단은 어두운 바탕(#07080d)만 지운다(`"alpha": "key"`).
4. 제자리에 넣는다(있던 그림은 `_backup_art/`로).

## 3. 카드를 고치거나 새로 만들었을 때
`node tools/art/build_prompts.js` → 프롬프트가 새로 만들어진다. 새 카드만 그리려면 그냥 gen.py를 다시 돌린다(있는 그림은 건너뜀).
문구(그림체 · 단체 모습)는 `build_prompts.js` 위쪽 표와 `ui_assets.json`에 있다. 바꾸면 스타일 가이드 6.7도 고친다.

## 4. 이펙트(마법 연출)는?
그림 파일이 아니라 코드(`js/spellfx.js` · `css/spellfx.css`, DOM + Web Animations)로 그린다. 이 도구의 대상이 아니다.

## 5. 받은 그림을 카드에 연결하기 (v3.31)
1. 그림 파일 이름에 카드 ID(`EP-A1-3_v2.png`)나 카드 이름(`장막의 처형자.jpg`)을 넣어 `tools/art/inbox/`에 둔다. PNG · JPG · WebP, 비율은 상관없다.
2. `python tools/art/artmap.py import` (모델을 적으려면 `--model gpt-image-1`, 미리 보기만 `--dry`) — Windows는 `그림 연결.bat`.
   - 가운데를 4:5로 잘라 600×750 JPG로 `img/cards/<ID>.jpg`에 넣는다(v3.41)(있던 그림은 `_backup_art/<시각>/`). 원본은 `inbox/_done/`으로.
   - 이름으로 못 찾은 파일: `python tools/art/artmap.py assign "<파일>" <카드ID>`.
3. `art_map.csv`(엑셀로 열림)에 상태 · 출처 · 날짜 · 그린 프롬프트 버전이 적힌다. `status`를 `채택` · `다시`로, `note`에 메모를 직접 적어도 다음 실행 때 지워지지 않는다(엑셀을 닫고 실행).
4. `art_board.html`을 브라우저로 열면 등급 · 깃발 · 종류 · 상태로 걸러 보고, 카드마다 프롬프트를 복사할 수 있다.
- gen.py로 만든 그림은 바로 `img/cards/`에 들어가므로 `python tools/art/artmap.py`만 돌리면 장부에 반영된다.
- 새 카드를 만들었으면 먼저 `node tools/art/build_prompts.js`(스페셜 · 유니크는 `art_notes.json`에 지시부터).
