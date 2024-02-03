import { EventBridgeEvent } from "aws-lambda";

import { closeConnection } from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  RoomRemovedExternalEvent,
  RoomRemovedInternalEvent,
  publishExternalEvents,
} from "@oigamez/event-bridge";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.roomRemoved,
    RoomRemovedInternalEvent
  >
): Promise<void> => {
  const { roomCode, hostConnectionId, gameTypeId } = event.detail;

  if (hostConnectionId) {
    await closeConnection(hostConnectionId);
  }

  await publishExternalEvents<RoomRemovedExternalEvent>([
    new RoomRemovedExternalEvent(roomCode, gameTypeId),
  ]);
};
