import { RoomConnection } from "/opt/nodejs/oigamez-core";
import {
  publishInternalEvents,
  UserConnectionExpiredInternalEvent,
} from "/opt/nodejs/oigamez-communication";

export const publishAllUserExpirations = async (
  userConnections: RoomConnection[]
): Promise<void> => {
  await publishInternalEvents(
    userConnections.map<UserConnectionExpiredInternalEvent>(
      (c: RoomConnection) => {
        return new UserConnectionExpiredInternalEvent(
          c.roomCode,
          c.username,
          1
        );
      }
    )
  );
};
