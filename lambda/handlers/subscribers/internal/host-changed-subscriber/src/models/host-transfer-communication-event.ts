import { CommunicationEvent } from "@oigamez/communication";

export class HostTransferCommunicationEvent extends CommunicationEvent {
  constructor() {
    super("hostTransfer");
  }
}
