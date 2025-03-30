import { EventBridgeExternalEvent } from "@oigamez/event-bridge";

export class RoomRemovedExternalEvent extends EventBridgeExternalEvent {
  constructor(public roomCode: string, gameTypeId: number) {
    super("room.room-removed", gameTypeId);
  }
}
