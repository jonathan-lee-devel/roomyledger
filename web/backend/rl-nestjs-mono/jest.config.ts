import { Config } from 'jest';

const config: Config = {
  projects: [
    {
      displayName: 'unit',
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      rootDir: 'src',
      collectCoverageFrom: ['**/*.ts'],
      testMatch: ['<rootDir>/**/*.spec.ts'],
    },
    {
      displayName: 'integration',
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      runner: 'jest-serial-runner',
      rootDir: 'src',
      collectCoverageFrom: ['**/*.ts'],
      testMatch: ['<rootDir>/**/*.it.ts'],
    },
    {
      displayName: 'e2e',
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      runner: 'jest-serial-runner',
      rootDir: 'test',
      testMatch: ['<rootDir>/**/*.e2e-spec.ts'],
    },
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
