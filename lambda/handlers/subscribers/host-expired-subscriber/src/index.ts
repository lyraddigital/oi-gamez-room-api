import { EventBridgeEvent } from "aws-lambda";

import {
  EventBridgeInternalEventType,
  HostConnectionExpiredInternalEvent,
  RoomRemovedInternalEvent,
  UserLeftInternalEvent,
  publishEvents,
} from "@oigamez/event-bridge";
import { removeRoomAndHost, removeUserConnection } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.hostConnectionExpired,
    HostConnectionExpiredInternalEvent
  >
): Promise<void> => {
  const { roomCode, username, shouldRemoveRoom, gameTypeId } = event.detail;

  if (shouldRemoveRoom) {
    await removeRoomAndHost(roomCode, username);

    await publishEvents<RoomRemovedInternalEvent>([
      new RoomRemovedInternalEvent(roomCode, gameTypeId),
    ]);
  } else {
    await removeUserConnection(roomCode, username);

    await publishEvents<UserLeftInternalEvent>([
      new UserLeftInternalEvent(roomCode, username, gameTypeId),
    ]);
  }
};
