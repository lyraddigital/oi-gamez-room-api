import { UserLeftInternalEvent } from "@oigamez/event-bridge";
import { getRoomByCode } from "@oigamez/repositories";
import { EventBridgeEvent } from "aws-lambda";

import { validateEnvironment } from "./configuration";
import { communicateUserLeft, publishExternalUserLeftEvent } from "./services";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<"room-internal.user-left", UserLeftInternalEvent>
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
