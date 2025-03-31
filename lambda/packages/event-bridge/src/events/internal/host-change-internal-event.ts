import { EventBridgeEvent } from "../event-bridge-event";

export class HostChangeInternalEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public oldHostUsername: string,
    public newHostUsername: string,
    gameTypeId: number
  ) {
    super("room-internal.change-host", gameTypeId);
  }
}
