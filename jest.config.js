module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/lambda", "<rootDir>/lib"],
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "@oigamez/(.*)": "<rootDir>/lambda/packages/$1/src",
    "/opt/nodejs/oigamez-core": [
      "<rootDir>/lambda/packages/core/nodejs/oigamez-core",
    ],
    "/opt/nodejs/oigamez-communication": [
      "<rootDir>/lambda/packages/communication/nodejs/oigamez-communication",
    ],
    "/opt/nodejs/oigamez-http": [
      "<rootDir>/lambda/packages/http/nodejs/oigamez-http",
    ],
    "/opt/nodejs/oigamez-security": [
      "<rootDir>/lambda/packages/security/nodejs/oigamez-security",
    ],
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
