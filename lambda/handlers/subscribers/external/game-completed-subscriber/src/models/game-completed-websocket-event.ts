import { WebsocketEvent } from "/opt/nodejs/oigamez-communication";

export class GameCompletedWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("gameCompleted");
  }
}
