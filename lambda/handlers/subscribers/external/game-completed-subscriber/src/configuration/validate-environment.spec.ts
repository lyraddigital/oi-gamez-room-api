import {
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyRoomSocketApiEndpoint,
} from "@oigamez/configuration";

jest.mock("@oigamez/configuration");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for external game completed subscriptions", () => {
  it("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
    expect(verifyRoomSocketApiEndpoint).toHaveBeenCalled();
  });
});
