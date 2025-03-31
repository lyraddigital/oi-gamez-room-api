import { EventBridgeEvent } from "../event-bridge-event";

export class UserConnectionExpiredInternalEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    gameTypeId: number
  ) {
    super("room-internal.user-connection-expired", gameTypeId);
  }
}
