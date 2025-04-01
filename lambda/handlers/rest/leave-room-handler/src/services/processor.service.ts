import { Room, RoomConnection } from "/opt/nodejs/oigamez-core";
import { handleHostDisconnection, handleUserLeft } from "@oigamez/services";

import { LeaveRoomPayload } from "../models";

export const processLeavingRoom = async (
  room: Room,
  connections: RoomConnection[],
  payload: LeaveRoomPayload
): Promise<void> => {
  if (room.hostUsername === payload.username!) {
    const shouldRemoveRoom = room.curNumOfUsers === 1;

    await handleHostDisconnection(
      room,
      payload.username!,
      connections,
      shouldRemoveRoom,
      room.gameTypeId
    );
  } else {
    const userConnection = connections.find(
      (c) => c.username === payload!.username!
    );

    await handleUserLeft(
      room,
      payload.username!,
      userConnection?.connectionId,
      room.gameTypeId
    );
  }
};
