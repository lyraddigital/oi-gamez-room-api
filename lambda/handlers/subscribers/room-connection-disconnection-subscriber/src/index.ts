import { EventBridgeEvent } from "aws-lambda";

import { removeUserConnection } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";
import { RoomCodeDetail } from "./models";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<"room.host-disconnection", RoomCodeDetail>
): Promise<void> => {
  const { roomCode, hostUsername } = event.detail;
  await removeUserConnection(roomCode, hostUsername);
};
