import {
  verifyDynamoConnectionTableName,
  verifyEbExternalEventSourceName,
  verifyExternalEbName,
  verifyRoomSocketApiEndpoint,
} from "/opt/nodejs/oigamez-core";

jest.mock("/opt/nodejs/oigamez-core");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for internal user left subscriptions", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyEbExternalEventSourceName).toHaveBeenCalled();
    expect(verifyExternalEbName).toHaveBeenCalled();
    expect(verifyRoomSocketApiEndpoint).toHaveBeenCalled();
  });
});
