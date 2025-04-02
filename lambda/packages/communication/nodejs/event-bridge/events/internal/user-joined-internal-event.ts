import { EventBridgeEvent } from "../event-bridge-event";

export class UserJoinedInternalEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    gameTypeId: number
  ) {
    super("room-internal.user-joined", gameTypeId);
  }
}
