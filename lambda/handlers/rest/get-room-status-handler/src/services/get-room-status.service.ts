import { RoomStatus } from "/opt/nodejs/oigamez-core.js";
import { getRoomByCode } from "/opt/nodejs/oigamez-data.js";

import { CurrentRoomStatus } from "../models/index.js";

export const getRoomStatus = async (
  code: string,
  ttl: number
): Promise<CurrentRoomStatus> => {
  const room = await getRoomByCode(code, ttl);
  let canJoinGameSession = false;
  let reason = "Not Found";

  if (room) {
    const isGameAvailable = room.status == RoomStatus.available;
    const isGameFull = room.curNumOfUsers >= room.maxNumOfUsers;

    canJoinGameSession = isGameAvailable && !isGameFull;
    reason = isGameFull ? "Room is full" : isGameAvailable ? "" : room.status;
  }

  return { canJoin: canJoinGameSession, reason };
};
