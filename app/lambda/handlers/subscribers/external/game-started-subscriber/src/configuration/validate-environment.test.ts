import {
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyRoomSocketApiEndpoint,
} from "@oigamez/core";

jest.mock("@oigamez/core");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for external game started subscriptions", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
    expect(verifyRoomSocketApiEndpoint).toHaveBeenCalled();
  });
});
