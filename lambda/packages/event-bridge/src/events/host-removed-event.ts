import { EventBridgeEvent } from "./event-bridge-event";
import { EventBridgeEventType } from "./types";

export class HostRemovedEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public hostUsername: string,
    public shouldRemoveRoom: boolean
  ) {
    super(EventBridgeEventType.hostRemoved);
  }
}
