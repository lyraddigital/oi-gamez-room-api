import {
  DisableGameStartCommunicationEvent,
  UserLeftCommunicationEvent,
  broadcast,
  closeConnection,
} from "@oigamez/communication";
import { Room } from "@oigamez/models";
import { getRoomConnections } from "@oigamez/repositories";

export const communicateUserLeft = async (
  roomCode: string,
  username: string,
  room: Room | undefined,
  isBelowMinimumUsers: boolean,
  connectionId?: string
): Promise<void> => {
  const roomConnections = await getRoomConnections(roomCode);
  const otherConnections = roomConnections.filter(
    (c) => c.username !== username
  );

  await broadcast<UserLeftCommunicationEvent>(
    otherConnections,
    new UserLeftCommunicationEvent(username)
  );

  if (isBelowMinimumUsers) {
    const hostConnections = roomConnections.filter(
      (c) => c.username === room?.hostUsername
    );

    if (username !== room?.hostUsername) {
      await broadcast<DisableGameStartCommunicationEvent>(
        hostConnections,
        new DisableGameStartCommunicationEvent()
      );
    }
  }

  if (connectionId) {
    await closeConnection(connectionId);
  }
};
