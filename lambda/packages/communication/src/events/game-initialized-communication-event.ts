import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class GameInitializedCommunicationEvent extends CommunicationEvent {
  constructor() {
    super(CommunicationActionTypes.gameInitialized);
  }
}
