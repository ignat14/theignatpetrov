# Testing Documentation

## Overview

This project includes a unit testing suite using Vitest, providing automated testing for core functionality in the blog system.

## Test Framework Setup

- **Framework**: Vitest with happy-dom environment
- **Configuration**: TypeScript support with proper module aliasing
- **Status**: All core tests passing

## Test Structure

```
tests/
├── setup.ts                    # Global test setup and mocks
├── mocks/                      # Shared mock implementations
│   └── nuxt.ts                # Nuxt composables and utilities
├── utils/                      # Utility function tests
│   ├── cache.test.ts          # CacheManager class testing
│   ├── config.test.ts         # Configuration validation
│   ├── readingTime.test.ts    # Reading time calculation
│   └── errorHandling.test.ts  # Error handling utilities
├── server/api/                # API endpoint tests
│   └── blog/
│       ├── read-content.test.ts       # Reading time API
│       ├── read-content-batch.test.ts # Batch content reading
│       └── stats.test.ts             # Blog stats API
└── disabled/                  # Future composable tests
    └── composables/           # (Needs Nuxt module setup)
```

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test

# Generate coverage report
npm run test:coverage
```

## Key Testing Patterns

### 1. **Mocking Strategy**
- Mocking of external dependencies (Nuxt, file system)
- Isolated unit tests with controlled inputs and outputs

### 2. **Error Handling Testing**
- Network failures, API errors
- Malformed data, validation failures, edge cases
- Graceful degradation and fallback scenarios

### 3. **Performance Testing**
- Cache hit/miss scenarios
- Loading state management

### 4. **Security Testing**
- Input validation and sanitization
- Path traversal attack prevention
