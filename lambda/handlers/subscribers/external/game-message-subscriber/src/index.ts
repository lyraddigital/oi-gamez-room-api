import { EventBridgeEvent } from "aws-lambda";

import { broadcast } from "@oigamez/communication";
import { RoomStatus } from "@oigamez/models";
import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { GameMessageEvent, GenericCommunicationEvent } from "./models";

validateEnvironment();

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

    await broadcast<GenericCommunicationEvent>(
      connectionIds,
      new GenericCommunicationEvent(action, payload)
    );
  }
};
