import { EventBridgeEvent } from "@oigamez/event-bridge";

export class RoomRemovedExternalEvent extends EventBridgeEvent {
  constructor(public roomCode: string, gameTypeId: number) {
    super("room.room-removed", gameTypeId);
  }
}
