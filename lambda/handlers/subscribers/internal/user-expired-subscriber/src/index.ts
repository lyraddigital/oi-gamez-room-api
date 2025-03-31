import { EventBridgeEvent } from "aws-lambda";

import { UserConnectionExpiredInternalEvent } from "@oigamez/event-bridge";
import { getRoomByCode } from "@oigamez/repositories";
import { handleUserLeft } from "@oigamez/services";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    "room-internal.user-connection-expired",
    UserConnectionExpiredInternalEvent
  >
): Promise<void> => {
  const { roomCode, username, gameTypeId } = event.detail;
  const room = await getRoomByCode(roomCode);

  await handleUserLeft(room!, username, undefined, gameTypeId);
};
