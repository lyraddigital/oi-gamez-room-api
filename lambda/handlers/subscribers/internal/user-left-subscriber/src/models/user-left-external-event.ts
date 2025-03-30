import { EventBridgeEvent } from "@oigamez/event-bridge";

export class UserLeftExternalEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public isBelowMinimumUsers: boolean,
    gameTypeId: number
  ) {
    super("room.user-left", gameTypeId);
  }
}
