# ETHERION iOS — 시뮬레이터 빠른 실행

iOS 앱 본체(Xcode 프로젝트 · Swift 코드 · 설명)는 **`ios/`** 에 있다 → `ios/README.md`.
여기 `run_sim.sh`는 Xcode 프로젝트를 열지 않고 `ios/ETHERION/*.swift`를 swiftc로 바로 묶어 시뮬레이터에 깔고 켜는 지름길이다
(2026-11-27까지 쓰던 `ETHERION.swift` 한 파일짜리 감싸개는 `ios/`로 옮겨 지웠다).

필요: Xcode(앱스토어, 무료) + iOS 시뮬레이터 런타임. 설치 뒤 처음 한 번:

    sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
    sudo xcodebuild -license accept        # 또는 Xcode를 한 번 켜서 동의
    xcodebuild -downloadPlatform iOS       # 시뮬레이터 런타임(약 8GB)이 없으면

그다음부터:

    tools/ios/run_sim.sh                   # 로컬 모드
    tools/ios/run_sim.sh --local-server    # 이 맥의 게임 서버(127.0.0.1:8787)에 붙기
    tools/ios/run_sim.sh --server https://etherion.tail2be349.ts.net

결과는 `tools/ios/build/ETHERION.app`(git에 안 올림). 시뮬레이터에서는 맥과 같은 주소를 쓴다(127.0.0.1 = 맥).
