module.exports = {
  preset: 'ts-jest',
  testMatch: ["**/test/**/*.ts"],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  testEnvironment: 'node',
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
