import { broadcast } from "@oigamez/communication";
import { getRoomConnections } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import {
  HostChangeCommunicationEvent,
  HostTransferCommunicationEvent,
} from "../models";

export const communicateHostChanged = async (
  roomCode: string,
  oldHostUsername: string,
  newHostUsername: string
): Promise<void> => {
  const roomConnections = await getRoomConnections(roomCode);
  const otherUserConnections = roomConnections.filter(
    (c) => c.username !== newHostUsername
  );
  const newHostConnections = roomConnections.filter(
    (c) => c.username === newHostUsername
  );
  const otherUserConnectionIds =
    getConnectionIdsFromConnections(otherUserConnections);
  const newHostConnectionIds =
    getConnectionIdsFromConnections(newHostConnections);

  const hostChangingPromise = broadcast<HostChangeCommunicationEvent>(
    otherUserConnectionIds,
    new HostChangeCommunicationEvent(oldHostUsername, newHostUsername)
  );

  const hostTransferPromise = broadcast<HostTransferCommunicationEvent>(
    newHostConnectionIds,
    new HostTransferCommunicationEvent()
  );

  await Promise.allSettled([hostChangingPromise, hostTransferPromise]);
};
