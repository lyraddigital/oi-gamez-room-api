import {
  verifyDynamoConnectionTableName,
  verifyDynamoLastDisconnectedIndexName,
  verifyDynamoTableName,
  verifyExpiredDisconnectionWindowInSeconds,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "@oigamez/configuration";

jest.mock("@oigamez/configuration");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for the expired connections cron job", () => {
  it("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
    expect(verifyDynamoLastDisconnectedIndexName).toHaveBeenCalled();
    expect(verifyExpiredDisconnectionWindowInSeconds).toHaveBeenCalled();
    expect(verifyEbName).toHaveBeenCalled();
    expect(verifyEbInternalEventSourceName).toHaveBeenCalled();
  });
});
