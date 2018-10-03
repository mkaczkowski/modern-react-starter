module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['src/**/*.ts'],
  testURL: 'http://localhost/',
  setupFiles: [],
  testMatch: ['<rootDir>/src/**/?(*.)spec.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': '<rootDir>config/jest/babelTransform.js',
    '^.+\\.tsx?$': '<rootDir>config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>config/jest/cssTransform.js',
    '^(?!.*\\.(js|ts|css|json)$)': '<rootDir>config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$', '^.+\\.module\\.css$', './dist'],
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.module\\.css$': 'idinfo-obj-proxy',
    '^@assets(.*)$': '<rootDir>/src/assets',
  },
};
