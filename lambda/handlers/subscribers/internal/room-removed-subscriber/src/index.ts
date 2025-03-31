import { RoomRemovedInternalEvent } from "@oigamez/event-bridge";
import { EventBridgeEvent } from "aws-lambda";

import { validateEnvironment } from "./configuration";
import {
  communicateRoomRemoved,
  publishExternalRoomRemovedEvent,
} from "./services";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    "room-internal.room-removed",
    RoomRemovedInternalEvent
  >
): Promise<void> => {
  const { roomCode, hostConnectionId, gameTypeId } = event.detail;

  await communicateRoomRemoved(hostConnectionId);
  await publishExternalRoomRemovedEvent(roomCode, gameTypeId);
};
