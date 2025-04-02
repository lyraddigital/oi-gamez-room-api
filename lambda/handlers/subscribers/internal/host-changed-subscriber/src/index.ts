import { HostChangeInternalEvent } from "/opt/nodejs/oigamez-communication";
import { EventBridgeEvent } from "aws-lambda";

import { validateEnvironment } from "./configuration";
import {
  communicateHostChanged,
  initializeLambda,
  publishExternalHostChangedEvent,
} from "./services";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<"room-internal.change-host", HostChangeInternalEvent>
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
