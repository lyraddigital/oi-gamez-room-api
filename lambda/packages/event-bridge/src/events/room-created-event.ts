import { EventGridEvent } from "./event-grid-event";

export class RoomCreatedEvent extends EventGridEvent {
  constructor(
    public code: string,
    public host: string,
    public gameTypeId: number
  ) {
    super("room.room-created");
  }
}
