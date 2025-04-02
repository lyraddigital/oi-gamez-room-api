import { EventBridgeReceivedEvent } from "/opt/nodejs/oigamez-communication";

export class GameInitializedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-initialized");
  }
}
