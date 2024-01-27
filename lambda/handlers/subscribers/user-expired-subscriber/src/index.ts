import { EventBridgeEvent } from "aws-lambda";

import {
  EventBridgeEventType,
  UserConnectionExpiredEvent,
} from "@oigamez/event-bridge";
import { removeUserConnection } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeEventType.userConnectionExpired,
    UserConnectionExpiredEvent
  >
): Promise<void> => {
  const { roomCode, username } = event.detail;
  await removeUserConnection(roomCode, username);
};
