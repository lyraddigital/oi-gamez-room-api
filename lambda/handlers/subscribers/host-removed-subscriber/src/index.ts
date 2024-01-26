import { EventBridgeEvent } from "aws-lambda";

import {
  clearRoomData,
  getRoomConnections,
  removeUserConnection,
} from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";
import { EventBridgeEventType, HostRemovedEvent } from "@oigamez/event-bridge";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<EventBridgeEventType.hostRemoved, HostRemovedEvent>
): Promise<void> => {
  const { roomCode, hostUsername, shouldRemoveRoom } = event.detail;
  const connections = await getRoomConnections(roomCode);

  if (shouldRemoveRoom) {
    await clearRoomData(roomCode, connections);
  } else {
    await removeUserConnection(roomCode, hostUsername);
  }
};
