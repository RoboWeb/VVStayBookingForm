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
    "collectCoverage": true,
    "collectCoverageFrom": ["**/src/components/*.{js,vue}", "**/src/services/*.{js,vue}",  "!**/src/main.js", "!**/node_modules/**"]
  }