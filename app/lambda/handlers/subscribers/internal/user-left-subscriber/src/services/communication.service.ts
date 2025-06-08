import { Room } from "@oigamez/core";
import { getRoomConnections } from "@oigamez/data";
import { broadcast, closeConnection } from "@oigamez/communication";
import { getConnectionIdsFromConnections } from "@oigamez/services";
import {
  DisableGameStartWebsocketEvent,
  UserLeftWebsocketEvent,
} from "../models";

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
  const otherConnectionIds = getConnectionIdsFromConnections(otherConnections);

  await broadcast<UserLeftWebsocketEvent>(
    otherConnectionIds,
    new UserLeftWebsocketEvent(username)
  );

  if (isBelowMinimumUsers) {
    const hostConnections = roomConnections.filter(
      (c) => c.username === room?.hostUsername
    );
    const hostConnectionIds = getConnectionIdsFromConnections(hostConnections);

    if (username !== room?.hostUsername) {
      await broadcast<DisableGameStartWebsocketEvent>(
        hostConnectionIds,
        new DisableGameStartWebsocketEvent()
      );
    }
  }

  if (connectionId) {
    await closeConnection(connectionId);
  }
};
