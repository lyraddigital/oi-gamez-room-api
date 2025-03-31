import { EventBridgeReceivedEvent } from "@oigamez/event-bridge";

export class GameCompletedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-completed");
  }
}
