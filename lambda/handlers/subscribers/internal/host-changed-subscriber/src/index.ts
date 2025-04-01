import { EventBridgeEvent } from "aws-lambda";
import { HostChangeInternalEvent } from "@oigamez/event-bridge";

import { validateEnvironment } from "./configuration";
import {
  communicateHostChanged,
  publishExternalHostChangedEvent,
} from "./services";

validateEnvironment();

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
