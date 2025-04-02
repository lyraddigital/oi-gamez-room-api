import { EventBridgeEvent } from "aws-lambda";

import { UserJoinedInternalEvent } from "@oigamez/event-bridge";

import { validateEnvironment } from "./configuration";
import {
  communicateUserJoined,
  initializeLambda,
  publishExternalUserJoinedEvent,
} from "./services";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<"room-internal.user-joined", UserJoinedInternalEvent>
): Promise<void> => {
  const { roomCode, username, gameTypeId } = event.detail;

  await communicateUserJoined(roomCode, username);
  await publishExternalUserJoinedEvent(roomCode, username, gameTypeId);
};
