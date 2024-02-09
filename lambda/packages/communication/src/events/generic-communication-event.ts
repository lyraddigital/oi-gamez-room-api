import { CommunicationEvent } from "./communication-event";

export class GenericCommunicationEvent extends CommunicationEvent {
  constructor(action: string, public payload: unknown) {
    super(action);
  }
}
