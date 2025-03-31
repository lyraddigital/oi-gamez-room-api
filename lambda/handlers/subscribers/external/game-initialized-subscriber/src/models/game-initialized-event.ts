import { EventBridgeReceivedEvent } from "@oigamez/event-bridge";

export class GameInitializedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-initialized");
  }
}
