import { publishExternalEvents } from "/opt/nodejs/oigamez-communication";
import { getRoomByCode } from "/opt/nodejs/oigamez-data";

import { UserJoinedExternalEventBridgeEvent } from "../models";

export const publishExternalUserJoinedEvent = async (
  roomCode: string,
  username: string,
  gameTypeId: number
): Promise<void> => {
  const room = await getRoomByCode(roomCode);
  const isBelowMinimumUsers = !!room && room.curNumOfUsers < room.minNumOfUsers;

  await publishExternalEvents<UserJoinedExternalEventBridgeEvent>([
    new UserJoinedExternalEventBridgeEvent(
      roomCode,
      username,
      isBelowMinimumUsers,
      gameTypeId
    ),
  ]);
};
