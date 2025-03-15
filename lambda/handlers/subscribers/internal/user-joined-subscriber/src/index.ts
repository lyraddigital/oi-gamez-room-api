import { EventBridgeEvent } from "aws-lambda";

import {
  UserJoinedCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  UserJoinedExternalEvent,
  UserJoinedInternalEvent,
  publishExternalEvents,
} from "@oigamez/event-bridge";
import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.userJoined,
    UserJoinedInternalEvent
  >
): Promise<void> => {
  const { roomCode, username, gameTypeId } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);
  const filteredConnections = roomConnections.filter(
    (rc) => rc.username !== username
  );

  await broadcast<UserJoinedCommunicationEvent>(
    filteredConnections,
    new UserJoinedCommunicationEvent(username)
  );

  const room = await getRoomByCode(roomCode);
  const isBelowMinimumUsers =
    !!room && room.curNumOfUsers >= room.minNumOfUsers;

  await publishExternalEvents<UserJoinedExternalEvent>([
    new UserJoinedExternalEvent(
      roomCode,
      username,
      isBelowMinimumUsers,
      gameTypeId
    ),
  ]);
};
