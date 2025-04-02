import { EventBridgeEvent } from "../event-bridge-event";

export class RoomRemovedInternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public hostConnectionId: string | undefined,
    gameTypeId: number
  ) {
    super("room-internal.room-removed", gameTypeId);
  }
}
