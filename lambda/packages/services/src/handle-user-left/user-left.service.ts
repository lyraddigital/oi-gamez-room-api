import {
  UserLeftInternalEvent,
  publishInternalEvents,
} from "@oigamez/event-bridge";
import { Room } from "/opt/nodejs/oigamez-core";
import { removeUserFromRoom } from "@oigamez/repositories";

export const handleUserLeft = async (
  room: Room,
  username: string,
  connectionId: string | undefined,
  gameTypeId: number
): Promise<void> => {
  await removeUserFromRoom(room, username);

  await publishInternalEvents<UserLeftInternalEvent>([
    new UserLeftInternalEvent(room.code, username, connectionId, gameTypeId),
  ]);
};
