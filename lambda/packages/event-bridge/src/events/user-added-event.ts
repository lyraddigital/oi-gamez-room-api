import { EventGridEvent } from "./event-grid-event";
import { EventGridEventType } from "./types";

export class UserAddedEvent extends EventGridEvent {
  constructor(
    public roomCode: string,
    public username: string,
    public gameTypeId: number
  ) {
    super(EventGridEventType.userAdded);
  }
}
