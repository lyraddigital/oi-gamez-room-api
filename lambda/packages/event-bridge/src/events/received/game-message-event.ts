import { EventBridgeReceivedEvent } from "./event-bridge-received-event";
import { EventBridgeReceivedEventType } from "./types";

export class GameMessageEvent extends EventBridgeReceivedEvent {
  constructor(
    public roomCode: string,
    public action: string,
    public payload: unknown
  ) {
    super(EventBridgeReceivedEventType.gameMessage);
  }
}
