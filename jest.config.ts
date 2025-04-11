export default {
  testEnvironment: "node",
  roots: ["<rootDir>/lambda", "<rootDir>/lib"],
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "/opt/nodejs/oigamez-http.js": [
      "<rootDir>/lambda/packages/http/nodejs/oigamez-http.ts",
    ],
    "/opt/nodejs/oigamez-security.js": [
      "<rootDir>/lambda/packages/security/nodejs/oigamez-security.ts",
    ],
    "/opt/nodejs/oigamez-services.js": [
      "<rootDir>/lambda/packages/services/nodejs/oigamez-services.ts",
    ],
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
