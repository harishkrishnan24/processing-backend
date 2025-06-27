# Project Structure

## Overview

This is a **Processing Backend** application built with TypeScript, Express.js, and Prisma. It follows a modular architecture with clear separation of concerns and uses modern development practices.

## Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js v5
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Prisma ORM
- **API Gateway**: Kong
- **Testing**: Vitest
- **Linting**: ESLint
- **Validation**: Zod
- **Logging**: Winston + Morgan
- **Security**: Helmet, CORS
- **Development**: Nodemon, ts-node

## Directory Structure

```
processing-backend/
├── 📁 .github/                          # GitHub configuration
│   └── 📁 instructions/
│       └── project.instructions.md      # Project coding guidelines
│
├── 📁 coverage/                          # Test coverage reports
│   ├── index.html                       # Coverage dashboard
│   └── 📁 processing-backend/           # Detailed coverage files
│
├── 📁 kong/                             # API Gateway configuration
│   └── kong.yml                        # Kong declarative config
│
├── 📁 prisma/                           # Database schema and migrations
│   └── schema.prisma                    # Prisma schema definition
│
├── 📁 src/                              # Source code
│   ├── app.ts                          # Express app configuration
│   ├── index.ts                        # Application entry point
│   │
│   ├── 📁 config/                       # Configuration modules
│   │   ├── database.ts                 # Database connection setup
│   │   ├── env.ts                      # Environment variables
│   │   ├── index.ts                    # Config barrel exports
│   │   └── logger.ts                   # Winston logger configuration
│   │
│   ├── 📁 generated/                    # Auto-generated files
│   │   └── 📁 prisma/                  # Prisma client generation
│   │
│   ├── 📁 middleware/                   # Express middleware
│   │   ├── errorHandler.ts            # Global error handling
│   │   └── errorHandler.test.ts       # Error handler tests
│   │
│   ├── 📁 routes/                       # API route definitions
│   │   ├── index.ts                    # Route aggregator
│   │   └── 📁 v1/                      # API version 1
│   │       ├── index.ts                # v1 route aggregator
│   │       └── processing.ts           # Processing endpoints
│   │
│   ├── 📁 services/                     # Business logic layer
│   │   └── processingService.ts        # Processing business logic
│   │
│   └── 📁 types/                        # TypeScript type definitions
│       └── index.ts                    # Shared type definitions
│
├── 📁 tests/                            # Test configuration
│   ├── setup.ts                       # Test setup configuration
│   └── 📁 integration/                 # Integration tests
│
├── 📄 package.json                      # Node.js dependencies and scripts
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 tsconfig.test.json               # Test-specific TypeScript config
├── 📄 vitest.config.ts                 # Vitest test configuration
├── 📄 eslint.config.js                 # ESLint configuration
├── 📄 commitlint.config.js             # Conventional commits config
├── 📄 nodemon.json                     # Nodemon development config
├── 📄 docker-compose.yml               # Docker services (PostgreSQL, Kong)
└── 📄 README.md                        # Project documentation
```

## Architecture Patterns

### 1. Layered Architecture

- **Routes Layer**: HTTP request handling and routing
- **Services Layer**: Business logic and data processing
- **Data Layer**: Database operations via Prisma ORM
- **Middleware Layer**: Cross-cutting concerns (auth, validation, error handling)

### 2. Configuration Management

- Environment-based configuration (`src/config/env.ts`)
- Database connection management (`src/config/database.ts`)
- Centralized logging (`src/config/logger.ts`)

### 3. Error Handling

- Global error handling middleware
- Structured error responses
- Comprehensive logging

## Key Components

### Application Entry (`src/index.ts`)

- Application bootstrap
- Server initialization
- Graceful shutdown handling

### Express App (`src/app.ts`)

- Middleware setup (security, CORS, logging)
- Route registration
- Error handling integration

### Configuration (`src/config/`)

- **`env.ts`**: Environment variable validation with Zod
- **`database.ts`**: Prisma client initialization and connection
- **`logger.ts`**: Winston logger with multiple transports

### Routes (`src/routes/`)

- Versioned API structure (`v1/`)
- Modular route organization
- Processing-specific endpoints

### Services (`src/services/`)

- Business logic implementation
- Data processing operations
- External service integrations

### Middleware (`src/middleware/`)

- Custom error handling
- Request validation
- Authentication/authorization (when needed)

## Database Schema

The project uses Prisma ORM with PostgreSQL, featuring:

- **Streams**: Data processing streams
- **Nodes**: Processing nodes with different types (COLLECTOR, PROCESSOR, OUTPUT)
- **Edges**: Connections between nodes
- **Executions**: Stream execution tracking

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start with ts-node
npm run dev:watch        # Start with hot reload

# Building
npm run build            # Compile TypeScript
npm run start            # Run compiled app

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier

# Database
npm run migrate:dev      # Run Prisma migrations
npm run prisma:generate  # Generate Prisma client
```

### Docker Services

- **PostgreSQL**: Database server on port 5432
- **Kong**: API Gateway with declarative configuration

## Coding Guidelines

The project follows these conventions (defined in `.github/instructions/project.instructions.md`):

- Use Express version 5
- Use TypeScript with strict mode
- Use ESM modules
- Prefer TypeScript classes over functions
- Use Zod for validation
- Follow conventional commit standards

## Testing Strategy

- **Unit Tests**: Individual component testing
- **Integration Tests**: End-to-end API testing
- **Coverage Reports**: Generated in `coverage/` directory
- **Test Configuration**: Vitest with TypeScript support

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Environment-based origins**: Different CORS origins for dev/prod
- **Input Validation**: Zod schemas for request validation

## Monitoring & Logging

- **Winston**: Structured logging with multiple levels
- **Morgan**: HTTP request logging
- **Error Tracking**: Centralized error handling and logging
- **Health Checks**: Built-in health check endpoints

This structure promotes maintainability, scalability, and follows modern Node.js/TypeScript best practices.
