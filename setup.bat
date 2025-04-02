@echo off
echo Setting up Watch Store E-Commerce Application...

REM Check if .NET SDK is installed
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: .NET SDK is not installed. Please install .NET 8.0 SDK from https://dotnet.microsoft.com/download
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Angular CLI is installed
ng version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Angular CLI...
    npm install -g @angular/cli
)

echo Setting up backend...
cd backend\WatchStoreAPI
dotnet restore
dotnet ef database update
cd ..\..

echo Setting up frontend...
cd frontend
call npm install
cd ..

echo Setup complete!
echo.
echo To run the application:
echo 1. Start the backend: cd backend\WatchStoreAPI ^& dotnet run
echo 2. Start the frontend: cd frontend ^& ng serve
echo.
echo The application will be available at:
echo Backend: http://localhost:5120
echo Frontend: http://localhost:4200
echo.
pause 