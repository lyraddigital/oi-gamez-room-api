import { CommunicationEvent } from "@oigamez/communication";

export class GameStartedCommunicationEvent extends CommunicationEvent {
  constructor() {
    super("gameStarted");
  }
}
