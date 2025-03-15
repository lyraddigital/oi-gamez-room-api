import { EventBridgeEvent } from "aws-lambda";

import { GenericCommunicationEvent, broadcast } from "@oigamez/communication";
import {
  EventBridgeReceivedEventType,
  GameMessageEvent,
} from "@oigamez/event-bridge";
import { RoomStatus } from "@oigamez/models";
import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeReceivedEventType.gameMessage,
    GameMessageEvent
  >
): Promise<void> => {
  const { roomCode, action, payload } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);
  const room = await getRoomByCode(roomCode);
  const canSendMessage =
    room &&
    (room.status === RoomStatus.available ||
      room.status === RoomStatus.inProgress);

  if (canSendMessage) {
    await broadcast<GenericCommunicationEvent>(
      roomConnections,
      new GenericCommunicationEvent(action, payload)
    );
  }
};
