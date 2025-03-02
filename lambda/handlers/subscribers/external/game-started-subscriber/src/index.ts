import { EventBridgeEvent } from "aws-lambda";

import {
  GameStartedCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeReceivedEventType,
  GameStartedEvent,
} from "@oigamez/event-bridge";
import { RoomStatus } from "@oigamez/models";
import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeReceivedEventType.gameStarted,
    GameStartedEvent
  >
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);

  await updateRoomStatus(roomCode, RoomStatus.inProgress);

  await broadcast<GameStartedCommunicationEvent>(
    roomConnections,
    new GameStartedCommunicationEvent()
  );
};
