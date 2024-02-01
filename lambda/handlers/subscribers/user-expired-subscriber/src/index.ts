import { EventBridgeEvent } from "aws-lambda";

import {
  EventBridgeInternalEventType,
  UserConnectionExpiredInternalEvent,
} from "@oigamez/event-bridge";
import { removeUserConnection } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.userConnectionExpired,
    UserConnectionExpiredInternalEvent
  >
): Promise<void> => {
  const { roomCode, username } = event.detail;
  await removeUserConnection(roomCode, username);
};
