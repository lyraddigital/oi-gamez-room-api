import {
  publishEvents,
  UserConnectionExpiredEvent,
} from "@oigamez/event-bridge";
import { RoomConnection } from "@oigamez/models";

export const publishAllUserExpirations = async (
  userConnections: RoomConnection[]
): Promise<void> => {
  await publishEvents(
    userConnections.map<UserConnectionExpiredEvent>((c: RoomConnection) => {
      return new UserConnectionExpiredEvent(c.roomCode, c.username, 1); // Need to get gameTypeId for each room
    })
  );
};
