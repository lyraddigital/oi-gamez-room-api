import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class HostTransferCommunicationEvent extends CommunicationEvent {
  constructor() {
    super(CommunicationActionTypes.hostTransfer);
  }
}
