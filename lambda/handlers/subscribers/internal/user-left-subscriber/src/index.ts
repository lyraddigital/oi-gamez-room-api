import { EventBridgeEvent } from "aws-lambda";

import {
  DisableGameStartCommunicationEvent,
  UserLeftCommunicationEvent,
  broadcast,
  closeConnection,
} from "@oigamez/communication";
import {
  EventBridgeInternalEventType,
  UserLeftExternalEvent,
  UserLeftInternalEvent,
  publishExternalEvents,
} from "@oigamez/event-bridge";
import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeInternalEventType.userLeft,
    UserLeftInternalEvent
  >
): Promise<void> => {
  const { roomCode, username, connectionId, gameTypeId } = event.detail;
  const room = await getRoomByCode(roomCode);
  const roomConnections = await getRoomConnections(roomCode);
  const isBelowMinimumUsers = !!room && room.curNumOfUsers < room.minNumOfUsers;

  await broadcast<UserLeftCommunicationEvent>(
    roomConnections,
    new UserLeftCommunicationEvent(username)
  );

  console.log("roomConnections", roomConnections);
  console.log("isBelowMinimumUsers", isBelowMinimumUsers);
  console.log(
    "username !== room!.hostUsername",
    username !== room!.hostUsername
  );

  if (isBelowMinimumUsers) {
    const hostConnections = roomConnections.filter(
      (c) => c.username === room.hostUsername
    );

    console.log("hostConnections", hostConnections);

    if (username !== room!.hostUsername) {
      await broadcast<DisableGameStartCommunicationEvent>(
        hostConnections,
        new DisableGameStartCommunicationEvent()
      );
    }
  }

  if (connectionId) {
    await closeConnection(connectionId);
  }

  await publishExternalEvents<UserLeftExternalEvent>([
    new UserLeftExternalEvent(
      roomCode,
      username,
      isBelowMinimumUsers,
      gameTypeId
    ),
  ]);
};
