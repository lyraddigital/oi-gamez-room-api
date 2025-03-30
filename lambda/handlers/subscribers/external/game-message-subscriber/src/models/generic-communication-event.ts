import { CommunicationEvent } from "@oigamez/communication";

export class GenericCommunicationEvent extends CommunicationEvent {
  constructor(action: string, public payload: unknown) {
    super(action);
  }
}
