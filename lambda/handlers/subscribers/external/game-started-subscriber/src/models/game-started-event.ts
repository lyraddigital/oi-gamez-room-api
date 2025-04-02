import { EventBridgeReceivedEvent } from "/opt/nodejs/oigamez-communication";

export class GameStartedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-started");
  }
}
