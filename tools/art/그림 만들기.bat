@echo off
rem ETHERION art tool launcher (tools/art/README.md). Runs gen.py from the game folder.
rem Examples to type at the prompt:  --list --group B1     --provider openai --ids B1-01     --provider gemini --only ui --review
chcp 65001 >nul
cd /d "%~dp0..\.."
set "PY=python"
where py >nul 2>nul && set "PY=py -3"
%PY% -c "import PIL" 2>nul || (
  echo Pillow is not installed. Installing...
  %PY% -m pip install pillow
)
if "%~1"=="" (
  echo.
  echo  ETHERION art tool. See tools\art\README.md
  echo  e.g.  --provider openai --group B1 --limit 3
  set /p ARGS=gen.py options:
) else (
  set "ARGS=%*"
)
%PY% tools\art\gen.py %ARGS%
pause
