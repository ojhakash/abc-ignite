module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'mjs'],
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.test.mjs',
    '**/?(*.)+(spec|test).js',
    '**/?(*.)+(spec|test).mjs',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.mjs'],
}; 