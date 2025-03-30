import { EventBridgeExternalEvent } from "@oigamez/event-bridge";

export class HostChangeExternalEvent extends EventBridgeExternalEvent {
  constructor(
    public roomCode: string,
    public oldHostUsername: string,
    public newHostUsername: string,
    gameTypeId: number
  ) {
    super("room.host-changed", gameTypeId);
  }
}
