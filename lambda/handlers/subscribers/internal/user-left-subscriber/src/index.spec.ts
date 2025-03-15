import {
  EventBridgeInternalEventType,
  UserLeftInternalEvent,
} from "@oigamez/event-bridge";
import { getRoomByCode } from "@oigamez/repositories";
import { EventBridgeEvent } from "aws-lambda";

import { handler } from ".";
import { communicateUserLeft, publishExternalUserLeftEvent } from "./services";
import { Room } from "@oigamez/models";

jest.mock("@oigamez/repositories");
jest.mock("./configuration");
jest.mock("./services");

describe("user joined subscriber handler tests", () => {
  it("makes the correct calls when room could not find by room code", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "conn1234";
    const gameTypeId = 1;
    const event = {
      detail: {
        roomCode,
        username,
        gameTypeId,
        connectionId,
      },
    } as EventBridgeEvent<
      EventBridgeInternalEventType.userLeft,
      UserLeftInternalEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(undefined);

    // Action
    await handler(event);

    // Assert
    expect(communicateUserLeft).toHaveBeenCalledWith(
      roomCode,
      username,
      undefined,
      false,
      connectionId
    );
    expect(publishExternalUserLeftEvent).toHaveBeenCalledWith(
      roomCode,
      username,
      false,
      gameTypeId
    );
  });

  it("makes the correct calls when room is found but current number of users is above the minimum number of users", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "conn1234";
    const gameTypeId = 1;
    const event = {
      detail: {
        roomCode,
        username,
        gameTypeId,
        connectionId,
      },
    } as EventBridgeEvent<
      EventBridgeInternalEventType.userLeft,
      UserLeftInternalEvent
    >;
    const room = {
      curNumOfUsers: 3,
      minNumOfUsers: 2,
    } as Room;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await handler(event);

    // Assert
    expect(communicateUserLeft).toHaveBeenCalledWith(
      roomCode,
      username,
      room,
      false,
      connectionId
    );
    expect(publishExternalUserLeftEvent).toHaveBeenCalledWith(
      roomCode,
      username,
      false,
      gameTypeId
    );
  });

  it("makes the correct calls when room is found and the current number of users is equal to the minimum number of users", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "conn1234";
    const gameTypeId = 1;
    const event = {
      detail: {
        roomCode,
        username,
        gameTypeId,
        connectionId,
      },
    } as EventBridgeEvent<
      EventBridgeInternalEventType.userLeft,
      UserLeftInternalEvent
    >;
    const room = {
      curNumOfUsers: 2,
      minNumOfUsers: 2,
    } as Room;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await handler(event);

    // Assert
    expect(communicateUserLeft).toHaveBeenCalledWith(
      roomCode,
      username,
      room,
      false,
      connectionId
    );
    expect(publishExternalUserLeftEvent).toHaveBeenCalledWith(
      roomCode,
      username,
      false,
      gameTypeId
    );
  });

  it("makes the correct calls when room is found and the current number of users is below the minimum number of users", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "conn1234";
    const gameTypeId = 1;
    const event = {
      detail: {
        roomCode,
        username,
        gameTypeId,
        connectionId,
      },
    } as EventBridgeEvent<
      EventBridgeInternalEventType.userLeft,
      UserLeftInternalEvent
    >;
    const room = {
      curNumOfUsers: 1,
      minNumOfUsers: 2,
    } as Room;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await handler(event);

    // Assert
    expect(communicateUserLeft).toHaveBeenCalledWith(
      roomCode,
      username,
      room,
      true,
      connectionId
    );
    expect(publishExternalUserLeftEvent).toHaveBeenCalledWith(
      roomCode,
      username,
      true,
      gameTypeId
    );
  });
});
