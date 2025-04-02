import { publishExternalEvents } from "/opt/nodejs/oigamez-communication";

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
