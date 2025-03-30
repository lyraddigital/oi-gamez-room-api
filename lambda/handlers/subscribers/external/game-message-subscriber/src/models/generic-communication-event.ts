import { CommunicationEvent } from "../../../../../../packages/communication/src/events/communication-event";

export class GenericCommunicationEvent extends CommunicationEvent {
  constructor(action: string, public payload: unknown) {
    super(action);
  }
}
