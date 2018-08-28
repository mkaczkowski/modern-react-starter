module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['src/**/*.js'],
  testURL: 'http://localhost:3000/',
  setupFiles: [],
  testMatch: ['<rootDir>/src/**/?(*.)spec.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': '<rootDir>config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>config/jest/cssTransform.js',
    '^(?!.*\\.(js|css|json)$)': '<rootDir>config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$', '^.+\\.module\\.css$'],
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.module\\.css$': 'idinfo-obj-proxy',
  },
};
