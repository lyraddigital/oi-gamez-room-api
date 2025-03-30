import { RoomConnection } from "@oigamez/models";

export const getConnectionIdsFromConnections = (
  connections: RoomConnection[]
): string[] => {
  return connections.map((c) => c.connectionId);
};
