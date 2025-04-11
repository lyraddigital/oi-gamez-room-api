import { EventBridgeEvent } from "aws-lambda";

import { RoomRemovedInternalEventBridgeEvent } from "@oigamez/communication";

import { validateEnvironment } from "./configuration/index.js";
import {
  communicateRoomRemoved,
  initializeLambda,
  publishExternalRoomRemovedEvent,
} from "./services/index.js";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-internal.room-removed",
    RoomRemovedInternalEventBridgeEvent
  >
): Promise<void> => {
  const { roomCode, hostConnectionId, gameTypeId } = event.detail;

  await communicateRoomRemoved(hostConnectionId);
  await publishExternalRoomRemovedEvent(roomCode, gameTypeId);
};
