import {
  UserLeftInternalEvent,
  publishInternalEvents,
} from "@oigamez/event-bridge";
import { removeUserFromRoom } from "@oigamez/repositories";

export const handleUserLeft = async (
  roomCode: string,
  username: string,
  connectionId: string | undefined,
  gameTypeId: number
): Promise<void> => {
  await removeUserFromRoom(roomCode, username);

  await publishInternalEvents<UserLeftInternalEvent>([
    new UserLeftInternalEvent(roomCode, username, connectionId, gameTypeId),
  ]);
};
