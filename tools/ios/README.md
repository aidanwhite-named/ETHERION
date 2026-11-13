# ETHERION iOS (아이폰 · 아이패드)

안드로이드 앱처럼 게임 폴더를 앱 안에 담고 화면 전체 **WKWebView** 하나로 여는 껍데기다(`ETHERION.swift` 한 파일).
게임 코드는 하나뿐이고 고칠 것이 없다.

## 맥의 iOS 시뮬레이터에서 돌리기
필요: Xcode(앱스토어, 무료) + iOS 시뮬레이터 런타임. 설치 뒤 처음 한 번:

    sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
    sudo xcodebuild -license accept        # 또는 Xcode를 한 번 켜서 동의
    xcodebuild -downloadPlatform iOS       # 시뮬레이터 런타임(약 8GB)이 없으면

그다음부터:

    tools/ios/run_sim.sh                   # 로컬 모드
    tools/ios/run_sim.sh --local-server    # 이 맥의 게임 서버(127.0.0.1:8787)에 붙기
    tools/ios/run_sim.sh --server https://etherion.tail2be349.ts.net

Xcode 프로젝트 없이 `swiftc`로 바로 만든다(몇 초). 결과는 `tools/ios/build/ETHERION.app`(git에 안 올림).
시뮬레이터에서는 맥과 같은 주소를 쓴다(127.0.0.1 = 맥, 안드로이드의 10.0.2.2 같은 것 없음).

## 실제 아이폰에 깔기
- **무료 Apple ID**로도 Xcode에서 내 아이폰에 직접 깔 수 있다. 다만 **7일마다 다시 깔아야** 하고, 기기는 3대까지.
  이때는 Xcode 프로젝트가 필요하다: Xcode → New Project → iOS App(UIKit) → 기본 파일을 `ETHERION.swift`로 바꾸고,
  게임 파일을 `game/` 폴더 참조(파란 폴더)로 넣는다. 서명 팀에 내 Apple ID.
- **Apple 개발자 프로그램(연 99달러, 약 13~15만 원)**: 1년짜리 설치, **TestFlight**(초대한 사람 최대 1만 명에게 시험판), 앱스토어 출시.
- 앱스토어 심사: 웹을 감싸기만 한 앱은 "최소 기능"(지침 4.2)으로 거절될 수 있다. 이 게임은 앱 안에 게임 전체가 들어 있어
  나은 편이지만, 카드 구매 등 돈이 오가면 Apple 결제(인앱 구매) 규칙을 따라야 한다.
  `allowFileAccessFromFileURLs`는 비공개 설정이라 심사용으로는 작은 로컬 웹 서버(WKURLSchemeHandler)로 바꾸는 편이 안전하다.
- Capacitor(웹 앱을 iOS · 안드로이드 앱으로 감싸는 도구)로 옮기면 Xcode 프로젝트를 저절로 만들어 주지만 Node 꾸러미가 생긴다.
  지금 규모라면 이 파일 하나로 충분하다.

## 앱 없이: 사파리 "홈 화면에 추가"
서버 주소(https://etherion.tail2be349.ts.net)를 아이폰 사파리로 열고 공유 → **홈 화면에 추가**.
- 장점: 돈 · 심사 · Xcode 없음. 서버를 고치면 바로 바뀜. 서버 모드라 계정이 PC · 폰에서 같다.
- 단점: 인터넷(서버)이 꼭 있어야 함. 사파리 저장공간은 오래 안 쓰면 iOS가 지울 수 있음(서버 모드라 계정은 서버에 남음).
  첫 화면 음악은 한 번 눌러야 나옴. 상태 띠 · 주소창을 다 숨기려면 index.html에 웹 앱 manifest · `apple-mobile-web-app-capable`이 필요.
