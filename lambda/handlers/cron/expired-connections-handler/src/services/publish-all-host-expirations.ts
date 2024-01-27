import {
  publishEvents,
  HostConnectionExpiredEvent,
} from "@oigamez/event-bridge";
import { Room, RoomStatus } from "@oigamez/models";

export const publishAllHostExpirations = async (
  hostedRooms: Room[]
): Promise<void> => {
  await publishEvents(
    hostedRooms.map<HostConnectionExpiredEvent>((hr) => {
      const shouldRemoveRoom =
        (hr.status === RoomStatus.Available ||
          hr.status === RoomStatus.NotAvailable) &&
        hr.curNumOfUsers === 1;

      return new HostConnectionExpiredEvent(
        hr.code,
        hr.hostUsername,
        shouldRemoveRoom,
        hr.gameTypeId
      );
    })
  );
};
