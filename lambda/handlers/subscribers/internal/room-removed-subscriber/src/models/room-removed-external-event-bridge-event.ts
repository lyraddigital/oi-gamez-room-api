import { EventBridgeEvent } from "/opt/nodejs/oigamez-communication.js";

export class RoomRemovedExternalEventBridgeEvent extends EventBridgeEvent {
  constructor(public roomCode: string, gameTypeId: number) {
    super("room.room-removed", gameTypeId);
  }
}
