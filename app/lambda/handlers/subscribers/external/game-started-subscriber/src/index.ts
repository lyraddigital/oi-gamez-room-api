import { EventBridgeEvent } from "aws-lambda";

import { RoomStatus } from "@oigamez/core";
import { broadcast } from "@oigamez/communication";
import { getRoomConnections, updateRoomStatus } from "@oigamez/data";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import {
  GameStartedWebsocketEvent,
  GameStartedEventReceivedEvent,
} from "./models";
import { initializeLambda } from "./services";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-receive.game-started",
    GameStartedEventReceivedEvent
  >
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);
  const connectionIds = getConnectionIdsFromConnections(roomConnections);

  await updateRoomStatus(roomCode, RoomStatus.inProgress);

  await broadcast<GameStartedWebsocketEvent>(
    connectionIds,
    new GameStartedWebsocketEvent()
  );
};
