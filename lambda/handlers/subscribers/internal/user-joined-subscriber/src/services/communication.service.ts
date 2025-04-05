import { getConnectionIdsFromConnections } from "@oigamez/services";

import { broadcast } from "/opt/nodejs/oigamez-communication";
import { getRoomConnections } from "/opt/nodejs/oigamez-data";
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
