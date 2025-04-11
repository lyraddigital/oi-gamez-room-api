import { Room, RoomConnection } from "/opt/nodejs/oigamez-core.js";

import { getAvailableRoomsByCodes } from "../repositories/index.js";

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
