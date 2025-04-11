import { publishExternalEvents } from "/opt/nodejs/oigamez-communication.js";

import { RoomRemovedExternalEventBridgeEvent } from "../models/index.js";

export const publishExternalRoomRemovedEvent = async (
  roomCode: string,
  gameTypeId: number
): Promise<void> => {
  await publishExternalEvents<RoomRemovedExternalEventBridgeEvent>([
    new RoomRemovedExternalEventBridgeEvent(roomCode, gameTypeId),
  ]);
};
