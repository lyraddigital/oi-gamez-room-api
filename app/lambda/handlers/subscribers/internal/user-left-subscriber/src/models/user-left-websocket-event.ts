import { WebsocketEvent } from "@oigamez/communication";

export class UserLeftWebsocketEvent extends WebsocketEvent {
  constructor(public username: string) {
    super("userLeft");
  }
}
