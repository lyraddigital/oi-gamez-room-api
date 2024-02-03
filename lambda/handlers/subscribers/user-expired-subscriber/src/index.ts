import { EventBridgeEvent } from "aws-lambda";

import {
  EventBridgeInternalEventType,
  UserConnectionExpiredInternalEvent,
} from "@oigamez/event-bridge";
import { handleUserLeft } from "@oigamez/services";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.userConnectionExpired,
    UserConnectionExpiredInternalEvent
  >
): Promise<void> => {
  const { roomCode, username, gameTypeId } = event.detail;

  await handleUserLeft(roomCode, username, undefined, gameTypeId);
};
