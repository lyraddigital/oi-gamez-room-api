import { EventBridgeEvent } from "aws-lambda";

import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { RoomStatus } from "/opt/nodejs/oigamez-core";
import { broadcast } from "/opt/nodejs/oigamez-communication";
import { validateEnvironment } from "./configuration";
import { GameMessageEvent, GameMessageWebsocketEvent } from "./models";
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

    await broadcast<GameMessageWebsocketEvent>(
      connectionIds,
      new GameMessageWebsocketEvent(action, payload)
    );
  }
};
