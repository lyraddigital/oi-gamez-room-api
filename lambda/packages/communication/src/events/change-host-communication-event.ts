import { CommunicationActionTypes } from "./communication-action-types";
import { CommunicationEvent } from "./communication-event";

export class HostChangeCommunicationEvent extends CommunicationEvent {
  constructor(public oldHostname: string, public newHostName: string) {
    super(CommunicationActionTypes.changeHost);
  }
}
