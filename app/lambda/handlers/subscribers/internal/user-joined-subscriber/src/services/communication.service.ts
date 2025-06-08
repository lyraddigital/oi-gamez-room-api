import { broadcast } from "@oigamez/communication";
import { getRoomConnections } from "@oigamez/data";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { UserJoinedWebsocketEvent } from "../models";

export const communicateUserJoined = async (
  roomCode: string,
  username: string
): Promise<void> => {
  const roomConnections = await getRoomConnections(roomCode);
  const filteredConnections = roomConnections.filter(
    (rc) => rc.username !== username
  );
  const filteredConnectionIds =
    getConnectionIdsFromConnections(filteredConnections);

  await broadcast<UserJoinedWebsocketEvent>(
    filteredConnectionIds,
    new UserJoinedWebsocketEvent(username)
  );
};
