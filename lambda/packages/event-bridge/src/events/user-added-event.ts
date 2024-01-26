import { EventBridgeEvent } from "./event-bridge-event";
import { EventBridgeEventType } from "./types";

export class UserAddedEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public gameTypeId: number
  ) {
    super(EventBridgeEventType.userAdded);
  }
}
