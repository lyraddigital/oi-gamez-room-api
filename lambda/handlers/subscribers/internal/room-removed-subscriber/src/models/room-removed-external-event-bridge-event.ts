import { EventBridgeEvent } from "@oigamez/communication";

export class RoomRemovedExternalEventBridgeEvent extends EventBridgeEvent {
  constructor(public roomCode: string, gameTypeId: number) {
    super("room.room-removed", gameTypeId);
  }
}
