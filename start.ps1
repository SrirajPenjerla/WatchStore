# Start the backend server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend/WatchStoreAPI; dotnet run --urls='http://localhost:5120'"

# Start the frontend server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host "Starting both servers..."
Write-Host "Backend will be available at: http://localhost:5120"
Write-Host "Frontend will be available at: http://localhost:4200"
Write-Host "Press Ctrl+C to stop all servers" 