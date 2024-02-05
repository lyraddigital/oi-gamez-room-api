import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class EnableGameStartCommunicationEvent extends CommunicationEvent {
  constructor() {
    super(CommunicationActionTypes.enableGameStart);
  }
}
