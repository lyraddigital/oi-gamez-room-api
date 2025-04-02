import { WebsocketEvent } from "/opt/nodejs/oigamez-communication";

export class HostChangeWebsocketEvent extends WebsocketEvent {
  constructor(public oldHostname: string, public newHostName: string) {
    super("changeHost");
  }
}
