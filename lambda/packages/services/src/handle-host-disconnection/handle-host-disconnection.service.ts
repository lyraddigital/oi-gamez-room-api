import {
  HostChangeInternalEvent,
  RoomRemovedInternalEvent,
  publishInternalEvents,
} from "@oigamez/event-bridge";
import { Room, RoomConnection } from "@oigamez/models";
import { removeRoomAndHost, updateRoomHost } from "@oigamez/repositories";

import { handleUserLeft } from "../handle-user-left";

const changeHost = async (
  room: Room,
  hostUsername: string,
  hostConnectionId: string | undefined,
  otherConnections: RoomConnection[],
  gameTypeId: number
): Promise<void> => {
  await handleUserLeft(room, hostUsername, hostConnectionId, gameTypeId);

  const nextHostUsername =
    otherConnections.length > 0 ? otherConnections[0]?.username : undefined;

  if (nextHostUsername) {
    await updateRoomHost(room.code, nextHostUsername);
    await publishInternalEvents<HostChangeInternalEvent>([
      new HostChangeInternalEvent(
        room.code,
        hostUsername,
        nextHostUsername,
        gameTypeId
      ),
    ]);
  }
};

const closeRoom = async (
  roomCode: string,
  hostUsername: string,
  hostConnectionId: string | undefined,
  gameTypeId: number
): Promise<void> => {
  await removeRoomAndHost(roomCode, hostUsername);

  await publishInternalEvents<RoomRemovedInternalEvent>([
    new RoomRemovedInternalEvent(roomCode, hostConnectionId, gameTypeId),
  ]);
};

export const handleHostDisconnection = async (
  room: Room,
  username: string,
  connections: RoomConnection[],
  shouldRemoveRoom: boolean,
  gameTypeId: number
): Promise<void> => {
  const hostConnectionId = connections.find(
    (c) => c.username === username
  )?.connectionId;

  if (shouldRemoveRoom) {
    await closeRoom(room.code, username, hostConnectionId, gameTypeId);
  } else {
    const otherConnections = connections.filter((c) => c.username !== username);

    await changeHost(
      room,
      username,
      hostConnectionId,
      otherConnections,
      gameTypeId
    );
  }
};
