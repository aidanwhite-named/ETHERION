# ETHERION iOS 앱 (아이폰 · 아이패드)

안드로이드 앱(`android/`)과 같은 껍데기다. 게임 파일(`index.html` · `css` · `js` · `img` · `audio` · `fonts`)을
앱 안에 담고, 화면 전체를 덮는 **WKWebView** 하나로 연다. 게임 코드는 하나뿐이고 앱 쪽은 고칠 것이 거의 없다.

> 2026-11-27 처음 만듦. **이 맥에는 Xcode가 없어 한 번도 빌드해 보지 못했다.**
> Swift 코드는 맥 Catalyst용 UIKit으로 문법 · 형 검사(`swiftc -typecheck`)만 통과했다. 처음 열 때 고칠 것이 나올 수 있다.

## 파일
| 경로 | 내용 |
|---|---|
| `ETHERION.xcodeproj` | Xcode 프로젝트 (UIKit, iOS 15 이상, 아이폰 · 아이패드) |
| `ETHERION/AppDelegate.swift` | 시작점 · 창(Scene) · 소리 세션 · 화면 꺼짐 막기 |
| `ETHERION/GameViewController.swift` | WKWebView 설정: 가로 고정 · 상태 띠 숨김 · 소리 자동 재생 · 바깥 링크는 사파리로 · alert/confirm 창 |
| `ETHERION/GameSchemeHandler.swift` | 앱 안의 게임 파일을 `etherion://localhost/…` 주소로 내준다 |
| `ETHERION/Info.plist` | 앱 이름 · 가로 고정 · 전체 화면 |
| `ETHERION/Assets.xcassets` | 앱 아이콘(1024px 한 장, `desktop/icon.png`에서 만듦 — 원본이 512px라 조금 흐리다. 앱스토어 전에 큰 원본으로 바꾸면 좋다) |
| `scripts/copy_game.sh` | 빌드 단계 "Copy game files": 게임 파일 복사 · 서버 주소 · 버전 |

## 어떻게 도는가
- **게임 파일**: 빌드할 때마다 `scripts/copy_game.sh`가 저장소의 게임 파일을 앱 안 `game/` 폴더로 복사한다
  (목록은 안드로이드 · PC 앱과 같은 `tools/android/build_apk.py`의 `web_files`, iOS용으로 mp3도 넣음, 약 200MB).
  게임 코드를 고치면 Xcode에서 다시 실행만 하면 된다.
- **서버 주소**(안드로이드 `START_URL`과 같은 규칙): `tools/desktop/server.txt` 첫 줄(지금 `https://etherion.tail2be349.ts.net`)을
  앱 안 `server.txt`로 넣고, 앱은 `etherion://localhost/index.html?server=<주소>`로 연다 → `js/net.js`가 그 서버에 붙는다(서버 모드, PC · 폰과 같은 계정).
  - 이 앱만 다른 서버: `ios/server.txt`를 만들어 첫 줄에 주소. 또는 Xcode Build Settings에 `ETHERION_SERVER` 값을 더한다.
  - 로컬 모드(혼자 도는 게임, 저장은 기기 안에만): `ETHERION_SERVER = offline`.
  - 이 맥의 서버를 시뮬레이터에서: `ETHERION_SERVER = http://127.0.0.1:8787` (시뮬레이터의 127.0.0.1 = 이 맥. 실제 아이폰은 https 주소만).
- **왜 file:// 이 아니라 etherion://**: file://로 열면 fetch가 막혀 효과음 · 배경음 음향 처리(Web Audio)를 못 쓰고,
  파일끼리 읽으려면 비공개 설정(`allowFileAccessFromFileURLs`)이 필요해 앱스토어 심사에 걸릴 수 있다.
  자기 주소로 내주면 보통 웹 서버에서 연 것처럼 돈다(Capacitor의 `capacitor://localhost`와 같은 방식). 소리 파일은 Range(206) 요청도 받는다.
- **게임이 앱 안임을 아는 법**: 앱이 문서보다 먼저 `window.ETHERION_SHELL = "ios"`를 넣는다 → `js/mobile.js`가 안드로이드 앱처럼
  폰 배치(`html.mobile appui app`) · 화면 줄임을 켠다. 아이패드도 앱에서는 같은 배치다.
- **가로 고정 · 전체 화면**: `Info.plist`(가로 두 방향만, `UIRequiresFullScreen`) + 화면 코드(`supportedInterfaceOrientations = .landscape`).
  상태 띠와 홈 바는 숨기고, 화면 가장자리를 쓸면 한 번은 막는다(카드를 끌다 앱을 나가지 않게).
- **소리**: `mediaTypesRequiringUserActionForPlayback = []`라 타이틀 음악이 첫 터치 없이 나온다.
  소리 세션은 `.ambient` — 다른 앱 음악과 섞이고 **무음 스위치를 켜면 조용하다**. 늘 소리를 내려면 `AppDelegate.swift`에서 `.playback`으로.
- **저장**: 앱 안 localStorage(`etherion://localhost` 몫). 사파리 · 홈 화면 웹 앱의 저장과 따로다. 서버 모드면 계정은 서버에 있다.

## 1. Xcode 설치 (처음 한 번)
1. 맥 **App Store**에서 **Xcode** 설치(무료, 10GB 넘음). 이 맥에는 지금 Command Line Tools만 있다.
2. 설치 뒤 터미널에서:
   ```bash
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   ```
   ```bash
   sudo xcodebuild -license accept
   ```
