import { convertFromMillisecondsToSeconds } from "/opt/nodejs/oigamez-services.js";

import { CurrentRoomStatus } from "../models/index.js";
import { getRoomStatus } from "./get-room-status.service.js";

export const processStatusRetrieval = async (
  roomCode: string,
  requestEpochInMilliseconds: number
): Promise<CurrentRoomStatus> => {
  const ttl = convertFromMillisecondsToSeconds(requestEpochInMilliseconds);
  return await getRoomStatus(roomCode, ttl);
};
