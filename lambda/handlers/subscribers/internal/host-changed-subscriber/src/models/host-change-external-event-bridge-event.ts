import { EventBridgeEvent } from "/opt/nodejs/oigamez-communication";

export class HostChangeExternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public roomCode: string,
    public oldHostUsername: string,
    public newHostUsername: string,
    gameTypeId: number
  ) {
    super("room.host-changed", gameTypeId);
  }
}
