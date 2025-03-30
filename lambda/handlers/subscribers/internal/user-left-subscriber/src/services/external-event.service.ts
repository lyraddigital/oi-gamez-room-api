import { publishExternalEvents } from "@oigamez/event-bridge";

import { UserLeftExternalEvent } from "../models";

export const publishExternalUserLeftEvent = async (
  roomCode: string,
  username: string,
  isBelowMinimumUsers: boolean,
  gameTypeId: number
): Promise<void> => {
  await publishExternalEvents<UserLeftExternalEvent>([
    new UserLeftExternalEvent(
      roomCode,
      username,
      isBelowMinimumUsers,
      gameTypeId
    ),
  ]);
};
