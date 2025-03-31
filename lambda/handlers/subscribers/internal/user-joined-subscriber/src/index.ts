import { EventBridgeEvent } from "aws-lambda";

import { UserJoinedInternalEvent } from "@oigamez/event-bridge";

import { validateEnvironment } from "./configuration";
import {
  communicateUserJoined,
  publishExternalUserJoinedEvent,
} from "./services";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<"room-internal.user-joined", UserJoinedInternalEvent>
): Promise<void> => {
  const { roomCode, username, gameTypeId } = event.detail;

  await communicateUserJoined(roomCode, username);
  await publishExternalUserJoinedEvent(roomCode, username, gameTypeId);
};
