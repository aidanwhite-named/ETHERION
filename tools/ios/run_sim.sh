#!/bin/bash
# ETHERION iOS 시뮬레이터에서 돌리기 — Xcode 프로젝트를 열지 않고 ios/ETHERION/*.swift 를 swiftc 로 바로 묶어 시뮬레이터에 깔고 켠다.
# (2026-11-27 앱 코드는 ios/ 의 Xcode 프로젝트와 같은 파일을 쓴다. 실제 아이폰 · 앱스토어는 ios/README.md)
#
#   tools/ios/run_sim.sh                 로컬 모드(혼자 도는 게임)
#   tools/ios/run_sim.sh --local-server  이 맥의 게임 서버(http://127.0.0.1:8787)에 붙기
#   tools/ios/run_sim.sh --server URL    다른 서버에 붙기 (예: https://etherion.tail2be349.ts.net)
#   tools/ios/run_sim.sh --device "iPhone 16"   시뮬레이터 기기 고르기 (기본: 켜져 있는 것, 없으면 첫 iPhone)
#
# 필요한 것: Xcode(앱스토어) + iOS 시뮬레이터 런타임. 처음 한 번 `sudo xcode-select -s /Applications/Xcode.app`.
# 만든 앱: tools/ios/build/ETHERION.app (git에 올리지 않음). 실제 아이폰 · 앱스토어는 tools/ios/README.md.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
SERVER=""; DEVICE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --local-server) SERVER="http://127.0.0.1:8787" ;;
    --server) SERVER="$2"; shift ;;
    --device) DEVICE="$2"; shift ;;
    *) echo "모르는 옵션: $1"; exit 1 ;;
  esac
  shift
done

if ! xcrun --sdk iphonesimulator --show-sdk-path >/dev/null 2>&1; then
  echo "iOS SDK가 없습니다. Xcode를 설치하고 'sudo xcode-select -s /Applications/Xcode.app/Contents/Developer' 를 한 번 하세요."; exit 1
fi
SDK="$(xcrun --sdk iphonesimulator --show-sdk-path)"
ARCH="$(uname -m)"; [ "$ARCH" = "arm64" ] || ARCH="x86_64"
APP="$HERE/build/ETHERION.app"
VER="$(python3 -c 'import sys; sys.path.insert(0, sys.argv[1]); import build_apk; print(build_apk.game_version()[0])' "$ROOT/tools/android")"

echo "ETHERION v$VER iOS 앱(시뮬레이터용)을 만듭니다"
rm -rf "$APP"; mkdir -p "$APP"
xcrun --sdk iphonesimulator swiftc -O -parse-as-library -sdk "$SDK" -target "$ARCH-apple-ios15.0-simulator" \
  -module-name ETHERION -D DEBUG -o "$APP/ETHERION" "$ROOT"/ios/ETHERION/*.swift

# 게임 파일 — 안드로이드 · PC 앱과 같은 목록(build_apk.py web_files). iOS 사파리는 ogg를 못 틀 수 있어 mp3도 넣는다.
python3 - "$ROOT" "$APP/game" <<'PY'
import os, shutil, sys
root, dst = sys.argv[1], sys.argv[2]
sys.path.insert(0, os.path.join(root, "tools", "android"))
import build_apk
build_apk.SKIP_EXT.discard(".mp3")
files = build_apk.web_files()
for rel, full in files:
    out = os.path.join(dst, rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    shutil.copy2(full, out)
print("  게임 파일 %d개" % len(files))
PY

[ -n "$SERVER" ] && echo "$SERVER" > "$APP/server.txt" && echo "  서버: $SERVER"
ICON="$ROOT/img/app/apple-touch-icon.png"   # 180px = 60pt@3x
[ -f "$ICON" ] && cp "$ICON" "$APP/AppIcon60x60@3x.png" || true

# Info.plist = ios/ETHERION/Info.plist 의 $(…) 를 채운 것 + 시뮬레이터 표시
sed -e 's/$(EXECUTABLE_NAME)/ETHERION/; s/$(PRODUCT_BUNDLE_IDENTIFIER)/com.etherion.game/; s/$(PRODUCT_NAME)/ETHERION/' \
    -e "s/\$(MARKETING_VERSION)/$VER/; s/\$(CURRENT_PROJECT_VERSION)/$VER/; s/\$(PRODUCT_MODULE_NAME)/ETHERION/" \
    "$ROOT/ios/ETHERION/Info.plist" > "$APP/Info.plist"
plutil -insert CFBundleSupportedPlatforms -json '["iPhoneSimulator"]' "$APP/Info.plist"
plutil -insert MinimumOSVersion -string 15.0 "$APP/Info.plist"
plutil -insert CFBundleIcons -json '{"CFBundlePrimaryIcon":{"CFBundleIconFiles":["AppIcon60x60"]}}' "$APP/Info.plist"
codesign -s - --force "$APP" >/dev/null 2>&1 || true

# 시뮬레이터 켜기 → 깔기 → 실행
if [ -z "$DEVICE" ]; then
  UDID="$(xcrun simctl list devices booted | grep -oE '[0-9A-F-]{36}' | head -1 || true)"
  [ -z "$UDID" ] && UDID="$(xcrun simctl list devices available | grep -E 'iPhone' | grep -oE '[0-9A-F-]{36}' | head -1 || true)"
else
  UDID="$DEVICE"
fi
[ -z "$UDID" ] && { echo "iOS 시뮬레이터 기기가 없습니다. Xcode → Settings → Components 에서 iOS 런타임을 받으세요."; exit 1; }
xcrun simctl boot "$UDID" 2>/dev/null || true
open -a Simulator
xcrun simctl bootstatus "$UDID" -b >/dev/null
xcrun simctl install "$UDID" "$APP"
xcrun simctl launch "$UDID" com.etherion.game
echo "켰습니다. 다시 깔지 않고 켜기만: xcrun simctl launch booted com.etherion.game"
