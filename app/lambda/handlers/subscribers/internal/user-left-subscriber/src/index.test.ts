import { EventBridgeEvent } from "aws-lambda";

import { Room } from "@oigamez/core";
import { UserLeftInternalEventBridgeEvent } from "@oigamez/communication";
import { getRoomByCode } from "@oigamez/data";

import { handler } from ".";
import { communicateUserLeft, publishExternalUserLeftEvent } from "./services";

jest.mock("@oigamez/data");
jest.mock("./configuration");
jest.mock("./services");

describe("user joined subscriber handler tests", () => {
  test("makes the correct calls when room could not find by room code", async () => {
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
      "room-internal.user-left",
      UserLeftInternalEventBridgeEvent
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

  test("makes the correct calls when room is found but current number of users is above the minimum number of users", async () => {
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
      "room-internal.user-left",
      UserLeftInternalEventBridgeEvent
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

  test("makes the correct calls when room is found and the current number of users is equal to the minimum number of users", async () => {
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
      "room-internal.user-left",
      UserLeftInternalEventBridgeEvent
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

  test("makes the correct calls when room is found and the current number of users is below the minimum number of users", async () => {
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
      "room-internal.user-left",
      UserLeftInternalEventBridgeEvent
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
