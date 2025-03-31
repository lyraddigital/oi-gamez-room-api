import { EventBridgeReceivedEvent } from "@oigamez/event-bridge";

export class GameStartedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-started");
  }
}
