import { EventBridgeReceivedEvent } from "@oigamez/communication";

export class GameInitializedEventReceivedEvent extends EventBridgeReceivedEvent {
  constructor(public roomCode: string) {
    super("room-receive.game-initialized");
  }
}
