import { publishExternalEvents } from "@oigamez/event-bridge";
import { getRoomByCode } from "@oigamez/repositories";

import { UserJoinedExternalEvent } from "../models";

export const publishExternalUserJoinedEvent = async (
  roomCode: string,
  username: string,
  gameTypeId: number
): Promise<void> => {
  const room = await getRoomByCode(roomCode);
  const isBelowMinimumUsers = !!room && room.curNumOfUsers < room.minNumOfUsers;

  await publishExternalEvents<UserJoinedExternalEvent>([
    new UserJoinedExternalEvent(
      roomCode,
      username,
      isBelowMinimumUsers,
      gameTypeId
    ),
  ]);
};
