import { broadcast } from "/opt/nodejs/oigamez-communication.js";
import { getRoomConnections } from "/opt/nodejs/oigamez-data.js";
import { getConnectionIdsFromConnections } from "/opt/nodejs/oigamez-services.js";

import { UserJoinedWebsocketEvent } from "../models/index.js";

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
