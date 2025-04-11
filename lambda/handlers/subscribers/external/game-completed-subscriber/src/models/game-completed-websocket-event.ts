import { WebsocketEvent } from "/opt/nodejs/oigamez-communication.js";

export class GameCompletedWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("gameCompleted");
  }
}
