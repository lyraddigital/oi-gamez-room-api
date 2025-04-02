import { getRoomByCode } from "@oigamez/repositories";
import { handleUserLeft } from "@oigamez/services";
import { EventBridgeEvent } from "aws-lambda";

import { UserConnectionExpiredInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication";

import { validateEnvironment } from "./configuration";
import { initializeLambda } from "./services";

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
