import { EventBridgeEvent } from "aws-lambda";

import {
  HostChangeCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  HostChangeExternalEvent,
  HostChangeInternalEvent,
  publishExternalEvents,
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
  const { roomCode, oldHostUsername, newHostUsername, gameTypeId } =
    event.detail;
  const roomConnections = await getRoomConnections(roomCode);

  await broadcast<HostChangeCommunicationEvent>(
    roomConnections,
    new HostChangeCommunicationEvent(oldHostUsername, newHostUsername)
  );

  await publishExternalEvents<HostChangeExternalEvent>([
    new HostChangeExternalEvent(
      roomCode,
      oldHostUsername,
      newHostUsername,
      gameTypeId
    ),
  ]);
};
