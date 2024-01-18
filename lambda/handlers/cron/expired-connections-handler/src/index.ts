import { EventBridgeEvent } from "aws-lambda";

import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { getAllExpiredConnections } from "./repositories";

validateEnvironment();

export const handler = async (
  _: EventBridgeEvent<"Check Expired Connections", void>
): Promise<void> => {
  try {
    const currentTimeInSeconds = convertFromMillisecondsToSeconds(
      Math.floor(new Date().getTime())
    );
    const connections = await getAllExpiredConnections(currentTimeInSeconds);

    // const [rooms, players] =
    //   await getAllAvailableHostedRoomsAndUsersFromConnections(connections);

    // await removeAllRoomsAndUsers(rooms, players);
  } catch (e) {
    console.log(e);
  }
};
