import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class HostTransferCommunicationEvent extends CommunicationEvent {
  constructor(public isBelowMinimumUsers: boolean) {
    super(CommunicationActionTypes.hostTransfer);
  }
}
