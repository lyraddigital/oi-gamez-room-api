import { broadcast } from "@oigamez/communication";
import { getRoomConnections } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { UserJoinedCommunicationEvent } from "../models";

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

  await broadcast<UserJoinedCommunicationEvent>(
    filteredConnectionIds,
    new UserJoinedCommunicationEvent(username)
  );
};
