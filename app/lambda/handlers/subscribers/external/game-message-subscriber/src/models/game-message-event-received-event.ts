import { EventBridgeReceivedEvent } from "@oigamez/communication";

export class GameMessageEventReceivedEvent extends EventBridgeReceivedEvent {
  constructor(
    public roomCode: string,
    public action: string,
    public payload: unknown
  ) {
    super("room-receive.game-message");
  }
}
