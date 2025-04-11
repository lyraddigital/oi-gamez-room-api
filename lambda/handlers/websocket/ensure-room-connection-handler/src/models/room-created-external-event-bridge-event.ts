import { EventBridgeEvent } from "/opt/nodejs/oigamez-communication.js";

export class RoomCreatedExternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public hostUsername: string,
    gameTypeId: number
  ) {
    super("room.room-created", gameTypeId);
  }
}
