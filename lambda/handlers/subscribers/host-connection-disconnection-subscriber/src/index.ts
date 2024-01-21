import { EventBridgeEvent } from "aws-lambda";

import { HostConnectionDetail } from "@oigamez/models";
import { removeUserConnection } from "@oigamez/repositories";
import { clearAllRoomDataForRoomCode } from "@oigamez/services";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<"room.host-disconnection", HostConnectionDetail>
): Promise<void> => {
  const { roomCode, username, canRemoveRoom } = event.detail;

  if (canRemoveRoom) {
    await clearAllRoomDataForRoomCode(roomCode);
  } else {
    await removeUserConnection(roomCode, username);
  }
};
