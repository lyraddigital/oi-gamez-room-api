import {
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "@oigamez/configuration";
import { verifyDynamoLastDisconnectedIndexName } from "./dynamo-last-disconnected-index-name";
import { verifyExpiredDisconnectionWindowInSeconds } from "./expired-disconnection-window-in-seconds";

jest.mock("@oigamez/configuration");
jest.mock("./dynamo-last-disconnected-index-name");
jest.mock("./expired-disconnection-window-in-seconds");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for the expired connections cron job", () => {
  test("correct verify mocks were called", () => {
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
