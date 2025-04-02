import { EventBridgeEvent } from "aws-lambda";

import { broadcast } from "@oigamez/communication";
import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { RoomStatus } from "/opt/nodejs/oigamez-core";
import { validateEnvironment } from "./configuration";
import { GameCompletedCommunicationEvent, GameCompletedEvent } from "./models";
import { initializeLambda } from "./services";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<"room-receive.game-completed", GameCompletedEvent>
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);
  const connectionIds = getConnectionIdsFromConnections(roomConnections);

  await updateRoomStatus(roomCode, RoomStatus.completed);

  await broadcast<GameCompletedCommunicationEvent>(
    connectionIds,
    new GameCompletedCommunicationEvent()
  );
};
