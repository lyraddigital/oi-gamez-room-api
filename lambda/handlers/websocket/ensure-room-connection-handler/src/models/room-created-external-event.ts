import { EventBridgeEvent } from "@oigamez/event-bridge";

export class RoomCreatedExternalEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public hostUsername: string,
    gameTypeId: number
  ) {
    super("room.room-created", gameTypeId);
  }
}
