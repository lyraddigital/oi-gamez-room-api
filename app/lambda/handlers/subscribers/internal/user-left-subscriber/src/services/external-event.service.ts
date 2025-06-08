import { publishExternalEvents } from "@oigamez/communication";

import { UserLeftExternalEventBridgeEvent } from "../models";

export const publishExternalUserLeftEvent = async (
  roomCode: string,
  username: string,
  isBelowMinimumUsers: boolean,
  gameTypeId: number
): Promise<void> => {
  await publishExternalEvents<UserLeftExternalEventBridgeEvent>([
    new UserLeftExternalEventBridgeEvent(
      roomCode,
      username,
      isBelowMinimumUsers,
      gameTypeId
    ),
  ]);
};
