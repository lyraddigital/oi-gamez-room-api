import { broadcast, closeConnection } from "@oigamez/communication";
import { Room } from "/opt/nodejs/oigamez-core";
import { getRoomConnections } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import {
  DisableGameStartCommunicationEvent,
  UserLeftCommunicationEvent,
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

  await broadcast<UserLeftCommunicationEvent>(
    otherConnectionIds,
    new UserLeftCommunicationEvent(username)
  );

  if (isBelowMinimumUsers) {
    const hostConnections = roomConnections.filter(
      (c) => c.username === room?.hostUsername
    );
    const hostConnectionIds = getConnectionIdsFromConnections(hostConnections);

    if (username !== room?.hostUsername) {
      await broadcast<DisableGameStartCommunicationEvent>(
        hostConnectionIds,
        new DisableGameStartCommunicationEvent()
      );
    }
  }

  if (connectionId) {
    await closeConnection(connectionId);
  }
};
