import { Room, RoomStatus } from "@oigamez/core";
import {
  UserJoinedInternalEventBridgeEvent,
  publishInternalEvents,
} from "@oigamez/communication";

import {
  establishHostConnection,
  establishJoinerConnection,
  getRoomConnection,
} from "../repositories";
import { updateRoomStatus } from "@oigamez/data";

export const processRoomConnection = async (
  room: Room,
  isHost: boolean,
  username: string,
  connectionId: string,
  ttl: number
): Promise<void> => {
  if (isHost) {
    const isFirstHostConnection = room.status === RoomStatus.notAvailable;

    await establishHostConnection(
      room,
      username,
      connectionId,
      isFirstHostConnection,
      ttl
    );

    if (isFirstHostConnection) {
      // We will make a HTTP call in future to an initialization endpoint
      // for the game type to initialize a game
      await updateRoomStatus(room.code, RoomStatus.available);
    }
  } else {
    const existingConnection = await getRoomConnection(room.code, username);
    const isNewConnection = !existingConnection;

    await establishJoinerConnection(room, username, connectionId);

    if (room.status === RoomStatus.available && isNewConnection) {
      await publishInternalEvents<UserJoinedInternalEventBridgeEvent>([
        new UserJoinedInternalEventBridgeEvent(
          room.code,
          username,
          room.gameTypeId
        ),
      ]);
    }
  }
};
