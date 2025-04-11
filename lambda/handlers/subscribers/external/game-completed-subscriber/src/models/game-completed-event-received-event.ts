import { EventBridgeReceivedEvent } from "/opt/nodejs/oigamez-communication.js";

export class GameCompletedEventReceivedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-completed");
  }
}
