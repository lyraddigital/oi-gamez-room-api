import { WebsocketEvent } from "@oigamez/communication";

export class GameInitializedWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("gameInitialized");
  }
}
