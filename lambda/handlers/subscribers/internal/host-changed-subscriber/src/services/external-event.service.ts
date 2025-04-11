import { publishExternalEvents } from "/opt/nodejs/oigamez-communication.js";

import { HostChangeExternalEventBridgeEvent } from "../models/index.js";

export const publishExternalHostChangedEvent = async (
  roomCode: string,
  oldHostUsername: string,
  newHostUsername: string,
  gameTypeId: number
): Promise<void> => {
  await publishExternalEvents<HostChangeExternalEventBridgeEvent>([
    new HostChangeExternalEventBridgeEvent(
      roomCode,
      oldHostUsername,
      newHostUsername,
      gameTypeId
    ),
  ]);
};
