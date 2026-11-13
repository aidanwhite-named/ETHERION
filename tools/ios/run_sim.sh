#!/bin/bash
# ETHERION iOS 시뮬레이터에서 돌리기 — Xcode 프로젝트 없이 ETHERION.swift 하나로 .app 을 만들어 시뮬레이터에 깔고 켠다.
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
VER="$(sed -nE 's/^## v([0-9.]+).*/\1/p' "$ROOT/docs/CHANGELOG.md" | head -1)"

echo "ETHERION v$VER iOS 앱(시뮬레이터용)을 만듭니다"
rm -rf "$APP"; mkdir -p "$APP"
xcrun --sdk iphonesimulator swiftc -O -parse-as-library -sdk "$SDK" -target "$ARCH-apple-ios15.0-simulator" \
  -o "$APP/ETHERION" "$HERE/ETHERION.swift"

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
ICON="$ROOT/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png"
[ -f "$ICON" ] && cp "$ICON" "$APP/AppIcon60x60@3x.png" || true

cat > "$APP/Info.plist" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
 <key>CFBundleIdentifier</key><string>com.etherion.game</string>
 <key>CFBundleName</key><string>ETHERION</string>
 <key>CFBundleDisplayName</key><string>ETHERION</string>
 <key>CFBundleExecutable</key><string>ETHERION</string>
 <key>CFBundlePackageType</key><string>APPL</string>
 <key>CFBundleShortVersionString</key><string>$VER</string>
 <key>CFBundleVersion</key><string>$VER</string>
 <key>MinimumOSVersion</key><string>15.0</string>
 <key>CFBundleSupportedPlatforms</key><array><string>iPhoneSimulator</string></array>
 <key>UIDeviceFamily</key><array><integer>1</integer><integer>2</integer></array>
 <key>CFBundleIcons</key><dict><key>CFBundlePrimaryIcon</key><dict><key>CFBundleIconFiles</key><array><string>AppIcon60x60</string></array></dict></dict>
 <key>UIRequiresFullScreen</key><true/>
 <key>UIStatusBarHidden</key><true/>
 <key>UILaunchScreen</key><dict><key>UIColorName</key><string></string></dict>
 <key>UISupportedInterfaceOrientations</key><array>
  <string>UIInterfaceOrientationLandscapeLeft</string>
  <string>UIInterfaceOrientationLandscapeRight</string></array>
 <key>NSAppTransportSecurity</key><dict><key>NSAllowsLocalNetworking</key><true/></dict>
</dict></plist>
PL
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
