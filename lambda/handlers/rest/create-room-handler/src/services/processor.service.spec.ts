import { GameType } from "@oigamez/models";
import { getNow, incrementAndReturnInSeconds } from "@oigamez/services";

import { CreateRoomPayload } from "../models";
import {
  createRoom,
  getAllUnavailableDivisionAndGroupCodes,
  getUniqueRoomCode,
} from "../repositories";
import { getAnAvailableDivisionAndGroupCode } from "./available-division-and-group-code.service";

import { processRoomCreation } from "./processor.service";

jest.mock("@oigamez/configuration", () => {
  return {
    CONNECT_WINDOW_IN_SECONDS: 30,
  };
});
jest.mock("@oigamez/services");
jest.mock("../repositories");
jest.mock("./available-division-and-group-code.service");

describe("create room processor tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("all calls are made correctly", async () => {
    // Arrange
    const roomCode = "ABCD";
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
    (getNow as jest.MockedFunction<typeof getNow>).mockReturnValueOnce(
      currentDate
    );

    // Action
    const returnedRoomCode = await processRoomCreation(
      payload,
      gameType,
      requestEpochInMilliseconds
    );

    // Assert
    expect(returnedRoomCode).toBe(roomCode);
    expect(incrementAndReturnInSeconds).toHaveBeenCalledWith(
      requestEpochInMilliseconds,
      30
    );
    expect(getAllUnavailableDivisionAndGroupCodes).toHaveBeenCalled();
    expect(getAnAvailableDivisionAndGroupCode).toHaveBeenCalledWith(
      unavailableDivisionAndGroupCodes
    );
    expect(getUniqueRoomCode).toHaveBeenCalledWith(divisionCode, groupCode);
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
