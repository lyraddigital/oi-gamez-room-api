import { CommunicationEvent } from "@oigamez/communication";

export class UserLeftCommunicationEvent extends CommunicationEvent {
  constructor(public username: string) {
    super("userLeft");
  }
}
