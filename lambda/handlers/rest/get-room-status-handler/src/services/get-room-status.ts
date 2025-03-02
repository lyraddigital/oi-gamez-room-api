import { RoomStatus } from "@oigamez/models";
import { getRoomByCode } from "@oigamez/repositories";

import { CurrentRoomStatus } from "../models";

export const getRoomStatus = async (
  code: string,
  ttl: number
): Promise<CurrentRoomStatus> => {
  const room = await getRoomByCode(code, ttl);
  let canJoinGameSession = false;
  let reason = "Not Found";

  if (room) {
    const isGameAvailable = room.status == RoomStatus.Available;
    const isGameFull = room.curNumOfUsers >= room.maxNumOfUsers;

    canJoinGameSession = isGameAvailable && !isGameFull;
    reason = isGameFull
      ? "Room is full"
      : isGameAvailable
      ? ""
      : room.status || "";
  }

  return { canJoin: canJoinGameSession, reason };
};
