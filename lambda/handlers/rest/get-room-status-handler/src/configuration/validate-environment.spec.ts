import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
} from "@oigamez/configuration";

import { validateEnvironment } from "./validate-environment";

jest.mock("@oigamez/configuration");

describe("validateEnvironment for get room status handler tests", () => {
  it("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
  });
});
