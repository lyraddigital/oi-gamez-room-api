import { EventBridgeEvent } from "aws-lambda";

import {
  clearRoomData,
  getRoomConnections,
  removeUserConnection,
} from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";
import {
  EventBridgeEventType,
  HostConnectionExpiredEvent,
} from "@oigamez/event-bridge";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeEventType.hostConnectionExpired,
    HostConnectionExpiredEvent
  >
): Promise<void> => {
  const { roomCode, username, shouldRemoveRoom } = event.detail;
  const connections = await getRoomConnections(roomCode);

  if (shouldRemoveRoom) {
    await clearRoomData(roomCode, connections);
  } else {
    await removeUserConnection(roomCode, username);
  }
};
