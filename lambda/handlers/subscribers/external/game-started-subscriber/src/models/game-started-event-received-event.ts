import { EventBridgeReceivedEvent } from "/opt/nodejs/oigamez-communication";

export class GameStartedEventReceivedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-started");
  }
}
