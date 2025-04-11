import { verifyDynamoTableName } from "/opt/nodejs/oigamez-core.js";

jest.mock("/opt/nodejs/oigamez-core.js");

import { validateEnvironment } from "./validate-environment.js";

describe("validateEnvironment for room deleted dynamodb stream handler", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoTableName).toHaveBeenCalled();
  });
});
