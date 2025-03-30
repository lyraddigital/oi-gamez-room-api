import { EventBridgeReceivedEvent } from "./event-bridge-received-event";
import { EventBridgeReceivedEventType } from "./types";

export class GameStartedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super(EventBridgeReceivedEventType.gameStarted);
  }
}
