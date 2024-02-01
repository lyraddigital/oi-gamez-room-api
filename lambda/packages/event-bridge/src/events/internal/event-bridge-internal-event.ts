import { EventBridgeInternalEventType } from "./types";

export abstract class EventBridgeInternalEvent {
  constructor(
    public detailType: EventBridgeInternalEventType,
    public gameTypeId: number
  ) {}
}
