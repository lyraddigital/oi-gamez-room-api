import { EventBridgeEvent } from "aws-lambda";

import { UserLeftInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication.js";
import { getRoomByCode } from "/opt/nodejs/oigamez-data.js";

import { validateEnvironment } from "./configuration/index.js";
import {
  communicateUserLeft,
  initializeLambda,
  publishExternalUserLeftEvent,
} from "./services/index.js";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: EventBridgeEvent<
    "room-internal.user-left",
    UserLeftInternalEventBridgeEvent
  >
): Promise<void> => {
  const { roomCode, username, connectionId, gameTypeId } = event.detail;
  const room = await getRoomByCode(roomCode);
  const isBelowMinimumUsers = !!room && room.curNumOfUsers < room.minNumOfUsers;

  await communicateUserLeft(
    roomCode,
    username,
    room,
    isBelowMinimumUsers,
    connectionId
  );

  await publishExternalUserLeftEvent(
    roomCode,
    username,
    isBelowMinimumUsers,
    gameTypeId
  );
};
