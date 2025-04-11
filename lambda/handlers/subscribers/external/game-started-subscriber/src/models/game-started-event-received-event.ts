import { EventBridgeReceivedEvent } from "/opt/nodejs/oigamez-communication.js";

export class GameStartedEventReceivedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-started");
  }
}
