import { getRoomByCode } from "@oigamez/repositories";
import { EventBridgeEvent } from "aws-lambda";

import { UserLeftInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication";

import { validateEnvironment } from "./configuration";
import {
  communicateUserLeft,
  initializeLambda,
  publishExternalUserLeftEvent,
} from "./services";

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
