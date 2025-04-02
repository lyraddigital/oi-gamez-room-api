import { removeUserFromRoom } from "@oigamez/repositories";

import { Room } from "/opt/nodejs/oigamez-core";
import {
  UserLeftInternalEventBridgeEvent,
  publishInternalEvents,
} from "/opt/nodejs/oigamez-communication";

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
