import { EventBridgeEvent } from "aws-lambda";

import {
  EventBridgeInternalEventType,
  HostConnectionExpiredInternalEvent,
} from "@oigamez/event-bridge";

import { validateEnvironment } from "./configuration";
import { handleHostDisconnection } from "@oigamez/services";
import { getRoomConnections } from "@oigamez/repositories";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.hostConnectionExpired,
    HostConnectionExpiredInternalEvent
  >
): Promise<void> => {
  const { roomCode, username, shouldRemoveRoom, gameTypeId } = event.detail;
  const connections = await getRoomConnections(roomCode);

  await handleHostDisconnection(
    roomCode,
    username,
    connections,
    shouldRemoveRoom,
    gameTypeId
  );
};
