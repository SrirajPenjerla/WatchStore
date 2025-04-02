# Watch Store Frontend

This is the frontend application for the Watch Store e-commerce platform, built with Angular 17.

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- Angular CLI (v17 or later)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/watch-store.git
cd watch-store/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `src/environments/environment.example.ts` to `src/environments/environment.ts`
- Update the API URL and Stripe public key in the environment files

## Development

Run the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Building for Production

Build the application:
```bash
npm run build
```

The production build will be available in the `dist/watch-store` directory.

## Testing

Run unit tests:
```bash
npm test
```

## Features

- User authentication (login/register)
- Product browsing and search
- Shopping cart management
- Order processing
- Payment integration with Stripe
- Admin dashboard
- Responsive design

## Project Structure

```
src/
├── app/
│   ├── components/     # Reusable components
│   ├── services/       # Angular services
│   ├── guards/         # Route guards
│   ├── interceptors/   # HTTP interceptors
│   └── features/       # Feature modules
├── assets/            # Static assets
├── environments/      # Environment configurations
└── styles/           # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 