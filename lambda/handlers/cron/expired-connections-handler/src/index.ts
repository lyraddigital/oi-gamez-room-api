import { EventBridgeEvent } from "aws-lambda";

import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { getAllExpiredConnections } from "./repositories";
import {
  getAllRoomsFromConnections,
  publishAllRoomDisconnections,
  publishAllUserDisconnections,
} from "./services";

validateEnvironment();

export const handler = async (
  _: EventBridgeEvent<"Check Expired Connections", void>
): Promise<void> => {
  try {
    const currentTimeInSeconds = convertFromMillisecondsToSeconds(
      Math.floor(new Date().getTime())
    );
    const connections = await getAllExpiredConnections(currentTimeInSeconds);
    const rooms = await getAllRoomsFromConnections(connections);
    const roomCodes = rooms.map((r) => r.code);
    const userOnlyConnections = connections.filter((c) =>
      rooms.find((r) => r.hostUsername !== c.username)
    );

    await publishAllRoomDisconnections(roomCodes);
    await publishAllUserDisconnections(userOnlyConnections);
  } catch (e) {
    console.log(e);
  }
};
