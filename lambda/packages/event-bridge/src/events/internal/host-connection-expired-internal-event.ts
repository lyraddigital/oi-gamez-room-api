import { EventBridgeInternalEvent } from "./event-bridge-internal-event";
import { EventBridgeInternalEventType } from "./types";

export class HostConnectionExpiredInternalEvent extends EventBridgeInternalEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public shouldRemoveRoom: boolean,
    gameTypeId: number
  ) {
    super(EventBridgeInternalEventType.hostConnectionExpired, gameTypeId);
  }
}
