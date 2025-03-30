import { EventBridgeInternalEventType } from "./internal";

export abstract class EventBridgeEvent {
  constructor(
    public detailType: EventBridgeInternalEventType | string,
    public gameTypeId: number
  ) {}
}
