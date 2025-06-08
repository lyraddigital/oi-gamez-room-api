import { WebsocketEvent } from "@oigamez/communication";

export class UserJoinedWebsocketEvent extends WebsocketEvent {
  constructor(public username: string) {
    super("userJoined");
  }
}
