import { EventBridgeEvent } from "../event-bridge-event";

import { EventBridgeExternalEventType } from "./types";

export abstract class EventBridgeExternalEvent extends EventBridgeEvent {
  constructor(
    public detailType: EventBridgeExternalEventType,
    public gameTypeId: number
  ) {
    super(detailType, gameTypeId);
  }
}
