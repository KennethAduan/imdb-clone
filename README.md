# Movie Search App

A modern IMDB-style movie search application built with Next.js 15, featuring server components, API routes, and responsive design.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **State Management**: React Query for client-side data fetching
- **Styling**: TailwindCSS
- **Package Manager**: Bun
- **API**: OMDB API
- **Testing**: Jest, React Testing Library
- **Form Handling**: React Hook Form, Zod
- **UI Components**: Radix UI, Shadcn
- **Authentication**: JWT with bcrypt

## Features

- Search movies and TV series by title
- View detailed information about movies/series
- User authentication and account management
  - Profile customization
  - Password management
  - Email updates
- Watchlist functionality
  - Add movies/series to personal watchlist
  - Remove items from watchlist
  - View all saved items
- Responsive design for mobile and desktop
- Pagination for search results
- Loading states and transitions
- Server-side rendering and caching with Next.js
- Server Actions for database operations
- Comprehensive test coverage with Jest and React Testing Library

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── (auth)/           # Authentication routes
│   │   │   ├── sign-in/      # Sign in page
│   │   │   └── sign-up/      # Sign up page
│   │   ├── (client)/         # Client routes
│   │   │   ├── movies/       # Movies pages
│   │   │   ├── profile/      # User profile pages
│   │   │   ├── search/       # Search pages
│   │   │   ├── series/       # Series pages
│   │   │   └── watchlist/    # Watchlist pages
│   │   ├── api/              # API routes
│   │   │   └── v1/          # API version 1
│   │   │       ├── movie/   # Movie endpoints
│   │   │       ├── omdb/    # OMDB API integration
│   │   │       ├── search/  # Search endpoints
│   │   │       ├── series/  # Series endpoints
│   │   │       └── shared/  # Shared API utilities
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   ├── config/             # Configuration files
│   ├── constants/          # Constants and enums
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── providers/          # Context providers
│   ├── schema/             # Zod schemas
│   ├── server-actions/     # Server actions
│   ├── test/               # Test files
│   │   └── components/     # Component tests
│   │       ├── cards/      # Card component tests
│   │       └── layouts/    # Layout component tests
│   └── types/              # TypeScript definitions
├── prisma/                 # Database schema
├── public/                 # Static assets
├── .next/                  # Next.js build output
├── coverage/               # Test coverage reports
├── logs/                   # Application logs
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── .swrc                   # SWC configuration
├── bun.lockb              # Bun lock file
├── components.json        # Component configurations
└── package.json           # Project dependencies
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory:

```env
# Environment
NODE_ENV=development

# OMDB API
OMDB_API_KEY=your_api_key_here
OMDB_API_URL=https://www.omdbapi.com

# Database
DATABASE_URL="file:./dev.db"

# Authentication
JWT_SECRET=your_jwt_secret_here
ALGORITHM=HS256
SESSION_NAME=AUTH_SESSION
JWT_EXPIRES_IN=7d

# API URLs
API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

4. Set up the database:

```bash
bunx prisma generate
bunx prisma db push
```

5. Run the development server:

```bash
bun dev
```

## Production Build

To build and run the application in production:

```bash
# Generate production build
bun run build

# Start production server
bun start
```

## Testing

The project includes comprehensive unit and integration tests using Jest and React Testing Library.

Run tests with:

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Generate coverage report
bun test:coverage

# Run DOM-specific tests
bun test:dom

# Run Node-specific tests
bun test:node
```

## Implementation Details

- Utilized Next.js 15 App Router for routing and layouts
- Implemented API routes for OMDB API interaction
- Used React Query for client-side data fetching and caching
- Implemented server actions for database operations
- Built responsive UI with TailwindCSS
- Added pagination for search results
- Implemented loading states and transitions
- Comprehensive test coverage for components and utilities
- User authentication with JWT tokens
- Form validation using Zod schemas
- Profile management with account updates

## Limitations

- Some movie/series data fields are limited by what's available through the OMDB API
- The free tier of OMDB API has rate limiting
- SQLite database is used for simplicity (can be upgraded to PostgreSQL for production)

## Stretch Goals Implemented

- ✅ Pagination for search results
- ✅ Loading states and transitions
- ✅ Responsive design
- ✅ Data caching with Next.js built-in caching
- ✅ Database integration for saving favorites
- ✅ Comprehensive test coverage
- ✅ Type-safe forms with Zod validation
- ✅ User authentication and profiles
- ✅ Watchlist functionality

## Additional Resources

The following files will be provided via email:

- Complete Postman collection for API testing
- Environment variables template

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query](https://tanstack.com/query/latest)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [OMDB API Documentation](https://www.omdbapi.com/)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Deployment

This application can be deployed on [Vercel](https://vercel.com) with minimal configuration.

Production link : https://moviesflix-hazel.vercel.app/
