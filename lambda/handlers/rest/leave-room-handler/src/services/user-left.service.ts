import { UserLeftInternalEvent, publishEvents } from "@oigamez/event-bridge";
import { Room, RoomConnection } from "@oigamez/models";
import { removeUserFromRoom } from "@oigamez/repositories";

export const handleUserLeft = async (
  room: Room,
  username: string,
  connections: RoomConnection[]
): Promise<void> => {
  await removeUserFromRoom(room, username);

  const userConnection = connections.find((c) => c.username === username!);

  await publishEvents<UserLeftInternalEvent>([
    new UserLeftInternalEvent(
      room.code,
      username,
      userConnection!.connectionId,
      room.gameTypeId
    ),
  ]);
};
