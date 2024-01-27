import { ActionTypes } from "./action-types";
import { CommunicationEvent } from "./communication-event";

export class UserLeftEvent extends CommunicationEvent {
  constructor(public username: string) {
    super(ActionTypes.userLeft);
  }
}
