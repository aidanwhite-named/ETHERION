# ETHERION — AI 작업 안내

브라우저 카드 대전 게임 ETHERION의 폴더다. 설명은 `README.md`, 버전 기록은 `docs/CHANGELOG.md`.

## 그림 작업 전에 반드시 읽을 것
지도, 카드, 게임 화면(UI), 아이콘, 카드 일러스트를 만들거나 고치기 전에
**`docs/STYLE_GUIDE.md`** 를 읽고 그 규칙을 따른다.

- 색, 글꼴, 문양, 지도 기호, 일러스트 구도와 프롬프트 틀이 모두 거기 있다.
- 코드와 가이드가 다르면 코드를 따르고, 가이드를 고친다.
- 새 그림 규칙을 정하면 가이드에 적고 버전을 올린다.
- 카드 일러스트는 `img/cards/<카드ID>.png` 로 넣는다 (카드 ID는 `js/data.js`의 `id`).
- 이미지 생성 AI로 그릴 때는 `tools/art/`(사용법 `README.md`, 그림 AI용 지시서 `BRIEF.md`, 프롬프트 `prompts/`, 일괄 생성 `gen.py`). 스타일 가이드 6.7.

## 떠오르는 효과 글자 (v3.18.1)
- 카드 위에 떠오르는 글자에 한글 낱말이 들어가면(수호 · 보호막 · 빼앗김 · 가시 −2 …) `js/game.js`의 `floatAt`이 저절로 **효과 명판**(Hahmlet 금속 광택 글씨)으로 띄운다. 새 능력 · 마법은 엔진에서 `fl(X, uid, "낱말 숫자", cls)`만 쓰면 되고, 한글을 맨 글씨(Cinzel · 바탕체)로 띄우는 CSS를 따로 만들지 않는다. 빛깔은 cls(buff · shield · debuff · heal · miss · dmg)로 정해진다. 규칙은 `docs/STYLE_GUIDE.md` 2.9 "효과 명판".

## 그 밖에
- 결정화한 카드는 소각장(`p.burn`)에 들어간다(v3.19.2, 결정은 `p.crystals`에 따로 남음). 소각장에서 되살리는 마법은 `p.burn`에서 꺼내면 되고, 결정 수는 건드리지 않는다.
- 카드 뒷면의 ETHERION 글씨는 그림에 구워 넣은 것이다. 뒷면 그림을 바꾸면 `img/ui/deck/card_back_plain.png`에 넣고 `python tools/art/cardback_text.py`.
- 수정 전 상태는 `_backup_v<버전>/` 에 남겨 왔다. 큰 변경 전에는 같은 방식으로 백업한다.
- 세계관 이름은 모두 가칭이다. 이름과 설정은 README와 가이드에 적힌 것을 따른다.

## 카드 배치 · 핸드 (v3.19)
- 카드는 판타지 마스터즈식 배치다(왼쪽 위 종류 아이콘 · 왼쪽 세로 레벨 · 그림 아래 글 상자 · 오른쪽 아래 클래스와 공방체). HTML은 `js/view.js` `cardHTML` · `cardFullHTML`, 모양은 `css/fmcard.css`(맨 마지막에 읽음). 카드 모양을 고칠 때 `style.css` · `slim.css`의 옛 카드 규칙보다 이 파일을 먼저 본다.
- 전장의 내 핸드는 겹치지 않는 똑바른 한 줄(`css/hand-row.css`, 슬롯의 `--i` · `--n`). 부채꼴로 되돌리지 않는다.

## 카드 이름과 세계관
- 세 진영의 힘의 근원(거인·용·신)과 거인 일곱은 `docs/WORLD.md`에 있다. 카드 이름을 짓거나 고칠 때 따른다.
- **카드 이름·설명 고침은 `js/names.js`에 카드 ID로 적는다.** `js/data.js`는 균형 도구가 옛 백업에서 다시 써서 직접 고친 이름이 사라진다.
- 마법 카드의 핸드용 짧은 문구는 `js/briefs.js`(`SPELL_BRIEF`)에 카드 ID로 적는다. 마법 글(`text`)을 고치거나 새 마법을 만들면 짧은 문구도 함께 쓴다(적는 법은 파일 맨 위).
- 이름 짓기 원칙(새 고유명사는 천천히, 마법 이름 6글자 이하, 익숙한 마법은 그대로)은 `docs/WORLD.md` 7장.

## 온라인 대전 (v3.10)
- 두 기기가 같은 시드로 같은 판을 계산한다(`js/online.js`). **판의 결과를 바꾸는 난수는 `GRand()` · `shuffleG()`만 쓴다.** `Math.random`은 연출(흔들림 · 소리)에만.
- 사람이 둘 수 있는 새 행동을 만들면 `js/online.js`의 `ACT_FNS`에 넣어 상대에게도 보낸다. 핸드 순서도 판에 영향이 있다(맨 왼쪽 카드를 겨냥하는 마법).

## 카드 등급
- 등급(일반·고급·레어·에픽·유니크·스페셜)과 카드별 등급은 `js/grades.js`, 나눈 방법과 새 카드 기준은 `docs/GRADES.md`.

## 안드로이드 앱 (v3.15)
- 앱은 게임 폴더를 그대로 담는 WebView 껍데기다(`android/`, 설명 `android/README.md`). 게임 코드를 고치면 앱 쪽은 고칠 것 없고, `tools/android/build_apk.py`로 APK만 다시 만든다.
- 앱 코드 `android/app/src/main/java/com/etherion/game/MainActivity.java`와 `build_apk.py`의 `build_dex()`(같은 코드를 바이트코드로 직접 적은 것)는 **함께 고친다**. 매니페스트도 `AndroidManifest.xml` ↔ `manifest()`.
- 폰 화면 맞춤은 `js/mobile.js`(레이아웃 폭을 넓혀 줄여 보임). 폰 전용 배치를 새로 만들기보다 이 방식을 유지한다. 터치 손질은 `css/mobile.css`(`html.mobile`).
- `android/signing/` 의 서명 열쇠는 바꾸거나 지우지 않는다(바뀌면 폰에서 업데이트가 안 된다).
