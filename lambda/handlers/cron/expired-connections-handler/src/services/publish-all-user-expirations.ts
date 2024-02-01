import {
  publishEvents,
  UserConnectionExpiredInternalEvent,
} from "@oigamez/event-bridge";
import { RoomConnection } from "@oigamez/models";

export const publishAllUserExpirations = async (
  userConnections: RoomConnection[]
): Promise<void> => {
  await publishEvents(
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
