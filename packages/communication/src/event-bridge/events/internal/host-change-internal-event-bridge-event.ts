import { EventBridgeEvent } from "../event-bridge-event.js";

export class HostChangeInternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public oldHostUsername: string,
    public newHostUsername: string,
    gameTypeId: number
  ) {
    super("room-internal.change-host", gameTypeId);
  }
}
