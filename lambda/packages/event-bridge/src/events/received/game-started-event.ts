import { EventBridgeReceivedEvent } from "./event-bridget-received-event";
import { EventBridgeReceivedEventType } from "./types";

export class GameStartedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super(EventBridgeReceivedEventType.gameStarted);
  }
}
