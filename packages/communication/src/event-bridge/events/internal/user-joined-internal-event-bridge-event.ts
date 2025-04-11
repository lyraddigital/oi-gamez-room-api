import { EventBridgeEvent } from "../event-bridge-event.js";

export class UserJoinedInternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    gameTypeId: number
  ) {
    super("room-internal.user-joined", gameTypeId);
  }
}
