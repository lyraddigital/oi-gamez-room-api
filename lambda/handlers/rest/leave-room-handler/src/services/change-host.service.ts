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

  const otherPotentialHosts = connections.filter(
    (c) => c.username !== hostUsername
  );
  const nextHostUsername =
    otherPotentialHosts.length > 0
      ? otherPotentialHosts[0]?.username
      : undefined;

  if (nextHostUsername) {
    await updateHostName(room.code, nextHostUsername);
    await publishEvents<HostChangeInternalEvent>([
      new HostChangeInternalEvent(
        room.code,
        hostUsername,
        nextHostUsername,
        room.gameTypeId
      ),
    ]);
  }
};
