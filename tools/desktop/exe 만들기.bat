@echo off
rem ETHERION PC app (Electron) builder. Needs only Python 3 (no Node.js).
rem   first run downloads Electron (~110MB) once into desktop\cache\
rem   extra options:  --dev (F12 dev tools)  --zip  --mac  --mac-intel
chcp 65001 >nul
cd /d "%~dp0..\.."
set "PY=python"
where py >nul 2>nul && set "PY=py -3"
%PY% tools\desktop\build_exe.py %*
echo.
echo  EXE: desktop\out\ETHERION-v...-win\ETHERION.exe   (the whole folder is the game)
pause
