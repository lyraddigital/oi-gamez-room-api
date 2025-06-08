import { verifyCorsAllowedOrigin, verifyDynamoTableName } from "@oigamez/core";

jest.mock("@oigamez/core");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for get game type handler tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
  });
});
