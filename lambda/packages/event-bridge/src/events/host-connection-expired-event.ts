import { EventBridgeEvent } from "./event-bridge-event";
import { EventBridgeEventType } from "./types";

export class HostConnectionExpiredEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public shouldRemoveRoom: boolean,
    gameTypeId: number
  ) {
    super(EventBridgeEventType.hostConnectionExpired, gameTypeId);
  }
}
