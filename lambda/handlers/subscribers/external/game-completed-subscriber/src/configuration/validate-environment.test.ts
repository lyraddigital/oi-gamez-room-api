import {
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyRoomSocketApiEndpoint,
} from "/opt/nodejs/oigamez-core.js";

import { validateEnvironment } from "./validate-environment.js";

jest.mock("/opt/nodejs/oigamez-core.js");

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
