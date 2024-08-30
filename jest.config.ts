import { type Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testRegex: '.*\\.spec\\.ts$',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};

export default config;
