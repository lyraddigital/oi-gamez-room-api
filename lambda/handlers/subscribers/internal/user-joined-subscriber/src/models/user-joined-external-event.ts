import { EventBridgeEvent } from "@oigamez/event-bridge";

export class UserJoinedExternalEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public isBelowMinimumUsers: boolean,
    gameTypeId: number
  ) {
    super("room.user-joined", gameTypeId);
  }
}
