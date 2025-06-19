/// <reference types="vitest/globals" />

import { beforeAll, afterAll } from 'vitest';

// Global test setup
beforeAll(() => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';

  // Suppress console logs during tests if needed
  // console.log = vi.fn();
  // console.error = vi.fn();
});

afterAll(() => {
  // Cleanup after all tests
});
