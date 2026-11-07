@echo off
rem ETHERION Android APK builder (android/README.md). Needs only Python 3 (no Android SDK).
chcp 65001 >nul
cd /d "%~dp0..\.."
set "PY=python"
where py >nul 2>nul && set "PY=py -3"
%PY% tools\android\build_apk.py
echo.
echo  APK: android\apk\   (copy it to your phone and tap it to install)
pause
