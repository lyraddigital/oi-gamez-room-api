import {
  TransactWriteItem,
  TransactWriteItemsCommand,
} from "@aws-sdk/client-dynamodb";

import { Room, RoomStatus } from "@oigamez/core";
import { dbClient } from "@oigamez/data";

import { establishJoinerConnection } from "./establish-joiner-connection";
import {
  createOrUpdateRoomConnection,
  updateRoomUserCount,
} from "./transact-writes";

jest.mock("@oigamez/data");
jest.mock("./transact-writes", () => {
  return {
    createOrUpdateRoomConnection: jest.fn(),
    updateRoomUserCount: jest.fn(),
  };
});

describe("establishJoinerConnection tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("correct command is sent and the correct mock methods are called when the room is available", async () => {
    // Arrange
    const createOrUpdateHostItem = {} as TransactWriteItem;
    const updateRoomUserCountItem = {} as TransactWriteItem;
    (
      createOrUpdateRoomConnection as jest.MockedFunction<
        typeof createOrUpdateRoomConnection
      >
    ).mockReturnValueOnce(createOrUpdateHostItem);
    (
      updateRoomUserCount as jest.MockedFunction<typeof updateRoomUserCount>
    ).mockReturnValueOnce(updateRoomUserCountItem);
    const sendSpy = jest.spyOn(dbClient, "send");
    const username = "daryl_duck";
    const connectionId = "conn1234";
    const roomExpiry = 1029938;
    const roomStatus = RoomStatus.available;
    const room = {
      epochExpiry: roomExpiry,
      status: roomStatus,
    } as Room;

    // Action
    await establishJoinerConnection(room, username, connectionId);

    // Assert
    expect(createOrUpdateRoomConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId,
      room.epochExpiry
    );
    expect(updateRoomUserCount).toHaveBeenCalledWith(room);
    expect(sendSpy).toHaveBeenCalled();
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems
    ).toHaveLength(2);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![0]
    ).toBe(createOrUpdateHostItem);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![1]
    ).toBe(updateRoomUserCountItem);
  });

  test("correct command is sent and the correct mock methods are called when the room is not available", async () => {
    // Arrange
    const createOrUpdateHostItem = {} as TransactWriteItem;
    (
      createOrUpdateRoomConnection as jest.MockedFunction<
        typeof createOrUpdateRoomConnection
      >
    ).mockReturnValueOnce(createOrUpdateHostItem);
    const sendSpy = jest.spyOn(dbClient, "send");
    const username = "daryl_duck";
    const connectionId = "conn1234";
    const roomExpiry = 1029938;
    const roomStatus = RoomStatus.notAvailable;
    const room = {
      epochExpiry: roomExpiry,
      status: roomStatus,
    } as Room;

    // Action
    await establishJoinerConnection(room, username, connectionId);

    // Assert
    expect(createOrUpdateRoomConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId,
      room.epochExpiry
    );
    expect(updateRoomUserCount).not.toHaveBeenCalled();
    expect(sendSpy).toHaveBeenCalled();
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems
    ).toHaveLength(1);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![0]
    ).toBe(createOrUpdateHostItem);
  });
});
