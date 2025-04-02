#!/bin/bash

echo "Setting up Watch Store E-Commerce Application..."

# Check if .NET SDK is installed
if ! command -v dotnet &> /dev/null; then
    echo "Error: .NET SDK is not installed. Please install .NET 8.0 SDK from https://dotnet.microsoft.com/download"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if Angular CLI is installed
if ! command -v ng &> /dev/null; then
    echo "Installing Angular CLI..."
    npm install -g @angular/cli
fi

echo "Setting up backend..."
cd backend/WatchStoreAPI
dotnet restore
dotnet ef database update
cd ../..

echo "Setting up frontend..."
cd frontend
npm install
cd ..

echo "Setup complete!"
echo
echo "To run the application:"
echo "1. Start the backend: cd backend/WatchStoreAPI && dotnet run"
echo "2. Start the frontend: cd frontend && ng serve"
echo
echo "The application will be available at:"
echo "Backend: http://localhost:5120"
echo "Frontend: http://localhost:4200"
echo 