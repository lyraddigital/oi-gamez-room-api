import { Room, RoomConnection } from "@oigamez/models";
import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";

export const getRoomAndConnections = async (
  roomCode: string,
  ttl: number
): Promise<[Room | undefined, RoomConnection[]]> => {
  const roomPromise = getRoomByCode(roomCode, ttl);
  const connectionsPromise = getRoomConnections(roomCode, ttl);

  return await Promise.all([roomPromise, connectionsPromise]);
};
