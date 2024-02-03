import { EventBridgeInternalEventType } from "./internal";
import { EventBridgeExternalEventType } from "./external";

export abstract class EventBridgeEvent {
  constructor(
    public detailType:
      | EventBridgeInternalEventType
      | EventBridgeExternalEventType,
    public gameTypeId: number
  ) {}
}
