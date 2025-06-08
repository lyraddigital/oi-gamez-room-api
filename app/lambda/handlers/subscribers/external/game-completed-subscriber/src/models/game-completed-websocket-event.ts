import { WebsocketEvent } from "@oigamez/communication";

export class GameCompletedWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("gameCompleted");
  }
}
