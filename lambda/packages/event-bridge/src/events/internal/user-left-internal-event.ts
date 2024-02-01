import { EventBridgeInternalEvent } from "./event-bridge-internal-event";
import { EventBridgeInternalEventType } from "./types";

export class UserLeftInternalEvent extends EventBridgeInternalEvent {
  constructor(
    public roomCode: string,
    public username: string,
    gameTypeId: number
  ) {
    super(EventBridgeInternalEventType.userLeft, gameTypeId);
  }
}
