import { EventBridgeReceivedEvent } from "/opt/nodejs/oigamez-communication.js";

export class GameMessageEventReceivedEvent extends EventBridgeReceivedEvent {
  constructor(
    public roomCode: string,
    public action: string,
    public payload: unknown
  ) {
    super("room-receive.game-message");
  }
}
