import { EventBridgeEvent } from "aws-lambda";

import { closeConnection } from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  RoomRemovedInternalEvent,
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

  console.log(
    "We have closed the room. We will probably emit this at a later stage to the app in question"
  );
};
