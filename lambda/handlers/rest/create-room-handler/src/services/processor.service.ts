import {
  ENCRYPTION_KEY,
  ENCRYPTION_IV,
  JWT_EXPIRY_IN_MINUTES,
  GameType,
} from "/opt/nodejs/oigamez-core.js";
import {
  encryptCustomDataToString,
  generateAccessToken,
} from "/opt/nodejs/oigamez-security.js";
import { getNow } from "/opt/nodejs/oigamez-services.js";
import { CONNECT_WINDOW_IN_SECONDS } from "../configuration/index.js";
import {
  CreateRoomPayload,
  ProcessRoomCreationResponse,
} from "../models/index.js";
import {
  createRoom,
  getAllUnavailableDivisionAndGroupCodes,
  getUniqueRoomCode,
} from "../repositories/index.js";
import { getAnAvailableDivisionAndGroupCode } from "./available-division-and-group-code.service.js";
import { incrementAndReturnInSeconds } from "./increment-and-convert-to-seconds.service.js";

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
