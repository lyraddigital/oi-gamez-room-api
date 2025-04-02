import { EventBridgeReceivedEvent } from "/opt/nodejs/oigamez-communication";

export class GameCompletedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-completed");
  }
}
