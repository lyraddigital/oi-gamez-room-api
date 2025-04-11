import { EventBridgeEvent } from "aws-lambda";

import { UserConnectionExpiredInternalEventBridgeEvent } from "@oigamez/communication";
import { getRoomByCode } from "@oigamez/data";
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
