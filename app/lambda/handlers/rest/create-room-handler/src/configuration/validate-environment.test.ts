import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
  verifyEncryptionKey,
  verifyEncryptionIV,
} from "@oigamez/core";
import { verifyConnectionWindowInSeconds } from "./connect-window-in-seconds";
import { verifyDynamoHostRoomIndexName } from "./host-room-index-name";
import { validateEnvironment } from "./validate-environment";

jest.mock("@oigamez/core");
jest.mock("./connect-window-in-seconds");
jest.mock("./host-room-index-name");

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
