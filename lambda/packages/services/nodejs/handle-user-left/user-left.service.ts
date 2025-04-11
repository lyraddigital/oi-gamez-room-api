import { Room } from "@oigamez/core";
import {
  UserLeftInternalEventBridgeEvent,
  publishInternalEvents,
} from "@oigamez/communication";
import { removeUserFromRoom } from "@oigamez/data";

export const handleUserLeft = async (
  room: Room,
  username: string,
  connectionId: string | undefined,
  gameTypeId: number
): Promise<void> => {
  await removeUserFromRoom(room, username);

  await publishInternalEvents<UserLeftInternalEventBridgeEvent>([
    new UserLeftInternalEventBridgeEvent(
      room.code,
      username,
      connectionId,
      gameTypeId
    ),
  ]);
};
