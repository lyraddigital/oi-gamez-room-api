import { EventBridgeEvent } from "aws-lambda";

import {
  HostChangeCommunicationEvent,
  HostTransferCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  HostChangeExternalEvent,
  HostChangeInternalEvent,
  publishExternalEvents,
} from "@oigamez/event-bridge";
import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";

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
  const room = await getRoomByCode(roomCode);
  const otherUserConnections = roomConnections.filter(
    (c) => c.username !== newHostUsername
  );
  const newHostConnections = roomConnections.filter(
    (c) => c.username === newHostUsername
  );
  const isBelowMinimumUsers = !!room && room.curNumOfUsers < room.minNumOfUsers;

  await broadcast<HostChangeCommunicationEvent>(
    otherUserConnections,
    new HostChangeCommunicationEvent(oldHostUsername, newHostUsername)
  );

  await broadcast<HostTransferCommunicationEvent>(
    newHostConnections,
    new HostTransferCommunicationEvent(isBelowMinimumUsers)
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
