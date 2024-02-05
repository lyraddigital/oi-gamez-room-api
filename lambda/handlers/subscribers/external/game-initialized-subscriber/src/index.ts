import { EventBridgeEvent } from "aws-lambda";

import {
  GameInitializedCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeReceivedEventType,
  GameInitializedEvent,
} from "@oigamez/event-bridge";
import { RoomStatus } from "@oigamez/models";
import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeReceivedEventType.gameInitialized,
    GameInitializedEvent
  >
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);

  await updateRoomStatus(roomCode, RoomStatus.Available);

  await broadcast<GameInitializedCommunicationEvent>(
    roomConnections,
    new GameInitializedCommunicationEvent()
  );
};
