import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
} from "/opt/nodejs/oigamez-core.js";

jest.mock("/opt/nodejs/oigamez-core.js");

import { validateEnvironment } from "./validate-environment.js";

describe("validateEnvironment for get game type handler tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
  });
});
