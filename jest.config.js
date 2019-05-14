const path = require('path')

module.exports = {
  preset: 'ts-jest',
  testMatch: ["**/test/**/*.ts"],
  globals: {
    'ts-jest': {
      diagnostics: false
    },
    "tsConfig": path.resolve("tsconfig.json")
  },
  testEnvironment: 'node',
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "platforms/(.*)$": "<rootDir>/src/platforms/miniprogram/$1"
  }
};
