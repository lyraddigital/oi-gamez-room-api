import { CommunicationEvent } from "@oigamez/communication";

export class DisableGameStartCommunicationEvent extends CommunicationEvent {
  constructor() {
    super("disableGameStart");
  }
}
