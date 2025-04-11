import { WebsocketEvent } from "/opt/nodejs/oigamez-communication.js";

export class UserJoinedWebsocketEvent extends WebsocketEvent {
  constructor(public username: string) {
    super("userJoined");
  }
}
