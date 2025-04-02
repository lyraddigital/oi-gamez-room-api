import {
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyRoomSocketApiEndpoint,
} from "/opt/nodejs/oigamez-core";

import { validateEnvironment } from "./validate-environment";

jest.mock("/opt/nodejs/oigamez-core");

describe("validateEnvironment for external game completed subscriptions", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
    expect(verifyRoomSocketApiEndpoint).toHaveBeenCalled();
  });
});
