import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { CurrentRoomStatus } from "../models";
import { getRoomStatus } from "./get-room-status.service";

export const processStatusRetrieval = async (
  roomCode: string,
  requestEpochInMilliseconds: number
): Promise<CurrentRoomStatus> => {
  const ttl = convertFromMillisecondsToSeconds(requestEpochInMilliseconds);
  return await getRoomStatus(roomCode, ttl);
};
