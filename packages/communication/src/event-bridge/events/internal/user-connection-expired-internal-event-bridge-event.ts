import { EventBridgeEvent } from "../event-bridge-event.js";

export class UserConnectionExpiredInternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    gameTypeId: number
  ) {
    super("room-internal.user-connection-expired", gameTypeId);
  }
}
