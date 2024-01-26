import { EventBridgeEvent } from "./event-bridge-event";
import { EventBridgeEventType } from "./types";

export class UserRemovedEvent extends EventBridgeEvent {
  constructor(public roomCode: string, public username: string) {
    super(EventBridgeEventType.userRemoved);
  }
}
