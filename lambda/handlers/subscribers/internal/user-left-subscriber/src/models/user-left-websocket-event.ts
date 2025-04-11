import { WebsocketEvent } from "/opt/nodejs/oigamez-communication.js";

export class UserLeftWebsocketEvent extends WebsocketEvent {
  constructor(public username: string) {
    super("userLeft");
  }
}
