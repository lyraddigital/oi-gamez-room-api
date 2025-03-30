import { EventBridgeReceivedEventType } from "./types";

export abstract class EventBridgeReceivedEvent {
  constructor(public detailType: EventBridgeReceivedEventType) {}
}
