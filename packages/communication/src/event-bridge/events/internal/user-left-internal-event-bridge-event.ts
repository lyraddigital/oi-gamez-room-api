import { EventBridgeEvent } from "../event-bridge-event.js";

export class UserLeftInternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public connectionId: string | undefined,
    gameTypeId: number
  ) {
    super("room-internal.user-left", gameTypeId);
  }
}
