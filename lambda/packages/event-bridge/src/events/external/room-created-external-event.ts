import { EventBridgeExternalEvent } from "./event-bridge-external-event";
import { EventBridgeExternalEventType } from "./types";

export class RoomCreatedExternalEvent extends EventBridgeExternalEvent {
  constructor(
    public roomCode: string,
    public hostUsername: string,
    gameTypeId: number
  ) {
    super(EventBridgeExternalEventType.roomCreated, gameTypeId);
  }
}
