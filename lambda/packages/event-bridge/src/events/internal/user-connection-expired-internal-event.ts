import { EventBridgeInternalEvent } from "./event-bridge-internal-event";
import { EventBridgeInternalEventType } from "./types";

export class UserConnectionExpiredInternalEvent extends EventBridgeInternalEvent {
  constructor(
    public roomCode: string,
    public username: string,
    gameTypeId: number
  ) {
    super(EventBridgeInternalEventType.userConnectionExpired, gameTypeId);
  }
}
