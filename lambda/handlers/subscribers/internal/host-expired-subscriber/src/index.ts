import { EventBridgeEvent } from "aws-lambda";

import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";
import { handleHostDisconnection } from "@oigamez/services";

import { HostConnectionExpiredInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication";

import { validateEnvironment } from "./configuration";
import { initializeLambda } from "./services";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-internal.host-connection-expired",
    HostConnectionExpiredInternalEventBridgeEvent
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
