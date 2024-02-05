import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class DisableGameStartCommunicationEvent extends CommunicationEvent {
  constructor() {
    super(CommunicationActionTypes.disableGameStart);
  }
}
