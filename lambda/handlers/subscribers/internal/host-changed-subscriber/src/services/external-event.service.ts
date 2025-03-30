import { publishExternalEvents } from "@oigamez/event-bridge";

import { HostChangeExternalEvent } from "../models";

export const publishExternalHostChangedEvent = async (
  roomCode: string,
  oldHostUsername: string,
  newHostUsername: string,
  gameTypeId: number
): Promise<void> => {
  await publishExternalEvents<HostChangeExternalEvent>([
    new HostChangeExternalEvent(
      roomCode,
      oldHostUsername,
      newHostUsername,
      gameTypeId
    ),
  ]);
};
