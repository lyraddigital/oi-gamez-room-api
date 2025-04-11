import { RoomConnection } from "@oigamez/core";

export const getConnectionIdsFromConnections = (
  connections: RoomConnection[]
): string[] => {
  return connections.map((c) => c.connectionId);
};
