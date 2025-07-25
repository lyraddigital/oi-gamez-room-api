import { Room, RoomConnection } from "@oigamez/core";

import { getAvailableRoomsByCodes } from "../repositories";

export const getAllHostedRoomsFromConnections = async (
  connections: RoomConnection[]
): Promise<Room[]> => {
  const uniqueRoomCodes = connections
    .map((c) => c.roomCode)
    .filter((rc, index, arr) => arr.indexOf(rc) === index);

  const allRooms = await getAvailableRoomsByCodes(uniqueRoomCodes);

  return allRooms.filter(
    (r) => connections.findIndex((c) => c.username === r.hostUsername) >= 0
  );
};
