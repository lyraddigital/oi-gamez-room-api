import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
  verifyEncryptionKey,
  verifyEncryptionIV,
} from "@oigamez/configuration";
import { verifyConnectionWindowInSeconds } from "./connect-window-in-seconds";
import { verifyDynamoHostRoomIndexName } from "./host-room-index-name";

jest.mock("@oigamez/configuration");
jest.mock("./connect-window-in-seconds");
jest.mock("./host-room-index-name");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for create room handler tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
    expect(verifyDynamoHostRoomIndexName).toHaveBeenCalled();
    expect(verifyEncryptionKey).toHaveBeenCalled();
    expect(verifyEncryptionIV).toHaveBeenCalled();
    expect(verifyConnectionWindowInSeconds).toHaveBeenCalled();
    expect(verifyJwtExpiryInMinutes).toHaveBeenCalled();
    expect(verifyJwtSecretKey).toHaveBeenCalled();
  });
});
