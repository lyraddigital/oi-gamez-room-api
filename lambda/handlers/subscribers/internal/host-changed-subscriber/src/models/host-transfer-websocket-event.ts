import { WebsocketEvent } from "/opt/nodejs/oigamez-communication.js";

export class HostTransferWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("hostTransfer");
  }
}
