import { RoomConnection } from "@oigamez/core";
import {
  publishInternalEvents,
  UserConnectionExpiredInternalEventBridgeEvent,
} from "@oigamez/communication";

export const publishAllUserExpirations = async (
  userConnections: RoomConnection[]
): Promise<void> => {
  await publishInternalEvents(
    userConnections.map<UserConnectionExpiredInternalEventBridgeEvent>(
      (c: RoomConnection) => {
        return new UserConnectionExpiredInternalEventBridgeEvent(
          c.roomCode,
          c.username,
          1
        );
      }
    )
  );
};
