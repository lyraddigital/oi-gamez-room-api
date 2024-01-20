import { EventBridgeEvent } from "aws-lambda";

import { UserConnectionDetail } from "@oigamez/models";
import { removeUserConnection } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<"room.host-disconnection", UserConnectionDetail>
): Promise<void> => {
  const { roomCode, username } = event.detail;
  console.log(roomCode, username);

  await removeUserConnection(roomCode, username);
};
