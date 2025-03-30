import { EventBridgeEvent } from "../event-bridge-event";

export abstract class EventBridgeExternalEvent extends EventBridgeEvent {
  constructor(public detailType: string, public gameTypeId: number) {
    super(detailType, gameTypeId);
  }
}
