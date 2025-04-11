import {
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "/opt/nodejs/oigamez-core.js";

jest.mock("/opt/nodejs/oigamez-core.js");

import { validateEnvironment } from "./validate-environment.js";

describe("validateEnvironment for internal user expired subscriptions", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyEbName).toHaveBeenCalled();
    expect(verifyEbInternalEventSourceName).toHaveBeenCalled();
  });
});
