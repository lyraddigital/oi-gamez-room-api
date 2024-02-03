import {
  HostChangeInternalEvent,
  RoomRemovedInternalEvent,
  publishInternalEvents,
} from "@oigamez/event-bridge";
import { RoomConnection } from "@oigamez/models";
import { removeRoomAndHost, updateRoomHost } from "@oigamez/repositories";

import { handleUserLeft } from "../handle-user-left";

const changeHost = async (
  roomCode: string,
  hostUsername: string,
  hostConnectionId: string | undefined,
  otherConnections: RoomConnection[],
  gameTypeId: number
): Promise<void> => {
  await handleUserLeft(roomCode, hostUsername, hostConnectionId, gameTypeId);

  const nextHostUsername =
    otherConnections.length > 0 ? otherConnections[0]?.username : undefined;

  if (nextHostUsername) {
    await updateRoomHost(roomCode, nextHostUsername);
    await publishInternalEvents<HostChangeInternalEvent>([
      new HostChangeInternalEvent(
        roomCode,
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
  roomCode: string,
  username: string,
  connections: RoomConnection[],
  shouldRemoveRoom: boolean,
  gameTypeId: number
): Promise<void> => {
  const hostConnectionId = connections.find(
    (c) => c.username === username
  )?.connectionId;

  if (shouldRemoveRoom) {
    await closeRoom(roomCode, username, hostConnectionId, gameTypeId);
  } else {
    const otherConnections = connections.filter((c) => c.username !== username);

    await changeHost(
      roomCode,
      username,
      hostConnectionId,
      otherConnections,
      gameTypeId
    );
  }
};
