import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
} from "/opt/nodejs/oigamez-core.js";

import { validateEnvironment } from "./validate-environment.js";

jest.mock("/opt/nodejs/oigamez-core.js");

describe("validateEnvironment for get room status handler tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
  });
});
