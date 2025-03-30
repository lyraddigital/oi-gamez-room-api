import { EventBridgeExternalEvent } from "@oigamez/event-bridge";

export class RoomCreatedExternalEvent extends EventBridgeExternalEvent {
  constructor(
    public roomCode: string,
    public hostUsername: string,
    gameTypeId: number
  ) {
    super("room.room-created", gameTypeId);
  }
}
