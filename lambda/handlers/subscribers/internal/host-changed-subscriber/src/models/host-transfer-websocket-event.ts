import { WebsocketEvent } from "/opt/nodejs/oigamez-communication";

export class HostTransferWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("hostTransfer");
  }
}
