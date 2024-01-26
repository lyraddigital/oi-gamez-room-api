import { EventBridgeEvent } from "aws-lambda";

import { EventBridgeEventType } from "@oigamez/event-bridge";
import { UserConnectionDetail } from "@oigamez/models";
import { removeUserConnection } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeEventType.userRemoved,
    UserConnectionDetail
  >
): Promise<void> => {
  const { roomCode, username } = event.detail;
  await removeUserConnection(roomCode, username);
};
