@echo off
setlocal enabledelayedexpansion
title ABC AI System Limited - Website Launcher
cd /d "%~dp0"

set "PHP=F:\xampp\php\php.exe"
if not exist "%PHP%" set "PHP=php"
set "MYSQL=F:\xampp\mysql\bin\mysql.exe"
set "MYSQLIO=-h 127.0.0.1 -P 3306 -u root"
set "HTDOCS=F:\xampp\htdocs"

for /f "delims=" %%i in ("%~dp0.") do set "CURDIR=%%~fi"
set "REL=!CURDIR:%HTDOCS%=!"
if "!REL!"=="!CURDIR!" set "REL="
set "APPURL=http://localhost!REL!"

echo.
echo  ============================================================
echo    ABC AI System Limited  -  Website and Admin Panel
echo    Site :  !APPURL!
echo    Admin:  !APPURL!/login
echo    Login:  admin@abcaisystemltd.com / admin123
echo  ============================================================
echo.

if not exist ".env" (
    echo  [setup] Creating .env from .env.example ...
    copy /y ".env.example" ".env" >nul
)

echo  [check] MySQL server ...
"%MYSQL%" %MYSQLIO% -e "SELECT 1" >nul 2>&1
if errorlevel 1 goto startdb
goto dbok

:startdb
echo  [start] MySQL not running - starting it, please wait ...
start "MySQL Server" /min "F:\xampp\mysql\bin\mysqld.exe" --port=3306
set /a n=0
:waitdb
set /a n+=1
if !n! gtr 30 goto dbfail
"%MYSQL%" %MYSQLIO% -e "SELECT 1" >nul 2>&1
if errorlevel 1 (
    timeout /t 1 /nobreak >nul 2>nul
    goto waitdb
)
:dbok
echo  [ok] MySQL is running.

echo  [check] Apache web server (port 80) ...
set "APACHERUN=0"
curl.exe -s -o nul http://localhost/ >nul 2>&1
if errorlevel 1 (
    echo  [start] Apache not running - starting it, please wait ...
    start "Apache" /min "F:\xampp\apache\bin\httpd.exe"
) else (
    set "APACHERUN=1"
)
if "!APACHERUN!"=="1" goto apacheok
set /a n=0
:waitapache
set /a n+=1
if !n! gtr 40 goto apachefail
curl.exe -s -o nul http://localhost/ >nul 2>&1
if errorlevel 1 (
    timeout /t 1 /nobreak >nul 2>nul
    goto waitapache
)
:apacheok
echo  [ok] Apache is running.

echo  [setup] Creating database (if it does not exist yet) ...
"%MYSQL%" %MYSQLIO% -e "CREATE DATABASE IF NOT EXISTS agm_web_site DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci" >nul 2>&1

echo  [info] First visit automatically installs tables and demo content.
echo  [open] Opening your browser ...
start "" "!APPURL!"
echo.
echo  Done. The site runs at: !APPURL!
echo  To sync with the latest source code pull, just refresh the page.
echo.
pause
exit /b 0

:dbfail
echo  [error] Could not start MySQL. Please start it from the XAMPP Control Panel.
pause
exit /b 1

:apachefail
echo  [error] Apache did not respond on port 80.
echo  Please start Apache from the XAMPP Control Panel and try again.
pause
exit /b 1