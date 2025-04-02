import { convertFromMillisecondsToSeconds } from "@oigamez/services";
import { EventBridgeEvent } from "aws-lambda";

import { validateEnvironment } from "./configuration";
import { getAllExpiredConnections } from "./repositories";
import {
  getAllHostedRoomsFromConnections,
  initializeLambda,
  publishAllHostExpirations,
  publishAllUserExpirations,
} from "./services";

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
