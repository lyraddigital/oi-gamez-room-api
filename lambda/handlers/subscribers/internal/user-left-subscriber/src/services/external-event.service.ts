import { publishExternalEvents } from "/opt/nodejs/oigamez-communication.js";

import { UserLeftExternalEventBridgeEvent } from "../models/index.js";

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
