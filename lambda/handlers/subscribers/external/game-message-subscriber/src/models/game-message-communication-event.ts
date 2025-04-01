import { CommunicationEvent } from "@oigamez/communication";

export class GameMessageCommunicationEvent extends CommunicationEvent {
  constructor(action: string, public payload: unknown) {
    super(action);
  }
}
