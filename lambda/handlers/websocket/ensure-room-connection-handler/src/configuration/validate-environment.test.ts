import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "@oigamez/configuration";
import { verifyUpdatedConnectWindowInSeconds } from "./updated-connect-window";

import { validateEnvironment } from "./validate-environment";

jest.mock("@oigamez/configuration");
jest.mock("./updated-connect-window");

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
