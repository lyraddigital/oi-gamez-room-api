import { EventGridEvent } from "./event-grid-event";

export class UserAddedEvent extends EventGridEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public gameTypeId: number
  ) {
    super("room.user-added");
  }
}
