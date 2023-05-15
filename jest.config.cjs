module.exports = {
    // ...other Jest configuration options...
    testEnvironment: 'node',
    transform: {},
    moduleNameMapper: {
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
  };