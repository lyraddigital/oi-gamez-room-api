import { EventBridgeEvent } from "@oigamez/communication";

export class UserJoinedExternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public isBelowMinimumUsers: boolean,
    gameTypeId: number
  ) {
    super("room.user-joined", gameTypeId);
  }
}
