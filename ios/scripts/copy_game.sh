#!/bin/sh
# Xcode 빌드 단계 "Copy game files" — 게임 파일을 앱 안 game/ 폴더로 복사하고, 서버 주소 · 버전을 넣는다.
# Xcode 가 부른다(직접 돌릴 일은 없음). 필요한 환경 변수: SRCROOT · TARGET_BUILD_DIR · UNLOCALIZED_RESOURCES_FOLDER_PATH · INFOPLIST_PATH
#
# 서버 주소(안드로이드 · PC 앱과 같은 규칙):
#   1) 빌드 설정 ETHERION_SERVER (Build Settings → + → Add User-Defined Setting. offline 이면 로컬 모드)
#   2) ios/server.txt 첫 줄 (있으면)
#   3) tools/desktop/server.txt 첫 줄 (지금 https://etherion.tail2be349.ts.net)
#   첫 줄이 비었거나 # 이면 로컬 모드(혼자 도는 게임, 저장은 기기 안에만).
set -eu
ROOT="$(cd "$SRCROOT/.." && pwd)"
RES="$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH"
DEST="$RES/game"
mkdir -p "$DEST"

# 1) 게임 파일 — 목록은 안드로이드 · PC 앱과 같다(tools/android/build_apk.py web_files).
#    iOS 사파리 엔진은 ogg 를 못 트는 판이 있어 mp3 도 함께 넣는다(게임이 canPlayType 으로 고른다).
#    바뀐 파일만 복사하고, 목록에서 빠진 파일은 지운다.
/usr/bin/env python3 - "$ROOT" "$DEST" <<'PY'
import os, shutil, sys
root, dst = sys.argv[1], sys.argv[2]
sys.path.insert(0, os.path.join(root, "tools", "android"))
import build_apk
build_apk.SKIP_EXT.discard(".mp3")
files = build_apk.web_files()
keep = set()
copied = 0
for rel, full in files:
    out = os.path.join(dst, rel)
    keep.add(os.path.normpath(out))
    try:
        st, so = os.stat(full), os.stat(out)
        if st.st_size == so.st_size and int(st.st_mtime) == int(so.st_mtime):
            continue
    except FileNotFoundError:
        pass
    os.makedirs(os.path.dirname(out), exist_ok=True)
    shutil.copy2(full, out)
    copied += 1
removed = 0
for dp, dns, fns in os.walk(dst):
    for fn in fns:
        p = os.path.normpath(os.path.join(dp, fn))
        if p not in keep:
            os.remove(p); removed += 1
print("ETHERION: 게임 파일 %d개 (새로 복사 %d, 지움 %d)" % (len(files), copied, removed))
PY

# 2) 서버 주소
SERVER=""
if [ -n "${ETHERION_SERVER:-}" ]; then
  SERVER="$ETHERION_SERVER"
else
  for f in "$SRCROOT/server.txt" "$ROOT/tools/desktop/server.txt"; do
    if [ -f "$f" ]; then
      SERVER="$(grep -v '^[[:space:]]*#' "$f" | sed 's/[[:space:]]//g' | grep -v '^$' | head -1 || true)"
      break
    fi
  done
fi
if [ -z "$SERVER" ] || [ "$SERVER" = "offline" ]; then
  rm -f "$RES/server.txt"
  echo "ETHERION: 로컬 모드(서버 없음)"
else
  echo "$SERVER" > "$RES/server.txt"
  echo "ETHERION: 서버 모드 — $SERVER"
fi

# 3) 앱 버전 = docs/CHANGELOG.md 맨 위 버전 (안드로이드 · PC 앱과 같음)
VER="$(/usr/bin/env python3 -c "import sys; sys.path.insert(0, sys.argv[1]); import build_apk; print(build_apk.game_version()[0])" "$ROOT/tools/android" 2>/dev/null || true)"
PLIST="$TARGET_BUILD_DIR/$INFOPLIST_PATH"
if [ -n "$VER" ] && [ -f "$PLIST" ]; then
  /usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $VER" "$PLIST" || true
  echo "ETHERION: 버전 $VER"
fi
