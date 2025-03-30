import { EventBridgeEvent } from "aws-lambda";

import { broadcast } from "@oigamez/communication";
import {
  EventBridgeReceivedEventType,
  GameInitializedEvent,
} from "@oigamez/event-bridge";
import { RoomStatus } from "@oigamez/models";
import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { GameInitializedCommunicationEvent } from "./models";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeReceivedEventType.gameInitialized,
    GameInitializedEvent
  >
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);
  const connectionIds = getConnectionIdsFromConnections(roomConnections);

  await updateRoomStatus(roomCode, RoomStatus.available);

  await broadcast<GameInitializedCommunicationEvent>(
    connectionIds,
    new GameInitializedCommunicationEvent()
  );
};
