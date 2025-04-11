import { Room, RoomStatus } from "/opt/nodejs/oigamez-core.js";
import {
  publishInternalEvents,
  HostConnectionExpiredInternalEventBridgeEvent,
} from "/opt/nodejs/oigamez-communication.js";

export const publishAllHostExpirations = async (
  hostedRooms: Room[]
): Promise<void> => {
  await publishInternalEvents(
    hostedRooms.map<HostConnectionExpiredInternalEventBridgeEvent>((hr) => {
      const shouldRemoveRoom =
        (hr.status === RoomStatus.available ||
          hr.status === RoomStatus.notAvailable) &&
        hr.curNumOfUsers <= 0;

      return new HostConnectionExpiredInternalEventBridgeEvent(
        hr.code,
        hr.hostUsername,
        shouldRemoveRoom,
        hr.gameTypeId
      );
    })
  );
};
