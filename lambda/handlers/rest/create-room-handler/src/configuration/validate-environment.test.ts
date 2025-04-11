import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
  verifyEncryptionKey,
  verifyEncryptionIV,
} from "/opt/nodejs/oigamez-core.js";
import { verifyConnectionWindowInSeconds } from "./connect-window-in-seconds/index.js";
import { verifyDynamoHostRoomIndexName } from "./host-room-index-name/index.js";
import { validateEnvironment } from "./validate-environment.js";

jest.mock("/opt/nodejs/oigamez-core.js");
jest.mock("./connect-window-in-seconds/index.js");
jest.mock("./host-room-index-name/index.js");

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
