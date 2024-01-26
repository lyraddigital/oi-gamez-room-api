import { EventGridEvent } from "./event-grid-event";
import { EventGridEventType } from "./types";

export class RoomCreatedEvent extends EventGridEvent {
  constructor(
    public code: string,
    public host: string,
    public gameTypeId: number
  ) {
    super(EventGridEventType.roomCreated);
  }
}
