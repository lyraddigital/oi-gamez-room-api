import { EventBridgeEvent } from "aws-lambda";

import { broadcast } from "@oigamez/communication";
import { RoomStatus } from "@oigamez/models";
import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import {
  GameInitializedCommunicationEvent,
  GameInitializedEvent,
} from "./models";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<"room-receive.game-initialized", GameInitializedEvent>
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
