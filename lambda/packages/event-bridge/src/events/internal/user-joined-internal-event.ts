import { EventBridgeInternalEvent } from "./event-bridge-internal-event";
import { EventBridgeInternalEventType } from "./types";

export class UserJoinedInternalEvent extends EventBridgeInternalEvent {
  constructor(
    public roomCode: string,
    public username: string,
    gameTypeId: number
  ) {
    super(EventBridgeInternalEventType.userJoined, gameTypeId);
  }
}
