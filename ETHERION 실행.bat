@echo off
rem ETHERION launcher: opens index.html in this folder with the default web browser.
rem v3.9.7: Chromium browsers (Chrome, Edge, Whale, Brave, Vivaldi) are started with
rem   --autoplay-policy=no-user-gesture-required  so the title music plays right away.
rem   If that browser is already open it ignores the option; then the game starts
rem   the music at the first click or key on the title screen.
setlocal EnableDelayedExpansion
set "PAGE=%~dp0index.html"
set "FLAG=--autoplay-policy=no-user-gesture-required"
set "PROG="
set "CMD="
set "EXE="

rem 1) Which program opens .html files?
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.html\UserChoice" /v ProgId 2^>nul ^| find "REG_"') do set "PROG=%%b"
if not defined PROG goto edge
for /f "tokens=2*" %%a in ('reg query "HKCR\%PROG%\shell\open\command" /ve 2^>nul ^| find "REG_"') do set "CMD=%%b"
if not defined CMD goto plain
for %%x in (!CMD!) do if not defined EXE set "EXE=%%~x"
if not defined EXE goto plain
if not exist "!EXE!" goto plain
for %%f in ("!EXE!") do set "EXEN=%%~nxf"
set "OK="
for %%n in (chrome.exe msedge.exe whale.exe brave.exe vivaldi.exe) do if /i "!EXEN!"=="%%n" set "OK=1"
if not defined OK goto plain
start "" "!EXE!" %FLAG% "%PAGE%"
goto :eof

:edge
rem No choice saved: Windows opens .html with Edge.
set "EXE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "!EXE!" set "EXE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not exist "!EXE!" goto plain
start "" "!EXE!" %FLAG% "%PAGE%"
goto :eof

:plain
start "" "%PAGE%"
