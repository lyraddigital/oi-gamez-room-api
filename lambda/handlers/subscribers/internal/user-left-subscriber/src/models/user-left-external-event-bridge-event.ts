import { EventBridgeEvent } from "/opt/nodejs/oigamez-communication.js";

export class UserLeftExternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public isBelowMinimumUsers: boolean,
    gameTypeId: number
  ) {
    super("room.user-left", gameTypeId);
  }
}
