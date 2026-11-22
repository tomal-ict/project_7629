@echo off
setlocal enabledelayedexpansion
title ABC AI System Limited - Launcher (Laravel Backend + React Frontend)
cd /d "%~dp0"

set "XAMPP_ROOT=D:\xampp"
if not exist "%XAMPP_ROOT%" set "XAMPP_ROOT=C:\xampp"
if not exist "%XAMPP_ROOT%" set "XAMPP_ROOT=F:\xampp"

set "PHP=%XAMPP_ROOT%\php\php.exe"
if not exist "%PHP%" set "PHP=php"
set "MYSQL=%XAMPP_ROOT%\mysql\bin\mysql.exe"
set "MYSQLIO=-h 127.0.0.1 -P 3306 -u root"
set "HTDOCS=%XAMPP_ROOT%\htdocs"

for /f "delims=" %%i in ("%~dp0.") do set "CURDIR=%%~fi"
set "REL=!CURDIR:%HTDOCS%=!"
set "REL=!REL:\=/!"
if "!REL!"=="!CURDIR!" set "REL="
set "APPURL=http://localhost!REL!"

echo.
echo  ============================================================
echo    ABC AI System Limited  -  Laravel Backend + React Frontend
echo    Site :  !APPURL!
echo    Admin:  !APPURL!/#admin
echo    Login:  admin@abcaisystemltd.com / admin123
echo  ============================================================
echo.

if not exist "backend\.env" (
    echo  [setup] Creating backend\.env from backend\.env.example ...
    copy /y "backend\.env.example" "backend\.env" >nul
)

echo  [check] MySQL server ...
"%MYSQL%" %MYSQLIO% -e "SELECT 1" >nul 2>&1
if errorlevel 1 goto startdb
goto dbok

:startdb
echo  [start] MySQL not running - starting it, please wait ...
start "MySQL Server" /min "%XAMPP_ROOT%\mysql\bin\mysqld.exe" --port=3306
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
    start "Apache" /min "%XAMPP_ROOT%\apache\bin\httpd.exe"
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

echo  [setup] Creating database (if missing) ...
"%MYSQL%" %MYSQLIO% -e "CREATE DATABASE IF NOT EXISTS demo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci" >nul 2>&1

echo  [open] Opening site in your default browser ...
start "" "!APPURL!"
echo.
echo  Done. The site runs at: !APPURL!
echo  No npm commands or Node daemons needed.
echo.
pause
exit /b 0

:dbfail
echo  [error] Could not start MySQL. Please start it from XAMPP Control Panel.
pause
exit /b 1

:apachefail
echo  [error] Apache did not respond on port 80.
echo  Please start Apache from XAMPP Control Panel and try again.
pause
exit /b 1
