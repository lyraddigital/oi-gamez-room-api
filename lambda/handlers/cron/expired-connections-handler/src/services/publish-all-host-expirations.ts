import {
  publishInternalEvents,
  HostConnectionExpiredInternalEvent,
} from "@oigamez/event-bridge";
import { Room, RoomStatus } from "@oigamez/models";

export const publishAllHostExpirations = async (
  hostedRooms: Room[]
): Promise<void> => {
  await publishInternalEvents(
    hostedRooms.map<HostConnectionExpiredInternalEvent>((hr) => {
      const shouldRemoveRoom =
        (hr.status === RoomStatus.Available ||
          hr.status === RoomStatus.NotAvailable) &&
        hr.curNumOfUsers <= 0;

      return new HostConnectionExpiredInternalEvent(
        hr.code,
        hr.hostUsername,
        shouldRemoveRoom,
        hr.gameTypeId
      );
    })
  );
};
