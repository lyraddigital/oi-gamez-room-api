import { WebsocketEvent } from "/opt/nodejs/oigamez-communication";

export class DisableGameStartWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("disableGameStart");
  }
}
