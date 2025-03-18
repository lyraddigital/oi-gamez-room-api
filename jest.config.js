module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/lambda", "<rootDir>/lib"],
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "@oigamez/(.*)": "<rootDir>/lambda/packages/$1/src",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
