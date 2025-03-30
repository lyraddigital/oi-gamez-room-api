import {
  CONNECT_WINDOW_IN_SECONDS,
  ENCRYPTION_KEY,
  ENCRYPTION_IV,
  JWT_EXPIRY_IN_MINUTES,
} from "@oigamez/configuration";
import { GameType } from "@oigamez/models";
import {
  encryptCustomDataToString,
  generateAccessToken,
} from "@oigamez/security";
import { getNow } from "@oigamez/services";

import { CreateRoomPayload, ProcessRoomCreationResponse } from "../models";
import {
  createRoom,
  getAllUnavailableDivisionAndGroupCodes,
  getUniqueRoomCode,
} from "../repositories";

import { getAnAvailableDivisionAndGroupCode } from "./available-division-and-group-code.service";
import { incrementAndReturnInSeconds } from "./increment-and-convert-to-seconds.service";

export const processRoomCreation = async (
  payload: CreateRoomPayload,
  gameType: GameType,
  requestEpochInMilliseconds: number
): Promise<ProcessRoomCreationResponse> => {
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

  const token = generateAccessToken(
    { roomCode, username: payload.hostUsername! },
    JWT_EXPIRY_IN_MINUTES
  );
  const websocketSessionId = encryptCustomDataToString(
    ENCRYPTION_KEY,
    ENCRYPTION_IV,
    {
      roomCode,
      username: payload.hostUsername!,
    }
  );

  return { roomCode, token, websocketSessionId };
};
