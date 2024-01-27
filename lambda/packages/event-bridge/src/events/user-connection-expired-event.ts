import { EventBridgeEvent } from "./event-bridge-event";
import { EventBridgeEventType } from "./types";

export class UserConnectionExpiredEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    gameTypeId: number
  ) {
    super(EventBridgeEventType.userConnectionExpired, gameTypeId);
  }
}
