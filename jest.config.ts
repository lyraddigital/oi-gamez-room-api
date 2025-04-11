import { createDefaultEsmPreset } from "ts-jest";

const presetConfig = createDefaultEsmPreset({});

export default {
  ...presetConfig,
  testEnvironment: "node",
  roots: ["<rootDir>/lambda", "<rootDir>/lib"],
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "/opt/nodejs/oigamez-core.js": [
      "<rootDir>/lambda/packages/core/src/oigamez-core.ts",
    ],
    "/opt/nodejs/oigamez-http.js": [
      "<rootDir>/lambda/packages/http/nodejs/oigamez-http.ts",
    ],
    "/opt/nodejs/oigamez-security.js": [
      "<rootDir>/lambda/packages/security/nodejs/oigamez-security.ts",
    ],
    "/opt/nodejs/oigamez-communication.js": [
      "<rootDir>/lambda/packages/communication/nodejs/oigamez-communication.ts",
    ],
    "/opt/nodejs/oigamez-data.js": [
      "<rootDir>/lambda/packages/data/src/oigamez-data.ts",
    ],
    "/opt/nodejs/oigamez-services.js": [
      "<rootDir>/lambda/packages/services/nodejs/oigamez-services.ts",
    ],
  },
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  // },
};
