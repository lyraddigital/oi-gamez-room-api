import { EventBridgeEvent } from "aws-lambda";

import { RoomStatus } from "/opt/nodejs/oigamez-core";
import { broadcast } from "/opt/nodejs/oigamez-communication";
import { getRoomConnections, updateRoomStatus } from "/opt/nodejs/oigamez-data";
import { getConnectionIdsFromConnections } from "/opt/nodejs/oigamez-services";
import { validateEnvironment } from "./configuration";
import {
  GameCompletedWebsocketEvent,
  GameCompletedEventReceivedEvent,
} from "./models";
import { initializeLambda } from "./services";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-receive.game-completed",
    GameCompletedEventReceivedEvent
  >
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);
  const connectionIds = getConnectionIdsFromConnections(roomConnections);

  await updateRoomStatus(roomCode, RoomStatus.completed);

  await broadcast<GameCompletedWebsocketEvent>(
    connectionIds,
    new GameCompletedWebsocketEvent()
  );
};
