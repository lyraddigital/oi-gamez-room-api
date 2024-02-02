import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class RoomRemovedCommunicationEvent extends CommunicationEvent {
  constructor(public roomCode: string) {
    super(CommunicationActionTypes.roomRemoved);
  }
}
