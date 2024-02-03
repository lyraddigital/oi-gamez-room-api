import { UserLeftInternalEvent, publishEvents } from "@oigamez/event-bridge";
import { removeUserFromRoom } from "@oigamez/repositories";

export const handleUserLeft = async (
  roomCode: string,
  username: string,
  hostConnectionid: string | undefined,
  gameTypeId: number
): Promise<void> => {
  await removeUserFromRoom(roomCode, username);

  await publishEvents<UserLeftInternalEvent>([
    new UserLeftInternalEvent(roomCode, username, hostConnectionid, gameTypeId),
  ]);
};
