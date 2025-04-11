import { Room } from "/opt/nodejs/oigamez-core.js";
import { getRoomConnections } from "/opt/nodejs/oigamez-data.js";
import {
  broadcast,
  closeConnection,
} from "/opt/nodejs/oigamez-communication.js";
import { getConnectionIdsFromConnections } from "/opt/nodejs/oigamez-services.js";
import {
  DisableGameStartWebsocketEvent,
  UserLeftWebsocketEvent,
} from "../models/index.js";

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
