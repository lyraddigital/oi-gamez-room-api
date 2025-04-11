import { EventBridgeEvent } from "@oigamez/communication";

export class RoomCreatedExternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public hostUsername: string,
    gameTypeId: number
  ) {
    super("room.room-created", gameTypeId);
  }
}
