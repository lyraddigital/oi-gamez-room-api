import { EventBridgeExternalEvent } from "./event-bridge-external-event";
import { EventBridgeExternalEventType } from "./types";

export class HostChangeExternalEvent extends EventBridgeExternalEvent {
  constructor(
    public roomCode: string,
    public oldHostUsername: string,
    public newHostUsername: string,
    gameTypeId: number
  ) {
    super(EventBridgeExternalEventType.hostChanged, gameTypeId);
  }
}
