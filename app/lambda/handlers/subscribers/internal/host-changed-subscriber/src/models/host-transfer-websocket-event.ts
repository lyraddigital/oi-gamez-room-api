import { WebsocketEvent } from "@oigamez/communication";

export class HostTransferWebsocketEvent extends WebsocketEvent {
  constructor() {
    super("hostTransfer");
  }
}
