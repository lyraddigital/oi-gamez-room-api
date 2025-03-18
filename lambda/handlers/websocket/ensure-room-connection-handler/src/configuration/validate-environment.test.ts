import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyUpdatedConnectWindowInSeconds,
  verifyEbName,
  verifyEbInternalEventSourceName,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "@oigamez/configuration";

jest.mock("@oigamez/configuration");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for ensure room connection tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoTableName).toHaveBeenCalled();
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyUpdatedConnectWindowInSeconds).toHaveBeenCalled();
    expect(verifyEbName).toHaveBeenCalled();
    expect(verifyEbInternalEventSourceName).toHaveBeenCalled();
    expect(verifyExternalEbName).toHaveBeenCalled();
    expect(verifyEbExternalEventSourceName).toHaveBeenCalled();
  });
});
