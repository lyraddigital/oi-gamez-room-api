import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class GameStartedCommunicationEvent extends CommunicationEvent {
  constructor() {
    super(CommunicationActionTypes.gameStarted);
  }
}
