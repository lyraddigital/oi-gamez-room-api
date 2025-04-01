import {
  verifyRoomSocketApiEndpoint,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "/opt/nodejs/oigamez-core";

jest.mock("/opt/nodejs/oigamez-core");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for internal host changed subscriptions", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyRoomSocketApiEndpoint).toHaveBeenCalled();
    expect(verifyExternalEbName).toHaveBeenCalled();
    expect(verifyEbExternalEventSourceName).toHaveBeenCalled();
  });
});
