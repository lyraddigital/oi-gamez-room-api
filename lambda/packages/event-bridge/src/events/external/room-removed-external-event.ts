import { EventBridgeExternalEvent } from "./event-bridge-external-event";
import { EventBridgeExternalEventType } from "./types";

export class RoomRemovedExternalEvent extends EventBridgeExternalEvent {
  constructor(public roomCode: string, gameTypeId: number) {
    super(EventBridgeExternalEventType.roomRemoved, gameTypeId);
  }
}
