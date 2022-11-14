module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['interfaces.ts'],
  reporters: ['default', 'jest-junit'],
  timers: 'modern',
  injectGlobals: true,
  verbose: true,
  moduleNameMapper: {
    '^@cores/(.*)$': '<rootDir>/src/cores/$1',
    '^@apps/(.*)$': '<rootDir>/src/apps/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    uuid: '<rootDir>/node_modules/uuid/dist/',
  },
  resolver: 'jest-node-exports-resolver',
}


