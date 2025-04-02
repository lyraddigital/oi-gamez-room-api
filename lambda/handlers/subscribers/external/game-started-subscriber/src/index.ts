import { EventBridgeEvent } from "aws-lambda";

import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { RoomStatus } from "/opt/nodejs/oigamez-core";
import { broadcast } from "/opt/nodejs/oigamez-communication";
import { validateEnvironment } from "./configuration";
import { GameStartedWebsocketEvent, GameStartedEvent } from "./models";
import { initializeLambda } from "./services";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<"room-receive.game-started", GameStartedEvent>
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
