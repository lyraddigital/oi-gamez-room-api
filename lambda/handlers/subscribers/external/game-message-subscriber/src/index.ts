import { EventBridgeEvent } from "aws-lambda";

import { RoomStatus } from "/opt/nodejs/oigamez-core.js";
import { broadcast } from "/opt/nodejs/oigamez-communication.js";
import { getRoomByCode, getRoomConnections } from "/opt/nodejs/oigamez-data.js";
import { getConnectionIdsFromConnections } from "/opt/nodejs/oigamez-services.js";

import { validateEnvironment } from "./configuration/index.js";
import {
  GameMessageEventReceivedEvent,
  GameMessageWebsocketEvent,
} from "./models/index.js";
import { initializeLambda } from "./services/index.js";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-receive.game-message",
    GameMessageEventReceivedEvent
  >
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
