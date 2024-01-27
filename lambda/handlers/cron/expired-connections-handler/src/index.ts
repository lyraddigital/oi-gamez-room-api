import { EventBridgeEvent } from "aws-lambda";

import { EventBridgeEventType } from "@oigamez/event-bridge";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { getAllExpiredConnections } from "./repositories";
import { getAllHostedRoomsFromConnections } from "./services";
import {
  publishAllHostExpirations,
  publishAllUserExpirations,
} from "./services";

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
      await publishAllHostExpirations(hostedRooms);
    }

    if (userOnlyConnections.length > 0) {
      await publishAllUserExpirations(userOnlyConnections);
    }
  } catch (e) {
    console.log(e);
  }
};
