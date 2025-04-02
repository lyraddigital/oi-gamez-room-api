import { EventBridgeEvent } from "/opt/nodejs/oigamez-communication";

export class RoomCreatedExternalEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public hostUsername: string,
    gameTypeId: number
  ) {
    super("room.room-created", gameTypeId);
  }
}
