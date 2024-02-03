import { EventBridgeEvent } from "aws-lambda";

import {
  HostChangeCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  HostChangeInternalEvent,
} from "@oigamez/event-bridge";
import { getRoomConnections } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.hostChanged,
    HostChangeInternalEvent
  >
): Promise<void> => {
  const { roomCode, oldHostUsername, newHostUsername } = event.detail;
  const roomConnections = await getRoomConnections(roomCode);

  await broadcast<HostChangeCommunicationEvent>(
    roomConnections,
    new HostChangeCommunicationEvent(oldHostUsername, newHostUsername)
  );
};
