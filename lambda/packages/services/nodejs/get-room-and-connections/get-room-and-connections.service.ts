import { Room, RoomConnection } from "/opt/nodejs/oigamez-core.js";
import { getRoomByCode, getRoomConnections } from "/opt/nodejs/oigamez-data.js";

export const getRoomAndConnections = async (
  roomCode: string,
  ttl: number
): Promise<[Room | undefined, RoomConnection[]]> => {
  const roomPromise = getRoomByCode(roomCode, ttl);
  const connectionsPromise = getRoomConnections(roomCode, ttl);

  return await Promise.all([roomPromise, connectionsPromise]);
};
