import { EventBridgeEvent } from "aws-lambda";

import { UserConnectionExpiredInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication.js";
import { getRoomByCode } from "/opt/nodejs/oigamez-data.js";
import { handleUserLeft } from "/opt/nodejs/oigamez-services.js";

import { validateEnvironment } from "./configuration/index.js";
import { initializeLambda } from "./services/index.js";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-internal.user-connection-expired",
    UserConnectionExpiredInternalEventBridgeEvent
  >
): Promise<void> => {
  const { roomCode, username, gameTypeId } = event.detail;
  const room = await getRoomByCode(roomCode);

  await handleUserLeft(room!, username, undefined, gameTypeId);
};
