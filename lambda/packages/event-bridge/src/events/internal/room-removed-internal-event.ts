import { EventBridgeInternalEvent } from "./event-bridge-internal-event";
import { EventBridgeInternalEventType } from "./types";

export class RoomRemovedInternalEvent extends EventBridgeInternalEvent {
  constructor(public roomCode: string, gameTypeId: number) {
    super(EventBridgeInternalEventType.roomRemoved, gameTypeId);
  }
}
