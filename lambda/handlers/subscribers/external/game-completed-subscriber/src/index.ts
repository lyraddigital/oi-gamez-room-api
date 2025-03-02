import { EventBridgeEvent } from "aws-lambda";

import {
  GameCompletedCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeReceivedEventType,
  GameCompletedEvent,
} from "@oigamez/event-bridge";
import { RoomStatus } from "@oigamez/models";
import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeReceivedEventType.gameCompleted,
    GameCompletedEvent
  >
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);

  await updateRoomStatus(roomCode, RoomStatus.completed);

  await broadcast<GameCompletedCommunicationEvent>(
    roomConnections,
    new GameCompletedCommunicationEvent()
  );
};
