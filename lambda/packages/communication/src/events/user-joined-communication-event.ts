import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class UserJoinedCommunicationEvent extends CommunicationEvent {
  constructor(public username: string) {
    super(CommunicationActionTypes.userJoined);
  }
}
