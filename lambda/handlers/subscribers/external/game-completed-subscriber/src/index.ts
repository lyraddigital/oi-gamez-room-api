import { EventBridgeEvent } from "aws-lambda";

import { broadcast } from "@oigamez/communication";
import { RoomStatus } from "/opt/nodejs/oigamez-core";
import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { GameCompletedCommunicationEvent, GameCompletedEvent } from "./models";

validateEnvironment();

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
