import { EventBridgeInternalEvent } from "./event-bridge-internal-event";
import { EventBridgeInternalEventType } from "./types";

export class RoomRemovedInternalEvent extends EventBridgeInternalEvent {
  constructor(
    public roomCode: string,
    public hostConnectionId: string | undefined,
    gameTypeId: number
  ) {
    super(EventBridgeInternalEventType.roomRemoved, gameTypeId);
  }
}
