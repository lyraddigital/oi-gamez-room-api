import { publishExternalEvents } from "/opt/nodejs/oigamez-communication";

import { RoomRemovedExternalEventBridgeEvent } from "../models";

export const publishExternalRoomRemovedEvent = async (
  roomCode: string,
  gameTypeId: number
): Promise<void> => {
  await publishExternalEvents<RoomRemovedExternalEventBridgeEvent>([
    new RoomRemovedExternalEventBridgeEvent(roomCode, gameTypeId),
  ]);
};
