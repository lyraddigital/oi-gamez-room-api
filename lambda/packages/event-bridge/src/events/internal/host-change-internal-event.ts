import { EventBridgeInternalEvent } from "./event-bridge-internal-event";
import { EventBridgeInternalEventType } from "./types";

export class HostChangeInternalEvent extends EventBridgeInternalEvent {
  constructor(
    public roomCode: string,
    public oldHostUsername: string,
    public newHostUsername: string,
    gameTypeId: number
  ) {
    super(EventBridgeInternalEventType.hostChanged, gameTypeId);
  }
}
