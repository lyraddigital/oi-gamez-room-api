import { EventBridgeEvent } from "aws-lambda";

import { HostConnectionExpiredInternalEventBridgeEvent } from "@oigamez/communication";
import { getRoomByCode, getRoomConnections } from "@oigamez/data";
import { handleHostDisconnection } from "/opt/nodejs/oigamez-services.js";

import { validateEnvironment } from "./configuration/index.js";
import { initializeLambda } from "./services/index.js";

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
