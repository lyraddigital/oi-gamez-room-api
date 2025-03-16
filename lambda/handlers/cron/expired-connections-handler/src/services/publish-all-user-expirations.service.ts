import {
  publishInternalEvents,
  UserConnectionExpiredInternalEvent,
} from "@oigamez/event-bridge";
import { RoomConnection } from "@oigamez/models";

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
