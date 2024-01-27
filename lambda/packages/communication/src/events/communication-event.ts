import { ActionTypes } from "./action-types";

export abstract class CommunicationEvent {
  constructor(public action: ActionTypes) {}
}
