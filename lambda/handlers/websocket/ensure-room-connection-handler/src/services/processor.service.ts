import { Room, RoomStatus } from "/opt/nodejs/oigamez-core";
import {
  UserJoinedInternalEventBridgeEvent,
  publishExternalEvents,
  publishInternalEvents,
} from "/opt/nodejs/oigamez-communication";

import { RoomCreatedExternalEventBridgeEvent } from "../models";
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
        new RoomCreatedExternalEventBridgeEvent(
          room.code,
          username,
          room.gameTypeId
        ),
      ]);
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
