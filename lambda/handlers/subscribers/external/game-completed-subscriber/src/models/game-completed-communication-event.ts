import { CommunicationEvent } from "@oigamez/communication";

export class GameCompletedCommunicationEvent extends CommunicationEvent {
  constructor() {
    super("gameCompleted");
  }
}
