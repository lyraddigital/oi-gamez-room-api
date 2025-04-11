import { EventBridgeEvent } from "aws-lambda";

import { RoomStatus } from "/opt/nodejs/oigamez-core.js";
import { broadcast } from "/opt/nodejs/oigamez-communication.js";
import {
  getRoomConnections,
  updateRoomStatus,
} from "/opt/nodejs/oigamez-data.js";
import { getConnectionIdsFromConnections } from "/opt/nodejs/oigamez-services.js";
import { validateEnvironment } from "./configuration/index.js";
import {
  GameInitializedWebsocketEvent,
  GameInitializedEventReceivedEvent,
} from "./models/index.js";
import { initializeLambda } from "./services/index.js";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-receive.game-initialized",
    GameInitializedEventReceivedEvent
  >
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);
  const connectionIds = getConnectionIdsFromConnections(roomConnections);

  await updateRoomStatus(roomCode, RoomStatus.available);

  await broadcast<GameInitializedWebsocketEvent>(
    connectionIds,
    new GameInitializedWebsocketEvent()
  );
};
