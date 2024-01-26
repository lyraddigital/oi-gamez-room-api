import { EventBridgeEvent } from "./event-bridge-event";
import { EventBridgeEventType } from "./types";

export class RoomCreatedEvent extends EventBridgeEvent {
  constructor(
    public code: string,
    public host: string,
    public gameTypeId: number
  ) {
    super(EventBridgeEventType.roomCreated);
  }
}
