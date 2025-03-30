import {
  UserJoinedInternalEvent,
  publishExternalEvents,
  publishInternalEvents,
} from "@oigamez/event-bridge";
import { Room, RoomStatus } from "@oigamez/models";

import { RoomCreatedExternalEvent } from "../models";
import {
  establishHostConnection,
  establishJoinerConnection,
  getRoomConnection,
} from "../repositories";

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
      await publishExternalEvents([
        new RoomCreatedExternalEvent(room.code, username, room.gameTypeId),
      ]);
    }
  } else {
    const existingConnection = await getRoomConnection(room.code, username);
    const isNewConnection = !existingConnection;

    await establishJoinerConnection(room, username, connectionId);

    if (room.status === RoomStatus.available && isNewConnection) {
      await publishInternalEvents<UserJoinedInternalEvent>([
        new UserJoinedInternalEvent(room.code, username, room.gameTypeId),
      ]);
    }
  }
};
