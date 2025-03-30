import { CommunicationEvent } from "@oigamez/communication";

export class HostChangeCommunicationEvent extends CommunicationEvent {
  constructor(public oldHostname: string, public newHostName: string) {
    super("changeHost");
  }
}
