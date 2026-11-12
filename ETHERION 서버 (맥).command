#!/bin/bash
# ETHERION 서버를 이 맥에서 켠다 (맥미니 운영용, v3.37)
#  - 게임 서버: node server/server.js (127.0.0.1:8787, 설정 server/config.json)
#  - 바깥 주소: ETHERION 전용 Tailscale(userspace, 상태 server/tailscale/) + Funnel → https://etherion.<tailnet>.ts.net
#    EnglishStudy의 Tailscale(english-talk)과 따로 돈다. 처음 한 번은 출력되는 링크로 Tailscale 로그인을 승인한다.
#  두 번 눌러 실행하거나 터미널에서 ./"ETHERION 서버 (맥).command"  ·  끄기: ./"ETHERION 서버 (맥).command" stop
cd "$(dirname "$0")" || exit 1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
ROOT="$PWD"; LOG="$ROOT/server/logs"; TS_DIR="$ROOT/server/tailscale"; SOCK="$TS_DIR/tailscaled.sock"
TS="tailscale --socket=$SOCK"
mkdir -p "$LOG" "$TS_DIR"

if [ "$1" = "stop" ]; then
  pkill -f "$ROOT/server/server.js" && echo "게임 서버를 껐습니다."
  pkill -f "tailscaled.*$TS_DIR" && echo "ETHERION Tailscale을 껐습니다."
  exit 0
fi

command -v node >/dev/null || { echo "Node.js가 없습니다: brew install node"; exit 1; }
command -v tailscaled >/dev/null || { echo "Tailscale이 없습니다: brew install tailscale"; exit 1; }

# 1. 게임 서버
if curl -s -m 2 http://127.0.0.1:8787/api/hello | grep -q etherion; then echo "게임 서버: 이미 켜져 있음"
else
  nohup node "$ROOT/server/server.js" --no-open >> "$LOG/server.log" 2>&1 &
  sleep 2; curl -s -m 2 http://127.0.0.1:8787/api/hello | grep -q etherion && echo "게임 서버: 켬 (127.0.0.1:8787)" || { echo "게임 서버를 켜지 못했습니다. $LOG/server.log 를 보세요."; exit 1; }
fi

# 2. ETHERION 전용 Tailscale (userspace — 관리자 암호 필요 없음)
if ! $TS status >/dev/null 2>&1 && ! pgrep -f "tailscaled.*$TS_DIR" >/dev/null; then
  nohup tailscaled --tun=userspace-networking --state="$TS_DIR/tailscaled.state" --socket="$SOCK" \
    --statedir="$TS_DIR" --port=41642 >> "$LOG/tailscaled.log" 2>&1 &
  sleep 2
fi
if ! $TS status >/dev/null 2>&1; then
  echo "Tailscale 로그인이 필요합니다. 아래 링크를 열어 승인하세요:"
  $TS up --hostname=etherion
fi

# 3. Funnel: https://etherion.<tailnet>.ts.net → 127.0.0.1:8787
$TS funnel --bg --https=443 http://127.0.0.1:8787 >/dev/null 2>&1 || $TS funnel --bg 8787
echo; $TS funnel status
