import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "/opt/nodejs/oigamez-core.js";

import { verifyUpdatedConnectWindowInSeconds } from "./updated-connect-window/index.js";
import { validateEnvironment } from "./validate-environment.js";

jest.mock("/opt/nodejs/oigamez-core.js");
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
