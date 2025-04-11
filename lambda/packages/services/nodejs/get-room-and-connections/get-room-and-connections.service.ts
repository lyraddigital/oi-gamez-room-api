import { Room, RoomConnection } from "@oigamez/core";
import { getRoomByCode, getRoomConnections } from "@oigamez/data";

export const getRoomAndConnections = async (
  roomCode: string,
  ttl: number
): Promise<[Room | undefined, RoomConnection[]]> => {
  const roomPromise = getRoomByCode(roomCode, ttl);
  const connectionsPromise = getRoomConnections(roomCode, ttl);

  return await Promise.all([roomPromise, connectionsPromise]);
};
