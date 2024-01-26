import { EventBridgeEvent } from "aws-lambda";

import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { getAllExpiredConnections } from "./repositories";
import {
  getAllHostedRoomsFromConnections,
  publishAllHostDisconnections,
  publishAllUserDisconnections,
} from "./services";
import { EventBridgeEventType } from "@oigamez/event-bridge";

validateEnvironment();

export const handler = async (
  _: EventBridgeEvent<EventBridgeEventType.expiredConnections, void>
): Promise<void> => {
  try {
    const currentTimeInSeconds = convertFromMillisecondsToSeconds(
      Math.floor(new Date().getTime())
    );
    const connections = await getAllExpiredConnections(currentTimeInSeconds);
    const hostedRooms = await getAllHostedRoomsFromConnections(connections);
    const userOnlyConnections = connections.filter(
      (c) => !hostedRooms.find((r) => r.hostUsername === c.username)
    );

    if (hostedRooms.length > 0) {
      await publishAllHostDisconnections(hostedRooms);
    }

    if (userOnlyConnections.length > 0) {
      await publishAllUserDisconnections(userOnlyConnections);
    }
  } catch (e) {
    console.log(e);
  }
};
