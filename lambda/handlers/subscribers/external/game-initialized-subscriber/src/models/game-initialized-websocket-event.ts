import { WebsocketEvent } from "/opt/nodejs/oigamez-communication.js";

export class GameInitializedWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("gameInitialized");
  }
}
