import { EventBridgeEvent } from "aws-lambda";

import { UserLeftCommunicationEvent, broadcast } from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  UserLeftInternalEvent,
} from "@oigamez/event-bridge";
import { getRoomConnections } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.userLeft,
    UserLeftInternalEvent
  >
): Promise<void> => {
  const { roomCode, username } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);

  await broadcast<UserLeftCommunicationEvent>(
    roomConnections,
    new UserLeftCommunicationEvent(username),
    []
  );
};
