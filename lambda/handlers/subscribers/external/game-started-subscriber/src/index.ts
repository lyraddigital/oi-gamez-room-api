import { EventBridgeEvent } from "aws-lambda";

import { broadcast } from "@oigamez/communication";
import {
  EventBridgeReceivedEventType,
  GameStartedEvent,
} from "@oigamez/event-bridge";
import { RoomStatus } from "@oigamez/models";
import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { GameStartedCommunicationEvent } from "./models";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeReceivedEventType.gameStarted,
    GameStartedEvent
  >
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);
  const connectionIds = getConnectionIdsFromConnections(roomConnections);

  await updateRoomStatus(roomCode, RoomStatus.inProgress);

  await broadcast<GameStartedCommunicationEvent>(
    connectionIds,
    new GameStartedCommunicationEvent()
  );
};
