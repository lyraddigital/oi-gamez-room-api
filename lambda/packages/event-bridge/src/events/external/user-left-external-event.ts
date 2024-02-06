import { EventBridgeExternalEvent } from "./event-bridge-external-event";
import { EventBridgeExternalEventType } from "./types";

export class UserLeftExternalEvent extends EventBridgeExternalEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public isBelowMinimumUsers: boolean,
    gameTypeId: number
  ) {
    super(EventBridgeExternalEventType.userLeft, gameTypeId);
  }
}
