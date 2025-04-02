import { EventBridgeEvent } from "aws-lambda";

import { broadcast } from "@oigamez/communication";
import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { RoomStatus } from "/opt/nodejs/oigamez-core";
import { validateEnvironment } from "./configuration";
import { GameMessageEvent, GameMessageCommunicationEvent } from "./models";
import { initializeLambda } from "./services";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<"room-receive.game-message", GameMessageEvent>
): Promise<void> => {
  const { roomCode, action, payload } = event.detail;
  const room = await getRoomByCode(roomCode);
  const canSendMessage =
    room &&
    (room.status === RoomStatus.available ||
      room.status === RoomStatus.inProgress);

  if (canSendMessage) {
    const roomConnections = await getRoomConnections(roomCode);
    const connectionIds = getConnectionIdsFromConnections(roomConnections);

    await broadcast<GameMessageCommunicationEvent>(
      connectionIds,
      new GameMessageCommunicationEvent(action, payload)
    );
  }
};
