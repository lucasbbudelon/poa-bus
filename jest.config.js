const esModules = ["@ng-bootstrap"].join("|");

module.exports = {
  preset: "jest-preset-angular",
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
  collectCoverage: true,
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileMock.js",
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>tsconfig.spec.json',
    },
  },
};
