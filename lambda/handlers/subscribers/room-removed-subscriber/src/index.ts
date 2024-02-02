import { EventBridgeEvent } from "aws-lambda";

import {
  RoomRemovedCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  RoomRemovedInternalEvent,
} from "@oigamez/event-bridge";
import { getRoomConnections } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.roomRemoved,
    RoomRemovedInternalEvent
  >
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);

  await broadcast<RoomRemovedCommunicationEvent>(
    roomConnections,
    new RoomRemovedCommunicationEvent(roomCode),
    []
  );
};
