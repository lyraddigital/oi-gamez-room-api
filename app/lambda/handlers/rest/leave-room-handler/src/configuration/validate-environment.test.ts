import {
  verifyCorsAllowedOrigin,
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
} from "@oigamez/core";

import { validateEnvironment } from "./validate-environment";

jest.mock("@oigamez/core");

describe("validateEnvironment for leave room handler tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
  });
});
