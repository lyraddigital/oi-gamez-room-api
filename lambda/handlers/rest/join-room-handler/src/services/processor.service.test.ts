import {
  encryptCustomDataToString,
  generateAccessToken,
} from "/opt/nodejs/oigamez-security";

import { processRoomJoin } from "./processor.service";

jest.mock("/opt/nodejs/oigamez-core", () => {
  return {
    ENCRYPTION_KEY: "SomeRandomEncryptionKey",
    ENCRYPTION_IV: "SomeRandomEncryptionIV",
    JWT_EXPIRY_IN_MINUTES: 5,
  };
});
jest.mock("/opt/nodejs/oigamez-security");

describe("join room processor tests", () => {
  test("all calls are made correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const accessToken = "token12393948457";
    const websocketSessionId = "fjewoifjwioefowifjweoifjo@#$#";

    (
      generateAccessToken as jest.MockedFunction<typeof generateAccessToken>
    ).mockReturnValueOnce(accessToken);
    (
      encryptCustomDataToString as jest.MockedFunction<
        typeof encryptCustomDataToString
      >
    ).mockReturnValueOnce(websocketSessionId);

    // Action
    const processRoomResult = processRoomJoin(roomCode, username);

    // Assert
    expect(processRoomResult).toBeDefined();
    expect(processRoomResult.token).toBe(accessToken);
    expect(processRoomResult.websocketSessionId).toBe(websocketSessionId);
  });
});
