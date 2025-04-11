import { EventBridgeEvent } from "aws-lambda";

import { HostChangeInternalEventBridgeEvent } from "@oigamez/communication";

import { validateEnvironment } from "./configuration/index.js";
import {
  communicateHostChanged,
  initializeLambda,
  publishExternalHostChangedEvent,
} from "./services/index.js";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-internal.change-host",
    HostChangeInternalEventBridgeEvent
  >
): Promise<void> => {
  const { roomCode, oldHostUsername, newHostUsername, gameTypeId } =
    event.detail;

  await communicateHostChanged(roomCode, oldHostUsername, newHostUsername);
  await publishExternalHostChangedEvent(
    roomCode,
    oldHostUsername,
    newHostUsername,
    gameTypeId
  );
};
