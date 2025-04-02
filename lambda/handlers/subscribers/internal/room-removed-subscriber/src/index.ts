import { RoomRemovedInternalEvent } from "/opt/nodejs/oigamez-communication";
import { EventBridgeEvent } from "aws-lambda";

import { validateEnvironment } from "./configuration";
import {
  communicateRoomRemoved,
  initializeLambda,
  publishExternalRoomRemovedEvent,
} from "./services";

validateEnvironment();
initializeLambda();

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
