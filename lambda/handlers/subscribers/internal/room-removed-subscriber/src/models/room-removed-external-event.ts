import { EventBridgeEvent } from "/opt/nodejs/oigamez-communication";

export class RoomRemovedExternalEvent extends EventBridgeEvent {
  constructor(public roomCode: string, gameTypeId: number) {
    super("room.room-removed", gameTypeId);
  }
}
