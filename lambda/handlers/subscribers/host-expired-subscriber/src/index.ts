import { EventBridgeEvent } from "aws-lambda";

import {
  EventBridgeInternalEventType,
  HostConnectionExpiredInternalEvent,
} from "@oigamez/event-bridge";
import {
  getRoomConnections,
  removeUserConnection,
} from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.hostConnectionExpired,
    HostConnectionExpiredInternalEvent
  >
): Promise<void> => {
  const { roomCode, username, shouldRemoveRoom } = event.detail;
  const connections = await getRoomConnections(roomCode);

  if (shouldRemoveRoom) {
    // await clearRoomData(roomCode, connections);
    // await sendCommunicationEvent();
  } else {
    await removeUserConnection(roomCode, username);
  }
};
