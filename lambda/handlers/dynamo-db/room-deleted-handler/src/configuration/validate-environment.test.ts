import { verifyDynamoTableName } from "@oigamez/core";

jest.mock("@oigamez/core");

import { validateEnvironment } from "./validate-environment.js";

describe("validateEnvironment for room deleted dynamodb stream handler", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoTableName).toHaveBeenCalled();
  });
});
