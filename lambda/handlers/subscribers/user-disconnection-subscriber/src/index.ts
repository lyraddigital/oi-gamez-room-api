import { EventBridgeEvent } from "aws-lambda";

import { UserConnectionDetail } from "@oigamez/models";

import { validateEnvironment } from "./configuration";
import { removeIndividualUserRecord } from "./repositories";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<"room.user-disconnection", UserConnectionDetail>
): Promise<void> => {
  const { roomCode, username } = event.detail;

  console.log("user disconnection => remove user data", roomCode, username);

  await removeIndividualUserRecord(roomCode, username);
};
