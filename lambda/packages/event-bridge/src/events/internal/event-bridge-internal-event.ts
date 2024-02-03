import { EventBridgeEvent } from "../event-bridge-event";

import { EventBridgeInternalEventType } from "./types";

export abstract class EventBridgeInternalEvent extends EventBridgeEvent {
  constructor(
    public detailType: EventBridgeInternalEventType,
    public gameTypeId: number
  ) {
    super(detailType, gameTypeId);
  }
}
