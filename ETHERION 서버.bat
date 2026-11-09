@echo off
chcp 65001 >nul
rem ETHERION server (v3.22): runs server\server.js with Node.js and opens http://localhost:8787
rem Close this window (or press Ctrl+C) to stop the server. Data: server\data\db.json
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 goto nonode
node server\server.js
echo.
echo 서버가 멈췄습니다. 위의 메시지를 확인하세요.
pause
goto :eof

:nonode
echo.
echo  Node.js가 설치되어 있지 않습니다.
echo  곧 열리는 nodejs.org 에서 LTS 버전을 받아 설치한 뒤, 이 파일을 다시 두 번 누르세요.
echo  (설치할 때 기본 선택 그대로 다음, 다음을 누르면 됩니다)
echo.
start "" "https://nodejs.org/ko/download"
pause
