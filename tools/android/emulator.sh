#!/bin/bash
# ETHERION 안드로이드 에뮬레이터에서 돌리기 (맥) — 에뮬레이터 켜기 → APK 만들기 · 깔기 → 실행.
#
#   tools/android/emulator.sh            APK를 새로 만들어 깔고 켬 (서버 모드: tools/desktop/server.txt 의 https 서버)
#   tools/android/emulator.sh --offline  로컬 모드 APK로 (폰 안에만 저장)
#   tools/android/emulator.sh --no-build 지금 있는 android/apk/ 의 최신 APK를 그대로 깔기
#   tools/android/emulator.sh --server   에뮬레이터 크롬으로 이 맥의 게임 서버(http://10.0.2.2:8787)를 열기
#   tools/android/emulator.sh --stop     에뮬레이터 끄기
#   SHOW=0 tools/android/emulator.sh     창 없이(화면 없는 에뮬레이터) — 스크린샷: adb exec-out screencap -p > a.png
#
# 처음 한 번 준비(이미 해 둠, 2026-11): brew install openjdk@17 · brew install --cask android-commandlinetools,
#   sdkmanager --sdk_root=~/Library/Android/sdk platform-tools emulator "system-images;android-34;google_apis_playstore;arm64-v8a",
#   AVD "etherion"(Pixel 7 크기 · 가로) = ~/.android/avd/etherion.ini + etherion.avd/config.ini 를 손으로 씀
#   (Homebrew의 avdmanager는 SDK 위치를 못 찾음 — 다시 만들 때는 sdkmanager로 "cmdline-tools;latest"를 받아 그 avdmanager를 쓰면 됨)
# 에뮬레이터 안에서 맥은 10.0.2.2 다(맥의 127.0.0.1 = 에뮬레이터의 10.0.2.2). 앱(APK)은 http 주소에 붙지 못한다
# (안드로이드 9+ 기본으로 암호화 안 된 http 막음) — 앱은 https 공개 주소로, 맥 서버를 http로 보려면 --server(크롬).
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
export JAVA_HOME="${JAVA_HOME:-/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home}"
ADB="$ANDROID_HOME/platform-tools/adb"
EMU="$ANDROID_HOME/emulator/emulator"
AVD="${AVD:-etherion}"
PKG="com.etherion.game"
BUILD=1; MODE=app; OFF=""
for a in "$@"; do
  case "$a" in
    --no-build) BUILD=0 ;;
    --offline) OFF="--offline" ;;
    --server) MODE=server ;;
    --stop) "$ADB" emu kill 2>/dev/null || true; echo "에뮬레이터를 껐습니다"; exit 0 ;;
    *) echo "모르는 옵션: $a"; exit 1 ;;
  esac
done
[ -x "$EMU" ] || { echo "에뮬레이터가 없습니다 — 이 파일 맨 위 '처음 한 번 준비'를 보세요."; exit 1; }
"$EMU" -list-avds | grep -qx "$AVD" || { echo "AVD '$AVD' 가 없습니다 — 맨 위 '처음 한 번 준비'를 보세요."; exit 1; }

# 1) 에뮬레이터 켜기 (이미 켜져 있으면 그대로)
if ! "$ADB" devices | grep -q '^emulator-.*device$'; then
  echo "에뮬레이터를 켭니다 ($AVD)…"
  WIN=(); [ "${SHOW:-1}" = "0" ] && WIN=(-no-window)
  nohup "$EMU" -avd "$AVD" ${WIN[@]+"${WIN[@]}"} -no-snapshot-save -no-boot-anim -gpu auto >"${TMPDIR:-/tmp}/etherion-emulator.log" 2>&1 &
  "$ADB" wait-for-device
  until [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do sleep 2; done
  "$ADB" shell settings put system accelerometer_rotation 0 >/dev/null 2>&1 || true
fi
echo "에뮬레이터 준비됨"

if [ "$MODE" = "server" ]; then
  curl -s -m 3 http://127.0.0.1:8787/api/hello >/dev/null || echo "주의: 이 맥에서 게임 서버(127.0.0.1:8787)가 응답하지 않습니다."
  "$ADB" shell am start -a android.intent.action.VIEW -d "http://10.0.2.2:8787/" com.android.chrome >/dev/null
  echo "에뮬레이터 크롬에서 http://10.0.2.2:8787 을 열었습니다 (서버 모드). 처음 한 번은 크롬 환영 화면에서 Use without an account"
  exit 0
fi

# 2) APK 만들기 · 깔기
[ "$BUILD" = "1" ] && python3 "$ROOT/tools/android/build_apk.py" $OFF
if [ -n "$OFF" ]; then APK="$(ls -t "$ROOT"/android/apk/ETHERION-*-offline.apk | head -1)"
else APK="$(ls -t "$ROOT"/android/apk/ETHERION-*.apk | grep -v -- -offline | head -1)"; fi
echo "깔기: $(basename "$APK")"
"$ADB" install -r "$APK" >/dev/null || { echo "덮어쓰기가 안 됨(서명이 다름) → 지우고 다시 깝니다(에뮬레이터 안 저장은 사라짐)"; "$ADB" uninstall "$PKG" >/dev/null; "$ADB" install "$APK" >/dev/null; }

# 3) 실행
"$ADB" shell am start -n "$PKG/.MainActivity" >/dev/null
echo "켰습니다. 스크린샷: $ADB exec-out screencap -p > shot.png"
