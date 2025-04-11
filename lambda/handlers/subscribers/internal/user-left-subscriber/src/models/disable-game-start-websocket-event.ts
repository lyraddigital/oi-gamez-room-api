import { WebsocketEvent } from "/opt/nodejs/oigamez-communication.js";

export class DisableGameStartWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("disableGameStart");
  }
}
