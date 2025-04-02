import { EventBridgeEvent } from "../event-bridge-event";

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
