import {
  RoomRemovedExternalEvent,
  publishExternalEvents,
} from "@oigamez/event-bridge";

export const publishExternalRoomRemovedEvent = async (
  roomCode: string,
  gameTypeId: number
): Promise<void> => {
  await publishExternalEvents<RoomRemovedExternalEvent>([
    new RoomRemovedExternalEvent(roomCode, gameTypeId),
  ]);
};
