import { EventBridgeEvent } from "aws-lambda";

import { UserJoinedInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication";

import { validateEnvironment } from "./configuration";
import {
  communicateUserJoined,
  initializeLambda,
  publishExternalUserJoinedEvent,
} from "./services";

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
