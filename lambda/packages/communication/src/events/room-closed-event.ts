import { ActionTypes } from "./action-types";
import { CommunicationEvent } from "./communication-event";

export class RoomClosedEvent extends CommunicationEvent {
  constructor() {
    super(ActionTypes.roomClosed);
  }
}
