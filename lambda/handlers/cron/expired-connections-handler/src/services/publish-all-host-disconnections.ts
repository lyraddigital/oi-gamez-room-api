import { HostRemovedEvent, publishEvents } from "@oigamez/event-bridge";
import { Room, RoomStatus } from "@oigamez/models";

export const publishAllHostDisconnections = async (
  hostedRooms: Room[]
): Promise<void> => {
  await publishEvents(
    hostedRooms.map<HostRemovedEvent>((hr) => {
      const shouldRemoveRoom =
        (hr.status === RoomStatus.Available ||
          hr.status === RoomStatus.NotAvailable) &&
        hr.curNumOfUsers === 1;

      return new HostRemovedEvent(hr.code, hr.hostUsername, shouldRemoveRoom);
    })
  );
};
