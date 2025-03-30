import { EventBridgeReceivedEvent } from "./event-bridge-received-event";
import { EventBridgeReceivedEventType } from "./types";

export class GameCompletedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super(EventBridgeReceivedEventType.gameCompleted);
  }
}
