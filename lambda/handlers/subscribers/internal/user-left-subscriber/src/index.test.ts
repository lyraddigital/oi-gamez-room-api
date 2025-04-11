import { EventBridgeEvent } from "aws-lambda";

import { Room } from "/opt/nodejs/oigamez-core.js";
import { UserLeftInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication.js";
import { getRoomByCode } from "/opt/nodejs/oigamez-data.js";

import { handler } from "./index.js";
import {
  communicateUserLeft,
  publishExternalUserLeftEvent,
} from "./services/index.js";

jest.mock("/opt/nodejs/oigamez-data.js");
jest.mock("./configuration/index.js");
jest.mock("./services/index.js");

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
