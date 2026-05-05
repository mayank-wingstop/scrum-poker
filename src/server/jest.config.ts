import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/start.ts',                // entry-point only; no testable logic
    '!src/store/sessionStore.ts',   // stub; covered in feature-specific stages
    '!src/ws/messageHandler.ts',    // stub; covered in feature-specific stages
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      branches: 75,
      functions: 80,
      statements: 80,
    },
  },
  coverageProvider: 'v8',
};

export default config;
