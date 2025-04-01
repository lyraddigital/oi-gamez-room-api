import { verifyDynamoTableName } from "/opt/nodejs/oigamez-core";

jest.mock("/opt/nodejs/oigamez-core");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for room deleted dynamodb stream handler", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoTableName).toHaveBeenCalled();
  });
});
