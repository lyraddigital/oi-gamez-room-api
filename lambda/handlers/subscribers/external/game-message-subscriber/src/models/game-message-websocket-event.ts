import { WebsocketEvent } from "/opt/nodejs/oigamez-communication.js";

export class GameMessageWebsocketEvent extends WebsocketEvent {
  constructor(action: string, public payload: unknown) {
    super(action);
  }
}
