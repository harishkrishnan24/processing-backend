# Processing Backend

A TypeScript Express.js backend for the processing system.

## Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Express.js**: Fast, unopinionated web framework
- **Security**: Helmet for security headers, CORS configuration
- **Logging**: Morgan for HTTP request logging
- **Error Handling**: Centralized error handling middleware
- **Environment Configuration**: dotenv for environment variables
- **Development Tools**: ESLint, Nodemon for development
- **Health Checks**: Built-in health check endpoints

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration values.

### Development

Start the development server:

```bash
npm run dev
```

Or with file watching:

```bash
npm run dev:watch
```

### Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Testing

This project uses [Vitest](https://vitest.dev/) for unit and integration testing.

### Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run tests with UI:

```bash
npm run test:ui
```

### Test Structure

```
tests/
├── unit/             # Unit tests
│   ├── services/     # Service layer tests
│   └── middleware/   # Middleware tests
├── integration/      # Integration tests
│   └── routes/       # API route tests
└── setup.ts         # Test setup and configuration
```

### Writing Tests

- Unit tests focus on individual functions and classes
- Integration tests verify API endpoints and middleware
- Use descriptive test names and group related tests with `describe`
- Mock external dependencies and database calls

Example unit test:

```typescript
import { describe, it, expect } from 'vitest';
import { ProcessingService } from '../src/services/processingService';

describe('ProcessingService', () => {
  it('should process data successfully', async () => {
    const result = await ProcessingService.processData({ test: 'data' });
    expect(result).toHaveProperty('processed', true);
  });
});
```

## API Endpoints

### Health Check

- `GET /health` - Application health status

### API v1

- `GET /api` - API information
- `GET /api/v1/health` - API v1 health check

## Project Structure

```
src/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── routes/          # API routes
│   └── v1/         # Version 1 API routes
├── services/        # Business logic services
├── types/           # TypeScript type definitions
├── app.ts          # Express app configuration
└── index.ts        # Application entry point
```

## Scripts

- `npm run dev` - Start development server
- `npm run dev:watch` - Start development server with file watching
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run clean` - Clean build directory
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with interactive UI
- `npm run commitlint` - Validate commit message format
- `npm run commit` - Interactive commit with conventional commit format
- `npm run commit:help` - Show commit script usage help

## Development Guidelines

### Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/) specification. All commit messages are validated using commitlint.

#### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

#### Examples

```
feat: add user authentication
fix: resolve memory leak in processing service
docs: update API documentation
test: add unit tests for validation middleware
```

#### Rules

- Use lowercase for type
- Keep subject line under 72 characters
- Don't end subject line with a period
- Use imperative mood in the subject line

#### Interactive Commit Tool

For easier commit creation, use the interactive commit tool:

```bash
npm run commit
```

This will guide you through creating a properly formatted conventional commit with:

- Type selection from a list
- Scope input (optional)
- Subject description
- Body description (optional)
- Breaking changes notation (if applicable)

#### Manual Commits

If you prefer to write commit messages manually, ensure they follow the conventional format. The commit message format is automatically validated by husky hooks before each commit.

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=
API_VERSION=v1
```

## License

MIT
