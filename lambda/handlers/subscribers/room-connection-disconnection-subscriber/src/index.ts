import { EventBridgeEvent } from "aws-lambda";

import { validateEnvironment } from "./configuration";
import { RoomCodeDetail } from "./models";
import {
  getAllConnectionsForRoom,
  removeUserConnections,
} from "./repositories";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<"room.room-disconnection", RoomCodeDetail>
): Promise<void> => {
  const { roomCode } = event.detail;
  const roomConnections = await getAllConnectionsForRoom(roomCode);

  if (roomConnections.length > 0) {
    await removeUserConnections(roomConnections);
  }
};
