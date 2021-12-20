module.exports = {
    verbose: true,
    roots: ["<rootDir>/src/", "<rootDir>/specs/"],
    moduleFileExtensions: ['js', 'vue'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.vue$": "vue-jest"
    },
    // "collectCoverage": true,
    // "collectCoverageFrom": ["**/src/*.{js,vue}", "!**/node_modules/**"]
  }