import { EventBridgeReceivedEvent } from "/opt/nodejs/oigamez-communication";

export class GameMessageEvent extends EventBridgeReceivedEvent {
  constructor(
    public roomCode: string,
    public action: string,
    public payload: unknown
  ) {
    super("room-receive.game-message");
  }
}
