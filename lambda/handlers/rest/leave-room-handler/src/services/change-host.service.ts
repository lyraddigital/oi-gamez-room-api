import { HostChangeInternalEvent, publishEvents } from "@oigamez/event-bridge";
import { Room, RoomConnection } from "@oigamez/models";

import { updateHostName } from "../repositories";
import { handleUserLeft } from "./user-left.service";

export const changeHost = async (
  room: Room,
  hostUsername: string,
  connections: RoomConnection[]
): Promise<void> => {
  await handleUserLeft(room, hostUsername, connections);

  const nextHost = connections.filter((c) => c.username !== hostUsername!);

  if (nextHost.length > 0 && nextHost[0]?.username) {
    await updateHostName(room.code, nextHost[0].username);
    await publishEvents<HostChangeInternalEvent>([
      new HostChangeInternalEvent(
        room.code,
        hostUsername,
        nextHost[0].username,
        room.gameTypeId
      ),
    ]);
  }
};
