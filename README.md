# Watch Store E-Commerce Application

A full-stack e-commerce application for a watch store, built with Angular and .NET Core.

## Features

- User authentication and authorization
- Product catalog with filtering and search
- Shopping cart functionality
- Secure checkout process
- Order management
- Responsive design

## Prerequisites

### Backend (.NET Core)
- .NET 8.0 SDK
- SQLite
- Visual Studio 2022 or VS Code
- Node.js and npm (for running the frontend)

### Frontend (Angular)
- Node.js (v18 or later)
- npm (v9 or later)
- Angular CLI (v17 or later)

## Project Structure

```
watch-store/
├── backend/                 # .NET Core API
│   └── WatchStoreAPI/      # Main API project
└── frontend/               # Angular application
    └── src/               # Source code
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/WatchStoreAPI
   ```

2. Restore .NET packages:
   ```bash
   dotnet restore
   ```

3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```

4. Run the backend:
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5120`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`

## Environment Configuration

### Backend
Create a `appsettings.json` file in the backend directory with the following structure:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=watchstore.db"
  },
  "Jwt": {
    "Key": "your-secret-key-here",
    "Issuer": "your-issuer",
    "Audience": "your-audience"
  },
  "Stripe": {
    "SecretKey": "your-stripe-secret-key",
    "PublishableKey": "your-stripe-publishable-key"
  }
}
```

### Frontend
Update the `environment.ts` file in `src/environments/` with your API URL:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5120/api'
};
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/refresh-token` - Refresh JWT token

### Products
- GET `/api/products` - Get all products
- GET `/api/products/{id}` - Get product by ID
- GET `/api/products/categories` - Get all categories

### Cart
- GET `/api/cart` - Get user's cart
- POST `/api/cart/items` - Add item to cart
- PUT `/api/cart/items/{id}` - Update cart item
- DELETE `/api/cart/items/{id}` - Remove item from cart
- DELETE `/api/cart` - Clear cart

### Orders
- POST `/api/orders` - Create new order
- GET `/api/orders` - Get user's orders
- GET `/api/orders/{id}` - Get order by ID

## Development

### Running Tests
Backend:
```bash
dotnet test
```

Frontend:
```bash
ng test
```

### Building for Production
Backend:
```bash
dotnet publish -c Release
```

Frontend:
```bash
ng build --configuration production
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

