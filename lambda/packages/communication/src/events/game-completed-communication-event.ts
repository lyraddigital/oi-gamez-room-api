import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class GameCompletedCommunicationEvent extends CommunicationEvent {
  constructor() {
    super(CommunicationActionTypes.gameCompleted);
  }
}
