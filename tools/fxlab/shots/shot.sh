#!/bin/zsh
# 프레임 시트 한 장:  tools/fxlab/shots/shot.sh <이름> "<내 깃발>:<마법ID>,<유닛ID>…" "<상대 깃발>:<유닛ID>…" "<ms,ms,ms>" [low|lite|rich] [몇 번째 수] [자를 곳 x,y,w,h]
#   예) shot.sh tide "G3:NG3-1,G3-06,G3-07" "G1:G1-10,G1-05,G1-08,G1-10" "330,560,800" rich
#   성능만 잴 때: PERF=1 shot.sh …  → log.txt 에 "PERF … fps · 가장 긴 프레임 · 동시 조각 수"   /   예전 연출과 견줄 때: NOSCENE=1
# serve.py 가 떠 있어야 한다. 결과: tools/fxlab/shots/out/<이름>_<단계>.png (git 에 넣지 않는다)
H=${0:A:h}; mkdir -p $H/out
fx=${5:-lite}; nth=${6:-1}; crop=${7:-200,0,760,330}; sc=0.84
cw=$(echo $crop | cut -d, -f3); ch=$(echo $crop | cut -d, -f4)
n=$(echo "$4" | tr ',' '\n' | wc -l | tr -d ' '); rowsN=$(( (n + 2) / 3 ))
if [[ -n "$PERF" ]]; then W=1284; Ht=724; Q="ts=0&cols=1&sc=1&perf=1"; else W=$(python3 -c "print(int($cw*$sc*3+8))"); Ht=$(python3 -c "print(int(($ch*$sc+4)*$rowsN))"); Q="ts=$4&cols=3&sc=$sc&crop=$crop"; fi
D=$(mktemp -d)   # 새 프로필(예전 CSS 가 남지 않게)
/Applications/Firefox.app/Contents/MacOS/firefox --headless --profile $D --no-remote --window-size=$W,$Ht --screenshot $H/out/$1_$fx.png "http://127.0.0.1:8791/h/sheet.html?$Q&slow=${SLOW:-13}&fx=$fx&nth=$nth&me=$2&foe=$3&tag=$1&noscene=$NOSCENE" >/dev/null 2>&1
rm -rf $D
