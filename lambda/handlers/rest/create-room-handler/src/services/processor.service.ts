import { CONNECT_WINDOW_IN_SECONDS } from "@oigamez/configuration";
import { GameType } from "@oigamez/models";
import { getNow, incrementAndReturnInSeconds } from "@oigamez/services";

import { CreateRoomPayload } from "../models";
import {
  createRoom,
  getAllUnavailableDivisionAndGroupCodes,
  getUniqueRoomCode,
} from "../repositories";

import { getAnAvailableDivisionAndGroupCode } from "./available-division-and-group-code.service";

export const processRoomCreation = async (
  payload: CreateRoomPayload,
  gameType: GameType,
  requestEpochInMilliseconds: number
): Promise<string> => {
  const roomEpochExpiry = incrementAndReturnInSeconds(
    requestEpochInMilliseconds,
    CONNECT_WINDOW_IN_SECONDS
  );
  const unavailableDivisionAndGroupCodes =
    await getAllUnavailableDivisionAndGroupCodes();
  const [divisionCode, groupCode] = getAnAvailableDivisionAndGroupCode(
    unavailableDivisionAndGroupCodes
  );
  const [roomCode, isRoomCodeGroupExhaused] = await getUniqueRoomCode(
    divisionCode,
    groupCode
  );

  await createRoom(
    {
      code: roomCode,
      createdAt: getNow(),
      title: payload.title!,
      hostUsername: payload.hostUsername!,
      minNumOfUsers: gameType.minNumOfUsers,
      maxNumOfUsers: gameType.maxNumOfUsers,
      epochExpiry: roomEpochExpiry,
      isPublic: payload.isPublic!,
      gameTypeId: payload.gameTypeId!,
    },
    isRoomCodeGroupExhaused
  );

  return roomCode;
};
