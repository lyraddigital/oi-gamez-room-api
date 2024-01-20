import { Room, RoomConnection } from "@oigamez/models";

import { getAvailableRoomsByCodes } from "../repositories";

export const getAllRoomsFromConnections = async (
  connections: RoomConnection[]
): Promise<Room[]> => {
  const uniqueRoomCodes = connections
    .map((c) => c.roomCode)
    .filter((rc, index, arr) => arr.indexOf(rc) === index);

  return await getAvailableRoomsByCodes(uniqueRoomCodes);
};
