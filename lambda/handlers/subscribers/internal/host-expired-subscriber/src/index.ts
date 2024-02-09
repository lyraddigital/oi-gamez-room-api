import { EventBridgeEvent } from "aws-lambda";

import {
  EventBridgeInternalEventType,
  HostConnectionExpiredInternalEvent,
} from "@oigamez/event-bridge";
import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";
import { handleHostDisconnection } from "@oigamez/services";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.hostConnectionExpired,
    HostConnectionExpiredInternalEvent
  >
): Promise<void> => {
  const { roomCode, username, shouldRemoveRoom, gameTypeId } = event.detail;
  const connections = await getRoomConnections(roomCode);
  const room = await getRoomByCode(roomCode);

  await handleHostDisconnection(
    room!,
    username,
    connections,
    shouldRemoveRoom,
    gameTypeId
  );
};
