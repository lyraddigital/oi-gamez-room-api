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
import { getRoomConnections } from "@oigamez/repositories";

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

  await publishExternalEvents<UserJoinedExternalEvent>([
    new UserJoinedExternalEvent(roomCode, username, gameTypeId),
  ]);
};
