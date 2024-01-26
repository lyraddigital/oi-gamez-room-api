import { UserRemovedEvent, publishEvents } from "@oigamez/event-bridge";
import { RoomConnection } from "@oigamez/models";

export const publishAllUserDisconnections = async (
  userDisconnections: RoomConnection[]
): Promise<void> => {
  await publishEvents(
    userDisconnections.map<UserRemovedEvent>((c: RoomConnection) => {
      return new UserRemovedEvent(c.roomCode, c.username);
    })
  );
};
