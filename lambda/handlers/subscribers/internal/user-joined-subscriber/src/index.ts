import { EventBridgeEvent } from "aws-lambda";

import { UserJoinedInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication.js";

import { validateEnvironment } from "./configuration/index.js";
import {
  communicateUserJoined,
  initializeLambda,
  publishExternalUserJoinedEvent,
} from "./services/index.js";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-internal.user-joined",
    UserJoinedInternalEventBridgeEvent
  >
): Promise<void> => {
  const { roomCode, username, gameTypeId } = event.detail;

  await communicateUserJoined(roomCode, username);
  await publishExternalUserJoinedEvent(roomCode, username, gameTypeId);
};
