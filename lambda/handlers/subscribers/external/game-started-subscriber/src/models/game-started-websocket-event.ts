import { WebsocketEvent } from "/opt/nodejs/oigamez-communication.js";

export class GameStartedWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("gameStarted");
  }
}
