import { EventBridgeEvent } from "aws-lambda";

import { disconnectAllConnections } from "@oigamez/communication";
import {
  EventBridgeEventType,
  HostConnectionExpiredEvent,
} from "@oigamez/event-bridge";
import {
  clearRoomData,
  getRoomConnections,
  removeUserConnection,
} from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

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

    await sendCommunicationEvent();
  } else {
    await removeUserConnection(roomCode, username);
  }
};
