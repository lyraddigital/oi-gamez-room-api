import { GameType } from "/opt/nodejs/oigamez-core.js";
import {
  encryptCustomDataToString,
  generateAccessToken,
} from "/opt/nodejs/oigamez-security.js";
import { getNow } from "/opt/nodejs/oigamez-services.js";

import { CreateRoomPayload } from "../models/index.js";
import {
  createRoom,
  getAllUnavailableDivisionAndGroupCodes,
  getUniqueRoomCode,
} from "../repositories/index.js";
import { getAnAvailableDivisionAndGroupCode } from "./available-division-and-group-code.service.js";
import { incrementAndReturnInSeconds } from "./increment-and-convert-to-seconds.service.js";
import { processRoomCreation } from "./processor.service.js";

jest.mock("/opt/nodejs/oigamez-core.js", () => {
  return {
    ENCRYPTION_KEY: "SomeRandomEncryptionKey",
    ENCRYPTION_IV: "SomeRandomEncryptionIV",
    JWT_EXPIRY_IN_MINUTES: 5,
  };
});
jest.mock("/opt/nodejs/oigamez-security.js");
jest.mock("/opt/nodejs/oigamez-services.js");
jest.mock("../configuration", () => {
  return {
    CONNECT_WINDOW_IN_SECONDS: 30,
  };
});
jest.mock("../repositories");
jest.mock("./available-division-and-group-code.service");
jest.mock("./increment-and-convert-to-seconds.service");

describe("create room processor tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("all calls are made correctly", async () => {
    // Arrange
    const roomCode = "ABCD";
    const accessToken = "token12393948457";
    const websocketSessionId = "fjewoifjwioefowifjweoifjo@#$#";
    const currentDate = new Date();
    const requestEpochInMilliseconds = 21600000;
    const roomEpochExpiry = 21600;
    const unavailableDivisionAndGroupCodes: string[] = [];
    const divisionCode = "A";
    const groupCode = "B";
    const isRoomCodeGroupExhausted = false;
    const gameType = {
      minNumOfUsers: 2,
      maxNumOfUsers: 4,
    } as GameType;
    const payload = {
      title: "Some room",
      hostUsername: "daryl_duck",
      isPublic: true,
      gameTypeId: 1,
    } as CreateRoomPayload;

    (
      incrementAndReturnInSeconds as jest.MockedFunction<
        typeof incrementAndReturnInSeconds
      >
    ).mockReturnValueOnce(roomEpochExpiry);
    (
      getAllUnavailableDivisionAndGroupCodes as jest.MockedFunction<
        typeof getAllUnavailableDivisionAndGroupCodes
      >
    ).mockResolvedValueOnce(unavailableDivisionAndGroupCodes);
    (
      getAnAvailableDivisionAndGroupCode as jest.MockedFunction<
        typeof getAnAvailableDivisionAndGroupCode
      >
    ).mockReturnValueOnce([divisionCode, groupCode]);
    (
      getUniqueRoomCode as jest.MockedFunction<typeof getUniqueRoomCode>
    ).mockResolvedValueOnce([roomCode, isRoomCodeGroupExhausted]);
    (
      generateAccessToken as jest.MockedFunction<typeof generateAccessToken>
    ).mockReturnValueOnce(accessToken);
    (getNow as jest.MockedFunction<typeof getNow>).mockReturnValueOnce(
      currentDate
    );
    (
      encryptCustomDataToString as jest.MockedFunction<
        typeof encryptCustomDataToString
      >
    ).mockReturnValueOnce(websocketSessionId);

    // Action
    const processRoomResult = await processRoomCreation(
      payload,
      gameType,
      requestEpochInMilliseconds
    );

    // Assert
    expect(processRoomResult).toBeDefined();
    expect(processRoomResult.roomCode).toBe(roomCode);
    expect(processRoomResult.token).toBe(accessToken);
    expect(processRoomResult.websocketSessionId).toBe(websocketSessionId);
    expect(incrementAndReturnInSeconds).toHaveBeenCalledWith(
      requestEpochInMilliseconds,
      30
    );
    expect(getAllUnavailableDivisionAndGroupCodes).toHaveBeenCalled();
    expect(getAnAvailableDivisionAndGroupCode).toHaveBeenCalledWith(
      unavailableDivisionAndGroupCodes
    );
    expect(getUniqueRoomCode).toHaveBeenCalledWith(divisionCode, groupCode);
    expect(generateAccessToken).toHaveBeenCalledWith(
      {
        roomCode,
        username: payload.hostUsername,
      },
      5
    );
    expect(encryptCustomDataToString).toHaveBeenCalledWith(
      "SomeRandomEncryptionKey",
      "SomeRandomEncryptionIV",
      { roomCode, username: payload.hostUsername }
    );
    expect(createRoom).toHaveBeenCalledWith(
      {
        code: roomCode,
        title: payload.title,
        createdAt: currentDate,
        hostUsername: payload.hostUsername,
        minNumOfUsers: gameType.minNumOfUsers,
        maxNumOfUsers: gameType.maxNumOfUsers,
        epochExpiry: roomEpochExpiry,
        isPublic: payload.isPublic,
        gameTypeId: payload.gameTypeId,
      },
      isRoomCodeGroupExhausted
    );
  });
});
