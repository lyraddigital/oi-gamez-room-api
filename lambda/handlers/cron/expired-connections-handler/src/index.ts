import { EventBridgeEvent } from "aws-lambda";

import { convertFromMillisecondsToSeconds } from "/opt/nodejs/oigamez-services.js";
import { validateEnvironment } from "./configuration/index.js";
import { getAllExpiredConnections } from "./repositories/index.js";
import {
  getAllHostedRoomsFromConnections,
  initializeLambda,
  publishAllHostExpirations,
  publishAllUserExpirations,
} from "./services/index.js";

validateEnvironment();
initializeLambda();

export const handler = async (
  _: EventBridgeEvent<"room-internal.expired-connections", void>
): Promise<void> => {
  const currentTimeInSeconds = convertFromMillisecondsToSeconds(
    Math.floor(new Date().getTime())
  );
  const connections = await getAllExpiredConnections(currentTimeInSeconds);
  const hostedRooms = await getAllHostedRoomsFromConnections(connections);
  const userOnlyConnections = connections.filter(
    (c) => !hostedRooms.find((r) => r.hostUsername === c.username)
  );

  // We need to reduce the current number of users from the hosted rooms
  // So that we can propertly calculate if the room is to be deleted or not
  hostedRooms.forEach((hr) => {
    const userCount = connections.filter((c) => c.roomCode == hr.code).length;
    hr.curNumOfUsers -= userCount;
  });

  if (hostedRooms.length > 0) {
    await publishAllHostExpirations(hostedRooms);
  }

  if (userOnlyConnections.length > 0) {
    await publishAllUserExpirations(userOnlyConnections);
  }
};
