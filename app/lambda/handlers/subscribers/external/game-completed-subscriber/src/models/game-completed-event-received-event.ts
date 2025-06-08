import { EventBridgeReceivedEvent } from "@oigamez/communication";

export class GameCompletedEventReceivedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-completed");
  }
}
