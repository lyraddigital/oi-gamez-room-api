import { EventBridgeEvent } from "aws-lambda";

import { HostConnectionDetail } from "@oigamez/models";
import {
  clearRoomData,
  getRoomConnections,
  removeUserConnection,
} from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<"room.host-disconnection", HostConnectionDetail>
): Promise<void> => {
  const { roomCode, username, removeRoom } = event.detail;
  const connections = await getRoomConnections(roomCode);

  if (removeRoom) {
    await clearRoomData(roomCode, connections);
  } else {
    await removeUserConnection(roomCode, username);
  }
};
