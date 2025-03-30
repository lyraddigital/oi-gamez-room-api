import { CommunicationEvent } from "@oigamez/communication";

export class UserJoinedCommunicationEvent extends CommunicationEvent {
  constructor(public username: string) {
    super("userJoined");
  }
}
