import { CommunicationActionTypes } from "./communication-action-types";

export abstract class CommunicationEvent {
  constructor(public action: CommunicationActionTypes) {}
}
