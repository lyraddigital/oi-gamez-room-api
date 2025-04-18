import { EventBridgeEvent } from "@oigamez/communication";

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
