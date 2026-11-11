@echo off
rem ETHERION: connect illustrations in tools\art\inbox to cards (tools/art/PROMPT_GUIDE.md section 8).
rem Puts them in img\cards\<ID>.png, updates tools\art\art_map.csv and opens tools\art\art_board.html.
chcp 65001 >nul
cd /d "%~dp0..\.."
set "PY=python"
where py >nul 2>nul && set "PY=py -3"
%PY% -c "import PIL" 2>nul || (
  echo Pillow is not installed. Installing...
  %PY% -m pip install pillow
)
where node >nul 2>nul && node tools\art\build_prompts.js
%PY% tools\art\artmap.py import %*
start "" "tools\art\art_board.html"
pause
