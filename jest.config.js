const config = {
  verbose: true,
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/test/config/assetTransformer.js',
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/test/config/assetTransformer.js',
    '<rootDir>/(build|dist|docs|node_modules)/',
  ],
};

module.exports = config;
