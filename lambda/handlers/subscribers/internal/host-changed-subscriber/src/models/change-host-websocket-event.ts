import { WebsocketEvent } from "/opt/nodejs/oigamez-communication.js";

export class HostChangeWebsocketEvent extends WebsocketEvent {
  constructor(public oldHostname: string, public newHostName: string) {
    super("changeHost");
  }
}
