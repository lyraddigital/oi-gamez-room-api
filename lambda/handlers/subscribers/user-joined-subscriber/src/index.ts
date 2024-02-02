import { EventBridgeEvent } from "aws-lambda";

import {
  UserJoinedCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  UserJoinedInternalEvent,
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
  const { roomCode, username } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);
  const filteredConnections = roomConnections.filter(
    (rc) => rc.username !== username
  );

  await broadcast<UserJoinedCommunicationEvent>(
    filteredConnections,
    new UserJoinedCommunicationEvent(username)
  );
};
