import { WebsocketEvent } from "@oigamez/communication";

export class GameStartedWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("gameStarted");
  }
}
