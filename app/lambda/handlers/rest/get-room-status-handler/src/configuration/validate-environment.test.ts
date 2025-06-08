import { verifyCorsAllowedOrigin, verifyDynamoTableName } from "@oigamez/core";

import { validateEnvironment } from "./validate-environment";

jest.mock("@oigamez/core");

describe("validateEnvironment for get room status handler tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
  });
});
