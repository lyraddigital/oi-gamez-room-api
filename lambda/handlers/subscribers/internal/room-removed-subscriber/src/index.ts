import { EventBridgeEvent } from "aws-lambda";

import {
  EventBridgeInternalEventType,
  RoomRemovedInternalEvent,
} from "@oigamez/event-bridge";

import { validateEnvironment } from "./configuration";
import {
  communicateRoomRemoved,
  publishExternalRoomRemovedEvent,
} from "./services";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.roomRemoved,
    RoomRemovedInternalEvent
  >
): Promise<void> => {
  const { roomCode, hostConnectionId, gameTypeId } = event.detail;

  await communicateRoomRemoved(hostConnectionId);
  await publishExternalRoomRemovedEvent(roomCode, gameTypeId);
};