3. Xcode를 한 번 켜서 추가 구성요소 설치에 동의한다. iOS 시뮬레이터가 없으면 Xcode → Settings → Components에서 iOS 받기(약 8GB).

## 2. 프로젝트 열기
```bash
open ios/ETHERION.xcodeproj
```
- 왼쪽 위 대상(scheme)이 `ETHERION`인지 본다.
- Xcode가 "Update to recommended settings"를 물으면 받아도 된다.

## 3. 서명 (Apple ID)
1. Xcode → Settings → **Accounts** → `+` → Apple ID로 로그인.
2. 왼쪽 프로젝트 `ETHERION` → TARGETS `ETHERION` → **Signing & Capabilities**:
   - `Automatically manage signing` 켜기
   - **Team**: 내 Apple ID(무료면 "Personal Team")
   - **Bundle Identifier**: 기본 `com.etherion.game`. "이미 쓰는 ID"라고 나오면 `com.<내 이름>.etherion`처럼 나만의 이름으로 바꾼다.

## 4. 실행
- **시뮬레이터**: 위쪽 기기 목록에서 `iPhone 16` · `iPad Pro` 등을 고르고 ▶(⌘R). 서명 없이도 된다.
- **내 아이폰 · 아이패드**:
  1. USB로 연결(또는 같은 Wi-Fi) → 기기에서 "이 컴퓨터를 신뢰" → 기기 목록에서 내 기기를 고르고 ▶.
  2. iOS 16 이상은 기기의 설정 → 개인정보 보호 및 보안 → **개발자 모드** 켜기(재시동).
  3. 처음 실행 때 "신뢰하지 않는 개발자"가 뜨면 기기의 설정 → 일반 → VPN 및 기기 관리 → 내 Apple ID → 신뢰.
  - **무료 Apple ID**: 설치가 **7일 뒤 만료**되어 다시 깔아야 하고, 기기는 3대까지.
- 들여다보기(Debug 빌드만): 맥 Safari → 설정 → 고급 → "웹 개발자용 기능 보기" → 개발자 메뉴 → 내 기기 → `ETHERION`.
- Xcode 없이 시뮬레이터에만 빨리 올리기: `tools/ios/run_sim.sh` (같은 Swift 파일을 swiftc로 바로 묶음. 그래도 Xcode는 설치돼 있어야 한다).

## 5. App Store · TestFlight 배포
1. **Apple 개발자 프로그램 가입 — 연 99달러(유료)**. https://developer.apple.com/programs/ — 가입해야 TestFlight · 앱스토어에 올릴 수 있고, 설치가 7일이 아니라 1년 간다.
2. Signing의 Team을 개발자 프로그램 팀으로 바꾼다.
3. [App Store Connect](https://appstoreconnect.apple.com)에서 새 앱 만들기(같은 Bundle ID, 이름 · 언어 · SKU).
4. Xcode에서 기기를 `Any iOS Device (arm64)`로 → Product → **Archive** → Organizer → **Distribute App** → App Store Connect → Upload.
5. App Store Connect에서 **TestFlight**(초대한 사람 최대 1만 명) 또는 심사 제출. 필요한 것: 스크린샷(6.9인치 아이폰 · 13인치 아이패드), 설명, **개인정보 처리방침 주소**(`privacy.html`), 연령 등급, 데이터 수집 항목.
6. 올릴 때마다 `CURRENT_PROJECT_VERSION`(빌드 번호)을 1씩 올린다. 앱 버전(`CFBundleShortVersionString`)은 빌드 때 `docs/CHANGELOG.md`에서 자동으로 들어간다.

심사에서 걸릴 수 있는 것:
- 지침 4.2 "최소 기능": 웹사이트를 감싸기만 한 앱은 거절될 수 있다. 이 앱은 게임 전체를 앱 안에 담아 나은 편이다.
- 카드 · 재화를 돈으로 팔면 Apple 인앱 결제 규칙(지침 3.1.1)을 따라야 한다.
- 계정을 만들 수 있으면 **앱 안에서 계정 삭제**도 할 수 있어야 한다(지침 5.1.1(v)).
- 아이패드: iPadOS 26부터 `UIRequiresFullScreen`이 사라지는 중이라 창 크기를 바꿀 수 있게 될 수 있다. 게임은 창 크기에 맞춰 줄어들지만, 그때 가로 고정이 안 먹힐 수 있다.

## 앱 없이: 사파리 "홈 화면에 추가" (돈 · Xcode 필요 없음)
서버 주소(https://etherion.tail2be349.ts.net)를 아이폰 · 아이패드 **사파리**로 열고 공유 단추 → **홈 화면에 추가**.
홈 화면 아이콘으로 열면 주소창 없이 화면 전체로 뜬다(`index.html`의 `apple-mobile-web-app-capable` · 아이콘 `img/app/`).
- 세로로 들면 "가로로 돌려 주세요" 안내가 뜬다(웹은 방향을 고정할 수 없다). 화면 회전 잠금을 풀고 가로로 든다.
- 첫 화면 음악은 한 번 눌러야 나온다(iOS 규칙).
- 사파리 저장공간은 오래 안 쓰면 iOS가 지울 수 있다(서버 모드라 계정은 서버에 남는다).
