import { WebsocketEvent } from "/opt/nodejs/oigamez-communication";

export class GameInitializedWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("gameInitialized");
  }
}
