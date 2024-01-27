import { ActionTypes } from "./action-types";
import { CommunicationEvent } from "./communication-event";

export class UserJoinedEvent extends CommunicationEvent {
  constructor(public username: string) {
    super(ActionTypes.userJoined);
  }
}
