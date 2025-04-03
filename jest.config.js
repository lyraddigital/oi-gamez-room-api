module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/lambda", "<rootDir>/lib"],
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "@oigamez/(.*)": "<rootDir>/lambda/packages/$1/src",
    "/opt/nodejs/oigamez-(.*)": [
      "<rootDir>/lambda/packages/$1/nodejs/oigamez-$1",
    ],
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
