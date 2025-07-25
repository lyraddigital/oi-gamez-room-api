import {
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "@oigamez/core";

jest.mock("@oigamez/core");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for internal host expired subscriptions", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyEbName).toHaveBeenCalled();
    expect(verifyEbInternalEventSourceName).toHaveBeenCalled();
  });
});
