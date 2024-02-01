import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class UserLeftCommunicationEvent extends CommunicationEvent {
  constructor(public username: string) {
    super(CommunicationActionTypes.userLeft);
  }
}
