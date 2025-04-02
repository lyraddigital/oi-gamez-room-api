import { WebsocketEvent } from "/opt/nodejs/oigamez-communication";

export class GameStartedWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("gameStarted");
  }
}
