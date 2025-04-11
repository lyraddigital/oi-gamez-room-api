import { WebsocketEvent } from "@oigamez/communication";

export class DisableGameStartWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("disableGameStart");
  }
}
