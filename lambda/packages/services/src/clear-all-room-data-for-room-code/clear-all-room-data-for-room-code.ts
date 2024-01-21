import { clearRoomData, getRoomConnections } from "@oigamez/repositories";

export const clearAllRoomDataForRoomCode = async (
  roomCode: string
): Promise<void> => {
  const connections = await getRoomConnections(roomCode);
  await clearRoomData(roomCode, connections);
};
