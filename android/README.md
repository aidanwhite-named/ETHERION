# ETHERION 안드로이드 앱

게임 폴더(`index.html` · `css` · `js` · `img` · `audio` · `fonts`)를 그대로 앱 안에 넣고, 화면 전체를 덮는
WebView 하나로 여는 앱이다. 게임 코드는 하나뿐이고, 앱은 그것을 담는 껍데기다.

## 폰에 깔기
1. `android/apk/ETHERION-v<버전>.apk` 를 폰으로 옮긴다(USB · 카카오톡 나에게 보내기 · 구글 드라이브 등).
2. 폰에서 그 파일을 누른다. "출처를 알 수 없는 앱" 허용을 물으면 그 앱(파일 관리자 · 카톡 등)에 허용.
3. Play 프로텍트가 "알 수 없는 개발자"라고 경고하면 **무시하고 설치**(직접 서명한 앱이라 나오는 경고).

안드로이드 7.0 이상. 가로 화면으로 고정되고, 상태 띠와 아래 단추 줄은 숨는다(가장자리를 쓸면 잠깐 보임).
뒤로 단추는 2초 안에 두 번 눌러야 닫힌다.

## 게임을 고친 뒤 APK 다시 만들기
`tools/android/앱 만들기.bat` 더블클릭 (또는 `python tools/android/build_apk.py`).
안드로이드 SDK · Android Studio 없이 파이썬만 있으면 된다(표준 라이브러리만 씀, 1~2초).
버전은 `docs/CHANGELOG.md` 맨 위 `## vA.B.C` 에서 읽는다. 새 APK를 깔면 **덮어쓰기 업데이트**되고 저장은 남는다.

## 서명 열쇠 — 꼭 백업
`android/signing/etherion-key.json`. 업데이트할 APK는 처음과 **같은 열쇠**로 서명해야 한다.
잃어버리면 앱을 지우고 다시 깔아야 하고, 그러면 앱 안의 저장(계정 · 컬렉션 · 설정)이 사라진다.
git에는 올리지 않는다(`.gitignore`). USB나 클라우드에 따로 복사해 둘 것.

## 앱 안의 저장
브라우저의 저장(localStorage `etherion.v3`)과 **따로**다. PC에서 쓰던 계정은 앱으로 넘어오지 않는다.

## 화면 맞춤 (`js/mobile.js` · `css/mobile.css`)
게임은 높이 720px 이상의 넓은 화면에 맞춰 그렸다. 폰 가로 화면(높이 360~430dp)에서는 화면을 다시 짜지 않고
레이아웃 폭을 넓혀 데스크톱 화면을 그대로 줄여 보인다(915×412 폰 → 1600×720으로 계산, 0.57배).
폰 브라우저(크롬)에서 열어도 같은 방식이 켜진다.

## 인터넷이 필요한 것
한글 글꼴(Google Fonts)과 온라인 대전(PeerJS)만. 인터넷이 없어도 컴퓨터 대전 · 원정은 된다(글꼴은 기기 바탕체).

## Android Studio로 만들 때 (선택)
이 `android/` 폴더를 Android Studio에서 연다 → Build → Build APK(s). 게임 파일은 빌드할 때
`app/build/generated/etherion-web` 로 복사된다(`app/build.gradle` 의 `syncEtherionWeb`).
이 길은 Play 스토어용 AAB를 만들 때 쓴다. 서명은 Android Studio의 열쇠를 따로 만들어야 하고,
그러면 `build_apk.py` 로 만든 APK와는 서로 덮어쓰기가 안 된다(서명이 달라서).

## 파일
| 경로 | 내용 |
|---|---|
| `app/src/main/java/com/etherion/game/MainActivity.java` | 앱 코드 전부(WebView 설정 · 전체 화면 · 뒤로 단추) |
| `app/src/main/AndroidManifest.xml` | 앱 이름 · 아이콘 · 가로 고정 · 인터넷 권한 |
| `app/src/main/res/mipmap-*` | 아이콘(카드 뒷면의 에테리온 고리 + 밤하늘). 8.0 이상은 모양 맞춤 아이콘 |
| `../tools/android/build_apk.py` | SDK 없이 APK 만들기. `build_dex()` 는 MainActivity.java 를 바이트코드로 직접 적은 것 — **둘을 함께 고친다** |
| `apk/` | 만든 APK (git 제외) |
| `signing/` | 서명 열쇠 (git 제외, 백업!) |
