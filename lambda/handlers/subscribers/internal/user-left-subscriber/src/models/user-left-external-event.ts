import { EventBridgeExternalEvent } from "@oigamez/event-bridge";

export class UserLeftExternalEvent extends EventBridgeExternalEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public isBelowMinimumUsers: boolean,
    gameTypeId: number
  ) {
    super("room.user-left", gameTypeId);
  }
}
