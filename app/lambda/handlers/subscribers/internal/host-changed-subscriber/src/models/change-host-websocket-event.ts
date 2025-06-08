import { WebsocketEvent } from "@oigamez/communication";

export class HostChangeWebsocketEvent extends WebsocketEvent {
  constructor(public oldHostname: string, public newHostName: string) {
    super("changeHost");
  }
}
