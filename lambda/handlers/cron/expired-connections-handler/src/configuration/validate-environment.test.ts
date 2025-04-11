import {
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "@oigamez/core";
import { verifyDynamoLastDisconnectedIndexName } from "./dynamo-last-disconnected-index-name/index.js";
import { verifyExpiredDisconnectionWindowInSeconds } from "./expired-disconnection-window-in-seconds/index.js";

jest.mock("@oigamez/core");
jest.mock("./dynamo-last-disconnected-index-name.js");
jest.mock("./expired-disconnection-window-in-seconds.js");

import { validateEnvironment } from "./validate-environment.js";

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
