import {
  UserJoinedCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import { getRoomConnections } from "@oigamez/repositories";

export const communicateUserJoined = async (
  roomCode: string,
  username: string
): Promise<void> => {
  const roomConnections = await getRoomConnections(roomCode);
  const filteredConnections = roomConnections.filter(
    (rc) => rc.username !== username
  );

  await broadcast<UserJoinedCommunicationEvent>(
    filteredConnections,
    new UserJoinedCommunicationEvent(username)
  );
};
