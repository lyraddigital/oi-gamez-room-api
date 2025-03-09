import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
  verifyDynamoHostRoomIndexName,
  verifyConnectionWindowInSeconds,
} from "@oigamez/configuration";

jest.mock("@oigamez/configuration");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for create room handler tests", () => {
  it("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
    expect(verifyDynamoHostRoomIndexName).toHaveBeenCalled();
    expect(verifyConnectionWindowInSeconds).toHaveBeenCalled();
  });
});
