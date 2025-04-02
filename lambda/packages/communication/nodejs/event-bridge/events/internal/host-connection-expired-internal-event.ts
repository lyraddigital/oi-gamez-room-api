import { EventBridgeEvent } from "../event-bridge-event";

export class HostConnectionExpiredInternalEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public shouldRemoveRoom: boolean,
    gameTypeId: number
  ) {
    super("room-internal.host-connection-expired", gameTypeId);
  }
}
