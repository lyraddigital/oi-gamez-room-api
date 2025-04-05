import { EventBridgeEvent } from "aws-lambda";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { RoomStatus } from "/opt/nodejs/oigamez-core";
import { broadcast } from "/opt/nodejs/oigamez-communication";
import { getRoomConnections, updateRoomStatus } from "/opt/nodejs/oigamez-data";
import { validateEnvironment } from "./configuration";
import {
  GameInitializedWebsocketEvent,
  GameInitializedEventReceivedEvent,
} from "./models";
import { initializeLambda } from "./services";

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
