import { broadcast } from "/opt/nodejs/oigamez-communication.js";
import { getRoomConnections } from "/opt/nodejs/oigamez-data.js";
import { getConnectionIdsFromConnections } from "/opt/nodejs/oigamez-services.js";
import {
  HostChangeWebsocketEvent,
  HostTransferWebsocketEvent,
} from "../models/index.js";

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

  const hostChangingPromise = broadcast<HostChangeWebsocketEvent>(
    otherUserConnectionIds,
    new HostChangeWebsocketEvent(oldHostUsername, newHostUsername)
  );

  const hostTransferPromise = broadcast<HostTransferWebsocketEvent>(
    newHostConnectionIds,
    new HostTransferWebsocketEvent()
  );

  await Promise.allSettled([hostChangingPromise, hostTransferPromise]);
};
