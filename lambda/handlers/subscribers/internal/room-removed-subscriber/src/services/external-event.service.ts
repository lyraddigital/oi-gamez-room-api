import { publishExternalEvents } from "/opt/nodejs/oigamez-communication";

import { RoomRemovedExternalEvent } from "../models";

export const publishExternalRoomRemovedEvent = async (
  roomCode: string,
  gameTypeId: number
): Promise<void> => {
  await publishExternalEvents<RoomRemovedExternalEvent>([
    new RoomRemovedExternalEvent(roomCode, gameTypeId),
  ]);
};
