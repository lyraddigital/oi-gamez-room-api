import { CommunicationEvent } from "@oigamez/communication";

export class GameInitializedCommunicationEvent extends CommunicationEvent {
  constructor() {
    super("gameInitialized");
  }
}
